
function preload_images( images, complete_callback ) {
    var id = 'test-'+( new Date().getTime() );
    jQuery( 'body').append( '<div id="'+id+'"></div>' );
    jQuery.each( images, function( index, src ){
        var img = jQuery( '<img>' );
        img.attr( 'alt', ''  );
        img.attr( 'class', 'image__preload'  );
        img.css( 'display', 'none' );
        img.attr( 'src', src );
        jQuery( '#'+id ).append( img );
    } );

    jQuery( '#'+id ).imagesLoaded( function() {
        if ( complete_callback ) {
            complete_callback();
        }
        setTimeout( function(){
            jQuery( '#'+id ).remove();
        }, 5000 );
    });

}

/**
 * skip-link-focus-fix.js
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://github.com/Automattic/OnePress/pull/136
 */
( function() {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
        is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
        is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

    if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
            var id = location.hash.substring( 1 ),
                element;

            if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
                return;
            }

            element = document.getElementById( id );

            if ( element ) {
                if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false );
    }
})();

/**
* Responsive Videos
*/
( function() {
    jQuery('.site-content').fitVids();
})();

/**
 * Section: Hero Full Screen Slideshow
 */
( function() {

    jQuery(window).on('resize', function (){
        var is_transparent = jQuery( 'body').hasClass( 'header-transparent' );

        var headerH;
        var is_top_header = jQuery( '#page > .site-header').length ?  true : false;
        if( is_top_header && ! is_transparent ) {
            headerH = jQuery('.site-header').height();
        } else {
            headerH = 0;
        }
        jQuery('.hero-slideshow-fullscreen').css('height',(jQuery(window).height()-headerH+1)+'px');

    });
    jQuery(window).trigger( 'resize' );

} )();


/**
 * Text rotator
 */
( function() {

    jQuery(".js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: onepress_js_settings.hero_animation,
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: "|",
        // The delay between the changing of each phrase in milliseconds.
        speed: parseInt( onepress_js_settings.hero_speed ),
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });
} )();



/**
 * Parallax Section
 */
( function() {

    jQuery(window).resize(function(){
        onepressParallax();
    });

    function onepressParallax() {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        var testMobile = isMobile.any();
        if (testMobile == null) {
            jQuery( 'body' ).addClass( 'body-desktop') .removeClass( 'body-mobile' );
        } else {
            jQuery( 'body' ).addClass( 'body-mobile' ).removeClass( 'body-desktop' );
        }

        jQuery('.section-has-parallax').each(function() {
            var $this = jQuery(this);
            var bg    = $this.find('.parallax_bg');
            var img = $this.data('bg');

            preload_images( [ img ], function(){
                jQuery(bg).css('backgroundImage', 'url(' + img + ')');
                if (testMobile == null) {
                    jQuery(bg).addClass('not-mobile');
                    jQuery(bg).removeClass('is-mobile');
                    jQuery(bg).parallax('50%', 0.4);
                } else {
                    //jQuery(bg).css('backgroundAttachment', 'inherit');
                    jQuery(bg).removeClass('not-mobile');
                    jQuery(bg).addClass('is-mobile');
                }
            });

        });
    }
})();


/**
 * Reveal Animations When Scrolling
 */
( function() {
    if ( onepress_js_settings.onepress_disable_animation != '1' ) {
        wow = new WOW(
            {
                offset:       50,
                mobile:       false,
                live:         false
            }
        )
        wow.init();
    }
})();

/**
 * Center vertical align for navigation.
 */
( function() {
    if ( onepress_js_settings.onepress_vertical_align_menu == '1' ) {
        var header_height = jQuery('.site-header').height();
        jQuery('.site-header .onepress-menu').css( 'line-height', header_height + "px" );
    }
})();

/**
 * Sticky header when scroll.
 */
( function( $ ) {

    if ( onepress_js_settings.onepress_disable_sticky_header != '1' ) {
        var is_top_header = $( '#page > .site-header').length ?  true : false;
        var p_to_top;
        $('.site-header').eq(0).wrap( '<div class="site-header-wrapper">' );
        var is_transparent = $( 'body').hasClass( 'header-transparent' );
        $wrap =  $( '.site-header-wrapper');
        $wrap.addClass( 'no-scroll' );

        if (! is_top_header ) {
            $( 'body').removeClass( 'header-transparent' );
        }

        $( document ).scroll( function(){
            var header_fixed = $('.site-header').eq(0);
            var header_parent = header_fixed.parent();
            var header_h = header_fixed.height() || 0;
           // $( '.site-header-wrapper').height( header_h );
            p_to_top    = header_parent.position().top;
            var topbar = $( '#wpadminbar' ).height() || 0;
            if (  topbar > 0 ) {
                var  topbar_pos = $( '#wpadminbar').css( 'position' );
                if ( 'fixed' !== topbar_pos ) {
                    topbar = 0;
                }
            }

            if( $( document ).scrollTop() > p_to_top ) {
                if ( ! is_transparent){
                    $wrap.height( header_h );
                }

                $wrap.addClass( 'is-fixed').removeClass( 'no-scroll' );
                header_fixed.addClass('header-fixed');
                header_fixed.css( 'top', topbar+'px' );
                header_fixed.stop().animate({},400);
            } else {
                header_fixed.removeClass('header-fixed');
                header_fixed.css( 'top', 'auto' );
                header_fixed.stop().animate({},400);
                if ( ! is_transparent ) {
                    $wrap.height('');
                }
                $wrap.removeClass( 'is-fixed' ).addClass( 'no-scroll' );
            }
        });

    }

})(jQuery);



