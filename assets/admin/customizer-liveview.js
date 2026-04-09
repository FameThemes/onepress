/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/customizer/background/buildBackgroundCss.js":
/*!***************************************************************!*\
  !*** ./src/admin/customizer/background/buildBackgroundCss.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_BACKGROUND_COLOR: () => (/* binding */ DEFAULT_BACKGROUND_COLOR),
/* harmony export */   DEFAULT_BACKGROUND_GRADIENT: () => (/* binding */ DEFAULT_BACKGROUND_GRADIENT),
/* harmony export */   STATE_PSEUDO: () => (/* binding */ STATE_PSEUDO),
/* harmony export */   backgroundStyleElementId: () => (/* binding */ backgroundStyleElementId),
/* harmony export */   buildBackgroundCss: () => (/* binding */ buildBackgroundCss),
/* harmony export */   buildStateSelector: () => (/* binding */ buildStateSelector),
/* harmony export */   createDefaultLayer: () => (/* binding */ createDefaultLayer),
/* harmony export */   declarationsToReactStyle: () => (/* binding */ declarationsToReactStyle),
/* harmony export */   layerToDeclarations: () => (/* binding */ layerToDeclarations),
/* harmony export */   ruleBlock: () => (/* binding */ ruleBlock)
/* harmony export */ });
/**
 * Build CSS for OnePress background Customizer control.
 * Logic must stay in sync with inc/background/helper.php (onepress_background_build_css).
 */

/** Default gradient when the user opens the Gradient tab (must match BackgroundLayerEditor UI). */
const DEFAULT_BACKGROUND_GRADIENT = 'linear-gradient(135deg, rgba(6,147,227,1) 0%, rgb(155,81,224) 100%)';

/** Default solid when the user opens the Color tab with no stored color (matches ColorPicker fallback). */
const DEFAULT_BACKGROUND_COLOR = '#ffffffff';

/** @type {Record<string, string>} */
const STATE_PSEUDO = {
  normal: '',
  hover: ':hover',
  focus: ':focus',
  focus_visible: ':focus-visible',
  focusVisible: ':focus-visible',
  active: ':active',
  visited: ':visited'
};

/**
 * @param {string} baseSelector
 * @param {string} stateKey
 * @returns {string}
 */
function buildStateSelector(baseSelector, stateKey) {
  var _STATE_PSEUDO$stateKe;
  const base = String(baseSelector || '').trim();
  if (!base) {
    return '';
  }
  const pseudo = (_STATE_PSEUDO$stateKe = STATE_PSEUDO[stateKey]) !== null && _STATE_PSEUDO$stateKe !== void 0 ? _STATE_PSEUDO$stateKe : '';
  if (!pseudo) {
    return base;
  }
  return base.split(',').map(s => s.trim() + pseudo).join(', ');
}

/**
 * @returns {object}
 */
function createDefaultLayer() {
  return {
    tab: 'color',
    color: '',
    gradient: '',
    imageId: 0,
    imageUrl: '',
    size: 'cover',
    repeat: 'no-repeat',
    position: 'center center',
    attachment: 'scroll'
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
    'background-attachment': 'scroll'
  };
}

/**
 * @param {object} layer
 * @returns {Record<string, string>|null}
 */
function layerToDeclarations(layer) {
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
      'background-image': 'none'
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
      'background-repeat': 'no-repeat'
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
      'background-attachment': layer.attachment || 'scroll'
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
  'background-attachment': 'backgroundAttachment'
};

/**
 * Convert layer CSS declarations to a React `style` object (Customizer state-button preview).
 *
 * @param {Record<string, string>|null} decls
 * @returns {import('react').CSSProperties|null}
 */
function declarationsToReactStyle(decls) {
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
  const lines = Object.keys(decls).map(k => `  ${k}: ${decls[k]};`);
  return lines.join('\n');
}

/**
 * @param {string} selector
 * @param {Record<string, string>} decls
 * @returns {string}
 */
