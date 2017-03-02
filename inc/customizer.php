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


	// Load custom controls.
	require get_template_directory() . '/inc/customizer-controls.php';

	// Remove default sections.
	$wp_customize->remove_section( 'colors' );
	$wp_customize->remove_section( 'background_image' );

	// Custom WP default control & settings.
	$wp_customize->get_section( 'title_tagline' )->title = esc_html__('Site Title, Tagline & Logo', 'onepress');
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	/**
	 * Hook to add other customize
	 */
	do_action( 'onepress_customize_before_register', $wp_customize );


	$pages  =  get_pages();
	$option_pages = array();
	$option_pages[0] = esc_html__( 'Select page', 'onepress' );
	foreach( $pages as $p ){
		$option_pages[ $p->ID ] = $p->post_title;
	}

	$users = get_users( array(
		'orderby'      => 'display_name',
		'order'        => 'ASC',
		'number'       => '',
	) );

	$option_users[0] = esc_html__( 'Select member', 'onepress' );
	foreach( $users as $user ){
		$option_users[ $user->ID ] = $user->display_name;
	}

	/*------------------------------------------------------------------------*/
    /*  Site Identity.
    /*------------------------------------------------------------------------*/

        $is_old_logo = get_theme_mod( 'onepress_site_image_logo' );

        $wp_customize->add_setting( 'onepress_hide_sitetitle',
            array(
                'sanitize_callback' => 'onepress_sanitize_checkbox',
                'default'           => $is_old_logo ? 1: 0,
            )
        );
        $wp_customize->add_control(
            'onepress_hide_sitetitle',
            array(
                'label' 		=> esc_html__('Hide site title', 'onepress'),
                'section' 		=> 'title_tagline',
                'type'          => 'checkbox',
            )
        );

        $wp_customize->add_setting( 'onepress_hide_tagline',
            array(
                'sanitize_callback' => 'onepress_sanitize_checkbox',
                'default'           => $is_old_logo ? 1: 0,
            )
        );
        $wp_customize->add_control(
            'onepress_hide_tagline',
            array(
                'label' 		=> esc_html__('Hide site tagline', 'onepress'),
                'section' 		=> 'title_tagline',
                'type'          => 'checkbox',

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

            // Sidebar settings
            $wp_customize->add_setting( 'onepress_layout',
                array(
                    'sanitize_callback' => 'sanitize_text_field',
                    'default'           => 'right-sidebar',
                    //'transport'			=> 'postMessage'
                )
            );
            $wp_customize->add_control( 'onepress_layout',
                array(
                    'type'        => 'select',
                    'label'       => esc_html__('Site Layout', 'onepress'),
                    'description'       => esc_html__('Site Layout, apply for all pages, exclude home page and custom page templates.', 'onepress'),
                    'section'     => 'onepress_global_settings',
                    'choices' => array(
                        'right-sidebar' => esc_html__('Right sidebar', 'onepress'),
                        'left-sidebar' => esc_html__('Left sidebar', 'onepress'),
                        'no-sidebar' => esc_html__('No sidebar', 'onepress'),
                    )
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
					'transport'			=> 'postMessage'
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


		/* Colors
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_colors_settings' ,
			array(
				'priority'    => 4,
				'title'       => esc_html__( 'Site Colors', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
			)
		);
			// Primary Color
			$wp_customize->add_setting( 'onepress_primary_color', array('sanitize_callback' => 'sanitize_hex_color_no_hash', 'sanitize_js_callback' => 'maybe_hash_hex_color', 'default' => '#03c4eb' ) );
			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_primary_color',
				array(
					'label'       => esc_html__( 'Primary Color', 'onepress' ),
					'section'     => 'onepress_colors_settings',
					'description' => '',
					'priority'    => 1
				)
			));

            // Footer BG Color
            $wp_customize->add_setting( 'onepress_footer_bg', array(
                'sanitize_callback' => 'sanitize_hex_color_no_hash',
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                'default' => '',
                'transport' => 'postMessage'
            ) );
            $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_bg',
                array(
                    'label'       => esc_html__( 'Footer Background', 'onepress' ),
                    'section'     => 'onepress_colors_settings',
                    'description' => '',
                )
            ));

            // Footer Widgets Color
            $wp_customize->add_setting( 'onepress_footer_info_bg', array(
                'sanitize_callback' => 'sanitize_hex_color_no_hash',
                'sanitize_js_callback' => 'maybe_hash_hex_color',
                'default' => '',
                'transport' => 'postMessage'
            ) );
            $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_footer_info_bg',
                array(
                    'label'       => esc_html__( 'Footer Info Background', 'onepress' ),
                    'section'     => 'onepress_colors_settings',
                    'description' => '',
                )
            ));
    

		/* Header
		----------------------------------------------------------------------*/
		$wp_customize->add_section( 'onepress_header_settings' ,
			array(
				'priority'    => 5,
				'title'       => esc_html__( 'Header', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_options',
			)
		);

		// Header BG Color
		$wp_customize->add_setting( 'onepress_header_bg_color',
			array(
				'sanitize_callback' => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default' => ''
			) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_header_bg_color',
			array(
				'label'       => esc_html__( 'Background Color', 'onepress' ),
				'section'     => 'onepress_header_settings',
				'description' => '',
			)
		));


		// Site Title Color
		$wp_customize->add_setting( 'onepress_logo_text_color',
			array(
				'sanitize_callback' => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default' => ''
			) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_logo_text_color',
			array(
				'label'       => esc_html__( 'Site Title Color', 'onepress' ),
				'section'     => 'onepress_header_settings',
				'description' => esc_html__( 'Only set if you don\'t use an image logo.', 'onepress' ),
			)
		));

		// Header Menu Color
		$wp_customize->add_setting( 'onepress_menu_color',
			array(
				'sanitize_callback' => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default' => ''
			) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_color',
			array(
				'label'       => esc_html__( 'Menu Link Color', 'onepress' ),
				'section'     => 'onepress_header_settings',
				'description' => '',
			)
		));

		// Header Menu Hover Color
		$wp_customize->add_setting( 'onepress_menu_hover_color',
			array(
				'sanitize_callback' => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default' => ''
			) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_hover_color',
			array(
				'label'       => esc_html__( 'Menu Link Hover/Active Color', 'onepress' ),
				'section'     => 'onepress_header_settings',
				'description' => '',

			)
		));

		// Header Menu Hover BG Color
		$wp_customize->add_setting( 'onepress_menu_hover_bg_color',
			array(
				'sanitize_callback' => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default' => ''
			) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_hover_bg_color',
			array(
				'label'       => esc_html__( 'Menu Link Hover/Active BG Color', 'onepress' ),
				'section'     => 'onepress_header_settings',
				'description' => '',
			)
		));

		// Reponsive Mobie button color
		$wp_customize->add_setting( 'onepress_menu_toggle_button_color',
			array(
				'sanitize_callback' => 'sanitize_hex_color_no_hash',
				'sanitize_js_callback' => 'maybe_hash_hex_color',
				'default' => ''
			) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'onepress_menu_toggle_button_color',
			array(
				'label'       => esc_html__( 'Responsive Menu Button Color', 'onepress' ),
				'section'     => 'onepress_header_settings',
				'description' => '',
			)
		));

		// Vertical align menu
		$wp_customize->add_setting( 'onepress_vertical_align_menu',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_vertical_align_menu',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Center vertical align for menu', 'onepress'),
				'section'     => 'onepress_header_settings',
				'description' => esc_html__('If you use logo and your logo is too tall, check this box to auto vertical align menu.', 'onepress')
			)
		);

		// Header Transparent
        $wp_customize->add_setting( 'onepress_header_transparent',
            array(
                'sanitize_callback' => 'onepress_sanitize_checkbox',
                'default'           => '',
                'active_callback'   => 'onepress_showon_frontpage'
            )
        );
        $wp_customize->add_control( 'onepress_header_transparent',
            array(
                'type'        => 'checkbox',
                'label'       => esc_html__('Header Transparent', 'onepress'),
                'section'     => 'onepress_header_settings',
                'description' => esc_html__('Apply for front page template only.', 'onepress')
            )
        );

        $wp_customize->add_setting( 'onepress_header_scroll_logo',
            array(
                'sanitize_callback' => 'onepress_sanitize_checkbox',
                'default'           => 0,
                'active_callback'   => ''
            )
        );
        $wp_customize->add_control( 'onepress_header_scroll_logo',
            array(
                'type'        => 'checkbox',
                'label'       => esc_html__('Scroll to top when click to the site logo or site title, only apply on front page.', 'onepress'),
                'section'     => 'onepress_header_settings',
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
					'transport'			=> 'postMessage',
				)
			);
			$wp_customize->add_control( 'onepress_social_footer_title',
				array(
					'label'       => esc_html__('Social Footer Title', 'onepress'),
					'section'     => 'onepress_social',
					'description' => ''
				)
			);

           // Socials
            $wp_customize->add_setting(
                'onepress_social_profiles',
                array(
                    //'default' => '',
                    'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
                    'transport' => 'postMessage', // refresh or postMessage
            ) );

            $wp_customize->add_control(
                new Onepress_Customize_Repeatable_Control(
                    $wp_customize,
                    'onepress_social_profiles',
                    array(
                        'label' 		=> esc_html__('Socials', 'onepress'),
                        'description'   => '',
                        'section'       => 'onepress_social',
                        'live_title_id' => 'network', // apply for unput text and textarea only
                        'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
                        'max_item'      => 5, // Maximum item can add
                        'limited_msg' 	=> wp_kses_post( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ),
                        'fields'    => array(
                            'network'  => array(
                                'title' => esc_html__('Social network', 'onepress'),
                                'type'  =>'text',
                            ),
                            'icon'  => array(
                                'title' => esc_html__('Icon', 'onepress'),
                                'type'  =>'icon',
                            ),
                            'link'  => array(
                                'title' => esc_html__('URL', 'onepress'),
                                'type'  =>'text',
                            ),
                        ),

                    )
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
                    'transport'         => 'postMessage', // refresh or postMessage
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
                    'transport'         => 'postMessage', // refresh or postMessage
				)
			);
			$wp_customize->add_control( 'onepress_newsletter_mailchimp',
				array(
					'label'       => esc_html__('MailChimp Action URL', 'onepress'),
					'section'     => 'onepress_newsletter',
					'description' => __( 'The newsletter form use MailChimp, please follow <a target="_blank" href="http://goo.gl/uRVIst">this guide</a> to know how to get MailChimp Action URL. Example <i>//famethemes.us8.list-manage.com/subscribe/post?u=521c400d049a59a4b9c0550c2&amp;id=83187e0006</i>', 'onepress' )
				)
			);



            if ( ! function_exists( 'wp_get_custom_css' ) ) {  // Back-compat for WordPress < 4.7.

                /* Custom CSS Settings
                ----------------------------------------------------------------------*/
                $wp_customize->add_section(
                    'onepress_custom_code',
                    array(
                        'title' => __('Custom CSS', 'onepress'),
                        'panel' => 'onepress_options',
                    )
                );


                $wp_customize->add_setting(
                    'onepress_custom_css',
                    array(
                        'default' => '',
                        'sanitize_callback' => 'onepress_sanitize_css',
                        'type' => 'option',
                    )
                );

                $wp_customize->add_control(
                    'onepress_custom_css',
                    array(
                        'label' => __('Custom CSS', 'onepress'),
                        'section' => 'onepress_custom_code',
                        'type' => 'textarea'
                    )
                );
            } else {
                $wp_customize->get_section( 'custom_css' )->priority = 994;
            }

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
				'description' => wp_kses_post( 'Check out <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus version</a> for full control over <strong>section order</strong> and <strong>section styling</strong>! ', 'onepress' )
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
					'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
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
					'description'     => esc_html__( 'The hero content padding top in percent (%).', 'onepress' ),
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
					'description'     => esc_html__( 'The hero content padding bottom in percent (%).', 'onepress' ),
					'active_callback' => 'onepress_hero_fullscreen_callback'
				)
			);


            /* Hero options
            ----------------------------------------------------------------------*/

            $wp_customize->add_setting(
                'onepress_hero_option_animation',
                array(
                    'default'              => 'flipInX',
                    'sanitize_callback'    => 'sanitize_text_field',
                )
            );

            /**
             * @see https://github.com/daneden/animate.css
             */

            $animations_css = 'bounce flash pulse rubberBand shake headShake swing tada wobble jello bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flipInX flipInY flipOutX flipOutY lightSpeedIn lightSpeedOut rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight hinge rollIn rollOut zoomIn zoomInDown zoomInLeft zoomInRight zoomInUp zoomOut zoomOutDown zoomOutLeft zoomOutRight zoomOutUp slideInDown slideInLeft slideInRight slideInUp slideOutDown slideOutLeft slideOutRight slideOutUp';

            $animations_css = explode( ' ', $animations_css );
            $animations = array();
            foreach ( $animations_css as $v ) {
                $v =  trim( $v );
                if ( $v ){
                    $animations[ $v ]= $v;
                }

            }

            $wp_customize->add_control(
                'onepress_hero_option_animation',
                array(
                    'label'    => __( 'Text animation', 'onepress' ),
                    'section'  => 'onepress_hero_settings',
                    'type'     => 'select',
                    'choices' => $animations,
                )
            );


            $wp_customize->add_setting(
                'onepress_hero_option_speed',
                array(
                    'default'              => '5000',
                    'sanitize_callback'    => 'sanitize_text_field',
                )
            );

            $wp_customize->add_control(
                'onepress_hero_option_speed',
                array(
                    'label'    => __( 'Text animation speed', 'onepress' ),
                    'description' => esc_html__( 'The delay between the changing of each phrase in milliseconds.', 'onepress' ),
                    'section'  => 'onepress_hero_settings',
                )
            );


        $wp_customize->add_setting(
            'onepress_hero_slider_fade',
            array(
                'default'              => '750',
                'sanitize_callback'    => 'sanitize_text_field',
            )
        );

        $wp_customize->add_control(
            'onepress_hero_slider_fade',
            array(
                'label'    => __( 'Slider animation speed', 'onepress' ),
                'description' => esc_html__( 'This is the speed at which the image will fade in. Integers in milliseconds are accepted.', 'onepress' ),
                'section'  => 'onepress_hero_settings',
            )
        );

        $wp_customize->add_setting(
            'onepress_hero_slider_duration',
            array(
                'default'              => '5000',
                'sanitize_callback'    => 'sanitize_text_field',
            )
        );

        $wp_customize->add_control(
            'onepress_hero_slider_duration',
            array(
                'label'    => __( 'Slider duration speed', 'onepress' ),
                'description' => esc_html__( 'The amount of time in between slides, expressed as the number of milliseconds.', 'onepress' ),
                'section'  => 'onepress_hero_settings',
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
					'default' => json_encode( array(
						array(
							'image'=> array(
								'url' => get_template_directory_uri().'/assets/images/hero5.jpg',
								'id' => ''
							)
						)
					) )
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
					'sanitize_callback' => 'onepress_sanitize_color_alpha',
					'default'           => 'rgba(0,0,0,.3)',
					'transport' => 'refresh', // refresh or postMessage
				)
			);
			$wp_customize->add_control( new OnePress_Alpha_Color_Control(
					$wp_customize,
					'onepress_hero_overlay_color',
					array(
						'label' 		=> esc_html__('Background Overlay Color', 'onepress'),
						'section' 		=> 'onepress_hero_images',
						'priority'      => 130,
					)
				)
			);


            // Parallax
            $wp_customize->add_setting( 'onepress_hero_parallax',
                array(
                    'sanitize_callback' => 'onepress_sanitize_checkbox',
                    'default'           => 0,
                    'transport' => 'refresh', // refresh or postMessage
                )
            );
            $wp_customize->add_control(
                'onepress_hero_parallax',
                array(
                    'label' 		=> esc_html__('Enable parallax effect (apply for first BG image only)', 'onepress'),
                    'section' 		=> 'onepress_hero_images',
                    'type' 		   => 'checkbox',
                    'priority'      => 50,
                    'description' => '',
                )
            );

			// Background Video
			$wp_customize->add_setting( 'onepress_hero_videobackground_upsell',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
				)
			);
			$wp_customize->add_control( new OnePress_Misc_Control( $wp_customize, 'onepress_hero_videobackground_upsell',
				array(
					'section'     => 'onepress_hero_images',
					'type'        => 'custom_message',
					'description' => wp_kses_post( 'Want to add <strong>background video</strong> for hero section? Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> version.', 'onepress' ),
					'priority'    => 131,
				)
			));



		$wp_customize->add_section( 'onepress_hero_content_layout1' ,
			array(
				'priority'    => 9,
				'title'       => esc_html__( 'Hero Content Layout', 'onepress' ),
				'description' => '',
				'panel'       => 'onepress_hero_panel',

			)
		);

			// Hero Layout
			$wp_customize->add_setting( 'onepress_hero_layout',
				array(
					'sanitize_callback' => 'onepress_sanitize_text',
					'default'           => '1',
				)
			);
			$wp_customize->add_control( 'onepress_hero_layout',
				array(
					'label' 		=> esc_html__('Display Layout', 'onepress'),
					'section' 		=> 'onepress_hero_content_layout1',
					'description'   => '',
					'type'          => 'select',
					'choices'       => array(
						'1' => esc_html__('Layout 1', 'onepress' ),
						'2' => esc_html__('Layout 2', 'onepress' ),
					),
				)
			);
			// For Hero layout ------------------------

				// Large Text
				$wp_customize->add_setting( 'onepress_hcl1_largetext',
					array(
						'sanitize_callback' => 'onepress_sanitize_text',
						'mod' 				=> 'html',
						'default'           => wp_kses_post('We are <span class="js-rotating">OnePress | One Page | Responsive | Perfection</span>', 'onepress'),
					)
				);
				$wp_customize->add_control( new OnePress_Editor_Custom_Control(
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
				$wp_customize->add_control( new OnePress_Editor_Custom_Control(
					$wp_customize,
					'onepress_hcl1_smalltext',
					array(
						'label' 		=> esc_html__('Small Text', 'onepress'),
						'section' 		=> 'onepress_hero_content_layout1',
						'mod' 				=> 'html',
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
                // Button #1 Style
				$wp_customize->add_setting( 'onepress_hcl1_btn1_style',
					array(
						'sanitize_callback' => 'onepress_sanitize_text',
						'default'           => 'btn-theme-primary',
					)
				);
				$wp_customize->add_control( 'onepress_hcl1_btn1_style',
					array(
						'label' 		=> esc_html__('Button #1 style', 'onepress'),
						'section' 		=> 'onepress_hero_content_layout1',
                        'type'          => 'select',
                        'choices' => array(
                                'btn-theme-primary' => esc_html__('Button Primary', 'onepress'),
                                'btn-secondary-outline' => esc_html__('Button Secondary', 'onepress'),
                                'btn-default' => esc_html__('Button', 'onepress'),
                                'btn-primary' => esc_html__('Primary', 'onepress'),
                                'btn-success' => esc_html__('Success', 'onepress'),
                                'btn-info' => esc_html__('Info', 'onepress'),
                                'btn-warning' => esc_html__('Warning', 'onepress'),
                                'btn-danger' => esc_html__('Danger', 'onepress'),
                        )
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

                // Button #1 Style
                $wp_customize->add_setting( 'onepress_hcl1_btn2_style',
                    array(
                        'sanitize_callback' => 'onepress_sanitize_text',
                        'default'           => 'btn-secondary-outline',
                    )
                );
                $wp_customize->add_control( 'onepress_hcl1_btn2_style',
                    array(
                        'label' 		=> esc_html__('Button #2 style', 'onepress'),
                        'section' 		=> 'onepress_hero_content_layout1',
                        'type'          => 'select',
                        'choices' => array(
                            'btn-theme-primary' => esc_html__('Button Primary', 'onepress'),
                            'btn-secondary-outline' => esc_html__('Button Secondary', 'onepress'),
                            'btn-default' => esc_html__('Button', 'onepress'),
                            'btn-primary' => esc_html__('Primary', 'onepress'),
                            'btn-success' => esc_html__('Success', 'onepress'),
                            'btn-info' => esc_html__('Info', 'onepress'),
                            'btn-warning' => esc_html__('Warning', 'onepress'),
                            'btn-danger' => esc_html__('Danger', 'onepress'),
                        )
                    )
                );


				/* Layout 2 ---- */

				// Layout 22 content text
				$wp_customize->add_setting( 'onepress_hcl2_content',
					array(
						'sanitize_callback' => 'onepress_sanitize_text',
						'mod' 				=> 'html',
						'default'           =>  wp_kses_post( '<h1>Business Website'."\n".'Made Simple.</h1>'."\n".'We provide creative solutions to clients around the world,'."\n".'creating things that get attention and meaningful.'."\n\n".'<a class="btn btn-secondary-outline btn-lg" href="#">Get Started</a>' ),
					)
				);
				$wp_customize->add_control( new OnePress_Editor_Custom_Control(
					$wp_customize,
					'onepress_hcl2_content',
					array(
						'label' 		=> esc_html__('Content Text', 'onepress'),
						'section' 		=> 'onepress_hero_content_layout1',
						'description'   => '',
					)
				));

				// Layout 2 image
				$wp_customize->add_setting( 'onepress_hcl2_image',
					array(
						'sanitize_callback' => 'onepress_sanitize_text',
						'mod' 				=> 'html',
						'default'           =>  get_template_directory_uri().'/assets/images/onepress_responsive.png',
					)
				);
				$wp_customize->add_control( new WP_Customize_Image_Control(
					$wp_customize,
					'onepress_hcl2_image',
					array(
						'label' 		=> esc_html__('Image', 'onepress'),
						'section' 		=> 'onepress_hero_content_layout1',
						'description'   => '',
					)
				));


			// END For Hero layout ------------------------

	/*------------------------------------------------------------------------*/
	/*  Section: Video Popup
	/*------------------------------------------------------------------------*/
	$wp_customize->add_panel( 'onepress_videolightbox' ,
		array(
			'priority'        => 180,
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

    $wp_customize->add_control( new OnePress_Editor_Custom_Control(
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
	/*  Section: Gallery
    /*------------------------------------------------------------------------*/
	$wp_customize->add_panel( 'onepress_gallery' ,
		array(
			'priority'        => 190,
			'title'           => esc_html__( 'Section: Gallery', 'onepress' ),
			'description'     => '',
			'active_callback' => 'onepress_showon_frontpage'
		)
	);

	$wp_customize->add_section( 'onepress_gallery_settings' ,
		array(
			'priority'    => 3,
			'title'       => esc_html__( 'Section Settings', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_gallery',
		)
	);

	// Show Content
	$wp_customize->add_setting( 'onepress_gallery_disable',
		array(
			'sanitize_callback' => 'onepress_sanitize_checkbox',
			'default'           => 1,
		)
	);
	$wp_customize->add_control( 'onepress_gallery_disable',
		array(
			'type'        => 'checkbox',
			'label'       => esc_html__('Hide this section?', 'onepress'),
			'section'     => 'onepress_gallery_settings',
			'description' => esc_html__('Check this box to hide this section.', 'onepress'),
		)
	);

	// Section ID
	$wp_customize->add_setting( 'onepress_gallery_id',
		array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => esc_html__('gallery', 'onepress'),
		)
	);
	$wp_customize->add_control( 'onepress_gallery_id',
		array(
			'label'     => esc_html__('Section ID:', 'onepress'),
			'section' 		=> 'onepress_gallery_settings',
			'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
		)
	);

	// Title
	$wp_customize->add_setting( 'onepress_gallery_title',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => esc_html__('Gallery', 'onepress'),
		)
	);
	$wp_customize->add_control( 'onepress_gallery_title',
		array(
			'label'     => esc_html__('Section Title', 'onepress'),
			'section' 		=> 'onepress_gallery_settings',
			'description'   => '',
		)
	);

	// Sub Title
	$wp_customize->add_setting( 'onepress_gallery_subtitle',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => esc_html__('Section subtitle', 'onepress'),
		)
	);
	$wp_customize->add_control( 'onepress_gallery_subtitle',
		array(
			'label'     => esc_html__('Section Subtitle', 'onepress'),
			'section' 		=> 'onepress_gallery_settings',
			'description'   => '',
		)
	);

	// Description
	$wp_customize->add_setting( 'onepress_gallery_desc',
		array(
			'sanitize_callback' => 'onepress_sanitize_text',
			'default'           => '',
		)
	);
	$wp_customize->add_control( new OnePress_Editor_Custom_Control(
		$wp_customize,
		'onepress_gallery_desc',
		array(
			'label' 		=> esc_html__('Section Description', 'onepress'),
			'section' 		=> 'onepress_gallery_settings',
			'description'   => '',
		)
	));

	$wp_customize->add_section( 'onepress_gallery_content' ,
		array(
			'priority'    => 6,
			'title'       => esc_html__( 'Section Content', 'onepress' ),
			'description' => '',
			'panel'       => 'onepress_gallery',
		)
	);
	// Gallery Source
	$wp_customize->add_setting( 'onepress_gallery_source',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'validate_callback' => 'onepress_gallery_source_validate',
			'default'           => 'page',
		)
	);
	$wp_customize->add_control( 'onepress_gallery_source',
		array(
			'label'     	=> esc_html__('Select Gallery Source', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'type'          => 'select',
			'priority'      => 5,
			'choices'       => array(
				'page'      => esc_html__('Page', 'onepress'),
				'facebook'  => 'Facebook',
				'instagram' => 'Instagram',
				'flickr'    => 'Flickr',
			)
		)
	);

	// Source page settings
	$wp_customize->add_setting( 'onepress_gallery_source_page',
		array(
			'sanitize_callback' => 'onepress_sanitize_number',
			'default'           => '',
		)
	);
	$wp_customize->add_control( 'onepress_gallery_source_page',
		array(
			'label'     	=> esc_html__('Select Gallery Page', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'type'          => 'select',
			'priority'      => 10,
			'choices'       => $option_pages,
			'description'   => esc_html__('Select a page which have content contain [gallery] shortcode.', 'onepress'),
		)
	);


	// Gallery Layout
	$wp_customize->add_setting( 'onepress_gallery_layout',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 'default',
		)
	);
	$wp_customize->add_control( 'onepress_gallery_layout',
		array(
			'label'     	=> esc_html__('Layout', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'type'          => 'select',
			'priority'      => 40,
			'choices'       => array(
				'default'      => esc_html__('Default, inside container', 'onepress'),
				'full-width'  => esc_html__('Full Width', 'onepress'),
			)
		)
	);

	// Gallery Display
	$wp_customize->add_setting( 'onepress_gallery_display',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 'default',
		)
	);
	$wp_customize->add_control( 'onepress_gallery_display',
		array(
			'label'     	=> esc_html__('Display', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'type'          => 'select',
			'priority'      => 50,
			'choices'       => array(
				'grid'      => esc_html__('Grid', 'onepress'),
				'carousel'    => esc_html__('Carousel', 'onepress'),
				'slider'      => esc_html__('Slider', 'onepress'),
				'justified'   => esc_html__('Justified', 'onepress'),
				'masonry'     => esc_html__('Masonry', 'onepress'),
			)
		)
	);

	// Gallery grid spacing
	$wp_customize->add_setting( 'onepress_g_spacing',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 20,
		)
	);
	$wp_customize->add_control( 'onepress_g_spacing',
		array(
			'label'     	=> esc_html__('Item Spacing', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'priority'      => 55,

		)
	);

	// Gallery grid spacing
	$wp_customize->add_setting( 'onepress_g_row_height',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 120,
		)
	);
	$wp_customize->add_control( 'onepress_g_row_height',
		array(
			'label'     	=> esc_html__('Row Height', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'priority'      => 57,

		)
	);

	// Gallery grid gird col
	$wp_customize->add_setting( 'onepress_g_col',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '4',
		)
	);
	$wp_customize->add_control( 'onepress_g_col',
		array(
			'label'     	=> esc_html__('Layout columns', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'priority'      => 60,
			'type'          => 'select',
			'choices'       => array(
				'1'      => 1,
				'2'      => 2,
				'3'      => 3,
				'4'      => 4,
				'5'      => 5,
				'6'      => 6,
			)

		)
	);

	// Gallery max number
	$wp_customize->add_setting( 'onepress_g_number',
		array(
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 10,
		)
	);
	$wp_customize->add_control( 'onepress_g_number',
		array(
			'label'     	=> esc_html__('Number items', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'priority'      => 65,
		)
	);
	// Gallery grid spacing
	$wp_customize->add_setting( 'onepress_g_lightbox',
		array(
			'sanitize_callback' => 'onepress_sanitize_checkbox',
			'default'           => 1,
		)
	);
	$wp_customize->add_control( 'onepress_g_lightbox',
		array(
			'label'     	=> esc_html__('Enable Lightbox', 'onepress'),
			'section' 		=> 'onepress_gallery_content',
			'priority'      => 70,
			'type'          => 'checkbox',
		)
	);

    // Gallery readmore link
    $wp_customize->add_setting( 'onepress_g_readmore_link',
        array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '',
        )
    );
    $wp_customize->add_control( 'onepress_g_readmore_link',
        array(
            'label'     	=> esc_html__('Read More Link', 'onepress'),
            'section' 		=> 'onepress_gallery_content',
            'priority'      => 90,
            'type'          => 'text',
        )
    );

    $wp_customize->add_setting( 'onepress_g_readmore_text',
        array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => esc_html__('View More', 'onepress'),
        )
    );
    $wp_customize->add_control( 'onepress_g_readmore_text',
        array(
            'label'     	=> esc_html__('Read More Text', 'onepress'),
            'section' 		=> 'onepress_gallery_content',
            'priority'      => 100,
            'type'          => 'text',
        )
    );


	/*------------------------------------------------------------------------*/
    /*  Section: About
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_about' ,
		array(
			'priority'        => 160,
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
				'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
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

		// Description
		$wp_customize->add_setting( 'onepress_about_desc',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => '',
			)
		);
		$wp_customize->add_control( new OnePress_Editor_Custom_Control(
			$wp_customize,
			'onepress_about_desc',
			array(
				'label' 		=> esc_html__('Section Description', 'onepress'),
				'section' 		=> 'onepress_about_settings',
				'description'   => '',
			)
		));


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
						'label' 		=> esc_html__('About content page', 'onepress'),
						'description'   => '',
						'section'       => 'onepress_about_content',
						'live_title_id' => 'content_page', // apply for unput text and textarea only
						'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
						'max_item'      => 3, // Maximum item can add
                        'limited_msg' 	=> wp_kses_post( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ),
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

            // About content source
            $wp_customize->add_setting( 'onepress_about_content_source',
                array(
                    'sanitize_callback' => 'sanitize_text_field',
                    'default'           => 'content',
                )
            );

            $wp_customize->add_control( 'onepress_about_content_source',
                array(
                    'label' 		=> esc_html__('Item content source', 'onepress'),
                    'section' 		=> 'onepress_about_content',
                    'description'   => '',
                    'type'          => 'select',
                    'choices'       => array(
                        'content' => esc_html__( 'Full Page Content', 'onepress' ),
                        'excerpt' => esc_html__( 'Page Excerpt', 'onepress' ),
                    ),
                )
            );


    /*------------------------------------------------------------------------*/
    /*  Section: Features
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_features' ,
        array(
            'priority'        => 150,
            'title'           => esc_html__( 'Section: Features', 'onepress' ),
            'description'     => '',
            'active_callback' => 'onepress_showon_frontpage'
        )
    );

    $wp_customize->add_section( 'onepress_features_settings' ,
        array(
            'priority'    => 3,
            'title'       => esc_html__( 'Section Settings', 'onepress' ),
            'description' => '',
            'panel'       => 'onepress_features',
        )
    );

    // Show Content
    $wp_customize->add_setting( 'onepress_features_disable',
        array(
            'sanitize_callback' => 'onepress_sanitize_checkbox',
            'default'           => '',
        )
    );
    $wp_customize->add_control( 'onepress_features_disable',
        array(
            'type'        => 'checkbox',
            'label'       => esc_html__('Hide this section?', 'onepress'),
            'section'     => 'onepress_features_settings',
            'description' => esc_html__('Check this box to hide this section.', 'onepress'),
        )
    );

    // Section ID
    $wp_customize->add_setting( 'onepress_features_id',
        array(
            'sanitize_callback' => 'onepress_sanitize_text',
            'default'           => esc_html__('features', 'onepress'),
        )
    );
    $wp_customize->add_control( 'onepress_features_id',
        array(
            'label' 		=> esc_html__('Section ID:', 'onepress'),
            'section' 		=> 'onepress_features_settings',
            'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
        )
    );

    // Title
    $wp_customize->add_setting( 'onepress_features_title',
        array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => esc_html__('Features', 'onepress'),
        )
    );
    $wp_customize->add_control( 'onepress_features_title',
        array(
            'label' 		=> esc_html__('Section Title', 'onepress'),
            'section' 		=> 'onepress_features_settings',
            'description'   => '',
        )
    );

    // Sub Title
    $wp_customize->add_setting( 'onepress_features_subtitle',
        array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => esc_html__('Section subtitle', 'onepress'),
        )
    );
    $wp_customize->add_control( 'onepress_features_subtitle',
        array(
            'label' 		=> esc_html__('Section Subtitle', 'onepress'),
            'section' 		=> 'onepress_features_settings',
            'description'   => '',
        )
    );

    // Description
    $wp_customize->add_setting( 'onepress_features_desc',
        array(
            'sanitize_callback' => 'onepress_sanitize_text',
            'default'           => '',
        )
    );
    $wp_customize->add_control( new OnePress_Editor_Custom_Control(
        $wp_customize,
        'onepress_features_desc',
        array(
            'label' 		=> esc_html__('Section Description', 'onepress'),
            'section' 		=> 'onepress_features_settings',
            'description'   => '',
        )
    ));

    // Features layout
    $wp_customize->add_setting( 'onepress_features_layout',
        array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '3',
        )
    );

    $wp_customize->add_control( 'onepress_features_layout',
        array(
            'label' 		=> esc_html__('Features Layout Setting', 'onepress'),
            'section' 		=> 'onepress_features_settings',
            'description'   => '',
            'type'          => 'select',
            'choices'       => array(
                '3' => esc_html__( '4 Columns', 'onepress' ),
                '4' => esc_html__( '3 Columns', 'onepress' ),
                '6' => esc_html__( '2 Columns', 'onepress' ),
            ),
        )
    );


    $wp_customize->add_section( 'onepress_features_content' ,
        array(
            'priority'    => 6,
            'title'       => esc_html__( 'Section Content', 'onepress' ),
            'description' => '',
            'panel'       => 'onepress_features',
        )
    );

    // Order & Styling
    $wp_customize->add_setting(
        'onepress_features_boxes',
        array(
            //'default' => '',
            'sanitize_callback' => 'onepress_sanitize_repeatable_data_field',
            'transport' => 'refresh', // refresh or postMessage
        ) );

    $wp_customize->add_control(
        new Onepress_Customize_Repeatable_Control(
            $wp_customize,
            'onepress_features_boxes',
            array(
                'label' 		=> esc_html__('Features content', 'onepress'),
                'description'   => '',
                'section'       => 'onepress_features_content',
                'live_title_id' => 'title', // apply for unput text and textarea only
                'title_format'  => esc_html__('[live_title]', 'onepress'), // [live_title]
                'max_item'      => 4, // Maximum item can add
                'limited_msg' 	=> wp_kses_post( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ),
                'fields'    => array(
                    'title'  => array(
                        'title' => esc_html__('Title', 'onepress'),
                        'type'  =>'text',
                    ),
					'icon_type'  => array(
						'title' => esc_html__('Custom icon', 'onepress'),
						'type'  =>'select',
						'options' => array(
							'icon' => esc_html__('Icon', 'onepress'),
							'image' => esc_html__('image', 'onepress'),
						),
					),
                    'icon'  => array(
                        'title' => esc_html__('Icon', 'onepress'),
                        'type'  =>'icon',
						'required' => array( 'icon_type', '=', 'icon' ),
                    ),
					'image'  => array(
						'title' => esc_html__('Image', 'onepress'),
						'type'  =>'media',
						'required' => array( 'icon_type', '=', 'image' ),
					),
                    'desc'  => array(
                        'title' => esc_html__('Description', 'onepress'),
                        'type'  =>'editor',
                    ),
                    'link'  => array(
                        'title' => esc_html__('Custom Link', 'onepress'),
                        'type'  =>'text',
                    ),
                ),

            )
        )
    );

    // About content source
    $wp_customize->add_setting( 'onepress_about_content_source',
        array(
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => 'content',
        )
    );

    $wp_customize->add_control( 'onepress_about_content_source',
        array(
            'label' 		=> esc_html__('Item content source', 'onepress'),
            'section' 		=> 'onepress_about_content',
            'description'   => '',
            'type'          => 'select',
            'choices'       => array(
                'content' => esc_html__( 'Full Page Content', 'onepress' ),
                'excerpt' => esc_html__( 'Page Excerpt', 'onepress' ),
            ),
        )
    );


    /*------------------------------------------------------------------------*/
    /*  Section: Services
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_services' ,
		array(
			'priority'        => 170,
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
		$wp_customize->add_setting( 'onepress_services_disable',
			array(
				'sanitize_callback' => 'onepress_sanitize_checkbox',
				'default'           => '',
			)
		);
		$wp_customize->add_control( 'onepress_services_disable',
			array(
				'type'        => 'checkbox',
				'label'       => esc_html__('Hide this section?', 'onepress'),
				'section'     => 'onepress_service_settings',
				'description' => esc_html__('Check this box to hide this section.', 'onepress'),
			)
		);

		// Section ID
		$wp_customize->add_setting( 'onepress_services_id',
			array(
				'sanitize_callback' => 'onepress_sanitize_text',
				'default'           => esc_html__('services', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_services_id',
			array(
				'label'     => esc_html__('Section ID:', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => 'The section id, we will use this for link anchor.'
			)
		);

		// Title
		$wp_customize->add_setting( 'onepress_services_title',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Our Services', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_services_title',
			array(
				'label'     => esc_html__('Section Title', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => '',
			)
		);

		// Sub Title
		$wp_customize->add_setting( 'onepress_services_subtitle',
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => esc_html__('Section subtitle', 'onepress'),
			)
		);
		$wp_customize->add_control( 'onepress_services_subtitle',
			array(
				'label'     => esc_html__('Section Subtitle', 'onepress'),
				'section' 		=> 'onepress_service_settings',
				'description'   => '',
			)
		);

        // Description
        $wp_customize->add_setting( 'onepress_services_desc',
            array(
                'sanitize_callback' => 'onepress_sanitize_text',
                'default'           => '',
            )
        );
        $wp_customize->add_control( new OnePress_Editor_Custom_Control(
            $wp_customize,
            'onepress_services_desc',
            array(
                'label' 		=> esc_html__('Section Description', 'onepress'),
                'section' 		=> 'onepress_service_settings',
                'description'   => '',
            )
        ));


        // Services layout
        $wp_customize->add_setting( 'onepress_service_layout',
            array(
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '6',
            )
        );

        $wp_customize->add_control( 'onepress_service_layout',
            array(
                'label' 		=> esc_html__('Services Layout Setting', 'onepress'),
                'section' 		=> 'onepress_service_settings',
                'description'   => '',
                'type'          => 'select',
                'choices'       => array(
                    '3' => esc_html__( '4 Columns', 'onepress' ),
                    '4' => esc_html__( '3 Columns', 'onepress' ),
                    '6' => esc_html__( '2 Columns', 'onepress' ),
                    '12' => esc_html__( '1 Column', 'onepress' ),
                ),
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
                    'limited_msg' 	=> wp_kses_post( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ),

					'fields'    => array(
						'icon_type'  => array(
							'title' => esc_html__('Custom icon', 'onepress'),
							'type'  =>'select',
							'options' => array(
								'icon' => esc_html__('Icon', 'onepress'),
								'image' => esc_html__('image', 'onepress'),
							),
						),
						'icon'  => array(
							'title' => esc_html__('Icon', 'onepress'),
							'type'  =>'icon',
							'required' => array( 'icon_type', '=', 'icon' ),
						),
						'image'  => array(
							'title' => esc_html__('Image', 'onepress'),
							'type'  =>'media',
							'required' => array( 'icon_type', '=', 'image' ),
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
			'priority'        => 210,
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
				'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
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

        // Description
        $wp_customize->add_setting( 'onepress_counter_desc',
            array(
                'sanitize_callback' => 'onepress_sanitize_text',
                'default'           => '',
            )
        );
        $wp_customize->add_control( new OnePress_Editor_Custom_Control(
            $wp_customize,
            'onepress_counter_desc',
            array(
                'label' 		=> esc_html__('Section Description', 'onepress'),
                'section' 		=> 'onepress_counter_settings',
                'description'   => '',
            )
        ));

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
                    'limited_msg' 	=> wp_kses_post( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ),
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
			'priority'        => 250,
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

        // Description
        $wp_customize->add_setting( 'onepress_team_desc',
            array(
                'sanitize_callback' => 'onepress_sanitize_text',
                'default'           => '',
            )
        );
        $wp_customize->add_control( new OnePress_Editor_Custom_Control(
            $wp_customize,
            'onepress_team_desc',
            array(
                'label' 		=> esc_html__('Section Description', 'onepress'),
                'section' 		=> 'onepress_team_settings',
                'description'   => '',
            )
        ));

        // Team layout
        $wp_customize->add_setting( 'onepress_team_layout',
            array(
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '3',
            )
        );

        $wp_customize->add_control( 'onepress_team_layout',
            array(
                'label' 		=> esc_html__('Team Layout Setting', 'onepress'),
                'section' 		=> 'onepress_team_settings',
                'description'   => '',
                'type'          => 'select',
                'choices'       => array(
					'3' => esc_html__( '4 Columns', 'onepress' ),
					'4' => esc_html__( '3 Columns', 'onepress' ),
					'6' => esc_html__( '2 Columns', 'onepress' ),
                ),
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
                    'limited_msg' 	=> wp_kses_post( 'Upgrade to <a target="_blank" href="https://www.famethemes.com/plugins/onepress-plus/?utm_source=theme_customizer&utm_medium=text_link&utm_campaign=onepress_customizer#get-started">OnePress Plus</a> to be able to add more items and unlock other premium features!', 'onepress' ),
                    'fields'    => array(
						'user_id' => array(
							'title' => esc_html__('User media', 'onepress'),
							'type'  =>'media',
							'desc'  => '',
						),
                        'link' => array(
                            'title' => esc_html__('Custom Link', 'onepress'),
                            'type'  =>'text',
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
			'priority'        => 260,
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
				'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
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

        // Description
        $wp_customize->add_setting( 'onepress_news_desc',
            array(
                'sanitize_callback' => 'onepress_sanitize_text',
                'default'           => '',
            )
        );
        $wp_customize->add_control( new OnePress_Editor_Custom_Control(
            $wp_customize,
            'onepress_news_desc',
            array(
                'label' 		=> esc_html__('Section Description', 'onepress'),
                'section' 		=> 'onepress_news_settings',
                'description'   => '',
            )
        ));

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
				'description' => esc_html__(  'It should be your blog page link.', 'onepress' )
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
				'label'     	=> esc_html__('More News Button Text', 'onepress'),
				'section' 		=> 'onepress_news_settings',
				'description'   => '',
			)
		);

	/*------------------------------------------------------------------------*/
    /*  Section: Contact
    /*------------------------------------------------------------------------*/
    $wp_customize->add_panel( 'onepress_contact' ,
		array(
			'priority'        => 270,
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
				'description'   => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' )
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

        // Description
        $wp_customize->add_setting( 'onepress_contact_desc',
            array(
                'sanitize_callback' => 'onepress_sanitize_text',
                'default'           => '',
            )
        );
        $wp_customize->add_control( new OnePress_Editor_Custom_Control(
            $wp_customize,
            'onepress_contact_desc',
            array(
                'label' 		=> esc_html__('Section Description', 'onepress'),
                'section' 		=> 'onepress_contact_settings',
                'description'   => '',
            )
        ));


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
		$wp_customize->add_control( new OnePress_Editor_Custom_Control(
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
/**
 * Selective refresh
 */
require get_template_directory() . '/inc/customizer-selective-refresh.php';


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


/**
 * Conditional to show more hero settings
 *
 * @param $control
 * @return bool
 */
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

function onepress_gallery_source_validate( $validity, $value ){
	if ( ! class_exists( 'OnePress_PLus' ) ) {
		if ( $value != 'page' ) {
			$validity->add('notice', esc_html__('Upgrade to OnePress Plus to unlock this feature.', 'onepress' ) );
		}
	}
	return $validity;
}
/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function onepress_customize_preview_js() {
    wp_enqueue_script( 'onepress_customizer_liveview', get_template_directory_uri() . '/assets/js/customizer-liveview.js', array( 'customize-preview', 'customize-selective-refresh' ), false, true );
}
add_action( 'customize_preview_init', 'onepress_customize_preview_js', 65 );



add_action( 'customize_controls_enqueue_scripts', 'opneress_customize_js_settings' );
function opneress_customize_js_settings(){
    if ( ! function_exists( 'onepress_get_actions_required' ) ) {
        return;
    }

    $actions = onepress_get_actions_required();
    $number_action = $actions['number_notice'];

    wp_localize_script( 'customize-controls', 'onepress_customizer_settings', array(
        'number_action' => $number_action,
        'is_plus_activated' => class_exists( 'OnePress_PLus' ) ? 'y' : 'n',
        'action_url' => admin_url( 'themes.php?page=ft_onepress&tab=actions_required' ),
    ) );
}

/**
 * Customizer Icon picker
 */
function onepress_customize_controls_enqueue_scripts(){
    wp_localize_script( 'customize-controls', 'C_Icon_Picker',
        apply_filters( 'c_icon_picker_js_setup',
            array(
                'search'    => esc_html__( 'Search', 'onepress' ),
                'fonts' => array(
                    'font-awesome' => array(
                        // Name of icon
                        'name' => esc_html__( 'Font Awesome', 'onepress' ),
                        // prefix class example for font-awesome fa-fa-{name}
                        'prefix' => 'fa',
                        // font url
                        'url' => esc_url( add_query_arg( array( 'ver'=> '4.7.0' ), get_template_directory_uri() .'/assets/css/font-awesome.min.css' ) ),
                        // Icon class name, separated by |
                        'icons' => 'fa-glass|fa-music|fa-search|fa-envelope-o|fa-heart|fa-star|fa-star-o|fa-user|fa-film|fa-th-large|fa-th|fa-th-list|fa-check|fa-times|fa-search-plus|fa-search-minus|fa-power-off|fa-signal|fa-cog|fa-trash-o|fa-home|fa-file-o|fa-clock-o|fa-road|fa-download|fa-arrow-circle-o-down|fa-arrow-circle-o-up|fa-inbox|fa-play-circle-o|fa-repeat|fa-refresh|fa-list-alt|fa-lock|fa-flag|fa-headphones|fa-volume-off|fa-volume-down|fa-volume-up|fa-qrcode|fa-barcode|fa-tag|fa-tags|fa-book|fa-bookmark|fa-print|fa-camera|fa-font|fa-bold|fa-italic|fa-text-height|fa-text-width|fa-align-left|fa-align-center|fa-align-right|fa-align-justify|fa-list|fa-outdent|fa-indent|fa-video-camera|fa-picture-o|fa-pencil|fa-map-marker|fa-adjust|fa-tint|fa-pencil-square-o|fa-share-square-o|fa-check-square-o|fa-arrows|fa-step-backward|fa-fast-backward|fa-backward|fa-play|fa-pause|fa-stop|fa-forward|fa-fast-forward|fa-step-forward|fa-eject|fa-chevron-left|fa-chevron-right|fa-plus-circle|fa-minus-circle|fa-times-circle|fa-check-circle|fa-question-circle|fa-info-circle|fa-crosshairs|fa-times-circle-o|fa-check-circle-o|fa-ban|fa-arrow-left|fa-arrow-right|fa-arrow-up|fa-arrow-down|fa-share|fa-expand|fa-compress|fa-plus|fa-minus|fa-asterisk|fa-exclamation-circle|fa-gift|fa-leaf|fa-fire|fa-eye|fa-eye-slash|fa-exclamation-triangle|fa-plane|fa-calendar|fa-random|fa-comment|fa-magnet|fa-chevron-up|fa-chevron-down|fa-retweet|fa-shopping-cart|fa-folder|fa-folder-open|fa-arrows-v|fa-arrows-h|fa-bar-chart|fa-twitter-square|fa-facebook-square|fa-camera-retro|fa-key|fa-cogs|fa-comments|fa-thumbs-o-up|fa-thumbs-o-down|fa-star-half|fa-heart-o|fa-sign-out|fa-linkedin-square|fa-thumb-tack|fa-external-link|fa-sign-in|fa-trophy|fa-github-square|fa-upload|fa-lemon-o|fa-phone|fa-square-o|fa-bookmark-o|fa-phone-square|fa-twitter|fa-facebook|fa-github|fa-unlock|fa-credit-card|fa-rss|fa-hdd-o|fa-bullhorn|fa-bell|fa-certificate|fa-hand-o-right|fa-hand-o-left|fa-hand-o-up|fa-hand-o-down|fa-arrow-circle-left|fa-arrow-circle-right|fa-arrow-circle-up|fa-arrow-circle-down|fa-globe|fa-wrench|fa-tasks|fa-filter|fa-briefcase|fa-arrows-alt|fa-users|fa-link|fa-cloud|fa-flask|fa-scissors|fa-files-o|fa-paperclip|fa-floppy-o|fa-square|fa-bars|fa-list-ul|fa-list-ol|fa-strikethrough|fa-underline|fa-table|fa-magic|fa-truck|fa-pinterest|fa-pinterest-square|fa-google-plus-square|fa-google-plus|fa-money|fa-caret-down|fa-caret-up|fa-caret-left|fa-caret-right|fa-columns|fa-sort|fa-sort-desc|fa-sort-asc|fa-envelope|fa-linkedin|fa-undo|fa-gavel|fa-tachometer|fa-comment-o|fa-comments-o|fa-bolt|fa-sitemap|fa-umbrella|fa-clipboard|fa-lightbulb-o|fa-exchange|fa-cloud-download|fa-cloud-upload|fa-user-md|fa-stethoscope|fa-suitcase|fa-bell-o|fa-coffee|fa-cutlery|fa-file-text-o|fa-building-o|fa-hospital-o|fa-ambulance|fa-medkit|fa-fighter-jet|fa-beer|fa-h-square|fa-plus-square|fa-angle-double-left|fa-angle-double-right|fa-angle-double-up|fa-angle-double-down|fa-angle-left|fa-angle-right|fa-angle-up|fa-angle-down|fa-desktop|fa-laptop|fa-tablet|fa-mobile|fa-circle-o|fa-quote-left|fa-quote-right|fa-spinner|fa-circle|fa-reply|fa-github-alt|fa-folder-o|fa-folder-open-o|fa-smile-o|fa-frown-o|fa-meh-o|fa-gamepad|fa-keyboard-o|fa-flag-o|fa-flag-checkered|fa-terminal|fa-code|fa-reply-all|fa-star-half-o|fa-location-arrow|fa-crop|fa-code-fork|fa-chain-broken|fa-question|fa-info|fa-exclamation|fa-superscript|fa-subscript|fa-eraser|fa-puzzle-piece|fa-microphone|fa-microphone-slash|fa-shield|fa-calendar-o|fa-fire-extinguisher|fa-rocket|fa-maxcdn|fa-chevron-circle-left|fa-chevron-circle-right|fa-chevron-circle-up|fa-chevron-circle-down|fa-html5|fa-css3|fa-anchor|fa-unlock-alt|fa-bullseye|fa-ellipsis-h|fa-ellipsis-v|fa-rss-square|fa-play-circle|fa-ticket|fa-minus-square|fa-minus-square-o|fa-level-up|fa-level-down|fa-check-square|fa-pencil-square|fa-external-link-square|fa-share-square|fa-compass|fa-caret-square-o-down|fa-caret-square-o-up|fa-caret-square-o-right|fa-eur|fa-gbp|fa-usd|fa-inr|fa-jpy|fa-rub|fa-krw|fa-btc|fa-file|fa-file-text|fa-sort-alpha-asc|fa-sort-alpha-desc|fa-sort-amount-asc|fa-sort-amount-desc|fa-sort-numeric-asc|fa-sort-numeric-desc|fa-thumbs-up|fa-thumbs-down|fa-youtube-square|fa-youtube|fa-xing|fa-xing-square|fa-youtube-play|fa-dropbox|fa-stack-overflow|fa-instagram|fa-flickr|fa-adn|fa-bitbucket|fa-bitbucket-square|fa-tumblr|fa-tumblr-square|fa-long-arrow-down|fa-long-arrow-up|fa-long-arrow-left|fa-long-arrow-right|fa-apple|fa-windows|fa-android|fa-linux|fa-dribbble|fa-skype|fa-foursquare|fa-trello|fa-female|fa-male|fa-gratipay|fa-sun-o|fa-moon-o|fa-archive|fa-bug|fa-vk|fa-weibo|fa-renren|fa-pagelines|fa-stack-exchange|fa-arrow-circle-o-right|fa-arrow-circle-o-left|fa-caret-square-o-left|fa-dot-circle-o|fa-wheelchair|fa-vimeo-square|fa-try|fa-plus-square-o|fa-space-shuttle|fa-slack|fa-envelope-square|fa-wordpress|fa-openid|fa-university|fa-graduation-cap|fa-yahoo|fa-google|fa-reddit|fa-reddit-square|fa-stumbleupon-circle|fa-stumbleupon|fa-delicious|fa-digg|fa-pied-piper-pp|fa-pied-piper-alt|fa-drupal|fa-joomla|fa-language|fa-fax|fa-building|fa-child|fa-paw|fa-spoon|fa-cube|fa-cubes|fa-behance|fa-behance-square|fa-steam|fa-steam-square|fa-recycle|fa-car|fa-taxi|fa-tree|fa-spotify|fa-deviantart|fa-soundcloud|fa-database|fa-file-pdf-o|fa-file-word-o|fa-file-excel-o|fa-file-powerpoint-o|fa-file-image-o|fa-file-archive-o|fa-file-audio-o|fa-file-video-o|fa-file-code-o|fa-vine|fa-codepen|fa-jsfiddle|fa-life-ring|fa-circle-o-notch|fa-rebel|fa-empire|fa-git-square|fa-git|fa-hacker-news|fa-tencent-weibo|fa-qq|fa-weixin|fa-paper-plane|fa-paper-plane-o|fa-history|fa-circle-thin|fa-header|fa-paragraph|fa-sliders|fa-share-alt|fa-share-alt-square|fa-bomb|fa-futbol-o|fa-tty|fa-binoculars|fa-plug|fa-slideshare|fa-twitch|fa-yelp|fa-newspaper-o|fa-wifi|fa-calculator|fa-paypal|fa-google-wallet|fa-cc-visa|fa-cc-mastercard|fa-cc-discover|fa-cc-amex|fa-cc-paypal|fa-cc-stripe|fa-bell-slash|fa-bell-slash-o|fa-trash|fa-copyright|fa-at|fa-eyedropper|fa-paint-brush|fa-birthday-cake|fa-area-chart|fa-pie-chart|fa-line-chart|fa-lastfm|fa-lastfm-square|fa-toggle-off|fa-toggle-on|fa-bicycle|fa-bus|fa-ioxhost|fa-angellist|fa-cc|fa-ils|fa-meanpath|fa-buysellads|fa-connectdevelop|fa-dashcube|fa-forumbee|fa-leanpub|fa-sellsy|fa-shirtsinbulk|fa-simplybuilt|fa-skyatlas|fa-cart-plus|fa-cart-arrow-down|fa-diamond|fa-ship|fa-user-secret|fa-motorcycle|fa-street-view|fa-heartbeat|fa-venus|fa-mars|fa-mercury|fa-transgender|fa-transgender-alt|fa-venus-double|fa-mars-double|fa-venus-mars|fa-mars-stroke|fa-mars-stroke-v|fa-mars-stroke-h|fa-neuter|fa-genderless|fa-facebook-official|fa-pinterest-p|fa-whatsapp|fa-server|fa-user-plus|fa-user-times|fa-bed|fa-viacoin|fa-train|fa-subway|fa-medium|fa-y-combinator|fa-optin-monster|fa-opencart|fa-expeditedssl|fa-battery-full|fa-battery-three-quarters|fa-battery-half|fa-battery-quarter|fa-battery-empty|fa-mouse-pointer|fa-i-cursor|fa-object-group|fa-object-ungroup|fa-sticky-note|fa-sticky-note-o|fa-cc-jcb|fa-cc-diners-club|fa-clone|fa-balance-scale|fa-hourglass-o|fa-hourglass-start|fa-hourglass-half|fa-hourglass-end|fa-hourglass|fa-hand-rock-o|fa-hand-paper-o|fa-hand-scissors-o|fa-hand-lizard-o|fa-hand-spock-o|fa-hand-pointer-o|fa-hand-peace-o|fa-trademark|fa-registered|fa-creative-commons|fa-gg|fa-gg-circle|fa-tripadvisor|fa-odnoklassniki|fa-odnoklassniki-square|fa-get-pocket|fa-wikipedia-w|fa-safari|fa-chrome|fa-firefox|fa-opera|fa-internet-explorer|fa-television|fa-contao|fa-500px|fa-amazon|fa-calendar-plus-o|fa-calendar-minus-o|fa-calendar-times-o|fa-calendar-check-o|fa-industry|fa-map-pin|fa-map-signs|fa-map-o|fa-map|fa-commenting|fa-commenting-o|fa-houzz|fa-vimeo|fa-black-tie|fa-fonticons|fa-reddit-alien|fa-edge|fa-credit-card-alt|fa-codiepie|fa-modx|fa-fort-awesome|fa-usb|fa-product-hunt|fa-mixcloud|fa-scribd|fa-pause-circle|fa-pause-circle-o|fa-stop-circle|fa-stop-circle-o|fa-shopping-bag|fa-shopping-basket|fa-hashtag|fa-bluetooth|fa-bluetooth-b|fa-percent|fa-gitlab|fa-wpbeginner|fa-wpforms|fa-envira|fa-universal-access|fa-wheelchair-alt|fa-question-circle-o|fa-blind|fa-audio-description|fa-volume-control-phone|fa-braille|fa-assistive-listening-systems|fa-american-sign-language-interpreting|fa-deaf|fa-glide|fa-glide-g|fa-sign-language|fa-low-vision|fa-viadeo|fa-viadeo-square|fa-snapchat|fa-snapchat-ghost|fa-snapchat-square|fa-pied-piper|fa-first-order|fa-yoast|fa-themeisle|fa-google-plus-official|fa-font-awesome|fa-handshake-o|fa-envelope-open|fa-envelope-open-o|fa-linode|fa-address-book|fa-address-book-o|fa-address-card|fa-address-card-o|fa-user-circle|fa-user-circle-o|fa-user-o|fa-id-badge|fa-id-card|fa-id-card-o|fa-quora|fa-free-code-camp|fa-telegram|fa-thermometer-full|fa-thermometer-three-quarters|fa-thermometer-half|fa-thermometer-quarter|fa-thermometer-empty|fa-shower|fa-bath|fa-podcast|fa-window-maximize|fa-window-minimize|fa-window-restore|fa-window-close|fa-window-close-o|fa-bandcamp|fa-grav|fa-etsy|fa-imdb|fa-ravelry|fa-eercast|fa-microchip|fa-snowflake-o|fa-superpowers|fa-wpexplorer|fa-meetup'

                        ),
                )

            )
        )
    );
}

add_action( 'customize_controls_enqueue_scripts', 'onepress_customize_controls_enqueue_scripts' );
