<?php
/**
 *Template Name: Frontpage
 *
 * @package OnePress
 */

get_header(); ?>

	<div id="content" class="site-content">
		<main id="main" class="site-main" role="main">
            <?php

			$sections = get_theme_mod('onepress_section_order_styling', '');
			$sections = json_decode( $sections, true );
			if ( ! is_array( $sections ) ) {
				$sections = array();
			}

			if ( empty( $sections ) ) {
				$sections = array(
					array(
						'title' => __('Hero', 'onepress'),
						'section_id' => 'hero',
					),
					array(
						'title' => __('About', 'onepress'),
						'section_id' => 'about',
					),
					array(
						'title' => __('Services', 'onepress'),
						'section_id' => 'services',
					),
					array(
						'title' => __('Team', 'onepress'),
						'section_id' => 'team',
					),
					array(
						'title' => __('News', 'onepress'),
						'section_id' => 'news',
					),
					array(
						'title' => __('Contact', 'onepress'),
						'section_id' => 'contact',
					),
				);
			}


			if ( ! has_action( 'onepress_frontpage_section_parts' ) ) {

				foreach ( $sections as $index => $section ) {

					$section = wp_parse_args( $section,
						array(
							'section_id' => '',
						)
					);

					if ( $section['section_id'] != '') {
						get_template_part( 'section-parts/section', $section['section_id'] );
					}
				}

			} else {
				do_action( 'onepress_frontpage_section_parts', $sections );
			}

			?>
		</main><!-- #main -->
	</div><!-- #content -->

<?php get_footer(); ?>
