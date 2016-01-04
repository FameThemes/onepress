<?php
$onepress_about_id       = get_theme_mod( 'onepress_about_id', __('about', 'onepress') );
$onepress_about_disable  = get_theme_mod( 'onepress_about_disable' );
$onepress_about_title    = get_theme_mod( 'onepress_about_title', __('More About Us', 'onepress' ));
$onepress_about_subtitle = get_theme_mod( 'onepress_about_subtitle', __('We are a digital studio', 'onepress' ));
?>
<?php if ( $onepress_about_disable != '1' ) : ?>
<section id="<?php if ( $onepress_about_id != '' ) echo $onepress_about_id; ?>" class="section-padding section-about onepage-section">
	<div class="container">

		<div class="section-title-area">
			<?php if ( $onepress_about_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_about_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_about_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_about_title ) . '</h2>'; ?>
		</div>

		<div class="grid-row">
		<?php if ( ! is_active_sidebar( 'section_about' ) ) { ?>
			<div class="grid-sm-4 wow slideInUp">
				<div class="about-image"><img src="<?php echo get_template_directory_uri() . '/assets/images/about1.jpg' ?>" alt=""></div>
				<h5><?php esc_html_e( 'OUR HISTORY', 'onepress' ) ?></h5>
				<p><?php esc_html_e( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ) ?></p>
			</div>
			<div class="grid-sm-4 wow slideInUp">
				<div class="about-image"><img src="<?php echo get_template_directory_uri() . '/assets/images/about2.jpg' ?>" alt=""></div>
				<h5><?php esc_html_e( 'OUR ACHIEVEMENTS', 'onepress' ) ?></h5>
				<p><?php esc_html_e( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ) ?></p>
			</div>
			<div class="grid-sm-4 wow slideInUp">
				<div class="about-image"><img src="<?php echo get_template_directory_uri() . '/assets/images/about3.jpg' ?>" alt=""></div>
				<h5><?php esc_html_e( 'OUR VISION', 'onepress' ) ?></h5>
				<p><?php esc_html_e( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ) ?></p>
			</div>
		<?php } else { ?>
			<?php dynamic_sidebar( 'section_about' ); ?>
		<?php } ?>
		</div>

	</div>
</section>
<?php endif; ?>
