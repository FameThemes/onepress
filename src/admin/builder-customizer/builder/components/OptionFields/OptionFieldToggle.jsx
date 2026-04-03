import { ToggleControl } from '@wordpress/components';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * toggle + switch
 *
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldToggle( {
	field,
	propsBag,
	onChangeProps,
} ) {
	const name =
		typeof field.name === 'string' ? field.name : '';
	if ( ! name ) {
		return null;
	}
	const label =
		typeof field.label === 'string' ? field.label : '';
	const help =
		typeof field.help === 'string' ? field.help : undefined;
	const checked = Boolean( propsBag[ name ] );
	return (
		<ToggleControl
			className={ OPTION_FIELD_CLASS }
			label={ label }
			help={ help }
			checked={ checked }
			onChange={ ( v ) => onChangeProps( { [ name ]: v } ) }
			__nextHasNoMarginBottom
		/>
	);
}
