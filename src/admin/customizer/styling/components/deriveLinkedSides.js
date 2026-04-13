/**
 * True when four TRBL (or corner) values are equal and not all empty.
 *
 * @param {Record<string, string>} model
 * @param {string[]} keys
 * @returns {boolean}
 */
export function deriveLinkedSides(model, keys) {
	const vals = keys.map((k) => (model[k] || '').trim());
	if (vals.every((v) => !v)) {
		return false;
	}
	return vals[0] === vals[1] && vals[1] === vals[2] && vals[2] === vals[3];
}
