/**
 * Background Customizer control — states × responsive layers, inline dropdown below state row.
 */
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import {
	Button,
	ColorPicker,
	GradientPicker,
	SelectControl,
	TabPanel,
	Tooltip,
} from '@wordpress/components';
import {
	CustomizerPreviewDeviceButtons,
	getCustomizerPreviewDeviceDefinitions,
} from '../CustomizerPreviewDeviceButtons.jsx';
import {
	createDefaultLayer,
	DEFAULT_BACKGROUND_COLOR,
	DEFAULT_BACKGROUND_GRADIENT,
	declarationsToReactStyle,
	layerToDeclarations,
	STATE_PSEUDO,
} from './buildBackgroundCss.js';
import { getCustomizeControlDefaultRaw } from '../getCustomizeControlDefaultRaw.js';

const PREVIEW_DEVICES = ['desktop', 'tablet', 'mobile'];

const DEVICE_LABELS = {
	desktop: __('Desktop', 'onepress'),
	tablet: __('Tablet', 'onepress'),
	mobile: __('Mobile', 'onepress'),
};

const STATE_LABELS = {
	normal: __('Normal', 'onepress'),
	hover: __('Hover', 'onepress'),
	focus: __('Focus', 'onepress'),
	focus_visible: __('Focus visible', 'onepress'),
	focusVisible: __('Focus visible', 'onepress'),
	active: __('Active', 'onepress'),
	visited: __('Visited', 'onepress'),
};

const IMAGE_SIZES = [
	{ label: __('Cover', 'onepress'), value: 'cover' },
	{ label: __('Contain', 'onepress'), value: 'contain' },
	{ label: __('Auto', 'onepress'), value: 'auto' },
];

const IMAGE_REPEATS = [
	{ label: __('No repeat', 'onepress'), value: 'no-repeat' },
	{ label: __('Repeat', 'onepress'), value: 'repeat' },
	{ label: __('Repeat X', 'onepress'), value: 'repeat-x' },
	{ label: __('Repeat Y', 'onepress'), value: 'repeat-y' },
	{ label: __('Space', 'onepress'), value: 'space' },
	{ label: __('Round', 'onepress'), value: 'round' },
];

const IMAGE_POSITIONS = [
	{ label: __('Center', 'onepress'), value: 'center center' },
	{ label: __('Top', 'onepress'), value: 'center top' },
	{ label: __('Bottom', 'onepress'), value: 'center bottom' },
	{ label: __('Left', 'onepress'), value: 'left center' },
	{ label: __('Right', 'onepress'), value: 'right center' },
	{ label: __('Top left', 'onepress'), value: 'left top' },
	{ label: __('Top right', 'onepress'), value: 'right top' },
	{ label: __('Bottom left', 'onepress'), value: 'left bottom' },
	{ label: __('Bottom right', 'onepress'), value: 'right bottom' },
];

const ATTACHMENTS = [
	{ label: __('Scroll', 'onepress'), value: 'scroll' },
	{ label: __('Fixed', 'onepress'), value: 'fixed' },
	{ label: __('Local', 'onepress'), value: 'local' },
];

/**
 * @param {object} params control.params from PHP
 * @returns {{ selector: string, selectorsByState: Record<string, string>|null, states: string[], stateLabels: Record<string, string> }}
 */
