/**
 * Four corner radius inputs with “link corners”.
 */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SLIDER_PRESETS } from '../cssUnitSlider';
import { deriveLinkedSides } from './deriveLinkedSides';
import { ResponsiveUnitSliderField } from './ResponsiveUnitSliderField';
import { TrblLinkIconButton } from './TrblLinkIconButton';
import { areAllKeysDisabled } from '../stylingDisableFields';

const KEYS = {
	tl: 'borderTopLeftRadius',
	tr: 'borderTopRightRadius',
	br: 'borderBottomRightRadius',
	bl: 'borderBottomLeftRadius',
};

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
export function BorderRadiusField({ sliceKey, model, onPatch, disabledFieldSet }) {
	const keyList = [KEYS.tl, KEYS.tr, KEYS.br, KEYS.bl];
	const [linked, setLinked] = useState(() => deriveLinkedSides(model, keyList));

	useEffect(() => {
		setLinked(deriveLinkedSides(model, keyList));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sliceKey]);

	if (areAllKeysDisabled(disabledFieldSet, keyList)) {
		return null;
	}

	const patchCorner = (k, val) => {
		if (linked) {
			onPatch({
				[KEYS.tl]: val,
				[KEYS.tr]: val,
				[KEYS.br]: val,
				[KEYS.bl]: val,
			});
		} else {
			onPatch({ [k]: val });
		}
	};

	const setLinkedCorners = (on) => {
		setLinked(on);
		if (on) {
			const v = (
				model[KEYS.tl] ||
				model[KEYS.tr] ||
				model[KEYS.br] ||
				model[KEYS.bl] ||
				''
			).trim();
			onPatch({
				[KEYS.tl]: v,
				[KEYS.tr]: v,
				[KEYS.br]: v,
				[KEYS.bl]: v,
			});
		}
	};

	return (
		<div className="trbl-block">
			<div className="trbl-head">
				<strong>{__('Border radius', 'onepress')}</strong>
				<TrblLinkIconButton
					linked={linked}
					onLinkedChange={setLinkedCorners}
					linkLabel={__('Link corners', 'onepress')}
					unlinkLabel={__('Unlink corners', 'onepress')}
				/>
			</div>
			<div className="trbl">
				{linked ? (
					<ResponsiveUnitSliderField
						label={__('Value', 'onepress')}
						value={
							(
								model[KEYS.tl] ||
								model[KEYS.tr] ||
								model[KEYS.br] ||
								model[KEYS.bl] ||
								''
							).trim()
						}
						onChange={(v) => patchCorner(KEYS.tl, v)}
						{...SLIDER_PRESETS.radius}
					/>
				) : (
					<>
						<ResponsiveUnitSliderField
							label={__('Top left', 'onepress')}
							value={model[KEYS.tl] || ''}
							onChange={(v) => patchCorner(KEYS.tl, v)}
							{...SLIDER_PRESETS.radius}
						/>
						<ResponsiveUnitSliderField
							label={__('Top right', 'onepress')}
							value={model[KEYS.tr] || ''}
							onChange={(v) => patchCorner(KEYS.tr, v)}
							{...SLIDER_PRESETS.radius}
						/>
						<ResponsiveUnitSliderField
							label={__('Bottom right', 'onepress')}
							value={model[KEYS.br] || ''}
							onChange={(v) => patchCorner(KEYS.br, v)}
							{...SLIDER_PRESETS.radius}
						/>
						<ResponsiveUnitSliderField
							label={__('Bottom left', 'onepress')}
							value={model[KEYS.bl] || ''}
							onChange={(v) => patchCorner(KEYS.bl, v)}
							{...SLIDER_PRESETS.radius}
						/>
					</>
				)}
			</div>
		</div>
	);
}
