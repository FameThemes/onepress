<?php
/**
 * Teams block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/teams',
	'label'        => __( 'Teams', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'people',
	'defaultProps' => array(
		'title'   => '',
		'members' => '[{"name":"Name","role":"Role","image":0}]',
	),
	'options'      => array(
		array(
			'type'  => 'text',
			'name'  => 'title',
			'label' => __( 'Section title', 'onepress' ),
		),
		array(
			'type'  => 'textarea',
			'name'  => 'members',
			'label' => __( 'Members (JSON)', 'onepress' ),
			'rows'  => 10,
			'help'  => __( 'Array of objects: name, role, image (attachment ID, 0 for none).', 'onepress' ),
		),
	),
);