function parseBackgroundControlMeta(params) {
	const known = new Set(Object.keys(STATE_PSEUDO));
	let stateList = ['normal', 'hover'];
	const stateLabels = {};
	const sp = params?.states;

	if (Array.isArray(sp) && sp.length) {
		stateList = sp.filter((k) => known.has(k));
		if (!stateList.length) {
			stateList = ['normal', 'hover'];
		}
	} else if (sp && typeof sp === 'object') {
		stateList = [];
		for (const k of Object.keys(sp)) {
			if (known.has(k)) {
				stateList.push(k);
				const lab = sp[k];
				if (lab != null && String(lab).trim()) {
					stateLabels[k] = String(lab).trim();
				}
			}
		}
		if (!stateList.length) {
			stateList = ['normal', 'hover'];
		}
	}

	let selectorStr =
		typeof params?.selector === 'string' ? params.selector.trim() : '';
	const rawMap =
		params?.selectors_by_state || params?.selectorsByState || null;
	let selectorsByState = null;
	if (rawMap && typeof rawMap === 'object' && !Array.isArray(rawMap)) {
		selectorsByState = {};
		for (const k of Object.keys(rawMap)) {
			if (!known.has(k)) {
				continue;
			}
			const v = String(rawMap[k] ?? '').trim();
			if (v) {
				selectorsByState[k] = v;
			}
		}
		if (!Object.keys(selectorsByState).length) {
			selectorsByState = null;
		}
	}
	if (!selectorStr && selectorsByState) {
		selectorStr =
			(selectorsByState.normal ||
				stateList.map((s) => selectorsByState[s]).find(Boolean) ||
				'').trim();
	}

	const sl = params?.state_labels || params?.stateLabels;
	if (sl && typeof sl === 'object' && !Array.isArray(sl)) {
		for (const k of Object.keys(sl)) {
			if (known.has(k) && sl[k] != null && String(sl[k]).trim()) {
				stateLabels[k] = String(sl[k]).trim();
			}
		}
	}

	return {
		selector: selectorStr,
		selectorsByState,
		states: stateList,
		stateLabels,
	};
}

/**
 * @param {{ selector: string, selectorsByState: object|null, states: string[], stateLabels: Record<string, string> }} meta
 */
function createEmptyData(meta) {
	const { selector, selectorsByState, states, stateLabels } = meta;
	const data = {
		_onepressBackground: true,
		_meta: {
			selector: String(selector || '').trim(),
			states: [...states],
		},
	};
	if (selectorsByState && Object.keys(selectorsByState).length) {
		data._meta.selectorsByState = { ...selectorsByState };
	}
	if (stateLabels && Object.keys(stateLabels).length) {
		data._meta.stateLabels = { ...stateLabels };
	}
	for (const s of states) {
		data[s] = {
			desktop: createDefaultLayer(),
			tablet: createDefaultLayer(),
			mobile: createDefaultLayer(),
		};
	}
	return data;
}

/**
 * @param {object|null} saved
 * @param {{ selector: string, selectorsByState: object|null, states: string[], stateLabels: Record<string, string> }} meta
 */
function mergeSavedData(saved, meta) {
	const base = createEmptyData(meta);
	if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
		return base;
	}
	for (const s of meta.states) {
		if (!saved[s] || typeof saved[s] !== 'object') {
			continue;
		}
		for (const d of PREVIEW_DEVICES) {
			if (saved[s][d] && typeof saved[s][d] === 'object') {
				base[s][d] = { ...createDefaultLayer(), ...saved[s][d] };
			}
		}
	}
	return base;
}

/**
 * @param {object} props
 */
