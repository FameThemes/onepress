/**
 * `styling_states` control option: normalize payloads and derive UI mode.
 *
 * - `'all'`: full states UI (add custom / presets).
 * - `false`: only `normal`, hide state tabs in the editor.
 * - `array`: fixed state keys from template; no add/remove structure.
 */

import { __ } from '@wordpress/i18n';

function cloneValue(v) {
	return JSON.parse(JSON.stringify(v));
}

/**
 * @param {unknown} raw
 * @returns {'all' | 'fixed' | 'normal-only'}
 */
export function getStatesStructureMode(raw) {
	if (raw === false) {
		return 'normal-only';
	}
	if (Array.isArray(raw) && raw.length) {
		return 'fixed';
	}
	return 'all';
}

/**
 * @param {unknown} raw
 * @returns {object[] | null} template for `fixed` mode
 */
export function getFixedStatesTemplate(raw) {
	if (Array.isArray(raw) && raw.length) {
		return cloneValue(raw);
	}
	return null;
}

/**
 * @param {Record<string, unknown>} payload
 * @param {string[]} previewDeviceIds
 */
function coerceToNormalOnly(payload, previewDeviceIds) {
	const next = cloneValue(payload);
	const normalSlice =
		next.normal && typeof next.normal === 'object' && !Array.isArray(next.normal) ? next.normal : {};
	next._meta = typeof next._meta === 'object' && next._meta !== null ? next._meta : {};
	next._meta.states = [
		{
			normal: {
				label: __('Normal', 'onepress'),
				selector: '',
			},
		},
	];
	next.normal = {};
	for (const id of previewDeviceIds) {
		next.normal[id] = normalSlice[id] != null ? String(normalSlice[id]) : '';
	}
	const rootKeys = Object.keys(next);
	for (const key of rootKeys) {
		if (key === '_meta' || key === '_onepressStyling' || key === 'normal') {
			continue;
		}
		if (typeof next[key] === 'object' && next[key] !== null && !Array.isArray(next[key])) {
			delete next[key];
		}
	}
	if (next._meta.fontSlices && typeof next._meta.fontSlices === 'object') {
		const fs = {};
		if (next._meta.fontSlices.normal) {
			fs.normal = next._meta.fontSlices.normal;
		}
		if (Object.keys(fs).length) {
			next._meta.fontSlices = fs;
		} else {
			delete next._meta.fontSlices;
		}
	}
	return next;
}

/**
 * @param {Record<string, unknown>} payload
 * @param {object[]} template
 * @param {string[]} previewDeviceIds
 */
function coerceToFixedStates(payload, template, previewDeviceIds) {
	const next = cloneValue(payload);
	next._meta = typeof next._meta === 'object' && next._meta !== null ? next._meta : {};
	const existingStates = Array.isArray(next._meta.states) ? next._meta.states : [];
	/** @type {Record<string, { label?: string, selector?: string }>} */
	const byKey = {};
	for (const e of existingStates) {
		if (!e || typeof e !== 'object') {
			continue;
		}
		const k = Object.keys(e)[0];
		if (k) {
			byKey[k] = /** @type {{ label?: string, selector?: string }} */ (e[k]);
		}
	}
	const newStates = [];
	const allowed = new Set();
	for (const entry of template) {
		if (!entry || typeof entry !== 'object') {
			continue;
		}
		const keys = Object.keys(entry);
		if (keys.length !== 1) {
			continue;
		}
		const k = keys[0];
		const tmpl = entry[k];
		const prev = byKey[k] || {};
		allowed.add(k);
		newStates.push({
			[k]: {
				label: typeof prev.label === 'string' && prev.label !== '' ? prev.label : String(tmpl?.label || k),
				selector: typeof prev.selector === 'string' ? prev.selector : String(tmpl?.selector ?? ''),
			},
		});
		if (!next[k] || typeof next[k] !== 'object' || Array.isArray(next[k])) {
			next[k] = {};
		}
		for (const id of previewDeviceIds) {
			if (next[k][id] == null) {
				next[k][id] = '';
			}
		}
	}
	next._meta.states = newStates;
	for (const key of Object.keys(next)) {
		if (key === '_meta' || key === '_onepressStyling') {
			continue;
		}
		if (!allowed.has(key) && typeof next[key] === 'object' && next[key] !== null && !Array.isArray(next[key])) {
			delete next[key];
		}
	}
	if (next._meta.fontSlices && typeof next._meta.fontSlices === 'object') {
		const fs = {};
		for (const k of allowed) {
			if (next._meta.fontSlices[k]) {
				fs[k] = next._meta.fontSlices[k];
			}
		}
		if (Object.keys(fs).length) {
			next._meta.fontSlices = fs;
		} else {
			delete next._meta.fontSlices;
		}
	}
	return next;
}

/**
 * @param {Record<string, unknown>} item
 * @param {'all' | 'fixed' | 'normal-only'} mode
 * @param {object[] | null} fixedTemplate
 * @param {string[]} previewDeviceIds
 */
export function normalizeSingleStylingPayload(item, mode, fixedTemplate, previewDeviceIds) {
	if (!item || typeof item !== 'object') {
		return item;
	}
	if (mode === 'normal-only') {
		return coerceToNormalOnly(item, previewDeviceIds);
	}
	if (mode === 'fixed' && fixedTemplate && fixedTemplate.length) {
		return coerceToFixedStates(item, fixedTemplate, previewDeviceIds);
	}
	return item;
}

/**
 * @param {Record<string, unknown>} root
 * @param {'all' | 'fixed' | 'normal-only'} mode
 * @param {object[] | null} fixedTemplate
 * @param {string[]} previewDeviceIds
 * @param {boolean} isMultiple
 */
export function normalizeStylingRootForStatesPolicy(root, mode, fixedTemplate, previewDeviceIds, isMultiple) {
	if (mode === 'all') {
		return root;
	}
	if (!root || typeof root !== 'object') {
		return root;
	}
	if (isMultiple && Array.isArray(root.items)) {
		const next = cloneValue(root);
		next.items = root.items.map((item) =>
			normalizeSingleStylingPayload(
				/** @type {Record<string, unknown>} */ (item),
				mode,
				fixedTemplate,
				previewDeviceIds
			)
		);
		return next;
	}
	return normalizeSingleStylingPayload(root, mode, fixedTemplate, previewDeviceIds);
}
