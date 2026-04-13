/**
 * _meta.fontSlices + merged Google Fonts CSS2 URLs (preview + PHP mirror).
 */
import { parseDeclarationForm } from './declarationForm';
import { findFamilyForModel } from './googleFontCollection';

/** @typedef {{ source: string, slug: string, family: string }} FontSliceMeta */

/**
 * @param {string} weight
 * @returns {string} numeric 100–900 for Google axis
 */
export function normalizeFontWeightForGoogle(weight) {
	const w = String(weight ?? '').trim().toLowerCase();
	if (w === '' || w === 'inherit') {
		return '400';
	}
	if (w === 'normal') {
		return '400';
	}
	if (w === 'bold') {
		return '700';
	}
	if (w === 'bolder') {
		return '700';
	}
	if (w === 'lighter') {
		return '300';
	}
	if (/^\d{3}$/.test(w)) {
		return w;
	}
	return '400';
}

/**
 * @param {string} style
 * @returns {'0'|'1'}
 */
export function normalizeItalForGoogle(style) {
	const s = String(style ?? '').trim().toLowerCase();
	if (s === 'italic' || s === 'oblique') {
		return '1';
	}
	return '0';
}

/**
 * @param {string} declarations
 * @param {FontSliceMeta} sliceMeta
 * @returns {string | null} "ital,wght" pair e.g. "0,400"
 */
export function googleAxisPairFromSlice(declarations, sliceMeta) {
	if (!sliceMeta || sliceMeta.source !== 'google' || !String(sliceMeta.family || '').trim()) {
		return null;
	}
	const { model } = parseDeclarationForm(typeof declarations === 'string' ? declarations : '');
	const ital = normalizeItalForGoogle(model.fontStyle);
	const wght = normalizeFontWeightForGoogle(model.fontWeight);
	return `${ital},${wght}`;
}

/**
 * Walk styling JSON and fill `_meta.fontSlices` from declaration strings + font catalog.
 *
 * @param {Record<string, unknown>} value
 * @param {import('./googleFontCollection').PickerFontFamily[] | null | undefined} families
 */
export function rebuildFontSlicesInValue(value, families) {
	if (!value || typeof value !== 'object' || !value._meta || !Array.isArray(value._meta.states)) {
		return;
	}
	/** @type {Record<string, Record<string, FontSliceMeta>>} */
	const fontSlices = {};
	for (const entry of value._meta.states) {
		if (!entry || typeof entry !== 'object') {
			continue;
		}
		const keys = Object.keys(entry);
		if (keys.length !== 1) {
			continue;
		}
		const stateKey = keys[0];
		const slice = value[stateKey];
		if (!slice || typeof slice !== 'object' || Array.isArray(slice)) {
			continue;
		}
		for (const deviceId of Object.keys(slice)) {
			const raw = slice[deviceId];
			if (typeof raw !== 'string') {
				continue;
			}
			const { model } = parseDeclarationForm(raw);
			const ff = String(model.fontFamily || '').trim();
			if (!ff) {
				continue;
			}
			const fam = findFamilyForModel(families, ff);
			if (!fam) {
				fontSlices[stateKey] = fontSlices[stateKey] || {};
				fontSlices[stateKey][deviceId] = {
					source: 'custom',
					slug: '',
					family: '',
				};
				continue;
			}
			fontSlices[stateKey] = fontSlices[stateKey] || {};
			if (fam.isSystem) {
				fontSlices[stateKey][deviceId] = {
					source: 'system',
					slug: fam.slug,
					family: fam.name,
				};
			} else {
				fontSlices[stateKey][deviceId] = {
					source: 'google',
					slug: fam.slug,
					family: fam.name,
				};
			}
		}
	}
	const nextMeta = { ...value._meta };
	if (Object.keys(fontSlices).length === 0) {
		delete nextMeta.fontSlices;
	} else {
		nextMeta.fontSlices = fontSlices;
	}
	value._meta = nextMeta;
}

/**
 * @param {Map<string, Set<string>>} acc
 * @param {Record<string, unknown> | null | undefined} value
 */
export function mergeGoogleFontAxesInto(acc, value) {
	if (!value || typeof value !== 'object' || !value._meta || !Array.isArray(value._meta.states)) {
		return;
	}
	const fontSlices = value._meta.fontSlices;
	if (!fontSlices || typeof fontSlices !== 'object') {
		return;
	}
	for (const entry of value._meta.states) {
		if (!entry || typeof entry !== 'object') {
			continue;
		}
		const keys = Object.keys(entry);
		if (keys.length !== 1) {
			continue;
		}
		const stateKey = keys[0];
		const slice = value[stateKey];
		if (!slice || typeof slice !== 'object') {
			continue;
		}
		const perDevice = fontSlices[stateKey];
		if (!perDevice || typeof perDevice !== 'object') {
			continue;
		}
		for (const deviceId of Object.keys(perDevice)) {
			const meta = perDevice[deviceId];
			if (!meta || meta.source !== 'google' || !String(meta.family || '').trim()) {
				continue;
			}
			const decl = typeof slice[deviceId] === 'string' ? slice[deviceId] : '';
			const pair = googleAxisPairFromSlice(decl, meta);
			if (!pair) {
				continue;
			}
			const family = String(meta.family).trim();
			if (!acc.has(family)) {
				acc.set(family, new Set());
			}
			acc.get(family).add(pair);
		}
	}
}

/**
 * @param {Iterable<Record<string, unknown>>} values
 * @returns {Map<string, Set<string>>}
 */
export function collectMergedGoogleFontAxes(values) {
	const acc = new Map();
	for (const v of values) {
		mergeGoogleFontAxesInto(acc, v);
	}
	return acc;
}

/**
 * @param {Map<string, Set<string>>} merged
 * @returns {string}
 */
export function buildGoogleFontsCss2Href(merged) {
	if (!merged || merged.size === 0) {
		return '';
	}
	const families = [...merged.keys()].sort((a, b) => a.localeCompare(b));
	const parts = [];
	for (const name of families) {
		const set = merged.get(name);
		const pairs = [...set].sort((a, b) =>
			a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
		);
		const enc = encodeURIComponent(name).replace(/%20/g, '+');
		parts.push(`family=${enc}:ital,wght@${pairs.join(';')}`);
	}
	return `https://fonts.googleapis.com/css2?${parts.join('&')}&display=swap`;
}
