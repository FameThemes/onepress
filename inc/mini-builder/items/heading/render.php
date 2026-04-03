<?php
/**
 * Heading front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$t     = isset( $props['content'] ) ? (string) $props['content'] : '';
$l     = isset( $props['level'] ) ? min( 6, max( 1, (int) $props['level'] ) ) : 2;
printf(
	'<div class="opb opb-heading"><h%d class="opb-heading__tag">%s</h%d></div>',
	(int) $l,
	esc_html( $t ),
	(int) $l
);
