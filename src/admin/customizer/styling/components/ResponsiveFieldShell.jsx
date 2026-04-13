/**
 * Layout: [label] [device icon] then control (plan: device next to unit-bearing labels).
 */
import { DeviceSwitcherChip } from './DeviceSwitcherChip';

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
 */
export function ResponsiveFieldShell({ label, help, className, children }) {
	return (
		<div className={`rfield ${className || ''}`.trim()}>
			<div className="rfield-h">
				<span className="rfield-label">{label}</span>
				<DeviceSwitcherChip />
			</div>
			<div className="rfield-body">{children}</div>
			{help ? <p className="description rfield-help">{help}</p> : null}
		</div>
	);
}
