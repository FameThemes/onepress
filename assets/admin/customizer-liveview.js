/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/customizer/styling/buildStylingCss.js"
/*!*********************************************************!*\
  !*** ./src/admin/customizer/styling/buildStylingCss.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_BPS: () => (/* binding */ DEFAULT_BPS),
/* harmony export */   buildStylingCss: () => (/* binding */ buildStylingCss),
/* harmony export */   composeStylingFullSelector: () => (/* binding */ composeStylingFullSelector)
/* harmony export */ });
/**
 * Build CSS from styling JSON (mirror PHP onepress_styling_build_css_from_value). Preview + consistency.
 *
 * @param {Record<string, unknown>} value Parsed setting value
 * @param {Array<{ id: string, label?: string, maxWidth?: string }>} [breakpoints]
 * @returns {string}
 */
const DEFAULT_BPS = [{
  id: 'desktop',
  label: 'Desktop',
  maxWidth: ''
}, {
  id: 'tablet',
  label: 'Tablet',
  maxWidth: '991px'
}, {
  id: 'mobile',
  label: 'Mobile',
  maxWidth: '767px'
}];
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
function composeStylingFullSelector(baseRaw, suffixRaw) {
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
function buildStylingCss(value, breakpoints = DEFAULT_BPS) {
  if (!value || typeof value !== 'object' || !value._meta || !Array.isArray(value._meta.states)) {
    return '';
  }
  const baseMeta = value._meta && typeof value._meta.baseSelector === 'string' ? stripSelector(value._meta.baseSelector).trim() : '';
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
    const slice = value[stateKey] && typeof value[stateKey] === 'object' && !Array.isArray(value[stateKey]) ? value[stateKey] : {};
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


/***/ },

/***/ "./src/admin/customizer/styling/declarationForm.js"
/*!*********************************************************!*\
  !*** ./src/admin/customizer/styling/declarationForm.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSS_TO_MODEL: () => (/* binding */ CSS_TO_MODEL),
/* harmony export */   KNOWN_CSS_PROPS: () => (/* binding */ KNOWN_CSS_PROPS),
/* harmony export */   SERIALIZE_ORDER: () => (/* binding */ SERIALIZE_ORDER),
/* harmony export */   joinModelAndUnknown: () => (/* binding */ joinModelAndUnknown),
/* harmony export */   parseDeclarationForm: () => (/* binding */ parseDeclarationForm),
/* harmony export */   parseDeclarationsToMap: () => (/* binding */ parseDeclarationsToMap),
/* harmony export */   parseStyleDeclarations: () => (/* binding */ parseStyleDeclarations),
/* harmony export */   patchDeclarationForm: () => (/* binding */ patchDeclarationForm),
/* harmony export */   serializeDeclarationForm: () => (/* binding */ serializeDeclarationForm),
/* harmony export */   serializeStyleDeclarations: () => (/* binding */ serializeStyleDeclarations),
/* harmony export */   splitKnownUnknown: () => (/* binding */ splitKnownUnknown)
/* harmony export */ });
/**
 * Parse / serialize declaration strings ↔ known form model (plan: disk = one string per state×device).
 * Unknown properties are preserved in a side map and re-appended on save.
 */

/**
 * @typedef {Record<string, string>} CssMap kebab-case property → value
 */

/**
 * [modelKey, cssProperty] — output order for stable diffs.
 * Matches plan groups: Text, Background, Spacing, Border, Shadow, Display.
 */
