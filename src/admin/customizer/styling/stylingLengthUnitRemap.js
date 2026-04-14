/**
 * Remap known declaration lengths when the unit chip changes: same number, new suffix only.
 */
import { replaceSingleLengthUnitSuffix } from './cssUnitSlider';
import { parseDeclarationForm, serializeDeclarationForm } from './declarationForm';
import { parseBoxShadow, serializeBoxShadow } from './boxShadowGenerator';

function cloneValue(v) {
	return JSON.parse(JSON.stringify(v));
}

/** Model keys holding a single CSS length token (not shorthand / keywords beyond parse). */
const REMAP_LENGTH_MODEL_KEYS = new Set([
	'fontSize',
	'letterSpacing',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',
	'borderTopWidth',
	'borderRightWidth',
	'borderBottomWidth',
	'borderLeftWidth',
	'borderTopLeftRadius',
	'borderTopRightRadius',
	'borderBottomRightRadius',
	'borderBottomLeftRadius',
	'outlineWidth',
	'outlineOffset',
	'top',
	'right',
	'bottom',
	'left',
	'width',
	'height',
	'minWidth',
	'maxWidth',
	'minHeight',
	'maxHeight',
	'gap',
	'rowGap',
	'columnGap',
]);

/**
 * @param {string} css
 * @param {string} targetSuffix
 * @returns {string}
 */
function remapBoxShadowLengths(css, targetSuffix) {
	const p = parseBoxShadow(css);
	if (!p.ok) {
		return css;
	}
	let changed = false;
	const next = { ...p };
	for (const k of ['offsetX', 'offsetY', 'blur', 'spread']) {
		const c = replaceSingleLengthUnitSuffix(String(next[k]), targetSuffix);
		if (c !== null && c !== String(next[k])) {
			next[k] = c;
			changed = true;
		}
	}
	return changed ? serializeBoxShadow(next) : css;
}

/**
 * @param {string} css
 * @param {string} targetSuffix
 * @returns {string}
 */
export function remapDeclarationCssToTargetUnit(css, targetSuffix) {
	const { model, unknown } = parseDeclarationForm(css);
	const nextModel = { ...model };
	let touched = false;
	for (const key of REMAP_LENGTH_MODEL_KEYS) {
		const v = nextModel[key];
		if (v == null || String(v).trim() === '') {
			continue;
		}
		const str = String(v).trim();
		const c = replaceSingleLengthUnitSuffix(str, targetSuffix);
		if (c !== null && c !== str) {
			nextModel[key] = c;
			touched = true;
		}
	}
	const bs = nextModel.boxShadow;
	if (bs != null && String(bs).trim() !== '') {
		const nextBs = remapBoxShadowLengths(String(bs).trim(), targetSuffix);
		if (nextBs !== String(bs).trim()) {
			nextModel.boxShadow = nextBs;
			touched = true;
		}
	}
	return touched ? serializeDeclarationForm(nextModel, unknown) : css;
}

/**
 * @param {Record<string, unknown>} item — one styling payload (single target or one list item)
 * @param {string} targetSuffix
 * @param {string[]} previewDeviceIds
 * @returns {Record<string, unknown>}
 */
function remapStylingItemPayload(item, targetSuffix, previewDeviceIds) {
	const out = cloneValue(item);
	for (const key of Object.keys(out)) {
		if (key === '_meta' || key === '_onepressStyling') {
			continue;
		}
		const slice = out[key];
		if (!slice || typeof slice !== 'object' || Array.isArray(slice)) {
			continue;
		}
		for (const id of previewDeviceIds) {
			if (slice[id] == null) {
				continue;
			}
			const css = String(slice[id]);
			const nextCss = remapDeclarationCssToTargetUnit(css, targetSuffix);
			out[key][id] = nextCss;
		}
	}
	return out;
}

/**
 * @param {Record<string, unknown>} root
 * @param {string} targetSuffix
 * @param {string[]} previewDeviceIds
 * @param {boolean} multiple
 * @returns {Record<string, unknown>}
 */
export function remapStylingRootToLengthUnit(root, targetSuffix, previewDeviceIds, multiple) {
	if (!root || typeof root !== 'object') {
		return root;
	}
	if (multiple && Array.isArray(root.items)) {
		const next = cloneValue(root);
		next.items = root.items.map((it) =>
			remapStylingItemPayload(/** @type {Record<string, unknown>} */ (it), targetSuffix, previewDeviceIds)
		);
		return next;
	}
	return remapStylingItemPayload(/** @type {Record<string, unknown>} */ (root), targetSuffix, previewDeviceIds);
}
