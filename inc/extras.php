<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package OnePress
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
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
        $classes[ ] = 'is-customize-preview';
    }

    if ( is_page() ) {
        $hide_page_title = get_post_meta( get_the_ID(), '_hide_page_title', true);
        if ( $hide_page_title ) {
            $classes[ ] = 'hiding-page-title';
        }
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
add_filter('excerpt_more', 'onepress_new_excerpt_more');
endif;


/**
 * Get media from a variable
 *
 * @param array $media
 * @return false|string
 */
if ( ! function_exists( 'onepress_get_media_url' ) ) {
    function onepress_get_media_url($media = array())
    {
        $media = wp_parse_args($media, array('url' => '', 'id' => ''));
        $url = '';
        if ($media['id'] != '') {
            $url = wp_get_attachment_url($media['id']);
        }
        if ($url == '' && $media['url'] != '') {
            $url = $media['url'];
        }
        return $url;
    }
}

/**
 *  Same hook for the_content
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

if ( ! function_exists( 'onepress_get_layout' ) ) {
    function onepress_get_layout( $default = 'right-sidebar' ) {
        $layout = get_theme_mod( 'onepress_layout', $default );
        if ( function_exists( 'is_woocommerce' ) ) {
            if ( is_woocommerce() || is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url() ) {
                $is_active_sidebar = is_active_sidebar( 'sidebar-shop' );
                if ( ! $is_active_sidebar ) {
                    $layout = 'no-sidebar';
                }
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

