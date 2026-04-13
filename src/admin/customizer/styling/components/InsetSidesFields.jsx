/**
 * top / right / bottom / left when position is not static.
 */
import { __ } from '@wordpress/i18n';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
export function InsetSidesFields({ model, onPatch }) {
	return (
		<div className="trbl">
			<ResponsiveUnitSliderField
				label={__('Top', 'onepress')}
				value={model.top || ''}
				onChange={(v) => onPatch({ top: v })}
				{...SLIDER_PRESETS.inset}
			/>
			<ResponsiveUnitSliderField
				label={__('Right', 'onepress')}
				value={model.right || ''}
				onChange={(v) => onPatch({ right: v })}
				{...SLIDER_PRESETS.inset}
			/>
			<ResponsiveUnitSliderField
				label={__('Bottom', 'onepress')}
				value={model.bottom || ''}
				onChange={(v) => onPatch({ bottom: v })}
				{...SLIDER_PRESETS.inset}
			/>
			<ResponsiveUnitSliderField
				label={__('Left', 'onepress')}
				value={model.left || ''}
				onChange={(v) => onPatch({ left: v })}
				{...SLIDER_PRESETS.inset}
			/>
		</div>
	);
}
