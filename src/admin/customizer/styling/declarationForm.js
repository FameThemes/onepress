/**
 * Parse / serialize declaration strings ↔ known form model (plan: disk = one string per state×device).
 * Unknown properties are preserved in a side map and re-appended on save.
 */

/**
 * @typedef {Record<string, string>} CssMap kebab-case property → value
 */

/**
 * [modelKey, cssProperty] — output order for stable diffs.
 * Matches plan groups: Text, Background, Spacing, Border, Shadow, Display.
 */
export const SERIALIZE_ORDER = [
	// Text
	['color', 'color'],
	['fontFamily', 'font-family'],
	['fontSize', 'font-size'],
	['lineHeight', 'line-height'],
	['fontWeight', 'font-weight'],
	['fontStyle', 'font-style'],
	['letterSpacing', 'letter-spacing'],
	['textTransform', 'text-transform'],
	['textDecoration', 'text-decoration'],
	['textAlign', 'text-align'],
	// Background
	['backgroundColor', 'background-color'],
	['backgroundImage', 'background-image'],
	['backgroundSize', 'background-size'],
	['backgroundRepeat', 'background-repeat'],
	['backgroundPosition', 'background-position'],
	['backgroundAttachment', 'background-attachment'],
	// Spacing
	['marginTop', 'margin-top'],
	['marginRight', 'margin-right'],
	['marginBottom', 'margin-bottom'],
	['marginLeft', 'margin-left'],
	['paddingTop', 'padding-top'],
	['paddingRight', 'padding-right'],
	['paddingBottom', 'padding-bottom'],
	['paddingLeft', 'padding-left'],
	// Border
	['borderStyle', 'border-style'],
	['borderTopWidth', 'border-top-width'],
	['borderRightWidth', 'border-right-width'],
	['borderBottomWidth', 'border-bottom-width'],
	['borderLeftWidth', 'border-left-width'],
	['borderColor', 'border-color'],
	['borderTopLeftRadius', 'border-top-left-radius'],
	['borderTopRightRadius', 'border-top-right-radius'],
	['borderBottomRightRadius', 'border-bottom-right-radius'],
	['borderBottomLeftRadius', 'border-bottom-left-radius'],
	['outlineStyle', 'outline-style'],
	['outlineWidth', 'outline-width'],
	['outlineColor', 'outline-color'],
	['outlineOffset', 'outline-offset'],
	// Shadow
	['boxShadow', 'box-shadow'],
	// Display / layout
	['display', 'display'],
	['visibility', 'visibility'],
	['opacity', 'opacity'],
	['position', 'position'],
	['top', 'top'],
	['right', 'right'],
	['bottom', 'bottom'],
	['left', 'left'],
	['width', 'width'],
	['height', 'height'],
	['minWidth', 'min-width'],
	['maxWidth', 'max-width'],
	['minHeight', 'min-height'],
	['maxHeight', 'max-height'],
	['zIndex', 'z-index'],
	['overflow', 'overflow'],
	['flexDirection', 'flex-direction'],
	['flexWrap', 'flex-wrap'],
	['justifyContent', 'justify-content'],
	['alignItems', 'align-items'],
	['alignContent', 'align-content'],
	['gap', 'gap'],
	['rowGap', 'row-gap'],
	['columnGap', 'column-gap'],
	['gridTemplateColumns', 'grid-template-columns'],
	['gridTemplateRows', 'grid-template-rows'],
	['gridAutoFlow', 'grid-auto-flow'],
	['justifyItems', 'justify-items'],
];

/** @type {Record<string, string>} */
export const CSS_TO_MODEL = Object.fromEntries(
	SERIALIZE_ORDER.map(([modelKey, cssProp]) => [cssProp, modelKey])
);

/** @type {Set<string>} */
export const KNOWN_CSS_PROPS = new Set(SERIALIZE_ORDER.map(([, css]) => css));

/**
 * @param {string} css
 * @returns {CssMap}
 */
export function parseDeclarationsToMap(css) {
	const map = {};
	if (!css || typeof css !== 'string') {
		return map;
	}
	const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');
	const re = /([\w-]+)\s*:\s*((?:[^;'"]|'[^']*'|"[^"]*")+?)(?=\s*;|\s*$)/gi;
	let m;
	while ((m = re.exec(cleaned)) !== null) {
		const prop = m[1].trim().toLowerCase();
		let val = m[2].trim();
		val = val.replace(/\s*!important\s*$/i, '').trim();
		if (prop && val) {
			map[prop] = val;
		}
	}
	return map;
}

/**
 * @param {CssMap} map
 * @returns {{ model: Record<string, string>, unknown: CssMap }}
 */
export function splitKnownUnknown(map) {
	/** @type {Record<string, string>} */
	const model = {};
	/** @type {CssMap} */
	const unknown = {};
	for (const [cssProp, val] of Object.entries(map)) {
		const mk = CSS_TO_MODEL[cssProp];
		if (mk) {
			model[mk] = val;
		} else {
			unknown[cssProp] = val;
		}
	}
	return { model, unknown };
}

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @returns {string}
 */
export function joinModelAndUnknown(model, unknown) {
	const parts = [];
	for (const [mk, ck] of SERIALIZE_ORDER) {
		const v = model[mk];
		if (v != null && String(v).trim() !== '') {
			parts.push(`${ck}: ${String(v).trim()}`);
		}
	}
	const extraKeys = Object.keys(unknown).sort();
	for (const k of extraKeys) {
		const v = unknown[k];
		if (v != null && String(v).trim() !== '') {
			parts.push(`${k}: ${String(v).trim()}`);
		}
	}
	if (!parts.length) {
		return '';
	}
	return `${parts.join('; ')};`;
}

/**
 * @param {string} css
 * @returns {{ model: Record<string, string>, unknown: CssMap }}
 */
export function parseDeclarationForm(css) {
	const map = parseDeclarationsToMap(css);
	return splitKnownUnknown(map);
}

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @returns {string}
 */
export function serializeDeclarationForm(model, unknown) {
	return joinModelAndUnknown(model, unknown);
}

/** Plan name: parse declaration string → known model + unknown map. */
export const parseStyleDeclarations = parseDeclarationForm;

/** Plan name: serialize known model + unknown → declaration string. */
export const serializeStyleDeclarations = serializeDeclarationForm;

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @param {Record<string, string>} patch
 * @returns {string}
 */
export function patchDeclarationForm(model, unknown, patch) {
	const next = { ...model, ...patch };
	return serializeDeclarationForm(next, unknown);
}
