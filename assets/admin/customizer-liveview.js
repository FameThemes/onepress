/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/customizer/font-manager/font-manager-preview.js"
/*!*******************************************************************!*\
  !*** ./src/admin/customizer/font-manager/font-manager-preview.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindOnepressFontManagerPreview: () => (/* binding */ bindOnepressFontManagerPreview)
/* harmony export */ });
/* harmony import */ var _styling_unifiedCustomizerGoogleFonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styling/unifiedCustomizerGoogleFonts */ "./src/admin/customizer/styling/unifiedCustomizerGoogleFonts.js");
/* harmony import */ var _fontManagerPreviewConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fontManagerPreviewConstants */ "./src/admin/customizer/font-manager/fontManagerPreviewConstants.js");
/**
 * Customizer preview iframe: refresh merged Google Fonts when font manager settings change (see unifiedCustomizerGoogleFonts).
 */



/** @type {boolean} */
let fontManagerPreviewListenersBound = false;

/**
 * @param {JQueryStatic} $ jQuery
 * @param {*} api wp.customize
 * @param {string[]} [settingIds]
 */
function bindOnepressFontManagerPreview($, api, settingIds) {
  const fromWindow = typeof window !== 'undefined' && window.onepressFontManagerPreview && Array.isArray(window.onepressFontManagerPreview.settingIds) && window.onepressFontManagerPreview.settingIds.length ? window.onepressFontManagerPreview.settingIds.map(String) : null;
  const ids = (settingIds && settingIds.length ? settingIds : fromWindow) || ['onepress_font_manager'];
  function paintMerged() {
    (0,_styling_unifiedCustomizerGoogleFonts__WEBPACK_IMPORTED_MODULE_0__.paintMergedCustomizerGoogleFonts)($, api);
  }
  if (!fontManagerPreviewListenersBound) {
    fontManagerPreviewListenersBound = true;
    if (api.preview && typeof api.preview.bind === 'function') {
      api.preview.bind(_fontManagerPreviewConstants__WEBPACK_IMPORTED_MODULE_1__.ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE, data => {
        const sid = typeof data?.settingId === 'string' ? data.settingId.trim() : '';
        if (sid && data?.axesByFamily && typeof data.axesByFamily === 'object') {
          (0,_styling_unifiedCustomizerGoogleFonts__WEBPACK_IMPORTED_MODULE_0__.setLiveFontManagerGoogleAxesFromPlain)(sid, data.axesByFamily);
        }
        paintMerged();
      });
    }
    for (const id of ids) {
      try {
        api(id, value => {
          value.bind(() => {
            (0,_styling_unifiedCustomizerGoogleFonts__WEBPACK_IMPORTED_MODULE_0__.clearLiveFontManagerGoogleAxes)(id);
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

/***/ },

/***/ "./src/admin/customizer/font-manager/fontManagerGoogleCss2.js"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/font-manager/fontManagerGoogleCss2.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fontManagerGoogleItemToCss2Href: () => (/* binding */ fontManagerGoogleItemToCss2Href),
/* harmony export */   googleCss2HrefForFontManagerFamily: () => (/* binding */ googleCss2HrefForFontManagerFamily),
/* harmony export */   isValidFontManagerVariationPair: () => (/* binding */ isValidFontManagerVariationPair),
/* harmony export */   uniqueGoogleFontManagerCss2Hrefs: () => (/* binding */ uniqueGoogleFontManagerCss2Hrefs)
/* harmony export */ });
/**
 * Google Fonts CSS2 URLs for font manager items (mirror PHP onepress_font_manager_google_css2_href).
 */

/** @typedef {import('./fontManagerModel').FontManagerItem} FontManagerItem */

/**
 * @param {string} pair
 * @returns {boolean}
 */
function isValidFontManagerVariationPair(pair) {
  return /^[01],\d{3}$/.test(String(pair || '').trim());
}

/**
 * @param {string} googleDisplayName — API family name (e.g. "Open Sans")
 * @param {string[]} variations — "ital,wght" tokens e.g. "0,400"
 * @returns {string}
 */
function googleCss2HrefForFontManagerFamily(googleDisplayName, variations) {
  const name = String(googleDisplayName || '').trim();
  if (!name) {
    return '';
  }
  const raw = Array.isArray(variations) ? variations : [];
  const pairs = [...new Set(raw.map(p => String(p).trim()).filter(isValidFontManagerVariationPair))].sort();
  const usePairs = pairs.length ? pairs : ['0,400'];
  const enc = encodeURIComponent(name).replace(/%20/g, '+');
  return `https://fonts.googleapis.com/css2?family=${enc}:ital,wght@${usePairs.join(';')}&display=swap`;
}

/**
 * @param {FontManagerItem | null | undefined} item
 * @returns {string}
 */
function fontManagerGoogleItemToCss2Href(item) {
  if (!item || !item.isGoogleFamily) {
    return '';
  }
  const gn = String(item.googleName || '').trim();
  if (!gn) {
    return '';
  }
  return googleCss2HrefForFontManagerFamily(gn, item.variations);
}

/**
 * @param {FontManagerItem[]} items
 * @returns {string[]} unique hrefs
 */
function uniqueGoogleFontManagerCss2Hrefs(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const h = fontManagerGoogleItemToCss2Href(item);
    if (h && !seen.has(h)) {
      seen.add(h);
      out.push(h);
    }
  }
  return out;
}

/***/ },

/***/ "./src/admin/customizer/font-manager/fontManagerModel.js"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/font-manager/fontManagerModel.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultFontManagerValue: () => (/* binding */ defaultFontManagerValue),
/* harmony export */   displayNameForItem: () => (/* binding */ displayNameForItem),
/* harmony export */   emptyFontItem: () => (/* binding */ emptyFontItem),
/* harmony export */   newFontItemId: () => (/* binding */ newFontItemId),
/* harmony export */   normalizeFontManagerItem: () => (/* binding */ normalizeFontManagerItem),
/* harmony export */   normalizeFontManagerValue: () => (/* binding */ normalizeFontManagerValue),
/* harmony export */   parseFontManagerSetting: () => (/* binding */ parseFontManagerSetting)
/* harmony export */ });
/**
 * Font manager JSON: list of font items (mirror PHP onepress_font_manager_*).
 */

/**
 * @typedef {{
 *   id: string,
 *   fontFamily: string,
 *   googleSlug: string,
 *   googleName: string,
 *   isGoogleFamily: boolean,
 *   variations: string[]
 * }} FontManagerItem
 */

/**
 * @typedef {{ _onepressFontManager: true, items: FontManagerItem[] }} FontManagerValue
 */

/**
 * @returns {string}
 */
function newFontItemId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `font-${crypto.randomUUID()}`;
  }
  return `font-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * @returns {FontManagerItem}
 */
function emptyFontItem() {
  return {
    id: newFontItemId(),
    fontFamily: '',
    googleSlug: '',
    googleName: '',
    isGoogleFamily: false,
    variations: []
  };
}

/**
 * @param {unknown} raw
 * @returns {FontManagerItem}
 */
function normalizeFontManagerItem(raw) {
  const base = emptyFontItem();
  if (!raw || typeof raw !== 'object') {
    return base;
  }
  const o = /** @type {Record<string, unknown>} */raw;
  let id = typeof o.id === 'string' ? o.id.trim() : '';
  if (!id) {
    id = newFontItemId();
  }
  const vars = [];
  if (Array.isArray(o.variations)) {
    for (const v of o.variations) {
      const s = typeof v === 'string' ? v.trim() : '';
      if (/^[01],\d{3}$/.test(s)) {
        vars.push(s);
      }
    }
  }
  return {
    id,
    fontFamily: typeof o.fontFamily === 'string' ? o.fontFamily.trim() : '',
    googleSlug: typeof o.googleSlug === 'string' ? o.googleSlug.trim() : '',
    googleName: typeof o.googleName === 'string' ? o.googleName.trim() : '',
    isGoogleFamily: Boolean(o.isGoogleFamily),
    variations: [...new Set(vars)]
  };
}

/**
 * @returns {FontManagerValue}
 */
function defaultFontManagerValue() {
  return {
    _onepressFontManager: true,
    items: []
  };
}

/**
 * Legacy root (single font fields on root) → items[0].
 *
 * @param {Record<string, unknown>} o
 * @returns {FontManagerValue | null}
 */
function migrateLegacyRootToItems(o) {
  const hasLegacy = typeof o.fontFamily === 'string' && o.fontFamily.trim() !== '' || typeof o.googleSlug === 'string' && o.googleSlug.trim() !== '';
  if (!hasLegacy) {
    return null;
  }
  const item = normalizeFontManagerItem({
    ...o,
    id: typeof o.id === 'string' && o.id.trim() ? o.id : 'migrated-1'
  });
  return {
    _onepressFontManager: true,
    items: [item]
  };
}

/**
 * @param {unknown} raw
 * @returns {FontManagerValue}
 */
function normalizeFontManagerValue(raw) {
  const base = defaultFontManagerValue();
  if (!raw || typeof raw !== 'object') {
    return base;
  }
  const o = /** @type {Record<string, unknown>} */raw;
  if (!o._onepressFontManager) {
    return base;
  }
  if (Array.isArray(o.items)) {
    const items = o.items.map(it => normalizeFontManagerItem(it));
    return {
      _onepressFontManager: true,
      items
    };
  }
  const migrated = migrateLegacyRootToItems(o);
  if (migrated) {
    return migrated;
  }
  return base;
}

/**
 * @param {unknown} raw
 * @returns {FontManagerValue}
 */
function parseFontManagerSetting(raw) {
  if (typeof raw === 'string' && raw.trim() !== '') {
    try {
      return normalizeFontManagerValue(JSON.parse(raw));
    } catch {
      return defaultFontManagerValue();
    }
  }
  if (raw && typeof raw === 'object') {
    return normalizeFontManagerValue(raw);
  }
  return defaultFontManagerValue();
}

/**
 * @param {FontManagerItem} item
 * @returns {string}
 */
function displayNameForItem(item) {
  if (item.googleName) {
    return item.googleName;
  }
  const ff = item.fontFamily.trim();
  if (ff) {
    const first = ff.split(',')[0].trim().replace(/^["']|["']$/g, '');
    return first || ff;
  }
  return '';
}

/***/ },

/***/ "./src/admin/customizer/font-manager/fontManagerPreviewConstants.js"
/*!**************************************************************************!*\
  !*** ./src/admin/customizer/font-manager/fontManagerPreviewConstants.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE: () => (/* binding */ ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE)
/* harmony export */ });
/** Message channel: controls pane → preview iframe (Google font link hrefs). */
const ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE = 'onepress-font-manager-preview-fonts';

/***/ },

/***/ "./src/admin/customizer/styling/buildStylingCss.js"
/*!*********************************************************!*\
  !*** ./src/admin/customizer/styling/buildStylingCss.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_BPS: () => (/* binding */ DEFAULT_BPS),
/* harmony export */   buildStylingCss: () => (/* binding */ buildStylingCss),
/* harmony export */   composeStylingFullSelector: () => (/* binding */ composeStylingFullSelector),
/* harmony export */   resolveStateOutputSelector: () => (/* binding */ resolveStateOutputSelector)
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
 * Split top-level selector list on commas (skip commas inside `()` / `[]`).
 *
 * @param {string} sel
 * @returns {string[]}
 */
function splitSelectorList(sel) {
  const s = typeof sel === 'string' ? sel.trim() : '';
  if (!s) {
    return [];
  }
  const parts = [];
  let depth = 0;
  let bracket = 0;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(') {
      depth++;
    } else if (c === ')') {
      depth--;
    } else if (c === '[') {
      bracket++;
    } else if (c === ']') {
      bracket--;
    } else if (c === ',' && depth === 0 && bracket === 0) {
      const chunk = s.slice(start, i).trim();
      if (chunk) {
        parts.push(chunk);
      }
      start = i + 1;
    }
  }
  const chunk = s.slice(start).trim();
  if (chunk) {
    parts.push(chunk);
  }
  return parts;
}

/**
 * Full selector for output CSS: _meta.baseSelector + per-state suffix.
 * Legacy: when base is empty, state selector is the full selector.
 * Comma-separated base: suffix is appended to each branch
 * (e.g. `.a .b, .c .d` + `:hover` → `.a .b:hover, .c .d:hover`).
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
  const list = splitSelectorList(base);
  if (list.length <= 1) {
    return `${base}${suffix}`;
  }
  return list.map(p => `${p}${suffix}`).join(', ');
}

/**
 * When `conf.force_selector` is non-empty, use it alone (ignores base + `conf.selector` for output).
 *
 * @param {string} baseMeta
 * @param {Record<string, unknown> | null | undefined} conf
 * @returns {string}
 */
function resolveStateOutputSelector(baseMeta, conf) {
  const force = stripSelector(conf && conf.force_selector != null ? String(conf.force_selector) : '').trim();
  if (force !== '') {
    return force;
  }
  const suffix = stripSelector(conf && conf.selector != null ? String(conf.selector) : '');
  return composeStylingFullSelector(baseMeta, suffix);
}

/**
 * @param {Record<string, unknown>} value
 * @param {typeof DEFAULT_BPS} breakpoints
 */
function buildStylingCss(value, breakpoints = DEFAULT_BPS) {
  if (!value || typeof value !== 'object') {
    return '';
  }
  if (Array.isArray(value.items) && value.items.length) {
    return value.items.map(item => buildStylingCss(item, breakpoints)).filter(Boolean).join('\n').trim();
  }
  if (!value._meta || !Array.isArray(value._meta.states)) {
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
    const selector = resolveStateOutputSelector(baseMeta, conf && typeof conf === 'object' ? conf : {});
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
/* harmony import */ var _unifiedCustomizerGoogleFonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unifiedCustomizerGoogleFonts */ "./src/admin/customizer/styling/unifiedCustomizerGoogleFonts.js");
/* harmony import */ var _stylingSelectorPickPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stylingSelectorPickPreview */ "./src/admin/customizer/styling/stylingSelectorPickPreview.js");
/**
 * Customizer preview iframe: apply styling theme_mods as <style> tags + one merged Google Fonts stylesheet.
 */




/** Fallback when `onepressStylingPreview.settingIds` is missing — keep in sync with `onepress_styling_default_theme_mod_setting_ids()` (PHP). */
const DEFAULT_SETTING_IDS = ['onepress_styling_body', 'onepress_styling_h1', 'onepress_styling_h2', 'onepress_styling_h3', 'onepress_styling_h4', 'onepress_styling_h5', 'onepress_styling_h6', 'onepress_styling_nav', 'onepress_styling_branding', 'onepress_styling_tagline', 'onepress_element_styling', 'onepress_element_styling_single', 'onepress_element_styling_fixed_states'];
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
    (0,_unifiedCustomizerGoogleFonts__WEBPACK_IMPORTED_MODULE_1__.paintMergedCustomizerGoogleFonts)($, api);
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
  (0,_stylingSelectorPickPreview__WEBPACK_IMPORTED_MODULE_2__.bindStylingSelectorPickPreview)(api);
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
/* harmony export */   collectGoogleFontAxesFromFontManagerItems: () => (/* binding */ collectGoogleFontAxesFromFontManagerItems),
/* harmony export */   collectGoogleFontAxesFromFontManagerSettingRaw: () => (/* binding */ collectGoogleFontAxesFromFontManagerSettingRaw),
/* harmony export */   collectMergedGoogleFontAxes: () => (/* binding */ collectMergedGoogleFontAxes),
/* harmony export */   collectMergedGoogleFontAxesFromFontManagerSettings: () => (/* binding */ collectMergedGoogleFontAxesFromFontManagerSettings),
/* harmony export */   fontManagerItemsToGoogleAxesPlainObject: () => (/* binding */ fontManagerItemsToGoogleAxesPlainObject),
/* harmony export */   googleAxisPairFromSlice: () => (/* binding */ googleAxisPairFromSlice),
/* harmony export */   mergeGoogleFontAxesFontManagerPriority: () => (/* binding */ mergeGoogleFontAxesFontManagerPriority),
/* harmony export */   mergeGoogleFontAxesInto: () => (/* binding */ mergeGoogleFontAxesInto),
/* harmony export */   normalizeFontWeightForGoogle: () => (/* binding */ normalizeFontWeightForGoogle),
/* harmony export */   normalizeItalForGoogle: () => (/* binding */ normalizeItalForGoogle),
/* harmony export */   rebuildFontSlicesInValue: () => (/* binding */ rebuildFontSlicesInValue)
/* harmony export */ });
/* harmony import */ var _declarationForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarationForm */ "./src/admin/customizer/styling/declarationForm.js");
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");
/* harmony import */ var _font_manager_fontManagerModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../font-manager/fontManagerModel */ "./src/admin/customizer/font-manager/fontManagerModel.js");
/* harmony import */ var _font_manager_fontManagerGoogleCss2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../font-manager/fontManagerGoogleCss2 */ "./src/admin/customizer/font-manager/fontManagerGoogleCss2.js");
/**
 * _meta.fontSlices + merged Google Fonts CSS2 URLs (preview + PHP mirror).
 * Font manager families override styling axis sets for the same Google display name.
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
  if (!value || typeof value !== 'object') {
    return;
  }
  if (Array.isArray(value.items) && value.items.length) {
    for (const item of value.items) {
      rebuildFontSlicesInValue(item, families);
    }
    return;
  }
  if (!value._meta || !Array.isArray(value._meta.states)) {
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
  if (!value || typeof value !== 'object') {
    return;
  }
  if (Array.isArray(value.items) && value.items.length) {
    for (const item of value.items) {
      mergeGoogleFontAxesInto(acc, item);
    }
    return;
  }
  if (!value._meta || !Array.isArray(value._meta.states)) {
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
 * @param {unknown[]} items Font manager `items` rows
 * @returns {Map<string, Set<string>>}
 */
function collectGoogleFontAxesFromFontManagerItems(items) {
  const acc = new Map();
  if (!Array.isArray(items)) {
    return acc;
  }
  for (const row of items) {
    const item = (0,_font_manager_fontManagerModel__WEBPACK_IMPORTED_MODULE_2__.normalizeFontManagerItem)(row);
    if (!item.isGoogleFamily) {
      continue;
    }
    const fam = String(item.googleName || '').trim();
    if (!fam) {
      continue;
    }
    const rawVars = Array.isArray(item.variations) ? item.variations : [];
    const vars = rawVars.map(p => String(p).trim()).filter(_font_manager_fontManagerGoogleCss2__WEBPACK_IMPORTED_MODULE_3__.isValidFontManagerVariationPair);
    const useVars = vars.length ? vars : ['0,400'];
    if (!acc.has(fam)) {
      acc.set(fam, new Set());
    }
    const set = acc.get(fam);
    for (const v of useVars) {
      set.add(v);
    }
  }
  return acc;
}

/**
 * Google display name → axis pairs from font manager JSON (all registered items).
 *
 * @param {unknown} raw theme_mod get() string or object
 * @returns {Map<string, Set<string>>}
 */
function collectGoogleFontAxesFromFontManagerSettingRaw(raw) {
  const parsed = (0,_font_manager_fontManagerModel__WEBPACK_IMPORTED_MODULE_2__.parseFontManagerSetting)(raw);
  return collectGoogleFontAxesFromFontManagerItems(parsed?.items || []);
}

/**
 * Plain object for postMessage (family → axis pairs).
 *
 * @param {unknown[]} items
 * @returns {Record<string, string[]>}
 */
function fontManagerItemsToGoogleAxesPlainObject(items) {
  const map = collectGoogleFontAxesFromFontManagerItems(items);
  /** @type {Record<string, string[]>} */
  const o = {};
  for (const [fam, set] of map) {
    o[fam] = [...set].sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true
    }));
  }
  return o;
}

/**
 * Merge axes from several font manager theme_mods (union per family).
 *
 * @param {*} api wp.customize
 * @param {string[]} fontManagerSettingIds
 * @returns {Map<string, Set<string>>}
 */
/**
 * @param {Map<string, Set<string>>} into
 * @param {Map<string, Set<string>>} partial
 */
function mergeGoogleAxesMaps(into, partial) {
  for (const [fam, set] of partial) {
    if (!into.has(fam)) {
      into.set(fam, new Set());
    }
    const target = into.get(fam);
    for (const p of set) {
      target.add(p);
    }
  }
}

/**
 * @param {*} api wp.customize
 * @param {string[]} fontManagerSettingIds
 * @param {Record<string, Map<string, Set<string>>> | null | undefined} liveBySetting — optional unsaved draft axes per setting id
 */
function collectMergedGoogleFontAxesFromFontManagerSettings(api, fontManagerSettingIds, liveBySetting) {
  const merged = new Map();
  for (const id of fontManagerSettingIds) {
    const live = liveBySetting && liveBySetting[id];
    if (live && live.size) {
      mergeGoogleAxesMaps(merged, live);
      continue;
    }
    try {
      const v = api(id);
      if (!v || typeof v.get !== 'function') {
        continue;
      }
      const partial = collectGoogleFontAxesFromFontManagerSettingRaw(v.get());
      mergeGoogleAxesMaps(merged, partial);
    } catch {
      continue;
    }
  }
  return merged;
}

/**
 * Styling-derived axes first; for every family in fontManagerMap, replace with font manager’s full variant set.
 *
 * @param {Map<string, Set<string>>} stylingMap
 * @param {Map<string, Set<string>>} fontManagerMap
 * @returns {Map<string, Set<string>>}
 */
function mergeGoogleFontAxesFontManagerPriority(stylingMap, fontManagerMap) {
  const out = new Map(stylingMap);
  for (const [fam, set] of fontManagerMap) {
    out.set(fam, new Set(set));
  }
  return out;
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

/***/ },

/***/ "./src/admin/customizer/styling/stylingSelectorPickPreview.js"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/styling/stylingSelectorPickPreview.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindStylingSelectorPickPreview: () => (/* binding */ bindStylingSelectorPickPreview)
/* harmony export */ });
/**
 * Customizer preview iframe: pick an element to fill the styling base CSS selector.
 * Driven by the controls pane via wp.customize.previewer.send / preview.bind.
 */

const HL_ID = 'onepress-styling-selector-pick-highlight';
const CROSSHAIR_H_ID = 'onepress-styling-selector-pick-crosshair-h';
const CROSSHAIR_V_ID = 'onepress-styling-selector-pick-crosshair-v';
const COORDS_ID = 'onepress-styling-selector-pick-coords';

/** Modern violet (Tailwind violet-600) + soft glow */
const CROSSHAIR_LINE = '#ed09a1';
const CROSSHAIR_GLOW = '0 0 8px rgba(124, 58, 237, 0.55), 0 0 2px rgba(124, 58, 237, 0.9)';
const CROSSHAIR_Z = '2147483645';
const LINE_PX = 2;

/** @type {boolean} */
let pickListenersBound = false;

/** @type {{ controlId: string, itemIndex: number|null } | null} */
let session = null;

/** @type {HTMLDivElement | null} */
let highlightEl = null;

/** @type {HTMLDivElement | null} */
let crosshairHEl = null;

/** @type {HTMLDivElement | null} */
let crosshairVEl = null;

/** @type {HTMLDivElement | null} */
let coordsEl = null;

/**
 * @param {string} str
 * @returns {string}
 */
function cssEscape(str) {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(String(str));
  }
  return String(str).replace(/([^\w-])/g, '\\$1');
}

/**
 * @param {Element | null} el
 * @returns {boolean}
 */
function ignorableEl(el) {
  if (!el || el.nodeType !== 1) {
    return true;
  }
  const tag = el.tagName;
  if (tag === 'HTML' || tag === 'BODY') {
    return true;
  }
  if (el.id === 'wpadminbar' || el.closest('#wpadminbar')) {
    return true;
  }
  if (el.closest('.customize-partial-edit-shortcuts')) {
    return true;
  }
  if (el.id === HL_ID || el.closest(`#${HL_ID}`)) {
    return true;
  }
  if (el.id === COORDS_ID || el.closest(`#${COORDS_ID}`)) {
    return true;
  }
  return false;
}

