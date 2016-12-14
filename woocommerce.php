<?php
/**
 * The template for displaying all pages WooCommerce page.
 *
 * @package OnePress
 */

get_header();

$is_active_sidebar = is_active_sidebar( 'sidebar-shop' );
$layout = get_theme_mod( 'onepress_layout', 'right-sidebar' );
?>

	<div id="content" class="site-content">

		<div class="page-header">
			<div class="container">
				<h1 class="entry-title"><?php woocommerce_page_title(); ?></h1>
			</div>
		</div>

		<?php echo onepress_breadcrumb(); ?>

		<div id="content-inside" class="container <?php echo ( $is_active_sidebar ) ? esc_attr( $layout ) : 'no-sidebar'; ?>">
			<div id="primary" class="content-area">
				<main id="main" class="site-main" role="main">
					<?php woocommerce_content(); ?>
				</main><!-- #main -->
			</div><!-- #primary -->
            <?php if ( $is_active_sidebar ) { ?>
                <?php if ( $layout != 'no-sidebar' ) { ?>
                    <div id="secondary" class="widget-area sidebar" role="complementary">
                        <?php dynamic_sidebar( 'sidebar-shop' ); ?>
                    </div><!-- #secondary -->
                <?php } ?>

            <?php } ?>
		</div><!--#content-inside -->


	</div><!-- #content -->

<?php get_footer(); ?>
