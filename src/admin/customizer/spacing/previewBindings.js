/**
 * Customizer preview iframe: spacing CSS via postMessage (matches PHP onepress_spacing_css).
 */
import {
	buildSpacingPreviewCss,
	spacingPreviewStyleId,
} from './buildSpacingPreviewCss.js';

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

/**
 * @param {string} settingId
 * @param {string} selector
 * @param {unknown} val
 */
function applySpacingPreview(settingId, selector, val) {
	let flat = null;
	try {
		flat =
			typeof val === 'string' && val.trim() ? JSON.parse(val) : null;
	} catch {
		flat = null;
	}

	const elId = spacingPreviewStyleId(settingId);
	let el = document.getElementById(elId);

	if (!flat || typeof flat !== 'object') {
		el?.remove();
		return;
	}

	const keys = Object.keys(flat).filter(
		(k) =>
			flat[k] !== undefined &&
			flat[k] !== null &&
			String(flat[k]).trim() !== ''
	);
	if (!keys.length) {
		el?.remove();
		return;
	}

	const css = buildSpacingPreviewCss(flat, selector, getBreakpoints());
	if (!css || !css.trim()) {
		el?.remove();
		return;
	}

	if (!el) {
		el = document.createElement('style');
		el.id = elId;
		el.className = 'onepress-spacing-preview-inline';
		document.head.appendChild(el);
	}
	el.textContent = css;
}

/**
 * @param {import('wp-customize').Customize} api wp.customize
 */
export function bindOnePressSpacingPreview(api) {
	api.bind('preview-ready', () => {
		const map =
			typeof window !== 'undefined' &&
			window.onepressSpacingPostMessageSelectors;
		if (!map || typeof map !== 'object') {
			return;
		}
		Object.keys(map).forEach((id) => {
			const selector = map[id];
			if (!selector || typeof selector !== 'string') {
				return;
			}
			api(id, (setting) => {
				setting.bind((val) => applySpacingPreview(id, selector, val));
			});
		});
	});
}
