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
			$members = get_theme_mod( 'onepress_team_members' );
			if ( is_string( $members ) ) {
				$members = json_decode( $members, true );
			}

			$user_ids = array();
			if ( ! empty( $members ) && is_array( $members ) ) {
				foreach ( $members as $k => $v ) {
					if ( isset ( $v['user_id'] ) ) {
						$v['user_id'] = absint( $v['user_id'] );
						if ( $v['user_id'] > 0 )  {
							$user_ids[ ] =  $v;
						}
					}
				}
			}

			if ( ! empty( $user_ids ) ) {
				foreach ( $user_ids as $member ) {
					$user = get_user_by( 'id', $member['user_id'] );
					if ( ! $user || is_wp_error( $user ) ) {
						continue;
					}

					$image = get_avatar( $user->user_email, 300 );

					?>
					<div class="team-member col-sm-3 wow slideInUp">
						<div class="member-thumb">
							<?php
							if ( $image !='' ) {
								 echo apply_filters( 'onepress_team_member_avatar', $image, $user );
							} ?>
							<div class="member-profile">
								<?php if( $user->user_url != '' ){ ?>
									<a href="<?php echo esc_url( $user->user_url ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-globe fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( get_user_meta( $user->ID, 'twitter', true ) != '' ){ ?>
								<a href="<?php echo esc_url(get_user_meta( $user->ID, 'twitter', true ) ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( get_user_meta( $user->ID, 'facebook', true ) != '' ){ ?>
								<a href="<?php echo esc_url( get_user_meta( $user->ID, 'facebook', true ) ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( get_user_meta( $user->ID, 'google_plus', true ) != '' ){ ?>
								<a href="<?php echo esc_url( get_user_meta( $user->ID, 'google_plus', true ) ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
								<?php if( get_user_meta( $user->ID, 'linkedin', true ) != '' ){ ?>
								<a href="<?php echo esc_url( get_user_meta( $user->ID, 'linkedin', true ) ); ?>"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
								<?php } ?>
							</div>
						</div>
						<div class="member-info">
							<h5 class="member-name"><?php echo esc_html( $user->display_name  ); ?></h5>
							<span class="member-position"><?php echo get_user_meta( $user->ID, 'description', true  ); ?></span>
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
