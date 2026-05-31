<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package OnePress
 */

/**
 * Add a pingback url auto-discovery header for single posts of any post type.
 */
function onepress_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="' . esc_url( get_bloginfo( 'pingback_url' ) ) . '">';
	}
}
add_action( 'wp_head', 'onepress_pingback_header' );

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 *
 * @return array
 */
function onepress_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Fullwidth template
	if ( is_page_template( 'template-fullwidth-stretched.php' ) ) {
		$classes[] = 'template-fullwidth-stretched';
	}

	if ( is_customize_preview() ) {
		$classes[] = 'is-customize-preview';
	}

	if ( is_page() ) {
		$hide_page_title = get_post_meta( get_the_ID(), '_hide_page_title', true );
		if ( $hide_page_title ) {
			$classes[] = 'hiding-page-title';
		}
	}

	if ( get_theme_mod( 'onepress_animation_disable' ) ) {
		$classes[] = 'animation-disable';
	}

	return $classes;
}
add_filter( 'body_class', 'onepress_body_classes' );


if ( ! function_exists( 'onepress_custom_excerpt_length' ) ) :
	/**
	 * Custom excerpt length for the theme
	 */
	function onepress_custom_excerpt_length( $length ) {
		return 30;
	}
	add_filter( 'excerpt_length', 'onepress_custom_excerpt_length', 999 );
endif;


if ( ! function_exists( 'onepress_new_excerpt_more' ) ) :
	/**
	 * Remove […] string using Filters
	 */
	function onepress_new_excerpt_more( $more ) {
		return ' ...';
	}
	add_filter( 'excerpt_more', 'onepress_new_excerpt_more' );
endif;


/**
 * Get media from a variable
 *
 * @param array $media
 *
 * @return false|string
 */
if ( ! function_exists( 'onepress_get_media_url' ) ) {
	function onepress_get_media_url( $media = array(), $size = 'full' ) {
		$media = wp_parse_args(
			$media,
			array(
				'url' => '',
				'id'  => '',
			)
		);
		$url   = '';
		if ( $media['id'] != '' ) {
			if ( strpos( get_post_mime_type( $media['id'] ), 'image' ) !== false ) {
				$image = wp_get_attachment_image_src( $media['id'], $size );
				if ( $image ) {
					$url = $image[0];
				}
			} else {
				$url = wp_get_attachment_url( $media['id'] );
			}
		}

		if ( $url == '' && $media['url'] != '' ) {
			$id = attachment_url_to_postid( $media['url'] );
			if ( $id ) {
				if ( strpos( get_post_mime_type( $id ), 'image' ) !== false ) {
					$image = wp_get_attachment_image_src( $id, $size );
					if ( $image ) {
						$url = $image[0];
					}
				} else {
					$url = wp_get_attachment_url( $id );
				}
			} else {
				$url = $media['url'];
			}
		}
		return $url;
	}
}

/**
 *  Same hook for the_content
 *
 * @TODO: do not effect content by plugins
 *
 * 8 WP_Embed:run_shortcode
 * 8 WP_Embed:autoembed
 * 10 wptexturize
 * 10 wpautop
 * 10 shortcode_unautop
 * 10 prepend_attachment
 * 10 wp_filter_content_tags || wp_make_content_images_responsive
 * 11 capital_P_dangit
 * 11 do_shortcode
 * 20 convert_smilies
 */
global $wp_embed;
add_filter( 'onepress_the_content', array( $wp_embed, 'run_shortcode' ), 8 );
add_filter( 'onepress_the_content', array( $wp_embed, 'autoembed' ), 8 );
add_filter( 'onepress_the_content', 'wptexturize' );
add_filter( 'onepress_the_content', 'wpautop' );
add_filter( 'onepress_the_content', 'shortcode_unautop' );
add_filter( 'onepress_the_content', 'prepend_attachment' );
if ( function_exists( 'wp_filter_content_tags' ) ) {
	add_filter( 'onepress_the_content', 'wp_filter_content_tags' );
} else {
	add_filter( 'onepress_the_content', 'wp_make_content_images_responsive' );
}
add_filter( 'onepress_the_content', 'capital_P_dangit' );
add_filter( 'onepress_the_content', 'do_shortcode' );
add_filter( 'onepress_the_content', 'convert_smilies' );


