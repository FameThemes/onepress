<?php
/**
 * Slider / single dimension Customizer: sanitize + front-end CSS.
 *
 * @package onepress
 */

if ( ! function_exists( 'onepress_slider_allowed_css_properties' ) ) {
	/**
	 * @return string[]
	 */
	function onepress_slider_allowed_css_properties() {
		$list = array(
			'width',
			'max-width',
			'min-width',
			'height',
			'max-height',
			'min-height',
			'flex-basis',
		);
		return apply_filters( 'onepress_slider_allowed_css_properties', $list );
	}
}

if ( ! function_exists( 'onepress_slider_sanitize_css_property' ) ) {
	/**
	 * @param string $prop
	 * @return string
	 */
	function onepress_slider_sanitize_css_property( $prop ) {
		$prop = strtolower( trim( (string) $prop ) );
		$allowed = onepress_slider_allowed_css_properties();
		return in_array( $prop, $allowed, true ) ? $prop : '';
	}
}

if ( ! function_exists( 'onepress_slider_sanitize_field' ) ) {
	/**
	 * Sanitize slider JSON (value / valueTablet / valueMobile + units).
	 *
	 * @param mixed $value Raw value.
	 * @return string JSON or empty string.
	 */
	function onepress_slider_sanitize_field( $value ) {
		if ( is_string( $value ) ) {
			$value = json_decode( $value, true );
		}
		if ( ! is_array( $value ) ) {
			return '';
		}

		$allowed_units = array( 'px', 'em', 'rem', '%' );
		$sanitize_num  = static function ( $raw ) {
			$s = isset( $raw ) ? trim( (string) $raw ) : '';
			if ( '' === $s ) {
				return '';
			}
			if ( ! is_numeric( $s ) ) {
				return '';
			}
			return $s;
		};
		$sanitize_unit = static function ( $raw ) use ( $allowed_units ) {
			$u = isset( $raw ) ? strtolower( trim( (string) $raw ) ) : 'px';
			return in_array( $u, $allowed_units, true ) ? $u : 'px';
		};

		$out = array(
			'value'       => $sanitize_num( $value['value'] ?? '' ),
			'valueTablet' => $sanitize_num( $value['valueTablet'] ?? '' ),
			'valueMobile' => $sanitize_num( $value['valueMobile'] ?? '' ),
			'unit'        => $sanitize_unit( $value['unit'] ?? 'px' ),
			'unitTablet'  => $sanitize_unit( $value['unitTablet'] ?? ( $value['unit'] ?? 'px' ) ),
			'unitMobile'  => $sanitize_unit( $value['unitMobile'] ?? ( $value['unit'] ?? 'px' ) ),
		);

		return wp_json_encode( $out );
	}
}

if ( ! function_exists( 'onepress_slider_css_block' ) ) {
	/**
	 * @param array<string, string> $props One CSS property => value.
	 * @param string                $selector
	 * @return string
	 */
	function onepress_slider_css_block( $props, $selector ) {
		if ( empty( $props ) || ! $selector ) {
			return '';
		}
		$lines = array();
		foreach ( $props as $k => $v ) {
			if ( $v !== '' && $v !== null ) {
				$lines[] = "\t{$k}: {$v};";
			}
		}
		if ( empty( $lines ) ) {
			return '';
		}
		return $selector . " {\n" . implode( "\n", $lines ) . "\n}";
	}
}

