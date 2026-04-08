/**
 * Single field inside a repeatable row (mirrors PHP `js_item` structure / classes).
 */
import { useLayoutEffect, useRef } from '@wordpress/element';
import { getRepeatableFieldComponent } from './fields/fieldRegistry';
import { fieldVisible } from './repeatable-logic';

export function RepeatableField({ field, value, onChange, rowValues, $, skipEditor }) {
	const wrapRef = useRef(null);
	const fieldType = field?.type;
	const fieldId = field?.id;
	const required = field?.required;
	const visible = fieldType ? fieldVisible(required, rowValues) : false;

	// Modal WP editor (modal-editor.js) only runs on row mount via repeater-control-init-item.
	// When an editor field appears later (required / visibility), init it against the row <li>.
	useLayoutEffect(() => {
		if (!visible || fieldType !== 'editor' || skipEditor) {
			return;
		}
		const el = wrapRef.current;
		if (!el) {
			return;
		}
		const $row = $(el).closest('.repeatable-customize-control');
		if (!$row.length) {
			return;
		}
		$('body').trigger('repeater-control-init-item', [$row]);
	}, [visible, fieldType, fieldId, skipEditor, $]);

	if (!fieldType) {
		return null;
	}

	// Do not mount hidden fields (avoids editor/media init; state stays in row).
	if (!visible) {
		return null;
	}

	const FieldType = getRepeatableFieldComponent(fieldType);
	if (!FieldType) {
		return null;
	}

	const wrapClass = `field--item item item-${fieldType} item-${fieldId}`;

	const t = fieldType;
	const showLabel = t !== 'checkbox';

	return (
		<div
			ref={wrapRef}
			data-field-id={fieldId}
			className={wrapClass}
			data-cond={required ? JSON.stringify(required) : undefined}
		>
			{showLabel && field.title ? (
				<label className="field-label" dangerouslySetInnerHTML={{ __html: field.title }} />
			) : null}
			{showLabel && field.desc ? (
				<p className="field-desc description" dangerouslySetInnerHTML={{ __html: field.desc }} />
			) : null}
			<FieldType field={field} value={value} onChange={onChange} $={$} skipEditor={skipEditor} />
		</div>
	);
}
