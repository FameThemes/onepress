<?php
/**
 * Contact front-end markup. $node is sanitized.
 *
 * @package OnePress
 * @var array $node
 */

defined( 'ABSPATH' ) || exit;

$props   = isset( $node['props'] ) && is_array( $node['props'] ) ? $node['props'] : array();
$title   = isset( $props['title'] ) ? (string) $props['title'] : '';
$intro   = isset( $props['intro'] ) ? (string) $props['intro'] : '';
$email   = isset( $props['email'] ) ? sanitize_email( (string) $props['email'] ) : '';
$phone   = isset( $props['phone'] ) ? (string) $props['phone'] : '';
$address = isset( $props['address'] ) ? (string) $props['address'] : '';

echo '<div class="opb opb-contact">';
if ( $title !== '' ) {
	printf( '<h2 class="opb-contact__title">%s</h2>', esc_html( $title ) );
}
if ( $intro !== '' ) {
	printf(
		'<div class="opb-contact__intro">%s</div>',
		wp_kses_post( wpautop( $intro ) )
	);
}
echo '<dl class="opb-contact__details">';
if ( $email !== '' ) {
	echo '<dt class="opb-contact__label">' . esc_html__( 'Email', 'onepress' ) . '</dt>';
	echo '<dd class="opb-contact__value"><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a></dd>';
}
if ( $phone !== '' ) {
	echo '<dt class="opb-contact__label">' . esc_html__( 'Phone', 'onepress' ) . '</dt>';
	printf( '<dd class="opb-contact__value">%s</dd>', esc_html( $phone ) );
}
if ( $address !== '' ) {
	echo '<dt class="opb-contact__label">' . esc_html__( 'Address', 'onepress' ) . '</dt>';
	printf(
		'<dd class="opb-contact__value">%s</dd>',
		wp_kses_post( wpautop( $address ) )
	);
}
echo '</dl></div>';
