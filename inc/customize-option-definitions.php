<?php
/**
 * Declarative Customizer option lists (return-array config files), merged for registration and tooling.
 *
 * @package onepress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Absolute paths to PHP files under customize-configs that each return an array of option entries.
 *
 * Files may be included before {@see 'init'}; UI strings use esc_html__()/__() in each file so gettext can extract msgids.
 * During merge, pass {@see onepress_customize_build_builder_context_data()} as the second argument to
 * {@see onepress_get_customize_option_definitions()} (Customizer only). Definition files may read
 * `$GLOBALS['onepress_customize_builder_context']` only while that function runs; it is cleared afterward.
 *
 * Imperative configs (direct `$wp_customize` registration) live in the same folder but are loaded
 * from `customizer.php` only when still imperative — not listed here.
 *
 * @return string[]
 */
function onepress_customize_option_definition_files() {
	$dir = trailingslashit( get_template_directory() ) . 'inc/customize-configs/';

	$files = [
		$dir . 'options.php',
		$dir . 'site-identity.php',
		$dir . 'options-global.php',
		$dir . 'options-colors.php',
		$dir . 'options-navigation.php',
		$dir . 'options-sections-navigation.php',
		$dir . 'options-blog-posts.php',
		$dir . 'options-single.php',
		$dir . 'options-footer.php',
		$dir . 'options-header.php',
		$dir . 'options-page.php',
		$dir . 'section-about.php',
		$dir . 'section-contact.php',
		$dir . 'section-counter.php',
		$dir . 'section-features.php',
		$dir . 'section-gallery.php',
		$dir . 'section-hero.php',
		$dir . 'section-news.php',
		$dir . 'section-services.php',
		$dir . 'section-team.php',
		$dir . 'section-typo.php',
		$dir . 'section-upsell.php',
		$dir . 'section-videolightbox.php',
	];

	return apply_filters( 'onepress_customize_option_definition_files', $files );
}

/**
 * Drop merged-definition caches so the next merge runs after {@see 'after_setup_theme'}
 * (e.g. child themes filtering {@see 'onepress_customize_option_definition_files'}).
 */
function onepress_customize_reset_option_definitions_cache() {
	unset( $GLOBALS['onepress_customize_option_definitions_cache'] );
}

add_action( 'after_setup_theme', 'onepress_customize_reset_option_definitions_cache', 20 );

/**
 * Dropdown data for declarative Customizer configs (pages, users).
 *
 * Runs `get_pages()` / `get_users()` only while {@see 'customize_register'} is executing, so normal
 * front-end requests do not pay those queries. If called outside that action, returns placeholder rows only.
 *
 * @return array{option_pages: array<int|string, string>, option_users: array<int|string, string>}
 */
function onepress_customize_build_builder_context_data() {
	$option_pages = array( 0 => esc_html__( 'Select page', 'onepress' ) );
	$option_users = array( 0 => esc_html__( 'Select member', 'onepress' ) );

	if ( ! doing_action( 'customize_register' ) ) {
		return array(
			'option_pages' => $option_pages,
			'option_users' => $option_users,
		);
	}

	foreach ( get_pages() as $p ) {
		$option_pages[ $p->ID ] = $p->post_title;
	}

	foreach (
		get_users(
			array(
				'orderby' => 'display_name',
				'order'   => 'ASC',
				'number'  => '',
			)
		) as $user
	) {
		$option_users[ $user->ID ] = $user->display_name;
	}

	return array(
		'option_pages' => $option_pages,
		'option_users' => $option_users,
	);
}

/**
 * Merged declarative Customizer entries from all definition files.
 *
 * @param bool                $refresh         When true, rebuild from disk (ignore static cache).
 * @param array<string,mixed>|null $builder_context Optional. When an array (from {@see onepress_customize_build_builder_context_data()}),
 *                                assigned to `$GLOBALS['onepress_customize_builder_context']` only for the duration of this merge.
 * @return array<int, array<string, mixed>>
 */
function onepress_get_customize_option_definitions( $refresh = false, $builder_context = null ) {
	if ( ! isset( $GLOBALS['onepress_customize_option_definitions_cache'] ) || ! is_array( $GLOBALS['onepress_customize_option_definitions_cache'] ) ) {
		$GLOBALS['onepress_customize_option_definitions_cache'] = [];
	}

	$owns_ctx = false;
	if ( is_array( $builder_context ) ) {
		$GLOBALS['onepress_customize_builder_context'] = $builder_context;
		$owns_ctx                                      = true;
	}

	$ctx_bucket = isset( $GLOBALS['onepress_customize_builder_context'] ) ? 1 : 0;

	try {
		if ( ! $refresh && isset( $GLOBALS['onepress_customize_option_definitions_cache'][ $ctx_bucket ] ) ) {
			return $GLOBALS['onepress_customize_option_definitions_cache'][ $ctx_bucket ];
		}

		$merged = [];

		foreach ( onepress_customize_option_definition_files() as $file ) {
			$file = (string) $file;
			if ( '' === $file || ! is_readable( $file ) ) {
				continue;
			}

			$chunk = include $file;

			if ( is_array( $chunk ) ) {
				$merged = array_merge( $merged, $chunk );
			}
		}

		$GLOBALS['onepress_customize_option_definitions_cache'][ $ctx_bucket ] = apply_filters( 'onepress_customize_option_definitions', $merged );

		return $GLOBALS['onepress_customize_option_definitions_cache'][ $ctx_bucket ];
	} finally {
		if ( $owns_ctx ) {
			unset( $GLOBALS['onepress_customize_builder_context'] );
		}
	}
}

/**
 * Merged declarative options for Customizer registration.
 *
 * Runs during {@see 'customize_register'}, which WordPress fires only after {@see 'after_setup_theme'}.
 * Use this instead of calling {@see onepress_get_customize_option_definitions()} directly so the contract stays obvious.
 *
 * @param array{option_pages: array<int|string, string>, option_users: array<int|string, string>} $builder_context From {@see onepress_customize_build_builder_context_data()}.
 * @return array<int, array<string, mixed>>
 */
function onepress_customize_get_merged_definitions_for_register( $builder_context ) {
	return onepress_get_customize_option_definitions( true, $builder_context );
}
