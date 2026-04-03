/**
 * Icon picker overlay + footer layout controls.
 *
 * @param {Function} $ jQuery
 */
export function initIconPicker( $ ) {
	$( document ).ready( function () {
		window.editing_icon = false;
		const icon_picker = $(
			'<div class="c-icon-picker"><div class="c-icon-type-wrap"><select class="c-icon-type"></select></div><div class="c-icon-search"><input class="" type="text"></div><div class="c-icon-list"></div></div>'
		);
		let options_font_type = '',
			icon_group = '';

		$.each( C_Icon_Picker.fonts, function ( key, font ) {
			font = $.extend(
				{},
				{
					url: '',
					name: '',
					prefix: '',
					icons: '',
				},
				font
			);

			if ( Array.isArray( font.url ) ) {
				font.url.map( ( el ) => {
					$( '<link>' )
						.appendTo( 'head' )
						.attr( { type: 'text/css', rel: 'stylesheet' } )
						.attr( 'id', 'customizer-icon-' + el?.key )
						.attr( 'href', el?.url );
				} );
			} else {
				$( '<link>' )
					.appendTo( 'head' )
					.attr( { type: 'text/css', rel: 'stylesheet' } )
					.attr( 'id', 'customizer-icon-' + key )
					.attr( 'href', font.url );
			}

			options_font_type +=
				'<option value="' + key + '">' + font.name + '</option>';

			const icons_array = font.icons.split( '|' );

			icon_group +=
				'<div class="ic-icons-group" style="display: none;" data-group-name="' +
				key +
				'">';
			$.each( icons_array, function ( index, icon ) {
				if ( font.prefix ) {
					icon = font.prefix + ' ' + icon;
				}
				icon_group +=
					'<span title="' +
					icon +
					'" data-name="' +
					icon +
					'"><i class="' +
					icon +
					'"></i></span>';
			} );
			icon_group += '</div>';
		} );
		icon_picker
			.find( '.c-icon-search input' )
			.attr( 'placeholder', C_Icon_Picker.search );
		icon_picker.find( '.c-icon-type' ).html( options_font_type );
		icon_picker.find( '.c-icon-list' ).append( icon_group );
		$( '.wp-full-overlay' ).append( icon_picker );

		$( 'body' ).on( 'change', 'select.c-icon-type', function () {
			const t = $( this ).val();
			icon_picker.find( '.ic-icons-group' ).hide();
			icon_picker
				.find( '.ic-icons-group[data-group-name="' + t + '"]' )
				.show();
		} );
		icon_picker.find( 'select.c-icon-type' ).trigger( 'change' );

		$( 'body' ).on( 'keyup', '.c-icon-search input', function () {
			const v = $( this ).val();
			if ( v == '' ) {
				$( '.c-icon-list span' ).show();
			} else {
				$( '.c-icon-list span' ).hide();
				try {
					$( '.c-icon-list span[data-name*="' + v + '"]' ).show();
				} catch ( e ) {
					// ignore
				}
			}
		} );

		$( 'body' ).on( 'click', '.icon-wrapper', function ( e ) {
			e.preventDefault();
			const icon = $( this );
			window.editing_icon = icon;
			icon_picker.addClass( 'ic-active' );
			$( 'body' ).find( '.icon-wrapper' ).removeClass( 'icon-editing' );
			icon.addClass( 'icon-editing' );
		} );

		$( 'body' ).on( 'click', '.item-icon .remove-icon', function ( e ) {
			e.preventDefault();
			const item = $( this ).closest( '.item-icon' );
			item.find( '.icon-wrapper input' ).val( '' );
			item.find( '.icon-wrapper input' ).trigger( 'change' );
			item.find( '.icon-wrapper i' ).attr( 'class', '' );
			$( 'body' ).find( '.icon-wrapper' ).removeClass( 'icon-editing' );
		} );

		$( 'body' ).on( 'click', '.c-icon-list span', function ( e ) {
			e.preventDefault();
			const icon_name = $( this ).attr( 'data-name' ) || '';
			if ( window.editing_icon ) {
				window.editing_icon
					.find( 'i' )
					.attr( 'class', '' )
					.addClass( $( this ).find( 'i' ).attr( 'class' ) );
				window.editing_icon
					.find( 'input' )
					.val( icon_name )
					.trigger( 'change' );
			}
			icon_picker.removeClass( 'ic-active' );
			window.editing_icon = false;
			$( 'body' ).find( '.icon-wrapper' ).removeClass( 'icon-editing' );
		} );

		$( document ).mouseup( function ( e ) {
			if ( window.editing_icon ) {
				if (
					! window.editing_icon.is( e.target ) &&
					window.editing_icon.has( e.target ).length === 0 &&
					! icon_picker.is( e.target ) &&
					icon_picker.has( e.target ).length === 0
				) {
					icon_picker.removeClass( 'ic-active' );
				}
			}
		} );

		const display_footer_layout = function ( l ) {
			$( 'li[id^="customize-control-footer_custom_"]' ).hide();
			$(
				'li[id^="customize-control-footer_custom_' + l + '_columns"]'
			).show();
		};

		display_footer_layout(
			$( '#customize-control-footer_layout select' ).val()
		);
		$( '#customize-control-footer_layout select' ).on(
			'change',
			function () {
				display_footer_layout( $( this ).val() );
			}
		);
	} );
}
