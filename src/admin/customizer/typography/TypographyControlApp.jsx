/**
 * Typography Customizer control UI (React, no jQuery).
 */
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	Icon,
	justifyStretch,
	justifyStretchVertical,
} from '@wordpress/icons';
import {
	CustomizerPreviewDeviceButtons,
	getCustomizerPreviewDeviceDefinitions,
} from '../CustomizerPreviewDeviceButtons.jsx';
import { CustomizerUnitSelectPopover } from '../CustomizerUnitSelectPopover.jsx';
import { getCustomizeControlDefaultRaw } from '../getCustomizeControlDefaultRaw.js';
import {
	FontPickerPanel,
	removeAllPickerPreviewLinks,
	removeSelectedFontLink,
	setSelectedGoogleFontLink,
} from './FontPickerModal.jsx';

const SIZE_UNITS = ['px', 'em', 'rem', '%'];

const PREVIEW_DEVICES = ['desktop', 'tablet', 'mobile'];

/** @type {Record<string, Record<'desktop'|'tablet'|'mobile', { value: string, unit: string }>>} */
const RESPONSIVE_UNIT_KEYS = {
	font_size: {
		desktop: { value: 'fontSize', unit: 'fontSizeUnit' },
		tablet: { value: 'fontSizeTablet', unit: 'fontSizeTabletUnit' },
		mobile: { value: 'fontSizeMobile', unit: 'fontSizeMobileUnit' },
	},
	line_height: {
		desktop: { value: 'lineHeight', unit: 'lineHeightUnit' },
		tablet: { value: 'lineHeightTablet', unit: 'lineHeightTabletUnit' },
		mobile: { value: 'lineHeightMobile', unit: 'lineHeightMobileUnit' },
	},
	letter_spacing: {
		desktop: { value: 'letterSpacing', unit: 'letterSpacingUnit' },
		tablet: { value: 'letterSpacingTablet', unit: 'letterSpacingTabletUnit' },
		mobile: { value: 'letterSpacingMobile', unit: 'letterSpacingMobileUnit' },
	},
};

function getFontId(fontName) {
	if (!fontName) {
		return '';
	}
	return String(fontName).toLowerCase().replace(/ /g, '-');
}

function cssToStyleSelect(weight, fontStyle) {
	const w =
		weight === undefined || weight === null || weight === ''
			? ''
			: String(weight);
	const fs =
		fontStyle === undefined || fontStyle === null || fontStyle === ''
			? 'normal'
			: String(fontStyle);

	if (w === '700' && (fs === 'normal' || fs === '')) {
		return '700';
	}
	if (w === '700' && fs === 'italic') {
		return '700italic';
	}

	if (w === '' || w === '400') {
		if (fs === 'normal' || fs === 'regular') {
			return 'regular';
		}
		if (fs === 'italic') {
			return 'italic';
		}
		return fs;
	}

	const num = parseInt(w, 10);
	if (!Number.isNaN(num)) {
		if (fs === 'normal' || fs === '') {
			return String(num);
		}
		return String(num) + fs;
	}

	return 'regular';
}

function parseCssNumberUnit(val, fallbackUnit = 'px') {
	if (val == null || val === '') {
		return { value: '', unit: fallbackUnit };
	}
	const m = String(val)
		.trim()
		.match(/^(-?[\d.]+)\s*(px|em|rem|%)?$/i);
	if (!m) {
		return { value: '', unit: fallbackUnit };
	}
	const unit = (m[2] || fallbackUnit).toLowerCase();
	return {
		value: m[1],
		unit: SIZE_UNITS.includes(unit) ? unit : fallbackUnit,
	};
}

function composeNumberUnit(value, unit, fallbackUnit = 'px') {
	if (value === '' || value == null) {
		return '';
	}
	const n = Number(value);
	if (Number.isNaN(n)) {
		return '';
	}
	const u = SIZE_UNITS.includes(unit) ? unit : fallbackUnit;
	return `${n}${u}`;
}

/**
 * Missing / empty / explicit `none` → stored as "none" for decoration & transform toggles.
 *
 * @param {string|undefined} raw
 * @returns {string}
 */
function normalizeTextDecorationTransform(raw) {
	const v = raw == null ? '' : String(raw).trim();
	if (!v || v.toLowerCase() === 'none') {
		return 'none';
	}
	return v;
}

