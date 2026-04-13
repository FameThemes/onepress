/**
 * One collapsible styling section (PanelBody) — accordion “tab” in Customizer.
 */
import { PanelBody } from '@wordpress/components';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {boolean} [props.initialOpen] — uncontrolled (ignored if `opened` + `onToggle` passed)
 * @param {boolean} [props.opened] — controlled open state
 * @param {(nextOpen: boolean) => void} [props.onToggle] — controlled toggle
 * @param {import('react').ReactNode} props.children
 */
export function StylingGroupPanel({ title, initialOpen = false, opened, onToggle, children }) {
	const controlled = typeof opened === 'boolean' && typeof onToggle === 'function';
	return (
		<PanelBody
			title={title}
			{...(controlled ? { opened, onToggle } : { initialOpen })}
		>
			{children}
		</PanelBody>
	);
}
