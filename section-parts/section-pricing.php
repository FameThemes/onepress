<?php
$onepress_pricing_id       = get_theme_mod( 'onepress_pricing_id', esc_html__('about', 'onepress') );
$onepress_pricing_title    = get_theme_mod( 'onepress_pricing_title', esc_html__('Pricing Table', 'onepress' ));
$onepress_pricing_subtitle = get_theme_mod( 'onepress_pricing_subtitle', esc_html__('Responsive pricing section', 'onepress' ));
?>
<section id="section-pricing" class="<?php echo esc_attr( apply_filters( 'onpress_section_class', 'section-pricing section-padding onepage-section', 'pricing' ) ); ?>">
	<?php do_action( 'onepress_section_before_inner', 'pricing' ); ?>
	<div class="container">
		<div class="section-title-area">
			<?php if ( $onepress_pricing_subtitle != '' ) {  echo '<h5 class="section-subtitle">' . esc_html( $onepress_pricing_subtitle ) . '</h5>'; } ?>
			<?php if ( $onepress_pricing_title != '' ) { echo '<h2 class="section-title">' . esc_html( $onepress_pricing_title ) . '</h2>';  } ?>
		</div>
		<div class="pricing-table row">

            <div class="pricing">
				<div class="col-md-6 col-lg-4">
					<div class="pricing__item">
						<h3 class="pricing__title">Freelancer</h3>
						<div class="pricing__price"><span class="pricing__currency">$</span>9.90</div>
						<div class="pricing__sentense">Perfect for single freelancers who work by themselves</div>
						<ul class="pricing__feature-list">
							<li>Support Forum</li>
							<li>Free hosting</li>
							<li>1 hour of support</li>
							<li>40MB of storage space</li>
						</ul>
						<div class="pricing__button">
							<a href="#" class="btn btn-theme-primary btn-lg btn-block">Choose Plan</a>
						</div>
					</div>
				</div>

				<div class="col-md-6 col-lg-4">
					<div class="pricing__item">
						<h3 class="pricing__title">Small Business</h3>
						<div class="pricing__price"><span class="pricing__currency">$</span>29.90</div>
						<div class="pricing__sentense">Suitable for small businesses with up to 5 employees</div>
						<ul class="pricing__feature-list">
							<li>Support Forum</li>
							<li>Free hosting</li>
							<li>10 hours of support</li>
							<li>1GB of storage space</li>
						</ul>
						<div class="pricing__button">
							<a href="#" class="btn btn-success btn-lg btn-block">Choose Plan</a>
						</div>
					</div>
				</div>

				<div class="col-md-6 col-lg-4">
					<div class="pricing__item">
						<h3 class="pricing__title">Larger Business</h3>
						<div class="pricing__price"><span class="pricing__currency">$</span>59.90</div>
						<div class="pricing__sentense">Great for large businesses with more than 5 employees</div>
						<ul class="pricing__feature-list">
							<li>Support Forum</li>
							<li>Free hosting</li>
							<li>Unlimited hours of support</li>
							<li>Unlimited storage space</li>
						</ul>
						<div class="pricing__button">
							<a href="#" class="btn btn-theme-primary btn-lg btn-block">Choose Plan</a>
						</div>
					</div>
				</div>
            </div>
		</div>

	</div>
	<?php do_action( 'onepress_section_after_inner', 'pricing' ); ?>
</section>
