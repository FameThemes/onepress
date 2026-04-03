<?php
/**
 * Columns front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props  = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$inner  = '';
$cols   = isset( $node['columns'] ) && is_array( $node['columns'] ) ? $node['columns'] : array();
$widths = isset( $props['columnWidths'] ) && is_array( $props['columnWidths'] ) ? $props['columnWidths'] : array();
$n      = count( $cols );
$idx    = 0;
foreach ( $cols as $col ) {
	$pct = isset( $widths[ $idx ] ) ? (int) $widths[ $idx ] : ( $n > 0 ? (int) round( 100 / $n ) : 100 );
	$pct = min( 100, max( 1, $pct ) );
	$cell = '';
	if ( ! empty( $col['children'] ) && is_array( $col['children'] ) ) {
		foreach ( $col['children'] as $ch ) {
			$cell .= onepress_render_builder_node_html( $ch );
		}
	}
	$inner .= sprintf(
		'<div class="opb-columns__cell" style="flex:0 0 %1$d%%;max-width:%1$d%%;min-width:0;box-sizing:border-box;">',
		$pct
	) . $cell . '</div>';
	++$idx;
}
echo '<div class="opb opb-columns" style="display:flex;flex-direction:row;flex-wrap:wrap;gap:1rem;align-items:flex-start;">' . $inner . '</div>';
