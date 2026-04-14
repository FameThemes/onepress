/**
 * Hierarchical, searchable preset CSS targets (Customizer styling editor).
 */
import { Button, Icon, Popover, TextControl } from '@wordpress/components';
import { chevronDownSmall } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import {
	findMatchingTargetPreset,
	isTargetPresetConsumed,
	normalizeSelectorForPresetMatch,
	normalizeTargetElementsRegistry,
} from '../targetElementsRegistry';

const LIST_MAX_H = 280;

/**
 * @param {object} props
 * @param {string} props.currentSelector — active base selector
 * @param {string} [props.currentElId] — `_meta.elId` when chosen from registry
 * @param {string} [props.selectedPresetName] — `_meta.elName` (stable label in trigger)
 * @param {(preset: Record<string, unknown>) => void} props.onSelectPreset — normal `{ id, selector, name }`, or `{ locked, message, … }`, or `{ unlockCustomForm: true, … }`
 * @param {boolean} [props.disabled]
 * @param {{ categories: Record<string, string>, elements: Array<Record<string, unknown>> }} [props.targetRegistry] — `control.params.styling_target_elements`
 * @param {Set<string>|string[]|null} [props.usedPresetIds] — registry `id` values already used (`_meta.elId` on items); presets consumed except `custom_item` + `multiple`
 */
