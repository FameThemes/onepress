/**
 * Hero / gallery / theme action UI toggles.
 */
export function initControlBindings($) {

    if (typeof onepress_customizer_settings !== "undefined") {
        if (onepress_customizer_settings.number_action > 0) {
            $('.control-section-themes h3.accordion-section-title').append('<a class="theme-action-count" href="' + onepress_customizer_settings.action_url + '">' + onepress_customizer_settings.number_action + '</a>');
        }
    }

    /**
     * For Hero layout content settings
     */
    $('select[data-customize-setting-link="onepress_hero_layout"]').on('change on_custom_load', function () {
        var v = $(this).val() || '';

        $("li[id^='customize-control-onepress_hcl']").hide();
        $("li[id^='customize-control-onepress_hcl" + v + "']").show();

    });
    $('select[data-customize-setting-link="onepress_hero_layout"]').trigger('on_custom_load');


    /**
     * For Gallery content settings
     */
    $('select[data-customize-setting-link="onepress_gallery_source"]').on('change on_custom_load', function () {
        var v = $(this).val() || '';

        $("li[id^='customize-control-onepress_gallery_source_']").hide();
        $("li[id^='customize-control-onepress_gallery_api_']").hide();
        $("li[id^='customize-control-onepress_gallery_settings_']").hide();
        $("li[id^='customize-control-onepress_gallery_source_" + v + "']").show();
        $("li[id^='customize-control-onepress_gallery_api_" + v + "']").show();
        $("li[id^='customize-control-onepress_gallery_settings_" + v + "']").show();

    });

    $('select[data-customize-setting-link="onepress_gallery_source"]').trigger('on_custom_load');

    /**
     * For Gallery display settings
     */
    $('select[data-customize-setting-link="onepress_gallery_display"]').on('change on_custom_load', function () {
        var v = $(this).val() || '';
        switch (v) {
            case 'slider':
                $("#customize-control-onepress_g_row_height, #customize-control-onepress_g_col, #customize-control-onepress_g_spacing").hide();
                break;
            case 'justified':
                $("#customize-control-onepress_g_col, #customize-control-onepress_g_spacing").hide();
                $("#customize-control-onepress_g_row_height").show();
                break;
            case 'carousel':
                $("#customize-control-onepress_g_row_height, #customize-control-onepress_g_col").hide();
                $("#customize-control-onepress_g_col, #customize-control-onepress_g_spacing").show();
                break;
            case 'masonry':
                $("#customize-control-onepress_g_row_height").hide();
                $("#customize-control-onepress_g_col, #customize-control-onepress_g_spacing").show();
                break;
            default:
                $("#customize-control-onepress_g_row_height").hide();
                $("#customize-control-onepress_g_col, #customize-control-onepress_g_spacing").show();

        }

    });
    $('select[data-customize-setting-link="onepress_gallery_display"]').trigger('on_custom_load');

    /**
     * News section: show column string only when Blog layout is Grid
     */
    $('select[data-customize-setting-link="onepress_news_layout"]').on('change on_custom_load', function () {
        var v = $(this).val() || '';
        if (v === 'grid') {
            $('#customize-control-onepress_news_grid_columns').show();
        } else {
            $('#customize-control-onepress_news_grid_columns').hide();
        }
    });
    $('select[data-customize-setting-link="onepress_news_layout"]').trigger('on_custom_load');

    /**
     * Blog Posts (global): grid column string only when layout is Grid
     */
    $('select[data-customize-setting-link="onepress_blog_posts_layout"]').on('change on_custom_load', function () {
        var v = $(this).val() || '';
        if (v === 'grid') {
            $('#customize-control-onepress_blog_posts_grid_columns').show();
        } else {
            $('#customize-control-onepress_blog_posts_grid_columns').hide();
        }
    });
    $('select[data-customize-setting-link="onepress_blog_posts_layout"]').trigger('on_custom_load');

}
