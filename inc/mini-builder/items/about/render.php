<?php
/**
 * About front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props   = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$title   = isset( $props['title'] ) ? (string) $props['title'] : '';
$content = isset( $props['content'] ) ? (string) $props['content'] : '';
$img_id  = isset( $props['image'] ) ? absint( $props['image'] ) : 0;

echo '<div class="opb opb-about">';
if ( $img_id > 0 ) {
	$img = wp_get_attachment_image( $img_id, 'large', false, array( 'class' => 'opb-about__image' ) );
	if ( $img ) {
		echo '<div class="opb-about__media">' . $img . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
echo '<div class="opb-about__body">';
if ( $title !== '' ) {
	printf( '<h2 class="opb-about__title">%s</h2>', esc_html( $title ) );
}
if ( $content !== '' ) {
	printf(
		'<div class="opb-about__content">%s</div>',
		wp_kses_post( wpautop( $content ) )
	);
}
echo '</div></div>';
