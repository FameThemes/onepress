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


	/*------------------------------------------------------------------------*/
    /*  Site Identity
    /*------------------------------------------------------------------------*/

    	$wp_customize->add_setting( 'onepress_site_text_logo',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('OnePress', 'onepress')
			)
		);
    	$wp_customize->add_control( 'onepress_site_text_logo',
			array(
				'label' 		=> __('Site Text Logo', 'onepress'),
				'section' 		=> 'title_tagline',
				'description'   => esc_html__('Your site text logo, use when image logo is empty.', 'onepress'),
			)
		);

    	$wp_customize->add_setting( 'onepress_site_image_logo',
			array(
				'sanitize_callback' => 'onepress_sanitize_file_url',
				'default'           => get_template_directory_uri() . '/assets/images/logo.png'
			)
		);
    	$wp_customize->add_control( new WP_Customize_Image_Control(
            $wp_customize,
            'onepress_site_image_logo',
				array(
					'label' 		=> __('Site Image Logo', 'onepress'),
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
			    'title'          => __( 'Theme Options', 'onepress' ),
			    'description'    => '',
			)
		);

		/* Global Settings
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_global_settings' ,
			array(
				'priority'    => 3,
				'title'       => __( 'Global', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
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
					'label'       => __('Disable animation effect?', 'onepress'),
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
					'label'       => __('Hide footer back to top?', 'onepress'),
					'section'     => 'onepress_global_settings',
					'description' => esc_html__('Check this box to hide footer back to top button.', 'onepress')
				)
			);

		/* Social Settings
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_social' ,
			array(
				'priority'    => 6,
				'title'       => __( 'Social Profiles', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
			)
		);

			// Order & Stlying
			$wp_customize->add_setting( 'onepress_social_footer_guide',
				array(
					'sanitize_callback' => 'onepress_sanitize_text'
				)
			);
			$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_social_footer_guide',
				array(
					'section'     => 'onepress_social',
					'type'        => 'custom_message',
					'description' => __( 'These social profiles setting below will display at the footer of your site.', 'onepress' )
				)
			));
			// Footer Social Title
			$wp_customize->add_setting( 'onepress_social_footer_title',
				array(
					'sanitize_callback' => 'sanitize_text_field',
					'default'           => __( 'Keep Updated', 'onepress' ),
				)
			);
			$wp_customize->add_control( 'onepress_social_footer_title',
				array(
					'label'       => __('Social Footer Title', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);

			// Twitter
			$wp_customize->add_setting( 'onepress_social_twitter',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '#',
				)
			);
			$wp_customize->add_control( 'onepress_social_twitter',
				array(
					'label'       => __('Twitter URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);
			// Facebook
			$wp_customize->add_setting( 'onepress_social_facebook',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '#',
				)
			);
			$wp_customize->add_control( 'onepress_social_facebook',
				array(
					'label'       => __('Faecbook URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);
			// Facebook
			$wp_customize->add_setting( 'onepress_social_google',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '#',
				)
			);
			$wp_customize->add_control( 'onepress_social_google',
				array(
					'label'       => __('Google Plus URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);
			// Instagram
			$wp_customize->add_setting( 'onepress_social_instagram',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => '#',
				)
			);
			$wp_customize->add_control( 'onepress_social_instagram',
				array(
					'label'       => __('Instagram URL', 'onepress'),
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
					'label'       => __('RSS URL', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);

		/* Newsletter Settings
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_newsletter' ,
			array(
				'priority'    => 9,
				'title'       => __( 'Newsletter', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
			)
		);
			// Disable Newsletter
			$wp_customize->add_setting( 'onepress_newsletter_disable',
				array(
					'sanitize_callback' => 'onepress_sanitize_checkbox',
					'default'           => '',
				)
			);
			$wp_customize->add_control( 'onepress_newsletter_disable',
				array(
					'type'        => 'checkbox',
					'label'       => __('Hide Footer Newsletter?', 'onepress'),
					'section'     => 'onepress_newsletter',
					'description' => esc_html__('Check this box to hide footer newsletter form.', 'onepress')
				)
			);

			// Mailchimp Form Title
			$wp_customize->add_setting( 'onepress_newsletter_title',
				array(
					'sanitize_callback' => 'sanitize_text_field',
					'default'           => __( 'Join our Newsletter', 'onepress' ),
				)
			);
			$wp_customize->add_control( 'onepress_newsletter_title',
				array(
					'label'       => __('Newsletter Form Title', 'onepress'),
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
					'label'       => __('MailChimp Action URL', 'onepress'),
					'section'     => 'onepress_newsletter',
					'description' => 'The newsletter form use MailChimp, please follow <a target="_blank" href="http://goo.gl/uRVIst">this guide</a> to know how to get MailChimp Action URL. Example <i>//famethemes.us8.list-manage.com/subscribe/post?u=521c400d049a59a4b9c0550c2&amp;id=83187e0006</i>'
				)
			);


	/*------------------------------------------------------------------------*/
    /*  Section: Hero
    /*------------------------------------------------------------------------*/

	$wp_customize->add_panel( 'onepress_hero_panel' ,
		array(
			'priority'    => 130,
			'title'       => __( 'Section: Hero', 'onepress' ),
			'description' => '',
		)
	);

		// Hero settings
		$wp_customize->add_section( 'onepress_hero_settings' ,
			array(
				'priority'    => 3,
				'title'       => __( 'Hero Settings', 'onepress' ),
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
					'label'       => __('Hide this section?', 'onepress'),
					'section'     => 'onepress_hero_settings',
					'description' => esc_html__('Check this box to hide this section.', 'onepress'),
				)
			);
			// Section ID
			$wp_customize->add_setting( 'onepress_hero_id',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => __('hero', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hero_id',
				array(
					'label' 		=> __('Section ID:', 'onepress'),
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
					'label'       => __('Make hero section full screen', 'onepress'),
					'section'     => 'onepress_hero_settings',
					'description' => esc_html__('Check this box to make hero section full screen.', 'onepress'),
				)
			);

			// Hero content padding top
			$wp_customize->add_setting( 'onepress_hero_pdtop',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => __('10', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hero_pdtop',
				array(
					'label'           => __('Padding Top:', 'onepress'),
					'section'         => 'onepress_hero_settings',
					'description'     => 'The hero content padding top in percent (%).',
					'active_callback' => 'onepress_hero_fullscreen_callback'
				)
			);

			// Hero content padding bottom
			$wp_customize->add_setting( 'onepress_hero_pdbotom',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => __('10', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hero_pdbotom',
				array(
					'label'           => __('Padding Bottom:', 'onepress'),
					'section'         => 'onepress_hero_settings',
					'description'     => 'The hero content padding bottom in percent (%).',
					'active_callback' => 'onepress_hero_fullscreen_callback'
				)
			);

		$wp_customize->add_section( 'onepress_hero_images' ,
			array(
				'priority'    => 6,
				'title'       => __( 'Hero Images', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_hero_panel',
			)
		);

			$wp_customize->add_setting( 'onepress_hero_image1',
				array(
					'sanitize_callback' => 'onepress_sanitize_file_url',
					'default'           => get_template_directory_uri() . '/assets/images/hero1.jpg'
				)
			);
	    	$wp_customize->add_control( new WP_Customize_Image_Control(
	            $wp_customize,
	            'onepress_hero_image1',
					array(
						'label' 		=> __('Hero Image #1', 'onepress'),
						'section' 		=> 'onepress_hero_images',
						'description'   => esc_html__('Suggestion size: larger than 1000px, if more than one image uploaded the hero section will become a background slideshow.', 'onepress'),
					)
				)
			);

			$wp_customize->add_setting( 'onepress_hero_image2',
				array(
					'sanitize_callback' => 'onepress_sanitize_file_url',
					'default'           => get_template_directory_uri() . '/assets/images/hero2.jpg'
				)
			);
	    	$wp_customize->add_control( new WP_Customize_Image_Control(
	            $wp_customize,
	            'onepress_hero_image2',
					array(
						'label' 		=> __('Hero Image #2', 'onepress'),
						'section' 		=> 'onepress_hero_images',
						'description'   => '',
					)
				)
			);

			$wp_customize->add_setting( 'onepress_hero_image3',
				array(
					'sanitize_callback' => 'onepress_sanitize_file_url',
					'default'           => get_template_directory_uri() . '/assets/images/hero3.jpg'
				)
			);
	    	$wp_customize->add_control( new WP_Customize_Image_Control(
	            $wp_customize,
	            'onepress_hero_image3',
					array(
						'label' 		=> __('Hero Image #3', 'onepress'),
						'section' 		=> 'onepress_hero_images',
						'description'   => '',
					)
				)
			);

			$wp_customize->add_setting( 'onepress_hero_image4',
				array(
					'sanitize_callback' => 'onepress_sanitize_file_url',
					'default'           => get_template_directory_uri() . '/assets/images/hero4.jpg'
				)
			);
	    	$wp_customize->add_control( new WP_Customize_Image_Control(
	            $wp_customize,
	            'onepress_hero_image4',
					array(
						'label' 		=> __('Hero Image #4', 'onepress'),
						'section' 		=> 'onepress_hero_images',
						'description'   => '',
					)
				)
			);

		$wp_customize->add_section( 'onepress_hero_content_layout1' ,
			array(
				'priority'    => 9,
				'title'       => __( 'Hero Content Layout 1', 'onepress' ),
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
					'label'       => __('Show this content layout', 'onepress'),
					'section'     => 'onepress_hero_content_layout1',
					'description' => esc_html__('Check this box to enable this content layout for hero section.', 'onepress'),
				)
			);

			// Large Text
			$wp_customize->add_setting( 'onepress_hcl1_largetext',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => __('We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress'),
				)
			);
			$wp_customize->add_control( new One_Press_Textarea_Custom_Control(
				$wp_customize,
				'onepress_hcl1_largetext',
				array(
					'label' 		=> __('Large Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1',
					'description'   => esc_html__('Text Rotating Guide: Put your rotate texts separate by "|" into <span class="js-rotating">...</span>, go to Customizer->Site Option->Animate to control rotate animation.', 'onepress'),
				)
			));

			// Small Text
			$wp_customize->add_setting( 'onepress_hcl1_smalltext',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => __('An independent digital design studio in <strong>New York City.</strong> <br>We bring creativity and intelligence to the most beloved brands.', 'onepress'),
				)
			);
			$wp_customize->add_control( new One_Press_Textarea_Custom_Control(
				$wp_customize,
				'onepress_hcl1_smalltext',
				array(
					'label' 		=> __('Small Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1',
					'description'   => esc_html__('You can use text rotate slider in this textarea too.', 'onepress'),
				)
			));

			// Button #1 Text
			$wp_customize->add_setting( 'onepress_hcl1_btn1_text',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => __('More About Us', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn1_text',
				array(
					'label' 		=> __('Button #1 Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

			// Button #1 Link
			$wp_customize->add_setting( 'onepress_hcl1_btn1_link',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => esc_url( home_url( '/' )).__('#about', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn1_link',
				array(
					'label' 		=> __('Button #1 Link', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

			// Button #2 Text
			$wp_customize->add_setting( 'onepress_hcl1_btn2_text',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => __('Our Services', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn2_text',
				array(
					'label' 		=> __('Button #2 Text', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

			// Button #2 Link
			$wp_customize->add_setting( 'onepress_hcl1_btn2_link',
				array(
					'sanitize_callback' => 'esc_url',
					'default'           => esc_url( home_url( '/' )).__('#services', 'onepress'),
				)
			);
			$wp_customize->add_control( 'onepress_hcl1_btn2_link',
				array(
					'label' 		=> __('Button #2 Link', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1'
				)
			);

	/*------------------------------------------------------------------------*/
    /*  Section: About
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_about' ,
		array(
			'priority'    => 132,
			'title'       => __( 'Section: About', 'onepress' ),
			'description' => '',
		)
	);

	$wp_customize->add_section( 'onepress_about_settings' ,
		array(
			'priority'    => 3,
			'title'       => __( 'Section Settings', 'onepress' ),
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
				'label'       => __('Hide this section?', 'onepress'),
				'section'     => 'onepress_about_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_about_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('about', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_about_id',
			array(
				'label' 		=> __('Section ID:', 'onepress'),
				'section' 		=> 'onepress_about_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_about_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('More About Us', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_about_title',
			array(
				'label' 		=> __('Section Title', 'onepress'),
				'section' 		=> 'onepress_about_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_about_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('We are a digital studio', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_about_subtitle',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_about_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_about_content' ,
		array(
			'priority'    => 6,
			'title'       => __( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_about',
		)
	);

		// Order & Stlying

		$wp_customize->add_setting(
			'onepress_about_boxes',
			array(
				'default' => json_encode(
					array(
						array(
							'title' => __( 'OUR HISTORY', 'onepress' ),
							'thumb' 		=> array(
								'url'=> get_template_directory_uri().'/assets/images/about1.jpg',
							),
							'content' => __( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ),
						),

						array(
							'title' => __( 'OUR ACHIEVEMENTS', 'onepress' ),
							'thumb' 		=> array(
								'url'=> get_template_directory_uri().'/assets/images/about2.jpg',
							),
							'content' => __( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ),
						),
						array(
							'title' => __( 'OUR VISION', 'onepress' ),
							'thumb' 		=> array(
								'url'=> get_template_directory_uri().'/assets/images/about3.jpg',
							),
							'content' => __( 'Nullam ut tempor eros. Donec faucibus, velit et imperdiet aliquam, lacus velit luctus urna, vitae porttitor orci libero id felis.', 'onepress' ),
						),


					)
				),
				'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
				'transport' => 'refresh', // refresh or postMessage
			) );


			$wp_customize->add_control(
				new Onepress_Customize_Repeatable_Control(
					$wp_customize,
					'onepress_about_boxes',
					array(
						'label' 		=> __('Content boxes', 'onepress'),
						'description'   => '',
						'section'       => 'onepress_about_content',
						'live_title_id' => 'title', // apply for unput text and textarea only
						'title_format'  => __('[live_title]', 'onepress'), // [live_title]
						'max_item'      => 3, // Maximum item can add
						'allow_unlimited' => false, // Maximum item can add

						'fields'    => array(
							'title' => array(
								'title' => __('Title', 'onepress'),
								'type'  =>'text',
							),
							'thumb' => array(
								'title' => __('Thumbnail', 'onepress'),
								'type'  =>'media',
							),
							'content'  => array(
								'title' => __('Description', 'onepress'),
								'type'  =>'textarea',

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
			'priority'    => 134,
			'title'       => __( 'Section: Services', 'onepress' ),
			'description' => '',
		)
	);

	$wp_customize->add_section( 'onepress_service_settings' ,
		array(
			'priority'    => 3,
			'title'       => __( 'Section Settings', 'onepress' ),
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
				'label'       => __('Hide this section?', 'onepress'),
				'section'     => 'onepress_service_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_service_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('services', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_service_id',
			array(
				'label' 		=> __('Section ID:', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_service_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Our Services', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_service_title',
			array(
				'label' 		=> __('Section Title', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_service_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('We help client like you', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_service_subtitle',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_service_content' ,
		array(
			'priority'    => 6,
			'title'       => __( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_services',
		)
	);

		// Order & Styling
		$wp_customize->add_setting(
			'onepress_services',
			array(
				'default' => json_encode(
					array(
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
							'icon'  => 'fa-wikipedia-w',
							'content' => __( 'Enabling user engagement through smart technology solutions.', 'onepress' )
						),

					)
				),
				'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
				'transport' => 'refresh', // refresh or postMessage
			) );


		$wp_customize->add_control(
			new Onepress_Customize_Repeatable_Control(
				$wp_customize,
				'onepress_services',
				array(
					'label' 		=> __('Service content', 'onepress'),
					'description'   => '',
					'section'       => 'onepress_service_content',
					'live_title_id' => 'title', // apply for unput text and textarea only
					'title_format'  => __('[live_title]', 'onepress'), // [live_title]
					'max_item'      => 4, // Maximum item can add

					'fields'    => array(
						'title' => array(
							'title' => __('Title', 'onepress'),
							'type'  =>'text',
							'desc'  => '',
							'default' => __( 'Your service title', 'onepress' ),
						),
						'icon' => array(
							'title' => __('Icon', 'onepress'),
							'type'  =>'text',
							'desc'  => sprintf( __('Paste your <a target="_blank" href="%1$s">Font Awesome</a> icon class name here.', 'onepress'), 'http://fortawesome.github.io/Font-Awesome/icons/' ),
							'default' => __( 'gg', 'onepress' ),
						),
						'content'  => array(
							'title' => __('Description', 'onepress'),
							'desc'  => __('Something about this service', 'onepress'),
							'type'  =>'textarea',
							'default' => __( 'Your service description here', 'onepress' ),
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
			'priority'    => 134,
			'title'       => __( 'Section: Counter', 'onepress' ),
			'description' => '',
		)
	);

	$wp_customize->add_section( 'onepress_counter_settings' ,
		array(
			'priority'    => 3,
			'title'       => __( 'Section Settings', 'onepress' ),
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
				'label'       => __('Hide this section?', 'onepress'),
				'section'     => 'onepress_counter_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_counter_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('counter', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_counter_id',
			array(
				'label' 		=> __('Section ID:', 'onepress'),
				'section' 		=> 'onepress_counter_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_counter_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Our Numbers', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_counter_title',
			array(
				'label' 		=> __('Section Title', 'onepress'),
				'section' 		=> 'onepress_counter_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_counter_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Some Fun Facts', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_counter_subtitle',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_counter_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_counter_content' ,
		array(
			'priority'    => 6,
			'title'       => __( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_counter',
		)
	);

	// Order & Styling
	$wp_customize->add_setting(
		'onepress_counter_boxes',
		array(
			'default' => json_encode(
				array(

					array(
						'title' => __( 'Projects completed', 'onepress' ),
						'number'  => '268',
						'unit_before' => '',
						'unit_after' => ''
					),

					array(
						'title' => __( 'Line of codes', 'onepress' ),
						'number'  => '2569',
						'unit_before' => '',
						'unit_after' => 'k'
					),

					array(
						'title' => __( 'Coffees', 'onepress' ),
						'number'  => '984',
						'unit_before' => '',
						'unit_after' => 'k'
					),

					array(
						'title' => __( 'Feedback', 'onepress' ),
						'number'  => '198',
						'unit_before' => '',
						'unit_after' => '',
					),

				)
			),
			'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
			'transport' => 'refresh', // refresh or postMessage
		) );


		$wp_customize->add_control(
			new Onepress_Customize_Repeatable_Control(
				$wp_customize,
				'onepress_counter_boxes',
				array(
					'label' 		=> __('Counter content', 'onepress'),
					'description'   => '',
					'section'       => 'onepress_counter_content',
					'live_title_id' => 'title', // apply for unput text and textarea only
					'title_format'  => __('[live_title]', 'onepress'), // [live_title]
					'max_item'      => 4, // Maximum item can add

					'fields'    => array(
						'title' => array(
							'title' => __('Title', 'onepress'),
							'type'  =>'text',
							'desc'  => '',
							'default' => __( 'Your counter label', 'onepress' ),
						),
						'number' => array(
							'title' => __('Number', 'onepress'),
							'type'  =>'text',
							'default' => 99,
						),
						'unit_before'  => array(
							'title' => __('Before number', 'onepress'),
							'type'  =>'text',
							'default' => '',
						),
						'unit_after'  => array(
							'title' => __('After number', 'onepress'),
							'type'  =>'text',
							'default' => '',
						),
					),

				)
			)
		);

	/*------------------------------------------------------------------------*/
	/*  Section: Testimonials
	/*------------------------------------------------------------------------*/
	$wp_customize->add_panel( 'onepress_testimonial' ,
		array(
			'priority'    => 134,
			'title'       => __( 'Section: Testimonial', 'onepress' ),
			'description' => '',
		)
	);

	$wp_customize->add_section( 'onepress_testimonial_settings' ,
		array(
			'priority'    => 3,
			'title'       => __( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_testimonial',
		)
	);
		// Show Content
		$wp_customize->add_setting( 'onepress_testimonial_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_testimonial_disable',
			array(
				'type'        => 'checkbox',
				'label'       => __('Hide this section?', 'onepress'),
				'section'     => 'onepress_testimonial_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_testimonial_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('testimonials', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_testimonial_id',
			array(
				'label' 		=> __('Section ID:', 'onepress'),
				'section' 		=> 'onepress_testimonial_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_testimonial_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Testimonials', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_testimonial_title',
			array(
				'label' 		=> __('Section Title', 'onepress'),
				'section' 		=> 'onepress_counter_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_testimonial_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('You are in good company!', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_testimonial_subtitle',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_testimonial_settings',
				'description'   => '',
			)
		);


	/*------------------------------------------------------------------------*/
    /*  Section: Team
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_team' ,
		array(
			'priority'    => 136,
			'title'       => __( 'Section: Team', 'onepress' ),
			'description' => '',
		)
	);

	$wp_customize->add_section( 'onepress_team_settings' ,
		array(
			'priority'    => 3,
			'title'       => __( 'Section Settings', 'onepress' ),
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
				'label'       => __('Hide this section?', 'onepress'),
				'section'     => 'onepress_team_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);
		// Section ID
		$wp_customize->add_setting( 'onepress_team_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('team', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_team_id',
			array(
				'label' 		=> __('Section ID:', 'onepress'),
				'section' 		=> 'onepress_team_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_team_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Meet the Talents', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_team_title',
			array(
				'label' 		=> __('Section Title', 'onepress'),
				'section' 		=> 'onepress_team_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_team_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('We are OnePress', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_team_subtitle',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_team_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_team_content' ,
		array(
			'priority'    => 6,
			'title'       => __( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_team',
		)
	);
		// remove_theme_mod( 'onepress_team_members' );
		// Order & Stlying
		$wp_customize->add_setting(
			'onepress_team_members',
			array(
				'default' => json_encode(
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
				),
				'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
				'transport' => 'refresh', // refresh or postMessage
			) );


		$wp_customize->add_control(
			new Onepress_Customize_Repeatable_Control(
				$wp_customize,
				'onepress_team_members',
				array(
					'label' 		=> __('Team members', 'onepress'),
					'description'   => '',
					'section'       => 'onepress_team_content',
					'live_title_id' => 'name', // apply for unput text and textarea only
					'title_format'  => __( '[live_title]', 'onepress'), // [live_title]
					'max_item'      => 6, // Maximum item can add

					'fields'    => array(
						'name' => array(
							'title' => __('Name', 'onepress'),
							'type'  =>'text',
							'desc'  => '',
							'default'  => __('Member name', 'onepress'),
						),
						'position' => array(
							'title' => __('Position', 'onepress'),
							'type'  =>'text',
							'default'  => __('Member Position', 'onepress'),
						),
						'image' => array(
							'title' => __('Avatar', 'onepress'),
							'type'  =>'media',
							'default' => array(
								'url' => get_template_directory_uri().'/assets/images/user_avatar.jpg',
								'id' => ''
							)
						),
						'facebook' => array(
							'title' => __('Facebook', 'onepress'),
							'type'  =>'text',
							'default'  => '',
						),
						'twitter' => array(
							'title' => __('Twitter', 'onepress'),
							'type'  =>'text',
						),
						'google_plus' => array(
							'title' => __('Google+', 'onepress'),
							'type'  =>'text',
						),
						'youtube' => array(
							'title' => __('Youtube', 'onepress'),
							'type'  =>'text',
						),
						'linkedin' => array(
							'title' => __('LinkedIn', 'onepress'),
							'type'  =>'text',
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
			'priority'    => 138,
			'title'       => __( 'Section: News', 'onepress' ),
			'description' => '',
		)
	);

	$wp_customize->add_section( 'onepress_news_settings' ,
		array(
			'priority'    => 3,
			'title'       => __( 'Section Settings', 'onepress' ),
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
				'label'       => __('Hide this section?', 'onepress'),
				'section'     => 'onepress_news_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_news_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('news', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_id',
			array(
				'label' 		=> __('Section ID:', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_news_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Latest News', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_title',
			array(
				'label' 		=> __('Section Title', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_news_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('The company blog', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_subtitle',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
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
				'label' 		=> __('Number of post to show', 'onepress'),
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
				'label'       => __('More News button link', 'onepress'),
				'section'     => 'onepress_news_settings',
				'description' => 'It should be your blog page link.'
			)
		);
		$wp_customize->add_setting( 'onepress_news_more_text',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Read Our Blog', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_news_more_text',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => '',
			)
		);

	/*------------------------------------------------------------------------*/
    /*  Section: Contact
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_contact' ,
		array(
			'priority'    => 140,
			'title'       => __( 'Section: Contact', 'onepress' ),
			'description' => '',
		)
	);

	$wp_customize->add_section( 'onepress_contact_settings' ,
		array(
			'priority'    => 3,
			'title'       => __( 'Section Settings', 'onepress' ),
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
				'label'       => __('Hide this section?', 'onepress'),
				'section'     => 'onepress_contact_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_contact_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('contact', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_id',
			array(
				'label' 		=> __('Section ID:', 'onepress'),
				'section' 		=> 'onepress_contact_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_contact_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Get in touch', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_title',
			array(
				'label' 		=> __('Section Title', 'onepress'),
				'section' 		=> 'onepress_contact_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_contact_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => __('Talk with us', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_subtitle',
			array(
				'label' 		=> __('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_contact_settings',
				'description'   => '',
			)
		);

	$wp_customize->add_section( 'onepress_contact_content' ,
		array(
			'priority'    => 6,
			'title'       => __( 'Section Content', 'onepress' ),
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
				'description' => __( 'In order to display contact form please install <a target="_blank" href="https://wordpress.org/plugins/contact-form-7/">Contact Form 7</a> plugin and then copy the contact form shortcode and paste it here, the shortcode will be like this <code>[contact-form-7 id="xxxx" title="Example Contact Form"]</code>', 'onepress' )
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
				'label' 		=> __('Contact Form 7 Shortcode.', 'onepress'),
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
				'label'       => __('Hide contact form completely.', 'onepress'),
				'section'     => 'onepress_contact_content',
				'description' => esc_html__('Check this box to hide contact form.', 'onepress'),
			)
		);

		// Contact Text
		$wp_customize->add_setting( 'onepress_contact_text',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('<h4>WE ARE ACCEPTING NEW PROJECTS.</h4>
<p>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar scelerisque dictum. Donec iaculis, diam sit amet suscipit feugiat, diam magna volutpat augue.</p>
<p>Consectetur adipiscing elit. Suspendisse pulvinar scelerisque dictum. Donec iaculis, diam sit amet suscipit feugiat, diam magna volutpat augue.</p>', 'onepress'),
			)
		);
		$wp_customize->add_control( new One_Press_Textarea_Custom_Control(
			$wp_customize,
			'onepress_contact_text',
			array(
				'label' 		=> __('Contact Text', 'onepress'),
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
				'default'           => __('Where to meet?', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_address_title',
			array(
				'label' 		=> __('Contact Box Title', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Text
		$wp_customize->add_setting( 'onepress_contact_address',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('1 Infinite Loop <br> Cupertino <br> CA 95014 <br> United States', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_address',
			array(
				'label' 		=> __('Address', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Phone
		$wp_customize->add_setting( 'onepress_contact_phone',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('1.123.456.789', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_phone',
			array(
				'label' 		=> __('Phone', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Email
		$wp_customize->add_setting( 'onepress_contact_email',
			array(
				'sanitize_callback' => 'sanitize_email',
				'default'           => __('contact@company.com', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_email',
			array(
				'label' 		=> __('Email', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

		// Contact Fax
		$wp_customize->add_setting( 'onepress_contact_fax',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => __('Fax: (123) 123-4567', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_contact_fax',
			array(
				'label' 		=> __('Fax', 'onepress'),
				'section' 		=> 'onepress_contact_content',
				'description'   => '',
			)
		);

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
    return force_balance_tags( $input );
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


/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function onepress_customize_preview_js() {
	wp_enqueue_script( 'onepress_customizer_liveview', get_template_directory_uri() . '/assets/js/customizer-liveview.js', array( 'customize-preview' ), '20130508', true );
}
add_action( 'customize_preview_init', 'onepress_customize_preview_js' );
