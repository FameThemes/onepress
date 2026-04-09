/**
 * Shared Customizer preview device control: one button, cycles desktop → tablet → mobile.
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * @param {{ labels?: 'preview' | 'short' }} [options]
 * @returns {{ id: string, icon: string, title: string }[]}
 */
export function getCustomizerPreviewDeviceDefinitions(options = {}) {
	const useShort = options.labels === 'short';
	const titles = useShort
		? {
				desktop: __('Desktop', 'onepress'),
				tablet: __('Tablet', 'onepress'),
				mobile: __('Mobile', 'onepress'),
			}
		: {
				desktop: __('Desktop preview', 'onepress'),
				tablet: __('Tablet preview', 'onepress'),
				mobile: __('Mobile preview', 'onepress'),
			};

	return [
		{ id: 'desktop', icon: 'dashicons-desktop', title: titles.desktop },
		{ id: 'tablet', icon: 'dashicons-tablet', title: titles.tablet },
		{ id: 'mobile', icon: 'dashicons-smartphone', title: titles.mobile },
	];
}

/**
 * @param {object} props
 * @param {{ id: string, icon: string, title: string }[]} props.devices  Order defines cycle: [0]→[1]→[2]→[0]…
 * @param {string} props.activeDevice
 * @param {(id: string) => void} props.onSelectDevice
 * @param {string} props.groupClassName Extra wrapper class (e.g. BEM block); base: onepress-customizer-preview-device
 * @param {string} props.buttonClassName Extra button class; base: onepress-customizer-preview-device__btn (styles in customizer.scss)
 * @param {string} [props.groupAriaLabel] Prepended to the button aria-label for context.
 */
export function CustomizerPreviewDeviceButtons({
	devices,
	activeDevice,
	onSelectDevice,
	groupClassName,
	buttonClassName,
	groupAriaLabel = __('Customizer preview device', 'onepress'),
}) {
	if (!devices?.length) {
		return null;
	}

	let idx = devices.findIndex((d) => d.id === activeDevice);
	if (idx < 0) {
		idx = 0;
	}
	const current = devices[idx];
	const next = devices[(idx + 1) % devices.length];

	const cycleHint = sprintf(
		/* translators: 1: device after click, e.g. "Tablet preview" */
		__('Click for %s', 'onepress'),
		next.title
	);
	const title = `${current.title} — ${cycleHint}`;
	const ariaLabel = `${groupAriaLabel}. ${sprintf(
		/* translators: 1: current device, 2: instruction for next device */
		__('Current: %1$s. %2$s', 'onepress'),
		current.title,
		cycleHint
	)}`;

	const cycle = () => {
		onSelectDevice(next.id);
	};

	const groupCn = [
		'onepress-customizer-preview-device',
		groupClassName,
	]
		.filter(Boolean)
		.join(' ');
	const btnCn = [
		'onepress-customizer-preview-device__btn',
		buttonClassName,
		'is-active',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={groupCn}>
			<span
				className={btnCn}
				title={title}
				aria-label={ariaLabel}
				onClick={cycle}
			>
				<span className={`dashicons ${current.icon}`} aria-hidden />
			</span>
		</div>
	);
}
