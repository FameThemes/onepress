/**
 * Base CSS selector input + “pick from preview” button (Customizer styling).
 */
import { Button, Icon, TextControl } from '@wordpress/components';
import { close } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

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
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {() => void} props.togglePreviewPicker
 * @param {boolean} props.previewPickerActive
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] — root row (layout + spacing)
 * @param {string} [props.label] — defaults to “Base selector”
 * @param {string} [props.placeholder]
 * @param {string} [props.textControlClassName] — passed to TextControl
 */
export function BaseSelectorField({
	value,
	onChange,
	togglePreviewPicker,
	previewPickerActive,
	disabled = false,
	className = 'flex flex-wrap gap-2 items-end',
	label,
	placeholder,
	textControlClassName,
}) {
	return (
		<div className={className}>
			<div className="grow min-w-[12rem]">
				<TextControl
					__nextHasNoMarginBottom
					className={textControlClassName}
					label={label ?? __('Base selector', 'onepress')}
					value={value}
					onChange={onChange}
					placeholder={placeholder ?? __('e.g. .my-button', 'onepress')}
					disabled={disabled}
					autoComplete="off"
					spellCheck={false}
				/>
			</div>
			<Button
				variant="secondary"
				onClick={togglePreviewPicker}
				isPressed={previewPickerActive}
				disabled={disabled}
				// size="small"
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
		</div>
	);
}
