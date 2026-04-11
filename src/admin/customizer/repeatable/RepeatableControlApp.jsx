/**
 * React root for Customizer `repeatable` control: mounts as children of `ul.list-repeatable`.
 *
 * Data flow (every user edit must follow this path):
 * 1. Field UI changes → field `onChange(fieldId, value)` (RepeatableItem → RepeatableField → field component).
 * 2. `setRow` merges the value into that row in React state and builds the next `items` array.
 * 3. `commit(nextItems)` serializes rows to JSON (`serializeSetting`) and calls
 *    `pushRepeatablePayloadToCustomizer` → `setting.set(payload)` + hidden input + callbacks
 *    so wp.customize marks the setting dirty and preview/changeset update.
 *
 * Fields that update the DOM via jQuery only (e.g. modal TinyMCE → `.val().trigger("change")`)
 * must still invoke the same `onChange` path (see TextareaField editor + jQuery listeners).
 */
import { arrayMoveImmutable } from 'array-move';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import { RepeatableItem } from './RepeatableItem';
import {
	buildRowsFromParams,
	newEmptyRow,
	repeatableSettingValuesEqual,
	serializeSetting,
} from './repeatable-values';

/**
 * Step 3: apply serialized repeater data to the Customizer setting (and linked hidden input).
 * Core Value#set no-ops when _.isEqual(from, to) — e.g. object vs same JSON string
 * — leaving _dirty false so refresh preview / changeset never see the edit.
 *
 * @param {jQuery} $ jQuery
 * @param {object} control wp.customize.Control instance
 * @param {string} payload JSON string for the setting
 */
function pushRepeatablePayloadToCustomizer($, control, payload) {
	const setting = control.setting;
	if (!setting || typeof setting.set !== 'function' || typeof setting.get !== 'function') {
		return;
	}
	const before = setting.get();
	setting.set(payload);

	const $hidden = control.container.find('input[data-customize-setting-link]');
	if ($hidden.length) {
		$hidden.val(payload);
		$hidden.trigger('input').trigger('change');
	}

	const after = setting.get();
	const _ = typeof window !== 'undefined' ? window._ : null;
	if (_ && typeof _.isEqual === 'function') {
		const skipped = _.isEqual(before, after) && !_.isEqual(before, payload);
		if (skipped) {
			setting._value = payload;
			setting._dirty = true;
			if (setting.callbacks && typeof setting.callbacks.fireWith === 'function') {
				setting.callbacks.fireWith(setting, [payload, before]);
			}
		}
	}
}

