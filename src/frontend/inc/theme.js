var onepressIsMobile = {
	Android() {
		return navigator.userAgent.match( /Android/i );
	},
	BlackBerry() {
		return navigator.userAgent.match( /BlackBerry/i );
	},
	iOS() {
		return navigator.userAgent.match( /iPhone|iPad|iPod/i );
	},
	Opera() {
		return navigator.userAgent.match( /Opera Mini/i );
	},
	Windows() {
		return navigator.userAgent.match( /IEMobile/i );
	},
	any() {
		return (
			onepressIsMobile.Android() ||
			onepressIsMobile.BlackBerry() ||
			onepressIsMobile.iOS() ||
			onepressIsMobile.Opera() ||
			onepressIsMobile.Windows()
		);
	},
};

function preload_images( images, complete_callback ) {
	if ( onepress_js_settings.hero_disable_preload ) {
		if ( complete_callback ) {
			complete_callback();
		}
	} else {
		const id = '_img_loading_' + new Date().getTime();
		jQuery( 'body' ).append( '<div id="' + id + '"></div>' );
		jQuery.each( images, function ( index, src ) {
			const img = jQuery( '<img>' );
			img.attr( 'alt', '' );
			img.attr( 'class', 'image__preload' );
			img.css( 'display', 'none' );
			img.attr( 'src', src );
			jQuery( '#' + id ).append( img );
		} );

		jQuery( '#' + id ).imagesLoaded( function () {
			if ( complete_callback ) {
				complete_callback();
			}
			setTimeout( function () {
				jQuery( '#' + id ).remove();
			}, 5000 );
		} );
	}
}

function _to_number( string ) {
	if ( typeof string === 'number' ) {
		return string;
	}
	const n = string.match( /\d+$/ );
	if ( n ) {
		return parseFloat( n[ 0 ] );
	}
	return 0;
}

function _to_bool( v ) {
	if ( typeof v === 'boolean' ) {
		return v;
	}

	if ( typeof v === 'number' ) {
		return v === 0 ? false : true;
	}

	if ( typeof v === 'string' ) {
		if ( v === 'true' || v === '1' ) {
			return true;
		}
		return false;
	}

	return false;
}

/**
 * skip-link-focus-fix.js
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://github.com/Automattic/OnePress/pull/136
 */
( function () {
	const is_webkit =
			navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
		is_opera = navigator.userAgent.toLowerCase().indexOf( 'opera' ) > -1,
		is_ie = navigator.userAgent.toLowerCase().indexOf( 'msie' ) > -1;

	if (
		( is_webkit || is_opera || is_ie ) &&
		document.getElementById &&
		window.addEventListener
	) {
		window.addEventListener(
			'hashchange',
			function () {
				let id = location.hash.substring( 1 ),
					element;

				if ( ! /^[A-z0-9_-]+$/.test( id ) ) {
					return;
				}

				element = document.getElementById( id );

				if ( element ) {
					if (
						! /^(?:a|select|input|button|textarea)$/i.test(
							element.tagName
						)
					) {
						element.tabIndex = -1;
					}

					element.focus();
				}
			},
			false
		);
	}
} )();

( function () {
	if ( onepressIsMobile.any() ) {
		/**
		 * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
		 */
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		const vh = window.innerHeight * 0.01;
		const vw = window.innerWidth * 0.01;
		// Then we set the value in the --vh, --vw custom property to the root of the document
		document.documentElement.style.setProperty( '--vh', vh + 'px' );
		document.documentElement.style.setProperty( '--vw', vw + 'px' );
		window.addEventListener( 'resize', function () {
			const vh = window.innerHeight * 0.01;
			const vw = window.innerWidth * 0.01;
			document.documentElement.style.setProperty( '--vh', vh + 'px' );
			document.documentElement.style.setProperty( '--vw', vw + 'px' );
		} );
	}
} )();

function isElementInViewport( el ) {
	// Special bonus for those using jQuery
	if ( typeof jQuery === 'function' && el instanceof jQuery ) {
		el = el[ 0 ];
	}
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			( window.innerHeight ||
				document.documentElement
					.clientHeight ) /* or $(window).height() */ &&
		rect.right <=
			( window.innerWidth ||
				document.documentElement
					.clientWidth ) /* or $(window).width() */
	);
}

