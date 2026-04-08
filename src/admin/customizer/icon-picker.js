/**
 * Icon picker (React) + footer layout columns visibility.
 */
import { createElement } from '@wordpress/element';
import { createRoot } from 'react-dom/client';
import { IconPickerApp } from './icon-picker/IconPickerApp';
import { injectIconFontLinks } from './icon-picker/injectFontLinks';

function initFooterLayoutColumns($) {
	const displayFooterLayout = function (l) {
		$('li[id^="customize-control-footer_custom_"]').hide();
		$('li[id^="customize-control-footer_custom_' + l + '_columns"]').show();
	};

	displayFooterLayout($('#customize-control-footer_layout select').val());
	$('#customize-control-footer_layout select').on('change', function () {
		displayFooterLayout($(this).val());
	});
}

export function initIconPicker($) {
	window.editing_icon = false;

	if (typeof C_Icon_Picker === 'undefined') {
		initFooterLayoutColumns($);
		return;
	}

	const hasFonts = C_Icon_Picker.fonts && Object.keys(C_Icon_Picker.fonts).length > 0;
	const hasSvgTab = Boolean(C_Icon_Picker.svg_code);
	if (!hasFonts && !hasSvgTab) {
		initFooterLayoutColumns($);
		return;
	}

	injectIconFontLinks($);

	const overlay = document.querySelector('.wp-full-overlay');
	const host = document.createElement('div');
	host.id = 'onepress-icon-picker-host';
	(overlay || document.body).appendChild(host);

	const root = createRoot(host);
	root.render(createElement(IconPickerApp, { $ }));

	initFooterLayoutColumns($);
}