function ruleBlock(selector, decls) {
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
function buildBackgroundCss(data, breakpoints) {
  if (!data || !data._onepressBackground || !data._meta) {
    return '';
  }
  const baseSel = String(data._meta.selector || '').trim();
  if (!baseSel) {
    return '';
  }
  const states = Array.isArray(data._meta.states) && data._meta.states.length ? data._meta.states : ['normal'];
  const bp = {
    tablet: breakpoints?.tablet || '991px',
    mobile: breakpoints?.mobile || '767px'
  };
  const chunks = [];
  for (const stateKey of states) {
    const sel = buildStateSelector(baseSel, stateKey);
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
      chunks.push(`@media (max-width: ${bp.tablet}) {\n${ruleBlock(sel, tab)}\n}`);
    }
    const mob = layerToDeclarations(st.mobile);
    if (mob) {
      chunks.push(`@media (max-width: ${bp.mobile}) {\n${ruleBlock(sel, mob)}\n}`);
    }
  }
  return chunks.filter(Boolean).join('\n\n');
}

/**
 * @param {string} settingId
 * @returns {string}
 */
function backgroundStyleElementId(settingId) {
  return `onepress-bg-inline-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/***/ }),

/***/ "./src/admin/customizer/background/previewBindings.js":
/*!************************************************************!*\
  !*** ./src/admin/customizer/background/previewBindings.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindOnePressBackgroundPreview: () => (/* binding */ bindOnePressBackgroundPreview)
/* harmony export */ });
/* harmony import */ var _buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildBackgroundCss.js */ "./src/admin/customizer/background/buildBackgroundCss.js");
/**
 * Customizer preview iframe: apply background CSS per postMessage setting.
 *
 * Preview frame `wp.customize.settings` is not keyed like the pane (no per-id .transport);
 * bind explicit setting IDs from PHP (same pattern as typography / spacing).
 */

function getBreakpoints() {
  const b = typeof window !== 'undefined' && window.onepressBackgroundBreakpoints;
  if (b && typeof b === 'object') {
    return {
      tablet: b.tablet || '991px',
      mobile: b.mobile || '767px'
    };
  }
  return {
    tablet: '991px',
    mobile: '767px'
  };
}

/**
 * @param {string} settingId
 * @param {unknown} val
 */
function applyBackgroundPreview(settingId, val) {
  let data = null;
  try {
    data = typeof val === 'string' && val.trim() ? JSON.parse(val) : null;
  } catch {
    return;
  }
  if (!data || !data._onepressBackground) {
    return;
  }
  const css = (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_0__.buildBackgroundCss)(data, getBreakpoints());
  const elId = (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_0__.backgroundStyleElementId)(settingId);
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
function bindOnePressBackgroundPreview(api) {
  api.bind('preview-ready', () => {
    const ids = typeof window !== 'undefined' && window.onepressBackgroundPostMessageSettingIds;
    if (!Array.isArray(ids) || !ids.length) {
      return;
    }
    ids.forEach(id => {
      if (!id || typeof id !== 'string') {
        return;
      }
      api(id, setting => {
        const run = val => applyBackgroundPreview(id, val);
        setting.bind(run);
        run(setting.get());
      });
    });
  });
}

/***/ }),

/***/ "./src/admin/customizer/spacing/buildSpacingPreviewCss.js":
/*!****************************************************************!*\
  !*** ./src/admin/customizer/spacing/buildSpacingPreviewCss.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildSpacingPreviewCss: () => (/* binding */ buildSpacingPreviewCss),
/* harmony export */   spacingPreviewStyleId: () => (/* binding */ spacingPreviewStyleId)
/* harmony export */ });
/**
 * Spacing CSS for Customizer preview <style> injection.
 * Mirrors inc/spacing/helper.php — onepress_spacing_css + onepress_spacing_css_block.
 */

const PREFIXES = ['padding', 'margin'];
const SIDES = ['top', 'right', 'bottom', 'left'];

/**
 * @param {Record<string, string>} css
 * @param {''|'tablet'|'mobile'} suffix
 * @returns {Record<string, string>}
 */
function extractProps(css, suffix) {
  const props = {};
  const suf = suffix ? `-${suffix}` : '';
  for (const prefix of PREFIXES) {
    for (const side of SIDES) {
      const key = `${prefix}-${side}${suf}`;
      const v = css[key];
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        props[`${prefix}-${side}`] = v;
      }
    }
  }
  return props;
}

/**
 * @param {Record<string, string>} props
 * @param {string} selector
 * @returns {string}
 */
function spacingCssBlock(props, selector) {
  if (!props || !Object.keys(props).length || !selector) {
    return '';
  }
  const lines = [];
  for (const [k, v] of Object.entries(props)) {
    if (v !== '' && v != null) {
      lines.push(`\t${k}: ${v};`);
    }
  }
  if (!lines.length) {
    return '';
  }
  return `${selector} {\n${lines.join('\n')}\n}`;
}

/**
 * @param {string} settingId
 * @returns {string}
 */
function spacingPreviewStyleId(settingId) {
  return `onepress-spacing-preview-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/**
 * @param {Record<string, string>} css Flat JSON from spacing control.
 * @param {string} selector
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @returns {string}
 */
function buildSpacingPreviewCss(css, selector, breakpoints) {
  if (!css || typeof css !== 'object' || !selector || !String(selector).trim()) {
    return '';
  }
  const tabletBp = breakpoints?.tablet || '991px';
  const mobileBp = breakpoints?.mobile || '767px';
  const base = extractProps(css, '');
  const tabletProps = extractProps(css, 'tablet');
  const mobileProps = extractProps(css, 'mobile');
  let out = spacingCssBlock(base, selector);
  if (!out) {
    out = '';
  }
  if (Object.keys(tabletProps).length) {
    const tabletRule = spacingCssBlock(tabletProps, selector);
    if (tabletRule) {
      out += `\n@media (max-width: ${tabletBp}) {\n${tabletRule}\n}\n`;
    }
  }
  if (Object.keys(mobileProps).length) {
    const mobileRule = spacingCssBlock(mobileProps, selector);
    if (mobileRule) {
      out += `\n@media (max-width: ${mobileBp}) {\n${mobileRule}\n}\n`;
    }
  }
  return out.trim();
}

/***/ }),

