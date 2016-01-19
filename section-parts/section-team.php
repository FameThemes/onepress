<?php
$onepress_team_id       = get_theme_mod( 'onepress_team_id', __('team', 'onepress') );
$onepress_team_disable  = get_theme_mod( 'onepress_team_disable' );
$onepress_team_title    = get_theme_mod( 'onepress_team_title', __('Meet the Talents', 'onepress' ));
$onepress_team_subtitle = get_theme_mod( 'onepress_team_subtitle', __('We are OnePress', 'onepress' ));
?>
<?php if ( $onepress_team_disable != '1' ) : ?>
<section id="<?php if ( $onepress_team_id != '' ) echo $onepress_team_id; ?>" class="section-padding section-team section-meta onepage-section">
	<div class="container">
		<div class="section-title-area">
			<?php if ( $onepress_team_subtitle != '' ) echo '<h5 class="section-subtitle">' . esc_html( $onepress_team_subtitle ) . '</h5>'; ?>
			<?php if ( $onepress_team_title != '' ) echo '<h2 class="section-title">' . esc_html( $onepress_team_title ) . '</h2>'; ?>
		</div>
		<div class="team-members row">
			<?php
			// Check if one ONEPRESS PLUS plugin not installed.

			$members = get_theme_mod( 'onepress_team_members',
				array(

					array(
						'name' 			=> __( 'Alexander Rios', 'onepress' ),
						'position' 		=> __( 'Founder & CEO', 'onepress' ),
						'image' 		=> array(
							'url' => get_template_directory_uri() . '/assets/images/team1.jpg',
							'id' => ''
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),

					array(
						'name' 			=> __( 'Victoria Stephens', 'onepress' ),
						'position' 		=> __( 'Founder & CTO', 'onepress' ),
						'image' 		=> array(
							'url'=>get_template_directory_uri() . '/assets/images/team2.jpg'
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),

					array(
						'name' 			=> __( 'Harry Allen', 'onepress' ),
						'position' 		=> __( 'Director Of Production', 'onepress' ),
						'image' 		=> array(
							'url' => get_template_directory_uri() . '/assets/images/team3.jpg'
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),

					array(
						'name' 			=> __( 'Thomas Wade', 'onepress' ),
						'position' 		=> __( 'Senior Developer', 'onepress' ),
						'image' 		=> array(
							'url' =>  get_template_directory_uri() . '/assets/images/team4.jpg',
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),

					array(
						'name' 			=> __( 'Sean Weaver', 'onepress' ),
						'position' 		=> __( 'Senior Designer', 'onepress' ),
						'image' 		=> array(
							'url' =>  get_template_directory_uri() . '/assets/images/team5.jpg'
						),
						'facebook' 		=> '#',
						'twitter' 		=> '#',
						'google_plus' 	=> '#',
						'youtube' 		=> '#',
						'linkedin' 		=> '#',
					),

					array(
						'name' 			=> __( 'Peter Mendez', 'onepress' ),
						'position' 		=> __( 'Interactive Designer', 'onepress' ),
						'image' 		=>  array(
							'url' => get_template_directory_uri() . '/assets/images/team6.jpg'
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
					<div class="team-member col-sm-4 wow slideInUp">
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
</section>
<?php endif; ?>
