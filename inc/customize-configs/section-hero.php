<?php
/*------------------------------------------------------------------------*/
/*  Section: Hero
/*------------------------------------------------------------------------*/

$wp_customize->add_panel( 'onepress_hero_panel' ,
	array(
		'priority'        => 130,
		'title'           => esc_html__( 'Section: Hero', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage'
	)
);

// Hero settings
$wp_customize->add_section( 'onepress_hero_settings' ,
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Hero Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_hero_panel',
	)
);

// Show section
$wp_customize->add_setting( 'onepress_hero_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_hero_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Hide this section?', 'onepress'),
		'section'     => 'onepress_hero_settings',
		'description' => esc_html__('Check this box to hide this section.', 'onepress'),
	)
);
// Section ID
$wp_customize->add_setting( 'onepress_hero_id',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('hero', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_hero_id',
	array(
		'label' 		=> esc_html__('Section ID:', 'onepress'),
		'section' 		=> 'onepress_hero_settings',
		'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
	)
);

// Show hero full screen
$wp_customize->add_setting( 'onepress_hero_fullscreen',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_hero_fullscreen',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Make hero section full screen', 'onepress'),
		'section'     => 'onepress_hero_settings',
		'description' => esc_html__('Check this box to make hero section full screen.', 'onepress'),
	)
);

// Show hero full screen
$wp_customize->add_setting( 'onepress_hero_disable_preload',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '',
	)
);
$wp_customize->add_control( 'onepress_hero_disable_preload',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__('Disable Preload Icon', 'onepress'),
		'section'     => 'onepress_hero_settings',
	)
);

// Hero content padding top
$wp_customize->add_setting( 'onepress_hero_pdtop',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('10', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_hero_pdtop',
	array(
		'label'           => esc_html__('Padding Top:', 'onepress'),
		'section'         => 'onepress_hero_settings',
		'description'     => esc_html__( 'The hero content padding top in percent (%).', 'onepress' ),
		'active_callback' => 'onepress_hero_fullscreen_callback'
	)
);

// Hero content padding bottom
$wp_customize->add_setting( 'onepress_hero_pdbotom',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('10', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_hero_pdbotom',
	array(
		'label'           => esc_html__('Padding Bottom:', 'onepress'),
		'section'         => 'onepress_hero_settings',
		'description'     => esc_html__( 'The hero content padding bottom in percent (%).', 'onepress' ),
		'active_callback' => 'onepress_hero_fullscreen_callback'
	)
);


/* Hero options
----------------------------------------------------------------------*/

$wp_customize->add_setting(
	'onepress_hero_option_animation',
	array(
		'default'              => 'flipInX',
		'sanitize_callback'    => 'sanitize_text_field',
	)
);

/**
 * @see https://github.com/daneden/animate.css
 */

$animations_css = 'bounce flash pulse rubberBand shake headShake swing tada wobble jello bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flipInX flipInY flipOutX flipOutY lightSpeedIn lightSpeedOut rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight hinge rollIn rollOut zoomIn zoomInDown zoomInLeft zoomInRight zoomInUp zoomOut zoomOutDown zoomOutLeft zoomOutRight zoomOutUp slideInDown slideInLeft slideInRight slideInUp slideOutDown slideOutLeft slideOutRight slideOutUp';

$animations_css = explode( ' ', $animations_css );
$animations = array();
foreach ( $animations_css as $v ) {
	$v =  trim( $v );
	if ( $v ){
		$animations[ $v ]= $v;
	}
}

$wp_customize->add_control(
	'onepress_hero_option_animation',
	array(
		'label'    => __( 'Text animation', 'onepress' ),
		'section'  => 'onepress_hero_settings',
		'type'     => 'select',
		'choices' => $animations,
	)
);


$wp_customize->add_setting(
	'onepress_hero_option_speed',
	array(
		'default'              => '5000',
		'sanitize_callback'    => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'onepress_hero_option_speed',
	array(
		'label'    => __( 'Text animation speed', 'onepress' ),
		'description' => esc_html__( 'The delay between the changing of each phrase in milliseconds.', 'onepress' ),
		'section'  => 'onepress_hero_settings',
	)
);


$wp_customize->add_setting(
	'onepress_hero_slider_fade',
	array(
		'default'              => '750',
		'sanitize_callback'    => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'onepress_hero_slider_fade',
	array(
		'label'    => __( 'Slider animation speed', 'onepress' ),
		'description' => esc_html__( 'This is the speed at which the image will fade in. Integers in milliseconds are accepted.', 'onepress' ),
		'section'  => 'onepress_hero_settings',
	)
);

$wp_customize->add_setting(
	'onepress_hero_slider_duration',
	array(
		'default'              => '5000',
		'sanitize_callback'    => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'onepress_hero_slider_duration',
	array(
		'label'    => __( 'Slider duration speed', 'onepress' ),
		'description' => esc_html__( 'The amount of time in between slides, expressed as the number of milliseconds.', 'onepress' ),
		'section'  => 'onepress_hero_settings',
	)
);



$wp_customize->add_section( 'onepress_hero_images' ,
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Hero Background Media', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_hero_panel',
	)
);

$wp_customize->add_setting(
	'onepress_hero_images',
	array(
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport' => 'refresh', // refresh or postMessage
		'default' => json_encode( array(
			array(
				'image'=> array(
					'url' => get_template_directory_uri().'/assets/images/hero5.jpg',
					'id' => ''
				)
			)
		) )
	) );

$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_hero_images',
		array(
			'label'     => esc_html__('Background Images', 'onepress'),
			'description'   => '',
			'priority'     => 40,
			'section'       => 'onepress_hero_images',
			'title_format'  => esc_html__( 'Background', 'onepress'), // [live_title]
			'max_item'      => 2, // Maximum item can add

			'fields'    => array(
				'image' => array(
					'title' => esc_html__('Background Image', 'onepress'),
					'type'  =>'media',
					'default' => array(
						'url' => get_template_directory_uri().'/assets/images/hero5.jpg',
						'id' => ''
					)
				),

			),

		)
	)
);

// Overlay color
$wp_customize->add_setting( 'onepress_hero_overlay_color',
	array(
		'sanitize_callback' => 'onepress_sanitize_color_alpha',
		'default'           => 'rgba(0,0,0,.3)',
		//'transport' => 'refresh', // refresh or postMessage
	)
);
$wp_customize->add_control( new OnePress_Alpha_Color_Control(
		$wp_customize,
		'onepress_hero_overlay_color',
		array(
			'label' 		=> esc_html__('Background Overlay Color', 'onepress'),
			'section' 		=> 'onepress_hero_images',
			'priority'      => 130,
		)
	)
);


// Parallax
$wp_customize->add_setting( 'onepress_hero_parallax',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 0,
		'transport' => 'refresh', // refresh or postMessage
	)
);
$wp_customize->add_control(
	'onepress_hero_parallax',
	array(
		'label' 		=> esc_html__('Enable parallax effect (apply for first BG image only)', 'onepress'),
		'section' 		=> 'onepress_hero_images',
		'type' 		   => 'checkbox',
		'priority'      => 50,
		'description' => '',
	)
);

// Background Video
$wp_customize->add_setting( 'onepress_hero_videobackground_upsell',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
	)
);
$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_hero_videobackground_upsell',
	array(
		'section'     => 'onepress_hero_images',
		'type'        => 'custom_message',
		'description' => wp_kses_post( __( 'Want to add <strong>background video</strong> for hero section? Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version.', 'onepress' ) ),
		'priority'    => 131,
	)
));



