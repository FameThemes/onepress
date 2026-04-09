<?php
/**
 * Background Customizer: sanitize + CSS (must match src/admin/customizer/background/buildBackgroundCss.js).
 *
 * @package onepress
 */

if ( ! function_exists( 'onepress_background_state_pseudo' ) ) {
	/**
	 * @return array<string, string>
	 */
	function onepress_background_state_pseudo() {
		return array(
			'normal'        => '',
			'hover'         => ':hover',
			'focus'         => ':focus',
			'focus_visible' => ':focus-visible',
			'focusVisible'  => ':focus-visible',
			'active'        => ':active',
			'visited'       => ':visited',
		);
	}

	/**
	 * @param string $base_selector Comma-separated selectors.
	 * @param string $state_key     Key from onepress_background_state_pseudo().
	 */
	function onepress_background_build_state_selector( $base_selector, $state_key ) {
		$base = trim( (string) $base_selector );
		if ( '' === $base ) {
			return '';
		}
		$map   = onepress_background_state_pseudo();
		$pseudo = isset( $map[ $state_key ] ) ? $map[ $state_key ] : '';
		if ( '' === $pseudo ) {
			return $base;
		}
		$parts = array_map( 'trim', explode( ',', $base ) );
		$out   = array();
		foreach ( $parts as $p ) {
			if ( '' !== $p ) {
				$out[] = $p . $pseudo;
			}
		}
		return implode( ', ', $out );
	}

	/**
	 * Image tab, no URL: reset background (aligned with buildBackgroundCss.js imageTabEmptyDeclarations).
	 *
	 * @return array<string, string>
	 */
	function onepress_background_image_tab_empty_declarations() {
		return array(
			'background-color'      => 'transparent',
			'background-image'      => 'none',
			'background-repeat'     => 'no-repeat',
			'background-size'       => 'auto',
			'background-position'   => 'center center',
			'background-attachment' => 'scroll',
		);
	}

	/**
	 * @param array<string, mixed> $layer Layer for one device.
	 * @return array<string, string>|null
	 */
	function onepress_background_layer_to_declarations( $layer ) {
		if ( ! is_array( $layer ) ) {
			return null;
		}
		$tab = isset( $layer['tab'] ) ? (string) $layer['tab'] : 'color';

		if ( 'color' === $tab ) {
			$c = isset( $layer['color'] ) ? trim( (string) $layer['color'] ) : '';
			if ( '' === $c ) {
				return null;
			}
			return array(
				'background-color'  => $c,
				'background-image'  => 'none',
			);
		}

		if ( 'gradient' === $tab ) {
			$g = isset( $layer['gradient'] ) ? trim( (string) $layer['gradient'] ) : '';
			if ( '' === $g ) {
				return null;
			}
			return array(
				'background-color'  => 'transparent',
				'background-image'  => $g,
				'background-repeat' => 'no-repeat',
			);
		}

		if ( 'image' === $tab ) {
			$u = isset( $layer['imageUrl'] ) ? trim( (string) $layer['imageUrl'] ) : '';
			if ( '' === $u ) {
				return onepress_background_image_tab_empty_declarations();
			}
			$u = esc_url_raw( $u );
			if ( '' === $u ) {
				return onepress_background_image_tab_empty_declarations();
			}
			$safe = str_replace( array( '\\', '"' ), array( '\\\\', '\\"' ), $u );
			return array(
				'background-color'       => 'transparent',
				'background-image'       => 'url("' . $safe . '")',
				'background-size'        => isset( $layer['size'] ) ? sanitize_text_field( (string) $layer['size'] ) : 'cover',
				'background-repeat'      => isset( $layer['repeat'] ) ? sanitize_text_field( (string) $layer['repeat'] ) : 'no-repeat',
				'background-position'    => isset( $layer['position'] ) ? sanitize_text_field( (string) $layer['position'] ) : 'center center',
				'background-attachment' => isset( $layer['attachment'] ) ? sanitize_text_field( (string) $layer['attachment'] ) : 'scroll',
			);
		}

		return null;
	}

	/**
	 * @param array<string, string> $decls
	 */
	function onepress_background_rule_block( $selector, $decls ) {
		if ( ! is_array( $decls ) || '' === (string) $selector ) {
			return '';
		}
		$lines = array();
		foreach ( $decls as $k => $v ) {
			$lines[] = '  ' . $k . ': ' . $v . ';';
		}
		if ( empty( $lines ) ) {
			return '';
		}
		return $selector . " {\n" . implode( "\n", $lines ) . "\n}";
	}

	/**
	 * @param array<string, mixed> $data Decoded JSON from theme mod.
	 * @return string
	 */
	function onepress_background_build_css( $data ) {
		if ( ! is_array( $data ) || empty( $data['_onepressBackground'] ) || empty( $data['_meta'] ) || ! is_array( $data['_meta'] ) ) {
			return '';
		}
		$base_sel = isset( $data['_meta']['selector'] ) ? trim( (string) $data['_meta']['selector'] ) : '';
		$sel_map  = array();
		if ( isset( $data['_meta']['selectorsByState'] ) && is_array( $data['_meta']['selectorsByState'] ) ) {
			foreach ( $data['_meta']['selectorsByState'] as $sk => $sels ) {
				$k = sanitize_key( (string) $sk );
				if ( '' !== $k ) {
					$sel_map[ $k ] = sanitize_text_field( (string) $sels );
				}
			}
		}
		$states = isset( $data['_meta']['states'] ) && is_array( $data['_meta']['states'] ) && ! empty( $data['_meta']['states'] )
			? $data['_meta']['states']
			: array( 'normal' );

		$breakpoints = apply_filters(
			'onepress_background_responsive_breakpoints',
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

		$chunks = array();
		foreach ( $states as $state_key ) {
			$state_key = sanitize_key( (string) $state_key );
			if ( '' === $state_key ) {
				continue;
			}
			if ( isset( $sel_map[ $state_key ] ) && trim( $sel_map[ $state_key ] ) !== '' ) {
				$sel = trim( $sel_map[ $state_key ] );
			} else {
				$sel = onepress_background_build_state_selector( $base_sel, $state_key );
			}
			if ( '' === $sel ) {
				continue;
			}
			if ( empty( $data[ $state_key ] ) || ! is_array( $data[ $state_key ] ) ) {
				continue;
			}
			$st = $data[ $state_key ];

			$desk = isset( $st['desktop'] ) && is_array( $st['desktop'] ) ? onepress_background_layer_to_declarations( $st['desktop'] ) : null;
			if ( $desk ) {
				$chunks[] = onepress_background_rule_block( $sel, $desk );
			}

			$tab = isset( $st['tablet'] ) && is_array( $st['tablet'] ) ? onepress_background_layer_to_declarations( $st['tablet'] ) : null;
			if ( $tab ) {
				$chunks[] = '@media (max-width: ' . $tablet_bp . ") {\n" . onepress_background_rule_block( $sel, $tab ) . "\n}";
			}

			$mob = isset( $st['mobile'] ) && is_array( $st['mobile'] ) ? onepress_background_layer_to_declarations( $st['mobile'] ) : null;
			if ( $mob ) {
				$chunks[] = '@media (max-width: ' . $mobile_bp . ") {\n" . onepress_background_rule_block( $sel, $mob ) . "\n}";
			}
		}

		$out = trim( implode( "\n\n", array_filter( $chunks ) ) );
		return $out;
	}

	/**
	 * @param mixed $value Raw.
	 * @return string JSON or empty string.
	 */
	function onepress_background_sanitize( $value ) {
		if ( is_string( $value ) ) {
			$value = json_decode( $value, true );
		}
		if ( ! is_array( $value ) ) {
			return '';
		}

		$allowed_tabs     = array( 'color', 'gradient', 'image' );
		$allowed_sizes    = array( 'auto', 'cover', 'contain' );
		$allowed_repeat   = array( 'no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'space', 'round' );
		$allowed_attach   = array( 'scroll', 'fixed', 'local' );

		$sanitize_layer = function ( $layer ) use ( $allowed_tabs, $allowed_sizes, $allowed_repeat, $allowed_attach ) {
			if ( ! is_array( $layer ) ) {
				return array();
			}
			$tab = isset( $layer['tab'] ) && in_array( $layer['tab'], $allowed_tabs, true ) ? $layer['tab'] : 'color';
			$out = array(
				'tab'        => $tab,
				'color'      => isset( $layer['color'] ) ? sanitize_text_field( (string) $layer['color'] ) : '',
				'gradient'   => isset( $layer['gradient'] ) ? sanitize_text_field( (string) $layer['gradient'] ) : '',
				'imageId'    => isset( $layer['imageId'] ) ? absint( $layer['imageId'] ) : 0,
				'imageUrl'   => isset( $layer['imageUrl'] ) ? esc_url_raw( (string) $layer['imageUrl'] ) : '',
				'size'       => isset( $layer['size'] ) && in_array( $layer['size'], $allowed_sizes, true ) ? $layer['size'] : 'cover',
				'repeat'     => isset( $layer['repeat'] ) && in_array( $layer['repeat'], $allowed_repeat, true ) ? $layer['repeat'] : 'no-repeat',
				'position'   => isset( $layer['position'] ) ? sanitize_text_field( (string) $layer['position'] ) : 'center center',
				'attachment' => isset( $layer['attachment'] ) && in_array( $layer['attachment'], $allowed_attach, true ) ? $layer['attachment'] : 'scroll',
			);
			return $out;
		};

		$out = array(
			'_onepressBackground' => true,
		);

		if ( isset( $value['_meta'] ) && is_array( $value['_meta'] ) ) {
			$sel          = isset( $value['_meta']['selector'] ) ? sanitize_text_field( wp_unslash( (string) $value['_meta']['selector'] ) ) : '';
			$out['_meta'] = array(
				'selector' => trim( $sel ),
				'states'   => array(),
			);
			$known_states = array_keys( onepress_background_state_pseudo() );
			if ( isset( $value['_meta']['states'] ) && is_array( $value['_meta']['states'] ) ) {
				foreach ( $value['_meta']['states'] as $sk ) {
					$k = sanitize_key( (string) $sk );
					if ( '' !== $k && in_array( $k, $known_states, true ) ) {
						$out['_meta']['states'][] = $k;
					}
				}
			}
			if ( empty( $out['_meta']['states'] ) ) {
				$out['_meta']['states'] = array( 'normal' );
			}
			if ( isset( $value['_meta']['selectorsByState'] ) && is_array( $value['_meta']['selectorsByState'] ) ) {
				$out['_meta']['selectorsByState'] = array();
				foreach ( $value['_meta']['selectorsByState'] as $sk => $sels ) {
					$k = sanitize_key( (string) $sk );
					if ( '' !== $k && in_array( $k, $known_states, true ) ) {
						$out['_meta']['selectorsByState'][ $k ] = sanitize_text_field( (string) $sels );
					}
				}
			}
			if ( isset( $value['_meta']['stateLabels'] ) && is_array( $value['_meta']['stateLabels'] ) ) {
				$out['_meta']['stateLabels'] = array();
				foreach ( $value['_meta']['stateLabels'] as $sk => $lab ) {
					$k = sanitize_key( (string) $sk );
					if ( '' !== $k && in_array( $k, $known_states, true ) ) {
						$out['_meta']['stateLabels'][ $k ] = sanitize_text_field( (string) $lab );
					}
				}
			}
		} else {
			return '';
		}

		$allowed_state_keys = array_keys( onepress_background_state_pseudo() );
		foreach ( $out['_meta']['states'] as $state_key ) {
			if ( ! in_array( $state_key, $allowed_state_keys, true ) ) {
				continue;
			}
			$sd = ( ! empty( $value[ $state_key ] ) && is_array( $value[ $state_key ] ) )
				? $value[ $state_key ]
				: array();
			$out[ $state_key ]            = array();
			$out[ $state_key ]['desktop'] = $sanitize_layer( isset( $sd['desktop'] ) ? $sd['desktop'] : array() );
			$out[ $state_key ]['tablet']  = $sanitize_layer( isset( $sd['tablet'] ) ? $sd['tablet'] : array() );
			$out[ $state_key ]['mobile']  = $sanitize_layer( isset( $sd['mobile'] ) ? $sd['mobile'] : array() );
		}

		return wp_json_encode( $out );
	}

	/**
	 * Register a setting key for front-end output.
	 *
	 * @param string $setting_key Theme mod key.
	 * @param string $data_type   theme_mod|option.
	 */
	function onepress_background_helper_auto_apply( $setting_key, $data_type = 'theme_mod' ) {
		global $onepress_background_auto_apply;
		if ( ! isset( $onepress_background_auto_apply ) ) {
			$onepress_background_auto_apply = array();
		}
		$onepress_background_auto_apply[ $setting_key ] = array(
			'key'       => $setting_key,
			'data_type' => $data_type ? $data_type : 'theme_mod',
		);
	}

	/**
	 * Print registered background CSS in wp_head.
	 */
	function onepress_background_print_styles() {
		global $onepress_background_auto_apply;
		if ( empty( $onepress_background_auto_apply ) || ! is_array( $onepress_background_auto_apply ) ) {
			return;
		}
		$chunks = array();
		foreach ( $onepress_background_auto_apply as $k => $conf ) {
			$dtype = isset( $conf['data_type'] ) ? $conf['data_type'] : 'theme_mod';
			$raw   = 'option' === $dtype ? get_option( $k, '' ) : get_theme_mod( $k, '' );
			if ( ! $raw ) {
				continue;
			}
			$data = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
			if ( ! is_array( $data ) ) {
				continue;
			}
			$css = onepress_background_build_css( $data );
			if ( $css ) {
				$chunks[] = $css;
			}
		}
		if ( empty( $chunks ) ) {
			return;
		}
		echo '<style class="onepress-background-print-styles" type="text/css">' . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo implode( "\n\n", $chunks ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo "\n</style>\n";
	}

	add_action( 'wp_head', 'onepress_background_print_styles', 992 );
}
