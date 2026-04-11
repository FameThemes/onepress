<?php
/**
 * Array-driven registration for Customizer settings and controls.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Map logical control keys to PHP control classes.
 *
 * Extend via {@see 'onepress_customize_control_class_map'}.
 *
 * @return array<string, string|null> Type => class name or null if unavailable.
 */
function onepress_customize_control_class_map() {
	$map = array(
		'color'       => class_exists( 'OnePress_Alpha_Color_Control', false ) ? 'OnePress_Alpha_Color_Control' : null,
		'alpha-color' => class_exists( 'OnePress_Alpha_Color_Control', false ) ? 'OnePress_Alpha_Color_Control' : null,
		'heading'     => class_exists( 'OnePress_Heading_Customize_Control', false ) ? 'OnePress_Heading_Customize_Control' : null,
		'typography'  => class_exists( 'OnePress_Typo_Customize_Control', false ) ? 'OnePress_Typo_Customize_Control' : null,
		'misc'        => class_exists( 'OnePress_Misc_Control', false ) ? 'OnePress_Misc_Control' : null,
		'editor'      => class_exists( 'OnePress_Editor_Custom_Control', false ) ? 'OnePress_Editor_Custom_Control' : null,
		'switch'      => class_exists( 'OnePress_Switch_Customize_Control', false ) ? 'OnePress_Switch_Customize_Control' : null,
		'spacing'     => class_exists( 'OnePress_Spacing_Customize_Control', false ) ? 'OnePress_Spacing_Customize_Control' : null,
		'background'  => class_exists( 'OnePress_Background_Customize_Control', false ) ? 'OnePress_Background_Customize_Control' : null,
		'slider'      => class_exists( 'OnePress_Slider_Customize_Control', false ) ? 'OnePress_Slider_Customize_Control' : null,
		'layout'      => class_exists( 'OnePress_Layout_Customize_Control', false ) ? 'OnePress_Layout_Customize_Control' : null,
		'media'       => class_exists( 'OnePress_Media_Control', false ) ? 'OnePress_Media_Control' : null,
		'category'    => class_exists( 'OnePress_Category_Control', false ) ? 'OnePress_Category_Control' : null,
		'pages'       => class_exists( 'OnePress_Pages_Control', false ) ? 'OnePress_Pages_Control' : null,
		'repeatable'  => class_exists( 'Onepress_Customize_Repeatable_Control', false ) ? 'Onepress_Customize_Repeatable_Control' : null,
	);

	return apply_filters( 'onepress_customize_control_class_map', $map );
}

/**
 * Default `add_setting` args per logical `control` type.
 *
 * Optional `transport` here is applied only when the option entry does not declare `transport`
 * at the top level or under `setting` (see {@see onepress_customize_register_options()}).
 *
 * @param string $control_type Logical type from the `control` entry key or `input_type` for `wp` controls.
 * @return array<string, mixed>
 */
