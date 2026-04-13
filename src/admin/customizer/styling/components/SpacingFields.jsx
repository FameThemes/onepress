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
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function SpacingFields({ sliceKey, model, onPatch, disabledFieldSet }) {
	return (
		<>
			<TrblSidesField
				sliceKey={sliceKey}
				label={__('Margin', 'onepress')}
				model={model}
				onPatch={onPatch}
				keys={{ t: 'marginTop', r: 'marginRight', b: 'marginBottom', l: 'marginLeft' }}
				disabledFieldSet={disabledFieldSet}
			/>
			<TrblSidesField
				sliceKey={sliceKey}
				label={__('Padding', 'onepress')}
				model={model}
				onPatch={onPatch}
				keys={{ t: 'paddingTop', r: 'paddingRight', b: 'paddingBottom', l: 'paddingLeft' }}
				disabledFieldSet={disabledFieldSet}
			/>
		</>
	);
}
