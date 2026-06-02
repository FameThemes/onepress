<?php

/**
 * Support Gutenberg Editor.
 *
 * @since 2.2.0
 */
class OnePress_Editor
{
	private $action      = 'onepress_load_editor_style';
	// Path fix (was 'assets/css/admin/editor.css' — directory does not exist; load_style() returned empty).
	// Actual webpack output is 'assets/admin/editor.css'. Note: add_editor_style() in functions.php
	// also loads this file, so it is now injected via both channels — benign duplication.
	private $editor_file = 'assets/admin/editor.css';
	public function __construct()
	{
		// Add editor settings.
		$current_wp_version = $GLOBALS['wp_version'];
		if (version_compare($current_wp_version, '5.8', '>=')) {
			add_filter('block_editor_settings_all', array($this, 'editor_settings'));
		} else {
			add_filter('block_editor_settings', array($this, 'editor_settings'));
		}
		// Add ajax action to load css file.
		add_action('wp_ajax_' . $this->action, array($this, 'css_file'));
		// Add more editor assets.
		add_action('enqueue_block_editor_assets', array($this, 'assets'));
	}

	/**
	 * Add more editor styles and scripts.
	 *
	 * @todo Add Custom Fonts and styling settings.
	 *
	 * @return void
	 */
	function assets()
	{
		if (function_exists('onepress_typography_render_style')) {
			$typo = onepress_typography_render_style(false, true);
			if ($typo['url']) {
				wp_register_style('onepress-editor-fonts', $typo['url']); // Font style url.
				wp_enqueue_style('onepress-editor-fonts'); // Font style url.
			}
			wp_add_inline_style('wp-edit-post', $typo['code']);
		}

		wp_add_inline_style('wp-edit-post', $this->css());

		/**
		 * Since 2.4.1: live-update `--wp--style--global--content-size` in the
		 * editor iframe when the user switches the page template via the
		 * sidebar. Mirrors the priority chain used server-side
		 * (`onepress_get_layout_for_post_id()` / `onepress_resolve_content_width_css()`).
		 *
		 * JS source lives at `src/admin/editor-content-width.js` and is
		 * built to `assets/admin/editor-content-width(.minified).js` by
		 * webpack (entry in `webpack.config.js`). Theme reviewers reject
		 * inline JS strings in PHP — keeping the watcher as a real file
		 * satisfies that rule and lets ESLint / build-time analysis run
		 * over it.
		 */
		$config = $this->content_width_config();
		if ($config !== null && function_exists('onepress_load_build_script')) {
			$handle = onepress_load_build_script(
				'editor-content-width',
				array('wp-data', 'wp-edit-post'),
				true
			);
			if ($handle) {
				wp_localize_script($handle, 'onepressEditorContentWidth', $config);
			}
		}
	}

	/**
	 * Build dynamic editor-only CSS.
	 *
	 * Since 2.4.1: emits ONLY a `:root { --wp--style--global--content-size: <value>px }`
	 * override — no literal `max-width: <value>px` rule. The SCSS rule in
	 * `_gutenberg.scss` (`.editor-styles-wrapper .wp-block:not(…) { max-width: var(--wp--style--global--content-size, 1110px) }`)
	 * wins WP's auto-generated `.is-root-container > :where(…)` rule by
	 * specificity and consumes this var — so the visible cap reflects the
	 * resolved value through a single source of truth.
	 *
	 * The value is resolved by `onepress_resolve_content_width_px()` from
	 * the layout determined by `onepress_get_layout_for_post_id()`. Priority:
	 *   1) page template (full-width / left-sidebar)
	 *   2) Single Layout Sidebar mod (post type `post` only)
	 *   3) Site Layout mod (global)
	 * Then `post_type=post` lets `single_layout_content_width` win as an
	 * explicit user override.
	 *
	 * Theme.json `layout.contentSize` is intentionally NOT mutated (see
	 * `inc/theme-json-bridge.php`) because WP would bake the value into
	 * the literal `max-width` of the `is-root-container` rule.
	 *
	 * @return string CSS code (empty when the resolved value matches the
	 *                theme.json default — no override needed).
	 */
	public function css()
	{
		$post_id = isset($_REQUEST['post']) ? absint(wp_unslash($_REQUEST['post'])) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ($post_id <= 0) {
			return '';
		}

		$post_type = get_post_type($post_id);
		if (! $post_type) {
			return '';
		}

		if (! function_exists('onepress_get_layout_for_post_id') || ! function_exists('onepress_resolve_content_width_css')) {
			return '';
		}

		$layout = onepress_get_layout_for_post_id($post_id);
		$value  = onepress_resolve_content_width_css($layout, $post_type);

		$default = function_exists('onepress_get_no_sidebar_base_px')
			? onepress_get_no_sidebar_base_px() . 'px'
			: '1110px';

		// Skip when the resolved value already matches the theme.json default —
		// WP-emitted `:root { --wp--style--global--content-size: <default>px }`
		// already provides it; emitting an identical override is dead weight.
		if ($value === '' || $value === $default) {
			return '';
		}

		return ':root { --wp--style--global--content-size: ' . $value . '; }';
	}

