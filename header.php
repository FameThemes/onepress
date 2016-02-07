<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package OnePress
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php do_action( 'onepress_before_site_star' ); ?>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'onepress' ); ?></a>
	<header id="masthead" class="site-header" role="banner">
		<div class="container">
			<div class="site-branding">
				<?php
				$site_text_logo =  get_bloginfo( 'name' );
				$site_image_logo = get_theme_mod( 'onepress_site_image_logo' );
				if ( ( isset($site_text_logo) && $site_text_logo != "" ) || ( isset( $site_image_logo ) && $site_image_logo != "" ) ) {
					if ( isset($site_image_logo) && $site_image_logo != "" ) {
						echo '<a class="site-image-logo" href="' . esc_url( home_url( '/' ) ) . '" rel="home">';
							echo '<img src="' . $site_image_logo . '" alt="' . get_bloginfo('title') . '">';
						echo '</a>';
					} elseif ( isset($site_text_logo) && $site_text_logo != "" ) {
						echo '<a class="site-text-logo" href="' . esc_url( home_url( '/' ) ) . '" rel="home">' . $site_text_logo . '</a>';
					}
				} else {
					if ( is_front_page() && is_home() ) :
						echo '<h1 class="site-title"><a href="' . esc_url( home_url( '/' ) ) . '" rel="home">' . get_bloginfo( 'name' ) . '</a></h1>';
					else :
						echo '<p class="site-title"><a href="' .esc_url( home_url( '/' ) ) . '" rel="home">' . get_bloginfo( 'name' ) . '</a></p>';
					endif;
				}
				?>
			</div><!-- .site-branding -->

			<div class="header-right-wrapper">
				<a href="#0" id="nav-toggle"><?php _e( 'Menu', 'onepress' ); ?><span></span></a>
				<nav id="site-navigation" class="main-navigation" role="navigation">
					<ul class="onepress-menu">
				   	   <?php wp_nav_menu( array('theme_location' => 'primary', 'container' => '', 'items_wrap' => '%3$s' ) ); ?>
				    </ul>
				</nav><!-- #site-navigation -->

			</div>

		</div>
	</header><!-- #masthead -->
