<?php
/**
 * Gallery block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/gallery',
	'label'        => __( 'Gallery', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'gallery',
	'defaultProps' => array(
		'title'   => '',
		'images'  => array(),
		'columns' => 3,
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'title',
			'label' => __( 'Title', 'onepress' ),
		),
		array(
			'type'  => 'gallery',
			'name'  => 'images',
			'label' => __( 'Images (attachment IDs)', 'onepress' ),
			'help'  => __( 'Paste a JSON array of media attachment IDs, e.g. [12,34,56].', 'onepress' ),
		),
		array(
			'type'       => 'select',
			'name'       => 'columns',
			'label'      => __( 'Columns', 'onepress' ),
			'valueType'  => 'number',
			'default'    => '3',
			'min'        => 2,
			'max'        => 4,
			'options'    => array(
				array( 'label' => '2', 'value' => '2' ),
				array( 'label' => '3', 'value' => '3' ),
				array( 'label' => '4', 'value' => '4' ),
			),
		),
	),
);