if ( ! function_exists( 'onepress_is_wc_active' ) ) {
	function onepress_is_wc_active() {
		if ( class_exists( 'WooCommerce' ) || function_exists( 'is_woocommerce' ) ) {
			return true;
		}
		return false;
	}
}

if ( ! function_exists( 'onepress_is_wc_archive' ) ) {
	function onepress_is_wc_archive() {
		if ( function_exists( 'is_product_category' ) || function_exists( 'is_product_tag' ) ) {
			if ( is_product_category() || is_product_tag() ) {
				return true;
			}
		}
		return false;
	}
}


if ( ! function_exists( 'onepress_get_layout' ) ) {
	/**
	 *
	 *
	 * @param string $default
	 *
	 * @return string|void
	 */
	function onepress_get_layout( $default = 'right-sidebar' ) {
		$layout = get_theme_mod( 'onepress_layout', $default );
		if ( onepress_is_wc_active() ) {
			if ( is_woocommerce() || is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url() ) {
				$is_active_sidebar = is_active_sidebar( 'sidebar-shop' );
				if ( ! $is_active_sidebar ) {
					$layout = 'no-sidebar';
				}
			}
		}

		/**
		 * Support single layout
		 *
		 * @since 2.1.1
		 */
		if ( is_singular( 'post' ) ) {
			$single_layout = get_theme_mod( 'single_layout', 'default' );
			if ( $single_layout != '' && $single_layout != 'default' ) {
				$layout = $single_layout;
			}
		}

		return apply_filters( 'onepress_get_layout', $layout, $default );
	}
}


if ( ! function_exists( 'onepress_get_layout_for_post_id' ) ) {
	/**
	 * Resolve effective sidebar layout for a given post ID — editor-safe.
	 *
	 * Mirrors the priority order applied at frontend render time, but is
	 * callable in admin / REST contexts (no query loop required):
	 *
	 *   1. Page template (`_wp_page_template` meta, pages only):
	 *        template-fullwidth.php          → no-sidebar
	 *        template-fullwidth-stretched.php → no-sidebar
	 *        template-left-sidebar.php       → left-sidebar
	 *   2. Single Layout Sidebar (`single_layout` mod, post type `post`
	 *      only), unless its value is empty or `'default'`.
	 *   3. Site Layout (`onepress_layout` mod) — global default.
	 *
	 * Intentionally does NOT replicate `onepress_get_layout()`'s
	 * WooCommerce sidebar-empty fallback: in the editor we cannot inspect
	 * runtime widget state, and on the frontend that branch is already
	 * handled by `onepress_get_layout()` itself.
	 *
	 * @since 2.4.1
	 * @param int $post_id
	 * @return string One of: `'no-sidebar' | 'left-sidebar' | 'right-sidebar'`.
	 */
	function onepress_get_layout_for_post_id( $post_id ) {
		$post_id = absint( $post_id );
		if ( $post_id <= 0 ) {
			return get_theme_mod( 'onepress_layout', 'right-sidebar' );
		}

		$post_type = get_post_type( $post_id );

		// 1) Page template — highest priority (pages only).
		if ( $post_type === 'page' ) {
			$template = (string) get_post_meta( $post_id, '_wp_page_template', true );
			if ( $template === 'template-fullwidth-stretched.php' ) {
				// Since 2.4.1: stretched is its own layout key so the
				// content-size resolver can emit `100vw` instead of the
				// sidebar/no-sidebar pixel bases. Existing template
				// markup hardcodes `<div class="no-sidebar">` so other
				// `.no-sidebar` CSS rules still apply at render time.
				return 'stretched';
			}
			if ( $template === 'template-fullwidth.php' ) {
				return 'no-sidebar';
			}
			if ( $template === 'template-left-sidebar.php' ) {
				return 'left-sidebar';
			}
		}

		// 2) Single Layout Sidebar — middle priority (posts only).
		if ( $post_type === 'post' ) {
			$single = get_theme_mod( 'single_layout', 'default' );
			if ( $single !== '' && $single !== 'default' ) {
				return $single;
			}
		}

		// 3) Site Layout — global fallback.
		return get_theme_mod( 'onepress_layout', 'right-sidebar' );
	}
}


