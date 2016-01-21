<?php
$onepress_service_id       = get_theme_mod( 'onepress_service_id', __('services', 'onepress') );
$onepress_service_disable  = get_theme_mod( 'onepress_service_disable' ) == 1 ? true : false;
$onepress_service_title    = get_theme_mod( 'onepress_service_title', __('Our Services', 'onepress' ));
$onepress_service_subtitle = get_theme_mod( 'onepress_service_subtitle', __('We help client like you', 'onepress' ));
?>

<?php if ( ! $onepress_service_disable  ) : ?>
<section id="<?php if ( $onepress_service_id != '' ) echo $onepress_service_id; ?>" <?php do_action( 'onpress_section_atts', 'services' ); ?> class="<?php echo esc_attr( apply_filters( 'onpress_section_class', 'section-services section-padding section-meta onepage-section', 'services' ) ); ?>">
	<?php do_action( 'onepress_section_before_inner', 'services' ); ?>
	<div class="container">
		<div class="section-title-area">
			<?php if ( $onepress_service_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_service_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_service_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_service_title ) . '</h2>'; ?>
		</div>
		<div class="row">
			<?php

			$services = get_theme_mod( 'onepress_services', array(
				array(
					'title' => __( 'Insights & Planning', 'onepress' ),
					'icon'  => 'fa-wikipedia-w',
					'content' => __( 'Uncovering key insights that inform the planning process and business modeling.', 'onepress' )
				),
				array(
					'title' => __( 'Usability & User Testing', 'onepress' ),
					'icon'  => 'fa-gg',
					'content' => __( 'A user-first approach to defining interactive experiences and customer experience planning.', 'onepress' )
				),
				array(
					'title' => __( 'Creative & Design', 'onepress' ),
					'icon'  => 'fa-balance-scale',
					'content' => __( 'Inventing and visualizing through shape, form, type and color.', 'onepress' )
				),
				array(
					'title' => __( 'Technology & Development', 'onepress' ),
					'icon'  => 'fa-object-group',
					'content' => __( 'Enabling user engagement through smart technology solutions.', 'onepress' )
				),

			) );

			if ( is_string( $services ) ) {
				$services = json_decode( $services, true );
			}

			if ( is_array( $services ) ) {
				foreach( $services as $service ) {
					$service = wp_parse_args( $service, array(
						'title' 	=> '',
						'icon'  	=> '',
						'content' 	=> ''
					) );

					$service['icon'] = trim( $service['icon'] );
					if ( strpos($service['icon'], 'fa-') !== 0 ) {
						$service['icon'] = 'fa-'.$service['icon'];
					}

					?>
					<div class="col-sm-6">
						<div class="service-item wow slideInUp">
							<div class="service-image">
								<i class="fa <?php echo esc_attr( $service['icon'] ); ?> fa-5x"></i>
							</div>
							<div class="service-content">
								<h5 class="service-title"><?php echo esc_html( $service['title'] ); ?></h5>
								<p><?php echo wp_kses_post( $service['content'] ); ?></p>
							</div>
						</div>
					</div>
				<?php
				}
			}

			?>
		</div>
	</div>
	<?php do_action( 'onepress_section_after_inner', 'services' ); ?>
</section>
<?php endif; ?>
