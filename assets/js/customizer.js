(function (api) {

    // Extends our custom "example-1" section.
    api.sectionConstructor['onepress-plus'] = api.Section.extend({

        // No events for this type of section.
        attachEvents: function () {
        },

        // Always make the section active.
        isContextuallyActive: function () {
            return true;
        }
    });

})(wp.customize);


/*
  jQuery deparam is an extraction of the deparam method from Ben Alman's jQuery BBQ
  http://benalman.com/projects/jquery-bbq-plugin/
*/
(function ($) {
    $.deparam = function (params, coerce) {
        var obj = {},
            coerce_types = {'true': !0, 'false': !1, 'null': null};

        // Iterate over all name=value pairs.
        $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
            var param = v.split('='),
                key = decodeURIComponent(param[0]),
                val,
                cur = obj,
                i = 0,

                // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
                // into its component parts.
                keys = key.split(']['),
                keys_last = keys.length - 1;

            // If the first keys part contains [ and the last ends with ], then []
            // are correctly balanced.
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                // Remove the trailing ] from the last keys part.
                keys[keys_last] = keys[keys_last].replace(/\]$/, '');

                // Split first keys part into two parts on the [ and add them back onto
                // the beginning of the keys array.
                keys = keys.shift().split('[').concat(keys);

                keys_last = keys.length - 1;
            } else {
                // Basic 'foo' style key.
                keys_last = 0;
            }

            // Are we dealing with a name=value pair, or just a name?
            if (param.length === 2) {
                val = decodeURIComponent(param[1]);

                // Coerce values.
                if (coerce) {
                    val = val && !isNaN(val) ? +val              // number
                        : val === 'undefined' ? undefined         // undefined
                            : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                                : val;                                                // string
                }

                if (keys_last) {
                    // Complex key, build deep object structure based on a few rules:
                    // * The 'cur' pointer starts at the object top-level.
                    // * [] = array push (n is set to array length), [n] = array if n is
                    //   numeric, otherwise object.
                    // * If at the last keys part, set the value.
                    // * For each keys part, if the current level is undefined create an
                    //   object or array based on the type of the next keys part.
                    // * Move the 'cur' pointer to the next level.
                    // * Rinse & repeat.
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last
                            ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])
                            : val;
                    }

                } else {
                    // Simple key, even simpler rules, since only scalars and shallow
                    // arrays are allowed.

                    if ($.isArray(obj[key])) {
                        // val is already an array, so push on the next value.
                        obj[key].push(val);

                    } else if (obj[key] !== undefined) {
                        // val isn't an array, but since a second value has been specified,
                        // convert val into an array.
                        obj[key] = [obj[key], val];

                    } else {
                        // val is a scalar.
                        obj[key] = val;
                    }
                }

            } else if (key) {
                // No value was defined, so set something meaningful.
                obj[key] = coerce
                    ? undefined
                    : '';
            }
        });

        return obj;
    };
})(jQuery);


// COLOR ALPHA -----------------------------

/**
 * Alpha Color Picker JS
 */

