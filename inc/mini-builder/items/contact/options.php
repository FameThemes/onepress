<?php
/**
 * Contact block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/contact',
	'label'        => __( 'Contact', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'atSymbol',
	'defaultProps' => array(
		'title'   => '',
		'intro'   => '',
		'email'   => '',
		'phone'   => '',
		'address' => '',
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'title',
			'label' => __( 'Title', 'onepress' ),
		),
		array(
			'type'  => 'textarea',
			'name'  => 'intro',
			'label' => __( 'Intro', 'onepress' ),
			'rows'  => 3,
		),
		array(
			'type'  => 'text',
			'name'  => 'email',
			'label' => __( 'Email', 'onepress' ),
		),
		array(
			'type'  => 'text',
			'name'  => 'phone',
			'label' => __( 'Phone', 'onepress' ),
		),
		array(
			'type'  => 'textarea',
			'name'  => 'address',
			'label' => __( 'Address', 'onepress' ),
			'rows'  => 3,
		),
	),
);
