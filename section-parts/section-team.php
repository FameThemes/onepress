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
		<div class="team-members grid-row">

			<?php if ( ! is_active_sidebar( 'section_team' ) ) { ?>

			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team5.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">Alexander Rios</h5>
					<span class="member-position">Founder & CEO</span>
				</div>
			</div>
			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team3.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">Victoria Stephens</h5>
					<span class="member-position">Founder & CTO</span>
				</div>
			</div>
			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team2.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">Harry Allen</h5>
					<span class="member-position">Director Of Production</span>
				</div>
			</div>
			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team4.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">Thomas Wade</h5>
					<span class="member-position">Senior Developer</span>
				</div>
			</div>
			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team6.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">Sean Weaver</h5>
					<span class="member-position">Senior Designer</span>
				</div>
			</div>
			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team1.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">Peter Mendez</h5>
					<span class="member-position">Interactive Designer</span>
				</div>
			</div>
			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team7.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">George Wells</h5>
					<span class="member-position"> User Experience</span>
				</div>
			</div>
			<div class="team-member grid-sm-3 wow slideInUp">
				<div class="member-thumb">
					<img src="<?php echo get_template_directory_uri() . '/assets/images/team8.jpg' ?>" alt="">
					<div class="member-profile">
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span></a>
						<a href="#"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span></a>
					</div>
				</div>
				<div class="member-info">
					<h5 class="member-name">Jonathan Green</h5>
					<span class="member-position">Client Engagement</span>
				</div>
			</div>

			<?php } else { ?>
				<?php dynamic_sidebar( 'section_team' ); ?>
			<?php } ?>

		</div>
	</div>
</section>
<?php endif; ?>