if ( ! function_exists( 'onepress_slider_css' ) ) {
	/**
	 * Build CSS for one numeric property across breakpoints.
	 *
	 * @param array  $data     Decoded JSON from theme mod.
	 * @param string $selector CSS selector.
	 * @param string $property CSS property name (e.g. width).
	 * @return string|false
	 */
	function onepress_slider_css( $data, $selector, $property ) {
		if ( ! is_array( $data ) || ! $selector ) {
			return false;
		}
		$property = onepress_slider_sanitize_css_property( $property );
		if ( '' === $property ) {
			return false;
		}

		$breakpoints = apply_filters(
			'onepress_slider_responsive_breakpoints',
			apply_filters(
				'onepress_typo_responsive_breakpoints',
				array(
					'tablet' => '991px',
					'mobile' => '767px',
				)
			)
		);
		$tablet_bp = isset( $breakpoints['tablet'] ) ? $breakpoints['tablet'] : '991px';
		$mobile_bp = isset( $breakpoints['mobile'] ) ? $breakpoints['mobile'] : '767px';

		$pair = static function ( $num, $unit ) {
			$num = isset( $num ) ? trim( (string) $num ) : '';
			if ( '' === $num ) {
				return '';
			}
			$unit = $unit ? trim( (string) $unit ) : 'px';
			return $num . $unit;
		};

		$base_val = $pair( $data['value'] ?? '', $data['unit'] ?? 'px' );
		$tab_val  = $pair( $data['valueTablet'] ?? '', $data['unitTablet'] ?? 'px' );
		$mob_val  = $pair( $data['valueMobile'] ?? '', $data['unitMobile'] ?? 'px' );

		$out = '';
		if ( $base_val !== '' ) {
			$out = onepress_slider_css_block( array( $property => $base_val ), $selector );
		}

		if ( $tab_val !== '' ) {
			$rule = onepress_slider_css_block( array( $property => $tab_val ), $selector );
			if ( $rule ) {
				$out .= "\n@media (max-width: {$tablet_bp}) {\n" . $rule . "\n}\n";
			}
		}

		if ( $mob_val !== '' ) {
			$rule = onepress_slider_css_block( array( $property => $mob_val ), $selector );
			if ( $rule ) {
				$out .= "\n@media (max-width: {$mobile_bp}) {\n" . $rule . "\n}\n";
			}
		}

		return $out ? trim( $out ) : false;
	}
}

if ( ! function_exists( 'onepress_slider_helper_auto_apply' ) ) {
	/**
	 * Register a theme mod key for front-end slider CSS.
	 *
	 * @param string $setting_key  Setting ID.
	 * @param string $css_selector Selector.
	 * @param string $css_property CSS property (width, max-width, …).
	 * @param string $data_type    theme_mod|option.
	 */
	function onepress_slider_helper_auto_apply( $setting_key, $css_selector = '', $css_property = 'width', $data_type = 'theme_mod' ) {
		global $onepress_slider_auto_apply;
		if ( ! isset( $onepress_slider_auto_apply ) ) {
			$onepress_slider_auto_apply = array();
		}
		$onepress_slider_auto_apply[ $setting_key ] = array(
			'key'          => $setting_key,
			'css_selector' => $css_selector,
			'css_property' => $css_property,
			'data_type'    => $data_type ? $data_type : 'theme_mod',
		);
	}
}

if ( ! function_exists( 'onepress_slider_print_styles' ) ) {
	/**
	 * Echo slider rules registered via onepress_slider_helper_auto_apply().
	 */
	function onepress_slider_print_styles() {
		global $onepress_slider_auto_apply;
		if ( empty( $onepress_slider_auto_apply ) || ! is_array( $onepress_slider_auto_apply ) ) {
			return;
		}

		$chunks = array();
		foreach ( $onepress_slider_auto_apply as $k => $conf ) {
			$dtype = isset( $conf['data_type'] ) ? $conf['data_type'] : 'theme_mod';
			$raw   = 'option' === $dtype ? get_option( $k, '' ) : get_theme_mod( $k, '' );
			if ( ! $raw ) {
				continue;
			}
			$data = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
			if ( ! is_array( $data ) ) {
				continue;
			}
			$sel = isset( $conf['css_selector'] ) ? trim( (string) $conf['css_selector'] ) : '';
			$prop = isset( $conf['css_property'] ) ? (string) $conf['css_property'] : 'width';
			$css = onepress_slider_css( $data, $sel, $prop );
			if ( $css ) {
				$chunks[] = $css;
			}
		}
		if ( empty( $chunks ) ) {
			return;
		}
		echo '<style class="onepress-slider-print-styles" type="text/css">' . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo implode( "\n\n", $chunks ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo "\n</style>\n";
	}

	add_action( 'wp_head', 'onepress_slider_print_styles', 991 );
}
