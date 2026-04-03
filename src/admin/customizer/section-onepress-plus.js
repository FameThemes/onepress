/** @param {Object} api wp.customize */
export function registerOnepressPlusSection( api ) {
	api.sectionConstructor[ 'onepress-plus' ] = api.Section.extend( {
		attachEvents() {},

		isContextuallyActive() {
			return true;
		},
	} );
}