function onepress_customize_register_default_setting_args( $control_type ) {
	$defaults = array(
		'sanitize_callback' => 'sanitize_text_field',
	);

	switch ( $control_type ) {
		case 'color':
			$defaults['sanitize_callback'] = 'onepress_sanitize_color_alpha';
			$defaults['default']           = '';
			$defaults['transport']         = 'postMessage';
			break;
		case 'alpha-color':
			$defaults['sanitize_callback'] = 'onepress_sanitize_color_alpha';
			$defaults['default']           = '';
			break;

		case 'text':
			$defaults['sanitize_callback'] = 'sanitize_text_field';
			break;
		case 'textarea':
			$defaults['sanitize_callback'] = 'sanitize_textarea_field';
			break;
		case 'checkbox':
			$defaults['sanitize_callback'] = 'onepress_sanitize_checkbox';
			break;
		case 'radio':
		case 'select':
			$defaults['sanitize_callback'] = 'sanitize_text_field';
			break;
		case 'dropdown-pages':
			$defaults['sanitize_callback'] = 'absint';
			break;
		case 'url':
			$defaults['sanitize_callback'] = 'esc_url_raw';
			break;
		case 'email':
			$defaults['sanitize_callback'] = 'sanitize_email';
			break;
		case 'number':
		case 'range':
			$defaults['sanitize_callback'] = 'absint';
			break;
		case 'image':
			$defaults['sanitize_callback'] = 'esc_url_raw';
			break;
		case 'cropped-image':
			$defaults['sanitize_callback'] = 'absint';
			break;
		case 'media':
			$defaults['sanitize_callback'] = 'onepress_sanitize_media_control_url';
			break;
		case 'date_time':
			$defaults['sanitize_callback'] = 'sanitize_text_field';
			break;
		case 'typography':
			if ( function_exists( 'onepress_typo_sanitize_field' ) ) {
				$defaults['sanitize_callback'] = 'onepress_typo_sanitize_field';
			}
			$defaults['transport'] = 'postMessage';
			$defaults['default']   = wp_json_encode( array() );
			break;
		case 'misc':
			$defaults['sanitize_callback'] = 'onepress_sanitize_text';
			break;
		case 'repeatable':
			if ( function_exists( 'onepress_sanitize_repeatable_data_field' ) ) {
				$defaults['sanitize_callback'] = 'onepress_sanitize_repeatable_data_field';
			}
			$defaults['transport'] = 'postMessage';
			break;
		default:
			break;
	}

	return apply_filters( 'onepress_customize_register_default_setting_args', $defaults, $control_type );
}

/**
 * Register panels, sections, settings, and controls from one declarative list.
 *
 * Special entry types:
 * - `callback` — `callable` under key `callback` receives `WP_Customize_Manager`.
 * - `custom_section` — `section_class`, `id`, plus constructor args (e.g. OnePress_Section_Plus).
 *
 * @param WP_Customize_Manager $wp_customize Manager.
 * @param array<int, array<string, mixed>> $options List of entries.
 */
