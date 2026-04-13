/**
 * Customizer control: styling (React UI + JSON setting).
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { StylingControlApp } from './styling/StylingControlApp';

/**
 * @param {import('@wordpress/customize').Customize} api wp.customize
 * @param {JQueryStatic} $ jQuery
 */
export function registerStylingControl(api, $) {
	api.controlConstructor.styling = api.Control.extend({
		ready() {
			const control = this;
			const run = () => {
				const el = control.container.find('.styling-root').get(0);
				if (!el) {
					return;
				}
				const root = createRoot(el);
				root.render(createElement(StylingControlApp, { control, $ }));
				control._onepressStylingRoot = root;
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