/***/ "./src/admin/customizer/spacing/previewBindings.js":
/*!*********************************************************!*\
  !*** ./src/admin/customizer/spacing/previewBindings.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindOnePressSpacingPreview: () => (/* binding */ bindOnePressSpacingPreview)
/* harmony export */ });
/* harmony import */ var _buildSpacingPreviewCss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildSpacingPreviewCss.js */ "./src/admin/customizer/spacing/buildSpacingPreviewCss.js");
/**
 * Customizer preview iframe: spacing CSS via postMessage (matches PHP onepress_spacing_css).
 */

function getBreakpoints() {
  const b = typeof window !== 'undefined' && window.onepressBackgroundBreakpoints;
  if (b && typeof b === 'object') {
    return {
      tablet: b.tablet || '991px',
      mobile: b.mobile || '767px'
    };
  }
  return {
    tablet: '991px',
    mobile: '767px'
  };
}

/**
 * @param {string} settingId
 * @param {string} selector
 * @param {unknown} val
 */
function applySpacingPreview(settingId, selector, val) {
  let flat = null;
  try {
    flat = typeof val === 'string' && val.trim() ? JSON.parse(val) : null;
  } catch {
    flat = null;
  }
  const elId = (0,_buildSpacingPreviewCss_js__WEBPACK_IMPORTED_MODULE_0__.spacingPreviewStyleId)(settingId);
  let el = document.getElementById(elId);
  if (!flat || typeof flat !== 'object') {
    el?.remove();
    return;
  }
  const keys = Object.keys(flat).filter(k => flat[k] !== undefined && flat[k] !== null && String(flat[k]).trim() !== '');
  if (!keys.length) {
    el?.remove();
    return;
  }
  const css = (0,_buildSpacingPreviewCss_js__WEBPACK_IMPORTED_MODULE_0__.buildSpacingPreviewCss)(flat, selector, getBreakpoints());
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
function bindOnePressSpacingPreview(api) {
  api.bind('preview-ready', () => {
    const map = typeof window !== 'undefined' && window.onepressSpacingPostMessageSelectors;
    if (!map || typeof map !== 'object') {
      return;
    }
    Object.keys(map).forEach(id => {
      const selector = map[id];
      if (!selector || typeof selector !== 'string') {
        return;
      }
      api(id, setting => {
        setting.bind(val => applySpacingPreview(id, selector, val));
      });
    });
  });
}

/***/ }),

