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
import { TrblSidesFieldInline } from './TrblSidesField';
import { isFieldDisabled } from '../stylingDisableFields';
import { reset, closeSmall, lineDotted, lineDashed, lineSolid } from '@wordpress/icons';

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function BorderOutlineFields({ sliceKey, model, onPatch, disabledFieldSet }) {
	const d = disabledFieldSet;
	const dis = (key) => isFieldDisabled(d, key);
	const borderStyleNorm = String(model.borderStyle || '').trim().toLowerCase();
	const showBorderWidthColor = borderStyleNorm !== '' && borderStyleNorm !== 'none';
	const outlineStyleNorm = String(model.outlineStyle || '').trim().toLowerCase();
	const showOutlineSizeColorOffset =
		outlineStyleNorm !== '' && outlineStyleNorm !== 'none' && outlineStyleNorm !== 'hidden';
	return (
		<>
			<CssEnumButtonGroup
				label={__('Border style', 'onepress')}
				value={model.borderStyle || ''}
				onChange={(v) => onPatch({ borderStyle: v })}
				disabled={dis('borderStyle')}
				options={[
					{ value: '', label: __('Default', 'onepress'), icon: reset },
					{ value: 'none', label: 'none', icon: closeSmall },
					{ value: 'solid', label: 'solid', icon: lineSolid },
					{ value: 'dashed', label: 'dashed', icon: lineDashed },
					{ value: 'dotted', label: 'dotted', icon: lineDotted },
				]}
			/>
			{showBorderWidthColor ? (
				<>
					<TrblSidesFieldInline
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
						disabledFieldSet={disabledFieldSet}
					/>
					<StylingAlphaColorControl
						label={__('Border color', 'onepress')}
						value={model.borderColor || ''}
						onChange={(v) => onPatch({ borderColor: v })}
						disabled={dis('borderColor')}
					/>
				</>
			) : null}
			<BorderRadiusField
				sliceKey={sliceKey}
				model={model}
				onPatch={onPatch}
				disabledFieldSet={disabledFieldSet}
			/>
			<SelectControl
				label={__('Outline style', 'onepress')}
				value={model.outlineStyle || ''}
				onChange={(v) => onPatch({ outlineStyle: v })}
				disabled={dis('outlineStyle')}
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
			{showOutlineSizeColorOffset ? (
				<>
					<ResponsiveUnitSliderField
						label={__('Outline width', 'onepress')}
						value={model.outlineWidth || ''}
						onChange={(v) => onPatch({ outlineWidth: v })}
						disabled={dis('outlineWidth')}
						{...SLIDER_PRESETS.borderWidth}
					/>
					<StylingAlphaColorControl
						label={__('Outline color', 'onepress')}
						value={model.outlineColor || ''}
						onChange={(v) => onPatch({ outlineColor: v })}
						disabled={dis('outlineColor')}
					/>
					<ResponsiveUnitSliderField
						label={__('Outline offset', 'onepress')}
						value={model.outlineOffset || ''}
						onChange={(v) => onPatch({ outlineOffset: v })}
						disabled={dis('outlineOffset')}
						{...SLIDER_PRESETS.outlineOffset}
					/>
				</>
			) : null}
		</>
	);
}
