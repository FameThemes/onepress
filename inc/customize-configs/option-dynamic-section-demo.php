<?php
/**
 * Demo: dynamic option blocks + static controls with active_callback.
 *
 * Storage keys (wp_options) keep the `demo` segment:
 * - onepress_dynamic_demo_order
 * - onepress_dynamic_demo_block_{ID}_{title|section_hidden|show_extra|extra_note|slider}
 *
 * @package onepress
 */

if ( ! isset( $wp_customize ) || ! ( $wp_customize instanceof WP_Customize_Manager ) ) {
	return;
}

$onepress_slider_default_json = wp_json_encode(
	array(
		'value'       => '120',
		'valueTablet' => '',
		'valueMobile' => '',
		'unit'        => 'px',
		'unitTablet'  => 'px',
		'unitMobile'  => 'px',
	)
);

$onepress_dynamic_demo_fields = array(
	'title'          => array(
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field',
		'transport'         => 'refresh',
	),
	'section_hidden' => array(
		'default'           => 0,
		'sanitize_callback' => 'onepress_sanitize_switch',
		'transport'         => 'refresh',
	),
	'show_extra'     => array(
		'default'           => 0,
		'sanitize_callback' => 'onepress_sanitize_switch',
		'transport'         => 'refresh',
	),
	'extra_note'  => array(
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field',
		'transport'         => 'refresh',
	),
	'slider'      => array(
		'default'           => $onepress_slider_default_json,
		'sanitize_callback' => function_exists( 'onepress_slider_sanitize_field' ) ? 'onepress_slider_sanitize_field' : 'sanitize_text_field',
		'transport'         => 'refresh',
	),
);

onepress_register_dynamic_option_blocks(
	$wp_customize,
	array(
		'order_option'         => 'onepress_dynamic_demo_order',
		'block_option_prefix'  => 'onepress_dynamic_demo_block_',
		'section_id_prefix'    => 'onepress_dynamic_block_',
		'panel_id'             => 'onepress_dynamic',
		'panel_title'          => esc_html__( 'Dynamic sections demo', 'onepress' ),
		'panel_description'    => '<p>' . esc_html__( 'Blocks are saved as WordPress options. Use the eye on each row to hide from the preview. Remove a block with “Remove this section” inside its panel (or set js_delete_in_list to true in PHP to show trash on the row). Drag ⋮⋮ to reorder.', 'onepress' ) . '</p>',
		'panel_priority'       => 36,
		'add_section_id'       => 'onepress_dynamic_add',
		'add_section_title'    => esc_html__( 'Create new section', 'onepress' ),
		'fields'               => $onepress_dynamic_demo_fields,
		'js_section_type_block' => 'onepress_dynamic_block',
		'js_section_type_new'   => 'onepress_dynamic_new',
		'js_customize_action'   => esc_html__( 'Dynamic sections demo', 'onepress' ),
		// Discover blocks when title + slider exist (older saves); new blocks create all fields.
		'js_required_fields'   => array( 'title', 'slider' ),
	)
);

/*
 * Static demo: PHP active_callback (shows/hides control in the Customizer UI).
 */
$wp_customize->add_section(
	'onepress_dynamic_active_callback_demo',
	array(
		'title'       => esc_html__( 'Control visibility (active_callback)', 'onepress' ),
		'description' => '<p>' . esc_html__( 'The text field below is registered in PHP with active_callback — it appears only when the switch is on.', 'onepress' ) . '</p>',
		'panel'       => 'onepress_dynamic',
		'priority'    => 5,
	)
);

$wp_customize->add_setting(
	'onepress_dynamic_ac_demo_toggle',
	array(
		'type'              => 'option',
		'default'           => 0,
		'sanitize_callback' => 'onepress_sanitize_switch',
		'transport'         => 'refresh',
	)
);

$wp_customize->add_setting(
	'onepress_dynamic_ac_demo_detail',
	array(
		'type'              => 'option',
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field',
		'transport'         => 'refresh',
	)
);

if ( class_exists( 'OnePress_Switch_Customize_Control' ) ) {
	$wp_customize->add_control(
		new OnePress_Switch_Customize_Control(
			$wp_customize,
			'onepress_dynamic_ac_demo_toggle',
			array(
				'label'       => esc_html__( 'Show dependent control', 'onepress' ),
				'description' => esc_html__( 'Turn on to reveal the next setting (PHP active_callback).', 'onepress' ),
				'section'     => 'onepress_dynamic_active_callback_demo',
				'priority'    => 1,
			)
		)
	);
} else {
	$wp_customize->add_control(
		'onepress_dynamic_ac_demo_toggle',
		array(
			'type'     => 'checkbox',
			'label'    => esc_html__( 'Show dependent control', 'onepress' ),
			'section'  => 'onepress_dynamic_active_callback_demo',
			'priority' => 1,
		)
	);
}

$wp_customize->add_control(
	'onepress_dynamic_ac_demo_detail',
	array(
		'type'            => 'text',
		'label'           => esc_html__( 'Dependent field (option)', 'onepress' ),
		'description'     => esc_html__( 'Saved as onepress_dynamic_ac_demo_detail; visible only when the switch above is on.', 'onepress' ),
		'section'         => 'onepress_dynamic_active_callback_demo',
		'priority'        => 2,
		'active_callback' => static function ( $control ) {
			$s = $control->manager->get_setting( 'onepress_dynamic_ac_demo_toggle' );
			return $s && (int) $s->value() === 1;
		},
	)
);

if ( class_exists( 'OnePress_Slider_Customize_Control' ) ) {
	$wp_customize->register_control_type( 'OnePress_Slider_Customize_Control' );
}
