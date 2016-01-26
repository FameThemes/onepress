<?php
$onepress_hero_id         = get_theme_mod( 'onepress_hero_id', esc_html__('hero', 'onepress') );
$onepress_hero_disable    = get_theme_mod( 'onepress_hero_disable' ) == 1 ? true : false ;
$onepress_hero_fullscreen = get_theme_mod( 'onepress_hero_fullscreen' );
$onepress_hero_pdtop      = get_theme_mod( 'onepress_hero_pdtop', '10' );
$onepress_hero_pdbotom    = get_theme_mod( 'onepress_hero_pdbotom', '10' );


$onepress_hero_image1     = get_theme_mod( 'onepress_hero_image1', get_template_directory_uri() . '/assets/images/hero1.jpg' );
$onepress_hero_image2     = get_theme_mod( 'onepress_hero_image2', get_template_directory_uri() . '/assets/images/hero2.jpg' );
$onepress_hero_image3     = get_theme_mod( 'onepress_hero_image3', get_template_directory_uri() . '/assets/images/hero3.jpg' );
$onepress_hero_image4     = get_theme_mod( 'onepress_hero_image4', get_template_directory_uri() . '/assets/images/hero4.jpg' );


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
	$_images = array(
		array(
			'image' => array(
				'url' => get_template_directory_uri() . '/assets/images/hero1.jpg',
				'id' => ''
			),
		),
		array(
			'image' => array(
				'url' => get_template_directory_uri() . '/assets/images/hero2.jpg',
				'id' => ''
			),
		),
	);
}

$images = array();

foreach ($_images as $m) {
	$m = wp_parse_args($m, array('image' => ''));
	$_u = onepress_get_media_url($m['image']);
	if ($_u) {
		$images[] = $_u;
	}
}

$video_mp4 = $video_webm = $video_ogv = false;

$video_mp4_id = get_theme_mod( 'onepress_hero_video_mp4' );
if ( $video_mp4_id ) {
	$video_mp4 = wp_get_attachment_url( $video_mp4_id );
}

$video_webm_id = get_theme_mod( 'onepress_hero_video_webm' );
if ( $video_webm_id ) {
	$video_webm = wp_get_attachment_url( $video_webm_id );
}

$video_ogv_id = get_theme_mod( 'onepress_hero_video_ogv' );
if ( $video_ogv_id ) {
	$video_ogv = wp_get_attachment_url( $video_mp4_id );
}


if ( $video_mp4 || $video_webm || $video_ogv ) {
	// var_dump( wp_get_attachment_metadata( $video_id ) );

	?>
<div class="video-section">
	<video autoplay loop class="fill-width">
		<?php if ( $video_mp4 != '' ){ ?>
			<source src="<?php echo esc_url( $video_mp4 ); ?>" type="video/mp4"/>
		<?php } ?>
		<?php if ( $video_webm != '' ) { ?>
			<source src="<?php echo esc_attr( $video_webm ); ?>" type="video/webm" />
		<?php } ?>
		<?php if ( $video_ogv != '' ) { ?>
			<source src="<?php echo esc_attr( $video_ogv ); ?>" type="video/ogv" />
		<?php } ?>
		<?php _e( ' Your browser does not support the video tag. I suggest you upgrade your browser.', 'onepress' ); ?>
	</video>
<?php
}

?>
<?php if (!$onepress_hero_disable) : ?>
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
		<?php if ( ! empty ($images) && ! ( $video_mp4 || $video_webm || $video_ogv ) ) { ?>
			<script>
				jQuery(document).ready(function () {
					jQuery('.hero-slideshow-wrapper').backstretch(<?php echo json_encode( $images ) ?>, {
						fade: 750,
						duration: 5000
					});
				});
			</script>
		<?php } ?>
	</section>
<?php endif;

if ( $video_mp4 || $video_webm || $video_ogv ) {
	echo '</div>'; // end video bg
}
