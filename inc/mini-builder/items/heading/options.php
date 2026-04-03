<?php
/**
 * Heading block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/heading',
	'label'        => __( 'Heading', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'heading',
	'defaultProps' => array(
		'content' => '',
		'level'   => 2,
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'content',
			'label' => __( 'Text', 'onepress' ),
		),
		array(
			'type'       => 'select',
			'name'       => 'level',
			'label'      => __( 'Level', 'onepress' ),
			'valueType'  => 'number',
			'default'    => '2',
			'min'        => 1,
			'max'        => 6,
			'options'    => array(
				array( 'label' => 'H1', 'value' => '1' ),
				array( 'label' => 'H2', 'value' => '2' ),
				array( 'label' => 'H3', 'value' => '3' ),
				array( 'label' => 'H4', 'value' => '4' ),
				array( 'label' => 'H5', 'value' => '5' ),
				array( 'label' => 'H6', 'value' => '6' ),
			),
		),
	),
);
