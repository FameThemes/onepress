/**
 * Slider Customizer control — React UI. Control type: onepress_slider
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { SliderControlApp } from './SliderControlApp.jsx';

const { customize } = wp;

customize.controlConstructor.onepress_slider = customize.Control.extend({
	ready() {
		const control = this;
		const wrap = control.container[0];
		const host = wrap?.querySelector?.('.onepress-slider-react-root');
		if (!host) {
			return;
		}

		const root = createRoot(host);
		root.render(createElement(SliderControlApp, { control }));
		control._onepressSliderRoot = root;
	},

	destroy() {
		if (this._onepressSliderRoot) {
			this._onepressSliderRoot.unmount();
			this._onepressSliderRoot = null;
		}
		customize.Control.prototype.destroy.call(this);
	},
});
