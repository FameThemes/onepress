/**
 * Customizer control alpha-color: Popover below row + ColorPicker.
 */
import { Button, ColorPicker, Popover } from '@wordpress/components';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

function cssToPickerFormat(css, enableAlpha) {
	if (!css || !String(css).trim()) {
		return enableAlpha ? '#ffffffff' : '#ffffff';
	}
	const s = String(css).trim();
	const hexMatch = /^#([0-9a-f]{3,8})$/i.exec(s);
	if (hexMatch) {
		let h = hexMatch[1];
		if (h.length === 3) {
			h = h
				.split('')
				.map((c) => c + c)
				.join('');
		}
		if (h.length === 6) {
			return enableAlpha ? `#${h}ff` : `#${h}`;
		}
		if (h.length === 8) {
			return enableAlpha ? `#${h}` : `#${h.slice(0, 6)}`;
		}
	}
	const rgba =
		/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(
			s
		);
	if (rgba) {
		const r = Math.max(0, Math.min(255, parseInt(rgba[1], 10)));
		const g = Math.max(0, Math.min(255, parseInt(rgba[2], 10)));
		const b = Math.max(0, Math.min(255, parseInt(rgba[3], 10)));
		const a =
			rgba[4] !== undefined
				? Math.max(0, Math.min(1, parseFloat(rgba[4])))
				: 1;
		const toH = (n) =>
			Math.max(0, Math.min(255, n))
				.toString(16)
				.padStart(2, '0');
		const hex = `${toH(r)}${toH(g)}${toH(b)}`;
		if (enableAlpha) {
			const ai = Math.round(a * 255);
			return `#${hex}${ai.toString(16).padStart(2, '0')}`;
		}
		return `#${hex}`;
	}
	return enableAlpha ? '#ffffffff' : '#ffffff';
}

export function AlphaColorControlApp({ control }) {
	const wrap = control.container[0];
	const host =
		wrap?.querySelector?.('.onepress-alpha-color-react-root') ?? null;
	const input = wrap?.querySelector?.('.onepress-alpha-color-input') ?? null;

	const label = host?.dataset?.label ?? '';
	const description = host?.dataset?.description ?? '';
	const showOpacity = host?.dataset?.showOpacity !== 'false';
	const defaultColor = host?.dataset?.defaultColor ?? '';

	const enableAlpha = showOpacity;

	const rowRef = useRef(null);
	const [open, setOpen] = useState(false);
	const initialRaw = control.setting.get() ?? input?.value ?? '';
	const [rawValue, setRawValue] = useState(() =>
		initialRaw != null ? String(initialRaw) : ''
	);
	const [color, setColor] = useState(() =>
		cssToPickerFormat(initialRaw ?? '', enableAlpha)
	);

	const swatchIsEmpty = !String(rawValue).trim();

	useEffect(() => {
		const onChange = (next) => {
			const r = next != null ? String(next) : '';
			setRawValue(r);
			setColor(cssToPickerFormat(r, enableAlpha));
		};
		control.setting.bind(onChange);
		return () => {
			control.setting.unbind(onChange);
		};
	}, [control, enableAlpha]);

	const onPickerChange = useCallback(
		(nextHex) => {
			const s =
				nextHex == null || String(nextHex).trim() === ''
					? ''
					: String(nextHex);
			control.setting.set(s);
		},
		[control]
	);

	const resetToDefault = useCallback(() => {
		const raw = defaultColor != null ? String(defaultColor) : '';
		control.setting.set(raw);
	}, [control, defaultColor]);

	const closePicker = useCallback(() => {
		setOpen(false);
	}, []);

	const clearColor = useCallback(() => {
		control.setting.set('');
		closePicker();
	}, [control, closePicker]);

	const pickerDefault =
		cssToPickerFormat(defaultColor, enableAlpha) ||
		(enableAlpha ? '#ffffffff' : '#ffffff');

	const togglePicker = useCallback(() => {
		setOpen((v) => !v);
	}, []);

	return (
		<div className="onepress-alpha-color-control">
			<div
				ref={rowRef}
				className="onepress-alpha-color-control__row"
			>
				{label ? (
					<span className="customize-control-title">{label}</span>
				) : null}
				<div className="onepress-alpha-color-control__actions flex items-center gap-1">
					<button
						type="button"
						className="onepress-customizer-reset-default"
						onClick={resetToDefault}
						aria-label={__('Reset to default', 'onepress')}
						title={__('Reset to default', 'onepress')}
					>
						<span
							className="dashicons dashicons-image-rotate"
							aria-hidden
						/>
					</button>
					<span
						className={
							`onepress-alpha-color-control__swatch-wrap ${open ? 'active' : ''}` +
							(swatchIsEmpty
								? ' onepress-alpha-color-control__swatch-wrap--empty'
								: '')
						}
					>
						<span
							className={
								`onepress-alpha-color-control__swatch input ` +
								(swatchIsEmpty
									? ' onepress-alpha-color-control__swatch--empty'
									: '')
							}
							onClick={togglePicker}
							aria-haspopup="true"
							aria-expanded={open}
							aria-label={__('Open color picker', 'onepress')}
							style={
								swatchIsEmpty
									? undefined
									: { backgroundColor: color }
							}
						/>
					</span>
				</div>
			</div>
			{description ? (
				<span className="description customize-control-description">
					{description}
				</span>
			) : null}

			{open && rowRef.current ? (
				<Popover
					className="onepress-alpha-color-popover"
					anchor={rowRef.current}
					placement="bottom-end"
					offset={6}
					onClose={closePicker}
					focusOnMount="firstElement"
				>
					<div className="onepress-alpha-color-popover__inner">
						{label ? (
							<div className="onepress-alpha-color-popover__title">
								{label}
							</div>
						) : null}
						<ColorPicker
							color={color}
							onChange={onPickerChange}
							enableAlpha={enableAlpha}
							defaultValue={pickerDefault}
						/>
						<div className="onepress-alpha-color-popover__footer">
							<Button
								variant="link"
								isDestructive
								onClick={clearColor}
							>
								{__('Clear color', 'onepress')}
							</Button>
						</div>
					</div>
				</Popover>
			) : null}
		</div>
	);
}
