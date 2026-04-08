<?php
/**
 * Typography font lists + sanitize (theme). Prefix: onepress_typo_
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
			$value = json_decode( $value, true );
		}

		if ( ! is_array( $value ) ) {
			return false;
		}

		foreach ( $value as $k => $v ) {
			$value[ strtolower( $k ) ] = sanitize_text_field( $v );
		}

		$value = array_filter( $value );
		return wp_json_encode( $value );
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
	 * Font list for Customizer JS (capped to avoid huge wp_localize / browser freeze).
	 *
	 * Popular Google fonts are merged in first (see priority slugs) so names like “Lato”
	 * stay searchable even when the raw JSON order would place them after the slice.
	 *
	 * @return array
	 */
	function onepress_typo_get_customizer_fonts() {
		$fonts = onepress_typo_get_fonts();
		$fonts = apply_filters( 'onepress_typo_customizer_fonts', $fonts );
		$max   = (int) apply_filters( 'onepress_typo_customizer_fonts_max', 400 );

		if ( $max <= 0 || ! is_array( $fonts ) || count( $fonts ) <= $max ) {
			return $fonts;
		}

		$defaults = onepress_typo_get_default_fonts();
		$extra    = array_diff_key( $fonts, $defaults );
		$slots    = $max - count( $defaults );
		if ( $slots <= 0 ) {
			return array_slice( $fonts, 0, $max, true );
		}

		$priority_slugs = apply_filters(
			'onepress_typo_customizer_font_priority_slugs',
			array(
				'lato',
				'open-sans',
				'roboto',
				'noto-sans',
				'source-sans-pro',
				'montserrat',
				'raleway',
				'poppins',
				'merriweather',
				'playfair-display',
				'oswald',
				'ubuntu',
				'pt-sans',
				'roboto-condensed',
				'nunito',
				'work-sans',
				'inter',
				'rubik',
				'noto-serif',
				'roboto-slab',
			)
		);

		$priority_fonts = array();
		foreach ( $priority_slugs as $slug ) {
			if ( count( $priority_fonts ) >= $slots ) {
				break;
			}
			$key = sanitize_title( is_string( $slug ) ? $slug : '' );
			if ( $key && isset( $extra[ $key ] ) && ! isset( $priority_fonts[ $key ] ) ) {
				$priority_fonts[ $key ] = $extra[ $key ];
			}
		}

		$rest_keys = array_diff( array_keys( $extra ), array_keys( $priority_fonts ) );
		$rest      = array();
		$need      = $slots - count( $priority_fonts );
		foreach ( $rest_keys as $key ) {
			if ( $need <= 0 ) {
				break;
			}
			$rest[ $key ] = $extra[ $key ];
			--$need;
		}

		return array_merge( $defaults, $priority_fonts, $rest );
	}
}
