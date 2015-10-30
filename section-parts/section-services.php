<?php
$onepress_service_id       = get_theme_mod( 'onepress_service_id', __('services', 'onepress') );
$onepress_service_disable  = get_theme_mod( 'onepress_service_disable' );
$onepress_service_title    = get_theme_mod( 'onepress_service_title', __('Our Services', 'onepress' ));
$onepress_service_subtitle = get_theme_mod( 'onepress_service_subtitle', __('We help client like you', 'onepress' ));
?>

<?php if ( $onepress_service_disable != '1' ) : ?>
<section id="<?php if ( $onepress_service_id != '' ) echo $onepress_service_id; ?>" class="section-padding section-services section-meta onepage-section">
	<div class="container">
		<div class="section-title-area">
			<?php if ( $onepress_service_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_service_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_service_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_service_title ) . '</h2>'; ?>
		</div>
		<div class="grid-row">
			
			<?php if ( ! is_active_sidebar( 'section_service' ) ) { ?>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-wikipedia-w fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title">Insights & Planning</h5>
							<p>Uncovering key insights that inform the planning process and business modeling.</p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-gg fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title">Usability & User Testing</h5>
							<p>A user-first approach to defining interactive experiences and customer experience planning.</p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-balance-scale fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title">Creative & Design</h5>
							<p>Inventing and visualizing through shape, form, type and color.</p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-bar-chart fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title">Technology & Development</h5>
							<p>Enabling user engagement through smart technology solutions.</p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-fa fa-object-ungroup fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title">Social Media Target</h5>
							<p>Building connected brands through social engagement and activation.</p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-object-group fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title">Content Strategy</h5>
							<p>Creating brand value through contextual and relevant distributed content.</p>
						</div>
					</div>
				</div>


			<?php } else { ?>
				<?php dynamic_sidebar( 'section_service' ); ?>
			<?php } ?>

		</div>
	</div>
</section>
<?php endif; ?>