(function ($) {

    /**
     * Override the stock color.js toString() method to add support for
     * outputting RGBa or Hex.
     */
    Color.prototype.toString = function (flag) {

        // If our no-alpha flag has been passed in, output RGBa value with 100% opacity.
        // This is used to set the background color on the opacity slider during color changes.
        if ('no-alpha' == flag) {
            return this.toCSS('rgba', '1').replace(/\s+/g, '');
        }

        // If we have a proper opacity value, output RGBa.
        if (1 > this._alpha) {
            return this.toCSS('rgba', this._alpha).replace(/\s+/g, '');
        }

        // Proceed with stock color.js hex output.
        var hex = parseInt(this._color, 10).toString(16);
        if (this.error) {
            return '';
        }
        if (hex.length < 6) {
            for (var i = 6 - hex.length - 1; i >= 0; i--) {
                hex = '0' + hex;
            }
        }

        return '#' + hex;
    };

    /**
     * Given an RGBa, RGB, or hex color value, return the alpha channel value.
     */
    function acp_get_alpha_value_from_color(value) {
        var alphaVal;

        // Remove all spaces from the passed in value to help our RGBa regex.
        value = value.replace(/ /g, '');

        if (value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)) {
            alphaVal = parseFloat(value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)[1]).toFixed(2) * 100;
            alphaVal = parseInt(alphaVal);
        } else {
            alphaVal = 100;
        }

        return alphaVal;
    }

    /**
     * Force update the alpha value of the color picker object and maybe the alpha slider.
     */
    function acp_update_alpha_value_on_color_input(alpha, $input, $alphaSlider, update_slider) {
        var iris, colorPicker, color;

        iris = $input.data('a8cIris');
        colorPicker = $input.data('wpWpColorPicker');

        // Set the alpha value on the Iris object.
        iris._color._alpha = alpha;

        // Store the new color value.
        color = iris._color.toString();

        // Set the value of the input.
        $input.val(color);
        $input.trigger('color_change');

        // Update the background color of the color picker.
        colorPicker.toggler.css({
            'background-color': color
        });

        // Maybe update the alpha slider itself.
        if (update_slider) {
            acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);
        }

        // Update the color value of the color picker object.
        $input.wpColorPicker('color', color);
    }

    /**
     * Update the slider handle position and label.
     */
    function acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider) {
        $alphaSlider.slider('value', alpha);
        $alphaSlider.find('.ui-slider-handle').text(alpha.toString());
    }

    $.fn.alphaColorPicker = function () {

        return this.each(function () {

            // Scope the vars.
            var $input, startingColor, paletteInput, showOpacity, defaultColor, palette,
                colorPickerOptions, $container, $alphaSlider, alphaVal, sliderOptions;

            // Store the input.
            $input = $(this);

            // We must wrap the input now in order to get our a top level class
            // around the HTML added by wpColorPicker().
            $input.wrap('<div class="alpha-color-picker-wrap"></div>');

            // Get some data off the input.
            paletteInput = $input.attr('data-palette') || 'true';
            showOpacity = $input.attr('data-show-opacity') || 'true';
            defaultColor = $input.attr('data-default-color') || '';

            // Process the palette.
            if (paletteInput.indexOf('|') !== -1) {
                palette = paletteInput.split('|');
            } else if ('false' == paletteInput) {
                palette = false;
            } else {
                palette = true;
            }

            // Get a clean starting value for the option.
            startingColor = $input.val().replace(/\s+/g, '');
            //startingColor = $input.val().replace( '#', '' );
            //console.log( startingColor );

            // If we don't yet have a value, use the default color.
            if ('' == startingColor) {
                startingColor = defaultColor;
            }

            // Set up the options that we'll pass to wpColorPicker().
            colorPickerOptions = {
                change: function (event, ui) {
                    var key, value, alpha, $transparency;

                    key = $input.attr('data-customize-setting-link');
                    value = $input.wpColorPicker('color');

                    // Set the opacity value on the slider handle when the default color button is clicked.
                    if (defaultColor == value) {
                        alpha = acp_get_alpha_value_from_color(value);
                        $alphaSlider.find('.ui-slider-handle').text(alpha);
                    }

                    // If we're in the Customizer, send an ajax request to wp.customize
                    // to trigger the Save action.
                    if (typeof wp.customize != 'undefined') {
                        wp.customize(key, function (obj) {
                            obj.set(value);
                        });
                    }

                    $transparency = $container.find('.transparency');

                    // Always show the background color of the opacity slider at 100% opacity.
                    $transparency.css('background-color', ui.color.toString('no-alpha'));
                    $input.trigger('color_change');
                },
                clear: function () {
                    var key = $input.attr('data-customize-setting-link') || '';
                    if (key && key !== '') {
                        if (typeof wp.customize != 'undefined') {
                            wp.customize(key, function (obj) {
                                obj.set('');
                            });
                        }
                    }
                    $input.val('');
                    $input.trigger('color_change');
                },
                palettes: palette // Use the passed in palette.
            };

            // Create the colorpicker.
            $input.wpColorPicker(colorPickerOptions);

            $container = $input.parents('.wp-picker-container:first');

            // Insert our opacity slider.
            $('<div class="alpha-color-picker-container">' +
                '<div class="min-click-zone click-zone"></div>' +
                '<div class="max-click-zone click-zone"></div>' +
                '<div class="alpha-slider"></div>' +
                '<div class="transparency"></div>' +
                '</div>').appendTo($container.find('.wp-picker-holder'));

            $alphaSlider = $container.find('.alpha-slider');

            // If starting value is in format RGBa, grab the alpha channel.
            alphaVal = acp_get_alpha_value_from_color(startingColor);

            // Set up jQuery UI slider() options.
            sliderOptions = {
                create: function (event, ui) {
                    var value = $(this).slider('value');

                    // Set up initial values.
                    $(this).find('.ui-slider-handle').text(value);
                    $(this).siblings('.transparency ').css('background-color', startingColor);
                },
                value: alphaVal,
                range: 'max',
                step: 1,
                min: 0,
                max: 100,
                animate: 300
            };

            // Initialize jQuery UI slider with our options.
            $alphaSlider.slider(sliderOptions);

            // Maybe show the opacity on the handle.
            if ('true' == showOpacity) {
                $alphaSlider.find('.ui-slider-handle').addClass('show-opacity');
            }

            // Bind event handlers for the click zones.
            $container.find('.min-click-zone').on('click', function () {
                acp_update_alpha_value_on_color_input(0, $input, $alphaSlider, true);
            });
            $container.find('.max-click-zone').on('click', function () {
                acp_update_alpha_value_on_color_input(100, $input, $alphaSlider, true);
            });

            // Bind event handler for clicking on a palette color.
            $container.find('.iris-palette').on('click', function () {
                var color, alpha;

                color = $(this).css('background-color');
                alpha = acp_get_alpha_value_from_color(color);

                acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);

                // Sometimes Iris doesn't set a perfect background-color on the palette,
                // for example rgba(20, 80, 100, 0.3) becomes rgba(20, 80, 100, 0.298039).
                // To compensante for this we round the opacity value on RGBa colors here
                // and save it a second time to the color picker object.
                if (alpha != 100) {
                    color = color.replace(/[^,]+(?=\))/, (alpha / 100).toFixed(2));
                }

                $input.wpColorPicker('color', color);
            });

            // Bind event handler for clicking on the 'Default' button.
            $container.find('.button.wp-picker-default').on('click', function () {
                var alpha = acp_get_alpha_value_from_color(defaultColor);

                acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);
            });

            // Bind event handler for typing or pasting into the input.
            $input.on('input', function () {
                var value = $(this).val();
                var alpha = acp_get_alpha_value_from_color(value);

                acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);
            });

            // Update all the things when the slider is interacted with.
            $alphaSlider.slider().on('slide', function (event, ui) {
                var alpha = parseFloat(ui.value) / 100.0;

                acp_update_alpha_value_on_color_input(alpha, $input, $alphaSlider, false);

                // Change value shown on slider handle.
                $(this).find('.ui-slider-handle').text(ui.value);
            });
        });
    }

}(jQuery));


