<?php

/**
 * Element styling (Customizer) — demo settings using control type `styling` (section `onepress_global_settings`).
 *
 * Typography styling rows live in `inc/registry/typo-registry.php` and are registered from
 * `inc/customize-configs/options-typography.php`. When you add or remove `styling` theme_mod ids here,
 * update `onepress_styling_default_theme_mod_setting_ids()` in `inc/styling-css.php` so front CSS and
 * preview stay aligned.
 *
 * Multiple targets: `styling_multiple` => true, default `onepress_styling_get_default_value_multiple()` (array;
 * sanitize encodes JSON for theme_mod). Single target: omit `styling_multiple`, use a `onepress_styling_get_default_value*()`
 * array and `onepress_sanitize_styling_value`.
 *
 * `base_selector` (optional, single-target only — ignored when `styling_multiple` => true): non-empty
 * string fixes `_meta.baseSelector` / `selector` in JS and hides the base selector field in the editor.
 * Comma-separated lists apply each state suffix (e.g. `:hover`) to every branch: `.a, .b` + `:hover` → `.a:hover, .b:hover`.
 *
 * `styling_states` (control arg, exposed as `control.params.styling_states` in JS):
 * - `'all'` — full “Manage states”: presets, custom ids, remove (default if omitted).
 * - Non-empty array — same shape as `_meta.states` rows; fixed list only (no add/remove; labels/suffixes + reorder in popover).
 * - `false` — only `normal`; state tabs and state popover are hidden; use default from `onepress_styling_get_default_value_normal_only()`.
 *
 * `styling_groups` (optional): `null`/omit = all accordion groups. Otherwise an array of ids in display order:
 * `text`, `background`, `spacing`, `border`, `shadow`, `display`, `raw`. Invalid ids are dropped.
 * If exactly one id is listed, that group stays open and its header toggle is disabled.
 *
 * `disable_fields` (optional): array of field tokens (sanitize_key in PHP). Each entry is either a model
 * key in snake_case / kebab-case (e.g. `font_family` → fontFamily) or a composite alias:
 * `margin`, `padding`, `border_width`, `border_radius`, `outline`, `font_face`, `inset`, `background_type`,
 * `flex_layout`, `grid_layout`, `box_shadow`, `raw`, `custom_declarations`. See stylingDisableFields.js.
 *
 * @package OnePress
 */

$wp_customize->add_setting(
	'onepress_element_styling',
		array(
		'default'           => onepress_styling_get_default_value_multiple(),
		'sanitize_callback' => 'onepress_sanitize_styling_value_multi',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control(
	new Onepress_Customize_Styling_Control(
		$wp_customize,
		'onepress_element_styling',

		array(
			'label'               => esc_html__('Element styling test', 'onepress'),
			'description'         => esc_html__('Per target, state, and breakpoint: CSS declarations only (no selectors or braces). Use Add item for multiple selectors; each row opens its own editor.', 'onepress'),
			'section'             => 'onepress_global_settings',
			'styling_breakpoints' => onepress_styling_default_breakpoints(),
			'styling_multiple'    => true,
			'styling_states'        => 'all',
			'priority'              => 5,
		)
	)
);




$wp_customize->add_setting(
	'onepress_element_styling_single',
		array(
		'default'           => onepress_styling_get_default_value_normal_only(),
		'sanitize_callback' => 'onepress_sanitize_styling_value',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control(
	new Onepress_Customize_Styling_Control(
		$wp_customize,
		'onepress_element_styling_single',
		array(
			'label'               => esc_html__('Styling 1 Group', 'onepress'),
			'description'         => esc_html__('Single selector group, normal state only — state tabs are hidden. Only the Text styling group is shown and it stays expanded.', 'onepress'),
			'section'             => 'onepress_global_settings',
			'styling_breakpoints' => onepress_styling_default_breakpoints(),
			'styling_multiple'    => false,
			'styling_states'      => false,
			'base_selector' 			=> '.onepage-section .section-desc',
			'styling_groups'      => array('text'),
			'priority'            => 6,
		)
	)
);

$onepress_styling_fixed_states_demo = array(
	array(
		'normal' => array(
			'label'    => __('Normal', 'onepress'),
			'selector' => '',
		),
	),
	array(
		'hover' => array(
			'label'    => __('Hover', 'onepress'),
			'selector' => ':hover',
		),
	),
);

$wp_customize->add_setting(
	'onepress_element_styling_fixed_states',
		array(
		'default'           => onepress_styling_get_default_value_from_states_template($onepress_styling_fixed_states_demo),
		'sanitize_callback' => 'onepress_sanitize_styling_value',
		'transport'         => 'postMessage',
	)
);

$wp_customize->add_control(
	new Onepress_Customize_Styling_Control(
		$wp_customize,
		'onepress_element_styling_fixed_states',
		array(
			'label'               => esc_html__('Element styling (fixed states demo)', 'onepress'),
			'description'         => esc_html__('Only Normal and Hover — no adding custom states; use the settings icon to edit labels and suffixes.', 'onepress'),
			'section'             => 'onepress_global_settings',
			'styling_breakpoints' => onepress_styling_default_breakpoints(),
			'styling_multiple'    => false,
			'styling_states'      => $onepress_styling_fixed_states_demo,
			'priority'            => 7,
			'base_selector'       => '.section-title-area .section-title, .onepage-section .section-desc2',
			// Example: array( 'font_face', 'raw', 'box_shadow' ),
			'disable_fields'      => array(),
		)
	)
);
