<?php
/**
 * Font manager (Customizer) — rows from `inc/registry/font-registry.php`.
 *
 * Front: Google Fonts from font manager merge into `onepress_styling_enqueue_merged_google_fonts` (single CSS2 URL;
 * font manager variants override styling per family). `onepress_font_manager_enqueue_front_styles` is a no-op for fonts.
 *
 * @package OnePress
 */

require_once get_template_directory() . '/inc/registry/font-registry.php';

foreach ( onepress_font_manager_controls_config() as $row ) {
	if ( empty( $row['id'] ) || ! is_string( $row['id'] ) ) {
		continue;
	}
	$id           = $row['id'];
	$setting_args = isset( $row['setting'] ) && is_array( $row['setting'] ) ? $row['setting'] : array();
	$control_args = isset( $row['control'] ) && is_array( $row['control'] ) ? $row['control'] : array();

	$wp_customize->add_setting( $id, $setting_args );

	$wp_customize->add_control(
		new Onepress_Customize_Font_Manager_Control(
			$wp_customize,
			$id,
			$control_args
		)
	);
}
