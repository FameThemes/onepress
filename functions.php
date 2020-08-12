<?php
/**
 * OnePress functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package OnePress
 */

if ( ! function_exists( 'onepress_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function onepress_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on OnePress, use a find and replace
		 * to change 'onepress' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'onepress', get_template_directory() . '/languages' );

		/*
		 * Add default posts and comments RSS feed links to head.
		 */
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/**
		 * Excerpt for page
		 */
		add_post_type_support( 'page', 'excerpt' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'onepress-blog-small', 300, 150, true );
		add_image_size( 'onepress-small', 480, 300, true );
		add_image_size( 'onepress-medium', 640, 400, true );

		/*
		 * This theme uses wp_nav_menu() in one location.
		 */
		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Menu', 'onepress' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * WooCommerce support.
		 */
		add_theme_support( 'woocommerce' );

		/**
		 * Add theme Support custom logo
		 *
		 * @since WP 4.5
		 * @sin 1.2.1
		 */

		add_theme_support(
			'custom-logo',
			array(
				'height'      => 36,
				'width'       => 160,
				'flex-height' => true,
				'flex-width'  => true,
			// 'header-text' => array( 'site-title',  'site-description' ), //
			)
		);

		// Recommend plugins.
		add_theme_support(
			'recommend-plugins',
			array(
				'wpforms-lite'             => array(
					'name'            => esc_html__( 'Contact Form by WPForms', 'onepress' ),
					'active_filename' => 'wpforms-lite/wpforms.php',
				),
				'famethemes-demo-importer' => array(
					'name'            => esc_html__( 'Famethemes Demo Importer', 'onepress' ),
					'active_filename' => 'famethemes-demo-importer/famethemes-demo-importer.php',
				),
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add support for WooCommerce.
		add_theme_support( 'wc-product-gallery-zoom' );
		add_theme_support( 'wc-product-gallery-lightbox' );
		add_theme_support( 'wc-product-gallery-slider' );

		/**
		 * Add support for Gutenberg.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/reference/theme-support/
		 */
		add_theme_support( 'editor-styles' );
		add_theme_support( 'align-wide' );

		/*
		 * This theme styles the visual editor to resemble the theme style.
		 */
		add_editor_style( array( 'editor-style.css', onepress_fonts_url() ) );
	}
endif;
add_action( 'after_setup_theme', 'onepress_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function onepress_content_width() {
	/**
	 * Support dynamic content width
	 *
	 * @since 2.1.1
	 */
	$width = absint( get_theme_mod( 'single_layout_content_width' ) );
	if ( $width <= 0 ) {
		$width = 800;
	}
	$GLOBALS['content_width'] = apply_filters( 'onepress_content_width', $width );
}
add_action( 'after_setup_theme', 'onepress_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function onepress_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'onepress' ),
			'id'            => 'sidebar-1',
			'description'   => '',
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	if ( class_exists( 'WooCommerce' ) ) {
		register_sidebar(
			array(
				'name'          => esc_html__( 'WooCommerce Sidebar', 'onepress' ),
				'id'            => 'sidebar-shop',
				'description'   => '',
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			)
		);
	}
	for ( $i = 1; $i <= 4; $i++ ) {
		register_sidebar(
			array(
				'name'          => sprintf( __( 'Footer %s', 'onepress' ), $i ),
				'id'            => 'footer-' . $i,
				'description'   => '',
				'before_widget' => '<aside id="%1$s" class="footer-widget widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			)
		);
	}

}
add_action( 'widgets_init', 'onepress_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function onepress_scripts() {

	$theme   = wp_get_theme( 'onepress' );
	$version = $theme->get( 'Version' );

	if ( ! get_theme_mod( 'onepress_disable_g_font' ) ) {
		wp_enqueue_style( 'onepress-fonts', onepress_fonts_url(), array(), $version );
	}

	wp_enqueue_style( 'onepress-animate', get_template_directory_uri() . '/assets/css/animate.min.css', array(), $version );
	wp_enqueue_style( 'onepress-fa', get_template_directory_uri() . '/assets/css/font-awesome.min.css', array(), '4.7.0' );
	wp_enqueue_style( 'onepress-bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.min.css', false, $version );
	wp_enqueue_style( 'onepress-style', get_template_directory_uri() . '/style.css' );

	$custom_css = onepress_custom_inline_style();
	wp_add_inline_style( 'onepress-style', $custom_css );

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'onepress-js-plugins', get_template_directory_uri() . '/assets/js/plugins.js', array( 'jquery' ), $version, true );
	wp_enqueue_script( 'onepress-js-bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array(), $version, true );

	// Animation from settings.
	$onepress_js_settings = array(
		'onepress_disable_animation'     => get_theme_mod( 'onepress_animation_disable' ),
		'onepress_disable_sticky_header' => get_theme_mod( 'onepress_sticky_header_disable' ),
		'onepress_vertical_align_menu'   => get_theme_mod( 'onepress_vertical_align_menu' ),
		'hero_animation'                 => get_theme_mod( 'onepress_hero_option_animation', 'flipInX' ),
		'hero_speed'                     => intval( get_theme_mod( 'onepress_hero_option_speed', 5000 ) ),
		'hero_fade'                      => intval( get_theme_mod( 'onepress_hero_slider_fade', 750 ) ),
		'hero_duration'                  => intval( get_theme_mod( 'onepress_hero_slider_duration', 5000 ) ),
		'hero_disable_preload'           => get_theme_mod( 'onepress_hero_disable_preload', false ) ? true : false,
		'is_home'                        => '',
		'gallery_enable'                 => '',
		'is_rtl'                         => is_rtl(),
	);

	// Load gallery scripts.
	$galley_disable = get_theme_mod( 'onepress_gallery_disable' ) == 1 ? true : false;
	$is_shop        = false;
	if ( function_exists( 'is_woocommerce' ) ) {
		if ( is_woocommerce() ) {
			$is_shop = true;
		}
	}

	// Don't load scripts for woocommerce because it don't need.
	if ( ! $is_shop ) {
		if ( ! $galley_disable || is_customize_preview() ) {
			$onepress_js_settings['gallery_enable'] = 1;
			$display                                = get_theme_mod( 'onepress_gallery_display', 'grid' );
			if ( ! is_customize_preview() ) {
				switch ( $display ) {
					case 'masonry':
						wp_enqueue_script( 'onepress-gallery-masonry', get_template_directory_uri() . '/assets/js/isotope.pkgd.min.js', array(), $version, true );
						break;
					case 'justified':
						wp_enqueue_script( 'onepress-gallery-justified', get_template_directory_uri() . '/assets/js/jquery.justifiedGallery.min.js', array(), $version, true );
						break;
					case 'slider':
					case 'carousel':
						wp_enqueue_script( 'onepress-gallery-carousel', get_template_directory_uri() . '/assets/js/owl.carousel.min.js', array(), $version, true );
						break;
					default:
						break;
				}
			} else {
				wp_enqueue_script( 'onepress-gallery-masonry', get_template_directory_uri() . '/assets/js/isotope.pkgd.min.js', array(), $version, true );
				wp_enqueue_script( 'onepress-gallery-justified', get_template_directory_uri() . '/assets/js/jquery.justifiedGallery.min.js', array(), $version, true );
				wp_enqueue_script( 'onepress-gallery-carousel', get_template_directory_uri() . '/assets/js/owl.carousel.min.js', array(), $version, true );
			}
		}
		wp_enqueue_style( 'onepress-gallery-lightgallery', get_template_directory_uri() . '/assets/css/lightgallery.css' );
	}

	wp_enqueue_script( 'onepress-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), $version, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_front_page() && is_page_template( 'template-frontpage.php' ) ) {
		if ( get_theme_mod( 'onepress_header_scroll_logo' ) ) {
			$onepress_js_settings['is_home'] = 1;
		}
	}
	wp_localize_script( 'onepress-theme', 'onepress_js_settings', $onepress_js_settings );

}
add_action( 'wp_enqueue_scripts', 'onepress_scripts' );


if ( ! function_exists( 'onepress_fonts_url' ) ) :
	/**
	 * Register default Google fonts
	 */
	function onepress_fonts_url() {
		$fonts_url = '';

		/*
		* Translators: If there are characters in your language that are not
		* supported by Open Sans, translate this to 'off'. Do not translate
		* into your own language.
		*/
		$open_sans = _x( 'on', 'Open Sans font: on or off', 'onepress' );

		/*
		* Translators: If there are characters in your language that are not
		* supported by Raleway, translate this to 'off'. Do not translate
		* into your own language.
		*/
		$raleway = _x( 'on', 'Raleway font: on or off', 'onepress' );

		if ( 'off' !== $raleway || 'off' !== $open_sans ) {
			$font_families = array();

			if ( 'off' !== $raleway ) {
				$font_families[] = 'Raleway:400,500,600,700,300,100,800,900';
			}

			if ( 'off' !== $open_sans ) {
				$font_families[] = 'Open Sans:400,300,300italic,400italic,600,600italic,700,700italic';
			}

			$query_args = array(
				'family' => urlencode( implode( '|', $font_families ) ),
				'subset' => urlencode( 'latin,latin-ext' ),
			);

			$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
		}

		return esc_url_raw( $fonts_url );
	}
endif;



/**
 * Glabel OnePress loop properties
 *
 * @since 2.1.0
 */
global $onepress_loop_props;
$onepress_loop_props = array();

/**
 * Set onepress loop property.
 *
 * @since 2.1.0
 *
 * @param string $prop
 * @param string $value
 */
function onepress_loop_set_prop( $prop, $value ) {
	global $onepress_loop_props;
	$onepress_loop_props[ $prop ] = $value;
}


/**
 * Get onepress loop property
 *
 * @since 2.1.0
 *
 * @param $prop
 * @param bool $default
 *
 * @return bool|mixed
 */
function onepress_loop_get_prop( $prop, $default = false ) {
	global $onepress_loop_props;
	if ( isset( $onepress_loop_props[ $prop ] ) ) {
		return apply_filters( 'onepress_loop_get_prop', $onepress_loop_props[ $prop ], $prop );
	}

	return apply_filters( 'onepress_loop_get_prop', $default, $prop );
}

/**
 * Remove onepress loop property
 *
 * @since 2.1.0
 *
 * @param $prop
 */
function onepress_loop_remove_prop( $prop ) {
	global $onepress_loop_props;
	if ( isset( $onepress_loop_props[ $prop ] ) ) {
		unset( $onepress_loop_props[ $prop ] );
	}

}

/**
 * Trim the excerpt with custom length
 *
 * @since 2.1.0
 *
 * @see wp_trim_excerpt
 * @param $text
 * @param null $excerpt_length
 * @return string
 */
function onepress_trim_excerpt( $text, $excerpt_length = null ) {
	$text = strip_shortcodes( $text );
	/** This filter is documented in wp-includes/post-template.php */
	$text = apply_filters( 'the_content', $text );
	$text = str_replace( ']]>', ']]&gt;', $text );

	if ( ! $excerpt_length ) {
		/**
		 * Filters the number of words in an excerpt.
		 *
		 * @since 2.7.0
		 *
		 * @param int $number The number of words. Default 55.
		 */
		$excerpt_length = apply_filters( 'excerpt_length', 55 );
	}

	/**
	 * Filters the string in the "more" link displayed after a trimmed excerpt.
	 *
	 * @since 2.9.0
	 *
	 * @param string $more_string The string shown within the more link.
	 */
	$excerpt_more = apply_filters( 'excerpt_more', ' ' . '&hellip;' );

	return wp_trim_words( $text, $excerpt_length, $excerpt_more );

}

/**
 * Display the excerpt
 *
 * @param string $type
 * @param bool   $length
 */
function onepress_the_excerpt( $type = false, $length = false ) {

	$type   = onepress_loop_get_prop( 'excerpt_type', 'excerpt' );
	$length = onepress_loop_get_prop( 'excerpt_length', false );

	switch ( $type ) {
		case 'excerpt':
			the_excerpt();
			break;
		case 'more_tag':
			the_content( '', true );
			break;
		case 'content':
			the_content( '', false );
			break;
		default:
			$text = '';
			global $post;
			if ( $post ) {
				if ( $post->post_excerpt ) {
					$text = $post->post_excerpt;
				} else {
					$text = $post->post_content;
				}
			}
			$excerpt = onepress_trim_excerpt( $text, $length );
			if ( $excerpt ) {
				// WPCS: XSS OK.
				echo apply_filters( 'the_excerpt', $excerpt );
			} else {
				the_excerpt();
			}
	}
}

/**
 * Config class
 *
 * @since 2.1.1
 */
require get_template_directory() . '/inc/class-config.php';

/**
 * Load Sanitize
 */
require get_template_directory() . '/inc/sanitize.php';

/**
 * Custom Metabox  for this theme.
 */
require get_template_directory() . '/inc/metabox.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Dots Navigation class
 *
 * @since 2.1.0
 */
require get_template_directory() . '/inc/class-sections-navigation.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Add theme info page
 */
require get_template_directory() . '/inc/admin/dashboard.php';

/**
 * Editor Style
 *
 * @since 2.2.1
 */
require get_template_directory() . '/inc/admin/class-editor.php';
