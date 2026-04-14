/**
 * Customizer control: font_manager (React UI + JSON setting).
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { FontManagerControlApp } from './font-manager/FontManagerControlApp';

/**
 * @param {import('@wordpress/customize').Customize} api wp.customize
 * @param {JQueryStatic} $ jQuery
 */
export function registerFontManagerControl(api, $) {
	api.controlConstructor.font_manager = api.Control.extend({
		ready() {
			const control = this;
			const run = () => {
				const el = control.container.find('.font-manager-root').get(0);
				if (!el) {
					return;
				}
				const root = createRoot(el);
				root.render(createElement(FontManagerControlApp, { control, $ }));
				control._onepressFontManagerRoot = root;
			};
			if (typeof window.requestAnimationFrame === 'function') {
				window.requestAnimationFrame(() => {
					window.requestAnimationFrame(run);
				});
			} else {
				window.setTimeout(run, 50);
			}
		},
	});
}
