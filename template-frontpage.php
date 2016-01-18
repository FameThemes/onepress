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
			/*
			 * Section: Hero
			 */
			get_template_part('section-parts/section', 'hero');

			/*
			 * Section: About
			 */
			get_template_part('section-parts/section', 'about');

			/*
			 * Section: Services
			 */
			get_template_part('section-parts/section', 'services');

			/*
			 * Section: Team
			 */
			get_template_part('section-parts/section', 'team');

			/*
			 * Section: News
			 */
			get_template_part('section-parts/section', 'news');

			/*
			 * Section: Contact
			 */
			get_template_part('section-parts/section', 'contact');
			?>


		</main><!-- #main -->
	</div><!-- #content -->

<?php get_footer(); ?>
