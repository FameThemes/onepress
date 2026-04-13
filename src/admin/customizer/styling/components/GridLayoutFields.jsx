/**
 * Grid container fields (when display is grid / inline-grid).
 */
import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CssEnumButtonGroup } from './CssEnumButtonGroup';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { ResponsiveFieldShell } from './ResponsiveFieldShell';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { areAllKeysDisabled, isFieldDisabled } from '../stylingDisableFields';

const GRID_KEYS = ['gridTemplateColumns', 'gridTemplateRows', 'gridAutoFlow', 'justifyItems', 'gap'];

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function GridLayoutFields({ model, onPatch, disabledFieldSet }) {
	if (areAllKeysDisabled(disabledFieldSet, GRID_KEYS)) {
		return null;
	}
	const dis = (k) => isFieldDisabled(disabledFieldSet, k);
	return (
		<div className="subsection">
			<strong className="subsection-title">{__('Grid', 'onepress')}</strong>
			<ResponsiveFieldShell label={__('Grid template columns', 'onepress')}>
				<TextareaControl
					value={model.gridTemplateColumns || ''}
					onChange={(v) => onPatch({ gridTemplateColumns: v })}
					disabled={dis('gridTemplateColumns')}
					rows={2}
				/>
			</ResponsiveFieldShell>
			<ResponsiveFieldShell label={__('Grid template rows', 'onepress')}>
				<TextareaControl
					value={model.gridTemplateRows || ''}
					onChange={(v) => onPatch({ gridTemplateRows: v })}
					disabled={dis('gridTemplateRows')}
					rows={2}
				/>
			</ResponsiveFieldShell>
			<CssEnumButtonGroup
				label={__('Grid auto flow', 'onepress')}
				value={model.gridAutoFlow || ''}
				onChange={(v) => onPatch({ gridAutoFlow: v })}
				disabled={dis('gridAutoFlow')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'row', label: 'row' },
					{ value: 'column', label: 'column' },
					{ value: 'dense', label: 'dense' },
					{ value: 'row dense', label: 'row dense' },
				]}
			/>
			<CssEnumButtonGroup
				label={__('Justify items', 'onepress')}
				value={model.justifyItems || ''}
				onChange={(v) => onPatch({ justifyItems: v })}
				disabled={dis('justifyItems')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'start', label: 'start' },
					{ value: 'end', label: 'end' },
					{ value: 'center', label: 'center' },
					{ value: 'stretch', label: 'stretch' },
				]}
			/>
			<ResponsiveUnitSliderField
				label={__('Gap', 'onepress')}
				value={model.gap || ''}
				onChange={(v) => onPatch({ gap: v })}
				disabled={dis('gap')}
				{...SLIDER_PRESETS.gap}
			/>
		</div>
	);
}
