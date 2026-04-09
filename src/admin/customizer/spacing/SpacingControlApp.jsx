/**
 * Spacing Customizer control — padding / margin, responsive (Customizer React).
 */
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
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

const SIDE_KEYS = ['top', 'right', 'bottom', 'left'];

/**
 * @param {string} str
 * @returns {{ num: string, unit: string }}
 */
function parseCssLength(str) {
	if (!str || typeof str !== 'string') {
		return { num: '', unit: 'px' };
	}
	const t = str.trim();
	const m = t.match(/^(-?[\d.]+)\s*(px|em|rem|%)?$/i);
	if (!m) {
		return { num: '', unit: 'px' };
	}
	return {
		num: m[1],
		unit: (m[2] || 'px').toLowerCase(),
	};
}

/**
 * @param {string} prefix
 * @param {Record<string, string>} obj
 * @returns {object}
 */
function flatJsonToState(prefix, obj) {
	const next = {
		top: '',
		right: '',
		bottom: '',
		left: '',
		unit: 'px',
		linked: false,
		topTablet: '',
		rightTablet: '',
		bottomTablet: '',
		leftTablet: '',
		unitTablet: 'px',
		linkedTablet: false,
		topMobile: '',
		rightMobile: '',
		bottomMobile: '',
		leftMobile: '',
		unitMobile: 'px',
		linkedMobile: false,
	};

	const devices = [
		{ id: 'desktop', suf: '' },
		{ id: 'tablet', suf: '-tablet' },
		{ id: 'mobile', suf: '-mobile' },
	];

	for (const d of devices) {
		const dk = d.id;
		const suffix = d.suf;
		let unitSet = false;
		for (const side of SIDE_KEYS) {
			const key = `${prefix}-${side}${suffix}`;
			const raw = obj[key];
			if (!raw) {
				continue;
			}
			const { num, unit } = parseCssLength(raw);
			const sk =
				dk === 'desktop'
					? side
					: `${side}${DEVICE_KEY[dk]}`;
			next[sk] = num;
			if (!unitSet && num !== '') {
				const ukey =
					dk === 'desktop'
						? 'unit'
						: `unit${DEVICE_KEY[dk]}`;
				next[ukey] = unit;
				unitSet = true;
			}
		}
		const lk = `${prefix}-linked${suffix === '' ? '' : suffix}`;
		if (obj[lk] === '1' || obj[lk] === 'true') {
			const lkState =
				dk === 'desktop'
					? 'linked'
					: `linked${DEVICE_KEY[dk]}`;
			next[lkState] = true;
		}
	}

	return next;
}

/**
 * @param {object} state
 * @param {string} prefix
 * @returns {Record<string, string>}
 */
function stateToFlatJson(state, prefix) {
	const out = {};
	const devices = [
		{ suf: '', id: 'desktop' },
		{ suf: '-tablet', id: 'tablet' },
		{ suf: '-mobile', id: 'mobile' },
	];

	for (const d of devices) {
		const suf = d.suf;
		const id = d.id;
		const unit =
			id === 'desktop'
				? state.unit
				: state[`unit${DEVICE_KEY[id]}`];
		const linked =
			id === 'desktop'
				? state.linked
				: state[`linked${DEVICE_KEY[id]}`];

		for (const side of SIDE_KEYS) {
			const sk =
				id === 'desktop'
					? side
					: `${side}${DEVICE_KEY[id]}`;
			const num = state[sk];
			if (num !== '' && num !== undefined && num !== null) {
				out[`${prefix}-${side}${suf}`] = `${String(num).trim()}${unit || 'px'}`;
			}
		}
		out[`${prefix}-linked${suf}`] = linked ? '1' : '0';
	}
	return out;
}

/**
 * @param {import('@wordpress/element').RefObject} settingRef
 * @param {object} state
 * @param {string} prefix
 */
function useSpacingSync(settingRef, state, prefix) {
	useEffect(() => {
		const flat = stateToFlatJson(state, prefix);
		const setting = settingRef.current;
		if (setting) {
			setting.set(JSON.stringify(flat));
		}
	}, [state, prefix, settingRef]);
}

/**
 * @param {object} props
 */