const SERIALIZE_ORDER = [
// Text
['color', 'color'], ['fontFamily', 'font-family'], ['fontSize', 'font-size'], ['lineHeight', 'line-height'], ['fontWeight', 'font-weight'], ['fontStyle', 'font-style'], ['letterSpacing', 'letter-spacing'], ['textTransform', 'text-transform'], ['textDecoration', 'text-decoration'], ['textAlign', 'text-align'],
// Background
['backgroundColor', 'background-color'], ['backgroundImage', 'background-image'], ['backgroundSize', 'background-size'], ['backgroundRepeat', 'background-repeat'], ['backgroundPosition', 'background-position'], ['backgroundAttachment', 'background-attachment'],
// Spacing
['marginTop', 'margin-top'], ['marginRight', 'margin-right'], ['marginBottom', 'margin-bottom'], ['marginLeft', 'margin-left'], ['paddingTop', 'padding-top'], ['paddingRight', 'padding-right'], ['paddingBottom', 'padding-bottom'], ['paddingLeft', 'padding-left'],
// Border
['borderStyle', 'border-style'], ['borderTopWidth', 'border-top-width'], ['borderRightWidth', 'border-right-width'], ['borderBottomWidth', 'border-bottom-width'], ['borderLeftWidth', 'border-left-width'], ['borderColor', 'border-color'], ['borderTopLeftRadius', 'border-top-left-radius'], ['borderTopRightRadius', 'border-top-right-radius'], ['borderBottomRightRadius', 'border-bottom-right-radius'], ['borderBottomLeftRadius', 'border-bottom-left-radius'], ['outlineStyle', 'outline-style'], ['outlineWidth', 'outline-width'], ['outlineColor', 'outline-color'], ['outlineOffset', 'outline-offset'],
// Shadow
['boxShadow', 'box-shadow'],
// Display / layout
['display', 'display'], ['visibility', 'visibility'], ['opacity', 'opacity'], ['position', 'position'], ['top', 'top'], ['right', 'right'], ['bottom', 'bottom'], ['left', 'left'], ['width', 'width'], ['height', 'height'], ['minWidth', 'min-width'], ['maxWidth', 'max-width'], ['minHeight', 'min-height'], ['maxHeight', 'max-height'], ['zIndex', 'z-index'], ['overflow', 'overflow'], ['flexDirection', 'flex-direction'], ['flexWrap', 'flex-wrap'], ['justifyContent', 'justify-content'], ['alignItems', 'align-items'], ['alignContent', 'align-content'], ['gap', 'gap'], ['rowGap', 'row-gap'], ['columnGap', 'column-gap'], ['gridTemplateColumns', 'grid-template-columns'], ['gridTemplateRows', 'grid-template-rows'], ['gridAutoFlow', 'grid-auto-flow'], ['justifyItems', 'justify-items']];

/** @type {Record<string, string>} */
const CSS_TO_MODEL = Object.fromEntries(SERIALIZE_ORDER.map(([modelKey, cssProp]) => [cssProp, modelKey]));

/** @type {Set<string>} */
const KNOWN_CSS_PROPS = new Set(SERIALIZE_ORDER.map(([, css]) => css));

/**
 * @param {string} css
 * @returns {CssMap}
 */
function parseDeclarationsToMap(css) {
  const map = {};
  if (!css || typeof css !== 'string') {
    return map;
  }
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const re = /([\w-]+)\s*:\s*((?:[^;'"]|'[^']*'|"[^"]*")+?)(?=\s*;|\s*$)/gi;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const prop = m[1].trim().toLowerCase();
    let val = m[2].trim();
    val = val.replace(/\s*!important\s*$/i, '').trim();
    if (prop && val) {
      map[prop] = val;
    }
  }
  return map;
}

/**
 * @param {CssMap} map
 * @returns {{ model: Record<string, string>, unknown: CssMap }}
 */
function splitKnownUnknown(map) {
  /** @type {Record<string, string>} */
  const model = {};
  /** @type {CssMap} */
  const unknown = {};
  for (const [cssProp, val] of Object.entries(map)) {
    const mk = CSS_TO_MODEL[cssProp];
    if (mk) {
      model[mk] = val;
    } else {
      unknown[cssProp] = val;
    }
  }
  return {
    model,
    unknown
  };
}

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @returns {string}
 */
function joinModelAndUnknown(model, unknown) {
  const parts = [];
  for (const [mk, ck] of SERIALIZE_ORDER) {
    const v = model[mk];
    if (v != null && String(v).trim() !== '') {
      parts.push(`${ck}: ${String(v).trim()}`);
    }
  }
  const extraKeys = Object.keys(unknown).sort();
  for (const k of extraKeys) {
    const v = unknown[k];
    if (v != null && String(v).trim() !== '') {
      parts.push(`${k}: ${String(v).trim()}`);
    }
  }
  if (!parts.length) {
    return '';
  }
  return `${parts.join('; ')};`;
}

/**
 * @param {string} css
 * @returns {{ model: Record<string, string>, unknown: CssMap }}
 */
function parseDeclarationForm(css) {
  const map = parseDeclarationsToMap(css);
  return splitKnownUnknown(map);
}

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @returns {string}
 */
function serializeDeclarationForm(model, unknown) {
  return joinModelAndUnknown(model, unknown);
}

/** Plan name: parse declaration string → known model + unknown map. */
const parseStyleDeclarations = parseDeclarationForm;

/** Plan name: serialize known model + unknown → declaration string. */
const serializeStyleDeclarations = serializeDeclarationForm;

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @param {Record<string, string>} patch
 * @returns {string}
 */
function patchDeclarationForm(model, unknown, patch) {
  const next = {
    ...model,
    ...patch
  };
  return serializeDeclarationForm(next, unknown);
}

/***/ },

/***/ "./src/admin/customizer/styling/googleFontCollection.js"
/*!**************************************************************!*\
  !*** ./src/admin/customizer/styling/googleFontCollection.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchGoogleFontFamilies: () => (/* binding */ fetchGoogleFontFamilies),
