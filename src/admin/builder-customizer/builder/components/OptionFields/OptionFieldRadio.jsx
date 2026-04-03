import { RadioControl } from '@wordpress/components';

import { normalizeFieldOptions, OPTION_FIELD_CLASS } from './utils.js';

/**
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldRadio( {
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
	const options = normalizeFieldOptions( field );
	const raw = propsBag[ name ];
	const selected =
		raw !== undefined && raw !== null ? String( raw ) : '';
	return (
		<RadioControl
			className={ OPTION_FIELD_CLASS }
			label={ label }
			help={ help }
			selected={ selected }
			options={ options }
			onChange={ ( v ) => onChangeProps( { [ name ]: v } ) }
		/>
	);
}