export function SpacingControlApp({ control }) {
	const params = control.params || {};
	const controlLabel =
		typeof params.label === 'string' && params.label.trim()
			? params.label.trim()
			: '';
	const controlDescription =
		typeof params.description === 'string' && params.description.trim()
			? params.description
			: '';
	const prefix =
		params.spacing_property === 'margin' ? 'margin' : 'padding';

	const settingRef = useRef(null);
	settingRef.current = control.setting || control.settings?.default;

	const rawInitial =
		(typeof control.setting?.get === 'function'
			? control.setting.get()
			: null) ?? params.value ?? '';
	let initialObj = {};
	try {
		initialObj =
			typeof rawInitial === 'string' && rawInitial.trim()
				? JSON.parse(rawInitial)
				: {};
	} catch {
		initialObj = {};
	}

	const labels = {
		padding: __('Padding', 'onepress'),
		margin: __('Margin', 'onepress'),
		top: __('Top', 'onepress'),
		right: __('Right', 'onepress'),
		bottom: __('Bottom', 'onepress'),
		left: __('Left', 'onepress'),
		unit: __('Unit', 'onepress'),
		link: __('Link sides', 'onepress'),
		unlink: __('Unlink sides', 'onepress'),
		...(params.labels || {}),
	};

	const [state, setState] = useState(() =>
		flatJsonToState(prefix, initialObj)
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

	useSpacingSync(settingRef, state, prefix);

	const dev = PREVIEW_DEVICES.includes(previewDevice)
		? previewDevice
		: 'desktop';
	const dSuffix = DEVICE_KEY[dev];
	const sideKey = (side) => (dSuffix ? `${side}${dSuffix}` : side);
	const unitKey = dSuffix ? `unit${dSuffix}` : 'unit';
	const linkedKey = dSuffix ? `linked${dSuffix}` : 'linked';

	const currentUnit = state[unitKey] || 'px';
	const linked = !!state[linkedKey];

	const setSide = (side, value) => {
		const sk = sideKey(side);
		if (linked) {
			const next = {};
			for (const s of SIDE_KEYS) {
				next[sideKey(s)] = value;
			}
			setState((prev) => ({ ...prev, ...next }));
			return;
		}
		patch({ [sk]: value });
	};

	const toggleLinked = () => {
		if (!linked) {
			const v = state[sideKey('top')] || '';
			const next = {};
			for (const s of SIDE_KEYS) {
				next[sideKey(s)] = v;
			}
			next[linkedKey] = true;
			setState((prev) => ({ ...prev, ...next }));
			return;
		}
		patch({ [linkedKey]: false });
	};

	const resetToDefault = useCallback(() => {
		const raw = getCustomizeControlDefaultRaw(control);
		let obj = {};
		try {
			const str = raw && String(raw).trim() ? String(raw) : '';
			obj = str ? JSON.parse(str) : {};
			if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
				obj = {};
			}
		} catch {
			obj = {};
		}
		setState(flatJsonToState(prefix, obj));
	}, [control, prefix]);

	const sideLabels = {
		top: labels.top,
		right: labels.right,
		bottom: labels.bottom,
		left: labels.left,
	};

	return (
		<div className="onepress-spacing-control-root">

			<div className='flex justify-between items-center w-full'>

				<div className='flex justify-between items-center w-full'>
					<div className='flex justify-between items-center gap-1'>
						<div className='title'>
							{controlLabel ? (
								<span className="customize-control-title">{controlLabel}</span>
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
					<div className='flex justify-between items-center gap-1'>
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
						<div className="onepress-spacing-app__unit">
							<CustomizerUnitSelectPopover
								key={previewDevice}
								units={SIZE_UNITS}
								value={currentUnit}
								onChange={(u) => patch({ [unitKey]: u })}
								placement="bottom-end"
								triggerClassName="toplv opc-input select unit-popover-trigger "
							/>
						</div>

					</div>
				</div>
			</div>


			{controlDescription ? (
				<span
					className="description customize-control-description"
					dangerouslySetInnerHTML={{ __html: controlDescription }}
				/>
			) : null}


			<div className="onepress-spacing-app">
				<div className="onepress-spacing-app__sides">
					<div className='inputs'>
						{SIDE_KEYS.map((side) => (
							<div key={side} className="spacing-side">
								<input
									type="number"
									className="input"
									min={prefix === 'margin' ? undefined : 0}
									step="any"
									value={state[sideKey(side)] ?? ''}
									onChange={(e) => setSide(side, e.target.value)}
									aria-label={sideLabels[side]}
								/>
								<span className="label">
									{sideLabels[side]}
								</span>
							</div>
						))}
						<div className="spacing-side link-wrap">
							<span
								className={
									'link-btn' +
									(linked ? ' is-linked' : '')
								}
								onClick={toggleLinked}
								aria-pressed={linked}
								title={linked ? labels.unlink : labels.link}
								aria-label={linked ? labels.unlink : labels.link}
							>
								<span
									className={
										'dashicons ' +
										(linked
											? 'dashicons-admin-links'
											: 'dashicons-editor-unlink')
									}
									aria-hidden
								/>
							</span>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
