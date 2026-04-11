/**
 * Customizer control: alpha-color (React + Modal + ColorPicker).
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { AlphaColorControlApp } from './AlphaColorControlApp.jsx';

const { customize } = wp;

customize.controlConstructor['alpha-color'] = customize.Control.extend({
	ready() {
		const control = this;
		const wrap = control.container[0];
		const host = wrap?.querySelector?.('.onepress-alpha-color-react-root');
		if (!host) {
			return;
		}

		const root = createRoot(host);
		root.render(createElement(AlphaColorControlApp, { control }));
		control._onepressAlphaColorRoot = root;
	},

	destroy() {
		if (this._onepressAlphaColorRoot) {
			this._onepressAlphaColorRoot.unmount();
			this._onepressAlphaColorRoot = null;
		}
		customize.Control.prototype.destroy.call(this);
	},
});
