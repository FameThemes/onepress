/**
 * Font weight / style: full CSS options for system fonts; Google fontFace when matched; else compact presets.
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';
import {
	findFamilyForModel,
	fontStylesForWeight,
	uniqueFontWeights,
} from '../googleFontCollection';
import { isFieldDisabled } from '../stylingDisableFields';

/** @typedef {import('../googleFontCollection').PickerFontFamily} PickerFontFamily */

/**
 * CSS font-weight values commonly used in authoring (keywords + 100–900 + inherit).
 * @returns {{ value: string, label: string }[]}
 */
function getSystemFontWeightOptions() {
	const numeric = [100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
		value: String(n),
		label: String(n),
	}));
	return [
		{ value: '', label: __('Default', 'onepress') },
		{ value: 'normal', label: 'normal' },
		{ value: 'bold', label: 'bold' },
		{ value: 'bolder', label: 'bolder' },
		{ value: 'lighter', label: 'lighter' },
		...numeric,
		{ value: 'inherit', label: 'inherit' },
	];
}

/**
 * CSS font-style keywords.
 * @returns {{ value: string, label: string }[]}
 */
function getSystemFontStyleOptions() {
	return [
		{ value: '', label: __('Default', 'onepress') },
		{ value: 'normal', label: 'normal' },
		{ value: 'italic', label: 'italic' },
		{ value: 'oblique', label: 'oblique' },
		{ value: 'inherit', label: 'inherit' },
	];
}

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {PickerFontFamily[] | null | undefined} props.families
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function StylingFontFaceSelectControls({ model, onPatch, families, disabledFieldSet }) {
	const disW = isFieldDisabled(disabledFieldSet, 'fontWeight');
	const disS = isFieldDisabled(disabledFieldSet, 'fontStyle');
	const matched = useMemo(
		() => findFamilyForModel(families, model.fontFamily || ''),
		[families, model.fontFamily]
	);

	const systemWeightOptions = useMemo(() => getSystemFontWeightOptions(), []);
	const systemStyleOptions = useMemo(() => getSystemFontStyleOptions(), []);

	const compactWeightOptions = useMemo(
		() => [
			{ value: '', label: __('Default', 'onepress') },
			{ value: '400', label: '400' },
			{ value: '500', label: '500' },
			{ value: '600', label: '600' },
			{ value: '700', label: '700' },
			{ value: 'normal', label: __('Normal', 'onepress') },
			{ value: 'bold', label: __('Bold', 'onepress') },
		],
		[]
	);
	const compactStyleOptions = useMemo(
		() => [
			{ value: '', label: __('Default', 'onepress') },
			{ value: 'normal', label: __('Normal', 'onepress') },
			{ value: 'italic', label: __('Italic', 'onepress') },
			{ value: 'oblique', label: __('Oblique', 'onepress') },
		],
		[]
	);

	const faces =
		matched && !matched.isSystem && matched.fontFace?.length ? matched.fontFace : null;

	const weightOptions = useMemo(() => {
		if (!faces) {
			return null;
		}
		const weights = uniqueFontWeights(faces);
		return [
			{ value: '', label: __('Default', 'onepress') },
			...weights.map((w) => ({ value: w, label: w })),
		];
	}, [faces]);

	const styleOptions = useMemo(() => {
		if (!faces) {
			return null;
		}
		const w = model.fontWeight ?? '';
		const styles = fontStylesForWeight(faces, w);
		if (!styles.length) {
			return [{ value: '', label: __('Default', 'onepress') }];
		}
		return [
			{ value: '', label: __('Default', 'onepress') },
			...styles.map((s) => ({ value: s, label: s })),
		];
	}, [faces, model.fontWeight]);

	useEffect(() => {
		if (!faces?.length) {
			return;
		}
		const weights = uniqueFontWeights(faces);
		const w = model.fontWeight === '' || model.fontWeight === undefined ? '' : String(model.fontWeight);
		if (w !== '' && !weights.includes(w)) {
			const nw = weights.includes('400') ? '400' : weights[0];
			const stList = fontStylesForWeight(faces, nw);
			onPatch({
				fontWeight: nw,
				fontStyle: stList.includes('normal') ? 'normal' : stList[0] || 'normal',
			});
		}
	}, [faces, matched?.slug, model.fontFamily, model.fontWeight, onPatch]);

	useEffect(() => {
		if (!faces?.length) {
			return;
		}
		const styles = fontStylesForWeight(faces, model.fontWeight);
		const st =
			model.fontStyle === '' || model.fontStyle === undefined ? '' : String(model.fontStyle);
		if (st !== '' && !styles.includes(st)) {
			onPatch({ fontStyle: styles[0] || 'normal' });
		}
	}, [faces, matched?.slug, model.fontFamily, model.fontWeight, model.fontStyle, onPatch]);

	if (disW && disS) {
		return null;
	}

	const selectWeightOptions = matched?.isSystem ? systemWeightOptions : faces ? weightOptions : null;
	const selectStyleOptions = matched?.isSystem ? systemStyleOptions : faces ? styleOptions : null;

	if (selectWeightOptions && selectStyleOptions) {
		return (
			<div className='flex gap-2 justify-between'>
				{disW ? null : (
					<SelectControl
						className='flex-1'
						__nextHasNoMarginBottom
						label={__('Font weight', 'onepress')}
						value={model.fontWeight ?? ''}
						options={selectWeightOptions}
						onChange={(v) => onPatch({ fontWeight: v })}
					/>
				)}
				{disS ? null : (
					<SelectControl
						className='flex-1'
						__nextHasNoMarginBottom
						label={__('Font style', 'onepress')}
						value={model.fontStyle ?? ''}
						options={selectStyleOptions}
						onChange={(v) => onPatch({ fontStyle: v })}
					/>
				)}
			</div>
		);
	}

	return (
		<div className='flex gap-2 justify-between'>
			{disW ? null : (
				<SelectControl
					className='flex-1'
					__nextHasNoMarginBottom
					label={__('Font weight', 'onepress')}
					value={model.fontWeight ?? ''}
					options={compactWeightOptions}
					onChange={(v) => onPatch({ fontWeight: v })}
				/>
			)}
			{disS ? null : (
				<SelectControl
					className='flex-1'
					__nextHasNoMarginBottom
					label={__('Font style', 'onepress')}
					value={model.fontStyle ?? ''}
					options={compactStyleOptions}
					onChange={(v) => onPatch({ fontStyle: v })}
				/>
			)}
		</div>
	);
}
