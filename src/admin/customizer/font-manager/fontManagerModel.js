/**
 * Font manager JSON: list of font items (mirror PHP onepress_font_manager_*).
 */

/**
 * @typedef {{
 *   id: string,
 *   fontFamily: string,
 *   googleSlug: string,
 *   googleName: string,
 *   isGoogleFamily: boolean,
 *   variations: string[]
 * }} FontManagerItem
 */

/**
 * @typedef {{ _onepressFontManager: true, items: FontManagerItem[] }} FontManagerValue
 */

/**
 * @returns {string}
 */
export function newFontItemId() {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return `font-${crypto.randomUUID()}`;
	}
	return `font-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * @returns {FontManagerItem}
 */
export function emptyFontItem() {
	return {
		id: newFontItemId(),
		fontFamily: '',
		googleSlug: '',
		googleName: '',
		isGoogleFamily: false,
		variations: [],
	};
}

/**
 * @param {unknown} raw
 * @returns {FontManagerItem}
 */
export function normalizeFontManagerItem(raw) {
	const base = emptyFontItem();
	if (!raw || typeof raw !== 'object') {
		return base;
	}
	const o = /** @type {Record<string, unknown>} */ (raw);
	let id = typeof o.id === 'string' ? o.id.trim() : '';
	if (!id) {
		id = newFontItemId();
	}
	const vars = [];
	if (Array.isArray(o.variations)) {
		for (const v of o.variations) {
			const s = typeof v === 'string' ? v.trim() : '';
			if (/^[01],\d{3}$/.test(s)) {
				vars.push(s);
			}
		}
	}
	return {
		id,
		fontFamily: typeof o.fontFamily === 'string' ? o.fontFamily.trim() : '',
		googleSlug: typeof o.googleSlug === 'string' ? o.googleSlug.trim() : '',
		googleName: typeof o.googleName === 'string' ? o.googleName.trim() : '',
		isGoogleFamily: Boolean(o.isGoogleFamily),
		variations: [...new Set(vars)],
	};
}

/**
 * @returns {FontManagerValue}
 */
export function defaultFontManagerValue() {
	return {
		_onepressFontManager: true,
		items: [],
	};
}

/**
 * Legacy root (single font fields on root) → items[0].
 *
 * @param {Record<string, unknown>} o
 * @returns {FontManagerValue | null}
 */
function migrateLegacyRootToItems(o) {
	const hasLegacy =
		(typeof o.fontFamily === 'string' && o.fontFamily.trim() !== '') ||
		(typeof o.googleSlug === 'string' && o.googleSlug.trim() !== '');
	if (!hasLegacy) {
		return null;
	}
	const item = normalizeFontManagerItem({
		...o,
		id: typeof o.id === 'string' && o.id.trim() ? o.id : 'migrated-1',
	});
	return {
		_onepressFontManager: true,
		items: [item],
	};
}

/**
 * @param {unknown} raw
 * @returns {FontManagerValue}
 */
export function normalizeFontManagerValue(raw) {
	const base = defaultFontManagerValue();
	if (!raw || typeof raw !== 'object') {
		return base;
	}
	const o = /** @type {Record<string, unknown>} */ (raw);
	if (!o._onepressFontManager) {
		return base;
	}
	if (Array.isArray(o.items)) {
		const items = o.items.map((it) => normalizeFontManagerItem(it));
		return {
			_onepressFontManager: true,
			items,
		};
	}
	const migrated = migrateLegacyRootToItems(o);
	if (migrated) {
		return migrated;
	}
	return base;
}

/**
 * @param {unknown} raw
 * @returns {FontManagerValue}
 */
export function parseFontManagerSetting(raw) {
	if (typeof raw === 'string' && raw.trim() !== '') {
		try {
			return normalizeFontManagerValue(JSON.parse(raw));
		} catch {
			return defaultFontManagerValue();
		}
	}
	if (raw && typeof raw === 'object') {
		return normalizeFontManagerValue(raw);
	}
	return defaultFontManagerValue();
}

/**
 * @param {FontManagerItem} item
 * @returns {string}
 */
export function displayNameForItem(item) {
	if (item.googleName) {
		return item.googleName;
	}
	const ff = item.fontFamily.trim();
	if (ff) {
		const first = ff.split(',')[0].trim().replace(/^["']|["']$/g, '');
		return first || ff;
	}
	return '';
}
