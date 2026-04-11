<?php
/**
 * Footer options (declarative list).
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$footer_column_defaults = array();
for ( $i = 1; $i <= 4; $i++ ) {
	$df = '12';
	if ( $i > 1 ) {
		$n    = 12 / $i;
		$df   = implode( '+', array_fill( 0, $i, (string) $n ) );
	}
	$footer_column_defaults[ $i ] = $df;
}

$footer_column_entries = array();
for ( $i = 1; $i <= 4; $i++ ) {
	$footer_column_entries[] = array(
		'id'          => 'footer_custom_' . $i . '_columns',
		'control'     => 'wp',
		'input_type'  => 'text',
		'label'       => 1 === $i
			? esc_html__( 'Custom footer 1 column width', 'onepress' )
			: sprintf(
				/* translators: %s: number of footer columns. */
				esc_html__( 'Custom footer %s columns width', 'onepress' ),
				(string) $i
			),
		'description' => esc_html__( 'Enter int numbers and sum of them must smaller or equal 12, separated by "+"', 'onepress' ),
		'section'     => 'onepress_footer',
		'default'     => $footer_column_defaults[ $i ],
		'transport'   => 'postMessage',
	);
}

return array_merge(
	array(
		array(
			'type'        => 'section',
			'id'          => 'onepres_footer_top',
			'title'       => esc_html__( 'Footer Socials', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_options',
		),
		array(
			'id'          => 'onepress_social_disable',
			'control'     => 'wp',
			'input_type'  => 'checkbox',
			'label'       => esc_html__( 'Hide Footer Social?', 'onepress' ),
			'description' => esc_html__( 'Check this box to hide footer social section.', 'onepress' ),
			'section'     => 'onepres_footer_top',
			'default'     => '1',
			'transport'   => 'postMessage',
		),
		array(
			'id'            => 'onepress_social_footer_guide',
			'control'       => 'misc',
			'type'          => 'custom_message',
			'section'       => 'onepres_footer_top',
			'description'   => esc_html__( 'The social profiles specified below will be displayed in the footer of your site.', 'onepress' ),
			'setting'       => array(
				'sanitize_callback' => 'onepress_sanitize_text',
			),
		),
		array(
			'id'          => 'onepress_social_footer_title',
			'control'     => 'wp',
			'input_type'  => 'text',
			'label'       => esc_html__( 'Social Footer Title', 'onepress' ),
			'section'     => 'onepres_footer_top',
			'description' => '',
			'default'     => 'Keep Updated',
			'transport'   => 'postMessage',
		),
		array(
			'id'          => 'onepress_social_profiles',
			'control'     => 'repeatable',
			'label'       => esc_html__( 'Socials', 'onepress' ),
			'description' => '',
			'section'     => 'onepres_footer_top',
			'live_title_id' => 'network',
			'title_format'  => '[live_title]',
			'max_item'      => 5,
			'limited_msg'   => wp_kses_post(
				__( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' )
			),
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
		),
		array(
			'id'          => 'onepress_newsletter_disable',
			'control'     => 'wp',
			'input_type'  => 'checkbox',
			'label'       => esc_html__( 'Hide Footer Newsletter?', 'onepress' ),
			'description' => esc_html__( 'Check this box to hide footer newsletter form.', 'onepress' ),
			'section'     => 'onepres_footer_top',
			'default'     => '1',
			'transport'   => 'postMessage',
		),
		array(
			'id'          => 'onepress_newsletter_title',
			'control'     => 'wp',
			'input_type'  => 'text',
			'label'       => esc_html__( 'Newsletter Form Title', 'onepress' ),
			'section'     => 'onepres_footer_top',
			'description' => '',
			'default'     => 'Join our Newsletter',
			'transport'   => 'postMessage',
		),
		array(
			'id'               => 'onepress_newsletter_mailchimp',
			'control'          => 'wp',
			'input_type'       => 'text',
			'label'            => esc_html__( 'MailChimp Action URL', 'onepress' ),
			'description_html' => wp_kses_post(
				__( 'The newsletter form use MailChimp, please follow <a target="_blank" href="https://mailchimp.com/help/host-your-own-signup-forms/">this guide</a> to know how to get MailChimp Action URL. Example <i>//famethemes.us8.list-manage.com/subscribe/post?u=521c400d049a59a4b9c0550c2&amp;id=83187e0006</i>', 'onepress' )
			),
			'default'          => '',
			'transport'        => 'postMessage',
			'setting'          => array(
				'sanitize_callback' => 'esc_url',
			),
		),
		array(
			'id'      => 'onepress_footer_bg',
			'control' => 'color',
			'default' => '',
			'setting' => array(
				'sanitize_js_callback' => 'maybe_hash_hex_color',
			),
			'label'       => esc_html__( 'Background', 'onepress' ),
			'section'     => 'onepres_footer_top',
			'description' => '',
			'transport'   => 'postMessage',
		),
		array(
			'id'        => 'onepress_footer_top_color',
			'control'   => 'color',
			'default'   => '',
			'label'     => esc_html__( 'Text Color', 'onepress' ),
			'section'   => 'onepres_footer_top',
			'transport' => 'postMessage',
		),
		array(
			'type'        => 'section',
			'id'          => 'onepress_footer',
			'priority'    => null,
			'title'       => esc_html__( 'Footer Widgets', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_options',
		),
		array(
			'id'          => 'footer_layout',
			'control'     => 'wp',
			'input_type'  => 'select',
			'label'       => esc_html__( 'Layout', 'onepress' ),
			'description' => esc_html__( 'Number footer columns to display.', 'onepress' ),
			'section'     => 'onepress_footer',
			'default'     => '',
			'transport'   => 'postMessage',
			'choices'     => array(
				'4' => '4',
				'3' => '3',
				'2' => '2',
				'1' => '1',
				'0' => esc_html__( 'Disable footer widgets', 'onepress' ),
			),
		),
	),
	$footer_column_entries,
	array(
		array(
			'id'      => 'footer_widgets_color',
			'control' => 'color',
			'default' => '',
			'label'   => esc_html__( 'Text Color', 'onepress' ),
			'section' => 'onepress_footer',
		),
		array(
			'id'      => 'footer_widgets_bg_color',
			'control' => 'color',
			'default' => '',
			'label'   => esc_html__( 'Background Color', 'onepress' ),
			'section' => 'onepress_footer',
		),
		array(
			'id'      => 'footer_widgets_title_color',
			'control' => 'color',
			'default' => '',
			'label'   => esc_html__( 'Widget Title Color', 'onepress' ),
			'section' => 'onepress_footer',
		),
		array(
			'id'      => 'footer_widgets_link_color',
			'control' => 'color',
			'default' => '',
			'label'   => esc_html__( 'Link Color', 'onepress' ),
			'section' => 'onepress_footer',
		),
		array(
			'id'      => 'footer_widgets_link_hover_color',
			'control' => 'color',
			'default' => '',
			'label'   => esc_html__( 'Link Hover Color', 'onepress' ),
			'section' => 'onepress_footer',
		),
		array(
			'type'        => 'section',
			'id'          => 'onepress_footer_copyright',
			'priority'    => null,
			'title'       => esc_html__( 'Footer Copyright', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_options',
		),
		array(
			'id'      => 'onepress_footer_info_bg',
			'control' => 'color',
			'default' => '',
			'setting' => array(
				'sanitize_js_callback' => 'maybe_hash_hex_color',
			),
			'label'       => esc_html__( 'Background', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		),
		array(
			'id'      => 'onepress_footer_c_color',
			'control' => 'color',
			'default' => '',
			'setting' => array(
				'sanitize_js_callback' => 'maybe_hash_hex_color',
			),
			'label'       => esc_html__( 'Text Color', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		),
		array(
			'id'      => 'onepress_footer_c_link_color',
			'control' => 'color',
			'default' => '',
			'setting' => array(
				'sanitize_js_callback' => 'maybe_hash_hex_color',
			),
			'label'       => esc_html__( 'Link Color', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		),
		array(
			'id'      => 'onepress_footer_c_link_hover_color',
			'control' => 'color',
			'default' => '',
			'setting' => array(
				'sanitize_js_callback' => 'maybe_hash_hex_color',
			),
			'label'       => esc_html__( 'Link Hover Color', 'onepress' ),
			'section'     => 'onepress_footer_copyright',
			'description' => '',
		),
	)
);
