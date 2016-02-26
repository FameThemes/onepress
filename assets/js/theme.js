/**
 * Initialise Menu Toggle
 */
( function() {

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

} )();

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
    w = jQuery(window);
    w.on('resize', res);
    res();
} )();
function res() {
    headerH = jQuery('.site-header').height();
    jQuery('.hero-slideshow-fullscreen').css('height',(w.outerHeight()-headerH+1)+'px');
}

/**
 * Text rotator
 */
( function() {
    jQuery(".js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "flipInX",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: "|",
        // The delay between the changing of each phrase in milliseconds.
        speed: 5000,
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

        jQuery('.section-has-parallax').each(function() {
            var $this = jQuery(this);
            var bg    = $this.find('.parallax_bg');

            jQuery(bg).css('backgroundImage', 'url(' + $this.data('bg') + ')');

            if (testMobile == null) {
                jQuery(bg).addClass('not-mobile');
                jQuery(bg).removeClass('is-mobile');
                jQuery(bg).parallax('50%', 0.4);
            }
            else {
                //jQuery(bg).css('backgroundAttachment', 'inherit');
                jQuery(bg).removeClass('not-mobile');
                jQuery(bg).addClass('is-mobile');

            }
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
( function() {
    if ( onepress_js_settings.onepress_disable_sticky_header != '1' ) {
        var header_height = jQuery('.site-header').height();
        var sticky_header = jQuery('.sticky-header');
        var p_to_top     = sticky_header.position().top;

        if ( sticky_header.length > 0 ) {
            jQuery('.site-content').css( 'padding-top', header_height );
        }
    }
})();

/*
* Smooth scroll for navigation and other elements
*/
( function() {

    // Get the header height and wpadminbar height if enable.
    if ( onepress_js_settings.onepress_disable_sticky_header != '1' ) {
        var h = jQuery('#wpadminbar').height() + jQuery('.site-header').height();
    } else {
        var h = jQuery('#wpadminbar').height();
    }

    // Navigation click to section.
    jQuery('.home #site-navigation li a[href*=#]').on('click', function(event){
        event.preventDefault();
        smoothScroll(jQuery(this.hash));
    });

    // Add active class to menu when scroll to active section.
    jQuery(window).scroll(function() {
        var currentNode = null;
        jQuery('.onepage-section').each(function(){
            var currentId = jQuery(this).attr('id');

            if(jQuery('#'+currentId).length>0 ) {
                if(jQuery(window).scrollTop() >= jQuery('#'+currentId).offset().top - h-10) {
                    currentNode = currentId;
                }
            }
        });
        jQuery('#site-navigation li').removeClass('onepress-current-item').find('a[href$="#'+currentNode+'"]').parent().addClass('onepress-current-item');
    });

    // Move to the right section on page load.
    jQuery(window).load(function(){
        var urlCurrent = location.hash;
        if (jQuery(urlCurrent).length>0 ) {
            smoothScroll(urlCurrent);
        }
    });

    // Other scroll to elements
    jQuery('#hero a[href*=#]:not([href=#]), .parallax-content a[href*=#]:not([href=#]), .back-top-top').on('click', function(event){
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
})();

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
( function() {

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

})();
