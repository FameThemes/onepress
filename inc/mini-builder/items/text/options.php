<?php
/**
 * Text block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/text',
	'label'        => __( 'Text', 'onepress' ),
	'category'     => 'content',
	'kind'         => 'leaf',
	'icon'         => 'paragraph',
	'defaultProps' => array( 'content' => '' ),
	'options'      => array(
		array(
			'type'  => 'editor',
			'name'  => 'content',
			'label' => __( 'Content', 'onepress' ),
			'rows'  => 4,
		),
	),
);
