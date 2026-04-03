<?php
/**
 * Sample render template: $node is sanitized; use $node['props'].
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$title = isset( $props['title'] ) ? (string) $props['title'] : '';
$body  = isset( $props['textarea'] ) ? (string) $props['textarea'] : '';
echo '<div class="opb opb-example"><h2>' . esc_html( $title ) . '</h2><p>' . esc_html( $body ) . '</p></div>';
