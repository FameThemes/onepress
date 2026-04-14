/**
 * `control.params.disable_fields` (PHP): hide or skip styling UI fields.
 *
 * WordPress `sanitize_key()` lowercases and removes characters not in `[a-z0-9_\-]`; it does **not** convert `_` to `-`.
 * Registry values like `font_size` stay `font_size`; `fontSize` becomes `fontsize`.
 *
 * `buildDisabledFieldSet()` turns those tokens into **declaration model** keys (camelCase: `fontSize`, `lineHeight`, …)
 * used by `declarationForm.js`, `onPatch`, and `isFieldDisabled(set, 'fontSize')` in field components.
 * Composite aliases: keys in `COMPOSITE_FIELDS` below.
 */

/** @type {Record<string, string[]>} keys: lowercase with underscores */
const COMPOSITE_FIELDS = {
	margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
	padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
	border_width: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
	border_radius: [
		'borderTopLeftRadius',
		'borderTopRightRadius',
		'borderBottomRightRadius',
		'borderBottomLeftRadius',
	],
	outline: ['outlineStyle', 'outlineWidth', 'outlineColor', 'outlineOffset'],
	font_face: ['fontWeight', 'fontStyle'],
	inset: ['top', 'right', 'bottom', 'left'],
	background_type: ['__onepressBgType'],
	flex_layout: [
		'flexDirection',
		'flexWrap',
		'justifyContent',
		'alignItems',
		'alignContent',
		'gap',
		'rowGap',
		'columnGap',
	],
	grid_layout: [
		'gridTemplateColumns',
		'gridTemplateRows',
		'gridAutoFlow',
		'justifyItems',
		'gap',
	],
	box_shadow: ['boxShadow'],
	raw: ['__onepressRawDeclarations'],
	custom_declarations: ['__onepressRawDeclarations'],
};

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeCompositeKey(raw) {
	return String(raw || '')
		.trim()
		.toLowerCase()
		.replace(/-/g, '_');
}

/**
 * @param {string} s
 * @returns {string} letters+digits only, lowercased (for matching PHP `sanitize_key` output to model keys)
 */
function flatModelKey(s) {
	return String(s || '')
		.replace(/[^a-zA-Z0-9]/g, '')
		.toLowerCase();
}

/**
 * Every `isFieldDisabled(..., key)` key in styling components + composite expansions.
 * PHP passes tokens through `sanitize_key`, which lowercases and strips non [a-z0-9_-],
 * so `fontSize` / `font-size` become `fontsize` — we map those back via flat match.
 *
 * @type {string[]}
 */
const KNOWN_STYLING_MODEL_KEYS = Array.from(
	new Set([
		...Object.values(COMPOSITE_FIELDS).flat(),
		'color',
		'fontFamily',
		'fontSize',
		'lineHeight',
		'letterSpacing',
		'textTransform',
		'textDecoration',
		'textAlign',
		'fontWeight',
		'fontStyle',
		'borderStyle',
		'borderColor',
		'outlineStyle',
		'outlineWidth',
		'outlineColor',
		'outlineOffset',
		'display',
		'visibility',
		'opacity',
		'position',
		'width',
		'height',
		'zIndex',
		'overflow',
		'gridTemplateColumns',
		'gridTemplateRows',
		'gridAutoFlow',
		'justifyItems',
		'gap',
		'flexDirection',
		'flexWrap',
		'justifyContent',
		'alignItems',
		'alignContent',
		'rowGap',
		'columnGap',
		'top',
		'right',
		'bottom',
		'left',
		'__onepressBgType',
		'backgroundColor',
		'backgroundImage',
		'backgroundSize',
		'backgroundRepeat',
		'backgroundAttachment',
		'boxShadow',
	])
);

/**
 * @param {string} raw user token (may be font_family, fontFamily, etc.)
 * @returns {string} model property key
 */
export function disableFieldTokenToModelKey(raw) {
	const t = String(raw || '').trim();
	if (!t) {
		return '';
	}
	if (/[_-]/.test(t)) {
		return t
			.replace(/_([a-zA-Z0-9])/g, (_, c) => c.toUpperCase())
			.replace(/-([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
	}
	return t;
}

/**
 * Map a token already normalized with `normalizeCompositeKey` (lowercase, `-` → `_`) to a model key.
 *
 * @param {string} norm
 * @returns {string}
 */
function normalizedDisableTokenToModelKey(norm) {
	if (!norm) {
		return '';
	}
	if (norm.includes('_')) {
		return disableFieldTokenToModelKey(norm);
	}
	const flatN = flatModelKey(norm);
	for (const mk of KNOWN_STYLING_MODEL_KEYS) {
		if (flatModelKey(mk) === flatN) {
			return mk;
		}
	}
	return disableFieldTokenToModelKey(norm);
}

/**
 * @param {unknown} raw from Customizer JSON
 * @returns {Set<string>}
 */
export function buildDisabledFieldSet(raw) {
	const set = new Set();
	if (!Array.isArray(raw)) {
		return set;
	}
	for (const item of raw) {
		const norm = normalizeCompositeKey(item);
		if (!norm) {
			continue;
		}
		const expanded = COMPOSITE_FIELDS[norm];
		if (expanded) {
			expanded.forEach((k) => set.add(k));
		} else {
			const key = normalizedDisableTokenToModelKey(norm);
			if (key) {
				set.add(key);
			}
		}
	}
	return set;
}

/**
 * @param {Set<string> | null | undefined} set
 * @param {string} modelKey
 * @returns {boolean}
 */
export function isFieldDisabled(set, modelKey) {
	if (!set || !modelKey) {
		return false;
	}
	if (set.has(modelKey)) {
		return true;
	}
	// PHP `sanitize_key` + transport may leave `fontsize` / `font_size` in the set while UI checks `fontSize`.
	const wanted = flatModelKey(modelKey);
	if (!wanted) {
		return false;
	}
	for (const k of set) {
		if (flatModelKey(k) === wanted) {
			return true;
		}
	}
	return false;
}

/**
 * @param {Set<string> | null | undefined} set
 * @param {string[]} modelKeys
 * @returns {boolean}
 */
export function areAllKeysDisabled(set, modelKeys) {
	if (!set || !modelKeys.length) {
		return false;
	}
	return modelKeys.every((k) => isFieldDisabled(set, k));
}
