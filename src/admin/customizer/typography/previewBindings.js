/**
 * Customizer preview iframe: typography CSS via postMessage (matches PHP onepress_typo_css).
 */
import {
	buildTypographyPreviewCss,
	typographyPreviewStyleId,
} from './buildTypographyPreviewCss.js';

function getBreakpoints() {
	const b =
		typeof window !== 'undefined' && window.onepressBackgroundBreakpoints;
	if (b && typeof b === 'object') {
		return {
			tablet: b.tablet || '991px',
			mobile: b.mobile || '767px',
		};
	}
	return { tablet: '991px', mobile: '767px' };
}

function getBasePx() {
	const n =
		typeof window !== 'undefined' && window.onepressTypoCssBasePx;
	const x = typeof n === 'number' ? n : parseInt(String(n), 10);
	return x > 0 ? x : 16;
}

/**
 * Load Google font stylesheet in preview when family matches localized webfonts.
 *
 * @param {Document} doc
 * @param {Record<string, string>} flatCss
 */
function ensureTypographyGoogleFont(doc, flatCss) {
	const raw = flatCss['font-family'];
	if (!raw || typeof raw !== 'string') {
		return;
	}
	const name = raw.replace(/^["']|["']$/g, '').trim();
	if (!name) {
		return;
	}
	const webfonts =
		typeof window !== 'undefined' && window.onepressTypoWebfonts;
	if (!webfonts || typeof webfonts !== 'object') {
		return;
	}
	for (const id of Object.keys(webfonts)) {
		const f = webfonts[id];
		if (!f || f.font_type !== 'google' || !f.url) {
			continue;
		}
		if (f.name === name) {
			const lid = `onepress-typo-gfont-${id}`;
			if (doc.getElementById(lid)) {
				return;
			}
			const link = doc.createElement('link');
			link.id = lid;
			link.rel = 'stylesheet';
			link.href = f.url;
			doc.head.appendChild(link);
			return;
		}
	}
}

/**
 * @param {string} settingId
 * @param {string} selector
 * @param {unknown} val
 */
function applyTypographyPreview(settingId, selector, val) {
	let flat = null;
	try {
		flat =
			typeof val === 'string' && val.trim() ? JSON.parse(val) : null;
	} catch {
		flat = null;
	}

	const elId = typographyPreviewStyleId(settingId);
	let el = document.getElementById(elId);

	if (!flat || typeof flat !== 'object') {
		el?.remove();
		return;
	}

	const keys = Object.keys(flat).filter(
		(k) => flat[k] !== undefined && flat[k] !== null && String(flat[k]).trim() !== ''
	);
	if (!keys.length) {
		el?.remove();
		return;
	}

	const css = buildTypographyPreviewCss(
		flat,
		selector,
		getBreakpoints(),
		getBasePx()
	);
	if (!css || !css.trim()) {
		el?.remove();
		return;
	}

	if (!el) {
		el = document.createElement('style');
		el.id = elId;
		el.className = 'onepress-typo-preview-inline';
		document.head.appendChild(el);
	}
	el.textContent = css;
	ensureTypographyGoogleFont(document, flat);
}

/**
 * @param {import('wp-customize').Customize} api wp.customize
 */
export function bindOnePressTypographyPreview(api) {
	api.bind('preview-ready', () => {
		const map =
			typeof window !== 'undefined' &&
			window.onepressTypoPostMessageSelectors;
		if (!map || typeof map !== 'object') {
			return;
		}
		Object.keys(map).forEach((id) => {
			const selector = map[id];
			if (!selector || typeof selector !== 'string') {
				return;
			}
			api(id, (setting) => {
				setting.bind((val) => applyTypographyPreview(id, selector, val));
			});
		});
	});
}
