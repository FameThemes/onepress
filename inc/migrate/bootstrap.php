<?php
/**
 * Theme data migrations.
 *
 * Plus→theme typography copy runs on every request and overwrites each destination mod from Plus (remove_theme_mod then set).
 * One-shot option gates color promotion + completion flag only.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_template_directory() . '/inc/migrate/typography-from-onepress-plus.php';

add_action( 'after_setup_theme', 'onepress_migrate_typography_copy_plus_to_theme_slots', 5 );
add_action( 'after_setup_theme', 'onepress_migrate_maybe_run_from_onepress_plus', 6 );
