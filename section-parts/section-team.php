<?php
$onepress_team_id       = get_theme_mod( 'onepress_team_id', esc_html__('team', 'onepress') );
$onepress_team_disable  = get_theme_mod( 'onepress_team_disable' ) ==  1 ? true : false;
$onepress_team_title    = get_theme_mod( 'onepress_team_title', esc_html__('Our Team', 'onepress' ));
$onepress_team_subtitle = get_theme_mod( 'onepress_team_subtitle', esc_html__('Section subtitle', 'onepress' ));
?>
<?php if ( ! $onepress_team_disable  ) : ?>
<section id="<?php if ( $onepress_team_id != '' ) echo $onepress_team_id; ?>" <?php do_action( 'onepress_section_atts', 'team' ); ?> class="<?php echo esc_attr( apply_filters( 'onepress_section_class', 'section-team section-padding section-meta onepage-section', 'team' ) ); ?>">
	<?php do_action( 'onepress_section_before_inner', 'team' ); ?>
	<div class="container">
		<div class="section-title-area">
			<?php if ( $onepress_team_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_team_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_team_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_team_title ) . '</h2>'; ?>
		</div>
		<div class="team-members row">
			<?php

			$members = get_theme_mod( 'onepress_team_members',
				array(

					array(
						'name' 			=> esc_html__( 'Alexander Rios', 'onepress' ),
						'position' 		=> esc_html__( 'Founder & CEO', 'onepress' ),
						'image' 		=> array(
							'url' => get_template_directory_uri() . '/assets/images/team4.jpg',
							'id' => ''
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),
					array(
						'name' 			=> esc_html__( 'Sean Weaver', 'onepress' ),
						'position' 		=> esc_html__( 'Client Engagement', 'onepress' ),
						'image' 		=> array(
							'url'=>get_template_directory_uri() . '/assets/images/team5.jpg'
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),
					array(
						'name' 			=> esc_html__( 'George Wells', 'onepress' ),
						'position' 		=> esc_html__( 'Director Of Production', 'onepress' ),
						'image' 		=> array(
							'url' => get_template_directory_uri() . '/assets/images/team6.jpg'
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),
					array(
						'name' 			=> esc_html__( 'Thomas Wade', 'onepress' ),
						'position' 		=> esc_html__( 'Senior Developer', 'onepress' ),
						'image' 		=> array(
							'url' =>  get_template_directory_uri() . '/assets/images/team7.jpg',
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),

				)
			);

			if ( is_string( $members ) ) {
				$members = json_decode( $members, true );
			}

			if ( is_array( $members ) && ! empty( $members ) ) {
				foreach ( $members as $member ) {
					$member = wp_parse_args( $member,
						array(
							'name' 			=> '',
							'position' 		=> '',
							'image' 		=>  '',
							'facebook' 		=> '',
							'twitter' 		=> '',
							'google_plus' 	=> '',
							'youtube' 		=> '',
							'linkedin' 		=> '',
						)
					);
					$member['image'] = wp_parse_args( $member['image'], array( 'url' => '', 'id' => '' ) );
					$image = '';
					if ( $member['image']['id'] != '' ){
						$image =  wp_get_attachment_url( $member['image']['id'] );
					}
					if ( $image == '' && $member['image']['url'] != '' ) {
						$image = $member['image']['url'];
					}
					?>
					<div class="team-member col-sm-3 wow slideInUp">
						<div class="member-thumb">
							<?php if ( $image !='' ) { ?>
							<img src="<?php echo esc_url( $image );  ?>" alt="">
							<?php } else { ?>
								<img src="<?php echo esc_url( get_template_directory_uri().'/assets/images/user_avatar.jpg' );  ?>" alt="">
							<?php } ?>

							<div class="member-profile">
								<?php if( $member['twitter'] != '' ){ ?>
								<a href="<?php echo esc_url( $member['twitter'] ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( $member['facebook'] != '' ){ ?>
								<a href="<?php echo esc_url( $member['facebook'] ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( $member['google_plus'] != '' ){ ?>
								<a href="<?php echo esc_url( $member['google_plus'] ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( $member['youtube'] != '' ){ ?>
									<a href="<?php echo esc_url( $member['youtube'] ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-youtube fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( $member['linkedin'] != '' ){ ?>
								<a href="<?php echo esc_url( $member['linkedin'] ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
							</div>
						</div>
						<div class="member-info">
							<h5 class="member-name"><?php echo esc_html( $member['name'] ); ?></h5>
							<span class="member-position"><?php echo wp_kses_post( $member['position'] ); ?></span>
						</div>
					</div>
				<?php
				}
			}

			?>
		</div>
	</div>
	<?php do_action( 'onepress_section_after_inner', 'team' ); ?>
</section>
<?php endif; ?>
