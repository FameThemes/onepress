/**
 * Font picker: system presets + Google Fonts from REST (API order preserved).
 */

/** @typedef {{ fontWeight: string, fontStyle: string, preview: string }} GoogleFontFace */
/**
 * @typedef {{
 *   slug: string,
 *   name: string,
 *   fontFamily: string,
 *   preview: string,
 *   fontFace: GoogleFontFace[],
 *   isSystem?: boolean
 * }} PickerFontFamily
 */

/**
 * Ten common system / generic font stacks (shown first in the picker; not from Google API).
 * @type {ReadonlyArray<{ slug: string, name: string, fontFamily: string }>}
 */
const SYSTEM_FONT_DEFINITIONS = [
	{
		slug: 'onepress-system-ui',
		name: 'System UI',
		fontFamily: 'system-ui, sans-serif',
	},
	{
		slug: 'onepress-system-sans-stack',
		name: 'System sans (Apple / Segoe)',
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
	},
	{
		slug: 'onepress-generic-sans-serif',
		name: 'Sans-serif (generic)',
		fontFamily: 'sans-serif',
	},
	{
		slug: 'onepress-generic-serif',
		name: 'Serif (generic)',
		fontFamily: 'serif',
	},
	{
		slug: 'onepress-generic-monospace',
		name: 'Monospace (generic)',
		fontFamily: 'monospace',
	},
	{
		slug: 'onepress-ui-monospace',
		name: 'UI monospace',
		fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
	},
	{
		slug: 'onepress-stack-georgia',
		name: 'Georgia',
		fontFamily: 'Georgia, "Times New Roman", Times, serif',
	},
	{
		slug: 'onepress-stack-arial',
		name: 'Arial / Helvetica',
		fontFamily: 'Arial, Helvetica, sans-serif',
	},
	{
		slug: 'onepress-stack-times',
		name: 'Times New Roman',
		fontFamily: '"Times New Roman", Times, serif',
	},
	{
		slug: 'onepress-stack-verdana',
		name: 'Verdana',
		fontFamily: 'Verdana, Geneva, sans-serif',
	},
];

/**
 * @returns {PickerFontFamily[]}
 */
export function getSystemFontPresets() {
	return SYSTEM_FONT_DEFINITIONS.map((def) => ({
		slug: def.slug,
		name: def.name,
		fontFamily: def.fontFamily,
		preview: '',
		fontFace: [],
		isSystem: true,
	}));
}

/**
 * @param {PickerFontFamily[] | null | undefined} googleFamilies — REST order, unchanged
 * @returns {PickerFontFamily[]}
 */
export function mergePickerFamilies(googleFamilies) {
	const g = Array.isArray(googleFamilies) ? googleFamilies : [];
	return [...getSystemFontPresets(), ...g];
}

/**
 * @param {unknown} item
 * @returns {PickerFontFamily | null}
 */
function parseFontFamilyItem(item) {
	if (!item || typeof item !== 'object') {
		return null;
	}
	const raw = /** @type {Record<string, unknown>} */ (item);
	const s = /** @type {Record<string, unknown>} */ (
		raw.font_family_settings || raw.fontFamilySettings || raw
	);
	if (!s || typeof s !== 'object') {
		return null;
	}
	const slug = String(s.slug || '');
	const name = String(s.name || '');
	const fontFamily = String(s.fontFamily || '');
	if (!slug || !name || !fontFamily) {
		return null;
	}
	const fontFaceRaw = Array.isArray(s.fontFace) ? s.fontFace : [];
	const fontFace = fontFaceRaw
		.map((f) => {
			if (!f || typeof f !== 'object') {
				return null;
			}
			const face = /** @type {Record<string, unknown>} */ (f);
			return {
				fontWeight: String(face.fontWeight ?? '400'),
				fontStyle: String(face.fontStyle ?? 'normal'),
				preview: face.preview ? String(face.preview) : '',
			};
		})
		.filter(Boolean);
	return {
		slug,
		name,
		fontFamily,
		preview: s.preview ? String(s.preview) : '',
		fontFace: /** @type {GoogleFontFace[]} */ (fontFace),
		isSystem: false,
	};
}

