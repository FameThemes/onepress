/**
 * System font presets + Google Fonts from Font Library REST (merged for picker; Google order = API order).
 */
import { useEffect, useMemo, useState } from '@wordpress/element';
import { fetchGoogleFontFamilies, mergePickerFamilies } from './googleFontCollection';

/**
 * @typedef {import('./googleFontCollection').PickerFontFamily} PickerFontFamily
 */

/**
 * @returns {{ families: PickerFontFamily[], error: Error | null, loading: boolean }}
 */
export function useGoogleFontFamilies() {
	const [googleFamilies, setGoogleFamilies] = useState(
		/** @type {PickerFontFamily[] | null} */ (null)
	);
	const [error, setError] = useState(/** @type {Error | null} */ (null));
	const [loading, setLoading] = useState(true);

	const families = useMemo(
		() => mergePickerFamilies(googleFamilies),
		[googleFamilies]
	);

	useEffect(() => {
		let cancelled = false;
		fetchGoogleFontFamilies()
			.then((data) => {
				if (!cancelled) {
					setGoogleFamilies(data);
					setError(null);
				}
			})
			.catch((e) => {
				if (!cancelled) {
					setError(e instanceof Error ? e : new Error(String(e)));
					setGoogleFamilies(null);
				}
			})
			.finally(() => {
				if (!cancelled) {
					setLoading(false);
				}
			});
		return () => {
			cancelled = true;
		};
	}, []);

	return { families, error, loading };
}