function parseInitialState(rawValue, fields) {
	const base = {
		fontId: '',
		fontFamilyName: '',
		styleSelect: '',
		fontSize: '',
		fontSizeUnit: 'px',
		fontSizeTablet: '',
		fontSizeTabletUnit: 'px',
		fontSizeMobile: '',
		fontSizeMobileUnit: 'px',
		lineHeight: '',
		lineHeightUnit: 'px',
		lineHeightTablet: '',
		lineHeightTabletUnit: 'px',
		lineHeightMobile: '',
		lineHeightMobileUnit: 'px',
		letterSpacing: '',
		letterSpacingUnit: 'px',
		letterSpacingTablet: '',
		letterSpacingTabletUnit: 'px',
		letterSpacingMobile: '',
		letterSpacingMobileUnit: 'px',
		textDecoration: 'none',
		textTransform: 'none',
	};

	if (!rawValue || !String(rawValue).trim()) {
		return base;
	}

	let css;
	try {
		css = JSON.parse(rawValue);
	} catch {
		return base;
	}
	if (!css || typeof css !== 'object') {
		return base;
	}

	const fontFamily = css['font-family'] || '';
	const fontId = fontFamily ? getFontId(fontFamily) : '';
	const fontSizeParsed = parseCssNumberUnit(css['font-size'], 'px');
	const fontSizeTabletParsed = parseCssNumberUnit(
		css['font-size-tablet'],
		'px'
	);
	const fontSizeMobileParsed = parseCssNumberUnit(
		css['font-size-mobile'],
		'px'
	);
	const lineHeightParsed = parseCssNumberUnit(css['line-height'], 'px');
	const lineHeightTabletParsed = parseCssNumberUnit(
		css['line-height-tablet'],
		'px'
	);
	const lineHeightMobileParsed = parseCssNumberUnit(
		css['line-height-mobile'],
		'px'
	);
	const letterSpacingParsed = parseCssNumberUnit(css['letter-spacing'], 'px');
	const letterSpacingTabletParsed = parseCssNumberUnit(
		css['letter-spacing-tablet'],
		'px'
	);
	const letterSpacingMobileParsed = parseCssNumberUnit(
		css['letter-spacing-mobile'],
		'px'
	);

	let styleSelect = '';
	if (fields.font_family && fields.font_style) {
		styleSelect = cssToStyleSelect(css['font-weight'], css['font-style']);
	}

	return {
		...base,
		fontId,
		fontFamilyName: fontFamily || '',
		styleSelect,
		fontSize: fields.font_size ? fontSizeParsed.value : '',
		fontSizeUnit: fields.font_size ? fontSizeParsed.unit : 'px',
		fontSizeTablet: fields.font_size ? fontSizeTabletParsed.value : '',
		fontSizeTabletUnit: fields.font_size ? fontSizeTabletParsed.unit : 'px',
		fontSizeMobile: fields.font_size ? fontSizeMobileParsed.value : '',
		fontSizeMobileUnit: fields.font_size ? fontSizeMobileParsed.unit : 'px',
		lineHeight: fields.line_height ? lineHeightParsed.value : '',
		lineHeightUnit: fields.line_height ? lineHeightParsed.unit : 'px',
		lineHeightTablet: fields.line_height ? lineHeightTabletParsed.value : '',
		lineHeightTabletUnit: fields.line_height ? lineHeightTabletParsed.unit : 'px',
		lineHeightMobile: fields.line_height ? lineHeightMobileParsed.value : '',
		lineHeightMobileUnit: fields.line_height ? lineHeightMobileParsed.unit : 'px',
		letterSpacing: fields.letter_spacing ? letterSpacingParsed.value : '',
		letterSpacingUnit: fields.letter_spacing ? letterSpacingParsed.unit : 'px',
		letterSpacingTablet: fields.letter_spacing
			? letterSpacingTabletParsed.value
			: '',
		letterSpacingTabletUnit: fields.letter_spacing
			? letterSpacingTabletParsed.unit
			: 'px',
		letterSpacingMobile: fields.letter_spacing
			? letterSpacingMobileParsed.value
			: '',
		letterSpacingMobileUnit: fields.letter_spacing
			? letterSpacingMobileParsed.unit
			: 'px',
		textDecoration: fields.text_decoration
			? normalizeTextDecorationTransform(css['text-decoration'])
			: '',
		textTransform: fields.text_transform
			? normalizeTextDecorationTransform(css['text-transform'])
			: '',
	};
}

