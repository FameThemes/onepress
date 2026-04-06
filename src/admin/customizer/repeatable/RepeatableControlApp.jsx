/**
 * React root for Customizer `repeatable` control: mounts as children of `ul.list-repeatable`.
 */
import { arrayMoveImmutable } from 'array-move';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import { RepeatableItem } from './RepeatableItem';
import { buildRowsFromParams, newEmptyRow, serializeSetting } from './repeatable-values';

export function RepeatableControlApp({ control, $, api }) {
	const fields = control.params.fields;
	const fieldIds = useMemo(() => Object.keys(fields || {}), [fields]);

	const [items, setItems] = useState(() => buildRowsFromParams(control.params.value, fields));

	const maxItem = control.params.max_item ? parseInt(control.params.max_item, 10) : 0;
	const limitedMsg = control.params.limited_msg || '';
	const idKey = control.params.id_key || '';

	const dragFrom = useRef(null);

	// Align wp.customize.Setting + hidden input (data-customize-setting-link) with React state on load.
	useLayoutEffect(() => {
		const payload = serializeSetting(items, fields);
		if (typeof control.setting.set === 'function') {
			control.setting.set(payload, { silent: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap only
	}, []);

	const commit = useCallback(
		(next) => {
			control.setting.set(serializeSetting(next, fields));
		},
		[control, fields]
	);

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
		const n = items.length;
		if (maxItem > 0 && n >= maxItem) {
			$actions.hide();
			if (limitedMsg && control.container.find('.limited-msg').length === 0) {
				$('<p class="limited-msg"/>').html(limitedMsg).insertAfter($actions);
			}
			control.container.find('.limited-msg').show();
		} else {
			$actions.show();
			control.container.find('.limited-msg').hide();
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