if ( ! function_exists( 'onepress_resolve_content_width_css' ) ) {
	/**
	 * Resolve the effective `--wp--style--global--content-size` CSS value
	 * (string with unit) for a given layout + post type.
	 *
	 * Layout → value mapping:
	 *   - `'stretched'`                            → `'100vw'`
	 *   - `'no-sidebar'`                           → `<no-sidebar base>px`
	 *   - `'left-sidebar'` / `'right-sidebar'`     → `<sidebar base>px`
	 *
	 * Base values live in `theme.json` (single source of truth):
	 *   - No-sidebar base : `settings.layout.contentSize`        (default 1110px)
	 *   - Sidebar base    : `settings.custom.sidebarContentSize` (default 790px,
	 *                                                            derived from
	 *                                                            grid math)
	 *
	 * Override layer:
	 *   - Post type `post` with `single_layout_content_width` > 0 → user value
	 *     wins, regardless of layout (matches the Customizer-as-explicit-override
	 *     mental model). Posts cannot be on a stretched template so the user
	 *     mod never clashes with the `100vw` branch.
	 *
	 * @since 2.4.1
	 * @param string $layout    One of `'no-sidebar' | 'left-sidebar' | 'right-sidebar' | 'stretched'`.
	 * @param string $post_type Post type slug.
	 * @return string CSS value including unit (e.g. `'790px'`, `'1110px'`, `'100vw'`).
	 *                Callers should compare against `onepress_get_no_sidebar_base_px() . 'px'`
	 *                to decide whether to skip emit (theme.json default).
	 */
	function onepress_resolve_content_width_css( $layout, $post_type ) {
		// Stretched template → bleed to viewport edge.
		if ( $layout === 'stretched' ) {
			return '100vw';
		}

		// User override (single posts only) — wins over base. Posts can't
		// be on a stretched template, so this branch never collides with
		// the `100vw` path above.
		if ( $post_type === 'post' ) {
			$user = absint( get_theme_mod( 'single_layout_content_width' ) );
			if ( $user > 0 ) {
				return $user . 'px';
			}
		}

		// Pixel bases from theme.json.
		$has_sidebar = ( $layout === 'left-sidebar' || $layout === 'right-sidebar' );
		$base        = $has_sidebar
			? onepress_get_sidebar_base_px()
			: onepress_get_no_sidebar_base_px();

		return $base . 'px';
	}
}


if ( ! function_exists( 'onepress_get_no_sidebar_base_px' ) ) {
	/**
	 * Read the no-sidebar content-size base (theme.json `layout.contentSize`)
	 * as an integer pixel value. Used by emit channels to decide whether
	 * to skip the `:root` override (when the resolved value equals the
	 * theme.json default, WP's auto-emitted rule already provides it).
	 *
	 * @since 2.4.1
	 * @return int
	 */
	function onepress_get_no_sidebar_base_px() {
		$settings = function_exists( 'wp_get_global_settings' ) ? wp_get_global_settings() : array();
		return isset( $settings['layout']['contentSize'] )
			? (int) $settings['layout']['contentSize']
			: 1110;
	}
}


if ( ! function_exists( 'onepress_get_sidebar_base_px' ) ) {
	/**
	 * Read the sidebar content-size base (theme.json
	 * `settings.custom.sidebarContentSize`) as an integer pixel value.
	 *
	 * @since 2.4.1
	 * @return int
	 */
	function onepress_get_sidebar_base_px() {
		$settings = function_exists( 'wp_get_global_settings' ) ? wp_get_global_settings() : array();
		return isset( $settings['custom']['sidebarContentSize'] )
			? (int) $settings['custom']['sidebarContentSize']
			: 790;
	}
}


