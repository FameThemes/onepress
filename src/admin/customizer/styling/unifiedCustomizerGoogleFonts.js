/**
 * Customizer preview: one merged Google Fonts CSS2 link from styling theme_mods + font manager (FM wins per family).
 */
import { isValidFontManagerVariationPair } from '../font-manager/fontManagerGoogleCss2';
import {
	buildGoogleFontsCss2Href,
	collectMergedGoogleFontAxes,
	collectMergedGoogleFontAxesFromFontManagerSettings,
	mergeGoogleFontAxesFontManagerPriority,
} from './stylingGoogleFonts';

/** Single preview link; replaces legacy styling-only + per-family font-manager links. */
export const ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID = 'onepress-merged-google-fonts-preview';

/** Unsaved font manager draft in controls: setting id → family → axis pairs */
const liveFontManagerGoogleAxesBySettingId = /** @type {Record<string, Map<string, Set<string>>>} */ ({});

/**
 * @param {string} settingId
 * @param {Record<string, unknown>} plain — family → string[]
 */
export function setLiveFontManagerGoogleAxesFromPlain(settingId, plain) {
	const sid = String(settingId || '').trim();
	if (!sid || !plain || typeof plain !== 'object') {
		return;
	}
	const m = new Map();
	for (const [fam, arr] of Object.entries(plain)) {
		const f = String(fam || '').trim();
		if (!f || !Array.isArray(arr)) {
			continue;
		}
		const set = new Set(arr.map((x) => String(x).trim()).filter(isValidFontManagerVariationPair));
		if (set.size) {
			m.set(f, set);
		}
	}
	if (m.size) {
		liveFontManagerGoogleAxesBySettingId[sid] = m;
	} else {
		delete liveFontManagerGoogleAxesBySettingId[sid];
	}
}

/**
 * @param {string} settingId
 */
export function clearLiveFontManagerGoogleAxes(settingId) {
	const sid = String(settingId || '').trim();
	if (sid) {
		delete liveFontManagerGoogleAxesBySettingId[sid];
	}
}

function getLiveFontManagerMap() {
	return liveFontManagerGoogleAxesBySettingId;
}

const LEGACY_STYLING_LINK_ID = 'onepress-styling-google-fonts-preview';
const LEGACY_FM_WRAP_ID = 'onepress-font-manager-preview-links';

/** @type {string[]} */
const DEFAULT_STYLING_SETTING_IDS = [
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

/**
 * @param {unknown} raw
 * @returns {Record<string, unknown> | null}
 */
function parseStylingSettingRaw(raw) {
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
 * @returns {string[]}
 */
function getStylingPreviewSettingIds() {
	const w = typeof window !== 'undefined' ? window.onepressStylingPreview : null;
	if (w && Array.isArray(w.settingIds) && w.settingIds.length) {
		return w.settingIds.map(String);
	}
	return DEFAULT_STYLING_SETTING_IDS;
}

/**
 * @returns {string[]}
 */
function getFontManagerPreviewSettingIds() {
	const w = typeof window !== 'undefined' ? window.onepressFontManagerPreview : null;
	if (w && Array.isArray(w.settingIds) && w.settingIds.length) {
		return w.settingIds.map(String);
	}
	return ['onepress_font_manager'];
}

/**
 * @param {JQueryStatic} $ jQuery
 * @param {*} api wp.customize
 */
export function paintMergedCustomizerGoogleFonts($, api) {
	const stylingIds = getStylingPreviewSettingIds();
	const fmIds = getFontManagerPreviewSettingIds();

	/** @type {Record<string, unknown>[]} */
	const stylingValues = [];
	for (const id of stylingIds) {
		try {
			const value = api(id);
			if (!value || typeof value.get !== 'function') {
				continue;
			}
			stylingValues.push(parseStylingSettingRaw(value.get()) || {});
		} catch {
			continue;
		}
	}

	const stylingMap = collectMergedGoogleFontAxes(stylingValues);
	const fontManagerMap = collectMergedGoogleFontAxesFromFontManagerSettings(api, fmIds, getLiveFontManagerMap());
	const merged = mergeGoogleFontAxesFontManagerPriority(stylingMap, fontManagerMap);
	const href = buildGoogleFontsCss2Href(merged);

	$(`#${LEGACY_STYLING_LINK_ID}`).remove();
	$(`#${LEGACY_FM_WRAP_ID}`).remove();

	let $link = $(`#${ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID}`);
	if (!href) {
		$link.remove();
		return;
	}
	if (!$link.length) {
		$link = $('<link rel="stylesheet" />')
			.attr('id', ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID)
			.attr('crossorigin', 'anonymous')
			.appendTo('head');
	}
	$link.attr('href', href);
}