$wp_customize->add_section( 'onepress_hero_content_layout1' ,
	array(
		'priority'    => 9,
		'title'       => esc_html__( 'Hero Content Layout', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_hero_panel',

	)
);

// Hero Layout
$wp_customize->add_setting( 'onepress_hero_layout',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '1',
	)
);
$wp_customize->add_control( 'onepress_hero_layout',
	array(
		'label' 		=> esc_html__('Display Layout', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'description'   => '',
		'type'          => 'select',
		'choices'       => array(
			'1' => esc_html__('Layout 1', 'onepress' ),
			'2' => esc_html__('Layout 2', 'onepress' ),
		),
	)
);
// For Hero layout ------------------------

// Large Text
$wp_customize->add_setting( 'onepress_hcl1_largetext',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'mod' 				=> 'html',
		'default'           => wp_kses_post( __( 'We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress') ),
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_hcl1_largetext',
	array(
		'label' 		=> esc_html__('Large Text', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'description'   => esc_html__('Text Rotating Guide: Put your rotate texts separate by "|" into <span class="js-rotating">...</span>, go to Customizer -> Theme Options -> Section: Hero -> Hero Settings to control rotate animation.', 'onepress'),
	)
));


$wp_customize->add_setting( 'onepress_hcl1_r_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => null,
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_hcl1_r_color',
		array(
			'label' 		=> esc_html__('Rotating Text Color', 'onepress'),
			'section' 		=> 'onepress_hero_content_layout1'
		)
	)
);
$wp_customize->add_setting( 'onepress_hcl1_r_bg_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => null,
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'onepress_hcl1_r_bg_color',
		array(
			'label' 		=> esc_html__('Rotating Text Background', 'onepress'),
			'section' 		=> 'onepress_hero_content_layout1'
		)
	)
);

// Small Text
$wp_customize->add_setting( 'onepress_hcl1_smalltext',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'			=> wp_kses_post('Morbi tempus porta nunc <strong>pharetra quisque</strong> ligula imperdiet posuere<br> vitae felis proin sagittis leo ac tellus blandit sollicitudin quisque vitae placerat.', 'onepress'),
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_hcl1_smalltext',
	array(
		'label' 		=> esc_html__('Small Text', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'mod' 				=> 'html',
		'description'   => esc_html__('You can use text rotate slider in this textarea too.', 'onepress'),
	)
));

