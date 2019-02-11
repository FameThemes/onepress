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
				'id' => '',
			)
		);
		$url = '';
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
 * 10 wp_make_content_images_responsive
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
add_filter( 'onepress_the_content', 'wp_make_content_images_responsive' );
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
 * Support Elementor plugin
 */
if ( ! defined( 'ELEMENTOR_PARTNER_ID' ) ) {
	define( 'ELEMENTOR_PARTNER_ID', 2123 );
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
				$image = onepress_get_video_lightbox_image();
				$image_url = wp_get_attachment_image_url( $image, 'full' );
				$image_alt = get_post_meta( $image, '_wp_attachment_image_alt', true );
				if ( $image || onepress_is_selective_refresh() ) {
					echo '<div class="section-parallax">';
					echo ' <div class="parallax-bg"><img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image_alt ) . '"></div>';
				}
				return;
			}
		}

		switch ( $args['_bg_type'] ) {
			case 'video':
				$args = wp_parse_args(
					$args,
					array(
						'video_url' => '',
						'video_webm_url' => '',
						'video_ogv_url' => '',
						'image' => '',
					)
				);
				extract( $args );
				if ( $video_url || $video_webm_url || $video_ogv_url ) {
					?>
				<div class="video-section"
					 data-fallback="<?php echo get_theme_mod( 'onepress_hero_mobile_img' ) ? 'true' : 'false'; ?>"
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
						'image' => '',
						'alpha' => '',
						'enable_parallax' => '',
					)
				);
				extract( $args );
				if ( $enable_parallax == 1 ) {
					$class = 'section-parallax';
					if ( $section_id == 'hero' ) {
						$class = ' parallax-hero';
					}
					echo '<div id="parallax-' . esc_attr( $section_id ) . '" class="' . esc_attr( $class ) . '">';
					echo ' <div class="parallax-bg"><img src="' . esc_url( $image ) . '" alt=""></div>';
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
						'video_url' => '',
						'video_webm_url' => '',
						'video_ogv_url' => '',
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


