/**
 * Hierarchical, searchable preset CSS targets (Customizer styling editor).
 */
import { Button, Icon, Popover, TextControl } from '@wordpress/components';
import { chevronDownSmall } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import {
	findMatchingTargetPreset,
	getStylingTargetElementsRegistry,
	normalizeSelectorForPresetMatch,
} from '../targetElementsRegistry';

const LIST_MAX_H = 280;

/**
 * @param {object} props
 * @param {string} props.currentSelector — active base selector
 * @param {string} [props.currentElId] — `_meta.elId` when chosen from registry
 * @param {string} [props.selectedPresetName] — `_meta.elName` (stable label in trigger)
 * @param {(preset: { selector: string, name: string, id: string }) => void} props.onSelectPreset
 * @param {boolean} [props.disabled]
 */
export function StylingTargetElementSelect({
	currentSelector,
	currentElId = '',
	selectedPresetName = '',
	onSelectPreset,
	disabled = false,
}) {
	const [registry, setRegistry] = useState(() => getStylingTargetElementsRegistry());
	const { categories, elements } = registry;

	useLayoutEffect(() => {
		setRegistry(getStylingTargetElementsRegistry());
	}, []);

	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const triggerRef = useRef(null);
	const [anchor, setAnchor] = useState(null);

	const elIdStr = String(currentElId || '').trim();
	const selStr = String(currentSelector || '').trim();

	const matched = useMemo(() => findMatchingTargetPreset(currentSelector, currentElId), [currentSelector, currentElId]);

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
				e.selector.toLowerCase().includes(q)
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
		savedLabel || (matched ? matched.name : '') || __('Target Element…', 'onepress');

	if (elements.length === 0) {
		return null;
	}

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
														selStr !== '' &&
														normalizeSelectorForPresetMatch(selStr) ===
															normalizeSelectorForPresetMatch(el.selector);
													const isActive = idMatch || selMatch;
													return (
														<li key={el.id}>
															<button
																type="button"
																className={
																	'onepress-styling-target-preset__row' +
																	(isActive ? ' is-active' : '')
																}
																onClick={() => {
																	onSelectPreset({ id: el.id, selector: el.selector, name: el.name });
																	close();
																}}
															>
																<span className="onepress-styling-target-preset__row-name">{el.name}</span>
																{/* <code className="onepress-styling-target-preset__row-sel">{el.selector}</code> */}
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
						<div className="styling-font-picker__footer">
							<Button variant="tertiary" onClick={close}>
								{__('Close', 'onepress')}
							</Button>
						</div>
					</div>
				</Popover>
			) : null}
		</div>
	);
}
