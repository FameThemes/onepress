/**
 * customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ , api ) {


    // Site footer bg
    wp.customize( 'onepress_footer_bg', function( value ) {
        value.bind( function( to ) {
            $( '.site-footer' ).css( {
                'background': to
            } );
        } );
    } );

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
    

} )( jQuery , wp.customize );

