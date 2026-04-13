/**
 * Customizer preview iframe: apply styling theme_mods as <style> tags + one merged Google Fonts stylesheet.
 */
import { buildStylingCss } from './buildStylingCss';
import { buildGoogleFontsCss2Href, collectMergedGoogleFontAxes } from './stylingGoogleFonts';
import { bindStylingSelectorPickPreview } from './stylingSelectorPickPreview';

/** Fallback when `onepressStylingPreview.settingIds` is missing — keep in sync with `onepress_styling_default_theme_mod_setting_ids()` (PHP). */
const DEFAULT_SETTING_IDS = [
	'onepress_styling_body',
	'onepress_styling_h1',
	'onepress_styling_h2',
	'onepress_styling_h3',
	'onepress_styling_h4',
	'onepress_styling_h5',
	'onepress_styling_h6',
	'onepress_styling_nav',
	'onepress_styling_branding',
	'onepress_styling_tagline',
	'onepress_element_styling',
	'onepress_element_styling_single',
	'onepress_element_styling_fixed_states',
];
const GOOGLE_LINK_ID = 'onepress-styling-google-fonts-preview';

/** Avoid duplicate value.bind when preview-ready runs more than once (iframe refresh). */
let stylingPreviewListenersBound = false;

/**
 * @param {unknown} raw
 * @returns {Record<string, unknown> | null}
 */
function parseSettingRaw(raw) {
	try {
		if (typeof raw === 'string' && raw) {
			return JSON.parse(raw);
		}
		if (raw && typeof raw === 'object') {
			return /** @type {Record<string, unknown>} */ (raw);
		}
	} catch {
		return null;
	}
	return null;
}

/**
 * @param {JQueryStatic} $ jQuery
 * @param {*} api wp.customize
 * @param {string[]} [settingIds]
 */
export function bindOnepressStylingPreview($, api, settingIds = DEFAULT_SETTING_IDS) {
	const fromWindow =
		typeof window !== 'undefined' &&
		window.onepressStylingPreview &&
		Array.isArray(window.onepressStylingPreview.settingIds) &&
		window.onepressStylingPreview.settingIds.length
			? window.onepressStylingPreview.settingIds.map(String)
			: null;
	const ids = fromWindow || settingIds;

	function paintAll() {
		/** @type {Record<string, unknown>[]} */
		const values = [];
		for (const id of ids) {
			try {
				const value = api(id);
				if (!value || typeof value.get !== 'function') {
					continue;
				}
				const data = parseSettingRaw(value.get()) || {};
				values.push(data);
				const css = buildStylingCss(data);
				const styleId = `onepress-styling-preview-${id.replace(/[^a-z0-9_-]/gi, '_')}`;
				let $style = $(`#${styleId}`);
				if (!$style.length) {
					$style = $('<style type="text/css" />').attr('id', styleId).appendTo('head');
				}
				$style.text(css);
			} catch {
				continue;
			}
		}
		const merged = collectMergedGoogleFontAxes(values);
		const href = buildGoogleFontsCss2Href(merged);
		let $link = $(`link#${GOOGLE_LINK_ID}`);
		if (!href) {
			$link.remove();
			return;
		}
		if (!$link.length) {
			$link = $('<link rel="stylesheet" />')
				.attr('id', GOOGLE_LINK_ID)
				.attr('crossorigin', 'anonymous')
				.appendTo('head');
		}
		$link.attr('href', href);
	}

	if (!stylingPreviewListenersBound) {
		stylingPreviewListenersBound = true;
		for (const id of ids) {
			try {
				api(id, (value) => {
					value.bind(paintAll);
				});
			} catch {
				continue;
			}
		}
	}
	paintAll();
	bindStylingSelectorPickPreview(api);
}