// WP COLOR ALPHA customizer -----------------------------
(function (api, $) {
    api.controlConstructor['alpha-color'] = api.Control.extend({
        ready: function () {
            var control = this;
            $('.alpha-color-control', control.container).alphaColorPicker({
                clear: function (event, ui) {

                }
            });
        }

    });

})(wp.customize, jQuery);


// WP REPEATERABLE Customizer -----------------------------

(function (api, $) {

    api.controlConstructor['repeatable'] = api.Control.extend({
        ready: function () {
            var control = this;
            setTimeout(function () {
                control._init();
            }, 2500);
        },

        eval: function (valueIs, valueShould, operator) {

            switch (operator) {
                case 'not_in':
                    valueShould = valueShould.split(',');
                    if ($.inArray(valueIs, valueShould) < 0) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'in':
                    valueShould = valueShould.split(',');
                    if ($.inArray(valueIs, valueShould) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case '!=':
                    return valueIs != valueShould;
                case '<=':
                    return valueIs <= valueShould;
                case '<':
                    return valueIs < valueShould;
                case '>=':
                    return valueIs >= valueShould;
                case '>':
                    return valueIs > valueShould;
                case '==':
                case '=':
                    return valueIs == valueShould;
                    break;
            }
        },

        compare: function (value1, cond, value2) {
            var equal = false;
            var _v;
            switch (cond) {
                case '===':
                    equal = (value1 === value2) ? true : false;
                    break;
                case 'in':
                    return value2.indexOf(value1) == -1 ? false : true;
                    break;
                case '>':
                    equal = (value1 > value2) ? true : false;
                    break;
                case '<':
                    equal = (value1 < value2) ? true : false;
                    break;
                case '!=':
                    equal = (value1 != value2) ? true : false;
                    break;
                case 'empty':
                    _v = _.clone(value1);
                    if (_.isObject(_v) || _.isArray(_v)) {
                        _.each(_v, function (v, i) {
                            if (_.isEmpty(v)) {
                                delete _v[i];
                            }
                        });

                        equal = _.isEmpty(_v) ? true : false;
                    } else {
                        equal = _.isNull(_v) || _v == '' ? true : false;
                    }


                    break;
                case 'not_empty':
                    _v = _.clone(value1);
                    if (_.isObject(_v) || _.isArray(_v)) {
                        _.each(_v, function (v, i) {
                            if (_.isEmpty(v)) {
                                delete _v[i];
                            }
                        })
                    }
                    equal = _.isEmpty(_v) ? false : true;
                    break;
                default:
                    equal = (value1 == value2) ? true : false;

            }
            return equal;
        },
        multiple_compare: function (list, values) {
            var control = this;
            var check = true;
            try {
                var test = list[0];
                check = true;
                if (_.isString(test)) {
                    check = false;
                    var cond = list[1];
                    var cond_val = list[2];
                    var value;
                    if (!_.isUndefined(values[test])) {
                        value = values[test];
                        check = control.compare(value, cond, cond_val);
                    }

                } else if (_.isArray(test)) {
                    check = true;
                    _.each(list, function (req) {
                        var cond_key = req[0];
                        var cond_cond = req[1];
                        var cond_val = req[2];
                        var t_val = values[cond_key];

                        if (_.isUndefined(t_val)) {
                            t_val = '';
                        }

                        if (!control.compare(t_val, cond_cond, cond_val)) {
                            check = false;
                        }
                    });

                }
            } catch (e) {
                check = false;
            }


            return check;
        },

        conditionize: function ($context) {
            var control = this;

            if ($context.hasClass('conditionized')) {
                return;
            }
            $context.addClass('conditionized');

            var $fields = $('.field--item', $context);

            $context.on('change condition_check', 'input, select, textarea', function (e) {

                var f = $('.form', $context);
                var data = $('input, textarea, select', f).serialize();
                data = jQuery.deparam(data);
                var fieldData = {};
                if (_.isObject(data)) {
                    _.each(data._items, function (value) {
                        fieldData = value;
                    });
                }

                $fields.each(function () {
                    var $field = $(this);
                    var check = true;
                    var req = $field.attr('data-cond') || false;

                    if (!_.isUndefined(req) && req) {
                        req = JSON.parse(req);
                        check = control.multiple_compare(req, fieldData);
                        if (!check) {
                            $field.hide().addClass('cond-hide').removeClass('cond-show');
                        } else {
                            $field.slideDown().removeClass('cond-hide').addClass('cond-show');
                        }
                    }
                });


            });

            /**
             * Current support one level only
             */
            $('input, select, textarea', $context).eq(0).trigger('condition_check');
        },

        remove_editor: function ($context) {
        },
        editor: function ($textarea) {
        },

        _init: function () {
            var control = this;

            var default_data = control.params.fields;

            var values;
            try {
                if (typeof control.params.value == 'string') {
                    values = JSON.parse(control.params.value);
                } else {
                    values = control.params.value;
                }
            } catch (e) {
                values = {};
            }

            var max_item = 0; // unlimited
            var limited_mg = control.params.limited_msg || '';

            if (!isNaN(parseInt(control.params.max_item))) {
                max_item = parseInt(control.params.max_item);
            }

            if (control.params.changeable === 'no') {
                // control.container.addClass( 'no-changeable' );
            }

            /**
             * Toggle show/hide item
             */
            control.container.on('click', '.widget .widget-action, .widget .repeat-control-close, .widget-title', function (e) {
                e.preventDefault();
                var p = $(this).closest('.widget');

                if (p.hasClass('explained')) {
                    //console.log( 'has: explained' );
                    $('.widget-inside', p).slideUp(200, 'linear', function () {
                        $('.widget-inside', p).removeClass('show').addClass('hide');
                        p.removeClass('explained');
                    });
                } else {
                    // console.log( 'No: explained' );
                    $('.widget-inside', p).slideDown(200, 'linear', function () {
                        $('.widget-inside', p).removeClass('hide').addClass('show');
                        p.addClass('explained');
                    });
                }
            });

            /**
             * Remove repeater item
             */
            control.container.on('click', '.repeat-control-remove', function (e) {
                e.preventDefault();
                var $context = $(this).closest('.repeatable-customize-control');
                $("body").trigger("repeat-control-remove-item", [$context]);
                control.remove_editor($context);
                $context.remove();
                control.rename();
                control.updateValue();
                control._check_max_item();
            });

            /**
             * Get customizer control data
             *
             * @returns {*}
             */
            control.getData = function () {
                var f = $('.form-data', control.container);
                var data = $('input, textarea, select', f).serialize();
                return JSON.stringify(data);
            };

            /**
             * Update repeater value
             */
            control.updateValue = function () {
                var data = control.getData();
                //$("[data-hidden-value]", control.container).val(data);
                //$("[data-hidden-value]", control.container).trigger('change');

                control.setting.set(data);
            };

            /**
             * Rename repeater item
             */
            control.rename = function () {
                $('.list-repeatable li', control.container).each(function (index) {
                    var li = $(this);
                    $('input, textarea, select', li).each(function () {
                        var input = $(this);
                        var name = input.attr('data-repeat-name') || undefined;
                        if (typeof name !== "undefined") {
                            name = name.replace(/__i__/g, index);
                            input.attr('name', name);
                        }
                    });

                });
            };


            if (!window._upload_fame) {
                window._upload_fame = wp.media({
                    title: wp.media.view.l10n.addMedia,
                    multiple: false,
                    //library: {type: 'all' },
                    //button : { text : 'Insert' }
                });
            }

            window._upload_fame.on('close', function () {
                // get selections and save to hidden input plus other AJAX stuff etc.
                var selection = window._upload_fame.state().get('selection');
                // console.log(selection);
            });

            window.media_current = {};
            window.media_btn = {};

            window._upload_fame.on('select', function () {
                // Grab our attachment selection and construct a JSON representation of the model.
                var media_attachment = window._upload_fame.state().get('selection').first().toJSON();
                $('.image_id', window.media_current).val(media_attachment.id);
                var preview, img_url;
                img_url = media_attachment.url;
                $('.current', window.media_current).removeClass('hide').addClass('show');
                $('.image_url', window.media_current).val(img_url);
                if (media_attachment.type == 'image') {
                    preview = '<img src="' + img_url + '" alt="">';
                    $('.thumbnail-image', window.media_current).html(preview);
                }
                $('.remove-button', window.media_current).show();
                $('.image_id', window.media_current).trigger('change');
                try {
                    window.media_btn.text(window.media_btn.attr('data-change-txt'));
                } catch (e) {

                }

            });


            control.handleMedia = function ($context) {
                $('.item-media', $context).each(function () {
                    var _item = $(this);
                    // when remove item
                    $('.remove-button', _item).on('click', function (e) {
                        e.preventDefault();
                        $('.image_id, .image_url', _item).val('');
                        $('.thumbnail-image', _item).html('');
                        $('.current', _item).removeClass('show').addClass('hide');
                        $(this).hide();
                        $('.upload-button', _item).text($('.upload-button', _item).attr('data-add-txt'));
                        $('.image_id', _item).trigger('change');
                    });

                    // when upload item
                    $('.upload-button, .attachment-media-view', _item).on('click', function (e) {
                        e.preventDefault();
                        window.media_current = _item;
                        window.media_btn = $(this);
                        window._upload_fame.open();
                    });
                });
            };

            /**
             * Init color picker
             *
             * @param $context
             */
            control.colorPicker = function ($context) {
                // Add Color Picker to all inputs that have 'color-field' class
                $('.c-color', $context).wpColorPicker({
                    change: function (event, ui) {
                        control.updateValue();
                    },
                    clear: function (event, ui) {
                        control.updateValue();
                    }
                });

                $('.c-coloralpha', $context).each(function () {
                    var input = $(this);
                    var c = input.val();
                    c = c.replace('#', '');
                    input.removeAttr('value');
                    input.prop('value', c);
                    input.alphaColorPicker({
                        change: function (event, ui) {
                            control.updateValue();
                        },
                        clear: function (event, ui) {
                            control.updateValue();
                        },
                    });
                });
            };

            /**
             * Live title events
             *
             * @param $context
             */
            control.actions = function ($context) {
                if (control.params.live_title_id) {

                    if (!$context.attr('data-title-format')) {
                        $context.attr('data-title-format', control.params.title_format);
                    }

                    var format = $context.attr('data-title-format') || '';
                    // Custom for special ID
                    if (control.id === 'onepress_section_order_styling') {
                        if ($context.find('input.add_by').val() !== 'click') {
                            format = '[live_title]';
                        }
                    }

                    // Live title
                    if (control.params.live_title_id && $("[data-live-id='" + control.params.live_title_id + "']", $context).length > 0) {
                        var v = '';

                        if ($("[data-live-id='" + control.params.live_title_id + "']", $context).is('.select-one')) {
                            v = $("[data-live-id='" + control.params.live_title_id + "']", $context).find('option:selected').eq(0).text();
                        } else {
                            v = $("[data-live-id='" + control.params.live_title_id + "']", $context).eq(0).val();
                        }

                        if (v == '') {
                            v = control.params.default_empty_title;
                        }

                        if (format !== '') {
                            v = format.replace('[live_title]', v);
                        }

                        $('.widget-title .live-title', $context).text(v);

                        $context.on('keyup change', "[data-live-id='" + control.params.live_title_id + "']", function () {
                            var v = '';

                            var format = $context.attr('data-title-format') || '';
                            // custom for special ID
                            if (control.id === 'onepress_section_order_styling') {
                                if ($context.find('input.add_by').val() !== 'click') {
                                    format = '[live_title]';
                                }
                            }

                            if ($(this).is('.select-one')) {
                                v = $(this).find('option:selected').eq(0).text();
                            } else {
                                v = $(this).val();
                            }

                            if (v == '') {
                                v = control.params.default_empty_title;
                            }

                            if (format !== '') {
                                v = format.replace('[live_title]', v);
                            }

                            $('.widget-title .live-title', $context).text(v);
                        });

                    } else {

                    }

                } else {
                    //$('.widget-title .live-title', $context).text( control.params.title_format );
                }

            };


            /**
             * Check limit number item
             *
             * @private
             */
            control._check_max_item = function () {
                var n = $('.list-repeatable > li.repeatable-customize-control', control.container).length;
                //console.log( n );
                if (n >= max_item) {
                    $('.repeatable-actions', control.container).hide();
                    if ($('.limited-msg', control.container).length <= 0) {
                        if (limited_mg !== '') {
                            var msg = $('<p class="limited-msg"/>');
                            msg.html(limited_mg);
                            msg.insertAfter($('.repeatable-actions', control.container));
                            msg.show();
                        }
                    } else {
                        $('.limited-msg', control.container).show();
                    }

                } else {
                    $('.repeatable-actions', control.container).show();
                    $('.limited-msg', control.container).hide();
                }
            };

            /**
             * Function that loads the Mustache template
             */
            control.repeaterTemplate = _.memoize(function () {
                var compiled,
                    /*
                     * Underscore's default ERB-style templates are incompatible with PHP
                     * when asp_tags is enabled, so WordPress uses Mustache-inspired templating syntax.
                     *
                     * @see trac ticket #22344.
                     */
                    options = {
                        evaluate: /<#([\s\S]+?)#>/g,
                        interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
                        escape: /\{\{([^\}]+?)\}\}(?!\})/g,
                        variable: 'data'
                    };

                return function (data) {
                    if (typeof window.repeater_item_tpl === "undefined") {
                        window.repeater_item_tpl = $('#repeatable-js-item-tpl').html();
                    }
                    compiled = _.template(window.repeater_item_tpl, null, options);
                    return compiled(data);
                };
            });
            control.template = control.repeaterTemplate();


            /**
             * Init item events
             *
             * @param $context
             */
            control.intItem = function ($context) {
                control.rename();
                control.conditionize($context);
                control.colorPicker($context);
                control.handleMedia($context);
                //Special check element
                $('[data-live-id="section_id"]', $context).each(function () {
                    $(this).closest('.repeatable-customize-control').addClass('section-' + $(this).val());
                    if ($(this).val() === 'map' || $(this).val()  === 'slider' ) {
                        $context.addClass('show-display-field-only');
                    }
                });

                // Custom for special IDs
                if (control.id === 'onepress_section_order_styling') {
                    if ($context.find('input.add_by').val() !== 'click') {
                        $context.addClass('no-changeable');
                        // Remove because we never use
                        $('.item-editor textarea', $context).remove();
                    } else {
                        $context.find('.item-title').removeClass('item-hidden ');
                        $context.find('.item-title input[type="hidden"]').attr('type', 'text');
                        $context.find('.item-section_id').removeClass('item-hidden ');
                        $context.find('.item-section_id input[type="hidden"]').attr('type', 'text');
                    }
                }

                // Setup editor
                $('.item-editor textarea', $context).each(function () {
                    control.editor($(this));
                });

                // Setup editor
                $('body').trigger('repeater-control-init-item', [$context]);

            };

            /**
             * Drag to sort items
             */
            $(".list-repeatable", control.container).sortable({
                handle: ".widget-title",
                //containment: ".customize-control-repeatable",
                containment: control.container,
                /// placeholder: "sortable-placeholder",
                update: function (event, ui) {
                    control.rename();
                    control.updateValue();
                }
            });


            /**
             * Create existing items
             * @changed 2.1.1
             */

            $.each(values, function (i, _values) {
                var _templateData = $.extend(true, {}, control.params.fields);
                _values = values[i];
                if (_values) {
                    for (var j in _values) {


                        if ( typeof _templateData[j] === "undefined"  ) {
                            _templateData[j] = {};
                        }

                        _templateData[j].value = _values[j];
                        /*
                        if (_templateData.hasOwnProperty(j) && _values.hasOwnProperty(j)) {
                            _templateData[j].value = _values[j];
                        }
                        */
                    }
                }

                var $html = $(control.template(_templateData));
                if ( control.id === 'onepress_section_order_styling') {
                    if (  typeof  _templateData.__visibility !== "undefined" ) {
                        if (  _templateData.__visibility.value === 'hidden' ) {
                            $html.addClass( 'visibility-hidden' );
                        }
                    }
                }


                $('.list-repeatable', control.container).append($html);
                control.intItem($html);
                control.actions($html);
            });


            /**
             * Add new item
             */
            control.container.on('click', '.add-new-repeat-item', function () {
				var controlbox_id = control.id;
				if ( "onepress_map_items_address" === controlbox_id ) {
					var map_long = wp.customize( 'onepress_map_long' ).get();
					var map_lat = wp.customize( 'onepress_map_lat' ).get();
					if ( '' === map_long || '' === map_lat ) {
						$('#customize-control-onepress_map_items_address').find('label').append( '<span class="onepress-customizer-notice">'+ONEPRESS_CUSTOMIZER_DATA.multiple_map_notice+'</span>' );
						return;
					} else {
						$('#customize-control-onepress_map_items_address').find('.onepress-customizer-notice').remove();
					}
				}

                var $html = $(control.template(default_data));
                $('.list-repeatable', control.container).append($html);

                // add unique ID for section if id_key is set
                if (control.params.id_key !== '') {
                    $html.find('.item-' + control.params.id_key).find('input').val('sid' + (new Date().getTime()));
                }
                $html.find('input.add_by').val('click');

                control.intItem($html);
                control.actions($html);
                control.updateValue();
				control._check_max_item();
            });

            /**
             * Update repeater data when any events fire.
             */
            $('.list-repeatable', control.container).on('keyup change color_change', 'input, select, textarea', function (e) {
                control.updateValue();
            });

            control._check_max_item();

        }

    });

})(wp.customize, jQuery);

