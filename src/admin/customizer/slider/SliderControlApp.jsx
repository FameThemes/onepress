/**
 * Responsive slider Customizer control — single CSS length (slider + number).
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
	CustomizerPreviewDeviceButtons,
	getCustomizerPreviewDeviceDefinitions,
} from '../CustomizerPreviewDeviceButtons.jsx';
import { CustomizerUnitSelectPopover } from '../CustomizerUnitSelectPopover.jsx';
import { getCustomizeControlDefaultRaw } from '../getCustomizeControlDefaultRaw.js';

const SIZE_UNITS = ['px', 'em', 'rem', '%'];
const PREVIEW_DEVICES = ['desktop', 'tablet', 'mobile'];

const DEVICE_KEY = {
	desktop: '',
	tablet: 'Tablet',
	mobile: 'Mobile',
};

/**
 * @param {string} raw
 * @returns {object}
 */
function parseSliderState(raw) {
	const base = {
		value: '',
		valueTablet: '',
		valueMobile: '',
		unit: 'px',
		unitTablet: 'px',
		unitMobile: 'px',
	};
	if (!raw || typeof raw !== 'string' || !raw.trim()) {
		return base;
	}
	try {
		const o = JSON.parse(raw);
		if (!o || typeof o !== 'object') {
			return base;
		}
		return {
			...base,
			value: o.value != null ? String(o.value) : '',
			valueTablet: o.valueTablet != null ? String(o.valueTablet) : '',
			valueMobile: o.valueMobile != null ? String(o.valueMobile) : '',
			unit: SIZE_UNITS.includes(String(o.unit || '').toLowerCase())
				? String(o.unit).toLowerCase()
				: 'px',
			unitTablet: SIZE_UNITS.includes(
				String(o.unitTablet || o.unit || '').toLowerCase()
			)
				? String(o.unitTablet || o.unit || 'px').toLowerCase()
				: 'px',
			unitMobile: SIZE_UNITS.includes(
				String(o.unitMobile || o.unit || '').toLowerCase()
			)
				? String(o.unitMobile || o.unit || 'px').toLowerCase()
				: 'px',
		};
	} catch {
		return base;
	}
}

/**
 * @param {import('@wordpress/element').RefObject} settingRef
 * @param {object} state
 */
function useSliderSync(settingRef, state) {
	useEffect(() => {
		const setting = settingRef.current;
		if (setting && typeof setting.set === 'function') {
			setting.set(JSON.stringify(state));
		}
	}, [state, settingRef]);
}

/**
 * @param {object} props
 */
