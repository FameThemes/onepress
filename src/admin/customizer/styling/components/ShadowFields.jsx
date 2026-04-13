/**
 * Box shadow — generator UI (single shadow) with CSS fallback for complex values.
 */
import { BoxShadowGeneratorField } from './BoxShadowGeneratorField';
import { isFieldDisabled } from '../stylingDisableFields';

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function ShadowFields({ model, onPatch, disabledFieldSet }) {
	if (isFieldDisabled(disabledFieldSet, 'boxShadow')) {
		return null;
	}
	return (
		<BoxShadowGeneratorField
			value={model.boxShadow || ''}
			onChange={(v) => onPatch({ boxShadow: v })}
		/>
	);
}