/**
 * @param {Element} el
 * @returns {string[]}
 */
function meaningfulClasses(el) {
  if (!el.className || typeof el.className !== 'string') {
    return [];
  }
  return el.className.trim().split(/\s+/).filter(c => c && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(c) && !/^wp-/.test(c) && !/^is-/.test(c) && !/^has-/.test(c) && !/^js-/.test(c));
}

/**
 * @param {string} sel
 * @param {Element} el
 * @returns {boolean}
 */
function selectorTargetsOnly(sel, el) {
  try {
    const nodes = document.querySelectorAll(sel);
    return nodes.length === 1 && nodes[0] === el;
  } catch {
    return false;
  }
}

/** Max descendant levels (space-separated segments) in the suggested selector. */
const SELECTOR_MAX_DEPTH = 5;

/** Min levels when enough ancestors exist — improves specificity so picked rules override theme defaults. */
const SELECTOR_MIN_DEPTH = 3;

/** Max simple selectors per segment (`#id` + `.a` = 2; `.a.b` = 2). */
const SEGMENT_MAX_SIMPLE_SELECTORS = 2;

/**
 * Bootstrap / grid utility classes omitted from path segments (still ok on `#id` targets).
 *
 * @param {string} c
 * @returns {boolean}
 */
function isBootstrapLayoutClass(c) {
  if (/^(container|container-fluid|row)$/.test(c)) {
    return true;
  }
  if (/^col-([a-z]+-)*\d+$/.test(c)) {
    return true;
  }
  if (/^col-\d+$/.test(c)) {
    return true;
  }
  return false;
}

