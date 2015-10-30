/**
 * Initialise Menu Toggle
 */
( function() {

    jQuery('.onepress-menu li.menu-item-has-children').each( function() {
        jQuery(this).prepend('<div class="nav-toggle-subarrow"></div>');
    });

    jQuery('#nav-toggle').on('click', function(event){
        event.preventDefault();
        jQuery('#nav-toggle').toggleClass('nav-is-visible');
        jQuery('.main-navigation .onepress-menu').toggleClass("onepress-menu-mobile");
        jQuery('.header-widget').toggleClass("header-widget-mobile");
    });

    jQuery('.nav-toggle-subarrow, .nav-toggle-subarrow .nav-toggle-subarrow').click(
        function () {
            jQuery(this).parent().toggleClass("nav-toggle-dropdown");
        }
    );

} )();

/**
 * skip-link-focus-fix.js from _s
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
    //jQuery('.hero-fullscreen-slideshow ').css('height',(w.outerHeight()-headerH+1)+'px');
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
 * Initialise Toggle Project Detail
 */

! function(e, i) { "function" == typeof define && define.amd ? define(["jquery"], i) : i(jQuery) } (this, function(e) {
    var i = {
            prefix: "project_expander-"
        },
        n = function() {
            var e = null;
            return function(i) {
                e && clearTimeout(e), e = setTimeout(i, 500)
            }
        }(),
        t = function(t, r) {
            var f = e.extend({}, i, r),
                c = e(t),
                s = c.find("." + f.prefix + "item"),
                o = c.find("." + f.prefix + "trigger"),
                a = c.find("." + f.prefix + "trigger-close"),
                d = function() {
                    e(window).bind("resize", u), o.bind("click", h), a.bind("click", p)
                },
                u = function() {
                    n(function() {
                        s.filter(".active").each(function() {
                            var i = e(this),
                                n = i.find("." + f.prefix + "expander-contents"),
                                t = i.find("." + f.prefix + "expander"),
                                r = n.outerHeight();
                            i.css("height", i.find("." + f.prefix + "contents").outerHeight() + r), t.css("max-height", r)
                        })
                    })
                },
                h = function() {
                    var i = e(this).parents("." + f.prefix + "item");
                    i.hasClass("active") ? g(i) : x(i)
                },
                p = function() {
                    g(s)
                },
                x = function(e) {
                    g(e.siblings());
                    var i = e.find("." + f.prefix + "expander-contents"),
                        n = e.find("." + f.prefix + "expander"),
                        t = i.outerHeight();
                    e.addClass("active").css("height", e.find("." + f.prefix + "contents").outerHeight() + t), n.css("max-height", t)
                },
                g = function(i) {
                    i = i.filter(".active");
                    var n = i.find("." + f.prefix + "expander");
                    i.each(function() {
                        var i = e(this);
                        i.css("height", i.find("." + f.prefix + "contents").outerHeight() + 2)
                    }), i.removeClass("active"), n.css("max-height", 0)
                };
            d()
        };
    return e.fn.project_expander = function(i) {
        e(this).each(function() {
            t(this, i || {})
        })
    }, e
});
jQuery('.project-wrapper').project_expander({
    prefix: "project-"
});

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

/*
* Smooth scroll for navigation and other elements
*/
( function() {

    // Get the header height and wpadminbar height if enable.
    var h = jQuery('#wpadminbar').height() + jQuery('.site-header').height();

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
        jQuery("html, body").animate({
            scrollTop: (jQuery(urlhash).offset().top - h) + "px"
        }, {
            duration: 800,
            easing: "swing"
        });
        return false;
    }
})();




