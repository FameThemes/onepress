/**
 * Shared unit dropdown (px / em / rem / %) for Customizer React controls.
 * Portaled Popover + click-outside; trigger styling via triggerClassName (per control).
 */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';

const SHELL_CLASS = 'onepress-customizer-unit-popover-shell';

/**
 * @param {object} props
 * @param {string[]} props.units
 * @param {string} props.value
 * @param {(unit: string) => void} props.onChange
 * @param {'bottom-start'|'bottom-end'|'top-start'|'top-end'|string} [props.placement]
 * @param {string} props.triggerClassName Classes for the anchor (e.g. spacing / typography skins)
 * @param {string} [props.triggerActiveClass] Appended when open (e.g. "active")
 * @param {string} [props.listboxAriaLabel]
 * @param {string} [props.popoverClassName] Extra class on Popover root (merged with shell)
 */
export function CustomizerUnitSelectPopover({
	units,
	value,
	onChange,
	placement = 'bottom-end',
	triggerClassName,
	triggerActiveClass = '',
	listboxAriaLabel = __('Unit', 'onepress'),
	popoverClassName = '',
}) {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		if (!open) {
			return undefined;
		}
		const onPointerDown = (e) => {
			const t = e.target;
			if (!t || typeof t.closest !== 'function') {
				return;
			}
			if (anchorEl && anchorEl.contains(t)) {
				return;
			}
			if (t.closest(`.${SHELL_CLASS}`) || t.closest('.components-popover')) {
				return;
			}
			setOpen(false);
		};
		document.addEventListener('pointerdown', onPointerDown, true);
		return () =>
			document.removeEventListener('pointerdown', onPointerDown, true);
	}, [open, anchorEl]);

	const triggerCn = [
		triggerClassName,
		open && triggerActiveClass ? triggerActiveClass : '',
	]
		.filter(Boolean)
		.join(' ');

	const shellCn = [SHELL_CLASS, popoverClassName].filter(Boolean).join(' ');

	return (
		<>
			<span
				ref={setAnchorEl}
				className={triggerCn}
				role="button"
				tabIndex={0}
				aria-expanded={open}
				aria-haspopup="listbox"
				aria-label={listboxAriaLabel}
				onClick={() => setOpen((o) => !o)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen((o) => !o);
					}
				}}
			>
				<span className="onepress-customizer-unit-trigger__value">
					{value}
				</span>
			</span>
			{open && (
				<Popover
					anchor={anchorEl}
					className={shellCn}
					onClose={() => setOpen(false)}
					placement={placement}
					offset={4}
					focusOnMount={false}
				>
					<div
						className="onepress-customizer-unit-popover"
						role="listbox"
						aria-label={listboxAriaLabel}
					>
						{units.map((u) => (
							<button
								key={u}
								type="button"
								role="option"
								aria-selected={value === u}
								className={
									'onepress-customizer-unit-popover__item' +
									(value === u ? ' is-selected' : '')
								}
								onClick={() => {
									onChange(u);
									setOpen(false);
								}}
							>
								{u}
							</button>
						))}
					</div>
				</Popover>
			)}
		</>
	);
}
