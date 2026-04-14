/**
 * Responsive field: row1 label + device chip; row2 RangeControl + CSS value input.
 */
import { RangeControl } from '@wordpress/components';
import {
	clampNumber,
	formatCssSingleLengthValue,
	parseCssSingleLengthValue,
} from '../cssUnitSlider';
import { ResponsiveFieldShell } from './ResponsiveFieldShell';

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {number} props.min
 * @param {number} props.max
 * @param {number} props.step
 * @param {string} props.defaultSuffix
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.embed] — omit label row + device chip (use inside grouped TRBL / shared header).
 * @param {boolean} [props.inputOnly] — text input only, no RangeControl (compact TRBL rows).
 */
export function ResponsiveUnitSliderField({
	label,
	help,
	value,
	onChange,
	min,
	max,
	step,
	defaultSuffix,
	disabled = false,
	embed = false,
	inputOnly = false,
}) {
	const parsed = parseCssSingleLengthValue(value, defaultSuffix);
	const canUseSlider = parsed !== null && !inputOnly;

	const sliderVal =
		canUseSlider && parsed ? clampNumber(parsed.num, min, max) : min;

	const onRangeChange = (n) => {
		if (!parsed || n === undefined || n === null || !Number.isFinite(n)) {
			return;
		}
		onChange(formatCssSingleLengthValue(n, parsed.suffix));
	};

	const onTextChange = (e) => {
		onChange(e.target.value);
	};

	const inner = (
		<div className={`unit-slider${canUseSlider ? ' has-range' : ''}${embed ? ' unit-slider--embed' : ''}`}>
			{canUseSlider ? (
				<>
					<RangeControl
						className="unit-range-field"
						label={label}
						hideLabelFromVision
						value={sliderVal}
						onChange={onRangeChange}
						min={min}
						max={max}
						step={step}
						disabled={disabled}
						withInputField={false}
						__nextHasNoMarginBottom
					/>
					<input
						className="unit-input components-text-control__input"
						type="text"
						value={value}
						onChange={onTextChange}
						disabled={disabled}
						aria-label={label}
					/>
				</>
			) : (
				<input
					className="unit-input is-full components-text-control__input"
					type="text"
					value={value}
					onChange={onTextChange}
					disabled={disabled}
					aria-label={label}
				/>
			)}
		</div>
	);

	if (embed) {
		return inner;
	}

	return (
		<ResponsiveFieldShell label={label} help={help}>
			{inner}
		</ResponsiveFieldShell>
	);
}
