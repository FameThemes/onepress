/**
 * Customizer control `styling`: state tabs + accordion groups; device via icons on responsive fields.
 */
import {
	Button,
	__experimentalConfirmDialog as ConfirmDialog,
	Icon,
	SnackbarList,
	Tabs,
	TextControl,
} from '@wordpress/components';
import { pencil, rotateLeft, trash, chevronDown, chevronUp } from '@wordpress/icons';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import {
	bindCustomizerPreviewDevice,
	getCustomizerPreviewDevice,
	syncCustomizerPreviewDevice,
} from './customizerPreviewDeviceSync';
import { parseDeclarationForm, patchDeclarationForm } from './declarationForm';
import {
	StylingDeviceProvider,
	StylingLengthUnitProvider,
	StylingTargetElementSelect,
	STYLING_LENGTH_UNIT_SUFFIXES,
} from './components';
import { resolveAllowedGroupIds } from './StylingAccordionPanels';
import { findMatchingTargetPreset, normalizeTargetElementsRegistry } from './targetElementsRegistry';
import { buildDisabledFieldSet } from './stylingDisableFields';
import { rebuildFontSlicesInValue } from './stylingGoogleFonts';
import { useGoogleFontFamilies } from './useGoogleFontFamilies';
import { useFontManagerCatalogFamilies } from './useFontManagerCatalogFamilies';
import { BaseSelectorField } from './components/BaseSelectorField';
import { StylingInlineEditor } from './components/StylingInlineEditor';
import {
	getFixedStatesTemplate,
	getStatesStructureMode,
	normalizeStylingRootForStatesPolicy,
} from './stylingStatesPolicy';
import { remapStylingRootToLengthUnit } from './stylingLengthUnitRemap';

/**
 * Normalize `disable_fields` from PHP / Customize (array, or rare object shape).
 *
 * @param {unknown} raw
 * @returns {unknown[]}
 */