/**
 * Woocommerce Support
 */
if ( class_exists( 'WooCommerce' ) ) {
	remove_action( 'woocommerce_cart_collaterals', 'woocommerce_cross_sell_display' );

	add_filter( 'loop_shop_per_page', 'onepress_number_products_per_page', 20 );

	function onepress_number_products_per_page( $number ) {
		// $cols contains the current number of products per page based on the value stored on Options -> Reading
		// Return the number of products you wanna show per page.
		$number = 20;
		return $number;
	}
}

/**
 * Support WPForms plugin
 */
if ( ! defined( 'WPFORMS_SHAREASALE_ID' ) ) {
	define( 'WPFORMS_SHAREASALE_ID', '1816909' );
}

if ( ! function_exists( 'onepress_get_video_lightbox_image' ) ) {
	/**
	 * @since 2.0.5
	 * @return string
	 */
	function onepress_get_video_lightbox_image() {
		$image = get_theme_mod( 'onepress_videolightbox_image' );
		return $image;
	}
}

if ( ! function_exists( 'onepress_is_self_hosted_video_file_url' ) ) {
	/**
	 * True when URL points to a direct video file (not YouTube/Vimeo/etc. embed).
	 *
	 * @param string $url URL.
	 * @return bool
	 */
	function onepress_is_self_hosted_video_file_url( $url ) {
		if ( ! is_string( $url ) || $url === '' ) {
			return false;
		}
		if ( preg_match( '#youtu(\.be|be\.com)|vimeo\.com|dai\.ly|dailymotion\.com/embed|vk\.com/video_ext#i', $url ) ) {
			return false;
		}
		$path = wp_parse_url( $url, PHP_URL_PATH );
		$ext  = strtolower( pathinfo( (string) $path, PATHINFO_EXTENSION ) );

		return in_array( $ext, array( 'mp4', 'webm', 'ogv', 'ogg', 'mov', 'm4v', 'avi', 'mkv' ), true );
	}
}

if ( ! function_exists( 'onepress_videolightbox_mime_for_video_url' ) ) {
	/**
	 * @param string $url Video file URL.
	 * @return string MIME type for HTML5 <source type="…">.
	 */
	function onepress_videolightbox_mime_for_video_url( $url ) {
		$path = wp_parse_url( (string) $url, PHP_URL_PATH );
		$ext  = strtolower( pathinfo( (string) $path, PATHINFO_EXTENSION ) );
		$map  = array(
			'mp4'  => 'video/mp4',
			'webm' => 'video/webm',
			'ogv'  => 'video/ogg',
			'ogg'  => 'video/ogg',
			'mov'  => 'video/quicktime',
			'm4v'  => 'video/x-m4v',
			'avi'  => 'video/x-msvideo',
			'mkv'  => 'video/x-matroska',
		);

		return isset( $map[ $ext ] ) ? $map[ $ext ] : 'video/mp4';
	}
}

if ( ! function_exists( 'onepress_videolightbox_lightgallery_data_html' ) ) {
	/**
	 * Markup for lightGallery 1.x HTML5 video (stored in data-html; requires lg-html5 class).
	 *
	 * @param string $src_url Absolute URL to video file.
	 * @param string $mime    Optional MIME (from attachment); falls back from extension.
	 * @return string Raw HTML (escape with esc_attr() when placing in data-html).
	 */
	function onepress_videolightbox_lightgallery_data_html( $src_url, $mime = '' ) {
		$safe_url = esc_url( $src_url );
		if ( $safe_url === '' ) {
			return '';
		}
		$mime = is_string( $mime ) && $mime !== '' ? $mime : onepress_videolightbox_mime_for_video_url( $safe_url );

		return '<video class="lg-video-object lg-html5 lg-object" controls preload="metadata"><source src="' . esc_url( $safe_url ) . '" type="' . esc_attr( $mime ) . '"></video>';
	}
}

