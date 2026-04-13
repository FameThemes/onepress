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
 * Full selector for output CSS: _meta.baseSelector + per-state suffix.
 * Legacy: when base is empty, state selector is the full selector.
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
	return `${base}${suffix}`;
}

/**
 * @param {Record<string, unknown>} value
 * @param {typeof DEFAULT_BPS} breakpoints
 */
export function buildStylingCss(value, breakpoints = DEFAULT_BPS) {
	if (!value || typeof value !== 'object') {
		return '';
	}
	if (Array.isArray(value.items) && value.items.length) {
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
		const suffix = stripSelector(conf && conf.selector != null ? String(conf.selector) : '');
		const selector = composeStylingFullSelector(baseMeta, suffix);
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
