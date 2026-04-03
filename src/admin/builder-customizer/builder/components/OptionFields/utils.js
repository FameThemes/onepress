/**
 * @param {unknown} node
 * @return {Record<string, unknown>}
 */
export function getPropsBag( node ) {
	if ( ! node || typeof node !== 'object' || ! node.props ) {
		return {};
	}
	const p = node.props;
	return typeof p === 'object' && p !== null ? p : {};
}

/**
 * @param {Record<string, unknown>} field
 * @return {Array<{ label: string, value: string }>}
 */
export function normalizeFieldOptions( field ) {
	const raw = Array.isArray( field.options ) ? field.options : [];
	return raw.map( ( o ) => {
		if ( o && typeof o === 'object' ) {
			return {
				label:
					typeof o.label === 'string'
						? o.label
						: String( o.value ?? '' ),
				value: String( o.value ?? '' ),
			};
		}
		return { label: '', value: '' };
	} );
}

export const OPTION_FIELD_CLASS = 'opb-mini-builder-field';