export function RepeatableControlApp({ control, $, api }) {
	const fields = control.params.fields;
	const fieldIds = useMemo(() => Object.keys(fields || {}), [fields]);

	const [items, setItems] = useState(() => buildRowsFromParams(control.params.value, fields));

	const maxItem = control.params.max_item ? parseInt(control.params.max_item, 10) : 0;
	const limitedMsg = control.params.limited_msg || '';
	const idKey = control.params.id_key || '';

	const dragFrom = useRef(null);

	// Sync hidden input + setting only if payload differs from WP (avoids false “dirty” on load).
	// Note: wp.customize.Value#set ignores a second-arg “silent”; every set marks the setting dirty.
	useLayoutEffect(() => {
		const payload = serializeSetting(items, fields);
		if (typeof control.setting.set !== 'function' || typeof control.setting.get !== 'function') {
			return;
		}
		const current = control.setting.get();
		if (!repeatableSettingValuesEqual(current, payload)) {
			pushRepeatablePayloadToCustomizer($, control, payload);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap only
	}, []);

	// Step 3: rows in memory → JSON payload → wp.customize.Setting.
	const commit = useCallback(
		(next) => {
			const payload = serializeSetting(next, fields);
			pushRepeatablePayloadToCustomizer($, control, payload);
		},
		[control, fields, $]
	);

	// Step 2: patch one row, then commit the full list.
	const setRow = useCallback(
		(index, updater) => {
			setItems((prev) => {
				const prevRow = prev[index];
				const nextRow = typeof updater === 'function' ? updater(prevRow) : updater;
				const next = prev.slice();
				next[index] = nextRow;
				commit(next);
				return next;
			});
		},
		[commit]
	);

	const onRemove = useCallback(
		(index) => {
			setItems((prev) => {
				const next = prev.filter((_, i) => i !== index);
				commit(next);
				return next;
			});
		},
		[commit]
	);

	const onDragStart = useCallback((e, index) => {
		dragFrom.current = index;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', String(index));
	}, []);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		(e, toIndex) => {
			e.preventDefault();
			const fromStr = e.dataTransfer.getData('text/plain');
			let from = fromStr !== '' ? parseInt(fromStr, 10) : dragFrom.current;
			if (from === null || from === undefined || Number.isNaN(from)) {
				return;
			}
			setItems((prev) => {
				if (from === toIndex) {
					return prev;
				}
				const next = arrayMoveImmutable(prev, from, toIndex);
				commit(next);
				return next;
			});
			dragFrom.current = null;
		},
		[commit]
	);

	const addItem = useCallback(() => {
		if (control.id === 'onepress_map_items_address') {
			const mapLong = api('onepress_map_long').get();
			const mapLat = api('onepress_map_lat').get();
			if (mapLong === '' || mapLat === '') {
				const $lab = $('#customize-control-onepress_map_items_address', document).find('label');
				$lab.append(
					'<span class="onepress-customizer-notice">' +
						(typeof window.ONEPRESS_CUSTOMIZER_DATA !== 'undefined'
							? window.ONEPRESS_CUSTOMIZER_DATA.multiple_map_notice
							: '') +
						'</span>'
				);
				return;
			}
			$('#customize-control-onepress_map_items_address', document).find('.onepress-customizer-notice').remove();
		}

		setItems((prev) => {
			if (maxItem > 0 && prev.length >= maxItem) {
				return prev;
			}
			const row = newEmptyRow(fields, idKey);
			const next = [...prev, row];
			commit(next);
			return next;
		});
	}, [api, commit, control.id, fields, idKey, maxItem]);

	useEffect(() => {
		const $btn = control.container.find('.add-new-repeat-item');
		$btn.off('click.onepressR').on('click.onepressR', (e) => {
			e.preventDefault();
			addItem();
		});
		return () => $btn.off('click.onepressR');
	}, [addItem, control.container]);

	useEffect(() => {
		const $actions = control.container.find('.repeatable-actions');
		if (!$actions.length) {
			return;
		}
		// PHP template: .limited-msg sits *inside* .repeatable-actions. Hiding the whole
		// .repeatable-actions (old behavior) hid the message too; the empty placeholder also
		// blocked insertAfter($actions). Only hide the add-button row; fill/show .limited-msg.
		const $addRow = $actions.children('div').first();
		const $limited = $actions.find('.limited-msg').first();
		const n = items.length;
		const atLimit = maxItem > 0 && n >= maxItem;
		if (atLimit) {
			$addRow.hide();
			if (limitedMsg) {
				if ($limited.length) {
					$limited.html(limitedMsg).show();
				} else {
					$('<p class="limited-msg" />').html(limitedMsg).insertAfter($actions);
				}
			} else {
				$limited.hide().empty();
			}
		} else {
			$addRow.show();
			$limited.hide().empty();
			$actions.next('p.limited-msg').remove();
		}
	}, [items.length, maxItem, limitedMsg, control.container]);

	return (
		<>
			{items.map((row, index) => {
				const itemKey =
					idKey && row[idKey] ? String(row[idKey]) : `idx-${index}`;
				return (
					<RepeatableItem
						key={itemKey}
						$={$}
						control={control}
						fieldIds={fieldIds}
						fields={fields}
						index={index}
						itemKey={itemKey}
						row={row}
						setRow={setRow}
						onRemove={onRemove}
						onDragStart={onDragStart}
						onDragOver={onDragOver}
						onDrop={onDrop}
					/>
				);
			})}
		</>
	);
}
