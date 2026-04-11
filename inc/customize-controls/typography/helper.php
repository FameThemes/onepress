<?php
/**
 * Typography front-end output (theme). Prefix: onepress_typo_
 *
 * @package onepress
 */

if ( ! function_exists( 'onepress_typo_render_code' ) ) {

	if ( ! isset( $GLOBALS['onepress_typo_auto_apply'] ) ) {
		$GLOBALS['onepress_typo_auto_apply'] = array();
	}

	add_action( 'wp_enqueue_scripts', 'onepress_typo_print_styles', 99 );
	add_action( 'wp_head', 'onepress_typo_print_custom_styles', 990 );

	function onepress_typo_print_custom_styles() {
		if ( ! isset( $GLOBALS['onepress_typo_render_code'] ) ) {
			return;
		}
		$return = $GLOBALS['onepress_typo_render_code'];
		if ( isset( $return['code'] ) && trim( $return['code'] ) !== '' ) {
			echo '<style class="onepress-typo-print-styles" type="text/css">' . "\n" . $return['code'] . "\n" . '</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}

	/**
	 * @param bool $echo         Unused legacy.
	 * @param bool $for_editor   Editor context.
	 * @return array|false|void
	 */
	function onepress_typo_render_style( $echo = true, $for_editor = false ) {
		return onepress_typo_render_code( $echo, $for_editor );
	}

	/**
	 * @param bool $enqueue      Enqueue Google font URL.
	 * @param bool $for_editor   Use editor_selector.
	 * @return array|false|void
	 */
	function onepress_typo_render_code( $enqueue = true, $for_editor = false ) {
		if ( isset( $GLOBALS['onepress_typo_render_code'] ) && $GLOBALS['onepress_typo_render_code'] ) {
			return $GLOBALS['onepress_typo_render_code'];
		}

		global $onepress_typo_auto_apply;
		if ( ! isset( $onepress_typo_auto_apply ) ) {
			$onepress_typo_auto_apply = array();
		}

		$google_fonts      = array();
		$font_variants     = array();
		$css               = array();
		$scheme            = is_ssl() ? 'https' : 'http';
		$disable_google_fonts = get_theme_mod( 'onepress_disable_g_font' );

		if ( ! empty( $onepress_typo_auto_apply ) ) {

			$save_data = array();
			foreach ( $onepress_typo_auto_apply as $k => $settings ) {

				if ( isset( $settings['data_type'] ) && 'option' === $settings['data_type'] ) {
					$data = get_option( $k, false );
				} else {
					$data = get_theme_mod( $k, false );
				}
				$data = json_decode( $data, true );
				if ( ( ! $data || empty( $data ) ) && $settings['default'] ) {
					$data = $settings['default'];
				}

				if ( ! is_array( $data ) ) {
					continue;
				}

				$data = array_filter( $data );
				if ( empty( $data ) && is_array( $settings['default'] ) ) {
					$data = array_merge( $settings['default'], $data );
				}

				$data = wp_parse_args(
					$data,
					array(
						'font-family'           => '',
						'color'                 => '',
						'font-style'            => '',
						'font-weight'           => '',
						'font-size'             => '',
						'font-size-tablet'      => '',
						'font-size-mobile'      => '',
						'line-height'           => '',
						'line-height-tablet'    => '',
						'line-height-mobile'    => '',
						'letter-spacing'        => '',
						'letter-spacing-tablet' => '',
						'letter-spacing-mobile' => '',
						'text-transform'        => '',
						'text-decoration'       => '',
					)
				);
				$save_data[ $k ] = $data;
			}

			if ( ! function_exists( 'onepress_typo_get_fonts' ) ) {
				include_once dirname( __FILE__ ) . '/fonts.php';
			}
			$fonts = onepress_typo_get_google_fonts();

			foreach ( $onepress_typo_auto_apply as $k => $settings ) {

				$data = isset( $save_data[ $k ] ) ? $save_data[ $k ] : false;
				if ( ! is_array( $data ) ) {
					continue;
				}

				$font_id = false;
				if ( isset( $data['font-family'] ) && '' !== $data['font-family'] ) {
					$font_id = sanitize_title( $data['font-family'] );
				}

				if ( '' !== $font_id && isset( $fonts[ $font_id ] ) && 'google' === $fonts[ $font_id ]['font_type'] ) {
					if ( $disable_google_fonts ) {
						continue;
					}
					$google_fonts[ $font_id ] = $fonts[ $font_id ];

					if ( ! isset( $font_variants[ $font_id ] ) || ! is_array( $font_variants[ $font_id ] ) ) {
						$font_variants[ $font_id ] = array();
					}

					$style = '';
					if ( $data['font-weight'] ) {
						$style .= $data['font-weight'];
					}

					if ( '' !== $data['font-style'] && 'normal' !== $data['font-style'] ) {
						$style .= $data['font-style'];
					}

					if ( in_array( $style, $fonts[ $font_id ]['font_weights'], true ) ) {
						$font_variants[ $font_id ][ $style ] = $style;
					}
				}

				$selector = $settings['css_selector'];
				if ( $selector ) {
					$css[] = onepress_typo_css( $data, $selector );
				}
			}

			if ( $for_editor ) {
				if ( function_exists( 'onepress_typo_editor_css_vars_block' ) ) {
					$ed_block = onepress_typo_editor_css_vars_block( $save_data, $onepress_typo_auto_apply );
					if ( $ed_block ) {
						$css[] = $ed_block;
					}
				}
				if ( function_exists( 'onepress_typo_editor_typography_consumer_css' ) ) {
					$css[] = onepress_typo_editor_typography_consumer_css();
				}
			}
		}

		$_fonts   = array();
		$_subsets = array();
		$return   = array(
			'url'  => '',
			'code' => '',
		);

		if ( ! $disable_google_fonts ) {
			foreach ( $google_fonts as $font_id => $font ) {
				$name     = str_replace( ' ', '+', $font['name'] );
				$variants = ( isset( $font_variants[ $font_id ] ) && ! empty( $font_variants[ $font_id ] ) ) ? $font_variants[ $font_id ] : array( 'regular' );
				$s        = '';
				$v        = array();
				if ( ! empty( $variants ) ) {
					foreach ( $variants as $_v ) {
						if ( 'regular' !== $_v ) {
							switch ( $_v ) {
								case 'italic':
									$v[ $_v ] = '400i';
									break;
								default:
									$v[ $_v ] = str_replace( 'italic', 'i', $_v );
							}
						} else {
							$v[ $_v ] = '400';
						}
					}
				}

				if ( ! isset( $v['regular'] ) ) {
					$v['regular'] = '400';
				}

				if ( ! isset( $v['400'] ) ) {
					$v['400'] = '400';
				}

				if ( isset( $v['regular'] ) || isset( $v['400'] ) ) {
					if ( isset( $font['font_weights'] ) && in_array( '700', $font['font_weights'], true ) ) {
						$v['700'] = '700';
					}
				}
				if ( isset( $v['regular'] ) || isset( $v['400'] ) ) {
					if ( isset( $font['font_weights'] ) && in_array( '700italic', $font['font_weights'], true ) ) {
						$v['700italic'] = '700i';
					}
				}

				$v = array_unique( $v );

				if ( ! empty( $v ) ) {
					$s .= ':' . join( ',', $v );
				}
				$_fonts[ $font_id ] = "{$name}" . $s;

				if ( isset( $font['subsets'] ) ) {
					$_subsets = array_merge( $_subsets, $font['subsets'] );
				}
			}

			if ( count( $_fonts ) ) {
				$url = $scheme . '://fonts.googleapis.com/css?family=' . join( '|', $_fonts );
				if ( ! empty( $_subsets ) ) {
					$_subsets = array_unique( $_subsets );
					$url     .= '&subset=' . join( ',', $_subsets );
				}
				$return['url'] = $url . '&display=swap';
			}
		}

		$return['code'] = join( " \n ", $css );

		$return = apply_filters( 'onepress_typo_render_code', $return );
		$GLOBALS['onepress_typo_render_code'] = $return;
		if ( $enqueue ) {
			if ( isset( $return['url'] ) && $return['url'] ) {
				wp_enqueue_style( 'onepress-typo-google-font', $return['url'], array(), null );
			}
			return false;
		}
		return $return;
	}

	function onepress_typo_print_styles() {
		onepress_typo_render_code( true, false );
	}

	/**
	 * @param array $css      Typography key/value (may include *-tablet / *-mobile keys).
	 * @param mixed $selector CSS selector(s).
	 * @return string|false
	 */
	function onepress_typo_css( $css, $selector = array() ) {
		if ( ! is_array( $css ) || ! $selector ) {
			return false;
		}

		$responsive_keys = array(
			'font-size-tablet',
			'font-size-mobile',
			'line-height-tablet',
			'line-height-mobile',
			'letter-spacing-tablet',
			'letter-spacing-mobile',
		);

		$base = $css;
		foreach ( $responsive_keys as $rk ) {
			unset( $base[ $rk ] );
		}

		$breakpoints = apply_filters(
			'onepress_typo_responsive_breakpoints',
			array(
				'tablet' => '991px',
				'mobile' => '767px',
			)
		);

		$tablet_props = array();
		if ( isset( $css['font-size-tablet'] ) && '' !== $css['font-size-tablet'] ) {
			$tablet_props['font-size'] = $css['font-size-tablet'];
		}
		if ( isset( $css['line-height-tablet'] ) && '' !== $css['line-height-tablet'] ) {
			$tablet_props['line-height'] = $css['line-height-tablet'];
		}
		if ( isset( $css['letter-spacing-tablet'] ) && '' !== $css['letter-spacing-tablet'] ) {
			$tablet_props['letter-spacing'] = $css['letter-spacing-tablet'];
		}

		$mobile_props = array();
		if ( isset( $css['font-size-mobile'] ) && '' !== $css['font-size-mobile'] ) {
			$mobile_props['font-size'] = $css['font-size-mobile'];
		}
		if ( isset( $css['line-height-mobile'] ) && '' !== $css['line-height-mobile'] ) {
			$mobile_props['line-height'] = $css['line-height-mobile'];
		}
		if ( isset( $css['letter-spacing-mobile'] ) && '' !== $css['letter-spacing-mobile'] ) {
			$mobile_props['letter-spacing'] = $css['letter-spacing-mobile'];
		}

		$out = onepress_typo_css_block( $base, $selector );
		if ( ! $out ) {
			return false;
		}

		$tablet_bp = isset( $breakpoints['tablet'] ) ? $breakpoints['tablet'] : '991px';
		$mobile_bp = isset( $breakpoints['mobile'] ) ? $breakpoints['mobile'] : '767px';

		if ( ! empty( $tablet_props ) ) {
			$tablet_rule = onepress_typo_css_block( $tablet_props, $selector );
			if ( $tablet_rule ) {
				$out .= "\n@media (max-width: {$tablet_bp}) {\n" . $tablet_rule . "\n}\n";
			}
		}

		if ( ! empty( $mobile_props ) ) {
			$mobile_rule = onepress_typo_css_block( $mobile_props, $selector );
			if ( $mobile_rule ) {
				$out .= "\n@media (max-width: {$mobile_bp}) {\n" . $mobile_rule . "\n}\n";
			}
		}

		return $out;
	}

	/**
	 * Single selector block (desktop or one breakpoint subset).
	 *
	 * @param array $css      Keys are CSS property names (e.g. font-size, not font-size-tablet).
	 * @param mixed $selector CSS selector(s).
	 * @return string|false
	 */
	function onepress_typo_css_block( $css, $selector = array() ) {
		if ( ! is_array( $css ) || ! $selector ) {
			return false;
		}

		if ( isset( $css['font-family'] ) && '' !== $css['font-family'] ) {
			$css['font-family'] = '"' . $css['font-family'] . '"';
		}

		$base_px = (int) apply_filters( 'onepress_typo_css_base_px', 16 );

		$code = '';
		if ( is_array( $selector ) ) {
			$selector = array_unique( $selector );
			$code    .= join( "\n", $selector );
		} else {
			$code .= $selector;
		}

		$code .= " { \n";

		foreach ( $css as $k => $v ) {
			if ( 'font-size' === $k ) {
				continue;
			}
			if ( $v && ! is_array( $v ) ) {
				$code .= "\t{$k}: {$v};\n";
			}
		}

		if ( isset( $css['font-size'] ) && '' !== $css['font-size'] ) {
			$rem = intval( $css['font-size'] ) / max( 1, $base_px );
			$code .= "\tfont-size: {$rem}rem;\n";
		}

		$code .= ' }';
		return $code;
	}

	/**
	 * Register a typography JSON source. Empty css_selector → no rules from onepress_typo_css();
	 * :root custom properties + @media overrides come from css-vars.php + onepress_custom_inline_style().
	 */
	function onepress_typo_helper_auto_apply( $setting_key, $css_selector = '', $default = null, $data_type = 'theme_mod', $editor_selector = '' ) {
		global $onepress_typo_auto_apply;
		if ( ! isset( $onepress_typo_auto_apply ) ) {
			$onepress_typo_auto_apply = array();
		}
		$onepress_typo_auto_apply[ $setting_key ] = array(
			'key'             => $setting_key,
			'css_selector'    => $css_selector,
			'editor_selector' => $editor_selector,
			'data_type'       => ( $data_type ) ? $data_type : 'theme_mod',
			'default'         => $default,
		);
	}
}
