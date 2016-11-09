<?php

/**
 * Load section template
 *
 * @since 1.2.1
 *
 * @param $template_names
 * @return string
 */
function onepress_customizer_load_template( $template_names ){
    $located = '';

    $is_child =  get_stylesheet_directory() != get_template_directory() ;
    foreach ( (array) $template_names as $template_name ) {
        if (  !$template_name )
            continue;

        if ( $is_child && file_exists( get_stylesheet_directory() . '/' . $template_name ) ) {  // Child them
            $located = get_stylesheet_directory() . '/' . $template_name;
            break;

        } elseif ( defined( 'ONEPRESS_PLUS_PATH' ) && file_exists( ONEPRESS_PLUS_PATH  . $template_name ) ) { // Check part in the plugin
            $located = ONEPRESS_PLUS_PATH . $template_name;
            break;
        } elseif ( file_exists( get_template_directory() . '/' . $template_name) ) { // current_theme
            $located =  get_template_directory() . '/' . $template_name;
            break;
        }
    }
    
    return $located;
}

/**
 * Render customizer section
 * @since 1.2.1
 *
 * @param $section_tpl
 * @param array $section
 * @return string
 */
function onepress_get_customizer_section_content( $section_tpl, $section = array() ){
    ob_start();
    $GLOBALS['onepress_is_selective_refresh'] = true;
    $file = onepress_customizer_load_template( $section_tpl );
    if ( $file ) {
        include $file;
    }
    $content = ob_get_clean();
    return trim( $content );
}


/**
 * Add customizer selective refresh
 *
 * @since 1.2.1
 *
 * @param $wp_customize
 */
