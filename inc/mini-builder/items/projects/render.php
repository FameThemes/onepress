<?php
/**
 * Projects front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props    = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$title    = isset( $props['title'] ) ? (string) $props['title'] : '';
$subtitle = isset( $props['subtitle'] ) ? (string) $props['subtitle'] : '';
$raw      = isset( $props['items'] ) ? (string) $props['items'] : '';
$decoded  = json_decode( $raw, true );
$items    = is_array( $decoded ) ? array_slice( $decoded, 0, 24 ) : array();

echo '<div class="opb opb-projects">';
if ( $title !== '' ) {
	printf( '<h2 class="opb-projects__title">%s</h2>', esc_html( $title ) );
}
if ( $subtitle !== '' ) {
	printf( '<p class="opb-projects__subtitle">%s</p>', esc_html( $subtitle ) );
}
if ( array() !== $items ) {
	echo '<ul class="opb-projects__list">';
	foreach ( $items as $row ) {
		if ( ! is_array( $row ) ) {
			continue;
		}
		$t = isset( $row['title'] ) ? sanitize_text_field( (string) $row['title'] ) : '';
		$e = isset( $row['excerpt'] ) ? sanitize_text_field( (string) $row['excerpt'] ) : '';
		$u = isset( $row['url'] ) ? esc_url_raw( (string) $row['url'] ) : '';
		if ( $t === '' && $e === '' ) {
			continue;
		}
		echo '<li class="opb-projects__item">';
		if ( $u !== '' ) {
			echo '<a class="opb-projects__link" href="' . esc_url( $u ) . '">';
		}
		if ( $t !== '' ) {
			printf( '<span class="opb-projects__item-title">%s</span>', esc_html( $t ) );
		}
		if ( $e !== '' ) {
			printf( '<span class="opb-projects__item-excerpt">%s</span>', esc_html( $e ) );
		}
		if ( $u !== '' ) {
			echo '</a>';
		}
		echo '</li>';
	}
	echo '</ul>';
}
echo '</div>';
