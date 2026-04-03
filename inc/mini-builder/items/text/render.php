<?php
/**
 * Text block front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$t     = isset( $props['content'] ) ? (string) $props['content'] : '';
echo '<div class="opb opb-text"><p>' . esc_html( $t ) . '</p></div>';
