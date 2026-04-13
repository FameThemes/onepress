/**
 * Background group: type color | image | gradient; image extras only for image.
 */
import { BaseControl, GradientPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { CssEnumButtonGroup } from './CssEnumButtonGroup';
import { StylingAlphaColorControl } from './StylingAlphaColorControl';
import { StylingBackgroundImageControl } from './StylingBackgroundImageControl';

/** @type {'color' | 'image' | 'gradient'} */
const BG_TYPE_COLOR = 'color';
const BG_TYPE_IMAGE = 'image';
const BG_TYPE_GRADIENT = 'gradient';

const DEFAULT_GRADIENT =
	'linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)';

/**
 * @param {string} s
 * @returns {boolean}
 */
function isCssGradientBackground(s) {
	const t = String(s || '').trim();
	if (!t || /^none$/i.test(t)) {
		return false;
	}
	const lower = t.toLowerCase();
	return (
		lower.includes('linear-gradient') ||
		lower.includes('radial-gradient') ||
		lower.includes('conic-gradient') ||
		lower.includes('repeating-linear-gradient') ||
		lower.includes('repeating-radial-gradient')
	);
}

/**
 * @param {string} s
 * @returns {boolean}
 */
function isCssUrlBackground(s) {
	const t = String(s || '').trim();
	if (!t || /^none$/i.test(t)) {
		return false;
	}
	return t.toLowerCase().includes('url(');
}

/**
 * @param {Record<string, string>} model
 * @returns {'color' | 'image' | 'gradient'}
 */
function inferBackgroundType(model) {
	const img = String(model.backgroundImage || '').trim();
	if (isCssGradientBackground(img)) {
		return BG_TYPE_GRADIENT;
	}
	if (isCssUrlBackground(img)) {
		return BG_TYPE_IMAGE;
	}
	return BG_TYPE_COLOR;
}

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
export function BackgroundFields({ sliceKey, model, onPatch }) {
	const inferred = inferBackgroundType(model);
	const [uiType, setUiType] = useState(inferred);

	useEffect(() => {
		setUiType(inferBackgroundType(model));
	}, [sliceKey]);

	const clearImageLayerFields = useCallback(() => {
		return {
			backgroundImage: '',
			backgroundPosition: '',
			backgroundSize: '',
			backgroundRepeat: '',
			backgroundAttachment: '',
		};
	}, []);

	const applyTypeChange = useCallback(
		(/** @type {'color'|'image'|'gradient'} */ next) => {
			const cur = inferBackgroundType(model);
			if (next === cur) {
				return;
			}
			if (next === BG_TYPE_COLOR) {
				onPatch(clearImageLayerFields());
				return;
			}
			if (next === BG_TYPE_IMAGE) {
				if (cur === BG_TYPE_GRADIENT) {
					onPatch(clearImageLayerFields());
				}
				return;
			}
			if (next === BG_TYPE_GRADIENT && cur !== BG_TYPE_GRADIENT) {
				onPatch({
					backgroundImage: DEFAULT_GRADIENT,
					backgroundPosition: '',
					backgroundSize: '',
					backgroundRepeat: '',
					backgroundAttachment: '',
				});
			}
		},
		[clearImageLayerFields, model, onPatch]
	);

	const onBackgroundTypeChange = useCallback(
		(/** @type {string} */ next) => {
			const t =
				next === BG_TYPE_IMAGE || next === BG_TYPE_GRADIENT
					? next
					: BG_TYPE_COLOR;
			setUiType(t);
			applyTypeChange(t);
		},
		[applyTypeChange]
	);

	const onGradientChange = useCallback(
		(/** @type {string | undefined} */ g) => {
			const v = g || '';
			onPatch({ backgroundImage: v });
			if (!v) {
				setUiType(BG_TYPE_COLOR);
			}
		},
		[onPatch]
	);

	const gradientValue =
		model.backgroundImage && isCssGradientBackground(model.backgroundImage)
			? model.backgroundImage
			: DEFAULT_GRADIENT;

	return (
		<>
			<CssEnumButtonGroup
				label={__('Background type', 'onepress')}
				value={uiType}
				onChange={onBackgroundTypeChange}
				options={[
					{ value: BG_TYPE_COLOR, label: __('Color', 'onepress') },
					{ value: BG_TYPE_IMAGE, label: __('Image', 'onepress') },
					{ value: BG_TYPE_GRADIENT, label: __('Gradient', 'onepress') },
				]}
			/>

			{uiType === BG_TYPE_COLOR ? (
				<StylingAlphaColorControl
					label={__('Background color', 'onepress')}
					value={model.backgroundColor || ''}
					onChange={(v) => onPatch({ backgroundColor: v })}
				/>
			) : null}

			{uiType === BG_TYPE_IMAGE ? (
				<>
					<BaseControl label={__('Background image', 'onepress')}>
						<StylingBackgroundImageControl
							backgroundImage={model.backgroundImage || ''}
							backgroundPosition={model.backgroundPosition || ''}
							onPatch={onPatch}
						/>
					</BaseControl>
					{isCssUrlBackground(model.backgroundImage) ? (
						<>
							<CssEnumButtonGroup
								label={__('Background size', 'onepress')}
								value={model.backgroundSize || ''}
								onChange={(v) => onPatch({ backgroundSize: v })}
								options={[
									{ value: '', label: __('Default', 'onepress') },
									{ value: 'auto', label: 'auto' },
									{ value: 'cover', label: 'cover' },
									{ value: 'contain', label: 'contain' },
								]}
							/>
							<CssEnumButtonGroup
								label={__('Background repeat', 'onepress')}
								value={model.backgroundRepeat || ''}
								onChange={(v) => onPatch({ backgroundRepeat: v })}
								options={[
									{ value: '', label: __('Default', 'onepress') },
									{ value: 'no-repeat', label: 'no-repeat' },
									{ value: 'repeat', label: 'repeat' },
									{ value: 'repeat-x', label: 'repeat-x' },
									{ value: 'repeat-y', label: 'repeat-y' },
								]}
							/>
							<CssEnumButtonGroup
								label={__('Background attachment', 'onepress')}
								value={model.backgroundAttachment || ''}
								onChange={(v) => onPatch({ backgroundAttachment: v })}
								options={[
									{ value: '', label: __('Default', 'onepress') },
									{ value: 'scroll', label: 'scroll' },
									{ value: 'fixed', label: 'fixed' },
									{ value: 'local', label: 'local' },
								]}
							/>
						</>
					) : null}
				</>
			) : null}

			{uiType === BG_TYPE_GRADIENT ? (
				<BaseControl label={__('Background gradient', 'onepress')}>
					<GradientPicker
						__experimentalIsRenderedInSidebar
						value={gradientValue}
						onChange={onGradientChange}
						gradients={[]}
						aria-label={__('Background gradient', 'onepress')}
					/>
				</BaseControl>
			) : null}
		</>
	);
}
