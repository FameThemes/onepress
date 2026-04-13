/**
 * Margin + padding (TRBL).
 */
import { __ } from '@wordpress/i18n';
import { TrblSidesField } from './TrblSidesField';

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
export function SpacingFields({ sliceKey, model, onPatch }) {
	return (
		<>
			<TrblSidesField
				sliceKey={sliceKey}
				label={__('Margin', 'onepress')}
				model={model}
				onPatch={onPatch}
				keys={{ t: 'marginTop', r: 'marginRight', b: 'marginBottom', l: 'marginLeft' }}
			/>
			<TrblSidesField
				sliceKey={sliceKey}
				label={__('Padding', 'onepress')}
				model={model}
				onPatch={onPatch}
				keys={{ t: 'paddingTop', r: 'paddingRight', b: 'paddingBottom', l: 'paddingLeft' }}
			/>
		</>
	);
}
