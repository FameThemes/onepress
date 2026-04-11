<?php
/**
 * Navigation settings.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	array(
		'type'        => 'section',
		'id'          => 'onepress_nav',
		'priority'    => null,
		'title'       => esc_html__( 'Navigation', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	),
	array(
		'id'          => 'onepress_menu_item_padding',
		'control'     => 'wp',
		'input_type'  => 'text',
		'label'       => esc_html__( 'Menu Item Padding', 'onepress' ),
		'description' => esc_html__( 'Padding left and right for Navigation items (pixels).', 'onepress' ),
		'section'     => 'onepress_nav',
		'default'     => '',
		'transport'   => 'postMessage',
	),
);
