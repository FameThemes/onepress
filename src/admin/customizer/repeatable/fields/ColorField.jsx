import { ColorInput } from './ColorInput';

export function ColorField({ field, value, onChange, $ }) {
	let display = value || '';
	if (display && String(display).indexOf('#') !== 0) {
		display = '#' + String(display).replace(/^#/, '');
	}
	return <ColorInput fieldId={field.id} value={display} onChange={onChange} $={$} />;
}
