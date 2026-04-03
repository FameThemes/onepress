<?php
/**
 * Sample item (skipped in discovery — copy folder and rename). options.php must `return` an array only.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/example',
	'label'        => __( 'Example', 'onepress' ),
	'category'     => 'layout',
	'kind'         => 'section',
	'icon'         => 'layout',
	'defaultProps' => array(
		'title'    => '',
		'textarea' => '',
		'radio'    => 'a',
		'switch'   => false,
		'slider'   => 50,
		'color'    => '',
		'image'    => 0,
		'gallery'  => array(),
		'checkbox' => array(),
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'title',
			'label' => __( 'Title', 'onepress' ),
		),
		array(
			'type'  => 'textarea',
			'name'  => 'textarea',
			'label' => __( 'Content', 'onepress' ),
		),
		array(
			'type'    => 'radio',
			'name'    => 'radio',
			'label'   => __( 'Radio', 'onepress' ),
			'options' => array(
				array( 'label' => __( 'A', 'onepress' ), 'value' => 'a' ),
				array( 'label' => __( 'B', 'onepress' ), 'value' => 'b' ),
			),
		),
		array(
			'type'  => 'switch',
			'name'  => 'switch',
			'label' => __( 'Switch', 'onepress' ),
		),
		array(
			'type'    => 'slider',
			'name'    => 'slider',
			'label'   => __( 'Slider', 'onepress' ),
			'min'     => 0,
			'max'     => 100,
			'step'    => 1,
			'default' => 50,
		),
		array(
			'type'  => 'color',
			'name'  => 'color',
			'label' => __( 'Color', 'onepress' ),
		),
		array(
			'type'  => 'image',
			'name'  => 'image',
			'label' => __( 'Attachment ID', 'onepress' ),
		),
		array(
			'type'  => 'gallery',
			'name'  => 'gallery',
			'label' => __( 'Gallery (attachment IDs)', 'onepress' ),
		),
		array(
			'type'    => 'checkbox',
			'name'    => 'checkbox',
			'label'   => __( 'Checkboxes', 'onepress' ),
			'options' => array(
				array(
					'label' => __( 'Option 1', 'onepress' ),
					'value' => 'option1',
				),
				array(
					'label' => __( 'Option 2', 'onepress' ),
					'value' => 'option2',
				),
			),
		),
	),
);
