/**
 * Slider / single-property CSS for Customizer preview <style> injection.
 * Mirrors inc/customize-controls/slider/helper.php — onepress_slider_css.
 */

const ALLOWED_PROPERTIES = new Set([
	'width',
	'max-width',
	'min-width',
	'height',
	'max-height',
	'min-height',
	'flex-basis',
]);

/**
 * @param {string} prop
 * @returns {string}
 */
function sanitizeProperty(prop) {
	const p = String(prop || '')
		.trim()
		.toLowerCase();
	return ALLOWED_PROPERTIES.has(p) ? p : '';
}

/**
 * @param {string} settingId
 * @returns {string}
 */
export function sliderPreviewStyleId(settingId) {
	return `onepress-slider-preview-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/**
 * @param {Record<string, string>} data
 * @param {string} selector
 * @param {string} property
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @returns {string}
 */
export function buildSliderPreviewCss(data, selector, property, breakpoints) {
	const prop = sanitizeProperty(property);
	if (!prop || !data || typeof data !== 'object' || !selector?.trim()) {
		return '';
	}

	const tabletBp = breakpoints?.tablet || '991px';
	const mobileBp = breakpoints?.mobile || '767px';

	const pair = (num, unit) => {
		const n = num != null && String(num).trim() !== '' ? String(num).trim() : '';
		if (n === '' || Number.isNaN(Number(n))) {
			return '';
		}
		const u = unit && String(unit).trim() ? String(unit).trim() : 'px';
		return `${n}${u}`;
	};

	const baseVal = pair(data.value, data.unit || 'px');
	const tabVal = pair(data.valueTablet, data.unitTablet || data.unit || 'px');
	const mobVal = pair(data.valueMobile, data.unitMobile || data.unit || 'px');

	const block = (val) => {
		if (!val) {
			return '';
		}
		return `${selector.trim()} {\n\t${prop}: ${val};\n}`;
	};

	let out = block(baseVal);
	if (tabVal) {
		const rule = block(tabVal);
		if (rule) {
			out += `\n@media (max-width: ${tabletBp}) {\n${rule}\n}\n`;
		}
	}
	if (mobVal) {
		const rule = block(mobVal);
		if (rule) {
			out += `\n@media (max-width: ${mobileBp}) {\n${rule}\n}\n`;
		}
	}

	return out.trim();
}