/**
 * WP EDITOR plugin
 */
(function ($) {

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

                $wrap = tinymce.$('#wp-' + id + '-wrap');

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
                                    html = _wpEditor.removep(html);
                                    $('#' + settings.sync_id).val(html).trigger('change');
                                });
                            } else {
                                editor.on('keyup change', function (e) {
                                    var html = editor.getContent({format: 'raw'});
                                    html = _wpEditor.removep(html);
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
                content = _wpEditor.removep(content);
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

}(jQuery));

(function (api, $) {

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


})(wp.customize, jQuery);


jQuery(window).ready(function ($) {

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

});


/**
 * Icon picker
 */
jQuery(document).ready(function ($) {

    window.editing_icon = false;
    var icon_picker = $('<div class="c-icon-picker"><div class="c-icon-type-wrap"><select class="c-icon-type"></select></div><div class="c-icon-search"><input class="" type="text"></div><div class="c-icon-list"></div></div>');
    var options_font_type = '', icon_group = '';

    $.each(C_Icon_Picker.fonts, function (key, font) {

        font = $.extend({}, {
            url: '',
            name: '',
            prefix: '',
            icons: ''
        }, font);

        $('<link>')
            .appendTo('head')
            .attr({type: 'text/css', rel: 'stylesheet'})
            .attr('id', 'customizer-icon-' + key)
            .attr('href', font.url);

        options_font_type += '<option value="' + key + '">' + font.name + '</option>';

        var icons_array = font.icons.split('|');

        icon_group += '<div class="ic-icons-group" style="display: none;" data-group-name="' + key + '">';
        $.each(icons_array, function (index, icon) {
            if (font.prefix) {
                icon = font.prefix + ' ' + icon;
            }
            icon_group += '<span title="' + icon + '" data-name="' + icon + '"><i class="' + icon + '"></i></span>';

        });
        icon_group += '</div>';

    });
    icon_picker.find('.c-icon-search input').attr('placeholder', C_Icon_Picker.search);
    icon_picker.find('.c-icon-type').html(options_font_type);
    icon_picker.find('.c-icon-list').append(icon_group);
    $('.wp-full-overlay').append(icon_picker);

    // Change icon type
    $('body').on('change', 'select.c-icon-type', function () {
        var t = $(this).val();
        icon_picker.find('.ic-icons-group').hide();
        icon_picker.find('.ic-icons-group[data-group-name="' + t + '"]').show();

    });
    icon_picker.find('select.c-icon-type').trigger('change');

    // When type to search
    $('body').on('keyup', '.c-icon-search input', function () {
        var v = $(this).val();
        if (v == '') {
            $('.c-icon-list span').show();
        } else {
            $('.c-icon-list span').hide();
            try {
                $('.c-icon-list span[data-name*="' + v + '"]').show();
            } catch (e) {

            }
        }
    });

    // Edit icon
    $('body').on('click', '.icon-wrapper', function (e) {
        e.preventDefault();
        var icon = $(this);
        window.editing_icon = icon;
        icon_picker.addClass('ic-active');
        $('body').find('.icon-wrapper').removeClass('icon-editing');
        icon.addClass('icon-editing');
    });
    // Remove icon
    $('body').on('click', '.item-icon .remove-icon', function (e) {
        e.preventDefault();
        var item = $(this).closest('.item-icon');
        item.find('.icon-wrapper input').val('');
        item.find('.icon-wrapper input').trigger('change');
        item.find('.icon-wrapper i').attr('class', '');
        $('body').find('.icon-wrapper').removeClass('icon-editing');
    });

    // Selected icon
    $('body').on('click', '.c-icon-list span', function (e) {
        e.preventDefault();
        var icon_name = $(this).attr('data-name') || '';
        if (window.editing_icon) {
            window.editing_icon.find('i').attr('class', '').addClass($(this).find('i').attr('class'));
            window.editing_icon.find('input').val(icon_name).trigger('change');
        }
        icon_picker.removeClass('ic-active');
        window.editing_icon = false;
        $('body').find('.icon-wrapper').removeClass('icon-editing');
    });

    $(document).mouseup(function (e) {
        if (window.editing_icon) {
            if (!window.editing_icon.is(e.target) // if the target of the click isn't the container...
                && window.editing_icon.has(e.target).length === 0 // ... nor a descendant of the container
                && (
                    !icon_picker.is(e.target)
                    && icon_picker.has(e.target).length === 0
                )
            ) {
                icon_picker.removeClass('ic-active');
                // window.editing_icon = false;
            }
        }
    });


    var display_footer_layout = function (l) {
        $('li[id^="customize-control-footer_custom_"]').hide();
        $('li[id^="customize-control-footer_custom_' + l + '_columns"]').show();
    };

    display_footer_layout($('#customize-control-footer_layout select').val());
    $('#customize-control-footer_layout select').on('change', function () {
        display_footer_layout($(this).val());
    });


});