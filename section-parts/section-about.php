<?php
$onepress_about_id       = get_theme_mod( 'onepress_about_id', esc_html__('about', 'onepress') );
$onepress_about_disable  = get_theme_mod( 'onepress_about_disable' ) == 1 ? true : false;
$onepress_about_title    = get_theme_mod( 'onepress_about_title', esc_html__('About Us', 'onepress' ));
$onepress_about_subtitle = get_theme_mod( 'onepress_about_subtitle', esc_html__('Section subtitle', 'onepress' ));
?>
<?php if ( ! $onepress_about_disable  ) { ?>
	<section id="<?php if ( $onepress_about_id != '' ) { echo $onepress_about_id; }; ?>" <?php do_action( 'onepress_section_atts', 'about' ); ?> class="<?php echo esc_attr( apply_filters( 'onepress_section_class', 'section-about section-padding onepage-section', 'about' ) ); ?>">
		<?php do_action( 'onepress_section_before_inner', 'about' ); ?>
		<div class="container">
			<div class="section-title-area">
				<?php if ( $onepress_about_subtitle != '' ) {  echo '<h5 class="section-subtitle">' . esc_html( $onepress_about_subtitle ) . '</h5>'; } ?>
				<?php if ( $onepress_about_title != '' ) { echo '<h2 class="section-title">' . esc_html( $onepress_about_title ) . '</h2>';  } ?>
			</div>
			<div class="row">
				<?php
				$boxes = get_theme_mod( 'onepress_about_boxes' );

				if ( is_string( $boxes ) ) {
					$boxes = json_decode( $boxes , true );
				}

				if ( empty( $boxes ) || ! is_array( $boxes ) ) {
					$boxes = array(
						array(
							'title' => esc_html__( 'Vestibulum auctor dapibus', 'onepress' ),
							'thumb' 		=> array(
								'url'=> get_template_directory_uri().'/assets/images/about1.jpg',
							),
							'content' => esc_html__( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ),
						),
						array(
							'title' => esc_html__( 'Cras ornare tristique', 'onepress' ),
							'thumb' 		=> array(
								'url'=> get_template_directory_uri().'/assets/images/about2.jpg',
							),
							'content' => esc_html__( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ),
						),
						array(
							'title' => esc_html__( 'Vivamus vestibulum nulla', 'onepress' ),
							'thumb' 		=> array(
								'url'=> get_template_directory_uri().'/assets/images/about3.jpg',
							),
							'content' => esc_html__( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ),
						),

					);
				}

				$col =  3;
				$num_col = 4;
				$n = count( $boxes );
				if ( $n < 4 ) {
					switch ( $n ){
						case 3:
							$col =  4;
							$num_col = 3;
							break;
						case 2:
							$col = 6;
							$num_col = 2;
							break;
						default:
							$col = 12;
							$num_col = 1;
					}
				}
				$j = 0;
				foreach ( $boxes as $i => $box ) {
					$box = wp_parse_args( $box,
						array(
							'title' 			=> '',
							'thumb' 		=> '',
							'content' 		=>  '',
						)
					);
					$box['thumb'] = wp_parse_args( $box['thumb'], array( 'url' => '', 'id' => '' ) );
					$image = '';
					if ( $box['thumb']['id'] != '' ){
						$image =  wp_get_attachment_url( $box['thumb']['id'] );
					}
					if ( $image == '' && $box['thumb']['url'] != '' ) {
						$image = $box['thumb']['url'];
					}
					$class = 'col-lg-'.$col;
					if (  $n == 1 ) {
						$class .= ' col-sm-12 ';
					} else {
						$class .= ' col-sm-6 ';
					}
					if ( $j >= $num_col ){
						$j = 1;
						$class .=' clearleft';
					} else {
						$j ++ ;
					}
					?>
					<div class="<?php echo esc_attr( $class ); ?> wow slideInUp">
						<?php if ( $image != '' ) { ?>
							<div class="about-image"><img src="<?php echo esc_url( $image ); ?>" alt=""></div>
						<?php } ?>
						<h3><?php echo esc_html( $box['title'] ); ?></h3>
						<p><?php echo wp_kses_post( $box['content'] ); ?></p>
					</div>
				<?php
				} // end foreach
				?>
			</div>
		</div>
		<?php do_action( 'onepress_section_after_inner', 'about' ); ?>
	</section>
<?php } ?>
