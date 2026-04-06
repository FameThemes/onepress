/**
 * One repeater row: widget chrome, fields, remove/close, drag handle.
 */
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import { RepeatableField } from './RepeatableField';
import { fieldVisible } from './repeatable-logic';

export function RepeatableItem({
	$,
	control,
	fieldIds,
	fields,
	index,
	itemKey,
	row,
	setRow,
	onRemove,
	onDragStart,
	onDragOver,
	onDrop,
}) {
	const liRef = useRef(null);
	const [expanded, setExpanded] = useState(false);

	const liveTitleId = control.params.live_title_id;
	const titleFormat = control.params.title_format || '';
	const defaultEmptyTitle = control.params.default_empty_title || 'Item';

	const rowValues = useMemo(() => {
		const o = { ...row };
		return o;
	}, [row]);

	const liveTitle = useMemo(() => {
		if (!liveTitleId) {
			return defaultEmptyTitle;
		}
		const elId = liveTitleId;
		let v = '';
		const raw = row[elId];
		const fieldDef = fields[elId];
		if (fieldDef && fieldDef.type === 'select' && !fieldDef.multiple) {
			const opts = fieldDef.options || {};
			v = opts[raw] !== undefined ? opts[raw] : raw || '';
		} else {
			v = raw === undefined || raw === null ? '' : String(raw);
		}
		if (v === '') {
			v = defaultEmptyTitle;
		}
		let format = titleFormat;
		// Built-in sections (not added via "Add Section") show plain live title; user-added rows use full title_format.
		if (control.id === 'onepress_section_order_styling' && row.add_by !== 'click') {
			format = '[live_title]';
		}
		if (format !== '') {
			v = format.replace(/\[live_title\]/g, v);
		}
		return v;
	}, [row, liveTitleId, titleFormat, defaultEmptyTitle, fields, control.id]);

	// Step 1→2→3: field value → repeater row state → commit() → Customizer setting (RepeatableControlApp).
	const onFieldChange = useCallback(
		(fieldId, val) => {
			setRow(index, (prev) => ({ ...prev, [fieldId]: val }));
		},
		[index, setRow]
	);

	const skipEditor = control.id === 'onepress_section_order_styling' && row.add_by !== 'click';

	const liClass = ['repeatable-customize-control'];
	if (row.__visibility === 'hidden') {
		liClass.push('visibility-hidden');
	}
	const sid = row.section_id !== undefined && row.section_id !== null ? String(row.section_id) : '';
	if (sid !== '') {
		liClass.push(`section-${sid}`);
	}
	if (sid === 'map' || sid === 'slider') {
		liClass.push('show-display-field-only');
	}
	if (skipEditor) {
		liClass.push('no-changeable');
	}

	useLayoutEffect(() => {
		const $ctx = $(liRef.current);
		if (!$ctx.length) {
			return;
		}
		$('body').trigger('repeater-control-init-item', [$ctx]);
		return () => {
			$('body').trigger('repeat-control-remove-item', [$ctx]);
		};
	}, [$, itemKey]);

	const toggle = useCallback((e) => {
		e.preventDefault();
		setExpanded((x) => !x);
	}, []);

	return (
		<li ref={liRef} className={liClass.join(' ')} data-repeat-key={itemKey}>
			<div className={`widget ${expanded ? 'explained' : ''}`}>
				<div className="widget-top">
					<div className="widget-title-action">
						<a className="widget-action" href="#" onClick={toggle} />
					</div>
					<div
						className="widget-title"
						draggable
						onDragStart={(e) => onDragStart(e, index)}
						onDragOver={(e) => onDragOver(e, index)}
						onDrop={(e) => onDrop(e, index)}
					>
						<h4 className="live-title">{liveTitle}</h4>
					</div>
				</div>

				<div
					className={`widget-inside ${expanded ? 'show' : 'hide'}`}
					style={expanded ? undefined : { display: 'none' }}
				>
					<div className="form">
						<div className="widget-content">
							{fieldIds.map((fid) => {
								const def = fields[fid];
								if (!def || !def.type) {
									return null;
								}
								// User-added rows (add_by = click): show title as a text input instead of hidden.
								const fieldDef =
									fid === 'title' && row.add_by === 'click'
										? { ...def, type: 'text' }
										: def;
								const condVisible = fieldVisible(fieldDef.required, rowValues);
								return (
									<RepeatableField
										key={`${fid}-${condVisible ? '1' : '0'}`}
										field={fieldDef}
										value={row[fid]}
										onChange={(v) => onFieldChange(fid, v)}
										rowValues={rowValues}
										$={$}
										skipEditor={skipEditor && fieldDef.type === 'editor'}
									/>
								);
							})}

							<div className="widget-control-actions">
								<div className="alignleft">
									<span className="remove-btn-wrapper">
										<a
											href="#"
											className="repeat-control-remove"
											onClick={(e) => {
												e.preventDefault();
												onRemove(index);
											}}
										>
											Remove
										</a>
										{' | '}
									</span>
									<a href="#" className="repeat-control-close" onClick={toggle}>
										Close
									</a>
								</div>
								<br className="clear" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}
