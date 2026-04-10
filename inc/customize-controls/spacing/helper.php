<?php
/**
 * Spacing Customizer: sanitize + front-end CSS (padding / margin).
 *
 * @package onepress
 */

if ( ! function_exists( 'onepress_spacing_sanitize_field' ) ) {
	/**
	 * Sanitize spacing JSON (flat CSS-like keys from the control).
	 *
	 * @param mixed $value Raw value.
	 * @return string JSON or empty string.
	 */
	function onepress_spacing_sanitize_field( $value ) {
		if ( is_string( $value ) ) {
			$value = json_decode( $value, true );
		}
		if ( ! is_array( $value ) ) {
			return '';
		}

		$out = array();
		foreach ( $value as $k => $v ) {
			if ( ! is_string( $k ) ) {
				continue;
			}
			$ok = (bool) preg_match( '/^(padding|margin)-(top|right|bottom|left)(-(tablet|mobile))?$/', $k )
				|| (bool) preg_match( '/^(padding|margin)-linked(-(tablet|mobile))?$/', $k );
			if ( ! $ok ) {
				continue;
			}
			$out[ $k ] = sanitize_text_field( $v );
		}

		if ( empty( $out ) ) {
			return '';
		}
		return wp_json_encode( $out );
	}
}

if ( ! function_exists( 'onepress_spacing_css_block' ) ) {
	/**
	 * @param array  $props    e.g. array( 'padding-top' => '10px', ... ).
	 * @param string $selector CSS selector.
	 * @return string
	 */
	function onepress_spacing_css_block( $props, $selector ) {
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

if ( ! function_exists( 'onepress_spacing_css' ) ) {
	/**
	 * Build CSS from flat keys (padding-* / margin-* with optional -tablet / -mobile).
	 *
	 * @param array        $css      Flat keys from theme mod JSON.
	 * @param array|string $selector CSS selector(s).
	 * @return string|false
	 */
	function onepress_spacing_css( $css, $selector ) {
		if ( ! is_array( $css ) || ! $selector ) {
			return false;
		}

		$prefixes = array( 'padding', 'margin' );
		$sides    = array( 'top', 'right', 'bottom', 'left' );

		$extract = function ( $suffix ) use ( $css, $prefixes, $sides ) {
			$props = array();
			foreach ( $prefixes as $prefix ) {
				foreach ( $sides as $side ) {
					$key = $prefix . '-' . $side;
					if ( '' !== $suffix ) {
						$key .= '-' . $suffix;
					}
					if ( isset( $css[ $key ] ) && '' !== $css[ $key ] ) {
						$prop_name = $prefix . '-' . $side;
						$props[ $prop_name ] = $css[ $key ];
					}
				}
			}
			return $props;
		};

		$breakpoints = apply_filters(
			'onepress_spacing_responsive_breakpoints',
			apply_filters(
				'onepress_typo_responsive_breakpoints',
				array(
					'tablet' => '991px',
					'mobile' => '767px',
				)
			)
		);

		$base         = $extract( '' );
		$tablet_props = $extract( 'tablet' );
		$mobile_props = $extract( 'mobile' );

		$out = onepress_spacing_css_block( $base, $selector );
		if ( ! $out ) {
			$out = '';
		}

		$tablet_bp = isset( $breakpoints['tablet'] ) ? $breakpoints['tablet'] : '991px';
		$mobile_bp = isset( $breakpoints['mobile'] ) ? $breakpoints['mobile'] : '767px';

		if ( ! empty( $tablet_props ) ) {
			$tablet_rule = onepress_spacing_css_block( $tablet_props, $selector );
			if ( $tablet_rule ) {
				$out .= "\n@media (max-width: {$tablet_bp}) {\n" . $tablet_rule . "\n}\n";
			}
		}

		if ( ! empty( $mobile_props ) ) {
			$mobile_rule = onepress_spacing_css_block( $mobile_props, $selector );
			if ( $mobile_rule ) {
				$out .= "\n@media (max-width: {$mobile_bp}) {\n" . $mobile_rule . "\n}\n";
			}
		}

		return $out ? $out : false;
	}
}

if ( ! function_exists( 'onepress_spacing_helper_auto_apply' ) ) {
	/**
	 * Register a theme mod / option key for front-end spacing CSS output.
	 *
	 * @param string      $setting_key   Setting ID.
	 * @param string      $css_selector  Selector.
	 * @param string|null $default       Unused (reserved).
	 * @param string      $data_type     theme_mod or option.
	 * @param string      $editor_selector Unused.
	 */
	function onepress_spacing_helper_auto_apply( $setting_key, $css_selector = '', $default = null, $data_type = 'theme_mod', $editor_selector = '' ) {
		global $onepress_spacing_auto_apply;
		if ( ! isset( $onepress_spacing_auto_apply ) ) {
			$onepress_spacing_auto_apply = array();
		}
		$onepress_spacing_auto_apply[ $setting_key ] = array(
			'key'             => $setting_key,
			'css_selector'    => $css_selector,
			'editor_selector' => $editor_selector,
			'data_type'       => $data_type ? $data_type : 'theme_mod',
			'default'         => $default,
		);
	}
}

if ( ! function_exists( 'onepress_spacing_print_styles' ) ) {
	/**
	 * Echo spacing rules registered via onepress_spacing_helper_auto_apply().
	 */
	function onepress_spacing_print_styles() {
		global $onepress_spacing_auto_apply;
		if ( empty( $onepress_spacing_auto_apply ) || ! is_array( $onepress_spacing_auto_apply ) ) {
			return;
		}

		$chunks = array();
		foreach ( $onepress_spacing_auto_apply as $k => $settings ) {
			$data_type = isset( $settings['data_type'] ) ? $settings['data_type'] : 'theme_mod';
			if ( 'option' === $data_type ) {
				$raw = get_option( $k, '' );
			} else {
				$raw = get_theme_mod( $k, '' );
			}
			if ( ! $raw ) {
				continue;
			}
			$data = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
			if ( ! is_array( $data ) ) {
				continue;
			}
			$selector = isset( $settings['css_selector'] ) ? $settings['css_selector'] : '';
			if ( ! $selector ) {
				continue;
			}
			$rule = onepress_spacing_css( $data, $selector );
			if ( $rule ) {
				$chunks[] = $rule;
			}
		}

		if ( empty( $chunks ) ) {
			return;
		}

		echo '<style class="onepress-spacing-print-styles" type="text/css">' . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo implode( "\n", $chunks ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo "\n</style>\n";
	}

	add_action( 'wp_head', 'onepress_spacing_print_styles', 991 );
}
