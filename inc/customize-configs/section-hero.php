<?php
/**
 * Section: Hero (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Onepress_Config', false ) || ! Onepress_Config::is_section_active( 'hero' ) ) {
	return array();
}

$onepress_hero_animation_css = 'bounce flash pulse rubberBand shake headShake swing tada wobble jello bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flipInX flipInY flipOutX flipOutY lightSpeedIn lightSpeedOut rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight hinge rollIn rollOut zoomIn zoomInDown zoomInLeft zoomInRight zoomInUp zoomOut zoomOutDown zoomOutLeft zoomOutRight zoomOutUp slideInDown slideInLeft slideInRight slideInUp slideOutDown slideOutLeft slideOutRight slideOutUp';

$onepress_hero_animations = array();
foreach ( explode( ' ', $onepress_hero_animation_css ) as $onepress_hero_anim_token ) {
	$onepress_hero_anim_token = trim( $onepress_hero_anim_token );
	if ( '' !== $onepress_hero_anim_token ) {
		$onepress_hero_animations[ $onepress_hero_anim_token ] = $onepress_hero_anim_token;
	}
}

$onepress_hero_t_uri = get_template_directory_uri();
$onepress_hero_default_slides = wp_json_encode(
	array(
		array(
			'image' => array(
				'url' => $onepress_hero_t_uri . '/assets/images/hero5.jpg',
				'id'  => '',
			),
		),
	)
);

$onepress_hero_btn_choices = array(
	'btn-theme-primary'     => esc_html__( 'Button Primary', 'onepress' ),
	'btn-secondary-outline' => esc_html__( 'Button Secondary', 'onepress' ),
	'btn-default'           => esc_html__( 'Button', 'onepress' ),
	'btn-primary'           => esc_html__( 'Primary', 'onepress' ),
	'btn-success'           => esc_html__( 'Success', 'onepress' ),
	'btn-info'              => esc_html__( 'Info', 'onepress' ),
	'btn-warning'           => esc_html__( 'Warning', 'onepress' ),
	'btn-danger'            => esc_html__( 'Danger', 'onepress' ),
);

return array(
	array(
		'type'            => 'panel',
		'id'              => 'onepress_hero_panel',
		'priority'        => 130,
		'title'           => esc_html__( 'Section: Hero', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_hero_settings',
		'priority'    => 3,
		'title'       => esc_html__( 'Hero Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_hero_panel',
	),
	array(
		'id'          => 'onepress_hero_disable',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_hero_settings',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'                => 'onepress_hero_id',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_hero_settings',
		'label'             => esc_html__( 'Section ID:', 'onepress' ),
		'description'       => esc_html__( 'The section ID should be English character, lowercase and no space.', 'onepress' ),
		'default'           => esc_html__( 'hero', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_hero_fullscreen',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_hero_settings',
		'label'       => esc_html__( 'Make hero section full screen', 'onepress' ),
		'description' => esc_html__( 'Check this box to make hero section full screen.', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'          => 'onepress_hero_disable_preload',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_hero_settings',
		'label'       => esc_html__( 'Disable Preload Icon', 'onepress' ),
		'default'     => '',
	),
	array(
		'id'              => 'onepress_hero_pdtop',
		'control'         => 'wp',
		'input_type'      => 'text',
		'section'         => 'onepress_hero_settings',
		'label'           => esc_html__( 'Padding Top:', 'onepress' ),
		'description'     => esc_html__( 'The hero content padding top in percent (%).', 'onepress' ),
		'default'         => esc_html__( '10', 'onepress' ),
		'active_callback' => 'onepress_hero_fullscreen_callback',
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'              => 'onepress_hero_pdbotom',
		'control'         => 'wp',
		'input_type'      => 'text',
		'section'         => 'onepress_hero_settings',
		'label'           => esc_html__( 'Padding Bottom:', 'onepress' ),
		'description'     => esc_html__( 'The hero content padding bottom in percent (%).', 'onepress' ),
		'default'         => esc_html__( '10', 'onepress' ),
		'active_callback' => 'onepress_hero_fullscreen_callback',
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'          => 'onepress_hero_option_animation',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_hero_settings',
		'label'       => esc_html__( 'Text animation', 'onepress' ),
		'default'     => 'flipInX',
		'choices'     => $onepress_hero_animations,
	),
	array(
		'id'          => 'onepress_hero_option_speed',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_hero_settings',
		'label'       => esc_html__( 'Text animation speed', 'onepress' ),
		'description' => esc_html__( 'The delay between the changing of each phrase in milliseconds.', 'onepress' ),
		'default'     => '5000',
	),
	array(
		'id'          => 'onepress_hero_slider_fade',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_hero_settings',
		'label'       => esc_html__( 'Slider animation speed', 'onepress' ),
		'description' => esc_html__( 'This is the speed at which the image will fade in. Integers in milliseconds are accepted.', 'onepress' ),
		'default'     => '750',
	),
	array(
		'id'          => 'onepress_hero_slider_duration',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_hero_settings',
		'label'       => esc_html__( 'Slider duration speed', 'onepress' ),
		'description' => esc_html__( 'The amount of time in between slides, expressed as the number of milliseconds.', 'onepress' ),
		'default'     => '5000',
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_hero_images',
		'priority'    => 6,
		'title'       => esc_html__( 'Hero Background Media', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_hero_panel',
	),
	array(
		'id'            => 'onepress_hero_images',
		'control'       => 'repeatable',
		'label'         => esc_html__( 'Background Images', 'onepress' ),
		'description'   => '',
		'priority'      => 40,
		'section'       => 'onepress_hero_images',
		'title_format'  => esc_html__( 'Background', 'onepress' ),
		'max_item'      => 2,
		'fields'        => array(
			'image' => array(
				'title'   => esc_html__( 'Background Image', 'onepress' ),
				'type'    => 'media',
				'default' => array(
					'url' => $onepress_hero_t_uri . '/assets/images/hero5.jpg',
					'id'  => '',
				),
			),
		),
		'transport'     => 'refresh',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
			'transport'         => 'refresh',
			'default'           => $onepress_hero_default_slides,
		),
	),
	array(
		'id'          => 'onepress_hero_overlay_color',
		'control'     => 'alpha-color',
		'section'     => 'onepress_hero_images',
		'label'       => esc_html__( 'Background Overlay Color', 'onepress' ),
		'priority'    => 130,
		'default'     => 'rgba(0,0,0,.3)',
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
	),
	array(
		'id'          => 'onepress_hero_parallax',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_hero_images',
		'label'       => esc_html__( 'Enable parallax effect (apply for first BG image only)', 'onepress' ),
		'description' => '',
		'priority'    => 50,
		'default'     => 0,
		'transport'   => 'refresh',
		'setting'     => array(
			'transport' => 'refresh',
		),
	),
	array(
		'id'            => 'onepress_hero_videobackground_upsell',
		'control'       => 'misc',
		'type'          => 'custom_message',
		'section'       => 'onepress_hero_images',
		'priority'      => 131,
		'description'   => wp_kses_post(
			__( 'Want to add <strong>background video</strong> for hero section? Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version.', 'onepress' )
		),
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
		),
	),
	array(
		'type'        => 'section',
		'id'          => 'onepress_hero_content_layout1',
		'priority'    => 9,
		'title'       => esc_html__( 'Hero Content Layout', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_hero_panel',
	),
	array(
		'id'          => 'onepress_hero_layout',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Display Layout', 'onepress' ),
		'description' => '',
		'default'     => '1',
		'sanitize_callback' => 'onepress_sanitize_text',
		'choices'     => array(
			'1' => esc_html__( 'Layout 1', 'onepress' ),
			'2' => esc_html__( 'Layout 2', 'onepress' ),
		),
	),
	array(
		'id'            => 'onepress_hcl1_largetext',
		'control'       => 'editor',
		'section'       => 'onepress_hero_content_layout1',
		'label'         => esc_html__( 'Large Text', 'onepress' ),
		'description'   => esc_html__( 'Text Rotating Guide: Put your rotate texts separate by "|" into <span class="js-rotating">...</span>, go to Customizer -> Theme Options -> Section: Hero -> Hero Settings to control rotate animation.', 'onepress' ),
		'default'       => wp_kses_post( __( 'We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress' ) ),
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'mod'               => 'html',
			'default'           => wp_kses_post( __( 'We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress' ) ),
		),
	),
	array(
		'id'          => 'onepress_hcl1_r_color',
		'control'     => 'alpha-color',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Rotating Text Color', 'onepress' ),
		'default'     => null,
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
	),
	array(
		'id'          => 'onepress_hcl1_r_bg_color',
		'control'     => 'alpha-color',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Rotating Text Background', 'onepress' ),
		'default'     => null,
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
	),
	array(
		'id'            => 'onepress_hcl1_smalltext',
		'control'       => 'editor',
		'section'       => 'onepress_hero_content_layout1',
		'label'         => esc_html__( 'Small Text', 'onepress' ),
		'description'   => esc_html__( 'You can use text rotate slider in this textarea too.', 'onepress' ),
		'mod'           => 'html',
		'default'       => wp_kses_post( 'Morbi tempus porta nunc <strong>pharetra quisque</strong> ligula imperdiet posuere<br> vitae felis proin sagittis leo ac tellus blandit sollicitudin quisque vitae placerat.' ),
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => wp_kses_post( 'Morbi tempus porta nunc <strong>pharetra quisque</strong> ligula imperdiet posuere<br> vitae felis proin sagittis leo ac tellus blandit sollicitudin quisque vitae placerat.' ),
		),
	),
	array(
		'id'          => 'onepress_hcl1_btn1_text',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Button #1 Text', 'onepress' ),
		'default'     => esc_html__( 'About Us', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'                => 'onepress_hcl1_btn1_link',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_hero_content_layout1',
		'label'             => esc_html__( 'Button #1 Link', 'onepress' ),
		'default'           => esc_url( home_url( '/' ) ) . esc_html__( '#about', 'onepress' ),
		'sanitize_callback' => 'esc_url',
	),
	array(
		'id'          => 'onepress_hcl1_btn1_style',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Button #1 style', 'onepress' ),
		'default'     => 'btn-theme-primary',
		'sanitize_callback' => 'onepress_sanitize_text',
		'choices'     => $onepress_hero_btn_choices,
	),
	array(
		'id'          => 'onepress_hcl1_btn1_target',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Open Button #1 In New Window', 'onepress' ),
		'default'     => null,
		'sanitize_callback' => 'onepress_sanitize_checkbox',
	),
	array(
		'id'          => 'onepress_hcl1_btn2_text',
		'control'     => 'wp',
		'input_type'  => 'text',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Button #2 Text', 'onepress' ),
		'default'     => esc_html__( 'Get Started', 'onepress' ),
		'sanitize_callback' => 'onepress_sanitize_text',
	),
	array(
		'id'                => 'onepress_hcl1_btn2_link',
		'control'           => 'wp',
		'input_type'        => 'text',
		'section'           => 'onepress_hero_content_layout1',
		'label'             => esc_html__( 'Button #2 Link', 'onepress' ),
		'default'           => esc_url( home_url( '/' ) ) . esc_html__( '#contact', 'onepress' ),
		'sanitize_callback' => 'esc_url',
	),
	array(
		'id'          => 'onepress_hcl1_btn2_style',
		'control'     => 'wp',
		'input_type'  => 'select',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Button #2 style', 'onepress' ),
		'default'     => 'btn-secondary-outline',
		'sanitize_callback' => 'onepress_sanitize_text',
		'choices'     => $onepress_hero_btn_choices,
	),
	array(
		'id'          => 'onepress_hcl1_btn2_target',
		'control'     => 'wp',
		'input_type'  => 'checkbox',
		'section'     => 'onepress_hero_content_layout1',
		'label'       => esc_html__( 'Open Button #2 In New Window', 'onepress' ),
		'default'     => null,
		'sanitize_callback' => 'onepress_sanitize_checkbox',
	),
	array(
		'id'            => 'onepress_hcl2_content',
		'control'       => 'editor',
		'section'       => 'onepress_hero_content_layout1',
		'label'         => esc_html__( 'Content Text', 'onepress' ),
		'description'   => '',
		'default'       => wp_kses_post( '<h1>Business Website' . "\n" . 'Made Simple.</h1>' . "\n" . 'We provide creative solutions to clients around the world,' . "\n" . 'creating things that get attention and meaningful.' . "\n\n" . '<a class="btn btn-secondary-outline btn-lg" href="#">Get Started</a>' ),
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'mod'               => 'html',
			'default'           => wp_kses_post( '<h1>Business Website' . "\n" . 'Made Simple.</h1>' . "\n" . 'We provide creative solutions to clients around the world,' . "\n" . 'creating things that get attention and meaningful.' . "\n\n" . '<a class="btn btn-secondary-outline btn-lg" href="#">Get Started</a>' ),
		),
	),
	array(
		'id'            => 'onepress_hcl2_image',
		'control'       => 'image',
		'control_class' => 'WP_Customize_Image_Control',
		'section'       => 'onepress_hero_content_layout1',
		'label'         => esc_html__( 'Image', 'onepress' ),
		'description'   => '',
		'default'       => $onepress_hero_t_uri . '/assets/images/onepress_responsive.png',
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'mod'               => 'html',
			'default'           => $onepress_hero_t_uri . '/assets/images/onepress_responsive.png',
		),
	),
);
