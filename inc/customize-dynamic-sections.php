<?php
/**
 * Reusable Customizer registration: dynamic “option blocks” panel (order JSON + per-block settings).
 *
 * Usage:
 *
 *   onepress_register_dynamic_option_blocks( $wp_customize, array(
 *       'order_option'        => 'my_prefix_order',
 *       'block_option_prefix' => 'my_prefix_block_',  // then my_prefix_block_{id}_field
 *       'section_id_prefix'   => 'my_prefix_block_',  // section id = prefix + id
 *       'panel_id'            => 'my_panel',
 *       'panel_title'         => __( 'Blocks', 'textdomain' ),
 *       'fields'              => array(
 *           'title' => array( 'default' => '', 'sanitize_callback' => 'sanitize_text_field' ),
 *       ),
 *   ) );
 *
 * Optional: `js_delete_in_list` (bool, default false) — show trash on the panel row; when false,
 * the script adds a remove control inside each block section instead.
 *
 * Pair with JS: `registerDynamicOptionBlocks( wp.customize, window.ONEPRESS_DYNAMIC_BLOCKS[i] )`
 * (configs are passed via {@see onepress_dynamic_option_blocks_localize_script()}, including
 * `addSectionTitle` from `add_section_title`).
 *
 * @package onepress
 */

if ( ! class_exists( 'OnePress_Dynamic_New_Section', false ) && class_exists( 'WP_Customize_Section', false ) ) {

	/**
	 * “Add new block” row (Menus-style empty body).
	 */
	class OnePress_Dynamic_New_Section extends WP_Customize_Section {

		/**
		 * @var string
		 */
		public $type = 'onepress_dynamic_new';
	}
}

/**
 * Sanitize order JSON (array of numeric strings).
 *
 * @param mixed $value Raw value.
 * @return string JSON.
 */
function onepress_dynamic_option_blocks_sanitize_order_json( $value ) {
	if ( ! is_string( $value ) ) {
		return '[]';
	}
	$decoded = json_decode( $value, true );
	if ( ! is_array( $decoded ) ) {
		return '[]';
	}
	$out = array();
	foreach ( $decoded as $item ) {
		$s = (string) $item;
		if ( preg_match( '/^\d+$/', $s ) ) {
			$out[] = $s;
		}
	}
	$out = array_values( array_unique( $out ) );
	return wp_json_encode( $out );
}

/**
 * Register one dynamic option-blocks panel (order setting, panel, “add” section, dynamic settings).
 *
 * @param WP_Customize_Manager $wp_customize Manager.
 * @param array                $config      See OnePress_Dynamic_Option_Blocks::normalize_config().
 */
function onepress_register_dynamic_option_blocks( $wp_customize, array $config ) {
	OnePress_Dynamic_Option_Blocks::register( $wp_customize, $config );
}

/**
 * Config payloads for `dynamic-sections.js` (filled during customize_register).
 *
 * @return array<int, array<string, mixed>>
 */
function onepress_dynamic_option_blocks_get_script_configs() {
	return OnePress_Dynamic_Option_Blocks::get_js_configs();
}

/**
 * @internal Enqueued from {@see onepres_customizer_control_scripts()}.
 */
function onepress_dynamic_option_blocks_localize_script( $script_handle ) {
	$data = onepress_dynamic_option_blocks_get_script_configs();
	wp_localize_script( $script_handle, 'ONEPRESS_DYNAMIC_BLOCKS', $data );
}

/**
 * Registry + customize_dynamic_setting_args bridge.
 */
class OnePress_Dynamic_Option_Blocks {

	/**
	 * @var bool
	 */
	private static $hooks_added = false;

	/**
	 * @var array<int, array<string, mixed>>
	 */
	private static $configs = array();