/***/ "./src/admin/customizer/typography/buildTypographyPreviewCss.js":
/*!**********************************************************************!*\
  !*** ./src/admin/customizer/typography/buildTypographyPreviewCss.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildTypographyPreviewCss: () => (/* binding */ buildTypographyPreviewCss),
/* harmony export */   typographyPreviewStyleId: () => (/* binding */ typographyPreviewStyleId)
/* harmony export */ });
/**
 * Typography CSS string for Customizer preview <style> injection.
 * Mirrors inc/typography/helper.php — onepress_typo_css + onepress_typo_css_block.
 */

const RESPONSIVE_KEYS = ['font-size-tablet', 'font-size-mobile', 'line-height-tablet', 'line-height-mobile', 'letter-spacing-tablet', 'letter-spacing-mobile'];

/**
 * @param {string} settingId
 * @returns {string}
 */
function typographyPreviewStyleId(settingId) {
  return `onepress-typo-preview-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/**
 * PHP intval() for font-size strings (e.g. "18px" → 18).
 *
 * @param {string} s
 * @returns {number}
 */
function phpIntval(s) {
  const n = parseInt(String(s), 10);
  return Number.isFinite(n) ? n : 0;
}

/**
 * @param {Record<string, string>} css
 * @param {string|string[]} selector
 * @param {number} basePx
 * @returns {string}
 */
function typographyCssBlock(css, selector, basePx) {
  if (!css || typeof css !== 'object' || !selector) {
    return '';
  }
  const decls = {
    ...css
  };
  if (decls['font-family'] && String(decls['font-family']).trim() !== '') {
    decls['font-family'] = `"${String(decls['font-family']).trim()}"`;
  }
  let code = '';
  if (Array.isArray(selector)) {
    code += [...new Set(selector)].join('\n');
  } else {
    code += String(selector);
  }
  code += ' { \n';
  for (const [k, v] of Object.entries(decls)) {
    if (k === 'font-size') {
      continue;
    }
    if (v && typeof v !== 'object') {
      code += `\t${k}: ${v};\n`;
    }
  }
  if (css['font-size'] !== undefined && css['font-size'] !== null && String(css['font-size']).trim() !== '') {
    const rem = phpIntval(css['font-size']) / Math.max(1, basePx);
    code += `\tfont-size: ${rem}rem;\n`;
  }
  code += ' }';
  return code;
}

/**
 * @param {Record<string, string>} css Flat theme-mod JSON (Customizer setting value).
 * @param {string} selector
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @param {number} [basePx=16]
 * @returns {string}
 */
function buildTypographyPreviewCss(css, selector, breakpoints, basePx = 16) {
  if (!css || typeof css !== 'object' || !selector || !String(selector).trim()) {
    return '';
  }
  const tabletBp = breakpoints?.tablet || '991px';
  const mobileBp = breakpoints?.mobile || '767px';
  const base = {
    ...css
  };
  for (const k of RESPONSIVE_KEYS) {
    delete base[k];
  }
  const tabletProps = {};
  if (css['font-size-tablet']) {
    tabletProps['font-size'] = css['font-size-tablet'];
  }
  if (css['line-height-tablet']) {
    tabletProps['line-height'] = css['line-height-tablet'];
  }
  if (css['letter-spacing-tablet']) {
    tabletProps['letter-spacing'] = css['letter-spacing-tablet'];
  }
  const mobileProps = {};
  if (css['font-size-mobile']) {
    mobileProps['font-size'] = css['font-size-mobile'];
  }
  if (css['line-height-mobile']) {
    mobileProps['line-height'] = css['line-height-mobile'];
  }
  if (css['letter-spacing-mobile']) {
    mobileProps['letter-spacing'] = css['letter-spacing-mobile'];
  }
  const outMain = typographyCssBlock(base, selector, basePx);
  if (!outMain) {
    return '';
  }
  let out = outMain;
  const tabletRule = typographyCssBlock(tabletProps, selector, basePx);
  if (tabletRule) {
    out += `\n@media (max-width: ${tabletBp}) {\n${tabletRule}\n}\n`;
  }
  const mobileRule = typographyCssBlock(mobileProps, selector, basePx);
  if (mobileRule) {
    out += `\n@media (max-width: ${mobileBp}) {\n${mobileRule}\n}\n`;
  }
  return out;
}

/***/ }),

/***/ "./src/admin/customizer/typography/previewBindings.js":
/*!************************************************************!*\
  !*** ./src/admin/customizer/typography/previewBindings.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindOnePressTypographyPreview: () => (/* binding */ bindOnePressTypographyPreview)
/* harmony export */ });
/* harmony import */ var _buildTypographyPreviewCss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildTypographyPreviewCss.js */ "./src/admin/customizer/typography/buildTypographyPreviewCss.js");
/**
 * Customizer preview iframe: typography CSS via postMessage (matches PHP onepress_typo_css).
 */

function getBreakpoints() {
  const b = typeof window !== 'undefined' && window.onepressBackgroundBreakpoints;
  if (b && typeof b === 'object') {
    return {
      tablet: b.tablet || '991px',
      mobile: b.mobile || '767px'
    };
  }
  return {
    tablet: '991px',
    mobile: '767px'
  };
}
function getBasePx() {
  const n = typeof window !== 'undefined' && window.onepressTypoCssBasePx;
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
  const webfonts = typeof window !== 'undefined' && window.onepressTypoWebfonts;
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
    flat = typeof val === 'string' && val.trim() ? JSON.parse(val) : null;
  } catch {
    flat = null;
  }
  const elId = (0,_buildTypographyPreviewCss_js__WEBPACK_IMPORTED_MODULE_0__.typographyPreviewStyleId)(settingId);
  let el = document.getElementById(elId);
  if (!flat || typeof flat !== 'object') {
    el?.remove();
    return;
  }
  const keys = Object.keys(flat).filter(k => flat[k] !== undefined && flat[k] !== null && String(flat[k]).trim() !== '');
  if (!keys.length) {
    el?.remove();
    return;
  }
  const css = (0,_buildTypographyPreviewCss_js__WEBPACK_IMPORTED_MODULE_0__.buildTypographyPreviewCss)(flat, selector, getBreakpoints(), getBasePx());
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
function bindOnePressTypographyPreview(api) {
  api.bind('preview-ready', () => {
    const map = typeof window !== 'undefined' && window.onepressTypoPostMessageSelectors;
    if (!map || typeof map !== 'object') {
      return;
    }
    Object.keys(map).forEach(id => {
      const selector = map[id];
      if (!selector || typeof selector !== 'string') {
        return;
      }
      api(id, setting => {
        setting.bind(val => applyTypographyPreview(id, selector, val));
      });
    });
  });
}

/***/ })

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
/* harmony import */ var _customizer_background_previewBindings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customizer/background/previewBindings */ "./src/admin/customizer/background/previewBindings.js");
/* harmony import */ var _customizer_typography_previewBindings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customizer/typography/previewBindings */ "./src/admin/customizer/typography/previewBindings.js");
/* harmony import */ var _customizer_spacing_previewBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customizer/spacing/previewBindings */ "./src/admin/customizer/spacing/previewBindings.js");
/**
 * customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */




(function ($, api) {
  (0,_customizer_background_previewBindings__WEBPACK_IMPORTED_MODULE_0__.bindOnePressBackgroundPreview)(api);
  (0,_customizer_typography_previewBindings__WEBPACK_IMPORTED_MODULE_1__.bindOnePressTypographyPreview)(api);
  (0,_customizer_spacing_previewBindings__WEBPACK_IMPORTED_MODULE_2__.bindOnePressSpacingPreview)(api);

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

  // When preview ready
  wp.customize.bind('preview-ready', function () {
    update_css();
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