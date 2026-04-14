/**
 * Preset targets from `control.params.styling_target_elements` (per `Onepress_Customize_Styling_Control`).
 */

/**
 * @typedef {{ id: string, selector: string, name: string, category: string, locked?: boolean, multiple?: boolean, message?: string }} TargetElementPreset
 */

/** @typedef {{ categories: Record<string, string>, elements: TargetElementPreset[] }} TargetElementsRegistry */

/**
 * Presets with this id + `multiple` may be added many times; others at most once per `elId` in saved items.
 *
 * @param {TargetElementPreset} el
 * @returns {boolean}
 */
export function isUnlimitedTargetPreset(el) {
	return el.id === 'custom_item' && el.multiple === true;
}

/**
 * @param {TargetElementPreset} el
 * @param {Set<string>|string[]|null|undefined} usedPresetIds — `_meta.elId` values already present
 * @returns {boolean}
 */
export function isTargetPresetConsumed(el, usedPresetIds) {
	if (!el?.id || isUnlimitedTargetPreset(el)) {
		return false;
	}
	if (!usedPresetIds) {
		return false;
	}
	const id = String(el.id);
	if (usedPresetIds instanceof Set) {
		return usedPresetIds.has(id);
	}
	return usedPresetIds.includes(id);
}

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
		let selector = typeof row.selector === 'string' ? row.selector.trim() : '';
		const name = typeof row.name === 'string' ? row.name.trim() : '';
		const category = typeof row.category === 'string' ? row.category.trim() : 'other';
		const locked = row.locked === true;
		const multiple = row.multiple === true || row.mutiple === true;
		const message = typeof row.message === 'string' ? row.message.trim() : '';
		const allowEmpty = locked || (id === 'custom_item' && multiple);
		if (!name || (!selector && !allowEmpty)) {
			continue;
		}
		const resolvedId = id || (selector ? (selector.length <= 200 ? selector : selector.slice(0, 200)) : '');
		if (!resolvedId) {
			continue;
		}
		/** @type {TargetElementPreset} */
		const el = {
			id: resolvedId,
			selector,
			name,
			category: category || 'other',
		};
		if (locked) {
			el.locked = true;
		}
		if (multiple) {
			el.multiple = true;
		}
		if (message) {
			el.message = message;
		}
		out.push(el);
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
	return (
		elements.find((e) => e.selector && normalizeSelectorForPresetMatch(e.selector) === selN) || null
	);
}
