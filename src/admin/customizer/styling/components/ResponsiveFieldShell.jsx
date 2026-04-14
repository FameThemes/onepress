/**
 * Layout: [label] [device + length unit] then control.
 */
import { DeviceSwitcherChip } from './DeviceSwitcherChip';
import { LengthUnitSwitcherChip } from './LengthUnitSwitcherChip';

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} [props.className]
 * @param {boolean} [props.showLengthUnitChip]
 * @param {import('react').ReactNode} props.children
 */
export function ResponsiveFieldShell({ label, help, className, showLengthUnitChip = true, children }) {
	return (
		<div className={`rfield ${className || ''}`.trim()}>
			<div className="rfield-h">
				<span className="rfield-label">{label}</span>
				<div className="styling-field-end-chips">
					{showLengthUnitChip ? <LengthUnitSwitcherChip /> : null}
					<DeviceSwitcherChip />
				</div>
			</div>
			<div className="rfield-body">{children}</div>
			{help ? <p className="description rfield-help">{help}</p> : null}
		</div>
	);
}
