<?php
/**
 * Typography font lists + sanitize (Customizer typography control). Prefix: onepress_typo_
 *
 * @package onepress
 */

if ( ! function_exists( 'onepress_typo_sanitize_field' ) ) {
	/**
	 * Sanitize typography JSON/object fields.
	 *
	 * @param mixed $value Raw value.
	 * @return bool|string JSON string or false.
	 */
	function onepress_typo_sanitize_field( $value ) {
		if ( is_string( $value ) ) {
			$decoded = json_decode( $value, true );
			$value   = ( null !== $decoded ) ? $decoded : $value;
		}

		if ( ! is_array( $value ) ) {
			return false;
		}

		$clean = array();
		foreach ( $value as $k => $v ) {
			if ( ! is_scalar( $v ) ) {
				continue;
			}
			$key            = str_replace( '_', '-', strtolower( (string) $k ) );
			$clean[ $key ] = sanitize_text_field( (string) $v );
		}

		$clean = array_filter(
			$clean,
			static function ( $item ) {
				return null !== $item && '' !== $item && false !== $item;
			}
		);

		if ( array() === $clean ) {
			return false;
		}

		return wp_json_encode( $clean );
	}
}

if ( ! function_exists( 'onepress_typo_get_default_fonts' ) ) {
	function onepress_typo_get_default_fonts() {
		$font_list = array(
			'Arial'               => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Century Gothic'      => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Courier New'         => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Georgia'             => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Helvetica'           => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Impact'              => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Lucida Console'      => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Lucida Sans Unicode' => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Palatino Linotype'   => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'sans-serif'          => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'serif'               => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Tahoma'              => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Trebuchet MS'        => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
			'Verdana'             => array( 'weights' => array( '400', '400italic', '700', '700italic' ) ),
		);

		$fonts = array();
		foreach ( $font_list as $font => $attributes ) {
			$atts       = array(
				'name'         => $font,
				'font_type'    => 'default',
				'font_weights' => $attributes['weights'],
				'subsets'      => array(),
				'url'          => '',
			);
			$id           = sanitize_title( $font );
			$fonts[ $id ] = $atts;
		}

		return apply_filters( 'onepress_typo_get_default_fonts', $fonts );
	}
}

if ( ! function_exists( 'onepress_typo_get_google_fonts' ) ) {
	function onepress_typo_get_google_fonts() {
		$fonts = apply_filters( 'onepress_typo_before_get_google_fonts', null );
		if ( is_array( $fonts ) ) {
			return $fonts;
		}

		$font_output = include dirname( __FILE__ ) . '/google-fonts.php';

		$fonts  = array();
		$scheme = is_ssl() ? 'https' : 'http';
		if ( is_array( $font_output ) ) {
			foreach ( $font_output['items'] as $item ) {
				$name = str_replace( ' ', '+', $item['family'] );

				$url = $scheme . "://fonts.googleapis.com/css?family={$name}:" . join( ',', $item['variants'] );
				if ( isset( $item['subsets'] ) ) {
					$url .= '&subset=' . join( ',', $item['subsets'] );
				}
				$url .= '&display=swap';

				$atts = array(
					'name'         => $item['family'],
					'category'     => $item['category'],
					'font_type'    => 'google',
					'font_weights' => $item['variants'],
					'subsets'      => $item['subsets'],
					'files'        => $item['files'],
					'url'          => $url,
				);

				$id           = sanitize_title( $item['family'] );
				$fonts[ $id ] = $atts;
			}
		}

		return apply_filters( 'onepress_typo_get_google_fonts', $fonts );
	}
}

if ( ! function_exists( 'onepress_typo_get_fonts' ) ) {
	/**
	 * Merged default + Google fonts (cached).
	 *
	 * @return array
	 */
	function onepress_typo_get_fonts() {
		if ( get_theme_mod( 'onepress_disable_g_font' ) ) {
			return onepress_typo_get_default_fonts();
		}

		if ( false === ( $fonts = get_transient( 'onepress_typo_fonts' ) ) ) {
			$fonts = array_merge( onepress_typo_get_default_fonts(), onepress_typo_get_google_fonts() );
			set_transient( 'onepress_typo_fonts', $fonts, 24 * HOUR_IN_SECONDS );
		}
		return $fonts;
	}
}

if ( ! function_exists( 'onepress_typo_get_customizer_fonts' ) ) {
	/**
	 * Font list for Customizer JS.
	 *
	 * Default/system and Google lists are not localized; the control loads families from
	 * the WordPress REST API (`/wp/v2/font-families`). Use `onepress_typo_customizer_fonts`
	 * to inject additional entries if needed.
	 *
	 * @return array
	 */
	function onepress_typo_get_customizer_fonts() {
		$fonts = array();
		return apply_filters( 'onepress_typo_customizer_fonts', $fonts );
	}
}
