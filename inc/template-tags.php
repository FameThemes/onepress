<?php

/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package OnePress
 */

/**
 * Display header brand
 *
 * @since 1.2.1
 */
function onepress_add_retina_logo($html)
{
	$custom_logo_id = get_theme_mod('custom_logo');

	$custom_logo_attr = array(
		'class'    => 'custom-logo',
		'itemprop' => 'logo',
	);
	$image_retina_url = false;
	$retina_id = false;
	$retina_url = sanitize_text_field(get_theme_mod('onepress_retina_logo'));
	if ($retina_url) {
		$retina_id = attachment_url_to_postid($retina_url);
		if ($retina_id) {
			$image_retina_url = wp_get_attachment_image_src($retina_id, 'full');
			if ($image_retina_url) {
				$custom_logo_attr['srcset'] = $image_retina_url[0] . ' 2x';
			}
		}
	}

	if (! $custom_logo_id) {
		$custom_logo_id = $retina_id;
	}

	$t_logo_html = '';

	if (onepress_is_transparent_header()) {
		$t_logo = sanitize_text_field(get_theme_mod('onepress_transparent_logo'));
		$t_logo_r = sanitize_text_field(get_theme_mod('onepress_transparent_retina_logo'));
		$t_logo_attr = array(
			'class'    => 'custom-logo-transparent',
			'itemprop' => 'logo',
		);

		if ($t_logo_r) {
			$t_logo_r = attachment_url_to_postid($t_logo_r);
			if ($t_logo_r) {
				$image_tr_url = wp_get_attachment_image_src($t_logo_r, 'full');
				if ($image_tr_url) {
					$t_logo_attr['srcset'] = $image_tr_url[0] . ' 2x';
				}
			}
		}

		if ($t_logo) {
			$t_logo = attachment_url_to_postid($t_logo);
		}
		if (! $t_logo) {
			$t_logo = $t_logo_r;
		}

		if ($t_logo) {
			$t_logo_html = wp_get_attachment_image($t_logo, 'full', false, $t_logo_attr);
		}
	}

	// We have a logo. Logo is go.
	if ($custom_logo_id) {

		/*
		 * If the logo alt attribute is empty, get the site title and explicitly
		 * pass it to the attributes used by wp_get_attachment_image().
		 */
		$image_alt = get_post_meta($custom_logo_id, '_wp_attachment_image_alt', true);
		if (empty($image_alt)) {
			$custom_logo_attr['alt'] = get_bloginfo('name', 'display');
		}

		if (! $t_logo_html) {
			$class = ' no-t-logo';
		} else {
			$class = ' has-t-logo';
		}

		$img_html = wp_get_attachment_image($custom_logo_id, 'full', false, $custom_logo_attr);

		/*
		 * If the alt attribute is not empty, there's no need to explicitly pass
		 * it because wp_get_attachment_image() already adds the alt attribute.
		 */
		$html = sprintf(
			'<a href="%1$s" class="custom-logo-link ' . esc_attr($class) . '" rel="home" itemprop="url">%2$s</a>',
			esc_url(home_url('/')),
			$img_html . $t_logo_html
		);
	}

	return $html;
}

add_filter('get_custom_logo', 'onepress_add_retina_logo', 15);


