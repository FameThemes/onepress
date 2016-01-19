<?php
$onepress_testimonial_id       = get_theme_mod( 'onepress_testimonial_id', __('testimonials', 'onepress') );
$onepress_testimonial_disable  = get_theme_mod( 'onepress_testimonial_disable' );
$onepress_testimonial_title    = get_theme_mod( 'onepress_testimonial_title', __('Testimonials', 'onepress' ));
$onepress_testimonial_subtitle = get_theme_mod( 'onepress_testimonial_subtitle', __('You are in good company!', 'onepress' ));
?>
<?php if ( $onepress_testimonial_disable != '1' ) : ?>
<section id="<?php if ( $onepress_testimonial_id != '' ) echo $onepress_testimonial_id; ?>" class="section-padding section-testimonials onepage-section section-inverse section-padding-lg">
	<div class="container">

		<div class="section-title-area">
			<?php if ( $onepress_testimonial_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_testimonial_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_testimonial_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_testimonial_title ) . '</h2>'; ?>
		</div>



            <div class="card-deck-wrapper">
                <div class="card-deck">
                    <div class="card card-inverse card-warning">
                        <div class="card-block">
							<div class="tes_author">
                            	<img src="<?php echo get_template_directory_uri() . '/assets/images/testimonial_1.jpg'; ?>" alt="" />
								<cite class="tes__name">Jane Doe<div><a href="https://www.famethemes.com">www.famethemes.com</a></div></cite>
                            </div>
                            <h4 class="card-title">Design Quality</h4>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                        </div>
                    </div>
                    <div class="card card-inverse card-success">
                        <div class="card-block">
							<div class="tes_author">
                            	<img src="<?php echo get_template_directory_uri() . '/assets/images/testimonial_2.jpg'; ?>" alt="" />
								<cite class="tes__name">Jane Doe<div>Google Founder & CEO</div></cite>
                            </div>
                            <h4 class="card-title">Feature Availability</h4>
                            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>

                        </div>
                    </div>
                    <div class="card card-inverse card-info">
                        <div class="card-block">
							<div class="tes_author">
                            	<img src="<?php echo get_template_directory_uri() . '/assets/images/testimonial_3.jpg'; ?>" alt="" />
								<cite class="tes__name">Jane Doe<div>Example Company</div></cite>
                            </div>
                            <h4 class="card-title">Customizability</h4>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>

                        </div>
                    </div>
                </div>
            </div>



	</div>
</section>
<?php endif; ?>
