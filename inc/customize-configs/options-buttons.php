<?php
/**
 * Buttons (Customizer) — section after Typography. Rows from
 * `onepress_styling_button_controls_config()` in `inc/registry/button-registry.php`.
 * Theme mod ids / maps: `inc/styling-controls-registry.php`.
 *
 * @package OnePress
 */

$wp_customize->add_section(
	'onepress_buttons',
	array(
		'priority'    => 5,
		'title'       => esc_html__( 'Buttons', 'onepress' ),
		'description' => esc_html__( 'Style primary, secondary, and outline buttons. Targets use Bootstrap-style classes aligned with the theme.', 'onepress' ),
		'panel'       => 'onepress_options',
	)
);

foreach ( onepress_styling_button_controls_config() as $row ) {
	if ( empty( $row['id'] ) || ! is_string( $row['id'] ) ) {
		continue;
	}
	$id           = $row['id'];
	$setting_args = isset( $row['setting'] ) && is_array( $row['setting'] ) ? $row['setting'] : array();
	$control_args = isset( $row['control'] ) && is_array( $row['control'] ) ? $row['control'] : array();

	$wp_customize->add_setting( $id, $setting_args );

	$wp_customize->add_control(
		new Onepress_Customize_Styling_Control(
			$wp_customize,
			$id,
			$control_args
		)
	);
}
