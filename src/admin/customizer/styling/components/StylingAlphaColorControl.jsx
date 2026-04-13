/**
 * Color field: row with swatch + InputControl; swatch opens ColorPicker; value is free-form CSS.
 */
import {
	BaseControl,
	ColorPicker,
	Popover,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';
import { colord } from 'colord';
import { __, sprintf } from '@wordpress/i18n';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from '@wordpress/element';

/**
 * @param {string} raw
 * @returns {boolean}
 */
function isCssColorParsable(raw) {
	const s = String(raw || '').trim();
	if (!s) {
		return true;
	}
	return colord(s).isValid();
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {string} [props.className]
 * @param {boolean} [props.enableAlpha] — WordPress ColorPicker alpha channel (default true)
 * @param {boolean} [props.disabled]
 */
export function StylingAlphaColorControl({
	label,
	help,
	value,
	onChange,
	className,
	enableAlpha = true,
	disabled = false,
}) {
	if (disabled) {
		return null;
	}
	const raw = String(value || '').trim();

	const [popoverOpen, setPopoverOpen] = useState(false);
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const swatchRef = useRef(null);

	useLayoutEffect(() => {
		if (!popoverOpen) {
			setPopoverAnchor(null);
			return;
		}
		setPopoverAnchor(swatchRef.current);
	}, [popoverOpen]);

	const c = useMemo(() => colord(raw), [raw]);

	const pickerHex = useMemo(() => {
		if (!raw) {
			return '#ffffff';
		}
		return c.isValid() ? c.toHex() : '#ffffff';
	}, [raw, c]);

	const swatchStyle = useMemo(() => {
		if (!raw || !c.isValid()) {
			return {
				background:
					'repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 50% / 10px 10px',
			};
		}
		return { backgroundColor: raw };
	}, [raw, c]);

	const applyPicked = useCallback(
		(hex) => {
			if (hex === undefined || hex === null || hex === '') {
				onChange('');
				return;
			}
			const next = colord(hex);
			if (!next.isValid()) {
				return;
			}
			onChange(next.toHex());
		},
		[onChange]
	);

	const togglePopover = useCallback(() => setPopoverOpen((o) => !o), []);
	const closePopover = useCallback(() => setPopoverOpen(false), []);

	const onInputChange = useCallback(
		(next) => {
			onChange(next ?? '');
		},
		[onChange]
	);

	const mergedHelp =
		help ||
		(!isCssColorParsable(raw)
			? __(
				'Swatch and picker need a parseable color (hex, rgb, hsl). You can still use any CSS color value here (e.g. var(--token)).',
				'onepress'
			)
			: undefined);

	return (
		<BaseControl label={label} help={mergedHelp} className={className}>
			<div className="alpha-color">
				<div className="alpha-color-row">
					<div className="alpha-color-row-inner relative">
						<button
							type="button"
							ref={swatchRef}
							className="alpha-color-swatch-button"
							aria-expanded={popoverOpen}
							onClick={togglePopover}
							aria-label={sprintf(
								/* translators: %s: field label */
								__('Toggle color picker (%s)', 'onepress'),
								label
							)}
						>
							<span className="alpha-color-swatch" style={swatchStyle} aria-hidden />
						</button>
						<InputControl
							__next40pxDefaultSize={false}
							className="alpha-color-value-input"
							value={value || ''}
							onChange={onInputChange}
							hideLabelFromVision
							placeholder={__(
								'#000000',
								'onepress'
							)}
							autoComplete="off"
						/>
					</div>
				</div>

				{popoverOpen && popoverAnchor ? (
					<Popover
						anchor={popoverAnchor}
						onClose={closePopover}
						placement="bottom-start"
						shift
						className="alpha-color-popover"
						focusOnMount="firstElement"
						noArrow={false}
						offset={15}
					>
						<div className="alpha-color-popover__body">
							<ColorPicker
								color={pickerHex}
								onChange={applyPicked}
								enableAlpha={enableAlpha}
								label={label}
								hideLabelFromVision
								__nextHasNoMarginBottom
							/>
						</div>
					</Popover>
				) : null}
			</div>
		</BaseControl>
	);
}
