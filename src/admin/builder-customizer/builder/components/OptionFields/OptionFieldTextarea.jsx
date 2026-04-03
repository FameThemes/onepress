import { TextareaControl } from '@wordpress/components';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldTextarea( {
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
	const rows =
		typeof field.rows === 'number' && field.rows > 0
			? field.rows
			: 4;
	const value =
		propsBag[ name ] != null ? String( propsBag[ name ] ) : '';
	return (
		<TextareaControl
			className={ OPTION_FIELD_CLASS }
			label={ label }
			help={ help }
			value={ value }
			rows={ rows }
			onChange={ ( v ) => onChangeProps( { [ name ]: v } ) }
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		/>
	);
}
