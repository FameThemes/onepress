import { CheckboxControl } from '@wordpress/components';

import { OPTION_FIELD_CLASS } from './utils.js';

/**
 * @param {Object} props
 * @param {Record<string, unknown>} props.field
 * @param {Record<string, unknown>} props.propsBag
 * @param {Function} props.onChangeProps
 */
export default function OptionFieldCheckboxGroup( {
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
	const rawOpts = Array.isArray( field.options ) ? field.options : [];
	const selected = Array.isArray( propsBag[ name ] )
		? propsBag[ name ].map( String )
		: [];
	return (
		<div
			className={
				OPTION_FIELD_CLASS + ' opb-mini-builder-field--checkboxes'
			}
		>
			{ label ? (
				<p className="components-base-control__label">{ label }</p>
			) : null }
			{ help ? (
				<p className="components-base-control__help">{ help }</p>
			) : null }
			{ rawOpts.map( ( o, i ) => {
				if ( ! o || typeof o !== 'object' ) {
					return null;
				}
				const optVal = String( o.value ?? '' );
				const optLabel =
					typeof o.label === 'string' ? o.label : optVal;
				return (
					<CheckboxControl
						key={ i }
						label={ optLabel }
						checked={ selected.includes( optVal ) }
						onChange={ ( isOn ) => {
							const next = isOn
								? [ ...selected, optVal ]
								: selected.filter( ( x ) => x !== optVal );
							onChangeProps( { [ name ]: next } );
						} }
					/>
				);
			} ) }
		</div>
	);
}
