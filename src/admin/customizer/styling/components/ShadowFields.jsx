/**
 * Box shadow — generator UI (single shadow) with CSS fallback for complex values.
 */
import { BoxShadowGeneratorField } from './BoxShadowGeneratorField';

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
export function ShadowFields({ model, onPatch }) {
	return (
		<BoxShadowGeneratorField
			value={model.boxShadow || ''}
			onChange={(v) => onPatch({ boxShadow: v })}
		/>
	);
}
