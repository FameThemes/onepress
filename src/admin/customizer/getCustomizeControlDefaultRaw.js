/**
 * Raw default string for a Customize control setting (JSON where applicable).
 *
 * @param {object} control wp.customize.Control instance
 * @returns {string}
 */
export function getCustomizeControlDefaultRaw(control) {
	// WP_Customize_Setting::json() does not expose PHP `default` to JS; OnePress controls add it in to_json().
	const fromParams = control.params?.default;
	if (fromParams != null && fromParams !== '') {
		if (typeof fromParams === 'string') {
			return fromParams;
		}
		if (typeof fromParams === 'object') {
			try {
				return JSON.stringify(fromParams);
			} catch {
				return '';
			}
		}
		return String(fromParams);
	}

	const setting = control.setting || control.settings?.default;
	if (setting && typeof setting === 'object' && 'default' in setting) {
		const d = setting.default;
		if (typeof d === 'string') {
			return d;
		}
		if (d != null && typeof d === 'object') {
			try {
				return JSON.stringify(d);
			} catch {
				return '';
			}
		}
		if (d != null) {
			return String(d);
		}
	}

	return '';
}
