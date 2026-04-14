/**
 * Responsive field: row1 label + unit + device chips; row2 RangeControl + CSS value input.
 */
import { RangeControl } from '@wordpress/components';
import { useCallback } from '@wordpress/element';
import {
	clampNumber,
	explicitLengthCssUnit,
	formatCssSingleLengthValue,
	parseCssSingleLengthValue,
	resolveEffectiveLengthSuffix,
} from '../cssUnitSlider';
import { ResponsiveFieldShell } from './ResponsiveFieldShell';
import {
	STYLING_LENGTH_UNIT_SUFFIXES,
	useStylingLengthUnitOptional,
} from './StylingLengthUnitContext';

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
 * @param {boolean} [props.showLengthUnitChip] — forwarded to shell when not embed (default true).
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
	showLengthUnitChip = true,
}) {
	const lengthCtx = useStylingLengthUnitOptional();
	const effectiveDefaultSuffix = resolveEffectiveLengthSuffix(
		defaultSuffix,
		lengthCtx?.preferredSuffix
	);
	const parsed = parseCssSingleLengthValue(value, effectiveDefaultSuffix);
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

	const onInputBlur = useCallback(() => {
		let nextVal = value;
		const raw = String(value).trim();
		if (raw !== '') {
			const p = parseCssSingleLengthValue(value, effectiveDefaultSuffix);
			if (p !== null) {
				const normalized = formatCssSingleLengthValue(p.num, p.suffix);
				if (normalized !== value) {
					onChange(normalized);
					nextVal = normalized;
				}
			}
		}
		if (defaultSuffix !== '' && lengthCtx?.adoptSuffixFromValue) {
			const u = explicitLengthCssUnit(nextVal);
			if (u && STYLING_LENGTH_UNIT_SUFFIXES.has(u)) {
				lengthCtx.adoptSuffixFromValue(u);
			}
		}
	}, [value, effectiveDefaultSuffix, onChange, defaultSuffix, lengthCtx]);

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
						onBlur={onInputBlur}
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
					onBlur={onInputBlur}
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
		<ResponsiveFieldShell label={label} help={help} showLengthUnitChip={showLengthUnitChip}>
			{inner}
		</ResponsiveFieldShell>
	);
}
