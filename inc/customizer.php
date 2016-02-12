<?php
/**
 * OnePress Theme Customizer.
 *
 * @package OnePress
 */


/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function onepress_customize_register( $wp_customize ) {


	// Load custom controls
	require get_template_directory() . '/inc/customizer-controls.php';

	// Remove default sections
	$wp_customize->remove_section('colors');
	$wp_customize->remove_section('background_image');

	// Custom WP default control & settings.
	$wp_customize->get_section('title_tagline')->title = esc_html__('Site Title, Tagline & Logo', 'onepress');
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	/**
	 * Hook to add other customize
	 */
	do_action( 'onepress_customize_before_register', $wp_customize );


	$pages  =  get_pages();
	$option_pages = array();
	$option_pages[0] = __( 'Select page', 'onepress' );
	foreach( $pages as $p ){
		$option_pages[ $p->ID ] = $p->post_title;
	}

	$users = get_users( array(
		'orderby'      => 'display_name',
		'order'        => 'ASC',
		'number'       => '',
	) );

	$option_users[0] = __( 'Select member', 'onepress' );
	foreach( $users as $user ){
		$option_users[ $user->ID ] = $user->display_name;
	}

	/*------------------------------------------------------------------------*/
    /*  Site Identity
    /*------------------------------------------------------------------------*/

    	$wp_customize->add_setting( 'onepress_site_image_logo',
			array(
				'sanitize_callback' => 'onepress_sanitize_file_url',
				'default'           => ''
			)
		);
    	$wp_customize->add_control( new WP_Customize_Image_Control(
            $wp_customize,
            'onepress_site_image_logo',
				array(
					'label' 		=> esc_html__('Site Image Logo', 'onepress'),
					'section' 		=> 'title_tagline',
					'description'   => esc_html__('Your site image logo', 'onepress'),
				)
			)
		);

	/*------------------------------------------------------------------------*/
    /*  Site Options
    /*------------------------------------------------------------------------*/
		$wp_customize->add_panel( 'onepress_options',
			array(
				'priority'       => 22,
			    'capability'     => 'edit_theme_options',
			    'theme_supports' => '',
			    'title'          => esc_html__( 'Theme Options', 'onepress' ),
			    'description'    => '',
			)
		);

		/* Global Settings
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_global_settings' ,
			array(
				'priority'    => 3,
				'title'       => esc_html__( 'Global', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
			)
		);


			// Disable Sticky Header
			$wp_customize->add_setting( 'onepress_sticky_header_disable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_sticky_header_disable',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Disable Sticky Header?', 'onepress'),
					'section'     => 'onepress_global_settings',
					'description' => esc_html__('Check this box to disable sticky header when scroll.', 'onepress')
				)
			);

			// Disable Animation
			$wp_customize->add_setting( 'onepress_animation_disable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_animation_disable',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Disable animation effect?', 'onepress'),
					'section'     => 'onepress_global_settings',
					'description' => esc_html__('Check this box to disable all element animation when scroll.', 'onepress')
				)
			);

			// Disable Animation
			$wp_customize->add_setting( 'onepress_btt_disable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_btt_disable',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Hide footer back to top?', 'onepress'),
					'section'     => 'onepress_global_settings',
					'description' => esc_html__('Check this box to hide footer back to top button.', 'onepress')
				)
			);

		/* Social Settings
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_social' ,
			array(
				'priority'    => 6,
				'title'       => esc_html__( 'Social Profiles', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
			)
		);

			// Disable Social
			$wp_customize->add_setting( 'onepress_social_disable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '1',
				)
			);
			$wp_customize->add_control( 'onepress_social_disable',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Hide Footer Social?', 'onepress'),
					'section'     => 'onepress_social',
					'description' => esc_html__('Check this box to hide footer social section.', 'onepress')
				)
			);

			$wp_customize->add_setting( 'onepress_social_footer_guide',
				array(
					'sanitize_callback' => 'onepress_sanitize_text'
				)
			);
			$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_social_footer_guide',
				array(
					'section'     => 'onepress_social',
					'type'        => 'custom_message',
					'description' => esc_html__( 'These social profiles setting below will display at the footer of your site.', 'onepress' )
				)
			));

			// Footer Social Title
			$wp_customize->add_setting( 'onepress_social_footer_title',
				array(
					'sanitize_callback' => 'sanitize_text_field',
					'default'           => esc_html__( 'Keep Updated', 'onepress' ),
				)
			);
			$wp_customize->add_control( 'onepress_social_footer_title',
				array(
					'label'       => esc_html__('Social Footer Title', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);

			// Twitter
			$wp_customize->add_setting( 'onepress_social_twitter',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_social_twitter',
				array(
					'label'       => esc_html__('Twitter URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);
			// Facebook
			$wp_customize->add_setting( 'onepress_social_facebook',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_social_facebook',
				array(
					'label'       => esc_html__('Faecbook URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);
			// Facebook
			$wp_customize->add_setting( 'onepress_social_google',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_social_google',
				array(
					'label'       => esc_html__('Google Plus URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);
			// Instagram
			$wp_customize->add_setting( 'onepress_social_instagram',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_social_instagram',
				array(
					'label'       => esc_html__('Instagram URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);
			// RSS
			$wp_customize->add_setting( 'onepress_social_rss',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => get_bloginfo('rss2_url'),
				)
			);
			$wp_customize->add_control( 'onepress_social_rss',
				array(
					'label'       => esc_html__('RSS URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);

		/* Newsletter Settings
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_newsletter' ,
			array(
				'priority'    => 9,
				'title'       => esc_html__( 'Newsletter', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
			)
		);
			// Disable Newsletter
			$wp_customize->add_setting( 'onepress_newsletter_disable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '1',
				)
			);
			$wp_customize->add_control( 'onepress_newsletter_disable',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Hide Footer Newsletter?', 'onepress'),
					'section'     => 'onepress_newsletter',
					'description' => esc_html__('Check this box to hide footer newsletter form.', 'onepress')
				)
			);

			// Mailchimp Form Title
			$wp_customize->add_setting( 'onepress_newsletter_title',
				array(
					'sanitize_callback' => 'sanitize_text_field',
					'default'           => esc_html__( 'Join our Newsletter', 'onepress' ),
				)
			);
			$wp_customize->add_control( 'onepress_newsletter_title',
				array(
					'label'       => esc_html__('Newsletter Form Title', 'onepress'),
					'section'     => 'onepress_newsletter',
					'description' => ''
				)
			);

			// Mailchimp action url
			$wp_customize->add_setting( 'onepress_newsletter_mailchimp',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_newsletter_mailchimp',
				array(
					'label'       => esc_html__('MailChimp Action URL', 'onepress'),
					'section'     => 'onepress_newsletter',
					'description' => 'The newsletter form use MailChimp, please follow <a target="_blank" href="http://goo.gl/uRVIst">this guide</a> to know how to get MailChimp Action URL. Example <i>//famethemes.us8.list-manage.com/subscribe/post?u=521c400d049a59a4b9c0550c2&amp;id=83187e0006</i>'
				)
			);

	/*------------------------------------------------------------------------*/
    /*  Section: Order & Styling
    /*------------------------------------------------------------------------*/
	$wp_customize->add_section( 'onepress_order_styling' ,
		array(
			'priority'        => 129,
			'title'           => esc_html__( 'Section Order & Styling', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);
		// Plus message
		$wp_customize->add_setting( 'onepress_order_styling_message',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
			)
		);
		$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_order_styling_message',
			array(
				'section'     => 'onepress_news_settings',
				'type'        => 'custom_message',
				'section'     => 'onepress_order_styling',
				'description' => wp_kses_post( ' Check out <a target="_blank" href="https://www.famethemes.com/themes/onepress/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus version</a> for full control over <strong>section order</strong> and <strong>section styling</strong>! ', 'onepress' )
			)
		));


	/*------------------------------------------------------------------------*/
    /*  Section: Hero
    /*------------------------------------------------------------------------*/

	$wp_customize->add_panel( 'onepress_hero_panel' ,
		array(
			'priority'        => 130,
			'title'           => esc_html__( 'Section: Hero', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

		// Hero settings
		$wp_customize->add_section( 'onepress_hero_settings' ,
			array(
				'priority'    => 3,
				'title'       => esc_html__( 'Hero Settings', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_hero_panel',
			)
		);

			// Show section
			$wp_customize->add_setting( 'onepress_hero_disable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_hero_disable',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Hide this section?', 'onepress'),
					'section'     => 'onepress_hero_settings',
					'description' => esc_html__('Check this box to hide this section.', 'onepress'),
				)
			);
			// Section ID
			$wp_customize->add_setting( 'onepress_hero_id',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => esc_html__('hero', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hero_id',
				array(
					'label' 		=> esc_html__('Section ID:', 'onepress'),
					'section' 		=> 'onepress_hero_settings',
					'description'   => 'The section id, we will use this for link anchor.'
				)
			);

			// Show hero full screen
			$wp_customize->add_setting( 'onepress_hero_fullscreen',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_hero_fullscreen',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Make hero section full screen', 'onepress'),
					'section'     => 'onepress_hero_settings',
					'description' => esc_html__('Check this box to make hero section full screen.', 'onepress'),
				)
			);

			// Hero content padding top
			$wp_customize->add_setting( 'onepress_hero_pdtop',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => esc_html__('10', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hero_pdtop',
				array(
					'label'           => esc_html__('Padding Top:', 'onepress'),
					'section'         => 'onepress_hero_settings',
					'description'     => 'The hero content padding top in percent (%).',
					'active_callback' => 'onepress_hero_fullscreen_callback'
				)
			);

			// Hero content padding bottom
			$wp_customize->add_setting( 'onepress_hero_pdbotom',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => esc_html__('10', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hero_pdbotom',
				array(
					'label'           => esc_html__('Padding Bottom:', 'onepress'),
					'section'         => 'onepress_hero_settings',
					'description'     => 'The hero content padding bottom in percent (%).',
					'active_callback' => 'onepress_hero_fullscreen_callback'
				)
			);

		$wp_customize->add_section( 'onepress_hero_images' ,
			array(
				'priority'    => 6,
				'title'       => esc_html__( 'Hero Background Media', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_hero_panel',
			)
		);


			$wp_customize->add_setting(
				'onepress_hero_images',
				array(
					'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
					'transport' => 'refresh', // refresh or postMessage
				) );

			$wp_customize->add_control(
				new Onepress_Customize_Repeatable_Control(
					$wp_customize,
					'onepress_hero_images',
					array(
						'label'     => esc_html__('Background Images', 'onepress'),
						'description'   => '',
						'priority'     => 40,
						'section'       => 'onepress_hero_images',
						'title_format'  => esc_html__( 'Background', 'onepress'), // [live_title]
						'max_item'      => 2, // Maximum item can add

						'fields'    => array(
							'image' => array(
								'title' => esc_html__('Background Image', 'onepress'),
								'type'  =>'media',
								'default' => array(
									'url' => get_template_directory_uri().'/assets/images/hero5.jpg',
									'id' => ''
								)
							),

						),

					)
				)
			);

			// Overlay color
			$wp_customize->add_setting( 'onepress_hero_overlay_color',
				array(
					'sanitize_callback' => 'sanitize_hex_color',
					'default'           => '#000000',
					'transport' => 'refresh', // refresh or postMessage
				)
			);
			$wp_customize->add_control( new WP_Customize_Color_Control(
					$wp_customize,
					'onepress_hero_overlay_color',
					array(
						'label' 		=> esc_html__('Background Overlay Color', 'onepress'),
						'section' 		=> 'onepress_hero_images',
						'priority'      => 130,
					)
				)
			);

			// Overlay Opacity
			$wp_customize->add_setting( 'onepress_hero_overlay_opacity',
				array(
					'sanitize_callback' => 'sanitize_text_field',
					'default'           => '0.3',
					'transport' => 'refresh', // refresh or postMessage
				)
			);
			$wp_customize->add_control(
					'onepress_hero_overlay_opacity',
					array(
						'label' 		=> esc_html__('Background Overlay Opacity', 'onepress'),
						'section' 		=> 'onepress_hero_images',
						'description'   => esc_html__('Enter a float number between 0.1 to 0.9', 'onepress'),
						'priority'      => 130,
					)
			);




		$wp_customize->add_section( 'onepress_hero_content_layout1' ,
			array(
				'priority'    => 9,
				'title'       => esc_html__( 'Hero Content Layout #1', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_hero_panel',

			)
		);

			// Show Content
			$wp_customize->add_setting( 'onepress_hcl1_enable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => 1,
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_enable',
				array(
					'type'        => 'checkbox',
					'label'       => esc_html__('Show this content layout', 'onepress'),
					'section'     => 'onepress_hero_content_layout1',
					'description' => esc_html__('Check this box to enable this content layout for hero section.', 'onepress'),
				)
			);

			// Large Text
			$wp_customize->add_setting( 'onepress_hcl1_largetext',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => wp_kses_post('We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress'),
				)
			);
			$wp_customize->add_control( new One_Press_Textarea_Custom_Control(
				$wp_customize,
				'onepress_hcl1_largetext',
				array(
					'label' 		=> esc_html__('Large Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1',
					'description'   => esc_html__('Text Rotating Guide: Put your rotate texts separate by "|" into <span class="js-rotating">...</span>, go to Customizer->Site Option->Animate to control rotate animation.', 'onepress'),
				)
			));

			// Small Text
			$wp_customize->add_setting( 'onepress_hcl1_smalltext',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'			=> wp_kses_post('Morbi tempus porta nunc <strong>pharetra quisque</strong> ligula imperdiet posuere<br> vitae felis proin sagittis leo ac tellus blandit sollicitudin quisque vitae placerat.', 'onepress'),
				)
			);
			$wp_customize->add_control( new One_Press_Textarea_Custom_Control(
				$wp_customize,
				'onepress_hcl1_smalltext',
				array(
					'label' 		=> esc_html__('Small Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1',
					'description'   => esc_html__('You can use text rotate slider in this textarea too.', 'onepress'),
				)
			));

			// Button #1 Text
			$wp_customize->add_setting( 'onepress_hcl1_btn1_text',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => esc_html__('About Us', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn1_text',
				array(
					'label' 		=> esc_html__('Button #1 Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

			// Button #1 Link
			$wp_customize->add_setting( 'onepress_hcl1_btn1_link',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => esc_url( home_url( '/' )).esc_html__('#about', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn1_link',
				array(
					'label' 		=> esc_html__('Button #1 Link', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

			// Button #2 Text
			$wp_customize->add_setting( 'onepress_hcl1_btn2_text',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => esc_html__('Get Started', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn2_text',
				array(
					'label' 		=> esc_html__('Button #2 Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

			// Button #2 Link
			$wp_customize->add_setting( 'onepress_hcl1_btn2_link',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => esc_url( home_url( '/' )).esc_html__('#contact', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn2_link',
				array(
					'label' 		=> esc_html__('Button #2 Link', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

	/*------------------------------------------------------------------------*/
	/*  Section: Video Popup
	/*------------------------------------------------------------------------*/
	$wp_customize->add_panel( 'onepress_videolightbox' ,
		array(
			'priority'        => 132,
			'title'           => esc_html__( 'Section: Video Lightbox', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

    $wp_customize->add_section( 'onepress_videolightbox_settings' ,
        array(
            'priority'    => 3,
            'title'       => esc_html__( 'Section Settings', 'onepress' ),
            'description' => '',
            'panel'       => 'onepress_videolightbox',
        )
    );

    // Show Content
    $wp_customize->add_setting( 'onepress_videolightbox_disable',
        array(
            'sanitize_callback' => 'onepress_sanitize_checkbox',
            'default'           => '',
        )
    );
    $wp_customize->add_control( 'onepress_videolightbox_disable',
        array(
            'type'        => 'checkbox',
            'label'       => esc_html__('Hide this section?', 'onepress'),
            'section'     => 'onepress_videolightbox_settings',
            'description' => esc_html__('Check this box to hide this section.', 'onepress'),
        )
    );

    // Section ID
    $wp_customize->add_setting( 'onepress_videolightbox_id',
        array(
            'sanitize_callback' => 'onepress_sanitize_text',
            'default'           => 'videolightbox',
        )
    );
    $wp_customize->add_control( 'onepress_videolightbox_id',
        array(
            'label' 		=> esc_html__('Section ID:', 'onepress'),
            'section' 		=> 'onepress_videolightbox_settings',
            'description'   => esc_html__('The section id, we will use this for link anchor.', 'onepress' )
        )
    );

    // Title
    $wp_customize->add_setting( 'onepress_videolightbox_title',
        array(
            'sanitize_callback' => 'onepress_sanitize_text',
            'default'           => '',
        )
    );

    $wp_customize->add_control( new One_Press_Textarea_Custom_Control(
        $wp_customize,
        'onepress_videolightbox_title',
        array(
            'label'     	=>  esc_html__('Section heading', 'onepress'),
            'section' 		=> 'onepress_videolightbox_settings',
            'description'   => '',
        )
    ));

    // Video URL
    $wp_customize->add_setting( 'onepress_videolightbox_url',
        array(
            'sanitize_callback' => 'esc_url_raw',
            'default'           => '',
        )
    );
    $wp_customize->add_control( 'onepress_videolightbox_url',
        array(
            'label' 		=> esc_html__('Video url', 'onepress'),
            'section' 		=> 'onepress_videolightbox_settings',
            'description'   =>  esc_html__('Paste Youtube or Vimeo url here', 'onepress'),
        )
    );

    // Parallax image
    $wp_customize->add_setting( 'onepress_videolightbox_image',
        array(
            'sanitize_callback' => 'esc_url_raw',
            'default'           => '',
        )
    );
    $wp_customize->add_control( new WP_Customize_Image_Control(
        $wp_customize,
        'onepress_videolightbox_image',
        array(
            'label' 		=> esc_html__('Background image', 'onepress'),
            'section' 		=> 'onepress_videolightbox_settings',
        )
    ));



	/*------------------------------------------------------------------------*/
    /*  Section: About
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_about' ,
		array(
			'priority'        => 132,
			'title'           => esc_html__( 'Section: About', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

	$wp_customize->add_section( 'onepress_about_settings' ,
		array(
			'priority'    => 3,
			'title'       => esc_html__( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_about',
		)
	);

		// Show Content
		$wp_customize->add_setting( 'onepress_about_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_about_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide this section?', 'onepress'),
				'section'     => 'onepress_about_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_about_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => esc_html__('about', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_about_id',
			array(
				'label' 		=> esc_html__('Section ID:', 'onepress'),
				'section' 		=> 'onepress_about_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_about_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('About Us', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_about_title',
			array(
				'label' 		=> esc_html__('Section Title', 'onepress'),
				'section' 		=> 'onepress_about_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_about_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Section subtitle', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_about_subtitle',
			array(
				'label' 		=> esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_about_settings',
				'description'   => '',
			)
		);


	$wp_customize->add_section( 'onepress_about_content' ,
		array(
			'priority'    => 6,
			'title'       => esc_html__( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_about',
		)
	);

		// Order & Stlying
		$wp_customize->add_setting(
			'onepress_about_boxes',
			array(
				//'default' => '',
				'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
				'transport' => 'refresh', // refresh or postMessage
			) );


			$wp_customize->add_control(
				new Onepress_Customize_Repeatable_Control(
					$wp_customize,
					'onepress_about_boxes',
					array(
						'label' 		=> esc_html__('Content boxes', 'onepress'),
						'description'   => '',
						'section'       => 'onepress_about_content',
						'live_title_id' => 'content_page', // apply for unput text and textarea only
						'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
						'max_item'      => 3, // Maximum item can add
						//'allow_unlimited' => false, // Maximum item can add

						'fields'    => array(
							'content_page'  => array(
								'title' => esc_html__('Select a page', 'onepress'),
								'type'  =>'select',
								'options' => $option_pages
							),
							'hide_title'  => array(
								'title' => esc_html__('Hide item title', 'onepress'),
								'type'  =>'checkbox',
							),
							'enable_link'  => array(
								'title' => esc_html__('Link to single page', 'onepress'),
								'type'  =>'checkbox',
							),
						),

					)
				)
			);

	/*------------------------------------------------------------------------*/
    /*  Section: Services
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_services' ,
		array(
			'priority'        => 134,
			'title'           => esc_html__( 'Section: Services', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

	$wp_customize->add_section( 'onepress_service_settings' ,
		array(
			'priority'    => 3,
			'title'       => esc_html__( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_services',
		)
	);

		// Show Content
		$wp_customize->add_setting( 'onepress_service_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_service_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide this section?', 'onepress'),
				'section'     => 'onepress_service_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_service_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => esc_html__('services', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_service_id',
			array(
				'label'     => esc_html__('Section ID:', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_service_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Our Services', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_service_title',
			array(
				'label'     => esc_html__('Section Title', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_service_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Section subtitle', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_service_subtitle',
			array(
				'label'     => esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_service_content' ,
		array(
			'priority'    => 6,
			'title'       => esc_html__( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_services',
		)
	);

		// Section service content.
		$wp_customize->add_setting(
			'onepress_services',
			array(
				'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
				'transport' => 'refresh', // refresh or postMessage
			) );


		$wp_customize->add_control(
			new Onepress_Customize_Repeatable_Control(
				$wp_customize,
				'onepress_services',
				array(
					'label'     	=> esc_html__('Service content', 'onepress'),
					'description'   => '',
					'section'       => 'onepress_service_content',
					'live_title_id' => 'content_page', // apply for unput text and textarea only
					'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
					'max_item'      => 4, // Maximum item can add

					'fields'    => array(
						'icon' => array(
							'title' => esc_html__('Custom icon', 'onepress'),
							'type'  =>'text',
							'desc'  => sprintf( wp_kses_post('Paste your <a target="_blank" href="%1$s">Font Awesome</a> icon class name here.', 'onepress'), 'http://fortawesome.github.io/Font-Awesome/icons/' ),
							'default' => esc_html__( 'gg', 'onepress' ),
						),
						'content_page'  => array(
							'title' => esc_html__('Select a page', 'onepress'),
							'type'  =>'select',
							'options' => $option_pages
						),
						'enable_link'  => array(
							'title' => esc_html__('Link to single page', 'onepress'),
							'type'  =>'checkbox',
						),
					),

				)
			)
		);

	/*------------------------------------------------------------------------*/
    /*  Section: Counter
    /*------------------------------------------------------------------------*/
	$wp_customize->add_panel( 'onepress_counter' ,
		array(
			'priority'        => 134,
			'title'           => esc_html__( 'Section: Counter', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

	$wp_customize->add_section( 'onepress_counter_settings' ,
		array(
			'priority'    => 3,
			'title'       => esc_html__( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_counter',
		)
	);
		// Show Content
		$wp_customize->add_setting( 'onepress_counter_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_counter_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide this section?', 'onepress'),
				'section'     => 'onepress_counter_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_counter_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => esc_html__('counter', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_counter_id',
			array(
				'label'     	=> esc_html__('Section ID:', 'onepress'),
				'section' 		=> 'onepress_counter_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_counter_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Our Numbers', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_counter_title',
			array(
				'label'     	=> esc_html__('Section Title', 'onepress'),
				'section' 		=> 'onepress_counter_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_counter_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Section subtitle', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_counter_subtitle',
			array(
				'label'     	=> esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_counter_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_counter_content' ,
		array(
			'priority'    => 6,
			'title'       => esc_html__( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_counter',
		)
	);

	// Order & Styling
	$wp_customize->add_setting(
		'onepress_counter_boxes',
		array(
			'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
			'transport' => 'refresh', // refresh or postMessage
		) );


		$wp_customize->add_control(
			new Onepress_Customize_Repeatable_Control(
				$wp_customize,
				'onepress_counter_boxes',
				array(
					'label'     	=> esc_html__('Counter content', 'onepress'),
					'description'   => '',
					'section'       => 'onepress_counter_content',
					'live_title_id' => 'title', // apply for unput text and textarea only
					'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
					'max_item'      => 4, // Maximum item can add

					'fields'    => array(
						'title' => array(
							'title' => esc_html__('Title', 'onepress'),
							'type'  =>'text',
							'desc'  => '',
							'default' => esc_html__( 'Your counter label', 'onepress' ),
						),
						'number' => array(
							'title' => esc_html__('Number', 'onepress'),
							'type'  =>'text',
							'default' => 99,
						),
						'unit_before'  => array(
							'title' => esc_html__('Before number', 'onepress'),
							'type'  =>'text',
							'default' => '',
						),
						'unit_after'  => array(
							'title' => esc_html__('After number', 'onepress'),
							'type'  =>'text',
							'default' => '',
						),
					),

				)
			)
		);



	/*------------------------------------------------------------------------*/
    /*  Section: Team
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_team' ,
		array(
			'priority'        => 136,
			'title'           => esc_html__( 'Section: Team', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

	$wp_customize->add_section( 'onepress_team_settings' ,
		array(
			'priority'    => 3,
			'title'       => esc_html__( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_team',
		)
	);

		// Show Content
		$wp_customize->add_setting( 'onepress_team_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_team_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide this section?', 'onepress'),
				'section'     => 'onepress_team_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);
		// Section ID
		$wp_customize->add_setting( 'onepress_team_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => esc_html__('team', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_team_id',
			array(
				'label'     	=> esc_html__('Section ID:', 'onepress'),
				'section' 		=> 'onepress_team_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_team_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Our Team', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_team_title',
			array(
				'label'    		=> esc_html__('Section Title', 'onepress'),
				'section' 		=> 'onepress_team_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_team_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Section subtitle', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_team_subtitle',
			array(
				'label'     => esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_team_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_team_content' ,
		array(
			'priority'    => 6,
			'title'       => esc_html__( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_team',
		)
	);

		// Team member settings
		$wp_customize->add_setting(
			'onepress_team_members',
			array(
				'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
				'transport' => 'refresh', // refresh or postMessage
			) );


		$wp_customize->add_control(
			new Onepress_Customize_Repeatable_Control(
				$wp_customize,
				'onepress_team_members',
				array(
					'label'     => esc_html__('Team members', 'onepress'),
					'description'   => '',
					'section'       => 'onepress_team_content',
					//'live_title_id' => 'user_id', // apply for unput text and textarea only
					'title_format'  => esc_html__( '[live_title]', 'onepress'), // [live_title]
					'max_item'      => 4, // Maximum item can add
					'fields'    => array(
						'user_id' => array(
							'title' => esc_html__('User media', 'onepress'),
							'type'  =>'media',
							'desc'  => '',
						),
					),

				)
			)
		);

	/*------------------------------------------------------------------------*/
    /*  Section: News
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_news' ,
		array(
			'priority'        => 138,
			'title'           => esc_html__( 'Section: News', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

	$wp_customize->add_section( 'onepress_news_settings' ,
		array(
			'priority'    => 3,
			'title'       => esc_html__( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_news',
		)
	);

		// Show Content
		$wp_customize->add_setting( 'onepress_news_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_news_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide this section?', 'onepress'),
				'section'     => 'onepress_news_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_news_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => esc_html__('news', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_id',
			array(
				'label'     => esc_html__('Section ID:', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_news_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Latest News', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_title',
			array(
				'label'     => esc_html__('Section Title', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_news_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Section subtitle', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_subtitle',
			array(
				'label'     => esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => '',
			)
		);

		// hr
		$wp_customize->add_setting( 'onepress_news_settings_hr',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
			)
		);
		$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_news_settings_hr',
			array(
				'section'     => 'onepress_news_settings',
				'type'        => 'hr'
			)
		));

		// Number of post to show.
		$wp_customize->add_setting( 'onepress_news_number',
			array(
				'sanitize_callback' => 'onepress_sanitize_number',
				'default'           => '3',
			)
		);
		$wp_customize->add_control( 'onepress_news_number',
			array(
				'label'     	=> esc_html__('Number of post to show', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => '',
			)
		);

		// Blog Button
		$wp_customize->add_setting( 'onepress_news_more_link',
			array(
				'sanitize_callback' => 'esc_url',
				'default'           => '#',
			)
		);
		$wp_customize->add_control( 'onepress_news_more_link',
			array(
				'label'       => esc_html__('More News button link', 'onepress'),
				'section'     => 'onepress_news_settings',
				'description' => 'It should be your blog page link.'
			)
		);
		$wp_customize->add_setting( 'onepress_news_more_text',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Read Our Blog', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_more_text',
			array(
				'label'     	=> esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => '',
			)
		);

	/*------------------------------------------------------------------------*/
    /*  Section: Contact
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_contact' ,
		array(
			'priority'        => 140,
			'title'           => esc_html__( 'Section: Contact', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

	$wp_customize->add_section( 'onepress_contact_settings' ,
		array(
			'priority'    => 3,
			'title'       => esc_html__( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_contact',
		)
	);

		// Show Content
		$wp_customize->add_setting( 'onepress_contact_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide this section?', 'onepress'),
				'section'     => 'onepress_contact_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_contact_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => esc_html__('contact', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_id',
			array(
				'label'     => esc_html__('Section ID:', 'onepress'),
				'section' 		=> 'onepress_contact_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_contact_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Get in touch', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_title',
			array(
				'label'     => esc_html__('Section Title', 'onepress'),
				'section' 		=> 'onepress_contact_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_contact_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Section subtitle', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_subtitle',
			array(
				'label'     => esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_contact_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_contact_content' ,
		array(
			'priority'    => 6,
			'title'       => esc_html__( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_contact',
		)
	);
		// Contact form 7 guide.
		$wp_customize->add_setting( 'onepress_contact_cf7_guide',
			array(
				'sanitize_callback' => 'onepress_sanitize_text'
			)
		);
		$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_contact_cf7_guide',
			array(
				'section'     => 'onepress_contact_content',
				'type'        => 'custom_message',
				'description' => wp_kses_post( 'In order to display contact form please install <a target="_blank" href="https://wordpress.org/plugins/contact-form-7/">Contact Form 7</a> plugin and then copy the contact form shortcode and paste it here, the shortcode will be like this <code>[contact-form-7 id="xxxx" title="Example Contact Form"]</code>', 'onepress' )
			)
		));

		// Contact Form 7 Shortcode
		$wp_customize->add_setting( 'onepress_contact_cf7',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_cf7',
			array(
				'label'     	=> esc_html__('Contact Form 7 Shortcode.', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Show CF7
		$wp_customize->add_setting( 'onepress_contact_cf7_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_cf7_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide contact form completely.', 'onepress'),
				'section'     => 'onepress_contact_content',
				'description' => esc_html__('Check this box to hide contact form.', 'onepress'),
			)
		);

		// Contact Text
		$wp_customize->add_setting( 'onepress_contact_text',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => '',
			)
		);
		$wp_customize->add_control( new One_Press_Textarea_Custom_Control(
			$wp_customize,
			'onepress_contact_text',
			array(
				'label'     	=> esc_html__('Contact Text', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		));

		// hr
		$wp_customize->add_setting( 'onepress_contact_text_hr', array( 'sanitize_callback' => 'onepress_sanitize_text' ) );
		$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_contact_text_hr',
			array(
				'section'     => 'onepress_contact_content',
				'type'        => 'hr'
			)
		));

		// Address Box
		$wp_customize->add_setting( 'onepress_contact_address_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_address_title',
			array(
				'label'     	=> esc_html__('Contact Box Title', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Text
		$wp_customize->add_setting( 'onepress_contact_address',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_address',
			array(
				'label'     => esc_html__('Address', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Phone
		$wp_customize->add_setting( 'onepress_contact_phone',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_phone',
			array(
				'label'     	=> esc_html__('Phone', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Email
		$wp_customize->add_setting( 'onepress_contact_email',
			array(
				'sanitize_callback' => 'sanitize_email',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_email',
			array(
				'label'     	=> esc_html__('Email', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Fax
		$wp_customize->add_setting( 'onepress_contact_fax',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_contact_fax',
			array(
				'label'     	=> esc_html__('Fax', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		/**
		 * Hook to add other customize
		 */
		do_action( 'onepress_customize_after_register', $wp_customize );

}
add_action( 'customize_register', 'onepress_customize_register' );


/*------------------------------------------------------------------------*/
/*  OnePress Sanitize Functions.
/*------------------------------------------------------------------------*/

function onepress_sanitize_file_url( $file_url ) {
	$output = '';
	$filetype = wp_check_filetype( $file_url );
	if ( $filetype["ext"] ) {
		$output = esc_url( $file_url );
	}
	return $output;
}

function onepress_hero_fullscreen_callback ( $control ) {
	if ( $control->manager->get_setting('onepress_hero_fullscreen')->value() == '' ) {
        return true;
    } else {
        return false;
    }
}

function onepress_sanitize_number( $input ) {
    return balanceTags( $input );
}

function onepress_sanitize_hex_color( $color ) {
	if ( $color === '' ) {
		return '';
	}
	if ( preg_match('|^#([A-Fa-f0-9]{3}){1,2}$|', $color ) ) {
		return $color;
	}
	return null;
}

function onepress_sanitize_checkbox( $input ) {
    if ( $input == 1 ) {
		return 1;
    } else {
		return 0;
    }
}

function onepress_sanitize_text( $string ) {
	return wp_kses_post( balanceTags( $string ) );
}

function onepress_sanitize_html_input( $string ) {
	return wp_kses_allowed_html( $string );
}

function onepress_showon_frontpage() {
	return is_page_template( 'template-frontpage.php' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function onepress_customize_preview_js() {
	wp_enqueue_script( 'onepress_customizer_liveview', get_template_directory_uri() . '/assets/js/customizer-liveview.js', array( 'customize-preview' ), '20130508', true );

}
add_action( 'customize_preview_init', 'onepress_customize_preview_js' );



add_action( 'customize_controls_enqueue_scripts', 'opneress_customize_js_settings' );
function opneress_customize_js_settings(){
    if ( ! function_exists( 'onepress_get_actions_required' ) ) {
        return;
    }
    $actions = onepress_get_actions_required();
    $n = array_count_values( $actions );
    $number_action =  0;
    if ( $n && isset( $n['active'] ) ) {
        $number_action = $n['active'];
    }

    wp_localize_script( 'customize-controls', 'onepress_customizer_settings', array(
        'number_action' => $number_action,
        'is_plus_activated' => class_exists( 'OnePress_PLus' ) ? 'y' : 'n',
        'action_url' => admin_url( 'themes.php?page=ft_onepress&tab=actions_required' )
    ) );
}
