/**
 * Customizer control `styling`: state tabs + accordion groups; device via icons on responsive fields.
 */
import {
	Button,
	__experimentalConfirmDialog as ConfirmDialog,
	Icon,
	Popover,
	SnackbarList,
	TextControl,
	Tabs,
} from '@wordpress/components';
import { pencil, rotateLeft, settings, close } from '@wordpress/icons';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import {
	bindCustomizerPreviewDevice,
	getCustomizerPreviewDevice,
	syncCustomizerPreviewDevice,
} from './customizerPreviewDeviceSync';
import { parseDeclarationForm, patchDeclarationForm } from './declarationForm';
import { StylingDeviceProvider } from './components';
import { resolveAllowedGroupIds, StylingAccordionPanels } from './StylingAccordionPanels';
import { buildDisabledFieldSet } from './stylingDisableFields';
import { rebuildFontSlicesInValue } from './stylingGoogleFonts';
import { useGoogleFontFamilies } from './useGoogleFontFamilies';
import { StylingSettingsPopover } from './components/StylingSettingsPopover';
import { shouldIgnoreStylingPopoverFocusOutside } from './stylingPopoverFocusOutside';
import {
	getFixedStatesTemplate,
	getStatesStructureMode,
	normalizeStylingRootForStatesPolicy,
} from './stylingStatesPolicy';

const IconTarget = ({ size = 24 }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-current-location">
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 1a1 1 0 0 1 1 1v1.055a9.004 9.004 0 0 1 7.946 7.945h1.054a1 1 0 0 1 0 2h-1.055a9.004 9.004 0 0 1 -7.944 7.945l-.001 1.055a1 1 0 0 1 -2 0v-1.055a9.004 9.004 0 0 1 -7.945 -7.944l-1.055 -.001a1 1 0 0 1 0 -2h1.055a9.004 9.004 0 0 1 7.945 -7.945v-1.055a1 1 0 0 1 1 -1m0 4a7 7 0 1 0 0 14a7 7 0 0 0 0 -14m0 3a4 4 0 1 1 -4 4l.005 -.2a4 4 0 0 1 3.995 -3.8" />
	</svg>
}

/**
 * @param {JQueryStatic} $ jQuery
 * @param {import('@wordpress/customize').Control} control
 */
function pushStylingPayloadToCustomizer($, control, dataObj) {
	const setting = control.setting;
	if (!setting || typeof setting.set !== 'function' || typeof setting.get !== 'function') {
		return;
	}
	const payload = JSON.stringify(dataObj);
	const before = setting.get();
	setting.set(payload);

	const $hidden = control.container.find('input[data-customize-setting-link]');
	if ($hidden.length) {
		$hidden.val(payload);
		$hidden.trigger('input').trigger('change');
	}

	const after = setting.get();
	const _ = typeof window !== 'undefined' ? window._ : null;
	if (_ && typeof _.isEqual === 'function') {
		const skipped = _.isEqual(before, after) && !_.isEqual(before, payload);
		if (skipped) {
			setting._value = payload;
			setting._dirty = true;
			if (setting.callbacks && typeof setting.callbacks.fireWith === 'function') {
				setting.callbacks.fireWith(setting, [payload, before]);
			}
		}
	}
}

function cloneValue(v) {
	return JSON.parse(JSON.stringify(v));
}

/**
 * @param {Record<string, unknown>} singleClone
 * @param {string} itemTitle
 * @returns {Record<string, unknown>}
 */
function wrapSingleAsMulti(singleClone, itemTitle) {
	const { items: _drop, ...rest } = singleClone;
	const base = typeof singleClone._meta?.baseSelector === 'string' ? singleClone._meta.baseSelector : '';
	return {
		_onepressStyling: true,
		items: [
			{
				id: 'item-1',
				title: itemTitle,
				selector: base,
				...rest,
			},
		],
	};
}

/**
 * @param {Record<string, unknown>} v
 * @param {Record<string, unknown> | null} defaultMulti
 * @param {string} migrateTitle
 */
function ensureMultiShape(v, defaultMulti, migrateTitle) {
	if (v && Array.isArray(v.items) && v.items.length) {
		return cloneValue(v);
	}
	if (v && v._meta && !v.items) {
		return wrapSingleAsMulti(cloneValue(v), migrateTitle);
	}
	if (defaultMulti && typeof defaultMulti === 'object' && Array.isArray(defaultMulti.items) && defaultMulti.items.length) {
		return cloneValue(defaultMulti);
	}
	return { _onepressStyling: true, items: [] };
}

/**
 * @param {object} props
 * @param {import('@wordpress/customize').Control} props.control
 * @param {JQueryStatic} props.$
 */
