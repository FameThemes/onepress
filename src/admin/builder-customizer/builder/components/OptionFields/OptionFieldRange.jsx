import { RangeControl } from '@wordpress/components';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * range + slider (PHP schema)
 *
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldRange( {
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
	const min =
		typeof field.min === 'number' ? field.min : 0;
	const max =
		typeof field.max === 'number' ? field.max : 100;
	const step =
		typeof field.step === 'number' ? field.step : 1;
	const def =
		typeof field.default === 'number' ? field.default : min;
	const num = Number( propsBag[ name ] );
	const value = Number.isFinite( num ) ? num : def;
	return (
		<RangeControl
			className={ OPTION_FIELD_CLASS }
			label={ label }
			help={ help }
			value={ value }
			onChange={ ( v ) => {
				if ( v == null ) {
					return;
				}
				onChangeProps( { [ name ]: v } );
			} }
			min={ min }
			max={ max }
			step={ step }
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		/>
	);
}
