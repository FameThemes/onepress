/**
 * Customizer preview iframe: apply background CSS per postMessage setting.
 *
 * Preview frame `wp.customize.settings` is not keyed like the pane (no per-id .transport);
 * bind explicit setting IDs from PHP (same pattern as typography / spacing).
 */
import {
	backgroundStyleElementId,
	buildBackgroundCss,
} from './buildBackgroundCss.js';

function getBreakpoints() {
	const b = typeof window !== 'undefined' && window.onepressBackgroundBreakpoints;
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
 * @param {unknown} val
 */
function applyBackgroundPreview(settingId, val) {
	let data = null;
	try {
		data =
			typeof val === 'string' && val.trim() ? JSON.parse(val) : null;
	} catch {
		return;
	}
	if (!data || !data._onepressBackground) {
		return;
	}
	const css = buildBackgroundCss(data, getBreakpoints());
	const elId = backgroundStyleElementId(settingId);
	let el = document.getElementById(elId);
	if (!css || !css.trim()) {
		el?.remove();
		return;
	}
	if (!el) {
		el = document.createElement('style');
		el.id = elId;
		el.className = 'onepress-bg-preview-inline';
		document.head.appendChild(el);
	}
	el.textContent = css;
}

/**
 * @param {import('wp-customize').Customize} api wp.customize
 */
export function bindOnePressBackgroundPreview(api) {
	api.bind('preview-ready', () => {
		const ids =
			typeof window !== 'undefined' &&
			window.onepressBackgroundPostMessageSettingIds;
		if (!Array.isArray(ids) || !ids.length) {
			return;
		}
		ids.forEach((id) => {
			if (!id || typeof id !== 'string') {
				return;
			}
			api(id, (setting) => {
				const run = (val) => applyBackgroundPreview(id, val);
				setting.bind(run);
				run(setting.get());
			});
		});
	});
}
