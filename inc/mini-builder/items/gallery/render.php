<?php
/**
 * Gallery front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props   = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$title   = isset( $props['title'] ) ? (string) $props['title'] : '';
$ids     = isset( $props['images'] ) && is_array( $props['images'] ) ? $props['images'] : array();
$columns = isset( $props['columns'] ) ? min( 4, max( 2, (int) $props['columns'] ) ) : 3;

echo '<div class="opb opb-gallery">';
if ( $title !== '' ) {
	printf( '<h2 class="opb-gallery__title">%s</h2>', esc_html( $title ) );
}
if ( array() !== $ids ) {
	printf(
		'<div class="opb-gallery__grid opb-gallery__grid--cols-%d">',
		(int) $columns
	);
	foreach ( $ids as $id ) {
		$aid = absint( $id );
		if ( $aid < 1 ) {
			continue;
		}
		$img = wp_get_attachment_image( $aid, 'medium_large', false, array( 'class' => 'opb-gallery__img' ) );
		if ( $img ) {
			echo '<figure class="opb-gallery__cell">' . $img . '</figure>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}
	echo '</div>';
}
echo '</div>';
