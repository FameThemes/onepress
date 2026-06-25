/**
 * Side-effect module that exposes Tether on the global scope.
 *
 * Bootstrap 4 alpha 6's Tooltip / Popover IIFEs run
 * `if (typeof Tether === "undefined") throw new Error(...)` at
 * module-evaluation time (the IIFE body, not the constructor) — so the
 * global must exist BEFORE `bootstrap.min.js` is evaluated.
 *
 * ES-module imports are evaluated in source order, but statements in
 * the importing module's body run AFTER all of that module's imports
 * have resolved. The previous fix put the assignment in the entry
 * module's body, which executed too late and made Bootstrap throw at
 * load. Wrapping the assignment in its own module turns it into a
 * side-effect import: it executes during the import-evaluation pass,
 * before bootstrap's IIFE runs, as long as it is imported first in
 * the entry file.
 */
import Tether from "./index.js";

window.Tether = Tether;
