/**
 * Customizer preview iframe: refresh merged Google Fonts when font manager settings change (see unifiedCustomizerGoogleFonts).
 */
import {
	clearLiveFontManagerGoogleAxes,
	paintMergedCustomizerGoogleFonts,
	setLiveFontManagerGoogleAxesFromPlain,
} from '../styling/unifiedCustomizerGoogleFonts';
import { ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE } from './fontManagerPreviewConstants';

/** @type {boolean} */
let fontManagerPreviewListenersBound = false;

/**
 * @param {JQueryStatic} $ jQuery
 * @param {*} api wp.customize
 * @param {string[]} [settingIds]
 */
export function bindOnepressFontManagerPreview($, api, settingIds) {
	const fromWindow =
		typeof window !== 'undefined' &&
		window.onepressFontManagerPreview &&
		Array.isArray(window.onepressFontManagerPreview.settingIds) &&
		window.onepressFontManagerPreview.settingIds.length
			? window.onepressFontManagerPreview.settingIds.map(String)
			: null;
	const ids = (settingIds && settingIds.length ? settingIds : fromWindow) || ['onepress_font_manager'];

	function paintMerged() {
		paintMergedCustomizerGoogleFonts($, api);
	}

	if (!fontManagerPreviewListenersBound) {
		fontManagerPreviewListenersBound = true;
		if (api.preview && typeof api.preview.bind === 'function') {
			api.preview.bind(ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE, (data) => {
				const sid = typeof data?.settingId === 'string' ? data.settingId.trim() : '';
				if (sid && data?.axesByFamily && typeof data.axesByFamily === 'object') {
					setLiveFontManagerGoogleAxesFromPlain(sid, data.axesByFamily);
				}
				paintMerged();
			});
		}
		for (const id of ids) {
			try {
				api(id, (value) => {
					value.bind(() => {
						clearLiveFontManagerGoogleAxes(id);
						paintMerged();
					});
				});
			} catch {
				continue;
			}
		}
	}
	paintMerged();
}