/* harmony export */   findFamilyForModel: () => (/* binding */ findFamilyForModel),
/* harmony export */   fontStylesForWeight: () => (/* binding */ fontStylesForWeight),
/* harmony export */   getSystemFontPresets: () => (/* binding */ getSystemFontPresets),
/* harmony export */   mergePickerFamilies: () => (/* binding */ mergePickerFamilies),
/* harmony export */   normalizeFontCollectionResponse: () => (/* binding */ normalizeFontCollectionResponse),
/* harmony export */   pickDefaultFace: () => (/* binding */ pickDefaultFace),
/* harmony export */   uniqueFontWeights: () => (/* binding */ uniqueFontWeights)
/* harmony export */ });
/**
 * Font picker: system presets + Google Fonts from REST (API order preserved).
 */

/** @typedef {{ fontWeight: string, fontStyle: string, preview: string }} GoogleFontFace */
/**
 * @typedef {{
 *   slug: string,
 *   name: string,
 *   fontFamily: string,
 *   preview: string,
 *   fontFace: GoogleFontFace[],
 *   isSystem?: boolean
 * }} PickerFontFamily
 */

/**
 * Ten common system / generic font stacks (shown first in the picker; not from Google API).
 * @type {ReadonlyArray<{ slug: string, name: string, fontFamily: string }>}
 */
const SYSTEM_FONT_DEFINITIONS = [{
  slug: 'onepress-system-ui',
  name: 'System UI',
  fontFamily: 'system-ui, sans-serif'
}, {
  slug: 'onepress-system-sans-stack',
  name: 'System sans (Apple / Segoe)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'
}, {
  slug: 'onepress-generic-sans-serif',
  name: 'Sans-serif (generic)',
  fontFamily: 'sans-serif'
}, {
  slug: 'onepress-generic-serif',
  name: 'Serif (generic)',
  fontFamily: 'serif'
}, {
  slug: 'onepress-generic-monospace',
  name: 'Monospace (generic)',
  fontFamily: 'monospace'
}, {
  slug: 'onepress-ui-monospace',
  name: 'UI monospace',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'
}, {
  slug: 'onepress-stack-georgia',
  name: 'Georgia',
  fontFamily: 'Georgia, "Times New Roman", Times, serif'
}, {
  slug: 'onepress-stack-arial',
  name: 'Arial / Helvetica',
  fontFamily: 'Arial, Helvetica, sans-serif'
}, {
  slug: 'onepress-stack-times',
  name: 'Times New Roman',
  fontFamily: '"Times New Roman", Times, serif'
}, {
  slug: 'onepress-stack-verdana',
  name: 'Verdana',
  fontFamily: 'Verdana, Geneva, sans-serif'
}];

/**
 * @returns {PickerFontFamily[]}
 */
function getSystemFontPresets() {
  return SYSTEM_FONT_DEFINITIONS.map(def => ({
    slug: def.slug,
    name: def.name,
    fontFamily: def.fontFamily,
    preview: '',
    fontFace: [],
    isSystem: true
  }));
}

/**
 * @param {PickerFontFamily[] | null | undefined} googleFamilies — REST order, unchanged
 * @returns {PickerFontFamily[]}
 */
function mergePickerFamilies(googleFamilies) {
  const g = Array.isArray(googleFamilies) ? googleFamilies : [];
  return [...getSystemFontPresets(), ...g];
}

/**
 * @param {unknown} item
 * @returns {PickerFontFamily | null}
 */
