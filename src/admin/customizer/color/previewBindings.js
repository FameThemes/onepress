/**
 * Customizer preview iframe: `--color-*` custom properties via postMessage.
 * Mirrors {@see onepress_theme_mod_id_to_color_css_var()} in PHP.
 *
 * @param {import('wp-customize').Customize} api wp.customize
 */
export function bindOnePressColorPreview(api) {
	const ids =
		typeof window !== 'undefined' &&
		Array.isArray(window.onepressColorPostMessageSettingIds)
			? window.onepressColorPostMessageSettingIds
			: [];
	if (!ids.length) {
		return;
	}

	/**
	 * @param {string} settingId
	 * @returns {string}
	 */
	function settingIdToCssVar(settingId) {
		let s = String(settingId);
		if (s.startsWith('onepress_')) {
			s = s.slice('onepress_'.length);
		}
		return '--color-' + s.replace(/_/g, '-');
	}

	/**
	 * @param {string} settingId
	 * @param {unknown} raw
	 */
	function applyColorVar(settingId, raw) {
		const prop = settingIdToCssVar(settingId);
		const v =
			raw != null && String(raw).trim() !== '' ? String(raw).trim() : '';
		if (v) {
			document.documentElement.style.setProperty(prop, v);
		} else {
			// Must override :root vars from #onepress-style-inline-css so cleared values use SCSS fallbacks.
			document.documentElement.style.setProperty(prop, 'initial');
		}
	}

	api.bind('preview-ready', () => {
		ids.forEach((id) => {
			const sid = String(id).trim();
			if (!sid) {
				return;
			}
			api(sid, (setting) => {
				applyColorVar(sid, setting.get());
				setting.bind((to) => applyColorVar(sid, to));
			});
		});
	});
}
