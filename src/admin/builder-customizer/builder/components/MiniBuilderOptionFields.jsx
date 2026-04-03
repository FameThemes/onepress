import { getOptionFieldComponent } from './OptionFields/index.js';
import { getPropsBag } from './OptionFields/utils.js';

/**
 * @param {Object}   props
 * @param {Array<Record<string, unknown>>} props.schema
 * @param {Object}   props.node
 * @param {Function} props.onChangeProps  (patch: Record<string, unknown>) => void
 * @param {Function} props.onChangeColumnCount
 */
export default function MiniBuilderOptionFields( {
	schema,
	node,
	onChangeProps,
	onChangeColumnCount,
} ) {
	if ( ! Array.isArray( schema ) || schema.length === 0 ) {
		return null;
	}

	const propsBag = getPropsBag( node );

	return (
		<div className="opb-mini-builder-fields">
			{ schema.map( ( field, index ) => {
				const type =
					typeof field.type === 'string' ? field.type : '';
				const Com = getOptionFieldComponent( type );
				if ( ! Com ) {
					return null;
				}
				const key =
					typeof field.name === 'string' && field.name
						? field.name
						: `${ type }-${ index }`;
				return (
					<Com
						key={ key }
						field={ field }
						node={ node }
						propsBag={ propsBag }
						onChangeProps={ onChangeProps }
						onChangeColumnCount={ onChangeColumnCount }
					/>
				);
			} ) }
		</div>
	);
}
