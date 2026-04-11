<?php
/**
 * Site Identity (title_tagline section).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$is_old_logo   = get_theme_mod( 'onepress_site_image_logo' );
$hide_default = $is_old_logo ? 1 : 0;

return array(
	array(
		'id'                => 'onepress_hide_sitetitle',
		'control'           => 'wp',
		'input_type'        => 'checkbox',
		'section'           => 'title_tagline',
		'label'             => esc_html__( 'Hide site title', 'onepress' ),
		'default'           => $hide_default,
		'sanitize_callback' => 'onepress_sanitize_checkbox',
	),
	array(
		'id'                => 'onepress_hide_tagline',
		'control'           => 'wp',
		'input_type'        => 'checkbox',
		'section'           => 'title_tagline',
		'label'             => esc_html__( 'Hide site tagline', 'onepress' ),
		'default'           => $hide_default,
		'sanitize_callback' => 'onepress_sanitize_checkbox',
	),
	array(
		'id'            => 'onepress_retina_logo',
		'control_class' => 'WP_Customize_Image_Control',
		'section'       => 'title_tagline',
		'label'         => esc_html__( 'Retina Logo', 'onepress' ),
		'transport'     => 'postMessage',
		'setting'       => array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		),
	),
	array(
		'id'          => 'onepress_logo_height',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'title_tagline',
		'label'       => esc_html__( 'Logo Height In Pixel', 'onepress' ),
		'transport'   => 'postMessage',
		'default'     => '',
	),
);
