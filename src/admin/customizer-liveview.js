/**
 * customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

import { bindOnepressStylingPreview } from './customizer/styling/styling-preview';
import { bindOnepressFontManagerPreview } from './customizer/font-manager/font-manager-preview';

( function( $ , api ) {

    // Site footer bg
    /*
    wp.customize( 'onepress_footer_bg', function( value ) {
        value.bind( function( to ) {
            $( '.site-footer' ).css( {
                'background': to
            } );
        } );
    } );
    */

    // Site footer info bg
    wp.customize( 'onepress_footer_info_bg', function( value ) {
        value.bind( function( to ) {
            $( '.site-footer .site-info, .site-footer .btt a' ).css( {
                'background': to
            } );

            $( '.site-footer .site-info').css( {
                color: 'rgba(255, 255, 255, 0.7)',
            } );
            $( '.site-footer .btt a, .site-footer .site-info a').css( {
                color: 'rgba(255, 255, 255, 0.9)',
            } );
        } );
    } );


    /**
     * Handle rendering of partials.
     *
     * @param {api.selectiveRefresh.Placement} placement
     */
    api.selectiveRefresh.bind( 'partial-content-rendered', function( placement ) {
        $( window ).resize();
    } );


    // Header text color.
    wp.customize( 'header_textcolor', function( value ) {
        value.bind( function( to ) {
            if ( 'blank' === to ) {
                $( '.site-title a, .site-description' ).css( {
                    'clip': 'rect(1px, 1px, 1px, 1px)',
                    'position': 'absolute'
                } );
            } else {
                $( '.site-title a, .site-description' ).css( {
                    'clip': 'auto',
                    'color': to,
                    'position': 'relative'
                } );
            }
        } );
    } );


    // Site footer widgets
    wp.customize( 'onepress_btt_disable', function( value ) {
        value.bind( function( to ) {
            if ( to === true || to == 'true' ) {
                $( '.site-footer .btt ' ).hide();
            } else {
                $( '.site-footer .btt ' ).show();
            }
        } );
    } );

	/**
	 * Work around Chrome dropping inline style rules on resize. Use .text() — .html() on <style>
	 * is often empty in the preview iframe, which was wiping `onepress_custom_inline_style` output.
	 */
	function update_css() {
		var $el = $( '#onepress-theme-custom-inline' );
		if ( ! $el.length ) {
			return;
		}
		var css_code = $el.text();
		if ( css_code === '' ) {
			css_code = $el.html() || '';
		}
		$el.replaceWith(
			'<style class="replaced-style" id="onepress-theme-custom-inline" type="text/css" data-onepress-theme-custom-inline="1">' +
				css_code +
				'</style>'
		);
	}

    // When preview ready: settings are registered; styling postMessage needs this (empty CSS after full reload).
    wp.customize.bind( 'preview-ready', function() {
        update_css();
        bindOnepressStylingPreview( $, api );
        bindOnepressFontManagerPreview( $, api );
    });

    $( window ).resize( function(){
        update_css();
    });


	wp.customize.selectiveRefresh.bind( 'partial-content-rendered', function( settings ) {

		if ( settings.partial.id === 'onepress-style-live-css' ) {
			update_css();
		}

		if ( settings.partial.id == 'onepress-header-section' ) {
			$( document ).trigger( 'header_view_changed', [ settings.partial.id ] );
		}

		$( document ).trigger( 'selectiveRefresh-rendered', [ settings.partial.id ] );
	} );


} )( jQuery , wp.customize );

