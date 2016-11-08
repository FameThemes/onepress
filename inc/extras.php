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

	$onepress_sticky_header = get_theme_mod( 'onepress_sticky_header_disable' );
	if ( $onepress_sticky_header == '' ) {
		$classes[] = 'sticky-header';
	} else {
        $classes[] = 'no-sticky-header';
    }
    // onepress_header_transparent
    if ( is_front_page() && is_page_template( 'template-frontpage.php' ) ) {
        if ( get_theme_mod( 'onepress_header_transparent' ) ) {
            $classes[] = 'header-transparent';
        }
    }

    if ( is_customize_preview() ) {
        $classes[ ] = 'is-customize-preview';
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


