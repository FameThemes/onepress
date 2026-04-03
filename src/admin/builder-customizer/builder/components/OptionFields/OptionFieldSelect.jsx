import { SelectControl } from '@wordpress/components';

import { normalizeFieldOptions, OPTION_FIELD_CLASS } from './utils.js';

/**
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldSelect( {
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
	const value =
		raw !== undefined && raw !== null ? String( raw ) : '';
	return (
		<SelectControl
			className={ OPTION_FIELD_CLASS }
			label={ label }
			help={ help }
			value={ value }
			options={ options }
			onChange={ ( v ) => {
				if ( field.valueType === 'number' ) {
					const n = parseInt( v, 10 );
					onChangeProps( {
						[ name ]: Number.isFinite( n ) ? n : v,
					} );
				} else {
					onChangeProps( { [ name ]: v } );
				}
			} }
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		/>
	);
}
