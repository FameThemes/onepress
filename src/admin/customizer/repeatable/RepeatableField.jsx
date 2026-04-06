/**
 * Single field inside a repeatable row (mirrors PHP `js_item` structure / classes).
 */
import { getRepeatableFieldComponent } from './fields/fieldRegistry';
import { fieldVisible } from './repeatable-logic';

export function RepeatableField({ field, value, onChange, rowValues, $, skipEditor }) {
	if (!field.type) {
		return null;
	}

	const required = field.required;
	const visible = fieldVisible(required, rowValues);

	// Do not mount hidden fields (avoids editor/media init; state stays in row).
	if (!visible) {
		return null;
	}

	const FieldType = getRepeatableFieldComponent(field.type);
	if (!FieldType) {
		return null;
	}

	const wrapClass = `field--item item item-${field.type} item-${field.id}`;

	const t = field.type;
	const showLabel = t !== 'checkbox';

	return (
		<div
			data-field-id={field.id}
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
