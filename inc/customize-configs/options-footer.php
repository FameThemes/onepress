<?php
/**
 * Theme Option: Footer.
 *
 * Customizer settings for Footer Social, Footer Widgets and Footer Copyright.
 *
 * @package OnePress\Customizer
 * @since Unknown
 */

// Add 'Footer Social' section.
$wp_customize->add_section(
	'onepres_footer_top',
	array(
		'title'       => esc_html__( 'Footer Socials', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Footer Social: Disable 'Footer Social' setting.
$wp_customize->add_setting(
	'onepress_social_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
		'transport'         => 'postMessage',
	)
);

// Footer Social: Disable 'Footer Social' control.
$wp_customize->add_control(
	'onepress_social_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide Footer Social?', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => esc_html__( 'Check this box to hide footer social section.', 'onepress' ),
	)
);

// Footer Social: Add explanatory text setting.
$wp_customize->add_setting(
	'onepress_social_footer_guide',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
	)
);

// Footer Social: Add explanatory text control.
$wp_customize->add_control(
	new OnePress_Misc_Control(
		$wp_customize, 'onepress_social_footer_guide',
		array(
			'section'     => 'onepres_footer_top',
			'type'        => 'custom_message',
			'description' => esc_html__( 'The social profiles specified below will be displayed in the footer of your site.', 'onepress' ),
		)
	)
);

// Footer Social: Title setting.
$wp_customize->add_setting(
	'onepress_social_footer_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Keep Updated', 'onepress' ),
		'transport'         => 'postMessage',
	)
);

// Footer Social: Title control.
$wp_customize->add_control(
	'onepress_social_footer_title',
	array(
		'label'       => esc_html__( 'Social Footer Title', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => '',
	)
);

// Footer Social: Social profiles setting.
$wp_customize->add_setting(
	'onepress_social_profiles',
	array(
		// 'default' => '',
		'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
		'transport'         => 'postMessage',
	)
);

// Footer Social: Social profiles control.
$wp_customize->add_control(
	new Onepress_Customize_Repeatable_Control(
		$wp_customize,
		'onepress_social_profiles',
		array(
			'label'         => esc_html__( 'Socials', 'onepress' ),
			'description'   => '',
			'section'       => 'onepres_footer_top',
			'live_title_id' => 'network', // apply for unput text and textarea only
			'title_format'  => esc_html__( '[live_title]', 'onepress' ),
			'max_item'      => 5, // Maximum number of addable items in free version.
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

// Footer Social: Disable newsletter setting.
$wp_customize->add_setting(
	'onepress_newsletter_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => '1',
		'transport'         => 'postMessage',
	)
);

// Footer Social: Disable newsletter control.
$wp_customize->add_control(
	'onepress_newsletter_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide Footer Newsletter?', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => esc_html__( 'Check this box to hide footer newsletter form.', 'onepress' ),
	)
);

// Footer Social: Newsletter form title setting.
$wp_customize->add_setting(
	'onepress_newsletter_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Join our Newsletter', 'onepress' ),
		'transport'         => 'postMessage',
	)
);

// Footer Social: Newsletter form title control.
$wp_customize->add_control(
	'onepress_newsletter_title',
	array(
		'label'       => esc_html__( 'Newsletter Form Title', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => '',
	)
);

// Footer Social: Mailchimp action url setting.
$wp_customize->add_setting(
	'onepress_newsletter_mailchimp',
	array(
		'sanitize_callback' => 'esc_url_raw',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

// Footer Social: Mailchimp action url control.
$wp_customize->add_control(
	'onepress_newsletter_mailchimp',
	array(
		'label'       => esc_html__( 'MailChimp Action URL', 'onepress' ),
		'section'     => 'onepres_footer_top',
		'description' => __( 'The newsletter form use MailChimp, please follow <a target="_blank" href="http://goo.gl/uRVIst">this guide</a> to know how to get MailChimp Action URL. Example <i>//famethemes.us8.list-manage.com/subscribe/post?u=521c400d049a59a4b9c0550c2&amp;id=83187e0006</i>', 'onepress' ),
	)
);

// Footer Social: Background color setting.
$wp_customize->add_setting(
	'onepress_footer_bg', array(
		'sanitize_callback'    => 'sanitize_hex_color_no_hash',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
		'transport'            => 'postMessage',
	)
);

// Footer Social: Background color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_footer_bg',
		array(
			'label'       => esc_html__( 'Background', 'onepress' ),
			'section'     => 'onepres_footer_top',
			'description' => '',
		)
	)
);

// Footer Social: Text color setting.
$wp_customize->add_setting(
	'onepress_footer_top_color', array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

// Footer Social: Text color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_footer_top_color',
		array(
			'label'       => esc_html__( 'Text Color', 'onepress' ),
			'section'     => 'onepres_footer_top',
			'description' => '',
		)
	)
);


