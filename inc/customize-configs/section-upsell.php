<?php
/**
 * Section: Order & Styling - PLUS VERSION
 */


// Register custom section types.
$wp_customize->register_section_type( 'OnePress_Section_Plus' );
// Register sections.
$wp_customize->add_section(
	'onepress_order_styling_preview',
	array(
		'title'           => esc_html__( 'Section Order & Styling', 'onepress' ),
		'priority'        => 129,
	)
);

// Plus message
$wp_customize->add_setting( 'onepress_order_styling_message',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
	)
);
$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_order_styling_message',
	array(
		'type'        => 'custom_message',
		'section'     => 'onepress_order_styling_preview',
		'description' => __('<h4 class="customizer-group-heading-message">Drag &amp; Drop Section Orders</h4><p class="customizer-group-heading-message">Check out the <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version for full control over the frontpage SECTIONS ORDER!</p><h4 class="customizer-group-heading-message">Advanced Section Styling</h4><p class="customizer-group-heading-message">Check out the <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version for full control over the section styling which includes background color, image, video, parallax effect, custom style and more ...</p>', 'onepress' )
	)
));

$wp_customize->add_section(
	new OnePress_Section_Plus(
		$wp_customize,
		'onepress-plus',
		array(
			'priority'  => 1,
			'plus_text' => __( 'OnePress Plus Available! Take a look', 'onepress' ),
			'plus_url'  => 'https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started'
		)
	)
);