function onepress_customizer_partials( $wp_customize ) {

    // Abort if selective refresh is not available.
    if ( ! isset( $wp_customize->selective_refresh ) ) {
        return;
    }

    $selective_refresh_keys = array(
        // section features
        array(
            'id' => 'features',
            'selector' => '.section-features',
            'settings' => array(
                'onepress_features_boxes',
                'onepress_features_title',
                'onepress_features_subtitle',
                'onepress_features_desc',
                'onepress_features_layout',
            ),
        ),

        // section services
        array(
            'id' => 'services',
            'selector' => '.section-services',
            'settings' => array(
                'onepress_services',
                'onepress_services_title',
                'onepress_services_subtitle',
                'onepress_services_desc',
                'onepress_service_layout',
            ),
        ),

        // section gallery
        'gallery' => array(
            'id' => 'gallery',
            'selector' => '.section-gallery',
            'settings' => array(
                'onepress_gallery_source',

                'onepress_gallery_title',
                'onepress_gallery_subtitle',
                'onepress_gallery_desc',
                'onepress_gallery_source_page',
                'onepress_gallery_layout',
                'onepress_gallery_display',
                'onepress_g_number',
                'onepress_g_row_height',
                'onepress_g_col',
                'onepress_g_readmore_link',
                'onepress_g_readmore_text',
            ),
        ),

        // section news
        array(
            'id' => 'news',
            'selector' => '.section-news',
            'settings' => array(
                'onepress_news_title',
                'onepress_news_subtitle',
                'onepress_news_desc',
                'onepress_news_number',
                'onepress_news_more_link',
                'onepress_news_more_text',
            ),
        ),

        // section contact
        array(
            'id' => 'contact',
            'selector' => '.section-contact',
            'settings' => array(
                'onepress_contact_title',
                'onepress_contact_subtitle',
                'onepress_contact_desc',
                'onepress_contact_cf7',
                'onepress_contact_cf7_disable',
                'onepress_contact_text',
                'onepress_contact_address_title',
                'onepress_contact_address',
                'onepress_contact_phone',
                'onepress_contact_email',
                'onepress_contact_fax',
            ),
        ),

        // section counter
        array(
            'id' => 'counter',
            'selector' => '.section-counter',
            'settings' => array(
                'onepress_counter_boxes',
                'onepress_counter_title',
                'onepress_counter_subtitle',
                'onepress_counter_desc',
            ),
        ),
        // section videolightbox
        array(
            'id' => 'videolightbox',
            'selector' => '.section-videolightbox',
            'settings' => array(
                'onepress_videolightbox_title',
                'onepress_videolightbox_url',
            ),
        ),

        // Section about
        array(
            'id' => 'about',
            'selector' => '.section-about',
            'settings' => array(
                'onepress_about_boxes',
                'onepress_about_title',
                'onepress_about_subtitle',
                'onepress_about_desc',
                'onepress_about_content_source',
            ),
        ),

        // Section team
        array(
            'id' => 'team',
            'selector' => '.section-team',
            'settings' => array(
                'onepress_team_members',
                'onepress_team_title',
                'onepress_team_subtitle',
                'onepress_team_desc',
                'onepress_team_layout',
            ),
        ),
    );

    $selective_refresh_keys = apply_filters( 'onepress_customizer_partials_selective_refresh_keys', $selective_refresh_keys );

    foreach ( $selective_refresh_keys as $section ) {
        foreach ( $section['settings'] as $key ) {
            if ( $wp_customize->get_setting( $key ) ) {
                $wp_customize->get_setting( $key )->transport = 'postMessage';
            }
        }

        $wp_customize->selective_refresh->add_partial( 'section-'.$section['id'] , array(
            'selector' => $section['selector'],
            'settings' => $section['settings'],
            'render_callback' => 'onepress_selective_refresh_render_section_content',
        ));
    }

    $wp_customize->get_setting( 'blogname' )->transport = 'postMessage';
    $wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';
    $wp_customize->get_setting( 'onepress_hide_sitetitle' )->transport = 'postMessage';
    $wp_customize->get_setting( 'onepress_hide_tagline' )->transport = 'postMessage';
    $wp_customize->selective_refresh->add_partial( 'header_brand', array(
        'selector' => '.site-header .site-branding',
        'settings' => array( 'blogname', 'blogdescription', 'onepress_hide_sitetitle', 'onepress_hide_tagline' ),
        'render_callback' => 'onepress_site_logo',
    ) );

    // Footer social heading
    $wp_customize->selective_refresh->add_partial( 'onepress_social_footer_title', array(
        'selector' => '.footer-social .follow-heading',
        'settings' => array( 'onepress_social_footer_title' ),
        'render_callback' => 'onepress_selective_refresh_social_footer_title',
    ) );
    // Footer social icons
    $wp_customize->selective_refresh->add_partial( 'onepress_social_profiles', array(
        'selector' => '.footer-social .footer-social-icons',
        'settings' => array( 'onepress_social_profiles' ),
        'render_callback' =>  'onepress_get_social_profiles',
    ) );

    // Footer New letter heading
    $wp_customize->selective_refresh->add_partial( 'onepress_newsletter_title', array(
        'selector' => '.footer-subscribe .follow-heading',
        'settings' => array( 'onepress_newsletter_title' ),
        'render_callback' => 'onepress_selective_refresh_newsletter_title',
    ) );

}
add_action( 'customize_register', 'onepress_customizer_partials', 50 );



/**
 * Selective render content
 *
 * @param $partial
 * @param array $container_context
 */
function onepress_selective_refresh_render_section_content( $partial, $container_context = array() ) {
    $tpl = 'section-parts/'.$partial->id.'.php';
    $GLOBALS['onepress_is_selective_refresh'] = true;
    $file = onepress_customizer_load_template( $tpl );
    if ( $file ) {
        include $file;
    }
}

function onepress_selective_refresh_social_footer_title(){
    return get_theme_mod( 'onepress_social_footer_title' );
}

function onepress_selective_refresh_newsletter_title(){
    return get_theme_mod( 'onepress_newsletter_title' );
}
