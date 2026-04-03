/**
 * Webpack entry: React layout builder for the Customizer (self-contained).
 *
 * PHP: inc/mini-builder/mini-builder.php
 * Source tree: src/admin/builder-customizer/builder/
 *
 * @package
 */
import { mountBuilderApp } from './builder/BuilderApp.jsx';

/**
 * @param {*} control wp.customize.Control
 */
function tryMountControl( control ) {
	const el = control.container.find( '.onepress-builder-root' )[ 0 ];
	if ( ! el || el.dataset.onepressBuilderMounted === '1' ) {
		return;
	}
	if ( el.getAttribute( 'data-onepress-app' ) !== 'onepress-builder' ) {
		return;
	}
	const settingId =
		el.getAttribute( 'data-setting' ) ||
		( control.setting && control.setting.id ) ||
		control.id;
	const controlId = el.getAttribute( 'data-control-id' ) || control.id;
	const sectionId =
		el.getAttribute( 'data-section-id' ) || control.params.section || '';
	el.dataset.onepressBuilderMounted = '1';
	mountBuilderApp( { settingId, controlId, sectionId }, el );
}

function tryMountBuilder() {
	if ( typeof wp === 'undefined' || ! wp.customize ) {
		return;
	}
	wp.customize.control.each( tryMountControl );
}

wp.customize.bind( 'ready', () => {
	tryMountBuilder();
	wp.customize.section.each( ( section ) => {
		section.expanded.bind( ( open ) => {
			if ( open ) {
				tryMountBuilder();
			}
		} );
	} );
} );
