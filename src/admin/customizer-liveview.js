/**
 * customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

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

    function update_css( ){
         var css_code = $( '#onepress-style-inline-css' ).html();
        // Fix Chrome Lost CSS When resize ??
        $( '#onepress-style-inline-css' ).replaceWith( '<style class="replaced-style" id="onepress-style-inline-css">'+css_code+'</style>' );

    }

    // When preview ready
    wp.customize.bind( 'preview-ready', function() {
        update_css();
    });

    $( window ).resize( function(){
        update_css();
    });


    wp.customize.selectiveRefresh.bind( 'partial-content-rendered', function( settings ) {

        if (  settings.partial.id  == 'onepress-header-section' ) {
            $( document ) .trigger( 'header_view_changed',[ settings.partial.id ] );
        }

        $( document ) .trigger( 'selectiveRefresh-rendered',[ settings.partial.id ] );
    } );


    /**
     * Live preview for Site Colors (Primary / Secondary).
     *
     * Since 2.4.1: both mods use `transport: 'postMessage'`. Updating the
     * `--wp--preset--color--{slug}` CSS variable on `:root` propagates to:
     *   - Every SCSS rule that references `variables.$primary` / `variables.$secondary`
     *     (they compile to `var(...)` consumers).
     *   - Every inline rule emitted by `template-tags.php` (refactored to
     *     reference the same var, no more hard-coded hex per request).
     *
     * The Customizer feeds either `#xxxxxx` or `xxxxxx` depending on the
     * sanitize callbacks — normalise to a single leading `#` to keep CSS
     * parsing happy.
     */
    function onepressBindColorToCssVar( settingId, cssVarName ) {
        wp.customize( settingId, function ( value ) {
            value.bind( function ( to ) {
                var hex = String( to || '' ).trim();
                if ( hex === '' ) {
                    document.documentElement.style.removeProperty( cssVarName );
                    return;
                }
                if ( hex.charAt( 0 ) !== '#' ) {
                    hex = '#' + hex;
                }
                document.documentElement.style.setProperty( cssVarName, hex );
            } );
        } );
    }

    onepressBindColorToCssVar( 'onepress_primary_color',   '--wp--preset--color--primary' );
    onepressBindColorToCssVar( 'onepress_secondary_color', '--wp--preset--color--secondary' );


} )( jQuery , wp.customize );

