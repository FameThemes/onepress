/**
 * Icon button opening device list; changing device updates all responsive fields via context.
 */
import { DropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { dashiconClassForDeviceId } from './deviceDashicons';
import { useStylingDevice } from './StylingDeviceContext';

function DeviceDashicon({ deviceId }) {
	return (
		<span
			className={`dashicons ${dashiconClassForDeviceId(deviceId)} device-dashicon`}
			aria-hidden
		/>
	);
}

export function DeviceSwitcherChip() {
	const { deviceId, setDeviceId, breakpoints } = useStylingDevice();

	return (
		<DropdownMenu
			className="device-dropdown"
			icon={<DeviceDashicon deviceId={deviceId} />}
			label={__('Switch breakpoint (all length fields)', 'onepress')}
			toggleProps={{
				size: 'small',
				variant: 'tertiary',
				className: 'device-chip',
			}}
			popoverProps={{ className: 'device-popover', placement: 'bottom-end' }}
			controls={breakpoints.map((bp) => ({
				title: bp.label || bp.id,
				icon: <DeviceDashicon deviceId={bp.id} />,
				isActive: deviceId === bp.id,
				onClick: () => setDeviceId(bp.id),
			}))}
		/>
	);
}
