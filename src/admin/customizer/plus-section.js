/**
 * OnePress Plus upsell section (always contextually active).
 */
export function registerPlusSection(api) {
	api.sectionConstructor['onepress-plus'] = api.Section.extend({
		attachEvents: function () {},
		isContextuallyActive: function () {
			return true;
		},
	});
}
