<?php

/**
 * Plus upsell sections (declarative list, merged in customize-option-definitions.php).
 *
 * @package onepress
 */

if (! defined('ABSPATH')) {
	exit;
}

return array(
	array(
		'type'     => 'section',
		'id'       => 'onepress_order_styling_preview',
		'title'    => esc_html__('Section Order & Styling', 'onepress'),
		'priority' => 129,
	),
	array(
		'id'            => 'onepress_order_styling_message',
		'control'       => 'misc',
		'type'          => 'custom_message',
		'section'       => 'onepress_order_styling_preview',
		'description'   => wp_kses_post(
			__('<h4 class="customizer-group-heading-message">Drag &amp; Drop Section Orders</h4><p class="customizer-group-heading-message">Check out the <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version for full control over the frontpage SECTIONS ORDER!</p><h4 class="customizer-group-heading-message">Advanced Section Styling</h4><p class="customizer-group-heading-message">Check out the <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version for full control over the section styling which includes background color, image, video, parallax effect, custom style and more ...</p>', 'onepress')
		),
		'setting'       => array(
			'sanitize_callback' => 'onepress_sanitize_text',
		),
	),
	array(
		'type'          => 'custom_section',
		'section_class' => 'OnePress_Section_Plus',
		'id'            => 'onepress-plus',
		'priority'      => 1,
		'plus_text'     => esc_html__('OnePress Plus Available! Take a look', 'onepress'),
		'plus_url'      => 'https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started',
	),
);
