/**
 * Top / right / bottom / left text fields with optional “link all sides”.
 */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { deriveLinkedSides } from './deriveLinkedSides';
import { DeviceSwitcherChip } from './DeviceSwitcherChip';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { TrblLinkIconButton } from './TrblLinkIconButton';
import { areAllKeysDisabled } from '../stylingDisableFields';

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {string} props.label
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {{ t: string, r: string, b: string, l: string }} props.keys
 * @param {{ min: number, max: number, step: number, defaultSuffix: string }} [props.sliderPreset] — spread to each slider (default: SLIDER_PRESETS.length)
 * @param {string} [props.linkLabel]
 * @param {string} [props.unlinkLabel]
 * @param {boolean} [props.preferLinkedWhenEmpty] — when all four values are empty, show linked UI (default false)
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function resolveLinkedState(model, keyList, preferLinkedWhenEmpty) {
	const derived = deriveLinkedSides(model, keyList);
	if (preferLinkedWhenEmpty) {
		const vals = keyList.map((k) => (model[k] || '').trim());
		if (vals.every((v) => !v)) {
			return true;
		}
	}
	return derived;
}

export function TrblSidesField({
	sliceKey,
	label,
	model,
	onPatch,
	keys,
	sliderPreset,
	linkLabel,
	unlinkLabel,
	preferLinkedWhenEmpty = false,
	disabledFieldSet,
}) {
	const preset = sliderPreset ?? SLIDER_PRESETS.length;
	const linkStr = linkLabel ?? __('Link sides', 'onepress');
	const unlinkStr = unlinkLabel ?? __('Unlink sides', 'onepress');
	const keyList = [keys.t, keys.r, keys.b, keys.l];
	const [linked, setLinked] = useState(() =>
		resolveLinkedState(model, keyList, preferLinkedWhenEmpty)
	);

	useEffect(() => {
		setLinked(resolveLinkedState(model, keyList, preferLinkedWhenEmpty));
		// eslint-disable-next-line react-hooks/exhaustive-deps -- reset when switching state×device
	}, [sliceKey]);

	if (areAllKeysDisabled(disabledFieldSet, keyList)) {
		return null;
	}

	const patchSide = (side, val) => {
		if (linked) {
			onPatch({
				[keys.t]: val,
				[keys.r]: val,
				[keys.b]: val,
				[keys.l]: val,
			});
		} else {
			onPatch({ [side]: val });
		}
	};

	const setLinkedSides = (on) => {
		setLinked(on);
		if (on) {
			const v = (model[keys.t] || model[keys.r] || model[keys.b] || model[keys.l] || '').trim();
			onPatch({
				[keys.t]: v,
				[keys.r]: v,
				[keys.b]: v,
				[keys.l]: v,
			});
		}
	};

	return (
		<div className="trbl-block">
			<div className="trbl-head">
				<strong>{label}</strong>
				<TrblLinkIconButton
					linked={linked}
					onLinkedChange={setLinkedSides}
					linkLabel={linkStr}
					unlinkLabel={unlinkStr}
				/>
			</div>
			<div className="trbl">
				{linked ? (
					<ResponsiveUnitSliderField
						label={__('Value', 'onepress')}
						value={
							(model[keys.t] || model[keys.r] || model[keys.b] || model[keys.l] || '').trim()
						}
						onChange={(v) => patchSide(keys.t, v)}
						{...preset}
					/>
				) : (
					<>
						<ResponsiveUnitSliderField
							label={__('Top', 'onepress')}
							value={model[keys.t] || ''}
							onChange={(v) => patchSide(keys.t, v)}
							{...preset}
						/>
						<ResponsiveUnitSliderField
							label={__('Right', 'onepress')}
							value={model[keys.r] || ''}
							onChange={(v) => patchSide(keys.r, v)}
							{...preset}
						/>
						<ResponsiveUnitSliderField
							label={__('Bottom', 'onepress')}
							value={model[keys.b] || ''}
							onChange={(v) => patchSide(keys.b, v)}
							{...preset}
						/>
						<ResponsiveUnitSliderField
							label={__('Left', 'onepress')}
							value={model[keys.l] || ''}
							onChange={(v) => patchSide(keys.l, v)}
							{...preset}
						/>
					</>
				)}
			</div>
		</div>
	);
}

