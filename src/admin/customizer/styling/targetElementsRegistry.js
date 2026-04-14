/**
 * Preset targets from `control.params.styling_target_elements` (per `Onepress_Customize_Styling_Control`).
 */

/** @typedef {{ id: string, selector: string, name: string, category: string }} TargetElementPreset */

/** @typedef {{ categories: Record<string, string>, elements: TargetElementPreset[] }} TargetElementsRegistry */

/**
 * @param {unknown} raw
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
 * @param {unknown} raw — `control.params.styling_target_elements` from Customize.
 * @returns {TargetElementsRegistry}
 */
export function normalizeTargetElementsRegistry(raw) {
	const categories =
		raw && typeof raw === 'object' && raw.categories && typeof raw.categories === 'object' && !Array.isArray(raw.categories)
			? /** @type {Record<string, string>} */ ({ ...raw.categories })
			: {};
	const elements = normalizeElements(
		raw && typeof raw === 'object' && 'elements' in raw ? /** @type {{ elements?: unknown }} */ (raw).elements : undefined
	);
	return { categories, elements };
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
 * @param {TargetElementsRegistry} [registry]
 * @returns {TargetElementPreset | null}
 */
export function findMatchingTargetPreset(currentSelector, currentElId, registry) {
	const { elements } = registry ?? normalizeTargetElementsRegistry(null);
	const id = String(currentElId || '').trim();
	const selN = normalizeSelectorForPresetMatch(currentSelector);
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
