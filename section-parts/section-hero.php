<?php
$id         = get_theme_mod( 'onepress_hero_id', 'hero' );
$disable    = sanitize_text_field( get_theme_mod( 'onepress_hero_disable' ) ) == 1 ? true : false;
$fullscreen = sanitize_text_field( get_theme_mod( 'onepress_hero_fullscreen' ) );
$pdtop      = floatval( get_theme_mod( 'onepress_hero_pdtop', '10' ) );
$pdbottom   = floatval( get_theme_mod( 'onepress_hero_pdbotom', '10' ) );

if ( onepress_is_selective_refresh() ) {
	$disable = false;
}

$hero_content_style = '';
if ( $fullscreen != '1' ) {
	$hero_content_style = ' style="padding-top: ' . $pdtop . '%; padding-bottom: ' . $pdbottom . '%;"';
}

$_images = get_theme_mod( 'onepress_hero_images' );
if ( is_string( $_images ) ) {
	$_images = json_decode( $_images, true );
}

if ( empty( $_images ) || ! is_array( $_images ) ) {
	$_images = array();
}

$images = array();

foreach ( $_images as $m ) {
	$m  = wp_parse_args( $m, array( 'image' => '' ) );
	$_u = onepress_get_media_url( $m['image'] );
	if ( $_u ) {
		$images[] = $_u;
	}
}

if ( empty( $images ) ) {
	$images = array( get_template_directory_uri() . '/assets/images/hero5.jpg' );
}

$is_parallax = get_theme_mod( 'onepress_hero_parallax' ) == 1 && ! empty( $images );
$hook_args = array();
if ( $is_parallax ) {
	$hook_args = array(
		'image' => $images[0],
		'alpha' => '',
		'enable_parallax' => 1,
		'_bg_type' => 'image',
	);
}

do_action( 'onepress_before_section_part', 'hero', $hook_args );

?>
<?php if ( ! $disable && ! empty( $images ) ) : ?>
	<section  id="<?php if ( $id != '' ) {
		echo esc_attr( $id ); } ?>" <?php if ( ! empty( $images ) && ! $is_parallax ) {
	?> data-images="<?php echo esc_attr( wp_json_encode( $images, JSON_NUMERIC_CHECK ) ); ?>"<?php } ?>
			 class="hero-slideshow-wrapper <?php echo ( $fullscreen == 1 ) ? 'hero-slideshow-fullscreen' : 'hero-slideshow-normal'; ?>">

		<?php if ( ! get_theme_mod( 'onepress_hero_disable_preload', false ) ) { ?>
			<div class="slider-spinner">
				<div class="double-bounce1"></div>
				<div class="double-bounce2"></div>
			</div>
		<?php } ?>

		<?php
		$layout = get_theme_mod( 'onepress_hero_layout', 1 );
		switch ( $layout ) {
			case 2:
				$hcl2_content = get_theme_mod( 'onepress_hcl2_content', wp_kses_post( '<h1>Business Website' . "\n" . 'Made Simple.</h1>' . "\n" . 'We provide creative solutions to clients around the world,' . "\n" . 'creating things that get attention and meaningful.' . "\n\n" . '<a class="btn btn-secondary-outline btn-lg" href="#">Get Started</a>' ) );
				$hcl2_image   = get_theme_mod( 'onepress_hcl2_image', get_template_directory_uri() . '/assets/images/onepress_responsive.png' );
				?>
				<div class="container"<?php echo esc_attr($hero_content_style); ?>>
					<div class="row hero__content hero-content-style<?php echo esc_attr( $layout ); ?>">
						<div class="col-md-12 col-lg-6">
							<?php if ( $hcl2_content ) {
								echo '<div class="hcl2-content">' . wp_kses_post(apply_filters( 'the_content', do_shortcode( $hcl2_content ) ) ) . '</div>';
}; ?>
						</div>
						<div class="col-md-12 col-lg-6">
							<?php if ( $hcl2_image ) {
								echo '<img class="hcl2-image" src="' . esc_url( $hcl2_image ) . '" alt="">';
}; ?>
						</div>
					</div>
				</div>
				<?php
				break;
			default:
				$hcl1_largetext  = get_theme_mod( 'onepress_hcl1_largetext', wp_kses_post( 'We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress' ) );
				$hcl1_smalltext  = get_theme_mod( 'onepress_hcl1_smalltext', wp_kses_post( 'Morbi tempus porta nunc <strong>pharetra quisque</strong> ligula imperdiet posuere<br> vitae felis proin sagittis leo ac tellus blandit sollicitudin quisque vitae placerat.', 'onepress' ) );
				$hcl1_btn1_text  = get_theme_mod( 'onepress_hcl1_btn1_text', esc_html__( 'Our Services', 'onepress' ) );
				$hcl1_btn1_link  = get_theme_mod( 'onepress_hcl1_btn1_link', esc_url( home_url( '/' ) ) . esc_html__( '#services', 'onepress' ) );
				$hcl1_btn2_text  = get_theme_mod( 'onepress_hcl1_btn2_text', esc_html__( 'Get Started', 'onepress' ) );
				$hcl1_btn2_link  = get_theme_mod( 'onepress_hcl1_btn2_link', esc_url( home_url( '/' ) ) . esc_html__( '#contact', 'onepress' ) );

				$btn_1_style = get_theme_mod( 'onepress_hcl1_btn1_style', 'btn-theme-primary' );
				$btn_2_style = get_theme_mod( 'onepress_hcl1_btn2_style', 'btn-secondary-outline' );

				$btn_1_target = get_theme_mod( 'onepress_hcl1_btn1_target' );
				$btn_2_target = get_theme_mod( 'onepress_hcl1_btn2_target' );
				$target_1 = ( $btn_1_target == 1 ) ? 'target="_blank"' : '';
				$target_2 = ( $btn_2_target == 1 ) ? 'target="_blank"' : '';

				?>
				<div class="container"<?php echo esc_attr($hero_content_style); ?>>
					<div class="hero__content hero-content-style<?php echo esc_attr( $layout ); ?>">
						<?php if ( $hcl1_largetext != '' ) {
							echo '<h2 class="hero-large-text">' . wp_kses_post( $hcl1_largetext ) . '</h2>';} ?>
						<?php if ( $hcl1_smalltext != '' ) {
							echo '<div class="hero-small-text">' . apply_filters( 'onepress_the_content', wp_kses_post( $hcl1_smalltext ) ) . '</div>';} ?>
						<?php if ( $hcl1_btn1_text != '' && $hcl1_btn1_link != '' ) {
							echo '<a ' . $target_1 . // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							' href="' . esc_url( $hcl1_btn1_link ) . '" class="btn ' . esc_attr( $btn_1_style ) . ' btn-lg">' . wp_kses( $hcl1_btn1_text, onepress_allowed_tags() ) . '</a>';} ?>
						<?php if ( $hcl1_btn2_text != '' && $hcl1_btn2_link != '' ) {
							echo '<a ' . $target_2 .  // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							' href="' . esc_url( $hcl1_btn2_link ) . '" class="btn ' . esc_attr( $btn_2_style ) . ' btn-lg">' . wp_kses( $hcl1_btn2_text, onepress_allowed_tags()  ) . '</a>';} ?>
					</div>
				</div>
				<?php
		}

		?>
	</section>
<?php endif;

do_action( 'onepress_after_section_part', 'hero', $hook_args );
