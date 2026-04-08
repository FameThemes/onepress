/**
 * Typography Customizer control UI (React, no jQuery).
 */
import {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { createPortal } from 'react-dom';
import {
	FontPickerModal,
	removeAllPickerPreviewLinks,
	removeSelectedFontLink,
	setSelectedGoogleFontLink,
} from './typography/FontPickerModal.jsx';

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

function parseInitialState(rawValue, fields) {
	const base = {
		fontId: '',
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
		textDecoration: '',
		textTransform: '',
		color: '',
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
		textDecoration: fields.text_decoration ? css['text-decoration'] || '' : '',
		textTransform: fields.text_transform ? css['text-transform'] || '' : '',
		color: fields.color ? css.color || css['font-color'] || '' : '',
	};
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

function buildCssAndPreview(state, fields, webfonts, cssSelector, previewDevice) {
	const css = {};
	let fontId = '';
	let fontUrl = '';
	let styleToken = '';

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

	if (fields.text_decoration && state.textDecoration) {
		css['text-decoration'] = state.textDecoration;
	}

	if (fields.text_transform && state.textTransform) {
		css['text-transform'] = state.textTransform;
	}

	if (fields.color && state.color) {
		css.color = state.color;
	}

	if (fields.font_family && fields.font_style) {
		styleToken = state.styleSelect || '';
		const { weight, style } = parseStyleSelect(styleToken);
		css['font-style'] = style || 'normal';
		css['font-weight'] = weight === '' ? '' : weight;
	}

	if (fields.font_family) {
		fontId = state.fontId || '';
		if (fontId && webfonts[fontId]) {
			const font = webfonts[fontId];
			css['font-family'] = font.name;
			fontUrl = font.url || '';
		}
	}

	const device =
		previewDevice && PREVIEW_DEVICES.includes(previewDevice)
			? previewDevice
			: 'desktop';
	const metrics = getEffectiveFontMetrics(state, device);
	const previewCss = { ...css };

	if (fields.font_size) {
		delete previewCss['font-size'];
		delete previewCss['font-size-tablet'];
		delete previewCss['font-size-mobile'];
		if (metrics.fontSize) {
			previewCss['font-size'] = metrics.fontSize;
		}
	}
	if (fields.line_height) {
		delete previewCss['line-height'];
		delete previewCss['line-height-tablet'];
		delete previewCss['line-height-mobile'];
		if (metrics.lineHeight) {
			previewCss['line-height'] = metrics.lineHeight;
		}
	}
	if (fields.letter_spacing) {
		delete previewCss['letter-spacing'];
		delete previewCss['letter-spacing-tablet'];
		delete previewCss['letter-spacing-mobile'];
		if (metrics.letterSpacing) {
			previewCss['letter-spacing'] = metrics.letterSpacing;
		}
	}

	return {
		css,
		preview: {
			font_id: fontId,
			style: styleToken,
			css_selector: cssSelector,
			css: previewCss,
			font_url: fontUrl,
		},
	};
}

function applyPreview(settings) {
	const iframe = document.querySelector('#customize-preview iframe');
	const doc = iframe?.contentDocument;
	if (!doc || !settings.css_selector) {
		return;
	}

	if (settings.font_url) {
		const lid = `google-font-${settings.font_id}`;
		doc.getElementById(lid)?.remove();
		const link = doc.createElement('link');
		link.id = lid;
		link.rel = 'stylesheet';
		link.href = settings.font_url;
		link.type = 'text/css';
		doc.head.appendChild(link);
	}

	const nodes = doc.querySelectorAll(settings.css_selector);
	nodes.forEach((el) => {
		el.removeAttribute('style');
		for (const [prop, val] of Object.entries(settings.css)) {
			if (val !== undefined && val !== null && val !== '') {
				el.style.setProperty(prop, String(val));
			}
		}
	});
}

function clamp255(n) {
	return Math.max(0, Math.min(255, Math.round(Number(n))));
}

function clamp01(n) {
	return Math.max(0, Math.min(1, Number(n)));
}

function toHex2(n) {
	return clamp255(n).toString(16).padStart(2, '0');
}

/**
 * Parse any CSS color string to RGBA (uses canvas; Customizer is always in a browser).
 *
 * @param {string} str
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function parseColorToRgba(str) {
	if (typeof str !== 'string' || !str.trim()) {
		return { r: 0, g: 0, b: 0, a: 1 };
	}
	const canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		return { r: 0, g: 0, b: 0, a: 1 };
	}
	ctx.fillStyle = '#000000';
	ctx.fillStyle = str.trim();
	ctx.fillRect(0, 0, 1, 1);
	const d = ctx.getImageData(0, 0, 1, 1).data;
	return {
		r: d[0],
		g: d[1],
		b: d[2],
		a: d[3] / 255,
	};
}

/**
 * @param {{ r: number, g: number, b: number, a: number }} c
 * @returns {string}
 */
function formatColorCss(c) {
	const r = clamp255(c.r);
	const g = clamp255(c.g);
	const b = clamp255(c.b);
	const a = clamp01(c.a);
	if (a >= 0.999) {
		return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
	}
	const rounded = Math.round(a * 1000) / 1000;
	return `rgba(${r}, ${g}, ${b}, ${rounded})`;
}

/** Solid #rrggbb for native color input (no alpha). */
function getHexForColorInput(color) {
	const { r, g, b } = parseColorToRgba(
		typeof color === 'string' && color.trim() ? color : '#000000'
	);
	return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
}

function renderResponsiveUnitField({
	label,
	fieldKey,
	previewDevice,
	onSelectDevice,
	state,
	patch,
	min,
}) {
	const keys =
		RESPONSIVE_UNIT_KEYS[fieldKey][previewDevice] ||
		RESPONSIVE_UNIT_KEYS[fieldKey].desktop;
	const value = state[keys.value];
	const unit = state[keys.unit];

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

	return (
		<div className="setting-group setting-group--unit">
			<div className="setting-group__head">
				<span className="customize-control-title">{label}</span>
				<div
					className="setting-group__devices"
					role="group"
					aria-label={__('Customizer preview device', 'onepress')}
				>
					{deviceButtons.map((d) => (
						<button
							key={d.id}
							type="button"
							className={`setting-group__device-btn${
								previewDevice === d.id ? ' is-active' : ''
							}`}
							title={d.title}
							aria-label={d.title}
							aria-pressed={previewDevice === d.id}
							onClick={() => onSelectDevice(d.id)}
						>
							<span className={`dashicons ${d.icon}`} aria-hidden />
						</button>
					))}
				</div>
			</div>
			<div className="unit-row">
				<input
					type="number"
					className="input"
					min={min}
					step="any"
					value={value}
					onChange={(e) => patch({ [keys.value]: e.target.value })}
				/>
				<select
					className="input"
					value={unit}
					onChange={(e) => patch({ [keys.unit]: e.target.value })}
				>
					{SIZE_UNITS.map((u) => (
						<option key={u} value={u}>
							{u}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

function renderSpanChoices({ options, value, onChange }) {
	const onKeyPick = (event, next) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onChange(next);
		}
	};

	return (
		<div className="choice-row">
			{options.map((opt) => {
				const active = value === opt.value;
				return (
					<span
						key={opt.value || 'default'}
						className={`choice-btn${active ? ' is-active' : ''}`}
						role="button"
						tabIndex={0}
						aria-pressed={active}
						title={opt.label}
						onClick={() => onChange(opt.value)}
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

	const settingRef = useRef(null);
	settingRef.current = control.setting || control.settings?.default;

	const [state, setState] = useState(() => parseInitialState(params.value, fields));
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

	const handleColorSwatchChange = useCallback((e) => {
		const hex = e.target.value;
		const prev = parseColorToRgba(state.color || '#000000');
		const { r, g, b } = parseColorToRgba(hex);
		patch({ color: formatColorCss({ r, g, b, a: prev.a }) });
	}, [state.color, patch]);

	const handleColorAlphaChange = useCallback(
		(e) => {
			const a = Number(e.target.value) / 100;
			const base =
				state.color && typeof state.color === 'string' && state.color.trim()
					? state.color
					: '#000000';
			const { r, g, b } = parseColorToRgba(base);
			patch({ color: formatColorCss({ r, g, b, a }) });
		},
		[state.color, patch]
	);

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

	const openFontPicker = useCallback(() => {
		removeAllPickerPreviewLinks(controlId);
		setFontPickerOpen(true);
	}, [controlId]);

	const selectFontFromPicker = useCallback(
		(fontId) => {
			patch({ fontId, styleSelect: '' });
			removeAllPickerPreviewLinks(controlId);
			setFontPickerOpen(false);
		},
		[controlId, patch]
	);

	const clearSelectedFont = useCallback(() => {
		patch({ fontId: '', styleSelect: '' });
		removeAllPickerPreviewLinks(controlId);
		removeSelectedFontLink(controlId);
		setFontPickerOpen(false);
	}, [controlId, patch]);

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
		const { css, preview } = buildCssAndPreview(
			state,
			fields,
			webfonts,
			cssSelector,
			previewDevice
		);
		const setting = settingRef.current;
		if (setting) {
			setting.set(JSON.stringify(css));
		}
		applyPreview(preview);
	}, [state, fields, webfonts, cssSelector, previewDevice]);

	useEffect(() => {
		if (!settingsOpen) {
			return undefined;
		}
		const onKey = (e) => {
			if (e.key === 'Escape') {
				setSettingsOpen(false);
			}
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [settingsOpen]);

	const colorAlphaId = useId();

	const colorRgba = useMemo(
		() =>
			parseColorToRgba(
				state.color &&
					typeof state.color === 'string' &&
					state.color.trim()
					? state.color
					: '#000000'
			),
		[state.color]
	);

	const selectorSample = __('The quick brown fox jumps over the lazy dog.', 'onepress');
	const selectorStack = selectedFont ? `"${selectedFont.name}", sans-serif` : 'inherit';
	const sizeBadge =
		state.fontSize !== '' ? `${state.fontSize}${state.fontSizeUnit}` : labels.option_default;
	const textDecorationChoices = [
		{ value: '', label: labels.option_default, icon: 'D', iconClass: 'default' },
		{ value: 'none', label: __('None', 'onepress'), icon: 'N', iconClass: 'none' },
		{ value: 'overline', label: __('Overline', 'onepress'), icon: 'O', iconClass: 'overline' },
		{ value: 'underline', label: __('Underline', 'onepress'), icon: 'U', iconClass: 'underline' },
		{ value: 'line-through', label: __('Line through', 'onepress'), icon: 'S', iconClass: 'line-through' },
	];
	const textTransformChoices = [
		{ value: '', label: labels.option_default, icon: 'Aa', iconClass: 'default' },
		{ value: 'none', label: __('None', 'onepress'), icon: 'Aa', iconClass: 'none' },
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
	if (fields.text_transform && state.textTransform) {
		summaryPreviewStyle.textTransform = state.textTransform;
	}
	if (fields.text_decoration && state.textDecoration) {
		summaryPreviewStyle.textDecoration = state.textDecoration;
	}
	if (fields.color && state.color) {
		summaryPreviewStyle.color = state.color;
	}

	return (
		<>
			<button
				type="button"
				className="onepress-typo-summary-card"
				onClick={() => setSettingsOpen(true)}
				aria-label={__('Open typography options', 'onepress')}
			>
				<span className="onepress-typo-summary-meta">
					<span className="onepress-typo-chip" style={{ fontFamily: selectorStack }}>
						{selectedFont ? selectedFont.name : labels.option_default}
					</span>
					<span className="onepress-typo-chip">{selectedStyleLabel}</span>
					<span className="onepress-typo-chip">{sizeBadge}</span>
				</span>
				<span className="onepress-typo-summary-preview" style={summaryPreviewStyle}>
					{selectorSample}
				</span>
			</button>

			{settingsOpen &&
				createPortal(
					<div
						className="onepress-typo-portal settings-backdrop"
						onMouseDown={(e) => {
							if (e.target === e.currentTarget) {
								setSettingsOpen(false);
							}
						}}
					>
						<div
							className="settings-modal"
							role="dialog"
							aria-modal="true"
							aria-label={__('Typography options', 'onepress')}
						>
							<div className="settings-head">
								<strong>{__('Typography options', 'onepress')}</strong>
								<button
									type="button"
									className="button-link"
									onClick={() => setSettingsOpen(false)}
								>
									{__('Close', 'onepress')}
								</button>
							</div>
							<div className="settings-body">
								{fields.font_family && (
									<div className="setting-group">
										<span className="customize-control-title">{labels.family}:</span>
										<div className="font-family-row">
											<span
												className="input font-family-value clickable"
												role="button"
												tabIndex={0}
												aria-label={__('Open font selector', 'onepress')}
												onClick={openFontPicker}
												onKeyDown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														e.preventDefault();
														openFontPicker();
													}
												}}
											>
												{selectedFont
													? selectedFont.name
													: labels.option_default}
											</span>
											{selectedFont && (
												<button
													type="button"
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
														className="dashicons dashicons-trash"
														aria-hidden
													/>
												</button>
											)}
										</div>
									</div>
								)}

								{fields.font_family && fields.font_style && (
									<div className="setting-group">
										<span className="customize-control-title">{labels.style}</span>
										<select
											className="input"
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

								{fields.font_size &&
									renderResponsiveUnitField({
										label: labels.size,
										fieldKey: 'font_size',
										previewDevice,
										onSelectDevice: selectPreviewDevice,
										state,
										patch,
										min: 0,
									})}

								{fields.line_height &&
									renderResponsiveUnitField({
										label: labels.line_height,
										fieldKey: 'line_height',
										previewDevice,
										onSelectDevice: selectPreviewDevice,
										state,
										patch,
										min: 0,
									})}

								{fields.letter_spacing &&
									renderResponsiveUnitField({
										label: labels.letter_spacing,
										fieldKey: 'letter_spacing',
										previewDevice,
										onSelectDevice: selectPreviewDevice,
										state,
										patch,
										min: -1000,
									})}

								{fields.text_decoration && (
									<div className="setting-group">
										<span className="customize-control-title">{labels.text_decoration}</span>
										{renderSpanChoices({
											options: textDecorationChoices,
											value: state.textDecoration,
											onChange: (next) => patch({ textDecoration: next }),
										})}
									</div>
								)}

								{fields.text_transform && (
									<div className="setting-group">
										<span className="customize-control-title">{labels.text_transform}</span>
										{renderSpanChoices({
											options: textTransformChoices,
											value: state.textTransform,
											onChange: (next) => patch({ textTransform: next }),
										})}
									</div>
								)}

								{fields.color && (
									<div className="setting-group">
										<span className="customize-control-title">{labels.color}</span>
										<span className="color-row">
											<span className="color-swatch-wrap">
												<input
													type="color"
													className="color-swatch"
													aria-label={labels.color}
													value={getHexForColorInput(state.color)}
													onChange={handleColorSwatchChange}
												/>
											</span>
											<input
												type="text"
												className="input"
												value={state.color}
												placeholder={labels.option_default}
												onChange={(e) => patch({ color: e.target.value })}
											/>
										</span>
										<div className="color-alpha-row">
											<label
												className="color-alpha-label"
												htmlFor={colorAlphaId}
											>
												{__('Opacity', 'onepress')}
											</label>
											<input
												id={colorAlphaId}
												type="range"
												className="color-alpha-range"
												min={0}
												max={100}
												value={Math.round(colorRgba.a * 100)}
												onChange={handleColorAlphaChange}
												aria-valuetext={`${Math.round(colorRgba.a * 100)}%`}
											/>
											<span className="color-alpha-value">
												{Math.round(colorRgba.a * 100)}%
											</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>,
					document.body
				)}

			<FontPickerModal
				open={fontPickerOpen}
				controlId={controlId}
				webfonts={webfonts}
				fontGroups={fontGroups}
				currentFontId={state.fontId}
				defaultLabel={labels.option_default}
				onClose={closeFontPicker}
				onSelectFont={selectFontFromPicker}
			/>
		</>
	);
}