/**
 * @param {unknown} json
 * @returns {PickerFontFamily[]}
 */
export function normalizeFontCollectionResponse(json) {
	if (!json || typeof json !== 'object') {
		return [];
	}
	const raw = /** @type {Record<string, unknown>} */ (json).font_families;
	if (!Array.isArray(raw)) {
		return [];
	}
	return raw.map(parseFontFamilyItem).filter(Boolean);
}

/**
 * Google Fonts only, same order as REST payload (no client-side reorder).
 * @returns {Promise<PickerFontFamily[]>}
 */
export async function fetchGoogleFontFamilies() {
	const root =
		typeof window !== 'undefined' && window.wpApiSettings?.root
			? window.wpApiSettings.root
			: `${window.location.origin}/wp-json/`;
	const base = String(root).replace(/\/?$/, '/');
	const url = `${base}wp/v2/font-collections/google-fonts?_locale=user`;
	const headers = { Accept: 'application/json' };
	if (typeof window !== 'undefined' && window.wpApiSettings?.nonce) {
		headers['X-WP-Nonce'] = window.wpApiSettings.nonce;
	}
	const response = await fetch(url, { credentials: 'same-origin', headers });
	if (!response.ok) {
		throw new Error(`Font collection HTTP ${response.status}`);
	}
	const json = await response.json();
	return normalizeFontCollectionResponse(json);
}

/**
 * @param {PickerFontFamily[] | null | undefined} families
 * @param {string} value
 * @returns {PickerFontFamily | null}
 */
export function findFamilyForModel(families, value) {
	if (!families?.length) {
		return null;
	}
	const v = String(value || '').trim();
	if (!v) {
		return null;
	}
	const byStack = families.find((f) => f.fontFamily === v);
	if (byStack) {
		return byStack;
	}
	const first = v
		.split(',')[0]
		.trim()
		.replace(/^["']+|["']+$/g, '')
		.toLowerCase();
	return families.find((f) => f.name.toLowerCase() === first) || null;
}

/**
 * @param {GoogleFontFace[]} faces
 * @returns {string[]}
 */
export function uniqueFontWeights(faces) {
	const weights = [...new Set(faces.map((f) => String(f.fontWeight ?? '400')))];
	return weights.sort((a, b) => {
		const na = Number.parseInt(a, 10);
		const nb = Number.parseInt(b, 10);
		if (!Number.isNaN(na) && !Number.isNaN(nb)) {
			return na - nb;
		}
		if (!Number.isNaN(na)) {
			return -1;
		}
		if (!Number.isNaN(nb)) {
			return 1;
		}
		return a.localeCompare(b);
	});
}

/**
 * @param {GoogleFontFace[]} faces
 * @param {string} weight
 * @returns {string[]}
 */
export function fontStylesForWeight(faces, weight) {
	const w = weight === '' || weight === undefined ? null : String(weight);
	const subset =
		w === null ? faces : faces.filter((f) => String(f.fontWeight) === w);
	const styles = [...new Set(subset.map((f) => String(f.fontStyle || 'normal')))];
	return styles.sort((a, b) => a.localeCompare(b));
}

/**
 * @param {PickerFontFamily} family
 * @returns {{ fontWeight: string, fontStyle: string }}
 */
export function pickDefaultFace(family) {
	if (family.isSystem) {
		return { fontWeight: '', fontStyle: '' };
	}
	const faces = family.fontFace || [];
	if (!faces.length) {
		return { fontWeight: '400', fontStyle: 'normal' };
	}
	const preferred = faces.find(
		(f) => String(f.fontWeight) === '400' && String(f.fontStyle) === 'normal'
	);
	const face = preferred || faces[0];
	return {
		fontWeight: String(face.fontWeight),
		fontStyle: String(face.fontStyle),
	};
}
