<?php
/* Footer top Social Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepres_footer_top',
	array(
		'title'       => esc_html__( 'Footer Socials', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Disable Social
$wp_customize->add_setting( 'onepress_social_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_social_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide Footer Social?', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => esc_html__( 'Check this box to hide footer social section.', 'onepress' )
	)
);

$wp_customize->add_setting( 'onepress_social_footer_guide',
	array(
		'sanitize_callback' => 'onepress_sanitize_text'
	)
);
$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_social_footer_guide',
	array(
		'section'     => 'onepres_footer_top',
		'type'        => 'custom_message',
		'description' => esc_html__( 'The social profiles specified below will be displayed in the footer of your site.', 'onepress' )
	)
) );

// Footer Social Title
$wp_customize->add_setting( 'onepress_social_footer_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Keep Updated', 'onepress' ),
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_social_footer_title',
	array(
		'label'       => esc_html__( 'Social Footer Title', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => ''
	)
);

// Socials
$wp_customize->add_setting(
	'onepress_social_profiles',
	array(
		//'default' => '',
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'postMessage', // refresh or postMessage
	) );

$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_social_profiles',
		array(
			'label'         => esc_html__( 'Socials', 'onepress' ),
			'description'   => '',
			'section'       => 'onepres_footer_top',
			'live_title_id' => 'network', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ), // [live_title]
			'max_item'      => 5, // Maximum item can add
			'limited_msg'   => wp_kses_post( __( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ) ),
			'fields'        => array(
				'network' => array(
					'title' => esc_html__( 'Social network', 'onepress' ),
					'type'  => 'text',
				),
				'icon'    => array(
					'title' => esc_html__( 'Icon', 'onepress' ),
					'type'  => 'icon',
				),
				'link'    => array(
					'title' => esc_html__( 'URL', 'onepress' ),
					'type'  => 'text',
				),
			),

		)
	)
);


/* Newsletter Settings
----------------------------------------------------------------------*/

// Disable Newsletter
$wp_customize->add_setting( 'onepress_newsletter_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
		'transport'         => 'postMessage',
	)
);
$wp_customize->add_control( 'onepress_newsletter_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide Footer Newsletter?', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => esc_html__( 'Check this box to hide footer newsletter form.', 'onepress' )
	)
);

// Mailchimp Form Title
$wp_customize->add_setting( 'onepress_newsletter_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Join our Newsletter', 'onepress' ),
		'transport'         => 'postMessage', // refresh or postMessage
	)
);
$wp_customize->add_control( 'onepress_newsletter_title',
	array(
		'label'       => esc_html__( 'Newsletter Form Title', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => ''
	)
);

// Mailchimp action url
$wp_customize->add_setting( 'onepress_newsletter_mailchimp',
	array(
		'sanitize_callback' => 'esc_url',
		'default'           => '',
		'transport'         => 'postMessage', // refresh or postMessage
	)
);
$wp_customize->add_control( 'onepress_newsletter_mailchimp',
	array(
		'label'       => esc_html__( 'MailChimp Action URL', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => __( 'The newsletter form use MailChimp, please follow <a target="_blank" href="http://goo.gl/uRVIst">this guide</a> to know how to get MailChimp Action URL. Example <i>//famethemes.us8.list-manage.com/subscribe/post?u=521c400d049a59a4b9c0550c2&amp;id=83187e0006</i>', 'onepress' )
	)
);

// Footer BG Color
$wp_customize->add_setting( 'onepress_footer_bg', array(
	'sanitize_callback'    => 'sanitize_hex_color_no_hash',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
	'transport'            => 'postMessage'
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_bg',
	array(
		'label'       => esc_html__( 'Background', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => '',
	)
) );


$wp_customize->add_setting( 'onepress_footer_top_color', array(
	'sanitize_callback' => 'sanitize_hex_color',
	'default'           => '',
	'transport'         => 'postMessage'
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_top_color',
	array(
		'label'       => esc_html__( 'Text Color', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => '',
	)
) );


/* Footer Widgets Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_footer',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Footer Widgets', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

$wp_customize->add_setting( 'footer_layout',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control( 'footer_layout',
	array(
		'type'        => 'select',
		'label'       => esc_html__( 'Layout', 'onepress' ),
		'section'     => 'onepress_footer',
		'default'     => '0',
		'description' => esc_html__( 'Number footer columns to display.', 'onepress' ),
		'choices'     => array(
			'4' => 4,
			'3' => 3,
			'2' => 2,
			'1' => 1,
			'0' => esc_html__( 'Disable footer widgets', 'onepress' ),
		)
	)
);

for ( $i = 1; $i <= 4; $i ++ ) {
	$df = 12;
	if ( $i > 1 ) {
		$_n = 12 / $i;
		$df = array();
		for ( $j = 0; $j < $i; $j ++ ) {
			$df[ $j ] = $_n;
		}
		$df = join( '+', $df );
	}
	$wp_customize->add_setting( 'footer_custom_' . $i . '_columns',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => $df,
			'transport'         => 'postMessage',
		)
	);
	$wp_customize->add_control( 'footer_custom_' . $i . '_columns',
		array(
			'label'       => $i == 1 ? __( 'Custom footer 1 column width', 'onepress' ) : sprintf( __( 'Custom footer %s columns width', 'onepress' ), $i ),
			'section'     => 'onepress_footer',
			'description' => esc_html__( 'Enter int numbers and sum of them must smaller or equal 12, separated by "+"', 'onepress' ),
		)
	);
}

// onepress_sanitize_color_alpha
$wp_customize->add_setting( 'footer_widgets_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_color',
		array(
			'label'   => esc_html__( 'Text Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

$wp_customize->add_setting( 'footer_widgets_bg_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_bg_color',
		array(
			'label'   => esc_html__( 'Background Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

// Footer Heading color
$wp_customize->add_setting( 'footer_widgets_title_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_title_color',
		array(
			'label'   => esc_html__( 'Widget Title Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);


$wp_customize->add_setting( 'footer_widgets_link_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_link_color',
		array(
			'label'   => esc_html__( 'Link Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

$wp_customize->add_setting( 'footer_widgets_link_hover_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);
$wp_customize->add_control( new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_link_hover_color',
		array(
			'label'   => esc_html__( 'Link Hover Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);


/* Footer Copyright Settings
----------------------------------------------------------------------*/
$wp_customize->add_section( 'onepress_footer_copyright',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Footer Copyright', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Footer Widgets Color
$wp_customize->add_setting( 'onepress_footer_info_bg', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_info_bg',
	array(
		'label'       => esc_html__( 'Background', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );

// Footer Widgets Color
$wp_customize->add_setting( 'onepress_footer_c_color', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_c_color',
	array(
		'label'       => esc_html__( 'Text Color', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );

$wp_customize->add_setting( 'onepress_footer_c_link_color', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_c_link_color',
	array(
		'label'       => esc_html__( 'Link Color', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );

$wp_customize->add_setting( 'onepress_footer_c_link_hover_color', array(
	'sanitize_callback'    => 'sanitize_hex_color',
	'sanitize_js_callback' => 'maybe_hash_hex_color',
	'default'              => '',
) );
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_c_link_hover_color',
	array(
		'label'       => esc_html__( 'Link Hover Color', 'onepress' ),
		'section'     => 'onepress_footer_copyright',
		'description' => '',
	)
) );