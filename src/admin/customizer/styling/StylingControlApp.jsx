/**
 * Customizer control `styling`: state tabs + accordion groups; device via icons on responsive fields.
 */
import { Button, ButtonGroup, Icon, Popover, TextControl } from '@wordpress/components';
import { settings, pencil, rotateLeft } from '@wordpress/icons';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	bindCustomizerPreviewDevice,
	getCustomizerPreviewDevice,
	syncCustomizerPreviewDevice,
} from './customizerPreviewDeviceSync';
import { parseDeclarationForm, patchDeclarationForm } from './declarationForm';
import { StylingDeviceProvider } from './components';
import { StylingAccordionPanels } from './StylingAccordionPanels';
import { rebuildFontSlicesInValue } from './stylingGoogleFonts';
import { useGoogleFontFamilies } from './useGoogleFontFamilies';
import { StylingStatesPopover } from './components/StylingStatesPopover';

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
 * @param {object} props
 * @param {import('@wordpress/customize').Control} props.control
 * @param {JQueryStatic} props.$
 */
export function StylingControlApp({ control, $ }) {
	const previewDeviceIds = useMemo(() => {
		const fromPhp = control.params.preview_device_ids;
		if (Array.isArray(fromPhp) && fromPhp.length) {
			return fromPhp.map(String);
		}
		return ['desktop', 'tablet', 'mobile'];
	}, [control.params.preview_device_ids]);

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
	const [statesPopoverOpen, setStatesPopoverOpen] = useState(false);
	const [statesPopoverAnchor, setStatesPopoverAnchor] = useState(null);
	const manageStatesButtonRef = useRef(null);
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
	const [value, setValue] = useState(() => cloneValue(control.params.value || {}));
	const { families, loading: fontsLoading, error: fontsError } = useGoogleFontFamilies();

	const statesList = useMemo(() => {
		const meta = value && value._meta;
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
	}, [value]);

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

	const metaBaseSelector = useMemo(() => {
		const meta = value?._meta;
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
	}, [value]);

	const commit = useCallback(
		(next) => {
			rebuildFontSlicesInValue(next, families);
			setValue(next);
			pushStylingPayloadToCustomizer($, control, next);
		},
		[$, control, families]
	);

	useEffect(() => {
		if (fontsLoading) {
			return;
		}
		setValue((prev) => {
			const next = cloneValue(prev);
			rebuildFontSlicesInValue(next, families);
			const a = JSON.stringify(prev._meta?.fontSlices ?? null);
			const b = JSON.stringify(next._meta?.fontSlices ?? null);
			if (a === b) {
				return prev;
			}
			pushStylingPayloadToCustomizer($, control, next);
			return next;
		});
	}, [fontsLoading, families, $, control]);

	const currentText =
		activeKey &&
			value[activeKey] &&
			typeof value[activeKey] === 'object' &&
			value[activeKey][deviceId] != null
			? String(value[activeKey][deviceId])
			: '';

	const sliceParsed = useMemo(() => parseDeclarationForm(currentText), [currentText]);

	const onChangeText = useCallback(
		(text) => {
			if (!activeKey) {
				return;
			}
			const next = cloneValue(value);
			if (!next[activeKey] || typeof next[activeKey] !== 'object') {
				next[activeKey] = {};
			}
			next[activeKey][deviceId] = text;
			commit(next);
		},
		[value, activeKey, deviceId, commit]
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
			const next = cloneValue(value);
			if (!next._meta) {
				next._meta = {};
			}
			const trimmed = String(nextBase ?? '').trim();
			next._meta.baseSelector = trimmed === '' ? '.' : trimmed;
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
			commit(next);
		},
		[value, commit]
	);

	const unknownCount = Object.keys(sliceParsed.unknown).length;
	const sliceKey = `${activeKey}__${deviceId}`;

	useLayoutEffect(() => {
		if (!editorPopoverOpen) {
			setEditorPopoverAnchor(null);
			setStatesPopoverOpen(false);
			setStatesPopoverAnchor(null);
			return;
		}
		setEditorPopoverAnchor(editButtonRef.current);
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

	const toggleEditorPopover = useCallback(() => {
		setEditorPopoverOpen((o) => !o);
	}, []);

	const closeEditorPopover = useCallback(() => {
		setEditorPopoverOpen(false);
		setStatesPopoverOpen(false);
		setStatesPopoverAnchor(null);
	}, []);

	const onResetToDefault = useCallback(() => {
		if (!defaultStylingPayload) {
			return;
		}
		setStatesPopoverOpen(false);
		setStatesPopoverAnchor(null);
		setEditorPopoverOpen(false);
		setEditorPopoverAnchor(null);
		setStateIndex(0);
		commit(cloneValue(defaultStylingPayload));
	}, [defaultStylingPayload, commit]);

	if (!activeState || !activeKey) {
		return (
			<p className="description">
				{__('Invalid styling configuration (no states). Save to reset defaults.', 'onepress')}
			</p>
		);
	}

	return (
		<StylingDeviceProvider deviceId={deviceId} setDeviceId={setDeviceIdSynced} breakpoints={breakpoints}>
			<div className="editor">
				<div className="onepress-styling-control-intro">
					<div className='w-full flex justify-between items-center'>
						<span className="grow customize-control-title">{controlLabel}</span>
						<div className='flex gap-2'>
							<Button
								variant="secondary"
								onClick={onResetToDefault}
								disabled={!defaultStylingPayload}
								label={__('Reset to default', 'onepress')}
								showTooltip
							>
								<Icon icon={rotateLeft} size={20} />
							</Button>
							<Button
								ref={editButtonRef}
								variant="secondary"
								onClick={toggleEditorPopover}
								isPressed={editorPopoverOpen}
								aria-expanded={editorPopoverOpen}
								aria-haspopup="dialog"
								label={__('Edit styling', 'onepress')}
								showTooltip
							>
								<Icon icon={pencil} size={20} />
							</Button>
						</div>
					</div>

					<p className="description customize-control-description">{controlDescription}</p>
				</div>

				{editorPopoverOpen && editorPopoverAnchor ? (
					<Popover
						anchor={editorPopoverAnchor}
						onClose={closeEditorPopover}
						placement="bottom-end"
						offset={8}
						className="onepress-styling-editor-popover"
						focusOnMount="firstElement"
						shift
					>
						<div className="onepress-styling-editor-popover__inner">
							<p className="onepress-styling-editor-popover__title">{__('Edit styling', 'onepress')}</p>
							<div className="onepress-styling styling-root">
								<div className="states">
									<div className="states-toolbar flex flex gap-2 justify-between items-center">
										<ButtonGroup>
											{statesList.map((s, i) => (
												<Button
													key={s.key}
													variant={i === stateIndex ? 'primary' : 'secondary'}
													onClick={() => setStateIndex(i)}
												>
													{s.label}
												</Button>
											))}
										</ButtonGroup>
										<Button
											ref={manageStatesButtonRef}
											className="onepress-styling-manage-states"
											variant="secondary"
											onClick={toggleStatesPopover}
											aria-expanded={statesPopoverOpen}
											aria-haspopup="dialog"
											label={__('Manage states', 'onepress')}
											showTooltip
										>
											<Icon icon={settings} size={20} />
										</Button>
									</div>
								</div>

								<StylingStatesPopover
									anchor={statesPopoverAnchor}
									isOpen={statesPopoverOpen}
									onClose={closeStatesPopover}
									value={value}
									commit={commit}
									previewDeviceIds={previewDeviceIds}
									activeStateKey={activeKey}
									setStateIndex={setStateIndex}
								/>

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
								/>

								<TextControl
									__nextHasNoMarginBottom
									className="styling-selector-field"
									label={__('Base CSS selector', 'onepress')}
									help={__(
										'Rules apply to this target. Each state can add a suffix (e.g. :hover) in its settings or below when that tab is active.',
										'onepress'
									)}
									value={metaBaseSelector}
									onChange={onBaseSelectorChange}
									autoComplete="off"
									spellCheck={false}
								/>
							</div>
						</div>
					</Popover>
				) : null}
			</div>
		</StylingDeviceProvider>
	);
}
