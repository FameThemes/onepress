/**
 * Helpers for background-image URL ↔ CSS and focal point ↔ background-position.
 */

/**
 * @param {number} n
 * @returns {number}
 */
function clamp01(n) {
	if (Number.isNaN(n)) {
		return 0.5;
	}
	return Math.min(1, Math.max(0, n));
}

/**
 * First url(...) inside a background-image declaration, or ''.
 *
 * @param {string} raw
 * @returns {string}
 */
export function extractUrlFromBackgroundImage(raw) {
	const s = String(raw || '').trim();
	if (!s || /^none$/i.test(s)) {
		return '';
	}
	const lower = s.toLowerCase();
	const start = lower.indexOf('url(');
	if (start === -1) {
		return '';
	}
	let inner = s.slice(start + 4).trim();
	if (inner.startsWith('"')) {
		const end = inner.indexOf('"', 1);
		return end === -1 ? '' : inner.slice(1, end);
	}
	if (inner.startsWith("'")) {
		const end = inner.indexOf("'", 1);
		return end === -1 ? '' : inner.slice(1, end);
	}
	const endParen = inner.indexOf(')');
	return (endParen === -1 ? inner : inner.slice(0, endParen)).trim();
}

/**
 * @param {string} url
 * @returns {string}
 */
export function formatBackgroundImageFromUrl(url) {
	const u = String(url || '').trim();
	if (!u) {
		return '';
	}
	const escaped = u.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
	return `url("${escaped}")`;
}

/**
 * Parse background-position into focal 0–1 (only percentage pairs; else center).
 *
 * @param {string} pos
 * @returns {{ x: number, y: number }}
 */
export function parseBackgroundPositionToFocal(pos) {
	const s = String(pos || '').trim();
	if (!s) {
		return { x: 0.5, y: 0.5 };
	}
	const m = /^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/i.exec(s.replace(/\s+/g, ' '));
	if (m) {
		return {
			x: clamp01(Number.parseFloat(m[1]) / 100),
			y: clamp01(Number.parseFloat(m[2]) / 100),
		};
	}
	return { x: 0.5, y: 0.5 };
}

/**
 * @param {{ x: number, y: number }} fp
 * @returns {string}
 */
export function focalToBackgroundPosition(fp) {
	const x = Math.round(fp.x * 100 * 100) / 100;
	const y = Math.round(fp.y * 100 * 100) / 100;
	return `${x}% ${y}%`;
}
