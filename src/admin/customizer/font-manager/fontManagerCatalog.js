/**
 * Font manager items → PickerFontFamily[] for styling UI + font slice rebuild.
 */
import { displayNameForItem, normalizeFontManagerItem } from './fontManagerModel';

/** @typedef {import('./fontManagerModel').FontManagerItem} FontManagerItem */
/** @typedef {import('../styling/googleFontCollection').PickerFontFamily} PickerFontFamily */

/**
 * @param {string[]} variations axis pairs e.g. "0,400"
 * @returns {{ fontWeight: string, fontStyle: string }[]}
 */
export function variationsToFontFaces(variations) {
	if (!Array.isArray(variations) || variations.length === 0) {
		return [{ fontWeight: '400', fontStyle: 'normal' }];
	}
	const out = [];
	for (const v of variations) {
		const m = /^([01]),(\d{3})$/.exec(String(v).trim());
		if (!m) {
			continue;
		}
		out.push({
			fontWeight: m[2],
			fontStyle: m[1] === '1' ? 'italic' : 'normal',
		});
	}
	return out.length ? out : [{ fontWeight: '400', fontStyle: 'normal' }];
}

/**
 * @param {FontManagerItem} item
 * @param {PickerFontFamily[] | null | undefined} googleFamilies — optional, for preview image URL by slug
 * @returns {PickerFontFamily & { __rowId?: string }}
 */
export function fontManagerItemToPickerFontFamily(item, googleFamilies) {
	const isGoogle = Boolean(item.isGoogleFamily);
	let preview = '';
	if (isGoogle && item.googleSlug && googleFamilies?.length) {
		const g = googleFamilies.find((f) => !f.isSystem && f.slug === item.googleSlug);
		if (g?.preview) {
			preview = g.preview;
		}
	}
	const slugForSlices =
		isGoogle && item.googleSlug ? item.googleSlug : item.id;
	return {
		slug: slugForSlices,
		name: displayNameForItem(item) || item.id,
		fontFamily: item.fontFamily,
		preview,
		fontFace: isGoogle ? variationsToFontFaces(item.variations) : [],
		isSystem: !isGoogle,
		__rowId: item.id,
	};
}

/**
 * @param {unknown} raw Parsed font manager root or JSON string
 * @param {PickerFontFamily[] | null | undefined} googleFamilies
 * @returns {PickerFontFamily[]}
 */
export function fontManagerValueToPickerFamilies(raw, googleFamilies) {
	let root = raw;
	if (typeof raw === 'string' && raw.trim()) {
		try {
			root = JSON.parse(raw);
		} catch {
			return [];
		}
	}
	if (!root || typeof root !== 'object') {
		return [];
	}
	const items = /** @type {{ items?: unknown }} */ (root).items;
	if (!Array.isArray(items)) {
		return [];
	}
	return items
		.map((row) =>
			fontManagerItemToPickerFontFamily(normalizeFontManagerItem(row), googleFamilies)
		)
		.filter((f) => f.fontFamily.trim() !== '' || f.name);
}