if ( ! function_exists( 'onepress_videolightbox_poster_url' ) ) {
	/**
	 * Optional poster for self-hosted lightbox (section background image mod).
	 *
	 * @return string URL or empty.
	 */
	function onepress_videolightbox_poster_url() {
		$image_id = get_theme_mod( 'onepress_videolightbox_image' );
		$image_id = absint( $image_id );
		if ( ! $image_id ) {
			return '';
		}
		$url = wp_get_attachment_image_url( $image_id, 'full' );

		return $url ? esc_url( $url ) : '';
	}
}

if ( ! function_exists( 'onepress_sanitize_news_layout' ) ) {
	/**
	 * @param string $value Raw value.
	 * @return string 'list'|'grid'
	 */
	function onepress_sanitize_news_layout( $value ) {
		$value = is_string( $value ) ? $value : 'list';

		return in_array( $value, array( 'list', 'grid' ), true ) ? $value : 'list';
	}
}

if ( ! function_exists( 'onepress_news_snap_columns_per_row' ) ) {
	/**
	 * Snap to a row count that divides the 12-column Bootstrap grid evenly.
	 *
	 * @param int $n Desired columns per row.
	 * @return int One of 1, 2, 3, 4, 6, 12.
	 */
	function onepress_news_snap_columns_per_row( $n ) {
		$allowed = array( 1, 2, 3, 4, 6, 12 );
		$n       = absint( $n );
		if ( $n < 1 ) {
			$n = 1;
		}
		if ( in_array( $n, $allowed, true ) ) {
			return $n;
		}
		$best = 1;
		foreach ( $allowed as $a ) {
			if ( abs( $a - $n ) < abs( $best - $n ) ) {
				$best = $a;
			}
		}

		return $best;
	}
}

if ( ! function_exists( 'onepress_news_columns_per_row_to_span' ) ) {
	/**
	 * Bootstrap 3 column span (out of 12) for equal columns per row.
	 *
	 * @param int $cols_per_row Columns per row (1–12, snapped).
	 * @return int Span 1–12.
	 */
	function onepress_news_columns_per_row_to_span( $cols_per_row ) {
		$c   = onepress_news_snap_columns_per_row( $cols_per_row );
		$map = array(
			1  => 12,
			2  => 6,
			3  => 4,
			4  => 3,
			6  => 2,
			12 => 1,
		);

		return isset( $map[ $c ] ) ? $map[ $c ] : 4;
	}
}

if ( ! function_exists( 'onepress_sanitize_news_grid_columns' ) ) {
	/**
	 * Three integers "desktop tablet mobile" (space-separated), e.g. "3 2 1".
	 *
	 * @param string $input Raw.
	 * @return string Normalized string.
	 */
	function onepress_sanitize_news_grid_columns( $input ) {
		$input = trim( preg_replace( '/\s+/', ' ', (string) $input ) );
		if ( $input === '' ) {
			return '3 2 1';
		}
		$parts = explode( ' ', $input );
		$parts = array_pad( $parts, 3, '1' );
		$out   = array();
		foreach ( array_slice( $parts, 0, 3 ) as $p ) {
			$out[] = (string) onepress_news_snap_columns_per_row( absint( $p ) );
		}

		return implode( ' ', $out );
	}
}

if ( ! function_exists( 'onepress_parse_news_grid_columns' ) ) {
	/**
	 * @param string $string Theme mod value.
	 * @return array{ lg: int, md: int, xs: int } Bootstrap span integers for col-lg-*, col-md-*, col-xs-*.
	 */
	function onepress_parse_news_grid_columns( $string ) {
		$string = trim( (string) $string );
		if ( $string === '' ) {
			$string = '3 2 1';
		}
		$parts = preg_split( '/\s+/', $string );
		$parts = array_pad( $parts, 3, '1' );

		return array(
			'lg' => onepress_news_columns_per_row_to_span( $parts[0] ),
			'md' => onepress_news_columns_per_row_to_span( $parts[1] ),
			'xs' => onepress_news_columns_per_row_to_span( $parts[2] ),
		);
	}
}