function BackgroundLayerEditor({ layer, onChangeLayer, labels }) {
	const tab = layer.tab || 'color';
	const colorVal =
		layer.color && String(layer.color).trim()
			? layer.color
			: '#ffffffff';

	const pickImage = useCallback(() => {
		if (typeof window === 'undefined' || !window.wp?.media) {
			return;
		}
		const frame = window.wp.media({
			title: __('Select background image', 'onepress'),
			button: { text: __('Use this image', 'onepress') },
			multiple: false,
		});
		frame.on('select', () => {
			const att = frame.state().get('selection').first().toJSON();
			const url = att.url || '';
			onChangeLayer({
				tab: 'image',
				imageId: att.id || 0,
				imageUrl: url,
			});
		});
		frame.open();
	}, [onChangeLayer]);

	const clearImage = useCallback(() => {
		onChangeLayer({
			imageId: 0,
			imageUrl: '',
		});
	}, [onChangeLayer]);

	const gradientValue =
		layer.gradient && String(layer.gradient).trim()
			? layer.gradient
			: undefined;

	const onTabSelect = useCallback(
		(name) => {
			if (name === 'gradient') {
				const hasG =
					layer.gradient && String(layer.gradient).trim();
				onChangeLayer(
					hasG
						? { tab: 'gradient' }
						: {
							tab: 'gradient',
							gradient: DEFAULT_BACKGROUND_GRADIENT,
						}
				);
				return;
			}
			if (name === 'color') {
				const hasC = layer.color && String(layer.color).trim();
				onChangeLayer(
					hasC
						? { tab: 'color' }
						: {
							tab: 'color',
							color: DEFAULT_BACKGROUND_COLOR,
						}
				);
				return;
			}
			onChangeLayer({ tab: name });
		},
		[layer.color, layer.gradient, onChangeLayer]
	);

	return (
		<TabPanel
			className="onepress-bg-popover__tabs"
			activeClass="is-active"
			tabs={[
				{ name: 'color', title: labels.color },
				{ name: 'gradient', title: labels.gradient },
				{ name: 'image', title: labels.image },
			]}
			initialTabName={tab}
			onSelect={onTabSelect}
		>
			{(tabItem) => (
				<div className="onepress-bg-popover__panel">
					{tabItem.name === 'color' && (
						<div className="onepress-bg-color-panel">
							<ColorPicker
								enableAlpha
								color={colorVal}
								onChange={(hex) =>
									onChangeLayer({
										tab: 'color',
										color: hex,
									})
								}
								style={{
									width: '100%',
									padding: '0',
									margin: '0px',
								}}
							/>
							<Button
								variant="tertiary"
								style={{
									width: '100%',
									padding: '0',
								}}
								onClick={() =>
									onChangeLayer({
										tab: 'color',
										color: '',
									})
								}
							>
								{__('Clear color', 'onepress')}
							</Button>
						</div>
					)}
					{tabItem.name === 'gradient' && (
						<GradientPicker
							value={
								gradientValue || DEFAULT_BACKGROUND_GRADIENT
							}
							onChange={(current) =>
								onChangeLayer({
									tab: 'gradient',
									gradient: current || '',
								})
							}
							clearable
							gradients={[]}
							disableCustomGradients={false}
							aria-label={labels.gradient}
						/>
					)}
					{tabItem.name === 'image' && (
						<div className="onepress-bg-image-panel">

							{layer.imageUrl ? (
								<img
									className="onepress-bg-image-panel__thumb"
									src={layer.imageUrl}
									alt=""
								/>
							) : null}

							<div className="onepress-bg-image-panel__actions">
								{layer.imageUrl ? <>
									<Button variant="secondary" onClick={pickImage}>
										{layer.imageUrl
											? __('Replace image', 'onepress')
											: __('Select image', 'onepress')}
									</Button>
									{layer.imageUrl ? (
										<Button variant="tertiary" onClick={clearImage}>
											{__('Remove', 'onepress')}
										</Button>
									) : null}
								</> : <>
									<Button variant="secondary" className='w-full text-center' onClick={pickImage}>
										{__('Select image', 'onepress')}
									</Button>
								</>}
							</div>

							{layer.imageUrl && String(layer.imageUrl).trim() ? (
								<>
									<SelectControl
										label={__('Size', 'onepress')}
										value={layer.size || 'cover'}
										options={IMAGE_SIZES}
										onChange={(v) => onChangeLayer({ size: v })}
									/>
									<SelectControl
										label={__('Repeat', 'onepress')}
										value={layer.repeat || 'no-repeat'}
										options={IMAGE_REPEATS}
										onChange={(v) => onChangeLayer({ repeat: v })}
									/>
									<SelectControl
										label={__('Position', 'onepress')}
										value={layer.position || 'center center'}
										options={IMAGE_POSITIONS}
										onChange={(v) => onChangeLayer({ position: v })}
									/>
									<SelectControl
										label={__('Attachment', 'onepress')}
										value={layer.attachment || 'scroll'}
										options={ATTACHMENTS}
										onChange={(v) => onChangeLayer({ attachment: v })}
									/>
								</>
							) : null}
						</div>
					)}
				</div>
			)
			}
		</TabPanel >
	);
}

/**
 * @param {{ control: object }} props
 */