if (! function_exists('onepress_site_logo')) {
	function onepress_site_logo()
	{
		$classes = array();
		$html = '';
		$classes['logo'] = 'no-logo-img';

		if (function_exists('has_custom_logo')) {
			if (has_custom_logo()) {
				$classes['logo'] = 'has-logo-img';
				$html .= '<div class="site-logo-div">';
				$html .= get_custom_logo();
				$html .= '</div>';
			}
		}

		$hide_sitetile = get_theme_mod('onepress_hide_sitetitle', 0);
		$hide_tagline  = get_theme_mod('onepress_hide_tagline', 0);

		if (! $hide_sitetile) {
			$classes['title'] = 'has-title';
			if (is_front_page() && ! is_home()) {
				$html .= '<h1 class="site-title"><a class="site-text-logo" href="' . esc_url(home_url('/')) . '" rel="home">' . get_bloginfo('name') . '</a></h1>';
			} else {
				$html .= '<p class="site-title"><a class="site-text-logo" href="' . esc_url(home_url('/')) . '" rel="home">' . get_bloginfo('name') . '</a></p>';
			}
		}

		if (! $hide_tagline) {
			$description = get_bloginfo('description', 'display');
			if ($description || is_customize_preview()) {
				$classes['desc'] = 'has-desc';
				$html .= '<p class="site-description">' . $description . '</p>';
			}
		} else {
			$classes['desc'] = 'no-desc';
		}

		echo '<div class="site-brand-inner ' . esc_attr(join(' ', $classes)) . '">' . $html . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if (! function_exists('onepress_is_transparent_header')) {
	function onepress_is_transparent_header()
	{
		$check = false;
		if (is_front_page() && is_page_template('template-frontpage.php')) {
			if (get_theme_mod('onepress_header_transparent')) {
				$check = true;
			}
		} elseif (is_page() && has_post_thumbnail()) {
			if (! get_post_meta(get_the_ID(), '_cover', true)) {
				return false;
			}
			if (get_theme_mod('onepress_page_title_bar_disable') == 1) {
				return false;
			}
			if (has_post_thumbnail()) {
				if (get_theme_mod('onepress_header_transparent')) {
					$check = true;
				}
			}
		} elseif (is_home()) {
			if (get_theme_mod('onepress_page_title_bar_disable') == 1) {
				return false;
			}

			$new_page = get_option('page_for_posts');
			if (! get_post_meta($new_page, '_cover', true)) {
				return false;
			}

			if (has_post_thumbnail($new_page)) {
				if (get_theme_mod('onepress_header_transparent')) {
					$check = true;
				}
			}
		}

		return $check;
	}
}

add_action('onepress_site_start', 'onepress_site_header');
if (! function_exists('onepress_site_header')) {
	/**
	 * Display site header
	 */
	function onepress_site_header()
	{
		$header_width = get_theme_mod('onepress_header_width', 'contained');
		$is_disable_sticky = sanitize_text_field(get_theme_mod('onepress_sticky_header_disable'));
		$classes = array(
			'site-header',
			'header-' . $header_width,
		);

		if ($is_disable_sticky != 1) {
			$classes[] = 'is-sticky no-scroll';
		} else {
			$classes[] = 'no-sticky no-scroll';
		}

		$transparent = 'no-t';
		if (onepress_is_transparent_header()) {
			$transparent = 'is-t';
		}
		$classes[] = $transparent;

		$pos = sanitize_text_field(get_theme_mod('onepress_header_position', 'top'));
		if ($pos == 'below_hero') {
			$classes[] = 'h-below-hero';
		} else {
			$classes[] = 'h-on-top';
		}

?>
		<header id="masthead" class="<?php echo esc_attr(join(' ', $classes)); ?>" role="banner">
			<div class="container">
				<div class="site-branding">
					<?php
					onepress_site_logo();
					?>
				</div>
				<div class="header-right-wrapper">
					<a href="#0" id="nav-toggle"><?php esc_html_e('Menu', 'onepress'); ?><span></span></a>
					<nav id="site-navigation" class="main-navigation" role="navigation">
						<ul class="onepress-menu">
							<?php wp_nav_menu(
								array(
									'theme_location' => 'primary',
									'container' => '',
									'items_wrap' => '%3$s',
								)
							); ?>
						</ul>
					</nav>

				</div>
			</div>
		</header>
		<?php
	}
}

if (! function_exists('onepress_header')) {
	/**
	 * @since 2.0.0
	 */
	function onepress_header()
	{
		$transparent = 'no-transparent';
		$classes = array();
		if (onepress_is_transparent_header()) {
			$transparent = 'is-transparent';
		}
		$pos = sanitize_text_field(get_theme_mod('onepress_header_position', 'top'));
		if ($pos == 'below_hero') {
			$transparent = 'no-transparent';
			$classes[] = 'h-below-hero';
		} else {
			$classes[] = 'h-on-top';
		}

		$classes[] = $transparent;

		echo '<div id="header-section" class="' . esc_attr(join(' ', $classes)) . '">';

		do_action('onepress_header_section_start');
		if ($pos == 'below_hero') {
			if (is_page_template('template-frontpage.php')) {
				do_action('onepress_header_end');
			}
		}

		$hide_header = false;
		$page_id = false;
		if (is_singular() || is_page()) {
			$page_id = get_the_ID();
		}
		if (onepress_is_wc_active()) {
			if (is_shop()) {
				$page_id = wc_get_page_id('shop');
			}
		}

		if ($page_id) {
			$hide_header = get_post_meta($page_id, '_hide_header', true);
		}

		if (! $hide_header) {
			/**
			 * Hooked: onepress_site_header
			 *
			 * @see onepress_site_header
			 */
			do_action('onepress_site_start');
		}

		if ($pos != 'below_hero') {
			if (is_page_template('template-frontpage.php')) {
				do_action('onepress_header_end');
			}
		}

		do_action('onepress_header_section_end');
		echo '</div>';
	}
}

if (! function_exists('onepress_posted_on')) {
	/**
	 * Prints HTML with meta information for the current post-date/time and author.
	 */
	function onepress_posted_on()
	{
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if (get_the_time('U') !== get_the_modified_time('U')) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated hide" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr(get_the_date('c')),
			esc_html(get_the_date()),
			esc_attr(get_the_modified_date('c')),
			esc_html(get_the_modified_date())
		);

		$posted_on = sprintf(
			/* translators: 1: time */
			esc_html_x('Posted on %s', 'post date', 'onepress'),
			'<a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $time_string . '</a>'
		);

		$byline = sprintf(
			/* translators: 1: author */
			esc_html_x('by %s', 'post author', 'onepress'),
			'<span class="author vcard"><a  rel="author" class="url fn n" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>'
		);

		echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
}

if (! function_exists('onepress_entry_footer')) {
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function onepress_entry_footer()
	{

		ob_start();

		// Hide category and tag text for pages.
		if ('post' === get_post_type()) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list(esc_html__(', ', 'onepress'));
			if ($categories_list && onepress_categorized_blog()) {
				printf('<span class="cat-links">' . esc_html__('Posted in %1$s', 'onepress') . '</span>', $categories_list); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list('', esc_html__(', ', 'onepress'));
			if ($tags_list) {
				echo '<span class="tags-links">';
				printf(
					/* translators: 1 : tag list */
					esc_html__('Tagged %1$s', 'onepress'),
					$tags_list  // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				);
				echo '</span>';
			}
		}

		if (! is_single() && ! post_password_required() && (comments_open() || get_comments_number())) {
			echo '<span class="comments-link">';
			comments_popup_link(esc_html__('Leave a comment', 'onepress'), esc_html__('1 Comment', 'onepress'), esc_html__('% Comments', 'onepress'));
			echo '</span>';
		}

		$content = ob_get_contents();
		ob_clean();
		ob_end_flush();

		if ($content) {
			echo '<footer class="entry-footer">';
			echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo '</footer>';
		}
	}
}

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function onepress_categorized_blog()
{
	if (false === ($all_the_cool_cats = get_transient('onepress_categories'))) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories(
			array(
				'fields'     => 'ids',
				'hide_empty' => 1,

				// We only need to know if there is more than one category.
				'number'     => 2,
			)
		);

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = (! is_wp_error($all_the_cool_cats) && is_array($all_the_cool_cats) && ! empty($all_the_cool_cats)) ? count($all_the_cool_cats) : 1;

		set_transient('onepress_categories', $all_the_cool_cats);
	}

	if ($all_the_cool_cats > 1) {
		// This blog has more than 1 category so onepress_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so onepress_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in onepress_categorized_blog.
 */
function onepress_category_transient_flusher()
{
	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient('onepress_categories');
}
add_action('edit_category', 'onepress_category_transient_flusher');
add_action('save_post', 'onepress_category_transient_flusher');


if (! function_exists('onepress_comment')) :
	/**
	 * Template for comments and pingbacks.
	 *
	 * To override this walker in a child theme without modifying the comments template
	 * simply create your own onepress_comment(), and that function will be used instead.
	 *
	 * Used as a callback by wp_list_comments() for displaying the comments.
	 *
	 * @return void
	 */
	function onepress_comment($comment, $args, $depth)
	{
		switch ($comment->comment_type):
			case 'pingback':
			case 'trackback':
				// Display trackbacks differently than normal comments.
		?>
				<li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
					<p><?php esc_html_e('Pingback:', 'onepress'); ?> <?php comment_author_link(); ?> <?php edit_comment_link(esc_html__('(Edit)', 'onepress'), '<span class="edit-link">', '</span>'); ?></p>
				<?php
				break;
			default:
				// Proceed with normal comments.
				global $post;
				?>
				<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
					<article id="comment-<?php comment_ID(); ?>" class="comment clearfix">

						<?php echo get_avatar($comment, 60); ?>

						<div class="comment-wrapper">

							<header class="comment-meta comment-author vcard">
								<?php
								printf(
									'<cite><b class="fn">%1$s</b> %2$s</cite>',
									get_comment_author_link(),
									// If current post author is also comment author, make it known visually.
									($comment->user_id === $post->post_author) ? '<span>' . esc_html__('Post author', 'onepress') . '</span>' : ''
								);
								printf(
									/* translators: 1: date, 2: time */
									'<a class="comment-time" href="%1$s"><time datetime="%2$s">%3$s</time></a>',
									esc_url(get_comment_link($comment->comment_ID)),
									esc_html(get_comment_time('c')),
									esc_html(get_comment_date())
								);
								comment_reply_link(
									array_merge(
										$args,
										array(
											'reply_text' => esc_html__('Reply', 'onepress'),
											'after' => '',
											'depth' => $depth,
											'max_depth' => $args['max_depth'],
										)
									)
								);
								edit_comment_link(esc_html__('Edit', 'onepress'), '<span class="edit-link">', '</span>');
								?>
							</header>

							<?php if ('0' == $comment->comment_approved) : ?>
								<p class="comment-awaiting-moderation"><?php esc_html_e('Your comment is awaiting moderation.', 'onepress'); ?></p>
							<?php endif; ?>

							<div class="comment-content entry-content">
								<?php comment_text(); ?>
							</div>

						</div>

					</article>
			<?php
				break;
		endswitch; // end comment_type check
	}
endif;

if (! function_exists('onepress_hex_to_rgba')) {
	/**
	 * Convert hex color to rgba color
	 *
	 * @since 1.1.5
	 *
	 * @param $color
	 * @param int   $alpha
	 * @return bool|string
	 */
	function onepress_hex_to_rgba($color, $alpha = 1)
	{
		$color = str_replace('#', '', $color);
		if ('' === $color) {
			return '';
		}

		if (strpos(trim($color), 'rgb') !== false) {
			return $color;
		}

		// 3 or 6 hex digits, or the empty string.
		if (preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', '#' . $color)) {
			// convert to rgb
			$colour = $color;
			if (strlen($colour) == 6) {
				list($r, $g, $b) = array($colour[0] . $colour[1], $colour[2] . $colour[3], $colour[4] . $colour[5]);
			} elseif (strlen($colour) == 3) {
				list($r, $g, $b) = array($colour[0] . $colour[0], $colour[1] . $colour[1], $colour[2] . $colour[2]);
			} else {
				return false;
			}
			$r = hexdec($r);
			$g = hexdec($g);
			$b = hexdec($b);
			return 'rgba(' . join(
				',',
				array(
					'r' => $r,
					'g' => $g,
					'b' => $b,
					'a' => $alpha,
				)
			) . ')';
		}

		return false;
	}
}



if (! function_exists('onepress_custom_inline_style')) {
	/**
	 * Add custom css to header
	 *
	 * @change 1.1.5
	 */
	function onepress_custom_inline_style()
	{

		$logo_height = absint(get_theme_mod('onepress_logo_height'));
		$logo_tran_height = absint(get_theme_mod('onepress_transparent_logo_height'));
		$submenu_width = absint(get_theme_mod('onepress_submenu_width'));

		/**
		 *  Custom hero section css
		 */
		$hero_bg_color = onepress_hex_to_rgba(get_theme_mod('onepress_hero_overlay_color', '#000000'), .3);

		// Deprecate form v 1.1.5
		$hero_bg_color = onepress_hex_to_rgba($hero_bg_color, floatval(get_theme_mod('onepress_hero_overlay_opacity', .3)));

		ob_start();

		if ($logo_height > 0) {
			echo ".site-logo-div img{ height: {$logo_height}px; width: auto; }"; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped
		}

		if ($logo_tran_height) {
			echo ".site-logo-div img.custom-logo-transparent{ height: {$logo_tran_height}px; width: auto; }"; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped
		}

		$t_site_name_color = sanitize_hex_color(get_theme_mod('onepress_transparent_site_title_c'));
		if ($t_site_name_color) {
			echo "#page .is-transparent .site-header.no-scroll .site-title, #page .is-transparent .site-header.no-scroll .site-title .site-text-logo { color: {$t_site_name_color}; }"; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		$t_tagline_color = sanitize_hex_color(get_theme_mod('onepress_transparent_tag_title_c'));
		if ($t_tagline_color) {
			echo "#page .is-transparent .site-header.no-scroll .site-description { color: {$t_tagline_color}; }"; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped
		}

		if ($submenu_width) {
			echo ".onepress-menu ul {max-width: {$submenu_width}px;}"; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped
		}

			?>
			#main .video-section section.hero-slideshow-wrapper {
			background: transparent;
			}
			.hero-slideshow-wrapper:after {
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			background-color: <?php echo $hero_bg_color; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped 
												?>;
			display: block;
			content: "";
			}
			#parallax-hero .jarallax-container .parallax-bg:before{
			background-color: <?php echo $hero_bg_color; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped 
												?>;
			}
			.body-desktop .parallax-hero .hero-slideshow-wrapper:after {
			display: none !important;
			}
			#parallax-hero > .parallax-bg::before {
			background-color: <?php echo $hero_bg_color; // phpcs:ignore 	WordPress.Security.EscapeOutput.OutputNotEscaped 
												?>;
			opacity: 1;
			}
			.body-desktop .parallax-hero .hero-slideshow-wrapper:after {
			display: none !important;
			}

			<?php
			/**
			 * Theme Color
			 */
			$primary = sanitize_hex_color_no_hash(get_theme_mod('onepress_primary_color'));
			if ($primary != '') { ?>
				a, .screen-reader-text:hover, .screen-reader-text:active, .screen-reader-text:focus, .header-social a, .onepress-menu a:hover,
				.onepress-menu ul li a:hover, .onepress-menu li.onepress-current-item > a, .onepress-menu ul li.current-menu-item > a, .onepress-menu > li a.menu-actived,
				.onepress-menu.onepress-menu-mobile li.onepress-current-item > a, .site-footer a, .site-footer .footer-social a:hover, .site-footer .btt a:hover,
				.highlight, #comments .comment .comment-wrapper .comment-meta .comment-time:hover, #comments .comment .comment-wrapper .comment-meta .comment-reply-link:hover, #comments .comment .comment-wrapper .comment-meta .comment-edit-link:hover,
				.btn-theme-primary-outline, .sidebar .widget a:hover, .section-services .service-item .service-image i, .counter_item .counter__number,
				.team-member .member-thumb .member-profile a:hover, .icon-background-default
				{
				color: #<?php echo $primary;  // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
								?>;
				}
				input[type="reset"], input[type="submit"], input[type="submit"], input[type="reset"]:hover, input[type="submit"]:hover, input[type="submit"]:hover .nav-links a:hover, .btn-theme-primary, .btn-theme-primary-outline:hover, .section-testimonials .card-theme-primary,
				.woocommerce #respond input#submit, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button, .woocommerce button.button.alt,
				.pirate-forms-submit-button, .pirate-forms-submit-button:hover, input[type="reset"], input[type="submit"], input[type="submit"], .pirate-forms-submit-button,
				.contact-form div.wpforms-container-full .wpforms-form .wpforms-submit,
				.contact-form div.wpforms-container-full .wpforms-form .wpforms-submit:hover,
				.nav-links a:hover, .nav-links a.current,
				.nav-links .page-numbers:hover,
				.nav-links .page-numbers.current
				{
				background: #<?php echo $primary; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
											?>;
				}
				.btn-theme-primary-outline, .btn-theme-primary-outline:hover, .pricing__item:hover, .section-testimonials .card-theme-primary, .entry-content blockquote
				{
				border-color : #<?php echo $primary; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
												?>;
				}
				<?php
				if (class_exists('WooCommerce')) { ?>
					.woocommerce #respond input#submit.alt,
					.woocommerce a.button.alt,
					.woocommerce button.button.alt,
					.woocommerce input.button.alt {
					background-color: #<?php echo $primary; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
															?>;
					}
					.woocommerce #respond input#submit.alt:hover,
					.woocommerce a.button.alt:hover,
					.woocommerce button.button.alt:hover,
					.woocommerce input.button.alt:hover {
					background-color: #<?php echo $primary; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
															?>;
					}
				<?php }
			} // End $primary

			/**
			 * Theme Secondary Color
			 *
			 * @since 2.2.1
			 */
			$secondary_color = sanitize_hex_color_no_hash(get_theme_mod('onepress_secondary_color'));
			if ('' != $secondary_color) {
				echo ".feature-item:hover .icon-background-default{ color: #{$secondary_color}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			$menu_padding = get_theme_mod('onepress_menu_item_padding');
			if ($menu_padding) {
				$menu_padding = absint($menu_padding);
				echo ".onepress-menu a{ padding-left: {$menu_padding}px; padding-right: {$menu_padding}px;  }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			$cover_align = sanitize_text_field(get_theme_mod('onepress_page_cover_align'));
			switch ($cover_align) {
				case 'left':
				case 'right':
					echo ".page-header.page--cover{ text-align: {$cover_align}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					break;
			}

			$normal_title_align = sanitize_text_field(get_theme_mod('onepress_page_normal_align'));
			if ('' != $normal_title_align && in_array($normal_title_align, array('left', 'right', 'center'))) {
				echo ".page-header:not(.page--cover){ text-align: {$normal_title_align}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			$cover_color = onepress_sanitize_color_alpha(get_theme_mod('onepress_page_cover_color'));
			if ($cover_color) {
				echo " .page-header.page--cover .entry-title { color: {$cover_color}; } .page-header .entry-title { color: {$cover_color}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			$cover_overlay = onepress_sanitize_color_alpha(get_theme_mod('onepress_page_cover_overlay'));
			if ($cover_overlay) {
				echo ".page-header.page--cover:before { background: {$cover_overlay}; } .page-header:before { background: {$cover_overlay}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			$cover_pd_top = absint(get_theme_mod('onepress_page_cover_pd_top'));
			if ($cover_pd_top > 0) {
				echo ".page-header.page--cover { padding-top: {$cover_pd_top}%; } .page-header { padding-top: {$cover_pd_top}%; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			$cover_pd_bottom = absint(get_theme_mod('onepress_page_cover_pd_bottom'));
			if ($cover_pd_bottom > 0) {
				echo ".page-header.page--cover { padding-bottom: {$cover_pd_bottom}%; } .page-header { padding-bottom: {$cover_pd_bottom}%; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			/**
			 * Header background
			 */
			$header_bg_color = sanitize_hex_color_no_hash(get_theme_mod('onepress_header_bg_color'));
			if ($header_bg_color) {
				?>
				.site-header, .is-transparent .site-header.header-fixed {
				background: #<?php echo $header_bg_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
											?>;
				border-bottom: 0px none;
				}
			<?php
			} // END $header_bg_color

			/**
			 * Menu color
			 */
			$menu_color = sanitize_hex_color_no_hash(get_theme_mod('onepress_menu_color'));
			if ($menu_color) {
			?>
				.onepress-menu > li > a {
				color: #<?php echo $menu_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
								?>;
				}
			<?php
			} // END $menu_color

			/**
			 * Menu hover color
			 */
			$menu_hover_color = sanitize_hex_color_no_hash(get_theme_mod('onepress_menu_hover_color'));
			if ($menu_hover_color) {
			?>
				.onepress-menu > li > a:hover,
				.onepress-menu > li.onepress-current-item > a{
				color: #<?php echo $menu_hover_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
								?>;
				-webkit-transition: all 0.5s ease-in-out;
				-moz-transition: all 0.5s ease-in-out;
				-o-transition: all 0.5s ease-in-out;
				transition: all 0.5s ease-in-out;
				}
			<?php
			} // END $menu_hover_color

			/**
			 * Menu hover background color
			 */
			$menu_hover_bg = sanitize_hex_color_no_hash(get_theme_mod('onepress_menu_hover_bg_color'));
			if ($menu_hover_bg) {
			?>
				@media screen and (min-width: 1140px) {
				.onepress-menu > li:last-child > a {
				padding-right: 17px;
				}
				.onepress-menu > li > a:hover,
				.onepress-menu > li.onepress-current-item > a
				{
				background: #<?php echo $menu_hover_bg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
											?>;
				-webkit-transition: all 0.5s ease-in-out;
				-moz-transition: all 0.5s ease-in-out;
				-o-transition: all 0.5s ease-in-out;
				transition: all 0.5s ease-in-out;
				}
				}
			<?php
			} // END $menu_hover_bg

			/**
			 * Reponsive Mobie button color
			 */
			$menu_button_color = sanitize_hex_color_no_hash(get_theme_mod('onepress_menu_toggle_button_color'));
			if ($menu_button_color) {
			?>
				#nav-toggle span, #nav-toggle span::before, #nav-toggle span::after,
				#nav-toggle.nav-is-visible span::before, #nav-toggle.nav-is-visible span::after {
				background: #<?php echo $menu_button_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
											?>;
				}
			<?php
			}

			/**
			 * Site Title
			 */
			$onepress_logo_text_color = sanitize_hex_color_no_hash(get_theme_mod('onepress_logo_text_color'));
			if ($onepress_logo_text_color) {
			?>
				#page .site-branding .site-title, #page .site-branding .site-text-logo {
				color: #<?php echo $onepress_logo_text_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
								?>;
				}
			<?php
			}
			$onepress_site_tagline_color = sanitize_hex_color_no_hash(get_theme_mod('onepress_tagline_text_color'));
			if ($onepress_site_tagline_color) {
				echo "#page .site-branding .site-description { color: #{$onepress_site_tagline_color};  } "; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			$r_text = sanitize_hex_color(get_theme_mod('onepress_hcl1_r_color'));
			$r_bg_text = sanitize_hex_color(get_theme_mod('onepress_hcl1_r_bg_color'));
			if ($r_text) {
			?>
				.hero-content-style1 .morphext {
				color: <?php echo $r_text; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
								?>;
				}
			<?php
			}
			if ($r_bg_text) {
			?>
				.hero-content-style1 .morphext {
				background: <?php echo $r_bg_text; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
										?>;
				padding: 0px 20px;
				text-shadow: none;
				border-radius: 3px;
				}
			<?php
			}

			$onepress_footer_bg = sanitize_hex_color_no_hash(get_theme_mod('onepress_footer_bg'));
			$footer_top_text = sanitize_hex_color(get_theme_mod('onepress_footer_top_color'));
			if ($onepress_footer_bg) {
			?>
				.site-footer {
				background-color: #<?php echo $onepress_footer_bg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
														?>;
				}
				.site-footer .footer-connect .follow-heading, .site-footer .footer-social a {
				color: <?php echo ($footer_top_text) ? $footer_top_text : 'rgba(255, 255, 255, 0.9)'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
								?>;
				}
			<?php
			} elseif ($footer_top_text) {
			?>
				.site-footer .footer-connect .follow-heading, .site-footer .footer-social a {
				color: <?php echo $footer_top_text; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
								?>;
				}
			<?php
			}

			$onepress_footer_info_bg = sanitize_hex_color_no_hash(get_theme_mod('onepress_footer_info_bg'));
			$c_color = sanitize_hex_color(get_theme_mod('onepress_footer_c_color'));
			$c_link_color = sanitize_hex_color(get_theme_mod('onepress_footer_c_link_color'));
			$c_link_hover_color = sanitize_hex_color(get_theme_mod('onepress_footer_c_link_hover_color'));
			if ($onepress_footer_info_bg) {
			?>
				.site-footer .site-info, .site-footer .btt a{
				background-color: #<?php echo $onepress_footer_info_bg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
														?>;

				}
				<?php if ($c_color) { ?>
					.site-footer .site-info {
					color: <?php echo $c_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
									?>;
					}
					.site-footer .btt a, .site-footer .site-info a {
					color: <?php echo $c_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
									?>;
					}
				<?php
				} else {
				?>
					.site-footer .site-info {
					color: rgba(255, 255, 255, 0.7);
					}
					.site-footer .btt a, .site-footer .site-info a {
					color: rgba(255, 255, 255, 0.9);
					}
				<?php
				}
			} elseif ($c_color) {
				?>
				.site-footer .site-info {
				color: <?php echo $c_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
								?>;
				}

			<?php
			}
			if ($c_link_color) {
			?>
				.site-footer .btt a, .site-footer .site-info a {
				color: <?php echo $c_link_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
								?>;
				}
			<?php
			}
			if ($c_link_hover_color) {
			?>
				.site-footer .btt a:hover, .site-footer .site-info a:hover {
				color: <?php echo $c_link_hover_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
								?>;
				}
			<?php
			}

			$footer_widgets_color = sanitize_hex_color(get_theme_mod('footer_widgets_color'));
			$footer_widgets_bg_color = sanitize_hex_color(get_theme_mod('footer_widgets_bg_color'));
			$footer_widgets_title_color = sanitize_hex_color(get_theme_mod('footer_widgets_title_color'));
			$footer_widgets_link_color = sanitize_hex_color(get_theme_mod('footer_widgets_link_color'));
			$footer_widgets_link_hover_color = sanitize_hex_color(get_theme_mod('footer_widgets_link_hover_color'));

			?>
			#footer-widgets {
			<?php
			if ($footer_widgets_color) {
				echo "color: {$footer_widgets_color};"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
			}
			if ($footer_widgets_bg_color) {
				echo "background-color: {$footer_widgets_bg_color};"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
			}
			?>
			}
			<?php
			if ($footer_widgets_title_color) {
				echo "#footer-widgets .widget-title{ color: {$footer_widgets_title_color}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
			}

			if ($footer_widgets_link_color) {
				echo "#footer-widgets .sidebar .widget a{ color: {$footer_widgets_link_color}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
			}

			if ($footer_widgets_link_hover_color) {
				echo "#footer-widgets .sidebar .widget a:hover{ color: {$footer_widgets_link_hover_color}; }"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
			}

			$gallery_spacing = absint(get_theme_mod('onepress_g_spacing', 20));

			?>
			.gallery-carousel .g-item{
			padding: 0px <?php echo intval($gallery_spacing / 2); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
										?>px;
			}
			.gallery-carousel-wrap {
			margin-left: -<?php echo intval($gallery_spacing / 2); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
										?>px;
			margin-right: -<?php echo intval($gallery_spacing / 2); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
											?>px;
			}
			.gallery-grid .g-item, .gallery-masonry .g-item .inner {
			padding: <?php echo intval($gallery_spacing / 2); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
								?>px;
			}
			.gallery-grid-wrap, .gallery-masonry-wrap{
			margin-left: -<?php echo intval($gallery_spacing / 2); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
										?>px;
			margin-right: -<?php echo intval($gallery_spacing / 2); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
											?>px;
			}
			.gallery-justified-wrap {
			margin-left: -<?php echo intval($gallery_spacing); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
										?>px;
			margin-right: -<?php echo intval($gallery_spacing); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
											?>px;
			}
			<?php
			$content_width = absint(get_theme_mod('single_layout_content_width'));
			if ($content_width > 0) {
				$value = $content_width . 'px';
				echo '.single-post .site-main, .single-post .entry-content > * { max-width: ' . $value . '; }'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
			}

			$css = ob_get_clean();

			if (trim($css) == '') {
				return;
			}

			$css = apply_filters('onepress_custom_css', $css);

			if (! is_customize_preview()) {

				$css = preg_replace(
					array(
						// Remove comment(s)
						'#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
						// Remove unused white-space(s)
						'#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~+]|\s*+-(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
					),
					array(
						'$1',
						'$1$2$3$4$5$6$7',
					),
					$css
				);
			}

			if (! function_exists('wp_get_custom_css')) {  // Back-compat for WordPress < 4.7.
				$custom = get_option('onepress_custom_css');
				if ($custom) {
					$css .= "\n/* --- Begin custom CSS --- */\n" . $custom . "\n/* --- End custom CSS --- */\n";
				}
			}
			return wp_strip_all_tags($css);
		}
	}


	if (function_exists('wp_update_custom_css_post')) {
		// Migrate any existing theme CSS to the core option added in WordPress 4.7.
		$css = get_option('onepress_custom_css');
		if ($css) {
			$core_css = wp_get_custom_css(); // Preserve any CSS already added to the core option.
			$return = wp_update_custom_css_post($core_css . "\n" . $css);
			if (! is_wp_error($return)) {
				// Remove the old theme_mod, so that the CSS is stored in only one place moving forward.
				delete_option('onepress_custom_css');
			}
		}
	} else {
		// Back-compat for WordPress < 4.7.
	}

	if (! function_exists('onepress_get_section_about_data')) {
		/**
		 * Get About data
		 *
		 * @return array
		 */
		function onepress_get_section_about_data()
		{
			$boxes = get_theme_mod('onepress_about_boxes');
			if (is_string($boxes)) {
				$boxes = json_decode($boxes, true);
			}
			$page_ids = array();
			if (! empty($boxes) && is_array($boxes)) {
				foreach ($boxes as $k => $v) {
					if (isset($v['content_page'])) {
						$v['content_page'] = absint($v['content_page']);
						if ($v['content_page'] > 0) {
							$page_ids[] = wp_parse_args(
								$v,
								array(
									'enable_link' => 0,
									'hide_title' => 0,
								)
							);
						}
					}
				}
			}
			$page_ids = array_filter($page_ids);

			return $page_ids;
		}
	}

	if (! function_exists('onepress_get_section_counter_data')) {
		/**
		 * Get counter data
		 *
		 * @return array
		 */
		function onepress_get_section_counter_data()
		{
			$boxes = get_theme_mod('onepress_counter_boxes');
			if (is_string($boxes)) {
				$boxes = json_decode($boxes, true);
			}
			if (empty($boxes) || ! is_array($boxes)) {
				$boxes = array();
			}
			return $boxes;
		}
	}

	if (! function_exists('onepress_get_section_services_data')) {
		/**
		 * Get services data
		 *
		 * @return array
		 */
		function onepress_get_section_services_data()
		{
			$services = get_theme_mod('onepress_services');
			if (is_string($services)) {
				$services = json_decode($services, true);
			}
			$page_ids = array();
			if (! empty($services) && is_array($services)) {
				foreach ($services as $k => $v) {
					if (isset($v['content_page'])) {
						$v['content_page'] = absint($v['content_page']);
						if ($v['content_page'] > 0) {
							$page_ids[] = wp_parse_args(
								$v,
								array(
									'icon_type' => 'icon',
									'image' => '',
									'icon' => 'gg',
									'enable_link' => 0,
								)
							);
						}
					}
				}
			}
			// if still empty data then get some page for demo
			return $page_ids;
		}
	}

	if (! function_exists('onepress_get_section_team_data')) {
		/**
		 * Get team members
		 *
		 * @return array
		 */
		function onepress_get_section_team_data()
		{
			$members = get_theme_mod('onepress_team_members');
			if (is_string($members)) {
				$members = json_decode($members, true);
			}
			if (! is_array($members)) {
				$members = array();
			}
			return $members;
		}
	}

	if (! function_exists('onepress_get_features_data')) {
		/**
		 * Get features data
		 *
		 * @since 1.1.4
		 * @return array
		 */
		function onepress_get_features_data()
		{
			$array = get_theme_mod('onepress_features_boxes');
			if (is_string($array)) {
				$array = json_decode($array, true);
			}
			if (! empty($array) && is_array($array)) {
				foreach ($array as $k => $v) {
					$array[$k] = wp_parse_args(
						$v,
						array(
							'icon' => 'gg',
							'title' => '',
							'desc' => '',
							'link' => '',
						)
					);

					// Get/Set social icons
					$array[$k]['icon'] = trim($array[$k]['icon']);
					if ($array[$k]['icon'] != '' && strpos($array[$k]['icon'], 'fa') !== 0) {
						$array[$k]['icon'] = 'fa-' . $array[$k]['icon'];
					}
				}
			}
			return $array;
		}
	}

	if (! function_exists('onepress_get_social_profiles')) {
		/**
		 * Get social profiles
		 *
		 * @since 1.1.4
		 * @return bool|array
		 */
		function onepress_get_social_profiles()
		{
			$array = get_theme_mod('onepress_social_profiles', []);
			if (is_string($array)) {
				$array = json_decode($array, true);
			}
			if (! is_array($array)) {
				$array = [];
			}
			$html = '';
			if (! empty($array) && is_array($array)) {
				foreach ($array as $k => $v) {
					$array[$k] = wp_parse_args(
						$v,
						array(
							'network' => '',
							'icon' => '',
							'link' => '',
						)
					);

					// Get/Set social icons
					// If icon isset
					$icons = array();
					$array[$k]['icon'] = trim($array[$k]['icon']);

					if ($array[$k]['icon'] != '' && strpos($array[$k]['icon'], 'fa') !== 0) {
						$icons[$array[$k]['icon']] = 'fa-' . $array[$k]['icon'];
					} else {
						$icons[$array[$k]['icon']] = $array[$k]['icon'];
					}

					$network = ($array[$k]['network']) ? sanitize_title($array[$k]['network']) : false;
					if ($network && ! $array[$k]['icon']) {
						$icons['fa-' . $network] = 'fa-' . $network;
					}

					$array[$k]['icon'] = join(' ', $icons);
				}
			}

			foreach ((array) $array as $s) {
				if ($s && $s['icon'] != '') {
					$html .= '<a target="_blank" href="' . $s['link'] . '" title="' . esc_attr($s['network']) . '"><i class="fa ' . esc_attr($s['icon']) . '"></i></a>';
				}
			}

			return $html;
		}
	}

	if (! function_exists('onepress_get_gallery_image_ids')) {
		/**
		 * Get Gallery image ids from page content
		 *
		 * @since unknown
		 * @since 2.2.1
		 *
		 * @return array
		 */
		function onepress_get_gallery_image_ids($page_id)
		{
			$images = array();
			$gallery = get_post_gallery($page_id, false);
			if ($gallery) {
				$images = $gallery['ids'];
			} else {
				$post = get_post($page_id);
				$post_content = $post->post_content;
				if ('' != $post_content) {
					$ids = array();
					preg_match_all('#data-id=([\'"])(.+?)\1#is', $post_content, $image_ids, PREG_SET_ORDER);
					if (is_array($image_ids) && ! empty($image_ids)) {
						foreach ($image_ids as $img_id) {
							if (isset($img_id[2]) && is_numeric($img_id[2]) && wp_attachment_is_image($img_id[2])) {
								$ids[] = $img_id[2];
							}
						}
					}
					wp_reset_postdata();
					if (! empty($ids)) {
						$images = $ids;
					}
				}
			}
			return $images;
		}
	}

	if (! function_exists('onepress_get_gallery_image_ids_by_urls')) {
		/**
		 * Get Gallery image ids by urls from page content
		 *
		 * @since 2.2.1
		 * @param int $page_id
		 * @return array
		 */
		function onepress_get_gallery_image_ids_by_urls($page_id)
		{
			$images = array();
			$post = get_post($page_id);
			$post_content = $post->post_content;
			if ('' != $post_content) {
				$urls = array();
				preg_match_all('#src=([\'"])(.+?)\1#is', $post_content, $image_urls, PREG_SET_ORDER);
				if (is_array($image_urls) && ! empty($image_urls)) {
					foreach ($image_urls as $img_url) {
						if (isset($img_url[2])) {
							$urls[] = $img_url[2];
						}
					}
				}
				wp_reset_postdata();
				if (! empty($urls)) {
					$images = $urls;
				}
			}
			return $images;
		}
	}

	if (! function_exists('onepress_get_section_gallery_data')) {
		/**
		 * Get Gallery data
		 *
		 * @since 1.2.6
		 * @since 2.2.1
		 *
		 * @return array
		 */
		function onepress_get_section_gallery_data()
		{
			$source = 'page';
			if (has_filter('onepress_get_section_gallery_data')) {
				$data = apply_filters('onepress_get_section_gallery_data', false);
				if ($data) {
					return $data;
				}
			}

			$data = array();
			switch ($source) {
				default:
					$page_id = get_theme_mod('onepress_gallery_source_page');
					$images = '';
					$found_gallery = false;
					if ($page_id) {
						$images = onepress_get_gallery_image_ids($page_id);
					}

					$display_type = get_theme_mod('onepress_gallery_display', 'grid');
					if ('masonry' == $display_type || 'justified' == $display_type) {
						$size = 'large';
					} else {
						$size = 'onepress-small';
					}

					$image_thumb_size = apply_filters('onepress_gallery_page_img_size', $size);

					if (! empty($images)) {
						if (! is_array($images)) {
							$images = explode(',', $images);
						}

						$found_gallery = true;

						foreach ($images as $img_id) {
							$post = get_post($img_id);
							if ($post) {
								$img_thumb = wp_get_attachment_image_src($img_id, $image_thumb_size);
								$img_full = wp_get_attachment_image_src($img_id, 'full');
								$alt = get_post_meta($img_id, '_wp_attachment_image_alt', true);

								if ($img_thumb && $img_full) {
									$data[$img_id] = array(
										'id'        => $img_id,
										'thumbnail' => $img_thumb[0],
										'thumb_w'   => $img_thumb[1],
										'thumb_h'   => $img_thumb[2],
										'full'      => $img_full[0],
										'full_w'    => $img_full[1],
										'full_h'    => $img_full[2],
										'title'     => $post->post_title,
										'content'   => $post->post_content,
										'alt'       => $alt,
									);
								}
							}
						}
					} else {
						if ($page_id) {
							$gallery_image_urls = onepress_get_gallery_image_ids_by_urls($page_id);
							if (! empty($gallery_image_urls)) {
								$found_gallery = true;
							}
							foreach ($gallery_image_urls as $key => $value) {

								$img_id = attachment_url_to_postid($value);
								$content = '';
								$title = '';
								$alt = '';
								$thumbnail = $value;
								$full = $value;
								if ($img_id) {
									$post = get_post($img_id);
									if ($post) {
										$content = $post->post_title;
										$title = $post->post_content;
										$alt = get_post_meta($img_id, '_wp_attachment_image_alt', true);
										$img_thumb = wp_get_attachment_image_src($img_id, $image_thumb_size);
										if ($img_thumb) {
											$thumbnail = $img_thumb[0];
										}
										$img_full = wp_get_attachment_image_src($img_id, 'full');
										if ($img_full) {
											$full = $img_full[0];
										}
									}
								}

								$data[$key] = array(
									'id'        => $img_id,
									'thumbnail' => $thumbnail,
									'full'      => $full,
									'title'     => $title,
									'content'   => $content,
									'alt'       => $alt,
								);
							}
						}
					} // End if check gallery.

					if (! $found_gallery && $page_id) {
						$post = get_post($page_id);
						return apply_filters('the_content',  $post->post_content);
					}

					break;
			}

			return $data;
		}
	}

	/**
	 * Generate HTML content for gallery items.
	 *
	 * @since 1.2.6
	 *
	 * @param $data
	 * @param bool|true $inner
	 * @return string
	 */
	function onepress_gallery_html($data, $inner = true, $size = 'thumbnail')
	{
		$max_item = get_theme_mod('onepress_g_number', 10);
		$enable_image_link = get_theme_mod('onepress_g_image_link', 1);
		$html = '';
		if (! is_array($data)) {
			return $html;
		}
		$n = count($data);
		if ($max_item > $n) {
			$max_item = $n;
		}
		$i = 0;
		while ($i < $max_item) {
			$photo = current($data);
			$i++;
			if ($size == 'full') {
				$thumb = $photo['full'];
			} else {
				$thumb = $photo['thumbnail'];
			}

			$title = wp_strip_all_tags($photo['title']);
			$alt = '';
			if (isset($photo['alt'])) {
				$alt = $photo['alt'];
			}
			if (! $alt) {
				$alt = $title;
			}

			$open_tag_html = '<div data-src="' . esc_attr($photo['full']) . '" class="g-item" title="' . esc_attr($title) . '">';
			$close_tag_html = '</div>';
			if ($enable_image_link) {
				$open_tag_html = '<a href="' . esc_attr($photo['full']) . '" class="g-item" title="' . esc_attr($title) . '">';
				$close_tag_html = '</a>';
			}

			$html .= $open_tag_html;
			if ($inner) {
				$html .= '<span class="inner">';
				$html .= '<span class="inner-content">';
				$html .= '<img src="' . esc_url($thumb) . '" alt="' . esc_attr($alt) . '">';
				$html .= '</span>';
				$html .= '</span>';
			} else {
				$html .= '<img src="' . esc_url($thumb) . '" alt="">';
			}

			$html .= $close_tag_html;

			next($data);
		}
		reset($data);

		return $html;
	}


	/**
	 * Generate Gallery HTML
	 *
	 * @since 1.2.6
	 * @param bool|true $echo
	 * @return string
	 */
	function onepress_gallery_generate($echo = true)
	{

		$div = '';

		$data = onepress_get_section_gallery_data();
		if ($data && is_string($data)) {
			if ($echo) {
				echo wp_kses_post($data);
				return;
			} else {
				return $data;
			}
		}

		$display_type = get_theme_mod('onepress_gallery_display', 'grid');
		$lightbox = get_theme_mod('onepress_g_lightbox', 1);
		$class = '';
		if ($lightbox) {
			$class = ' enable-lightbox ';
		}
		$col = absint(get_theme_mod('onepress_g_col', 4));
		if ($col <= 0) {
			$col = 4;
		}

		switch ($display_type) {
			case 'masonry':
				$html = onepress_gallery_html($data);
				if ($html) {
					$div .= '<div class="gallery-masonry-wrap  gallery-grid-wrap">';
					$div .= '<div data-col="' . $col . '" class="g-zoom-in gallery-masonry ' . $class . ' gallery-grid g-col-' . $col . '">';
					$div .= $html;
					$div .= '</div>';
					$div .= '</div>';
				}
				break;
			case 'carousel':
				$html = onepress_gallery_html($data);
				if ($html) {
					$div .= '<div class="gallery-carousel-wrap">';
					$div .= '<div data-col="' . $col . '" class="g-zoom-in gallery-carousel owl-theme owl-carousel owl-carousel' . $class . '">';
					$div .= $html;
					$div .= '</div>';
					$div .= '</div>';
				}
				break;
			case 'slider':
				$html = onepress_gallery_html($data, true, 'full');
				if ($html) {
					$div .= '<div class="gallery-slider owl-theme owl-carousel owl-carousel' . $class . '">';
					$div .= $html;
					$div .= '</div>';
				}
				break;
			case 'justified':
				$html = onepress_gallery_html($data, false);
				if ($html) {
					$gallery_spacing = absint(get_theme_mod('onepress_g_spacing', 20));
					$row_height = absint(get_theme_mod('onepress_g_row_height', 120));
					$div .= '<div class="gallery-justified-wrap">';
					$div .= '<div data-row-height="' . $row_height . '" data-spacing="' . $gallery_spacing . '" class="g-zoom-in gallery-justified' . $class . '">';
					$div .= $html;
					$div .= '</div>';
					$div .= '</div>';
				}
				break;
			default: // grid
				$html = onepress_gallery_html($data);
				if ($html) {
					$div .= '<div class="gallery-grid-wrap">';
					$div .= '<div class="gallery-grid g-zoom-in ' . $class . ' g-col-' . $col . '">';
					$div .= $html;
					$div .= '</div>';
					$div .= '</div>';
				}
				break;
		}

		if ($echo) {
			echo wp_kses_post($div);
		} else {
			return $div;
		}
	}



	if (! function_exists('onepress_footer_site_info')) {
		/**
		 * Add Copyright and Credit text to footer
		 *
		 * @since 1.1.3
		 */
		function onepress_footer_site_info()
		{
			?>
			<?php printf(

				esc_html__('Copyright %1$s %2$s %3$s', 'onepress'),
				'&copy;',
				esc_attr(gmdate('Y')),
				esc_attr(get_bloginfo())
			); ?>
			<span class="sep"> &ndash; </span>
			<?php printf(
				/* translators: 1: themename, 2: author */
				esc_html__('%1$s theme by %2$s', 'onepress'),
				'<a href="' . esc_url('https://www.famethemes.com/themes/onepress', 'onepress') . '">OnePress</a>',
				'FameThemes'
			); ?>
		<?php
		}
	}
	add_action('onepress_footer_site_info', 'onepress_footer_site_info');


	/**
	 * Breadcrumb NavXT Compatibility.
	 */
	function onepress_breadcrumb($post_id = null)
	{
		// Test your schema at: https://search.google.com/test/rich-results.
		if (! $post_id) {
			if (is_page()) {
				$post_id = get_the_ID();
			}
		}
		if ($post_id) {
			if (get_post_meta($post_id, '_hide_breadcrumb', true)) {
				return;
			}
		}
		if (function_exists('bcn_display')) {
		?>
			<div class="breadcrumbs">
				<div class="container">
					<?php bcn_display(); ?>
				</div>
			</div>
		<?php
		} else if (function_exists('yoast_breadcrumb')) {
		?>
			<div class="breadcrumbs">
				<div class="container">
					<?php yoast_breadcrumb(); ?>
				</div>
			</div>
			<?php
		}
	}

	if (! function_exists('onepress_is_selective_refresh')) {
		function onepress_is_selective_refresh()
		{
			return isset($GLOBALS['onepress_is_selective_refresh']) && $GLOBALS['onepress_is_selective_refresh'] ? true : false;
		}
	}

	if (! function_exists('onepress_footer_widgets')) {
		function onepress_footer_widgets()
		{
			$footer_columns = absint(get_theme_mod('footer_layout', 4));
			$max_cols = 12;
			$layouts = 12;
			if ($footer_columns > 1) {
				$default = '12';
				switch ($footer_columns) {
					case 4:
						$default = '3+3+3+3';
						break;
					case 3:
						$default = '4+4+4';
						break;
					case 2:
						$default = '6+6';
						break;
				}
				$layouts = sanitize_text_field(get_theme_mod('footer_custom_' . $footer_columns . '_columns', $default));
			}

			$layouts = explode('+', $layouts);
			foreach ($layouts as $k => $v) {
				$v = absint(trim($v));
				$v = $v >= $max_cols ? $max_cols : $v;
				$layouts[$k] = $v;
			}

			$have_widgets = false;

			for ($count = 0; $count < $footer_columns; $count++) {
				$id = 'footer-' . ($count + 1);
				if (is_active_sidebar($id)) {
					$have_widgets = true;
				}
			}

			if ($footer_columns > 0 && $have_widgets) { ?>
				<div id="footer-widgets" class="footer-widgets section-padding ">
					<div class="container">
						<div class="row">
							<?php
							for ($count = 0; $count < $footer_columns; $count++) {
								$col = isset($layouts[$count]) ? $layouts[$count] : '';
								$id = 'footer-' . ($count + 1);
								if ($col) {
							?>
									<div id="footer-<?php echo esc_attr($count + 1); ?>" class="col-md-<?php echo esc_attr($col); ?> col-sm-12 footer-column widget-area sidebar" role="complementary">
										<?php dynamic_sidebar($id); ?>
									</div>
							<?php
								}
							}
							?>
						</div>
					</div>
				</div>
			<?php } ?>
		<?php
		}
	}

	add_action('onepress_before_site_info', 'onepress_footer_widgets', 15);

	if (! function_exists('onepress_display_page_title')) {
		/**
		 * Display page header
		 *
		 * @since 2.0.0
		 */
		function onepress_display_page_title()
		{
			if (get_theme_mod('onepress_page_title_bar_disable') == 1) {
				return;
			}

			$return = false;

			if (is_home()) {
				$page_id = get_option('page_for_posts');
			} else {
				$page_id = get_the_ID();
			}
			$el = 'h1';
			if (is_singular('post')) {
				if (! apply_filters('onepress_single_show_page_header', false)) {
					return;
				}
				$page_id = get_option('page_for_posts');
				$el = 'h2';
			}

			$apply_shop = false;
			$is_single_product = false;

			if (onepress_is_wc_active()) {
				if (is_shop() || is_product_category() || is_product_tag() || is_product() || is_singular('product') || is_product_taxonomy()) {

					$page_id = wc_get_page_id('shop');
					if (is_product()) {
						$el = 'h2';
						$is_single_product = true;
						$apply_shop = get_post_meta($page_id, '_wc_apply_product', true);
					}
					$return = false;

					remove_action('woocommerce_archive_description', 'woocommerce_taxonomy_archive_description', 10);
					remove_action('woocommerce_archive_description', 'woocommerce_product_archive_description', 10);
					add_action('woocommerce_show_page_title', '__return_false', 95);
				}
			}

			if ($return) {
				return;
			}

			$classes = array('page-header');
			$img = '';
			$hide_page_title = get_post_meta($page_id, '_hide_page_title', true);

			if (! $is_single_product || ($apply_shop && $is_single_product)) {
				if (get_post_meta($page_id, '_cover', true)) {
					if (has_post_thumbnail($page_id)) {
						$classes[] = 'page--cover';
						$img = get_the_post_thumbnail_url($page_id, 'full');
					}
					if (onepress_is_transparent_header()) {
						$classes[] = 'is-t-above';
					}
				}
			}

			$excerpt = '';
			if (onepress_is_wc_archive()) {
				$title = get_the_archive_title();
				$excerpt = category_description();

				$term = get_queried_object();
				$thumbnail_id = get_term_meta($term->term_id, 'thumbnail_id', true);
				$t_image = wp_get_attachment_url($thumbnail_id);
				if ($t_image) {
					$img = $t_image;
				}
			} else {
				$title = get_the_title($page_id);
				if (is_tax()) {
					$title = single_term_title('', false);
				}
				if (get_post_meta($page_id, '_show_excerpt', true)) {
					$post = get_post($page_id);
					if ($post->post_excerpt) {
						$excerpt = apply_filters('the_excerpt', get_post_field('post_excerpt', $page_id));
					}
				}
			}
			if (! $apply_shop && $is_single_product) {
				$excerpt = '';
			}

		?>
			<?php if (! $hide_page_title) { ?>
				<div class="<?php echo esc_attr(join(' ', $classes)); ?>" <?php echo ($img) ? ' style="background-image: url(\'' . esc_url($img) . '\')" ' : ''; ?>>
					<div class="container">
						<?php
						// WPCS: XSS OK.
						echo '<' . $el . ' class="entry-title">' . wp_kses($title, onepress_allowed_tags()) . '</' . $el . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped	
						if ($excerpt) {
							echo '<div class="entry-tagline">' . wp_kses_post($excerpt) . '</div>';
						}
						?>
					</div>
				</div>
			<?php } ?>
		<?php
		}
	}

	add_action('onepress_page_before_content', 'onepress_display_page_title');

	if (! function_exists('onepress_load_section')) {
		/**
		 * Load section
		 *
		 * @since 2.0.0
		 * @param $section_id
		 */
		function onepress_load_section($section_id)
		{
			/**
			 * Hook before section
			 */
			do_action('onepress_before_section_' . $section_id);
			if ($section_id != 'hero') {
				do_action('onepress_before_section_part', $section_id);
			}

			get_template_part('section-parts/section', $section_id);

			/**
			 * Hook after section
			 */
			if ($section_id != 'hero') {
				do_action('onepress_after_section_part', $section_id);
			}
			do_action('onepress_after_section_' . $section_id);
		}
	}

	if (! function_exists('onepress_load_hero_section')) {
		function onepress_load_hero_section()
		{
			if (is_page_template('template-frontpage.php')) {
				onepress_load_section('hero');
			}
		}
	}

	add_action('onepress_header_end', 'onepress_load_hero_section');

	if (! function_exists('onepress_subscribe_form')) {
		/**
		 * Display subscribe form
		 *
		 * @since 2.0.0
		 */
		function onepress_subscribe_form()
		{
			$onepress_newsletter_title =  get_theme_mod('onepress_newsletter_title', __('Join our Newsletter', 'onepress'));
			$onepress_newsletter_mailchimp = get_theme_mod('onepress_newsletter_mailchimp');
		?>
			<div class="footer-subscribe">
				<?php if ($onepress_newsletter_title != '') {
					echo '<h5 class="follow-heading">' . wp_kses($onepress_newsletter_title, onepress_allowed_tags()) . '</h5>';
				} ?>
				<form novalidate="" target="_blank" class="" name="mc-embedded-subscribe-form" id="mc-embedded-subscribe-form" method="post"
					action="<?php if ($onepress_newsletter_mailchimp != '') {
										echo wp_kses_post($onepress_newsletter_mailchimp);
									}; ?>">
					<input type="text" placeholder="<?php esc_attr_e('Enter your e-mail address', 'onepress'); ?>" id="mce-EMAIL" class="subs_input" name="EMAIL" value="">
					<input type="submit" class="subs-button" value="<?php esc_attr_e('Subscribe', 'onepress'); ?>" name="subscribe">
				</form>
			</div>
		<?php
		}
	}
	if (! function_exists('onepress_footer_social_icons')) {
		function onepress_footer_social_icons()
		{
			$onepress_social_footer_title = get_theme_mod('onepress_social_footer_title', __('Keep Updated', 'onepress'));
		?>
			<div class="footer-social">
				<?php
				if ($onepress_social_footer_title != '') {
					echo '<h5 class="follow-heading">' . wp_kses($onepress_social_footer_title, onepress_allowed_tags()) . '</h5>';
				}

				$socials = onepress_get_social_profiles();
				/**
				 * New social profiles
				 *
				 * @since 1.1.4
				 * @change 1.2.1
				 */
				echo '<div class="footer-social-icons">';
				if ($socials) {
					echo $socials; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				} else {
					/**
					 * Deprecated
					 *
					 * @since 1.1.4
					 */
					$twitter = get_theme_mod('onepress_social_twitter');
					$facebook = get_theme_mod('onepress_social_facebook');
					$google = get_theme_mod('onepress_social_google');
					$instagram = get_theme_mod('onepress_social_instagram');
					$rss = get_theme_mod('onepress_social_rss');

					if ($twitter != '') {
						echo '<a target="_blank" href="' . esc_url($twitter) . '" title="Twitter"><i class="fa fa-twitter"></i></a>';
					}
					if ($facebook != '') {
						echo '<a target="_blank" href="' . esc_url($facebook) . '" title="Facebook"><i class="fa fa-facebook"></i></a>';
					}
					if ($google != '') {
						echo '<a target="_blank" href="' . esc_url($google) . '" title="Google Plus"><i class="fa fa-google-plus"></i></a>';
					}
					if ($instagram != '') {
						echo '<a target="_blank" href="' . esc_url($instagram) . '" title="Instagram"><i class="fa fa-instagram"></i></a>';
					}
					if ($rss != '') {
						echo '<a target="_blank" href="' . esc_url($rss) . '"><i class="fa fa-rss"></i></a>';
					}
				}
				echo '</div>';
				?>
			</div>
		<?php
		}
	}

	function onepress_footer_connect()
	{

		$onepress_newsletter_disable = sanitize_text_field(get_theme_mod('onepress_newsletter_disable', '1'));
		$onepress_social_disable = sanitize_text_field(get_theme_mod('onepress_social_disable', '1'));

		if ($onepress_newsletter_disable != '1' || $onepress_social_disable != '1') : ?>
			<div class="footer-connect">
				<div class="container">
					<div class="row">
						<?php
						if (! $onepress_newsletter_disable && ! $onepress_social_disable) {
							if (! $onepress_newsletter_disable) : ?>
								<div class="col-md-4 offset-md-2 col-sm-6 offset-md-0">
									<?php onepress_subscribe_form(); ?>
								</div>
							<?php endif;

							if (! $onepress_social_disable) : ?>
								<div class="col-md-4 col-sm-6">
									<?php onepress_footer_social_icons(); ?>
								</div>
						<?php endif;
						} else {
							echo ' <div class="col-md-8 offset-md-2 col-sm-12 offset-md-0">';
							if (! $onepress_newsletter_disable) {
								onepress_subscribe_form();
							} else {
								onepress_footer_social_icons();
							}
							echo '</div>';
						}
						?>
					</div>
				</div>
			</div>
	<?php endif;
	}
	add_action('onepress_before_site_info', 'onepress_footer_connect', 25);
