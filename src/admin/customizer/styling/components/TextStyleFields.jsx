/**
 * Text group fields (typography).
 */
import { BaseControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { mergePickerFamilies } from '../googleFontCollection';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { CssEnumButtonGroup } from './CssEnumButtonGroup';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { StylingAlphaColorControl } from './StylingAlphaColorControl';
import { StylingFontFaceSelectControls } from './StylingFontFaceSelectControls';
import { StylingGoogleFontFamilyControl } from './StylingGoogleFontFamilyControl';
import { isFieldDisabled } from '../stylingDisableFields';

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {import('../googleFontCollection').PickerFontFamily[]} props.families
 * @param {boolean} [props.fontsLoading]
 * @param {Error | null} [props.fontsError]
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function TextStyleFields({
	model,
	onPatch,
	families,
	fontsLoading = false,
	fontsError = null,
	disabledFieldSet,
}) {
	const list = families ?? mergePickerFamilies(null);
	const loading = fontsLoading;
	const error = fontsError;
	const d = disabledFieldSet;
	const dis = (key) => isFieldDisabled(d, key);

	return (
		<>
			<StylingAlphaColorControl
				label={__('Text color', 'onepress')}
				value={model.color || ''}
				onChange={(v) => onPatch({ color: v })}
				disabled={dis('color')}
			/>
			{dis('fontFamily') ? null : (
				<BaseControl label={__('Font family', 'onepress')} className="styling-text-font-family">
					<StylingGoogleFontFamilyControl
						value={model.fontFamily || ''}
						onPatch={onPatch}
						families={list}
						loading={loading}
						error={error}
					/>
					{error && !loading ? (
						<TextControl
							__nextHasNoMarginBottom
							label={__('Font family (CSS fallback)', 'onepress')}
							value={model.fontFamily || ''}
							onChange={(v) => onPatch({ fontFamily: v })}
						/>
					) : null}
				</BaseControl>
			)}
			<StylingFontFaceSelectControls model={model} onPatch={onPatch} families={list} disabledFieldSet={d} />
			<ResponsiveUnitSliderField
				label={__('Font size', 'onepress')}
				value={model.fontSize || ''}
				onChange={(v) => onPatch({ fontSize: v })}
				disabled={dis('fontSize')}
				{...SLIDER_PRESETS.fontSize}
			/>
			<ResponsiveUnitSliderField
				label={__('Line height', 'onepress')}
				value={model.lineHeight || ''}
				onChange={(v) => onPatch({ lineHeight: v })}
				disabled={dis('lineHeight')}
				{...SLIDER_PRESETS.lineHeight}
			/>
			<ResponsiveUnitSliderField
				label={__('Letter spacing', 'onepress')}
				value={model.letterSpacing || ''}
				onChange={(v) => onPatch({ letterSpacing: v })}
				disabled={dis('letterSpacing')}
				{...SLIDER_PRESETS.letterSpacing}
			/>
			<CssEnumButtonGroup
				label={__('Text transform', 'onepress')}
				value={model.textTransform || ''}
				onChange={(v) => onPatch({ textTransform: v })}
				disabled={dis('textTransform')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'none', label: 'none' },
					{ value: 'uppercase', label: 'ABC' },
					{ value: 'lowercase', label: 'abc' },
					{ value: 'capitalize', label: 'Cap' },
				]}
			/>
			<CssEnumButtonGroup
				label={__('Text decoration', 'onepress')}
				value={model.textDecoration || ''}
				onChange={(v) => onPatch({ textDecoration: v })}
				disabled={dis('textDecoration')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'none', label: 'none' },
					{ value: 'underline', label: __('Underline', 'onepress') },
					{ value: 'line-through', label: __('Line through', 'onepress') },
				]}
			/>
			<CssEnumButtonGroup
				label={__('Text align', 'onepress')}
				value={model.textAlign || ''}
				onChange={(v) => onPatch({ textAlign: v })}
				disabled={dis('textAlign')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'left', label: __('Left', 'onepress') },
					{ value: 'center', label: __('Center', 'onepress') },
					{ value: 'right', label: __('Right', 'onepress') },
					{ value: 'justify', label: __('Justify', 'onepress') },
					{ value: 'start', label: 'start' },
					{ value: 'end', label: 'end' },
				]}
			/>
		</>
	);
}
