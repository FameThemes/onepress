/**
 * Row value helpers: defaults, merge from server, payload for Customizer setting.
 */

export function defaultForField(field) {
	const t = (field.type || '').toLowerCase();
	switch (t) {
		case 'checkbox':
			return false;
		case 'select': {
			if (field.multiple) {
				return [];
			}
			const opts = field.options || {};
			const keys = Object.keys(opts);
			if (keys.length === 0) {
				return '';
			}
			const fromSchema =
				field.value !== undefined && field.value !== null && field.value !== ''
					? String(field.value)
					: '';
			if (fromSchema !== '' && Object.prototype.hasOwnProperty.call(opts, fromSchema)) {
				return fromSchema;
			}
			if (
				field.default !== undefined &&
				field.default !== null &&
				field.default !== '' &&
				Object.prototype.hasOwnProperty.call(opts, String(field.default))
			) {
				return String(field.default);
			}
			return keys[0];
		}
		case 'media':
			return { url: '', id: '' };
		case 'color':
		case 'coloralpha':
			return '';
		case 'add_by':
			// newEmptyRow() forces "click" after defaults when this field exists.
			return '';
		default:
			return '';
	}
}

export function normalizeMediaValue(v) {
	if (!v || typeof v !== 'object') {
		return { url: '', id: '' };
	}
	return {
		url: typeof v.url === 'string' ? v.url : '',
		id: v.id !== undefined && v.id !== null ? String(v.id) : '',
	};
}

export function mergeRowFromServer(saved, fieldDefs) {
	const row = {};
	Object.keys(fieldDefs).forEach((id) => {
		const def = fieldDefs[id];
		if (saved && Object.prototype.hasOwnProperty.call(saved, id)) {
			const raw = saved[id];
			const t = (def.type || '').toLowerCase();
			if (t === 'media') {
				row[id] = normalizeMediaValue(raw);
			} else if (t === 'checkbox') {
				row[id] = !!raw;
			} else if (t === 'select' && def.multiple) {
				row[id] = Array.isArray(raw) ? raw.slice() : raw ? [raw] : [];
			} else if (t === 'icon' && typeof raw === 'string') {
				row[id] = normalizeSvgIconForStorage(raw);
			} else {
				row[id] = raw;
			}
		} else {
			row[id] = defaultForField(def);
		}
	});
	if (saved && saved.__visibility !== undefined) {
		row.__visibility = saved.__visibility;
	}
	return row;
}

export function buildRowsFromParams(value, fieldDefs) {
	if (!value) {
		return [];
	}
	let arr = value;
	if (typeof value === 'string') {
		try {
			arr = JSON.parse(value);
		} catch (e) {
			return [];
		}
	}
	if (arr && typeof arr === 'object' && !Array.isArray(arr) && Array.isArray(arr._items)) {
		arr = arr._items;
	}
	if (!Array.isArray(arr)) {
		return [];
	}
	return arr.map((saved) => mergeRowFromServer(saved, fieldDefs));
}

export function rowToSaveItem(row, fieldDefs) {
	const out = {};
	Object.keys(fieldDefs).forEach((id) => {
		let v = row[id];
		const t = (fieldDefs[id].type || '').toLowerCase();
		if (t === 'icon' && typeof v === 'string') {
			v = normalizeSvgIconForStorage(v);
		}
		out[id] = v;
	});
	if (row.__visibility !== undefined) {
		out.__visibility = row.__visibility;
	}
	return out;
}

export function serializeSetting(items, fieldDefs) {
	return JSON.stringify({
		_items: items.map((row) => rowToSaveItem(row, fieldDefs)),
	});
}

export function newEmptyRow(fieldDefs, idKey) {
	const row = {};
	Object.keys(fieldDefs).forEach((id) => {
		row[id] = defaultForField(fieldDefs[id]);
	});
	if (Object.prototype.hasOwnProperty.call(fieldDefs, 'add_by')) {
		row.add_by = 'click';
	}
	if (idKey) {
		row[idKey] = 'sid' + Date.now();
	}
	return row;
}

/** Dispatched by icon picker so React IconField can call onChange (Customizer setting). */
export const ONEPRESS_ICON_COMMIT_EVENT = 'onepress-repeatable-icon-commit';

/**
 * Fix SVG strings that picked up extra backslashes before quotes (breaks JSON on save)
 * or "+" instead of space after "<svg" (form-encoding artifacts).
 */
export function normalizeSvgIconForStorage(v) {
	if (typeof v !== 'string' || !v) {
		return v;
	}
	let s = v.trim().replace(/^\uFEFF/, '');
	s = s.replace(/^\s*<\?xml\b[^>]*>\s*/i, '');
	s = s.replace(/^\s*<!DOCTYPE\b[^>]*>\s*/i, '');
	s = s.replace(/<svg\+/gi, '<svg ');
	let prev;
	do {
		prev = s;
		s = s.replace(/(?:\\)+"/g, '"');
	} while (s !== prev);
	return s;
}

/**
 * True when the stored icon value is raw SVG markup (not a CSS class string).
 */
export function isSvgIconValue(v) {
	if (!v || typeof v !== 'string') {
		return false;
	}
	const s = normalizeSvgIconForStorage(v).trim();
	if (!s) {
		return false;
	}
	return /^<\s*svg[\s>]/i.test(s);
}

export function iconPreviewClass(iconValue) {
	if (isSvgIconValue(iconValue)) {
		return '';
	}
	let iconClass = iconValue || '';
	if (iconClass.indexOf('fa-') !== 0) {
		iconClass = 'fa-' + iconClass;
	} else {
		iconClass = iconClass.replace('fa ', '');
	}
	return iconClass.replace('fa-fa', '');
}

/**
 * Strip obvious script/event vectors from SVG before preview in Customizer (saved output is still sanitized in PHP).
 */
export function sanitizeSvgForCustomizerPreview(raw) {
	if (typeof raw !== 'string' || !raw) {
		return '';
	}
	const s = normalizeSvgIconForStorage(raw);
	if (!isSvgIconValue(s)) {
		return '';
	}
	return s
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
		.replace(/\s+href\s*=\s*(["'])\s*javascript:[^"']*\1/gi, ' href="#"');
}