/**
 * Authoritative Customizer value (avoids empty params.value on first paint clobbering DB).
 *
 * @param {object} control
 * @param {string} [paramsValue]
 * @returns {string}
 */
function getTypographyControlInitialRaw(control, paramsValue) {
	const setting = control.setting || control.settings?.default;
	if (setting && typeof setting.get === 'function') {
		const v = setting.get();
		if (v != null && String(v).trim() !== '') {
			return String(v);
		}
	}
	return typeof paramsValue === 'string' ? paramsValue : '';
}

/** Stable JSON compare (key order–independent). */
function typographySettingJsonMatches(a, b) {
	const norm = (s) => {
		try {
			const o = JSON.parse(s);
			if (!o || typeof o !== 'object' || Array.isArray(o)) {
				return s;
			}
			return JSON.stringify(
				Object.keys(o)
					.sort()
					.reduce((acc, k) => {
						acc[k] = o[k];
						return acc;
					}, {})
			);
		} catch {
			return s;
		}
	};
	return norm(a || '') === norm(b || '');
}

function groupFonts(webfonts) {
	const buckets = new Map();
	for (const [id, font] of Object.entries(webfonts || {})) {
		const type =
			font.font_type && String(font.font_type).trim() !== ''
				? font.font_type
				: 'default';
		if (!buckets.has(type)) {
			buckets.set(type, []);
		}
		buckets.get(type).push({ id, name: font.name });
	}

	const preferred = ['default', 'google'];
	const out = [];
	for (const t of preferred) {
		if (buckets.has(t)) {
			const fonts = buckets.get(t).sort((a, b) => a.name.localeCompare(b.name));
			out.push({ type: t, fonts });
			buckets.delete(t);
		}
	}
	for (const [type, fonts] of buckets) {
		out.push({
			type,
			fonts: fonts.sort((a, b) => a.name.localeCompare(b.name)),
		});
	}
	return out;
}

function buildStyleOptions(fontId, webfonts, labels, defaultLabel) {
	const fallback = [{ value: '', label: defaultLabel }];
	if (!fontId || !webfonts[fontId]) {
		return fallback;
	}

	const font = webfonts[fontId];
	const weights = font.font_weights || [];
	const isGoogle = font.font_type === 'google';
	let hasRegular = !isGoogle;

	const opts = [];
	for (const value of weights) {
		if (value == 400 || value === '400' || value === 'regular') {
			hasRegular = true;
		}
		const key = String(value);
		opts.push({ value: key, label: labels[key] ?? key });
	}

	let includeDefault = true;
	if (isGoogle && !hasRegular) {
		includeDefault = false;
	}

	if (isGoogle && weights.length <= 1) {
		opts.push(
			{ value: 'italic', label: labels.italic ?? 'italic' },
			{ value: '700', label: labels['700'] ?? '700' },
			{ value: '700italic', label: labels['700italic'] ?? '700italic' }
		);
	}

	const list = includeDefault ? [...fallback, ...opts] : [...opts];
	return list.length ? list : fallback;
}

function parseStyleSelect(styleVal) {
	const s = styleVal || '';
	const weight = parseInt(s, 10);
	if (Number.isNaN(weight)) {
		const style = s === 'regular' ? 'normal' : s || 'normal';
		return { weight: '', style: style === '' ? 'normal' : style };
	}
	const rest = s.slice(String(weight).length);
	const style = rest === '' ? 'normal' : rest;
	return { weight, style };
}

/**
 * @param {string} device
 * @param {object} state
 */
