/**
 * Preset targets from PHP (`onepressStylingTargetElements`) — read once per page load.
 */

/** @typedef {{ id: string, selector: string, name: string, category: string }} TargetElementPreset */

/** @typedef {{ categories: Record<string, string>, elements: TargetElementPreset[] }} TargetElementsRegistry */

/** @type {TargetElementsRegistry | null} */
let cached = null;

/**
 * @returns {TargetElementPreset[]}
 */
function normalizeElements(raw) {
	if (!Array.isArray(raw)) {
		return [];
	}
	const out = [];
	for (const row of raw) {
		if (!row || typeof row !== 'object') {
			continue;
		}
		const id = typeof row.id === 'string' ? row.id.trim() : '';
		const selector = typeof row.selector === 'string' ? row.selector.trim() : '';
		const name = typeof row.name === 'string' ? row.name.trim() : '';
		const category = typeof row.category === 'string' ? row.category.trim() : 'other';
		if (!selector || !name) {
			continue;
		}
		out.push({
			id: id || selector,
			selector,
			name,
			category: category || 'other',
		});
	}
	return out;
}

/**
 * @returns {TargetElementsRegistry}
 */
export function getStylingTargetElementsRegistry() {
	const w =
		typeof window !== 'undefined' && window.onepressStylingTargetElements && typeof window.onepressStylingTargetElements === 'object'
			? window.onepressStylingTargetElements
			: null;
	const categories =
		w && w.categories && typeof w.categories === 'object' && !Array.isArray(w.categories)
			? /** @type {Record<string, string>} */ (w.categories)
			: {};
	const elements = normalizeElements(w?.elements);
	// First read can run before `wp_localize_script` output; drop empty cache when data appears.
	if (cached && cached.elements.length === 0 && elements.length > 0) {
		cached = null;
	}
	if (cached) {
		return cached;
	}
	cached = {
		categories,
		elements,
	};
	return cached;
}

/**
 * Collapse whitespace for stable comparison (saved selector vs registry).
 *
 * @param {string} s
 * @returns {string}
 */
export function normalizeSelectorForPresetMatch(s) {
	return String(s || '')
		.trim()
		.replace(/\s+/g, ' ');
}

/**
 * Match preset for UI: registry id in `_meta.elId` first, else selector match (whitespace-normalized).
 *
 * @param {string} currentSelector
 * @param {string} [currentElId]
 * @returns {TargetElementPreset | null}
 */
export function findMatchingTargetPreset(currentSelector, currentElId) {
	const id = String(currentElId || '').trim();
	const selN = normalizeSelectorForPresetMatch(currentSelector);
	const { elements } = getStylingTargetElementsRegistry();
	if (id) {
		const byId = elements.find((e) => e.id === id);
		if (byId) {
			return byId;
		}
	}
	if (!selN) {
		return null;
	}
	return elements.find((e) => normalizeSelectorForPresetMatch(e.selector) === selN) || null;
}
