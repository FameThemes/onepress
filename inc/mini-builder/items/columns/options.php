<?php
/**
 * Columns block config.
 *
 * @package OnePress
 */

defined( 'ABSPATH' ) || exit;

return array(
	'type'         => 'onepress/columns',
	'label'        => __( 'Columns', 'onepress' ),
	'category'     => 'layout',
	'kind'         => 'columns',
	'icon'         => 'columns',
	'defaultProps' => array( 'columnCount' => 2 ),
	'options'      => array(
		array(
			'type' => 'onepress_columns',
		),
	),
);
