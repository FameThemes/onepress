<?php
/**
 * Teams front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props   = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$title   = isset( $props['title'] ) ? (string) $props['title'] : '';
$raw     = isset( $props['members'] ) ? (string) $props['members'] : '';
$decoded = json_decode( $raw, true );
$members = is_array( $decoded ) ? array_slice( $decoded, 0, 48 ) : array();

echo '<div class="opb opb-teams">';
if ( $title !== '' ) {
	printf( '<h2 class="opb-teams__title">%s</h2>', esc_html( $title ) );
}
if ( array() !== $members ) {
	echo '<ul class="opb-teams__list">';
	foreach ( $members as $row ) {
		if ( ! is_array( $row ) ) {
			continue;
		}
		$n = isset( $row['name'] ) ? sanitize_text_field( (string) $row['name'] ) : '';
		$r = isset( $row['role'] ) ? sanitize_text_field( (string) $row['role'] ) : '';
		$i = isset( $row['image'] ) ? absint( $row['image'] ) : 0;
		if ( $n === '' && $r === '' && $i < 1 ) {
			continue;
		}
		echo '<li class="opb-teams__member">';
		if ( $i > 0 ) {
			$img = wp_get_attachment_image( $i, 'thumbnail', false, array( 'class' => 'opb-teams__avatar' ) );
			if ( $img ) {
				echo '<div class="opb-teams__avatar-wrap">' . $img . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}
		if ( $n !== '' ) {
			printf( '<span class="opb-teams__name">%s</span>', esc_html( $n ) );
		}
		if ( $r !== '' ) {
			printf( '<span class="opb-teams__role">%s</span>', esc_html( $r ) );
		}
		echo '</li>';
	}
	echo '</ul>';
}
echo '</div>';
