/**
 * Typography Customizer control — React UI, no jQuery. Control type: onepress_typo
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { TypographyControlApp } from './TypographyControlApp.jsx';

const { customize } = wp;

customize.controlConstructor.onepress_typo = customize.Control.extend({
	ready() {
		const control = this;
		const wrap = control.container[0];
		const host = wrap?.querySelector?.('.onepress-typo-react-root');
		if (!host) {
			return;
		}

		const root = createRoot(host);
		root.render(
			createElement(TypographyControlApp, {
				control,
				webfonts: window.onepressTypoWebfonts || {},
				styleLabels: window.onepressTypoFontStyleLabels || {},
			})
		);
		control._onepressTypoRoot = root;
	},

	destroy() {
		if (this._onepressTypoRoot) {
			this._onepressTypoRoot.unmount();
			this._onepressTypoRoot = null;
		}
		customize.Control.prototype.destroy.call(this);
	},
});