/**
 * Classes used for path segments: meaningful, minus layout grid noise.
 *
 * @param {Element} el
 * @returns {string[]}
 */
function semanticClasses(el) {
  return meaningfulClasses(el).filter(c => !isBootstrapLayoutClass(c));
}

/**
 * One path segment: never `tag.class`, never `:pseudo`. Prefer `#id.class` when id exists.
 * At most {@link SEGMENT_MAX_SIMPLE_SELECTORS} simple selectors per segment (e.g. `#features.section-features`, not `#features.a.b.c`).
 *
 * @param {Element} el
 * @param {{ isTarget?: boolean }} [opts] — target may fall back to any meaningful class if only grid classes.
 * @returns {string}
 */
function segmentForElement(el, opts = {}) {
  const idOk = el.id && /^[a-zA-Z][\w-]*$/.test(el.id);
  let classes = semanticClasses(el);
  if (opts.isTarget && classes.length === 0) {
    classes = meaningfulClasses(el);
  }
  const maxCls = idOk ? Math.max(0, SEGMENT_MAX_SIMPLE_SELECTORS - 1) : SEGMENT_MAX_SIMPLE_SELECTORS;
  const clsPart = classes.slice(0, maxCls).map(cssEscape);
  if (idOk) {
    const idSel = `#${cssEscape(el.id)}`;
    if (clsPart.length) {
      return `${idSel}.${clsPart.join('.')}`;
    }
    return idSel;
  }
  if (clsPart.length) {
    return `.${clsPart.join('.')}`;
  }
  return '';
}

