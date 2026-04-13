/**
 * Accordion groups: Text, Background, Spacing, Border, Shadow, Display, Custom (raw).
 */
import { Panel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
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

/** Canonical order when showing “all” groups. */
export const STYLING_PANEL_GROUP_IDS = [
	'text',
	'background',
	'spacing',
	'border',
	'shadow',
	'display',
	'raw',
];

/** @typedef {'text'|'background'|'spacing'|'border'|'shadow'|'display'|'raw'} StylingAccordionSectionId */
/** @typedef {StylingAccordionSectionId | null} StylingAccordionSection */

/**
 * @param {unknown} stylingGroups — from `control.params.styling_groups`; null/undefined = all
 * @returns {StylingAccordionSectionId[]}
 */
export function resolveAllowedGroupIds(stylingGroups) {
	if (!Array.isArray(stylingGroups) || stylingGroups.length === 0) {
		return [...STYLING_PANEL_GROUP_IDS];
	}
	const want = stylingGroups.map(String);
	const filtered = want.filter((id) => STYLING_PANEL_GROUP_IDS.includes(id));
	return filtered.length ? filtered : [...STYLING_PANEL_GROUP_IDS];
}

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
 * @param {string[] | null | undefined} [props.stylingGroups] — whitelist + order; omit/null = all
 * @param {Set<string> | null | undefined} [props.disabledFieldSet] — model keys / internal sentinels to hide
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
	stylingGroups,
	disabledFieldSet,
}) {
	const [openSection, setOpenSection] = useState(/** @type {StylingAccordionSection} */(null));

	const allowedIds = useMemo(() => resolveAllowedGroupIds(stylingGroups), [stylingGroups]);

	const singleGroupLocked = allowedIds.length === 1;

	const groupTitles = useMemo(
		() => ({
			text: __('Text', 'onepress'),
			background: __('Background', 'onepress'),
			spacing: __('Spacing', 'onepress'),
			border: __('Border & radius', 'onepress'),
			shadow: __('Shadow', 'onepress'),
			display: __('Display & layout', 'onepress'),
			raw: __('Custom declarations', 'onepress'),
		}),
		[]
	);

	useEffect(() => {
		if (openSection && !allowedIds.includes(openSection)) {
			setOpenSection(null);
		}
	}, [allowedIds, openSection]);

	/**
	 * @param {StylingAccordionSectionId} sectionId
	 * @returns {{ opened: boolean, onToggle: (next: boolean) => void, lockOpen: boolean } | null}
	 */
	const sectionPanelProps = useCallback(
		(sectionId) => {
			if (!allowedIds.includes(sectionId)) {
				return null;
			}
			if (singleGroupLocked) {
				return {
					opened: true,
					onToggle: () => { },
					lockOpen: true,
				};
			}
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
					lockOpen: false,
				};
			}
			return {
				opened: true,
				onToggle: (/** @type {boolean} */ next) => {
					if (!next) {
						setOpenSection(null);
					}
				},
				lockOpen: false,
			};
		},
		[allowedIds, openSection, singleGroupLocked]
	);

	const renderGroupBody = useCallback(
		(/** @type {StylingAccordionSectionId} */ sectionId) => {
			switch (sectionId) {
				case 'text':
					return (
						<TextStyleFields
							model={model}
							onPatch={onPatch}
							families={families}
							fontsLoading={fontsLoading}
							fontsError={fontsError}
							disabledFieldSet={disabledFieldSet}
						/>
					);
				case 'background':
					return (
						<BackgroundFields
							sliceKey={sliceKey}
							model={model}
							onPatch={onPatch}
							disabledFieldSet={disabledFieldSet}
						/>
					);
				case 'spacing':
					return (
						<SpacingFields
							sliceKey={sliceKey}
							model={model}
							onPatch={onPatch}
							disabledFieldSet={disabledFieldSet}
						/>
					);
				case 'border':
					return (
						<BorderOutlineFields
							sliceKey={sliceKey}
							model={model}
							onPatch={onPatch}
							disabledFieldSet={disabledFieldSet}
						/>
					);
				case 'shadow':
					return <ShadowFields model={model} onPatch={onPatch} disabledFieldSet={disabledFieldSet} />;
				case 'display':
					return (
						<DisplayLayoutFields model={model} onPatch={onPatch} disabledFieldSet={disabledFieldSet} />
					);
				case 'raw':
					return (
						<RawDeclarationsField value={rawCss} onChange={onRawChange} disabledFieldSet={disabledFieldSet} />
					);
				default:
					return null;
			}
		},
		[
			model,
			onPatch,
			sliceKey,
			rawCss,
			onRawChange,
			families,
			fontsLoading,
			fontsError,
			disabledFieldSet,
		]
	);

	return (
		<div className="panels">
			<PreservedPropertiesNotice count={unknownCount} />

			<Panel className={`acc-panel${openSection && !singleGroupLocked ? ' acc-panel--focus-section' : ''}`}>
				{allowedIds.map((sectionId) => {
					const p = sectionPanelProps(sectionId);
					if (!p) {
						return null;
					}
					const title = groupTitles[sectionId];
					return (
						<StylingGroupPanel
							key={sectionId}
							title={title}
							opened={p.opened}
							onToggle={p.onToggle}
							lockOpen={p.lockOpen}
						>
							<div className='fields list-fields flex flex-col gap-3'>
								{renderGroupBody(sectionId)}
							</div>
						</StylingGroupPanel>
					);
				})}
			</Panel>
		</div>
	);
}
