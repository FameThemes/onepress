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
import { Popover } from '@wordpress/components';

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

function UnitPopover({ unit, onChangeUnit }) {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	return (
		<>
			<button
				type="button"
				ref={setAnchorEl}
				className="input onepress-spacing-unit-trigger"
				aria-expanded={open}
				aria-haspopup="dialog"
				aria-label={__('Unit', 'onepress')}
				onClick={() => setOpen((o) => !o)}
			>
				<span className="onepress-spacing-unit-trigger__value">{unit}</span>
			</button>
			{open && (
				<Popover
					anchor={anchorEl}
					className="onepress-spacing-unit-popover-shell"
					onClose={() => setOpen(false)}
					placement="bottom-end"
					offset={4}
					focusOnMount={false}
				>
					<div
						className="onepress-spacing-unit-popover"
						role="listbox"
						aria-label={__('Unit', 'onepress')}
					>
						{SIZE_UNITS.map((u) => (
							<button
								key={u}
								type="button"
								role="option"
								aria-selected={unit === u}
								className={
									'onepress-spacing-unit-popover__item' +
									(unit === u ? ' is-selected' : '')
								}
								onClick={() => {
									onChangeUnit(u);
									setOpen(false);
								}}
							>
								{u}
							</button>
						))}
					</div>
				</Popover>
			)}
		</>
	);
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

	const deviceButtons = [
		{
			id: 'desktop',
			icon: 'dashicons-desktop',
			title: __('Desktop preview', 'onepress'),
		},
		{
			id: 'tablet',
			icon: 'dashicons-tablet',
			title: __('Tablet preview', 'onepress'),
		},
		{
			id: 'mobile',
			icon: 'dashicons-smartphone',
			title: __('Mobile preview', 'onepress'),
		},
	];

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

	const sideLabels = {
		top: labels.top,
		right: labels.right,
		bottom: labels.bottom,
		left: labels.left,
	};

	return (
		<div className="onepress-spacing-control-root">
			{controlLabel ? (
				<span className="customize-control-title">{controlLabel}</span>
			) : null}
			{controlDescription ? (
				<span
					className="description customize-control-description"
					dangerouslySetInnerHTML={{ __html: controlDescription }}
				/>
			) : null}
			<div className="onepress-spacing-app">
			<div className="onepress-spacing-app__head">
				<div
					className="onepress-spacing-app__devices"
					role="group"
					aria-label={__('Customizer preview device', 'onepress')}
				>
					{deviceButtons.map((d) => (
						<button
							key={d.id}
							type="button"
							className={`onepress-spacing-app__device-btn${previewDevice === d.id ? ' is-active' : ''
								}`}
							title={d.title}
							aria-label={d.title}
							aria-pressed={previewDevice === d.id}
							onClick={() => selectPreviewDevice(d.id)}
						>
							<span className={`dashicons ${d.icon}`} aria-hidden />
						</button>
					))}
				</div>
				<div className="onepress-spacing-app__head-spacer" aria-hidden="true" />
				<div className="onepress-spacing-app__unit">
					<UnitPopover
						unit={currentUnit}
						onChangeUnit={(u) => patch({ [unitKey]: u })}
					/>
				</div>
			</div>
			<div className="onepress-spacing-app__sides">
				<div className='inputs'>
					{SIDE_KEYS.map((side) => (
						<div key={side} className="onepress-spacing-side">
							<input
								type="number"
								className="input onepress-spacing-side__input"
								min={prefix === 'margin' ? undefined : 0}
								step="any"
								value={state[sideKey(side)] ?? ''}
								onChange={(e) => setSide(side, e.target.value)}
								aria-label={sideLabels[side]}
							/>
							<span className="onepress-spacing-side__label">
								{sideLabels[side]}
							</span>
						</div>
					))}
				</div>
				<div className="onepress-spacing-app__link-wrap">
					<button
						type="button"
						className={
							'onepress-spacing-link-btn' +
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
					</button>
				</div>
			</div>
			</div>
		</div>
	);
}
