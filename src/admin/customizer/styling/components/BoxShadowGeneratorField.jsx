/**
 * Single box-shadow: offsets, blur, spread, opacity, inset, color → one CSS string.
 */
import { RangeControl, TextareaControl, ToggleControl } from '@wordpress/components';
import { colord } from 'colord';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	parseBoxShadow,
	patchLength,
	serializeBoxShadow,
} from '../boxShadowGenerator';
import {
	clampNumber,
	explicitLengthCssUnit,
	formatCssSingleLengthValue,
	parseCssSingleLengthValue,
	resolveEffectiveLengthSuffix,
	SLIDER_PRESETS,
} from '../cssUnitSlider';
import { DeviceSwitcherChip } from './DeviceSwitcherChip';
import { LengthUnitSwitcherChip } from './LengthUnitSwitcherChip';
import {
	STYLING_LENGTH_UNIT_SUFFIXES,
	useStylingLengthUnitOptional,
} from './StylingLengthUnitContext';
import { StylingAlphaColorControl } from './StylingAlphaColorControl';

/**
 * @param {object} props
 * @param {Record<string, string | number | boolean>} props.parts
 * @param {string} props.lengthKey
 * @param {string} props.label
 * @param {{ min: number, max: number, step: number, defaultSuffix: string }} props.preset
 * @param {(next: Record<string, string | number | boolean>) => void} props.onPartsChange
 */
function ShadowLengthRow({ parts, lengthKey, label, preset, onPartsChange }) {
	const lengthCtx = useStylingLengthUnitOptional();
	const effectiveSuffix = resolveEffectiveLengthSuffix(
		preset.defaultSuffix,
		lengthCtx?.preferredSuffix
	);
	const value = parts[lengthKey];
	const parsed = parseCssSingleLengthValue(value, effectiveSuffix);
	const canSlider = parsed !== null;
	const sliderVal =
		canSlider && parsed
			? clampNumber(parsed.num, preset.min, preset.max)
			: preset.min;

	const apply = (n) => {
		if (!parsed || n === undefined || n === null || !Number.isFinite(n)) {
			return;
		}
		onPartsChange(
			patchLength(parts, lengthKey, n, preset.min, preset.max, effectiveSuffix)
		);
	};

	const onText = (e) => {
		onPartsChange({ ...parts, [lengthKey]: e.target.value });
	};

	const onBlur = () => {
		let nextVal = value;
		const raw = String(value).trim();
		if (raw !== '') {
			const p = parseCssSingleLengthValue(value, effectiveSuffix);
			if (p !== null) {
				const normalized = formatCssSingleLengthValue(p.num, p.suffix);
				if (normalized !== value) {
					onPartsChange({ ...parts, [lengthKey]: normalized });
					nextVal = normalized;
				}
			}
		}
		if (preset.defaultSuffix !== '' && lengthCtx?.adoptSuffixFromValue) {
			const u = explicitLengthCssUnit(nextVal);
			if (u && STYLING_LENGTH_UNIT_SUFFIXES.has(u)) {
				lengthCtx.adoptSuffixFromValue(u);
			}
		}
	};

	return (
		<div className="flex flex-col">
			<span className="shgen-row-label">{label}</span>
			<div className={`shgen-row unit-slider${canSlider ? ' has-range' : ''}`}>

				{canSlider ? (
					<>
						<RangeControl
							className="unit-range-field"
							label={label}
							hideLabelFromVision
							value={sliderVal}
							onChange={apply}
							min={preset.min}
							max={preset.max}
							step={preset.step}
							withInputField={false}
							__nextHasNoMarginBottom
						/>
						<input
							className="unit-input components-text-control__input"
							type="text"
							value={value}
							onChange={onText}
							onBlur={onBlur}
							aria-label={label}
						/>
					</>
				) : (
					<input
						className="unit-input is-full components-text-control__input"
						type="text"
						value={value}
						onChange={onText}
						onBlur={onBlur}
						aria-label={label}
					/>
				)}
			</div>
		</div>
	);
}

/**
 * @param {object} props
 * @param {number} props.opacity
 * @param {(n: number) => void} props.onChange
 */
