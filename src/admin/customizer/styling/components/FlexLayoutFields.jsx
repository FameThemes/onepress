/**
 * Flex container fields (when display is flex / inline-flex).
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CssEnumButtonGroup } from './CssEnumButtonGroup';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
export function FlexLayoutFields({ model, onPatch }) {
	return (
		<div className="subsection">
			<strong className="subsection-title">{__('Flex', 'onepress')}</strong>
			<CssEnumButtonGroup
				label={__('Flex direction', 'onepress')}
				value={model.flexDirection || ''}
				onChange={(v) => onPatch({ flexDirection: v })}
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
				{...SLIDER_PRESETS.gap}
			/>
			<ResponsiveUnitSliderField
				label={__('Row gap', 'onepress')}
				value={model.rowGap || ''}
				onChange={(v) => onPatch({ rowGap: v })}
				{...SLIDER_PRESETS.gap}
			/>
			<ResponsiveUnitSliderField
				label={__('Column gap', 'onepress')}
				value={model.columnGap || ''}
				onChange={(v) => onPatch({ columnGap: v })}
				{...SLIDER_PRESETS.gap}
			/>
		</div>
	);
}
