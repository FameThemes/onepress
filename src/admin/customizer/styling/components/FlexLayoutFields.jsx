/**
 * Flex container fields (when display is flex / inline-flex).
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CssEnumButtonGroup } from './CssEnumButtonGroup';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { areAllKeysDisabled, isFieldDisabled } from '../stylingDisableFields';

const FLEX_KEYS = [
	'flexDirection',
	'flexWrap',
	'justifyContent',
	'alignItems',
	'alignContent',
	'gap',
	'rowGap',
	'columnGap',
];

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function FlexLayoutFields({ model, onPatch, disabledFieldSet }) {
	if (areAllKeysDisabled(disabledFieldSet, FLEX_KEYS)) {
		return null;
	}
	const dis = (k) => isFieldDisabled(disabledFieldSet, k);
	return (
		<div className="subsection">
			<strong className="subsection-title">{__('Flex', 'onepress')}</strong>
			<CssEnumButtonGroup
				label={__('Flex direction', 'onepress')}
				value={model.flexDirection || ''}
				onChange={(v) => onPatch({ flexDirection: v })}
				disabled={dis('flexDirection')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'row', label: 'row' },
					{ value: 'row-reverse', label: 'row-rev' },
					{ value: 'column', label: 'column' },
					{ value: 'column-reverse', label: 'col-rev' },
				]}
			/>
			<CssEnumButtonGroup
				label={__('Flex wrap', 'onepress')}
				value={model.flexWrap || ''}
				onChange={(v) => onPatch({ flexWrap: v })}
				disabled={dis('flexWrap')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'nowrap', label: 'nowrap' },
					{ value: 'wrap', label: 'wrap' },
					{ value: 'wrap-reverse', label: 'wrap-rev' },
				]}
			/>
			<CssEnumButtonGroup
				label={__('Justify content', 'onepress')}
				value={model.justifyContent || ''}
				onChange={(v) => onPatch({ justifyContent: v })}
				disabled={dis('justifyContent')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'flex-start', label: 'start' },
					{ value: 'center', label: 'center' },
					{ value: 'flex-end', label: 'end' },
					{ value: 'space-between', label: 'between' },
					{ value: 'space-around', label: 'around' },
				]}
			/>
			<CssEnumButtonGroup
				label={__('Align items', 'onepress')}
				value={model.alignItems || ''}
				onChange={(v) => onPatch({ alignItems: v })}
				disabled={dis('alignItems')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'stretch', label: 'stretch' },
					{ value: 'flex-start', label: 'start' },
					{ value: 'center', label: 'center' },
					{ value: 'flex-end', label: 'end' },
					{ value: 'baseline', label: 'baseline' },
				]}
			/>
			<CssEnumButtonGroup
				label={__('Align content', 'onepress')}
				value={model.alignContent || ''}
				onChange={(v) => onPatch({ alignContent: v })}
				disabled={dis('alignContent')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'flex-start', label: 'start' },
					{ value: 'center', label: 'center' },
					{ value: 'flex-end', label: 'end' },
					{ value: 'space-between', label: 'between' },
				]}
			/>
			<ResponsiveUnitSliderField
				label={__('Gap', 'onepress')}
				value={model.gap || ''}
				onChange={(v) => onPatch({ gap: v })}
				disabled={dis('gap')}
				{...SLIDER_PRESETS.gap}
			/>
			<ResponsiveUnitSliderField
				label={__('Row gap', 'onepress')}
				value={model.rowGap || ''}
				onChange={(v) => onPatch({ rowGap: v })}
				disabled={dis('rowGap')}
				{...SLIDER_PRESETS.gap}
			/>
			<ResponsiveUnitSliderField
				label={__('Column gap', 'onepress')}
				value={model.columnGap || ''}
				onChange={(v) => onPatch({ columnGap: v })}
				disabled={dis('columnGap')}
				{...SLIDER_PRESETS.gap}
			/>
		</div>
	);
}