// Button #1 Text
$wp_customize->add_setting( 'onepress_hcl1_btn1_text',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('About Us', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn1_text',
	array(
		'label' 		=> esc_html__('Button #1 Text', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1'
	)
);

// Button #1 Link
$wp_customize->add_setting( 'onepress_hcl1_btn1_link',
	array(
		'sanitize_callback' => 'esc_url',
		'default'           => esc_url( home_url( '/' )).esc_html__('#about', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn1_link',
	array(
		'label' 		=> esc_html__('Button #1 Link', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1'
	)
);
// Button #1 Style
$wp_customize->add_setting( 'onepress_hcl1_btn1_style',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => 'btn-theme-primary',
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn1_style',
	array(
		'label' 		=> esc_html__('Button #1 style', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'type'          => 'select',
		'choices' => array(
			'btn-theme-primary' => esc_html__('Button Primary', 'onepress'),
			'btn-secondary-outline' => esc_html__('Button Secondary', 'onepress'),
			'btn-default' => esc_html__('Button', 'onepress'),
			'btn-primary' => esc_html__('Primary', 'onepress'),
			'btn-success' => esc_html__('Success', 'onepress'),
			'btn-info' => esc_html__('Info', 'onepress'),
			'btn-warning' => esc_html__('Warning', 'onepress'),
			'btn-danger' => esc_html__('Danger', 'onepress'),
		)
	)
);
$wp_customize->add_setting( 'onepress_hcl1_btn1_target',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => null,
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn1_target',
	array(
		'label' 		=> __('Open Button #1 In New Window', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'type'          => 'checkbox',
	)
);

// Button #2 Text
$wp_customize->add_setting( 'onepress_hcl1_btn2_text',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => esc_html__('Get Started', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn2_text',
	array(
		'label' 		=> esc_html__('Button #2 Text', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1'
	)
);

// Button #2 Link
$wp_customize->add_setting( 'onepress_hcl1_btn2_link',
	array(
		'sanitize_callback' => 'esc_url',
		'default'           => esc_url( home_url( '/' )).esc_html__('#contact', 'onepress'),
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn2_link',
	array(
		'label' 		=> esc_html__('Button #2 Link', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1'
	)
);

// Button #2 Style
$wp_customize->add_setting( 'onepress_hcl1_btn2_style',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => 'btn-secondary-outline',
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn2_style',
	array(
		'label' 		=> esc_html__('Button #2 style', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'type'          => 'select',
		'choices' => array(
			'btn-theme-primary' => esc_html__('Button Primary', 'onepress'),
			'btn-secondary-outline' => esc_html__('Button Secondary', 'onepress'),
			'btn-default' => esc_html__('Button', 'onepress'),
			'btn-primary' => esc_html__('Primary', 'onepress'),
			'btn-success' => esc_html__('Success', 'onepress'),
			'btn-info' => esc_html__('Info', 'onepress'),
			'btn-warning' => esc_html__('Warning', 'onepress'),
			'btn-danger' => esc_html__('Danger', 'onepress'),
		)
	)
);
$wp_customize->add_setting( 'onepress_hcl1_btn2_target',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => null,
	)
);
$wp_customize->add_control( 'onepress_hcl1_btn2_target',
	array(
		'label' 		=> __('Open Button #2 In New Window', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'type'          => 'checkbox',
	)
);


/* Layout 2 ---- */

// Layout 22 content text
$wp_customize->add_setting( 'onepress_hcl2_content',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'mod' 				=> 'html',
		'default'           =>  wp_kses_post( '<h1>Business Website'."\n".'Made Simple.</h1>'."\n".'We provide creative solutions to clients around the world,'."\n".'creating things that get attention and meaningful.'."\n\n".'<a class="btn btn-secondary-outline btn-lg" href="#">Get Started</a>' ),
	)
);
$wp_customize->add_control( new OnePress_Editor_Custom_Control(
	$wp_customize,
	'onepress_hcl2_content',
	array(
		'label' 		=> esc_html__('Content Text', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'description'   => '',
	)
));

// Layout 2 image
$wp_customize->add_setting( 'onepress_hcl2_image',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'mod' 				=> 'html',
		'default'           =>  get_template_directory_uri().'/assets/images/onepress_responsive.png',
	)
);
$wp_customize->add_control( new WP_Customize_Image_Control(
	$wp_customize,
	'onepress_hcl2_image',
	array(
		'label' 		=> esc_html__('Image', 'onepress'),
		'section' 		=> 'onepress_hero_content_layout1',
		'description'   => '',
	)
));


// END For Hero layout ------------------------