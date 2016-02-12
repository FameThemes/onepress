<?php
$onepress_hero_id         = get_theme_mod( 'onepress_hero_id', esc_html__('hero', 'onepress') );
$onepress_hero_disable    = get_theme_mod( 'onepress_hero_disable' ) == 1 ? true : false ;
$onepress_hero_fullscreen = get_theme_mod( 'onepress_hero_fullscreen' );
$onepress_hero_pdtop      = get_theme_mod( 'onepress_hero_pdtop', '10' );
$onepress_hero_pdbotom    = get_theme_mod( 'onepress_hero_pdbotom', '10' );

$onepress_hcl1_enable     = get_theme_mod( 'onepress_hcl1_enable', 1 );
$onepress_hcl1_largetext  = get_theme_mod( 'onepress_hcl1_largetext', wp_kses_post('We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress' ));
$onepress_hcl1_smalltext  = get_theme_mod( 'onepress_hcl1_smalltext', wp_kses_post('Morbi tempus porta nunc <strong>pharetra quisque</strong> ligula imperdiet posuere<br> vitae felis proin sagittis leo ac tellus blandit sollicitudin quisque vitae placerat.', 'onepress') );
$onepress_hcl1_btn1_text  = get_theme_mod( 'onepress_hcl1_btn1_text', esc_html__('Our Services', 'onepress') );
$onepress_hcl1_btn1_link  = get_theme_mod( 'onepress_hcl1_btn1_link', esc_url( home_url( '/' )).esc_html__('#services', 'onepress') );
$onepress_hcl1_btn2_text  = get_theme_mod( 'onepress_hcl1_btn2_text', esc_html__('Get Started', 'onepress') );
$onepress_hcl1_btn2_link  = get_theme_mod( 'onepress_hcl1_btn2_link', esc_url( home_url( '/' )).esc_html__('#contact', 'onepress') );

$hero_content_style = '';
if ( $onepress_hero_fullscreen != '1' ) {
	$hero_content_style = ' style="padding-top: '. $onepress_hero_pdtop .'%; padding-bottom: '. $onepress_hero_pdbotom .'%;"';
}

$_images = get_theme_mod('onepress_hero_images');
if (is_string($_images)) {
	$_images = json_decode($_images, true);
}

if (empty($_images) || !is_array($_images)) {
    $_images = array();
}

$images = array();

foreach ( $_images as $m ) {
	$m = wp_parse_args($m, array('image' => ''));
	$_u = onepress_get_media_url($m['image']);
	if ( $_u ) {
		$images[] = $_u;
	}
}

?>
<?php if ( ! $onepress_hero_disable && ! empty ( $_images ) ) : ?>
	<section id="<?php if ($onepress_hero_id != '') echo $onepress_hero_id; ?>" class="hero-slideshow-wrapper <?php if ($onepress_hero_fullscreen == 1) {
		echo 'hero-slideshow-fullscreen';
	} else {
		echo 'hero-slideshow-normal';
	} ?>">
		<?php if ($onepress_hcl1_enable == '1') : ?>
			<div class="container"<?php echo $hero_content_style; ?>>
				<div class="hero-content-style1">
					<?php if ($onepress_hcl1_largetext != '') echo '<h2 class="hero-large-text">' . wp_kses_post($onepress_hcl1_largetext) . '</h2>'; ?>
					<?php if ($onepress_hcl1_smalltext != '') echo '<p> ' . wp_kses_post($onepress_hcl1_smalltext) . '</p>' ?>
					<?php if ($onepress_hcl1_btn1_text != '' && $onepress_hcl1_btn1_link != '') echo '<a href="' . esc_url($onepress_hcl1_btn1_link) . '" class="btn btn-theme-primary btn-lg">' . wp_kses_post($onepress_hcl1_btn1_text) . '</a>'; ?>
					<?php if ($onepress_hcl1_btn2_text != '' && $onepress_hcl1_btn2_link != '') echo '<a href="' . esc_url($onepress_hcl1_btn2_link) . '" class="btn btn-secondary-outline btn-lg">' . wp_kses_post($onepress_hcl1_btn2_text) . '</a>'; ?>
				</div>
			</div>
		<?php endif; ?>
		<?php

		if ( ! empty ( $images) ) {
			?>
			<script>
				jQuery(document).ready(function () {
					jQuery('.hero-slideshow-wrapper').backstretch(<?php echo json_encode( $images ) ?>, {
						fade: 750,
						duration: 5000
					});
				});
			</script>
			<?php
		}
	?>
	</section>
<?php endif;