function parseFontFamilyItem(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }
  const raw = /** @type {Record<string, unknown>} */item;
  const s = /** @type {Record<string, unknown>} */
  raw.font_family_settings || raw.fontFamilySettings || raw;
  if (!s || typeof s !== 'object') {
    return null;
  }
  const slug = String(s.slug || '');
  const name = String(s.name || '');
  const fontFamily = String(s.fontFamily || '');
  if (!slug || !name || !fontFamily) {
    return null;
  }
  const fontFaceRaw = Array.isArray(s.fontFace) ? s.fontFace : [];
  const fontFace = fontFaceRaw.map(f => {
    var _face$fontWeight, _face$fontStyle;
    if (!f || typeof f !== 'object') {
      return null;
    }
    const face = /** @type {Record<string, unknown>} */f;
    return {
      fontWeight: String((_face$fontWeight = face.fontWeight) !== null && _face$fontWeight !== void 0 ? _face$fontWeight : '400'),
      fontStyle: String((_face$fontStyle = face.fontStyle) !== null && _face$fontStyle !== void 0 ? _face$fontStyle : 'normal'),
      preview: face.preview ? String(face.preview) : ''
    };
  }).filter(Boolean);
  return {
    slug,
    name,
    fontFamily,
    preview: s.preview ? String(s.preview) : '',
    fontFace: (/** @type {GoogleFontFace[]} */fontFace),
    isSystem: false
  };
}

/**
 * @param {unknown} json
 * @returns {PickerFontFamily[]}
 */
function normalizeFontCollectionResponse(json) {
  if (!json || typeof json !== 'object') {
    return [];
  }
  const raw = /** @type {Record<string, unknown>} */json.font_families;
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map(parseFontFamilyItem).filter(Boolean);
}

/**
 * Google Fonts only, same order as REST payload (no client-side reorder).
 * @returns {Promise<PickerFontFamily[]>}
 */
async function fetchGoogleFontFamilies() {
  const root = typeof window !== 'undefined' && window.wpApiSettings?.root ? window.wpApiSettings.root : `${window.location.origin}/wp-json/`;
  const base = String(root).replace(/\/?$/, '/');
  const url = `${base}wp/v2/font-collections/google-fonts?_locale=user`;
  const headers = {
    Accept: 'application/json'
  };
  if (typeof window !== 'undefined' && window.wpApiSettings?.nonce) {
    headers['X-WP-Nonce'] = window.wpApiSettings.nonce;
  }
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers
  });
  if (!response.ok) {
    throw new Error(`Font collection HTTP ${response.status}`);
  }
  const json = await response.json();
  return normalizeFontCollectionResponse(json);
}

/**
 * @param {PickerFontFamily[] | null | undefined} families
 * @param {string} value
 * @returns {PickerFontFamily | null}
 */
function findFamilyForModel(families, value) {
  if (!families?.length) {
    return null;
  }
  const v = String(value || '').trim();
  if (!v) {
    return null;
  }
  const byStack = families.find(f => f.fontFamily === v);
  if (byStack) {
    return byStack;
  }
  const first = v.split(',')[0].trim().replace(/^["']+|["']+$/g, '').toLowerCase();
  return families.find(f => f.name.toLowerCase() === first) || null;
}

/**
 * @param {GoogleFontFace[]} faces
 * @returns {string[]}
 */
function uniqueFontWeights(faces) {
  const weights = [...new Set(faces.map(f => {
    var _f$fontWeight;
    return String((_f$fontWeight = f.fontWeight) !== null && _f$fontWeight !== void 0 ? _f$fontWeight : '400');
  }))];
  return weights.sort((a, b) => {
    const na = Number.parseInt(a, 10);
    const nb = Number.parseInt(b, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) {
      return na - nb;
    }
    if (!Number.isNaN(na)) {
      return -1;
    }
    if (!Number.isNaN(nb)) {
      return 1;
    }
    return a.localeCompare(b);
  });
}

/**
 * @param {GoogleFontFace[]} faces
 * @param {string} weight
 * @returns {string[]}
 */
function fontStylesForWeight(faces, weight) {
  const w = weight === '' || weight === undefined ? null : String(weight);
  const subset = w === null ? faces : faces.filter(f => String(f.fontWeight) === w);
  const styles = [...new Set(subset.map(f => String(f.fontStyle || 'normal')))];
  return styles.sort((a, b) => a.localeCompare(b));
}

/**
 * @param {PickerFontFamily} family
 * @returns {{ fontWeight: string, fontStyle: string }}
 */
function pickDefaultFace(family) {
  if (family.isSystem) {
    return {
      fontWeight: '',
      fontStyle: ''
    };
  }
  const faces = family.fontFace || [];
  if (!faces.length) {
    return {
      fontWeight: '400',
      fontStyle: 'normal'
    };
  }
  const preferred = faces.find(f => String(f.fontWeight) === '400' && String(f.fontStyle) === 'normal');
  const face = preferred || faces[0];
  return {
    fontWeight: String(face.fontWeight),
    fontStyle: String(face.fontStyle)
  };
}

/***/ },

/***/ "./src/admin/customizer/styling/styling-preview.js"
/*!*********************************************************!*\
  !*** ./src/admin/customizer/styling/styling-preview.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindOnepressStylingPreview: () => (/* binding */ bindOnepressStylingPreview)
