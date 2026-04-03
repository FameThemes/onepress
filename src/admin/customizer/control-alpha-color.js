/**
 * @param {Object} api @param {Function} $ jQuery
 * @param          $
 */
export function registerAlphaColorControl( api, $ ) {
	api.controlConstructor[ 'alpha-color' ] = api.Control.extend( {
		ready() {
			const control = this;
			$( '.alpha-color-control', control.container ).alphaColorPicker( {
				clear() {},
			} );
		},
	} );
}
