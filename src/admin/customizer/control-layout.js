/**
 * Customizer control: visual layout picker (`onepress-layout`).
 */
export function registerLayoutControl(api, $) {
	api.controlConstructor['onepress-layout'] = api.Control.extend({
		ready() {
			const control = this;
			const container = control.container;
			const input = container.find('input.opc-layout-input');
			const buttons = container.find('.opc-layout-choice');

			function syncUi() {
				const val = String(input.val());
				buttons.each(function () {
					const $b = $(this);
					const on = $b.attr('data-value') === val;
					$b.toggleClass('is-selected', on);
					$b.attr('aria-checked', on ? 'true' : 'false');
				});
			}

			buttons.on('click', function () {
				const next = $(this).attr('data-value');
				if (typeof next === 'undefined') {
					return;
				}
				input.val(next).trigger('change');
				syncUi();
			});

			input.on('change', syncUi);

			if (control.setting && typeof control.setting.bind === 'function') {
				control.setting.bind((val) => {
					input.val(val);
					syncUi();
				});
			}

			syncUi();
		},
	});
}
