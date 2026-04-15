/**
 * Segmented control for a fixed set of CSS keywords (plan: prefer button group over Select).
 */
import { Button, ButtonGroup, Icon } from '@wordpress/components';

/**
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {{ value: string, label: string, icon?: import('@wordpress/primitives').SVG }[]} props.options — `icon` shows icon-only segment; `label` is used for tooltip and a11y
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 */
export function CssEnumButtonGroup({ label, value, onChange, options, className, disabled = false }) {
	return (
		<div className={`enum-group ${className || ''}`.trim()}>
			{label ? <div className="enum-label">{label}</div> : null}
			<ButtonGroup className="enum-buttons">
				{options.map((o) => (
					<Button
						key={o.value === '' ? '__default' : o.value}
						variant={value === o.value ? 'primary' : 'default'}
						disabled={disabled}
						label={o.icon ? o.label : undefined}
						showTooltip={Boolean(o.icon)}
						onClick={() => {
							if (!disabled) {
								onChange(o.value);
							}
						}}
						// size="small"
						// icon={o?.icon || undefined}
					>
						{o.icon ? <Icon icon={o.icon} size={22} /> : o.label}
					</Button>
				))}
			</ButtonGroup>
		</div>
	);
}
