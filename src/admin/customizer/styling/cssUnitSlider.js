/**
 * Parse / format a single numeric CSS length (one token, optional unit).
 * Multi-value (e.g. margin shorthand) returns null so UI falls back to plain text.
 */

const SINGLE_LEN = /^\s*(-?(?:\d+\.?\d*|\.\d+))\s*([a-z%]*)\s*$/i;

/**
 * @param {string} raw
 * @param {string} defaultSuffix e.g. 'px' or '' for unitless
 * @returns {{ num: number, suffix: string } | null}
 */
export function parseCssSingleLengthValue(raw, defaultSuffix = 'px') {
	const s = String(raw).trim();
	if (s === '') {
		return { num: 0, suffix: defaultSuffix };
	}
	const m = s.match(SINGLE_LEN);
	if (!m) {
		return null;
	}
	const num = parseFloat(m[1]);
	if (!Number.isFinite(num)) {
		return null;
	}
	const suffix = (m[2] || defaultSuffix).trim();
	return { num, suffix: suffix || defaultSuffix };
}

/**
 * @param {number} num
 * @param {string} suffix
 */
export function formatCssSingleLengthValue(num, suffix) {
	if (!Number.isFinite(num)) {
		return '';
	}
	const s = suffix || '';
	const rounded = Math.round(num * 10000) / 10000;
	const str = Number.isInteger(rounded) ? String(rounded) : String(rounded);
	return str + s;
}

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 */
export function clampNumber(n, min, max) {
	return Math.min(max, Math.max(min, n));
}

/**
 * @param {string} presetDefaultSuffix — `''` means unitless (e.g. line-height); context must not override.
 * @param {string | undefined} preferredSuffix — from length-unit context
 * @returns {string}
 */
export function resolveEffectiveLengthSuffix(presetDefaultSuffix, preferredSuffix) {
	if (presetDefaultSuffix === '') {
		return '';
	}
	const p = typeof preferredSuffix === 'string' ? preferredSuffix.trim() : '';
	return p || presetDefaultSuffix;
}

/**
 * When the user picks a new default unit chip: keep the numeric part, only swap the suffix
 * (e.g. `16px` → `16rem`, not a px↔rem scale conversion).
 *
 * @param {string} raw
 * @param {string} targetSuffix
 * @returns {string | null} null if not a single parseable length token
 */
export function replaceSingleLengthUnitSuffix(raw, targetSuffix) {
	const t = (targetSuffix || 'px').trim().toLowerCase();
	const s = String(raw).trim();
	if (s === '') {
		return null;
	}
	const parsed = parseCssSingleLengthValue(s, 'px');
	if (parsed === null) {
		return null;
	}
	return formatCssSingleLengthValue(parsed.num, t);
}

/**
 * Lowercase unit from a single-token length, or null if none / not parseable.
 *
 * @param {string} raw
 * @returns {string | null}
 */
export function explicitLengthCssUnit(raw) {
	const s = String(raw).trim();
	const m = s.match(SINGLE_LEN);
	if (!m || !m[2] || !String(m[2]).trim()) {
		return null;
	}
	return String(m[2]).trim().toLowerCase();
}

/** @type {Record<string, { min: number, max: number, step: number, defaultSuffix: string }>} */
export const SLIDER_PRESETS = {
	fontSize: { min: 8, max: 96, step: 1, defaultSuffix: 'px' },
	lineHeight: { min: 0.5, max: 3.5, step: 0.05, defaultSuffix: '' },
	letterSpacing: { min: -10, max: 40, step: 0.5, defaultSuffix: 'px' },
	length: { min: 0, max: 240, step: 1, defaultSuffix: 'px' },
	lengthWide: { min: 0, max: 1600, step: 1, defaultSuffix: 'px' },
	inset: { min: -400, max: 1200, step: 1, defaultSuffix: 'px' },
	borderWidth: { min: 0, max: 32, step: 1, defaultSuffix: 'px' },
	outlineOffset: { min: -60, max: 60, step: 1, defaultSuffix: 'px' },
	radius: { min: 0, max: 200, step: 1, defaultSuffix: 'px' },
	gap: { min: 0, max: 120, step: 1, defaultSuffix: 'px' },
	boxShadowOffset: { min: -80, max: 80, step: 1, defaultSuffix: 'px' },
	boxShadowBlur: { min: 0, max: 120, step: 1, defaultSuffix: 'px' },
	boxShadowSpread: { min: -80, max: 80, step: 1, defaultSuffix: 'px' },
};
