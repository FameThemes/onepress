/**
 * Sync styling `deviceId` with core Customizer `wp.customize.previewedDevice`
 * (footer buttons: desktop / tablet / mobile).
 */

/** @returns {any} wp.customize or null */
function getCustomizeApi() {
	return typeof wp !== 'undefined' && wp.customize ? wp.customize : null;
}

/**
 * @returns {string|null}
 */
export function getCustomizerPreviewDevice() {
	const api = getCustomizeApi();
	const pd = api?.previewedDevice;
	if (!pd || typeof pd.get !== 'function') {
		return null;
	}
	const v = pd.get();
	return typeof v === 'string' ? v : null;
}

/**
 * @param {string} deviceId
 * @param {string[]} previewDeviceIds — must match `wp.customize.settings.previewableDevices` keys (core: desktop, tablet, mobile).
 */
export function syncCustomizerPreviewDevice(deviceId, previewDeviceIds) {
	const api = getCustomizeApi();
	if (!api?.previewedDevice?.set || !previewDeviceIds.includes(deviceId)) {
		return;
	}
	const devices = api.settings?.previewableDevices;
	if (!devices || !Object.prototype.hasOwnProperty.call(devices, deviceId)) {
		return;
	}
	const current = api.previewedDevice.get();
	if (current !== deviceId) {
		api.previewedDevice.set(deviceId);
	}
}

/**
 * @param {(deviceId: string) => void} callback
 * @returns {() => void} unsubscribe
 */
export function bindCustomizerPreviewDevice(callback) {
	const api = getCustomizeApi();
	const pd = api?.previewedDevice;
	if (!pd || typeof pd.bind !== 'function') {
		return () => {};
	}
	/** @param {string} newDevice */
	const handler = (newDevice) => {
		if (typeof newDevice === 'string') {
			callback(newDevice);
		}
	};
	pd.bind(handler);
	return () => {
		if (typeof pd.unbind === 'function') {
			pd.unbind(handler);
		}
	};
}
