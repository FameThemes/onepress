import { BaseControl, Button, ColorPicker } from '@wordpress/components';
// eslint-disable-next-line import/no-extraneous-dependencies -- transitive via @wordpress/components
import { colord } from 'colord';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * Color field with @wordpress/components ColorPicker (alpha via hex8 when needed).
 *
 * @param {Object}                  props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function}                props.onChangeProps
 */
export default function OptionFieldColor( { field, propsBag, onChangeProps } ) {
	const name = typeof field.name === 'string' ? field.name : '';
	const label = typeof field.label === 'string' ? field.label : '';
	const help = typeof field.help === 'string' ? field.help : undefined;
	const controlId = name ? `opb-field-color-${ name }` : 'opb-field-color';

	const stored = useMemo( () => {
		if ( ! name ) {
			return '';
		}
		const raw = propsBag[ name ];
		if ( raw === undefined || raw === null ) {
			return '';
		}
		return String( raw ).trim();
	}, [ name, propsBag ] );

	const displayColor = useMemo( () => {
		if ( stored === '' ) {
			return '#ffffff';
		}
		const c = colord( stored );
		if ( ! c.isValid() ) {
			return '#ffffff';
		}
		return c.toHex();
	}, [ stored ] );

	if ( ! name ) {
		return null;
	}

	return (
		<BaseControl
			id={ controlId }
			className={ OPTION_FIELD_CLASS + ' opb-mini-builder-field--color' }
			label={ label }
			help={ help }
			__nextHasNoMarginBottom
		>
			<div className="opb-field-color">
				<ColorPicker
					enableAlpha
					color={ displayColor }
					onChange={ ( hex ) => onChangeProps( { [ name ]: hex } ) }
				/>
				<div className="opb-field-color__footer">
					<Button
						variant="tertiary"
						onClick={ () => onChangeProps( { [ name ]: '' } ) }
					>
						{ __( 'Clear color', 'onepress' ) }
					</Button>
				</div>
			</div>
		</BaseControl>
	);
}