if ( ! function_exists( 'onepress_get_blog_posts_loop_layout_config' ) ) {
	/**
	 * Blog / archive listing layout (Customizer: Blog Posts).
	 *
	 * @return array{ layout: string, is_grid: bool, grid_col_class: string }
	 */
	function onepress_get_blog_posts_loop_layout_config() {
		$layout = onepress_sanitize_news_layout( get_theme_mod( 'onepress_blog_posts_layout', 'list' ) );
		$grid_col_class = '';
		if ( $layout === 'grid' ) {
			$spans = onepress_parse_news_grid_columns( get_theme_mod( 'onepress_blog_posts_grid_columns', '2 2 1' ) );
			$grid_col_class = sprintf(
				'col-lg-%d col-md-%d col-xs-%d blog-posts-loop__col',
				(int) $spans['lg'],
				(int) $spans['md'],
				(int) $spans['xs']
			);
		}

		return array(
			'layout'         => $layout,
			'is_grid'        => ( $layout === 'grid' ),
			'grid_col_class' => $grid_col_class,
		);
	}
}


if ( ! function_exists( 'onepress_before_section' ) ) {
	/**
	 * @since 2.0.5
	 *
	 * @param $section_id
	 * @param array      $args
	 */
	function onepress_before_section( $section_id, $args = array() ) {
		if ( ! isset( $args['_bg_type'] ) ) {
			$args['_bg_type'] = '';
		}

		if ( ! class_exists( 'OnePress_Plus' ) ) {
			if ( $section_id == 'videolightbox' ) {
				$image     = onepress_get_video_lightbox_image();
				$image_url = wp_get_attachment_image_url( $image, 'full' );
				$image_alt = get_post_meta( $image, '_wp_attachment_image_alt', true );
				if ( $image || onepress_is_selective_refresh() ) {
					echo '<div class="section-parallax jarallax">';
					echo ' <div class="parallax-bg jarallax-img"><img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image_alt ) . '"></div>';
				}
				return;
			}
		}

		switch ( $args['_bg_type'] ) {
			case 'video':
				$args = wp_parse_args(
					$args,
					array(
						'video_url'      => '',
						'video_webm_url' => '',
						'video_ogv_url'  => '',
						'image'          => '',
					)
				);
				extract( $args );
				if ( $video_url || $video_webm_url || $video_ogv_url ) {
					$fallback = get_theme_mod( 'onepress_hero_mobile_img' ) ? 'true' : 'false';
					?>
				<div class="video-section"
					 data-fallback="<?php echo esc_attr( $fallback ); ?>"
					 data-mp4="<?php echo esc_url( $video_url ); ?>"
					 data-webm="<?php echo esc_url( $video_webm_url ); ?>"
					 data-ogv="<?php echo esc_url( $video_ogv_url ); ?>"
					 data-bg="<?php echo esc_attr( $image ); ?>">
					<?php
				}
				break;

			case 'image':
				$args = wp_parse_args(
					$args,
					array(
						'image'           => '',
						'alpha'           => '',
						'enable_parallax' => '',
					)
				);
				extract( $args );
				if ( $enable_parallax == 1 ) {
					$class = 'section-parallax jarallax';
					if ( $section_id == 'hero' ) {
						$class = ' parallax-hero jarallax';
					}
					echo '<div id="parallax-' . esc_attr( $section_id ) . '" class="' . esc_attr( $class ) . '">';
					echo ' <div class="parallax-bg jarallax-img"><img src="' . esc_url( $image ) . '" alt=""></div>';
				} elseif ( $image || $alpha ) { // image bg
					echo '<div id="bgimage-' . esc_attr( $section_id ) . '" class="bgimage-alpha bgimage-section bgimage-' . esc_attr( $section_id ) . '">';
				}
				break;
		}// end switch
	}
}