function getEffectiveFontMetrics(state, device) {
	if (device === 'mobile') {
		return {
			fontSize:
				composeNumberUnit(
					state.fontSizeMobile,
					state.fontSizeMobileUnit,
					'px'
				) ||
				composeNumberUnit(
					state.fontSizeTablet,
					state.fontSizeTabletUnit,
					'px'
				) ||
				composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px'),
			lineHeight:
				composeNumberUnit(
					state.lineHeightMobile,
					state.lineHeightMobileUnit,
					'px'
				) ||
				composeNumberUnit(
					state.lineHeightTablet,
					state.lineHeightTabletUnit,
					'px'
				) ||
				composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px'),
			letterSpacing:
				composeNumberUnit(
					state.letterSpacingMobile,
					state.letterSpacingMobileUnit,
					'px'
				) ||
				composeNumberUnit(
					state.letterSpacingTablet,
					state.letterSpacingTabletUnit,
					'px'
				) ||
				composeNumberUnit(
					state.letterSpacing,
					state.letterSpacingUnit,
					'px'
				),
		};
	}
	if (device === 'tablet') {
		return {
			fontSize:
				composeNumberUnit(
					state.fontSizeTablet,
					state.fontSizeTabletUnit,
					'px'
				) || composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px'),
			lineHeight:
				composeNumberUnit(
					state.lineHeightTablet,
					state.lineHeightTabletUnit,
					'px'
				) ||
				composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px'),
			letterSpacing:
				composeNumberUnit(
					state.letterSpacingTablet,
					state.letterSpacingTabletUnit,
					'px'
				) ||
				composeNumberUnit(
					state.letterSpacing,
					state.letterSpacingUnit,
					'px'
				),
		};
	}
	return {
		fontSize: composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px'),
		lineHeight: composeNumberUnit(
			state.lineHeight,
			state.lineHeightUnit,
			'px'
		),
		letterSpacing: composeNumberUnit(
			state.letterSpacing,
			state.letterSpacingUnit,
			'px'
		),
	};
}

function buildTypographySettingCss(state, fields, webfonts) {
	const css = {};

	if (fields.font_size) {
		const value = composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px');
		if (value) {
			css['font-size'] = value;
		}
		const vt = composeNumberUnit(
			state.fontSizeTablet,
			state.fontSizeTabletUnit,
			'px'
		);
		if (vt) {
			css['font-size-tablet'] = vt;
		}
		const vm = composeNumberUnit(
			state.fontSizeMobile,
			state.fontSizeMobileUnit,
			'px'
		);
		if (vm) {
			css['font-size-mobile'] = vm;
		}
	}

	if (fields.line_height) {
		const value = composeNumberUnit(
			state.lineHeight,
			state.lineHeightUnit,
			'px'
		);
		if (value) {
			css['line-height'] = value;
		}
		const vt = composeNumberUnit(
			state.lineHeightTablet,
			state.lineHeightTabletUnit,
			'px'
		);
		if (vt) {
			css['line-height-tablet'] = vt;
		}
		const vm = composeNumberUnit(
			state.lineHeightMobile,
			state.lineHeightMobileUnit,
			'px'
		);
		if (vm) {
			css['line-height-mobile'] = vm;
		}
	}

	if (fields.letter_spacing) {
		const value = composeNumberUnit(
			state.letterSpacing,
			state.letterSpacingUnit,
			'px'
		);
		if (value) {
			css['letter-spacing'] = value;
		}
		const vt = composeNumberUnit(
			state.letterSpacingTablet,
			state.letterSpacingTabletUnit,
			'px'
		);
		if (vt) {
			css['letter-spacing-tablet'] = vt;
		}
		const vm = composeNumberUnit(
			state.letterSpacingMobile,
			state.letterSpacingMobileUnit,
			'px'
		);
		if (vm) {
			css['letter-spacing-mobile'] = vm;
		}
	}

	if (fields.text_decoration) {
		css['text-decoration'] = state.textDecoration || 'none';
	}

	if (fields.text_transform) {
		css['text-transform'] = state.textTransform || 'none';
	}

	if (fields.font_family && fields.font_style) {
		const styleToken = state.styleSelect || '';
		const { weight, style } = parseStyleSelect(styleToken);
		css['font-style'] = style || 'normal';
		css['font-weight'] = weight === '' ? '' : weight;
	}

	if (fields.font_family) {
		const fontId = state.fontId || '';
		if (fontId && webfonts[fontId]) {
			const font = webfonts[fontId];
			css['font-family'] = font.name;
		} else if (
			state.fontFamilyName &&
			String(state.fontFamilyName).trim() !== ''
		) {
			// Plus / migrated fonts (e.g. Google) not yet in onepressTypoWebfonts must round-trip.
			css['font-family'] = String(state.fontFamilyName).trim();
		}
	}

	return css;
}

