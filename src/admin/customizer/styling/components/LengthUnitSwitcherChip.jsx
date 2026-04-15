/**
 * Popover to pick default length unit (px / rem / em / %) for {@link ResponsiveUnitSliderField} and related controls.
 */
import { DropdownMenu, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { STYLING_LENGTH_UNIT_OPTIONS, useStylingLengthUnitOptional } from './StylingLengthUnitContext';
import { chevronDownSmall } from '@wordpress/icons';

export function LengthUnitSwitcherChip() {
	const ctx = useStylingLengthUnitOptional();
	if (!ctx) {
		return null;
	}
	const { preferredSuffix, setPreferredSuffix } = ctx;

	return (
		<DropdownMenu
			className="length-unit-dropdown"
			icon={
				<span className="length-unit-chip__label flex items-center" aria-hidden>
					<span className="text-xs font-medium">{preferredSuffix}</span>
					<Icon icon={chevronDownSmall} size={18} />
				</span>
			}
			label={__('Default length unit', 'onepress')}
			toggleProps={{
				size: 'small',
				variant: 'tertiary',
				// className: 'length-unit-chip device-chip',
			}}
			popoverProps={{
				className: 'length-unit-popover',
				placement: 'bottom',
				noArrow: false,
			}}
			controls={STYLING_LENGTH_UNIT_OPTIONS.map((opt) => ({
				title: opt.label,
				isActive: preferredSuffix === opt.suffix,
				onClick: () => setPreferredSuffix(opt.suffix),
			}))}
		/>
	);
}
