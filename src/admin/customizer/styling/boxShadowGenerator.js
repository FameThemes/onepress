/**
 * Parse / serialize a single CSS box-shadow for the generator UI.
 * Comma-separated (multiple shadows) or unparsable colors fall back to raw CSS editing.
 */
import { colord } from 'colord';
import {
	formatCssSingleLengthValue,
	parseCssSingleLengthValue,
} from './cssUnitSlider';

/** @typedef {{ inset: boolean, offsetX: string, offsetY: string, blur: string, spread: string, colorHex: string, opacity: number }} BoxShadowGeneratorParts */

const EMPTY_UI = {
	inset: false,
	offsetX: '0px',
	offsetY: '0px',
	blur: '0px',
	spread: '0px',
	colorHex: '#000000',
	opacity: 1,
};

/**
 * @param {string} str
 * @returns {{ value: string, rest: string } | null}
 */
function pullLengthToken(str) {
	const s = str.trimStart();
	if (!s) {
		return null;
	}
	const m = s.match(/^(-?(?:\d+\.?\d*|\.\d+))([a-z%]+)?/i);
	if (!m) {
		return null;
	}
	const num = m[1];
	const unit = m[2] || '';
	let value;
	if (unit) {
		value = num + unit;
	} else if (num === '0' || num === '-0') {
		value = '0';
	} else {
		return null;
	}
	return { value, rest: s.slice(m[0].length).trimStart() };
}

/**
 * True when offset/blur/spread are all zero (no visible shadow, with or without inset).
 * @param {BoxShadowGeneratorParts} p
 */
function isGeometryInvisible(p) {
	for (const k of [p.offsetX, p.offsetY, p.blur, p.spread]) {
		const n = parseCssSingleLengthValue(k, 'px');
		if (!n || Math.abs(n.num) > 1e-9) {
			return false;
		}
	}
	return true;
}

/**
 * @param {string} css
 * @returns {{ ok: true } & BoxShadowGeneratorParts | { ok: false, raw: string }}
 */
export function parseBoxShadow(css) {
	const raw = String(css || '').trim();
	if (!raw || /^none$/i.test(raw)) {
		return { ok: true, ...EMPTY_UI };
	}
	if (raw.includes(',')) {
		return { ok: false, raw };
	}
	let s = raw.replace(/!important\s*$/i, '').trim();
	let inset = false;
	if (/^inset\b/i.test(s)) {
		inset = true;
		s = s.replace(/^inset\s+/i, '').trim();
	}
	const lengths = [];
	let rest = s;
	for (let i = 0; i < 4; i++) {
		const p = pullLengthToken(rest);
		if (!p) {
			break;
		}
		lengths.push(p.value);
		rest = p.rest;
	}
	if (lengths.length < 2) {
		return { ok: false, raw };
	}
	const colorStr = rest.trim();
	if (!colorStr) {
		return {
			ok: true,
			inset,
			offsetX: lengths[0],
			offsetY: lengths[1],
			blur: lengths[2] || '0px',
			spread: lengths[3] || '0px',
			colorHex: '#000000',
			opacity: 1,
		};
	}
	const c = colord(colorStr);
	if (!c.isValid()) {
		return { ok: false, raw };
	}
	return {
		ok: true,
		inset,
		offsetX: lengths[0],
		offsetY: lengths[1],
		blur: lengths[2] || '0px',
		spread: lengths[3] || '0px',
		colorHex: c.alpha(1).toHex(),
		opacity: c.alpha(),
	};
}

/**
 * @param {BoxShadowGeneratorParts} parts
 * @returns {string}
 */
export function serializeBoxShadow(parts) {
	if (isGeometryInvisible(parts)) {
		return '';
	}
	const base = colord(parts.colorHex);
	if (!base.isValid()) {
		return '';
	}
	const a = Math.min(1, Math.max(0, parts.opacity));
	const withA = base.alpha(a);
	const colorCss =
		a >= 0.999 ? base.alpha(1).toHex() : withA.toRgbString();
	const tokens = [];
	if (parts.inset) {
		tokens.push('inset');
	}
	tokens.push(parts.offsetX, parts.offsetY, parts.blur, parts.spread, colorCss);
	return tokens.join(' ');
}

/**
 * @param {BoxShadowGeneratorParts} parts
 * @param {string} key
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @param {string} defaultSuffix
 */
export function patchLength(parts, key, n, min, max, defaultSuffix) {
	const prev = parseCssSingleLengthValue(parts[key], defaultSuffix);
	const suffix = prev && prev.suffix ? prev.suffix : defaultSuffix;
	const clamped = Math.min(max, Math.max(min, n));
	return {
		...parts,
		[key]: formatCssSingleLengthValue(clamped, suffix),
	};
}
