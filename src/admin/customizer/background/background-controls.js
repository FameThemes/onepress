/**
 * Background Customizer control — React. Type: onepress_background
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { BackgroundControlApp } from './BackgroundControlApp.jsx';

const { customize } = wp;

customize.controlConstructor.onepress_background = customize.Control.extend({
	ready() {
		const control = this;
		const wrap = control.container[0];
		const host = wrap?.querySelector?.('.onepress-background-react-root');
		if (!host) {
			return;
		}

		const root = createRoot(host);
		root.render(createElement(BackgroundControlApp, { control }));
		control._onepressBackgroundRoot = root;
	},

	destroy() {
		if (this._onepressBackgroundRoot) {
			this._onepressBackgroundRoot.unmount();
			this._onepressBackgroundRoot = null;
		}
		customize.Control.prototype.destroy.call(this);
	},
});