/**
 * @param {Element} el
 * @param {boolean} isTarget
 * @returns {boolean}
 */
function contributesToPath(el, isTarget) {
  if (ignorableEl(el)) {
    return false;
  }
  if (el.id && /^[a-zA-Z][\w-]*$/.test(el.id)) {
    return true;
  }
  if (isTarget) {
    return meaningfulClasses(el).length > 0;
  }
  return semanticClasses(el).length > 0;
}

/**
 * From target up to body: list of elements that get a segment (target … outer).
 *
 * @param {Element} el
 * @returns {Element[]}
 */
function collectPathElements(el) {
  /** @type {Element[]} */
  const innerToOuter = [];
  let node = el;
  let hop = 0;
  const maxHop = 40;
  while (node && node !== document.body && hop < maxHop) {
    const isTarget = node === el;
    if (contributesToPath(node, isTarget)) {
      innerToOuter.push(node);
    }
    node = node.parentElement;
    hop++;
  }
  return innerToOuter;
}

/**
 * @param {string[]} segmentsOuterToInner
 * @param {Element} el
 * @returns {string[]}
 */
function pruneMiddleSegments(segmentsOuterToInner, el) {
  let segs = segmentsOuterToInner;
  if (segs.length <= SELECTOR_MIN_DEPTH) {
    return segs;
  }
  let changed = true;
  while (changed && segs.length > SELECTOR_MIN_DEPTH) {
    changed = false;
    for (let i = 1; i < segs.length - 1; i++) {
      const next = [...segs.slice(0, i), ...segs.slice(i + 1)];
      const cand = next.join(' ');
      if (selectorTargetsOnly(cand, el)) {
        segs = next;
        changed = true;
        break;
      }
    }
  }
  return segs;
}