/**
 * Sticky header when scroll.
 */
jQuery( function ( $ ) {
	const $window = $( window );
	const $document = $( document );

	$( document ).on(
		'mouseenter resize',
		'.sub-menu .menu-item-has-children',
		function () {
			const submenuEl = $( this ).find( '.sub-menu' );
			if ( submenuEl.length > 0 && ! isElementInViewport( submenuEl ) ) {
				submenuEl.css( { right: '100%', left: 'auto' } );
			}
		}
	);

	const getAdminBarHeight = function () {
		let h = 0;
		if ( $( '#wpadminbar' ).length ) {
			if ( $( '#wpadminbar' ).css( 'position' ) === 'fixed' ) {
				h = $( '#wpadminbar' ).height();
			}
		}
		return h;
	};

	const stickyHeaders = ( function () {
		let $stickies;
		const lastScrollTop = 0;

		const setData = function ( stickies, addWrap ) {
			const top = 0;

			if ( typeof addWrap === 'undefined' ) {
				addWrap = true;
			}
			$stickies = stickies.each( function () {
				const $thisSticky = $( this );
				const p = $thisSticky.parent();
				if ( ! p.hasClass( 'followWrap' ) ) {
					if ( addWrap ) {
						$thisSticky.wrap( '<div class="followWrap" />' );
					}
				}
				$thisSticky.parent().removeAttr( 'style' );
				$thisSticky.parent().height( $thisSticky.height() );
			} );
		};

		const load = function ( stickies ) {
			if (
				typeof stickies === 'object' &&
				stickies instanceof jQuery &&
				stickies.length > 0
			) {
				setData( stickies );
				$window.on( 'scroll', function () {
					_whenScrolling();
				} );

				$window.on( 'resize', function () {
					setData( stickies, false );
					stickies.each( function () {
						$( this ).removeClass( 'fixed' ).removeAttr( 'style' );
					} );
					_whenScrolling();
				} );

				$document.on( 'hero_ready', function () {
					$( '.followWrap' ).removeAttr( 'style' );
					setTimeout( function () {
						$( '.followWrap' ).removeAttr( 'style' );
						setData( stickies, false );
						_whenScrolling();
					}, 500 );
				} );
			}
		};

		var _whenScrolling = function () {
			let top = 0;
			top = getAdminBarHeight();

			const scrollTop = $window.scrollTop();

			$stickies.each( function ( i ) {
				const $thisSticky = $( this ),
					$stickyPosition = $thisSticky.parent().offset().top;
				if ( scrollTop === 0 ) {
					$thisSticky.addClass( 'no-scroll' );
				}
				if ( $stickyPosition - top <= scrollTop ) {
					if ( scrollTop > 0 ) {
						$thisSticky.removeClass( 'no-scroll' );
					}
					$thisSticky.addClass( 'header-fixed' );
					$thisSticky.css( 'top', top );
				} else {
					$thisSticky
						.removeClass( 'header-fixed' )
						.removeAttr( 'style' )
						.addClass( 'no-scroll' );
				}
			} );
		};

		return {
			load,
		};
	} )();
	stickyHeaders.load( $( '#masthead.is-sticky' ) );
	// When Header Panel rendered by customizer
	$document.on( 'header_view_changed', function () {
		stickyHeaders.load( $( '#masthead.is-sticky' ) );
	} );

	/*
	 * Nav Menu & element actions
	 *
	 * Smooth scroll for navigation and other elements
	 */
	const mobile_max_width = 1140; // Media max width for mobile
	const main_navigation = jQuery( '.main-navigation .onepress-menu' );
	const header = document.getElementById( 'masthead' );
	if ( header ) {
		var noSticky = header.classList.contains( 'no-sticky' );
	}

	const setNavTop = function () {
		const offset = header.getBoundingClientRect();
		const top = offset.x + offset.height - 1;
		main_navigation.css( {
			top,
		} );
	};

	/**
	 * Get mobile navigation height.
	 *
	 * @param fitWindow
	 * @return number
	 */
	const getNavHeight = function ( fitWindow ) {
		if ( typeof fitWindow === 'undefined' ) {
			fitWindow = true;
		}
		if ( fitWindow ) {
			const offset = header.getBoundingClientRect();
			const h = $( window ).height() - ( offset.x + offset.height ) + 1;
			return h;
		}
		main_navigation.css( 'height', 'auto' );
		const navOffset = main_navigation[ 0 ].getBoundingClientRect();
		main_navigation.css( 'height', 0 );
		return navOffset.height;
	};

	/**
	 * Initialise Menu Toggle
	 *
	 * @since 0.0.1
	 * @since 2.2.1
	 */
	$document.on( 'click', '#nav-toggle', function ( event ) {
		event.preventDefault();
		jQuery( '#nav-toggle' ).toggleClass( 'nav-is-visible' );
		jQuery( '.header-widget' ).toggleClass( 'header-widget-mobile' );
		main_navigation.stop();
		// Open menu mobile.
		if ( ! main_navigation.hasClass( 'onepress-menu-mobile' ) ) {
			main_navigation.addClass( 'onepress-menu-mobile' );
			$( 'body' ).addClass( 'onepress-menu-mobile-opening' );
			setNavTop();
			let h = getNavHeight( ! noSticky );
			if ( isNaN( h ) ) {
				// when IE 11 & Edge return h is NaN.
				h = $( window ).height();
			}
			main_navigation.animate(
				{
					height: h,
				},
				300,
				function () {
					// Animation complete.
					if ( noSticky ) {
						main_navigation.css( {
							'min-height': h,
							height: 'auto',
						} );
					}
				}
			);
		} else {
			main_navigation.css( {
				height: main_navigation.height(),
				'min-height': 0,
				overflow: 'hidden',
			} );
			setTimeout( function () {
				main_navigation.animate(
					{
						height: 0,
					},
					300,
					function () {
						main_navigation.removeAttr( 'style' );
						main_navigation.removeClass( 'onepress-menu-mobile' );
						$( 'body' ).removeClass(
							'onepress-menu-mobile-opening'
						);
					}
				);
			}, 40 );
		}
	} );

	/**
	 * Fix nav height when touch move on mobile.
	 *
	 * @since 2.2.1
	 */
	if ( ! noSticky && onepressIsMobile.any() ) {
		$( document ).on( 'scroll', function () {
			if ( main_navigation.hasClass( 'onepress-menu-mobile' ) ) {
				const newViewportHeight = Math.max(
					document.documentElement.clientHeight,
					window.innerHeight || 0
				);
				const offset = header.getBoundingClientRect();
				const top = offset.x + offset.height - 1;
				const h = newViewportHeight - top + 1;
				main_navigation.css( {
					height: h,
					top,
				} );
			}
		} );
	}

	function autoMenuAlign() {
		const ww = $( window ).width();
		const isMobile = ww <= mobile_max_width;
		const header = $( '#masthead > .container' );
		const headerRect = header.length
			? header[ 0 ].getBoundingClientRect()
			: {};
		$( '#site-navigation  .onepress-menu > li' ).each( function () {
			const li = $( this );
			const sub = $( '> .sub-menu', li );
			if ( isMobile ) {
				sub.removeAttr( 'style' );
				return;
			}

			if ( sub.length ) {
				const liRect = li[ 0 ].getBoundingClientRect();
				const subRect = sub[ 0 ].getBoundingClientRect();
				if ( headerRect.right < liRect.left + subRect.width ) {
					li.addClass( 'sub-li-r' );
					sub.addClass( 'sub-ul-r' );
					const diff =
						headerRect.right - ( liRect.left + liRect.width );
					sub.css( 'right', `-${ diff }px` );
				}
			}
		} );
	}

	autoMenuAlign();

	let timeOutResize = false;
	$( window ).on( 'resize', function () {
		if ( timeOutResize ) {
			clearTimeout( timeOutResize );
		}
		timeOutResize = setTimeout( () => {
			if (
				main_navigation.hasClass( 'onepress-menu-mobile' ) &&
				$( window ).width() <= mobile_max_width
			) {
				if ( ! noSticky ) {
					main_navigation.css( {
						height: getNavHeight(),
						overflow: 'auto',
					} );
				}
			} else {
				main_navigation.removeAttr( 'style' );
				main_navigation.removeClass( 'onepress-menu-mobile' );
				jQuery( '#nav-toggle' ).removeClass( 'nav-is-visible' );
			}
			autoMenuAlign();
		}, 500 );
	} );

	jQuery(
		'.onepress-menu li.menu-item-has-children, .onepress-menu li.page_item_has_children'
	).each( function () {
		jQuery( this ).prepend(
			'<div class="nav-toggle-subarrow"><i class="fa fa-angle-down"></i></div>'
		);
	} );

	$document.on(
		'click',
		'.nav-toggle-subarrow, .nav-toggle-subarrow .nav-toggle-subarrow',
		function () {
			const el = jQuery( this );
			const p = el.parent();
			p.removeAttr( 'style' );
			p.toggleClass( 'nav-toggle-dropdown' );
		}
	);

	// Get the header height and wpadminbar height if enable.
	let h;
	window.current_nav_item = false;
	if ( onepress_js_settings.onepress_disable_sticky_header !== '1' ) {
		h =
			jQuery( '#wpadminbar' ).height() +
			jQuery( '.site-header' ).height();
	} else {
		h = jQuery( '#wpadminbar' ).height();
	}

	/**
	 *  Navigation click to section.
	 *  @updated 2.3.0
	 */
	jQuery( '#site-navigation li a[href*="#"]' ).on(
		'click',
		function ( event ) {
			const url = new URL( this.href );
			if (
				url.origin + url.pathname ===
				window.location.origin + window.location.pathname
			) {
				const $el = jQuery( this.hash );
				// if in mobile mod.
				if (
					jQuery( '.onepress-menu' ).hasClass(
						'onepress-menu-mobile'
					)
				) {
					jQuery( '#nav-toggle' ).trigger( 'click' );
				}
				if ( $el.length ) {
					event.preventDefault();
					window.history.pushState( {}, null, url.href );
					smoothScroll( $el );
				}
			}
		}
	);

	function setNavActive( currentNode ) {
		if ( currentNode ) {
			currentNode = currentNode.replace( '#', '' );
			if ( currentNode ) {
				jQuery( '#site-navigation li' ).removeClass(
					'onepress-current-item'
				);
			}
			if ( currentNode ) {
				jQuery( '#site-navigation li' )
					.find( 'a[href$="#' + currentNode + '"]' )
					.parent()
					.addClass( 'onepress-current-item' );
			}
		}
	}

	function inViewPort( $element, offset_top ) {
		if ( ! offset_top ) {
			offset_top = 0;
		}
		let view_port_top = jQuery( window ).scrollTop();
		if ( $( '#wpadminbar' ).length > 0 ) {
			view_port_top -= $( '#wpadminbar' ).outerHeight() - 1;
			offset_top += $( '#wpadminbar' ).outerHeight() - 1;
		}
		const view_port_h = $( 'body' ).outerHeight();

		const el_top = $element.offset().top;
		const eh_h = $element.height();
		const el_bot = el_top + eh_h;
		const view_port_bot = view_port_top + view_port_h;

		const all_height = $( 'body' )[ 0 ].scrollHeight;
		const max_top = all_height - view_port_h;

		let in_view_port = false;
		// If scroll maximum
		if ( view_port_top >= max_top ) {
			if (
				( el_top < view_port_top && el_top > view_port_bot ) ||
				( el_top > view_port_top && el_bot < view_port_top )
			) {
				in_view_port = true;
			}
		} else if ( el_top <= view_port_top + offset_top ) {
			//if ( eh_bot > view_port_top &&  eh_bot < view_port_bot ) {
			if ( el_bot > view_port_top ) {
				in_view_port = true;
			}
		}
		return in_view_port;
	}

	// Add active class to menu when scroll to active section.
	let _scroll_top = $window.scrollTop();
	jQuery( window ).on( 'scroll', function () {
		let currentNode = null;

		if ( ! window.current_nav_item ) {
			const current_top = $window.scrollTop();
			const adminBarHeight =
				jQuery( '#wpadminbar' ).length > 0
					? jQuery( '#wpadminbar' ).height()
					: 0;
			if ( onepress_js_settings.onepress_disable_sticky_header !== '1' ) {
				h = adminBarHeight + jQuery( '.site-header' ).height();
			} else {
				h = adminBarHeight;
			}

			if ( _scroll_top < current_top ) {
				jQuery( 'section' ).each( function ( index ) {
					const section = jQuery( this );
					const currentId = section.attr( 'id' ) || '';

					const in_vp = inViewPort( section, h + 10 );
					if ( in_vp ) {
						currentNode = currentId;
					}
				} );
			} else {
				const ns = jQuery( 'section' ).length;
				for ( let i = ns - 1; i >= 0; i-- ) {
					const section = jQuery( 'section' ).eq( i );
					const currentId = section.attr( 'id' ) || '';
					const in_vp = inViewPort( section, h + 10 );
					if ( in_vp ) {
						currentNode = currentId;
					}
				}
			}
			_scroll_top = current_top;
		} else {
			currentNode = window.current_nav_item.replace( '#', '' );
		}

		setNavActive( currentNode );
	} );

	// Move to the right section on page load.
	jQuery( window ).on( 'load', function () {
		const urlCurrent = location.hash;
		if ( jQuery( urlCurrent ).length > 0 ) {
			smoothScroll( urlCurrent );
		}
	} );

	// Other scroll to elements
	jQuery(
		'.hero-slideshow-wrapper a[href*="#"]:not([href="#"]), .parallax-content a[href*="#"]:not([href="#"]), .back-to-top'
	).on( 'click', function ( event ) {
		event.preventDefault();
		smoothScroll( jQuery( this.hash ) );
	} );

	// Smooth scroll animation
	function smoothScroll( element ) {
		if ( element.length <= 0 ) {
			return false;
		}
		jQuery( 'html, body' ).animate(
			{
				scrollTop: jQuery( element ).offset().top - h + 'px',
			},
			{
				duration: 800,
				easing: 'swing',
				complete() {
					window.current_nav_item = false;
				},
			}
		);
	}

	if ( onepress_js_settings.is_home ) {
		// custom-logo-link
		jQuery( '.site-branding .site-brand-inner' ).on(
			'click',
			function ( e ) {
				e.preventDefault();
				jQuery( 'html, body' ).animate(
					{
						scrollTop: '0px',
					},
					{
						duration: 300,
						easing: 'swing',
					}
				);
			}
		);
	}

	if ( onepressIsMobile.any() ) {
		jQuery( 'body' )
			.addClass( 'body-mobile' )
			.removeClass( 'body-desktop' );
	} else {
		jQuery( 'body' )
			.addClass( 'body-desktop' )
			.removeClass( 'body-mobile' );
	}

	/**
	 * Reveal Animations When Scrolling
	 */
	if ( onepress_js_settings.onepress_disable_animation !== '1' ) {
		const wow = new WOW( {
			offset: 50,
			mobile: false,
			live: false,
		} );
		wow.init();
	}

	const text_rotator = function () {
		/**
		 * Text rotator
		 */
		jQuery( '.js-rotating' ).Morphext( {
			// The [in] animation type. Refer to Animate.css for a list of available animations.
			animation: onepress_js_settings.hero_animation,
			// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
			separator: '|',
			// The delay between the changing of each phrase in milliseconds.
			speed: parseInt( onepress_js_settings.hero_speed, 10 ),
			complete() {
				// Called after the entrance animation is executed.
			},
		} );
	};

	text_rotator();

	$document.on( 'header_view_changed', function () {
		text_rotator();
	} );

	/**
	 * Responsive Videos
	 */
	jQuery( '.site-content' ).fitVids( {
		ignore: '.wp-block-embed iframe, .wp-block-embed object',
	} );

	/**
	 * Video lightbox
	 */

	if ( $.fn.lightGallery ) {
		$( '.videolightbox-popup' ).lightGallery( {} );
	}

	// Counter Up
	$( '.counter' ).counterUp( {
		delay: 10,
		time: 1000,
	} );

	/**
	 * Center vertical align for navigation.
	 */
	if ( onepress_js_settings.onepress_vertical_align_menu === '1' ) {
		const header_height = jQuery( '.site-header' ).height();
		jQuery( '.site-header .onepress-menu' ).css(
			'line-height',
			header_height + 'px'
		);
	}

	/**
	 * Section: Hero Full Screen Slideshow
	 * @param no_trigger
	 */
	function hero_full_screen( no_trigger ) {
		if ( $( '.hero-slideshow-fullscreen' ).length > 0 ) {
			const wh = $window.height();
			const top = getAdminBarHeight();
			const $header = jQuery( '#masthead' );
			const is_transparent = $header.hasClass( 'is-t' );
			let headerH;
			if ( is_transparent ) {
				headerH = 0;
			} else {
				headerH = $header.height();
			}
			headerH += top;
			jQuery( '.hero-slideshow-fullscreen' ).css(
				'height',
				wh - headerH + 1 + 'px'
			);
			if ( typeof no_trigger === 'undefined' || ! no_trigger ) {
				$document.trigger( 'hero_ready' );
			}
		}
	}

	$window.on( 'resize', function () {
		hero_full_screen();
	} );
	hero_full_screen();

	$document.on( 'header_view_changed', function () {
		hero_full_screen();
	} );

	$document.on( 'hero_ready', function () {
		hero_full_screen( true );
	} );

	/**
	 * Hero sliders
	 */
	const heroSliders = function () {
		if ( $( '#parallax-hero' ).length <= 0 ) {
			jQuery( '.hero-slideshow-wrapper' ).each( function () {
				const hero = $( this );
				if ( hero.hasClass( 'video-hero' ) ) {
					return;
				}
				let images = hero.data( 'images' ) || false;
				if ( typeof images === 'string' ) {
					images = JSON.parse( images );
				}

				if ( images ) {
					preload_images( images, function () {
						hero.backstretch( images, {
							fade: _to_number( onepress_js_settings.hero_fade ),
							duration: _to_number(
								onepress_js_settings.hero_duration
							),
						} );
						//
						hero.addClass( 'loaded' );
						hero.removeClass( 'loading' );
						setTimeout( function () {
							hero.find( '.slider-spinner' ).remove();
						}, 600 );
					} );
				} else {
					hero.addClass( 'loaded' );
					hero.removeClass( 'loading' );
					hero.find( '.slider-spinner' ).remove();
				}
			} );
		}
	};
	heroSliders();

	$document.on( 'header_view_changed', function () {
		heroSliders();
	} );

	// Parallax hero
	$( '.parallax-hero' ).each( function () {
		const hero = $( this );
		hero.addClass( 'loading' );

		let bg = true;
		if ( hero.find( 'img' ).length > 0 ) {
			bg = false;
		}
		$( '.parallax-bg', hero )
			.imagesLoaded( { background: bg }, function () {
				hero.find( '.hero-slideshow-wrapper' ).addClass( 'loaded' );
				hero.removeClass( 'loading' );
				setTimeout( function () {
					hero.find( '.hero-slideshow-wrapper' )
						.find( '.slider-spinner' )
						.remove();
				}, 600 );
			} )
			.fail( function ( instance ) {
				hero.removeClass( 'loading' );
				hero.find( '.hero-slideshow-wrapper' ).addClass( 'loaded' );
				hero.find( '.hero-slideshow-wrapper' )
					.find( '.slider-spinner' )
					.remove();
			} );
	} );

	$( '.section-parallax' ).each( function () {
		const hero = $( this );
		let bg = true;
		if ( hero.find( 'img' ).length > 0 ) {
			bg = false;
		}
		$( '.parallax-bg', hero )
			.imagesLoaded( { background: bg }, function () {} )
			.fail( function ( instance ) {} );
	} );

	// Trigger when site load
	setTimeout( function () {
		$( window ).trigger( 'scroll' );
	}, 500 );

	/**
	 * Gallery
	 * @param $context
	 */
	function onepress_gallery_init( $context ) {
		// justified
		if ( $.fn.justifiedGallery ) {
			$( '.gallery-justified', $context ).imagesLoaded( function () {
				$( '.gallery-justified', $context ).each( function () {
					let margin = $( this ).attr( 'data-spacing' ) || 20;
					let row_height = $( this ).attr( 'data-row-height' ) || 120;
					margin = _to_number( margin );
					row_height = _to_number( row_height );
					$( this ).justifiedGallery( {
						rowHeight: row_height,
						margins: margin,
						selector: 'a, div:not(.spinner), .inner',
					} );
				} );
			} );
		}

		const is_rtl = onepress_js_settings.is_rtl;

		// Slider
		if ( $.fn.owlCarousel ) {
			$( '.gallery-slider', $context ).owlCarousel( {
				items: 1,
				smartSpeed: 200,
				autoplay: true,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,

				nav: true,
				navText: [
					"<i class='lg-icon'></i>",
					"<i class='lg-icon'></i>",
				],

				autoHeight: true,
				rtl: Number( is_rtl ) !== 0,
				dots: false,
			} );

			$( '.gallery-carousel', $context ).each( function () {
				let n = $( this ).attr( 'data-col' ) || 5;
				n = _to_number( n );
				if ( n <= 0 ) {
					n = 5;
				}

				$( this ).owlCarousel( {
					items: n,
					responsive: {
						0: {
							items: 2,
						},
						768: {
							items: n > 2 ? 2 : n,
						},
						979: {
							items: n > 3 ? 3 : n,
						},
						1199: {
							items: n,
						},
					},
					rtl: Number( is_rtl ) !== 0,
					navSpeed: 800,
					autoplaySpeed: 4000,
					autoplayHoverPause: true,
					nav: true,
					navText: [
						"<i class='lg-icon'></i>",
						"<i class='lg-icon'></i>",
					],
					dots: false,
				} );
			} );
		}

		function isotope_init() {
			if ( $.fn.isotope ) {
				$( '.gallery-masonry', $context ).each( function () {
					const m = $( this );
					let gutter = m.attr( 'data-gutter' ) || 10;
					let columns = m.attr( 'data-col' ) || 5;

					gutter = _to_number( gutter );
					columns = _to_number( columns );

					const w = $( window ).width();
					if ( w <= 940 ) {
						columns = columns > 2 ? columns - 1 : columns;
					}

					if ( w <= 720 ) {
						columns = columns > 3 ? 3 : columns;
					}

					if ( w <= 576 ) {
						columns = columns > 2 ? 2 : columns;
					}

					//gutter = gutter / 2;
					// m.parent().css({'margin-left': -gutter, 'margin-right': -gutter});
					m.find( '.g-item' ).css( {
						width: 100 / columns + '%',
						float: 'left',
						padding: 0,
					} );
					// m.find('.g-item .inner').css({'padding': gutter / 2});
					m.isotope( {
						// options
						itemSelector: '.g-item',
						percentPosition: true,
						masonry: {
							columnWidth: '.inner',
						},
					} );
				} );
			}
		}
		$( '.gallery-masonry', $context ).imagesLoaded( function () {
			isotope_init();
		} );

		$( window ).on( 'resize', function () {
			isotope_init();
		} );

		if ( $.fn.lightGallery ) {
			const wrap_tag = $( '.enable-lightbox', $context )
				.find( '.g-item' )
				.first();
			let tag_selector = 'a';
			if ( wrap_tag.is( 'div' ) ) {
				tag_selector = 'div';
			}

			$( '.enable-lightbox', $context ).lightGallery( {
				mode: 'lg-fade',
				selector: tag_selector,
				//cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)'
			} );
		}
	}

	onepress_gallery_init( $( '.gallery-content' ) );

	if ( $.fn.jarallax ) {
		jQuery( '.jarallax' ).each( function () {
			const $this = jQuery( this );
			var speed = $this.attr( 'data-speed' ) || 0.5;
			var speed = parseFloat( speed );
			if ( speed > 0 ) {
				$this.jarallax( { speed } );
			}
		} );
	}

	if (
		'undefined' !== typeof wp &&
		wp.customize &&
		wp.customize.selectiveRefresh
	) {
		wp.customize.selectiveRefresh.bind(
			'partial-content-rendered',
			function ( placement ) {
				if ( placement.partial.id === 'section-gallery' ) {
					onepress_gallery_init(
						placement.container.find( '.gallery-content' )
					);

					// Trigger resize to make other sections work.
					$( window ).trigger( 'resize' );
				}
			}
		);
	}
} );
