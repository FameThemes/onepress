/**
 * Customizer control: alpha-color.
 */
export function registerAlphaColorControl(api, $) {
	api.controlConstructor['alpha-color'] = api.Control.extend({
		ready: function () {
			var control = this;
			$('.alpha-color-control', control.container).alphaColorPicker({
				clear: function () {},
			});
		},
	});
}
