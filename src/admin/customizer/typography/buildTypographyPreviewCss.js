/**
 * Typography CSS string for Customizer preview <style> injection.
 * Mirrors inc/customize-controls/typography/helper.php — onepress_typo_css + onepress_typo_css_block.
 */

const RESPONSIVE_KEYS = [
	'font-size-tablet',
	'font-size-mobile',
	'line-height-tablet',
	'line-height-mobile',
	'letter-spacing-tablet',
	'letter-spacing-mobile',
];

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

	const tabletBp = breakpoints?.tablet || '991px';
	const mobileBp = breakpoints?.mobile || '767px';

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
