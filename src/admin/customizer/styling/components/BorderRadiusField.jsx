/**
 * Border radius corners (TL → TR → BR → BL) using TRBL inline layout + link corners.
 */
import { __ } from '@wordpress/i18n';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { TrblSidesFieldInline } from './TrblSidesField';

const KEYS = {
	t: 'borderTopLeftRadius',
	r: 'borderTopRightRadius',
	b: 'borderBottomRightRadius',
	l: 'borderBottomLeftRadius',
};

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function BorderRadiusField({ sliceKey, model, onPatch, disabledFieldSet }) {
	return (
		<TrblSidesFieldInline
			sliceKey={sliceKey}
			label={__('Border radius', 'onepress')}
			model={model}
			onPatch={onPatch}
			keys={KEYS}
			sliderPreset={SLIDER_PRESETS.radius}
			linkLabel={__('Link corners', 'onepress')}
			unlinkLabel={__('Unlink corners', 'onepress')}
			disabledFieldSet={disabledFieldSet}
			sideLabels={{
				t: __('Top left', 'onepress'),
				r: __('Top right', 'onepress'),
				b: __('Bottom right', 'onepress'),
				l: __('Bottom left', 'onepress'),
			}}
		/>
	);
}