export function BackgroundControlApp({ control }) {
	const controlId = control.id || 'bg';
	const params = control.params || {};
	const controlLabel =
		typeof params.label === 'string' && params.label.trim()
			? params.label.trim()
			: '';
	const controlDescription =
		typeof params.description === 'string' && params.description.trim()
			? params.description
			: '';
	const bgMeta = useMemo(
		() => parseBackgroundControlMeta(params),
		[params]
	);

	const labels = {
		color: __('Color', 'onepress'),
		gradient: __('Gradient', 'onepress'),
		image: __('Image', 'onepress'),
		state: __('State', 'onepress'),
		...(params.labels || {}),
	};

	const settingRef = useRef(null);
	settingRef.current = control.setting || control.settings?.default;

	const rawInitial =
		(typeof control.setting?.get === 'function'
			? control.setting.get()
			: null) ?? params.value ?? '';

	let parsed = null;
	try {
		parsed =
			typeof rawInitial === 'string' && rawInitial.trim()
				? JSON.parse(rawInitial)
				: null;
	} catch {
		parsed = null;
	}

	const [data, setData] = useState(() =>
		mergeSavedData(parsed, parseBackgroundControlMeta(params))
	);

	const [previewDevice, setPreviewDevice] = useState('desktop');
	const [activeState, setActiveState] = useState(null);
	const toolbarRef = useRef(null);
	const dropdownPanelRef = useRef(null);
	const dropdownOpen = activeState != null;

	const selectPreviewDevice = useCallback((device) => {
		if (
			typeof window !== 'undefined' &&
			window.wp?.customize?.previewedDevice
		) {
			window.wp.customize.previewedDevice.set(device);
		} else {
			setPreviewDevice(device);
		}
	}, []);

	useEffect(() => {
		const api =
			typeof window !== 'undefined' && window.wp?.customize;
		if (!api?.previewedDevice) {
			return undefined;
		}
		const handler = (device) => {
			if (PREVIEW_DEVICES.includes(device)) {
				setPreviewDevice(device);
			}
		};
		api.previewedDevice.bind(handler);
		const current = api.previewedDevice.get();
		if (PREVIEW_DEVICES.includes(current)) {
			setPreviewDevice(current);
		}
		return () => {
			api.previewedDevice.unbind(handler);
		};
	}, []);

	const patchLayer = useCallback((stateKey, device, partial) => {
		setData((prev) => ({
			...prev,
			[stateKey]: {
				...prev[stateKey],
				[device]: {
					...prev[stateKey][device],
					...partial,
				},
			},
		}));
	}, []);

	const currentLayer =
		activeState && data[activeState]
			? data[activeState][previewDevice] || createDefaultLayer()
			: createDefaultLayer();

	const changeCurrentLayer = useCallback(
		(partial) => {
			if (activeState == null) {
				return;
			}
			patchLayer(activeState, previewDevice, partial);
		},
		[activeState, previewDevice, patchLayer]
	);

	useEffect(() => {
		const merged = {
			...data,
			_onepressBackground: true,
			_meta: {
				selector: bgMeta.selector,
				states: [...bgMeta.states],
				...(bgMeta.selectorsByState
					? { selectorsByState: { ...bgMeta.selectorsByState } }
					: {}),
				...(Object.keys(bgMeta.stateLabels).length
					? { stateLabels: { ...bgMeta.stateLabels } }
					: {}),
			},
		};
		const json = JSON.stringify(merged);
		const setting = settingRef.current;
		if (setting && typeof setting.set === 'function') {
			setting.set(json);
		}
	}, [data, bgMeta]);

	const popoverTitle =
		activeState != null
			? sprintf(
				/* translators: 1: state label, 2: device label */
				__('%1$s · %2$s', 'onepress'),
				bgMeta.stateLabels[activeState] ||
				STATE_LABELS[activeState] ||
				activeState,
				DEVICE_LABELS[previewDevice] || previewDevice
			)
			: '';

	const closeDropdown = useCallback(() => {
		setActiveState(null);
	}, []);

	const onStateButtonClick = useCallback(
		(stateKey) => {
			if (activeState === stateKey) {
				closeDropdown();
				return;
			}
			setActiveState(stateKey);
		},
		[activeState, closeDropdown]
	);

	useEffect(() => {
		if (!dropdownOpen) {
			return undefined;
		}
		const onKey = (e) => {
			if (e.key === 'Escape') {
				closeDropdown();
			}
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [dropdownOpen, closeDropdown]);

	useEffect(() => {
		if (!dropdownOpen) {
			return undefined;
		}
		const isOutsideKeepOpen = (t) => {
			if (!t || typeof t.closest !== 'function') {
				return false;
			}
			// wp.components portals — must not close while using pickers / modals.
			if (
				t.closest('.components-popover') ||
				t.closest('.components-modal__frame') ||
				t.closest('.components-modal__screen-overlay') ||
				t.closest('.media-modal')
			) {
				return false;
			}
			if (toolbarRef.current?.contains(t)) {
				return false;
			}
			if (dropdownPanelRef.current?.contains(t)) {
				return false;
			}
			return true;
		};
		const onDocDown = (e) => {
			if (!isOutsideKeepOpen(e.target)) {
				return;
			}
			closeDropdown();
		};
		// Capture so we still run if inner handlers stop propagation; pointerdown covers pen/touch.
		document.addEventListener('pointerdown', onDocDown, true);
		return () =>
			document.removeEventListener('pointerdown', onDocDown, true);
	}, [dropdownOpen, closeDropdown]);

	const resetToDefault = useCallback(() => {
		const raw = getCustomizeControlDefaultRaw(control);
		let nextParsed = null;
		try {
			nextParsed = raw && String(raw).trim() ? JSON.parse(raw) : null;
		} catch {
			nextParsed = null;
		}
		setData(mergeSavedData(nextParsed, bgMeta));
	}, [control, bgMeta]);

	return (
		<div
			className={
				'onepress-bg-control-root' +
				(dropdownOpen ? ' onepress-bg-control-root--open' : '')
			}
		>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-1'>
					<div className='title'>
						{controlLabel ? (
							<span className="customize-control-title">{controlLabel}</span>
						) : null}
					</div>

					<CustomizerPreviewDeviceButtons
						devices={getCustomizerPreviewDeviceDefinitions({
							labels: 'short',
						})}
						activeDevice={previewDevice}
						onSelectDevice={selectPreviewDevice}
						groupClassName="onepress-bg-app__devices"
						buttonClassName="onepress-bg-app__device-btn"
					/>
				</div>

				<div className='relative items flex gap-1 items-center'>
					<button
						type="button"
						className="onepress-customizer-reset-default"
						onClick={resetToDefault}
						aria-label={__('Reset to default', 'onepress')}
						title={__('Reset to default', 'onepress')}
					>
						<span
							className="dashicons dashicons-image-rotate"
							aria-hidden
						/>
					</button>
					<div className="bg-states flex gap-1 items-center" role="group" aria-label={labels.state}>
						{bgMeta.states.map((s) => {
							const previewLayer =
								data[s]?.[previewDevice] || createDefaultLayer();
							const previewDecls = layerToDeclarations(previewLayer);
							const previewFillStyle = declarationsToReactStyle(previewDecls);
							const imageTabNoUrl =
								(previewLayer.tab || 'color') === 'image' &&
								!(
									previewLayer.imageUrl &&
									String(previewLayer.imageUrl).trim()
								);
							const fillEmpty = !previewFillStyle || imageTabNoUrl;
							return (
								<Tooltip
									text={
										bgMeta.stateLabels[s] ||
										STATE_LABELS[s] ||
										s
									}
									placement="top"
								>
									<span
										key={s}
										className={
											'onepress-bg-app__state-btn' +
											(activeState === s ? ' is-active' : '')
										}
										aria-pressed={activeState === s}
										aria-expanded={activeState === s}
										aria-haspopup="dialog"
										aria-controls={
											activeState === s
												? `onepress-bg-dropdown-${controlId}`
												: undefined
										}
										onClick={() => onStateButtonClick(s)}
									>
										<span
											className={
												'onepress-bg-app__state-btn__fill' +
												(fillEmpty
													? ' onepress-bg-app__state-btn__fill--empty'
													: '')
											}
											style={
												imageTabNoUrl
													? undefined
													: previewFillStyle || undefined
											}
											aria-hidden
										/>
										<span className="onepress-bg-app__state-btn__label">

										</span>
									</span>
								</Tooltip>
							);
						})}
					</div>

					{dropdownOpen ? (
						<div
							ref={dropdownPanelRef}
							id={`onepress-bg-dropdown-${controlId}`}
							className="onepress-bg-settings-dropdown onepress-bg-portal"
							role="dialog"
							aria-modal="false"
							aria-label={popoverTitle}
						>
							<div className="onepress-bg-popover">
								{/* <div className="onepress-bg-popover__head">
										<strong className="onepress-bg-popover__title">
											{popoverTitle}
										</strong>
									</div> */}
								<BackgroundLayerEditor
									key={`${activeState}-${previewDevice}`}
									layer={currentLayer}
									onChangeLayer={changeCurrentLayer}
									labels={labels}
								/>
							</div>
						</div>
					) : null}

				</div>


			</div>

			{controlDescription ? (
				<span
					className="description customize-control-description"
					dangerouslySetInnerHTML={{ __html: controlDescription }}
				/>
			) : null}

		</div>
	);
}
