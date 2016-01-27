<?php
$onepress_service_id       = get_theme_mod( 'onepress_service_id', esc_html__('services', 'onepress') );
$onepress_service_disable  = get_theme_mod( 'onepress_service_disable' ) == 1 ? true : false;
$onepress_service_title    = get_theme_mod( 'onepress_service_title', esc_html__('Our Services', 'onepress' ));
$onepress_service_subtitle = get_theme_mod( 'onepress_service_subtitle', esc_html__('Section subtitle', 'onepress' ));
?>

<?php if ( ! $onepress_service_disable  ) : ?>
<section id="<?php if ( $onepress_service_id != '' ) echo $onepress_service_id; ?>" <?php do_action( 'onepress_section_atts', 'services' ); ?> class="<?php echo esc_attr( apply_filters( 'onepress_section_class', 'section-services section-padding section-meta onepage-section', 'services' ) ); ?>">
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
					'title' => esc_html__( 'Service Title #1', 'onepress' ),
					'icon'  => 'fa-wikipedia-w',
					'content' => esc_html__( 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi euismod in pharetra a ultricies.', 'onepress' )
				),
				array(
					'title' => esc_html__( 'Service Title #2', 'onepress' ),
					'icon'  => 'fa-gg',
					'content' => esc_html__( 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi euismod in pharetra a ultricies.', 'onepress' )
				),
				array(
					'title' => esc_html__( 'Service Title #3', 'onepress' ),
					'icon'  => 'fa-balance-scale',
					'content' => esc_html__( 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi euismod in pharetra a ultricies.', 'onepress' )
				),
				array(
					'title' => esc_html__( 'Service Title #4', 'onepress' ),
					'icon'  => 'fa-object-group',
					'content' => esc_html__( 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi euismod in pharetra a ultricies.', 'onepress' )
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
								<h4 class="service-title"><?php echo esc_html( $service['title'] ); ?></h4>
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
