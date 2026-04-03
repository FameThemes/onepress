<?php
/**
 * Section front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$inner = '';
if ( ! empty( $node['children'] ) && is_array( $node['children'] ) ) {
	foreach ( $node['children'] as $child ) {
		$inner .= onepress_render_builder_node_html( $child );
	}
}
echo '<section class="opb opb-section">' . $inner . '</section>';
