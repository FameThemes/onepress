/**
 * `control.params.disable_fields` (PHP): hide or skip styling UI fields.
 * Tokens are normalized in PHP with sanitize_key (lowercase, a-z0-9_-).
 * Use model camelCase keys (font_family → fontFamily) or composite aliases below.
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
			const key = disableFieldTokenToModelKey(item);
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
	return Boolean(set && modelKey && set.has(modelKey));
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
	return modelKeys.every((k) => set.has(k));
}
