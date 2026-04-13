/**
 * top / right / bottom / left when position is not static.
 */
import { __ } from '@wordpress/i18n';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { areAllKeysDisabled } from '../stylingDisableFields';

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function InsetSidesFields({ model, onPatch, disabledFieldSet }) {
	const insetKeys = ['top', 'right', 'bottom', 'left'];
	if (areAllKeysDisabled(disabledFieldSet, insetKeys)) {
		return null;
	}
	const dis = (k) => Boolean(disabledFieldSet?.has(k));
	return (
		<div className="trbl">
			<ResponsiveUnitSliderField
				label={__('Top', 'onepress')}
				value={model.top || ''}
				onChange={(v) => onPatch({ top: v })}
				disabled={dis('top')}
				{...SLIDER_PRESETS.inset}
			/>
			<ResponsiveUnitSliderField
				label={__('Right', 'onepress')}
				value={model.right || ''}
				onChange={(v) => onPatch({ right: v })}
				disabled={dis('right')}
				{...SLIDER_PRESETS.inset}
			/>
			<ResponsiveUnitSliderField
				label={__('Bottom', 'onepress')}
				value={model.bottom || ''}
				onChange={(v) => onPatch({ bottom: v })}
				disabled={dis('bottom')}
				{...SLIDER_PRESETS.inset}
			/>
			<ResponsiveUnitSliderField
				label={__('Left', 'onepress')}
				value={model.left || ''}
				onChange={(v) => onPatch({ left: v })}
				disabled={dis('left')}
				{...SLIDER_PRESETS.inset}
			/>
		</div>
	);
}