/* harmony export */ });
/* harmony import */ var _buildStylingCss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildStylingCss */ "./src/admin/customizer/styling/buildStylingCss.js");
/* harmony import */ var _stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylingGoogleFonts */ "./src/admin/customizer/styling/stylingGoogleFonts.js");
/**
 * Customizer preview iframe: apply styling theme_mods as <style> tags + one merged Google Fonts stylesheet.
 */


const DEFAULT_SETTING_IDS = ['onepress_element_styling'];
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
      return /** @type {Record<string, unknown>} */raw;
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
function bindOnepressStylingPreview($, api, settingIds = DEFAULT_SETTING_IDS) {
  const fromWindow = typeof window !== 'undefined' && window.onepressStylingPreview && Array.isArray(window.onepressStylingPreview.settingIds) && window.onepressStylingPreview.settingIds.length ? window.onepressStylingPreview.settingIds.map(String) : null;
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
        const css = (0,_buildStylingCss__WEBPACK_IMPORTED_MODULE_0__.buildStylingCss)(data);
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
    const merged = (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__.collectMergedGoogleFontAxes)(values);
    const href = (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__.buildGoogleFontsCss2Href)(merged);
    let $link = $(`link#${GOOGLE_LINK_ID}`);
    if (!href) {
      $link.remove();
      return;
    }
    if (!$link.length) {
      $link = $('<link rel="stylesheet" />').attr('id', GOOGLE_LINK_ID).attr('crossorigin', 'anonymous').appendTo('head');
    }
    $link.attr('href', href);
  }
  if (!stylingPreviewListenersBound) {
    stylingPreviewListenersBound = true;
    for (const id of ids) {
      try {
        api(id, value => {
          value.bind(paintAll);
        });
      } catch {
        continue;
      }
    }
  }
  paintAll();
}

/***/ },

/***/ "./src/admin/customizer/styling/stylingGoogleFonts.js"
/*!************************************************************!*\
  !*** ./src/admin/customizer/styling/stylingGoogleFonts.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildGoogleFontsCss2Href: () => (/* binding */ buildGoogleFontsCss2Href),
/* harmony export */   collectMergedGoogleFontAxes: () => (/* binding */ collectMergedGoogleFontAxes),
/* harmony export */   googleAxisPairFromSlice: () => (/* binding */ googleAxisPairFromSlice),
/* harmony export */   mergeGoogleFontAxesInto: () => (/* binding */ mergeGoogleFontAxesInto),
/* harmony export */   normalizeFontWeightForGoogle: () => (/* binding */ normalizeFontWeightForGoogle),
/* harmony export */   normalizeItalForGoogle: () => (/* binding */ normalizeItalForGoogle),
/* harmony export */   rebuildFontSlicesInValue: () => (/* binding */ rebuildFontSlicesInValue)
/* harmony export */ });
/* harmony import */ var _declarationForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarationForm */ "./src/admin/customizer/styling/declarationForm.js");
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");
/**
 * _meta.fontSlices + merged Google Fonts CSS2 URLs (preview + PHP mirror).
 */



/** @typedef {{ source: string, slug: string, family: string }} FontSliceMeta */

/**
 * @param {string} weight
 * @returns {string} numeric 100–900 for Google axis
 */
