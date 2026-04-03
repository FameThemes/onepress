/**
 * Builder item template registry (extensible by third parties).
 *
 * @typedef {Object} BuilderItemTemplate
 * @property {string}                             name
 * @property {string}                             label
 * @property {string}                             [category]
 * @property {'leaf'|'section'|'columns'}         kind
 * @property {Object}                             defaultProps
 * @property {*}                                  [icon]           Canvas row icon; tree shows icon + label only (no content preview).
 * @property {import('react').ComponentType<any>} [Inspector]
 * @property {string[]}                           [allowedParents] Type names; omit = any container.
 */

import {
	COLUMNS_COUNT_MAX,
	COLUMNS_COUNT_MIN,
	equalColumnWidths,
} from './tree-utils.js';

/** @type {Map<string, BuilderItemTemplate>} */
const templates = new Map();

/**
 * @param {BuilderItemTemplate} config
 * @return {BuilderItemTemplate}
 */
export function defineBuilderItemTemplate( config ) {
	return config;
}

/**
 * @param {BuilderItemTemplate} template
 */
export function registerBuilderItemFromTemplate( template ) {
	if ( ! template?.name ) {
		return;
	}
	templates.set( template.name, template );
}

/**
 * @param {string} name
 */
export function unregisterBuilderItemTemplate( name ) {
	templates.delete( name );
}

/**
 * @return {BuilderItemTemplate[]}
 */
export function getAllBuilderItemTemplates() {
	return Array.from( templates.values() );
}

/**
 * @param {string} name
 * @return {BuilderItemTemplate|undefined}
 */
export function getBuilderItemTemplate( name ) {
	return templates.get( name );
}

/**
 * @param {string} name
 * @return {import('./tree-utils.js').BuilderNode|null}
 */
export function createNodeFromTemplate( name ) {
	const t = templates.get( name );
	if ( ! t ) {
		return null;
	}
	const id = `${ name.replace( /\//g, '-' ) }-${ Date.now() }-${ Math.random()
		.toString( 36 )
		.slice( 2, 9 ) }`;
	const base = {
		id,
		type: name,
		props: { ...t.defaultProps },
	};
	if ( t.kind === 'section' ) {
		return { ...base, children: [] };
	}
	if ( t.kind === 'columns' ) {
		const count = Math.min(
			COLUMNS_COUNT_MAX,
			Math.max(
				COLUMNS_COUNT_MIN,
				Number( t.defaultProps?.columnCount ) || COLUMNS_COUNT_MIN
			)
		);
		const columnWidths = equalColumnWidths( count );
		const columns = [];
		for ( let i = 0; i < count; i++ ) {
			columns.push( { id: `col-${ i + 1 }`, children: [] } );
		}
		return {
			...base,
			props: { ...base.props, columnCount: count, columnWidths },
			columns,
		};
	}
	return base;
}
