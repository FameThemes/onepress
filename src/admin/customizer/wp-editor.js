/**
 * TinyMCE / Quicktags bridge for Customizer textareas.
 */
export function installWpEditor($) {

    window._wpEditor = {
        init: function (id, content, settings) {
            var _id = '__wp_mce_editor__';
            var _tpl = $('#_wp-mce-editor-tpl').html();
            if (typeof content === "undefined") {
                content = '';
            }

            if (typeof window.tinyMCEPreInit.mceInit[_id] !== "undefined") {

                var tmceInit = _.clone(window.tinyMCEPreInit.mceInit[_id]);
                var qtInit = _.clone(window.tinyMCEPreInit.qtInit[_id]);

                tmceInit = $.extend(tmceInit, settings.tinymce);
                qtInit = $.extend(qtInit, settings.qtag);

                var tpl = _tpl.replace(new RegExp(_id, "g"), id);
                var template = $(tpl);
                template.find('textarea').removeAttr('rows').removeAttr('cols');
                $("#" + id).replaceWith(template);
                // set content
                $('#' + id).val(content);

                var $wrap = tinymce.$('#wp-' + id + '-wrap');

                tmceInit.body_class = tmceInit.body_class.replace(new RegExp(_id, "g"), id);
                tmceInit.selector = tmceInit.selector.replace(new RegExp(_id, "g"), id);
                tmceInit.cache_suffix = '';

                $wrap.removeClass('html-active').addClass('tmce-active');

                tmceInit.init_instance_callback = function (editor) {
                    if (typeof settings === 'object') {
                        if (typeof settings.mod === 'string' && settings.mod === 'html') {
                            //console.log( settings.mod  );
                            try {
                                switchEditors.go(id, settings.mod);
                            } catch (e) {

                            }

                        }
                        // editor.theme.resizeTo('100%', 500);
                        if (typeof settings.init_instance_callback === "function") {
                            settings.init_instance_callback(editor);
                        }

                        if (settings.sync_id !== '') {
                            if (typeof settings.sync_id === 'string') {
                                editor.on('keyup change', function (e) {
                                    var html = editor.getContent({format: 'raw'});
                                    html = window._wpEditor.removep(html);
                                    $('#' + settings.sync_id).val(html).trigger('change');
                                });
                            } else {
                                editor.on('keyup change', function (e) {
                                    var html = editor.getContent({format: 'raw'});
                                    html = window._wpEditor.removep(html);
                                    settings.sync_id.val(html).trigger('change');
                                });
                            }

                            $('textarea#' + id).on('keyup change', function () {
                                var v = $(this).val();
                                if (typeof settings.sync_id === 'string') {
                                    $('#' + settings.sync_id).val(v).trigger('change');
                                } else {
                                    settings.sync_id.val(v).trigger('change');
                                }
                            });

                        }
                    }
                };

                tmceInit.plugins = tmceInit.plugins.replace('fullscreen,', '');
                tinyMCEPreInit.mceInit[id] = tmceInit;

                qtInit.id = id;
                tinyMCEPreInit.qtInit[id] = qtInit;

                if ($wrap.hasClass('tmce-active') || !tinyMCEPreInit.qtInit.hasOwnProperty(id)) {
                    tinymce.init(tmceInit);
                    if (!window.wpActiveEditor) {
                        window.wpActiveEditor = id;
                    }
                }

                if (typeof quicktags !== 'undefined') {

                    /**
                     * Reset quicktags
                     * This is crazy condition
                     * Maybe this is a bug ?
                     * see wp-includes/js/quicktags.js line 252
                     */
                    if (QTags.instances['0']) {
                        QTags.instances['0'] = false;
                    }
                    quicktags(qtInit);
                    if (!window.wpActiveEditor) {
                        window.wpActiveEditor = id;
                    }

                }

            }
        },

        /**
         * Replace paragraphs with double line breaks
         * @see wp-admin/js/editor.js
         */
        removep: function (html) {
            return window.switchEditors._wp_Nop(html);
        },

        sync: function () {
            //
        },

        remove: function (id) {
            var content = '';
            var editor = false;
            if (editor = tinymce.get(id)) {
                content = editor.getContent({format: 'raw'});
                content = window._wpEditor.removep(content);
                editor.remove();
            } else {
                content = $('#' + id).val();
            }

            if ($('#wp-' + id + '-wrap').length > 0) {
                window._wpEditorBackUp = window._wpEditorBackUp || {};
                if (typeof window._wpEditorBackUp[id] !== "undefined") {
                    $('#wp-' + id + '-wrap').replaceWith(window._wpEditorBackUp[id]);
                }
            }

            $('#' + id).val(content);
        }

    };


    $.fn.wp_js_editor = function (options) {

        // This is the easiest way to have default options.
        if (options !== 'remove') {
            options = $.extend({
                sync_id: "", // sync to another text area
                tinymce: {}, // tinymce setting
                qtag: {}, // quick tag settings
                mod: '', // quick tag settings
                init_instance_callback: function () {
                } // quick tag settings
            }, options);
        } else {
            options = 'remove';
        }

        return this.each(function () {
            var edit_area = $(this);

            edit_area.uniqueId();
            // Make sure edit area have a id attribute
            var id = edit_area.attr('id') || '';
            if (id === '') {
                return;
            }


            if ('remove' !== options) {
                if (!options.mod) {
                    options.mod = edit_area.attr('data-editor-mod') || '';
                }
                window._wpEditorBackUp = window._wpEditorBackUp || {};
                window._wpEditorBackUp[id] = edit_area;
                window._wpEditor.init(id, edit_area.val(), options);
            } else {
                 window._wpEditor.remove(id);
            }

        });

    };

}
