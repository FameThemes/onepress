/**
 * Condition / compare helpers for repeatable field visibility (mirrors PHP `required` on fields).
 *
 * Supported `required` shapes:
 * - Single: [ controllerFieldId, operator, expectedValue ]  e.g. [ 'icon_type', '=', 'icon' ]
 * - AND:    [ [ k, op, v ], [ k2, op2, v2 ] ]
 *
 * Operators: '=', '==', '===', '!=', '!==', '>', '<', 'in', 'empty', 'not_empty'
 */
import clone from 'lodash/clone';
import each from 'lodash/each';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

export function compare(value1, cond, value2) {
	let equal = false;
	let _v;
	const op = cond === undefined || cond === null ? '' : String(cond);

	switch (op) {
		case '===':
			equal = value1 === value2;
			break;
		case '==':
		case '=':
			equal = value1 == value2;
			break;
		case '!==':
			equal = value1 !== value2;
			break;
		case '!=':
			equal = value1 != value2;
			break;
		case 'in':
			return Array.isArray(value2) ? value2.indexOf(value1) !== -1 : false;
		case '>':
			equal = value1 > value2;
			break;
		case '<':
			equal = value1 < value2;
			break;
		case 'empty':
			_v = clone(value1);
			if (isObject(_v) || isArray(_v)) {
				each(_v, (v, i) => {
					if (isEmpty(v)) {
						delete _v[i];
					}
				});
				equal = isEmpty(_v);
			} else {
				equal = _v === null || _v === '';
			}
			break;
		case 'not_empty':
			_v = clone(value1);
			if (isObject(_v) || isArray(_v)) {
				each(_v, (v, i) => {
					if (isEmpty(v)) {
						delete _v[i];
					}
				});
			}
			equal = !isEmpty(_v);
			break;
		default:
			equal = value1 == value2;
	}
	return equal;
}

// Coerce row cell value for comparisons (missing keys, checkbox booleans).
export function normalizeControllerValue(raw) {
	if (raw === undefined || raw === null) {
		return '';
	}
	if (typeof raw === 'boolean') {
		return raw ? '1' : '';
	}
	return raw;
}

// True when one [ fieldId, op, expected ] holds for the current row.
export function rowMatchesCondition(values, controllerKey, operator, expected) {
	const actual = normalizeControllerValue(values[controllerKey]);
	return compare(actual, operator, expected);
}

// Single triple [ k, op, v ] or AND of several triples.
export function multipleCompare(list, values) {
	if (!list || !Array.isArray(list)) {
		return true;
	}
	if (list.length === 0) {
		return true;
	}

	// AND of several [ key, op, val ] groups
	if (Array.isArray(list[0])) {
		return list.every(
			(req) =>
				Array.isArray(req) &&
				req.length >= 3 &&
				typeof req[0] === 'string' &&
				rowMatchesCondition(values, req[0], req[1], req[2])
		);
	}

	// One condition: [ controllerKey, operator, expected ]
	if (typeof list[0] === 'string' && list.length >= 3) {
		return rowMatchesCondition(values, list[0], list[1], list[2]);
	}

	return true;
}

export function fieldVisible(required, fieldValues) {
	if (!required) {
		return true;
	}
	let req;
	try {
		req = typeof required === 'string' ? JSON.parse(required) : required;
	} catch (e) {
		return true;
	}
	return multipleCompare(req, fieldValues || {});
}
