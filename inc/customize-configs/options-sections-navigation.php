<?php
/**
 * Sections navigation (dots) — section only; controls registered in customizer.php.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	array(
		'type'        => 'section',
		'id'          => 'onepress_sections_nav',
		'priority'    => null,
		'title'       => esc_html__( 'Sections Navigation', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_options',
	),
);
