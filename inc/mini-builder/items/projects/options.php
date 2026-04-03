<?php
/**
 * Projects block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/projects',
	'label'        => __( 'Projects', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'grid',
	'defaultProps' => array(
		'title'    => '',
		'subtitle' => '',
		'items'    => '[{"title":"Sample project","excerpt":"Short description.","url":"#"}]',
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'title',
			'label' => __( 'Section title', 'onepress' ),
		),
		array(
			'type'  => 'text',
			'name'  => 'subtitle',
			'label' => __( 'Subtitle', 'onepress' ),
		),
		array(
			'type'  => 'textarea',
			'name'  => 'items',
			'label' => __( 'Projects (JSON)', 'onepress' ),
			'rows'  => 8,
			'help'  => __( 'Array of objects: title, excerpt, url (optional).', 'onepress' ),
		),
	),
);
