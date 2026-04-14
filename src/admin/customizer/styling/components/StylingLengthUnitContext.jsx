/**
 * Preferred CSS length suffix: controlled by {@link StylingControlApp} so chip changes can remap the full payload.
 */
import { createContext, useContext, useMemo } from '@wordpress/element';

/** @type {ReadonlyArray<{ suffix: string, label: string }>} */
export const STYLING_LENGTH_UNIT_OPTIONS = [
	{ suffix: 'px', label: 'px' },
	{ suffix: 'rem', label: 'rem' },
	{ suffix: 'em', label: 'em' },
	{ suffix: '%', label: '%' },
];

/** @type {Set<string>} */
export const STYLING_LENGTH_UNIT_SUFFIXES = new Set(STYLING_LENGTH_UNIT_OPTIONS.map((o) => o.suffix));

/**
 * @typedef {{
 *   preferredSuffix: string,
 *   setPreferredSuffix: (suffix: string) => void,
 *   adoptSuffixFromValue: (suffix: string) => void,
 * }} StylingLengthUnitContextValue
 */

/** @type {import('react').Context<null | StylingLengthUnitContextValue>} */
const StylingLengthUnitContext = createContext(null);

/**
 * @param {object} props
 * @param {string} props.preferredSuffix
 * @param {(suffix: string) => void} props.onApplyTargetUnit — user picked a unit in the chip: remap all declarations, then set suffix.
 * @param {(suffix: string) => void} props.onAdoptSuffixFromValue — field contained an explicit unit: update chip only (no remap).
 * @param {import('react').ReactNode} props.children
 */
export function StylingLengthUnitProvider({ preferredSuffix, onApplyTargetUnit, onAdoptSuffixFromValue, children }) {
	const value = useMemo(
		() => ({
			preferredSuffix,
			setPreferredSuffix: onApplyTargetUnit,
			adoptSuffixFromValue: onAdoptSuffixFromValue,
		}),
		[preferredSuffix, onApplyTargetUnit, onAdoptSuffixFromValue]
	);
	return <StylingLengthUnitContext.Provider value={value}>{children}</StylingLengthUnitContext.Provider>;
}

/**
 * @returns {StylingLengthUnitContextValue | null}
 */
export function useStylingLengthUnitOptional() {
	return useContext(StylingLengthUnitContext);
}

/**
 * @returns {string} preferred suffix, or 'px' when outside provider
 */
export function usePreferredLengthSuffix() {
	const ctx = useContext(StylingLengthUnitContext);
	return ctx?.preferredSuffix ?? 'px';
}
