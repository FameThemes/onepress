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
	return el.className
		.trim()
		.split(/\s+/)
		.filter(
			(c) =>
				c &&
				/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(c) &&
				!/^wp-/.test(c) &&
				!/^is-/.test(c) &&
				!/^has-/.test(c) &&
				!/^js-/.test(c)
		);
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
	return meaningfulClasses(el).filter((c) => !isBootstrapLayoutClass(c));
}

/**
 * One path segment: never `tag.class`, never `:pseudo`. Prefer `#id.class` when id exists.
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
	const maxCls = 3;
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
	if (segs.length <= 2) {
		return segs;
	}
	let changed = true;
	while (changed && segs.length > 2) {
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
 * Short descendant path: only `.class` / `#id.class`, no `>`, no `:pseudo`, ≤ {@link SELECTOR_MAX_DEPTH} levels.
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
		const seg = segmentForElement(node, { isTarget: node === el });
		if (seg) {
			fullOuterToInner.push(seg);
		}
	}
	if (fullOuterToInner.length === 0) {
		return el.tagName.toLowerCase();
	}
	const n = fullOuterToInner.length;
	const maxK = Math.min(SELECTOR_MAX_DEPTH, n);
	for (let k = 1; k <= maxK; k++) {
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
	document.querySelectorAll(`div[id="${id}"]`).forEach((el) => {
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
		height: '0',
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
		backgroundColor: CROSSHAIR_LINE,
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
		whiteSpace: 'nowrap',
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
	const el = ensureCoordsLabel();
	const sx = window.scrollX ?? window.pageXOffset ?? 0;
	const sy = window.scrollY ?? window.pageYOffset ?? 0;
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
	if (
		!options.skipNotify &&
		api &&
		api.preview &&
		typeof api.preview.send === 'function'
	) {
		api.preview.send('onepress-styling-pick-ended', { controlId: ended.controlId });
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
	const { controlId, itemIndex } = session;
	const api = /** @type {*} */ (window).wp?.customize;
	teardown(api, { skipNotify: true });
	if (api && api.preview && typeof api.preview.send === 'function') {
		api.preview.send('onepress-styling-picked', {
			controlId,
			itemIndex,
			selector,
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
		const api = /** @type {*} */ (window).wp?.customize;
		teardown(api);
	}
}

/**
 * @param {*} api wp.customize (preview frame)
 * @param {{ controlId: string, itemIndex: number|null }} data
 */
function startSession(api, data) {
	if (session) {
		teardown(api);
	}
	session = { controlId: data.controlId, itemIndex: data.itemIndex ?? null };
	document.body.style.cursor = 'crosshair';
	ensureHighlight();
	updatePointerHud(
		Math.round(window.innerWidth / 2),
		Math.round(window.innerHeight / 2)
	);
	window.addEventListener('mousemove', onMouseMove, true);
	window.addEventListener('mousedown', onMouseDown, true);
	window.addEventListener('click', onClick, true);
	window.addEventListener('keydown', onKeyDown, true);
}

/**
 * @param {*} api wp.customize in the preview iframe
 */
export function bindStylingSelectorPickPreview(api) {
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

	api.preview.bind('onepress-styling-start-pick', (data) => {
		if (!data || !data.controlId) {
			return;
		}
		startSession(api, {
			controlId: String(data.controlId),
			itemIndex: data.itemIndex != null ? Number(data.itemIndex) : null,
		});
	});

	api.preview.bind('onepress-styling-cancel-pick', () => {
		teardown(api);
	});
}