/*
* Nav Menu & element actions
*
* Smooth scroll for navigation and other elements
*/
( function( $ ) {

    // Initialise Menu Toggle
    jQuery('#nav-toggle').on('click', function(event){
        event.preventDefault();
        jQuery('#nav-toggle').toggleClass('nav-is-visible');
        jQuery('.main-navigation .onepress-menu').toggleClass("onepress-menu-mobile");
        jQuery('.header-widget').toggleClass("header-widget-mobile");
    });

    jQuery('.onepress-menu li.menu-item-has-children, .onepress-menu li.page_item_has_children').each( function() {
        jQuery(this).prepend('<div class="nav-toggle-subarrow"><i class="fa fa-angle-down"></i></div>');
    });

    jQuery('.nav-toggle-subarrow, .nav-toggle-subarrow .nav-toggle-subarrow').click(
        function () {
            jQuery(this).parent().toggleClass("nav-toggle-dropdown");
        }
    );

    // Get the header height and wpadminbar height if enable.
    var h;
    if ( onepress_js_settings.onepress_disable_sticky_header != '1' ) {
        h = jQuery('#wpadminbar').height() + jQuery('.site-header').height();
    } else {
        h = jQuery('#wpadminbar').height();
    }

    // Navigation click to section.
    jQuery('.home #site-navigation li a[href*="#"]').on('click', function(event){
        event.preventDefault();
        // if in mobile mod
        if (  jQuery( '.onepress-menu' ).hasClass( 'onepress-menu-mobile' ) ) {
            jQuery( '#nav-toggle' ).trigger( 'click' );
        }
        smoothScroll(jQuery(this.hash));
    });

    // Add active class to menu when scroll to active section.
    jQuery(window).scroll(function() {
        var currentNode = null;
        jQuery('.onepage-section').each(function(){
            var currentId = jQuery(this).attr('id') || '';

            if(jQuery(window).scrollTop() >= jQuery(this).offset().top - h-10) {
                currentNode = currentId;
            }

        });
        jQuery('#site-navigation li').removeClass('onepress-current-item');
        if ( currentNode ) {
            jQuery('#site-navigation li').find('a[href$="#' + currentNode + '"]').parent().addClass('onepress-current-item');
        }
    });

    // Move to the right section on page load.
    jQuery(window).load(function(){
        var urlCurrent = location.hash;
        if (jQuery(urlCurrent).length>0 ) {
            smoothScroll(urlCurrent);
        }
    });

    // Other scroll to elements
    jQuery('.hero-slideshow-wrapper a[href*="#"]:not([href="#"]), .parallax-content a[href*="#"]:not([href="#"]), .back-top-top').on('click', function(event){
        event.preventDefault();
        smoothScroll(jQuery(this.hash));
    });

    // Smooth scroll animation
    function smoothScroll(urlhash) {
        if ( urlhash.length <= 0 ) {
            return false;
        }
        jQuery("html, body").animate({
            scrollTop: (jQuery(urlhash).offset().top - h) + "px"
        }, {
            duration: 800,
            easing: "swing"
        });
        return false;
    }

    if ( onepress_js_settings.is_home ) {
        // custom-logo-link
        jQuery( '.site-branding .site-brand-inner').on( 'click', function( e ){
            e.preventDefault();
            jQuery("html, body").animate({
                scrollTop: "0px"
            }, {
                duration: 300,
                easing: "swing"
            });
        } );
    }

})( jQuery );

// Counter Up
jQuery( document ).ready( function( $ ){
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
} );

/**
 * Call magnificPopup when use
 */
jQuery( document ).ready( function( $ ){

    jQuery('.popup-video').magnificPopup({
        //disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        zoom: {
            enabled:true
        }
    });

} );


/**
 * Hero sliders
 */
jQuery(document).ready(function ( $ ) {

    jQuery('.hero-slideshow-wrapper').each( function(){
        var hero = $( this );
        if ( hero.hasClass( 'video-hero' ) ) {
            return ;
        }
        var images = hero.data( 'images' )  || false;
        if ( typeof images == 'string' ) {
            images = jQuery.parseJSON( images );
        }

        preload_images( images, function(){
            hero.backstretch( images , {
                fade: 750,
                duration: 5000
            });
            hero.addClass( 'loaded');
            setTimeout( function(){
                hero.find( '.sk-cube-grid').remove();
            }, 600 );
        } ) ;

    } );

    $( '.parallax-hero').each( function(){
        var hero = $( this);
        var img = hero.attr( 'data-image-src' ) || '';
        preload_images( [ img ], function(){
            hero.parallax();
            hero.find( '.hero-slideshow-wrapper' ).addClass( 'loaded');
            setTimeout( function(){
                hero.find( '.hero-slideshow-wrapper' ).find( '.sk-cube-grid').remove();
            }, 600 );
        } ) ;

    } );

});
