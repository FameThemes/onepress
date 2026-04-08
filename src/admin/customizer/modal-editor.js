/**
 * Modal WP editor instances in Customizer sections.
 */
export function initModalEditors(api, $) {

    function _the_editor(container) {
        var _editor = {
            editor_added: false,
            ready: function (container) {

                var control = this;
                control.container = container;
                control.container.addClass('onepress-editor-added');
                control.editing_area = $('textarea', control.container);
                if (control.editing_area.hasClass('wp-editor-added')) {
                    return false;
                }

                control.editing_area.uniqueId();
                control.editing_area.addClass('wp-editor-added');
                control.editing_id = control.editing_area.attr('id') || false;
                if (!control.editing_id) {
                    return false;
                }
                control.editor_id = 'wpe-for-' + control.editing_id;
                control.preview = $('<div id="preview-' + control.editing_id + '" class="wp-js-editor-preview"></div>');
                control.editing_editor = $('<div id="wrap-' + control.editing_id + '" class="modal-wp-js-editor"><textarea id="' + control.editor_id + '"></textarea></div>');
                var content = control.editing_area.val();
                // Load default value
                $('textarea', control.editing_editor).val(content);
                try {
                    control.preview.html(window.switchEditors._wp_Autop(content));
                } catch (e) {

                }

                $('body').on('click', '#customize-controls, .customize-section-back', function (e) {
                    if (!$(e.target).is(control.preview)) {
                        /// e.preventDefault(); // Keep this AFTER the key filter above
                        control.editing_editor.removeClass('wpe-active');
                        $('.wp-js-editor-preview').removeClass('wpe-focus');
                    }
                });

                control.container.find('.wp-js-editor').addClass('wp-js-editor-active');
                control.preview.insertBefore(control.editing_area);

                control._init();

                $(window).on('resize', function () {
                    control._resize();
                });

            },

            _add_editor: function () {
                var control = this;
                if (!this.editor_added) {
                    this.editor_added = true;

                    $('body .wp-full-overlay').append(control.editing_editor);

                    $('textarea', control.editing_editor).attr('data-editor-mod', (control.editing_area.attr('data-editor-mod') || '')).wp_js_editor({
                        sync_id: control.editing_area,
                        init_instance_callback: function (editor) {
                            var w = $('#wp-' + control.editor_id + '-wrap');
                            $('.wp-editor-tabs', w).append('<button class="wp-switch-editor fullscreen-wp-editor"  type="button"><span class="dashicons"></span></button>');
                            $('.wp-editor-tabs', w).append('<button class="wp-switch-editor preview-wp-editor"  type="button"><span class="dashicons dashicons-visibility"></span></button>');
                            $('.wp-editor-tabs', w).append('<button class="wp-switch-editor close-wp-editor"  type="button"><span class="dashicons dashicons-no-alt"></span></button>');
                            w.on('click', '.close-wp-editor', function (e) {
                                e.preventDefault();
                                control.editing_editor.removeClass('wpe-active');
                                $('.wp-js-editor-preview').removeClass('wpe-focus');
                            });
                            $('.preview-wp-editor', w).hover(function () {
                                w.closest('.modal-wp-js-editor').css({opacity: 0});
                            }, function () {
                                w.closest('.modal-wp-js-editor').css({opacity: 1});
                            });
                            w.on('click', '.fullscreen-wp-editor', function (e) {
                                e.preventDefault();
                                w.closest('.modal-wp-js-editor').toggleClass('fullscreen');
                                setTimeout(function () {
                                    $(window).resize();
                                }, 600);
                            });
                        }
                    });


                }
            },

            _init: function () {

                var control = this;

                control.editing_area.on('change', function () {
                    control.preview.html(window.switchEditors._wp_Autop($(this).val()));
                });

                control.preview.on('click', function (e) {
                    control._add_editor();
                    $('.modal-wp-js-editor').removeClass('wpe-active');
                    control.editing_editor.toggleClass('wpe-active');
                    tinyMCE.get(control.editor_id).focus();
                    control.preview.addClass('wpe-focus');
                    control._resize();
                    return false;
                });


                control.container.on('click', '.wp-js-editor-preview', function (e) {
                    e.preventDefault();
                });

            },

            _resize: function () {
                var control = this;
                var w = $('#wp-' + control.editor_id + '-wrap');
                var height = w.innerHeight();
                var tb_h = w.find('.mce-toolbar-grp').eq(0).height();
                tb_h += w.find('.wp-editor-tools').eq(0).height();
                tb_h += 50;
                //var width = $( window ).width();
                var editor = tinymce.get(control.editor_id);
                if (editor) {
                    control.editing_editor.width('');
                    editor.theme.resizeTo('100%', height - tb_h);
                    w.find('textarea.wp-editor-area').height(height - tb_h);
                }

            }

        };

        _editor.ready(container);

    }

    function _remove_editor($context) {
        $('textarea', $context).each(function () {
            var id = $(this).attr('id') || '';
            var editor_id = 'wpe-for-' + id;
            try {
                var editor = tinymce.get(editor_id);
                if (editor) {
                    editor.remove();
                }
                $('#wrap-' + editor_id).remove();
                $('#wrap-' + id).remove();

                if (typeof tinyMCEPreInit.mceInit[editor_id] !== "undefined") {
                    delete  tinyMCEPreInit.mceInit[editor_id];
                }

                if (typeof tinyMCEPreInit.qtInit[editor_id] !== "undefined") {
                    delete  tinyMCEPreInit.qtInit[editor_id];
                }

            } catch (e) {

            }

        });
    }

    var _is_init_editors = {};

    // jQuery( document ).ready( function( $ ){

    api.bind('ready', function (e, b) {

        $('#customize-theme-controls .accordion-section').each(function () {
            var section = $(this);
            var id = section.attr('id') || '';
            if (id) {
                if (typeof _is_init_editors[id] === "undefined") {
                    _is_init_editors[id] = true;

                    setTimeout(function () {
                        if ($('.wp-js-editor', section).length > 0) {
                            $('.wp-js-editor', section).each(function () {
                                _the_editor($(this));
                            });
                        }

                        if ($('.repeatable-customize-control:not(.no-changeable) .item-editor', section).length > 0) {
                            $('.repeatable-customize-control:not(.no-changeable) .item-editor', section).each(function () {
                                _the_editor($(this));
                            });
                        }
                    }, 10);

                }
            }
        });

        // Check section when focus
        if (_wpCustomizeSettings.autofocus) {
            if (_wpCustomizeSettings.autofocus.section) {
                var id = "sub-accordion-section-" + _wpCustomizeSettings.autofocus.section;
                _is_init_editors[id] = true;
                var section = $('#' + id);
                setTimeout(function () {
                    if ($('.wp-js-editor', section).length > 0) {
                        $('.wp-js-editor', section).each(function () {
                            _the_editor($(this));
                        });
                    }

                    if ($('.repeatable-customize-control:not(.no-changeable) .item-editor', section).length > 0) {
                        $('.repeatable-customize-control:not(.no-changeable) .item-editor', section).each(function () {
                            _the_editor($(this));
                        });
                    }
                }, 1000);

            } else if (_wpCustomizeSettings.autofocus.panel) {

            }
        }


        $('body').on('repeater-control-init-item', function (e, container) {
            $('.item-editor', container).each(function () {
                _the_editor($(this));
            });
        });

        $('body').on('repeat-control-remove-item', function (e, container) {
            _remove_editor(container);
        });
    });


}
