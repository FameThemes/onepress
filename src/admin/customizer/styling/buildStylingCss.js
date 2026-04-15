/**
 * Build CSS from styling JSON (mirror PHP onepress_styling_build_css_from_value). Preview + consistency.
 *
 * @param {Record<string, unknown>} value Parsed setting value
 * @param {Array<{ id: string, label?: string, maxWidth?: string }>} [breakpoints]
 * @returns {string}
 */
const DEFAULT_BPS = [
	{ id: 'desktop', label: 'Desktop', maxWidth: '' },
	{ id: 'tablet', label: 'Tablet', maxWidth: '991px' },
	{ id: 'mobile', label: 'Mobile', maxWidth: '767px' },
];

function stripSelector(sel) {
	if (typeof sel !== 'string') {
		return '';
	}
	let s = sel.replace(/<[^>]*>/g, '');
	s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
	if (s.length > 2000) {
		s = s.slice(0, 2000);
	}
	return s;
}

function sanitizeDecl(str) {
	if (typeof str !== 'string') {
		return '';
	}
	let s = str.trim();
	if (!s) {
		return '';
	}
	if (/@import|expression\s*\(|javascript\s*:|<\s*script|@charset|@namespace/i.test(s)) {
		return '';
	}
	s = s.replace(/<[^>]*>/g, '');
	if (s.length > 8000) {
		s = s.slice(0, 8000);
	}
	return s.trim();
}

function validMaxToken(token) {
	if (typeof token !== 'string' || !token.trim()) {
		return '';
	}
	const t = token.trim();
	return /^\d+(\.\d+)?(px|em|rem|%)$/.test(t) ? t : '';
}

/**
 * Split top-level selector list on commas (skip commas inside `()` / `[]`).
 *
 * @param {string} sel
 * @returns {string[]}
 */
function splitSelectorList(sel) {
	const s = typeof sel === 'string' ? sel.trim() : '';
	if (!s) {
		return [];
	}
	const parts = [];
	let depth = 0;
	let bracket = 0;
	let start = 0;
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (c === '(') {
			depth++;
		} else if (c === ')') {
			depth--;
		} else if (c === '[') {
			bracket++;
		} else if (c === ']') {
			bracket--;
		} else if (c === ',' && depth === 0 && bracket === 0) {
			const chunk = s.slice(start, i).trim();
			if (chunk) {
				parts.push(chunk);
			}
			start = i + 1;
		}
	}
	const chunk = s.slice(start).trim();
	if (chunk) {
		parts.push(chunk);
	}
	return parts;
}

/**
 * Full selector for output CSS: _meta.baseSelector + per-state suffix.
 * Legacy: when base is empty, state selector is the full selector.
 * Comma-separated base: suffix is appended to each branch
 * (e.g. `.a .b, .c .d` + `:hover` → `.a .b:hover, .c .d:hover`).
 *
 * @param {unknown} baseRaw
 * @param {unknown} suffixRaw
 * @returns {string}
 */
export function composeStylingFullSelector(baseRaw, suffixRaw) {
	const base = stripSelector(typeof baseRaw === 'string' ? baseRaw : '').trim();
	const suffix = stripSelector(typeof suffixRaw === 'string' ? suffixRaw : '').trim();
	if (!base && !suffix) {
		return '';
	}
	if (!base) {
		return suffix;
	}
	if (!suffix) {
		return base;
	}
	const list = splitSelectorList(base);
	if (list.length <= 1) {
		return `${base}${suffix}`;
	}
	return list.map((p) => `${p}${suffix}`).join(', ');
}

/**
 * When `conf.force_selector` is non-empty, use it alone (ignores base + `conf.selector` for output).
 *
 * @param {string} baseMeta
 * @param {Record<string, unknown> | null | undefined} conf
 * @returns {string}
 */
export function resolveStateOutputSelector(baseMeta, conf) {
	const force = stripSelector(
		conf && conf.force_selector != null ? String(conf.force_selector) : ''
	).trim();
	if (force !== '') {
		return force;
	}
	const suffix = stripSelector(conf && conf.selector != null ? String(conf.selector) : '');
	return composeStylingFullSelector(baseMeta, suffix);
}

/**
 * @param {Record<string, unknown>} value
 * @param {typeof DEFAULT_BPS} breakpoints
 */
export function buildStylingCss(value, breakpoints = DEFAULT_BPS) {
	if (!value || typeof value !== 'object') {
		return '';
	}
	// Multi-target root (`styling_multiple`): CSS comes only from `items[]`. Empty list must not fall through
	// to root `_meta` / state slices (stale keys after remove-all or reset can otherwise keep old rules in preview).
	if (Array.isArray(value.items)) {
		if (value.items.length === 0) {
			return '';
		}
		return value.items
			.map((item) => buildStylingCss(item, breakpoints))
			.filter(Boolean)
			.join('\n')
			.trim();
	}
	if (!value._meta || !Array.isArray(value._meta.states)) {
		return '';
	}
	const baseMeta =
		value._meta && typeof value._meta.baseSelector === 'string'
			? stripSelector(value._meta.baseSelector).trim()
			: '';
	let css = '';
	for (const entry of value._meta.states) {
		if (!entry || typeof entry !== 'object') {
			continue;
		}
		const keys = Object.keys(entry);
		if (keys.length !== 1) {
			continue;
		}
		const stateKey = keys[0];
		const conf = entry[stateKey];
		const selector = resolveStateOutputSelector(baseMeta, conf && typeof conf === 'object' ? conf : {});
		if (!selector) {
			continue;
		}
		const slice =
			value[stateKey] && typeof value[stateKey] === 'object' && !Array.isArray(value[stateKey])
				? value[stateKey]
				: {};

		for (const bp of breakpoints) {
			const id = bp.id;
			const raw = slice[id] != null ? String(slice[id]) : '';
			const decl = sanitizeDecl(raw);
			if (!decl) {
				continue;
			}
			const max = validMaxToken(bp.maxWidth || '');
			if (id === 'desktop' || !max) {
				css += `${selector} { ${decl} }\n`;
			} else {
				css += `@media (max-width: ${max}) { ${selector} { ${decl} } }\n`;
			}
		}
	}
	return css.trim();
}

export { DEFAULT_BPS };