/**
 * Short descendant path: only `.class` / `#id.class`, no `>`, no `:pseudo`,
 * between {@link SELECTOR_MIN_DEPTH} and {@link SELECTOR_MAX_DEPTH} levels when possible.
 *
 * @param {Element} el
 * @returns {string}
 */
function shortestUniqueSelector(el) {
  const innerToOuter = collectPathElements(el);
  if (innerToOuter.length === 0) {
    return el.tagName.toLowerCase();
  }
  /** @type {string[]} outer → inner */
  const fullOuterToInner = [];
  for (let i = innerToOuter.length - 1; i >= 0; i--) {
    const node = innerToOuter[i];
    const seg = segmentForElement(node, {
      isTarget: node === el
    });
    if (seg) {
      fullOuterToInner.push(seg);
    }
  }
  if (fullOuterToInner.length === 0) {
    return el.tagName.toLowerCase();
  }
  const n = fullOuterToInner.length;
  const maxK = Math.min(SELECTOR_MAX_DEPTH, n);
  const startK = n >= SELECTOR_MIN_DEPTH ? SELECTOR_MIN_DEPTH : 1;
  for (let k = startK; k <= maxK; k++) {
    const slice = fullOuterToInner.slice(-k);
    const cand = slice.join(' ');
    if (selectorTargetsOnly(cand, el)) {
      return pruneMiddleSegments(slice, el).join(' ');
    }
  }
  for (let k = 1; k < startK; k++) {
    const slice = fullOuterToInner.slice(-k);
    const cand = slice.join(' ');
    if (selectorTargetsOnly(cand, el)) {
      return pruneMiddleSegments(slice, el).join(' ');
    }
  }
  const fallbackSlice = fullOuterToInner.slice(-maxK);
  return pruneMiddleSegments(fallbackSlice, el).join(' ');
}

