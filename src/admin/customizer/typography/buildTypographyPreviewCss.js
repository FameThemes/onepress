/**
 * Typography CSS for Customizer preview <style> injection.
 *
 * - buildTypographyPreviewCss — mirrors helper.php onepress_typo_css() (real properties on a selector + @media).
 * - buildTypographyPreviewCssVars / layers — mirror css-vars.php onepress_typo_flat_to_var_declaration_layers()
 *   + onepress_custom_inline_style() (:root defaults, then @media with same custom property names, no *-tablet suffixes).
 */

const RESPONSIVE_KEYS = [
	'font-size-tablet',
	'font-size-mobile',
	'line-height-tablet',
	'line-height-mobile',
	'letter-spacing-tablet',
	'letter-spacing-mobile',
];

const DEFAULT_TYPO_BREAKPOINTS = Object.freeze({
	tablet: '991px',
	mobile: '767px',
});

/**
 * Same source as spacing/slider preview: wp_localize_script(…, 'onepressBackgroundBreakpoints', …).
 * Aligns with PHP filter onepress_typo_responsive_breakpoints.
 *
 * @returns {{ tablet: string, mobile: string }}
 */
export function getTypographyPreviewBreakpoints() {
	const b =
		typeof window !== 'undefined' && window.onepressBackgroundBreakpoints;
	if (b && typeof b === 'object') {
		return {
			tablet: String(b.tablet || DEFAULT_TYPO_BREAKPOINTS.tablet),
			mobile: String(b.mobile || DEFAULT_TYPO_BREAKPOINTS.mobile),
		};
	}
	return { ...DEFAULT_TYPO_BREAKPOINTS };
}

/**
 * @param {string} settingId
 * @returns {string}
 */
export function typographyPreviewStyleId(settingId) {
	return `onepress-typo-preview-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/**
 * PHP intval() for font-size strings (e.g. "18px" → 18).
 *
 * @param {string} s
 * @returns {number}
 */
function phpIntval(s) {
	const n = parseInt(String(s), 10);
	return Number.isFinite(n) ? n : 0;
}

/**
 * @param {Record<string, string>} css
 * @param {string|string[]} selector
 * @param {number} basePx
 * @returns {string}
 */
function typographyCssBlock(css, selector, basePx) {
	if (!css || typeof css !== 'object' || !selector) {
		return '';
	}

	const decls = { ...css };
	if (decls['font-family'] && String(decls['font-family']).trim() !== '') {
		decls['font-family'] = `"${String(decls['font-family']).trim()}"`;
	}

	let code = '';
	if (Array.isArray(selector)) {
		code += [...new Set(selector)].join('\n');
	} else {
		code += String(selector);
	}

	code += ' { \n';

	for (const [k, v] of Object.entries(decls)) {
		if (k === 'font-size') {
			continue;
		}
		if (v && typeof v !== 'object') {
			code += `\t${k}: ${v};\n`;
		}
	}

	if (
		css['font-size'] !== undefined &&
		css['font-size'] !== null &&
		String(css['font-size']).trim() !== ''
	) {
		const rem = phpIntval(css['font-size']) / Math.max(1, basePx);
		code += `\tfont-size: ${rem}rem;\n`;
	}

	code += ' }';
	return code;
}

/**
 * @param {Record<string, string>} css Flat theme-mod JSON (Customizer setting value).
 * @param {string} selector
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @param {number} [basePx=16]
 * @returns {string}
 */
export function buildTypographyPreviewCss(
	css,
	selector,
	breakpoints,
	basePx = 16
) {
	if (!css || typeof css !== 'object' || !selector || !String(selector).trim()) {
		return '';
	}

	const bps = breakpoints || getTypographyPreviewBreakpoints();
	const tabletBp = bps.tablet || DEFAULT_TYPO_BREAKPOINTS.tablet;
	const mobileBp = bps.mobile || DEFAULT_TYPO_BREAKPOINTS.mobile;

	const base = { ...css };
	for (const k of RESPONSIVE_KEYS) {
		delete base[k];
	}

	const tabletProps = {};
	if (css['font-size-tablet']) {
		tabletProps['font-size'] = css['font-size-tablet'];
	}
	if (css['line-height-tablet']) {
		tabletProps['line-height'] = css['line-height-tablet'];
	}
	if (css['letter-spacing-tablet']) {
		tabletProps['letter-spacing'] = css['letter-spacing-tablet'];
	}

	const mobileProps = {};
	if (css['font-size-mobile']) {
		mobileProps['font-size'] = css['font-size-mobile'];
	}
	if (css['line-height-mobile']) {
		mobileProps['line-height'] = css['line-height-mobile'];
	}
	if (css['letter-spacing-mobile']) {
		mobileProps['letter-spacing'] = css['letter-spacing-mobile'];
	}

	const outMain = typographyCssBlock(base, selector, basePx);
	if (!outMain) {
		return '';
	}

	let out = outMain;

	const tabletRule = typographyCssBlock(tabletProps, selector, basePx);
	if (tabletRule) {
		out += `\n@media (max-width: ${tabletBp}) {\n${tabletRule}\n}\n`;
	}

	const mobileRule = typographyCssBlock(mobileProps, selector, basePx);
	if (mobileRule) {
		out += `\n@media (max-width: ${mobileBp}) {\n${mobileRule}\n}\n`;
	}

	return out;
}

/**
 * @param {string} settingId
 * @returns {string}
 */
export function typographySettingIdToSlug(settingId) {
	let s = String(settingId || '').trim();
	if (s.startsWith('onepress_')) {
		s = s.slice('onepress_'.length);
	}
	return s.replace(/_/g, '-');
}

/**
 * @param {string} slug Normalized segment (matches onepress_typo_setting_id_to_slug in css-vars.php).
 * @returns {string} Custom property name for JSON "color".
 */
function typographyJsonColorPropertyName(slug) {
	const t = String(slug || '').trim();
	return t ? `--${t}` : '';
}

/**
 * @param {string} value
 * @param {number} basePx
 * @returns {string}
 */
function fontSizeToVarValue(value, basePx) {
	const s = String(value || '').trim();
	if (!s) {
		return '';
	}
	if (/%|em|rem|ch|ex|vh|vw$/i.test(s)) {
		return s;
	}
	const n = parseInt(s, 10);
	if (!Number.isFinite(n) || n <= 0) {
		return '';
	}
	return `${n / Math.max(1, basePx)}rem`;
}

/**
 * Split theme-mod JSON into :root / tablet / mobile custom property maps (same names per layer; JSON *-tablet keys only).
 *
 * @param {Record<string, string>} flat
 * @param {string} slug From typographySettingIdToSlug(settingId).
 * @param {number} [basePx=16]
 * @returns {{ root: Record<string, string>, tablet: Record<string, string>, mobile: Record<string, string> }}
 */
export function typographyJsonToCustomPropertyLayers(flat, slug, basePx = 16) {
	const prefix = `--${slug}-`;
	const root = {};
	const tablet = {};
	const mobile = {};

	if (flat['font-family']) {
		const fam = String(flat['font-family']).trim();
		if (fam) {
			root[`${prefix}font-family`] = `"${fam.replace(/"/g, '\\"')}"`;
		}
	}
	if (flat['font-weight']) {
		root[`${prefix}font-weight`] = String(flat['font-weight']);
	}
	if (flat['font-style'] && flat['font-style'] !== 'normal') {
		root[`${prefix}font-style`] = String(flat['font-style']);
	}

	const setFontSize = (layer, jsonKey) => {
		if (!flat[jsonKey]) {
			return;
		}
		const v = fontSizeToVarValue(flat[jsonKey], basePx);
		if (v) {
			layer[`${prefix}font-size`] = v;
		}
	};
	setFontSize(root, 'font-size');
	setFontSize(tablet, 'font-size-tablet');
	setFontSize(mobile, 'font-size-mobile');

	const setSpacing = (layer, jsonKey, cssName) => {
		if (!flat[jsonKey]) {
			return;
		}
		layer[`${prefix}${cssName}`] = String(flat[jsonKey]);
	};
	setSpacing(root, 'line-height', 'line-height');
	setSpacing(tablet, 'line-height-tablet', 'line-height');
	setSpacing(mobile, 'line-height-mobile', 'line-height');
	setSpacing(root, 'letter-spacing', 'letter-spacing');
	setSpacing(tablet, 'letter-spacing-tablet', 'letter-spacing');
	setSpacing(mobile, 'letter-spacing-mobile', 'letter-spacing');

	for (const tk of ['text-decoration', 'text-transform']) {
		if (flat[tk]) {
			root[`${prefix}${tk}`] = String(flat[tk]);
		}
	}

	if (flat.color && String(flat.color).trim()) {
		root[typographyJsonColorPropertyName(slug)] = String(flat.color).trim();
	}

	return { root, tablet, mobile };
}

