/**
 * Block option field schemas from PHP (wp_localize_script → window.onepressMiniBuilder).
 *
 * @return {Record<string, Array<Record<string, unknown>>>}
 */
export function getMiniBuilderBlockOptionsSchemas() {
	if ( typeof window === 'undefined' || ! window.onepressMiniBuilder ) {
		return {};
	}
	const s = window.onepressMiniBuilder.blockOptionsSchemas;
	return s && typeof s === 'object' ? s : {};
}

/**
 * @param {string} type Block type e.g. onepress/text
 * @return {Array<Record<string, unknown>>}
 */
export function getMiniBuilderSchemaForType( type ) {
	const all = getMiniBuilderBlockOptionsSchemas();
	const row = all[ type ];
	return Array.isArray( row ) ? row : [];
}

/**
 * @return {Array<Record<string, unknown>>}
 */
export function getMiniBuilderItemTemplates() {
	if ( typeof window === 'undefined' || ! window.onepressMiniBuilder ) {
		return [];
	}
	const t = window.onepressMiniBuilder.itemTemplates;
	return Array.isArray( t ) ? t : [];
}
