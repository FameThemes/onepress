<?php
/**
 * Features block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/features',
	'label'        => __( 'Features', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'starFilled',
	'defaultProps' => array(
		'title' => '',
		'items' => '[{"title":"Feature title","text":"Short description of the feature."}]',
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'title',
			'label' => __( 'Section title', 'onepress' ),
		),
		array(
			'type'  => 'textarea',
			'name'  => 'items',
			'label' => __( 'Features (JSON)', 'onepress' ),
			'rows'  => 10,
			'help'  => __( 'Array of objects: title, text.', 'onepress' ),
		),
	),
);