/**
 * @param {Element} el
 * @returns {string}
 */
function uniqueSelectorFor(el) {
  return shortestUniqueSelector(el);
}

/**
 * @param {string} id
 * @param {HTMLDivElement} keep
 */
function removeDuplicateDivId(id, keep) {
  document.querySelectorAll(`div[id="${id}"]`).forEach(el => {
    if (el !== keep) {
      el.remove();
    }
  });
}

/**
 * @param {HTMLDivElement} keep
 */
function removeDuplicateHighlights(keep) {
  removeDuplicateDivId(HL_ID, keep);
}
function ensureHighlight() {
  const root = document.documentElement;
  if (highlightEl && root.contains(highlightEl)) {
    removeDuplicateHighlights(highlightEl);
    return highlightEl;
  }
  const existing = document.getElementById(HL_ID);
  if (existing instanceof HTMLDivElement) {
    highlightEl = existing;
    removeDuplicateHighlights(existing);
    return existing;
  }
  const div = document.createElement('div');
  div.id = HL_ID;
  Object.assign(div.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '2147483646',
    border: '2px solid #d63638',
    backgroundColor: 'rgba(214, 54, 56, 0.15)',
    boxSizing: 'border-box',
    borderRadius: '2px',
    display: 'none',
    left: '0',
    top: '0',
    width: '0',
    height: '0'
  });
  root.appendChild(div);
  highlightEl = div;
  return div;
}

/**
 * @param {string} id
 * @param {HTMLDivElement | null} ref
 * @returns {HTMLDivElement}
 */
function ensureCrosshairLine(id, ref) {
  const root = document.documentElement;
  if (ref && root.contains(ref)) {
    removeDuplicateDivId(id, ref);
    return ref;
  }
  const existing = document.getElementById(id);
  if (existing instanceof HTMLDivElement) {
    removeDuplicateDivId(id, existing);
    return existing;
  }
  const div = document.createElement('div');
  div.id = id;
  Object.assign(div.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: CROSSHAIR_Z,
    display: 'none',
    backgroundColor: CROSSHAIR_LINE
    // boxShadow: CROSSHAIR_GLOW,
  });
  root.appendChild(div);
  return div;
}
function ensureCrosshairH() {
  crosshairHEl = ensureCrosshairLine(CROSSHAIR_H_ID, crosshairHEl);
  return crosshairHEl;
}
function ensureCrosshairV() {
  crosshairVEl = ensureCrosshairLine(CROSSHAIR_V_ID, crosshairVEl);
  return crosshairVEl;
}

/**
 * @param {number} clientX
 * @param {number} clientY
 */
