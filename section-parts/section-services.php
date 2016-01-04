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
							<h5 class="service-title"><?php esc_html_e( 'Insights & Planning', 'onepress' ) ?></h5>
							<p><?php esc_html_e( 'Uncovering key insights that inform the planning process and business modeling.', 'onepress' ) ?></p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-gg fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title"><?php esc_html_e( 'Usability & User Testing', 'onepress' ) ?></h5>
							<p><?php esc_html_e( 'A user-first approach to defining interactive experiences and customer experience planning.', 'onepress' ) ?></p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-balance-scale fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title"><?php esc_html_e( 'Creative & Design', 'onepress' ) ?></h5>
							<p><?php esc_html_e( 'Inventing and visualizing through shape, form, type and color.', 'onepress' ) ?></p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-bar-chart fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title"><?php esc_html_e( 'Technology & Development', 'onepress' ) ?></h5>
							<p><?php esc_html_e( 'Enabling user engagement through smart technology solutions.', 'onepress' ) ?></p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-fa fa-object-ungroup fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title"><?php esc_html_e( 'Social Media Target', 'onepress' ) ?></h5>
							<p><?php esc_html_e( 'Building connected brands through social engagement and activation.', 'onepress' ) ?></p>
						</div>
					</div>
				</div>
				<div class="grid-sm-6">
					<div class="service-item wow slideInUp">
						<div class="service-image">
							<i class="fa fa-object-group fa-5x"></i>
						</div>
						<div class="service-content">
							<h5 class="service-title"><?php esc_html_e( 'Content Strategy', 'onepress' ) ?></h5>
							<p><?php esc_html_e( 'Creating brand value through contextual and relevant distributed content.', 'onepress' ) ?></p>
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
