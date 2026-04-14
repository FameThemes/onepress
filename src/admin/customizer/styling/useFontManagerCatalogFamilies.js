/**
 * Live list of fonts from Customizer setting `onepress_font_manager` (PickerFontFamily shape).
 */
import { useEffect, useState } from '@wordpress/element';
import { fontManagerValueToPickerFamilies } from '../font-manager/fontManagerCatalog';

/** Default theme_mod id; PHP filter `onepress_font_manager_theme_mod_id` may change it. */
export const ONEPRESS_FONT_MANAGER_SETTING_ID = 'onepress_font_manager';

/**
 * @param {import('@wordpress/customize').Customize | null | undefined} api
 * @param {import('../font-manager/fontManagerCatalog').PickerFontFamily[] | null | undefined} googleFamilies — for preview URLs on Google entries
 */
export function useFontManagerCatalogFamilies(api, googleFamilies) {
	const [local, setLocal] = useState(/** @type {import('./googleFontCollection').PickerFontFamily[]} */ ([]));

	useEffect(() => {
		if (!api || typeof api !== 'function') {
			setLocal([]);
			return undefined;
		}
		const setting = api(ONEPRESS_FONT_MANAGER_SETTING_ID);
		if (!setting || typeof setting.get !== 'function') {
			setLocal([]);
			return undefined;
		}
		const apply = () => {
			const raw = setting.get();
			setLocal(fontManagerValueToPickerFamilies(raw, googleFamilies));
		};
		apply();
		if (typeof setting.bind === 'function') {
			setting.bind(apply);
			return () => {
				if (typeof setting.unbind === 'function') {
					setting.unbind(apply);
				}
			};
		}
		return undefined;
	}, [api, googleFamilies]);

	return local;
}