function ResponsiveUnitField({
	label,
	fieldKey,
	previewDevice,
	onSelectDevice,
	state,
	patch,
	min,
	leadingIcon = null,
}) {
	const keys =
		RESPONSIVE_UNIT_KEYS[fieldKey][previewDevice] ||
		RESPONSIVE_UNIT_KEYS[fieldKey].desktop;
	const value = state[keys.value];
	const unit = state[keys.unit];

	return (
		<div className="setting-group setting-group--unit">
			<div className="setting-group__head w-full flex justify-between items-center">
				<div className='flex gap-1'>
					<span className="customize-control-title">{label}</span>
					<CustomizerPreviewDeviceButtons
						devices={getCustomizerPreviewDeviceDefinitions()}
						activeDevice={previewDevice}
						onSelectDevice={onSelectDevice}
						groupClassName="devices"
						buttonClassName="device-btn"
					/>
				</div>

				<div className="unit-row__unit-wrap">
					<CustomizerUnitSelectPopover
						key={`${fieldKey}-${previewDevice}`}
						units={SIZE_UNITS}
						value={unit}
						onChange={(u) => patch({ [keys.unit]: u })}
						placement="bottom-start"
						triggerClassName="opc-input select unit-popover-trigger"
						triggerActiveClass="active"
					/>
				</div>



			</div>
			<div
				className={
					'unit-row' +
					(leadingIcon ? ' unit-row--has-leading-icon' : '')
				}
			>
				{leadingIcon ? (
					<span className="unit-row__icon" aria-hidden="true">
						<Icon icon={leadingIcon} size={20} />
					</span>
				) : null}
				<input
					type="number"
					className="opc-input"
					min={min}
					step="any"
					value={value}
					onChange={(e) => patch({ [keys.value]: e.target.value })}
				/>

			</div>
		</div>
	);
}

function renderSpanChoices({
	options,
	value,
	onChange,
	toggleable = false,
	noneValue = 'none',
}) {
	const resolvePick = (optValue) => {
		if (toggleable && value === optValue) {
			return noneValue;
		}
		return optValue;
	};

	const onKeyPick = (event, optValue) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onChange(resolvePick(optValue));
		}
	};

	return (
		<div className="choice-row">
			{options.map((opt) => {
				const active = value === opt.value && value !== noneValue;
				return (
					<span
						key={opt.value || 'default'}
						className={`choice-btn ${active ? ' is-active button-primary' : 'button-secondary'}`}
						role="button"
						tabIndex={0}
						aria-pressed={active}
						title={opt.label}
						onClick={() => onChange(resolvePick(opt.value))}
						onKeyDown={(e) => onKeyPick(e, opt.value)}
					>
						<span className={`choice-icon ${opt.iconClass}`}>{opt.icon}</span>
					</span>
				);
			})}
		</div>
	);
}

