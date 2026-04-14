/**
 * Inline styling editor panel (toolbar, state tabs, settings popover anchor, preset, accordions).
 */
import { Button, Icon } from '@wordpress/components';
import { close, settings } from '@wordpress/icons';
import { memo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { StylingAccordionPanels } from '../StylingAccordionPanels';
import { StylingTargetElementSelect } from './StylingTargetElementSelect';
import { StylingSettingsPopover } from './StylingSettingsPopover';

const IconTarget = ({ size = 24 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className="icon icon-tabler icons-tabler-filled icon-tabler-current-location"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 1a1 1 0 0 1 1 1v1.055a9.004 9.004 0 0 1 7.946 7.945h1.054a1 1 0 0 1 0 2h-1.055a9.004 9.004 0 0 1 -7.944 7.945l-.001 1.055a1 1 0 0 1 -2 0v-1.055a9.004 9.004 0 0 1 -7.945 -7.944l-1.055 -.001a1 1 0 0 1 0 -2h1.055a9.004 9.004 0 0 1 7.945 -7.945v-1.055a1 1 0 0 1 1 -1m0 4a7 7 0 1 0 0 14a7 7 0 0 0 0 -14m0 3a4 4 0 1 1 -4 4l.005 -.2a4 4 0 0 1 3.995 -3.8" />
	</svg>
);

/**
 * @param {object} props
 */
function StylingInlineEditorInner({
	visibleStylingGroupCount,
	showGearButton,
	showPreviewPickButton,
	gearButtonLabel,
	lockedBaseSelector,
	editableBaseSelector,
	allowAddRemoveInStatesPopover,
	showStatesPopoverButton,
	toggleStatesPopover,
	statesPopoverOpen,
	statesPopoverAnchor,
	togglePreviewPicker,
	previewPickerActive,
	manageStatesButtonRef,
	showStateTablistBlock,
	multiple,
	multiItemAwaitingPresetTarget,
	showStateTabButtons,
	statesList,
	stateIndex,
	setStateIndex,
	onStateTabKeyDown,
	stateTabPanelId,
	getStateTabId,
	tablistVisibleForA11y,
	closeStatesPopover,
	commitActiveItem,
	editorPayload,
	previewDeviceIds,
	activeKey,
	onBaseSelectorChange,
	onItemTitleChange,
	metaBaseSelector,
	onSelectTargetPreset,
	sliceParsed,
	unknownCount,
	onPatch,
	sliceKey,
	currentText,
	onChangeText,
	families,
	localManagedFonts,
	mergedForFontSlices,
	fontFamilySource,
	fontsLoading,
	fontsError,
	stylingGroups,
	disabledFieldSet,
	onCloseEditor,
	targetElementsRegistry,
}) {
	if (!editorPayload) {
		return null;
	}

	const showActionsToolbar = showGearButton || showPreviewPickButton;
	const showTablist = showStateTablistBlock && !(multiple && multiItemAwaitingPresetTarget);
	const showStickyChrome = showActionsToolbar || showTablist;

	return (
		<div
			className={`onepress-styling-inline-editor onepress-styling-editor-popover group-count-${String(visibleStylingGroupCount)}`}
		>
			<span className="onepress-styling-inline-editor__arrow" aria-hidden="true">
				<span className="onepress-styling-inline-editor__arrow-fill" />
			</span>
			{showStickyChrome ? (
				<div className="popover-header onepress-styling-inline-editor__header">
					{showActionsToolbar ? (
						<div className="flex items-center gap-2 w-full justify-end pb-2 onepress-styling-editor-popover__header-tools">
							{showGearButton ? (
								<Button
									ref={manageStatesButtonRef}
									className="onepress-styling-manage-states icon-btn"
									variant="secondary"
									onClick={toggleStatesPopover}
									aria-expanded={statesPopoverOpen}
									aria-haspopup="dialog"
									size="small"
									label={gearButtonLabel}
									showTooltip
								>
									<Icon icon={settings} size={20} />
								</Button>
							) : null}
							{showPreviewPickButton ? (
								<Button
									variant="secondary"
									onClick={togglePreviewPicker}
									isPressed={previewPickerActive}
									disabled={!editableBaseSelector}
									size="small"
									label={
										previewPickerActive
											? __('Cancel picking from preview', 'onepress')
											: __('Pick a selector from the site preview', 'onepress')
									}
									showTooltip
									className="icon-btn"
								>
									{previewPickerActive ? (
										<Icon icon={close} size={18} />
									) : (
										<IconTarget size={18} />
									)}
								</Button>
							) : null}
						</div>
					) : null}
					{showTablist ? (
						<div className="onepress-styling styling-root">
							<div className="states">
								<div className="states-toolbar flex flex gap-2 justify-between items-center">
									{showStateTabButtons ? (
										<div className="state-tablist-scroll">
											<div
												className="state-tablist-inner  components-button-group "
												role="tablist"
												aria-label={__('Style states', 'onepress')}
											>
												{statesList.map((s, i) => (
													<Button
														key={s.key}
														id={getStateTabId(i)}
														aria-selected={i === stateIndex}
														aria-controls={stateTabPanelId}
														tabIndex={i === stateIndex ? 0 : -1}
														variant="unstyled"
														onClick={() => setStateIndex(i)}
														onKeyDown={(e) => onStateTabKeyDown(e, i)}
														className={`tab-button ${i === stateIndex ? ' is-active' : ''}`}
													>
														{s.label}
													</Button>
												))}
											</div>
										</div>
									) : (
										<span className="grow" aria-hidden />
									)}
								</div>
							</div>
						</div>
					) : null}
				</div>
			) : null}

			<div
				className="popover-body grow styling-root onepress-styling onepress-styling-editor-popover__inner"
				role={tablistVisibleForA11y && !multiItemAwaitingPresetTarget ? 'tabpanel' : undefined}
				id={tablistVisibleForA11y && !multiItemAwaitingPresetTarget ? stateTabPanelId : undefined}
				aria-labelledby={
					tablistVisibleForA11y && !multiItemAwaitingPresetTarget
						? getStateTabId(stateIndex)
						: undefined
				}
			>
				{showGearButton ? (
					<StylingSettingsPopover
						anchor={statesPopoverAnchor}
						isOpen={statesPopoverOpen}
						onClose={closeStatesPopover}
						value={editorPayload}
						commit={commitActiveItem}
						previewDeviceIds={previewDeviceIds}
						activeStateKey={activeKey}
						setStateIndex={setStateIndex}
						allowAddRemoveStates={allowAddRemoveInStatesPopover}
						multiple={multiple}
						lockedBaseSelector={lockedBaseSelector}
						editableBaseSelector={editableBaseSelector}
						metaBaseSelector={metaBaseSelector}
						onBaseSelectorChange={onBaseSelectorChange}
						onItemTitleChange={onItemTitleChange}
						showStatesSection={showStatesPopoverButton}
					/>
				) : null}

				{/* Single-target + PHP `base_selector`: hide preset (selector fixed in registry). */}
				{lockedBaseSelector === '' ? (
					<div className="onepress-styling-target-preset-wrap">
						<p className="enum-label">{__('Target Element', 'onepress')}</p>
						<StylingTargetElementSelect
							targetRegistry={targetElementsRegistry}
							currentSelector={metaBaseSelector}
							currentElId={
								typeof editorPayload?._meta?.elId === 'string' ? editorPayload._meta.elId : ''
							}
							selectedPresetName={
								typeof editorPayload?._meta?.elName === 'string' ? editorPayload._meta.elName : ''
							}
							onSelectPreset={onSelectTargetPreset}
							disabled={!editableBaseSelector}
						/>
					</div>
				) : null}

				{!multiItemAwaitingPresetTarget ? (
					<StylingAccordionPanels
						model={sliceParsed.model}
						unknownCount={unknownCount}
						onPatch={onPatch}
						sliceKey={sliceKey}
						rawCss={currentText}
						onRawChange={onChangeText}
						families={families}
						localFontFamilies={localManagedFonts}
						faceResolveFamilies={mergedForFontSlices}
						fontFamilySource={fontFamilySource}
						fontsLoading={fontsLoading}
						fontsError={fontsError}
						stylingGroups={stylingGroups}
						disabledFieldSet={disabledFieldSet}
					/>
				) : null}
			</div>
			<div className="onepress-styling-inline-editor__footer">
				<Button
					variant="secondary"
					size="small"
					onClick={onCloseEditor}
					label={__('Close styling editor', 'onepress')}
				>
					{__('Close', 'onepress')}
				</Button>
			</div>
		</div>
	);
}

export const StylingInlineEditor = memo(StylingInlineEditorInner);