	/**
	 * Build the config object consumed by `src/admin/editor-content-width.js`.
	 *
	 * Mirrors the PHP priority chain (template → single_layout → onepress_layout)
	 * + the post-only user override (`single_layout_content_width`). All
	 * inputs are PHP-resolved once at editor load; the JS does pure
	 * dictionary lookups with no extra fetches.
	 *
	 * @since 2.4.1
	 * @return array|null Config array, or `null` when no post context.
	 */
	protected function content_width_config()
	{
		$post_id = isset($_REQUEST['post']) ? absint(wp_unslash($_REQUEST['post'])) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ($post_id <= 0) {
			return null;
		}

		$post_type = get_post_type($post_id);
		if (! $post_type) {
			return null;
		}

		return array(
			'postType'           => $post_type,
			'sidebarBase'        => function_exists('onepress_get_sidebar_base_px') ? onepress_get_sidebar_base_px() : 790,
			'noSidebarBase'      => function_exists('onepress_get_no_sidebar_base_px') ? onepress_get_no_sidebar_base_px() : 1110,
			'siteLayout'         => get_theme_mod('onepress_layout', 'right-sidebar'),
			'singleLayout'       => get_theme_mod('single_layout', 'default'),
			'singleContentWidth' => absint(get_theme_mod('single_layout_content_width')),
			// Keep this map in sync with `onepress_get_layout_for_post_id()`
			// in `inc/extras.php`. `'stretched'` is the special key that
			// resolves to `100vw` instead of a pixel base.
			'templateMap'        => array(
				'template-fullwidth.php'           => 'no-sidebar',
				'template-fullwidth-stretched.php' => 'stretched',
				'template-left-sidebar.php'        => 'left-sidebar',
			),
		);
	}

	/**
	 * Create a dymanic stylesheet url.
	 *
	 * @return string CSS URL
	 */
	public function editor_style_url()
	{
		return add_query_arg(
			array(
				'action' => $this->action,
				'nonce'  => wp_create_nonce($this->action),
			),
			admin_url('admin-ajax.php')
		);
	}

	/**
	 * Add edditor settings.
	 *
	 * @see gutenberg_editor_scripts_and_styles
	 *
	 * @param array $editor_settings
	 * @return array
	 */
	public function editor_settings($editor_settings)
	{
		$editor_settings['styles'][] = array(
			'css' => $this->load_style(),
		);

		/**
		 * Since 2.4.1: inject the dynamic CSS (content-width override + the
		 * defense-in-depth max-width rule) through `editor_settings['styles']`
		 * so it reaches the iframe canvas. Previously this string was added
		 * via `wp_add_inline_style('wp-edit-post', $this->css())` in assets(),
		 * which only lands in the outer admin DOM — the iframe canvas in
		 * WP 5.9+ never received it, so `single_layout_content_width` from
		 * the Customizer was silently ignored.
		 *
		 * `css()` returns '' when no Customizer value is set; guard against
		 * pushing an empty styles entry.
		 */
		$dynamic_css = $this->css();
		if ($dynamic_css !== '') {
			$editor_settings['styles'][] = array(
				'css' => $dynamic_css,
			);
		}

		/**
		 * Phase 3 (since 2.4.0): inject dynamic color palette + font sizes from
		 * theme mods, but only when nothing else has set them already. This
		 * lets child themes that call add_theme_support('editor-color-palette')
		 * or add_theme_support('editor-font-sizes') keep winning.
		 *
		 * Read fresh from theme mods each request — this is why we use the
		 * block_editor_settings_all filter instead of add_theme_support()
		 * (which requires a static array resolved at after_setup_theme time).
		 */
		if (empty($editor_settings['colors'])) {
			$editor_settings['colors'] = $this->get_editor_color_palette();
		}
		if (empty($editor_settings['fontSizes'])) {
			$editor_settings['fontSizes'] = $this->get_editor_font_sizes();
		}

		return $editor_settings;
	}

