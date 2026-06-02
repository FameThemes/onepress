/**
 * Inject stylesheet <link> tags for each icon font (same ids/behavior as legacy picker).
 */
export function injectIconFontLinks($) {
	if (typeof C_Icon_Picker === 'undefined' || !C_Icon_Picker.fonts) {
		return;
	}
	$.each(C_Icon_Picker.fonts, function (key, font) {
		const f = $.extend(
			{},
			{
				url: '',
				name: '',
				prefix: '',
				icons: '',
			},
			font
		);
		if (Array.isArray(f.url)) {
			f.url.forEach((el) => {
				$('<link>')
					.appendTo('head')
					.attr({ type: 'text/css', rel: 'stylesheet' })
					.attr('id', 'customizer-icon-' + el.key)
					.attr('href', el.url);
			});
		} else if (f.url) {
			$('<link>')
				.appendTo('head')
				.attr({ type: 'text/css', rel: 'stylesheet' })
				.attr('id', 'customizer-icon-' + key)
				.attr('href', f.url);
		}
	});
}