/**
 * @param {{ root: Record<string, string>, tablet: Record<string, string>, mobile: Record<string, string> }} layers
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @returns {string}
 */
export function formatTypographyPreviewCssVarsFromLayers(layers, breakpoints) {
	const bps = breakpoints || getTypographyPreviewBreakpoints();
	const tabletBp = bps.tablet || DEFAULT_TYPO_BREAKPOINTS.tablet;
	const mobileBp = bps.mobile || DEFAULT_TYPO_BREAKPOINTS.mobile;

	const joinDecls = (obj) =>
		Object.entries(obj)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');

	const { root, tablet, mobile } = layers;
	let out = '';
	if (Object.keys(root).length) {
		out += `:root{${joinDecls(root)};}`;
	}
	if (Object.keys(tablet).length) {
		out += `@media (max-width: ${tabletBp}){:root{${joinDecls(tablet)};}}`;
	}
	if (Object.keys(mobile).length) {
		out += `@media (max-width: ${mobileBp}){:root{${joinDecls(mobile)};}}`;
	}
	return out;
}

/**
 * @param {Record<string, string>} flat
 * @param {string} settingId
 * @param {number} [basePx=16]
 * @param {{ tablet?: string, mobile?: string }} [breakpoints] Defaults from getTypographyPreviewBreakpoints().
 * @returns {string} :root + @media overrides (same custom property names as desktop).
 */
export function buildTypographyPreviewCssVars(
	flat,
	settingId,
	basePx = 16,
	breakpoints
) {
	const slug = typographySettingIdToSlug(settingId);
	if (!slug || !flat || typeof flat !== 'object') {
		return '';
	}

	const keys = Object.keys(flat).filter(
		(k) =>
			flat[k] !== undefined &&
			flat[k] !== null &&
			String(flat[k]).trim() !== ''
	);
	if (!keys.length) {
		return '';
	}

	const layers = typographyJsonToCustomPropertyLayers(flat, slug, basePx);
	if (
		!Object.keys(layers.root).length &&
		!Object.keys(layers.tablet).length &&
		!Object.keys(layers.mobile).length
	) {
		return '';
	}

	return formatTypographyPreviewCssVarsFromLayers(
		layers,
		breakpoints || getTypographyPreviewBreakpoints()
	);
}