export function StylingControlApp({ control, $ }) {
	const multiple = Boolean(control.params.styling_multiple);

	const previewDeviceIds = useMemo(() => {
		const fromPhp = control.params.preview_device_ids;
		if (Array.isArray(fromPhp) && fromPhp.length) {
			return fromPhp.map(String);
		}
		return ['desktop', 'tablet', 'mobile'];
	}, [control.params.preview_device_ids]);

	const stylingStatesParam = control.params.styling_states;
	const statesStructureMode = useMemo(
		() => getStatesStructureMode(stylingStatesParam !== undefined ? stylingStatesParam : 'all'),
		[stylingStatesParam]
	);
	const fixedStatesTemplate = useMemo(
		() => getFixedStatesTemplate(stylingStatesParam),
		[stylingStatesParam]
	);

	const editableBaseSelector = control.params.editable_base_selector !== false;

	/** Single-target only: non-empty `base_selector` from PHP locks selector and hides the field. */
	const lockedBaseSelector = useMemo(() => {
		if (multiple) {
			return '';
		}
		const s = control.params.base_selector;
		return typeof s === 'string' && s.trim() !== '' ? s.trim() : '';
	}, [multiple, control.params.base_selector]);

	const visibleStylingGroupIds = useMemo(
		() => resolveAllowedGroupIds(control.params.styling_groups),
		[control.params.styling_groups]
	);

	const disabledFieldSet = useMemo(
		() => buildDisabledFieldSet(control.params.disable_fields),
		[control.params.disable_fields]
	);

	const editorRootClassName = useMemo(() => {
		const parts = [
			'editor',
			'onepress-styling-editor',
			`onepress-styling-editor--group-count-${String(visibleStylingGroupIds.length)}`,
		];
		for (const id of visibleStylingGroupIds) {
			parts.push(`onepress-styling-editor--group-${id}`);
		}
		return parts.join(' ');
	}, [visibleStylingGroupIds]);

	const breakpoints = useMemo(
		() =>
			Array.isArray(control.params.styling_breakpoints) && control.params.styling_breakpoints.length
				? control.params.styling_breakpoints
				: [
					{ id: 'desktop', label: __('Desktop', 'onepress'), maxWidth: '' },
					{ id: 'tablet', label: __('Tablet', 'onepress'), maxWidth: '991px' },
					{ id: 'mobile', label: __('Mobile', 'onepress'), maxWidth: '767px' },
				],
		[control.params.styling_breakpoints]
	);

	const controlLabel = useMemo(() => {
		const l = control.params.label;
		return typeof l === 'string' && l.trim() !== '' ? l : __('Element styling', 'onepress');
	}, [control.params.label]);

	const controlDescription = useMemo(() => {
		const d = control.params.description;
		return typeof d === 'string' && d.trim() !== ''
			? d
			: __(
				'Per state and breakpoint, enter CSS declarations only (no selectors or curly braces). Example: color: #2271b1; padding: 8px 12px;',
				'onepress'
			);
	}, [control.params.description]);

	const defaultStylingPayload = useMemo(() => {
		const fromParams = control.params.default_value;
		if (fromParams && typeof fromParams === 'object' && !Array.isArray(fromParams)) {
			return cloneValue(fromParams);
		}
		const defRaw = control.setting && control.setting.default;
		if (typeof defRaw === 'string' && defRaw.trim() !== '') {
			try {
				const parsed = JSON.parse(defRaw);
				if (parsed && typeof parsed === 'object') {
					return cloneValue(parsed);
				}
			} catch {
				// ignore
			}
		}
		return null;
	}, [control]);

	const [stateIndex, setStateIndex] = useState(0);
	const [editorPopoverOpen, setEditorPopoverOpen] = useState(false);
	const [editorPopoverAnchor, setEditorPopoverAnchor] = useState(null);
	const editButtonRef = useRef(null);
	/** Mirrors `editorPopoverOpen` synchronously so the edit toggle survives stale closures vs. focus-outside ordering. */
	const editorPopoverOpenRef = useRef(false);
	/** Multi-target: pencil button element for the row whose editor is open (skip focus-outside close when retoggling that anchor). */
	const lastMultiEditorAnchorRef = useRef(null);
	const [editingItemIndex, setEditingItemIndex] = useState(null);
	const editingItemIndexRef = useRef(null);
	const [previewPickerActive, setPreviewPickerActive] = useState(false);
	const previewPickerActiveRef = useRef(false);
	const pickSnackbarSeqRef = useRef(0);
	const [pickerSnackbarNotices, setPickerSnackbarNotices] = useState(
		/** @type {Array<{ id: string, explicitDismiss?: boolean, content: import('react').ReactNode, spokenMessage?: string }>} */([])
	);
	const [statesPopoverOpen, setStatesPopoverOpen] = useState(false);
	const [statesPopoverAnchor, setStatesPopoverAnchor] = useState(null);
	const manageStatesButtonRef = useRef(null);
	const [resetConfirm, setResetConfirm] = useState(
		/** @type {{ kind: 'all' } | { kind: 'item', index: number } | null} */(null)
	);
	const [deviceId, setDeviceId] = useState(() => {
		const fromPreview = getCustomizerPreviewDevice();
		if (fromPreview && previewDeviceIds.includes(fromPreview)) {
			return fromPreview;
		}
		const bps =
			Array.isArray(control.params.styling_breakpoints) && control.params.styling_breakpoints.length
				? control.params.styling_breakpoints
				: null;
		if (bps && bps[0]?.id) {
			return bps[0].id;
		}
		return 'desktop';
	});

	const [value, setValue] = useState(() => {
		let v = cloneValue(control.params.value || {});
		if (multiple) {
			v = ensureMultiShape(v, control.params.default_value || null, __('Item 1', 'onepress'));
		}
		const mode = getStatesStructureMode(stylingStatesParam !== undefined ? stylingStatesParam : 'all');
		const tpl = getFixedStatesTemplate(stylingStatesParam);
		return normalizeStylingRootForStatesPolicy(
			v,
			mode,
			tpl,
			previewDeviceIds,
			multiple,
			lockedBaseSelector
		);
	});

	const { families, loading: fontsLoading, error: fontsError } = useGoogleFontFamilies();

	useEffect(() => {
		const setting = control.setting;
		if (!setting || typeof setting.bind !== 'function') {
			return undefined;
		}
		const onChange = (val) => {
			try {
				const parsed = typeof val === 'string' && val ? JSON.parse(val) : val;
				if (!parsed || typeof parsed !== 'object') {
					return;
				}
				let next = cloneValue(parsed);
				if (multiple) {
					next = ensureMultiShape(next, control.params.default_value || null, __('Item 1', 'onepress'));
				}
				const mode = getStatesStructureMode(stylingStatesParam !== undefined ? stylingStatesParam : 'all');
				const tpl = getFixedStatesTemplate(stylingStatesParam);
				next = normalizeStylingRootForStatesPolicy(
					next,
					mode,
					tpl,
					previewDeviceIds,
					multiple,
					lockedBaseSelector
				);
				setValue(next);
			} catch {
				// ignore
			}
		};
		setting.bind(onChange);
		return () => {
			if (typeof setting.unbind === 'function') {
				setting.unbind(onChange);
			}
		};
	}, [
		control.setting,
		control.params.default_value,
		multiple,
		previewDeviceIds,
		stylingStatesParam,
		lockedBaseSelector,
	]);

	const structuralPayload = useMemo(() => {
		if (multiple && Array.isArray(value.items) && value.items[0]) {
			return value.items[0];
		}
		return value;
	}, [multiple, value]);

	const editorPayload = useMemo(() => {
		if (!multiple) {
			return value;
		}
		if (
			!editorPopoverOpen ||
			editingItemIndex == null ||
			!Array.isArray(value.items) ||
			value.items[editingItemIndex] == null
		) {
			return null;
		}
		return value.items[editingItemIndex];
	}, [multiple, value, editorPopoverOpen, editingItemIndex]);

	const statesList = useMemo(() => {
		const meta = editorPayload && editorPayload._meta;
		if (!meta || !Array.isArray(meta.states)) {
			return [];
		}
		return meta.states.map((entry) => {
			const key = Object.keys(entry || {})[0];
			const row = key ? entry[key] : null;
			return {
				key,
				label: (row && row.label) || key,
				selector: (row && row.selector) || '',
			};
		});
	}, [editorPayload]);

	const setDeviceIdSynced = useCallback(
		(id) => {
			setDeviceId(id);
			syncCustomizerPreviewDevice(id, previewDeviceIds);
		},
		[previewDeviceIds]
	);

	useEffect(() => {
		return bindCustomizerPreviewDevice((id) => {
			if (previewDeviceIds.includes(id)) {
				setDeviceId(id);
			}
		});
	}, [previewDeviceIds]);

	const activeState = statesList[stateIndex] || statesList[0];
	const activeKey = activeState ? activeState.key : '';

	const stateTabPanelId = `onepress-styling-state-panel-${String(control.id)}`;
	const getStateTabId = (i) => `onepress-styling-state-tab-${String(control.id)}-${String(i)}`;

	const onStateTabKeyDown = useCallback(
		(event, index) => {
			const n = statesList.length;
			if (n < 2) {
				return;
			}
			let next = index;
			if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
				event.preventDefault();
				next = (index + 1) % n;
			} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
				event.preventDefault();
				next = (index - 1 + n) % n;
			} else if (event.key === 'Home') {
				event.preventDefault();
				next = 0;
			} else if (event.key === 'End') {
				event.preventDefault();
				next = n - 1;
			} else {
				return;
			}
			setStateIndex(next);
			const id = `onepress-styling-state-tab-${String(control.id)}-${String(next)}`;
			window.requestAnimationFrame(() => {
				document.getElementById(id)?.focus();
			});
		},
		[control.id, statesList.length]
	);

	const metaBaseSelector = useMemo(() => {
		if (lockedBaseSelector) {
			return lockedBaseSelector;
		}
		const meta = editorPayload?._meta;
		const b = meta?.baseSelector;
		if (typeof b === 'string' && b.trim() !== '') {
			return b;
		}
		const states = meta?.states;
		if (!Array.isArray(states)) {
			return '';
		}
		for (const entry of states) {
			if (!entry || typeof entry !== 'object') {
				continue;
			}
			const k = Object.keys(entry)[0];
			if (k === 'normal') {
				const row = entry[k];
				const sel = row && typeof row === 'object' ? String(row.selector ?? '').trim() : '';
				return sel;
			}
		}
		return '';
	}, [editorPayload, lockedBaseSelector]);

	const commitRoot = useCallback(
		(nextRoot) => {
			rebuildFontSlicesInValue(nextRoot, families);
			setValue(nextRoot);
			pushStylingPayloadToCustomizer($, control, nextRoot);
		},
		[$, control, families]
	);

	const commitActiveItem = useCallback(
		(nextItem) => {
			rebuildFontSlicesInValue(nextItem, families);
			if (multiple) {
				const i = editingItemIndex;
				if (i == null || !Array.isArray(value.items)) {
					return;
				}
				const nextRoot = cloneValue(value);
				nextRoot.items = [...nextRoot.items];
				nextRoot.items[i] = nextItem;
				setValue(nextRoot);
				pushStylingPayloadToCustomizer($, control, nextRoot);
			} else {
				setValue(nextItem);
				pushStylingPayloadToCustomizer($, control, nextItem);
			}
		},
		[multiple, editingItemIndex, value, families, $, control]
	);

	useEffect(() => {
		if (fontsLoading) {
			return;
		}
		setValue((prev) => {
			const next = cloneValue(prev);
			let changed = false;
			const beforeJson = JSON.stringify(prev);
			rebuildFontSlicesInValue(next, families);
			if (JSON.stringify(next) !== beforeJson) {
				changed = true;
			}
			if (!changed) {
				return prev;
			}
			pushStylingPayloadToCustomizer($, control, next);
			return next;
		});
	}, [fontsLoading, families, $, control]);

	const currentText =
		activeKey &&
			editorPayload &&
			editorPayload[activeKey] &&
			typeof editorPayload[activeKey] === 'object' &&
			editorPayload[activeKey][deviceId] != null
			? String(editorPayload[activeKey][deviceId])
			: '';

	const sliceParsed = useMemo(() => parseDeclarationForm(currentText), [currentText]);

	const onChangeText = useCallback(
		(text) => {
			if (!activeKey || !editorPayload) {
				return;
			}
			const next = cloneValue(editorPayload);
			if (!next[activeKey] || typeof next[activeKey] !== 'object') {
				next[activeKey] = {};
			}
			next[activeKey][deviceId] = text;
			commitActiveItem(next);
		},
		[editorPayload, activeKey, deviceId, commitActiveItem]
	);

	const onPatch = useCallback(
		(patch) => {
			const nextCss = patchDeclarationForm(sliceParsed.model, sliceParsed.unknown, patch);
			onChangeText(nextCss);
		},
		[sliceParsed.model, sliceParsed.unknown, onChangeText]
	);

	const onBaseSelectorChange = useCallback(
		(nextBase) => {
			if (lockedBaseSelector || !editorPayload) {
				return;
			}
			const next = cloneValue(editorPayload);
			if (!next._meta) {
				next._meta = {};
			}
			const trimmed = String(nextBase ?? '').trim();
			next._meta.baseSelector = trimmed === '' ? '.' : trimmed;
			next.selector = next._meta.baseSelector;
			if (Array.isArray(next._meta.states)) {
				next._meta.states = next._meta.states.map((entry) => {
					if (!entry || typeof entry !== 'object') {
						return entry;
					}
					const k = Object.keys(entry)[0];
					if (k !== 'normal') {
						return entry;
					}
					const row = entry[k];
					return {
						normal: {
							...(row && typeof row === 'object' ? row : {}),
							selector: '',
						},
					};
				});
			}
			commitActiveItem(next);
		},
		[editorPayload, commitActiveItem, lockedBaseSelector]
	);

	useLayoutEffect(() => {
		editingItemIndexRef.current = editingItemIndex;
	}, [editingItemIndex]);

	useLayoutEffect(() => {
		editorPopoverOpenRef.current = editorPopoverOpen;
	}, [editorPopoverOpen]);

	const removePickerSnackbar = useCallback((id) => {
		setPickerSnackbarNotices((prev) => prev.filter((n) => n.id !== id));
	}, []);

	useEffect(() => {
		if (pickerSnackbarNotices.length === 0) {
			return undefined;
		}
		const id = pickerSnackbarNotices[0].id;
		const t = window.setTimeout(() => {
			removePickerSnackbar(id);
		}, 5000);
		return () => window.clearTimeout(t);
	}, [pickerSnackbarNotices, removePickerSnackbar]);

	const cancelPreviewPicker = useCallback(() => {
		if (!previewPickerActiveRef.current) {
			return;
		}
		previewPickerActiveRef.current = false;
		setPreviewPickerActive(false);
		const previewer = typeof window !== 'undefined' ? window.wp?.customize?.previewer : null;
		if (typeof previewer?.send === 'function') {
			previewer.send('onepress-styling-cancel-pick');
		}
	}, []);

	useEffect(() => {
		const customize = typeof window !== 'undefined' ? window.wp?.customize : null;
		const previewer = customize?.previewer;
		if (typeof previewer?.bind !== 'function') {
			return undefined;
		}
		const onPicked = (payload) => {
			if (!payload || payload.controlId !== control.id) {
				return;
			}
			if (multiple) {
				const want = Number(payload.itemIndex);
				if (want !== editingItemIndexRef.current) {
					return;
				}
			}
			previewPickerActiveRef.current = false;
			setPreviewPickerActive(false);
			onBaseSelectorChange(String(payload.selector || ''));
			const trimmed = String(payload.selector ?? '').trim();
			const appliedDisplay = trimmed === '' ? '.' : trimmed;
			pickSnackbarSeqRef.current += 1;
			setPickerSnackbarNotices([
				{
					id: `onepress-styling-pick-${String(control.id)}-${String(pickSnackbarSeqRef.current)}`,
					explicitDismiss: true,
					content: (
						<span className="onepress-styling-pick-snackbar__inner">
							<span className="onepress-styling-pick-snackbar__label">
								{__('CSS selector applied:', 'onepress')}
							</span>{' '}
							<code className="onepress-styling-pick-snackbar__selector">{appliedDisplay}</code>
						</span>
					),
					spokenMessage: sprintf(
						/* translators: %s: CSS selector string */
						__('CSS selector applied: %s', 'onepress'),
						appliedDisplay
					),
				},
			]);
		};
		const onEnded = (payload) => {
			if (!payload || payload.controlId !== control.id) {
				return;
			}
			previewPickerActiveRef.current = false;
			setPreviewPickerActive(false);
		};
		previewer.bind('onepress-styling-picked', onPicked);
		previewer.bind('onepress-styling-pick-ended', onEnded);
		return () => {
			if (typeof previewer.unbind === 'function') {
				previewer.unbind('onepress-styling-picked', onPicked);
				previewer.unbind('onepress-styling-pick-ended', onEnded);
			}
		};
	}, [control.id, multiple, onBaseSelectorChange]);

	useEffect(() => {
		const onKeyDown = (e) => {
			if (!previewPickerActiveRef.current) {
				return;
			}
			if (e.key !== 'Escape' && e.keyCode !== 27) {
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			if (typeof e.stopImmediatePropagation === 'function') {
				e.stopImmediatePropagation();
			}
			cancelPreviewPicker();
		};
		// Capture on `window` so we run before handlers that stop propagation on `document`
		// (Customizer / components). Preview iframe has its own Escape handler in
		// stylingSelectorPickPreview.js — key events from the iframe do not reach this window.
		window.addEventListener('keydown', onKeyDown, true);
		return () => window.removeEventListener('keydown', onKeyDown, true);
	}, [cancelPreviewPicker]);

	useEffect(() => {
		if (multiple || !lockedBaseSelector) {
			return;
		}
		setValue((prev) => {
			const prevBase = String(prev?._meta?.baseSelector ?? prev?.selector ?? '').trim();
			if (prevBase === lockedBaseSelector) {
				return prev;
			}
			const next = cloneValue(prev);
			if (!next._meta) {
				next._meta = {};
			}
			next._meta.baseSelector = lockedBaseSelector;
			next.selector = lockedBaseSelector;
			if (Array.isArray(next._meta.states)) {
				next._meta.states = next._meta.states.map((entry) => {
					if (!entry || typeof entry !== 'object') {
						return entry;
					}
					const k = Object.keys(entry)[0];
					if (k !== 'normal') {
						return entry;
					}
					const row = entry[k];
					return {
						normal: {
							...(row && typeof row === 'object' ? row : {}),
							selector: '',
						},
					};
				});
			}
			pushStylingPayloadToCustomizer($, control, next);
			return next;
		});
	}, [multiple, lockedBaseSelector, value, $, control]);

	const onItemTitleChange = useCallback(
		(nextTitle) => {
			if (!multiple || !editorPayload) {
				return;
			}
			const next = cloneValue(editorPayload);
			next.title = String(nextTitle ?? '');
			commitActiveItem(next);
		},
		[multiple, editorPayload, commitActiveItem]
	);

	const unknownCount = Object.keys(sliceParsed.unknown).length;
	const sliceKey = `${activeKey}__${deviceId}`;

	useLayoutEffect(() => {
		if (!editorPopoverOpen) {
			if (!multiple) {
				setEditorPopoverAnchor(null);
			}
			setStatesPopoverOpen(false);
			setStatesPopoverAnchor(null);
			return;
		}
		if (!multiple) {
			setEditorPopoverAnchor(editButtonRef.current);
		}
	}, [editorPopoverOpen, multiple]);

	useLayoutEffect(() => {
		if (!statesPopoverOpen) {
			setStatesPopoverAnchor(null);
			return;
		}
		setStatesPopoverAnchor(manageStatesButtonRef.current);
	}, [statesPopoverOpen]);

	const toggleStatesPopover = useCallback(() => {
		setStatesPopoverOpen((o) => !o);
	}, []);

	const closeStatesPopover = useCallback(() => {
		setStatesPopoverOpen(false);
	}, []);

	const closeEditorPopover = useCallback(() => {
		editorPopoverOpenRef.current = false;
		lastMultiEditorAnchorRef.current = null;
		cancelPreviewPicker();
		setEditorPopoverOpen(false);
		setStatesPopoverOpen(false);
		setStatesPopoverAnchor(null);
		if (multiple) {
			setEditingItemIndex(null);
			setEditorPopoverAnchor(null);
		}
	}, [multiple, cancelPreviewPicker]);

	const togglePreviewPicker = useCallback(() => {
		const previewer = typeof window !== 'undefined' ? window.wp?.customize?.previewer : null;
		if (typeof previewer?.send !== 'function') {
			return;
		}
		if (previewPickerActiveRef.current) {
			cancelPreviewPicker();
			return;
		}
		setPickerSnackbarNotices([]);
		previewPickerActiveRef.current = true;
		setPreviewPickerActive(true);
		previewer.send('onepress-styling-start-pick', {
			controlId: control.id,
			itemIndex: multiple ? editingItemIndex : null,
		});
	}, [control.id, multiple, editingItemIndex, cancelPreviewPicker]);

	const handlePopoverFocusOutside = useCallback(
		(event) => {
			if (previewPickerActiveRef.current) {
				return;
			}
			if (shouldIgnoreStylingPopoverFocusOutside(event)) {
				return;
			}
			// useFocusOutside runs in setTimeout(0). If focus moved to the same edit toggle button,
			// closing here races the button click: close runs first → click then "opens" again.
			const toggleAnchor = multiple ? lastMultiEditorAnchorRef.current : editButtonRef.current;
			if (toggleAnchor instanceof HTMLElement) {
				const rt = event && 'relatedTarget' in event ? event.relatedTarget : null;
				if (rt instanceof HTMLElement && (rt === toggleAnchor || toggleAnchor.contains(rt))) {
					return;
				}
				const ae = document.activeElement;
				if (ae instanceof HTMLElement && (ae === toggleAnchor || toggleAnchor.contains(ae))) {
					return;
				}
			}
			closeEditorPopover();
		},
		[closeEditorPopover, multiple]
	);

	const toggleEditorPopover = useCallback(() => {
		if (multiple) {
			return;
		}
		if (editorPopoverOpenRef.current) {
			closeEditorPopover();
			return;
		}
		editorPopoverOpenRef.current = true;
		setEditorPopoverOpen(true);
	}, [multiple, closeEditorPopover]);

	const toggleEditorForItem = useCallback(
		(index, anchorEl) => {
			if (editorPopoverOpenRef.current && editingItemIndex === index) {
				closeEditorPopover();
				return;
			}
			lastMultiEditorAnchorRef.current = anchorEl;
			setEditorPopoverAnchor(anchorEl);
			setEditingItemIndex(index);
			setStateIndex(0);
			editorPopoverOpenRef.current = true;
			setEditorPopoverOpen(true);
		},
		[editingItemIndex, closeEditorPopover]
	);

	const addItem = useCallback(() => {
		if (!multiple || !defaultStylingPayload) {
			return;
		}
		const items = Array.isArray(defaultStylingPayload.items) ? defaultStylingPayload.items : null;
		const template = items && items[0] ? cloneValue(items[0]) : null;
		if (!template || !Array.isArray(value.items)) {
			return;
		}
		const id = `item-${Date.now().toString(36)}`;
		const newItem = cloneValue(template);
		newItem.id = id;
		newItem.title = __('New item', 'onepress');
		newItem.selector = '.new-target';
		if (!newItem._meta || typeof newItem._meta !== 'object') {
			newItem._meta = {};
		}
		newItem._meta.baseSelector = '.new-target';
		const nextRoot = cloneValue(value);
		nextRoot.items = [...nextRoot.items, newItem];
		commitRoot(nextRoot);
	}, [multiple, defaultStylingPayload, value, commitRoot]);

	const onResetToDefault = useCallback(() => {
		if (!defaultStylingPayload) {
			return;
		}
		editorPopoverOpenRef.current = false;
		lastMultiEditorAnchorRef.current = null;
		setStatesPopoverOpen(false);
		setStatesPopoverAnchor(null);
		setEditorPopoverOpen(false);
		setEditorPopoverAnchor(null);
		setEditingItemIndex(null);
		setStateIndex(0);
		commitRoot(cloneValue(defaultStylingPayload));
	}, [defaultStylingPayload, commitRoot]);

	const onResetItemToDefault = useCallback(
		(itemIndex) => {
			if (!multiple || !defaultStylingPayload || !Array.isArray(value.items)) {
				return;
			}
			const defItems = defaultStylingPayload.items;
			if (!Array.isArray(defItems) || defItems.length === 0) {
				return;
			}
			const current = value.items[itemIndex];
			if (!current) {
				return;
			}
			const templateIndex = Math.min(itemIndex, defItems.length - 1);
			const template = cloneValue(defItems[templateIndex]);
			template.id = current.id;
			template.title = current.title;
			const nextRoot = cloneValue(value);
			nextRoot.items = [...nextRoot.items];
			nextRoot.items[itemIndex] = template;
			commitRoot(nextRoot);
			if (editorPopoverOpen && editingItemIndex === itemIndex) {
				setStatesPopoverOpen(false);
				setStatesPopoverAnchor(null);
				setStateIndex(0);
			}
		},
		[multiple, defaultStylingPayload, value, commitRoot, editorPopoverOpen, editingItemIndex]
	);

	const structuralStates = useMemo(() => {
		const meta = structuralPayload && structuralPayload._meta;
		if (!meta || !Array.isArray(meta.states)) {
			return [];
		}
		return meta.states;
	}, [structuralPayload]);

	useEffect(() => {
		const n = structuralStates.length;
		if (n === 0) {
			return;
		}
		setStateIndex((i) => (i >= n ? 0 : i));
	}, [structuralStates.length]);

	if (
		!structuralStates.length ||
		!structuralStates[0] ||
		typeof structuralStates[0] !== 'object' ||
		Object.keys(structuralStates[0]).length !== 1
	) {
		return (
			<p className="description">
				{__('Invalid styling configuration (no states). Save to reset defaults.', 'onepress')}
			</p>
		);
	}

	const itemsList = multiple && Array.isArray(value.items) ? value.items : [];

	const stateTabCount = structuralStates.length;

	const showStatesPopoverButton = statesStructureMode === 'all' || statesStructureMode === 'fixed';
	const allowAddRemoveInStatesPopover = statesStructureMode === 'all';
	const showStateTabButtons = stateTabCount > 1;
	const showStatesToolbar = showStateTabButtons || showStatesPopoverButton;

	const hidePopoverHeading = control.params.styling_hide_popover_heading === true;
	const hideStateTablist = control.params.styling_hide_state_tablist === true;
	const showHeadingRow = !hidePopoverHeading;
	const showStateTablistBlock = showStatesToolbar && !hideStateTablist;
	const showPopoverHeader = showHeadingRow || showStateTablistBlock;
	const tablistVisibleForA11y = showStateTabButtons && !hideStateTablist;

	const popoverTitle = multiple
		? editorPayload
			? sprintf(
				/* translators: %s: item label */
				__('Edit styling: %s', 'onepress'),
				String(editorPayload.title || editorPayload.id || '')
			)
			: __('Edit styling', 'onepress')
		: __('Edit styling', 'onepress');

	return (
		<StylingDeviceProvider deviceId={deviceId} setDeviceId={setDeviceIdSynced} breakpoints={breakpoints}>
			<>
				<div className={editorRootClassName}>
					<div className="onepress-styling-control-intro">
						<div className="w-full flex justify-between items-center">
							<span className="grow customize-control-title">{controlLabel}</span>
							<div className="flex gap-2">
								<Button
									variant="minimal"
									onClick={() => setResetConfirm({ kind: 'all' })}
									disabled={!defaultStylingPayload}
									label={
										multiple
											? __('Reset all items to default', 'onepress')
											: __('Reset to default', 'onepress')
									}
									showTooltip
									size="small"
									className='icon-btn'
								>
									<Icon icon={rotateLeft} size={20} />
								</Button>
								{!multiple ? (
									<Button
										ref={editButtonRef}
										variant="secondary"
										onClick={toggleEditorPopover}
										isPressed={editorPopoverOpen}
										aria-expanded={editorPopoverOpen}
										aria-haspopup="dialog"
										label={__('Edit styling', 'onepress')}
										className='icon-btn'
										size="small"
										showTooltip
									>
										<Icon icon={pencil} size={20} />
									</Button>
								) : null}
							</div>
						</div>

						{multiple ? (
							<div className="onepress-styling-items mt-3">
								<div className="flex flex-col gap-2">
									{itemsList.map((item, index) => (
										<div
											key={item.id || `idx-${String(index)}`}
											className="styling-list-item flex justify-between items-center gap-2"
										>
											<span className="grow truncate text-sm">
												{item.title || item.id || sprintf(__('Item %d', 'onepress'), index + 1)}
											</span>

											<div className="flex gap-2">
												<Button
													variant="minimal"
													onClick={() => setResetConfirm({ kind: 'item', index })}
													size="small"
													disabled={!defaultStylingPayload}
													label={__('Reset this item to default', 'onepress')}
													showTooltip
													className='icon-btn'
												>
													<Icon icon={rotateLeft} size={18} />
												</Button>
												<Button
													variant="secondary"
													onClick={(e) => toggleEditorForItem(index, e.currentTarget)}
													isPressed={editorPopoverOpen && editingItemIndex === index}
													aria-expanded={editorPopoverOpen && editingItemIndex === index}
													aria-haspopup="dialog"
													label={__('Edit styling', 'onepress')}
													showTooltip
													size="small"
													className='icon-btn'
												>
													<Icon icon={pencil} size={18} />
												</Button>
											</div>
										</div>
									))}
								</div>
								<div className='block mt-2'>
									<Button variant="secondary" className="mt-2 p-0 h-auto" onClick={addItem}>
										{__('Add item', 'onepress')}
									</Button>
								</div>
							</div>
						) : null}

					</div>


					{editorPopoverOpen && editorPopoverAnchor && editorPayload ? (
						<Popover
							anchor={editorPopoverAnchor}
							onClose={closeEditorPopover}
							onFocusOutside={handlePopoverFocusOutside}
							placement="bottom-end"
							offset={8}
							className={`onepress-styling-editor-popover group-count-${String(visibleStylingGroupIds.length)}`}
							// focusOnMount="firstElement"
							noArrow={false}
							shift
						>

							{showPopoverHeader ? (
								<div className='popover-header'>
									{showHeadingRow ? (
										<div className='flex items-center gap-2 w-full justify-between'>
											<div className="grow onepress-styling-editor-popover__title ">{popoverTitle}</div>
											<div className='flex items-center gap-2'>
												{showStatesPopoverButton ? (
													<Button
														ref={manageStatesButtonRef}
														className="onepress-styling-manage-states icon-btn"
														variant="secondary"
														onClick={toggleStatesPopover}
														aria-expanded={statesPopoverOpen}
														aria-haspopup="dialog"
														size="small"
														label={
															allowAddRemoveInStatesPopover
																? __('Manage states', 'onepress')
																: __('State settings', 'onepress')
														}
														showTooltip

													>
														<Icon icon={settings} size={20} />
													</Button>
												) : null}

												{!lockedBaseSelector ? (<>
													<Button
														variant="secondary"
														onClick={togglePreviewPicker}
														isPressed={previewPickerActive}
														disabled={!editableBaseSelector}
														size="small"
														label={
															previewPickerActive
																? __('Cancel picking from preview', 'onepress')
																: __('Pick a selector from the site preview', 'onepress')
														}
														showTooltip
														className='icon-btn'
													>
														{previewPickerActive
															? <Icon icon={close} size={18} />
															: <IconTarget size={18} />
														}
													</Button>
												</>) : null}

											</div>
										</div>
									) : null}

									{showStateTablistBlock ? (
										<div className=" onepress-styling styling-root">
											<div className="states">
												<div className="states-toolbar flex flex gap-2 justify-between items-center">
													{showStateTabButtons ? (
														<div className="state-tablist-scroll">
															<div
																className="state-tablist-inner  components-button-group "
																role="tablist"
																aria-label={__('Style states', 'onepress')}
															>
																{statesList.map((s, i) => (
																	<Button
																		key={s.key}
																		id={getStateTabId(i)}
																		aria-selected={i === stateIndex}
																		aria-controls={stateTabPanelId}
																		tabIndex={i === stateIndex ? 0 : -1}
																		variant="unstyled"
																		onClick={() => setStateIndex(i)}
																		onKeyDown={(e) => onStateTabKeyDown(e, i)}
																		className={`tab-button ${i === stateIndex ? ' is-active' : ''}`}
																	>
																		{s.label}
																	</Button>
																))}
															</div>
														</div>
													) : (
														<span className="grow" aria-hidden />
													)}
												</div>
											</div>
										</div>
									) : null}

								</div>
							) : null}

							<div
								className="popover-body grow styling-root onepress-styling onepress-styling-editor-popover__inner"
								role={tablistVisibleForA11y ? 'tabpanel' : undefined}
								id={tablistVisibleForA11y ? stateTabPanelId : undefined}
								aria-labelledby={tablistVisibleForA11y ? getStateTabId(stateIndex) : undefined}
							>

								{showStatesPopoverButton ? (
									<StylingSettingsPopover
										anchor={statesPopoverAnchor}
										isOpen={statesPopoverOpen}
										onClose={closeStatesPopover}
										value={editorPayload}
										commit={commitActiveItem}
										previewDeviceIds={previewDeviceIds}
										activeStateKey={activeKey}
										setStateIndex={setStateIndex}
										allowAddRemoveStates={allowAddRemoveInStatesPopover}
										multiple={multiple}
										lockedBaseSelector={lockedBaseSelector}
										editableBaseSelector={editableBaseSelector}
										metaBaseSelector={metaBaseSelector}
										onBaseSelectorChange={onBaseSelectorChange}
										onItemTitleChange={onItemTitleChange}
									/>
								) : null}

								<StylingAccordionPanels
									model={sliceParsed.model}
									unknownCount={unknownCount}
									onPatch={onPatch}
									sliceKey={sliceKey}
									rawCss={currentText}
									onRawChange={onChangeText}
									families={families}
									fontsLoading={fontsLoading}
									fontsError={fontsError}
									stylingGroups={control.params.styling_groups}
									disabledFieldSet={disabledFieldSet}
								/>

								{!showStatesPopoverButton ? (
									<>
										{multiple ? (
											<TextControl
												__nextHasNoMarginBottom
												className="styling-item-name-field"
												label={__('Item name', 'onepress')}
												help={__('Label shown in the list for this target.', 'onepress')}
												value={String(editorPayload.title ?? '')}
												onChange={onItemTitleChange}
												autoComplete="off"
												spellCheck={false}
											/>
										) : null}
										{!lockedBaseSelector ? (
											<div className="field-base-selector">
												<TextControl
													__nextHasNoMarginBottom
													className="styling-selector-field"
													label={__('Base CSS selector', 'onepress')}
													help={
														editableBaseSelector
															? __(
																'Rules apply to this target. Each state can add a suffix (e.g. :hover) in its settings or below when that tab is active.',
																'onepress'
															)
															: __(
																'The base selector is fixed for this control and cannot be changed here.',
																'onepress'
															)
													}
													value={metaBaseSelector}
													onChange={onBaseSelectorChange}
													disabled={!editableBaseSelector}
													autoComplete="off"
													spellCheck={false}
												/>
											</div>
										) : null}
									</>
								) : null}



							</div>
						</Popover>
					) : null}
				</div>

				<div className="onepress-styling-pick-snackbar-wrap" aria-live="polite">
					<SnackbarList notices={pickerSnackbarNotices} onRemove={removePickerSnackbar} />
				</div>

				<ConfirmDialog
					isOpen={resetConfirm !== null}
					onConfirm={() => {
						const pending = resetConfirm;
						setResetConfirm(null);
						if (!pending) {
							return;
						}
						if (pending.kind === 'all') {
							onResetToDefault();
						} else {
							onResetItemToDefault(pending.index);
						}
					}}
					onCancel={() => setResetConfirm(null)}
					confirmButtonText={__('Reset', 'onepress')}
					cancelButtonText={__('Cancel', 'onepress')}
				>
					{resetConfirm?.kind === 'all' ? (
						<p>
							{multiple
								? __(
									'Reset all targets to their default styling? Every item in this list will be restored and unsaved changes will be lost.',
									'onepress'
								)
								: __(
									'Reset this styling block to its default? Current declarations will be replaced.',
									'onepress'
								)}
						</p>
					) : null}
					{resetConfirm?.kind === 'item' ? (
						<p>
							{sprintf(
								/* translators: %s: item label */
								__(
									'Reset "%s" to its default styling? This target\'s declarations will be replaced.',
									'onepress'
								),
								String(
									(Array.isArray(value.items) && value.items[resetConfirm.index]
										? value.items[resetConfirm.index].title || value.items[resetConfirm.index].id
										: '') || __('this item', 'onepress')
								)
							)}
						</p>
					) : null}
				</ConfirmDialog>
			</>
		</StylingDeviceProvider>
	);
}
