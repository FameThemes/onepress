/**
 * Font family picker: same UI as Google control, list = fonts from Customizer Font manager only.
 */
import { Button, Icon, Popover, TextControl } from '@wordpress/components';
import { chevronDownSmall } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';
import { findFamilyForModel, pickDefaultFace } from '../googleFontCollection';

/** @typedef {import('../googleFontCollection').PickerFontFamily} PickerFontFamily */

const LIST_MAX_HEIGHT = 320;
const ROW_HEIGHT = 35;
const OVERSCAN = 6;

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {(font: PickerFontFamily) => void} [props.onPickFamily]
 * @param {PickerFontFamily[]} props.families — from Font manager (may include __rowId)
 */
export function StylingLocalFontFamilyControl({ value, onPatch, onPickFamily, families }) {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const [search, setSearch] = useState('');
	const [scrollTop, setScrollTop] = useState(0);
	const triggerRef = useRef(null);
	const listScrollRef = useRef(null);

	useEffect(() => {
		if (listScrollRef.current) {
			listScrollRef.current.scrollTop = 0;
		}
		setScrollTop(0);
	}, [search]);

	useLayoutEffect(() => {
		if (!popoverOpen) {
			setPopoverAnchor(null);
			setSearch('');
			setScrollTop(0);
			return;
		}
		setPopoverAnchor(triggerRef.current);
	}, [popoverOpen]);

	const filtered = useMemo(() => {
		if (!families?.length) {
			return [];
		}
		const q = search.trim().toLowerCase();
		if (!q) {
			return families;
		}
		return families.filter(
			(f) =>
				f.name.toLowerCase().includes(q) ||
				f.slug.toLowerCase().includes(q) ||
				f.fontFamily.toLowerCase().includes(q)
		);
	}, [families, search]);

	const totalHeight = filtered.length * ROW_HEIGHT;
	const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
	const end = Math.min(
		filtered.length,
		Math.ceil((scrollTop + LIST_MAX_HEIGHT) / ROW_HEIGHT) + OVERSCAN
	);
	const visible = filtered.slice(start, end);
	const offsetY = start * ROW_HEIGHT;

	const togglePopover = useCallback(() => setPopoverOpen((o) => !o), []);
	const closePopover = useCallback(() => setPopoverOpen(false), []);

	const pickFont = useCallback(
		/** @param {PickerFontFamily} font */ (font) => {
			const d = pickDefaultFace(font);
			onPatch({
				fontFamily: font.fontFamily,
				fontWeight: d.fontWeight,
				fontStyle: d.fontStyle,
			});
			onPickFamily?.(font);
			closePopover();
		},
		[closePopover, onPatch, onPickFamily]
	);

	const onListScroll = useCallback((e) => {
		setScrollTop(e.currentTarget.scrollTop);
	}, []);

	const display = useMemo(() => {
		const raw = String(value || '').trim();
		if (!raw) {
			return __('Default (inherit)', 'onepress');
		}
		const family = findFamilyForModel(families, raw);
		if (family) {
			return family.name;
		}
		return raw;
	}, [value, families]);

	return (
		<div className="styling-font-family-control">
			<button
				type="button"
				ref={triggerRef}
				className="styling-font-family-trigger styling-font-family-trigger--input-like"
				aria-expanded={popoverOpen}
				aria-haspopup="dialog"
				onClick={togglePopover}
			>
				<span className="styling-font-family-trigger__value">{display}</span>
				<span className="styling-font-family-trigger__chevron" aria-hidden>
					<Icon icon={chevronDownSmall} size={20} />
				</span>
			</button>

			{popoverOpen && popoverAnchor ? (
				<Popover
					anchor={popoverAnchor}
					onClose={closePopover}
					placement="bottom"
					shift
					className="styling-font-picker-popover"
					focusOnMount="firstElement"
					noArrow={false}
					offset={8}
				>
					<div className="styling-font-picker-popover__inner">
						<TextControl
							__nextHasNoMarginBottom
							label={__('Search fonts', 'onepress')}
							hideLabelFromVision
							value={search}
							onChange={setSearch}
							placeholder={__('Type to filter…', 'onepress')}
						/>
						{families?.length && filtered.length ? (
							<div
								ref={listScrollRef}
								className="styling-font-picker__list"
								style={{ maxHeight: LIST_MAX_HEIGHT }}
								onScroll={onListScroll}
							>
								<div
									className="styling-font-picker__list-spacer"
									style={{ height: totalHeight, position: 'relative' }}
								>
									<div
										className="styling-font-picker__list-window"
										style={{
											position: 'absolute',
											top: 0,
											left: 0,
											width: '100%',
											transform: `translateY(${offsetY}px)`,
										}}
									>
										{visible.map((font) => {
											const isSystem = Boolean(font.isSystem);
											const rowClass =
												'styling-font-picker__row' +
												(isSystem
													? ' styling-font-picker__row--system'
													: ' styling-font-picker__row--google');
											const rowKey =
												/** @type {{ __rowId?: string }} */ (font).__rowId || font.slug;
											return (
												<button
													key={rowKey}
													type="button"
													className={rowClass}
													style={{ height: ROW_HEIGHT }}
													onClick={() => pickFont(font)}
													aria-label={isSystem ? undefined : font.name}
												>
													{isSystem ? (
														<span
															className="styling-font-picker__name styling-font-picker__name--live"
															style={{ fontFamily: font.fontFamily }}
														>
															{font.name}
														</span>
													) : font.preview ? (
														<img
															className="styling-font-picker__preview styling-font-picker__preview--google"
															src={font.preview}
															alt=""
															loading="lazy"
															decoding="async"
														/>
													) : (
														<span
															className="styling-font-picker__preview styling-font-picker__preview--empty styling-font-picker__preview--google"
															aria-hidden
														/>
													)}
												</button>
											);
										})}
									</div>
								</div>
							</div>
						) : null}
						{families?.length && !filtered.length ? (
							<p className="styling-font-picker__empty">
								{__('No fonts match your search.', 'onepress')}
							</p>
						) : null}
						{!families?.length ? (
							<div className="styling-font-picker__empty">
								{/* {__(
									'No fonts in Font manager yet. Add fonts under Typography → Font manager.',
									'onepress'
								)} */}
							</div>
						) : null}
						<div className="styling-font-picker__footer flex justify-end">
							<Button variant="tertiary" size='small' onClick={closePopover}>
								{__('Close', 'onepress')}
							</Button>
						</div>
					</div>
				</Popover>
			) : null}
		</div>
	);
}