	/**
	 * @param WP_Customize_Manager $wp_customize Manager.
	 * @param array                $raw          User config.
	 */
	public static function register( WP_Customize_Manager $wp_customize, array $raw ) {
		$config = self::normalize_config( $raw );
		self::$configs[] = $config;
		self::ensure_hooks();

		$wp_customize->add_setting(
			$config['order_option'],
			array(
				'type'              => 'option',
				'capability'        => 'edit_theme_options',
				'default'           => '[]',
				'sanitize_callback' => 'onepress_dynamic_option_blocks_sanitize_order_json',
				'transport'         => 'refresh',
			)
		);

		if ( ! $wp_customize->get_panel( $config['panel_id'] ) ) {
			$wp_customize->add_panel(
				$config['panel_id'],
				array(
					'title'       => $config['panel_title'],
					'description' => $config['panel_description'],
					'priority'    => (int) $config['panel_priority'],
				)
			);
		}

		$wp_customize->register_section_type( 'OnePress_Dynamic_New_Section' );

		$wp_customize->add_section(
			new OnePress_Dynamic_New_Section(
				$wp_customize,
				$config['add_section_id'],
				array(
					'title'    => $config['add_section_title'],
					'panel'    => $config['panel_id'],
					'priority' => (int) $config['add_section_priority'],
				)
			)
		);

		$ids = self::collect_setting_ids( $wp_customize, $config );
		if ( $ids ) {
			$wp_customize->add_dynamic_settings( $ids );
		}
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	public static function get_js_configs() {
		$out = array();
		foreach ( self::$configs as $cfg ) {
			$field_defaults = array();
			foreach ( $cfg['fields'] as $fname => $fargs ) {
				$field_defaults[ $fname ] = isset( $fargs['default'] ) ? $fargs['default'] : '';
			}
			$out[] = array(
				'panelId'            => $cfg['panel_id'],
				'orderSettingId'     => $cfg['order_option'],
				'blockSectionPrefix' => $cfg['section_id_prefix'],
				'blockOptionPrefix'  => $cfg['block_option_prefix'],
				'sectionTypeBlock'   => $cfg['js_section_type_block'],
				'sectionTypeNew'     => $cfg['js_section_type_new'],
				'addSectionId'       => $cfg['add_section_id'],
				'addSectionTitle'    => $cfg['add_section_title'],
				'customizeAction'    => $cfg['js_customize_action'],
				'fieldNames'         => array_keys( $cfg['fields'] ),
				'requiredFields'     => $cfg['js_required_fields'],
				'fieldDefaults'      => $field_defaults,
				'deleteInList'       => ! empty( $cfg['js_delete_in_list'] ),
			);
		}
		return $out;
	}

	/**
	 * @param array $raw Raw config.
	 * @return array<string, mixed>
	 */
	private static function normalize_config( array $raw ) {
		$defaults = array(
			'order_option'         => '',
			'block_option_prefix'  => '',
			'section_id_prefix'    => '',
			'panel_id'             => '',
			'panel_title'          => '',
			'panel_description'    => '',
			'panel_priority'       => 36,
			'add_section_id'       => '',
			'add_section_title'    => __( 'Create new section', 'onepress' ),
			'add_section_priority' => 10000,
			'fields'               => array(),
			'js_section_type_block' => 'onepress_dynamic_block',
			'js_section_type_new'   => 'onepress_dynamic_new',
			'js_customize_action'   => '',
			'js_required_fields'   => array( 'title', 'slider' ),
			'js_delete_in_list'    => false,
		);
		$config = wp_parse_args( $raw, $defaults );
		$config = apply_filters( 'onepress_dynamic_option_blocks_config', $config );

		foreach ( array( 'order_option', 'block_option_prefix', 'section_id_prefix', 'panel_id', 'add_section_id' ) as $key ) {
			if ( ! is_string( $config[ $key ] ) || $config[ $key ] === '' ) {
				_doing_it_wrong(
					__FUNCTION__,
					sprintf( 'Missing required dynamic blocks config key: %s', esc_html( $key ) ),
					'2.3.17'
				);
			}
		}
		if ( empty( $config['fields'] ) || ! is_array( $config['fields'] ) ) {
			_doing_it_wrong(
				__FUNCTION__,
				'Dynamic blocks config requires a non-empty "fields" array.',
				'2.3.17'
			);
		}
		if ( empty( $config['panel_title'] ) ) {
			$config['panel_title'] = __( 'Dynamic blocks', 'onepress' );
		}
		if ( $config['js_customize_action'] === '' ) {
			$config['js_customize_action'] = $config['panel_title'];
		}
		$config['panel_priority']       = (int) $config['panel_priority'];
		$config['add_section_priority'] = (int) $config['add_section_priority'];
		return $config;
	}

	private static function ensure_hooks() {
		if ( self::$hooks_added ) {
			return;
		}
		self::$hooks_added = true;
		add_filter( 'customize_dynamic_setting_args', array( __CLASS__, 'filter_setting_args' ), 10, 2 );
	}

	/**
	 * @param array|false $args       Incoming args.
	 * @param string      $setting_id Setting id.
	 * @return array|false
	 */
	public static function filter_setting_args( $args, $setting_id ) {
		foreach ( self::$configs as $cfg ) {
			$prefix = $cfg['block_option_prefix'];
			if ( $prefix === '' || strpos( $setting_id, $prefix ) !== 0 ) {
				continue;
			}
			$suffix = substr( $setting_id, strlen( $prefix ) );
			if ( ! preg_match( '/^(\d+)_(.+)$/', $suffix, $m ) ) {
				continue;
			}
			$field = $m[2];
			if ( ! isset( $cfg['fields'][ $field ] ) ) {
				continue;
			}
			$field_args = $cfg['fields'][ $field ];
			$base       = array(
				'type'              => 'option',
				'capability'        => 'edit_theme_options',
				'transport'         => isset( $field_args['transport'] ) ? $field_args['transport'] : 'refresh',
				'default'           => isset( $field_args['default'] ) ? $field_args['default'] : '',
				'sanitize_callback' => isset( $field_args['sanitize_callback'] ) ? $field_args['sanitize_callback'] : 'sanitize_text_field',
			);
			return array_merge( is_array( $args ) ? $args : array(), $base );
		}
		return $args;
	}

	/**
	 * @param WP_Customize_Manager $wp_customize Manager.
	 * @param array                $config       Normalized config.
	 * @return string[]
	 */
	private static function collect_setting_ids( WP_Customize_Manager $wp_customize, array $config ) {
		$ids     = array();
		$ordered = get_option( $config['order_option'], '[]' );
		if ( ! is_string( $ordered ) ) {
			$ordered = '[]';
		}
		$list = json_decode( $ordered, true );
		$keys = array_keys( $config['fields'] );
		if ( is_array( $list ) ) {
			foreach ( $list as $bid ) {
				$bid = (string) $bid;
				if ( ! preg_match( '/^\d+$/', $bid ) ) {
					continue;
				}
				foreach ( $keys as $field ) {
					$ids[] = $config['block_option_prefix'] . $bid . '_' . $field;
				}
			}
		}
		$quoted_fields = array();
		foreach ( $keys as $k ) {
			$quoted_fields[] = preg_quote( (string) $k, '/' );
		}
		$field_alt = implode( '|', $quoted_fields );
		$pattern   = '/^' . preg_quote( $config['block_option_prefix'], '/' ) . '\d+_(' . $field_alt . ')$/';
		foreach ( array_keys( $wp_customize->unsanitized_post_values() ) as $key ) {
			if ( preg_match( $pattern, $key ) ) {
				$ids[] = $key;
			}
		}
		return array_values( array_unique( $ids ) );
	}
}