function normalizeFontWeightForGoogle(weight) {
  const w = String(weight !== null && weight !== void 0 ? weight : '').trim().toLowerCase();
  if (w === '' || w === 'inherit') {
    return '400';
  }
  if (w === 'normal') {
    return '400';
  }
  if (w === 'bold') {
    return '700';
  }
  if (w === 'bolder') {
    return '700';
  }
  if (w === 'lighter') {
    return '300';
  }
  if (/^\d{3}$/.test(w)) {
    return w;
  }
  return '400';
}

/**
 * @param {string} style
 * @returns {'0'|'1'}
 */
function normalizeItalForGoogle(style) {
  const s = String(style !== null && style !== void 0 ? style : '').trim().toLowerCase();
  if (s === 'italic' || s === 'oblique') {
    return '1';
  }
  return '0';
}

/**
 * @param {string} declarations
 * @param {FontSliceMeta} sliceMeta
 * @returns {string | null} "ital,wght" pair e.g. "0,400"
 */
function googleAxisPairFromSlice(declarations, sliceMeta) {
  if (!sliceMeta || sliceMeta.source !== 'google' || !String(sliceMeta.family || '').trim()) {
    return null;
  }
  const {
    model
  } = (0,_declarationForm__WEBPACK_IMPORTED_MODULE_0__.parseDeclarationForm)(typeof declarations === 'string' ? declarations : '');
  const ital = normalizeItalForGoogle(model.fontStyle);
  const wght = normalizeFontWeightForGoogle(model.fontWeight);
  return `${ital},${wght}`;
}

/**
 * Walk styling JSON and fill `_meta.fontSlices` from declaration strings + font catalog.
 *
 * @param {Record<string, unknown>} value
 * @param {import('./googleFontCollection').PickerFontFamily[] | null | undefined} families
 */
function rebuildFontSlicesInValue(value, families) {
  if (!value || typeof value !== 'object' || !value._meta || !Array.isArray(value._meta.states)) {
    return;
  }
  /** @type {Record<string, Record<string, FontSliceMeta>>} */
  const fontSlices = {};
  for (const entry of value._meta.states) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const keys = Object.keys(entry);
    if (keys.length !== 1) {
      continue;
    }
    const stateKey = keys[0];
    const slice = value[stateKey];
    if (!slice || typeof slice !== 'object' || Array.isArray(slice)) {
      continue;
    }
    for (const deviceId of Object.keys(slice)) {
      const raw = slice[deviceId];
      if (typeof raw !== 'string') {
        continue;
      }
      const {
        model
      } = (0,_declarationForm__WEBPACK_IMPORTED_MODULE_0__.parseDeclarationForm)(raw);
      const ff = String(model.fontFamily || '').trim();
      if (!ff) {
        continue;
      }
      const fam = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_1__.findFamilyForModel)(families, ff);
      if (!fam) {
        fontSlices[stateKey] = fontSlices[stateKey] || {};
        fontSlices[stateKey][deviceId] = {
          source: 'custom',
          slug: '',
          family: ''
        };
        continue;
      }
      fontSlices[stateKey] = fontSlices[stateKey] || {};
      if (fam.isSystem) {
        fontSlices[stateKey][deviceId] = {
          source: 'system',
          slug: fam.slug,
          family: fam.name
        };
      } else {
        fontSlices[stateKey][deviceId] = {
          source: 'google',
          slug: fam.slug,
          family: fam.name
        };
      }
    }
  }
  const nextMeta = {
    ...value._meta
  };
  if (Object.keys(fontSlices).length === 0) {
    delete nextMeta.fontSlices;
  } else {
    nextMeta.fontSlices = fontSlices;
  }
  value._meta = nextMeta;
}

/**
 * @param {Map<string, Set<string>>} acc
 * @param {Record<string, unknown> | null | undefined} value
 */
function mergeGoogleFontAxesInto(acc, value) {
  if (!value || typeof value !== 'object' || !value._meta || !Array.isArray(value._meta.states)) {
    return;
  }
  const fontSlices = value._meta.fontSlices;
  if (!fontSlices || typeof fontSlices !== 'object') {
    return;
  }
  for (const entry of value._meta.states) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const keys = Object.keys(entry);
    if (keys.length !== 1) {
      continue;
    }
    const stateKey = keys[0];
    const slice = value[stateKey];
    if (!slice || typeof slice !== 'object') {
      continue;
    }
    const perDevice = fontSlices[stateKey];
    if (!perDevice || typeof perDevice !== 'object') {
      continue;
    }
    for (const deviceId of Object.keys(perDevice)) {
      const meta = perDevice[deviceId];
      if (!meta || meta.source !== 'google' || !String(meta.family || '').trim()) {
        continue;
      }
      const decl = typeof slice[deviceId] === 'string' ? slice[deviceId] : '';
      const pair = googleAxisPairFromSlice(decl, meta);
      if (!pair) {
        continue;
      }
      const family = String(meta.family).trim();
      if (!acc.has(family)) {
        acc.set(family, new Set());
      }
      acc.get(family).add(pair);
    }
  }
}