function coerceCustomizerDisableFieldsList(raw) {
	if (Array.isArray(raw)) {
		return raw;
	}
	if (raw && typeof raw === 'object') {
		return Object.values(raw);
	}
	return [];
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
 * Row label in multi-item list: matched target preset name first when control has `styling_target_elements`, then title / id / fallback.
 * Custom targets (`elId` `custom_item`) use the saved item name, not the registry preset label (“Custom target…”).
 *
 * @param {Record<string, unknown>} item
 * @param {number} index
 * @param {{ elements: Array<{ name: string, id: string, selector: string }> }} registry
 * @returns {string}
 */
function getMultiStylingItemListRowLabel(item, index, registry) {
	const elId = typeof item._meta?.elId === 'string' ? item._meta.elId.trim() : '';
	if (elId === 'custom_item') {
		const title = typeof item.title === 'string' ? item.title.trim() : '';
		if (title !== '') {
			return title;
		}
		const elName =
			item._meta && typeof item._meta === 'object' && typeof item._meta.elName === 'string'
				? item._meta.elName.trim()
				: '';
		if (elName !== '') {
			return elName;
		}
		return sprintf(__('Item %d', 'onepress'), index + 1);
	}
	if (registry?.elements?.length) {
		const base = String(item._meta?.baseSelector ?? item.selector ?? '').trim();
		const matched = findMatchingTargetPreset(base, elId, registry);
		if (matched?.name) {
			return matched.name;
		}
	}
	return item.title || item.id || sprintf(__('Item %d', 'onepress'), index + 1);
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
/** Sentinel `itemIndex` when picking a selector for the pending-add custom target draft (`StylingControlApp`). */
const PENDING_ADD_PICK_ITEM_INDEX = -1;

function ensureMultiShape(v, defaultMulti, migrateTitle) {
	// Saved / in-flight explicit empty list — must not fall through to `defaultMulti` (would resurrect defaults).
	if (v && typeof v === 'object' && Array.isArray(v.items) && v.items.length === 0) {
		const out = cloneValue(v);
		out._onepressStyling = true;
		out.items = [];
		return out;
	}
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

	const targetElementsRegistry = useMemo(
		() => normalizeTargetElementsRegistry(control.params?.styling_target_elements),
		[control.params?.styling_target_elements]
	);

	const visibleStylingGroupIds = useMemo(
		() => resolveAllowedGroupIds(control.params.styling_groups),
		[control.params.styling_groups]
	);

	const disabledFieldSet = useMemo(() => {
		const p = control.params;
		const raw = p.disable_fields ?? p.disableFields;
		return buildDisabledFieldSet(coerceCustomizerDisableFieldsList(raw));
	}, [control.params.disable_fields, control.params.disableFields, control.id]);

	const editorRootClassName = useMemo(() => {
		const parts = [
			'editor',
			'onepress-styling-editor',
			`onepress-styling-editor--group-count-${visibleStylingGroupIds.length <= 1 ? '1' : 'gt1'}`,
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
		return d;
	}, [control.params.description]);

	const addItemLabel = useMemo(() => {
		const l = control.params.add_item_label;
		return typeof l === 'string' && l.trim() !== '' ? l.trim() : __('Add item', 'onepress');
	}, [control.params.add_item_label]);

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

	/** One `items[]` row shape when adding / per-item reset; required when `default_value.items` is `[]`. */
	const multiItemTemplateRow = useMemo(() => {
		if (!multiple) {
			return null;
		}
		const tpl = control.params.styling_new_item_template ?? control.params.stylingNewItemTemplate;
		if (tpl && typeof tpl === 'object' && !Array.isArray(tpl)) {
			return cloneValue(tpl);
		}
		const items = Array.isArray(defaultStylingPayload?.items) ? defaultStylingPayload.items : [];
		if (items[0]) {
			return cloneValue(items[0]);
		}
		return null;
	}, [multiple, control.params.styling_new_item_template, control.params.stylingNewItemTemplate, defaultStylingPayload]);

	const [stateIndex, setStateIndex] = useState(0);
	const [editorPopoverOpen, setEditorPopoverOpen] = useState(false);
	/** Mirrors `editorPopoverOpen` synchronously so the edit toggle survives stale closures vs. focus-outside ordering. */
	const editorPopoverOpenRef = useRef(false);
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
	const [deleteItemIndex, setDeleteItemIndex] = useState(/** @type {number | null} */(null));
	/** Index pending delete confirm — avoids stale `deleteItemIndex` when `ConfirmDialog` fires `onConfirm`. */
	const deletePendingIndexRef = useRef(/** @type {number | null} */(null));
	const removeItemAtRef = useRef(/** @type {((index: number) => void) | null} */(null));
	const [pendingAddFormOpen, setPendingAddFormOpen] = useState(false);
	const [pendingAddLockedMessage, setPendingAddLockedMessage] = useState('');
	const [pendingAddCustomOpen, setPendingAddCustomOpen] = useState(false);
	const [pendingCustomSelector, setPendingCustomSelector] = useState('');
	const [pendingCustomItemName, setPendingCustomItemName] = useState('');
	/** Anchor for editor popover after inline add (wrapper around add row / form). */
	const pendingAddInlineRef = useRef(/** @type {HTMLDivElement | null} */(null));
	const pendingAddDraftRef = useRef({ form: false, custom: false });

	useLayoutEffect(() => {
		pendingAddDraftRef.current = { form: pendingAddFormOpen, custom: pendingAddCustomOpen };
	}, [pendingAddFormOpen, pendingAddCustomOpen]);

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

	const usedPresetIdsSet = useMemo(() => {
		const s = new Set();
		if (!multiple || !Array.isArray(value?.items)) {
			return s;
		}
		for (const it of value.items) {
			const el = typeof it?._meta?.elId === 'string' ? it._meta.elId.trim() : '';
			if (el !== '') {
				s.add(el);
			}
		}
		return s;
	}, [multiple, value?.items]);

	const usedPresetIdsForEditor = useMemo(() => {
		if (editingItemIndex == null || !Array.isArray(value?.items)) {
			return usedPresetIdsSet;
		}
		const cur = value.items[editingItemIndex];
		const curEl = typeof cur?._meta?.elId === 'string' ? cur._meta.elId.trim() : '';
		if (curEl === '') {
			return usedPresetIdsSet;
		}
		const next = new Set(usedPresetIdsSet);
		next.delete(curEl);
		return next;
	}, [usedPresetIdsSet, editingItemIndex, value?.items]);

	const { families, loading: fontsLoading, error: fontsError } = useGoogleFontFamilies();
	const customizeApi =
		typeof wp !== 'undefined' && wp.customize ? /** @type {import('@wordpress/customize').Customize} */ (wp.customize) : null;
	const localManagedFonts = useFontManagerCatalogFamilies(customizeApi, families);
	const mergedForFontSlices = useMemo(
		() => [...localManagedFonts, ...(families ?? [])],
		[localManagedFonts, families]
	);
	const fontFamilySource =
		control.params.styling_font_family_source === 'google' ? 'google' : 'local';

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
		if (
			multiple &&
			Array.isArray(value.items) &&
			value.items.length === 0 &&
			defaultStylingPayload &&
			Array.isArray(defaultStylingPayload.items) &&
			defaultStylingPayload.items[0]
		) {
			return defaultStylingPayload.items[0];
		}
		return value;
	}, [multiple, value, defaultStylingPayload]);

	const editorPayload = useMemo(() => {
		if (!multiple) {
			if (!editorPopoverOpen) {
				return null;
			}
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
		if (typeof b === 'string') {
			return b.trim();
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

	/** New multi items use empty `_meta.baseSelector` until user picks a preset or a selector from preview. */
	const multiItemAwaitingPresetTarget = useMemo(() => {
		if (!multiple || !editorPayload) {
			return false;
		}
		const base = String(editorPayload._meta?.baseSelector ?? '').trim();
		return base === '';
	}, [multiple, editorPayload]);

	const commitRoot = useCallback(
		(nextRoot) => {
			rebuildFontSlicesInValue(nextRoot, mergedForFontSlices);
			setValue(nextRoot);
			pushStylingPayloadToCustomizer($, control, nextRoot);
		},
		[$, control, mergedForFontSlices]
	);

	const [lengthUnitPreferred, setLengthUnitPreferred] = useState('px');

	const applyLengthTargetUnit = useCallback(
		(nextSuffix) => {
			const t = typeof nextSuffix === 'string' ? nextSuffix.trim().toLowerCase() : '';
			if (!t || !STYLING_LENGTH_UNIT_SUFFIXES.has(t) || t === lengthUnitPreferred) {
				return;
			}
			setValue((prevRoot) => {
				const remapped = remapStylingRootToLengthUnit(
					cloneValue(prevRoot),
					t,
					previewDeviceIds,
					multiple
				);
				rebuildFontSlicesInValue(remapped, mergedForFontSlices);
				pushStylingPayloadToCustomizer($, control, remapped);
				return remapped;
			});
			setLengthUnitPreferred(t);
		},
		[lengthUnitPreferred, previewDeviceIds, multiple, mergedForFontSlices, $, control]
	);

	const adoptLengthSuffixFromField = useCallback(
		(suffix) => {
			const s = typeof suffix === 'string' ? suffix.trim().toLowerCase() : '';
			if (!s || !STYLING_LENGTH_UNIT_SUFFIXES.has(s) || s === lengthUnitPreferred) {
				return;
			}
			setLengthUnitPreferred(s);
		},
		[lengthUnitPreferred]
	);

	const commitActiveItem = useCallback(
		(nextItem) => {
			if (multiple) {
				const i = editingItemIndex;
				if (i == null) {
					return;
				}
				setValue((prevRoot) => {
					if (!Array.isArray(prevRoot?.items) || prevRoot.items[i] == null) {
						return prevRoot;
					}
					const nextRoot = cloneValue(prevRoot);
					const item = cloneValue(nextItem);
					rebuildFontSlicesInValue(item, mergedForFontSlices);
					nextRoot.items = [...nextRoot.items];
					nextRoot.items[i] = item;
					pushStylingPayloadToCustomizer($, control, nextRoot);
					return nextRoot;
				});
			} else {
				const item = cloneValue(nextItem);
				rebuildFontSlicesInValue(item, mergedForFontSlices);
				setValue(item);
				pushStylingPayloadToCustomizer($, control, item);
			}
		},
		[multiple, editingItemIndex, mergedForFontSlices, $, control]
	);

	useEffect(() => {
		setValue((prev) => {
			const next = cloneValue(prev);
			let changed = false;
			const beforeJson = JSON.stringify(prev);
			rebuildFontSlicesInValue(next, mergedForFontSlices);
			if (JSON.stringify(next) !== beforeJson) {
				changed = true;
			}
			if (!changed) {
				return prev;
			}
			pushStylingPayloadToCustomizer($, control, next);
			return next;
		});
	}, [mergedForFontSlices, $, control]);

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
		/**
		 * @param {string} nextBase
		 * @param {{ elementPresetId?: string, elementPresetName?: string } | undefined} [binding] — from preset: `_meta.elId`, `_meta.elName`, item `id` (multi). Omit clears `elId` / `elName` (manual / preview pick).
		 */
		(nextBase, binding) => {
			if (lockedBaseSelector || !editorPayload) {
				return;
			}
			const next = cloneValue(editorPayload);
			if (!next._meta) {
				next._meta = {};
			}
			const trimmed = String(nextBase ?? '').trim();
			next._meta.baseSelector = trimmed;
			next.selector = trimmed;
			const pid = binding && typeof binding.elementPresetId === 'string' ? binding.elementPresetId.trim() : '';
			if (pid !== '') {
				next._meta.elId = pid;
				const pnm =
					binding && typeof binding.elementPresetName === 'string' ? binding.elementPresetName.trim() : '';
				if (pnm !== '') {
					next._meta.elName = pnm;
				} else {
					delete next._meta.elName;
				}
				if (multiple) {
					next.id = pid;
				}
			} else {
				delete next._meta.elId;
				delete next._meta.elName;
			}
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
		[editorPayload, commitActiveItem, lockedBaseSelector, multiple]
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
				const idxRaw = payload.itemIndex;
				if (idxRaw === PENDING_ADD_PICK_ITEM_INDEX) {
					const u = pendingAddDraftRef.current;
					if (!u.form || !u.custom) {
						return;
					}
					const picked = String(payload.selector || '').trim();
					previewPickerActiveRef.current = false;
					setPreviewPickerActive(false);
					setPendingCustomSelector(picked);
					const appliedDisplay = picked === '' ? '.' : picked;
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
					return;
				}
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
			if (!multiple) {
				return;
			}
			const i = editingItemIndex;
			if (i == null) {
				return;
			}
			setValue((prevRoot) => {
				if (!Array.isArray(prevRoot?.items) || prevRoot.items[i] == null) {
					return prevRoot;
				}
				const nextRoot = cloneValue(prevRoot);
				const next = cloneValue(nextRoot.items[i]);
				const t = String(nextTitle ?? '');
				next.title = t;
				if (next._meta && typeof next._meta === 'object' && next._meta.elId === 'custom_item') {
					const trimmed = t.trim();
					if (trimmed !== '') {
						next._meta.elName = trimmed;
					} else {
						delete next._meta.elName;
					}
				}
				rebuildFontSlicesInValue(next, mergedForFontSlices);
				nextRoot.items = [...nextRoot.items];
				nextRoot.items[i] = next;
				pushStylingPayloadToCustomizer($, control, nextRoot);
				return nextRoot;
			});
		},
		[multiple, editingItemIndex, mergedForFontSlices, $, control]
	);

	const onSelectTargetPreset = useCallback(
		/** @param {{ id: string, selector: string, name: string }} preset */(preset) => {
			if (!preset || typeof preset.selector !== 'string') {
				return;
			}
			const presetId = typeof preset.id === 'string' ? preset.id.trim() : '';
			const presetNm = typeof preset.name === 'string' ? preset.name.trim() : '';
			onBaseSelectorChange(
				preset.selector,
				presetId !== '' ? { elementPresetId: presetId, elementPresetName: presetNm } : undefined
			);
			if (multiple && typeof preset.name === 'string' && preset.name.trim() !== '') {
				onItemTitleChange(preset.name);
			}
		},
		[onBaseSelectorChange, multiple, onItemTitleChange]
	);

	const unknownCount = Object.keys(sliceParsed.unknown).length;
	const sliceKey = `${activeKey}__${deviceId}`;

	useLayoutEffect(() => {
		if (!editorPopoverOpen) {
			setStatesPopoverOpen(false);
			setStatesPopoverAnchor(null);
		}
	}, [editorPopoverOpen]);

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
		cancelPreviewPicker();
		setEditorPopoverOpen(false);
		setStatesPopoverOpen(false);
		setStatesPopoverAnchor(null);
		if (multiple) {
			setEditingItemIndex(null);
			setPendingAddFormOpen(false);
			setPendingAddLockedMessage('');
			setPendingAddCustomOpen(false);
			setPendingCustomSelector('');
			setPendingCustomItemName('');
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
		let itemIndex = null;
		if (multiple) {
			if (pendingAddFormOpen && pendingAddCustomOpen) {
				itemIndex = PENDING_ADD_PICK_ITEM_INDEX;
			} else {
				itemIndex = editingItemIndex;
			}
		}
		previewer.send('onepress-styling-start-pick', {
			controlId: control.id,
			itemIndex,
		});
	}, [control.id, multiple, editingItemIndex, pendingAddFormOpen, pendingAddCustomOpen, cancelPreviewPicker]);

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
		(index) => {
			setPendingAddFormOpen(false);
			setPendingAddLockedMessage('');
			setPendingAddCustomOpen(false);
			setPendingCustomSelector('');
			setPendingCustomItemName('');
			if (editorPopoverOpenRef.current && editingItemIndexRef.current === index) {
				closeEditorPopover();
				return;
			}
			setEditingItemIndex(index);
			setStateIndex(0);
			editorPopoverOpenRef.current = true;
			setEditorPopoverOpen(true);
		},
		[closeEditorPopover]
	);

	const removeItemAt = useCallback(
		(index) => {
			if (!multiple || typeof index !== 'number' || index < 0) {
				return;
			}
			setValue((prevRoot) => {
				if (!Array.isArray(prevRoot?.items) || prevRoot.items.length === 0) {
					return prevRoot;
				}
				if (index >= prevRoot.items.length) {
					return prevRoot;
				}
				const nextRoot = cloneValue(prevRoot);
				nextRoot.items = prevRoot.items.filter((_, i) => i !== index);
				rebuildFontSlicesInValue(nextRoot, mergedForFontSlices);
				pushStylingPayloadToCustomizer($, control, nextRoot);
				return nextRoot;
			});
			const open = editorPopoverOpenRef.current;
			const ei = editingItemIndexRef.current;
			if (open && ei === index) {
				closeEditorPopover();
			} else if (open && ei != null && ei > index) {
				setEditingItemIndex(ei - 1);
			}
		},
		[multiple, mergedForFontSlices, $, control, closeEditorPopover]
	);

	useLayoutEffect(() => {
		removeItemAtRef.current = removeItemAt;
	}, [removeItemAt]);

	const cancelPendingAdd = useCallback(() => {
		setPendingAddFormOpen(false);
		setPendingAddLockedMessage('');
		setPendingAddCustomOpen(false);
		setPendingCustomSelector('');
		setPendingCustomItemName('');
		cancelPreviewPicker();
	}, [cancelPreviewPicker]);

	const startPendingAdd = useCallback(() => {
		if (!multiple || !defaultStylingPayload) {
			return;
		}
		const template = multiItemTemplateRow ? cloneValue(multiItemTemplateRow) : null;
		if (!template || !Array.isArray(value.items)) {
			return;
		}
		if (editorPopoverOpenRef.current) {
			editorPopoverOpenRef.current = false;
			setEditorPopoverOpen(false);
			setEditingItemIndex(null);
			cancelPreviewPicker();
			setStatesPopoverOpen(false);
			setStatesPopoverAnchor(null);
		}
		setPendingAddLockedMessage('');
		setPendingAddCustomOpen(false);
		setPendingCustomSelector('');
		setPendingCustomItemName('');
		setPendingAddFormOpen(true);
	}, [multiple, defaultStylingPayload, multiItemTemplateRow, value, cancelPreviewPicker]);

	const confirmPendingAddWithPreset = useCallback(
		/** @param {{ id: string, selector: string, name: string }} preset */(preset) => {
			if (!preset || typeof preset.selector !== 'string' || !multiple || !defaultStylingPayload) {
				return;
			}
			const sel = preset.selector.trim();
			if (sel === '') {
				return;
			}
			const template = multiItemTemplateRow ? cloneValue(multiItemTemplateRow) : null;
			if (!template || !Array.isArray(value.items)) {
				return;
			}
			const presetId = typeof preset.id === 'string' ? preset.id.trim() : '';
			const newItem = cloneValue(template);
			newItem.id = presetId !== '' ? presetId : `item-${Date.now().toString(36)}`;
			const presetNm = typeof preset.name === 'string' ? preset.name.trim() : '';
			newItem.title = presetNm !== '' ? presetNm : __('New item', 'onepress');
			newItem.selector = sel;
			if (!newItem._meta || typeof newItem._meta !== 'object') {
				newItem._meta = {};
			}
			newItem._meta.baseSelector = sel;
			if (presetId !== '') {
				newItem._meta.elId = presetId;
				if (presetNm !== '') {
					newItem._meta.elName = presetNm;
				} else {
					delete newItem._meta.elName;
				}
			} else {
				delete newItem._meta.elId;
				delete newItem._meta.elName;
			}
			const nextRoot = cloneValue(value);
			nextRoot.items = [...nextRoot.items, newItem];
			const newIndex = nextRoot.items.length - 1;
			commitRoot(nextRoot);
			cancelPendingAdd();
			setEditingItemIndex(newIndex);
			setStateIndex(0);
			editorPopoverOpenRef.current = true;
			setEditorPopoverOpen(true);
		},
		[multiple, defaultStylingPayload, multiItemTemplateRow, value, commitRoot, cancelPendingAdd]
	);

	const confirmPendingAddCustom = useCallback(() => {
		const sel = pendingCustomSelector.trim();
		if (!sel || !multiple || !defaultStylingPayload) {
			return;
		}
		const template = multiItemTemplateRow ? cloneValue(multiItemTemplateRow) : null;
		if (!template || !Array.isArray(value.items)) {
			return;
		}
		const itemId = `cust-${Date.now().toString(36)}`;
		const newItem = cloneValue(template);
		const label =
			pendingCustomItemName.trim() !== '' ? pendingCustomItemName.trim() : __('Custom target', 'onepress');
		newItem.id = itemId;
		newItem.title = label;
		newItem.selector = sel;
		if (!newItem._meta || typeof newItem._meta !== 'object') {
			newItem._meta = {};
		}
		newItem._meta.baseSelector = sel;
		newItem._meta.elId = 'custom_item';
		newItem._meta.elName = label;
		const nextRoot = cloneValue(value);
		nextRoot.items = [...nextRoot.items, newItem];
		const newIndex = nextRoot.items.length - 1;
		commitRoot(nextRoot);
		cancelPendingAdd();
		setEditingItemIndex(newIndex);
		setStateIndex(0);
		editorPopoverOpenRef.current = true;
		setEditorPopoverOpen(true);
	}, [
		pendingCustomSelector,
		pendingCustomItemName,
		multiple,
		defaultStylingPayload,
		multiItemTemplateRow,
		value,
		commitRoot,
		cancelPendingAdd,
	]);

	const handlePendingTargetPreset = useCallback(
		/** @param {Record<string, unknown>} preset */(preset) => {
			if (!preset || typeof preset !== 'object') {
				return;
			}
			if (preset.locked === true) {
				setPendingAddLockedMessage(String(preset.message || ''));
				setPendingAddCustomOpen(false);
				setPendingCustomSelector('');
				setPendingCustomItemName('');
				return;
			}
			if (preset.unlockCustomForm === true) {
				setPendingAddLockedMessage('');
				setPendingAddCustomOpen(true);
				setPendingCustomSelector('');
				setPendingCustomItemName(typeof preset.name === 'string' ? preset.name.trim() : '');
				return;
			}
			setPendingAddLockedMessage('');
			setPendingAddCustomOpen(false);
			setPendingCustomSelector('');
			setPendingCustomItemName('');
			confirmPendingAddWithPreset(
				/** @type {{ id: string, selector: string, name: string }} */(preset)
			);
		},
		[confirmPendingAddWithPreset]
	);

	const onResetToDefault = useCallback(() => {
		if (!defaultStylingPayload) {
			return;
		}
		editorPopoverOpenRef.current = false;
		setStatesPopoverOpen(false);
		setStatesPopoverAnchor(null);
		setEditorPopoverOpen(false);
		setEditingItemIndex(null);
		setStateIndex(0);
		setPendingAddFormOpen(false);
		setPendingAddLockedMessage('');
		setPendingAddCustomOpen(false);
		setPendingCustomSelector('');
		setPendingCustomItemName('');
		let next = cloneValue(defaultStylingPayload);
		if (multiple) {
			// `null` second arg: never fill empty `items` from `control.params.default_value` (PHP may ship `items => []`).
			next = ensureMultiShape(next, null, __('Item 1', 'onepress'));
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
		}
		commitRoot(next);
	}, [
		defaultStylingPayload,
		commitRoot,
		multiple,
		stylingStatesParam,
		previewDeviceIds,
		lockedBaseSelector,
	]);

	const onResetItemToDefault = useCallback(
		(itemIndex) => {
			if (!multiple || !defaultStylingPayload || !Array.isArray(value.items)) {
				return;
			}
			if (!multiItemTemplateRow) {
				return;
			}
			const current = value.items[itemIndex];
			if (!current) {
				return;
			}
			// Empty “shape” (states × devices) from PHP `styling_new_item_template` or first `default_value.items[]` row.
			const template = cloneValue(multiItemTemplateRow);
			template.id = current.id;
			const base = String(current._meta?.baseSelector ?? current.selector ?? '').trim();
			const elId = typeof current._meta?.elId === 'string' ? current._meta.elId.trim() : '';
			const matched = findMatchingTargetPreset(base, elId, targetElementsRegistry);
			const presetSel =
				matched && typeof matched.selector === 'string' ? matched.selector.trim() : '';

			if (presetSel !== '') {
				template.title =
					typeof matched.name === 'string' && matched.name.trim() !== ''
						? matched.name.trim()
						: current.title;
				template.selector = presetSel;
				if (!template._meta || typeof template._meta !== 'object') {
					template._meta = {};
				}
				template._meta.baseSelector = presetSel;
				if (matched.id) {
					template._meta.elId = matched.id;
				}
				if (typeof matched.name === 'string' && matched.name.trim() !== '') {
					template._meta.elName = matched.name.trim();
				} else {
					delete template._meta.elName;
				}
			} else {
				// Custom / non-preset target: clear declarations but keep the same selector + meta identity.
				template.title = current.title;
				const curSel = String(current.selector ?? current._meta?.baseSelector ?? '').trim();
				template.selector = curSel;
				if (!template._meta || typeof template._meta !== 'object') {
					template._meta = {};
				}
				template._meta.baseSelector = curSel;
				if (elId) {
					template._meta.elId = elId;
				} else {
					delete template._meta.elId;
				}
				const en = typeof current._meta?.elName === 'string' ? current._meta.elName.trim() : '';
				if (en) {
					template._meta.elName = en;
				} else {
					delete template._meta.elName;
				}
			}

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
		[
			multiple,
			defaultStylingPayload,
			multiItemTemplateRow,
			value,
			commitRoot,
			editorPopoverOpen,
			editingItemIndex,
			targetElementsRegistry,
		]
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

	const multiItemsEmpty =
		multiple && Array.isArray(value?.items) && value.items.length === 0;

	// Empty multi list has no row to read `_meta.states` from — still show add / reset UI, not this error.
	if (
		!multiItemsEmpty &&
		(!structuralStates.length ||
			!structuralStates[0] ||
			typeof structuralStates[0] !== 'object' ||
			Object.keys(structuralStates[0]).length !== 1)
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
	const settingsPopoverUseful =
		showStatesPopoverButton || multiple || !lockedBaseSelector;
	const legacyHideToolbarActions = control.params.styling_hide_popover_heading === true;
	const hideGearByParam =
		legacyHideToolbarActions || control.params.styling_hide_gear_button === true;
	const hidePreviewPickByParam =
		legacyHideToolbarActions || control.params.styling_hide_preview_pick_button === true;
	const showGearButton = !hideGearByParam && settingsPopoverUseful;
	const showPreviewPickButton = !hidePreviewPickByParam && !lockedBaseSelector;
	const gearButtonLabel = showStatesPopoverButton
		? allowAddRemoveInStatesPopover
			? __('Manage states', 'onepress')
			: __('State settings', 'onepress')
		: __('Settings', 'onepress');
	const showStateTabButtons = stateTabCount > 1;
	const showStatesToolbar = showStateTabButtons || showStatesPopoverButton;

	const hideStateTablist = control.params.styling_hide_state_tablist === true;
	const showStateTablistBlock = showStatesToolbar && !hideStateTablist;
	const tablistVisibleForA11y = showStateTabButtons && !hideStateTablist;

	const inlineEditorProps =
		editorPopoverOpen && editorPayload
			? {
				visibleStylingGroupCount: visibleStylingGroupIds.length,
				showGearButton,
				showPreviewPickButton,
				gearButtonLabel,
				lockedBaseSelector,
				editableBaseSelector,
				allowAddRemoveInStatesPopover,
				showStatesPopoverButton,
				toggleStatesPopover,
				statesPopoverOpen,
				statesPopoverAnchor,
				togglePreviewPicker,
				previewPickerActive,
				manageStatesButtonRef,
				showStateTablistBlock,
				multiple,
				multiItemAwaitingPresetTarget,
				showStateTabButtons,
				statesList,
				stateIndex,
				setStateIndex,
				onStateTabKeyDown,
				stateTabPanelId,
				getStateTabId,
				tablistVisibleForA11y,
				closeStatesPopover,
				commitActiveItem,
				editorPayload,
				previewDeviceIds,
				activeKey,
				onBaseSelectorChange,
				onItemTitleChange,
				metaBaseSelector,
				onSelectTargetPreset,
				sliceParsed,
				unknownCount,
				onPatch,
				sliceKey,
				currentText,
				onChangeText,
				families,
				localManagedFonts,
				mergedForFontSlices,
				fontFamilySource,
				fontsLoading,
				fontsError,
				stylingGroups: control.params.styling_groups,
				disabledFieldSet,
				onCloseEditor: closeEditorPopover,
				targetElementsRegistry,
				usedPresetIds: usedPresetIdsForEditor,
				previewPickerActiveRef,
			}
			: null;

	return (
		<StylingDeviceProvider deviceId={deviceId} setDeviceId={setDeviceIdSynced} breakpoints={breakpoints}>
			<StylingLengthUnitProvider
				preferredSuffix={lengthUnitPreferred}
				onApplyTargetUnit={applyLengthTargetUnit}
				onAdoptSuffixFromValue={adoptLengthSuffixFromField}
			>
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
											variant="secondary"
											onClick={toggleEditorPopover}
											isPressed={editorPopoverOpen}
											aria-expanded={editorPopoverOpen}
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

							{!multiple && inlineEditorProps ? (
								<StylingInlineEditor key="styling-inline-single" {...inlineEditorProps} />
							) : null}

							{multiple ? (
								<div className="onepress-styling-items mt-3">
									{itemsList.length > 0 ? (
										<div className="flex flex-col gap-2">
											{itemsList.map((item, index) => (
												<div
													key={item.id || `idx-${String(index)}`}
													className="onepress-styling-items__row flex flex-col gap-2"
												>
													<div className="styling-list-item flex justify-between items-center gap-2">
														<span className="ilabel grow truncate text-sm"
															onClick={() => toggleEditorForItem(index)}
														>
															{getMultiStylingItemListRowLabel(item, index, targetElementsRegistry)}
														</span>

														<div className="flex gap-1">
															<Button
																variant="tertiary"
																onClick={() => setResetConfirm({ kind: 'item', index })}
																size="small"
																disabled={!defaultStylingPayload}
																label={__('Reset this item to default', 'onepress')}
																showTooltip
																icon={rotateLeft}
																// className='icon-btn'
															>
															</Button>

															<Button
																variant={ editorPopoverOpen && editingItemIndex === index ? 'secondary' : 'tertiary' }
																onClick={() => toggleEditorForItem(index)}
																isPressed={editorPopoverOpen && editingItemIndex === index}
																aria-expanded={editorPopoverOpen && editingItemIndex === index}
																label={__('Edit styling', 'onepress')}
																showTooltip
																size="small"
																// className='icon-btn'
																icon={editorPopoverOpen && editingItemIndex === index ? chevronUp : pencil}
															/>
															<Button
																variant="tertiary"
																onClick={() => {
																	deletePendingIndexRef.current = index;
																	setDeleteItemIndex(index);
																}}
																size="small"
																icon={trash}
																label={__('Remove this item from the list', 'onepress')}
																showTooltip
																isDestructive={true}
																// className="icon-btn"
															>
															</Button>
														</div>
													</div>
													{inlineEditorProps && editingItemIndex === index ? (
														<StylingInlineEditor
															key={item.id || `styling-inline-${String(index)}`}
															{...inlineEditorProps}
														/>
													) : null}
												</div>
											))}
										</div>
									) : null}
									<div className="block mt-2" ref={pendingAddInlineRef}>
										{pendingAddFormOpen ? (
											<div className="onepress-styling-pending-add-inline">
												<div className="onepress-styling-pending-add-inline__picker">
													<div className="enum-label">{__('Target Element', 'onepress')}</div>
													{targetElementsRegistry.elements.length === 0 ? (
														<p className="description">
															{__('No targets are available.', 'onepress')}
														</p>
													) : (
														<>
															<StylingTargetElementSelect
																targetRegistry={targetElementsRegistry}
																currentSelector=""
																currentElId=""
																selectedPresetName=""
																onSelectPreset={handlePendingTargetPreset}
																usedPresetIds={usedPresetIdsSet}
																disabled={Boolean(lockedBaseSelector) || !editableBaseSelector}
															/>
															{pendingAddLockedMessage ? (
																<div
																	className="description mt-2 locked-message"
																	// Sanitized server-side with `wp_kses_post` (preset `message`).
																	dangerouslySetInnerHTML={{ __html: pendingAddLockedMessage }}
																/>
															) : null}
															{pendingAddCustomOpen ? (
																<div className="onepress-styling-pending-custom-target flex flex-col gap-3 mt-3">
																	<TextControl
																		__nextHasNoMarginBottom
																		label={__('Name', 'onepress')}
																		value={pendingCustomItemName}
																		onChange={setPendingCustomItemName}
																		placeholder={__('Label shown in the list', 'onepress')}
																	/>
																	<BaseSelectorField
																		value={pendingCustomSelector}
																		onChange={setPendingCustomSelector}
																		disabled={!editableBaseSelector}
																		togglePreviewPicker={togglePreviewPicker}
																		previewPickerActive={previewPickerActive}
																	/>
																</div>
															) : null}
														</>
													)}
												</div>
												<div className="onepress-styling-pending-add-inline__actions flex flex-wrap gap-2 items-center justify-end">
													<Button variant="secondary" onClick={cancelPendingAdd}>
														{__('Cancel', 'onepress')}
													</Button>
													{pendingAddCustomOpen ? (
														<Button
															variant="primary"
															onClick={confirmPendingAddCustom}
															disabled={pendingCustomSelector.trim() === ''}
														>
															{__('Add', 'onepress')}
														</Button>
													) : null}
												</div>
											</div>
										) : (
											<Button
												variant="secondary"
												className="mt-2"
												onClick={startPendingAdd}
											>
												{addItemLabel}
											</Button>
										)}
									</div>
								</div>
							) : null}

							{controlDescription ? (
								<p className="description mt-2">{controlDescription}</p>
							) : null}
						</div>
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

					<ConfirmDialog
						isOpen={deleteItemIndex !== null}
						onConfirm={() => {
							const index = deletePendingIndexRef.current;
							deletePendingIndexRef.current = null;
							setDeleteItemIndex(null);
							if (index == null || typeof index !== 'number') {
								return;
							}
							const run = removeItemAtRef.current;
							if (typeof run === 'function') {
								run(index);
							}
						}}
						onCancel={() => {
							deletePendingIndexRef.current = null;
							setDeleteItemIndex(null);
						}}
						confirmButtonText={__('Delete', 'onepress')}
						cancelButtonText={__('Cancel', 'onepress')}
					>
						{deleteItemIndex !== null ? (
							<p>
								{sprintf(
									/* translators: %s: item label */
									__(
										'Remove "%s" from this list? This target and its styling will be deleted.',
										'onepress'
									),
									String(
										value.items?.[deleteItemIndex]
											? value.items[deleteItemIndex].title || value.items[deleteItemIndex].id
											: __('this item', 'onepress')
									)
								)}
							</p>
						) : null}
					</ConfirmDialog>
				</>
			</StylingLengthUnitProvider>
		</StylingDeviceProvider>
	);
}
