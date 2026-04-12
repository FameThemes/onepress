/**
 * Browser entry for LibFont: gzip (WOFF) + brotli (WOFF2) globals, then the bundled Font class.
 *
 * Debug: in Customizer, `window.onepressDebugLibFont = true` then reload — look for "[OnePress LibFont]" in console.
 *
 * @package onepress
 */

import './inflate.js';
import './unbrotli.js';
export { Font } from './lib-font.browser.js';