/**
 * @param {Iterable<Record<string, unknown>>} values
 * @returns {Map<string, Set<string>>}
 */
function collectMergedGoogleFontAxes(values) {
  const acc = new Map();
  for (const v of values) {
    mergeGoogleFontAxesInto(acc, v);
  }
  return acc;
}

/**
 * @param {Map<string, Set<string>>} merged
 * @returns {string}
 */
function buildGoogleFontsCss2Href(merged) {
  if (!merged || merged.size === 0) {
    return '';
  }
  const families = [...merged.keys()].sort((a, b) => a.localeCompare(b));
  const parts = [];
  for (const name of families) {
    const set = merged.get(name);
    const pairs = [...set].sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    }));
    const enc = encodeURIComponent(name).replace(/%20/g, '+');
    parts.push(`family=${enc}:ital,wght@${pairs.join(';')}`);
  }
  return `https://fonts.googleapis.com/css2?${parts.join('&')}&display=swap`;
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./src/admin/customizer-liveview.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _customizer_styling_styling_preview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customizer/styling/styling-preview */ "./src/admin/customizer/styling/styling-preview.js");
/**
 * customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */


(function ($, api) {
  // Site footer bg
  /*
  wp.customize( 'onepress_footer_bg', function( value ) {
      value.bind( function( to ) {
          $( '.site-footer' ).css( {
              'background': to
          } );
      } );
  } );
  */

  // Site footer info bg
  wp.customize('onepress_footer_info_bg', function (value) {
    value.bind(function (to) {
      $('.site-footer .site-info, .site-footer .btt a').css({
        'background': to
      });
      $('.site-footer .site-info').css({
        color: 'rgba(255, 255, 255, 0.7)'
      });
      $('.site-footer .btt a, .site-footer .site-info a').css({
        color: 'rgba(255, 255, 255, 0.9)'
      });
    });
  });

  /**
   * Handle rendering of partials.
   *
   * @param {api.selectiveRefresh.Placement} placement
   */
  api.selectiveRefresh.bind('partial-content-rendered', function (placement) {
    $(window).resize();
  });

  // Header text color.
  wp.customize('header_textcolor', function (value) {
    value.bind(function (to) {
      if ('blank' === to) {
        $('.site-title a, .site-description').css({
          'clip': 'rect(1px, 1px, 1px, 1px)',
          'position': 'absolute'
        });
      } else {
        $('.site-title a, .site-description').css({
          'clip': 'auto',
          'color': to,
          'position': 'relative'
        });
      }
    });
  });

  // Site footer widgets
  wp.customize('onepress_btt_disable', function (value) {
    value.bind(function (to) {
      if (to === true || to == 'true') {
        $('.site-footer .btt ').hide();
      } else {
        $('.site-footer .btt ').show();
      }
    });
  });
  function update_css() {
    var css_code = $('#onepress-style-inline-css').html();
    // Fix Chrome Lost CSS When resize ??
    $('#onepress-style-inline-css').replaceWith('<style class="replaced-style" id="onepress-style-inline-css">' + css_code + '</style>');
  }

  // When preview ready: settings are registered; styling postMessage needs this (empty CSS after full reload).
  wp.customize.bind('preview-ready', function () {
    update_css();
    (0,_customizer_styling_styling_preview__WEBPACK_IMPORTED_MODULE_0__.bindOnepressStylingPreview)($, api);
  });
  $(window).resize(function () {
    update_css();
  });
  wp.customize.selectiveRefresh.bind('partial-content-rendered', function (settings) {
    if (settings.partial.id == 'onepress-header-section') {
      $(document).trigger('header_view_changed', [settings.partial.id]);
    }
    $(document).trigger('selectiveRefresh-rendered', [settings.partial.id]);
  });
})(jQuery, wp.customize);
})();

/******/ })()
;
//# sourceMappingURL=customizer-liveview.js.map