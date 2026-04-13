/**
 * Full declaration string editor (custom / advanced).
 */
import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DeviceSwitcherChip } from './DeviceSwitcherChip';

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 */
export function RawDeclarationsField({ value, onChange }) {
	return (
		<div className="rfield">
			<div className="rfield-h">
				<span className="rfield-label">
					{__('Raw CSS (full string for this state & device)', 'onepress')}
				</span>
				<DeviceSwitcherChip />
			</div>
			<div className="rfield-body">
				<TextareaControl
					value={value}
					onChange={onChange}
					rows={6}
					className="textarea-mono"
				/>
			</div>
			<p className="description rfield-help">
				{__(
					'Overrides are parsed into the groups above when possible; other properties stay preserved.',
					'onepress'
				)}
			</p>
		</div>
	);
}
