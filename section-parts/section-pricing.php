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
		<div class="pricing-table card-deck-wrapper">

            <div class="pricing pricing--tenzin card-deck">

				<div class="pricing__item card">
					<h3 class="pricing__title">Freelancer</h3>
					<div class="pricing_price"><span class="pricing__currency">$</span>9.90</div>
					<div class="pricing__sentense">Perfect for single freelancers who work by themselves</div>
					<ul class="pricing__feature-list">
						<li>Support Forum</li>
						<li>Free hosting</li>
						<li>40MB of storage space</li>
					</ul>
					<a href="#" class="btn btn-theme-primary-outline btn-lg">Choose Plan</a>
				</div>

				<div class="pricing__item card">
					<h3 class="pricing__title">Freelancer</h3>
					<div class="pricing_price"><span class="pricing__currency">$</span>9.90</div>
					<div class="pricing__sentense">Perfect for single freelancers who work by themselves</div>
					<ul class="pricing__feature-list">
						<li>Support Forum</li>
						<li>Free hosting</li>
						<li>40MB of storage space</li>
						<li>40MB of storage space</li>
						<li>40MB of storage space</li>
					</ul>
					<a href="#" class="btn btn-theme-primary-outline btn-lg">Choose Plan</a>
				</div>

				<div class="pricing__item card">
					<h3 class="pricing__title">Freelancer</h3>
					<div class="pricing_price"><span class="pricing__currency">$</span>9.90</div>
					<div class="pricing__sentense">Perfect for single freelancers who work by themselves</div>
					<ul class="pricing__feature-list">
						<li>Support Forum</li>
						<li>Free hosting</li>
						<li>40MB of storage space</li>
						<li>40MB of storage space</li>
						<li>40MB of storage space</li>
						<li>40MB of storage space</li>
						<li>40MB of storage space</li>
						<li>40MB of storage space</li>
					</ul>
					<a href="#" class="btn btn-theme-primary-outline btn-lg">Choose Plan</a>
				</div>
            </div>

		</div>
	</div>
	<?php do_action( 'onepress_section_after_inner', 'pricing' ); ?>
</section>
