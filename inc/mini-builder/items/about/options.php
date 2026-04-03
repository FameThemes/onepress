<?php
/**
 * About block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/about',
	'label'        => __( 'About', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'info',
	'defaultProps' => array(
		'title'   => '',
		'content' => '',
		'image'   => 0,
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'title',
			'label' => __( 'Title', 'onepress' ),
		),
		array(
			'type'  => 'textarea',
			'name'  => 'content',
			'label' => __( 'Content', 'onepress' ),
			'rows'  => 6,
		),
		array(
			'type'  => 'image',
			'name'  => 'image',
			'label' => __( 'Image (attachment ID)', 'onepress' ),
		),
	),
);