export function SliderControlApp({ control }) {
	const params = control.params || {};
	const controlLabel =
		typeof params.label === 'string' && params.label.trim()
			? params.label.trim()
			: '';
	const controlDescription =
		typeof params.description === 'string' && params.description.trim()
			? params.description
			: '';

	const sliderMin = Number.isFinite(Number(params.slider_min))
		? Number(params.slider_min)
		: 0;
	const sliderMax = Number.isFinite(Number(params.slider_max))
		? Number(params.slider_max)
		: 500;
	const sliderStep = Number.isFinite(Number(params.slider_step))
		? Number(params.slider_step)
		: 1;

	const labels = {
		unit: __('Unit', 'onepress'),
		...(params.labels || {}),
	};

	const settingRef = useRef(null);
	settingRef.current = control.setting || control.settings?.default;

	const rawInitial =
		(typeof control.setting?.get === 'function'
			? control.setting.get()
			: null) ?? params.value ?? '';

	const [state, setState] = useState(() =>
		parseSliderState(
			typeof rawInitial === 'string' ? rawInitial : ''
		)
	);
	const [previewDevice, setPreviewDevice] = useState('desktop');

	const patch = useCallback((partial) => {
		setState((prev) => ({ ...prev, ...partial }));
	}, []);

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

	useSliderSync(settingRef, state);

	const dev = PREVIEW_DEVICES.includes(previewDevice)
		? previewDevice
		: 'desktop';
	const dSuffix = DEVICE_KEY[dev];
	const valueKey = dSuffix ? `value${dSuffix}` : 'value';
	const unitKey = dSuffix ? `unit${dSuffix}` : 'unit';

	const currentValue = state[valueKey] ?? '';
	const currentUnit = state[unitKey] || 'px';

	const clampNumeric = useCallback(
		(raw) => {
			const s = raw === '' || raw == null ? '' : String(raw).trim();
			if (s === '') {
				return '';
			}
			const n = Number(s);
			if (Number.isNaN(n)) {
				return '';
			}
			const c = Math.min(sliderMax, Math.max(sliderMin, n));
			if (sliderStep >= 1) {
				return String(Math.round(c / sliderStep) * sliderStep);
			}
			const decimals = String(sliderStep).split('.')[1]?.length ?? 0;
			return String(Number(c.toFixed(decimals)));
		},
		[sliderMin, sliderMax, sliderStep]
	);

	const rangeDisplayValue = useMemo(() => {
		const n = Number(currentValue);
		if (currentValue === '' || Number.isNaN(n)) {
			return sliderMin;
		}
		return Math.min(sliderMax, Math.max(sliderMin, n));
	}, [currentValue, sliderMin, sliderMax]);

	const setValueForDevice = useCallback(
		(nextRaw) => {
			const clamped = clampNumeric(nextRaw);
			patch({ [valueKey]: clamped });
		},
		[clampNumeric, patch, valueKey]
	);

	const resetToDefault = useCallback(() => {
		const raw = getCustomizeControlDefaultRaw(control);
		let str = '';
		if (raw != null && typeof raw === 'string') {
			str = raw;
		} else if (raw != null && typeof raw === 'object') {
			try {
				str = JSON.stringify(raw);
			} catch {
				str = '';
			}
		}
		setState(parseSliderState(str));
	}, [control]);

	const valueInputId = useMemo(
		() => `onepress-slider-num-${control.id || 'slider'}`.replace(/[^a-zA-Z0-9_-]/g, '-'),
		[control.id]
	);

	return (
		<div className="onepress-slider-control-root">
			<div className="onepress-slider-control-root__head flex justify-between items-center w-full">
				<div className="flex items-center gap-1">
					<div className="title">
						{controlLabel ? (
							<span className="customize-control-title">
								{controlLabel}
							</span>
						) : null}
					</div>
					<CustomizerPreviewDeviceButtons
						devices={getCustomizerPreviewDeviceDefinitions()}
						activeDevice={previewDevice}
						onSelectDevice={selectPreviewDevice}
						groupClassName="onepress-spacing-app__devices"
						buttonClassName="onepress-spacing-app__device-btn"
					/>
				</div>
				<div className="flex items-center gap-1">
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
					<div className="onepress-slider-app__unit">
						<CustomizerUnitSelectPopover
							key={previewDevice}
							units={SIZE_UNITS}
							value={currentUnit}
							onChange={(u) => patch({ [unitKey]: u })}
							placement="bottom-end"
							triggerClassName="toplv opc-input select unit-popover-trigger"
						/>
					</div>
				</div>
			</div>

			{controlDescription ? (
				<span
					className="description customize-control-description"
					dangerouslySetInnerHTML={{ __html: controlDescription }}
				/>
			) : null}

			<div className="onepress-slider-app">
				<div className="onepress-slider-app__row">
					<input
						type="range"
						className="onepress-slider-app__range"
						min={sliderMin}
						max={sliderMax}
						step={sliderStep}
						value={rangeDisplayValue}
						aria-label={
							controlLabel
								? sprintf(
										/* translators: %s: control label */
										__('%s — slider', 'onepress'),
										controlLabel
									)
								: __('Value slider', 'onepress')
						}
						onChange={(e) =>
							setValueForDevice(e.target.value)
						}
					/>
					<input
						id={valueInputId}
						type="number"
						className="opc-input onepress-slider-app__number"
						min={sliderMin}
						max={sliderMax}
						step={sliderStep}
						value={currentValue}
						placeholder={String(sliderMin)}
						aria-label={__('Value', 'onepress')}
						onChange={(e) => {
							const v = e.target.value;
							if (v === '') {
								patch({ [valueKey]: '' });
								return;
							}
							setValueForDevice(v);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
