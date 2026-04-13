/**
 * Six accordion groups from plan: Text, Background, Spacing, Border, Shadow, Display.
 */
import { Panel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import {
	BackgroundFields,
	BorderOutlineFields,
	DisplayLayoutFields,
	PreservedPropertiesNotice,
	RawDeclarationsField,
	ShadowFields,
	SpacingFields,
	StylingGroupPanel,
	TextStyleFields,
} from './components';

/** @typedef {'text'|'background'|'spacing'|'border'|'shadow'|'display'|'raw'} StylingAccordionSectionId */
/** @typedef {StylingAccordionSectionId | null} StylingAccordionSection */

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {number} props.unknownCount
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {string} props.sliceKey — `${state}__${device}` to reset link toggles
 * @param {string} props.rawCss
 * @param {(v: string) => void} props.onRawChange
 * @param {import('./googleFontCollection').PickerFontFamily[] | undefined} [props.families]
 * @param {boolean | undefined} [props.fontsLoading]
 * @param {Error | null | undefined} [props.fontsError]
 */
export function StylingAccordionPanels({
	model,
	unknownCount,
	onPatch,
	sliceKey,
	rawCss,
	onRawChange,
	families,
	fontsLoading,
	fontsError,
}) {
	const [openSection, setOpenSection] = useState(/** @type {StylingAccordionSection} */ (null));

	/**
	 * List mode: every section row visible (collapsed). Focus mode: only the active section (expanded).
	 * @param {StylingAccordionSectionId} sectionId
	 * @returns {{ opened: boolean, onToggle: (next: boolean) => void } | null}
	 */
	const sectionPanelProps = useCallback(
		(sectionId) => {
			if (openSection !== null && openSection !== sectionId) {
				return null;
			}
			if (openSection === null) {
				return {
					opened: false,
					onToggle: (/** @type {boolean} */ next) => {
						if (next) {
							setOpenSection(sectionId);
						}
					},
				};
			}
			return {
				opened: true,
				onToggle: (/** @type {boolean} */ next) => {
					if (!next) {
						setOpenSection(null);
					}
				},
			};
		},
		[openSection]
	);

	const textP = sectionPanelProps('text');
	const backgroundP = sectionPanelProps('background');
	const spacingP = sectionPanelProps('spacing');
	const borderP = sectionPanelProps('border');
	const shadowP = sectionPanelProps('shadow');
	const displayP = sectionPanelProps('display');
	const rawP = sectionPanelProps('raw');

	return (
		<div className="panels">
			<PreservedPropertiesNotice count={unknownCount} />

			<Panel className={`acc-panel${openSection ? ' acc-panel--focus-section' : ''}`}>
				{textP ? (
					<StylingGroupPanel title={__('Text', 'onepress')} opened={textP.opened} onToggle={textP.onToggle}>
						<TextStyleFields
							model={model}
							onPatch={onPatch}
							families={families}
							fontsLoading={fontsLoading}
							fontsError={fontsError}
						/>
					</StylingGroupPanel>
				) : null}

				{backgroundP ? (
					<StylingGroupPanel title={__('Background', 'onepress')} opened={backgroundP.opened} onToggle={backgroundP.onToggle}>
						<BackgroundFields sliceKey={sliceKey} model={model} onPatch={onPatch} />
					</StylingGroupPanel>
				) : null}

				{spacingP ? (
					<StylingGroupPanel title={__('Spacing', 'onepress')} opened={spacingP.opened} onToggle={spacingP.onToggle}>
						<SpacingFields sliceKey={sliceKey} model={model} onPatch={onPatch} />
					</StylingGroupPanel>
				) : null}

				{borderP ? (
					<StylingGroupPanel title={__('Border & radius', 'onepress')} opened={borderP.opened} onToggle={borderP.onToggle}>
						<BorderOutlineFields sliceKey={sliceKey} model={model} onPatch={onPatch} />
					</StylingGroupPanel>
				) : null}

				{shadowP ? (
					<StylingGroupPanel title={__('Shadow', 'onepress')} opened={shadowP.opened} onToggle={shadowP.onToggle}>
						<ShadowFields model={model} onPatch={onPatch} />
					</StylingGroupPanel>
				) : null}

				{displayP ? (
					<StylingGroupPanel title={__('Display & layout', 'onepress')} opened={displayP.opened} onToggle={displayP.onToggle}>
						<DisplayLayoutFields model={model} onPatch={onPatch} />
					</StylingGroupPanel>
				) : null}

				{rawP ? (
					<StylingGroupPanel title={__('Custom declarations', 'onepress')} opened={rawP.opened} onToggle={rawP.onToggle}>
						<RawDeclarationsField value={rawCss} onChange={onRawChange} />
					</StylingGroupPanel>
				) : null}
			</Panel>
		</div>
	);
}