function onepress_customize_register_options( WP_Customize_Manager $wp_customize, array $options ) {
	$class_map = onepress_customize_control_class_map();

	foreach ( $options as $index => $entry ) {
		if ( ! is_array( $entry ) ) {
			continue;
		}

		/**
		 * Filter a single register-options entry before processing.
		 *
		 * @param array<string, mixed>  $entry Entry.
		 * @param WP_Customize_Manager $wp_customize Manager.
		 * @param int                   $index List index.
		 */
		$entry = apply_filters( 'onepress_customize_register_option_entry', $entry, $wp_customize, $index );

		$item_type = isset( $entry['type'] ) ? (string) $entry['type'] : '';

		if ( 'callback' === $item_type ) {
			if ( isset( $entry['callback'] ) && is_callable( $entry['callback'] ) ) {
				call_user_func( $entry['callback'], $wp_customize );
			}
			continue;
		}

		if ( 'custom_section' === $item_type ) {
			$section_class = isset( $entry['section_class'] ) ? (string) $entry['section_class'] : '';
			$section_id    = isset( $entry['id'] ) ? (string) $entry['id'] : '';
			if ( '' === $section_class || '' === $section_id || ! class_exists( $section_class, false ) ) {
				continue;
			}
			if ( method_exists( $wp_customize, 'register_section_type' ) ) {
				$wp_customize->register_section_type( $section_class );
			}
			$section_args = array_diff_key(
				$entry,
				array(
					'type'          => true,
					'id'            => true,
					'section_class' => true,
				)
			);
			$wp_customize->add_section( new $section_class( $wp_customize, $section_id, $section_args ) );
			continue;
		}

		if ( 'panel' === $item_type ) {
			$panel_id = isset( $entry['id'] ) ? (string) $entry['id'] : '';
			if ( '' === $panel_id ) {
				_doing_it_wrong(
					__FUNCTION__,
					sprintf(
						/* translators: %d: options array index. */
						esc_html__( 'Customizer register options: panel entry #%d requires a non-empty id.', 'onepress' ),
						(int) $index
					),
					'2.3.17'
				);
				continue;
			}
			$panel_args = array_diff_key(
				$entry,
				array(
					'type' => true,
					'id'   => true,
				)
			);
			if ( ! $wp_customize->get_panel( $panel_id ) ) {
				$wp_customize->add_panel( $panel_id, $panel_args );
			}
			continue;
		}

		if ( 'section' === $item_type ) {
			$section_id = isset( $entry['id'] ) ? (string) $entry['id'] : '';
			if ( '' === $section_id ) {
				_doing_it_wrong(
					__FUNCTION__,
					sprintf(
						/* translators: %d: options array index. */
						esc_html__( 'Customizer register options: section entry #%d requires a non-empty id.', 'onepress' ),
						(int) $index
					),
					'2.3.17'
				);
				continue;
			}
			$section_args = array_diff_key(
				$entry,
				array(
					'type' => true,
					'id'   => true,
				)
			);
			if ( ! $wp_customize->get_section( $section_id ) ) {
				$wp_customize->add_section( $section_id, $section_args );
			}
			continue;
		}

		$id          = isset( $entry['id'] ) ? (string) $entry['id'] : '';
		$setting_id  = isset( $entry['setting_id'] ) ? (string) $entry['setting_id'] : '';
		$control_id  = isset( $entry['control_id'] ) ? (string) $entry['control_id'] : '';
		$control_key = isset( $entry['control'] ) ? (string) $entry['control'] : '';

		if ( '' === $setting_id ) {
			$setting_id = $id;
		}
		if ( '' === $control_id ) {
			$control_id = $id;
		}
		if ( '' === $setting_id && '' !== $control_id ) {
			$setting_id = $control_id;
		}
		if ( '' === $control_id && '' !== $setting_id ) {
			$control_id = $setting_id;
		}

		if ( '' === $control_id && '' === $setting_id ) {
			_doing_it_wrong(
				__FUNCTION__,
				sprintf(
					/* translators: %d: options array index. */
					esc_html__( 'Customizer register options: entry #%d needs at least one of id, setting_id, or control_id.', 'onepress' ),
					(int) $index
				),
				'2.3.17'
			);
			continue;
		}

		$skip_setting = ! empty( $entry['skip_setting'] );

		if ( 'wp' === $control_key ) {
			$input_type = isset( $entry['input_type'] ) ? (string) $entry['input_type'] : 'text';
			if ( ! $skip_setting ) {
				$type_defaults = onepress_customize_register_default_setting_args( $input_type );
				$default_transport = array_key_exists( 'transport', $type_defaults ) ? $type_defaults['transport'] : null;
				unset( $type_defaults['transport'] );
				$setting_extra = isset( $entry['setting'] ) && is_array( $entry['setting'] ) ? $entry['setting'] : array();
				$setting_args  = wp_parse_args( $setting_extra, $type_defaults );
				if ( array_key_exists( 'default', $entry ) ) {
					$setting_args['default'] = $entry['default'];
				}
				if ( array_key_exists( 'sanitize_callback', $entry ) ) {
					$setting_args['sanitize_callback'] = $entry['sanitize_callback'];
				}
				if ( array_key_exists( 'transport', $entry ) ) {
					$setting_args['transport'] = $entry['transport'];
				} elseif ( ! array_key_exists( 'transport', $setting_args ) && null !== $default_transport ) {
					$setting_args['transport'] = $default_transport;
				}
				$wp_customize->add_setting( $setting_id, $setting_args );
			}

			$reserved  = array(
				'id'                => true,
				'setting_id'        => true,
				'control_id'        => true,
				'control'           => true,
				'control_class'     => true,
				'setting'           => true,
				'skip_setting'      => true,
				'default'           => true,
				'transport'         => true,
				'sanitize_callback' => true,
				'input_type'        => true,
				'description_html'  => true,
				'limited_msg'       => true,
			);
			$ctrl_args = array_diff_key( $entry, $reserved );
			if ( ! isset( $ctrl_args['type'] ) ) {
				$ctrl_args['type'] = $input_type;
			}
			if ( ! empty( $entry['description_html'] ) && is_string( $entry['description_html'] ) ) {
				$ctrl_args['description'] = wp_kses_post( $entry['description_html'] );
			}
			if ( ! empty( $entry['limited_msg'] ) && is_string( $entry['limited_msg'] ) ) {
				$ctrl_args['limited_msg'] = wp_kses_post( $entry['limited_msg'] );
			}
			if ( $skip_setting ) {
				$ctrl_args['settings'] = array();
			} elseif ( ! isset( $ctrl_args['settings'] ) ) {
				$ctrl_args['settings'] = $setting_id;
			}
			$wp_customize->add_control( $control_id, $ctrl_args );
			continue;
		}

		$custom_class = isset( $entry['control_class'] ) ? (string) $entry['control_class'] : '';
		if ( '' !== $custom_class && class_exists( $custom_class, false ) ) {
			$class_name = $custom_class;
		} elseif ( '' !== $control_key && isset( $class_map[ $control_key ] ) && $class_map[ $control_key ] && class_exists( $class_map[ $control_key ], false ) ) {
			$class_name = $class_map[ $control_key ];
		} else {
			_doing_it_wrong(
				__FUNCTION__,
				sprintf(
					/* translators: %d: options array index. */
					esc_html__( 'Customizer register options: entry #%d has unknown or unavailable control type:', 'onepress' ),
					(int) $index
				) . ' ' . ( '' !== $control_key ? esc_html( $control_key ) : '(empty)' ),
				'2.3.17'
			);
			continue;
		}

		$defaults_key = '' !== $control_key ? $control_key : 'text';
		if ( 'WP_Customize_Image_Control' === $class_name ) {
			$defaults_key = 'image';
		}

		if ( ! $skip_setting ) {
			$type_defaults = onepress_customize_register_default_setting_args( $defaults_key );
			$default_transport = array_key_exists( 'transport', $type_defaults ) ? $type_defaults['transport'] : null;
			unset( $type_defaults['transport'] );
			$setting_extra = isset( $entry['setting'] ) && is_array( $entry['setting'] ) ? $entry['setting'] : array();
			$setting_args  = wp_parse_args( $setting_extra, $type_defaults );

			if ( array_key_exists( 'default', $entry ) ) {
				$setting_args['default'] = $entry['default'];
			}
			if ( array_key_exists( 'sanitize_callback', $entry ) ) {
				$setting_args['sanitize_callback'] = $entry['sanitize_callback'];
			}
			if ( array_key_exists( 'transport', $entry ) ) {
				$setting_args['transport'] = $entry['transport'];
			} elseif ( ! array_key_exists( 'transport', $setting_args ) && null !== $default_transport ) {
				$setting_args['transport'] = $default_transport;
			}

			$wp_customize->add_setting( $setting_id, $setting_args );
		}

		$reserved  = array(
			'id'                 => true,
			'setting_id'         => true,
			'control_id'         => true,
			'control'            => true,
			'control_class'      => true,
			'setting'            => true,
			'skip_setting'       => true,
			'default'            => true,
			'transport'          => true,
			'sanitize_callback'  => true,
			'input_type'         => true,
			'description_html'   => true,
			'limited_msg'        => true,
		);
		$ctrl_args = array_diff_key( $entry, $reserved );

		if ( ! empty( $entry['description_html'] ) && is_string( $entry['description_html'] ) ) {
			$ctrl_args['description'] = wp_kses_post( $entry['description_html'] );
		}
		if ( ! empty( $entry['limited_msg'] ) && is_string( $entry['limited_msg'] ) ) {
			$ctrl_args['limited_msg'] = wp_kses_post( $entry['limited_msg'] );
		}

		if ( $skip_setting ) {
			$ctrl_args['settings'] = array();
		} elseif ( ! isset( $ctrl_args['settings'] ) ) {
			$ctrl_args['settings'] = $setting_id;
		}

		$wp_customize->add_control( new $class_name( $wp_customize, $control_id, $ctrl_args ) );
	}
}
