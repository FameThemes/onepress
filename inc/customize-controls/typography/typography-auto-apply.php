<?php
/**
 * Map typography theme mod to front-end CSS (see option-demo-example.php).
 * Selectors mirror plugins/onepress-plus/inc/typography/auto-apply.php where applicable.
 *
 * @package onepress
 */

if ( function_exists( 'onepress_typo_helper_auto_apply' ) ) {
	onepress_typo_helper_auto_apply(
		'onepress_typo_demo_heading',
		'#features .section-content',
		null,
		'theme_mod',
		''
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_branding_title',
		'#page .site-branding .site-title, #page .site-branding .site-text-logo',
		null,
		'theme_mod',
		''
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_branding_tagline',
		'#page .site-branding .site-description',
		null,
		'theme_mod',
		''
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_nav',
		'#page .onepress-menu a',
		null,
		'theme_mod',
		''
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_hero_heading',
		'.hero__content .hero-large-text, .hero__content .hcl2-content h1, .hero__content .hcl2-content h2, .hero__content .hcl2-content h3',
		null,
		'theme_mod',
		''
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_headings',
		'body h1, body h2, body h3, body h4, body h5, body h6, .entry-header .entry-title, body .section-title-area .section-title, body .section-title-area .section-subtitle, body .hero-content-style1 h2',
		null,
		'theme_mod',
		'.edit-post-visual-editor.editor-styles-wrapper .editor-post-title__input, .edit-post-visual-editor.editor-styles-wrapper h1, .edit-post-visual-editor.editor-styles-wrapper h2, .edit-post-visual-editor.editor-styles-wrapper h3, .edit-post-visual-editor.editor-styles-wrapper h4, .edit-post-visual-editor.editor-styles-wrapper h5, .edit-post-visual-editor.editor-styles-wrapper h6'
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_paragraphs',
		'body, body p, .entry-content p, .hero-small-text',
		null,
		'theme_mod',
		'.editor-styles-wrapper *'
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_slider_slide_title',
		'.section-slider .section-op-slider .item--title',
		null,
		'theme_mod',
		''
	);

	onepress_typo_helper_auto_apply(
		'onepress_typo_slider_slide_content',
		'.section-slider .section-op-slider .item--desc',
		null,
		'theme_mod',
		''
	);
}
