/**
 * Spacing CSS for Customizer preview <style> injection.
 * Mirrors inc/customize-controls/spacing/helper.php — onepress_spacing_css + onepress_spacing_css_block.
 */

const PREFIXES = ['padding', 'margin'];
const SIDES = ['top', 'right', 'bottom', 'left'];

/**
 * @param {Record<string, string>} css
 * @param {''|'tablet'|'mobile'} suffix
 * @returns {Record<string, string>}
 */
function extractProps(css, suffix) {
	const props = {};
	const suf = suffix ? `-${suffix}` : '';
	for (const prefix of PREFIXES) {
		for (const side of SIDES) {
			const key = `${prefix}-${side}${suf}`;
			const v = css[key];
			if (v !== undefined && v !== null && String(v).trim() !== '') {
				props[`${prefix}-${side}`] = v;
			}
		}
	}
	return props;
}

/**
 * @param {Record<string, string>} props
 * @param {string} selector
 * @returns {string}
 */
function spacingCssBlock(props, selector) {
	if (!props || !Object.keys(props).length || !selector) {
		return '';
	}
	const lines = [];
	for (const [k, v] of Object.entries(props)) {
		if (v !== '' && v != null) {
			lines.push(`\t${k}: ${v};`);
		}
	}
	if (!lines.length) {
		return '';
	}
	return `${selector} {\n${lines.join('\n')}\n}`;
}

/**
 * @param {string} settingId
 * @returns {string}
 */
export function spacingPreviewStyleId(settingId) {
	return `onepress-spacing-preview-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/**
 * @param {Record<string, string>} css Flat JSON from spacing control.
 * @param {string} selector
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @returns {string}
 */
export function buildSpacingPreviewCss(css, selector, breakpoints) {
	if (!css || typeof css !== 'object' || !selector || !String(selector).trim()) {
		return '';
	}

	const tabletBp = breakpoints?.tablet || '991px';
	const mobileBp = breakpoints?.mobile || '767px';

	const base = extractProps(css, '');
	const tabletProps = extractProps(css, 'tablet');
	const mobileProps = extractProps(css, 'mobile');

	let out = spacingCssBlock(base, selector);
	if (!out) {
		out = '';
	}

	if (Object.keys(tabletProps).length) {
		const tabletRule = spacingCssBlock(tabletProps, selector);
		if (tabletRule) {
			out += `\n@media (max-width: ${tabletBp}) {\n${tabletRule}\n}\n`;
		}
	}

	if (Object.keys(mobileProps).length) {
		const mobileRule = spacingCssBlock(mobileProps, selector);
		if (mobileRule) {
			out += `\n@media (max-width: ${mobileBp}) {\n${mobileRule}\n}\n`;
		}
	}

	return out.trim();
}
