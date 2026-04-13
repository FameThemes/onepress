/**
 * wp.media renders a `.media-modal` outside the Customizer/React tree. Popover
 * `useFocusOutside` treats focus moving there as "outside" and would close.
 *
 * @param {import('react').SyntheticEvent} event Blur/focus-outside event (persisted).
 * @returns {boolean}
 */
export function shouldIgnoreStylingPopoverFocusOutside(event) {
	const rt = event && 'relatedTarget' in event ? event.relatedTarget : null;
	if (rt instanceof HTMLElement && typeof rt.closest === 'function' && rt.closest('.media-modal')) {
		return true;
	}
	if (typeof document !== 'undefined') {
		const ae = document.activeElement;
		if (ae instanceof HTMLElement && typeof ae.closest === 'function' && ae.closest('.media-modal')) {
			return true;
		}
	}
	return false;
}
