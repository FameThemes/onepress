/**
 * Text group fields (typography).
 *
 * `disabledFieldSet` holds **declaration model** keys (camelCase: `fontSize`, `lineHeight`, …),
 * matching `declarationForm.js` and `onPatch`. PHP `disable_fields` uses tokens after `sanitize_key()` (lowercase,
 * underscores/hyphens kept — it does not turn `_` into `-`); `buildDisabledFieldSet()` maps those tokens onto the same model keys.
 * Typography length sliders omit the row when disabled (same as font family / text color), because `RangeControl` would still show a label row.
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
import { StylingLocalFontFamilyControl } from './StylingLocalFontFamilyControl';
import { isFieldDisabled } from '../stylingDisableFields';

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {import('../googleFontCollection').PickerFontFamily[]} props.families — Google catalog (picker when source is google)
 * @param {import('../googleFontCollection').PickerFontFamily[]} [props.localFontFamilies] — Font manager list (picker when source is local)
 * @param {import('../googleFontCollection').PickerFontFamily[]} [props.faceResolveFamilies] — merged local + Google for weight/style + font slices
 * @param {'google'|'local'} [props.fontFamilySource]
 * @param {boolean} [props.fontsLoading]
 * @param {Error | null} [props.fontsError]
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function TextStyleFields({
	model,
	onPatch,
	families,
	localFontFamilies,
	faceResolveFamilies,
	fontFamilySource = 'local',
	fontsLoading = false,
	fontsError = null,
	disabledFieldSet,
}) {
	const googleList = families ?? mergePickerFamilies(null);
	const resolveList = faceResolveFamilies ?? googleList;
	const localList = localFontFamilies ?? [];
	const loading = fontsLoading;
	const error = fontsError;
	const d = disabledFieldSet;
	/** @param {string} modelKey — camelCase model property, not raw PHP token */
	const dis = (modelKey) => isFieldDisabled(d, modelKey);

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
					{fontFamilySource === 'local' ? (
						<StylingLocalFontFamilyControl
							value={model.fontFamily || ''}
							onPatch={onPatch}
							families={localList}
						/>
					) : (
						<StylingGoogleFontFamilyControl
							value={model.fontFamily || ''}
							onPatch={onPatch}
							families={googleList}
							loading={loading}
							error={error}
						/>
					)}
					{fontFamilySource !== 'local' && error && !loading ? (
						<TextControl
							__nextHasNoMarginBottom
							label={__('Font family (CSS fallback)', 'onepress')}
							value={model.fontFamily || ''}
							onChange={(v) => onPatch({ fontFamily: v })}
						/>
					) : null}
				</BaseControl>
			)}
			<StylingFontFaceSelectControls model={model} onPatch={onPatch} families={resolveList} disabledFieldSet={d} />
			{dis('fontSize')
				? null
				: (
						<ResponsiveUnitSliderField
							label={__('Font size', 'onepress')}
							{...SLIDER_PRESETS.fontSize}
							value={model.fontSize || ''}
							onChange={(v) => onPatch({ fontSize: v })}
						/>
					)}
			{dis('lineHeight')
				? null
				: (
						<ResponsiveUnitSliderField
							label={__('Line height', 'onepress')}
							{...SLIDER_PRESETS.lineHeight}
							value={model.lineHeight || ''}
							onChange={(v) => onPatch({ lineHeight: v })}
						/>
					)}
			{dis('letterSpacing')
				? null
				: (
						<ResponsiveUnitSliderField
							label={__('Letter spacing', 'onepress')}
							{...SLIDER_PRESETS.letterSpacing}
							value={model.letterSpacing || ''}
							onChange={(v) => onPatch({ letterSpacing: v })}
						/>
					)}
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
