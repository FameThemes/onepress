/**
 * Spacing Customizer control — React UI. Control type: onepress_spacing
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { SpacingControlApp } from './SpacingControlApp.jsx';

const { customize } = wp;

customize.controlConstructor.onepress_spacing = customize.Control.extend({
	ready() {
		const control = this;
		const wrap = control.container[0];
		const host = wrap?.querySelector?.('.onepress-spacing-react-root');
		if (!host) {
			return;
		}

		const root = createRoot(host);
		root.render(createElement(SpacingControlApp, { control }));
		control._onepressSpacingRoot = root;
	},

	destroy() {
		if (this._onepressSpacingRoot) {
			this._onepressSpacingRoot.unmount();
			this._onepressSpacingRoot = null;
		}
		customize.Control.prototype.destroy.call(this);
	},
});
