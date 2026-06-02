/**
 * Customizer control: repeatable fields (React UI + wp.customize.Setting bridge).
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { RepeatableControlApp } from './repeatable/RepeatableControlApp';
import { installRepeatableMediaBridge } from './repeatable/repeatable-media-bridge';

export function registerRepeatableControl(api, $) {
	installRepeatableMediaBridge($);

	api.controlConstructor['repeatable'] = api.Control.extend({
		ready() {
			const control = this;
			const run = () => {
				const ul = control.container.find('.form-data .list-repeatable').get(0);
				if (!ul) {
					return;
				}
				const root = createRoot(ul);
				root.render(
					createElement(RepeatableControlApp, {
						api,
						$,
						control,
					})
				);
				control._onepressRepeatableRoot = root;
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
