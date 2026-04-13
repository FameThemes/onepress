/**
 * Border, radius, outline.
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { BorderRadiusField } from './BorderRadiusField';
import { CssEnumButtonGroup } from './CssEnumButtonGroup';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { StylingAlphaColorControl } from './StylingAlphaColorControl';
import { TrblSidesField } from './TrblSidesField';

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
export function BorderOutlineFields({ sliceKey, model, onPatch }) {
	return (
		<>
			<CssEnumButtonGroup
				label={__('Border style', 'onepress')}
				value={model.borderStyle || ''}
				onChange={(v) => onPatch({ borderStyle: v })}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'none', label: 'none' },
					{ value: 'solid', label: 'solid' },
					{ value: 'dashed', label: 'dashed' },
					{ value: 'dotted', label: 'dotted' },
				]}
			/>
			<TrblSidesField
				sliceKey={sliceKey}
				label={__('Border width', 'onepress')}
				model={model}
				onPatch={onPatch}
				keys={{
					t: 'borderTopWidth',
					r: 'borderRightWidth',
					b: 'borderBottomWidth',
					l: 'borderLeftWidth',
				}}
				sliderPreset={SLIDER_PRESETS.borderWidth}
				linkLabel={__('Link border widths', 'onepress')}
				unlinkLabel={__('Unlink border widths', 'onepress')}
				preferLinkedWhenEmpty
			/>
			<StylingAlphaColorControl
				label={__('Border color', 'onepress')}
				value={model.borderColor || ''}
				onChange={(v) => onPatch({ borderColor: v })}
			/>
			<BorderRadiusField sliceKey={sliceKey} model={model} onPatch={onPatch} />
			<SelectControl
				label={__('Outline style', 'onepress')}
				value={model.outlineStyle || ''}
				onChange={(v) => onPatch({ outlineStyle: v })}
				options={[
					{ label: __('Default', 'onepress'), value: '' },
					{ label: 'auto', value: 'auto' },
					{ label: 'none', value: 'none' },
					{ label: 'hidden', value: 'hidden' },
					{ label: 'dotted', value: 'dotted' },
					{ label: 'dashed', value: 'dashed' },
					{ label: 'solid', value: 'solid' },
					{ label: 'double', value: 'double' },
					{ label: 'groove', value: 'groove' },
					{ label: 'ridge', value: 'ridge' },
					{ label: 'inset', value: 'inset' },
					{ label: 'outset', value: 'outset' },
				]}
				__nextHasNoMarginBottom
			/>
			<ResponsiveUnitSliderField
				label={__('Outline width', 'onepress')}
				value={model.outlineWidth || ''}
				onChange={(v) => onPatch({ outlineWidth: v })}
				{...SLIDER_PRESETS.borderWidth}
			/>
			<StylingAlphaColorControl
				label={__('Outline color', 'onepress')}
				value={model.outlineColor || ''}
				onChange={(v) => onPatch({ outlineColor: v })}
			/>
			<ResponsiveUnitSliderField
				label={__('Outline offset', 'onepress')}
				value={model.outlineOffset || ''}
				onChange={(v) => onPatch({ outlineOffset: v })}
				{...SLIDER_PRESETS.outlineOffset}
			/>
		</>
	);
}