if ( ! function_exists( 'onepress_after_section' ) ) {
	/**
	 * @since 2.0.5
	 *
	 * @param null  $section_id
	 * @param array $args
	 */
	function onepress_after_section( $section_id = null, $args = array() ) {
		if ( ! isset( $args['_bg_type'] ) ) {
			$args['_bg_type'] = '';
		}

		if ( ! class_exists( 'OnePress_Plus' ) ) {
			if ( $section_id == 'videolightbox' ) {
				$image = onepress_get_video_lightbox_image();
				if ( $image || onepress_is_selective_refresh() ) {
					echo '</div>';
				}
				return;
			}
		}

		switch ( $args['_bg_type'] ) {
			case 'video':
				$args = wp_parse_args(
					$args,
					array(
						'video_url'      => '',
						'video_webm_url' => '',
						'video_ogv_url'  => '',
					)
				);
				extract( $args );

				if ( $video_url || $video_webm_url || $video_ogv_url ) {
					echo '</div>';
				}
				break;

			case 'image':
				$args = wp_parse_args(
					$args,
					array(
						'image'           => '',
						'alpha'           => '',
						'enable_parallax' => '',
					)
				);
				extract( $args );
				if ( $enable_parallax == 1 ) {
					echo '</div>';
				} elseif ( $image || $alpha ) { // image bg
					echo '</div>';
				}
				break;
		}// end switch
	}
}

add_action( 'onepress_before_section_part', 'onepress_before_section', 10, 2 );
add_action( 'onepress_after_section_part', 'onepress_after_section', 10, 2 );


/**
 * Retrieve the archive title based on the queried object.
 *
 * @return string Archive title.
 */
function onepress_get_the_archive_title( $title ) {
	$disable = get_theme_mod( 'onepress_disable_archive_prefix', false );
	if ( $disable ) {
		if ( is_category() ) {
			$title = single_cat_title( '', false );
		} elseif ( is_tag() ) {
			$title = single_tag_title( '', false );
		} elseif ( is_author() ) {
			$title = '<span class="vcard">' . get_the_author() . '</span>';
		} elseif ( is_year() ) {
			$title = get_the_date( _x( 'Y', 'yearly archives date format', 'onepress' ) );
		} elseif ( is_month() ) {
			$title = get_the_date( _x( 'F Y', 'monthly archives date format', 'onepress' ) );
		} elseif ( is_day() ) {
			$title = get_the_date( _x( 'F j, Y', 'daily archives date format', 'onepress' ) );
		} elseif ( is_post_type_archive() ) {
			$title = post_type_archive_title( '', false );
		} elseif ( is_tax() ) {
			$title = single_term_title( '', false );
		}
	}

	return $title;
}

add_filter( 'get_the_archive_title', 'onepress_get_the_archive_title', 15 );


if ( onepress_is_wc_active() ) {
	/**
	 * Template pages
	*/

	if ( ! function_exists( 'woocommerce_content' ) ) {

		/**
		 * Output WooCommerce content.
		 *
		 * This function is only used in the optional 'woocommerce.php' template.
		 * which people can add to their themes to add basic woocommerce support.
		 * without hooks or modifying core templates.
		 *
		 * @since 2.0.6
		 */
		function woocommerce_content() {

			if ( is_singular( 'product' ) ) {

				while ( have_posts() ) :
					the_post();
					wc_get_template_part( 'content', 'single-product' );
				endwhile;

			} else {

				?>
				<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
				<div class="entry-header">
					<h1 class="page-title entry-title"><?php woocommerce_page_title(); ?></h1>
				</div>
				<?php endif; ?>

				<?php do_action( 'woocommerce_archive_description' ); ?>

				<?php if ( have_posts() ) : ?>

					<?php do_action( 'woocommerce_before_shop_loop' ); ?>

					<?php woocommerce_product_loop_start(); ?>

					<?php if ( wc_get_loop_prop( 'total' ) ) : ?>
						<?php while ( have_posts() ) : ?>
							<?php the_post(); ?>
							<?php wc_get_template_part( 'content', 'product' ); ?>
						<?php endwhile; ?>
					<?php endif; ?>

					<?php woocommerce_product_loop_end(); ?>

					<?php do_action( 'woocommerce_after_shop_loop' ); ?>

				<?php else : ?>

					<?php do_action( 'woocommerce_no_products_found' ); ?>

					<?php
				endif;

			}
		}
	}
}