// Add 'Footer Widgets' section.
$wp_customize->add_section(
	'onepress_footer',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Footer Widgets', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Footer Widgets: Layout (column width) setting.
$wp_customize->add_setting(
	'footer_layout',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
		'transport'         => 'postMessage',
	)
);

// Footer Widgets: Layout (column width) control.
$wp_customize->add_control(
	'footer_layout',
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
		),
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
	$wp_customize->add_setting(
		'footer_custom_' . $i . '_columns',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => $df,
			'transport'         => 'postMessage',
		)
	);
	$wp_customize->add_control(
		'footer_custom_' . $i . '_columns',
		array(
			'label'       => 1 == $i ? __( 'Custom footer 1 column width', 'onepress' ) : sprintf( __( 'Custom footer %s columns width', 'onepress' ), $i ),
			'section'     => 'onepress_footer',
			'description' => esc_html__( 'Enter int numbers and sum of them must smaller or equal 12, separated by "+"', 'onepress' ),
		)
	);
}

// Footer Widgets: Text color setting.
$wp_customize->add_setting(
	'footer_widgets_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);

// Footer Widgets: Text color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_color',
		array(
			'label'   => esc_html__( 'Text Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

// Footer Widgets: Background color setting.
$wp_customize->add_setting(
	'footer_widgets_bg_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);

// Footer Widgets: Background color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_bg_color',
		array(
			'label'   => esc_html__( 'Background Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

// Footer Widgets: Widget title color setting.
$wp_customize->add_setting(
	'footer_widgets_title_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);

// Footer Widgets: Widget title color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_title_color',
		array(
			'label'   => esc_html__( 'Widget Title Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

// Footer Widgets: Link color setting.
$wp_customize->add_setting(
	'footer_widgets_link_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);

// Footer Widgets: Link color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_link_color',
		array(
			'label'   => esc_html__( 'Link Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

// Footer Widgets: Link hover color setting.
$wp_customize->add_setting(
	'footer_widgets_link_hover_color',
	array(
		'sanitize_callback' => 'sanitize_hex_color',
		'default'           => '',
	)
);

// Footer Widgets: Link hover color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_widgets_link_hover_color',
		array(
			'label'   => esc_html__( 'Link Hover Color', 'onepress' ),
			'section' => 'onepress_footer',
		)
	)
);

// Add 'Footer Copyright' section.
$wp_customize->add_section(
	'onepress_footer_copyright',
	array(
		'priority'    => null,
		'title'       => esc_html__( 'Footer Copyright', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	)
);

// Footer Copyright: Background color setting.
$wp_customize->add_setting(
	'onepress_footer_info_bg', array(
		'sanitize_callback'    => 'sanitize_hex_color',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Footer Copyright: Background color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_footer_info_bg',
		array(
			'label'       => esc_html__( 'Background', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		)
	)
);

// Footer Copyright: Text color setting.
$wp_customize->add_setting(
	'onepress_footer_c_color', array(
		'sanitize_callback'    => 'sanitize_hex_color',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Footer Copyright: Text color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_footer_c_color',
		array(
			'label'       => esc_html__( 'Text Color', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		)
	)
);

// Footer Copyright: Link color setting.
$wp_customize->add_setting(
	'onepress_footer_c_link_color', array(
		'sanitize_callback'    => 'sanitize_hex_color',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Footer Copyright: Link color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_footer_c_link_color',
		array(
			'label'       => esc_html__( 'Link Color', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		)
	)
);

// Footer Copyright: Link hover color setting.
$wp_customize->add_setting(
	'onepress_footer_c_link_hover_color', array(
		'sanitize_callback'    => 'sanitize_hex_color',
		'sanitize_js_callback' => 'maybe_hash_hex_color',
		'default'              => '',
	)
);

// Footer Copyright: Link hover color control.
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize, 'onepress_footer_c_link_hover_color',
		array(
			'label'       => esc_html__( 'Link Hover Color', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		)
	)
);
