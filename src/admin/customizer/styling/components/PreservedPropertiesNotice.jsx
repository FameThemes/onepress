/**
 * Hint when unknown CSS properties exist in the current slice string.
 */
import { __ } from '@wordpress/i18n';

/**
 * @param {object} props
 * @param {number} props.count
 */
export function PreservedPropertiesNotice({ count }) {
	if (count <= 0) {
		return null;
	}
	return (
		<p className="description unknown-hint">
			{__('Extra CSS properties from manual edits are preserved.', 'onepress')} ({count})
		</p>
	);
}