function ShadowOpacityRow({ opacity, onChange }) {
	const label = __('Opacity', 'onepress');
	const v = Math.min(1, Math.max(0, opacity));
	return (
		<div className="flex flex-col">
			<span className="shgen-row-label">{label}</span>
			<div className="shgen-row unit-slider has-range">
				<RangeControl
					className="unit-range-field"
					label={label}
					hideLabelFromVision
					value={v}
					onChange={(n) => {
						if (n === undefined || n === null || !Number.isFinite(n)) {
							return;
						}
						onChange(Math.min(1, Math.max(0, n)));
					}}
					min={0}
					max={1}
					step={0.01}
					withInputField={false}
					__nextHasNoMarginBottom
				/>
				<input
					className="unit-input components-text-control__input"
					type="text"
					value={String(Math.round(v * 1000) / 1000)}
					onChange={(e) => {
						const x = parseFloat(e.target.value);
						if (!Number.isFinite(x)) {
							return;
						}
						onChange(Math.min(1, Math.max(0, x)));
					}}
					aria-label={label}
				/>
			</div>
		</div>
	);
}

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 */
export function BoxShadowGeneratorField({ value, onChange }) {
	const parsed = useMemo(() => parseBoxShadow(value), [value]);

	if (!parsed.ok) {
		return (
			<div className="shgen-block trbl-block">
				<div className="trbl-head">
					<strong>{__('Box shadow', 'onepress')}</strong>
					<div className="trbl-head-actions">
						<DeviceSwitcherChip />
						<LengthUnitSwitcherChip />
					</div>
				</div>
				<p className="description unknown-hint">
					{__(
						'This value uses multiple shadows or a color the generator cannot parse. Edit it as CSS, or use a single shadow with a hex, rgb, hsl, or keyword color.',
						'onepress'
					)}
				</p>
				<TextareaControl value={parsed.raw} onChange={onChange} rows={3} />
			</div>
		);
	}

	const parts = {
		inset: parsed.inset,
		offsetX: parsed.offsetX,
		offsetY: parsed.offsetY,
		blur: parsed.blur,
		spread: parsed.spread,
		colorHex: parsed.colorHex,
		opacity: parsed.opacity,
	};

	const push = (nextParts) => {
		onChange(serializeBoxShadow(nextParts));
	};

	const colorComposite = colord(parts.colorHex).alpha(parts.opacity).toRgbString();

	return (
		<div className="shgen-block trbl-block">
			<div className="trbl-head">
				<strong>{__('Box shadow', 'onepress')}</strong>
				<div className="trbl-head-actions">
					<DeviceSwitcherChip />
					<LengthUnitSwitcherChip />
				</div>
			</div>
			<ShadowLengthRow
				label={__('Shift right', 'onepress')}
				parts={parts}
				lengthKey="offsetX"
				preset={SLIDER_PRESETS.boxShadowOffset}
				onPartsChange={push}
			/>
			<ShadowLengthRow
				label={__('Shift down', 'onepress')}
				parts={parts}
				lengthKey="offsetY"
				preset={SLIDER_PRESETS.boxShadowOffset}
				onPartsChange={push}
			/>
			<ShadowLengthRow
				label={__('Spread', 'onepress')}
				parts={parts}
				lengthKey="spread"
				preset={SLIDER_PRESETS.boxShadowSpread}
				onPartsChange={push}
			/>
			<ShadowLengthRow
				label={__('Blur', 'onepress')}
				parts={parts}
				lengthKey="blur"
				preset={SLIDER_PRESETS.boxShadowBlur}
				onPartsChange={push}
			/>
			<ShadowOpacityRow
				opacity={parts.opacity}
				onChange={(opacity) => push({ ...parts, opacity })}
			/>
			<div className="shgen-inset-toggle">
				<ToggleControl
					label={__('Inset', 'onepress')}
					checked={parts.inset}
					onChange={(inset) => push({ ...parts, inset })}
					__nextHasNoMarginBottom
				/>
			</div>
			<StylingAlphaColorControl
				label={__('Color', 'onepress')}
				value={colorComposite}
				enableAlpha={false}
				onChange={(css) => {
					const c = colord(css);
					if (!c.isValid()) {
						return;
					}
					push({
						...parts,
						colorHex: c.alpha(1).toHex(),
						opacity: c.alpha(),
					});
				}}
			/>
		</div>
	);
}
