/**
 * Google Fonts CSS2 URLs for font manager items (mirror PHP onepress_font_manager_google_css2_href).
 */

/** @typedef {import('./fontManagerModel').FontManagerItem} FontManagerItem */

/**
 * @param {string} pair
 * @returns {boolean}
 */
export function isValidFontManagerVariationPair(pair) {
	return /^[01],\d{3}$/.test(String(pair || '').trim());
}

/**
 * @param {string} googleDisplayName — API family name (e.g. "Open Sans")
 * @param {string[]} variations — "ital,wght" tokens e.g. "0,400"
 * @returns {string}
 */
export function googleCss2HrefForFontManagerFamily(googleDisplayName, variations) {
	const name = String(googleDisplayName || '').trim();
	if (!name) {
		return '';
	}
	const raw = Array.isArray(variations) ? variations : [];
	const pairs = [...new Set(raw.map((p) => String(p).trim()).filter(isValidFontManagerVariationPair))].sort();
	const usePairs = pairs.length ? pairs : ['0,400'];
	const enc = encodeURIComponent(name).replace(/%20/g, '+');
	return `https://fonts.googleapis.com/css2?family=${enc}:ital,wght@${usePairs.join(';')}&display=swap`;
}

/**
 * @param {FontManagerItem | null | undefined} item
 * @returns {string}
 */
export function fontManagerGoogleItemToCss2Href(item) {
	if (!item || !item.isGoogleFamily) {
		return '';
	}
	const gn = String(item.googleName || '').trim();
	if (!gn) {
		return '';
	}
	return googleCss2HrefForFontManagerFamily(gn, item.variations);
}

/**
 * @param {FontManagerItem[]} items
 * @returns {string[]} unique hrefs
 */
export function uniqueGoogleFontManagerCss2Hrefs(items) {
	const seen = new Set();
	const out = [];
	for (const item of items) {
		const h = fontManagerGoogleItemToCss2Href(item);
		if (h && !seen.has(h)) {
			seen.add(h);
			out.push(h);
		}
	}
	return out;
}
