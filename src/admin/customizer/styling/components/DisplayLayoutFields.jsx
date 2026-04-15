/**
 * Display, visibility, box model, overflow, flex/grid subsections.
 */
import { RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { clampNumber, SLIDER_PRESETS } from '../cssUnitSlider';
import { CssEnumButtonGroup } from './CssEnumButtonGroup';
import { FlexLayoutFields } from './FlexLayoutFields';
import { GridLayoutFields } from './GridLayoutFields';
import { InsetSidesFields } from './InsetSidesFields';
import { ResponsiveFieldShell } from './ResponsiveFieldShell';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { isFieldDisabled } from '../stylingDisableFields';

const Z_INDEX_MIN = -100;
const Z_INDEX_MAX = 99999;

const OPACITY_KW =
	/^(inherit|initial|revert|revert-layer|unset)$/i;

/**
 * @param {string} raw
 * @returns {boolean}
 */
function canUseOpacityRange(raw) {
	const t = String(raw || '').trim();
	if (t === '') {
		return true;
	}
	if (OPACITY_KW.test(t)) {
		return false;
	}
	if (/^(-?(?:\d+\.?\d*|\.\d+))%$/.test(t)) {
		const n = parseFloat(t) / 100;
		return Number.isFinite(n);
	}
	return /^-?(?:\d+\.?\d*|\.\d+)$/.test(t);
}

/**
 * @param {string} raw
 * @returns {number} 0–1 for RangeControl
 */
function opacitySliderValue(raw) {
	const t = String(raw || '').trim();
	if (t === '') {
		return 1;
	}
	const pct = t.match(/^(-?(?:\d+\.?\d*|\.\d+))%$/);
	if (pct) {
		const n = parseFloat(pct[1]) / 100;
		return clampNumber(Number.isFinite(n) ? n : 0, 0, 1);
	}
	const n = parseFloat(t);
	if (!Number.isFinite(n)) {
		return 0;
	}
	return clampNumber(n, 0, 1);
}

/**
 * @param {number} n
 * @returns {string}
 */
function formatOpacityCss(n) {
	const r = Math.round(Math.min(1, Math.max(0, n)) * 1000) / 1000;
	return Number.isInteger(r) ? String(r) : String(r);
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {boolean} [props.disabled]
 */
function OpacityRangeField({ label, help, value, onChange, disabled = false }) {
	const raw = String(value ?? '');
	const canRange = canUseOpacityRange(raw);
	const sliderVal = opacitySliderValue(raw);

	return (
		<ResponsiveFieldShell label={label} help={help}>
			<div className={`unit-slider${canRange ? ' has-range' : ''}`}>
				{canRange ? (
					<>
						<RangeControl
							className="unit-range-field"
							label={label}
							hideLabelFromVision
							value={sliderVal}
							onChange={(n) => {
								if (n === undefined || n === null || !Number.isFinite(n)) {
									return;
								}
								onChange(formatOpacityCss(n));
							}}
							min={0}
							max={1}
							step={0.01}
							withInputField={false}
							__nextHasNoMarginBottom
							disabled={disabled}
						/>
						<input
							className="unit-input components-text-control__input"
							type="text"
							value={raw}
							onChange={(e) => onChange(e.target.value)}
							aria-label={label}
							disabled={disabled}
						/>
					</>
				) : (
					<input
						className="unit-input is-full components-text-control__input"
						type="text"
						value={raw}
						onChange={(e) => onChange(e.target.value)}
						aria-label={label}
						disabled={disabled}
					/>
				)}
			</div>
		</ResponsiveFieldShell>
	);
}

/**
 * @param {string} raw
 * @returns {number | null} integer only; null for empty, auto, or non-integer
 */
function parseZIndexInt(raw) {
	const s = String(raw || '').trim();
	if (s === '' || /^auto$/i.test(s)) {
		return null;
	}
	if (!/^-?\d+$/.test(s)) {
		return null;
	}
	const n = parseInt(s, 10);
	return Number.isFinite(n) ? n : null;
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {boolean} [props.disabled]
 */
function ZIndexRangeField({ label, value, onChange, disabled = false }) {
	const raw = String(value ?? '');
	const trimmed = raw.trim();
	const isAuto = /^auto$/i.test(trimmed);
	const zi = parseZIndexInt(raw);
	const canRange = !isAuto && (zi !== null || trimmed === '');
	const sliderVal =
		zi !== null ? clampNumber(zi, Z_INDEX_MIN, Z_INDEX_MAX) : 0;

	return (
		<ResponsiveFieldShell label={label}>
			<div className={`unit-slider${canRange ? ' has-range' : ''}`}>
				{canRange ? (
					<>
						<RangeControl
							className="unit-range-field"
							label={label}
							hideLabelFromVision
							value={sliderVal}
							onChange={(n) => {
								if (n === undefined || n === null || !Number.isFinite(n)) {
									return;
								}
								onChange(String(Math.round(n)));
							}}
							min={Z_INDEX_MIN}
							max={Z_INDEX_MAX}
							step={1}
							withInputField={false}
							__nextHasNoMarginBottom
							disabled={disabled}
						/>
						<input
							className="unit-input components-text-control__input"
							type="text"
							value={raw}
							onChange={(e) => onChange(e.target.value)}
							aria-label={label}
							disabled={disabled}
						/>
					</>
				) : (
					<input
						className="unit-input is-full components-text-control__input"
						type="text"
						value={raw}
						onChange={(e) => onChange(e.target.value)}
						aria-label={label}
						disabled={disabled}
					/>
				)}
			</div>
		</ResponsiveFieldShell>
	);
}

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function DisplayLayoutFields({ model, onPatch, disabledFieldSet }) {
	const displayVal = (model.display || '').toLowerCase();
	const isFlex = displayVal === 'flex' || displayVal === 'inline-flex';
	const isGrid = displayVal === 'grid' || displayVal === 'inline-grid';
	const showPositionExtras = ['relative', 'absolute', 'fixed', 'sticky'].includes(
		(model.position || '').toLowerCase()
	);
	const dis = (k) => isFieldDisabled(disabledFieldSet, k);

	return (
		<>
			<SelectControl
				label={__('Display', 'onepress')}
				value={model.display || ''}
				onChange={(v) => onPatch({ display: v })}
				disabled={dis('display')}
				options={[
					{ label: __('Default', 'onepress'), value: '' },
					{ label: 'none', value: 'none' },
					{ label: 'block', value: 'block' },
					{ label: 'inline', value: 'inline' },
					{ label: 'inline-block', value: 'inline-block' },
					{ label: 'flex', value: 'flex' },
					{ label: 'inline-flex', value: 'inline-flex' },
					{ label: 'grid', value: 'grid' },
					{ label: 'inline-grid', value: 'inline-grid' },
				]}
				__nextHasNoMarginBottom
			/>
			<CssEnumButtonGroup
				label={__('Visibility', 'onepress')}
				value={model.visibility || ''}
				onChange={(v) => onPatch({ visibility: v })}
				disabled={dis('visibility')}
				options={[
					{ value: '', label: __('Default', 'onepress') },
					{ value: 'visible', label: 'visible' },
					{ value: 'hidden', label: 'hidden' },
				]}
			/>
			{dis('opacity') ? null : (
				<OpacityRangeField
					label={__('Opacity', 'onepress')}
					value={model.opacity || ''}
					onChange={(v) => onPatch({ opacity: v })}
				/>
			)}
			<SelectControl
				label={__('Position', 'onepress')}
				value={model.position || ''}
				onChange={(v) => onPatch({ position: v })}
				disabled={dis('position')}
				options={[
					{ label: __('Default', 'onepress'), value: '' },
					{ label: 'static', value: 'static' },
					{ label: 'relative', value: 'relative' },
					{ label: 'absolute', value: 'absolute' },
					{ label: 'fixed', value: 'fixed' },
					{ label: 'sticky', value: 'sticky' },
				]}
				__nextHasNoMarginBottom
			/>
			{showPositionExtras ? (
				<InsetSidesFields model={model} onPatch={onPatch} disabledFieldSet={disabledFieldSet} />
			) : null}
			<ResponsiveUnitSliderField
				label={__('Width', 'onepress')}
				value={model.width || ''}
				onChange={(v) => onPatch({ width: v })}
				disabled={dis('width')}
				{...SLIDER_PRESETS.lengthWide}
			/>
			<ResponsiveUnitSliderField
				label={__('Height', 'onepress')}
				value={model.height || ''}
				onChange={(v) => onPatch({ height: v })}
				disabled={dis('height')}
				{...SLIDER_PRESETS.lengthWide}
			/>
			<ZIndexRangeField
				label={__('Z-index', 'onepress')}
				value={model.zIndex || ''}
				onChange={(v) => onPatch({ zIndex: v })}
				disabled={dis('zIndex')}
			/>
			<SelectControl
				label={__('Overflow', 'onepress')}
				value={model.overflow || ''}
				onChange={(v) => onPatch({ overflow: v })}
				disabled={dis('overflow')}
				options={[
					{ label: __('Default', 'onepress'), value: '' },
					{ label: 'visible', value: 'visible' },
					{ label: 'hidden', value: 'hidden' },
					{ label: 'scroll', value: 'scroll' },
					{ label: 'auto', value: 'auto' },
				]}
				__nextHasNoMarginBottom
			/>
			{isFlex ? (
				<FlexLayoutFields model={model} onPatch={onPatch} disabledFieldSet={disabledFieldSet} />
			) : null}
			{isGrid ? (
				<GridLayoutFields model={model} onPatch={onPatch} disabledFieldSet={disabledFieldSet} />
			) : null}
		</>
	);
}