function positionCrosshairs(clientX, clientY) {
  const half = LINE_PX / 2;
  const h = ensureCrosshairH();
  const v = ensureCrosshairV();
  h.style.display = 'block';
  h.style.left = '0';
  h.style.top = `${clientY - half}px`;
  h.style.width = '100vw';
  h.style.height = `${LINE_PX}px`;
  v.style.display = 'block';
  v.style.left = `${clientX - half}px`;
  v.style.top = '0';
  v.style.width = `${LINE_PX}px`;
  v.style.height = '100vh';
}
function hideCrosshairs() {
  if (crosshairHEl) {
    crosshairHEl.style.display = 'none';
  }
  if (crosshairVEl) {
    crosshairVEl.style.display = 'none';
  }
}
function ensureCoordsLabel() {
  const root = document.documentElement;
  if (coordsEl && root.contains(coordsEl)) {
    removeDuplicateDivId(COORDS_ID, coordsEl);
    return coordsEl;
  }
  const existing = document.getElementById(COORDS_ID);
  if (existing instanceof HTMLDivElement) {
    coordsEl = existing;
    removeDuplicateDivId(COORDS_ID, existing);
    return existing;
  }
  const div = document.createElement('div');
  div.id = COORDS_ID;
  div.setAttribute('aria-hidden', 'true');
  Object.assign(div.style, {
    position: 'fixed',
    left: '8px',
    top: '8px',
    pointerEvents: 'none',
    zIndex: CROSSHAIR_Z,
    display: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '11px',
    lineHeight: '1.45',
    fontVariantNumeric: 'tabular-nums',
    color: '#ede9fe',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(124, 58, 237, 0.45)',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
    whiteSpace: 'nowrap'
  });
  root.appendChild(div);
  coordsEl = div;
  return div;
}

/**
 * @param {number} clientX
 * @param {number} clientY
 */
function updateCoordsOverlay(clientX, clientY) {
  var _ref, _window$scrollX, _ref2, _window$scrollY;
  const el = ensureCoordsLabel();
  const sx = (_ref = (_window$scrollX = window.scrollX) !== null && _window$scrollX !== void 0 ? _window$scrollX : window.pageXOffset) !== null && _ref !== void 0 ? _ref : 0;
  const sy = (_ref2 = (_window$scrollY = window.scrollY) !== null && _window$scrollY !== void 0 ? _window$scrollY : window.pageYOffset) !== null && _ref2 !== void 0 ? _ref2 : 0;
  const pageX = Math.round(clientX + sx);
  const pageY = Math.round(clientY + sy);
  el.textContent = `${pageX}/${pageY}`;
  el.style.display = 'block';
}
function hideCoordsOverlay() {
  if (coordsEl) {
    coordsEl.style.display = 'none';
  }
}

/**
 * @param {number} clientX
 * @param {number} clientY
 */
function updatePointerHud(clientX, clientY) {
  positionCrosshairs(clientX, clientY);
  updateCoordsOverlay(clientX, clientY);
}

/**
 * @param {HTMLElement | null} target
 */
function positionHighlight(target) {
  const box = ensureHighlight();
  if (!target || ignorableEl(target)) {
    box.style.display = 'none';
    return;
  }
  const r = target.getBoundingClientRect();
  box.style.display = 'block';
  box.style.left = `${r.left}px`;
  box.style.top = `${r.top}px`;
  box.style.width = `${r.width}px`;
  box.style.height = `${r.height}px`;
}

/**
 * @param {*} [api]
 * @param {{ skipNotify?: boolean }} [options]
 */
function teardown(api, options = {}) {
  if (!session) {
    return;
  }
  const ended = session;
  session = null;
  document.body.style.cursor = '';
  window.removeEventListener('mousemove', onMouseMove, true);
  window.removeEventListener('mousedown', onMouseDown, true);
  window.removeEventListener('click', onClick, true);
  window.removeEventListener('keydown', onKeyDown, true);
  if (highlightEl) {
    highlightEl.style.display = 'none';
  }
  hideCrosshairs();
  hideCoordsOverlay();
  if (!options.skipNotify && api && api.preview && typeof api.preview.send === 'function') {
    api.preview.send('onepress-styling-pick-ended', {
      controlId: ended.controlId
    });
  }
}

/**
 * @param {MouseEvent} e
 */
function onMouseMove(e) {
  if (!session) {
    return;
  }
  updatePointerHud(e.clientX, e.clientY);
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el || !(el instanceof HTMLElement)) {
    positionHighlight(null);
    return;
  }
  if (ignorableEl(el)) {
    positionHighlight(null);
    return;
  }
  positionHighlight(el);
}

/**
 * @param {MouseEvent} e
 */
function onMouseDown(e) {
  if (!session) {
    return;
  }
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el || ignorableEl(el)) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
}

/**
 * @param {MouseEvent} e
 */
function onClick(e) {
  if (!session) {
    return;
  }
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el || ignorableEl(el) || !(el instanceof Element)) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  const selector = uniqueSelectorFor(el);
  const {
    controlId,
    itemIndex
  } = session;
  const api = /** @type {*} */window.wp?.customize;
  teardown(api, {
    skipNotify: true
  });
  if (api && api.preview && typeof api.preview.send === 'function') {
    api.preview.send('onepress-styling-picked', {
      controlId,
      itemIndex,
      selector
    });
  }
}

/**
 * @param {KeyboardEvent} e
 */
function onKeyDown(e) {
  if (!session) {
    return;
  }
  if (e.key === 'Escape' || e.keyCode === 27) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === 'function') {
      e.stopImmediatePropagation();
    }
    const api = /** @type {*} */window.wp?.customize;
    teardown(api);
  }
}

/**
 * @param {*} api wp.customize (preview frame)
 * @param {{ controlId: string, itemIndex: number|null|undefined }} data — use `itemIndex: -1` for pending-add draft (Customizer pane).
 */
function startSession(api, data) {
  var _data$itemIndex;
  if (session) {
    teardown(api);
  }
  session = {
    controlId: data.controlId,
    itemIndex: (_data$itemIndex = data.itemIndex) !== null && _data$itemIndex !== void 0 ? _data$itemIndex : null
  };
  document.body.style.cursor = 'crosshair';
  ensureHighlight();
  updatePointerHud(Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2));
  window.addEventListener('mousemove', onMouseMove, true);
  window.addEventListener('mousedown', onMouseDown, true);
  window.addEventListener('click', onClick, true);
  window.addEventListener('keydown', onKeyDown, true);
}