	/**
	 * Build the editor color palette from current theme mods.
	 *
	 * Each entry shape: ['name', 'slug', 'color']. Slugs become CSS classes
	 * (`.has-{slug}-color`, `.has-{slug}-background-color`) — keep them stable
	 * across releases because user posts may already reference them.
	 *
	 * Filterable via `onepress_editor_color_palette` so integrators can extend
	 * or replace the palette without subclassing.
	 *
	 * @since 2.4.0
	 * @return array
	 */
	public function get_editor_color_palette()
	{
		$primary   = get_theme_mod('onepress_primary_color', '#03c4eb');
		$secondary = get_theme_mod('onepress_secondary_color', '#00aeef');

		if ($primary && strpos($primary, '#') !== 0) {
			$primary = '#' . ltrim($primary, '#');
		}
		if ($secondary && strpos($secondary, '#') !== 0) {
			$secondary = '#' . ltrim($secondary, '#');
		}

		$palette = array(
			array(
				'name'  => esc_html__('Primary', 'onepress'),
				'slug'  => 'onepress-primary',
				'color' => $primary,
			),
			array(
				'name'  => esc_html__('Secondary', 'onepress'),
				'slug'  => 'onepress-secondary',
				'color' => $secondary,
			),
			array(
				'name'  => esc_html__('Heading', 'onepress'),
				'slug'  => 'onepress-heading',
				'color' => '#333333',
			),
			array(
				'name'  => esc_html__('Text', 'onepress'),
				'slug'  => 'onepress-text',
				'color' => '#777777',
			),
			array(
				'name'  => esc_html__('Border', 'onepress'),
				'slug'  => 'onepress-border',
				'color' => '#e9e9e9',
			),
			array(
				'name'  => esc_html__('Light Background', 'onepress'),
				'slug'  => 'onepress-meta',
				'color' => '#f8f9f9',
			),
			array(
				'name'  => esc_html__('White', 'onepress'),
				'slug'  => 'onepress-white',
				'color' => '#ffffff',
			),
		);

		return apply_filters('onepress_editor_color_palette', $palette);
	}

	/**
	 * Build the editor font-size scale.
	 *
	 * Each entry shape: ['name', 'slug', 'size', 'slug']. Slugs become CSS
	 * classes (`.has-{slug}-font-size`); keep stable across releases.
	 *
	 * Filterable via `onepress_editor_font_sizes`.
	 *
	 * @since 2.4.0
	 * @return array
	 */
	public function get_editor_font_sizes()
	{
		$sizes = array(
			array(
				'name' => esc_html__('Small', 'onepress'),
				'slug' => 'small',
				'size' => 13,
			),
			array(
				'name' => esc_html__('Normal', 'onepress'),
				'slug' => 'normal',
				'size' => 14,
			),
			array(
				'name' => esc_html__('Medium', 'onepress'),
				'slug' => 'medium',
				'size' => 18,
			),
			array(
				'name' => esc_html__('Large', 'onepress'),
				'slug' => 'large',
				'size' => 24,
			),
			array(
				'name' => esc_html__('Huge', 'onepress'),
				'slug' => 'huge',
				'size' => 32,
			),
		);

		return apply_filters('onepress_editor_font_sizes', $sizes);
	}

	/**
	 * Render dynamic CSS content.
	 *
	 * @return void
	 */
	public function css_file()
	{

		if (! current_user_can('edit_posts')) {
			wp_die(esc_html__('You are not authorized to access this page.', 'onepress'));
			die();
		}

		// Must match editor_style_url(): query arg name is `nonce` (not `none`).
		$nonce = isset($_REQUEST['nonce']) ? sanitize_text_field(wp_unslash($_REQUEST['nonce'])) : '';
		if (! wp_verify_nonce($nonce, $this->action)) {
			wp_die(esc_html__('Security check!', 'onepress'));
		}

		nocache_headers();
		header('Content-Type: text/css; charset=UTF-8');

		// File contents from theme disk; not HTML. wp_kses_post() would strip valid CSS.
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $this->load_style();
		exit;
	}

	/**
	 * Load CSS content.
	 *
	 * @return string CSS code.
	 */
	public function load_style()
	{
		global $wp_filesystem;
		WP_Filesystem();
		$file          = get_template_directory() . '/' . $this->editor_file;
		$file_contents = '';
		if (file_exists($file)) {
			$file_contents .= $wp_filesystem->get_contents($file);
		}
		$file_contents .= '';
		return $file_contents;
	}
}

if (is_admin()) {
	new OnePress_Editor();
}