export function StylingTargetElementSelect({
	currentSelector,
	currentElId = '',
	selectedPresetName = '',
	onSelectPreset,
	disabled = false,
	targetRegistry: targetRegistryProp,
	usedPresetIds = null,
}) {
	const registry = useMemo(
		() => normalizeTargetElementsRegistry(targetRegistryProp),
		[targetRegistryProp]
	);
	const { categories, elements } = registry;

	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const triggerRef = useRef(null);
	const [anchor, setAnchor] = useState(null);

	const elIdStr = String(currentElId || '').trim();
	const selStr = String(currentSelector || '').trim();

	const matched = useMemo(
		() => findMatchingTargetPreset(currentSelector, currentElId, registry),
		[currentSelector, currentElId, registry]
	);

	const categoryOrder = useMemo(() => Object.keys(categories), [categories]);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) {
			return elements;
		}
		return elements.filter(
			(e) =>
				e.name.toLowerCase().includes(q) ||
				e.id.toLowerCase().includes(q) ||
				(e.selector && e.selector.toLowerCase().includes(q))
		);
	}, [elements, search]);

	const grouped = useMemo(() => {
		/** @type {Map<string, typeof elements>} */
		const map = new Map();
		for (const e of filtered) {
			const c = e.category || 'other';
			if (!map.has(c)) {
				map.set(c, []);
			}
			map.get(c).push(e);
		}
		return map;
	}, [filtered]);

	const orderedCategoryKeys = useMemo(() => {
		const seen = new Set(categoryOrder);
		const extra = [...grouped.keys()].filter((k) => !seen.has(k)).sort();
		return [...categoryOrder, ...extra];
	}, [categoryOrder, grouped]);

	const toggle = useCallback(() => {
		if (disabled) {
			return;
		}
		setOpen((o) => !o);
	}, [disabled]);

	const close = useCallback(() => {
		setOpen(false);
	}, []);

	useLayoutEffect(() => {
		if (!open) {
			setAnchor(null);
			setSearch('');
			return;
		}
		setAnchor(triggerRef.current);
	}, [open]);

	const savedLabel = String(selectedPresetName || '').trim();
	const triggerLabel =
		(matched ? matched.name : '') || savedLabel || __('Target Element…', 'onepress');

	if (elements.length === 0) {
		return null;
	}

	/**
	 * @param {import('../targetElementsRegistry').TargetElementPreset} el
	 */
	const onRowActivate = (el) => {
		if (el.locked === true) {
			onSelectPreset({
				id: el.id,
				name: el.name,
				selector: el.selector || '',
				locked: true,
				message: typeof el.message === 'string' ? el.message : '',
			});
			close();
			return;
		}
		if (el.id === 'custom_item' && el.multiple === true) {
			onSelectPreset({
				id: el.id,
				name: el.name,
				selector: el.selector || '',
				unlockCustomForm: true,
				multiple: true,
			});
			close();
			return;
		}
		const sel = String(el.selector || '').trim();
		if (!sel) {
			return;
		}
		onSelectPreset({ id: el.id, selector: sel, name: el.name });
		close();
	};

	return (
		<div className="onepress-styling-target-preset">
			<button
				type="button"
				ref={triggerRef}
				className="onepress-styling-target-preset__trigger styling-font-family-trigger styling-font-family-trigger--input-like"
				aria-expanded={open}
				aria-haspopup="dialog"
				disabled={disabled}
				onClick={toggle}
			>
				<span className="styling-font-family-trigger__value">{triggerLabel}</span>
				<span className="styling-font-family-trigger__chevron" aria-hidden>
					<Icon icon={chevronDownSmall} size={20} />
				</span>
			</button>

			{open && anchor ? (
				<Popover
					anchor={anchor}
					onClose={close}
					placement="bottom-start"
					shift
					className="onepress-styling-target-preset__popover styling-font-picker-popover"
					focusOnMount="firstElement"
					noArrow={false}
					offset={8}
				>
					<div className="styling-font-picker-popover__inner">
						<TextControl
							__nextHasNoMarginBottom
							label={__('Search targets', 'onepress')}
							hideLabelFromVision
							value={search}
							onChange={setSearch}
							placeholder={__('Search by name or selector…', 'onepress')}
						/>
						<div
							className="onepress-styling-target-preset__list styling-font-picker__list"
							style={{ maxHeight: LIST_MAX_H, overflowY: 'auto' }}
						>
							{filtered.length === 0 ? (
								<p className="styling-font-picker__empty">{__('No presets match your search.', 'onepress')}</p>
							) : (
								orderedCategoryKeys.map((catKey) => {
									const group = grouped.get(catKey);
									if (!group?.length) {
										return null;
									}
									const catLabel = categories[catKey] || catKey;
									return (
										<div key={catKey} className="onepress-styling-target-preset__group">
											<div className="onepress-styling-target-preset__group-title" role="presentation">
												{catLabel}
											</div>
											<ul className="onepress-styling-target-preset__group-list">
												{group.map((el) => {
													const idMatch = elIdStr !== '' && elIdStr === el.id;
													const selMatch =
														Boolean(el.selector) &&
														selStr !== '' &&
														normalizeSelectorForPresetMatch(selStr) ===
															normalizeSelectorForPresetMatch(el.selector);
													const isActive = idMatch || selMatch;
													const consumed = isTargetPresetConsumed(el, usedPresetIds);
													const isSpecialLocked = el.locked === true;
													const isSpecialCustom = el.id === 'custom_item' && el.multiple === true;
													const rowDisabled = Boolean(disabled || (consumed && !isSpecialLocked && !isSpecialCustom));
													return (
														<li key={el.id}>
															<button
																type="button"
																className={
																	'onepress-styling-target-preset__row' +
																	(isActive ? ' is-active' : '') +
																	(rowDisabled ? ' is-disabled' : '') +
																	(consumed && !isSpecialLocked && !isSpecialCustom ? ' is-consumed' : '')
																}
																disabled={rowDisabled}
																aria-disabled={rowDisabled}
																onClick={() => {
																	if (rowDisabled) {
																		return;
																	}
																	onRowActivate(el);
																}}
															>
																<span className="onepress-styling-target-preset__row-name">{el.name}</span>
																{consumed && !isSpecialLocked && !isSpecialCustom ? (
																	<span className="onepress-styling-target-preset__row-badge">
																		{__('Added', 'onepress')}
																	</span>
																) : null}
															</button>
														</li>
													);
												})}
											</ul>
										</div>
									);
								})
							)}
						</div>
						<div className="styling-font-picker__footer flex justify-end">
							<Button variant="tertiary" size='small' onClick={close}>
								{__('Close', 'onepress')}
							</Button>
						</div>
					</div>
				</Popover>
			) : null}
		</div>
	);
}
