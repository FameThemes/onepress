/**
 * Build CSS for OnePress background Customizer control.
 * Logic must stay in sync with inc/background/helper.php (onepress_background_build_css).
 */

/** Default gradient when the user opens the Gradient tab (must match BackgroundLayerEditor UI). */
export const DEFAULT_BACKGROUND_GRADIENT =
	'linear-gradient(135deg, rgba(6,147,227,1) 0%, rgb(155,81,224) 100%)';

/** Default solid when the user opens the Color tab with no stored color (matches ColorPicker fallback). */
export const DEFAULT_BACKGROUND_COLOR = '#ffffffff';

/** @type {Record<string, string>} */
export const STATE_PSEUDO = {
	normal: '',
	hover: ':hover',
	focus: ':focus',
	focus_visible: ':focus-visible',
	focusVisible: ':focus-visible',
	active: ':active',
	visited: ':visited',
};

/**
 * @param {string} baseSelector
 * @param {string} stateKey
 * @returns {string}
 */
export function buildStateSelector(baseSelector, stateKey) {
	const base = String(baseSelector || '').trim();
	if (!base) {
		return '';
	}
	const pseudo = STATE_PSEUDO[stateKey] ?? '';
	if (!pseudo) {
		return base;
	}
	return base
		.split(',')
		.map((s) => s.trim() + pseudo)
		.join(', ');
}

/**
 * Full selector for a state: use _meta.selectorsByState[stateKey] when set, else base + pseudo.
 *
 * @param {{ selector?: string, selectorsByState?: Record<string, string> }} meta
 * @param {string} stateKey
 * @returns {string}
 */
export function resolveSelectorForState(meta, stateKey) {
	const map = meta?.selectorsByState;
	if (map && typeof map === 'object' && !Array.isArray(map)) {
		const raw = map[stateKey];
		if (raw != null && String(raw).trim()) {
			return String(raw).trim();
		}
	}
	return buildStateSelector(String(meta?.selector || '').trim(), stateKey);
}

/**
 * @returns {object}
 */
export function createDefaultLayer() {
	return {
		tab: 'color',
		color: '',
		gradient: '',
		imageId: 0,
		imageUrl: '',
		size: 'cover',
		repeat: 'no-repeat',
		position: 'center center',
		attachment: 'scroll',
	};
}

/**
 * Image tab with no URL: explicit reset so color/gradient from this control (or theme head CSS) do not linger.
 * Keep in sync with onepress_background_image_tab_empty_declarations() in inc/background/helper.php.
 *
 * @returns {Record<string, string>}
 */
function imageTabEmptyDeclarations() {
	return {
		'background-color': 'transparent',
		'background-image': 'none',
		'background-repeat': 'no-repeat',
		'background-size': 'auto',
		'background-position': 'center center',
		'background-attachment': 'scroll',
	};
}

/**
 * @param {object} layer
 * @returns {Record<string, string>|null}
 */
export function layerToDeclarations(layer) {
	if (!layer || typeof layer !== 'object') {
		return null;
	}
	const tab = layer.tab || 'color';

	if (tab === 'color') {
		const c = typeof layer.color === 'string' ? layer.color.trim() : '';
		if (!c) {
			return null;
		}
		return {
			'background-color': c,
			'background-image': 'none',
		};
	}

	if (tab === 'gradient') {
		const g = typeof layer.gradient === 'string' ? layer.gradient.trim() : '';
		if (!g) {
			return null;
		}
		return {
			'background-color': 'transparent',
			'background-image': g,
			'background-repeat': 'no-repeat',
		};
	}

	if (tab === 'image') {
		const u = typeof layer.imageUrl === 'string' ? layer.imageUrl.trim() : '';
		if (!u) {
			return imageTabEmptyDeclarations();
		}
		const safe = u.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
		return {
			'background-color': 'transparent',
			'background-image': `url("${safe}")`,
			'background-size': layer.size || 'cover',
			'background-repeat': layer.repeat || 'no-repeat',
			'background-position': layer.position || 'center center',
			'background-attachment': layer.attachment || 'scroll',
		};
	}

	return null;
}

/** @type {Record<string, string>} */
const DECLARATION_TO_REACT_STYLE = {
	'background-color': 'backgroundColor',
	'background-image': 'backgroundImage',
	'background-repeat': 'backgroundRepeat',
	'background-size': 'backgroundSize',
	'background-position': 'backgroundPosition',
	'background-attachment': 'backgroundAttachment',
};

/**
 * Convert layer CSS declarations to a React `style` object (Customizer state-button preview).
 *
 * @param {Record<string, string>|null} decls
 * @returns {import('react').CSSProperties|null}
 */
export function declarationsToReactStyle(decls) {
	if (!decls || typeof decls !== 'object') {
		return null;
	}
	/** @type {import('react').CSSProperties} */
	const out = {};
	for (const [key, value] of Object.entries(decls)) {
		const reactKey = DECLARATION_TO_REACT_STYLE[key];
		if (reactKey) {
			out[reactKey] = value;
		}
	}
	return Object.keys(out).length ? out : null;
}

/**
 * @param {Record<string, string>} decls
 * @returns {string}
 */
function declarationsToBlock(decls) {
	const lines = Object.keys(decls).map((k) => `  ${k}: ${decls[k]};`);
	return lines.join('\n');
}

/**
 * @param {string} selector
 * @param {Record<string, string>} decls
 * @returns {string}
 */
export function ruleBlock(selector, decls) {
	if (!selector || !decls) {
		return '';
	}
	const inner = declarationsToBlock(decls);
	if (!inner) {
		return '';
	}
	return `${selector} {\n${inner}\n}`;
}

/**
 * @param {object} data
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @returns {string}
 */
export function buildBackgroundCss(data, breakpoints) {
	if (!data || !data._onepressBackground || !data._meta) {
		return '';
	}
	const meta = data._meta;
	const states =
		Array.isArray(meta.states) && meta.states.length
			? meta.states
			: ['normal'];

	const bp = {
		tablet: breakpoints?.tablet || '991px',
		mobile: breakpoints?.mobile || '767px',
	};

	const chunks = [];

	for (const stateKey of states) {
		const sel = resolveSelectorForState(meta, stateKey);
		if (!sel) {
			continue;
		}
		const st = data[stateKey];
		if (!st || typeof st !== 'object') {
			continue;
		}

		const desk = layerToDeclarations(st.desktop);
		if (desk) {
			chunks.push(ruleBlock(sel, desk));
		}

		const tab = layerToDeclarations(st.tablet);
		if (tab) {
			chunks.push(
				`@media (max-width: ${bp.tablet}) {\n${ruleBlock(sel, tab)}\n}`
			);
		}

		const mob = layerToDeclarations(st.mobile);
		if (mob) {
			chunks.push(
				`@media (max-width: ${bp.mobile}) {\n${ruleBlock(sel, mob)}\n}`
			);
		}
	}

	return chunks.filter(Boolean).join('\n\n');
}

/**
 * @param {string} settingId
 * @returns {string}
 */
export function backgroundStyleElementId(settingId) {
	return `onepress-bg-inline-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}
