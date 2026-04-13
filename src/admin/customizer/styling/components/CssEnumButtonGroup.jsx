/**
 * Segmented control for a fixed set of CSS keywords (plan: prefer button group over Select).
 */
import { Button, ButtonGroup } from '@wordpress/components';

/**
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {{ value: string, label: string }[]} props.options
 * @param {string} [props.className]
 */
export function CssEnumButtonGroup({ label, value, onChange, options, className }) {
	return (
		<div className={`enum-group ${className || ''}`.trim()}>
			{label ? <div className="enum-label">{label}</div> : null}
			<ButtonGroup className="enum-buttons">
				{options.map((o) => (
					<Button
						key={o.value === '' ? '__default' : o.value}
						variant={value === o.value ? 'primary' : 'secondary'}
						isSmall
						onClick={() => onChange(o.value)}
					>
						{o.label}
					</Button>
				))}
			</ButtonGroup>
		</div>
	);
}
