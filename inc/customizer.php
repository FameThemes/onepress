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

	// Remove default control.

	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';


	//$wp_customize->add_panel( 'test_panel_repeatable', array( 'priority' => 5, 'title' => esc_html__( 'Repeatable Panel', 'ctypo' ) ) );
	$wp_customize->add_section(
		'test_section_repeatable',
		// array( 'panel' => 'test_panel_repeatable', 'title' => esc_html__( 'Repeatable Section', 'ctypo' ) )
		array(  'title' => esc_html__( 'Repeatable Section', 'ctypo' ), 'priority' => 2, )
	);

	// @todo Better sanitize_callback functions.
	$wp_customize->add_setting(
		'new_repeatable_id',
		array(
			'default' => json_encode(
				array(
					array(
						'id_name_1' => 'Item 1',
						'id_name_color' => '#333333',
						'id_name_2'  => 'la la la',
						'id_name_3'     => array(
							'id'=>'2324324',
							'url'=>'',
						),
					),

					array(
						'id_name_1' => 'Item 2',
						'id_name_color' => '#333333',
						'id_name_2'  => 'la la la',
						'id_name_3'     => array(
							'id'=>'2324324',
							'url'=>'',
						),
					),
				)
			),
			//'sanitize_callback' => 'sanitize_repeatable_data_field',
			'sanitize_callback' => 'wentasi_sanitize_repeatable_data_field',
			'transport' => 'refresh', // refresh or postMessage
		) );

	$pages = get_pages( );

	$option_pages = array();
	$option_pages[ 0 ] = __( 'Select Page', 'domain' );

	foreach ( $pages as $p ) {
		$option_pages[ $p->ID ] =  $p->post_title;
	}

	$wp_customize->add_control(
		new Wentasi_Customize_Repeatable_Control(
			$wp_customize,
			'new_repeatable_id',
			array(
				'label' 		=> __('Repeatable Field', 'wentasi'),
				'description'   => 'dsadadasdasas',
				'section'       => 'test_section_repeatable',
				'live_title_id' => 'id_name_1', // apply for unput text and textarea only
				'title_format'  => __('Abc: ', 'wentasi'), // [live_title]
				'max_item'      => 3, // Maximum item can add

				'fields'    => array(
					'id_name_1' => array(
						'title'=>'text title',
						'type'=>'text',
						//'default' =>'default_value',
						'desc' =>'this is description text'
					),
					'id_name_color' => array(
						'title'=>'Color',
						'type'=>'color',
						//'default' =>'default_value',
						'desc' =>'this is description text'
					),
					'id_name_2'  => array(
						'title'=>'textarea title',
						'type'=>'textarea',
						//'default' =>'default_value',
						'desc' =>'this is description text'

					),
					'id_name_3'     => array(
						'title'=>'media title',
						'type'=>'media',
						'default'=> array(
							'id'=>'',
							'url'=>'',
						),
						'desc' =>'this is description text',
					),
					'id_page'    => array(
						'title'=>'Select Page',
						'type'=>'select',
						'multiple'=> false, // false
						'desc' =>'this is description text',
						'options' => $option_pages,
						//'default'=> 'option_1',
					),

					'id_name_4'    => array(
						'title'=>'select title',
						'type'=>'select',
						'multiple'=> true, // false
						'desc' =>'this is description text',
						'options' => array(
							'option_1' => 'label for option 1',
							'option_2' => 'label for option 2',
							'option_3' => 'label for option 3',
						),
						//'default'=> 'option_1',
					),
					'select_one'    => array(
						'title'=>'select title',
						'type'=>'select',
						'multiple'=> false, // false
						'desc' =>'this is description text',
						'options' => array(
							'option_1' => 'label for option 1',
							'option_2' => 'label for option 2',
							'option_3' => 'label for option 3',
						),
						//'default'=> 'option_3',
					),
					'id_name_5'     => array(
						'title'=>'radio title',
						'type'=>'radio',
						'desc' =>'this is description text',
						'options' => array(
							'option_1' => 'label for option 1',
							'option_2' => 'label for option 2',
							'option_3' => 'label for option 3',
						),
						//'default'=> 'option_1'
					),
					'id_name_6'  => array(
						'title'=>'checkbox title',
						'desc' =>'this is description text',
						'type'=>'checkbox',
						//'value'=> 'option_1'
					),
				),

			)
		)
	);





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

    	/*
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
		*/

	/*------------------------------------------------------------------------*/
    /*  Site Options
    /*------------------------------------------------------------------------*/
		$wp_customize->add_panel( 'onepress_options',
			array(
				'priority'       => 22,
			    'capability'     => 'edit_theme_options',
			    'theme_supports' => '',
			    'title'          => __( 'Site Options', 'onepress' ),
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
			'priority'    => 26,
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
			'priority'    => 26,
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
		$wp_customize->add_setting( 'onepress_about_content_guide',
			array(
				'sanitize_callback' => 'onepress_sanitize_text'
			)
		);
		$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_about_content_guide',
			array(
				'section'     => 'onepress_about_content',
				'type'        => 'custom_message',
				'description' => __( 'In order to add content for About section please go to <strong>Customizer &rarr; Widgets &rarr; Section: About</strong>, click Add a Widget and select <strong>OnePress: About Item</strong> widget.', 'onepress' )
			)
		));



	/*------------------------------------------------------------------------*/
    /*  Section: Services
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_services' ,
		array(
			'priority'    => 26,
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

		// Order & Stlying
		$wp_customize->add_setting( 'onepress_service_content_guide',
			array(
				'sanitize_callback' => 'onepress_sanitize_text'
			)
		);
		$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_service_content_guide',
			array(
				'section'     => 'onepress_service_content',
				'type'        => 'custom_message',
				'description' => __( 'In order to add content for Services section please go to <strong>Customizer &rarr; Widgets &rarr; Section: Services</strong>, click Add a Widget and select <strong>OnePress: Service Item</strong> widget.', 'onepress' )
			)
		));


	/*------------------------------------------------------------------------*/
    /*  Section: Team
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_team' ,
		array(
			'priority'    => 26,
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

		// Order & Stlying
		$wp_customize->add_setting( 'onepress_team_content_guide',
			array(
				'sanitize_callback' => 'onepress_sanitize_text'
			)
		);
		$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_team_content_guide',
			array(
				'section'     => 'onepress_team_content',
				'type'        => 'custom_message',
				'description' => __( 'In order to add team member please go to <strong>Customizer &rarr; Widgets &rarr; Section: Team</strong>, click Add a Widget and select <strong>OnePress: Team Member</strong> widget.', 'onepress' )
			)
		));


	/*------------------------------------------------------------------------*/
    /*  Section: News
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_news' ,
		array(
			'priority'    => 26,
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
			'priority'    => 26,
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
