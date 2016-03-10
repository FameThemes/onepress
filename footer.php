<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package OnePress
 */

    /**
     * Hooked: onepress_site_footer
     *
     * @see onepress_site_footer
     */
    do_action( 'onepress_site_end' );
?>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
