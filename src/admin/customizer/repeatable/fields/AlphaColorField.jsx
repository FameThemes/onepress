import { AlphaColorInput } from './AlphaColorInput';

export function AlphaColorField({ field, value, onChange, $ }) {
	return <AlphaColorInput fieldId={field.id} value={value || ''} onChange={onChange} $={$} />;
}
