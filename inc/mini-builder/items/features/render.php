<?php
/**
 * Features front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props   = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$title   = isset( $props['title'] ) ? (string) $props['title'] : '';
$raw     = isset( $props['items'] ) ? (string) $props['items'] : '';
$decoded = json_decode( $raw, true );
$items   = is_array( $decoded ) ? array_slice( $decoded, 0, 24 ) : array();

echo '<div class="opb opb-features">';
if ( $title !== '' ) {
	printf( '<h2 class="opb-features__title">%s</h2>', esc_html( $title ) );
}
if ( array() !== $items ) {
	echo '<ul class="opb-features__list">';
	foreach ( $items as $row ) {
		if ( ! is_array( $row ) ) {
			continue;
		}
		$t = isset( $row['title'] ) ? sanitize_text_field( (string) $row['title'] ) : '';
		$x = isset( $row['text'] ) ? sanitize_text_field( (string) $row['text'] ) : '';
		if ( $t === '' && $x === '' ) {
			continue;
		}
		echo '<li class="opb-features__item">';
		if ( $t !== '' ) {
			printf( '<h3 class="opb-features__item-title">%s</h3>', esc_html( $t ) );
		}
		if ( $x !== '' ) {
			printf( '<p class="opb-features__item-text">%s</p>', esc_html( $x ) );
		}
		echo '</li>';
	}
	echo '</ul>';
}
echo '</div>';