/**
 * @param {*} api wp.customize in the preview iframe
 */
function bindStylingSelectorPickPreview(api) {
  if (!api || !api.preview || typeof api.preview.bind !== 'function') {
    return;
  }
  if (pickListenersBound) {
    return;
  }
  pickListenersBound = true;
  const orphan = document.getElementById(HL_ID);
  if (orphan instanceof HTMLDivElement) {
    highlightEl = orphan;
    removeDuplicateHighlights(orphan);
  }
  const orphanH = document.getElementById(CROSSHAIR_H_ID);
  if (orphanH instanceof HTMLDivElement) {
    crosshairHEl = orphanH;
    removeDuplicateDivId(CROSSHAIR_H_ID, orphanH);
  }
  const orphanV = document.getElementById(CROSSHAIR_V_ID);
  if (orphanV instanceof HTMLDivElement) {
    crosshairVEl = orphanV;
    removeDuplicateDivId(CROSSHAIR_V_ID, orphanV);
  }
  const orphanCoords = document.getElementById(COORDS_ID);
  if (orphanCoords instanceof HTMLDivElement) {
    coordsEl = orphanCoords;
    removeDuplicateDivId(COORDS_ID, orphanCoords);
  }
  api.preview.bind('onepress-styling-start-pick', data => {
    if (!data || !data.controlId) {
      return;
    }
    startSession(api, {
      controlId: String(data.controlId),
      itemIndex: data.itemIndex != null ? Number(data.itemIndex) : null
    });
  });
  api.preview.bind('onepress-styling-cancel-pick', () => {
    teardown(api);
  });
}

/***/ },

/***/ "./src/admin/customizer/styling/unifiedCustomizerGoogleFonts.js"
/*!**********************************************************************!*\
  !*** ./src/admin/customizer/styling/unifiedCustomizerGoogleFonts.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID: () => (/* binding */ ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID),
/* harmony export */   clearLiveFontManagerGoogleAxes: () => (/* binding */ clearLiveFontManagerGoogleAxes),
/* harmony export */   paintMergedCustomizerGoogleFonts: () => (/* binding */ paintMergedCustomizerGoogleFonts),
/* harmony export */   setLiveFontManagerGoogleAxesFromPlain: () => (/* binding */ setLiveFontManagerGoogleAxesFromPlain)
/* harmony export */ });
/* harmony import */ var _font_manager_fontManagerGoogleCss2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../font-manager/fontManagerGoogleCss2 */ "./src/admin/customizer/font-manager/fontManagerGoogleCss2.js");
/* harmony import */ var _stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylingGoogleFonts */ "./src/admin/customizer/styling/stylingGoogleFonts.js");
/**
 * Customizer preview: one merged Google Fonts CSS2 link from styling theme_mods + font manager (FM wins per family).
 */



/** Single preview link; replaces legacy styling-only + per-family font-manager links. */
const ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID = 'onepress-merged-google-fonts-preview';

/** Unsaved font manager draft in controls: setting id → family → axis pairs */
const liveFontManagerGoogleAxesBySettingId = /** @type {Record<string, Map<string, Set<string>>>} */{};

/**
 * @param {string} settingId
 * @param {Record<string, unknown>} plain — family → string[]
 */
function setLiveFontManagerGoogleAxesFromPlain(settingId, plain) {
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
    const set = new Set(arr.map(x => String(x).trim()).filter(_font_manager_fontManagerGoogleCss2__WEBPACK_IMPORTED_MODULE_0__.isValidFontManagerVariationPair));
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
function clearLiveFontManagerGoogleAxes(settingId) {
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
const DEFAULT_STYLING_SETTING_IDS = ['onepress_styling_body', 'onepress_styling_h1', 'onepress_styling_h2', 'onepress_styling_h3', 'onepress_styling_h4', 'onepress_styling_h5', 'onepress_styling_h6', 'onepress_styling_nav', 'onepress_styling_branding', 'onepress_styling_tagline', 'onepress_element_styling', 'onepress_element_styling_single', 'onepress_element_styling_fixed_states'];

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
      return /** @type {Record<string, unknown>} */raw;
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
function paintMergedCustomizerGoogleFonts($, api) {
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
  const stylingMap = (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__.collectMergedGoogleFontAxes)(stylingValues);
  const fontManagerMap = (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__.collectMergedGoogleFontAxesFromFontManagerSettings)(api, fmIds, getLiveFontManagerMap());
  const merged = (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__.mergeGoogleFontAxesFontManagerPriority)(stylingMap, fontManagerMap);
  const href = (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_1__.buildGoogleFontsCss2Href)(merged);
  $(`#${LEGACY_STYLING_LINK_ID}`).remove();
  $(`#${LEGACY_FM_WRAP_ID}`).remove();
  let $link = $(`#${ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID}`);
  if (!href) {
    $link.remove();
    return;
  }
  if (!$link.length) {
    $link = $('<link rel="stylesheet" />').attr('id', ONEPRESS_MERGED_GOOGLE_FONTS_PREVIEW_LINK_ID).attr('crossorigin', 'anonymous').appendTo('head');
  }
  $link.attr('href', href);
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
/* harmony import */ var _customizer_font_manager_font_manager_preview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customizer/font-manager/font-manager-preview */ "./src/admin/customizer/font-manager/font-manager-preview.js");
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
    (0,_customizer_font_manager_font_manager_preview__WEBPACK_IMPORTED_MODULE_1__.bindOnepressFontManagerPreview)($, api);
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