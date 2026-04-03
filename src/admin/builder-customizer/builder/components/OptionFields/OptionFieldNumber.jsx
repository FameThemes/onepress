import { NumberControl } from '@wordpress/components';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * Numeric value (e.g. attachment ID for image field).
 *
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldNumber( {
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
	const num = Number( propsBag[ name ] );
	const value = Number.isFinite( num ) ? num : 0;
	return (
		<NumberControl
			className={ OPTION_FIELD_CLASS }
			label={ label }
			help={ help }
			value={ value }
			min={ 0 }
			onChange={ ( v ) =>
				onChangeProps( { [ name ]: v == null ? 0 : Number( v ) } )
			}
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		/>
	);
}