/**
 * TRBL with header row `[title] … [device]` and one row `[T][R][B][L][link]`.
 * Same props as {@link TrblSidesField}.
 */
export function TrblSidesFieldInline({
	sliceKey,
	label,
	model,
	onPatch,
	keys,
	sliderPreset,
	linkLabel,
	unlinkLabel,
	preferLinkedWhenEmpty = false,
	disabledFieldSet,
}) {
	const preset = sliderPreset ?? SLIDER_PRESETS.length;
	const linkStr = linkLabel ?? __('Link sides', 'onepress');
	const unlinkStr = unlinkLabel ?? __('Unlink sides', 'onepress');
	const keyList = [keys.t, keys.r, keys.b, keys.l];
	const [linked, setLinked] = useState(() =>
		resolveLinkedState(model, keyList, preferLinkedWhenEmpty)
	);

	useEffect(() => {
		setLinked(resolveLinkedState(model, keyList, preferLinkedWhenEmpty));
		// eslint-disable-next-line react-hooks/exhaustive-deps -- reset when switching state×device
	}, [sliceKey]);

	if (areAllKeysDisabled(disabledFieldSet, keyList)) {
		return null;
	}

	const patchSide = (side, val) => {
		if (linked) {
			onPatch({
				[keys.t]: val,
				[keys.r]: val,
				[keys.b]: val,
				[keys.l]: val,
			});
		} else {
			onPatch({ [side]: val });
		}
	};

	const setLinkedSides = (on) => {
		setLinked(on);
		if (on) {
			const v = (model[keys.t] || model[keys.r] || model[keys.b] || model[keys.l] || '').trim();
			onPatch({
				[keys.t]: v,
				[keys.r]: v,
				[keys.b]: v,
				[keys.l]: v,
			});
		}
	};

	return (
		<div className="trbl-block trbl-block--inline-layout">
			<div className="trbl-head-inline">
				<strong className="trbl-field-title">{label}</strong>
				<span className="trbl-head-inline__spacer" aria-hidden />
				<DeviceSwitcherChip />
			</div>
			<div className="trbl-inline-row">
				{linked ? (
					<>
						<div className="trbl-inline-cell trbl-inline-cell--linked">
							<ResponsiveUnitSliderField
								embed
								inputOnly
								label={__('Value', 'onepress')}
								value={
									(model[keys.t] || model[keys.r] || model[keys.b] || model[keys.l] || '').trim()
								}
								onChange={(v) => patchSide(keys.t, v)}
								{...preset}
							/>
						</div>
						<div className="trbl-inline-link">
							<TrblLinkIconButton
								linked={linked}
								onLinkedChange={setLinkedSides}
								linkLabel={linkStr}
								unlinkLabel={unlinkStr}
							/>
						</div>
					</>
				) : (
					<>
						{(['t', 'r', 'b', 'l']).map((sideKey) => {
							const k = keys[sideKey];
							const sideLabel =
								sideKey === 't'
									? __('Top', 'onepress')
									: sideKey === 'r'
										? __('Right', 'onepress')
										: sideKey === 'b'
											? __('Bottom', 'onepress')
											: __('Left', 'onepress');
							return (
								<div key={k} className="trbl-inline-cell">
									<ResponsiveUnitSliderField
										embed
										inputOnly
										label={sideLabel}
										value={model[k] || ''}
										onChange={(v) => patchSide(k, v)}
										{...preset}
									/>
									<span className="trbl-inline-side-label">{sideLabel}</span>
								</div>
							);
						})}
						<div className="trbl-inline-link">
							<TrblLinkIconButton
								linked={linked}
								onLinkedChange={setLinkedSides}
								linkLabel={linkStr}
								unlinkLabel={unlinkStr}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
