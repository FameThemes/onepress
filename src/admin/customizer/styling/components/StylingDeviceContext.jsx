/**
 * Global breakpoint for the styling control: one deviceId drives all responsive fields.
 */
import { createContext, useContext, useMemo } from '@wordpress/element';

/**
 * @typedef {{ id: string, label?: string, maxWidth?: string }} StylingBreakpoint
 */

/** @type {import('react').Context<null | { deviceId: string, setDeviceId: (id: string) => void, breakpoints: StylingBreakpoint[] }>} */
const StylingDeviceContext = createContext(null);

/**
 * @param {object} props
 * @param {string} props.deviceId
 * @param {(id: string) => void} props.setDeviceId
 * @param {StylingBreakpoint[]} props.breakpoints
 * @param {import('react').ReactNode} props.children
 */
export function StylingDeviceProvider({ deviceId, setDeviceId, breakpoints, children }) {
	const value = useMemo(
		() => ({ deviceId, setDeviceId, breakpoints }),
		[deviceId, setDeviceId, breakpoints]
	);
	return <StylingDeviceContext.Provider value={value}>{children}</StylingDeviceContext.Provider>;
}

/**
 * @returns {{ deviceId: string, setDeviceId: (id: string) => void, breakpoints: StylingBreakpoint[] }}
 */
export function useStylingDevice() {
	const ctx = useContext(StylingDeviceContext);
	if (!ctx) {
		throw new Error('useStylingDevice must be used within StylingDeviceProvider');
	}
	return ctx;
}