export function TypographyControlApp({ control, webfonts, styleLabels }) {
	const params = control.params;
	const fields = params.fields;
	const labels = params.labels;
	const cssSelector = params.css_selector || '';
	const controlId = control.id;
	const controlLabel =
		typeof params.label === 'string' && params.label.trim()
			? params.label.trim()
			: '';
	const controlDescription =
		typeof params.description === 'string' && params.description.trim()
			? params.description
			: '';

	const settingRef = useRef(null);
	settingRef.current = control.setting || control.settings?.default;
	const controlWrapRef = useRef(null);
	const fontSelectorRef = useRef(null);

	const [state, setState] = useState(() =>
		parseInitialState(getTypographyControlInitialRaw(control, params.value), fields)
	);
	const [previewDevice, setPreviewDevice] = useState('desktop');
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [fontPickerOpen, setFontPickerOpen] = useState(false);

	const fontGroups = useMemo(() => groupFonts(webfonts), [webfonts]);
	const selectedFont = state.fontId ? webfonts[state.fontId] : null;

	const styleOptions = useMemo(
		() =>
			buildStyleOptions(
				state.fontId,
				webfonts,
				styleLabels,
				labels.option_default
			),
		[state.fontId, webfonts, styleLabels, labels.option_default]
	);

	const selectedStyleLabel = useMemo(() => {
		const item = styleOptions.find((o) => o.value === state.styleSelect);
		return item?.label || labels.option_default;
	}, [styleOptions, state.styleSelect, labels.option_default]);

	useEffect(() => {
		if (!fields.font_style) {
			return;
		}
		const allowed = new Set(styleOptions.map((o) => o.value));
		setState((prev) => {
			if (prev.styleSelect === '' || allowed.has(prev.styleSelect)) {
				return prev;
			}
			return { ...prev, styleSelect: '' };
		});
	}, [styleOptions, fields.font_style]);

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

	const closeFontPicker = useCallback(() => {
		removeAllPickerPreviewLinks(controlId);
		setFontPickerOpen(false);
	}, [controlId]);

	const openFontPicker = useCallback(
		(e) => {
			if (e) {
				e.stopPropagation();
			}
			removeAllPickerPreviewLinks(controlId);
			setSettingsOpen(true);
			setFontPickerOpen((open) => !open);
		},
		[controlId]
	);

	const selectFontFromPicker = useCallback(
		(fontId) => {
			const font = webfonts[fontId];
			patch({
				fontId,
				styleSelect: '',
				fontFamilyName: font?.name || '',
			});
			removeAllPickerPreviewLinks(controlId);
			setFontPickerOpen(false);
		},
		[controlId, patch, webfonts]
	);

	const clearSelectedFont = useCallback(() => {
		patch({ fontId: '', styleSelect: '', fontFamilyName: '' });
		removeAllPickerPreviewLinks(controlId);
		removeSelectedFontLink(controlId);
		setFontPickerOpen(false);
	}, [controlId, patch]);

	const resetToDefault = useCallback(() => {
		setFontPickerOpen(false);
		removeAllPickerPreviewLinks(controlId);
		removeSelectedFontLink(controlId);
		const raw = getCustomizeControlDefaultRaw(control);
		setState(parseInitialState(raw || '', fields));
	}, [control, controlId, fields]);

	useEffect(() => {
		if (fontPickerOpen) {
			return;
		}
		const font = state.fontId ? webfonts[state.fontId] : null;
		if (font && font.font_type === 'google' && font.url) {
			setSelectedGoogleFontLink(controlId, state.fontId, font.url);
		} else {
			removeSelectedFontLink(controlId);
		}
	}, [fontPickerOpen, state.fontId, webfonts, controlId]);

	useEffect(() => {
		return () => {
			removeAllPickerPreviewLinks(controlId);
			removeSelectedFontLink(controlId);
		};
	}, [controlId]);

	useEffect(() => {
		const css = buildTypographySettingCss(state, fields, webfonts);
		const setting = settingRef.current;
		if (!setting || typeof setting.get !== 'function') {
			return;
		}
		const next = JSON.stringify(css);
		let cur = '';
		try {
			cur = setting.get();
			if (typeof cur !== 'string') {
				cur = cur != null ? String(cur) : '';
			}
		} catch {
			cur = '';
		}
		if (typographySettingJsonMatches(next, cur)) {
			return;
		}
		setting.set(next);
	}, [state, fields, webfonts]);

	useEffect(() => {
		if (!settingsOpen) {
			return undefined;
		}
		const onKey = (e) => {
			if (e.key !== 'Escape') {
				return;
			}
			if (fontPickerOpen) {
				closeFontPicker();
				e.preventDefault();
				return;
			}
			setSettingsOpen(false);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [settingsOpen, fontPickerOpen, closeFontPicker]);

	useEffect(() => {
		if (!settingsOpen && !fontPickerOpen) {
			return undefined;
		}
		const onDocDown = (e) => {
			const root = controlWrapRef.current;
			if (!root) {
				return;
			}
			// wp.components.Popover renders in a portal (body); clicks there are not
			// inside controlWrapRef but must not close the Typography options panel.
			const t = e.target;
			if (
				t &&
				typeof t.closest === 'function' &&
				t.closest('.components-popover')
			) {
				return;
			}
			if (!root.contains(e.target)) {
				setFontPickerOpen(false);
				setSettingsOpen(false);
				return;
			}
			if (
				fontPickerOpen &&
				fontSelectorRef.current &&
				!fontSelectorRef.current.contains(e.target)
			) {
				setFontPickerOpen(false);
			}
		};
		document.addEventListener('mousedown', onDocDown);
		return () => document.removeEventListener('mousedown', onDocDown);
	}, [settingsOpen, fontPickerOpen]);

	const selectorStack = selectedFont ? `"${selectedFont.name}", sans-serif` : 'inherit';
	const sizeBadge =
		state.fontSize !== '' ? `${state.fontSize}${state.fontSizeUnit}` : labels.option_default;
	const textDecorationChoices = [
		// none = no items selected
		// { value: 'none', label: __('None', 'onepress'), icon: 'Aa', iconClass: 'none' },
		{ value: 'overline', label: __('Overline', 'onepress'), icon: 'Aa', iconClass: 'overline' },
		{ value: 'underline', label: __('Underline', 'onepress'), icon: 'Aa', iconClass: 'underline' },
		{ value: 'line-through', label: __('Line through', 'onepress'), icon: 'Aa', iconClass: 'line-through' },
	];
	const textTransformChoices = [
		// none = no items selected
		// { value: 'none', label: __('None', 'onepress'), icon: 'Aa', iconClass: 'none' },
		{ value: 'uppercase', label: __('Uppercase', 'onepress'), icon: 'AA', iconClass: 'uppercase' },
		{ value: 'lowercase', label: __('Lowercase', 'onepress'), icon: 'aa', iconClass: 'lowercase' },
		{ value: 'capitalize', label: __('Capitalize', 'onepress'), icon: 'Aa', iconClass: 'capitalize' },
	];

	const summaryPreviewStyle = {
		fontFamily: selectorStack,
	};

	if (fields.font_family && fields.font_style) {
		const { weight, style } = parseStyleSelect(state.styleSelect || '');
		summaryPreviewStyle.fontStyle = style || 'normal';
		summaryPreviewStyle.fontWeight = weight === '' ? '' : weight;
	}
	if (fields.font_size) {
		const v = composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px');
		if (v) {
			summaryPreviewStyle.fontSize = v;
		}
	}
	if (fields.line_height) {
		const v = composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px');
		if (v) {
			summaryPreviewStyle.lineHeight = v;
		}
	}
	if (fields.letter_spacing) {
		const v = composeNumberUnit(state.letterSpacing, state.letterSpacingUnit, 'px');
		if (v) {
			summaryPreviewStyle.letterSpacing = v;
		}
	}
	if (fields.text_transform) {
		summaryPreviewStyle.textTransform = state.textTransform || 'none';
	}
	if (fields.text_decoration) {
		summaryPreviewStyle.textDecoration = state.textDecoration || 'none';
	}

	return (
		<div
			ref={controlWrapRef}
			className={
				'onepress-typography-control' +
				(settingsOpen ? ' onepress-typography-control--open' : '')
			}
		>
			<div className='flex items-center w-full gap-1 justify-between'>
				<div className='ctitle'>
					{controlLabel ? (
						<span className="customize-control-title">{controlLabel}</span>
					) : null}
				</div>

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
			</div>

			<div className='relative'>

				<button
					type="button"
					className={`summary-card opc-input select flex items-center w-full ${settingsOpen ? 'active' : ''}`}
					onClick={() => {
						setSettingsOpen((prev) => {
							if (prev) {
								setFontPickerOpen(false);
							}
							return !prev;
						});
					}}
					aria-expanded={settingsOpen}
					aria-label={__('Typography options', 'onepress')}
				>
					<span className="summary-meta flex justify-between items-center w-full">
						<span className="chip" style={{ fontFamily: selectorStack }}>
							{selectedFont ? selectedFont.name : labels.option_default}
						</span>
						<span className='flex gap-1'>
							{selectedStyleLabel != labels.option_default && <><span className="chip">{selectedStyleLabel}</span>
								/</>}
							{labels.option_default != sizeBadge && <span className="chip">{sizeBadge}</span>}
						</span>
					</span>
					{/* <span className="summary-preview" style={summaryPreviewStyle}>…</span> */}
				</button>

				{settingsOpen && (
					<div
						className="onepress-typography-settings"
						role="dialog"
						aria-modal="false"
						aria-label={__('Typography options', 'onepress')}
					>
						{/* <div className="settings-head">
						<strong>{__('Typography options', 'onepress')}</strong>
						<button
							type="button"
							className="button-link"
							onClick={() => {
								setFontPickerOpen(false);
								setSettingsOpen(false);
							}}
						>
							{__('Close', 'onepress')}
						</button>
					</div> */}
						<div className="settings-body">
							{fields.font_family && (
								<div
									className="setting-group font-family-setting"
									ref={fontSelectorRef}
								>
									<span className="customize-control-title">{labels.family}</span>
									<div className="font-family-row">
										<span
											className={`opc-input select font-family-value clickable ${fontPickerOpen ? 'active' : ''}`}
											role="button"
											tabIndex={0}
											aria-label={__('Open font selector', 'onepress')}
											aria-expanded={fontPickerOpen}
											onClick={(e) => openFontPicker(e)}
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													e.preventDefault();
													openFontPicker(e);
												}
											}}
										>
											{selectedFont
												? selectedFont.name
												: labels.option_default}
										</span>
										{selectedFont && (
											<span
												className="font-family-clear"
												aria-label={__(
													'Remove font and use theme default',
													'onepress'
												)}
												title={__(
													'Remove font and use theme default',
													'onepress'
												)}
												onClick={(e) => {
													e.stopPropagation();
													clearSelectedFont();
												}}
											>
												<span
													className="dashicons dashicons-no-alt"
													aria-hidden
												/>
											</span>
										)}
									</div>
									{fontPickerOpen && (
										<FontPickerPanel
											open={fontPickerOpen}
											variant="dropdown"
											controlId={controlId}
											webfonts={webfonts}
											fontGroups={fontGroups}
											currentFontId={state.fontId}
											defaultLabel={labels.option_default}
											onClose={closeFontPicker}
											onSelectFont={selectFontFromPicker}
										/>
									)}
								</div>
							)}

							{fields.font_family && fields.font_style && (
								<div className="setting-group">
									<span className="customize-control-title">{labels.style}</span>
									<select
										className="opc-input select"
										value={state.styleSelect}
										onChange={(e) => patch({ styleSelect: e.target.value })}
									>
										{styleOptions.map((o, idx) => (
											<option key={`${idx}-${o.value}`} value={o.value}>
												{o.label}
											</option>
										))}
									</select>
								</div>
							)}

							{fields.font_size && (
								<ResponsiveUnitField
									label={labels.size}
									fieldKey="font_size"
									previewDevice={previewDevice}
									onSelectDevice={selectPreviewDevice}
									state={state}
									patch={patch}
									min={0}
								/>
							)}

							{fields.line_height && (
								<ResponsiveUnitField
									label={labels.line_height}
									fieldKey="line_height"
									previewDevice={previewDevice}
									onSelectDevice={selectPreviewDevice}
									state={state}
									patch={patch}
									min={0}
									leadingIcon={justifyStretchVertical}
								/>
							)}

							{fields.letter_spacing && (
								<ResponsiveUnitField
									label={labels.letter_spacing}
									fieldKey="letter_spacing"
									previewDevice={previewDevice}
									onSelectDevice={selectPreviewDevice}
									state={state}
									patch={patch}
									min={-1000}
									leadingIcon={justifyStretch}
								/>
							)}


							<div className='flex gap-2 justify-between'>
								{fields.text_decoration && (
									<div className="setting-group" title={labels.text_decoration}>
										{/* <span className="customize-control-title">{labels.text_decoration}</span> */}
										{renderSpanChoices({
											options: textDecorationChoices,
											value: state.textDecoration,
											onChange: (next) => patch({ textDecoration: next }),
											toggleable: true,
											noneValue: 'none',
										})}
									</div>
								)}

								{fields.text_transform && (
									<div className="setting-group" title={labels.text_transform}>
										{/* <span className="customize-control-title">{labels.text_transform}</span> */}
										{renderSpanChoices({
											options: textTransformChoices,
											value: state.textTransform,
											onChange: (next) => patch({ textTransform: next }),
											toggleable: true,
											noneValue: 'none',
										})}
									</div>
								)}
							</div>


						</div>
					</div>
				)}
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
