/**
 * Customizer preview iframe: slider CSS via postMessage.
 */
import { buildSliderPreviewCss, sliderPreviewStyleId } from './buildSliderPreviewCss.js';

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
 * @param {{ selector: string, property?: string }} conf
 * @param {unknown} val
 */
function applySliderPreview(settingId, conf, val) {
	const selector = conf?.selector;
	const property = conf?.property || 'width';
	let data = null;
	try {
		data =
			typeof val === 'string' && val.trim() ? JSON.parse(val) : null;
	} catch {
		data = null;
	}

	const elId = sliderPreviewStyleId(settingId);
	let el = document.getElementById(elId);

	if (!data || typeof data !== 'object') {
		el?.remove();
		return;
	}

	const css = buildSliderPreviewCss(data, selector, property, getBreakpoints());
	if (!css?.trim()) {
		el?.remove();
		return;
	}

	if (!el) {
		el = document.createElement('style');
		el.id = elId;
		el.className = 'onepress-slider-preview-inline';
		document.head.appendChild(el);
	}
	el.textContent = css;
}

/**
 * @param {import('wp-customize').Customize} api wp.customize
 */
export function bindOnePressSliderPreview(api) {
	api.bind('preview-ready', () => {
		const map =
			typeof window !== 'undefined' &&
			window.onepressSliderPostMessageConfig;
		if (!map || typeof map !== 'object') {
			return;
		}
		Object.keys(map).forEach((id) => {
			const conf = map[id];
			if (
				!conf ||
				typeof conf !== 'object' ||
				typeof conf.selector !== 'string' ||
				!conf.selector.trim()
			) {
				return;
			}
			api(id, (setting) => {
				setting.bind((val) => applySliderPreview(id, conf, val));
			});
		});
	});
}
