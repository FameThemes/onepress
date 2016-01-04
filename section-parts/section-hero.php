<?php
$onepress_hero_id         = get_theme_mod( 'onepress_hero_id', __('hero', 'onepress') );
$onepress_hero_disable    = get_theme_mod( 'onepress_hero_disable' );
$onepress_hero_fullscreen = get_theme_mod( 'onepress_hero_fullscreen' );
$onepress_hero_pdtop      = get_theme_mod( 'onepress_hero_pdtop', '10' );
$onepress_hero_pdbotom    = get_theme_mod( 'onepress_hero_pdbotom', '10' );
$onepress_hero_image1     = get_theme_mod( 'onepress_hero_image1', get_template_directory_uri() . '/assets/images/hero1.jpg' );
$onepress_hero_image2     = get_theme_mod( 'onepress_hero_image2', get_template_directory_uri() . '/assets/images/hero2.jpg' );
$onepress_hero_image3     = get_theme_mod( 'onepress_hero_image3', get_template_directory_uri() . '/assets/images/hero3.jpg' );
$onepress_hero_image4     = get_theme_mod( 'onepress_hero_image4', get_template_directory_uri() . '/assets/images/hero4.jpg' );
$onepress_hcl1_enable     = get_theme_mod( 'onepress_hcl1_enable', 1 );
$onepress_hcl1_largetext  = get_theme_mod( 'onepress_hcl1_largetext', __('We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress' ));
$onepress_hcl1_smalltext  = get_theme_mod( 'onepress_hcl1_smalltext', __('An independent digital design studio in <strong>New York City.</strong> <br>We bring creativity and intelligence to the most beloved brands.', 'onepress' ));
$onepress_hcl1_btn1_text  = get_theme_mod( 'onepress_hcl1_btn1_text', __('More About Us', 'onepress') );
$onepress_hcl1_btn1_link  = get_theme_mod( 'onepress_hcl1_btn1_link', esc_url( home_url( '/' )).__('#about', 'onepress') );
$onepress_hcl1_btn2_text  = get_theme_mod( 'onepress_hcl1_btn2_text', __('See Our Works', 'onepress') );
$onepress_hcl1_btn2_link  = get_theme_mod( 'onepress_hcl1_btn2_link', esc_url( home_url( '/' )).__('#projects', 'onepress') );

$hero_content_style = '';
if ( $onepress_hero_fullscreen != '1' ) {
	$hero_content_style = ' style="padding-top: '. $onepress_hero_pdtop .'%; padding-bottom: '. $onepress_hero_pdbotom .'%;"';
}
?>

<?php if ( $onepress_hero_disable != '1' ) : ?>
<section id="<?php if ( $onepress_hero_id != '' ) echo $onepress_hero_id; ?>" class="hero-slideshow-wrapper <?php if ( $onepress_hero_fullscreen == 1 ) { echo 'hero-slideshow-fullscreen'; } else { echo 'hero-slideshow-normal'; } ?>">
	<?php if ( $onepress_hcl1_enable == '1' ) : ?>
	<div class="container"<?php echo $hero_content_style; ?>>
		<div class="hero-content-style1">
			<?php if ( $onepress_hcl1_largetext != '' ) echo '<h2 class="hero-large-text">' . wp_kses_post( $onepress_hcl1_largetext ) . '</h2>'; ?>
			<?php if ( $onepress_hcl1_smalltext != '' ) echo '<p> ' . wp_kses_post( $onepress_hcl1_smalltext ) . '</p>' ?>
			<?php if ( $onepress_hcl1_btn1_text != '' && $onepress_hcl1_btn1_link != '' ) echo '<a href="' . esc_url($onepress_hcl1_btn1_link) . '" class="btn btn-large btn-ghost">' . wp_kses_post( $onepress_hcl1_btn1_text ) . '</a>'; ?>
			<?php if ( $onepress_hcl1_btn2_text != '' && $onepress_hcl1_btn2_link != '' ) echo '<a href="' . esc_url($onepress_hcl1_btn2_link) . '" class="btn btn-large btn-primary">' . wp_kses_post( $onepress_hcl1_btn2_text ) . '</a>'; ?>
		</div>
	</div>
	<?php endif; ?>
	<script>
	jQuery(document).ready(function() {
		jQuery('.hero-slideshow-wrapper').backstretch([
				"<?php echo $onepress_hero_image1; ?>",
				"<?php echo $onepress_hero_image2; ?>",
				"<?php echo $onepress_hero_image3; ?>",
				"<?php echo $onepress_hero_image4; ?>"
			], {
				fade: 750,
				duration: 5000
			});
	});
	</script>
</section>
<?php endif; ?>
