/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/customizer/alpha-color-picker.js"
/*!****************************************************!*\
  !*** ./src/admin/customizer/alpha-color-picker.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   installAlphaColorPicker: () => (/* binding */ installAlphaColorPicker)
/* harmony export */ });
/**
 * Alpha color picker: extends WP Color + jQuery plugin.
 */
function installAlphaColorPicker($) {
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
      var $input, startingColor, paletteInput, showOpacity, defaultColor, palette, colorPickerOptions, $container, $alphaSlider, alphaVal, sliderOptions;

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
      $('<div class="alpha-color-picker-container">' + '<div class="min-click-zone click-zone"></div>' + '<div class="max-click-zone click-zone"></div>' + '<div class="alpha-slider"></div>' + '<div class="transparency"></div>' + '</div>').appendTo($container.find('.wp-picker-holder'));
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
  };
}

/***/ },

/***/ "./src/admin/customizer/control-alpha-color.js"
/*!*****************************************************!*\
  !*** ./src/admin/customizer/control-alpha-color.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerAlphaColorControl: () => (/* binding */ registerAlphaColorControl)
/* harmony export */ });
/**
 * Customizer control: alpha-color.
 */
function registerAlphaColorControl(api, $) {
  api.controlConstructor['alpha-color'] = api.Control.extend({
    ready: function () {
      var control = this;
      $('.alpha-color-control', control.container).alphaColorPicker({
        clear: function () {}
      });
    }
  });
}

/***/ },

/***/ "./src/admin/customizer/control-bindings.js"
/*!**************************************************!*\
  !*** ./src/admin/customizer/control-bindings.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initControlBindings: () => (/* binding */ initControlBindings)
/* harmony export */ });
/**
 * Hero / gallery / theme action UI toggles.
 */
function initControlBindings($) {
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

/***/ },

/***/ "./src/admin/customizer/control-font-manager.js"
/*!******************************************************!*\
  !*** ./src/admin/customizer/control-font-manager.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerFontManagerControl: () => (/* binding */ registerFontManagerControl)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _font_manager_FontManagerControlApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./font-manager/FontManagerControlApp */ "./src/admin/customizer/font-manager/FontManagerControlApp.jsx");
/**
 * Customizer control: font_manager (React UI + JSON setting).
 */




/**
 * @param {import('@wordpress/customize').Customize} api wp.customize
 * @param {JQueryStatic} $ jQuery
 */
function registerFontManagerControl(api, $) {
  api.controlConstructor.font_manager = api.Control.extend({
    ready() {
      const control = this;
      const run = () => {
        const el = control.container.find('.font-manager-root').get(0);
        if (!el) {
          return;
        }
        const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(el);
        root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_font_manager_FontManagerControlApp__WEBPACK_IMPORTED_MODULE_2__.FontManagerControlApp, {
          control,
          $
        }));
        control._onepressFontManagerRoot = root;
      };
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(run);
        });
      } else {
        window.setTimeout(run, 50);
      }
    }
  });
}

/***/ },

/***/ "./src/admin/customizer/control-repeatable.js"
/*!****************************************************!*\
  !*** ./src/admin/customizer/control-repeatable.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerRepeatableControl: () => (/* binding */ registerRepeatableControl)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _repeatable_RepeatableControlApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repeatable/RepeatableControlApp */ "./src/admin/customizer/repeatable/RepeatableControlApp.jsx");
/* harmony import */ var _repeatable_repeatable_media_bridge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./repeatable/repeatable-media-bridge */ "./src/admin/customizer/repeatable/repeatable-media-bridge.js");
/**
 * Customizer control: repeatable fields (React UI + wp.customize.Setting bridge).
 */




function registerRepeatableControl(api, $) {
  (0,_repeatable_repeatable_media_bridge__WEBPACK_IMPORTED_MODULE_3__.installRepeatableMediaBridge)($);
  api.controlConstructor['repeatable'] = api.Control.extend({
    ready() {
      const control = this;
      const run = () => {
        const ul = control.container.find('.form-data .list-repeatable').get(0);
        if (!ul) {
          return;
        }
        const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(ul);
        root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_repeatable_RepeatableControlApp__WEBPACK_IMPORTED_MODULE_2__.RepeatableControlApp, {
          api,
          $,
          control
        }));
        control._onepressRepeatableRoot = root;
      };
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(run);
        });
      } else {
        window.setTimeout(run, 50);
      }
    }
  });
}

/***/ },

/***/ "./src/admin/customizer/control-styling.js"
/*!*************************************************!*\
  !*** ./src/admin/customizer/control-styling.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerStylingControl: () => (/* binding */ registerStylingControl)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _styling_StylingControlApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styling/StylingControlApp */ "./src/admin/customizer/styling/StylingControlApp.jsx");
/**
 * Customizer control: styling (React UI + JSON setting).
 */




/**
 * @param {import('@wordpress/customize').Customize} api wp.customize
 * @param {JQueryStatic} $ jQuery
 */
function registerStylingControl(api, $) {
  api.controlConstructor.styling = api.Control.extend({
    ready() {
      const control = this;
      const run = () => {
        const el = control.container.find('.styling-root').get(0);
        if (!el) {
          return;
        }
        const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(el);
        root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styling_StylingControlApp__WEBPACK_IMPORTED_MODULE_2__.StylingControlApp, {
          control,
          $
        }));
        control._onepressStylingRoot = root;
      };
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(run);
        });
      } else {
        window.setTimeout(run, 50);
      }
    }
  });
}

/***/ },

/***/ "./src/admin/customizer/font-manager/FontManagerControlApp.jsx"
/*!*********************************************************************!*\
  !*** ./src/admin/customizer/font-manager/FontManagerControlApp.jsx ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FontManagerControlApp: () => (/* binding */ FontManagerControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/pencil.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styling_components_StylingGoogleFontFamilyControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styling/components/StylingGoogleFontFamilyControl */ "./src/admin/customizer/styling/components/StylingGoogleFontFamilyControl.jsx");
/* harmony import */ var _styling_googleFontCollection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styling/googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");
/* harmony import */ var _styling_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styling/stylingGoogleFonts */ "./src/admin/customizer/styling/stylingGoogleFonts.js");
/* harmony import */ var _styling_useGoogleFontFamilies__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styling/useGoogleFontFamilies */ "./src/admin/customizer/styling/useGoogleFontFamilies.js");
/* harmony import */ var _fontManagerModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fontManagerModel */ "./src/admin/customizer/font-manager/fontManagerModel.js");
/* harmony import */ var _fontManagerPreviewConstants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./fontManagerPreviewConstants */ "./src/admin/customizer/font-manager/fontManagerPreviewConstants.js");

/**
 * Customizer control `font_manager`: saved font list + add/edit panel (picker, Google mode, variants).
 */











/** @typedef {import('./fontManagerModel').FontManagerItem} FontManagerItem */
/** @typedef {import('../styling/googleFontCollection').PickerFontFamily} PickerFontFamily */

/**
 * @param {import('../styling/googleFontCollection').GoogleFontFace} face
 * @returns {string}
 */
function axisPairFromFace(face) {
  return `${(0,_styling_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_8__.normalizeItalForGoogle)(face.fontStyle)},${(0,_styling_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_8__.normalizeFontWeightForGoogle)(face.fontWeight)}`;
}

/**
 * When the Font Library REST payload has no fontFace[], still offer common axes for Google CSS2.
 * @type {ReadonlyArray<{ fontWeight: string, fontStyle: string }>}
 */
const FALLBACK_GOOGLE_VARIATION_FACES = [{
  fontWeight: '300',
  fontStyle: 'normal'
}, {
  fontWeight: '400',
  fontStyle: 'normal'
}, {
  fontWeight: '500',
  fontStyle: 'normal'
}, {
  fontWeight: '600',
  fontStyle: 'normal'
}, {
  fontWeight: '700',
  fontStyle: 'normal'
}, {
  fontWeight: '400',
  fontStyle: 'italic'
}, {
  fontWeight: '700',
  fontStyle: 'italic'
}];

/**
 * @param {PickerFontFamily | null | undefined} family
 * @returns {Array<{ fontWeight: string, fontStyle: string }>}
 */
function effectiveGoogleFacesForUi(family) {
  if (!family || family.isSystem) {
    return [];
  }
  const ff = family.fontFace;
  if (Array.isArray(ff) && ff.length > 0) {
    return ff;
  }
  return [...FALLBACK_GOOGLE_VARIATION_FACES];
}

/**
 * @param {PickerFontFamily | null | undefined} family
 * @returns {string[]}
 */
function allVariationKeysForGoogleFamily(family) {
  const faces = effectiveGoogleFacesForUi(family);
  const seen = new Set();
  const out = [];
  for (const f of faces) {
    const k = axisPairFromFace(f);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out;
}

/**
 * @param {PickerFontFamily[] | null | undefined} families
 * @param {FontManagerItem | null} draft
 * @returns {PickerFontFamily | null}
 */
/**
 * Saved list + open editor draft so preview matches what the user is editing.
 *
 * @param {import('./fontManagerModel').FontManagerItem[]} rootItems
 * @param {['add' | 'edit', FontManagerItem] | null} editor
 */
function mergeItemsForPreview(rootItems, editor) {
  if (!editor) {
    return rootItems;
  }
  const [mode, draft] = editor;
  if (!draft) {
    return rootItems;
  }
  if (mode === 'add') {
    return [...rootItems, draft];
  }
  return rootItems.map(it => it.id === draft.id ? draft : it);
}
function findFontManagerFamily(families, draft) {
  if (!draft || !families?.length) {
    return null;
  }
  if (draft.googleSlug) {
    const bySlug = families.find(f => f.slug === draft.googleSlug);
    if (bySlug) {
      return bySlug;
    }
  }
  return (0,_styling_googleFontCollection__WEBPACK_IMPORTED_MODULE_7__.findFamilyForModel)(families, draft.fontFamily);
}

/**
 * @param {JQueryStatic} $
 * @param {import('@wordpress/customize').Control} control
 * @param {Record<string, unknown>} dataObj
 */
function pushFontManagerPayload($, control, dataObj) {
  const setting = control.setting;
  if (!setting || typeof setting.set !== 'function' || typeof setting.get !== 'function') {
    return;
  }
  const normalized = (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerValue)(dataObj);
  const payload = JSON.stringify(normalized);
  const before = setting.get();
  setting.set(payload);
  const $hidden = control.container.find('input[data-customize-setting-link]');
  if ($hidden.length) {
    $hidden.val(payload);
    $hidden.trigger('input').trigger('change');
  }
  const after = setting.get();
  const _ = typeof window !== 'undefined' ? window._ : null;
  if (_ && typeof _.isEqual === 'function') {
    const skipped = _.isEqual(before, after) && !_.isEqual(before, payload);
    if (skipped) {
      setting._value = payload;
      setting._dirty = true;
      if (setting.callbacks && typeof setting.callbacks.fireWith === 'function') {
        setting.callbacks.fireWith(setting, [payload, before]);
      }
    }
  }
}

/**
 * @param {object} props
 * @param {import('@wordpress/customize').Control} props.control
 * @param {JQueryStatic} props.$
 */
function FontManagerControlApp({
  control,
  $
}) {
  var _editor$, _editor$2;
  const paramsVal = control.params?.value;
  const [root, setRoot] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(() => {
    const fromSetting = (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.parseFontManagerSetting)(control.setting?.get?.());
    if (fromSetting.items?.length) {
      return fromSetting;
    }
    if (paramsVal && typeof paramsVal === 'object') {
      return (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerValue)(paramsVal);
    }
    return (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.defaultFontManagerValue)();
  });

  /** @type {['add' | 'edit', FontManagerItem] | null} */
  const [editor, setEditor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const {
    families,
    loading,
    error
  } = (0,_styling_useGoogleFontFamilies__WEBPACK_IMPORTED_MODULE_9__.useGoogleFontFamilies)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    const setting = control.setting;
    if (!setting || typeof setting.bind !== 'function') {
      return undefined;
    }
    const onChange = raw => {
      setRoot((0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.parseFontManagerSetting)(raw));
    };
    setting.bind(onChange);
    return () => {
      setting.unbind?.(onChange);
    };
  }, [control.setting]);
  const commitRoot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {import('./fontManagerModel').FontManagerValue} next */next => {
    const normalized = (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerValue)(next);
    setRoot(normalized);
    pushFontManagerPayload($, control, normalized);
  }, [$, control]);
  const openAdd = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    setEditor(['add', (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.emptyFontItem)()]);
  }, []);
  const openEdit = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {FontManagerItem} item */item => {
    let next = (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerItem)({
      ...item
    });
    const fam = findFontManagerFamily(families, next);
    if (next.isGoogleFamily && fam && !fam.isSystem) {
      const keys = allVariationKeysForGoogleFamily(fam);
      if (next.variations.length === 0 && keys.length) {
        next = (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerItem)({
          ...next,
          variations: keys
        });
      }
    }
    setEditor(['edit', next]);
  }, [families]);
  const closeEditor = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    setEditor(null);
  }, []);
  const setDraft = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {FontManagerItem | ((prev: FontManagerItem) => FontManagerItem)} u */u => {
    setEditor(prev => {
      if (!prev) {
        return prev;
      }
      const [, draft] = prev;
      const next = typeof u === 'function' ? u(draft) : u;
      return [prev[0], next];
    });
  }, []);
  const draft = (_editor$ = editor?.[1]) !== null && _editor$ !== void 0 ? _editor$ : null;
  const draftMode = (_editor$2 = editor?.[0]) !== null && _editor$2 !== void 0 ? _editor$2 : null;
  const controlLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const l = control.params?.label;
    return typeof l === 'string' && l.trim() !== '' ? l : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Font manager', 'onepress');
  }, [control.params?.label]);
  const controlDescription = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const d = control.params?.description;
    return typeof d === 'string' && d.trim() !== '' ? d : '';
  }, [control.params?.description]);
  const previewAxesByFamily = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const items = mergeItemsForPreview(root.items, editor);
    return (0,_styling_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_8__.fontManagerItemsToGoogleAxesPlainObject)(items);
  }, [root.items, editor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    const previewer = typeof wp !== 'undefined' && wp.customize && wp.customize.previewer ? wp.customize.previewer : null;
    if (!previewer || typeof previewer.send !== 'function') {
      return undefined;
    }
    const id = window.requestAnimationFrame(() => {
      previewer.send(_fontManagerPreviewConstants__WEBPACK_IMPORTED_MODULE_11__.ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE, {
        settingId: String(control.id),
        axesByFamily: previewAxesByFamily
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [previewAxesByFamily, control.id]);
  const draftResolvedFamily = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => findFontManagerFamily(families, draft), [families, draft]);
  const variationFaces = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => draft?.isGoogleFamily && draftResolvedFamily && !draftResolvedFamily.isSystem ? effectiveGoogleFacesForUi(draftResolvedFamily) : [], [draft?.isGoogleFamily, draftResolvedFamily]);
  const onPickFont = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {PickerFontFamily} font */font => {
    setDraft(d => {
      if (!d) {
        return d;
      }
      const isGoogle = !font.isSystem;
      const base = {
        fontFamily: font.fontFamily,
        googleSlug: isGoogle ? font.slug : '',
        googleName: isGoogle ? font.name : '',
        isGoogleFamily: isGoogle
      };
      if (isGoogle) {
        return (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerItem)({
          ...d,
          ...base,
          variations: allVariationKeysForGoogleFamily(font)
        });
      }
      return (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerItem)({
        ...d,
        ...base,
        variations: []
      });
    });
  }, [setDraft]);
  const noopFontPatch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {}, []);
  const toggleVariation = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {string} key */key => {
    setDraft(d => {
      const set = new Set(d.variations);
      if (set.has(key)) {
        set.delete(key);
      } else {
        set.add(key);
      }
      return (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerItem)({
        ...d,
        variations: [...set].sort()
      });
    });
  }, [setDraft]);
  const saveDraft = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    if (!draft || !draftMode) {
      return;
    }
    const cleaned = (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.normalizeFontManagerItem)(draft);
    if (!cleaned.fontFamily.trim() && !cleaned.googleName && !cleaned.googleSlug) {
      // eslint-disable-next-line no-alert
      window.alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Choose a font before saving.', 'onepress'));
      return;
    }
    let nextItems;
    if (draftMode === 'add') {
      nextItems = [...root.items, cleaned];
    } else {
      nextItems = root.items.map(it => it.id === cleaned.id ? cleaned : it);
    }
    commitRoot({
      _onepressFontManager: true,
      items: nextItems
    });
    setEditor(null);
  }, [commitRoot, draft, draftMode, root.items]);
  const deleteItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {string} id */id => {
    // eslint-disable-next-line no-alert
    if (!window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Remove this font from the list?', 'onepress'))) {
      return;
    }
    commitRoot({
      _onepressFontManager: true,
      items: root.items.filter(it => it.id !== id)
    });
    if (editor && editor[1].id === id) {
      setEditor(null);
    }
  }, [commitRoot, editor, root.items]);
  const showVariationPanel = Boolean(draft?.isGoogleFamily && variationFaces.length);
  const showGoogleCategory = draft && draft.isGoogleFamily;
  const editorPanel = draft !== null ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-editor flex flex-col gap-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-editor__title font-bold"
  }, draftMode === 'add' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('New font', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Edit font', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-control__picker"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "field-title font-manager-control__picker-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Font Family', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styling_components_StylingGoogleFontFamilyControl__WEBPACK_IMPORTED_MODULE_6__.StylingGoogleFontFamilyControl, {
    value: draft.fontFamily,
    onPatch: noopFontPatch,
    onPickFamily: onPickFont,
    families: families,
    loading: loading,
    error: error
  })), showGoogleCategory ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-editor__category"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "font-manager-editor__category-badge"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Google Font', 'onepress'))) : null, showVariationPanel ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-control__variations flex flex-col gap-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "field-title font-manager-control__variations-legend"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Variations', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col gap-2 font-manager-control__variation-list"
  }, variationFaces.map((face, idx) => {
    var _face$fontWeight;
    const key = axisPairFromFace(face);
    const w = String((_face$fontWeight = face.fontWeight) !== null && _face$fontWeight !== void 0 ? _face$fontWeight : '400');
    const st = String(face.fontStyle || 'normal');
    const label = st === 'italic' || st === 'oblique' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.sprintf)(/* translators: 1: weight, 2: style */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('%1$s · %2$s', 'onepress'), w, st) : w;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: `${key}-${idx}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
      __nextHasNoMarginBottom: true,
      label: label,
      checked: draft.variations.includes(key),
      onChange: () => toggleVariation(key)
    }));
  }))) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-2 justify-end font-manager-editor__actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    onClick: closeEditor,
    size: "small"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Close', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: saveDraft,
    size: "small"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Save', 'onepress')))) : null;
  const inlineEditForId = draftMode === 'edit' && draft ? draft.id : null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-control font-manager-control--app"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-control__intro"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, controlLabel), controlDescription ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description mt-2"
  }, controlDescription) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'font-manager-list' + (draftMode === 'edit' ? ' font-manager-list--expanded' : ''),
    role: "region",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Fonts saved', 'onepress')
  }, root.items.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-list__empty"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-list__units"
  }, root.items.map(item => {
    const label = (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_10__.displayNameForItem)(item) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('(unnamed)', 'onepress');
    const showFlyoutEditor = inlineEditForId === item.id;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.id,
      className: "font-manager-list__unit"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "font-manager-list__item"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "font-manager-list__row"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "font-manager-list__name",
      title: item.fontFamily || label
    }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "font-manager-list__spacer",
      "aria-hidden": true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: "font-manager-list__icon-btn",
      variant: "tertiary",
      size: "small",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Edit font', 'onepress'),
      disabled: draft !== null,
      onClick: () => openEdit(item)
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: "font-manager-list__icon-btn",
      variant: "tertiary",
      size: "small",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Remove font', 'onepress'),
      disabled: draft !== null,
      onClick: () => deleteItem(item.id)
    }))), showFlyoutEditor ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "font-manager-editor-flyout",
      role: "group",
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Font layout editor', 'onepress')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "font-manager-editor-flyout__arrow",
      "aria-hidden": "true"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "font-manager-editor-flyout__arrow-fill"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "font-manager-editor-flyout__panel"
    }, editorPanel)) : null);
  }))), draft !== null && draftMode === 'add' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-control__editor-below-list"
  }, editorPanel) : null, draft === null ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-manager-control__add-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: openAdd
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Add font', 'onepress'))) : null);
}

/***/ },

/***/ "./src/admin/customizer/font-manager/fontManagerCatalog.js"
/*!*****************************************************************!*\
  !*** ./src/admin/customizer/font-manager/fontManagerCatalog.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fontManagerItemToPickerFontFamily: () => (/* binding */ fontManagerItemToPickerFontFamily),
/* harmony export */   fontManagerValueToPickerFamilies: () => (/* binding */ fontManagerValueToPickerFamilies),
/* harmony export */   variationsToFontFaces: () => (/* binding */ variationsToFontFaces)
/* harmony export */ });
/* harmony import */ var _fontManagerModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fontManagerModel */ "./src/admin/customizer/font-manager/fontManagerModel.js");
/**
 * Font manager items → PickerFontFamily[] for styling UI + font slice rebuild.
 */


/** @typedef {import('./fontManagerModel').FontManagerItem} FontManagerItem */
/** @typedef {import('../styling/googleFontCollection').PickerFontFamily} PickerFontFamily */

/**
 * @param {string[]} variations axis pairs e.g. "0,400"
 * @returns {{ fontWeight: string, fontStyle: string }[]}
 */
function variationsToFontFaces(variations) {
  if (!Array.isArray(variations) || variations.length === 0) {
    return [{
      fontWeight: '400',
      fontStyle: 'normal'
    }];
  }
  const out = [];
  for (const v of variations) {
    const m = /^([01]),(\d{3})$/.exec(String(v).trim());
    if (!m) {
      continue;
    }
    out.push({
      fontWeight: m[2],
      fontStyle: m[1] === '1' ? 'italic' : 'normal'
    });
  }
  return out.length ? out : [{
    fontWeight: '400',
    fontStyle: 'normal'
  }];
}

/**
 * @param {FontManagerItem} item
 * @param {PickerFontFamily[] | null | undefined} googleFamilies — optional, for preview image URL by slug
 * @returns {PickerFontFamily & { __rowId?: string }}
 */
function fontManagerItemToPickerFontFamily(item, googleFamilies) {
  const isGoogle = Boolean(item.isGoogleFamily);
  let preview = '';
  if (isGoogle && item.googleSlug && googleFamilies?.length) {
    const g = googleFamilies.find(f => !f.isSystem && f.slug === item.googleSlug);
    if (g?.preview) {
      preview = g.preview;
    }
  }
  const slugForSlices = isGoogle && item.googleSlug ? item.googleSlug : item.id;
  return {
    slug: slugForSlices,
    name: (0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_0__.displayNameForItem)(item) || item.id,
    fontFamily: item.fontFamily,
    preview,
    fontFace: isGoogle ? variationsToFontFaces(item.variations) : [],
    isSystem: !isGoogle,
    __rowId: item.id
  };
}

/**
 * @param {unknown} raw Parsed font manager root or JSON string
 * @param {PickerFontFamily[] | null | undefined} googleFamilies
 * @returns {PickerFontFamily[]}
 */
function fontManagerValueToPickerFamilies(raw, googleFamilies) {
  let root = raw;
  if (typeof raw === 'string' && raw.trim()) {
    try {
      root = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!root || typeof root !== 'object') {
    return [];
  }
  const items = /** @type {{ items?: unknown }} */root.items;
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map(row => fontManagerItemToPickerFontFamily((0,_fontManagerModel__WEBPACK_IMPORTED_MODULE_0__.normalizeFontManagerItem)(row), googleFamilies)).filter(f => f.fontFamily.trim() !== '' || f.name);
}

/***/ },

/***/ "./src/admin/customizer/font-manager/fontManagerGoogleCss2.js"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/font-manager/fontManagerGoogleCss2.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fontManagerGoogleItemToCss2Href: () => (/* binding */ fontManagerGoogleItemToCss2Href),
/* harmony export */   googleCss2HrefForFontManagerFamily: () => (/* binding */ googleCss2HrefForFontManagerFamily),
/* harmony export */   isValidFontManagerVariationPair: () => (/* binding */ isValidFontManagerVariationPair),
/* harmony export */   uniqueGoogleFontManagerCss2Hrefs: () => (/* binding */ uniqueGoogleFontManagerCss2Hrefs)
/* harmony export */ });
/**
 * Google Fonts CSS2 URLs for font manager items (mirror PHP onepress_font_manager_google_css2_href).
 */

/** @typedef {import('./fontManagerModel').FontManagerItem} FontManagerItem */

/**
 * @param {string} pair
 * @returns {boolean}
 */
function isValidFontManagerVariationPair(pair) {
  return /^[01],\d{3}$/.test(String(pair || '').trim());
}

/**
 * @param {string} googleDisplayName — API family name (e.g. "Open Sans")
 * @param {string[]} variations — "ital,wght" tokens e.g. "0,400"
 * @returns {string}
 */
function googleCss2HrefForFontManagerFamily(googleDisplayName, variations) {
  const name = String(googleDisplayName || '').trim();
  if (!name) {
    return '';
  }
  const raw = Array.isArray(variations) ? variations : [];
  const pairs = [...new Set(raw.map(p => String(p).trim()).filter(isValidFontManagerVariationPair))].sort();
  const usePairs = pairs.length ? pairs : ['0,400'];
  const enc = encodeURIComponent(name).replace(/%20/g, '+');
  return `https://fonts.googleapis.com/css2?family=${enc}:ital,wght@${usePairs.join(';')}&display=swap`;
}

/**
 * @param {FontManagerItem | null | undefined} item
 * @returns {string}
 */
function fontManagerGoogleItemToCss2Href(item) {
  if (!item || !item.isGoogleFamily) {
    return '';
  }
  const gn = String(item.googleName || '').trim();
  if (!gn) {
    return '';
  }
  return googleCss2HrefForFontManagerFamily(gn, item.variations);
}

/**
 * @param {FontManagerItem[]} items
 * @returns {string[]} unique hrefs
 */
function uniqueGoogleFontManagerCss2Hrefs(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const h = fontManagerGoogleItemToCss2Href(item);
    if (h && !seen.has(h)) {
      seen.add(h);
      out.push(h);
    }
  }
  return out;
}

/***/ },

/***/ "./src/admin/customizer/font-manager/fontManagerModel.js"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/font-manager/fontManagerModel.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultFontManagerValue: () => (/* binding */ defaultFontManagerValue),
/* harmony export */   displayNameForItem: () => (/* binding */ displayNameForItem),
/* harmony export */   emptyFontItem: () => (/* binding */ emptyFontItem),
/* harmony export */   newFontItemId: () => (/* binding */ newFontItemId),
/* harmony export */   normalizeFontManagerItem: () => (/* binding */ normalizeFontManagerItem),
/* harmony export */   normalizeFontManagerValue: () => (/* binding */ normalizeFontManagerValue),
/* harmony export */   parseFontManagerSetting: () => (/* binding */ parseFontManagerSetting)
/* harmony export */ });
/**
 * Font manager JSON: list of font items (mirror PHP onepress_font_manager_*).
 */

/**
 * @typedef {{
 *   id: string,
 *   fontFamily: string,
 *   googleSlug: string,
 *   googleName: string,
 *   isGoogleFamily: boolean,
 *   variations: string[]
 * }} FontManagerItem
 */

/**
 * @typedef {{ _onepressFontManager: true, items: FontManagerItem[] }} FontManagerValue
 */

/**
 * @returns {string}
 */
function newFontItemId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `font-${crypto.randomUUID()}`;
  }
  return `font-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * @returns {FontManagerItem}
 */
function emptyFontItem() {
  return {
    id: newFontItemId(),
    fontFamily: '',
    googleSlug: '',
    googleName: '',
    isGoogleFamily: false,
    variations: []
  };
}

/**
 * @param {unknown} raw
 * @returns {FontManagerItem}
 */
function normalizeFontManagerItem(raw) {
  const base = emptyFontItem();
  if (!raw || typeof raw !== 'object') {
    return base;
  }
  const o = /** @type {Record<string, unknown>} */raw;
  let id = typeof o.id === 'string' ? o.id.trim() : '';
  if (!id) {
    id = newFontItemId();
  }
  const vars = [];
  if (Array.isArray(o.variations)) {
    for (const v of o.variations) {
      const s = typeof v === 'string' ? v.trim() : '';
      if (/^[01],\d{3}$/.test(s)) {
        vars.push(s);
      }
    }
  }
  return {
    id,
    fontFamily: typeof o.fontFamily === 'string' ? o.fontFamily.trim() : '',
    googleSlug: typeof o.googleSlug === 'string' ? o.googleSlug.trim() : '',
    googleName: typeof o.googleName === 'string' ? o.googleName.trim() : '',
    isGoogleFamily: Boolean(o.isGoogleFamily),
    variations: [...new Set(vars)]
  };
}

/**
 * @returns {FontManagerValue}
 */
function defaultFontManagerValue() {
  return {
    _onepressFontManager: true,
    items: []
  };
}

/**
 * Legacy root (single font fields on root) → items[0].
 *
 * @param {Record<string, unknown>} o
 * @returns {FontManagerValue | null}
 */
function migrateLegacyRootToItems(o) {
  const hasLegacy = typeof o.fontFamily === 'string' && o.fontFamily.trim() !== '' || typeof o.googleSlug === 'string' && o.googleSlug.trim() !== '';
  if (!hasLegacy) {
    return null;
  }
  const item = normalizeFontManagerItem({
    ...o,
    id: typeof o.id === 'string' && o.id.trim() ? o.id : 'migrated-1'
  });
  return {
    _onepressFontManager: true,
    items: [item]
  };
}

/**
 * @param {unknown} raw
 * @returns {FontManagerValue}
 */
function normalizeFontManagerValue(raw) {
  const base = defaultFontManagerValue();
  if (!raw || typeof raw !== 'object') {
    return base;
  }
  const o = /** @type {Record<string, unknown>} */raw;
  if (!o._onepressFontManager) {
    return base;
  }
  if (Array.isArray(o.items)) {
    const items = o.items.map(it => normalizeFontManagerItem(it));
    return {
      _onepressFontManager: true,
      items
    };
  }
  const migrated = migrateLegacyRootToItems(o);
  if (migrated) {
    return migrated;
  }
  return base;
}

/**
 * @param {unknown} raw
 * @returns {FontManagerValue}
 */
function parseFontManagerSetting(raw) {
  if (typeof raw === 'string' && raw.trim() !== '') {
    try {
      return normalizeFontManagerValue(JSON.parse(raw));
    } catch {
      return defaultFontManagerValue();
    }
  }
  if (raw && typeof raw === 'object') {
    return normalizeFontManagerValue(raw);
  }
  return defaultFontManagerValue();
}

/**
 * @param {FontManagerItem} item
 * @returns {string}
 */
function displayNameForItem(item) {
  if (item.googleName) {
    return item.googleName;
  }
  const ff = item.fontFamily.trim();
  if (ff) {
    const first = ff.split(',')[0].trim().replace(/^["']|["']$/g, '');
    return first || ff;
  }
  return '';
}

/***/ },

/***/ "./src/admin/customizer/font-manager/fontManagerPreviewConstants.js"
/*!**************************************************************************!*\
  !*** ./src/admin/customizer/font-manager/fontManagerPreviewConstants.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE: () => (/* binding */ ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE)
/* harmony export */ });
/** Message channel: controls pane → preview iframe (Google font link hrefs). */
const ONEPRESS_FONT_MANAGER_PREVIEW_MESSAGE = 'onepress-font-manager-preview-fonts';

/***/ },

/***/ "./src/admin/customizer/icon-picker.js"
/*!*********************************************!*\
  !*** ./src/admin/customizer/icon-picker.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initIconPicker: () => (/* binding */ initIconPicker)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _icon_picker_IconPickerApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icon-picker/IconPickerApp */ "./src/admin/customizer/icon-picker/IconPickerApp.jsx");
/* harmony import */ var _icon_picker_injectFontLinks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon-picker/injectFontLinks */ "./src/admin/customizer/icon-picker/injectFontLinks.js");
/**
 * Icon picker (React) + footer layout columns visibility.
 */




function initFooterLayoutColumns($) {
  const displayFooterLayout = function (l) {
    $('li[id^="customize-control-footer_custom_"]').hide();
    $('li[id^="customize-control-footer_custom_' + l + '_columns"]').show();
  };
  displayFooterLayout($('#customize-control-footer_layout select').val());
  $('#customize-control-footer_layout select').on('change', function () {
    displayFooterLayout($(this).val());
  });
}
function initIconPicker($) {
  window.editing_icon = false;
  if (typeof C_Icon_Picker === 'undefined') {
    initFooterLayoutColumns($);
    return;
  }
  const hasFonts = C_Icon_Picker.fonts && Object.keys(C_Icon_Picker.fonts).length > 0;
  const hasSvgTab = Boolean(C_Icon_Picker.svg_code);
  if (!hasFonts && !hasSvgTab) {
    initFooterLayoutColumns($);
    return;
  }
  (0,_icon_picker_injectFontLinks__WEBPACK_IMPORTED_MODULE_3__.injectIconFontLinks)($);
  const overlay = document.querySelector('.wp-full-overlay');
  const host = document.createElement('div');
  host.id = 'onepress-icon-picker-host';
  (overlay || document.body).appendChild(host);
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(host);
  root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icon_picker_IconPickerApp__WEBPACK_IMPORTED_MODULE_2__.IconPickerApp, {
    $
  }));
  initFooterLayoutColumns($);
}

/***/ },

/***/ "./src/admin/customizer/icon-picker/IconPickerApp.jsx"
/*!************************************************************!*\
  !*** ./src/admin/customizer/icon-picker/IconPickerApp.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconPickerApp: () => (/* binding */ IconPickerApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _repeatable_repeatable_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repeatable/repeatable-values */ "./src/admin/customizer/repeatable/repeatable-values.js");

/**
 * Customizer floating icon picker (Font Awesome / C_Icon_Picker + SVG code).
 */


const SVG_KEY = 'svg';
function normalizeFontGroups() {
  if (typeof C_Icon_Picker === 'undefined' || !C_Icon_Picker.fonts) {
    return [];
  }
  return Object.keys(C_Icon_Picker.fonts).map(key => {
    const raw = C_Icon_Picker.fonts[key] || {};
    const prefix = raw.prefix || '';
    const icons = String(raw.icons || '').split('|').filter(Boolean).map(part => prefix ? `${prefix} ${part}`.trim() : part);
    return {
      key,
      name: raw.name || key,
      icons
    };
  });
}
function dispatchIconCommit(wrapperEl, value) {
  if (!wrapperEl) {
    return;
  }
  window.dispatchEvent(new CustomEvent(_repeatable_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.ONEPRESS_ICON_COMMIT_EVENT, {
    bubbles: true,
    detail: {
      wrapperEl,
      value: String(value)
    }
  }));
}
function IconPickerApp({
  $
}) {
  const fontGroups = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(normalizeFontGroups, []);
  const searchPlaceholder = typeof C_Icon_Picker !== 'undefined' && C_Icon_Picker.search ? C_Icon_Picker.search : 'Search';
  const showSvgOption = typeof C_Icon_Picker !== 'undefined' && Boolean(C_Icon_Picker.svg_code);
  const applySvgLabel = typeof C_Icon_Picker !== 'undefined' && C_Icon_Picker.apply_svg ? C_Icon_Picker.apply_svg : 'Apply';
  const svgPlaceholder = typeof C_Icon_Picker !== 'undefined' && C_Icon_Picker.svg_placeholder ? C_Icon_Picker.svg_placeholder : '';
  const defaultKey = fontGroups[0]?.key || (showSvgOption ? SVG_KEY : '');
  const [activeKey, setActiveKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultKey);
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [isPickerActive, setIsPickerActive] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [svgCode, setSvgCode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const q = search.trim().toLowerCase();
  const closePicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setIsPickerActive(false);
    window.editing_icon = false;
    $('body').find('.icon-wrapper').removeClass('icon-editing');
  }, [$]);
  const applySelection = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(fullName => {
    const $wrap = window.editing_icon;
    if ($wrap && $wrap.length) {
      dispatchIconCommit($wrap.get(0), fullName);
    }
    closePicker();
  }, [closePicker]);
  const applySvgCode = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    const $wrap = window.editing_icon;
    const raw = (0,_repeatable_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.normalizeSvgIconForStorage)(String(svgCode || '').trim());
    if ($wrap && $wrap.length) {
      dispatchIconCommit($wrap.get(0), raw);
    }
    closePicker();
  }, [svgCode, closePicker]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const onWrapperClick = e => {
      e.preventDefault();
      const $icon = $(e.currentTarget);
      window.editing_icon = $icon;
      const raw = (0,_repeatable_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.normalizeSvgIconForStorage)(String($icon.find('input').val() || '').trim());
      if (showSvgOption && (0,_repeatable_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.isSvgIconValue)(raw)) {
        setActiveKey(SVG_KEY);
        setSvgCode(raw);
      } else {
        setActiveKey(fontGroups[0]?.key || SVG_KEY);
        setSvgCode('');
      }
      setSearch('');
      setIsPickerActive(true);
      $('body').find('.icon-wrapper').removeClass('icon-editing');
      $icon.addClass('icon-editing');
    };
    $(document.body).on('click.onepressIconWrap', '.icon-wrapper', onWrapperClick);
    return () => $(document.body).off('click.onepressIconWrap', '.icon-wrapper');
  }, [$, fontGroups, showSvgOption]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const onPointerDownOutside = e => {
      const $t = $(e.target);
      if ($t.closest('.c-icon-picker').length || $t.closest('.icon-wrapper').length) {
        return;
      }
      if (!$('.c-icon-picker').hasClass('ic-active')) {
        return;
      }
      closePicker();
    };
    $(document).on('mousedown.onepressIconPickOut', onPointerDownOutside);
    return () => $(document).off('mousedown.onepressIconPickOut', onPointerDownOutside);
  }, [$, closePicker]);
  const onTypeChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(e => {
    const v = e.target.value;
    setActiveKey(v);
    if (v === SVG_KEY) {
      const $w = window.editing_icon;
      if ($w && $w.length) {
        const cur = String($w.find('input').val() || '').trim();
        setSvgCode((0,_repeatable_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.isSvgIconValue)(cur) ? cur : '');
      } else {
        setSvgCode('');
      }
    }
  }, []);
  if (!showSvgOption && fontGroups.length === 0) {
    return null;
  }
  const isSvgMode = showSvgOption && activeKey === SVG_KEY;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `c-icon-picker${isPickerActive ? ' ic-active' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "c-icon-type-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    className: "c-icon-type",
    value: activeKey,
    onChange: onTypeChange
  }, fontGroups.map(g => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: g.key,
    value: g.key
  }, g.name)), showSvgOption ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: SVG_KEY
  }, C_Icon_Picker.svg_code) : null)), isSvgMode ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "c-icon-svg-editor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    className: "c-icon-svg-textarea widefat",
    rows: 10,
    value: svgCode,
    onChange: e => setSvgCode(e.target.value),
    placeholder: svgPlaceholder
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "c-icon-svg-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "button button-primary",
    onClick: applySvgCode
  }, applySvgLabel))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "c-icon-search"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: searchPlaceholder
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "c-icon-list"
  }, fontGroups.map(g => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: g.key,
    className: "ic-icons-group",
    "data-group-name": g.key,
    style: g.key === activeKey ? undefined : {
      display: 'none'
    }
  }, g.icons.map((fullName, idx) => {
    const visible = !q || fullName.toLowerCase().includes(q);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      key: `${g.key}-${idx}-${fullName}`,
      title: fullName,
      "data-name": fullName,
      style: {
        display: visible ? undefined : 'none'
      },
      onClick: e => {
        e.preventDefault();
        applySelection(fullName);
      },
      role: "button",
      tabIndex: 0,
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          applySelection(fullName);
        }
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: fullName
    }));
  }))))));
}

/***/ },

/***/ "./src/admin/customizer/icon-picker/injectFontLinks.js"
/*!*************************************************************!*\
  !*** ./src/admin/customizer/icon-picker/injectFontLinks.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   injectIconFontLinks: () => (/* binding */ injectIconFontLinks)
/* harmony export */ });
/**
 * Inject stylesheet <link> tags for each icon font (same ids/behavior as legacy picker).
 */
function injectIconFontLinks($) {
  if (typeof C_Icon_Picker === 'undefined' || !C_Icon_Picker.fonts) {
    return;
  }
  $.each(C_Icon_Picker.fonts, function (key, font) {
    const f = $.extend({}, {
      url: '',
      name: '',
      prefix: '',
      icons: ''
    }, font);
    if (Array.isArray(f.url)) {
      f.url.forEach(el => {
        $('<link>').appendTo('head').attr({
          type: 'text/css',
          rel: 'stylesheet'
        }).attr('id', 'customizer-icon-' + el.key).attr('href', el.url);
      });
    } else if (f.url) {
      $('<link>').appendTo('head').attr({
        type: 'text/css',
        rel: 'stylesheet'
      }).attr('id', 'customizer-icon-' + key).attr('href', f.url);
    }
  });
}

/***/ },

/***/ "./src/admin/customizer/jquery-deparam.js"
/*!************************************************!*\
  !*** ./src/admin/customizer/jquery-deparam.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   installDeparam: () => (/* binding */ installDeparam)
/* harmony export */ });
/**
 * jQuery deparam — excerpt from jQuery BBQ (Ben Alman).
 * @see http://benalman.com/projects/jquery-bbq-plugin/
 */
function installDeparam($) {
  if ($.deparam) {
    return;
  }
  $.deparam = function (params, coerce) {
    var obj = {},
      coerce_types = {
        'true': !0,
        'false': !1,
        'null': null
      };

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
          val = val && !isNaN(val) ? +val // number
          : val === 'undefined' ? undefined // undefined
          : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
          : val; // string
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
            cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
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
        obj[key] = coerce ? undefined : '';
      }
    });
    return obj;
  };
}

/***/ },

/***/ "./src/admin/customizer/modal-editor.js"
/*!**********************************************!*\
  !*** ./src/admin/customizer/modal-editor.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initModalEditors: () => (/* binding */ initModalEditors)
/* harmony export */ });
/**
 * Modal WP editor instances in Customizer sections.
 */
function initModalEditors(api, $) {
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
        } catch (e) {}
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
          $('textarea', control.editing_editor).attr('data-editor-mod', control.editing_area.attr('data-editor-mod') || '').wp_js_editor({
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
                w.closest('.modal-wp-js-editor').css({
                  opacity: 0
                });
              }, function () {
                w.closest('.modal-wp-js-editor').css({
                  opacity: 1
                });
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
          delete tinyMCEPreInit.mceInit[editor_id];
        }
        if (typeof tinyMCEPreInit.qtInit[editor_id] !== "undefined") {
          delete tinyMCEPreInit.qtInit[editor_id];
        }
      } catch (e) {}
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
      } else if (_wpCustomizeSettings.autofocus.panel) {}
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

/***/ },

/***/ "./src/admin/customizer/plus-section.js"
/*!**********************************************!*\
  !*** ./src/admin/customizer/plus-section.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerPlusSection: () => (/* binding */ registerPlusSection)
/* harmony export */ });
/**
 * OnePress Plus upsell section (always contextually active).
 */
function registerPlusSection(api) {
  api.sectionConstructor['onepress-plus'] = api.Section.extend({
    attachEvents: function () {},
    isContextuallyActive: function () {
      return true;
    }
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/RepeatableControlApp.jsx"
/*!******************************************************************!*\
  !*** ./src/admin/customizer/repeatable/RepeatableControlApp.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RepeatableControlApp: () => (/* binding */ RepeatableControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var array_move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! array-move */ "./node_modules/array-move/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _RepeatableItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RepeatableItem */ "./src/admin/customizer/repeatable/RepeatableItem.jsx");
/* harmony import */ var _repeatable_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./repeatable-values */ "./src/admin/customizer/repeatable/repeatable-values.js");

/**
 * React root for Customizer `repeatable` control: mounts as children of `ul.list-repeatable`.
 *
 * Data flow (every user edit must follow this path):
 * 1. Field UI changes → field `onChange(fieldId, value)` (RepeatableItem → RepeatableField → field component).
 * 2. `setRow` merges the value into that row in React state and builds the next `items` array.
 * 3. `commit(nextItems)` serializes rows to JSON (`serializeSetting`) and calls
 *    `pushRepeatablePayloadToCustomizer` → `setting.set(payload)` + hidden input + callbacks
 *    so wp.customize marks the setting dirty and preview/changeset update.
 *
 * Fields that update the DOM via jQuery only (e.g. modal TinyMCE → `.val().trigger("change")`)
 * must still invoke the same `onChange` path (see TextareaField editor + jQuery listeners).
 */





/**
 * Step 3: apply serialized repeater data to the Customizer setting (and linked hidden input).
 * Core Value#set no-ops when _.isEqual(from, to) — e.g. object vs same JSON string
 * — leaving _dirty false so refresh preview / changeset never see the edit.
 *
 * @param {jQuery} $ jQuery
 * @param {object} control wp.customize.Control instance
 * @param {string} payload JSON string for the setting
 */
function pushRepeatablePayloadToCustomizer($, control, payload) {
  const setting = control.setting;
  if (!setting || typeof setting.set !== 'function' || typeof setting.get !== 'function') {
    return;
  }
  const before = setting.get();
  setting.set(payload);
  const $hidden = control.container.find('input[data-customize-setting-link]');
  if ($hidden.length) {
    $hidden.val(payload);
    $hidden.trigger('input').trigger('change');
  }
  const after = setting.get();
  const _ = typeof window !== 'undefined' ? window._ : null;
  if (_ && typeof _.isEqual === 'function') {
    const skipped = _.isEqual(before, after) && !_.isEqual(before, payload);
    if (skipped) {
      setting._value = payload;
      setting._dirty = true;
      if (setting.callbacks && typeof setting.callbacks.fireWith === 'function') {
        setting.callbacks.fireWith(setting, [payload, before]);
      }
    }
  }
}
function RepeatableControlApp({
  control,
  $,
  api
}) {
  const fields = control.params.fields;
  const fieldIds = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => Object.keys(fields || {}), [fields]);
  const [items, setItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(() => (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_4__.buildRowsFromParams)(control.params.value, fields));
  const maxItem = control.params.max_item ? parseInt(control.params.max_item, 10) : 0;
  const limitedMsg = control.params.limited_msg || '';
  const idKey = control.params.id_key || '';
  const dragFrom = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);

  // Sync hidden input + setting only if payload differs from WP (avoids false “dirty” on load).
  // Note: wp.customize.Value#set ignores a second-arg “silent”; every set marks the setting dirty.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useLayoutEffect)(() => {
    const payload = (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_4__.serializeSetting)(items, fields);
    if (typeof control.setting.set !== 'function' || typeof control.setting.get !== 'function') {
      return;
    }
    const current = control.setting.get();
    if (!(0,_repeatable_values__WEBPACK_IMPORTED_MODULE_4__.repeatableSettingValuesEqual)(current, payload)) {
      pushRepeatablePayloadToCustomizer($, control, payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap only
  }, []);

  // Step 3: rows in memory → JSON payload → wp.customize.Setting.
  const commit = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(next => {
    const payload = (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_4__.serializeSetting)(next, fields);
    pushRepeatablePayloadToCustomizer($, control, payload);
  }, [control, fields, $]);

  // Step 2: patch one row, then commit the full list.
  const setRow = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)((index, updater) => {
    setItems(prev => {
      const prevRow = prev[index];
      const nextRow = typeof updater === 'function' ? updater(prevRow) : updater;
      const next = prev.slice();
      next[index] = nextRow;
      commit(next);
      return next;
    });
  }, [commit]);
  const onRemove = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(index => {
    setItems(prev => {
      const next = prev.filter((_, i) => i !== index);
      commit(next);
      return next;
    });
  }, [commit]);
  const onDragStart = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)((e, index) => {
    dragFrom.current = index;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  }, []);
  const onDragOver = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)((e, toIndex) => {
    e.preventDefault();
    const fromStr = e.dataTransfer.getData('text/plain');
    let from = fromStr !== '' ? parseInt(fromStr, 10) : dragFrom.current;
    if (from === null || from === undefined || Number.isNaN(from)) {
      return;
    }
    setItems(prev => {
      if (from === toIndex) {
        return prev;
      }
      const next = (0,array_move__WEBPACK_IMPORTED_MODULE_1__.arrayMoveImmutable)(prev, from, toIndex);
      commit(next);
      return next;
    });
    dragFrom.current = null;
  }, [commit]);
  const addItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    if (control.id === 'onepress_map_items_address') {
      const mapLong = api('onepress_map_long').get();
      const mapLat = api('onepress_map_lat').get();
      if (mapLong === '' || mapLat === '') {
        const $lab = $('#customize-control-onepress_map_items_address', document).find('label');
        $lab.append('<span class="onepress-customizer-notice">' + (typeof window.ONEPRESS_CUSTOMIZER_DATA !== 'undefined' ? window.ONEPRESS_CUSTOMIZER_DATA.multiple_map_notice : '') + '</span>');
        return;
      }
      $('#customize-control-onepress_map_items_address', document).find('.onepress-customizer-notice').remove();
    }
    setItems(prev => {
      if (maxItem > 0 && prev.length >= maxItem) {
        return prev;
      }
      const row = (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_4__.newEmptyRow)(fields, idKey);
      const next = [...prev, row];
      commit(next);
      return next;
    });
  }, [api, commit, control.id, fields, idKey, maxItem]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const $btn = control.container.find('.add-new-repeat-item');
    $btn.off('click.onepressR').on('click.onepressR', e => {
      e.preventDefault();
      addItem();
    });
    return () => $btn.off('click.onepressR');
  }, [addItem, control.container]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const $actions = control.container.find('.repeatable-actions');
    const n = items.length;
    if (maxItem > 0 && n >= maxItem) {
      $actions.hide();
      if (limitedMsg && control.container.find('.limited-msg').length === 0) {
        $('<p class="limited-msg"/>').html(limitedMsg).insertAfter($actions);
      }
      control.container.find('.limited-msg').show();
    } else {
      $actions.show();
      control.container.find('.limited-msg').hide();
    }
  }, [items.length, maxItem, limitedMsg, control.container]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((row, index) => {
    const itemKey = idKey && row[idKey] ? String(row[idKey]) : `idx-${index}`;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RepeatableItem__WEBPACK_IMPORTED_MODULE_3__.RepeatableItem, {
      key: itemKey,
      $: $,
      control: control,
      fieldIds: fieldIds,
      fields: fields,
      index: index,
      itemKey: itemKey,
      row: row,
      setRow: setRow,
      onRemove: onRemove,
      onDragStart: onDragStart,
      onDragOver: onDragOver,
      onDrop: onDrop
    });
  }));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/RepeatableField.jsx"
/*!*************************************************************!*\
  !*** ./src/admin/customizer/repeatable/RepeatableField.jsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RepeatableField: () => (/* binding */ RepeatableField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fields_fieldRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fields/fieldRegistry */ "./src/admin/customizer/repeatable/fields/fieldRegistry.js");
/* harmony import */ var _repeatable_logic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./repeatable-logic */ "./src/admin/customizer/repeatable/repeatable-logic.js");

/**
 * Single field inside a repeatable row (mirrors PHP `js_item` structure / classes).
 */



function RepeatableField({
  field,
  value,
  onChange,
  rowValues,
  $,
  skipEditor
}) {
  const wrapRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const fieldType = field?.type;
  const fieldId = field?.id;
  const required = field?.required;
  const visible = fieldType ? (0,_repeatable_logic__WEBPACK_IMPORTED_MODULE_3__.fieldVisible)(required, rowValues) : false;

  // Modal WP editor (modal-editor.js) only runs on row mount via repeater-control-init-item.
  // When an editor field appears later (required / visibility), init it against the row <li>.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (!visible || fieldType !== 'editor' || skipEditor) {
      return;
    }
    const el = wrapRef.current;
    if (!el) {
      return;
    }
    const $row = $(el).closest('.repeatable-customize-control');
    if (!$row.length) {
      return;
    }
    $('body').trigger('repeater-control-init-item', [$row]);
  }, [visible, fieldType, fieldId, skipEditor, $]);
  if (!fieldType) {
    return null;
  }

  // Do not mount hidden fields (avoids editor/media init; state stays in row).
  if (!visible) {
    return null;
  }
  const FieldType = (0,_fields_fieldRegistry__WEBPACK_IMPORTED_MODULE_2__.getRepeatableFieldComponent)(fieldType);
  if (!FieldType) {
    return null;
  }
  const wrapClass = `field--item item item-${fieldType} item-${fieldId}`;
  const t = fieldType;
  const showLabel = t !== 'checkbox';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: wrapRef,
    "data-field-id": fieldId,
    className: wrapClass,
    "data-cond": required ? JSON.stringify(required) : undefined
  }, showLabel && field.title ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "field-label",
    dangerouslySetInnerHTML: {
      __html: field.title
    }
  }) : null, showLabel && field.desc ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "field-desc description",
    dangerouslySetInnerHTML: {
      __html: field.desc
    }
  }) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldType, {
    field: field,
    value: value,
    onChange: onChange,
    $: $,
    skipEditor: skipEditor
  }));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/RepeatableItem.jsx"
/*!************************************************************!*\
  !*** ./src/admin/customizer/repeatable/RepeatableItem.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RepeatableItem: () => (/* binding */ RepeatableItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RepeatableField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RepeatableField */ "./src/admin/customizer/repeatable/RepeatableField.jsx");
/* harmony import */ var _repeatable_logic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./repeatable-logic */ "./src/admin/customizer/repeatable/repeatable-logic.js");

/**
 * One repeater row: widget chrome, fields, remove/close, drag handle.
 */



function RepeatableItem({
  $,
  control,
  fieldIds,
  fields,
  index,
  itemKey,
  row,
  setRow,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop
}) {
  const liRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [expanded, setExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const liveTitleId = control.params.live_title_id;
  const titleFormat = control.params.title_format || '';
  const defaultEmptyTitle = control.params.default_empty_title || 'Item';
  const rowValues = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const o = {
      ...row
    };
    return o;
  }, [row]);
  const liveTitle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (!liveTitleId) {
      return defaultEmptyTitle;
    }
    const elId = liveTitleId;
    let v = '';
    const raw = row[elId];
    const fieldDef = fields[elId];
    if (fieldDef && fieldDef.type === 'select' && !fieldDef.multiple) {
      const opts = fieldDef.options || {};
      v = opts[raw] !== undefined ? opts[raw] : raw || '';
    } else {
      v = raw === undefined || raw === null ? '' : String(raw);
    }
    if (v === '') {
      v = defaultEmptyTitle;
    }
    let format = titleFormat;
    // Built-in sections (not added via "Add Section") show plain live title; user-added rows use full title_format.
    if (control.id === 'onepress_section_order_styling' && row.add_by !== 'click') {
      format = '[live_title]';
    }
    if (format !== '') {
      v = format.replace(/\[live_title\]/g, v);
    }
    return v;
  }, [row, liveTitleId, titleFormat, defaultEmptyTitle, fields, control.id]);

  // Step 1→2→3: field value → repeater row state → commit() → Customizer setting (RepeatableControlApp).
  const onFieldChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)((fieldId, val) => {
    setRow(index, prev => ({
      ...prev,
      [fieldId]: val
    }));
  }, [index, setRow]);
  const skipEditor = control.id === 'onepress_section_order_styling' && row.add_by !== 'click';
  const liClass = ['repeatable-customize-control'];
  if (row.__visibility === 'hidden') {
    liClass.push('visibility-hidden');
  }
  const sid = row.section_id !== undefined && row.section_id !== null ? String(row.section_id) : '';
  if (sid !== '') {
    liClass.push(`section-${sid}`);
  }
  if (sid === 'map' || sid === 'slider') {
    liClass.push('show-display-field-only');
  }
  if (skipEditor) {
    liClass.push('no-changeable');
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    const $ctx = $(liRef.current);
    if (!$ctx.length) {
      return;
    }
    $('body').trigger('repeater-control-init-item', [$ctx]);
    return () => {
      $('body').trigger('repeat-control-remove-item', [$ctx]);
    };
  }, [$, itemKey]);
  const toggle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(e => {
    e.preventDefault();
    setExpanded(x => !x);
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    ref: liRef,
    className: liClass.join(' '),
    "data-repeat-key": itemKey
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `widget ${expanded ? 'explained' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-top"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-title-action"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "widget-action",
    href: "#",
    onClick: toggle
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-title",
    draggable: true,
    onDragStart: e => onDragStart(e, index),
    onDragOver: e => onDragOver(e, index),
    onDrop: e => onDrop(e, index)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "live-title"
  }, liveTitle))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `widget-inside ${expanded ? 'show' : 'hide'}`,
    style: expanded ? undefined : {
      display: 'none'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-content"
  }, fieldIds.map(fid => {
    const def = fields[fid];
    if (!def || !def.type) {
      return null;
    }
    // User-added rows (add_by = click): show title as a text input instead of hidden.
    const fieldDef = fid === 'title' && row.add_by === 'click' ? {
      ...def,
      type: 'text'
    } : def;
    const condVisible = (0,_repeatable_logic__WEBPACK_IMPORTED_MODULE_3__.fieldVisible)(fieldDef.required, rowValues);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RepeatableField__WEBPACK_IMPORTED_MODULE_2__.RepeatableField, {
      key: `${fid}-${condVisible ? '1' : '0'}`,
      field: fieldDef,
      value: row[fid],
      onChange: v => onFieldChange(fid, v),
      rowValues: rowValues,
      $: $,
      skipEditor: skipEditor && fieldDef.type === 'editor'
    });
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "widget-control-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "alignleft"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "remove-btn-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "repeat-control-remove",
    onClick: e => {
      e.preventDefault();
      onRemove(index);
    }
  }, "Remove"), ' | '), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "repeat-control-close",
    onClick: toggle
  }, "Close")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", {
    className: "clear"
  })))))));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/AlphaColorField.jsx"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/AlphaColorField.jsx ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlphaColorField: () => (/* binding */ AlphaColorField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AlphaColorInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AlphaColorInput */ "./src/admin/customizer/repeatable/fields/AlphaColorInput.jsx");


function AlphaColorField({
  field,
  value,
  onChange,
  $
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AlphaColorInput__WEBPACK_IMPORTED_MODULE_1__.AlphaColorInput, {
    fieldId: field.id,
    value: value || '',
    onChange: onChange,
    $: $
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/AlphaColorInput.jsx"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/AlphaColorInput.jsx ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlphaColorInput: () => (/* binding */ AlphaColorInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


function AlphaColorInput({
  value,
  onChange,
  fieldId,
  $
}) {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const onChangeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(onChange);
  onChangeRef.current = onChange;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    const $el = $(ref.current);
    if (!$el.length) {
      return;
    }
    let c = value || '';
    c = String(c).replace(/^#/, '');
    $el.removeAttr('value');
    $el.prop('value', c);
    // $.fn.alphaColorPicker() ignores passed options; it always uses internal wpColorPicker callbacks
    // and triggers jQuery "color_change" (see alpha-color-picker.js).
    const onColorPlugin = () => {
      onChangeRef.current($el.val() || '');
    };
    $el.on('color_change.onepressRepeatable', onColorPlugin);
    // alpha-color-picker.js binds "input" for the opacity slider only; typing does not always fire color_change.
    $el.on('input.onepressRepeatable', onColorPlugin);
    $el.alphaColorPicker();
    let raf = 0;
    const pushRaf = () => {
      if (raf) {
        return;
      }
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        onColorPlugin();
      });
    };
    const $picker = $el.closest('.wp-picker-container');
    if ($picker.length) {
      $picker.on('mousemove.onepressRepeatable touchmove.onepressRepeatable', '.iris-picker', pushRaf);
    }
    return () => {
      $picker.off('.onepressRepeatable');
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      $el.off('color_change.onepressRepeatable', onColorPlugin);
      $el.off('input.onepressRepeatable', onColorPlugin);
      try {
        $el.wpColorPicker('destroy');
      } catch (e) {
        // ignore
      }
      try {
        const $wrap = $el.parent('.alpha-color-picker-wrap');
        if ($wrap.length) {
          $el.unwrap();
        }
      } catch (e) {
        // ignore
      }
    };
  }, [$, fieldId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    try {
      const $el = $(ref.current);
      if ($el.length && $el.data('wpWpColorPicker')) {
        $el.wpColorPicker('color', value || '');
      }
    } catch (e) {
      // ignore
    }
  }, [value, $]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: ref,
    "data-live-id": fieldId,
    "data-show-opacity": "true",
    type: "text",
    className: "color-field c-coloralpha alpha-color-control"
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/CheckboxField.jsx"
/*!******************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/CheckboxField.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckboxField: () => (/* binding */ CheckboxField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function CheckboxField({
  field,
  value,
  onChange
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "checkbox-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    "data-live-id": field.id,
    type: "checkbox",
    checked: !!value,
    onChange: e => onChange(e.target.checked),
    value: "1",
    className: ""
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: field.title || ''
    }
  }));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/ColorField.jsx"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/ColorField.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorField: () => (/* binding */ ColorField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ColorInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ColorInput */ "./src/admin/customizer/repeatable/fields/ColorInput.jsx");


function ColorField({
  field,
  value,
  onChange,
  $
}) {
  let display = value || '';
  if (display && String(display).indexOf('#') !== 0) {
    display = '#' + String(display).replace(/^#/, '');
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorInput__WEBPACK_IMPORTED_MODULE_1__.ColorInput, {
    fieldId: field.id,
    value: display,
    onChange: onChange,
    $: $
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/ColorInput.jsx"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/ColorInput.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorInput: () => (/* binding */ ColorInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


function ColorInput({
  value,
  onChange,
  fieldId,
  $
}) {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const onChangeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(onChange);
  onChangeRef.current = onChange;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    const $el = $(ref.current);
    if (!$el.length) {
      return;
    }
    const readColor = () => {
      try {
        return $el.wpColorPicker('color') || $el.val() || '';
      } catch (e) {
        return $el.val() || '';
      }
    };
    const push = () => {
      onChangeRef.current(readColor());
    };
    let raf = 0;
    const pushRaf = () => {
      if (raf) {
        return;
      }
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        push();
      });
    };
    $el.wpColorPicker({
      change: push,
      clear() {
        onChangeRef.current('');
      }
    });
    // wpColorPicker does not forward Iris drag events; while dragging, sync via the picker surface.
    const $wrap = $el.closest('.wp-picker-container');
    $wrap.on('mousemove.onepressRepeatable touchmove.onepressRepeatable', '.iris-picker', pushRaf);
    return () => {
      $wrap.off('.onepressRepeatable');
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      try {
        $el.wpColorPicker('destroy');
      } catch (e) {
        // ignore
      }
    };
  }, [$, fieldId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    try {
      $(ref.current).wpColorPicker('color', value || '');
    } catch (e) {
      // ignore
    }
  }, [value, $]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: ref,
    "data-live-id": fieldId,
    type: "text",
    className: "color-field c-color alpha-color-control"
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/HiddenField.jsx"
/*!****************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/HiddenField.jsx ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiddenField: () => (/* binding */ HiddenField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function HiddenField({
  field,
  value,
  onChange
}) {
  const t = field.type;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    "data-live-id": field.id,
    type: "hidden",
    value: value === undefined || value === null ? '' : value,
    onChange: e => onChange(e.target.value),
    className: t === 'add_by' ? 'add_by' : ''
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/IconField.jsx"
/*!**************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/IconField.jsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconField: () => (/* binding */ IconField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _repeatable_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repeatable-values */ "./src/admin/customizer/repeatable/repeatable-values.js");



function IconField({
  field,
  value,
  onChange
}) {
  const wrapRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const onChangeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(onChange);
  onChangeRef.current = onChange;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handler = e => {
      if (!e.detail || e.detail.wrapperEl !== wrapRef.current) {
        return;
      }
      onChangeRef.current(e.detail.value);
    };
    window.addEventListener(_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.ONEPRESS_ICON_COMMIT_EVENT, handler);
    return () => window.removeEventListener(_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.ONEPRESS_ICON_COMMIT_EVENT, handler);
  }, []);
  const isSvg = (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.isSvgIconValue)(value);
  const ic = isSvg ? '' : (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.iconPreviewClass)(value);
  const svgPreview = isSvg ? (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.sanitizeSvgForCustomizerPreview)(value) : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "item-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon-wrapper",
    ref: wrapRef
  }, isSvg ? svgPreview ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-svg-preview",
    dangerouslySetInnerHTML: {
      __html: svgPreview
    }
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-svg-preview onepress-svg-preview--invalid",
    "aria-hidden": "true"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: `fa ${ic}`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    "data-live-id": field.id,
    type: "hidden",
    value: value === undefined || value === null ? '' : value,
    onChange: e => onChange(e.target.value),
    className: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "remove-icon",
    onClick: e => {
      e.preventDefault();
      onChange('');
    }
  }, "Remove"));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/MediaField.jsx"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/MediaField.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaField: () => (/* binding */ MediaField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _repeatable_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repeatable-values */ "./src/admin/customizer/repeatable/repeatable-values.js");



function MediaField({
  field,
  value,
  onChange,
  $
}) {
  const rootRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const m = (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.normalizeMediaValue)(value);
  const isImage = !field.media || field.media === '' || field.media === 'image';
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const $root = $(rootRef.current);
    if (!$root.length) {
      return;
    }
    const sync = () => {
      onChange({
        url: String($root.find('input.image_url').first().val() || ''),
        id: String($root.find('input.image_id').first().val() || '')
      });
    };
    $root.on('change.onepressR', 'input.image_url, input.image_id', sync);
    return () => $root.off('.onepressR');
  }, [onChange, $]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const $root = $(rootRef.current);
    if (!$root.length) {
      return;
    }
    const next = (0,_repeatable_values__WEBPACK_IMPORTED_MODULE_2__.normalizeMediaValue)(value);
    $root.find('input.image_url').first().val(next.url);
    $root.find('input.image_id').first().val(next.id);
  }, [value, $]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: rootRef,
    className: "item-media"
  }, isImage ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    className: "image_url widefat",
    defaultValue: m.url
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "image_url widefat",
    value: m.url,
    onChange: e => onChange({
      ...m,
      url: e.target.value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    "data-live-id": field.id,
    className: "image_id widefat",
    defaultValue: m.id
  }), isImage ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `current ${m.url ? 'show' : 'hide'}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attachment-media-view attachment-media-view-image landscape"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "thumbnail thumbnail-image"
  }, m.url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: m.url,
    alt: ""
  }) : null)))) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button remove-button",
    type: "button",
    style: m.url ? undefined : {
      display: 'none'
    },
    onClick: e => {
      e.preventDefault();
      onChange({
        url: '',
        id: ''
      });
    }
  }, "Remove"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button upload-button",
    type: "button",
    "data-media": field.media || '',
    "data-add-txt": "Add",
    "data-change-txt": "Change",
    onClick: e => {
      e.preventDefault();
      if (!window._upload_fame) {
        window._upload_fame = wp.media({
          title: wp.media.view.l10n.addMedia,
          multiple: false
        });
      }
      const _item = $(e.target).closest('.item-media');
      window.media_current = _item;
      window.media_btn = $(e.target);
      window._upload_fame.open();
    }
  }, m.url ? 'Change' : 'Add'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      clear: 'both'
    }
  })));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/RadioField.jsx"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/RadioField.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RadioField: () => (/* binding */ RadioField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function RadioField({
  field,
  value,
  onChange
}) {
  const opts = field.options || {};
  return Object.keys(opts).map(k => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    key: k
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    "data-live-id": field.id,
    type: "radio",
    checked: value == k,
    value: k,
    onChange: () => onChange(k),
    className: "widefat"
  }), opts[k]));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/SelectField.jsx"
/*!****************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/SelectField.jsx ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectField: () => (/* binding */ SelectField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function SelectField({
  field,
  value,
  onChange
}) {
  const opts = field.options || {};
  const keys = Object.keys(opts);
  if (field.multiple) {
    const arr = Array.isArray(value) ? value : [];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      "data-live-id": field.id,
      className: "select-multiple",
      multiple: true,
      value: arr,
      onChange: e => {
        const selected = Array.from(e.target.selectedOptions).map(o => o.value);
        onChange(selected);
      }
    }, keys.map(k => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: k,
      value: k
    }, opts[k])));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    "data-live-id": field.id,
    className: "select-one",
    value: value === undefined || value === null ? '' : value,
    onChange: e => onChange(e.target.value)
  }, keys.map(k => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: k,
    value: k
  }, opts[k])));
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/TextField.jsx"
/*!**************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/TextField.jsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextField: () => (/* binding */ TextField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function TextField({
  field,
  value,
  onChange
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    "data-live-id": field.id,
    type: "text",
    value: value === undefined || value === null ? '' : value,
    onChange: e => onChange(e.target.value),
    className: ""
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/TextareaField.jsx"
/*!******************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/TextareaField.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextareaField: () => (/* binding */ TextareaField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


function TextareaField({
  field,
  value,
  onChange,
  skipEditor,
  $
}) {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const onChangeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(onChange);
  onChangeRef.current = onChange;

  // Modal TinyMCE (modal-editor.js + wp-editor.js) syncs with
  // settings.sync_id.val(html).trigger("change") (jQuery). That does not invoke
  // native addEventListener handlers, so a controlled React textarea never updates
  // state or the Customizer setting — bind the same callback via jQuery as well.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (field.type !== 'editor' || skipEditor) {
      return;
    }
    const el = ref.current;
    if (!el) {
      return;
    }
    const push = () => {
      onChangeRef.current(el.value);
    };
    el.addEventListener('change', push);
    el.addEventListener('input', push);
    let $el;
    if ($ && typeof $.fn?.on === 'function') {
      $el = $(el);
      $el.on('change.onepressRepeaterEditor input.onepressRepeaterEditor', push);
    }
    return () => {
      el.removeEventListener('change', push);
      el.removeEventListener('input', push);
      if ($el) {
        $el.off('.onepressRepeaterEditor');
      }
    };
  }, [field.type, skipEditor, $]);
  if (field.type === 'editor' && skipEditor) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    ref: ref,
    "data-live-id": field.id,
    value: value === undefined || value === null ? '' : value,
    onChange: e => onChange(e.target.value)
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/fields/fieldRegistry.js"
/*!*****************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/fieldRegistry.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REPEATABLE_FIELD_COMPONENTS: () => (/* binding */ REPEATABLE_FIELD_COMPONENTS),
/* harmony export */   getRepeatableFieldComponent: () => (/* binding */ getRepeatableFieldComponent)
/* harmony export */ });
/* harmony import */ var _AlphaColorField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlphaColorField */ "./src/admin/customizer/repeatable/fields/AlphaColorField.jsx");
/* harmony import */ var _CheckboxField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckboxField */ "./src/admin/customizer/repeatable/fields/CheckboxField.jsx");
/* harmony import */ var _ColorField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColorField */ "./src/admin/customizer/repeatable/fields/ColorField.jsx");
/* harmony import */ var _HiddenField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HiddenField */ "./src/admin/customizer/repeatable/fields/HiddenField.jsx");
/* harmony import */ var _IconField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IconField */ "./src/admin/customizer/repeatable/fields/IconField.jsx");
/* harmony import */ var _MediaField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MediaField */ "./src/admin/customizer/repeatable/fields/MediaField.jsx");
/* harmony import */ var _RadioField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RadioField */ "./src/admin/customizer/repeatable/fields/RadioField.jsx");
/* harmony import */ var _SelectField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SelectField */ "./src/admin/customizer/repeatable/fields/SelectField.jsx");
/* harmony import */ var _TextareaField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TextareaField */ "./src/admin/customizer/repeatable/fields/TextareaField.jsx");
/* harmony import */ var _TextField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TextField */ "./src/admin/customizer/repeatable/fields/TextField.jsx");











/**
 * Maps `field.type` (from PHP repeatable config) to the React control component.
 */
const REPEATABLE_FIELD_COMPONENTS = {
  hidden: _HiddenField__WEBPACK_IMPORTED_MODULE_3__.HiddenField,
  add_by: _HiddenField__WEBPACK_IMPORTED_MODULE_3__.HiddenField,
  text: _TextField__WEBPACK_IMPORTED_MODULE_9__.TextField,
  checkbox: _CheckboxField__WEBPACK_IMPORTED_MODULE_1__.CheckboxField,
  select: _SelectField__WEBPACK_IMPORTED_MODULE_7__.SelectField,
  radio: _RadioField__WEBPACK_IMPORTED_MODULE_6__.RadioField,
  color: _ColorField__WEBPACK_IMPORTED_MODULE_2__.ColorField,
  coloralpha: _AlphaColorField__WEBPACK_IMPORTED_MODULE_0__.AlphaColorField,
  media: _MediaField__WEBPACK_IMPORTED_MODULE_5__.MediaField,
  textarea: _TextareaField__WEBPACK_IMPORTED_MODULE_8__.TextareaField,
  editor: _TextareaField__WEBPACK_IMPORTED_MODULE_8__.TextareaField,
  icon: _IconField__WEBPACK_IMPORTED_MODULE_4__.IconField
};
function getRepeatableFieldComponent(type) {
  if (!type) {
    return null;
  }
  return REPEATABLE_FIELD_COMPONENTS[type] || null;
}

/***/ },

/***/ "./src/admin/customizer/repeatable/repeatable-logic.js"
/*!*************************************************************!*\
  !*** ./src/admin/customizer/repeatable/repeatable-logic.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compare: () => (/* binding */ compare),
/* harmony export */   fieldVisible: () => (/* binding */ fieldVisible),
/* harmony export */   multipleCompare: () => (/* binding */ multipleCompare),
/* harmony export */   normalizeControllerValue: () => (/* binding */ normalizeControllerValue),
/* harmony export */   rowMatchesCondition: () => (/* binding */ rowMatchesCondition)
/* harmony export */ });
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
/* harmony import */ var lodash_clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_clone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isArray */ "./node_modules/lodash/isArray.js");
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Condition / compare helpers for repeatable field visibility (mirrors PHP `required` on fields).
 *
 * Supported `required` shapes:
 * - Single: [ controllerFieldId, operator, expectedValue ]  e.g. [ 'icon_type', '=', 'icon' ]
 * - AND:    [ [ k, op, v ], [ k2, op2, v2 ] ]
 *
 * Operators: '=', '==', '===', '!=', '!==', '>', '<', 'in', 'empty', 'not_empty'
 */





function compare(value1, cond, value2) {
  let equal = false;
  let _v;
  const op = cond === undefined || cond === null ? '' : String(cond);
  switch (op) {
    case '===':
      equal = value1 === value2;
      break;
    case '==':
    case '=':
      equal = value1 == value2;
      break;
    case '!==':
      equal = value1 !== value2;
      break;
    case '!=':
      equal = value1 != value2;
      break;
    case 'in':
      return Array.isArray(value2) ? value2.indexOf(value1) !== -1 : false;
    case '>':
      equal = value1 > value2;
      break;
    case '<':
      equal = value1 < value2;
      break;
    case 'empty':
      _v = lodash_clone__WEBPACK_IMPORTED_MODULE_0___default()(value1);
      if (lodash_isObject__WEBPACK_IMPORTED_MODULE_4___default()(_v) || lodash_isArray__WEBPACK_IMPORTED_MODULE_2___default()(_v)) {
        lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(_v, (v, i) => {
          if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default()(v)) {
            delete _v[i];
          }
        });
        equal = lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default()(_v);
      } else {
        equal = _v === null || _v === '';
      }
      break;
    case 'not_empty':
      _v = lodash_clone__WEBPACK_IMPORTED_MODULE_0___default()(value1);
      if (lodash_isObject__WEBPACK_IMPORTED_MODULE_4___default()(_v) || lodash_isArray__WEBPACK_IMPORTED_MODULE_2___default()(_v)) {
        lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(_v, (v, i) => {
          if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default()(v)) {
            delete _v[i];
          }
        });
      }
      equal = !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default()(_v);
      break;
    default:
      equal = value1 == value2;
  }
  return equal;
}

// Coerce row cell value for comparisons (missing keys, checkbox booleans).
function normalizeControllerValue(raw) {
  if (raw === undefined || raw === null) {
    return '';
  }
  if (typeof raw === 'boolean') {
    return raw ? '1' : '';
  }
  return raw;
}

// True when one [ fieldId, op, expected ] holds for the current row.
function rowMatchesCondition(values, controllerKey, operator, expected) {
  const actual = normalizeControllerValue(values[controllerKey]);
  return compare(actual, operator, expected);
}

// Single triple [ k, op, v ] or AND of several triples.
function multipleCompare(list, values) {
  if (!list || !Array.isArray(list)) {
    return true;
  }
  if (list.length === 0) {
    return true;
  }

  // AND of several [ key, op, val ] groups
  if (Array.isArray(list[0])) {
    return list.every(req => Array.isArray(req) && req.length >= 3 && typeof req[0] === 'string' && rowMatchesCondition(values, req[0], req[1], req[2]));
  }

  // One condition: [ controllerKey, operator, expected ]
  if (typeof list[0] === 'string' && list.length >= 3) {
    return rowMatchesCondition(values, list[0], list[1], list[2]);
  }
  return true;
}
function fieldVisible(required, fieldValues) {
  if (!required) {
    return true;
  }
  let req;
  try {
    req = typeof required === 'string' ? JSON.parse(required) : required;
  } catch (e) {
    return true;
  }
  return multipleCompare(req, fieldValues || {});
}

/***/ },

/***/ "./src/admin/customizer/repeatable/repeatable-media-bridge.js"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/repeatable/repeatable-media-bridge.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   installRepeatableMediaBridge: () => (/* binding */ installRepeatableMediaBridge)
/* harmony export */ });
/**
 * Single wp.media bridge for repeatable item-media fields (shared across controls).
 */
function installRepeatableMediaBridge($) {
  if (window._onepressRepeatableMediaInstalled) {
    return;
  }
  window._onepressRepeatableMediaInstalled = true;
  if (!window._upload_fame) {
    window._upload_fame = wp.media({
      title: wp.media.view.l10n.addMedia,
      multiple: false
    });
  }
  window._upload_fame.on('select', function () {
    const media_attachment = window._upload_fame.state().get('selection').first().toJSON();
    const $ctx = window.media_current;
    if (!$ctx || !$ctx.length) {
      return;
    }
    $ctx.find('.image_id').val(media_attachment.id);
    const img_url = media_attachment.url;
    $ctx.find('.current').removeClass('hide').addClass('show');
    $ctx.find('.image_url').val(img_url);
    if (media_attachment.type === 'image') {
      $ctx.find('.thumbnail-image').empty().append($('<img>', {
        src: img_url,
        alt: ''
      }));
    }
    $ctx.find('.remove-button').show();
    $ctx.find('.image_id').trigger('change');
    try {
      if (window.media_btn && window.media_btn.length) {
        window.media_btn.text(window.media_btn.attr('data-change-txt'));
      }
    } catch (e) {
      // ignore
    }
  });
}

/***/ },

/***/ "./src/admin/customizer/repeatable/repeatable-values.js"
/*!**************************************************************!*\
  !*** ./src/admin/customizer/repeatable/repeatable-values.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ONEPRESS_ICON_COMMIT_EVENT: () => (/* binding */ ONEPRESS_ICON_COMMIT_EVENT),
/* harmony export */   buildRowsFromParams: () => (/* binding */ buildRowsFromParams),
/* harmony export */   defaultForField: () => (/* binding */ defaultForField),
/* harmony export */   iconPreviewClass: () => (/* binding */ iconPreviewClass),
/* harmony export */   isSvgIconValue: () => (/* binding */ isSvgIconValue),
/* harmony export */   mergeRowFromServer: () => (/* binding */ mergeRowFromServer),
/* harmony export */   newEmptyRow: () => (/* binding */ newEmptyRow),
/* harmony export */   normalizeMediaValue: () => (/* binding */ normalizeMediaValue),
/* harmony export */   normalizeSvgIconForStorage: () => (/* binding */ normalizeSvgIconForStorage),
/* harmony export */   parseRepeatableStructure: () => (/* binding */ parseRepeatableStructure),
/* harmony export */   repeatableSettingValuesEqual: () => (/* binding */ repeatableSettingValuesEqual),
/* harmony export */   rowToSaveItem: () => (/* binding */ rowToSaveItem),
/* harmony export */   sanitizeSvgForCustomizerPreview: () => (/* binding */ sanitizeSvgForCustomizerPreview),
/* harmony export */   serializeSetting: () => (/* binding */ serializeSetting),
/* harmony export */   stripUiMetaFromRepeatable: () => (/* binding */ stripUiMetaFromRepeatable)
/* harmony export */ });
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEqual */ "./node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Row value helpers: defaults, merge from server, payload for Customizer setting.
 */


function defaultForField(field) {
  const t = (field.type || '').toLowerCase();
  switch (t) {
    case 'checkbox':
      return false;
    case 'select':
      {
        if (field.multiple) {
          return [];
        }
        const opts = field.options || {};
        const keys = Object.keys(opts);
        if (keys.length === 0) {
          return '';
        }
        const fromSchema = field.value !== undefined && field.value !== null && field.value !== '' ? String(field.value) : '';
        if (fromSchema !== '' && Object.prototype.hasOwnProperty.call(opts, fromSchema)) {
          return fromSchema;
        }
        if (field.default !== undefined && field.default !== null && field.default !== '' && Object.prototype.hasOwnProperty.call(opts, String(field.default))) {
          return String(field.default);
        }
        return keys[0];
      }
    case 'media':
      return {
        url: '',
        id: ''
      };
    case 'color':
    case 'coloralpha':
      return '';
    case 'add_by':
      // newEmptyRow() forces "click" after defaults when this field exists.
      return '';
    default:
      return '';
  }
}
function normalizeMediaValue(v) {
  if (!v || typeof v !== 'object') {
    return {
      url: '',
      id: ''
    };
  }
  return {
    url: typeof v.url === 'string' ? v.url : '',
    id: v.id !== undefined && v.id !== null ? String(v.id) : ''
  };
}
function mergeRowFromServer(saved, fieldDefs) {
  const row = {};
  Object.keys(fieldDefs).forEach(id => {
    const def = fieldDefs[id];
    if (saved && Object.prototype.hasOwnProperty.call(saved, id)) {
      const raw = saved[id];
      const t = (def.type || '').toLowerCase();
      if (t === 'media') {
        row[id] = normalizeMediaValue(raw);
      } else if (t === 'checkbox') {
        row[id] = !!raw;
      } else if (t === 'select' && def.multiple) {
        row[id] = Array.isArray(raw) ? raw.slice() : raw ? [raw] : [];
      } else if (t === 'icon' && typeof raw === 'string') {
        row[id] = normalizeSvgIconForStorage(raw);
      } else {
        row[id] = raw;
      }
    } else {
      row[id] = defaultForField(def);
    }
  });
  if (saved && saved.__visibility !== undefined) {
    row.__visibility = saved.__visibility;
  }
  return row;
}
function buildRowsFromParams(value, fieldDefs) {
  if (!value) {
    return [];
  }
  let arr = value;
  if (typeof value === 'string') {
    try {
      arr = JSON.parse(value);
    } catch (e) {
      return [];
    }
  }
  if (arr && typeof arr === 'object' && !Array.isArray(arr) && Array.isArray(arr._items)) {
    arr = arr._items;
  }
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.map(saved => mergeRowFromServer(saved, fieldDefs));
}
function rowToSaveItem(row, fieldDefs) {
  const out = {};
  Object.keys(fieldDefs).forEach(id => {
    let v = row[id];
    const t = (fieldDefs[id].type || '').toLowerCase();
    if (t === 'icon' && typeof v === 'string') {
      v = normalizeSvgIconForStorage(v);
    }
    out[id] = v;
  });
  if (row.__visibility !== undefined) {
    out.__visibility = row.__visibility;
  }
  return out;
}
function serializeSetting(items, fieldDefs) {
  return JSON.stringify({
    _items: items.map(row => rowToSaveItem(row, fieldDefs))
  });
}

/**
 * Parse customize setting value or JSON string to { _items: rows }.
 *
 * @param {string|object|Array} raw
 * @returns {{ _items: Array }}
 */
function parseRepeatableStructure(raw) {
  if (raw === null || raw === undefined || raw === '') {
    return {
      _items: []
    };
  }
  let data = raw;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      return {
        _items: []
      };
    }
  }
  if (Array.isArray(data)) {
    return {
      _items: data
    };
  }
  if (typeof data === 'object' && data !== null && Array.isArray(data._items)) {
    return {
      _items: data._items
    };
  }
  return {
    _items: []
  };
}

/**
 * Drop Customizer-only row keys (injected in PHP to_json, not stored in theme_mod).
 *
 * @param {{ _items: Array }} struct
 * @returns {{ _items: Array }}
 */
function stripUiMetaFromRepeatable(struct) {
  const items = (struct._items || []).map(row => {
    if (!row || typeof row !== 'object') {
      return row;
    }
    const {
      __visibility,
      ...rest
    } = row;
    return rest;
  });
  return {
    _items: items
  };
}

/**
 * True when saved setting and React payload represent the same repeatable data.
 * Uses deep equality so key order / string vs object wrappers do not false-positive.
 * Ignores __visibility (section list UI) which exists in control.params.value but not in DB.
 *
 * @param {string|object|Array} a
 * @param {string|object|Array} b
 * @returns {boolean}
 */
function repeatableSettingValuesEqual(a, b) {
  return lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default()(stripUiMetaFromRepeatable(parseRepeatableStructure(a)), stripUiMetaFromRepeatable(parseRepeatableStructure(b)));
}
function newEmptyRow(fieldDefs, idKey) {
  const row = {};
  Object.keys(fieldDefs).forEach(id => {
    row[id] = defaultForField(fieldDefs[id]);
  });
  if (Object.prototype.hasOwnProperty.call(fieldDefs, 'add_by')) {
    row.add_by = 'click';
  }
  if (idKey) {
    row[idKey] = 'sid' + Date.now();
  }
  return row;
}

/** Dispatched by icon picker so React IconField can call onChange (Customizer setting). */
const ONEPRESS_ICON_COMMIT_EVENT = 'onepress-repeatable-icon-commit';

/**
 * Fix SVG strings that picked up extra backslashes before quotes (breaks JSON on save)
 * or "+" instead of space after "<svg" (form-encoding artifacts).
 */
function normalizeSvgIconForStorage(v) {
  if (typeof v !== 'string' || !v) {
    return v;
  }
  let s = v.trim().replace(/^\uFEFF/, '');
  s = s.replace(/^\s*<\?xml\b[^>]*>\s*/i, '');
  s = s.replace(/^\s*<!DOCTYPE\b[^>]*>\s*/i, '');
  s = s.replace(/<svg\+/gi, '<svg ');
  let prev;
  do {
    prev = s;
    s = s.replace(/(?:\\)+"/g, '"');
  } while (s !== prev);
  return s;
}

/**
 * True when the stored icon value is raw SVG markup (not a CSS class string).
 */
function isSvgIconValue(v) {
  if (!v || typeof v !== 'string') {
    return false;
  }
  const s = normalizeSvgIconForStorage(v).trim();
  if (!s) {
    return false;
  }
  return /^<\s*svg[\s>]/i.test(s);
}
function iconPreviewClass(iconValue) {
  if (isSvgIconValue(iconValue)) {
    return '';
  }
  let iconClass = iconValue || '';
  if (iconClass.indexOf('fa-') !== 0) {
    iconClass = 'fa-' + iconClass;
  } else {
    iconClass = iconClass.replace('fa ', '');
  }
  return iconClass.replace('fa-fa', '');
}

/**
 * Strip obvious script/event vectors from SVG before preview in Customizer (saved output is still sanitized in PHP).
 */
function sanitizeSvgForCustomizerPreview(raw) {
  if (typeof raw !== 'string' || !raw) {
    return '';
  }
  const s = normalizeSvgIconForStorage(raw);
  if (!isSvgIconValue(s)) {
    return '';
  }
  return s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '').replace(/\s+href\s*=\s*(["'])\s*javascript:[^"']*\1/gi, ' href="#"');
}

/***/ },

/***/ "./src/admin/customizer/styling/StylingAccordionPanels.jsx"
/*!*****************************************************************!*\
  !*** ./src/admin/customizer/styling/StylingAccordionPanels.jsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STYLING_PANEL_GROUP_IDS: () => (/* binding */ STYLING_PANEL_GROUP_IDS),
/* harmony export */   StylingAccordionPanels: () => (/* binding */ StylingAccordionPanels),
/* harmony export */   resolveAllowedGroupIds: () => (/* binding */ resolveAllowedGroupIds)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "./src/admin/customizer/styling/components/index.js");

/**
 * Styling field groups: Text, Background, Spacing, Border, Shadow, Display, Custom (raw).
 * Each group is an independent toggle (classic collapsible); several can be open at once.
 */





/** Canonical order when showing “all” groups. */
const STYLING_PANEL_GROUP_IDS = ['text', 'background', 'spacing', 'border', 'shadow', 'display', 'raw'];

/** @typedef {'text'|'background'|'spacing'|'border'|'shadow'|'display'|'raw'} StylingAccordionSectionId */
/** @typedef {Partial<Record<StylingAccordionSectionId, boolean>>} OpenSectionsMap */

/**
 * @param {unknown} stylingGroups — from `control.params.styling_groups`; null/undefined = all
 * @returns {StylingAccordionSectionId[]}
 */
function resolveAllowedGroupIds(stylingGroups) {
  if (!Array.isArray(stylingGroups) || stylingGroups.length === 0) {
    return [...STYLING_PANEL_GROUP_IDS];
  }
  const want = stylingGroups.map(String);
  const filtered = want.filter(id => STYLING_PANEL_GROUP_IDS.includes(id));
  return filtered.length ? filtered : [...STYLING_PANEL_GROUP_IDS];
}

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {number} props.unknownCount
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {string} props.sliceKey — `${state}__${device}` to reset link toggles
 * @param {string} props.rawCss
 * @param {(v: string) => void} props.onRawChange
 * @param {import('./googleFontCollection').PickerFontFamily[] | undefined} [props.families] — Google catalog
 * @param {import('./googleFontCollection').PickerFontFamily[] | undefined} [props.localFontFamilies]
 * @param {import('./googleFontCollection').PickerFontFamily[] | undefined} [props.faceResolveFamilies]
 * @param {'google'|'local'|undefined} [props.fontFamilySource]
 * @param {boolean | undefined} [props.fontsLoading]
 * @param {Error | null | undefined} [props.fontsError]
 * @param {string[] | null | undefined} [props.stylingGroups] — whitelist + order; omit/null = all
 * @param {Set<string> | null | undefined} [props.disabledFieldSet] — model keys / internal sentinels to hide
 */
function StylingAccordionPanels({
  model,
  unknownCount,
  onPatch,
  sliceKey,
  rawCss,
  onRawChange,
  families,
  localFontFamilies,
  faceResolveFamilies,
  fontFamilySource,
  fontsLoading,
  fontsError,
  stylingGroups,
  disabledFieldSet
}) {
  const [openBySection, setOpenBySection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(/** @type {OpenSectionsMap} */{});
  const allowedIds = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => resolveAllowedGroupIds(stylingGroups), [stylingGroups]);
  const singleGroupLocked = allowedIds.length === 1;
  const groupTitles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => ({
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text', 'onepress'),
    background: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background', 'onepress'),
    spacing: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Spacing', 'onepress'),
    border: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border & radius', 'onepress'),
    shadow: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Shadow', 'onepress'),
    display: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Display & layout', 'onepress'),
    raw: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom declarations', 'onepress')
  }), []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setOpenBySection(prev => {
      const next = {
        ...prev
      };
      let changed = false;
      for (const k of Object.keys(next)) {
        if (!allowedIds.includes(/** @type {StylingAccordionSectionId} */k)) {
          delete next[(/** @type {StylingAccordionSectionId} */k)];
          changed = true;
        }
      }
      for (const id of allowedIds) {
        if (!(id in next)) {
          next[id] = false;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [allowedIds]);

  /**
   * @param {StylingAccordionSectionId} sectionId
   * @returns {{ opened: boolean, onToggle: (next: boolean) => void, lockOpen: boolean } | null}
   */
  const sectionPanelProps = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(sectionId => {
    if (!allowedIds.includes(sectionId)) {
      return null;
    }
    if (singleGroupLocked) {
      return {
        opened: true,
        onToggle: () => {},
        lockOpen: true
      };
    }
    const opened = Boolean(openBySection[sectionId]);
    return {
      opened,
      onToggle: (/** @type {boolean} */next) => {
        setOpenBySection(prev => ({
          ...prev,
          [sectionId]: Boolean(next)
        }));
      },
      lockOpen: false
    };
  }, [allowedIds, openBySection, singleGroupLocked]);
  const renderGroupBody = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)((/** @type {StylingAccordionSectionId} */sectionId) => {
    switch (sectionId) {
      case 'text':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.TextStyleFields, {
          model: model,
          onPatch: onPatch,
          families: families,
          localFontFamilies: localFontFamilies,
          faceResolveFamilies: faceResolveFamilies,
          fontFamilySource: fontFamilySource,
          fontsLoading: fontsLoading,
          fontsError: fontsError,
          disabledFieldSet: disabledFieldSet
        });
      case 'background':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.BackgroundFields, {
          sliceKey: sliceKey,
          model: model,
          onPatch: onPatch,
          disabledFieldSet: disabledFieldSet
        });
      case 'spacing':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.SpacingFields, {
          sliceKey: sliceKey,
          model: model,
          onPatch: onPatch,
          disabledFieldSet: disabledFieldSet
        });
      case 'border':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.BorderOutlineFields, {
          sliceKey: sliceKey,
          model: model,
          onPatch: onPatch,
          disabledFieldSet: disabledFieldSet
        });
      case 'shadow':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.ShadowFields, {
          model: model,
          onPatch: onPatch,
          disabledFieldSet: disabledFieldSet
        });
      case 'display':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.DisplayLayoutFields, {
          model: model,
          onPatch: onPatch,
          disabledFieldSet: disabledFieldSet
        });
      case 'raw':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.RawDeclarationsField, {
          value: rawCss,
          onChange: onRawChange,
          disabledFieldSet: disabledFieldSet
        });
      default:
        return null;
    }
  }, [model, onPatch, sliceKey, rawCss, onRawChange, families, localFontFamilies, faceResolveFamilies, fontFamilySource, fontsLoading, fontsError, disabledFieldSet]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "panels"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.PreservedPropertiesNotice, {
    count: unknownCount
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Panel, {
    className: "acc-panel acc-panel--independent-toggles"
  }, allowedIds.map(sectionId => {
    const p = sectionPanelProps(sectionId);
    if (!p) {
      return null;
    }
    const title = groupTitles[sectionId];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.StylingGroupPanel, {
      key: sectionId,
      title: title,
      opened: p.opened,
      onToggle: p.onToggle,
      lockOpen: p.lockOpen
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fields list-fields flex flex-col gap-3"
    }, renderGroupBody(sectionId)));
  })));
}

/***/ },

/***/ "./src/admin/customizer/styling/StylingControlApp.jsx"
/*!************************************************************!*\
  !*** ./src/admin/customizer/styling/StylingControlApp.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingControlApp: () => (/* binding */ StylingControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-down.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-up.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/pencil.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/rotate-left.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _customizerPreviewDeviceSync__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customizerPreviewDeviceSync */ "./src/admin/customizer/styling/customizerPreviewDeviceSync.js");
/* harmony import */ var _declarationForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./declarationForm */ "./src/admin/customizer/styling/declarationForm.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components */ "./src/admin/customizer/styling/components/index.js");
/* harmony import */ var _StylingAccordionPanels__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./StylingAccordionPanels */ "./src/admin/customizer/styling/StylingAccordionPanels.jsx");
/* harmony import */ var _targetElementsRegistry__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./targetElementsRegistry */ "./src/admin/customizer/styling/targetElementsRegistry.js");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");
/* harmony import */ var _stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./stylingGoogleFonts */ "./src/admin/customizer/styling/stylingGoogleFonts.js");
/* harmony import */ var _useGoogleFontFamilies__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./useGoogleFontFamilies */ "./src/admin/customizer/styling/useGoogleFontFamilies.js");
/* harmony import */ var _useFontManagerCatalogFamilies__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./useFontManagerCatalogFamilies */ "./src/admin/customizer/styling/useFontManagerCatalogFamilies.js");
/* harmony import */ var _components_StylingInlineEditor__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/StylingInlineEditor */ "./src/admin/customizer/styling/components/StylingInlineEditor.jsx");
/* harmony import */ var _stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./stylingStatesPolicy */ "./src/admin/customizer/styling/stylingStatesPolicy.js");

/**
 * Customizer control `styling`: state tabs + accordion groups; device via icons on responsive fields.
 */
















/**
 * @param {JQueryStatic} $ jQuery
 * @param {import('@wordpress/customize').Control} control
 */
function pushStylingPayloadToCustomizer($, control, dataObj) {
  const setting = control.setting;
  if (!setting || typeof setting.set !== 'function' || typeof setting.get !== 'function') {
    return;
  }
  const payload = JSON.stringify(dataObj);
  const before = setting.get();
  setting.set(payload);
  const $hidden = control.container.find('input[data-customize-setting-link]');
  if ($hidden.length) {
    $hidden.val(payload);
    $hidden.trigger('input').trigger('change');
  }
  const after = setting.get();
  const _ = typeof window !== 'undefined' ? window._ : null;
  if (_ && typeof _.isEqual === 'function') {
    const skipped = _.isEqual(before, after) && !_.isEqual(before, payload);
    if (skipped) {
      setting._value = payload;
      setting._dirty = true;
      if (setting.callbacks && typeof setting.callbacks.fireWith === 'function') {
        setting.callbacks.fireWith(setting, [payload, before]);
      }
    }
  }
}
function cloneValue(v) {
  return JSON.parse(JSON.stringify(v));
}

/**
 * Row label in multi-item list: matched target preset name first when control has `styling_target_elements`, then title / id / fallback.
 *
 * @param {Record<string, unknown>} item
 * @param {number} index
 * @param {{ elements: Array<{ name: string, id: string, selector: string }> }} registry
 * @returns {string}
 */
function getMultiStylingItemListRowLabel(item, index, registry) {
  if (registry?.elements?.length) {
    var _ref, _item$_meta$baseSelec;
    const base = String((_ref = (_item$_meta$baseSelec = item._meta?.baseSelector) !== null && _item$_meta$baseSelec !== void 0 ? _item$_meta$baseSelec : item.selector) !== null && _ref !== void 0 ? _ref : '').trim();
    const elId = typeof item._meta?.elId === 'string' ? item._meta.elId : '';
    const matched = (0,_targetElementsRegistry__WEBPACK_IMPORTED_MODULE_13__.findMatchingTargetPreset)(base, elId, registry);
    if (matched?.name) {
      return matched.name;
    }
  }
  return item.title || item.id || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Item %d', 'onepress'), index + 1);
}

/**
 * @param {Record<string, unknown>} singleClone
 * @param {string} itemTitle
 * @returns {Record<string, unknown>}
 */
function wrapSingleAsMulti(singleClone, itemTitle) {
  const {
    items: _drop,
    ...rest
  } = singleClone;
  const base = typeof singleClone._meta?.baseSelector === 'string' ? singleClone._meta.baseSelector : '';
  return {
    _onepressStyling: true,
    items: [{
      id: 'item-1',
      title: itemTitle,
      selector: base,
      ...rest
    }]
  };
}

/**
 * @param {Record<string, unknown>} v
 * @param {Record<string, unknown> | null} defaultMulti
 * @param {string} migrateTitle
 */
function ensureMultiShape(v, defaultMulti, migrateTitle) {
  if (v && Array.isArray(v.items) && v.items.length) {
    return cloneValue(v);
  }
  if (v && v._meta && !v.items) {
    return wrapSingleAsMulti(cloneValue(v), migrateTitle);
  }
  if (defaultMulti && typeof defaultMulti === 'object' && Array.isArray(defaultMulti.items) && defaultMulti.items.length) {
    return cloneValue(defaultMulti);
  }
  return {
    _onepressStyling: true,
    items: []
  };
}

/**
 * @param {object} props
 * @param {import('@wordpress/customize').Control} props.control
 * @param {JQueryStatic} props.$
 */
function StylingControlApp({
  control,
  $
}) {
  const multiple = Boolean(control.params.styling_multiple);
  const previewDeviceIds = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const fromPhp = control.params.preview_device_ids;
    if (Array.isArray(fromPhp) && fromPhp.length) {
      return fromPhp.map(String);
    }
    return ['desktop', 'tablet', 'mobile'];
  }, [control.params.preview_device_ids]);
  const stylingStatesParam = control.params.styling_states;
  const statesStructureMode = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.getStatesStructureMode)(stylingStatesParam !== undefined ? stylingStatesParam : 'all'), [stylingStatesParam]);
  const fixedStatesTemplate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.getFixedStatesTemplate)(stylingStatesParam), [stylingStatesParam]);
  const editableBaseSelector = control.params.editable_base_selector !== false;

  /** Single-target only: non-empty `base_selector` from PHP locks selector and hides the field. */
  const lockedBaseSelector = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    if (multiple) {
      return '';
    }
    const s = control.params.base_selector;
    return typeof s === 'string' && s.trim() !== '' ? s.trim() : '';
  }, [multiple, control.params.base_selector]);
  const targetElementsRegistry = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => (0,_targetElementsRegistry__WEBPACK_IMPORTED_MODULE_13__.normalizeTargetElementsRegistry)(control.params?.styling_target_elements), [control.params?.styling_target_elements]);
  const visibleStylingGroupIds = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => (0,_StylingAccordionPanels__WEBPACK_IMPORTED_MODULE_12__.resolveAllowedGroupIds)(control.params.styling_groups), [control.params.styling_groups]);
  const disabledFieldSet = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_14__.buildDisabledFieldSet)(control.params.disable_fields), [control.params.disable_fields]);
  const editorRootClassName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const parts = ['editor', 'onepress-styling-editor', `onepress-styling-editor--group-count-${visibleStylingGroupIds.length <= 1 ? '1' : 'gt1'}`];
    for (const id of visibleStylingGroupIds) {
      parts.push(`onepress-styling-editor--group-${id}`);
    }
    return parts.join(' ');
  }, [visibleStylingGroupIds]);
  const breakpoints = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => Array.isArray(control.params.styling_breakpoints) && control.params.styling_breakpoints.length ? control.params.styling_breakpoints : [{
    id: 'desktop',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Desktop', 'onepress'),
    maxWidth: ''
  }, {
    id: 'tablet',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Tablet', 'onepress'),
    maxWidth: '991px'
  }, {
    id: 'mobile',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Mobile', 'onepress'),
    maxWidth: '767px'
  }], [control.params.styling_breakpoints]);
  const controlLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const l = control.params.label;
    return typeof l === 'string' && l.trim() !== '' ? l : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Element styling', 'onepress');
  }, [control.params.label]);
  const controlDescription = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const d = control.params.description;
    return d;
  }, [control.params.description]);
  const addItemLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const l = control.params.add_item_label;
    return typeof l === 'string' && l.trim() !== '' ? l.trim() : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Add item', 'onepress');
  }, [control.params.add_item_label]);
  const defaultStylingPayload = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const fromParams = control.params.default_value;
    if (fromParams && typeof fromParams === 'object' && !Array.isArray(fromParams)) {
      return cloneValue(fromParams);
    }
    const defRaw = control.setting && control.setting.default;
    if (typeof defRaw === 'string' && defRaw.trim() !== '') {
      try {
        const parsed = JSON.parse(defRaw);
        if (parsed && typeof parsed === 'object') {
          return cloneValue(parsed);
        }
      } catch {
        // ignore
      }
    }
    return null;
  }, [control]);
  const [stateIndex, setStateIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(0);
  const [editorPopoverOpen, setEditorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
  /** Mirrors `editorPopoverOpen` synchronously so the edit toggle survives stale closures vs. focus-outside ordering. */
  const editorPopoverOpenRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)(false);
  const [editingItemIndex, setEditingItemIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
  const editingItemIndexRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
  const [previewPickerActive, setPreviewPickerActive] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
  const previewPickerActiveRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)(false);
  const pickSnackbarSeqRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)(0);
  const [pickerSnackbarNotices, setPickerSnackbarNotices] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(/** @type {Array<{ id: string, explicitDismiss?: boolean, content: import('react').ReactNode, spokenMessage?: string }>} */[]);
  const [statesPopoverOpen, setStatesPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
  const [statesPopoverAnchor, setStatesPopoverAnchor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
  const manageStatesButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
  const [resetConfirm, setResetConfirm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(/** @type {{ kind: 'all' } | { kind: 'item', index: number } | null} */null);
  const [deleteItemIndex, setDeleteItemIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(/** @type {number | null} */null);
  const [pendingAddFormOpen, setPendingAddFormOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
  /** Anchor for editor popover after inline add (wrapper around add row / form). */
  const pendingAddInlineRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)(/** @type {HTMLDivElement | null} */null);
  const [deviceId, setDeviceId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(() => {
    const fromPreview = (0,_customizerPreviewDeviceSync__WEBPACK_IMPORTED_MODULE_9__.getCustomizerPreviewDevice)();
    if (fromPreview && previewDeviceIds.includes(fromPreview)) {
      return fromPreview;
    }
    const bps = Array.isArray(control.params.styling_breakpoints) && control.params.styling_breakpoints.length ? control.params.styling_breakpoints : null;
    if (bps && bps[0]?.id) {
      return bps[0].id;
    }
    return 'desktop';
  });
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(() => {
    let v = cloneValue(control.params.value || {});
    if (multiple) {
      v = ensureMultiShape(v, control.params.default_value || null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Item 1', 'onepress'));
    }
    const mode = (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.getStatesStructureMode)(stylingStatesParam !== undefined ? stylingStatesParam : 'all');
    const tpl = (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.getFixedStatesTemplate)(stylingStatesParam);
    return (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.normalizeStylingRootForStatesPolicy)(v, mode, tpl, previewDeviceIds, multiple, lockedBaseSelector);
  });
  const {
    families,
    loading: fontsLoading,
    error: fontsError
  } = (0,_useGoogleFontFamilies__WEBPACK_IMPORTED_MODULE_16__.useGoogleFontFamilies)();
  const customizeApi = typeof wp !== 'undefined' && wp.customize ? (/** @type {import('@wordpress/customize').Customize} */wp.customize) : null;
  const localManagedFonts = (0,_useFontManagerCatalogFamilies__WEBPACK_IMPORTED_MODULE_17__.useFontManagerCatalogFamilies)(customizeApi, families);
  const mergedForFontSlices = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => [...localManagedFonts, ...(families !== null && families !== void 0 ? families : [])], [localManagedFonts, families]);
  const fontFamilySource = control.params.styling_font_family_source === 'google' ? 'google' : 'local';
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    const setting = control.setting;
    if (!setting || typeof setting.bind !== 'function') {
      return undefined;
    }
    const onChange = val => {
      try {
        const parsed = typeof val === 'string' && val ? JSON.parse(val) : val;
        if (!parsed || typeof parsed !== 'object') {
          return;
        }
        let next = cloneValue(parsed);
        if (multiple) {
          next = ensureMultiShape(next, control.params.default_value || null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Item 1', 'onepress'));
        }
        const mode = (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.getStatesStructureMode)(stylingStatesParam !== undefined ? stylingStatesParam : 'all');
        const tpl = (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.getFixedStatesTemplate)(stylingStatesParam);
        next = (0,_stylingStatesPolicy__WEBPACK_IMPORTED_MODULE_19__.normalizeStylingRootForStatesPolicy)(next, mode, tpl, previewDeviceIds, multiple, lockedBaseSelector);
        setValue(next);
      } catch {
        // ignore
      }
    };
    setting.bind(onChange);
    return () => {
      if (typeof setting.unbind === 'function') {
        setting.unbind(onChange);
      }
    };
  }, [control.setting, control.params.default_value, multiple, previewDeviceIds, stylingStatesParam, lockedBaseSelector]);
  const structuralPayload = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    if (multiple && Array.isArray(value.items) && value.items[0]) {
      return value.items[0];
    }
    return value;
  }, [multiple, value]);
  const editorPayload = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    if (!multiple) {
      if (!editorPopoverOpen) {
        return null;
      }
      return value;
    }
    if (!editorPopoverOpen || editingItemIndex == null || !Array.isArray(value.items) || value.items[editingItemIndex] == null) {
      return null;
    }
    return value.items[editingItemIndex];
  }, [multiple, value, editorPopoverOpen, editingItemIndex]);
  const statesList = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const meta = editorPayload && editorPayload._meta;
    if (!meta || !Array.isArray(meta.states)) {
      return [];
    }
    return meta.states.map(entry => {
      const key = Object.keys(entry || {})[0];
      const row = key ? entry[key] : null;
      return {
        key,
        label: row && row.label || key,
        selector: row && row.selector || ''
      };
    });
  }, [editorPayload]);
  const setDeviceIdSynced = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(id => {
    setDeviceId(id);
    (0,_customizerPreviewDeviceSync__WEBPACK_IMPORTED_MODULE_9__.syncCustomizerPreviewDevice)(id, previewDeviceIds);
  }, [previewDeviceIds]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    return (0,_customizerPreviewDeviceSync__WEBPACK_IMPORTED_MODULE_9__.bindCustomizerPreviewDevice)(id => {
      if (previewDeviceIds.includes(id)) {
        setDeviceId(id);
      }
    });
  }, [previewDeviceIds]);
  const activeState = statesList[stateIndex] || statesList[0];
  const activeKey = activeState ? activeState.key : '';
  const stateTabPanelId = `onepress-styling-state-panel-${String(control.id)}`;
  const getStateTabId = i => `onepress-styling-state-tab-${String(control.id)}-${String(i)}`;
  const onStateTabKeyDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)((event, index) => {
    const n = statesList.length;
    if (n < 2) {
      return;
    }
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      next = (index + 1) % n;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      next = (index - 1 + n) % n;
    } else if (event.key === 'Home') {
      event.preventDefault();
      next = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      next = n - 1;
    } else {
      return;
    }
    setStateIndex(next);
    const id = `onepress-styling-state-tab-${String(control.id)}-${String(next)}`;
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.focus();
    });
  }, [control.id, statesList.length]);
  const metaBaseSelector = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    if (lockedBaseSelector) {
      return lockedBaseSelector;
    }
    const meta = editorPayload?._meta;
    const b = meta?.baseSelector;
    if (typeof b === 'string') {
      return b.trim();
    }
    const states = meta?.states;
    if (!Array.isArray(states)) {
      return '';
    }
    for (const entry of states) {
      if (!entry || typeof entry !== 'object') {
        continue;
      }
      const k = Object.keys(entry)[0];
      if (k === 'normal') {
        var _row$selector;
        const row = entry[k];
        const sel = row && typeof row === 'object' ? String((_row$selector = row.selector) !== null && _row$selector !== void 0 ? _row$selector : '').trim() : '';
        return sel;
      }
    }
    return '';
  }, [editorPayload, lockedBaseSelector]);

  /** New multi items use empty `_meta.baseSelector` until user picks a preset or a selector from preview. */
  const multiItemAwaitingPresetTarget = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    var _editorPayload$_meta$;
    if (!multiple || !editorPayload) {
      return false;
    }
    const base = String((_editorPayload$_meta$ = editorPayload._meta?.baseSelector) !== null && _editorPayload$_meta$ !== void 0 ? _editorPayload$_meta$ : '').trim();
    return base === '';
  }, [multiple, editorPayload]);
  const commitRoot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(nextRoot => {
    (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_15__.rebuildFontSlicesInValue)(nextRoot, mergedForFontSlices);
    setValue(nextRoot);
    pushStylingPayloadToCustomizer($, control, nextRoot);
  }, [$, control, mergedForFontSlices]);
  const commitActiveItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(nextItem => {
    if (multiple) {
      const i = editingItemIndex;
      if (i == null) {
        return;
      }
      setValue(prevRoot => {
        if (!Array.isArray(prevRoot?.items) || prevRoot.items[i] == null) {
          return prevRoot;
        }
        const nextRoot = cloneValue(prevRoot);
        const item = cloneValue(nextItem);
        (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_15__.rebuildFontSlicesInValue)(item, mergedForFontSlices);
        nextRoot.items = [...nextRoot.items];
        nextRoot.items[i] = item;
        pushStylingPayloadToCustomizer($, control, nextRoot);
        return nextRoot;
      });
    } else {
      const item = cloneValue(nextItem);
      (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_15__.rebuildFontSlicesInValue)(item, mergedForFontSlices);
      setValue(item);
      pushStylingPayloadToCustomizer($, control, item);
    }
  }, [multiple, editingItemIndex, mergedForFontSlices, $, control]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    setValue(prev => {
      const next = cloneValue(prev);
      let changed = false;
      const beforeJson = JSON.stringify(prev);
      (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_15__.rebuildFontSlicesInValue)(next, mergedForFontSlices);
      if (JSON.stringify(next) !== beforeJson) {
        changed = true;
      }
      if (!changed) {
        return prev;
      }
      pushStylingPayloadToCustomizer($, control, next);
      return next;
    });
  }, [mergedForFontSlices, $, control]);
  const currentText = activeKey && editorPayload && editorPayload[activeKey] && typeof editorPayload[activeKey] === 'object' && editorPayload[activeKey][deviceId] != null ? String(editorPayload[activeKey][deviceId]) : '';
  const sliceParsed = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => (0,_declarationForm__WEBPACK_IMPORTED_MODULE_10__.parseDeclarationForm)(currentText), [currentText]);
  const onChangeText = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(text => {
    if (!activeKey || !editorPayload) {
      return;
    }
    const next = cloneValue(editorPayload);
    if (!next[activeKey] || typeof next[activeKey] !== 'object') {
      next[activeKey] = {};
    }
    next[activeKey][deviceId] = text;
    commitActiveItem(next);
  }, [editorPayload, activeKey, deviceId, commitActiveItem]);
  const onPatch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(patch => {
    const nextCss = (0,_declarationForm__WEBPACK_IMPORTED_MODULE_10__.patchDeclarationForm)(sliceParsed.model, sliceParsed.unknown, patch);
    onChangeText(nextCss);
  }, [sliceParsed.model, sliceParsed.unknown, onChangeText]);
  const onBaseSelectorChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(
  /**
   * @param {string} nextBase
   * @param {{ elementPresetId?: string, elementPresetName?: string } | undefined} [binding] — from preset: `_meta.elId`, `_meta.elName`, item `id` (multi). Omit clears `elId` / `elName` (manual / preview pick).
   */
  (nextBase, binding) => {
    if (lockedBaseSelector || !editorPayload) {
      return;
    }
    const next = cloneValue(editorPayload);
    if (!next._meta) {
      next._meta = {};
    }
    const trimmed = String(nextBase !== null && nextBase !== void 0 ? nextBase : '').trim();
    next._meta.baseSelector = trimmed;
    next.selector = trimmed;
    const pid = binding && typeof binding.elementPresetId === 'string' ? binding.elementPresetId.trim() : '';
    if (pid !== '') {
      next._meta.elId = pid;
      const pnm = binding && typeof binding.elementPresetName === 'string' ? binding.elementPresetName.trim() : '';
      if (pnm !== '') {
        next._meta.elName = pnm;
      } else {
        delete next._meta.elName;
      }
      if (multiple) {
        next.id = pid;
      }
    } else {
      delete next._meta.elId;
      delete next._meta.elName;
    }
    if (Array.isArray(next._meta.states)) {
      next._meta.states = next._meta.states.map(entry => {
        if (!entry || typeof entry !== 'object') {
          return entry;
        }
        const k = Object.keys(entry)[0];
        if (k !== 'normal') {
          return entry;
        }
        const row = entry[k];
        return {
          normal: {
            ...(row && typeof row === 'object' ? row : {}),
            selector: ''
          }
        };
      });
    }
    commitActiveItem(next);
  }, [editorPayload, commitActiveItem, lockedBaseSelector, multiple]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useLayoutEffect)(() => {
    editingItemIndexRef.current = editingItemIndex;
  }, [editingItemIndex]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useLayoutEffect)(() => {
    editorPopoverOpenRef.current = editorPopoverOpen;
  }, [editorPopoverOpen]);
  const removePickerSnackbar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(id => {
    setPickerSnackbarNotices(prev => prev.filter(n => n.id !== id));
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    if (pickerSnackbarNotices.length === 0) {
      return undefined;
    }
    const id = pickerSnackbarNotices[0].id;
    const t = window.setTimeout(() => {
      removePickerSnackbar(id);
    }, 5000);
    return () => window.clearTimeout(t);
  }, [pickerSnackbarNotices, removePickerSnackbar]);
  const cancelPreviewPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    if (!previewPickerActiveRef.current) {
      return;
    }
    previewPickerActiveRef.current = false;
    setPreviewPickerActive(false);
    const previewer = typeof window !== 'undefined' ? window.wp?.customize?.previewer : null;
    if (typeof previewer?.send === 'function') {
      previewer.send('onepress-styling-cancel-pick');
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    const customize = typeof window !== 'undefined' ? window.wp?.customize : null;
    const previewer = customize?.previewer;
    if (typeof previewer?.bind !== 'function') {
      return undefined;
    }
    const onPicked = payload => {
      var _payload$selector;
      if (!payload || payload.controlId !== control.id) {
        return;
      }
      if (multiple) {
        const want = Number(payload.itemIndex);
        if (want !== editingItemIndexRef.current) {
          return;
        }
      }
      previewPickerActiveRef.current = false;
      setPreviewPickerActive(false);
      onBaseSelectorChange(String(payload.selector || ''));
      const trimmed = String((_payload$selector = payload.selector) !== null && _payload$selector !== void 0 ? _payload$selector : '').trim();
      const appliedDisplay = trimmed === '' ? '.' : trimmed;
      pickSnackbarSeqRef.current += 1;
      setPickerSnackbarNotices([{
        id: `onepress-styling-pick-${String(control.id)}-${String(pickSnackbarSeqRef.current)}`,
        explicitDismiss: true,
        content: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "onepress-styling-pick-snackbar__inner"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "onepress-styling-pick-snackbar__label"
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('CSS selector applied:', 'onepress')), ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
          className: "onepress-styling-pick-snackbar__selector"
        }, appliedDisplay)),
        spokenMessage: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.sprintf)(/* translators: %s: CSS selector string */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('CSS selector applied: %s', 'onepress'), appliedDisplay)
      }]);
    };
    const onEnded = payload => {
      if (!payload || payload.controlId !== control.id) {
        return;
      }
      previewPickerActiveRef.current = false;
      setPreviewPickerActive(false);
    };
    previewer.bind('onepress-styling-picked', onPicked);
    previewer.bind('onepress-styling-pick-ended', onEnded);
    return () => {
      if (typeof previewer.unbind === 'function') {
        previewer.unbind('onepress-styling-picked', onPicked);
        previewer.unbind('onepress-styling-pick-ended', onEnded);
      }
    };
  }, [control.id, multiple, onBaseSelectorChange]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    const onKeyDown = e => {
      if (!previewPickerActiveRef.current) {
        return;
      }
      if (e.key !== 'Escape' && e.keyCode !== 27) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
      cancelPreviewPicker();
    };
    // Capture on `window` so we run before handlers that stop propagation on `document`
    // (Customizer / components). Preview iframe has its own Escape handler in
    // stylingSelectorPickPreview.js — key events from the iframe do not reach this window.
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [cancelPreviewPicker]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    if (multiple || !lockedBaseSelector) {
      return;
    }
    setValue(prev => {
      var _ref2, _prev$_meta$baseSelec;
      const prevBase = String((_ref2 = (_prev$_meta$baseSelec = prev?._meta?.baseSelector) !== null && _prev$_meta$baseSelec !== void 0 ? _prev$_meta$baseSelec : prev?.selector) !== null && _ref2 !== void 0 ? _ref2 : '').trim();
      if (prevBase === lockedBaseSelector) {
        return prev;
      }
      const next = cloneValue(prev);
      if (!next._meta) {
        next._meta = {};
      }
      next._meta.baseSelector = lockedBaseSelector;
      next.selector = lockedBaseSelector;
      if (Array.isArray(next._meta.states)) {
        next._meta.states = next._meta.states.map(entry => {
          if (!entry || typeof entry !== 'object') {
            return entry;
          }
          const k = Object.keys(entry)[0];
          if (k !== 'normal') {
            return entry;
          }
          const row = entry[k];
          return {
            normal: {
              ...(row && typeof row === 'object' ? row : {}),
              selector: ''
            }
          };
        });
      }
      pushStylingPayloadToCustomizer($, control, next);
      return next;
    });
  }, [multiple, lockedBaseSelector, value, $, control]);
  const onItemTitleChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(nextTitle => {
    if (!multiple) {
      return;
    }
    const i = editingItemIndex;
    if (i == null) {
      return;
    }
    setValue(prevRoot => {
      if (!Array.isArray(prevRoot?.items) || prevRoot.items[i] == null) {
        return prevRoot;
      }
      const nextRoot = cloneValue(prevRoot);
      const next = cloneValue(nextRoot.items[i]);
      next.title = String(nextTitle !== null && nextTitle !== void 0 ? nextTitle : '');
      (0,_stylingGoogleFonts__WEBPACK_IMPORTED_MODULE_15__.rebuildFontSlicesInValue)(next, mergedForFontSlices);
      nextRoot.items = [...nextRoot.items];
      nextRoot.items[i] = next;
      pushStylingPayloadToCustomizer($, control, nextRoot);
      return nextRoot;
    });
  }, [multiple, editingItemIndex, mergedForFontSlices, $, control]);
  const onSelectTargetPreset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(/** @param {{ id: string, selector: string, name: string }} preset */preset => {
    if (!preset || typeof preset.selector !== 'string') {
      return;
    }
    const presetId = typeof preset.id === 'string' ? preset.id.trim() : '';
    const presetNm = typeof preset.name === 'string' ? preset.name.trim() : '';
    onBaseSelectorChange(preset.selector, presetId !== '' ? {
      elementPresetId: presetId,
      elementPresetName: presetNm
    } : undefined);
    if (multiple && typeof preset.name === 'string' && preset.name.trim() !== '') {
      onItemTitleChange(preset.name);
    }
  }, [onBaseSelectorChange, multiple, onItemTitleChange]);
  const unknownCount = Object.keys(sliceParsed.unknown).length;
  const sliceKey = `${activeKey}__${deviceId}`;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useLayoutEffect)(() => {
    if (!editorPopoverOpen) {
      setStatesPopoverOpen(false);
      setStatesPopoverAnchor(null);
    }
  }, [editorPopoverOpen]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useLayoutEffect)(() => {
    if (!statesPopoverOpen) {
      setStatesPopoverAnchor(null);
      return;
    }
    setStatesPopoverAnchor(manageStatesButtonRef.current);
  }, [statesPopoverOpen]);
  const toggleStatesPopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    setStatesPopoverOpen(o => !o);
  }, []);
  const closeStatesPopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    setStatesPopoverOpen(false);
  }, []);
  const closeEditorPopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    editorPopoverOpenRef.current = false;
    cancelPreviewPicker();
    setEditorPopoverOpen(false);
    setStatesPopoverOpen(false);
    setStatesPopoverAnchor(null);
    if (multiple) {
      setEditingItemIndex(null);
      setPendingAddFormOpen(false);
    }
  }, [multiple, cancelPreviewPicker]);
  const togglePreviewPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    const previewer = typeof window !== 'undefined' ? window.wp?.customize?.previewer : null;
    if (typeof previewer?.send !== 'function') {
      return;
    }
    if (previewPickerActiveRef.current) {
      cancelPreviewPicker();
      return;
    }
    setPickerSnackbarNotices([]);
    previewPickerActiveRef.current = true;
    setPreviewPickerActive(true);
    previewer.send('onepress-styling-start-pick', {
      controlId: control.id,
      itemIndex: multiple ? editingItemIndex : null
    });
  }, [control.id, multiple, editingItemIndex, cancelPreviewPicker]);
  const toggleEditorPopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    if (multiple) {
      return;
    }
    if (editorPopoverOpenRef.current) {
      closeEditorPopover();
      return;
    }
    editorPopoverOpenRef.current = true;
    setEditorPopoverOpen(true);
  }, [multiple, closeEditorPopover]);
  const toggleEditorForItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(index => {
    setPendingAddFormOpen(false);
    if (editorPopoverOpenRef.current && editingItemIndex === index) {
      closeEditorPopover();
      return;
    }
    setEditingItemIndex(index);
    setStateIndex(0);
    editorPopoverOpenRef.current = true;
    setEditorPopoverOpen(true);
  }, [editingItemIndex, closeEditorPopover]);
  const removeItemAt = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(index => {
    if (!multiple || !Array.isArray(value.items) || value.items.length <= 1) {
      return;
    }
    const nextRoot = cloneValue(value);
    nextRoot.items = value.items.filter((_, i) => i !== index);
    commitRoot(nextRoot);
    if (editorPopoverOpen && editingItemIndex === index) {
      closeEditorPopover();
    } else if (editorPopoverOpen && editingItemIndex != null && editingItemIndex > index) {
      setEditingItemIndex(editingItemIndex - 1);
    }
  }, [multiple, value, commitRoot, editorPopoverOpen, editingItemIndex, closeEditorPopover]);
  const cancelPendingAdd = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    setPendingAddFormOpen(false);
  }, []);
  const startPendingAdd = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    if (!multiple || !defaultStylingPayload) {
      return;
    }
    const items = Array.isArray(defaultStylingPayload.items) ? defaultStylingPayload.items : null;
    const template = items && items[0] ? cloneValue(items[0]) : null;
    if (!template || !Array.isArray(value.items)) {
      return;
    }
    if (editorPopoverOpenRef.current) {
      editorPopoverOpenRef.current = false;
      setEditorPopoverOpen(false);
      setEditingItemIndex(null);
      cancelPreviewPicker();
      setStatesPopoverOpen(false);
      setStatesPopoverAnchor(null);
    }
    setPendingAddFormOpen(true);
  }, [multiple, defaultStylingPayload, value, cancelPreviewPicker]);
  const confirmPendingAddWithPreset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(/** @param {{ id: string, selector: string, name: string }} preset */preset => {
    if (!preset || typeof preset.selector !== 'string' || !multiple || !defaultStylingPayload) {
      return;
    }
    const sel = preset.selector.trim();
    if (sel === '') {
      return;
    }
    const items = Array.isArray(defaultStylingPayload.items) ? defaultStylingPayload.items : null;
    const template = items && items[0] ? cloneValue(items[0]) : null;
    if (!template || !Array.isArray(value.items)) {
      return;
    }
    const presetId = typeof preset.id === 'string' ? preset.id.trim() : '';
    const newItem = cloneValue(template);
    newItem.id = presetId !== '' ? presetId : `item-${Date.now().toString(36)}`;
    const presetNm = typeof preset.name === 'string' ? preset.name.trim() : '';
    newItem.title = presetNm !== '' ? presetNm : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('New item', 'onepress');
    newItem.selector = sel;
    if (!newItem._meta || typeof newItem._meta !== 'object') {
      newItem._meta = {};
    }
    newItem._meta.baseSelector = sel;
    if (presetId !== '') {
      newItem._meta.elId = presetId;
      if (presetNm !== '') {
        newItem._meta.elName = presetNm;
      } else {
        delete newItem._meta.elName;
      }
    } else {
      delete newItem._meta.elId;
      delete newItem._meta.elName;
    }
    const nextRoot = cloneValue(value);
    nextRoot.items = [...nextRoot.items, newItem];
    const newIndex = nextRoot.items.length - 1;
    commitRoot(nextRoot);
    cancelPendingAdd();
    setEditingItemIndex(newIndex);
    setStateIndex(0);
    editorPopoverOpenRef.current = true;
    setEditorPopoverOpen(true);
  }, [multiple, defaultStylingPayload, value, commitRoot, cancelPendingAdd]);
  const onResetToDefault = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    if (!defaultStylingPayload) {
      return;
    }
    editorPopoverOpenRef.current = false;
    setStatesPopoverOpen(false);
    setStatesPopoverAnchor(null);
    setEditorPopoverOpen(false);
    setEditingItemIndex(null);
    setStateIndex(0);
    setPendingAddFormOpen(false);
    commitRoot(cloneValue(defaultStylingPayload));
  }, [defaultStylingPayload, commitRoot]);
  const onResetItemToDefault = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(itemIndex => {
    if (!multiple || !defaultStylingPayload || !Array.isArray(value.items)) {
      return;
    }
    const defItems = defaultStylingPayload.items;
    if (!Array.isArray(defItems) || defItems.length === 0) {
      return;
    }
    const current = value.items[itemIndex];
    if (!current) {
      return;
    }
    const templateIndex = Math.min(itemIndex, defItems.length - 1);
    const template = cloneValue(defItems[templateIndex]);
    template.id = current.id;
    template.title = current.title;
    const nextRoot = cloneValue(value);
    nextRoot.items = [...nextRoot.items];
    nextRoot.items[itemIndex] = template;
    commitRoot(nextRoot);
    if (editorPopoverOpen && editingItemIndex === itemIndex) {
      setStatesPopoverOpen(false);
      setStatesPopoverAnchor(null);
      setStateIndex(0);
    }
  }, [multiple, defaultStylingPayload, value, commitRoot, editorPopoverOpen, editingItemIndex]);
  const structuralStates = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const meta = structuralPayload && structuralPayload._meta;
    if (!meta || !Array.isArray(meta.states)) {
      return [];
    }
    return meta.states;
  }, [structuralPayload]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    const n = structuralStates.length;
    if (n === 0) {
      return;
    }
    setStateIndex(i => i >= n ? 0 : i);
  }, [structuralStates.length]);
  if (!structuralStates.length || !structuralStates[0] || typeof structuralStates[0] !== 'object' || Object.keys(structuralStates[0]).length !== 1) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Invalid styling configuration (no states). Save to reset defaults.', 'onepress'));
  }
  const itemsList = multiple && Array.isArray(value.items) ? value.items : [];
  const stateTabCount = structuralStates.length;
  const showStatesPopoverButton = statesStructureMode === 'all' || statesStructureMode === 'fixed';
  const allowAddRemoveInStatesPopover = statesStructureMode === 'all';
  const settingsPopoverUseful = showStatesPopoverButton || multiple || !lockedBaseSelector;
  const legacyHideToolbarActions = control.params.styling_hide_popover_heading === true;
  const hideGearByParam = legacyHideToolbarActions || control.params.styling_hide_gear_button === true;
  const hidePreviewPickByParam = legacyHideToolbarActions || control.params.styling_hide_preview_pick_button === true;
  const showGearButton = !hideGearByParam && settingsPopoverUseful;
  const showPreviewPickButton = !hidePreviewPickByParam && !lockedBaseSelector;
  const gearButtonLabel = showStatesPopoverButton ? allowAddRemoveInStatesPopover ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Manage states', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('State settings', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Settings', 'onepress');
  const showStateTabButtons = stateTabCount > 1;
  const showStatesToolbar = showStateTabButtons || showStatesPopoverButton;
  const hideStateTablist = control.params.styling_hide_state_tablist === true;
  const showStateTablistBlock = showStatesToolbar && !hideStateTablist;
  const tablistVisibleForA11y = showStateTabButtons && !hideStateTablist;
  const inlineEditorProps = editorPopoverOpen && editorPayload ? {
    visibleStylingGroupCount: visibleStylingGroupIds.length,
    showGearButton,
    showPreviewPickButton,
    gearButtonLabel,
    lockedBaseSelector,
    editableBaseSelector,
    allowAddRemoveInStatesPopover,
    showStatesPopoverButton,
    toggleStatesPopover,
    statesPopoverOpen,
    statesPopoverAnchor,
    togglePreviewPicker,
    previewPickerActive,
    manageStatesButtonRef,
    showStateTablistBlock,
    multiple,
    multiItemAwaitingPresetTarget,
    showStateTabButtons,
    statesList,
    stateIndex,
    setStateIndex,
    onStateTabKeyDown,
    stateTabPanelId,
    getStateTabId,
    tablistVisibleForA11y,
    closeStatesPopover,
    commitActiveItem,
    editorPayload,
    previewDeviceIds,
    activeKey,
    onBaseSelectorChange,
    onItemTitleChange,
    metaBaseSelector,
    onSelectTargetPreset,
    sliceParsed,
    unknownCount,
    onPatch,
    sliceKey,
    currentText,
    onChangeText,
    families,
    localManagedFonts,
    mergedForFontSlices,
    fontFamilySource,
    fontsLoading,
    fontsError,
    stylingGroups: control.params.styling_groups,
    disabledFieldSet,
    onCloseEditor: closeEditorPopover,
    targetElementsRegistry
  } : null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_11__.StylingDeviceProvider, {
    deviceId: deviceId,
    setDeviceId: setDeviceIdSynced,
    breakpoints: breakpoints
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: editorRootClassName
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-control-intro"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full flex justify-between items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "grow customize-control-title"
  }, controlLabel), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "minimal",
    onClick: () => setResetConfirm({
      kind: 'all'
    }),
    disabled: !defaultStylingPayload,
    label: multiple ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Reset all items to default', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Reset to default', 'onepress'),
    showTooltip: true,
    size: "small",
    className: "icon-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    size: 20
  })), !multiple ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: toggleEditorPopover,
    isPressed: editorPopoverOpen,
    "aria-expanded": editorPopoverOpen,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Edit styling', 'onepress'),
    className: "icon-btn",
    size: "small",
    showTooltip: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    size: 20
  })) : null)), !multiple && inlineEditorProps ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StylingInlineEditor__WEBPACK_IMPORTED_MODULE_18__.StylingInlineEditor, {
    key: "styling-inline-single",
    ...inlineEditorProps
  }) : null, multiple ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-items mt-3"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col gap-2"
  }, itemsList.map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: item.id || `idx-${String(index)}`,
    className: "onepress-styling-items__row flex flex-col gap-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-list-item flex justify-between items-center gap-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "grow truncate text-sm"
  }, getMultiStylingItemListRowLabel(item, index, targetElementsRegistry)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "minimal",
    onClick: () => setResetConfirm({
      kind: 'item',
      index
    }),
    size: "small",
    disabled: !defaultStylingPayload,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Reset this item to default', 'onepress'),
    showTooltip: true,
    className: "icon-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    size: 18
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "minimal",
    onClick: () => setDeleteItemIndex(index),
    size: "small",
    disabled: itemsList.length <= 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Remove this item from the list', 'onepress'),
    showTooltip: true,
    className: "icon-btn",
    isDestructive: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
    size: 18
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: () => toggleEditorForItem(index),
    isPressed: editorPopoverOpen && editingItemIndex === index,
    "aria-expanded": editorPopoverOpen && editingItemIndex === index,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Edit styling', 'onepress'),
    showTooltip: true,
    size: "small",
    className: "icon-btn"
  }, editorPopoverOpen && editingItemIndex === index ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
    size: 18
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
    size: 18
  })))), inlineEditorProps && editingItemIndex === index ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StylingInlineEditor__WEBPACK_IMPORTED_MODULE_18__.StylingInlineEditor, {
    key: item.id || `styling-inline-${String(index)}`,
    ...inlineEditorProps
  }) : null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block mt-2",
    ref: pendingAddInlineRef
  }, pendingAddFormOpen ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-pending-add-inline"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-pending-add-inline__picker"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "enum-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Target Element', 'onepress')), targetElementsRegistry.elements.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('No targets are available.', 'onepress')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components__WEBPACK_IMPORTED_MODULE_11__.StylingTargetElementSelect, {
    targetRegistry: targetElementsRegistry,
    currentSelector: "",
    currentElId: "",
    selectedPresetName: "",
    onSelectPreset: confirmPendingAddWithPreset,
    disabled: Boolean(lockedBaseSelector) || !editableBaseSelector
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-pending-add-inline__actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: cancelPendingAdd
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Cancel', 'onepress')))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    className: "mt-2 p-0 h-auto",
    onClick: startPendingAdd
  }, addItemLabel))) : null, controlDescription ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description mt-2"
  }, controlDescription) : null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-pick-snackbar-wrap",
    "aria-live": "polite"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SnackbarList, {
    notices: pickerSnackbarNotices,
    onRemove: removePickerSnackbar
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalConfirmDialog, {
    isOpen: resetConfirm !== null,
    onConfirm: () => {
      const pending = resetConfirm;
      setResetConfirm(null);
      if (!pending) {
        return;
      }
      if (pending.kind === 'all') {
        onResetToDefault();
      } else {
        onResetItemToDefault(pending.index);
      }
    },
    onCancel: () => setResetConfirm(null),
    confirmButtonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Reset', 'onepress'),
    cancelButtonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Cancel', 'onepress')
  }, resetConfirm?.kind === 'all' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, multiple ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Reset all targets to their default styling? Every item in this list will be restored and unsaved changes will be lost.', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Reset this styling block to its default? Current declarations will be replaced.', 'onepress')) : null, resetConfirm?.kind === 'item' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.sprintf)(/* translators: %s: item label */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Reset "%s" to its default styling? This target\'s declarations will be replaced.', 'onepress'), String((Array.isArray(value.items) && value.items[resetConfirm.index] ? value.items[resetConfirm.index].title || value.items[resetConfirm.index].id : '') || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('this item', 'onepress')))) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalConfirmDialog, {
    isOpen: deleteItemIndex !== null,
    onConfirm: () => {
      if (deleteItemIndex === null) {
        return;
      }
      removeItemAt(deleteItemIndex);
      setDeleteItemIndex(null);
    },
    onCancel: () => setDeleteItemIndex(null),
    confirmButtonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Delete', 'onepress'),
    cancelButtonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Cancel', 'onepress')
  }, deleteItemIndex !== null ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.sprintf)(/* translators: %s: item label */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Remove "%s" from this list? This target and its styling will be deleted.', 'onepress'), String(value.items?.[deleteItemIndex] ? value.items[deleteItemIndex].title || value.items[deleteItemIndex].id : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('this item', 'onepress')))) : null)));
}

/***/ },

/***/ "./src/admin/customizer/styling/boxShadowGenerator.js"
/*!************************************************************!*\
  !*** ./src/admin/customizer/styling/boxShadowGenerator.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseBoxShadow: () => (/* binding */ parseBoxShadow),
/* harmony export */   patchLength: () => (/* binding */ patchLength),
/* harmony export */   serializeBoxShadow: () => (/* binding */ serializeBoxShadow)
/* harmony export */ });
/* harmony import */ var colord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! colord */ "./node_modules/colord/index.mjs");
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/**
 * Parse / serialize a single CSS box-shadow for the generator UI.
 * Comma-separated (multiple shadows) or unparsable colors fall back to raw CSS editing.
 */



/** @typedef {{ inset: boolean, offsetX: string, offsetY: string, blur: string, spread: string, colorHex: string, opacity: number }} BoxShadowGeneratorParts */

const EMPTY_UI = {
  inset: false,
  offsetX: '0px',
  offsetY: '0px',
  blur: '0px',
  spread: '0px',
  colorHex: '#000000',
  opacity: 1
};

/**
 * @param {string} str
 * @returns {{ value: string, rest: string } | null}
 */
function pullLengthToken(str) {
  const s = str.trimStart();
  if (!s) {
    return null;
  }
  const m = s.match(/^(-?(?:\d+\.?\d*|\.\d+))([a-z%]+)?/i);
  if (!m) {
    return null;
  }
  const num = m[1];
  const unit = m[2] || '';
  let value;
  if (unit) {
    value = num + unit;
  } else if (num === '0' || num === '-0') {
    value = '0';
  } else {
    return null;
  }
  return {
    value,
    rest: s.slice(m[0].length).trimStart()
  };
}

/**
 * True when offset/blur/spread are all zero (no visible shadow, with or without inset).
 * @param {BoxShadowGeneratorParts} p
 */
function isGeometryInvisible(p) {
  for (const k of [p.offsetX, p.offsetY, p.blur, p.spread]) {
    const n = (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_1__.parseCssSingleLengthValue)(k, 'px');
    if (!n || Math.abs(n.num) > 1e-9) {
      return false;
    }
  }
  return true;
}

/**
 * @param {string} css
 * @returns {{ ok: true } & BoxShadowGeneratorParts | { ok: false, raw: string }}
 */
function parseBoxShadow(css) {
  const raw = String(css || '').trim();
  if (!raw || /^none$/i.test(raw)) {
    return {
      ok: true,
      ...EMPTY_UI
    };
  }
  if (raw.includes(',')) {
    return {
      ok: false,
      raw
    };
  }
  let s = raw.replace(/!important\s*$/i, '').trim();
  let inset = false;
  if (/^inset\b/i.test(s)) {
    inset = true;
    s = s.replace(/^inset\s+/i, '').trim();
  }
  const lengths = [];
  let rest = s;
  for (let i = 0; i < 4; i++) {
    const p = pullLengthToken(rest);
    if (!p) {
      break;
    }
    lengths.push(p.value);
    rest = p.rest;
  }
  if (lengths.length < 2) {
    return {
      ok: false,
      raw
    };
  }
  const colorStr = rest.trim();
  if (!colorStr) {
    return {
      ok: true,
      inset,
      offsetX: lengths[0],
      offsetY: lengths[1],
      blur: lengths[2] || '0px',
      spread: lengths[3] || '0px',
      colorHex: '#000000',
      opacity: 1
    };
  }
  const c = (0,colord__WEBPACK_IMPORTED_MODULE_0__.colord)(colorStr);
  if (!c.isValid()) {
    return {
      ok: false,
      raw
    };
  }
  return {
    ok: true,
    inset,
    offsetX: lengths[0],
    offsetY: lengths[1],
    blur: lengths[2] || '0px',
    spread: lengths[3] || '0px',
    colorHex: c.alpha(1).toHex(),
    opacity: c.alpha()
  };
}

/**
 * @param {BoxShadowGeneratorParts} parts
 * @returns {string}
 */
function serializeBoxShadow(parts) {
  if (isGeometryInvisible(parts)) {
    return '';
  }
  const base = (0,colord__WEBPACK_IMPORTED_MODULE_0__.colord)(parts.colorHex);
  if (!base.isValid()) {
    return '';
  }
  const a = Math.min(1, Math.max(0, parts.opacity));
  const withA = base.alpha(a);
  const colorCss = a >= 0.999 ? base.alpha(1).toHex() : withA.toRgbString();
  const tokens = [];
  if (parts.inset) {
    tokens.push('inset');
  }
  tokens.push(parts.offsetX, parts.offsetY, parts.blur, parts.spread, colorCss);
  return tokens.join(' ');
}

/**
 * @param {BoxShadowGeneratorParts} parts
 * @param {string} key
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @param {string} defaultSuffix
 */
function patchLength(parts, key, n, min, max, defaultSuffix) {
  const prev = (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_1__.parseCssSingleLengthValue)(parts[key], defaultSuffix);
  const suffix = prev && prev.suffix ? prev.suffix : defaultSuffix;
  const clamped = Math.min(max, Math.max(min, n));
  return {
    ...parts,
    [key]: (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_1__.formatCssSingleLengthValue)(clamped, suffix)
  };
}

/***/ },

/***/ "./src/admin/customizer/styling/buildStylingCss.js"
/*!*********************************************************!*\
  !*** ./src/admin/customizer/styling/buildStylingCss.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_BPS: () => (/* binding */ DEFAULT_BPS),
/* harmony export */   buildStylingCss: () => (/* binding */ buildStylingCss),
/* harmony export */   composeStylingFullSelector: () => (/* binding */ composeStylingFullSelector),
/* harmony export */   resolveStateOutputSelector: () => (/* binding */ resolveStateOutputSelector)
/* harmony export */ });
/**
 * Build CSS from styling JSON (mirror PHP onepress_styling_build_css_from_value). Preview + consistency.
 *
 * @param {Record<string, unknown>} value Parsed setting value
 * @param {Array<{ id: string, label?: string, maxWidth?: string }>} [breakpoints]
 * @returns {string}
 */
const DEFAULT_BPS = [{
  id: 'desktop',
  label: 'Desktop',
  maxWidth: ''
}, {
  id: 'tablet',
  label: 'Tablet',
  maxWidth: '991px'
}, {
  id: 'mobile',
  label: 'Mobile',
  maxWidth: '767px'
}];
function stripSelector(sel) {
  if (typeof sel !== 'string') {
    return '';
  }
  let s = sel.replace(/<[^>]*>/g, '');
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  if (s.length > 2000) {
    s = s.slice(0, 2000);
  }
  return s;
}
function sanitizeDecl(str) {
  if (typeof str !== 'string') {
    return '';
  }
  let s = str.trim();
  if (!s) {
    return '';
  }
  if (/@import|expression\s*\(|javascript\s*:|<\s*script|@charset|@namespace/i.test(s)) {
    return '';
  }
  s = s.replace(/<[^>]*>/g, '');
  if (s.length > 8000) {
    s = s.slice(0, 8000);
  }
  return s.trim();
}
function validMaxToken(token) {
  if (typeof token !== 'string' || !token.trim()) {
    return '';
  }
  const t = token.trim();
  return /^\d+(\.\d+)?(px|em|rem|%)$/.test(t) ? t : '';
}

/**
 * Split top-level selector list on commas (skip commas inside `()` / `[]`).
 *
 * @param {string} sel
 * @returns {string[]}
 */
function splitSelectorList(sel) {
  const s = typeof sel === 'string' ? sel.trim() : '';
  if (!s) {
    return [];
  }
  const parts = [];
  let depth = 0;
  let bracket = 0;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(') {
      depth++;
    } else if (c === ')') {
      depth--;
    } else if (c === '[') {
      bracket++;
    } else if (c === ']') {
      bracket--;
    } else if (c === ',' && depth === 0 && bracket === 0) {
      const chunk = s.slice(start, i).trim();
      if (chunk) {
        parts.push(chunk);
      }
      start = i + 1;
    }
  }
  const chunk = s.slice(start).trim();
  if (chunk) {
    parts.push(chunk);
  }
  return parts;
}

/**
 * Full selector for output CSS: _meta.baseSelector + per-state suffix.
 * Legacy: when base is empty, state selector is the full selector.
 * Comma-separated base: suffix is appended to each branch
 * (e.g. `.a .b, .c .d` + `:hover` → `.a .b:hover, .c .d:hover`).
 *
 * @param {unknown} baseRaw
 * @param {unknown} suffixRaw
 * @returns {string}
 */
function composeStylingFullSelector(baseRaw, suffixRaw) {
  const base = stripSelector(typeof baseRaw === 'string' ? baseRaw : '').trim();
  const suffix = stripSelector(typeof suffixRaw === 'string' ? suffixRaw : '').trim();
  if (!base && !suffix) {
    return '';
  }
  if (!base) {
    return suffix;
  }
  if (!suffix) {
    return base;
  }
  const list = splitSelectorList(base);
  if (list.length <= 1) {
    return `${base}${suffix}`;
  }
  return list.map(p => `${p}${suffix}`).join(', ');
}

/**
 * When `conf.force_selector` is non-empty, use it alone (ignores base + `conf.selector` for output).
 *
 * @param {string} baseMeta
 * @param {Record<string, unknown> | null | undefined} conf
 * @returns {string}
 */
function resolveStateOutputSelector(baseMeta, conf) {
  const force = stripSelector(conf && conf.force_selector != null ? String(conf.force_selector) : '').trim();
  if (force !== '') {
    return force;
  }
  const suffix = stripSelector(conf && conf.selector != null ? String(conf.selector) : '');
  return composeStylingFullSelector(baseMeta, suffix);
}

/**
 * @param {Record<string, unknown>} value
 * @param {typeof DEFAULT_BPS} breakpoints
 */
function buildStylingCss(value, breakpoints = DEFAULT_BPS) {
  if (!value || typeof value !== 'object') {
    return '';
  }
  if (Array.isArray(value.items) && value.items.length) {
    return value.items.map(item => buildStylingCss(item, breakpoints)).filter(Boolean).join('\n').trim();
  }
  if (!value._meta || !Array.isArray(value._meta.states)) {
    return '';
  }
  const baseMeta = value._meta && typeof value._meta.baseSelector === 'string' ? stripSelector(value._meta.baseSelector).trim() : '';
  let css = '';
  for (const entry of value._meta.states) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const keys = Object.keys(entry);
    if (keys.length !== 1) {
      continue;
    }
    const stateKey = keys[0];
    const conf = entry[stateKey];
    const selector = resolveStateOutputSelector(baseMeta, conf && typeof conf === 'object' ? conf : {});
    if (!selector) {
      continue;
    }
    const slice = value[stateKey] && typeof value[stateKey] === 'object' && !Array.isArray(value[stateKey]) ? value[stateKey] : {};
    for (const bp of breakpoints) {
      const id = bp.id;
      const raw = slice[id] != null ? String(slice[id]) : '';
      const decl = sanitizeDecl(raw);
      if (!decl) {
        continue;
      }
      const max = validMaxToken(bp.maxWidth || '');
      if (id === 'desktop' || !max) {
        css += `${selector} { ${decl} }\n`;
      } else {
        css += `@media (max-width: ${max}) { ${selector} { ${decl} } }\n`;
      }
    }
  }
  return css.trim();
}


/***/ },

/***/ "./src/admin/customizer/styling/components/BackgroundFields.jsx"
/*!**********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/BackgroundFields.jsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundFields: () => (/* binding */ BackgroundFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CssEnumButtonGroup */ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx");
/* harmony import */ var _StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StylingAlphaColorControl */ "./src/admin/customizer/styling/components/StylingAlphaColorControl.jsx");
/* harmony import */ var _StylingBackgroundImageControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./StylingBackgroundImageControl */ "./src/admin/customizer/styling/components/StylingBackgroundImageControl.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Background group: type color | image | gradient; image extras only for image.
 */








/** @type {'color' | 'image' | 'gradient'} */
const BG_TYPE_COLOR = 'color';
const BG_TYPE_IMAGE = 'image';
const BG_TYPE_GRADIENT = 'gradient';
const DEFAULT_GRADIENT = 'linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)';

/**
 * @param {string} s
 * @returns {boolean}
 */
function isCssGradientBackground(s) {
  const t = String(s || '').trim();
  if (!t || /^none$/i.test(t)) {
    return false;
  }
  const lower = t.toLowerCase();
  return lower.includes('linear-gradient') || lower.includes('radial-gradient') || lower.includes('conic-gradient') || lower.includes('repeating-linear-gradient') || lower.includes('repeating-radial-gradient');
}

/**
 * @param {string} s
 * @returns {boolean}
 */
function isCssUrlBackground(s) {
  const t = String(s || '').trim();
  if (!t || /^none$/i.test(t)) {
    return false;
  }
  return t.toLowerCase().includes('url(');
}

/**
 * @param {Record<string, string>} model
 * @returns {'color' | 'image' | 'gradient'}
 */
function inferBackgroundType(model) {
  const img = String(model.backgroundImage || '').trim();
  if (isCssGradientBackground(img)) {
    return BG_TYPE_GRADIENT;
  }
  if (isCssUrlBackground(img)) {
    return BG_TYPE_IMAGE;
  }
  return BG_TYPE_COLOR;
}

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function BackgroundFields({
  sliceKey,
  model,
  onPatch,
  disabledFieldSet
}) {
  const d = disabledFieldSet;
  const dis = key => (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__.isFieldDisabled)(d, key);
  const inferred = inferBackgroundType(model);
  const [uiType, setUiType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(inferred);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setUiType(inferBackgroundType(model));
  }, [sliceKey]);
  const clearImageLayerFields = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    return {
      backgroundImage: '',
      backgroundPosition: '',
      backgroundSize: '',
      backgroundRepeat: '',
      backgroundAttachment: ''
    };
  }, []);
  const applyTypeChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)((/** @type {'color'|'image'|'gradient'} */next) => {
    const cur = inferBackgroundType(model);
    if (next === cur) {
      return;
    }
    if (next === BG_TYPE_COLOR) {
      onPatch(clearImageLayerFields());
      return;
    }
    if (next === BG_TYPE_IMAGE) {
      if (cur === BG_TYPE_GRADIENT) {
        onPatch(clearImageLayerFields());
      }
      return;
    }
    if (next === BG_TYPE_GRADIENT && cur !== BG_TYPE_GRADIENT) {
      onPatch({
        backgroundImage: DEFAULT_GRADIENT,
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: ''
      });
    }
  }, [clearImageLayerFields, model, onPatch]);
  const onBackgroundTypeChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)((/** @type {string} */next) => {
    const t = next === BG_TYPE_IMAGE || next === BG_TYPE_GRADIENT ? next : BG_TYPE_COLOR;
    setUiType(t);
    applyTypeChange(t);
  }, [applyTypeChange]);
  const onGradientChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)((/** @type {string | undefined} */g) => {
    const v = g || '';
    onPatch({
      backgroundImage: v
    });
    if (!v) {
      setUiType(BG_TYPE_COLOR);
    }
  }, [onPatch]);
  const gradientValue = model.backgroundImage && isCssGradientBackground(model.backgroundImage) ? model.backgroundImage : DEFAULT_GRADIENT;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dis('__onepressBgType') ? null : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background type', 'onepress'),
    value: uiType,
    onChange: onBackgroundTypeChange,
    options: [{
      value: BG_TYPE_COLOR,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', 'onepress')
    }, {
      value: BG_TYPE_IMAGE,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Image', 'onepress')
    }, {
      value: BG_TYPE_GRADIENT,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gradient', 'onepress')
    }]
  }), uiType === BG_TYPE_COLOR ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_5__.StylingAlphaColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background color', 'onepress'),
    value: model.backgroundColor || '',
    onChange: v => onPatch({
      backgroundColor: v
    }),
    disabled: dis('backgroundColor')
  }) : null, uiType === BG_TYPE_IMAGE && !dis('backgroundImage') ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background image', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingBackgroundImageControl__WEBPACK_IMPORTED_MODULE_6__.StylingBackgroundImageControl, {
    backgroundImage: model.backgroundImage || '',
    backgroundPosition: model.backgroundPosition || '',
    onPatch: onPatch
  })), isCssUrlBackground(model.backgroundImage) ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background size', 'onepress'),
    value: model.backgroundSize || '',
    onChange: v => onPatch({
      backgroundSize: v
    }),
    disabled: dis('backgroundSize'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'auto',
      label: 'auto'
    }, {
      value: 'cover',
      label: 'cover'
    }, {
      value: 'contain',
      label: 'contain'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background repeat', 'onepress'),
    value: model.backgroundRepeat || '',
    onChange: v => onPatch({
      backgroundRepeat: v
    }),
    disabled: dis('backgroundRepeat'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'no-repeat',
      label: 'no-repeat'
    }, {
      value: 'repeat',
      label: 'repeat'
    }, {
      value: 'repeat-x',
      label: 'repeat-x'
    }, {
      value: 'repeat-y',
      label: 'repeat-y'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background attachment', 'onepress'),
    value: model.backgroundAttachment || '',
    onChange: v => onPatch({
      backgroundAttachment: v
    }),
    disabled: dis('backgroundAttachment'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'scroll',
      label: 'scroll'
    }, {
      value: 'fixed',
      label: 'fixed'
    }, {
      value: 'local',
      label: 'local'
    }]
  })) : null) : null, uiType === BG_TYPE_GRADIENT && !dis('backgroundImage') ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background gradient', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.GradientPicker, {
    __experimentalIsRenderedInSidebar: true,
    value: gradientValue,
    onChange: onGradientChange,
    gradients: [],
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background gradient', 'onepress')
  })) : null);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/BorderOutlineFields.jsx"
/*!*************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/BorderOutlineFields.jsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BorderOutlineFields: () => (/* binding */ BorderOutlineFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _BorderRadiusField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BorderRadiusField */ "./src/admin/customizer/styling/components/BorderRadiusField.jsx");
/* harmony import */ var _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CssEnumButtonGroup */ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./StylingAlphaColorControl */ "./src/admin/customizer/styling/components/StylingAlphaColorControl.jsx");
/* harmony import */ var _TrblSidesField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TrblSidesField */ "./src/admin/customizer/styling/components/TrblSidesField.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Border, radius, outline.
 */










/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function BorderOutlineFields({
  sliceKey,
  model,
  onPatch,
  disabledFieldSet
}) {
  const d = disabledFieldSet;
  const dis = key => (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_9__.isFieldDisabled)(d, key);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_5__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border style', 'onepress'),
    value: model.borderStyle || '',
    onChange: v => onPatch({
      borderStyle: v
    }),
    disabled: dis('borderStyle'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'none',
      label: 'none'
    }, {
      value: 'solid',
      label: 'solid'
    }, {
      value: 'dashed',
      label: 'dashed'
    }, {
      value: 'dotted',
      label: 'dotted'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TrblSidesField__WEBPACK_IMPORTED_MODULE_8__.TrblSidesField, {
    sliceKey: sliceKey,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border width', 'onepress'),
    model: model,
    onPatch: onPatch,
    keys: {
      t: 'borderTopWidth',
      r: 'borderRightWidth',
      b: 'borderBottomWidth',
      l: 'borderLeftWidth'
    },
    sliderPreset: _cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.borderWidth,
    linkLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Link border widths', 'onepress'),
    unlinkLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlink border widths', 'onepress'),
    preferLinkedWhenEmpty: true,
    disabledFieldSet: disabledFieldSet
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_7__.StylingAlphaColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border color', 'onepress'),
    value: model.borderColor || '',
    onChange: v => onPatch({
      borderColor: v
    }),
    disabled: dis('borderColor')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BorderRadiusField__WEBPACK_IMPORTED_MODULE_4__.BorderRadiusField, {
    sliceKey: sliceKey,
    model: model,
    onPatch: onPatch,
    disabledFieldSet: disabledFieldSet
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Outline style', 'onepress'),
    value: model.outlineStyle || '',
    onChange: v => onPatch({
      outlineStyle: v
    }),
    disabled: dis('outlineStyle'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress'),
      value: ''
    }, {
      label: 'auto',
      value: 'auto'
    }, {
      label: 'none',
      value: 'none'
    }, {
      label: 'hidden',
      value: 'hidden'
    }, {
      label: 'dotted',
      value: 'dotted'
    }, {
      label: 'dashed',
      value: 'dashed'
    }, {
      label: 'solid',
      value: 'solid'
    }, {
      label: 'double',
      value: 'double'
    }, {
      label: 'groove',
      value: 'groove'
    }, {
      label: 'ridge',
      value: 'ridge'
    }, {
      label: 'inset',
      value: 'inset'
    }, {
      label: 'outset',
      value: 'outset'
    }],
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Outline width', 'onepress'),
    value: model.outlineWidth || '',
    onChange: v => onPatch({
      outlineWidth: v
    }),
    disabled: dis('outlineWidth'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.borderWidth
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_7__.StylingAlphaColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Outline color', 'onepress'),
    value: model.outlineColor || '',
    onChange: v => onPatch({
      outlineColor: v
    }),
    disabled: dis('outlineColor')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Outline offset', 'onepress'),
    value: model.outlineOffset || '',
    onChange: v => onPatch({
      outlineOffset: v
    }),
    disabled: dis('outlineOffset'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.outlineOffset
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/BorderRadiusField.jsx"
/*!***********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/BorderRadiusField.jsx ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BorderRadiusField: () => (/* binding */ BorderRadiusField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _deriveLinkedSides__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deriveLinkedSides */ "./src/admin/customizer/styling/components/deriveLinkedSides.js");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _TrblLinkIconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TrblLinkIconButton */ "./src/admin/customizer/styling/components/TrblLinkIconButton.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Four corner radius inputs with “link corners”.
 */







const KEYS = {
  tl: 'borderTopLeftRadius',
  tr: 'borderTopRightRadius',
  br: 'borderBottomRightRadius',
  bl: 'borderBottomLeftRadius'
};

/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function BorderRadiusField({
  sliceKey,
  model,
  onPatch,
  disabledFieldSet
}) {
  const keyList = [KEYS.tl, KEYS.tr, KEYS.br, KEYS.bl];
  const [linked, setLinked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => (0,_deriveLinkedSides__WEBPACK_IMPORTED_MODULE_4__.deriveLinkedSides)(model, keyList));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setLinked((0,_deriveLinkedSides__WEBPACK_IMPORTED_MODULE_4__.deriveLinkedSides)(model, keyList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliceKey]);
  if ((0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__.areAllKeysDisabled)(disabledFieldSet, keyList)) {
    return null;
  }
  const patchCorner = (k, val) => {
    if (linked) {
      onPatch({
        [KEYS.tl]: val,
        [KEYS.tr]: val,
        [KEYS.br]: val,
        [KEYS.bl]: val
      });
    } else {
      onPatch({
        [k]: val
      });
    }
  };
  const setLinkedCorners = on => {
    setLinked(on);
    if (on) {
      const v = (model[KEYS.tl] || model[KEYS.tr] || model[KEYS.br] || model[KEYS.bl] || '').trim();
      onPatch({
        [KEYS.tl]: v,
        [KEYS.tr]: v,
        [KEYS.br]: v,
        [KEYS.bl]: v
      });
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl-block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl-head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border radius', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TrblLinkIconButton__WEBPACK_IMPORTED_MODULE_6__.TrblLinkIconButton, {
    linked: linked,
    onLinkedChange: setLinkedCorners,
    linkLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Link corners', 'onepress'),
    unlinkLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlink corners', 'onepress')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl"
  }, linked ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Value', 'onepress'),
    value: (model[KEYS.tl] || model[KEYS.tr] || model[KEYS.br] || model[KEYS.bl] || '').trim(),
    onChange: v => patchCorner(KEYS.tl, v),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.radius
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top left', 'onepress'),
    value: model[KEYS.tl] || '',
    onChange: v => patchCorner(KEYS.tl, v),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.radius
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top right', 'onepress'),
    value: model[KEYS.tr] || '',
    onChange: v => patchCorner(KEYS.tr, v),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.radius
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom right', 'onepress'),
    value: model[KEYS.br] || '',
    onChange: v => patchCorner(KEYS.br, v),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.radius
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom left', 'onepress'),
    value: model[KEYS.bl] || '',
    onChange: v => patchCorner(KEYS.bl, v),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.radius
  }))));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/BoxShadowGeneratorField.jsx"
/*!*****************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/BoxShadowGeneratorField.jsx ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoxShadowGeneratorField: () => (/* binding */ BoxShadowGeneratorField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var colord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! colord */ "./node_modules/colord/index.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _boxShadowGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../boxShadowGenerator */ "./src/admin/customizer/styling/boxShadowGenerator.js");
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DeviceSwitcherChip */ "./src/admin/customizer/styling/components/DeviceSwitcherChip.jsx");
/* harmony import */ var _StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StylingAlphaColorControl */ "./src/admin/customizer/styling/components/StylingAlphaColorControl.jsx");

/**
 * Single box-shadow: offsets, blur, spread, opacity, inset, color → one CSS string.
 */









/**
 * @param {object} props
 * @param {Record<string, string | number | boolean>} props.parts
 * @param {string} props.lengthKey
 * @param {string} props.label
 * @param {{ min: number, max: number, step: number, defaultSuffix: string }} props.preset
 * @param {(next: Record<string, string | number | boolean>) => void} props.onPartsChange
 */
function ShadowLengthRow({
  parts,
  lengthKey,
  label,
  preset,
  onPartsChange
}) {
  const value = parts[lengthKey];
  const parsed = (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_6__.parseCssSingleLengthValue)(value, preset.defaultSuffix);
  const canSlider = parsed !== null;
  const sliderVal = canSlider && parsed ? (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_6__.clampNumber)(parsed.num, preset.min, preset.max) : preset.min;
  const apply = n => {
    if (!parsed || n === undefined || n === null || !Number.isFinite(n)) {
      return;
    }
    onPartsChange((0,_boxShadowGenerator__WEBPACK_IMPORTED_MODULE_5__.patchLength)(parts, lengthKey, n, preset.min, preset.max, preset.defaultSuffix));
  };
  const onText = e => {
    onPartsChange({
      ...parts,
      [lengthKey]: e.target.value
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "shgen-row-label"
  }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `shgen-row unit-slider${canSlider ? ' has-range' : ''}`
  }, canSlider ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    className: "unit-range-field",
    label: label,
    hideLabelFromVision: true,
    value: sliderVal,
    onChange: apply,
    min: preset.min,
    max: preset.max,
    step: preset.step,
    withInputField: false,
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input components-text-control__input",
    type: "text",
    value: value,
    onChange: onText,
    "aria-label": label
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input is-full components-text-control__input",
    type: "text",
    value: value,
    onChange: onText,
    "aria-label": label
  })));
}

/**
 * @param {object} props
 * @param {number} props.opacity
 * @param {(n: number) => void} props.onChange
 */
function ShadowOpacityRow({
  opacity,
  onChange
}) {
  const label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Opacity', 'onepress');
  const v = Math.min(1, Math.max(0, opacity));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "shgen-row-label"
  }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "shgen-row unit-slider has-range"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    className: "unit-range-field",
    label: label,
    hideLabelFromVision: true,
    value: v,
    onChange: n => {
      if (n === undefined || n === null || !Number.isFinite(n)) {
        return;
      }
      onChange(Math.min(1, Math.max(0, n)));
    },
    min: 0,
    max: 1,
    step: 0.01,
    withInputField: false,
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input components-text-control__input",
    type: "text",
    value: String(Math.round(v * 1000) / 1000),
    onChange: e => {
      const x = parseFloat(e.target.value);
      if (!Number.isFinite(x)) {
        return;
      }
      onChange(Math.min(1, Math.max(0, x)));
    },
    "aria-label": label
  })));
}

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 */
function BoxShadowGeneratorField({
  value,
  onChange
}) {
  const parsed = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => (0,_boxShadowGenerator__WEBPACK_IMPORTED_MODULE_5__.parseBoxShadow)(value), [value]);
  if (!parsed.ok) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "shgen-block trbl-block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "trbl-head"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Box shadow', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_7__.DeviceSwitcherChip, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "description unknown-hint"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This value uses multiple shadows or a color the generator cannot parse. Edit it as CSS, or use a single shadow with a hex, rgb, hsl, or keyword color.', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
      value: parsed.raw,
      onChange: onChange,
      rows: 3
    }));
  }
  const parts = {
    inset: parsed.inset,
    offsetX: parsed.offsetX,
    offsetY: parsed.offsetY,
    blur: parsed.blur,
    spread: parsed.spread,
    colorHex: parsed.colorHex,
    opacity: parsed.opacity
  };
  const push = nextParts => {
    onChange((0,_boxShadowGenerator__WEBPACK_IMPORTED_MODULE_5__.serializeBoxShadow)(nextParts));
  };
  const colorComposite = (0,colord__WEBPACK_IMPORTED_MODULE_2__.colord)(parts.colorHex).alpha(parts.opacity).toRgbString();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "shgen-block trbl-block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl-head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Box shadow', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_7__.DeviceSwitcherChip, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ShadowLengthRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Shift right', 'onepress'),
    parts: parts,
    lengthKey: "offsetX",
    preset: _cssUnitSlider__WEBPACK_IMPORTED_MODULE_6__.SLIDER_PRESETS.boxShadowOffset,
    onPartsChange: push
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ShadowLengthRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Shift down', 'onepress'),
    parts: parts,
    lengthKey: "offsetY",
    preset: _cssUnitSlider__WEBPACK_IMPORTED_MODULE_6__.SLIDER_PRESETS.boxShadowOffset,
    onPartsChange: push
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ShadowLengthRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Spread', 'onepress'),
    parts: parts,
    lengthKey: "spread",
    preset: _cssUnitSlider__WEBPACK_IMPORTED_MODULE_6__.SLIDER_PRESETS.boxShadowSpread,
    onPartsChange: push
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ShadowLengthRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Blur', 'onepress'),
    parts: parts,
    lengthKey: "blur",
    preset: _cssUnitSlider__WEBPACK_IMPORTED_MODULE_6__.SLIDER_PRESETS.boxShadowBlur,
    onPartsChange: push
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ShadowOpacityRow, {
    opacity: parts.opacity,
    onChange: opacity => push({
      ...parts,
      opacity
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "shgen-inset-toggle"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inset', 'onepress'),
    checked: parts.inset,
    onChange: inset => push({
      ...parts,
      inset
    }),
    __nextHasNoMarginBottom: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_8__.StylingAlphaColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Color', 'onepress'),
    value: colorComposite,
    enableAlpha: false,
    onChange: css => {
      const c = (0,colord__WEBPACK_IMPORTED_MODULE_2__.colord)(css);
      if (!c.isValid()) {
        return;
      }
      push({
        ...parts,
        colorHex: c.alpha(1).toHex(),
        opacity: c.alpha()
      });
    }
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx"
/*!************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CssEnumButtonGroup: () => (/* binding */ CssEnumButtonGroup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Segmented control for a fixed set of CSS keywords (plan: prefer button group over Select).
 */


/**
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {{ value: string, label: string }[]} props.options
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 */
function CssEnumButtonGroup({
  label,
  value,
  onChange,
  options,
  className,
  disabled = false
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `enum-group ${className || ''}`.trim()
  }, label ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "enum-label"
  }, label) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "enum-buttons"
  }, options.map(o => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: o.value === '' ? '__default' : o.value,
    variant: value === o.value ? 'primary' : 'secondary',
    isSmall: true,
    disabled: disabled,
    onClick: () => {
      if (!disabled) {
        onChange(o.value);
      }
    }
  }, o.label))));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/DeviceSwitcherChip.jsx"
/*!************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/DeviceSwitcherChip.jsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeviceSwitcherChip: () => (/* binding */ DeviceSwitcherChip)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _deviceDashicons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deviceDashicons */ "./src/admin/customizer/styling/components/deviceDashicons.js");
/* harmony import */ var _StylingDeviceContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StylingDeviceContext */ "./src/admin/customizer/styling/components/StylingDeviceContext.jsx");

/**
 * Icon button opening device list; changing device updates all responsive fields via context.
 */




function DeviceDashicon({
  deviceId
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `dashicons ${(0,_deviceDashicons__WEBPACK_IMPORTED_MODULE_3__.dashiconClassForDeviceId)(deviceId)} device-dashicon`,
    "aria-hidden": true
  });
}
function DeviceSwitcherChip() {
  const {
    deviceId,
    setDeviceId,
    breakpoints
  } = (0,_StylingDeviceContext__WEBPACK_IMPORTED_MODULE_4__.useStylingDevice)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu, {
    className: "device-dropdown",
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DeviceDashicon, {
      deviceId: deviceId
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Switch breakpoint (all length fields)', 'onepress'),
    toggleProps: {
      size: 'small',
      variant: 'tertiary',
      className: 'device-chip'
    },
    popoverProps: {
      className: 'device-popover',
      placement: 'bottom-end'
    },
    controls: breakpoints.map(bp => ({
      title: bp.label || bp.id,
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DeviceDashicon, {
        deviceId: bp.id
      }),
      isActive: deviceId === bp.id,
      onClick: () => setDeviceId(bp.id)
    }))
  });
}

/***/ },

/***/ "./src/admin/customizer/styling/components/DisplayLayoutFields.jsx"
/*!*************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/DisplayLayoutFields.jsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisplayLayoutFields: () => (/* binding */ DisplayLayoutFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CssEnumButtonGroup */ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx");
/* harmony import */ var _FlexLayoutFields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FlexLayoutFields */ "./src/admin/customizer/styling/components/FlexLayoutFields.jsx");
/* harmony import */ var _GridLayoutFields__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GridLayoutFields */ "./src/admin/customizer/styling/components/GridLayoutFields.jsx");
/* harmony import */ var _InsetSidesFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InsetSidesFields */ "./src/admin/customizer/styling/components/InsetSidesFields.jsx");
/* harmony import */ var _ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ResponsiveFieldShell */ "./src/admin/customizer/styling/components/ResponsiveFieldShell.jsx");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Display, visibility, box model, overflow, flex/grid subsections.
 */










const Z_INDEX_MIN = -100;
const Z_INDEX_MAX = 99999;
const OPACITY_KW = /^(inherit|initial|revert|revert-layer|unset)$/i;

/**
 * @param {string} raw
 * @returns {boolean}
 */
function canUseOpacityRange(raw) {
  const t = String(raw || '').trim();
  if (t === '') {
    return true;
  }
  if (OPACITY_KW.test(t)) {
    return false;
  }
  if (/^(-?(?:\d+\.?\d*|\.\d+))%$/.test(t)) {
    const n = parseFloat(t) / 100;
    return Number.isFinite(n);
  }
  return /^-?(?:\d+\.?\d*|\.\d+)$/.test(t);
}

/**
 * @param {string} raw
 * @returns {number} 0–1 for RangeControl
 */
function opacitySliderValue(raw) {
  const t = String(raw || '').trim();
  if (t === '') {
    return 1;
  }
  const pct = t.match(/^(-?(?:\d+\.?\d*|\.\d+))%$/);
  if (pct) {
    const n = parseFloat(pct[1]) / 100;
    return (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.clampNumber)(Number.isFinite(n) ? n : 0, 0, 1);
  }
  const n = parseFloat(t);
  if (!Number.isFinite(n)) {
    return 0;
  }
  return (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.clampNumber)(n, 0, 1);
}

/**
 * @param {number} n
 * @returns {string}
 */
function formatOpacityCss(n) {
  const r = Math.round(Math.min(1, Math.max(0, n)) * 1000) / 1000;
  return Number.isInteger(r) ? String(r) : String(r);
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {boolean} [props.disabled]
 */
function OpacityRangeField({
  label,
  help,
  value,
  onChange,
  disabled = false
}) {
  const raw = String(value !== null && value !== void 0 ? value : '');
  const canRange = canUseOpacityRange(raw);
  const sliderVal = opacitySliderValue(raw);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_8__.ResponsiveFieldShell, {
    label: label,
    help: help
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `unit-slider${canRange ? ' has-range' : ''}`
  }, canRange ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    className: "unit-range-field",
    label: label,
    hideLabelFromVision: true,
    value: sliderVal,
    onChange: n => {
      if (n === undefined || n === null || !Number.isFinite(n)) {
        return;
      }
      onChange(formatOpacityCss(n));
    },
    min: 0,
    max: 1,
    step: 0.01,
    withInputField: false,
    __nextHasNoMarginBottom: true,
    disabled: disabled
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input components-text-control__input",
    type: "text",
    value: raw,
    onChange: e => onChange(e.target.value),
    "aria-label": label,
    disabled: disabled
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input is-full components-text-control__input",
    type: "text",
    value: raw,
    onChange: e => onChange(e.target.value),
    "aria-label": label,
    disabled: disabled
  })));
}

/**
 * @param {string} raw
 * @returns {number | null} integer only; null for empty, auto, or non-integer
 */
function parseZIndexInt(raw) {
  const s = String(raw || '').trim();
  if (s === '' || /^auto$/i.test(s)) {
    return null;
  }
  if (!/^-?\d+$/.test(s)) {
    return null;
  }
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {boolean} [props.disabled]
 */
function ZIndexRangeField({
  label,
  value,
  onChange,
  disabled = false
}) {
  const raw = String(value !== null && value !== void 0 ? value : '');
  const trimmed = raw.trim();
  const isAuto = /^auto$/i.test(trimmed);
  const zi = parseZIndexInt(raw);
  const canRange = !isAuto && (zi !== null || trimmed === '');
  const sliderVal = zi !== null ? (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.clampNumber)(zi, Z_INDEX_MIN, Z_INDEX_MAX) : 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_8__.ResponsiveFieldShell, {
    label: label
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `unit-slider${canRange ? ' has-range' : ''}`
  }, canRange ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    className: "unit-range-field",
    label: label,
    hideLabelFromVision: true,
    value: sliderVal,
    onChange: n => {
      if (n === undefined || n === null || !Number.isFinite(n)) {
        return;
      }
      onChange(String(Math.round(n)));
    },
    min: Z_INDEX_MIN,
    max: Z_INDEX_MAX,
    step: 1,
    withInputField: false,
    __nextHasNoMarginBottom: true,
    disabled: disabled
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input components-text-control__input",
    type: "text",
    value: raw,
    onChange: e => onChange(e.target.value),
    "aria-label": label,
    disabled: disabled
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input is-full components-text-control__input",
    type: "text",
    value: raw,
    onChange: e => onChange(e.target.value),
    "aria-label": label,
    disabled: disabled
  })));
}

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function DisplayLayoutFields({
  model,
  onPatch,
  disabledFieldSet
}) {
  const displayVal = (model.display || '').toLowerCase();
  const isFlex = displayVal === 'flex' || displayVal === 'inline-flex';
  const isGrid = displayVal === 'grid' || displayVal === 'inline-grid';
  const showPositionExtras = ['relative', 'absolute', 'fixed', 'sticky'].includes((model.position || '').toLowerCase());
  const dis = k => (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_10__.isFieldDisabled)(disabledFieldSet, k);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Display', 'onepress'),
    value: model.display || '',
    onChange: v => onPatch({
      display: v
    }),
    disabled: dis('display'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress'),
      value: ''
    }, {
      label: 'none',
      value: 'none'
    }, {
      label: 'block',
      value: 'block'
    }, {
      label: 'inline',
      value: 'inline'
    }, {
      label: 'inline-block',
      value: 'inline-block'
    }, {
      label: 'flex',
      value: 'flex'
    }, {
      label: 'inline-flex',
      value: 'inline-flex'
    }, {
      label: 'grid',
      value: 'grid'
    }, {
      label: 'inline-grid',
      value: 'inline-grid'
    }],
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Visibility', 'onepress'),
    value: model.visibility || '',
    onChange: v => onPatch({
      visibility: v
    }),
    disabled: dis('visibility'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'visible',
      label: 'visible'
    }, {
      value: 'hidden',
      label: 'hidden'
    }]
  }), dis('opacity') ? null : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(OpacityRangeField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', 'onepress'),
    value: model.opacity || '',
    onChange: v => onPatch({
      opacity: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Position', 'onepress'),
    value: model.position || '',
    onChange: v => onPatch({
      position: v
    }),
    disabled: dis('position'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress'),
      value: ''
    }, {
      label: 'static',
      value: 'static'
    }, {
      label: 'relative',
      value: 'relative'
    }, {
      label: 'absolute',
      value: 'absolute'
    }, {
      label: 'fixed',
      value: 'fixed'
    }, {
      label: 'sticky',
      value: 'sticky'
    }],
    __nextHasNoMarginBottom: true
  }), showPositionExtras ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_InsetSidesFields__WEBPACK_IMPORTED_MODULE_7__.InsetSidesFields, {
    model: model,
    onPatch: onPatch,
    disabledFieldSet: disabledFieldSet
  }) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_9__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Width', 'onepress'),
    value: model.width || '',
    onChange: v => onPatch({
      width: v
    }),
    disabled: dis('width'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.lengthWide
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_9__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Height', 'onepress'),
    value: model.height || '',
    onChange: v => onPatch({
      height: v
    }),
    disabled: dis('height'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.lengthWide
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ZIndexRangeField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Z-index', 'onepress'),
    value: model.zIndex || '',
    onChange: v => onPatch({
      zIndex: v
    }),
    disabled: dis('zIndex')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_4__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Overflow', 'onepress'),
    value: model.overflow || '',
    onChange: v => onPatch({
      overflow: v
    }),
    disabled: dis('overflow'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'visible',
      label: 'visible'
    }, {
      value: 'hidden',
      label: 'hidden'
    }, {
      value: 'scroll',
      label: 'scroll'
    }, {
      value: 'auto',
      label: 'auto'
    }]
  }), isFlex ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FlexLayoutFields__WEBPACK_IMPORTED_MODULE_5__.FlexLayoutFields, {
    model: model,
    onPatch: onPatch,
    disabledFieldSet: disabledFieldSet
  }) : null, isGrid ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayoutFields__WEBPACK_IMPORTED_MODULE_6__.GridLayoutFields, {
    model: model,
    onPatch: onPatch,
    disabledFieldSet: disabledFieldSet
  }) : null);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/FlexLayoutFields.jsx"
/*!**********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/FlexLayoutFields.jsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlexLayoutFields: () => (/* binding */ FlexLayoutFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CssEnumButtonGroup */ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx");
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Flex container fields (when display is flex / inline-flex).
 */






const FLEX_KEYS = ['flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent', 'gap', 'rowGap', 'columnGap'];

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function FlexLayoutFields({
  model,
  onPatch,
  disabledFieldSet
}) {
  if ((0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_6__.areAllKeysDisabled)(disabledFieldSet, FLEX_KEYS)) {
    return null;
  }
  const dis = k => (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_6__.isFieldDisabled)(disabledFieldSet, k);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "subsection"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "subsection-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Flex', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Flex direction', 'onepress'),
    value: model.flexDirection || '',
    onChange: v => onPatch({
      flexDirection: v
    }),
    disabled: dis('flexDirection'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'row',
      label: 'row'
    }, {
      value: 'row-reverse',
      label: 'row-rev'
    }, {
      value: 'column',
      label: 'column'
    }, {
      value: 'column-reverse',
      label: 'col-rev'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Flex wrap', 'onepress'),
    value: model.flexWrap || '',
    onChange: v => onPatch({
      flexWrap: v
    }),
    disabled: dis('flexWrap'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'nowrap',
      label: 'nowrap'
    }, {
      value: 'wrap',
      label: 'wrap'
    }, {
      value: 'wrap-reverse',
      label: 'wrap-rev'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Justify content', 'onepress'),
    value: model.justifyContent || '',
    onChange: v => onPatch({
      justifyContent: v
    }),
    disabled: dis('justifyContent'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'flex-start',
      label: 'start'
    }, {
      value: 'center',
      label: 'center'
    }, {
      value: 'flex-end',
      label: 'end'
    }, {
      value: 'space-between',
      label: 'between'
    }, {
      value: 'space-around',
      label: 'around'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Align items', 'onepress'),
    value: model.alignItems || '',
    onChange: v => onPatch({
      alignItems: v
    }),
    disabled: dis('alignItems'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'stretch',
      label: 'stretch'
    }, {
      value: 'flex-start',
      label: 'start'
    }, {
      value: 'center',
      label: 'center'
    }, {
      value: 'flex-end',
      label: 'end'
    }, {
      value: 'baseline',
      label: 'baseline'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Align content', 'onepress'),
    value: model.alignContent || '',
    onChange: v => onPatch({
      alignContent: v
    }),
    disabled: dis('alignContent'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'flex-start',
      label: 'start'
    }, {
      value: 'center',
      label: 'center'
    }, {
      value: 'flex-end',
      label: 'end'
    }, {
      value: 'space-between',
      label: 'between'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gap', 'onepress'),
    value: model.gap || '',
    onChange: v => onPatch({
      gap: v
    }),
    disabled: dis('gap'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__.SLIDER_PRESETS.gap
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Row gap', 'onepress'),
    value: model.rowGap || '',
    onChange: v => onPatch({
      rowGap: v
    }),
    disabled: dis('rowGap'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__.SLIDER_PRESETS.gap
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Column gap', 'onepress'),
    value: model.columnGap || '',
    onChange: v => onPatch({
      columnGap: v
    }),
    disabled: dis('columnGap'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__.SLIDER_PRESETS.gap
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/GridLayoutFields.jsx"
/*!**********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/GridLayoutFields.jsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridLayoutFields: () => (/* binding */ GridLayoutFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CssEnumButtonGroup */ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx");
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResponsiveFieldShell */ "./src/admin/customizer/styling/components/ResponsiveFieldShell.jsx");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Grid container fields (when display is grid / inline-grid).
 */







const GRID_KEYS = ['gridTemplateColumns', 'gridTemplateRows', 'gridAutoFlow', 'justifyItems', 'gap'];

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function GridLayoutFields({
  model,
  onPatch,
  disabledFieldSet
}) {
  if ((0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__.areAllKeysDisabled)(disabledFieldSet, GRID_KEYS)) {
    return null;
  }
  const dis = k => (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__.isFieldDisabled)(disabledFieldSet, k);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "subsection"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "subsection-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Grid', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_5__.ResponsiveFieldShell, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Grid template columns', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: model.gridTemplateColumns || '',
    onChange: v => onPatch({
      gridTemplateColumns: v
    }),
    disabled: dis('gridTemplateColumns'),
    rows: 2
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_5__.ResponsiveFieldShell, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Grid template rows', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: model.gridTemplateRows || '',
    onChange: v => onPatch({
      gridTemplateRows: v
    }),
    disabled: dis('gridTemplateRows'),
    rows: 2
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Grid auto flow', 'onepress'),
    value: model.gridAutoFlow || '',
    onChange: v => onPatch({
      gridAutoFlow: v
    }),
    disabled: dis('gridAutoFlow'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'row',
      label: 'row'
    }, {
      value: 'column',
      label: 'column'
    }, {
      value: 'dense',
      label: 'dense'
    }, {
      value: 'row dense',
      label: 'row dense'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Justify items', 'onepress'),
    value: model.justifyItems || '',
    onChange: v => onPatch({
      justifyItems: v
    }),
    disabled: dis('justifyItems'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'start',
      label: 'start'
    }, {
      value: 'end',
      label: 'end'
    }, {
      value: 'center',
      label: 'center'
    }, {
      value: 'stretch',
      label: 'stretch'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gap', 'onepress'),
    value: model.gap || '',
    onChange: v => onPatch({
      gap: v
    }),
    disabled: dis('gap'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__.SLIDER_PRESETS.gap
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/InsetSidesFields.jsx"
/*!**********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/InsetSidesFields.jsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InsetSidesFields: () => (/* binding */ InsetSidesFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * top / right / bottom / left when position is not static.
 */





/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function InsetSidesFields({
  model,
  onPatch,
  disabledFieldSet
}) {
  const insetKeys = ['top', 'right', 'bottom', 'left'];
  if ((0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_4__.areAllKeysDisabled)(disabledFieldSet, insetKeys)) {
    return null;
  }
  const dis = k => Boolean(disabledFieldSet?.has(k));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_3__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top', 'onepress'),
    value: model.top || '',
    onChange: v => onPatch({
      top: v
    }),
    disabled: dis('top'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__.SLIDER_PRESETS.inset
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_3__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'onepress'),
    value: model.right || '',
    onChange: v => onPatch({
      right: v
    }),
    disabled: dis('right'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__.SLIDER_PRESETS.inset
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_3__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom', 'onepress'),
    value: model.bottom || '',
    onChange: v => onPatch({
      bottom: v
    }),
    disabled: dis('bottom'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__.SLIDER_PRESETS.inset
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_3__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'onepress'),
    value: model.left || '',
    onChange: v => onPatch({
      left: v
    }),
    disabled: dis('left'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__.SLIDER_PRESETS.inset
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/PreservedPropertiesNotice.jsx"
/*!*******************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/PreservedPropertiesNotice.jsx ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PreservedPropertiesNotice: () => (/* binding */ PreservedPropertiesNotice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Hint when unknown CSS properties exist in the current slice string.
 */


/**
 * @param {object} props
 * @param {number} props.count
 */
function PreservedPropertiesNotice({
  count
}) {
  if (count <= 0) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description unknown-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Extra CSS properties from manual edits are preserved.', 'onepress'), " (", count, ")");
}

/***/ },

/***/ "./src/admin/customizer/styling/components/RawDeclarationsField.jsx"
/*!**************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/RawDeclarationsField.jsx ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RawDeclarationsField: () => (/* binding */ RawDeclarationsField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeviceSwitcherChip */ "./src/admin/customizer/styling/components/DeviceSwitcherChip.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Full declaration string editor (custom / advanced).
 */





/**
 * @param {object} props
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function RawDeclarationsField({
  value,
  onChange,
  disabledFieldSet
}) {
  if ((0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_4__.isFieldDisabled)(disabledFieldSet, '__onepressRawDeclarations')) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rfield"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rfield-h"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rfield-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Raw CSS (full string for this state & device)', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_3__.DeviceSwitcherChip, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rfield-body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: value,
    onChange: onChange,
    rows: 6,
    className: "textarea-mono"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description rfield-help"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Overrides are parsed into the groups above when possible; other properties stay preserved.', 'onepress')));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/ResponsiveFieldShell.jsx"
/*!**************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/ResponsiveFieldShell.jsx ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResponsiveFieldShell: () => (/* binding */ ResponsiveFieldShell)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeviceSwitcherChip */ "./src/admin/customizer/styling/components/DeviceSwitcherChip.jsx");

/**
 * Layout: [label] [device icon] then control (plan: device next to unit-bearing labels).
 */


/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
 */
function ResponsiveFieldShell({
  label,
  help,
  className,
  children
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `rfield ${className || ''}`.trim()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rfield-h"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rfield-label"
  }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_1__.DeviceSwitcherChip, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rfield-body"
  }, children), help ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description rfield-help"
  }, help) : null);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx"
/*!*******************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResponsiveUnitSliderField: () => (/* binding */ ResponsiveUnitSliderField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResponsiveFieldShell */ "./src/admin/customizer/styling/components/ResponsiveFieldShell.jsx");

/**
 * Responsive field: row1 label + device chip; row2 RangeControl + CSS value input.
 */




/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {number} props.min
 * @param {number} props.max
 * @param {number} props.step
 * @param {string} props.defaultSuffix
 * @param {boolean} [props.disabled]
 */
function ResponsiveUnitSliderField({
  label,
  help,
  value,
  onChange,
  min,
  max,
  step,
  defaultSuffix,
  disabled = false
}) {
  const parsed = (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__.parseCssSingleLengthValue)(value, defaultSuffix);
  const canUseSlider = parsed !== null;
  const sliderVal = canUseSlider && parsed ? (0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__.clampNumber)(parsed.num, min, max) : min;
  const onRangeChange = n => {
    if (!parsed || n === undefined || n === null || !Number.isFinite(n)) {
      return;
    }
    onChange((0,_cssUnitSlider__WEBPACK_IMPORTED_MODULE_2__.formatCssSingleLengthValue)(n, parsed.suffix));
  };
  const onTextChange = e => {
    onChange(e.target.value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_3__.ResponsiveFieldShell, {
    label: label,
    help: help
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `unit-slider${canUseSlider ? ' has-range' : ''}`
  }, canUseSlider ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    className: "unit-range-field",
    label: label,
    hideLabelFromVision: true,
    value: sliderVal,
    onChange: onRangeChange,
    min: min,
    max: max,
    step: step,
    disabled: disabled,
    withInputField: false,
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input components-text-control__input",
    type: "text",
    value: value,
    onChange: onTextChange,
    disabled: disabled,
    "aria-label": label
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "unit-input is-full components-text-control__input",
    type: "text",
    value: value,
    onChange: onTextChange,
    disabled: disabled,
    "aria-label": label
  })));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/ShadowFields.jsx"
/*!******************************************************************!*\
  !*** ./src/admin/customizer/styling/components/ShadowFields.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShadowFields: () => (/* binding */ ShadowFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BoxShadowGeneratorField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoxShadowGeneratorField */ "./src/admin/customizer/styling/components/BoxShadowGeneratorField.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Box shadow — generator UI (single shadow) with CSS fallback for complex values.
 */



/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function ShadowFields({
  model,
  onPatch,
  disabledFieldSet
}) {
  if ((0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_2__.isFieldDisabled)(disabledFieldSet, 'boxShadow')) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BoxShadowGeneratorField__WEBPACK_IMPORTED_MODULE_1__.BoxShadowGeneratorField, {
    value: model.boxShadow || '',
    onChange: v => onPatch({
      boxShadow: v
    })
  });
}

/***/ },

/***/ "./src/admin/customizer/styling/components/SpacingFields.jsx"
/*!*******************************************************************!*\
  !*** ./src/admin/customizer/styling/components/SpacingFields.jsx ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpacingFields: () => (/* binding */ SpacingFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TrblSidesField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TrblSidesField */ "./src/admin/customizer/styling/components/TrblSidesField.jsx");

/**
 * Margin + padding (TRBL).
 */



/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function SpacingFields({
  sliceKey,
  model,
  onPatch,
  disabledFieldSet
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TrblSidesField__WEBPACK_IMPORTED_MODULE_2__.TrblSidesField, {
    sliceKey: sliceKey,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Margin', 'onepress'),
    model: model,
    onPatch: onPatch,
    keys: {
      t: 'marginTop',
      r: 'marginRight',
      b: 'marginBottom',
      l: 'marginLeft'
    },
    disabledFieldSet: disabledFieldSet
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TrblSidesField__WEBPACK_IMPORTED_MODULE_2__.TrblSidesField, {
    sliceKey: sliceKey,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding', 'onepress'),
    model: model,
    onPatch: onPatch,
    keys: {
      t: 'paddingTop',
      r: 'paddingRight',
      b: 'paddingBottom',
      l: 'paddingLeft'
    },
    disabledFieldSet: disabledFieldSet
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingAlphaColorControl.jsx"
/*!******************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingAlphaColorControl.jsx ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingAlphaColorControl: () => (/* binding */ StylingAlphaColorControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var colord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! colord */ "./node_modules/colord/index.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);

/**
 * Color field: row with swatch + InputControl; swatch opens ColorPicker; value is free-form CSS.
 */





/**
 * @param {string} raw
 * @returns {boolean}
 */
function isCssColorParsable(raw) {
  const s = String(raw || '').trim();
  if (!s) {
    return true;
  }
  return (0,colord__WEBPACK_IMPORTED_MODULE_2__.colord)(s).isValid();
}

/**
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.help]
 * @param {string} props.value
 * @param {(v: string) => void} props.onChange
 * @param {string} [props.className]
 * @param {boolean} [props.enableAlpha] — WordPress ColorPicker alpha channel (default true)
 * @param {boolean} [props.disabled]
 */
function StylingAlphaColorControl({
  label,
  help,
  value,
  onChange,
  className,
  enableAlpha = true,
  disabled = false
}) {
  if (disabled) {
    return null;
  }
  const raw = String(value || '').trim();
  const [popoverOpen, setPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [popoverAnchor, setPopoverAnchor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const swatchRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useLayoutEffect)(() => {
    if (!popoverOpen) {
      setPopoverAnchor(null);
      return;
    }
    setPopoverAnchor(swatchRef.current);
  }, [popoverOpen]);
  const c = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => (0,colord__WEBPACK_IMPORTED_MODULE_2__.colord)(raw), [raw]);
  const pickerHex = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (!raw) {
      return '#ffffff';
    }
    return c.isValid() ? c.toHex() : '#ffffff';
  }, [raw, c]);
  const swatchStyle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (!raw || !c.isValid()) {
      return {
        background: 'repeating-conic-gradient(#e0e0e0 0% 25%, #fff 0% 50%) 50% / 10px 10px'
      };
    }
    return {
      backgroundColor: raw
    };
  }, [raw, c]);
  const applyPicked = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(hex => {
    if (hex === undefined || hex === null || hex === '') {
      onChange('');
      return;
    }
    const next = (0,colord__WEBPACK_IMPORTED_MODULE_2__.colord)(hex);
    if (!next.isValid()) {
      return;
    }
    onChange(next.toHex());
  }, [onChange]);
  const togglePopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setPopoverOpen(o => !o), []);
  const closePopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setPopoverOpen(false), []);
  const onInputChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(next => {
    onChange(next !== null && next !== void 0 ? next : '');
  }, [onChange]);
  const mergedHelp = help || (!isCssColorParsable(raw) ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Swatch and picker need a parseable color (hex, rgb, hsl). You can still use any CSS color value here (e.g. var(--token)).', 'onepress') : undefined);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    label: label,
    help: mergedHelp,
    className: className
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "alpha-color"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "alpha-color-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "alpha-color-row-inner relative"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    ref: swatchRef,
    className: "alpha-color-swatch-button",
    "aria-expanded": popoverOpen,
    onClick: togglePopover,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: %s: field label */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toggle color picker (%s)', 'onepress'), label)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "alpha-color-swatch",
    style: swatchStyle,
    "aria-hidden": true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
    __next40pxDefaultSize: false,
    className: "alpha-color-value-input",
    value: value || '',
    onChange: onInputChange,
    hideLabelFromVision: true,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('#000000', 'onepress'),
    autoComplete: "off"
  }))), popoverOpen && popoverAnchor ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    anchor: popoverAnchor,
    onClose: closePopover,
    placement: "bottom-start",
    shift: true,
    className: "alpha-color-popover",
    focusOnMount: "firstElement",
    noArrow: false,
    offset: 15
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "alpha-color-popover__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: pickerHex,
    onChange: applyPicked,
    enableAlpha: enableAlpha,
    label: label,
    hideLabelFromVision: true,
    __nextHasNoMarginBottom: true
  }))) : null));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingBackgroundImageControl.jsx"
/*!***********************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingBackgroundImageControl.jsx ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingBackgroundImageControl: () => (/* binding */ StylingBackgroundImageControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _stylingBackgroundImageUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stylingBackgroundImageUtils */ "./src/admin/customizer/styling/stylingBackgroundImageUtils.js");

/**
 * Background image: wp.media + FocalPointPicker → background-position %.
 */





/**
 * @param {object} props
 * @param {string} props.backgroundImage
 * @param {string} props.backgroundPosition
 * @param {(patch: Record<string, string>) => void} props.onPatch
 */
function StylingBackgroundImageControl({
  backgroundImage,
  backgroundPosition,
  onPatch
}) {
  const imageUrl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => (0,_stylingBackgroundImageUtils__WEBPACK_IMPORTED_MODULE_4__.extractUrlFromBackgroundImage)(backgroundImage), [backgroundImage]);
  const focalValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => (0,_stylingBackgroundImageUtils__WEBPACK_IMPORTED_MODULE_4__.parseBackgroundPositionToFocal)(backgroundPosition), [backgroundPosition]);
  const onFocalChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(fp => {
    onPatch({
      backgroundPosition: (0,_stylingBackgroundImageUtils__WEBPACK_IMPORTED_MODULE_4__.focalToBackgroundPosition)(fp)
    });
  }, [onPatch]);
  const openMedia = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    if (typeof wp === 'undefined' || !wp.media) {
      return;
    }
    const frame = wp.media({
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background image', 'onepress'),
      button: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use image', 'onepress')
      },
      multiple: false,
      library: {
        type: 'image'
      }
    });
    frame.on('select', () => {
      const attachment = frame.state().get('selection').first().toJSON();
      const url = attachment && attachment.url ? String(attachment.url) : '';
      if (!url) {
        return;
      }
      const patch = {
        backgroundImage: (0,_stylingBackgroundImageUtils__WEBPACK_IMPORTED_MODULE_4__.formatBackgroundImageFromUrl)(url)
      };
      if (!String(backgroundPosition || '').trim()) {
        patch.backgroundPosition = '50% 50%';
      }
      onPatch(patch);
    });
    frame.open();
  }, [backgroundPosition, onPatch]);
  const clearImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    onPatch({
      backgroundImage: '',
      backgroundPosition: ''
    });
  }, [onPatch]);
  const hasMedia = Boolean(imageUrl);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-bg-image"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-bg-image__toolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: openMedia
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select from Media Library', 'onepress')), hasMedia ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    onClick: clearImage
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'onepress')) : null), hasMedia ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FocalPointPicker, {
    __nextHasNoMarginBottom: true
    // label={__('Focal point', 'onepress')}
    ,
    url: imageUrl,
    value: focalValue,
    onChange: onFocalChange
  }) : null);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingDeviceContext.jsx"
/*!**************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingDeviceContext.jsx ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingDeviceProvider: () => (/* binding */ StylingDeviceProvider),
/* harmony export */   useStylingDevice: () => (/* binding */ useStylingDevice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Global breakpoint for the styling control: one deviceId drives all responsive fields.
 */


/**
 * @typedef {{ id: string, label?: string, maxWidth?: string }} StylingBreakpoint
 */

/** @type {import('react').Context<null | { deviceId: string, setDeviceId: (id: string) => void, breakpoints: StylingBreakpoint[] }>} */
const StylingDeviceContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);

/**
 * @param {object} props
 * @param {string} props.deviceId
 * @param {(id: string) => void} props.setDeviceId
 * @param {StylingBreakpoint[]} props.breakpoints
 * @param {import('react').ReactNode} props.children
 */
function StylingDeviceProvider({
  deviceId,
  setDeviceId,
  breakpoints,
  children
}) {
  const value = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    deviceId,
    setDeviceId,
    breakpoints
  }), [deviceId, setDeviceId, breakpoints]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(StylingDeviceContext.Provider, {
    value: value
  }, children);
}

/**
 * @returns {{ deviceId: string, setDeviceId: (id: string) => void, breakpoints: StylingBreakpoint[] }}
 */
function useStylingDevice() {
  const ctx = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(StylingDeviceContext);
  if (!ctx) {
    throw new Error('useStylingDevice must be used within StylingDeviceProvider');
  }
  return ctx;
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingFontFaceSelectControls.jsx"
/*!***********************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingFontFaceSelectControls.jsx ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingFontFaceSelectControls: () => (/* binding */ StylingFontFaceSelectControls)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Font weight / style: full CSS options for system fonts; Google fontFace when matched; else compact presets.
 */






/** @typedef {import('../googleFontCollection').PickerFontFamily} PickerFontFamily */

/**
 * CSS font-weight values commonly used in authoring (keywords + 100–900 + inherit).
 * @returns {{ value: string, label: string }[]}
 */
function getSystemFontWeightOptions() {
  const numeric = [100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => ({
    value: String(n),
    label: String(n)
  }));
  return [{
    value: '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
  }, {
    value: 'normal',
    label: 'normal'
  }, {
    value: 'bold',
    label: 'bold'
  }, {
    value: 'bolder',
    label: 'bolder'
  }, {
    value: 'lighter',
    label: 'lighter'
  }, ...numeric, {
    value: 'inherit',
    label: 'inherit'
  }];
}

/**
 * CSS font-style keywords.
 * @returns {{ value: string, label: string }[]}
 */
function getSystemFontStyleOptions() {
  return [{
    value: '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
  }, {
    value: 'normal',
    label: 'normal'
  }, {
    value: 'italic',
    label: 'italic'
  }, {
    value: 'oblique',
    label: 'oblique'
  }, {
    value: 'inherit',
    label: 'inherit'
  }];
}

/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {PickerFontFamily[] | null | undefined} props.families
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function StylingFontFaceSelectControls({
  model,
  onPatch,
  families,
  disabledFieldSet
}) {
  var _model$fontWeight3, _model$fontStyle2;
  const disW = (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_5__.isFieldDisabled)(disabledFieldSet, 'fontWeight');
  const disS = (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_5__.isFieldDisabled)(disabledFieldSet, 'fontStyle');
  const matched = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_4__.findFamilyForModel)(families, model.fontFamily || ''), [families, model.fontFamily]);
  const systemWeightOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => getSystemFontWeightOptions(), []);
  const systemStyleOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => getSystemFontStyleOptions(), []);
  const compactWeightOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => [{
    value: '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
  }, {
    value: '400',
    label: '400'
  }, {
    value: '500',
    label: '500'
  }, {
    value: '600',
    label: '600'
  }, {
    value: '700',
    label: '700'
  }, {
    value: 'normal',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Normal', 'onepress')
  }, {
    value: 'bold',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bold', 'onepress')
  }], []);
  const compactStyleOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => [{
    value: '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
  }, {
    value: 'normal',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Normal', 'onepress')
  }, {
    value: 'italic',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Italic', 'onepress')
  }, {
    value: 'oblique',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Oblique', 'onepress')
  }], []);
  const faces = matched && !matched.isSystem && matched.fontFace?.length ? matched.fontFace : null;
  const weightOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    if (!faces) {
      return null;
    }
    const weights = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_4__.uniqueFontWeights)(faces);
    return [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, ...weights.map(w => ({
      value: w,
      label: w
    }))];
  }, [faces]);
  const styleOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    var _model$fontWeight;
    if (!faces) {
      return null;
    }
    const w = (_model$fontWeight = model.fontWeight) !== null && _model$fontWeight !== void 0 ? _model$fontWeight : '';
    const styles = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_4__.fontStylesForWeight)(faces, w);
    if (!styles.length) {
      return [{
        value: '',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
      }];
    }
    return [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, ...styles.map(s => ({
      value: s,
      label: s
    }))];
  }, [faces, model.fontWeight]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!faces?.length) {
      return;
    }
    const weights = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_4__.uniqueFontWeights)(faces);
    const w = model.fontWeight === '' || model.fontWeight === undefined ? '' : String(model.fontWeight);
    if (w !== '' && !weights.includes(w)) {
      const nw = weights.includes('400') ? '400' : weights[0];
      const stList = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_4__.fontStylesForWeight)(faces, nw);
      onPatch({
        fontWeight: nw,
        fontStyle: stList.includes('normal') ? 'normal' : stList[0] || 'normal'
      });
    }
  }, [faces, matched?.slug, model.fontFamily, model.fontWeight, onPatch]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!faces?.length) {
      return;
    }
    const styles = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_4__.fontStylesForWeight)(faces, model.fontWeight);
    const st = model.fontStyle === '' || model.fontStyle === undefined ? '' : String(model.fontStyle);
    if (st !== '' && !styles.includes(st)) {
      onPatch({
        fontStyle: styles[0] || 'normal'
      });
    }
  }, [faces, matched?.slug, model.fontFamily, model.fontWeight, model.fontStyle, onPatch]);
  if (disW && disS) {
    return null;
  }
  const selectWeightOptions = matched?.isSystem ? systemWeightOptions : faces ? weightOptions : null;
  const selectStyleOptions = matched?.isSystem ? systemStyleOptions : faces ? styleOptions : null;
  if (selectWeightOptions && selectStyleOptions) {
    var _model$fontWeight2, _model$fontStyle;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, disW ? null : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      __nextHasNoMarginBottom: true,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font weight', 'onepress'),
      value: (_model$fontWeight2 = model.fontWeight) !== null && _model$fontWeight2 !== void 0 ? _model$fontWeight2 : '',
      options: selectWeightOptions,
      onChange: v => onPatch({
        fontWeight: v
      })
    }), disS ? null : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      __nextHasNoMarginBottom: true,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font style', 'onepress'),
      value: (_model$fontStyle = model.fontStyle) !== null && _model$fontStyle !== void 0 ? _model$fontStyle : '',
      options: selectStyleOptions,
      onChange: v => onPatch({
        fontStyle: v
      })
    }));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, disW ? null : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font weight', 'onepress'),
    value: (_model$fontWeight3 = model.fontWeight) !== null && _model$fontWeight3 !== void 0 ? _model$fontWeight3 : '',
    options: compactWeightOptions,
    onChange: v => onPatch({
      fontWeight: v
    })
  }), disS ? null : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font style', 'onepress'),
    value: (_model$fontStyle2 = model.fontStyle) !== null && _model$fontStyle2 !== void 0 ? _model$fontStyle2 : '',
    options: compactStyleOptions,
    onChange: v => onPatch({
      fontStyle: v
    })
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingGoogleFontFamilyControl.jsx"
/*!************************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingGoogleFontFamilyControl.jsx ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingGoogleFontFamilyControl: () => (/* binding */ StylingGoogleFontFamilyControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-down-small.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");

/**
 * Font family: trigger row + Popover with system fonts + virtualized Google list (API order; preview when available).
 */






/** @typedef {import('../googleFontCollection').PickerFontFamily} PickerFontFamily */

const LIST_MAX_HEIGHT = 320;
const ROW_HEIGHT = 48;
const OVERSCAN = 6;

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {(font: PickerFontFamily) => void} [props.onPickFamily] Full family (slug, fontFace, isSystem) — use when onPatch alone is not enough.
 * @param {PickerFontFamily[]} props.families
 * @param {boolean} props.loading
 * @param {Error | null} props.error
 */
function StylingGoogleFontFamilyControl({
  value,
  onPatch,
  onPickFamily,
  families,
  loading,
  error
}) {
  const [popoverOpen, setPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [popoverAnchor, setPopoverAnchor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const [scrollTop, setScrollTop] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(0);
  const triggerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  const listScrollRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (listScrollRef.current) {
      listScrollRef.current.scrollTop = 0;
    }
    setScrollTop(0);
  }, [search]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useLayoutEffect)(() => {
    if (!popoverOpen) {
      setPopoverAnchor(null);
      setSearch('');
      setScrollTop(0);
      return;
    }
    setPopoverAnchor(triggerRef.current);
  }, [popoverOpen]);
  const filtered = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (!families?.length) {
      return [];
    }
    const q = search.trim().toLowerCase();
    if (!q) {
      return families;
    }
    return families.filter(f => f.name.toLowerCase().includes(q) || f.slug.toLowerCase().includes(q) || f.fontFamily.toLowerCase().includes(q));
  }, [families, search]);
  const totalHeight = filtered.length * ROW_HEIGHT;
  const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const end = Math.min(filtered.length, Math.ceil((scrollTop + LIST_MAX_HEIGHT) / ROW_HEIGHT) + OVERSCAN);
  const visible = filtered.slice(start, end);
  const offsetY = start * ROW_HEIGHT;
  const togglePopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setPopoverOpen(o => !o), []);
  const closePopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setPopoverOpen(false), []);
  const pickFont = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {PickerFontFamily} font */font => {
    const d = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_5__.pickDefaultFace)(font);
    onPatch({
      fontFamily: font.fontFamily,
      fontWeight: d.fontWeight,
      fontStyle: d.fontStyle
    });
    onPickFamily?.(font);
    closePopover();
  }, [closePopover, onPatch, onPickFamily]);
  const onListScroll = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(e => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);
  const display = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const raw = String(value || '').trim();
    if (!raw) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default (inherit)', 'onepress');
    }
    const family = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_5__.findFamilyForModel)(families, raw);
    if (family) {
      return family.name;
    }
    return raw;
  }, [value, families]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-family-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    ref: triggerRef,
    className: "styling-font-family-trigger styling-font-family-trigger--input-like",
    "aria-expanded": popoverOpen,
    "aria-haspopup": "dialog",
    onClick: togglePopover
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "styling-font-family-trigger__value"
  }, display), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "styling-font-family-trigger__chevron",
    "aria-hidden": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
    size: 20
  }))), popoverOpen && popoverAnchor ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    anchor: popoverAnchor,
    onClose: closePopover,
    placement: "bottom",
    shift: true,
    className: "styling-font-picker-popover",
    focusOnMount: "firstElement",
    noArrow: false,
    offset: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker-popover__inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search fonts', 'onepress'),
    hideLabelFromVision: true,
    value: search,
    onChange: setSearch,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Type to filter…', 'onepress')
  }), loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__loading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "styling-font-picker__loading-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading Google Fonts…', 'onepress'))) : null, error && !loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "styling-font-picker__error",
    role: "alert"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: %s: error message */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Google Fonts could not be loaded (%s). System fonts below are still available.', 'onepress'), error.message)) : null, families?.length && filtered.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: listScrollRef,
    className: "styling-font-picker__list",
    style: {
      maxHeight: LIST_MAX_HEIGHT
    },
    onScroll: onListScroll
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__list-spacer",
    style: {
      height: totalHeight,
      position: 'relative'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__list-window",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transform: `translateY(${offsetY}px)`
    }
  }, visible.map(font => {
    const isSystem = Boolean(font.isSystem);
    const rowClass = 'styling-font-picker__row' + (isSystem ? ' styling-font-picker__row--system' : ' styling-font-picker__row--google');
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: font.slug,
      type: "button",
      className: rowClass,
      style: {
        height: ROW_HEIGHT
      },
      onClick: () => pickFont(font),
      "aria-label": isSystem ? undefined : font.name
    }, isSystem ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "styling-font-picker__name styling-font-picker__name--live",
      style: {
        fontFamily: font.fontFamily
      }
    }, font.name) : font.preview ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: "styling-font-picker__preview styling-font-picker__preview--google",
      src: font.preview,
      alt: "",
      loading: "lazy",
      decoding: "async"
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "styling-font-picker__preview styling-font-picker__preview--empty styling-font-picker__preview--google",
      "aria-hidden": true
    }));
  })))) : null, families?.length && !filtered.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "styling-font-picker__empty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts match your search.', 'onepress')) : null, !families?.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "styling-font-picker__empty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts to show.', 'onepress')) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    onClick: closePopover
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close', 'onepress'))))) : null);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingGroupPanel.jsx"
/*!***********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingGroupPanel.jsx ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingGroupPanel: () => (/* binding */ StylingGroupPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * One collapsible styling section (PanelBody) — accordion “tab” in Customizer.
 */


/**
 * @param {object} props
 * @param {string} props.title
 * @param {boolean} [props.initialOpen] — uncontrolled (ignored if `opened` + `onToggle` passed)
 * @param {boolean} [props.opened] — controlled open state
 * @param {(nextOpen: boolean) => void} [props.onToggle] — controlled toggle
 * @param {boolean} [props.lockOpen] — keep open; disable title toggle (single-group mode)
 * @param {import('react').ReactNode} props.children
 */
function StylingGroupPanel({
  title,
  initialOpen = false,
  opened,
  onToggle,
  lockOpen = false,
  children
}) {
  const controlled = typeof opened === 'boolean' && typeof onToggle === 'function';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: title,
    ...(controlled ? {
      opened,
      onToggle,
      ...(lockOpen ? {
        buttonProps: {
          disabled: true,
          'aria-disabled': true
        }
      } : {})
    } : {
      initialOpen
    })
  }, children);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingInlineEditor.jsx"
/*!*************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingInlineEditor.jsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingInlineEditor: () => (/* binding */ StylingInlineEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/settings.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _StylingAccordionPanels__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../StylingAccordionPanels */ "./src/admin/customizer/styling/StylingAccordionPanels.jsx");
/* harmony import */ var _StylingTargetElementSelect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./StylingTargetElementSelect */ "./src/admin/customizer/styling/components/StylingTargetElementSelect.jsx");
/* harmony import */ var _StylingSettingsPopover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StylingSettingsPopover */ "./src/admin/customizer/styling/components/StylingSettingsPopover.jsx");

/**
 * Inline styling editor panel (toolbar, state tabs, settings popover anchor, preset, accordions).
 */







const IconTarget = ({
  size = 24
}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: "icon icon-tabler icons-tabler-filled icon-tabler-current-location"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  stroke: "none",
  d: "M0 0h24v24H0z",
  fill: "none"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M12 1a1 1 0 0 1 1 1v1.055a9.004 9.004 0 0 1 7.946 7.945h1.054a1 1 0 0 1 0 2h-1.055a9.004 9.004 0 0 1 -7.944 7.945l-.001 1.055a1 1 0 0 1 -2 0v-1.055a9.004 9.004 0 0 1 -7.945 -7.944l-1.055 -.001a1 1 0 0 1 0 -2h1.055a9.004 9.004 0 0 1 7.945 -7.945v-1.055a1 1 0 0 1 1 -1m0 4a7 7 0 1 0 0 14a7 7 0 0 0 0 -14m0 3a4 4 0 1 1 -4 4l.005 -.2a4 4 0 0 1 3.995 -3.8"
}));

/**
 * @param {object} props
 */
function StylingInlineEditorInner({
  visibleStylingGroupCount,
  showGearButton,
  showPreviewPickButton,
  gearButtonLabel,
  lockedBaseSelector,
  editableBaseSelector,
  allowAddRemoveInStatesPopover,
  showStatesPopoverButton,
  toggleStatesPopover,
  statesPopoverOpen,
  statesPopoverAnchor,
  togglePreviewPicker,
  previewPickerActive,
  manageStatesButtonRef,
  showStateTablistBlock,
  multiple,
  multiItemAwaitingPresetTarget,
  showStateTabButtons,
  statesList,
  stateIndex,
  setStateIndex,
  onStateTabKeyDown,
  stateTabPanelId,
  getStateTabId,
  tablistVisibleForA11y,
  closeStatesPopover,
  commitActiveItem,
  editorPayload,
  previewDeviceIds,
  activeKey,
  onBaseSelectorChange,
  onItemTitleChange,
  metaBaseSelector,
  onSelectTargetPreset,
  sliceParsed,
  unknownCount,
  onPatch,
  sliceKey,
  currentText,
  onChangeText,
  families,
  localManagedFonts,
  mergedForFontSlices,
  fontFamilySource,
  fontsLoading,
  fontsError,
  stylingGroups,
  disabledFieldSet,
  onCloseEditor,
  targetElementsRegistry
}) {
  if (!editorPayload) {
    return null;
  }
  const showActionsToolbar = showGearButton || showPreviewPickButton;
  const showTablist = showStateTablistBlock && !(multiple && multiItemAwaitingPresetTarget);
  const showStickyChrome = showActionsToolbar || showTablist;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `onepress-styling-inline-editor onepress-styling-editor-popover group-count-${String(visibleStylingGroupCount)}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-styling-inline-editor__arrow",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-styling-inline-editor__arrow-fill"
  })), showStickyChrome ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "popover-header onepress-styling-inline-editor__header"
  }, showActionsToolbar ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-2 w-full justify-end pb-2 onepress-styling-editor-popover__header-tools"
  }, showGearButton ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    ref: manageStatesButtonRef,
    className: "onepress-styling-manage-states icon-btn",
    variant: "secondary",
    onClick: toggleStatesPopover,
    "aria-expanded": statesPopoverOpen,
    "aria-haspopup": "dialog",
    size: "small",
    label: gearButtonLabel,
    showTooltip: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
    size: 20
  })) : null, showPreviewPickButton ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: togglePreviewPicker,
    isPressed: previewPickerActive,
    disabled: !editableBaseSelector,
    size: "small",
    label: previewPickerActive ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Cancel picking from preview', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Pick a selector from the site preview', 'onepress'),
    showTooltip: true,
    className: "icon-btn"
  }, previewPickerActive ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
    size: 18
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(IconTarget, {
    size: 18
  })) : null) : null, showTablist ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling styling-root"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "states"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "states-toolbar flex flex gap-2 justify-between items-center"
  }, showStateTabButtons ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "state-tablist-scroll"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "state-tablist-inner  components-button-group ",
    role: "tablist",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Style states', 'onepress')
  }, statesList.map((s, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: s.key,
    id: getStateTabId(i),
    "aria-selected": i === stateIndex,
    "aria-controls": stateTabPanelId,
    tabIndex: i === stateIndex ? 0 : -1,
    variant: "unstyled",
    onClick: () => setStateIndex(i),
    onKeyDown: e => onStateTabKeyDown(e, i),
    className: `tab-button ${i === stateIndex ? ' is-active' : ''}`
  }, s.label)))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "grow",
    "aria-hidden": true
  })))) : null) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "popover-body grow styling-root onepress-styling onepress-styling-editor-popover__inner",
    role: tablistVisibleForA11y && !multiItemAwaitingPresetTarget ? 'tabpanel' : undefined,
    id: tablistVisibleForA11y && !multiItemAwaitingPresetTarget ? stateTabPanelId : undefined,
    "aria-labelledby": tablistVisibleForA11y && !multiItemAwaitingPresetTarget ? getStateTabId(stateIndex) : undefined
  }, showGearButton ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingSettingsPopover__WEBPACK_IMPORTED_MODULE_8__.StylingSettingsPopover, {
    anchor: statesPopoverAnchor,
    isOpen: statesPopoverOpen,
    onClose: closeStatesPopover,
    value: editorPayload,
    commit: commitActiveItem,
    previewDeviceIds: previewDeviceIds,
    activeStateKey: activeKey,
    setStateIndex: setStateIndex,
    allowAddRemoveStates: allowAddRemoveInStatesPopover,
    multiple: multiple,
    lockedBaseSelector: lockedBaseSelector,
    editableBaseSelector: editableBaseSelector,
    metaBaseSelector: metaBaseSelector,
    onBaseSelectorChange: onBaseSelectorChange,
    onItemTitleChange: onItemTitleChange,
    showStatesSection: showStatesPopoverButton
  }) : null, lockedBaseSelector === '' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-target-preset-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "enum-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Target Element', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingTargetElementSelect__WEBPACK_IMPORTED_MODULE_7__.StylingTargetElementSelect, {
    targetRegistry: targetElementsRegistry,
    currentSelector: metaBaseSelector,
    currentElId: typeof editorPayload?._meta?.elId === 'string' ? editorPayload._meta.elId : '',
    selectedPresetName: typeof editorPayload?._meta?.elName === 'string' ? editorPayload._meta.elName : '',
    onSelectPreset: onSelectTargetPreset,
    disabled: !editableBaseSelector
  })) : null, !multiItemAwaitingPresetTarget ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingAccordionPanels__WEBPACK_IMPORTED_MODULE_6__.StylingAccordionPanels, {
    model: sliceParsed.model,
    unknownCount: unknownCount,
    onPatch: onPatch,
    sliceKey: sliceKey,
    rawCss: currentText,
    onRawChange: onChangeText,
    families: families,
    localFontFamilies: localManagedFonts,
    faceResolveFamilies: mergedForFontSlices,
    fontFamilySource: fontFamilySource,
    fontsLoading: fontsLoading,
    fontsError: fontsError,
    stylingGroups: stylingGroups,
    disabledFieldSet: disabledFieldSet
  }) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-inline-editor__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    size: "small",
    onClick: onCloseEditor,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Close styling editor', 'onepress')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Close', 'onepress'))));
}
const StylingInlineEditor = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.memo)(StylingInlineEditorInner);

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingLocalFontFamilyControl.jsx"
/*!***********************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingLocalFontFamilyControl.jsx ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingLocalFontFamilyControl: () => (/* binding */ StylingLocalFontFamilyControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-down-small.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");

/**
 * Font family picker: same UI as Google control, list = fonts from Customizer Font manager only.
 */






/** @typedef {import('../googleFontCollection').PickerFontFamily} PickerFontFamily */

const LIST_MAX_HEIGHT = 320;
const ROW_HEIGHT = 48;
const OVERSCAN = 6;

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {(font: PickerFontFamily) => void} [props.onPickFamily]
 * @param {PickerFontFamily[]} props.families — from Font manager (may include __rowId)
 */
function StylingLocalFontFamilyControl({
  value,
  onPatch,
  onPickFamily,
  families
}) {
  const [popoverOpen, setPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [popoverAnchor, setPopoverAnchor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const [scrollTop, setScrollTop] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(0);
  const triggerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  const listScrollRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (listScrollRef.current) {
      listScrollRef.current.scrollTop = 0;
    }
    setScrollTop(0);
  }, [search]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useLayoutEffect)(() => {
    if (!popoverOpen) {
      setPopoverAnchor(null);
      setSearch('');
      setScrollTop(0);
      return;
    }
    setPopoverAnchor(triggerRef.current);
  }, [popoverOpen]);
  const filtered = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (!families?.length) {
      return [];
    }
    const q = search.trim().toLowerCase();
    if (!q) {
      return families;
    }
    return families.filter(f => f.name.toLowerCase().includes(q) || f.slug.toLowerCase().includes(q) || f.fontFamily.toLowerCase().includes(q));
  }, [families, search]);
  const totalHeight = filtered.length * ROW_HEIGHT;
  const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const end = Math.min(filtered.length, Math.ceil((scrollTop + LIST_MAX_HEIGHT) / ROW_HEIGHT) + OVERSCAN);
  const visible = filtered.slice(start, end);
  const offsetY = start * ROW_HEIGHT;
  const togglePopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setPopoverOpen(o => !o), []);
  const closePopover = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => setPopoverOpen(false), []);
  const pickFont = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(/** @param {PickerFontFamily} font */font => {
    const d = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_5__.pickDefaultFace)(font);
    onPatch({
      fontFamily: font.fontFamily,
      fontWeight: d.fontWeight,
      fontStyle: d.fontStyle
    });
    onPickFamily?.(font);
    closePopover();
  }, [closePopover, onPatch, onPickFamily]);
  const onListScroll = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(e => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);
  const display = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const raw = String(value || '').trim();
    if (!raw) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default (inherit)', 'onepress');
    }
    const family = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_5__.findFamilyForModel)(families, raw);
    if (family) {
      return family.name;
    }
    return raw;
  }, [value, families]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-family-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    ref: triggerRef,
    className: "styling-font-family-trigger styling-font-family-trigger--input-like",
    "aria-expanded": popoverOpen,
    "aria-haspopup": "dialog",
    onClick: togglePopover
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "styling-font-family-trigger__value"
  }, display), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "styling-font-family-trigger__chevron",
    "aria-hidden": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
    size: 20
  }))), popoverOpen && popoverAnchor ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    anchor: popoverAnchor,
    onClose: closePopover,
    placement: "bottom",
    shift: true,
    className: "styling-font-picker-popover",
    focusOnMount: "firstElement",
    noArrow: false,
    offset: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker-popover__inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search fonts', 'onepress'),
    hideLabelFromVision: true,
    value: search,
    onChange: setSearch,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Type to filter…', 'onepress')
  }), families?.length && filtered.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: listScrollRef,
    className: "styling-font-picker__list",
    style: {
      maxHeight: LIST_MAX_HEIGHT
    },
    onScroll: onListScroll
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__list-spacer",
    style: {
      height: totalHeight,
      position: 'relative'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__list-window",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transform: `translateY(${offsetY}px)`
    }
  }, visible.map(font => {
    const isSystem = Boolean(font.isSystem);
    const rowClass = 'styling-font-picker__row' + (isSystem ? ' styling-font-picker__row--system' : ' styling-font-picker__row--google');
    const rowKey = /** @type {{ __rowId?: string }} */font.__rowId || font.slug;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: rowKey,
      type: "button",
      className: rowClass,
      style: {
        height: ROW_HEIGHT
      },
      onClick: () => pickFont(font),
      "aria-label": isSystem ? undefined : font.name
    }, isSystem ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "styling-font-picker__name styling-font-picker__name--live",
      style: {
        fontFamily: font.fontFamily
      }
    }, font.name) : font.preview ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: "styling-font-picker__preview styling-font-picker__preview--google",
      src: font.preview,
      alt: "",
      loading: "lazy",
      decoding: "async"
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "styling-font-picker__preview styling-font-picker__preview--empty styling-font-picker__preview--google",
      "aria-hidden": true
    }));
  })))) : null, families?.length && !filtered.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "styling-font-picker__empty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts match your search.', 'onepress')) : null, !families?.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "styling-font-picker__empty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts in Font manager yet. Add fonts under Typography → Font manager.', 'onepress')) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    onClick: closePopover
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close', 'onepress'))))) : null);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingSettingsPopover.jsx"
/*!****************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingSettingsPopover.jsx ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingSettingsPopover: () => (/* binding */ StylingSettingsPopover)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stylingPopoverFocusOutside__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stylingPopoverFocusOutside */ "./src/admin/customizer/styling/stylingPopoverFocusOutside.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/drag-handle.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/settings.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);

/**
 * Popover: target (item name, base selector) + states (reorder, labels, suffixes).
 * Built-in pseudo states store per-state suffixes (e.g. :hover) combined with _meta.baseSelector when building CSS.
 * Optional `force_selector` on a state uses that full selector only (base + suffix ignored for output).
 */





function cloneValue(v) {
  return JSON.parse(JSON.stringify(v));
}

/**
 * @param {Array<Record<string, { label?: string, selector?: string }>>} entries
 * @returns {{ normal: Record<string, object> | null, rest: typeof entries }}
 */
function partitionStatesEntries(entries) {
  if (!Array.isArray(entries) || !entries.length) {
    return {
      normal: null,
      rest: []
    };
  }
  const idx = entries.findIndex(e => e && typeof e === 'object' && Object.keys(e)[0] === 'normal');
  if (idx === -1) {
    return {
      normal: null,
      rest: [...entries]
    };
  }
  const rest = entries.filter((_, i) => i !== idx);
  return {
    normal: entries[idx],
    rest
  };
}

/**
 * @param {Array<Record<string, unknown>> | undefined} entries
 */
function normalizeStatesEntriesOrder(entries) {
  if (!Array.isArray(entries) || !entries.length) {
    return [];
  }
  const {
    normal,
    rest
  } = partitionStatesEntries(entries);
  if (!normal) {
    return [...entries];
  }
  return [normal, ...rest];
}
const BUILTIN_PRESETS = [{
  key: 'hover',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Hover', 'onepress'),
  suffix: ':hover'
}, {
  key: 'focus',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Focus', 'onepress'),
  suffix: ':focus'
}, {
  key: 'active',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Active', 'onepress'),
  suffix: ':active'
}, {
  key: 'focus-visible',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Focus visible', 'onepress'),
  suffix: ':focus-visible'
}, {
  key: 'disabled',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Disabled', 'onepress'),
  suffix: ':disabled'
}, {
  key: 'visited',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Visited', 'onepress'),
  suffix: ':visited'
}];

/**
 * @param {string} raw
 * @returns {string}
 */
function sanitizeStateKey(raw) {
  let s = String(raw || '').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '');
  if (s.length > 40) {
    s = s.slice(0, 40).replace(/-+$/g, '');
  }
  return s;
}
const RESERVED_STATE_KEYS = new Set(['_meta', '_onepressstyling']);

/**
 * @param {object} props
 * @param {Element | null} props.anchor
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {Record<string, unknown>} props.value
 * @param {(next: Record<string, unknown>) => void} props.commit
 * @param {string[]} props.previewDeviceIds
 * @param {string} props.activeStateKey
 * @param {(i: number) => void} props.setStateIndex
 * @param {boolean} [props.allowAddRemoveStates] When false, fixed state list: no presets/custom add, no remove.
 * @param {boolean} [props.multiple] Multi-target control: show item name field.
 * @param {string} [props.lockedBaseSelector] Non-empty when base selector is fixed in PHP (hide field).
 * @param {boolean} [props.editableBaseSelector]
 * @param {string} [props.metaBaseSelector]
 * @param {(v: string, binding?: { elementPresetId?: string, elementPresetName?: string }) => void} [props.onBaseSelectorChange]
 * @param {(v: string) => void} [props.onItemTitleChange]
 * @param {boolean} [props.showStatesSection] When false, hide states list and add-state UI (target settings only).
 */
function StylingSettingsPopover({
  anchor,
  isOpen,
  onClose,
  value,
  commit,
  previewDeviceIds,
  activeStateKey,
  setStateIndex,
  allowAddRemoveStates = true,
  multiple = false,
  lockedBaseSelector = '',
  editableBaseSelector = true,
  metaBaseSelector = '',
  onBaseSelectorChange = () => {},
  onItemTitleChange = () => {},
  showStatesSection = true
}) {
  var _value$title;
  const [draggedRestIndex, setDraggedRestIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
  const [customKeyDraft, setCustomKeyDraft] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)('');
  const [customError, setCustomError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)('');
  /** @type {Record<string, boolean>} stateKey → row settings (selector) expanded */
  const [settingsOpenByKey, setSettingsOpenByKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(() => ({}));
  const normalizedEntries = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const raw = value && value._meta && Array.isArray(value._meta.states) ? value._meta.states : [];
    return normalizeStatesEntriesOrder(raw);
  }, [value]);
  const {
    normal: normalEntry,
    rest
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => partitionStatesEntries(normalizedEntries), [normalizedEntries]);
  const takenKeys = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    const set = new Set();
    for (const e of normalizedEntries) {
      const k = Object.keys(e || {})[0];
      if (k) {
        set.add(sanitizeStateKey(k));
      }
    }
    return set;
  }, [normalizedEntries]);
  const syncIndexForKey = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)((nextVal, key) => {
    const list = nextVal?._meta?.states;
    if (!Array.isArray(list)) {
      return;
    }
    const norm = normalizeStatesEntriesOrder(list);
    const idx = norm.findIndex(e => Object.keys(e || {})[0] === key);
    if (idx >= 0) {
      setStateIndex(idx);
    }
  }, [setStateIndex]);

  /** Persist Normal-first order if stored order differed (runs while popover is open). */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    if (!isOpen || !value?._meta?.states) {
      return;
    }
    const raw = value._meta.states;
    const norm = normalizeStatesEntriesOrder(raw);
    if (JSON.stringify(norm) === JSON.stringify(raw)) {
      return;
    }
    const next = cloneValue(value);
    next._meta.states = norm;
    commit(next);
    syncIndexForKey(next, activeStateKey);
  }, [isOpen, value, commit, activeStateKey, syncIndexForKey]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    if (!isOpen) {
      setSettingsOpenByKey({});
    }
  }, [isOpen]);
  const toggleRowSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(stateKey => {
    setSettingsOpenByKey(prev => ({
      ...prev,
      [stateKey]: !prev[stateKey]
    }));
  }, []);
  const applyNormalizedEntries = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(newNormEntries => {
    const next = cloneValue(value);
    if (!next._meta) {
      next._meta = {};
    }
    next._meta.states = newNormEntries;
    commit(next);
    syncIndexForKey(next, activeStateKey);
  }, [value, commit, activeStateKey, syncIndexForKey]);
  const onLabelChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)((globalIndex, newLabel) => {
    const next = cloneValue(value);
    const states = normalizeStatesEntriesOrder(next._meta?.states || []);
    if (!states[globalIndex]) {
      return;
    }
    const entry = states[globalIndex];
    const stateKey = Object.keys(entry)[0];
    if (stateKey === 'normal') {
      return;
    }
    const row = entry[stateKey];
    const updated = states.map((e, i) => i === globalIndex ? {
      [stateKey]: {
        ...row,
        label: newLabel
      }
    } : e);
    next._meta.states = updated;
    commit(next);
  }, [value, commit]);
  const onSelectorChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)((globalIndex, newSelector) => {
    const next = cloneValue(value);
    const states = normalizeStatesEntriesOrder(next._meta?.states || []);
    if (!states[globalIndex]) {
      return;
    }
    const entry = states[globalIndex];
    const stateKey = Object.keys(entry)[0];
    const row = entry[stateKey];
    if (!next._meta) {
      next._meta = {};
    }
    if (stateKey === 'normal') {
      const trimmed = String(newSelector !== null && newSelector !== void 0 ? newSelector : '').trim();
      next._meta.baseSelector = trimmed;
      const updated = states.map((e, i) => i === globalIndex ? {
        [stateKey]: {
          ...row,
          selector: ''
        }
      } : e);
      next._meta.states = updated;
    } else {
      const sel = String(newSelector !== null && newSelector !== void 0 ? newSelector : '').trim();
      const updated = states.map((e, i) => i === globalIndex ? {
        [stateKey]: {
          ...row,
          selector: sel
        }
      } : e);
      next._meta.states = updated;
    }
    commit(next);
  }, [value, commit]);
  const onRemoveAt = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(globalIndex => {
    const next = cloneValue(value);
    const states = normalizeStatesEntriesOrder(next._meta?.states || []);
    if (!states[globalIndex]) {
      return;
    }
    const entry = states[globalIndex];
    const stateKey = Object.keys(entry)[0];
    if (stateKey === 'normal') {
      return;
    }
    states.splice(globalIndex, 1);
    next._meta.states = states;
    delete next[stateKey];
    if (next._meta.fontSlices && typeof next._meta.fontSlices === 'object') {
      delete next._meta.fontSlices[stateKey];
    }
    commit(next);
    const keep = activeStateKey === stateKey ? 'normal' : activeStateKey;
    const idx = states.findIndex(e => Object.keys(e || {})[0] === keep);
    setStateIndex(idx >= 0 ? idx : 0);
  }, [value, commit, activeStateKey, setStateIndex]);
  const mergeOrder = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(newRest => {
    const ordered = normalEntry ? [normalEntry, ...newRest] : [...newRest];
    applyNormalizedEntries(ordered);
  }, [normalEntry, applyNormalizedEntries]);
  const moveRestItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)((from, to) => {
    if (from === to || from < 0 || to < 0) {
      return;
    }
    const copy = [...rest];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    mergeOrder(copy);
  }, [rest, mergeOrder]);
  const addState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)((stateKey, label, selector) => {
    const sk = sanitizeStateKey(stateKey);
    if (!sk || sk[0] === '_' || RESERVED_STATE_KEYS.has(sk)) {
      return false;
    }
    if (takenKeys.has(sk)) {
      return false;
    }
    const sel = String(selector || '').trim();
    const next = cloneValue(value);
    if (!next._meta) {
      next._meta = {
        baseSelector: '',
        states: []
      };
    }
    if (typeof next._meta.baseSelector !== 'string') {
      next._meta.baseSelector = '';
    }
    const cur = normalizeStatesEntriesOrder(next._meta.states || []);
    const {
      normal: n0,
      rest: r0
    } = partitionStatesEntries(cur);
    const newEntry = {
      [sk]: {
        label: label || sk,
        selector: sel
      }
    };
    const ordered = n0 ? [n0, ...r0, newEntry] : [...r0, newEntry];
    next._meta.states = ordered;
    next[sk] = {};
    for (const id of previewDeviceIds) {
      next[sk][id] = '';
    }
    commit(next);
    const idx = ordered.findIndex(e => Object.keys(e || {})[0] === sk);
    if (idx >= 0) {
      setStateIndex(idx);
    }
    return true;
  }, [value, commit, takenKeys, previewDeviceIds, setStateIndex]);
  const onAddPreset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(preset => {
    if (takenKeys.has(preset.key)) {
      return;
    }
    addState(preset.key, preset.label, preset.suffix);
  }, [takenKeys, addState]);
  const onAddCustom = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(() => {
    setCustomError('');
    const sk = sanitizeStateKey(customKeyDraft);
    if (!sk || sk[0] === '_') {
      setCustomError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enter a valid id (letters, numbers, hyphens, underscores; may not start with _).', 'onepress'));
      return;
    }
    if (RESERVED_STATE_KEYS.has(sk)) {
      setCustomError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This id is reserved.', 'onepress'));
      return;
    }
    if (takenKeys.has(sk)) {
      setCustomError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This id is already in use.', 'onepress'));
      return;
    }
    if (addState(sk, sk, '')) {
      setCustomKeyDraft('');
    }
  }, [customKeyDraft, takenKeys, addState]);
  const restGlobalIndex = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useCallback)(restIndex => normalEntry ? 1 + restIndex : restIndex, [normalEntry]);
  if (!isOpen || !anchor) {
    return null;
  }
  const normalRow = normalEntry?.normal;
  const showTargetSettings = multiple || !lockedBaseSelector;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    anchor: anchor,
    onClose: onClose,
    onFocusOutside: e => {
      if ((0,_stylingPopoverFocusOutside__WEBPACK_IMPORTED_MODULE_2__.shouldIgnoreStylingPopoverFocusOutside)(e)) {
        return;
      }
      onClose();
    },
    placement: "bottom",
    offset: 8,
    className: "onepress-styling-settings-popover",
    shift: true,
    noArrow: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-settings-popover__inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-styling-settings-popover__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Settings', 'onepress')), showTargetSettings ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-settings-popover__target-settings flex flex-col gap-3"
  }, multiple ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    __nextHasNoMarginBottom: true,
    className: "styling-item-name-field",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Item name', 'onepress'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Label shown in the list for this target.', 'onepress'),
    value: String((_value$title = value?.title) !== null && _value$title !== void 0 ? _value$title : ''),
    onChange: onItemTitleChange,
    autoComplete: "off",
    spellCheck: false
  }) : null, !lockedBaseSelector ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "field-base-selector"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    __nextHasNoMarginBottom: true,
    className: "styling-selector-field",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Base CSS selector', 'onepress'),
    help: showStatesSection ? editableBaseSelector ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Rules apply to this target. Each state can add a suffix (e.g. :hover) in its settings or below when that tab is active.', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The base selector is fixed for this control and cannot be changed here.', 'onepress') : editableBaseSelector ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Rules apply to this target. Enter the CSS selector for this item.', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('The base selector is fixed for this control and cannot be changed here.', 'onepress'),
    value: metaBaseSelector,
    onChange: onBaseSelectorChange,
    disabled: !editableBaseSelector,
    autoComplete: "off",
    spellCheck: false
  })) : null) : null, showStatesSection ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-styling-settings-popover__subtitle"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('States', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-settings-popover__list flex flex-col gap-1",
    role: "list"
  }, normalEntry ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: "normal",
    className: "onepress-styling-settings-popover__row onepress-styling-settings-popover__row--locked"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full flex justify-between items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-styling-settings-popover__drag-spacer",
    "aria-hidden": true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-settings-popover__row-main font-bold"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, normalRow?.label)))) : null, rest.map((entry, restIndex) => {
    var _row$selector;
    const stateKey = Object.keys(entry || {})[0];
    const row = stateKey ? entry[stateKey] : null;
    const label = row && row.label || stateKey;
    const gIdx = restGlobalIndex(restIndex);
    const settingsOpen = !!settingsOpenByKey[stateKey];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: stateKey,
      className: "onepress-styling-settings-popover__row",
      onDragOver: e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      },
      onDrop: e => {
        e.preventDefault();
        if (draggedRestIndex === null || draggedRestIndex === restIndex) {
          return;
        }
        moveRestItem(draggedRestIndex, restIndex);
        setDraggedRestIndex(null);
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "w-full flex justify-between items-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "onepress-styling-settings-popover__drag",
      draggable: true,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Drag to reorder', 'onepress'),
      role: "img",
      onDragStart: e => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(restIndex));
        setDraggedRestIndex(restIndex);
      },
      onDragEnd: () => setDraggedRestIndex(null)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
      size: 20
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "grow onepress-styling-settings-popover__row-main font-bold"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "onepress-styling-settings-popover__row-actions"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: "onepress-styling-settings-popover__settings-toggle",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
      variant: "tertiary",
      size: "small",
      isPressed: settingsOpen,
      "aria-expanded": settingsOpen,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('State settings', 'onepress'),
      onClick: () => toggleRowSettings(stateKey)
    }), allowAddRemoveStates ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: "onepress-styling-settings-popover__remove",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.sprintf)(/* translators: %s: state key */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Remove state %s', 'onepress'), stateKey),
      onClick: () => onRemoveAt(gIdx),
      variant: "tertiary",
      size: "small",
      isDestructive: true
    }) : null)), settingsOpen ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex flex-col gap-3 onepress-styling-settings-popover__row-settings"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      __nextHasNoMarginBottom: true,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Tab label', 'onepress'),
      value: label,
      onChange: v => onLabelChange(gIdx, v),
      autoComplete: "off"
    }), row && typeof row.force_selector === 'string' && row.force_selector.trim() !== '' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      __nextHasNoMarginBottom: true,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Fixed CSS selector', 'onepress'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This state is pinned to this full selector by the theme; base target and suffix are not combined.', 'onepress'),
      value: String(row.force_selector),
      readOnly: true,
      autoComplete: "off",
      spellCheck: false
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      __nextHasNoMarginBottom: true,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('State selector', 'onepress'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Suffix appended to the base (e.g. :hover). Leave empty to use the base only.', 'onepress'),
      value: String((_row$selector = row?.selector) !== null && _row$selector !== void 0 ? _row$selector : ''),
      onChange: v => onSelectorChange(gIdx, v),
      autoComplete: "off",
      spellCheck: false
    })) : null);
  })), allowAddRemoveStates ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-settings-popover__presets"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-styling-settings-popover__subtitle"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Add pseudo-state', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-settings-popover__preset-buttons"
  }, BUILTIN_PRESETS.map(p => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: p.key,
    variant: "secondary",
    size: "small",
    disabled: takenKeys.has(p.key),
    onClick: () => onAddPreset(p)
  }, p.label)))) : null, allowAddRemoveStates ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-settings-popover__custom"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-styling-settings-popover__subtitle"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Custom state', 'onepress')), customError ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description",
    role: "alert"
  }, customError) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-2 justify-between items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    __nextHasNoMarginBottom: true,
    value: customKeyDraft,
    onChange: v => {
      setCustomError('');
      setCustomKeyDraft(v);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('e.g. my-state', 'onepress'),
    autoComplete: "off",
    spellCheck: false
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: onAddCustom
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Add', 'onepress')))) : null) : null));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/StylingTargetElementSelect.jsx"
/*!********************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/StylingTargetElementSelect.jsx ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylingTargetElementSelect: () => (/* binding */ StylingTargetElementSelect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-down-small.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _targetElementsRegistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../targetElementsRegistry */ "./src/admin/customizer/styling/targetElementsRegistry.js");

/**
 * Hierarchical, searchable preset CSS targets (Customizer styling editor).
 */





const LIST_MAX_H = 280;

/**
 * @param {object} props
 * @param {string} props.currentSelector — active base selector
 * @param {string} [props.currentElId] — `_meta.elId` when chosen from registry
 * @param {string} [props.selectedPresetName] — `_meta.elName` (stable label in trigger)
 * @param {(preset: { selector: string, name: string, id: string }) => void} props.onSelectPreset
 * @param {boolean} [props.disabled]
 * @param {{ categories: Record<string, string>, elements: Array<{ id: string, selector: string, name: string, category: string }> }} [props.targetRegistry] — `control.params.styling_target_elements`
 */
function StylingTargetElementSelect({
  currentSelector,
  currentElId = '',
  selectedPresetName = '',
  onSelectPreset,
  disabled = false,
  targetRegistry: targetRegistryProp
}) {
  const registry = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => (0,_targetElementsRegistry__WEBPACK_IMPORTED_MODULE_5__.normalizeTargetElementsRegistry)(targetRegistryProp), [targetRegistryProp]);
  const {
    categories,
    elements
  } = registry;
  const [open, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const triggerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  const [anchor, setAnchor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const elIdStr = String(currentElId || '').trim();
  const selStr = String(currentSelector || '').trim();
  const matched = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => (0,_targetElementsRegistry__WEBPACK_IMPORTED_MODULE_5__.findMatchingTargetPreset)(currentSelector, currentElId, registry), [currentSelector, currentElId, registry]);
  const categoryOrder = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => Object.keys(categories), [categories]);
  const filtered = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return elements;
    }
    return elements.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.selector.toLowerCase().includes(q));
  }, [elements, search]);
  const grouped = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    /** @type {Map<string, typeof elements>} */
    const map = new Map();
    for (const e of filtered) {
      const c = e.category || 'other';
      if (!map.has(c)) {
        map.set(c, []);
      }
      map.get(c).push(e);
    }
    return map;
  }, [filtered]);
  const orderedCategoryKeys = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const seen = new Set(categoryOrder);
    const extra = [...grouped.keys()].filter(k => !seen.has(k)).sort();
    return [...categoryOrder, ...extra];
  }, [categoryOrder, grouped]);
  const toggle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    if (disabled) {
      return;
    }
    setOpen(o => !o);
  }, [disabled]);
  const close = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    setOpen(false);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useLayoutEffect)(() => {
    if (!open) {
      setAnchor(null);
      setSearch('');
      return;
    }
    setAnchor(triggerRef.current);
  }, [open]);
  const savedLabel = String(selectedPresetName || '').trim();
  const triggerLabel = (matched ? matched.name : '') || savedLabel || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Target Element…', 'onepress');
  if (elements.length === 0) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-target-preset"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    ref: triggerRef,
    className: "onepress-styling-target-preset__trigger styling-font-family-trigger styling-font-family-trigger--input-like",
    "aria-expanded": open,
    "aria-haspopup": "dialog",
    disabled: disabled,
    onClick: toggle
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "styling-font-family-trigger__value"
  }, triggerLabel), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "styling-font-family-trigger__chevron",
    "aria-hidden": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
    size: 20
  }))), open && anchor ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    anchor: anchor,
    onClose: close,
    placement: "bottom-start",
    shift: true,
    className: "onepress-styling-target-preset__popover styling-font-picker-popover",
    focusOnMount: "firstElement",
    noArrow: false,
    offset: 8
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker-popover__inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search targets', 'onepress'),
    hideLabelFromVision: true,
    value: search,
    onChange: setSearch,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search by name or selector…', 'onepress')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-styling-target-preset__list styling-font-picker__list",
    style: {
      maxHeight: LIST_MAX_H,
      overflowY: 'auto'
    }
  }, filtered.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "styling-font-picker__empty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No presets match your search.', 'onepress')) : orderedCategoryKeys.map(catKey => {
    const group = grouped.get(catKey);
    if (!group?.length) {
      return null;
    }
    const catLabel = categories[catKey] || catKey;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: catKey,
      className: "onepress-styling-target-preset__group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "onepress-styling-target-preset__group-title",
      role: "presentation"
    }, catLabel), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "onepress-styling-target-preset__group-list"
    }, group.map(el => {
      const idMatch = elIdStr !== '' && elIdStr === el.id;
      const selMatch = selStr !== '' && (0,_targetElementsRegistry__WEBPACK_IMPORTED_MODULE_5__.normalizeSelectorForPresetMatch)(selStr) === (0,_targetElementsRegistry__WEBPACK_IMPORTED_MODULE_5__.normalizeSelectorForPresetMatch)(el.selector);
      const isActive = idMatch || selMatch;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        key: el.id
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        type: "button",
        className: 'onepress-styling-target-preset__row' + (isActive ? ' is-active' : ''),
        onClick: () => {
          onSelectPreset({
            id: el.id,
            selector: el.selector,
            name: el.name
          });
          close();
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "onepress-styling-target-preset__row-name"
      }, el.name)));
    })));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "styling-font-picker__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    onClick: close
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close', 'onepress'))))) : null);
}

/***/ },

/***/ "./src/admin/customizer/styling/components/TextStyleFields.jsx"
/*!*********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/TextStyleFields.jsx ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextStyleFields: () => (/* binding */ TextStyleFields)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CssEnumButtonGroup */ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./StylingAlphaColorControl */ "./src/admin/customizer/styling/components/StylingAlphaColorControl.jsx");
/* harmony import */ var _StylingFontFaceSelectControls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StylingFontFaceSelectControls */ "./src/admin/customizer/styling/components/StylingFontFaceSelectControls.jsx");
/* harmony import */ var _StylingGoogleFontFamilyControl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StylingGoogleFontFamilyControl */ "./src/admin/customizer/styling/components/StylingGoogleFontFamilyControl.jsx");
/* harmony import */ var _StylingLocalFontFamilyControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./StylingLocalFontFamilyControl */ "./src/admin/customizer/styling/components/StylingLocalFontFamilyControl.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Text group fields (typography).
 */












/**
 * @param {object} props
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {import('../googleFontCollection').PickerFontFamily[]} props.families — Google catalog (picker when source is google)
 * @param {import('../googleFontCollection').PickerFontFamily[]} [props.localFontFamilies] — Font manager list (picker when source is local)
 * @param {import('../googleFontCollection').PickerFontFamily[]} [props.faceResolveFamilies] — merged local + Google for weight/style + font slices
 * @param {'google'|'local'} [props.fontFamilySource]
 * @param {boolean} [props.fontsLoading]
 * @param {Error | null} [props.fontsError]
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function TextStyleFields({
  model,
  onPatch,
  families,
  localFontFamilies,
  faceResolveFamilies,
  fontFamilySource = 'local',
  fontsLoading = false,
  fontsError = null,
  disabledFieldSet
}) {
  const googleList = families !== null && families !== void 0 ? families : (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_3__.mergePickerFamilies)(null);
  const resolveList = faceResolveFamilies !== null && faceResolveFamilies !== void 0 ? faceResolveFamilies : googleList;
  const localList = localFontFamilies !== null && localFontFamilies !== void 0 ? localFontFamilies : [];
  const loading = fontsLoading;
  const error = fontsError;
  const d = disabledFieldSet;
  const dis = key => (0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_11__.isFieldDisabled)(d, key);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_7__.StylingAlphaColorControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text color', 'onepress'),
    value: model.color || '',
    onChange: v => onPatch({
      color: v
    }),
    disabled: dis('color')
  }), dis('fontFamily') ? null : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font family', 'onepress'),
    className: "styling-text-font-family"
  }, fontFamilySource === 'local' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingLocalFontFamilyControl__WEBPACK_IMPORTED_MODULE_10__.StylingLocalFontFamilyControl, {
    value: model.fontFamily || '',
    onPatch: onPatch,
    families: localList
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingGoogleFontFamilyControl__WEBPACK_IMPORTED_MODULE_9__.StylingGoogleFontFamilyControl, {
    value: model.fontFamily || '',
    onPatch: onPatch,
    families: googleList,
    loading: loading,
    error: error
  }), fontFamilySource !== 'local' && error && !loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font family (CSS fallback)', 'onepress'),
    value: model.fontFamily || '',
    onChange: v => onPatch({
      fontFamily: v
    })
  }) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StylingFontFaceSelectControls__WEBPACK_IMPORTED_MODULE_8__.StylingFontFaceSelectControls, {
    model: model,
    onPatch: onPatch,
    families: resolveList,
    disabledFieldSet: d
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font size', 'onepress'),
    value: model.fontSize || '',
    onChange: v => onPatch({
      fontSize: v
    }),
    disabled: dis('fontSize'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__.SLIDER_PRESETS.fontSize
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Line height', 'onepress'),
    value: model.lineHeight || '',
    onChange: v => onPatch({
      lineHeight: v
    }),
    disabled: dis('lineHeight'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__.SLIDER_PRESETS.lineHeight
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_6__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Letter spacing', 'onepress'),
    value: model.letterSpacing || '',
    onChange: v => onPatch({
      letterSpacing: v
    }),
    disabled: dis('letterSpacing'),
    ..._cssUnitSlider__WEBPACK_IMPORTED_MODULE_4__.SLIDER_PRESETS.letterSpacing
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_5__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text transform', 'onepress'),
    value: model.textTransform || '',
    onChange: v => onPatch({
      textTransform: v
    }),
    disabled: dis('textTransform'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'none',
      label: 'none'
    }, {
      value: 'uppercase',
      label: 'ABC'
    }, {
      value: 'lowercase',
      label: 'abc'
    }, {
      value: 'capitalize',
      label: 'Cap'
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_5__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text decoration', 'onepress'),
    value: model.textDecoration || '',
    onChange: v => onPatch({
      textDecoration: v
    }),
    disabled: dis('textDecoration'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'none',
      label: 'none'
    }, {
      value: 'underline',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Underline', 'onepress')
    }, {
      value: 'line-through',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Line through', 'onepress')
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_5__.CssEnumButtonGroup, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text align', 'onepress'),
    value: model.textAlign || '',
    onChange: v => onPatch({
      textAlign: v
    }),
    disabled: dis('textAlign'),
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'onepress')
    }, {
      value: 'left',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left', 'onepress')
    }, {
      value: 'center',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Center', 'onepress')
    }, {
      value: 'right',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right', 'onepress')
    }, {
      value: 'justify',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Justify', 'onepress')
    }, {
      value: 'start',
      label: 'start'
    }, {
      value: 'end',
      label: 'end'
    }]
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/TrblLinkIconButton.jsx"
/*!************************************************************************!*\
  !*** ./src/admin/customizer/styling/components/TrblLinkIconButton.jsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrblLinkIconButton: () => (/* binding */ TrblLinkIconButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link-off.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link.mjs");

/**
 * Icon-only link / unlink control with tooltip (TRBL spacing, border radius corners, etc.).
 */



/**
 * @param {object} props
 * @param {boolean} props.linked
 * @param {(nextLinked: boolean) => void} props.onLinkedChange
 * @param {string} props.linkLabel — Tooltip (and aria) when unlinked: action to link
 * @param {string} props.unlinkLabel — When linked: action to unlink
 */
function TrblLinkIconButton({
  linked,
  onLinkedChange,
  linkLabel,
  unlinkLabel
}) {
  const tooltipText = linked ? unlinkLabel : linkLabel;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    text: tooltipText
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "button",
    variant: linked ? 'primary' : 'tertiary',
    size: "small",
    className: "trbl-link-toggle icon-btn",
    icon: linked ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
    label: tooltipText
    // aria-pressed={linked}
    ,
    onClick: () => onLinkedChange(!linked)
  }));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/TrblSidesField.jsx"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/TrblSidesField.jsx ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrblSidesField: () => (/* binding */ TrblSidesField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cssUnitSlider */ "./src/admin/customizer/styling/cssUnitSlider.js");
/* harmony import */ var _deriveLinkedSides__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deriveLinkedSides */ "./src/admin/customizer/styling/components/deriveLinkedSides.js");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _TrblLinkIconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TrblLinkIconButton */ "./src/admin/customizer/styling/components/TrblLinkIconButton.jsx");
/* harmony import */ var _stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../stylingDisableFields */ "./src/admin/customizer/styling/stylingDisableFields.js");

/**
 * Top / right / bottom / left text fields with optional “link all sides”.
 */








/**
 * @param {object} props
 * @param {string} props.sliceKey
 * @param {string} props.label
 * @param {Record<string, string>} props.model
 * @param {(patch: Record<string, string>) => void} props.onPatch
 * @param {{ t: string, r: string, b: string, l: string }} props.keys
 * @param {{ min: number, max: number, step: number, defaultSuffix: string }} [props.sliderPreset] — spread to each slider (default: SLIDER_PRESETS.length)
 * @param {string} [props.linkLabel]
 * @param {string} [props.unlinkLabel]
 * @param {boolean} [props.preferLinkedWhenEmpty] — when all four values are empty, show linked UI (default false)
 * @param {Set<string> | null | undefined} [props.disabledFieldSet]
 */
function resolveLinkedState(model, keyList, preferLinkedWhenEmpty) {
  const derived = (0,_deriveLinkedSides__WEBPACK_IMPORTED_MODULE_4__.deriveLinkedSides)(model, keyList);
  if (preferLinkedWhenEmpty) {
    const vals = keyList.map(k => (model[k] || '').trim());
    if (vals.every(v => !v)) {
      return true;
    }
  }
  return derived;
}
function TrblSidesField({
  sliceKey,
  label,
  model,
  onPatch,
  keys,
  sliderPreset,
  linkLabel,
  unlinkLabel,
  preferLinkedWhenEmpty = false,
  disabledFieldSet
}) {
  const preset = sliderPreset !== null && sliderPreset !== void 0 ? sliderPreset : _cssUnitSlider__WEBPACK_IMPORTED_MODULE_3__.SLIDER_PRESETS.length;
  const linkStr = linkLabel !== null && linkLabel !== void 0 ? linkLabel : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Link sides', 'onepress');
  const unlinkStr = unlinkLabel !== null && unlinkLabel !== void 0 ? unlinkLabel : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlink sides', 'onepress');
  const keyList = [keys.t, keys.r, keys.b, keys.l];
  const [linked, setLinked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => resolveLinkedState(model, keyList, preferLinkedWhenEmpty));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setLinked(resolveLinkedState(model, keyList, preferLinkedWhenEmpty));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when switching state×device
  }, [sliceKey]);
  if ((0,_stylingDisableFields__WEBPACK_IMPORTED_MODULE_7__.areAllKeysDisabled)(disabledFieldSet, keyList)) {
    return null;
  }
  const patchSide = (side, val) => {
    if (linked) {
      onPatch({
        [keys.t]: val,
        [keys.r]: val,
        [keys.b]: val,
        [keys.l]: val
      });
    } else {
      onPatch({
        [side]: val
      });
    }
  };
  const setLinkedSides = on => {
    setLinked(on);
    if (on) {
      const v = (model[keys.t] || model[keys.r] || model[keys.b] || model[keys.l] || '').trim();
      onPatch({
        [keys.t]: v,
        [keys.r]: v,
        [keys.b]: v,
        [keys.l]: v
      });
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl-block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl-head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TrblLinkIconButton__WEBPACK_IMPORTED_MODULE_6__.TrblLinkIconButton, {
    linked: linked,
    onLinkedChange: setLinkedSides,
    linkLabel: linkStr,
    unlinkLabel: unlinkStr
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "trbl"
  }, linked ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Value', 'onepress'),
    value: (model[keys.t] || model[keys.r] || model[keys.b] || model[keys.l] || '').trim(),
    onChange: v => patchSide(keys.t, v),
    ...preset
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top', 'onepress'),
    value: model[keys.t] || '',
    onChange: v => patchSide(keys.t, v),
    ...preset
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right', 'onepress'),
    value: model[keys.r] || '',
    onChange: v => patchSide(keys.r, v),
    ...preset
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom', 'onepress'),
    value: model[keys.b] || '',
    onChange: v => patchSide(keys.b, v),
    ...preset
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_5__.ResponsiveUnitSliderField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left', 'onepress'),
    value: model[keys.l] || '',
    onChange: v => patchSide(keys.l, v),
    ...preset
  }))));
}

/***/ },

/***/ "./src/admin/customizer/styling/components/deriveLinkedSides.js"
/*!**********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/deriveLinkedSides.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deriveLinkedSides: () => (/* binding */ deriveLinkedSides)
/* harmony export */ });
/**
 * True when four TRBL (or corner) values are equal and not all empty.
 *
 * @param {Record<string, string>} model
 * @param {string[]} keys
 * @returns {boolean}
 */
function deriveLinkedSides(model, keys) {
  const vals = keys.map(k => (model[k] || '').trim());
  if (vals.every(v => !v)) {
    return false;
  }
  return vals[0] === vals[1] && vals[1] === vals[2] && vals[2] === vals[3];
}

/***/ },

/***/ "./src/admin/customizer/styling/components/deviceDashicons.js"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/styling/components/deviceDashicons.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dashiconClassForDeviceId: () => (/* binding */ dashiconClassForDeviceId)
/* harmony export */ });
/**
 * Map styling device id → Dashicons class (wp-admin).
 *
 * @param {string} id
 * @returns {string}
 */
function dashiconClassForDeviceId(id) {
  switch (String(id || '').toLowerCase()) {
    case 'tablet':
      return 'dashicons-tablet';
    case 'mobile':
      return 'dashicons-smartphone';
    case 'desktop':
    default:
      return 'dashicons-desktop';
  }
}

/***/ },

/***/ "./src/admin/customizer/styling/components/index.js"
/*!**********************************************************!*\
  !*** ./src/admin/customizer/styling/components/index.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundFields: () => (/* reexport safe */ _BackgroundFields__WEBPACK_IMPORTED_MODULE_0__.BackgroundFields),
/* harmony export */   BorderOutlineFields: () => (/* reexport safe */ _BorderOutlineFields__WEBPACK_IMPORTED_MODULE_1__.BorderOutlineFields),
/* harmony export */   BorderRadiusField: () => (/* reexport safe */ _BorderRadiusField__WEBPACK_IMPORTED_MODULE_2__.BorderRadiusField),
/* harmony export */   CssEnumButtonGroup: () => (/* reexport safe */ _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__.CssEnumButtonGroup),
/* harmony export */   DeviceSwitcherChip: () => (/* reexport safe */ _DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_5__.DeviceSwitcherChip),
/* harmony export */   DisplayLayoutFields: () => (/* reexport safe */ _DisplayLayoutFields__WEBPACK_IMPORTED_MODULE_7__.DisplayLayoutFields),
/* harmony export */   FlexLayoutFields: () => (/* reexport safe */ _FlexLayoutFields__WEBPACK_IMPORTED_MODULE_8__.FlexLayoutFields),
/* harmony export */   GridLayoutFields: () => (/* reexport safe */ _GridLayoutFields__WEBPACK_IMPORTED_MODULE_9__.GridLayoutFields),
/* harmony export */   InsetSidesFields: () => (/* reexport safe */ _InsetSidesFields__WEBPACK_IMPORTED_MODULE_10__.InsetSidesFields),
/* harmony export */   PreservedPropertiesNotice: () => (/* reexport safe */ _PreservedPropertiesNotice__WEBPACK_IMPORTED_MODULE_11__.PreservedPropertiesNotice),
/* harmony export */   RawDeclarationsField: () => (/* reexport safe */ _RawDeclarationsField__WEBPACK_IMPORTED_MODULE_12__.RawDeclarationsField),
/* harmony export */   ResponsiveFieldShell: () => (/* reexport safe */ _ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_13__.ResponsiveFieldShell),
/* harmony export */   ResponsiveUnitSliderField: () => (/* reexport safe */ _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_14__.ResponsiveUnitSliderField),
/* harmony export */   ShadowFields: () => (/* reexport safe */ _ShadowFields__WEBPACK_IMPORTED_MODULE_15__.ShadowFields),
/* harmony export */   SpacingFields: () => (/* reexport safe */ _SpacingFields__WEBPACK_IMPORTED_MODULE_16__.SpacingFields),
/* harmony export */   StylingAlphaColorControl: () => (/* reexport safe */ _StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_17__.StylingAlphaColorControl),
/* harmony export */   StylingBackgroundImageControl: () => (/* reexport safe */ _StylingBackgroundImageControl__WEBPACK_IMPORTED_MODULE_18__.StylingBackgroundImageControl),
/* harmony export */   StylingDeviceProvider: () => (/* reexport safe */ _StylingDeviceContext__WEBPACK_IMPORTED_MODULE_22__.StylingDeviceProvider),
/* harmony export */   StylingFontFaceSelectControls: () => (/* reexport safe */ _StylingFontFaceSelectControls__WEBPACK_IMPORTED_MODULE_19__.StylingFontFaceSelectControls),
/* harmony export */   StylingGoogleFontFamilyControl: () => (/* reexport safe */ _StylingGoogleFontFamilyControl__WEBPACK_IMPORTED_MODULE_20__.StylingGoogleFontFamilyControl),
/* harmony export */   StylingGroupPanel: () => (/* reexport safe */ _StylingGroupPanel__WEBPACK_IMPORTED_MODULE_23__.StylingGroupPanel),
/* harmony export */   StylingInlineEditor: () => (/* reexport safe */ _StylingInlineEditor__WEBPACK_IMPORTED_MODULE_24__.StylingInlineEditor),
/* harmony export */   StylingLocalFontFamilyControl: () => (/* reexport safe */ _StylingLocalFontFamilyControl__WEBPACK_IMPORTED_MODULE_21__.StylingLocalFontFamilyControl),
/* harmony export */   StylingTargetElementSelect: () => (/* reexport safe */ _StylingTargetElementSelect__WEBPACK_IMPORTED_MODULE_25__.StylingTargetElementSelect),
/* harmony export */   TextStyleFields: () => (/* reexport safe */ _TextStyleFields__WEBPACK_IMPORTED_MODULE_26__.TextStyleFields),
/* harmony export */   TrblLinkIconButton: () => (/* reexport safe */ _TrblLinkIconButton__WEBPACK_IMPORTED_MODULE_27__.TrblLinkIconButton),
/* harmony export */   TrblSidesField: () => (/* reexport safe */ _TrblSidesField__WEBPACK_IMPORTED_MODULE_28__.TrblSidesField),
/* harmony export */   dashiconClassForDeviceId: () => (/* reexport safe */ _deviceDashicons__WEBPACK_IMPORTED_MODULE_6__.dashiconClassForDeviceId),
/* harmony export */   deriveLinkedSides: () => (/* reexport safe */ _deriveLinkedSides__WEBPACK_IMPORTED_MODULE_4__.deriveLinkedSides),
/* harmony export */   useStylingDevice: () => (/* reexport safe */ _StylingDeviceContext__WEBPACK_IMPORTED_MODULE_22__.useStylingDevice)
/* harmony export */ });
/* harmony import */ var _BackgroundFields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundFields */ "./src/admin/customizer/styling/components/BackgroundFields.jsx");
/* harmony import */ var _BorderOutlineFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BorderOutlineFields */ "./src/admin/customizer/styling/components/BorderOutlineFields.jsx");
/* harmony import */ var _BorderRadiusField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BorderRadiusField */ "./src/admin/customizer/styling/components/BorderRadiusField.jsx");
/* harmony import */ var _CssEnumButtonGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CssEnumButtonGroup */ "./src/admin/customizer/styling/components/CssEnumButtonGroup.jsx");
/* harmony import */ var _deriveLinkedSides__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deriveLinkedSides */ "./src/admin/customizer/styling/components/deriveLinkedSides.js");
/* harmony import */ var _DeviceSwitcherChip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DeviceSwitcherChip */ "./src/admin/customizer/styling/components/DeviceSwitcherChip.jsx");
/* harmony import */ var _deviceDashicons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./deviceDashicons */ "./src/admin/customizer/styling/components/deviceDashicons.js");
/* harmony import */ var _DisplayLayoutFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DisplayLayoutFields */ "./src/admin/customizer/styling/components/DisplayLayoutFields.jsx");
/* harmony import */ var _FlexLayoutFields__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FlexLayoutFields */ "./src/admin/customizer/styling/components/FlexLayoutFields.jsx");
/* harmony import */ var _GridLayoutFields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GridLayoutFields */ "./src/admin/customizer/styling/components/GridLayoutFields.jsx");
/* harmony import */ var _InsetSidesFields__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./InsetSidesFields */ "./src/admin/customizer/styling/components/InsetSidesFields.jsx");
/* harmony import */ var _PreservedPropertiesNotice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PreservedPropertiesNotice */ "./src/admin/customizer/styling/components/PreservedPropertiesNotice.jsx");
/* harmony import */ var _RawDeclarationsField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RawDeclarationsField */ "./src/admin/customizer/styling/components/RawDeclarationsField.jsx");
/* harmony import */ var _ResponsiveFieldShell__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ResponsiveFieldShell */ "./src/admin/customizer/styling/components/ResponsiveFieldShell.jsx");
/* harmony import */ var _ResponsiveUnitSliderField__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ResponsiveUnitSliderField */ "./src/admin/customizer/styling/components/ResponsiveUnitSliderField.jsx");
/* harmony import */ var _ShadowFields__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ShadowFields */ "./src/admin/customizer/styling/components/ShadowFields.jsx");
/* harmony import */ var _SpacingFields__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./SpacingFields */ "./src/admin/customizer/styling/components/SpacingFields.jsx");
/* harmony import */ var _StylingAlphaColorControl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./StylingAlphaColorControl */ "./src/admin/customizer/styling/components/StylingAlphaColorControl.jsx");
/* harmony import */ var _StylingBackgroundImageControl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./StylingBackgroundImageControl */ "./src/admin/customizer/styling/components/StylingBackgroundImageControl.jsx");
/* harmony import */ var _StylingFontFaceSelectControls__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./StylingFontFaceSelectControls */ "./src/admin/customizer/styling/components/StylingFontFaceSelectControls.jsx");
/* harmony import */ var _StylingGoogleFontFamilyControl__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./StylingGoogleFontFamilyControl */ "./src/admin/customizer/styling/components/StylingGoogleFontFamilyControl.jsx");
/* harmony import */ var _StylingLocalFontFamilyControl__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./StylingLocalFontFamilyControl */ "./src/admin/customizer/styling/components/StylingLocalFontFamilyControl.jsx");
/* harmony import */ var _StylingDeviceContext__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./StylingDeviceContext */ "./src/admin/customizer/styling/components/StylingDeviceContext.jsx");
/* harmony import */ var _StylingGroupPanel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./StylingGroupPanel */ "./src/admin/customizer/styling/components/StylingGroupPanel.jsx");
/* harmony import */ var _StylingInlineEditor__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./StylingInlineEditor */ "./src/admin/customizer/styling/components/StylingInlineEditor.jsx");
/* harmony import */ var _StylingTargetElementSelect__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./StylingTargetElementSelect */ "./src/admin/customizer/styling/components/StylingTargetElementSelect.jsx");
/* harmony import */ var _TextStyleFields__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./TextStyleFields */ "./src/admin/customizer/styling/components/TextStyleFields.jsx");
/* harmony import */ var _TrblLinkIconButton__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./TrblLinkIconButton */ "./src/admin/customizer/styling/components/TrblLinkIconButton.jsx");
/* harmony import */ var _TrblSidesField__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./TrblSidesField */ "./src/admin/customizer/styling/components/TrblSidesField.jsx");






























/***/ },

/***/ "./src/admin/customizer/styling/cssUnitSlider.js"
/*!*******************************************************!*\
  !*** ./src/admin/customizer/styling/cssUnitSlider.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SLIDER_PRESETS: () => (/* binding */ SLIDER_PRESETS),
/* harmony export */   clampNumber: () => (/* binding */ clampNumber),
/* harmony export */   formatCssSingleLengthValue: () => (/* binding */ formatCssSingleLengthValue),
/* harmony export */   parseCssSingleLengthValue: () => (/* binding */ parseCssSingleLengthValue)
/* harmony export */ });
/**
 * Parse / format a single numeric CSS length (one token, optional unit).
 * Multi-value (e.g. margin shorthand) returns null so UI falls back to plain text.
 */

const SINGLE_LEN = /^\s*(-?(?:\d+\.?\d*|\.\d+))\s*([a-z%]*)\s*$/i;

/**
 * @param {string} raw
 * @param {string} defaultSuffix e.g. 'px' or '' for unitless
 * @returns {{ num: number, suffix: string } | null}
 */
function parseCssSingleLengthValue(raw, defaultSuffix = 'px') {
  const s = String(raw).trim();
  if (s === '') {
    return {
      num: 0,
      suffix: defaultSuffix
    };
  }
  const m = s.match(SINGLE_LEN);
  if (!m) {
    return null;
  }
  const num = parseFloat(m[1]);
  if (!Number.isFinite(num)) {
    return null;
  }
  const suffix = (m[2] || defaultSuffix).trim();
  return {
    num,
    suffix: suffix || defaultSuffix
  };
}

/**
 * @param {number} num
 * @param {string} suffix
 */
function formatCssSingleLengthValue(num, suffix) {
  if (!Number.isFinite(num)) {
    return '';
  }
  const s = suffix || '';
  const rounded = Math.round(num * 10000) / 10000;
  const str = Number.isInteger(rounded) ? String(rounded) : String(rounded);
  return str + s;
}

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 */
function clampNumber(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

/** @type {Record<string, { min: number, max: number, step: number, defaultSuffix: string }>} */
const SLIDER_PRESETS = {
  fontSize: {
    min: 8,
    max: 96,
    step: 1,
    defaultSuffix: 'px'
  },
  lineHeight: {
    min: 0.5,
    max: 3.5,
    step: 0.05,
    defaultSuffix: ''
  },
  letterSpacing: {
    min: -10,
    max: 40,
    step: 0.5,
    defaultSuffix: 'px'
  },
  length: {
    min: 0,
    max: 240,
    step: 1,
    defaultSuffix: 'px'
  },
  lengthWide: {
    min: 0,
    max: 1600,
    step: 1,
    defaultSuffix: 'px'
  },
  inset: {
    min: -400,
    max: 1200,
    step: 1,
    defaultSuffix: 'px'
  },
  borderWidth: {
    min: 0,
    max: 32,
    step: 1,
    defaultSuffix: 'px'
  },
  outlineOffset: {
    min: -60,
    max: 60,
    step: 1,
    defaultSuffix: 'px'
  },
  radius: {
    min: 0,
    max: 200,
    step: 1,
    defaultSuffix: 'px'
  },
  gap: {
    min: 0,
    max: 120,
    step: 1,
    defaultSuffix: 'px'
  },
  boxShadowOffset: {
    min: -80,
    max: 80,
    step: 1,
    defaultSuffix: 'px'
  },
  boxShadowBlur: {
    min: 0,
    max: 120,
    step: 1,
    defaultSuffix: 'px'
  },
  boxShadowSpread: {
    min: -80,
    max: 80,
    step: 1,
    defaultSuffix: 'px'
  }
};

/***/ },

/***/ "./src/admin/customizer/styling/customizerPreviewDeviceSync.js"
/*!*********************************************************************!*\
  !*** ./src/admin/customizer/styling/customizerPreviewDeviceSync.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindCustomizerPreviewDevice: () => (/* binding */ bindCustomizerPreviewDevice),
/* harmony export */   getCustomizerPreviewDevice: () => (/* binding */ getCustomizerPreviewDevice),
/* harmony export */   syncCustomizerPreviewDevice: () => (/* binding */ syncCustomizerPreviewDevice)
/* harmony export */ });
/**
 * Sync styling `deviceId` with core Customizer `wp.customize.previewedDevice`
 * (footer buttons: desktop / tablet / mobile).
 */

/** @returns {any} wp.customize or null */
function getCustomizeApi() {
  return typeof wp !== 'undefined' && wp.customize ? wp.customize : null;
}

/**
 * @returns {string|null}
 */
function getCustomizerPreviewDevice() {
  const api = getCustomizeApi();
  const pd = api?.previewedDevice;
  if (!pd || typeof pd.get !== 'function') {
    return null;
  }
  const v = pd.get();
  return typeof v === 'string' ? v : null;
}

/**
 * @param {string} deviceId
 * @param {string[]} previewDeviceIds — must match `wp.customize.settings.previewableDevices` keys (core: desktop, tablet, mobile).
 */
function syncCustomizerPreviewDevice(deviceId, previewDeviceIds) {
  const api = getCustomizeApi();
  if (!api?.previewedDevice?.set || !previewDeviceIds.includes(deviceId)) {
    return;
  }
  const devices = api.settings?.previewableDevices;
  if (!devices || !Object.prototype.hasOwnProperty.call(devices, deviceId)) {
    return;
  }
  const current = api.previewedDevice.get();
  if (current !== deviceId) {
    api.previewedDevice.set(deviceId);
  }
}

/**
 * @param {(deviceId: string) => void} callback
 * @returns {() => void} unsubscribe
 */
function bindCustomizerPreviewDevice(callback) {
  const api = getCustomizeApi();
  const pd = api?.previewedDevice;
  if (!pd || typeof pd.bind !== 'function') {
    return () => {};
  }
  /** @param {string} newDevice */
  const handler = newDevice => {
    if (typeof newDevice === 'string') {
      callback(newDevice);
    }
  };
  pd.bind(handler);
  return () => {
    if (typeof pd.unbind === 'function') {
      pd.unbind(handler);
    }
  };
}

/***/ },

/***/ "./src/admin/customizer/styling/declarationForm.js"
/*!*********************************************************!*\
  !*** ./src/admin/customizer/styling/declarationForm.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSS_TO_MODEL: () => (/* binding */ CSS_TO_MODEL),
/* harmony export */   KNOWN_CSS_PROPS: () => (/* binding */ KNOWN_CSS_PROPS),
/* harmony export */   SERIALIZE_ORDER: () => (/* binding */ SERIALIZE_ORDER),
/* harmony export */   joinModelAndUnknown: () => (/* binding */ joinModelAndUnknown),
/* harmony export */   parseDeclarationForm: () => (/* binding */ parseDeclarationForm),
/* harmony export */   parseDeclarationsToMap: () => (/* binding */ parseDeclarationsToMap),
/* harmony export */   parseStyleDeclarations: () => (/* binding */ parseStyleDeclarations),
/* harmony export */   patchDeclarationForm: () => (/* binding */ patchDeclarationForm),
/* harmony export */   serializeDeclarationForm: () => (/* binding */ serializeDeclarationForm),
/* harmony export */   serializeStyleDeclarations: () => (/* binding */ serializeStyleDeclarations),
/* harmony export */   splitKnownUnknown: () => (/* binding */ splitKnownUnknown)
/* harmony export */ });
/**
 * Parse / serialize declaration strings ↔ known form model (plan: disk = one string per state×device).
 * Unknown properties are preserved in a side map and re-appended on save.
 */

/**
 * @typedef {Record<string, string>} CssMap kebab-case property → value
 */

/**
 * [modelKey, cssProperty] — output order for stable diffs.
 * Matches plan groups: Text, Background, Spacing, Border, Shadow, Display.
 */
const SERIALIZE_ORDER = [
// Text
['color', 'color'], ['fontFamily', 'font-family'], ['fontSize', 'font-size'], ['lineHeight', 'line-height'], ['fontWeight', 'font-weight'], ['fontStyle', 'font-style'], ['letterSpacing', 'letter-spacing'], ['textTransform', 'text-transform'], ['textDecoration', 'text-decoration'], ['textAlign', 'text-align'],
// Background
['backgroundColor', 'background-color'], ['backgroundImage', 'background-image'], ['backgroundSize', 'background-size'], ['backgroundRepeat', 'background-repeat'], ['backgroundPosition', 'background-position'], ['backgroundAttachment', 'background-attachment'],
// Spacing
['marginTop', 'margin-top'], ['marginRight', 'margin-right'], ['marginBottom', 'margin-bottom'], ['marginLeft', 'margin-left'], ['paddingTop', 'padding-top'], ['paddingRight', 'padding-right'], ['paddingBottom', 'padding-bottom'], ['paddingLeft', 'padding-left'],
// Border
['borderStyle', 'border-style'], ['borderTopWidth', 'border-top-width'], ['borderRightWidth', 'border-right-width'], ['borderBottomWidth', 'border-bottom-width'], ['borderLeftWidth', 'border-left-width'], ['borderColor', 'border-color'], ['borderTopLeftRadius', 'border-top-left-radius'], ['borderTopRightRadius', 'border-top-right-radius'], ['borderBottomRightRadius', 'border-bottom-right-radius'], ['borderBottomLeftRadius', 'border-bottom-left-radius'], ['outlineStyle', 'outline-style'], ['outlineWidth', 'outline-width'], ['outlineColor', 'outline-color'], ['outlineOffset', 'outline-offset'],
// Shadow
['boxShadow', 'box-shadow'],
// Display / layout
['display', 'display'], ['visibility', 'visibility'], ['opacity', 'opacity'], ['position', 'position'], ['top', 'top'], ['right', 'right'], ['bottom', 'bottom'], ['left', 'left'], ['width', 'width'], ['height', 'height'], ['minWidth', 'min-width'], ['maxWidth', 'max-width'], ['minHeight', 'min-height'], ['maxHeight', 'max-height'], ['zIndex', 'z-index'], ['overflow', 'overflow'], ['flexDirection', 'flex-direction'], ['flexWrap', 'flex-wrap'], ['justifyContent', 'justify-content'], ['alignItems', 'align-items'], ['alignContent', 'align-content'], ['gap', 'gap'], ['rowGap', 'row-gap'], ['columnGap', 'column-gap'], ['gridTemplateColumns', 'grid-template-columns'], ['gridTemplateRows', 'grid-template-rows'], ['gridAutoFlow', 'grid-auto-flow'], ['justifyItems', 'justify-items']];

/** @type {Record<string, string>} */
const CSS_TO_MODEL = Object.fromEntries(SERIALIZE_ORDER.map(([modelKey, cssProp]) => [cssProp, modelKey]));

/** @type {Set<string>} */
const KNOWN_CSS_PROPS = new Set(SERIALIZE_ORDER.map(([, css]) => css));

/**
 * @param {string} css
 * @returns {CssMap}
 */
function parseDeclarationsToMap(css) {
  const map = {};
  if (!css || typeof css !== 'string') {
    return map;
  }
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const re = /([\w-]+)\s*:\s*((?:[^;'"]|'[^']*'|"[^"]*")+?)(?=\s*;|\s*$)/gi;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const prop = m[1].trim().toLowerCase();
    let val = m[2].trim();
    val = val.replace(/\s*!important\s*$/i, '').trim();
    if (prop && val) {
      map[prop] = val;
    }
  }
  return map;
}

/**
 * @param {CssMap} map
 * @returns {{ model: Record<string, string>, unknown: CssMap }}
 */
function splitKnownUnknown(map) {
  /** @type {Record<string, string>} */
  const model = {};
  /** @type {CssMap} */
  const unknown = {};
  for (const [cssProp, val] of Object.entries(map)) {
    const mk = CSS_TO_MODEL[cssProp];
    if (mk) {
      model[mk] = val;
    } else {
      unknown[cssProp] = val;
    }
  }
  return {
    model,
    unknown
  };
}

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @returns {string}
 */
function joinModelAndUnknown(model, unknown) {
  const parts = [];
  for (const [mk, ck] of SERIALIZE_ORDER) {
    const v = model[mk];
    if (v != null && String(v).trim() !== '') {
      parts.push(`${ck}: ${String(v).trim()}`);
    }
  }
  const extraKeys = Object.keys(unknown).sort();
  for (const k of extraKeys) {
    const v = unknown[k];
    if (v != null && String(v).trim() !== '') {
      parts.push(`${k}: ${String(v).trim()}`);
    }
  }
  if (!parts.length) {
    return '';
  }
  return `${parts.join('; ')};`;
}

/**
 * @param {string} css
 * @returns {{ model: Record<string, string>, unknown: CssMap }}
 */
function parseDeclarationForm(css) {
  const map = parseDeclarationsToMap(css);
  return splitKnownUnknown(map);
}

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @returns {string}
 */
function serializeDeclarationForm(model, unknown) {
  return joinModelAndUnknown(model, unknown);
}

/** Plan name: parse declaration string → known model + unknown map. */
const parseStyleDeclarations = parseDeclarationForm;

/** Plan name: serialize known model + unknown → declaration string. */
const serializeStyleDeclarations = serializeDeclarationForm;

/**
 * @param {Record<string, string>} model
 * @param {CssMap} unknown
 * @param {Record<string, string>} patch
 * @returns {string}
 */
function patchDeclarationForm(model, unknown, patch) {
  const next = {
    ...model,
    ...patch
  };
  return serializeDeclarationForm(next, unknown);
}

/***/ },

/***/ "./src/admin/customizer/styling/googleFontCollection.js"
/*!**************************************************************!*\
  !*** ./src/admin/customizer/styling/googleFontCollection.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchGoogleFontFamilies: () => (/* binding */ fetchGoogleFontFamilies),
/* harmony export */   findFamilyForModel: () => (/* binding */ findFamilyForModel),
/* harmony export */   fontStylesForWeight: () => (/* binding */ fontStylesForWeight),
/* harmony export */   getSystemFontPresets: () => (/* binding */ getSystemFontPresets),
/* harmony export */   mergePickerFamilies: () => (/* binding */ mergePickerFamilies),
/* harmony export */   normalizeFontCollectionResponse: () => (/* binding */ normalizeFontCollectionResponse),
/* harmony export */   pickDefaultFace: () => (/* binding */ pickDefaultFace),
/* harmony export */   uniqueFontWeights: () => (/* binding */ uniqueFontWeights)
/* harmony export */ });
/**
 * Font picker: system presets + Google Fonts from REST (API order preserved).
 */

/** @typedef {{ fontWeight: string, fontStyle: string, preview: string }} GoogleFontFace */
/**
 * @typedef {{
 *   slug: string,
 *   name: string,
 *   fontFamily: string,
 *   preview: string,
 *   fontFace: GoogleFontFace[],
 *   isSystem?: boolean
 * }} PickerFontFamily
 */

/**
 * Ten common system / generic font stacks (shown first in the picker; not from Google API).
 * @type {ReadonlyArray<{ slug: string, name: string, fontFamily: string }>}
 */
const SYSTEM_FONT_DEFINITIONS = [{
  slug: 'onepress-system-ui',
  name: 'System UI',
  fontFamily: 'system-ui, sans-serif'
}, {
  slug: 'onepress-system-sans-stack',
  name: 'System sans (Apple / Segoe)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'
}, {
  slug: 'onepress-generic-sans-serif',
  name: 'Sans-serif (generic)',
  fontFamily: 'sans-serif'
}, {
  slug: 'onepress-generic-serif',
  name: 'Serif (generic)',
  fontFamily: 'serif'
}, {
  slug: 'onepress-generic-monospace',
  name: 'Monospace (generic)',
  fontFamily: 'monospace'
}, {
  slug: 'onepress-ui-monospace',
  name: 'UI monospace',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'
}, {
  slug: 'onepress-stack-georgia',
  name: 'Georgia',
  fontFamily: 'Georgia, "Times New Roman", Times, serif'
}, {
  slug: 'onepress-stack-arial',
  name: 'Arial / Helvetica',
  fontFamily: 'Arial, Helvetica, sans-serif'
}, {
  slug: 'onepress-stack-times',
  name: 'Times New Roman',
  fontFamily: '"Times New Roman", Times, serif'
}, {
  slug: 'onepress-stack-verdana',
  name: 'Verdana',
  fontFamily: 'Verdana, Geneva, sans-serif'
}];

/**
 * @returns {PickerFontFamily[]}
 */
function getSystemFontPresets() {
  return SYSTEM_FONT_DEFINITIONS.map(def => ({
    slug: def.slug,
    name: def.name,
    fontFamily: def.fontFamily,
    preview: '',
    fontFace: [],
    isSystem: true
  }));
}

/**
 * @param {PickerFontFamily[] | null | undefined} googleFamilies — REST order, unchanged
 * @returns {PickerFontFamily[]}
 */
function mergePickerFamilies(googleFamilies) {
  const g = Array.isArray(googleFamilies) ? googleFamilies : [];
  return [...getSystemFontPresets(), ...g];
}

/**
 * @param {unknown} item
 * @returns {PickerFontFamily | null}
 */
function parseFontFamilyItem(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }
  const raw = /** @type {Record<string, unknown>} */item;
  const s = /** @type {Record<string, unknown>} */
  raw.font_family_settings || raw.fontFamilySettings || raw;
  if (!s || typeof s !== 'object') {
    return null;
  }
  const slug = String(s.slug || '');
  const name = String(s.name || '');
  const fontFamily = String(s.fontFamily || '');
  if (!slug || !name || !fontFamily) {
    return null;
  }
  const fontFaceRaw = Array.isArray(s.fontFace) ? s.fontFace : [];
  const fontFace = fontFaceRaw.map(f => {
    var _face$fontWeight, _face$fontStyle;
    if (!f || typeof f !== 'object') {
      return null;
    }
    const face = /** @type {Record<string, unknown>} */f;
    return {
      fontWeight: String((_face$fontWeight = face.fontWeight) !== null && _face$fontWeight !== void 0 ? _face$fontWeight : '400'),
      fontStyle: String((_face$fontStyle = face.fontStyle) !== null && _face$fontStyle !== void 0 ? _face$fontStyle : 'normal'),
      preview: face.preview ? String(face.preview) : ''
    };
  }).filter(Boolean);
  return {
    slug,
    name,
    fontFamily,
    preview: s.preview ? String(s.preview) : '',
    fontFace: (/** @type {GoogleFontFace[]} */fontFace),
    isSystem: false
  };
}

/**
 * @param {unknown} json
 * @returns {PickerFontFamily[]}
 */
function normalizeFontCollectionResponse(json) {
  if (!json || typeof json !== 'object') {
    return [];
  }
  const raw = /** @type {Record<string, unknown>} */json.font_families;
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map(parseFontFamilyItem).filter(Boolean);
}

/**
 * Google Fonts only, same order as REST payload (no client-side reorder).
 * @returns {Promise<PickerFontFamily[]>}
 */
async function fetchGoogleFontFamilies() {
  const root = typeof window !== 'undefined' && window.wpApiSettings?.root ? window.wpApiSettings.root : `${window.location.origin}/wp-json/`;
  const base = String(root).replace(/\/?$/, '/');
  const url = `${base}wp/v2/font-collections/google-fonts?_locale=user`;
  const headers = {
    Accept: 'application/json'
  };
  if (typeof window !== 'undefined' && window.wpApiSettings?.nonce) {
    headers['X-WP-Nonce'] = window.wpApiSettings.nonce;
  }
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers
  });
  if (!response.ok) {
    throw new Error(`Font collection HTTP ${response.status}`);
  }
  const json = await response.json();
  return normalizeFontCollectionResponse(json);
}

/**
 * @param {PickerFontFamily[] | null | undefined} families
 * @param {string} value
 * @returns {PickerFontFamily | null}
 */
function findFamilyForModel(families, value) {
  if (!families?.length) {
    return null;
  }
  const v = String(value || '').trim();
  if (!v) {
    return null;
  }
  const byStack = families.find(f => f.fontFamily === v);
  if (byStack) {
    return byStack;
  }
  const first = v.split(',')[0].trim().replace(/^["']+|["']+$/g, '').toLowerCase();
  return families.find(f => f.name.toLowerCase() === first) || null;
}

/**
 * @param {GoogleFontFace[]} faces
 * @returns {string[]}
 */
function uniqueFontWeights(faces) {
  const weights = [...new Set(faces.map(f => {
    var _f$fontWeight;
    return String((_f$fontWeight = f.fontWeight) !== null && _f$fontWeight !== void 0 ? _f$fontWeight : '400');
  }))];
  return weights.sort((a, b) => {
    const na = Number.parseInt(a, 10);
    const nb = Number.parseInt(b, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) {
      return na - nb;
    }
    if (!Number.isNaN(na)) {
      return -1;
    }
    if (!Number.isNaN(nb)) {
      return 1;
    }
    return a.localeCompare(b);
  });
}

/**
 * @param {GoogleFontFace[]} faces
 * @param {string} weight
 * @returns {string[]}
 */
function fontStylesForWeight(faces, weight) {
  const w = weight === '' || weight === undefined ? null : String(weight);
  const subset = w === null ? faces : faces.filter(f => String(f.fontWeight) === w);
  const styles = [...new Set(subset.map(f => String(f.fontStyle || 'normal')))];
  return styles.sort((a, b) => a.localeCompare(b));
}

/**
 * @param {PickerFontFamily} family
 * @returns {{ fontWeight: string, fontStyle: string }}
 */
function pickDefaultFace(family) {
  if (family.isSystem) {
    return {
      fontWeight: '',
      fontStyle: ''
    };
  }
  const faces = family.fontFace || [];
  if (!faces.length) {
    return {
      fontWeight: '400',
      fontStyle: 'normal'
    };
  }
  const preferred = faces.find(f => String(f.fontWeight) === '400' && String(f.fontStyle) === 'normal');
  const face = preferred || faces[0];
  return {
    fontWeight: String(face.fontWeight),
    fontStyle: String(face.fontStyle)
  };
}

/***/ },

/***/ "./src/admin/customizer/styling/stylingBackgroundImageUtils.js"
/*!*********************************************************************!*\
  !*** ./src/admin/customizer/styling/stylingBackgroundImageUtils.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractUrlFromBackgroundImage: () => (/* binding */ extractUrlFromBackgroundImage),
/* harmony export */   focalToBackgroundPosition: () => (/* binding */ focalToBackgroundPosition),
/* harmony export */   formatBackgroundImageFromUrl: () => (/* binding */ formatBackgroundImageFromUrl),
/* harmony export */   parseBackgroundPositionToFocal: () => (/* binding */ parseBackgroundPositionToFocal)
/* harmony export */ });
/**
 * Helpers for background-image URL ↔ CSS and focal point ↔ background-position.
 */

/**
 * @param {number} n
 * @returns {number}
 */
function clamp01(n) {
  if (Number.isNaN(n)) {
    return 0.5;
  }
  return Math.min(1, Math.max(0, n));
}

/**
 * First url(...) inside a background-image declaration, or ''.
 *
 * @param {string} raw
 * @returns {string}
 */
function extractUrlFromBackgroundImage(raw) {
  const s = String(raw || '').trim();
  if (!s || /^none$/i.test(s)) {
    return '';
  }
  const lower = s.toLowerCase();
  const start = lower.indexOf('url(');
  if (start === -1) {
    return '';
  }
  let inner = s.slice(start + 4).trim();
  if (inner.startsWith('"')) {
    const end = inner.indexOf('"', 1);
    return end === -1 ? '' : inner.slice(1, end);
  }
  if (inner.startsWith("'")) {
    const end = inner.indexOf("'", 1);
    return end === -1 ? '' : inner.slice(1, end);
  }
  const endParen = inner.indexOf(')');
  return (endParen === -1 ? inner : inner.slice(0, endParen)).trim();
}

/**
 * @param {string} url
 * @returns {string}
 */
function formatBackgroundImageFromUrl(url) {
  const u = String(url || '').trim();
  if (!u) {
    return '';
  }
  const escaped = u.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `url("${escaped}")`;
}

/**
 * Parse background-position into focal 0–1 (only percentage pairs; else center).
 *
 * @param {string} pos
 * @returns {{ x: number, y: number }}
 */
function parseBackgroundPositionToFocal(pos) {
  const s = String(pos || '').trim();
  if (!s) {
    return {
      x: 0.5,
      y: 0.5
    };
  }
  const m = /^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/i.exec(s.replace(/\s+/g, ' '));
  if (m) {
    return {
      x: clamp01(Number.parseFloat(m[1]) / 100),
      y: clamp01(Number.parseFloat(m[2]) / 100)
    };
  }
  return {
    x: 0.5,
    y: 0.5
  };
}

/**
 * @param {{ x: number, y: number }} fp
 * @returns {string}
 */
function focalToBackgroundPosition(fp) {
  const x = Math.round(fp.x * 100 * 100) / 100;
  const y = Math.round(fp.y * 100 * 100) / 100;
  return `${x}% ${y}%`;
}

/***/ },

/***/ "./src/admin/customizer/styling/stylingDisableFields.js"
/*!**************************************************************!*\
  !*** ./src/admin/customizer/styling/stylingDisableFields.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   areAllKeysDisabled: () => (/* binding */ areAllKeysDisabled),
/* harmony export */   buildDisabledFieldSet: () => (/* binding */ buildDisabledFieldSet),
/* harmony export */   disableFieldTokenToModelKey: () => (/* binding */ disableFieldTokenToModelKey),
/* harmony export */   isFieldDisabled: () => (/* binding */ isFieldDisabled)
/* harmony export */ });
/**
 * `control.params.disable_fields` (PHP): hide or skip styling UI fields.
 * Tokens are normalized in PHP with sanitize_key (lowercase, a-z0-9_-).
 * Use model camelCase keys (font_family → fontFamily) or composite aliases below.
 */

/** @type {Record<string, string[]>} keys: lowercase with underscores */
const COMPOSITE_FIELDS = {
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  border_width: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  border_radius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  outline: ['outlineStyle', 'outlineWidth', 'outlineColor', 'outlineOffset'],
  font_face: ['fontWeight', 'fontStyle'],
  inset: ['top', 'right', 'bottom', 'left'],
  background_type: ['__onepressBgType'],
  flex_layout: ['flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent', 'gap', 'rowGap', 'columnGap'],
  grid_layout: ['gridTemplateColumns', 'gridTemplateRows', 'gridAutoFlow', 'justifyItems', 'gap'],
  box_shadow: ['boxShadow'],
  raw: ['__onepressRawDeclarations'],
  custom_declarations: ['__onepressRawDeclarations']
};

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeCompositeKey(raw) {
  return String(raw || '').trim().toLowerCase().replace(/-/g, '_');
}

/**
 * @param {string} raw user token (may be font_family, fontFamily, etc.)
 * @returns {string} model property key
 */
function disableFieldTokenToModelKey(raw) {
  const t = String(raw || '').trim();
  if (!t) {
    return '';
  }
  if (/[_-]/.test(t)) {
    return t.replace(/_([a-zA-Z0-9])/g, (_, c) => c.toUpperCase()).replace(/-([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
  }
  return t;
}

/**
 * @param {unknown} raw from Customizer JSON
 * @returns {Set<string>}
 */
function buildDisabledFieldSet(raw) {
  const set = new Set();
  if (!Array.isArray(raw)) {
    return set;
  }
  for (const item of raw) {
    const norm = normalizeCompositeKey(item);
    if (!norm) {
      continue;
    }
    const expanded = COMPOSITE_FIELDS[norm];
    if (expanded) {
      expanded.forEach(k => set.add(k));
    } else {
      const key = disableFieldTokenToModelKey(item);
      if (key) {
        set.add(key);
      }
    }
  }
  return set;
}

/**
 * @param {Set<string> | null | undefined} set
 * @param {string} modelKey
 * @returns {boolean}
 */
function isFieldDisabled(set, modelKey) {
  return Boolean(set && modelKey && set.has(modelKey));
}

/**
 * @param {Set<string> | null | undefined} set
 * @param {string[]} modelKeys
 * @returns {boolean}
 */
function areAllKeysDisabled(set, modelKeys) {
  if (!set || !modelKeys.length) {
    return false;
  }
  return modelKeys.every(k => set.has(k));
}

/***/ },

/***/ "./src/admin/customizer/styling/stylingGoogleFonts.js"
/*!************************************************************!*\
  !*** ./src/admin/customizer/styling/stylingGoogleFonts.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildGoogleFontsCss2Href: () => (/* binding */ buildGoogleFontsCss2Href),
/* harmony export */   collectGoogleFontAxesFromFontManagerItems: () => (/* binding */ collectGoogleFontAxesFromFontManagerItems),
/* harmony export */   collectGoogleFontAxesFromFontManagerSettingRaw: () => (/* binding */ collectGoogleFontAxesFromFontManagerSettingRaw),
/* harmony export */   collectMergedGoogleFontAxes: () => (/* binding */ collectMergedGoogleFontAxes),
/* harmony export */   collectMergedGoogleFontAxesFromFontManagerSettings: () => (/* binding */ collectMergedGoogleFontAxesFromFontManagerSettings),
/* harmony export */   fontManagerItemsToGoogleAxesPlainObject: () => (/* binding */ fontManagerItemsToGoogleAxesPlainObject),
/* harmony export */   googleAxisPairFromSlice: () => (/* binding */ googleAxisPairFromSlice),
/* harmony export */   mergeGoogleFontAxesFontManagerPriority: () => (/* binding */ mergeGoogleFontAxesFontManagerPriority),
/* harmony export */   mergeGoogleFontAxesInto: () => (/* binding */ mergeGoogleFontAxesInto),
/* harmony export */   normalizeFontWeightForGoogle: () => (/* binding */ normalizeFontWeightForGoogle),
/* harmony export */   normalizeItalForGoogle: () => (/* binding */ normalizeItalForGoogle),
/* harmony export */   rebuildFontSlicesInValue: () => (/* binding */ rebuildFontSlicesInValue)
/* harmony export */ });
/* harmony import */ var _declarationForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarationForm */ "./src/admin/customizer/styling/declarationForm.js");
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");
/* harmony import */ var _font_manager_fontManagerModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../font-manager/fontManagerModel */ "./src/admin/customizer/font-manager/fontManagerModel.js");
/* harmony import */ var _font_manager_fontManagerGoogleCss2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../font-manager/fontManagerGoogleCss2 */ "./src/admin/customizer/font-manager/fontManagerGoogleCss2.js");
/**
 * _meta.fontSlices + merged Google Fonts CSS2 URLs (preview + PHP mirror).
 * Font manager families override styling axis sets for the same Google display name.
 */





/** @typedef {{ source: string, slug: string, family: string }} FontSliceMeta */

/**
 * @param {string} weight
 * @returns {string} numeric 100–900 for Google axis
 */
function normalizeFontWeightForGoogle(weight) {
  const w = String(weight !== null && weight !== void 0 ? weight : '').trim().toLowerCase();
  if (w === '' || w === 'inherit') {
    return '400';
  }
  if (w === 'normal') {
    return '400';
  }
  if (w === 'bold') {
    return '700';
  }
  if (w === 'bolder') {
    return '700';
  }
  if (w === 'lighter') {
    return '300';
  }
  if (/^\d{3}$/.test(w)) {
    return w;
  }
  return '400';
}

/**
 * @param {string} style
 * @returns {'0'|'1'}
 */
function normalizeItalForGoogle(style) {
  const s = String(style !== null && style !== void 0 ? style : '').trim().toLowerCase();
  if (s === 'italic' || s === 'oblique') {
    return '1';
  }
  return '0';
}

/**
 * @param {string} declarations
 * @param {FontSliceMeta} sliceMeta
 * @returns {string | null} "ital,wght" pair e.g. "0,400"
 */
function googleAxisPairFromSlice(declarations, sliceMeta) {
  if (!sliceMeta || sliceMeta.source !== 'google' || !String(sliceMeta.family || '').trim()) {
    return null;
  }
  const {
    model
  } = (0,_declarationForm__WEBPACK_IMPORTED_MODULE_0__.parseDeclarationForm)(typeof declarations === 'string' ? declarations : '');
  const ital = normalizeItalForGoogle(model.fontStyle);
  const wght = normalizeFontWeightForGoogle(model.fontWeight);
  return `${ital},${wght}`;
}

/**
 * Walk styling JSON and fill `_meta.fontSlices` from declaration strings + font catalog.
 *
 * @param {Record<string, unknown>} value
 * @param {import('./googleFontCollection').PickerFontFamily[] | null | undefined} families
 */
function rebuildFontSlicesInValue(value, families) {
  if (!value || typeof value !== 'object') {
    return;
  }
  if (Array.isArray(value.items) && value.items.length) {
    for (const item of value.items) {
      rebuildFontSlicesInValue(item, families);
    }
    return;
  }
  if (!value._meta || !Array.isArray(value._meta.states)) {
    return;
  }
  /** @type {Record<string, Record<string, FontSliceMeta>>} */
  const fontSlices = {};
  for (const entry of value._meta.states) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const keys = Object.keys(entry);
    if (keys.length !== 1) {
      continue;
    }
    const stateKey = keys[0];
    const slice = value[stateKey];
    if (!slice || typeof slice !== 'object' || Array.isArray(slice)) {
      continue;
    }
    for (const deviceId of Object.keys(slice)) {
      const raw = slice[deviceId];
      if (typeof raw !== 'string') {
        continue;
      }
      const {
        model
      } = (0,_declarationForm__WEBPACK_IMPORTED_MODULE_0__.parseDeclarationForm)(raw);
      const ff = String(model.fontFamily || '').trim();
      if (!ff) {
        continue;
      }
      const fam = (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_1__.findFamilyForModel)(families, ff);
      if (!fam) {
        fontSlices[stateKey] = fontSlices[stateKey] || {};
        fontSlices[stateKey][deviceId] = {
          source: 'custom',
          slug: '',
          family: ''
        };
        continue;
      }
      fontSlices[stateKey] = fontSlices[stateKey] || {};
      if (fam.isSystem) {
        fontSlices[stateKey][deviceId] = {
          source: 'system',
          slug: fam.slug,
          family: fam.name
        };
      } else {
        fontSlices[stateKey][deviceId] = {
          source: 'google',
          slug: fam.slug,
          family: fam.name
        };
      }
    }
  }
  const nextMeta = {
    ...value._meta
  };
  if (Object.keys(fontSlices).length === 0) {
    delete nextMeta.fontSlices;
  } else {
    nextMeta.fontSlices = fontSlices;
  }
  value._meta = nextMeta;
}

/**
 * @param {Map<string, Set<string>>} acc
 * @param {Record<string, unknown> | null | undefined} value
 */
function mergeGoogleFontAxesInto(acc, value) {
  if (!value || typeof value !== 'object') {
    return;
  }
  if (Array.isArray(value.items) && value.items.length) {
    for (const item of value.items) {
      mergeGoogleFontAxesInto(acc, item);
    }
    return;
  }
  if (!value._meta || !Array.isArray(value._meta.states)) {
    return;
  }
  const fontSlices = value._meta.fontSlices;
  if (!fontSlices || typeof fontSlices !== 'object') {
    return;
  }
  for (const entry of value._meta.states) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const keys = Object.keys(entry);
    if (keys.length !== 1) {
      continue;
    }
    const stateKey = keys[0];
    const slice = value[stateKey];
    if (!slice || typeof slice !== 'object') {
      continue;
    }
    const perDevice = fontSlices[stateKey];
    if (!perDevice || typeof perDevice !== 'object') {
      continue;
    }
    for (const deviceId of Object.keys(perDevice)) {
      const meta = perDevice[deviceId];
      if (!meta || meta.source !== 'google' || !String(meta.family || '').trim()) {
        continue;
      }
      const decl = typeof slice[deviceId] === 'string' ? slice[deviceId] : '';
      const pair = googleAxisPairFromSlice(decl, meta);
      if (!pair) {
        continue;
      }
      const family = String(meta.family).trim();
      if (!acc.has(family)) {
        acc.set(family, new Set());
      }
      acc.get(family).add(pair);
    }
  }
}

/**
 * @param {Iterable<Record<string, unknown>>} values
 * @returns {Map<string, Set<string>>}
 */
function collectMergedGoogleFontAxes(values) {
  const acc = new Map();
  for (const v of values) {
    mergeGoogleFontAxesInto(acc, v);
  }
  return acc;
}

/**
 * @param {unknown[]} items Font manager `items` rows
 * @returns {Map<string, Set<string>>}
 */
function collectGoogleFontAxesFromFontManagerItems(items) {
  const acc = new Map();
  if (!Array.isArray(items)) {
    return acc;
  }
  for (const row of items) {
    const item = (0,_font_manager_fontManagerModel__WEBPACK_IMPORTED_MODULE_2__.normalizeFontManagerItem)(row);
    if (!item.isGoogleFamily) {
      continue;
    }
    const fam = String(item.googleName || '').trim();
    if (!fam) {
      continue;
    }
    const rawVars = Array.isArray(item.variations) ? item.variations : [];
    const vars = rawVars.map(p => String(p).trim()).filter(_font_manager_fontManagerGoogleCss2__WEBPACK_IMPORTED_MODULE_3__.isValidFontManagerVariationPair);
    const useVars = vars.length ? vars : ['0,400'];
    if (!acc.has(fam)) {
      acc.set(fam, new Set());
    }
    const set = acc.get(fam);
    for (const v of useVars) {
      set.add(v);
    }
  }
  return acc;
}

/**
 * Google display name → axis pairs from font manager JSON (all registered items).
 *
 * @param {unknown} raw theme_mod get() string or object
 * @returns {Map<string, Set<string>>}
 */
function collectGoogleFontAxesFromFontManagerSettingRaw(raw) {
  const parsed = (0,_font_manager_fontManagerModel__WEBPACK_IMPORTED_MODULE_2__.parseFontManagerSetting)(raw);
  return collectGoogleFontAxesFromFontManagerItems(parsed?.items || []);
}

/**
 * Plain object for postMessage (family → axis pairs).
 *
 * @param {unknown[]} items
 * @returns {Record<string, string[]>}
 */
function fontManagerItemsToGoogleAxesPlainObject(items) {
  const map = collectGoogleFontAxesFromFontManagerItems(items);
  /** @type {Record<string, string[]>} */
  const o = {};
  for (const [fam, set] of map) {
    o[fam] = [...set].sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true
    }));
  }
  return o;
}

/**
 * Merge axes from several font manager theme_mods (union per family).
 *
 * @param {*} api wp.customize
 * @param {string[]} fontManagerSettingIds
 * @returns {Map<string, Set<string>>}
 */
/**
 * @param {Map<string, Set<string>>} into
 * @param {Map<string, Set<string>>} partial
 */
function mergeGoogleAxesMaps(into, partial) {
  for (const [fam, set] of partial) {
    if (!into.has(fam)) {
      into.set(fam, new Set());
    }
    const target = into.get(fam);
    for (const p of set) {
      target.add(p);
    }
  }
}

/**
 * @param {*} api wp.customize
 * @param {string[]} fontManagerSettingIds
 * @param {Record<string, Map<string, Set<string>>> | null | undefined} liveBySetting — optional unsaved draft axes per setting id
 */
function collectMergedGoogleFontAxesFromFontManagerSettings(api, fontManagerSettingIds, liveBySetting) {
  const merged = new Map();
  for (const id of fontManagerSettingIds) {
    const live = liveBySetting && liveBySetting[id];
    if (live && live.size) {
      mergeGoogleAxesMaps(merged, live);
      continue;
    }
    try {
      const v = api(id);
      if (!v || typeof v.get !== 'function') {
        continue;
      }
      const partial = collectGoogleFontAxesFromFontManagerSettingRaw(v.get());
      mergeGoogleAxesMaps(merged, partial);
    } catch {
      continue;
    }
  }
  return merged;
}

/**
 * Styling-derived axes first; for every family in fontManagerMap, replace with font manager’s full variant set.
 *
 * @param {Map<string, Set<string>>} stylingMap
 * @param {Map<string, Set<string>>} fontManagerMap
 * @returns {Map<string, Set<string>>}
 */
function mergeGoogleFontAxesFontManagerPriority(stylingMap, fontManagerMap) {
  const out = new Map(stylingMap);
  for (const [fam, set] of fontManagerMap) {
    out.set(fam, new Set(set));
  }
  return out;
}

/**
 * @param {Map<string, Set<string>>} merged
 * @returns {string}
 */
function buildGoogleFontsCss2Href(merged) {
  if (!merged || merged.size === 0) {
    return '';
  }
  const families = [...merged.keys()].sort((a, b) => a.localeCompare(b));
  const parts = [];
  for (const name of families) {
    const set = merged.get(name);
    const pairs = [...set].sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    }));
    const enc = encodeURIComponent(name).replace(/%20/g, '+');
    parts.push(`family=${enc}:ital,wght@${pairs.join(';')}`);
  }
  return `https://fonts.googleapis.com/css2?${parts.join('&')}&display=swap`;
}

/***/ },

/***/ "./src/admin/customizer/styling/stylingPopoverFocusOutside.js"
/*!********************************************************************!*\
  !*** ./src/admin/customizer/styling/stylingPopoverFocusOutside.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shouldIgnoreStylingPopoverFocusOutside: () => (/* binding */ shouldIgnoreStylingPopoverFocusOutside)
/* harmony export */ });
/**
 * wp.media renders a `.media-modal` outside the Customizer/React tree. Popover
 * `useFocusOutside` treats focus moving there as "outside" and would close.
 *
 * @param {import('react').SyntheticEvent} event Blur/focus-outside event (persisted).
 * @returns {boolean}
 */
function shouldIgnoreStylingPopoverFocusOutside(event) {
  const rt = event && 'relatedTarget' in event ? event.relatedTarget : null;
  if (rt instanceof HTMLElement && typeof rt.closest === 'function' && rt.closest('.media-modal')) {
    return true;
  }
  if (typeof document !== 'undefined') {
    const ae = document.activeElement;
    if (ae instanceof HTMLElement && typeof ae.closest === 'function' && ae.closest('.media-modal')) {
      return true;
    }
  }
  return false;
}

/***/ },

/***/ "./src/admin/customizer/styling/stylingStatesPolicy.js"
/*!*************************************************************!*\
  !*** ./src/admin/customizer/styling/stylingStatesPolicy.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFixedStatesTemplate: () => (/* binding */ getFixedStatesTemplate),
/* harmony export */   getStatesStructureMode: () => (/* binding */ getStatesStructureMode),
/* harmony export */   normalizeSingleStylingPayload: () => (/* binding */ normalizeSingleStylingPayload),
/* harmony export */   normalizeStylingRootForStatesPolicy: () => (/* binding */ normalizeStylingRootForStatesPolicy)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buildStylingCss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buildStylingCss */ "./src/admin/customizer/styling/buildStylingCss.js");
/**
 * `styling_states` control option: normalize payloads and derive UI mode.
 *
 * - `'all'`: full states UI (add custom / presets).
 * - `false`: only `normal`, hide state tabs in the editor.
 * - `array`: fixed state keys from template; no add/remove structure.
 */



function cloneValue(v) {
  return JSON.parse(JSON.stringify(v));
}

/**
 * @param {unknown} raw
 * @returns {'all' | 'fixed' | 'normal-only'}
 */
function getStatesStructureMode(raw) {
  if (raw === false) {
    return 'normal-only';
  }
  if (Array.isArray(raw) && raw.length) {
    return 'fixed';
  }
  return 'all';
}

/**
 * @param {unknown} raw
 * @returns {object[] | null} template for `fixed` mode
 */
function getFixedStatesTemplate(raw) {
  if (Array.isArray(raw) && raw.length) {
    return cloneValue(raw);
  }
  return null;
}

/**
 * @param {Record<string, unknown>} payload
 * @param {string[]} previewDeviceIds
 */
function coerceToNormalOnly(payload, previewDeviceIds) {
  const next = cloneValue(payload);
  const normalSlice = next.normal && typeof next.normal === 'object' && !Array.isArray(next.normal) ? next.normal : {};
  next._meta = typeof next._meta === 'object' && next._meta !== null ? next._meta : {};
  next._meta.states = [{
    normal: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Normal', 'onepress'),
      selector: ''
    }
  }];
  next.normal = {};
  for (const id of previewDeviceIds) {
    next.normal[id] = normalSlice[id] != null ? String(normalSlice[id]) : '';
  }
  const rootKeys = Object.keys(next);
  for (const key of rootKeys) {
    if (key === '_meta' || key === '_onepressStyling' || key === 'normal') {
      continue;
    }
    if (typeof next[key] === 'object' && next[key] !== null && !Array.isArray(next[key])) {
      delete next[key];
    }
  }
  if (next._meta.fontSlices && typeof next._meta.fontSlices === 'object') {
    const fs = {};
    if (next._meta.fontSlices.normal) {
      fs.normal = next._meta.fontSlices.normal;
    }
    if (Object.keys(fs).length) {
      next._meta.fontSlices = fs;
    } else {
      delete next._meta.fontSlices;
    }
  }
  return next;
}

/**
 * @param {Record<string, unknown>} payload
 * @param {object[]} template
 * @param {string[]} previewDeviceIds
 * @param {string} [registryBaseForForce] When set (e.g. PHP `base_selector`), each state gets `force_selector` = explicit template `force_selector` or base + template suffix.
 */
function coerceToFixedStates(payload, template, previewDeviceIds, registryBaseForForce = '') {
  const next = cloneValue(payload);
  next._meta = typeof next._meta === 'object' && next._meta !== null ? next._meta : {};
  const existingStates = Array.isArray(next._meta.states) ? next._meta.states : [];
  /** @type {Record<string, { label?: string, selector?: string }>} */
  const byKey = {};
  for (const e of existingStates) {
    if (!e || typeof e !== 'object') {
      continue;
    }
    const k = Object.keys(e)[0];
    if (k) {
      byKey[k] = /** @type {{ label?: string, selector?: string }} */e[k];
    }
  }
  const newStates = [];
  const allowed = new Set();
  for (const entry of template) {
    var _tmpl$selector;
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const keys = Object.keys(entry);
    if (keys.length !== 1) {
      continue;
    }
    const k = keys[0];
    const tmpl = entry[k];
    const prev = byKey[k] || {};
    allowed.add(k);
    const baseTrim = typeof registryBaseForForce === 'string' ? registryBaseForForce.trim() : '';
    const explicitRaw = tmpl && typeof tmpl.force_selector === 'string' ? tmpl.force_selector : '';
    const explicit = explicitRaw.trim();
    const tmplSuffix = tmpl && tmpl.selector != null ? String(tmpl.selector) : '';
    const row = {
      label: typeof prev.label === 'string' && prev.label !== '' ? prev.label : String(tmpl?.label || k),
      selector: typeof prev.selector === 'string' ? prev.selector : String((_tmpl$selector = tmpl?.selector) !== null && _tmpl$selector !== void 0 ? _tmpl$selector : '')
    };
    if (explicit !== '') {
      row.force_selector = explicitRaw.trim();
    } else if (baseTrim !== '') {
      const composed = (0,_buildStylingCss__WEBPACK_IMPORTED_MODULE_1__.composeStylingFullSelector)(baseTrim, tmplSuffix);
      if (composed !== '') {
        row.force_selector = composed;
      }
    }
    newStates.push({
      [k]: row
    });
    if (!next[k] || typeof next[k] !== 'object' || Array.isArray(next[k])) {
      next[k] = {};
    }
    for (const id of previewDeviceIds) {
      if (next[k][id] == null) {
        next[k][id] = '';
      }
    }
  }
  next._meta.states = newStates;
  for (const key of Object.keys(next)) {
    if (key === '_meta' || key === '_onepressStyling') {
      continue;
    }
    if (!allowed.has(key) && typeof next[key] === 'object' && next[key] !== null && !Array.isArray(next[key])) {
      delete next[key];
    }
  }
  if (next._meta.fontSlices && typeof next._meta.fontSlices === 'object') {
    const fs = {};
    for (const k of allowed) {
      if (next._meta.fontSlices[k]) {
        fs[k] = next._meta.fontSlices[k];
      }
    }
    if (Object.keys(fs).length) {
      next._meta.fontSlices = fs;
    } else {
      delete next._meta.fontSlices;
    }
  }
  return next;
}

/**
 * @param {Record<string, unknown>} item
 * @param {'all' | 'fixed' | 'normal-only'} mode
 * @param {object[] | null} fixedTemplate
 * @param {string[]} previewDeviceIds
 * @param {string} [registryBaseForForce]
 */
function normalizeSingleStylingPayload(item, mode, fixedTemplate, previewDeviceIds, registryBaseForForce = '') {
  if (!item || typeof item !== 'object') {
    return item;
  }
  if (mode === 'normal-only') {
    return coerceToNormalOnly(item, previewDeviceIds);
  }
  if (mode === 'fixed' && fixedTemplate && fixedTemplate.length) {
    return coerceToFixedStates(item, fixedTemplate, previewDeviceIds, registryBaseForForce);
  }
  return item;
}

/**
 * @param {Record<string, unknown>} root
 * @param {'all' | 'fixed' | 'normal-only'} mode
 * @param {object[] | null} fixedTemplate
 * @param {string[]} previewDeviceIds
 * @param {boolean} isMultiple
 * @param {string} [registryBaseForForce] Single-target: PHP `base_selector` for registry-composed `force_selector`.
 */
function normalizeStylingRootForStatesPolicy(root, mode, fixedTemplate, previewDeviceIds, isMultiple, registryBaseForForce = '') {
  if (mode === 'all') {
    return root;
  }
  if (!root || typeof root !== 'object') {
    return root;
  }
  if (isMultiple && Array.isArray(root.items)) {
    const next = cloneValue(root);
    next.items = root.items.map(item => normalizeSingleStylingPayload(/** @type {Record<string, unknown>} */item, mode, fixedTemplate, previewDeviceIds, ''));
    return next;
  }
  return normalizeSingleStylingPayload(root, mode, fixedTemplate, previewDeviceIds, registryBaseForForce);
}

/***/ },

/***/ "./src/admin/customizer/styling/targetElementsRegistry.js"
/*!****************************************************************!*\
  !*** ./src/admin/customizer/styling/targetElementsRegistry.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findMatchingTargetPreset: () => (/* binding */ findMatchingTargetPreset),
/* harmony export */   normalizeSelectorForPresetMatch: () => (/* binding */ normalizeSelectorForPresetMatch),
/* harmony export */   normalizeTargetElementsRegistry: () => (/* binding */ normalizeTargetElementsRegistry)
/* harmony export */ });
/**
 * Preset targets from `control.params.styling_target_elements` (per `Onepress_Customize_Styling_Control`).
 */

/** @typedef {{ id: string, selector: string, name: string, category: string }} TargetElementPreset */

/** @typedef {{ categories: Record<string, string>, elements: TargetElementPreset[] }} TargetElementsRegistry */

/**
 * @param {unknown} raw
 * @returns {TargetElementPreset[]}
 */
function normalizeElements(raw) {
  if (!Array.isArray(raw)) {
    return [];
  }
  const out = [];
  for (const row of raw) {
    if (!row || typeof row !== 'object') {
      continue;
    }
    const id = typeof row.id === 'string' ? row.id.trim() : '';
    const selector = typeof row.selector === 'string' ? row.selector.trim() : '';
    const name = typeof row.name === 'string' ? row.name.trim() : '';
    const category = typeof row.category === 'string' ? row.category.trim() : 'other';
    if (!selector || !name) {
      continue;
    }
    out.push({
      id: id || selector,
      selector,
      name,
      category: category || 'other'
    });
  }
  return out;
}

/**
 * @param {unknown} raw — `control.params.styling_target_elements` from Customize.
 * @returns {TargetElementsRegistry}
 */
function normalizeTargetElementsRegistry(raw) {
  const categories = raw && typeof raw === 'object' && raw.categories && typeof raw.categories === 'object' && !Array.isArray(raw.categories) ? (/** @type {Record<string, string>} */{
    ...raw.categories
  }) : {};
  const elements = normalizeElements(raw && typeof raw === 'object' && 'elements' in raw ? /** @type {{ elements?: unknown }} */raw.elements : undefined);
  return {
    categories,
    elements
  };
}

/**
 * Collapse whitespace for stable comparison (saved selector vs registry).
 *
 * @param {string} s
 * @returns {string}
 */
function normalizeSelectorForPresetMatch(s) {
  return String(s || '').trim().replace(/\s+/g, ' ');
}

/**
 * Match preset for UI: registry id in `_meta.elId` first, else selector match (whitespace-normalized).
 *
 * @param {string} currentSelector
 * @param {string} [currentElId]
 * @param {TargetElementsRegistry} [registry]
 * @returns {TargetElementPreset | null}
 */
function findMatchingTargetPreset(currentSelector, currentElId, registry) {
  const {
    elements
  } = registry !== null && registry !== void 0 ? registry : normalizeTargetElementsRegistry(null);
  const id = String(currentElId || '').trim();
  const selN = normalizeSelectorForPresetMatch(currentSelector);
  if (id) {
    const byId = elements.find(e => e.id === id);
    if (byId) {
      return byId;
    }
  }
  if (!selN) {
    return null;
  }
  return elements.find(e => normalizeSelectorForPresetMatch(e.selector) === selN) || null;
}

/***/ },

/***/ "./src/admin/customizer/styling/useFontManagerCatalogFamilies.js"
/*!***********************************************************************!*\
  !*** ./src/admin/customizer/styling/useFontManagerCatalogFamilies.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ONEPRESS_FONT_MANAGER_SETTING_ID: () => (/* binding */ ONEPRESS_FONT_MANAGER_SETTING_ID),
/* harmony export */   useFontManagerCatalogFamilies: () => (/* binding */ useFontManagerCatalogFamilies)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _font_manager_fontManagerCatalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../font-manager/fontManagerCatalog */ "./src/admin/customizer/font-manager/fontManagerCatalog.js");
/**
 * Live list of fonts from Customizer setting `onepress_font_manager` (PickerFontFamily shape).
 */



/** Default theme_mod id; PHP filter `onepress_font_manager_theme_mod_id` may change it. */
const ONEPRESS_FONT_MANAGER_SETTING_ID = 'onepress_font_manager';

/**
 * @param {import('@wordpress/customize').Customize | null | undefined} api
 * @param {import('../font-manager/fontManagerCatalog').PickerFontFamily[] | null | undefined} googleFamilies — for preview URLs on Google entries
 */
function useFontManagerCatalogFamilies(api, googleFamilies) {
  const [local, setLocal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(/** @type {import('./googleFontCollection').PickerFontFamily[]} */[]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!api || typeof api !== 'function') {
      setLocal([]);
      return undefined;
    }
    const setting = api(ONEPRESS_FONT_MANAGER_SETTING_ID);
    if (!setting || typeof setting.get !== 'function') {
      setLocal([]);
      return undefined;
    }
    const apply = () => {
      const raw = setting.get();
      setLocal((0,_font_manager_fontManagerCatalog__WEBPACK_IMPORTED_MODULE_1__.fontManagerValueToPickerFamilies)(raw, googleFamilies));
    };
    apply();
    if (typeof setting.bind === 'function') {
      setting.bind(apply);
      return () => {
        if (typeof setting.unbind === 'function') {
          setting.unbind(apply);
        }
      };
    }
    return undefined;
  }, [api, googleFamilies]);
  return local;
}

/***/ },

/***/ "./src/admin/customizer/styling/useGoogleFontFamilies.js"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/styling/useGoogleFontFamilies.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGoogleFontFamilies: () => (/* binding */ useGoogleFontFamilies)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _googleFontCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./googleFontCollection */ "./src/admin/customizer/styling/googleFontCollection.js");
/**
 * System font presets + Google Fonts from Font Library REST (merged for picker; Google order = API order).
 */



/**
 * @typedef {import('./googleFontCollection').PickerFontFamily} PickerFontFamily
 */

/**
 * @returns {{ families: PickerFontFamily[], error: Error | null, loading: boolean }}
 */
function useGoogleFontFamilies() {
  const [googleFamilies, setGoogleFamilies] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(/** @type {PickerFontFamily[] | null} */null);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(/** @type {Error | null} */null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const families = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_1__.mergePickerFamilies)(googleFamilies), [googleFamilies]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let cancelled = false;
    (0,_googleFontCollection__WEBPACK_IMPORTED_MODULE_1__.fetchGoogleFontFamilies)().then(data => {
      if (!cancelled) {
        setGoogleFamilies(data);
        setError(null);
      }
    }).catch(e => {
      if (!cancelled) {
        setError(e instanceof Error ? e : new Error(String(e)));
        setGoogleFamilies(null);
      }
    }).finally(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return {
    families,
    error,
    loading
  };
}

/***/ },

/***/ "./src/admin/customizer/wp-editor.js"
/*!*******************************************!*\
  !*** ./src/admin/customizer/wp-editor.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   installWpEditor: () => (/* binding */ installWpEditor)
/* harmony export */ });
/**
 * TinyMCE / Quicktags bridge for Customizer textareas.
 */
function installWpEditor($) {
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
              } catch (e) {}
            }
            // editor.theme.resizeTo('100%', 500);
            if (typeof settings.init_instance_callback === "function") {
              settings.init_instance_callback(editor);
            }
            if (settings.sync_id !== '') {
              if (typeof settings.sync_id === 'string') {
                editor.on('keyup change', function (e) {
                  var html = editor.getContent({
                    format: 'raw'
                  });
                  html = window._wpEditor.removep(html);
                  $('#' + settings.sync_id).val(html).trigger('change');
                });
              } else {
                editor.on('keyup change', function (e) {
                  var html = editor.getContent({
                    format: 'raw'
                  });
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
        content = editor.getContent({
          format: 'raw'
        });
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
        sync_id: "",
        // sync to another text area
        tinymce: {},
        // tinymce setting
        qtag: {},
        // quick tag settings
        mod: '',
        // quick tag settings
        init_instance_callback: function () {} // quick tag settings
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

/***/ },

/***/ "./node_modules/lodash/_DataView.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ },

/***/ "./node_modules/lodash/_Hash.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ },

/***/ "./node_modules/lodash/_ListCache.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ },

/***/ "./node_modules/lodash/_Map.js"
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ },

/***/ "./node_modules/lodash/_MapCache.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ },

/***/ "./node_modules/lodash/_Promise.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ },

/***/ "./node_modules/lodash/_Set.js"
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ },

/***/ "./node_modules/lodash/_SetCache.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "./node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "./node_modules/lodash/_setCacheHas.js");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ },

/***/ "./node_modules/lodash/_Stack.js"
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ },

/***/ "./node_modules/lodash/_Symbol.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ },

/***/ "./node_modules/lodash/_Uint8Array.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ },

/***/ "./node_modules/lodash/_WeakMap.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ },

/***/ "./node_modules/lodash/_arrayEach.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
(module) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ },

/***/ "./node_modules/lodash/_arrayFilter.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
(module) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ },

/***/ "./node_modules/lodash/_arrayLikeKeys.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ },

/***/ "./node_modules/lodash/_arrayPush.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
(module) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ },

/***/ "./node_modules/lodash/_arraySome.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
(module) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ },

/***/ "./node_modules/lodash/_assignValue.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ },

/***/ "./node_modules/lodash/_assocIndexOf.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ },

/***/ "./node_modules/lodash/_baseAssign.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ },

/***/ "./node_modules/lodash/_baseAssignIn.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ },

/***/ "./node_modules/lodash/_baseAssignValue.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ },

/***/ "./node_modules/lodash/_baseClone.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "./node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "./node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "./node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "./node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "./node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "./node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "./node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "./node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ },

/***/ "./node_modules/lodash/_baseCreate.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ },

/***/ "./node_modules/lodash/_baseEach.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ "./node_modules/lodash/_baseForOwn.js"),
    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ "./node_modules/lodash/_createBaseEach.js");

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ },

/***/ "./node_modules/lodash/_baseFor.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ },

/***/ "./node_modules/lodash/_baseForOwn.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ },

/***/ "./node_modules/lodash/_baseGetAllKeys.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ },

/***/ "./node_modules/lodash/_baseGetTag.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ },

/***/ "./node_modules/lodash/_baseIsArguments.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ },

/***/ "./node_modules/lodash/_baseIsEqual.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "./node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ },

/***/ "./node_modules/lodash/_baseIsEqualDeep.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "./node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "./node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ },

/***/ "./node_modules/lodash/_baseIsMap.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ },

/***/ "./node_modules/lodash/_baseIsNative.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ },

/***/ "./node_modules/lodash/_baseIsSet.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ },

/***/ "./node_modules/lodash/_baseIsTypedArray.js"
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ },

/***/ "./node_modules/lodash/_baseKeys.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ },

/***/ "./node_modules/lodash/_baseKeysIn.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ },

/***/ "./node_modules/lodash/_baseTimes.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ },

/***/ "./node_modules/lodash/_baseUnary.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ },

/***/ "./node_modules/lodash/_cacheHas.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
(module) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ },

/***/ "./node_modules/lodash/_castFunction.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_castFunction.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = castFunction;


/***/ },

/***/ "./node_modules/lodash/_cloneArrayBuffer.js"
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ },

/***/ "./node_modules/lodash/_cloneBuffer.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ },

/***/ "./node_modules/lodash/_cloneDataView.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ },

/***/ "./node_modules/lodash/_cloneRegExp.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
(module) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ },

/***/ "./node_modules/lodash/_cloneSymbol.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ },

/***/ "./node_modules/lodash/_cloneTypedArray.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ },

/***/ "./node_modules/lodash/_copyArray.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
(module) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ },

/***/ "./node_modules/lodash/_copyObject.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ },

/***/ "./node_modules/lodash/_copySymbols.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ },

/***/ "./node_modules/lodash/_copySymbolsIn.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ },

/***/ "./node_modules/lodash/_coreJsData.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ },

/***/ "./node_modules/lodash/_createBaseEach.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ },

/***/ "./node_modules/lodash/_createBaseFor.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
(module) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ },

/***/ "./node_modules/lodash/_defineProperty.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ },

/***/ "./node_modules/lodash/_equalArrays.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "./node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ },

/***/ "./node_modules/lodash/_equalByTag.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ },

/***/ "./node_modules/lodash/_equalObjects.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ },

/***/ "./node_modules/lodash/_freeGlobal.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
(module) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof globalThis == 'object' && globalThis && globalThis.Object === Object && globalThis;

module.exports = freeGlobal;


/***/ },

/***/ "./node_modules/lodash/_getAllKeys.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ },

/***/ "./node_modules/lodash/_getAllKeysIn.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ },

/***/ "./node_modules/lodash/_getMapData.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ },

/***/ "./node_modules/lodash/_getNative.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ },

/***/ "./node_modules/lodash/_getPrototype.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ },

/***/ "./node_modules/lodash/_getRawTag.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ },

/***/ "./node_modules/lodash/_getSymbols.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ },

/***/ "./node_modules/lodash/_getSymbolsIn.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ },

/***/ "./node_modules/lodash/_getTag.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ },

/***/ "./node_modules/lodash/_getValue.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ },

/***/ "./node_modules/lodash/_hashClear.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ },

/***/ "./node_modules/lodash/_hashDelete.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ },

/***/ "./node_modules/lodash/_hashGet.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ },

/***/ "./node_modules/lodash/_hashHas.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ },

/***/ "./node_modules/lodash/_hashSet.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ },

/***/ "./node_modules/lodash/_initCloneArray.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ },

/***/ "./node_modules/lodash/_initCloneByTag.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "./node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "./node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "./node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ },

/***/ "./node_modules/lodash/_initCloneObject.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ },

/***/ "./node_modules/lodash/_isIndex.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ },

/***/ "./node_modules/lodash/_isKeyable.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ },

/***/ "./node_modules/lodash/_isMasked.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ },

/***/ "./node_modules/lodash/_isPrototype.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ },

/***/ "./node_modules/lodash/_listCacheClear.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ },

/***/ "./node_modules/lodash/_listCacheDelete.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ },

/***/ "./node_modules/lodash/_listCacheGet.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ },

/***/ "./node_modules/lodash/_listCacheHas.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ },

/***/ "./node_modules/lodash/_listCacheSet.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ },

/***/ "./node_modules/lodash/_mapCacheClear.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ },

/***/ "./node_modules/lodash/_mapCacheDelete.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ },

/***/ "./node_modules/lodash/_mapCacheGet.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ },

/***/ "./node_modules/lodash/_mapCacheHas.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ },

/***/ "./node_modules/lodash/_mapCacheSet.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ },

/***/ "./node_modules/lodash/_mapToArray.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
(module) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ },

/***/ "./node_modules/lodash/_nativeCreate.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ },

/***/ "./node_modules/lodash/_nativeKeys.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ },

/***/ "./node_modules/lodash/_nativeKeysIn.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
(module) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ },

/***/ "./node_modules/lodash/_nodeUtil.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ },

/***/ "./node_modules/lodash/_objectToString.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ },

/***/ "./node_modules/lodash/_overArg.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ },

/***/ "./node_modules/lodash/_root.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ },

/***/ "./node_modules/lodash/_setCacheAdd.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
(module) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ },

/***/ "./node_modules/lodash/_setCacheHas.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
(module) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ },

/***/ "./node_modules/lodash/_setToArray.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
(module) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ },

/***/ "./node_modules/lodash/_stackClear.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ },

/***/ "./node_modules/lodash/_stackDelete.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ },

/***/ "./node_modules/lodash/_stackGet.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ },

/***/ "./node_modules/lodash/_stackHas.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ },

/***/ "./node_modules/lodash/_stackSet.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ },

/***/ "./node_modules/lodash/_toSource.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ },

/***/ "./node_modules/lodash/clone.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/clone.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseClone = __webpack_require__(/*! ./_baseClone */ "./node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

module.exports = clone;


/***/ },

/***/ "./node_modules/lodash/each.js"
/*!*************************************!*\
  !*** ./node_modules/lodash/each.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./forEach */ "./node_modules/lodash/forEach.js");


/***/ },

/***/ "./node_modules/lodash/eq.js"
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ },

/***/ "./node_modules/lodash/forEach.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/forEach.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js"),
    castFunction = __webpack_require__(/*! ./_castFunction */ "./node_modules/lodash/_castFunction.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;


/***/ },

/***/ "./node_modules/lodash/identity.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ },

/***/ "./node_modules/lodash/isArguments.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ },

/***/ "./node_modules/lodash/isArray.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ },

/***/ "./node_modules/lodash/isArrayLike.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ },

/***/ "./node_modules/lodash/isBuffer.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ },

/***/ "./node_modules/lodash/isEmpty.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/isEmpty.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ },

/***/ "./node_modules/lodash/isEqual.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/isEqual.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js");

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ },

/***/ "./node_modules/lodash/isFunction.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ },

/***/ "./node_modules/lodash/isLength.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ },

/***/ "./node_modules/lodash/isMap.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "./node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ },

/***/ "./node_modules/lodash/isObject.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ },

/***/ "./node_modules/lodash/isObjectLike.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ },

/***/ "./node_modules/lodash/isSet.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "./node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ },

/***/ "./node_modules/lodash/isTypedArray.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ },

/***/ "./node_modules/lodash/keys.js"
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ },

/***/ "./node_modules/lodash/keysIn.js"
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ },

/***/ "./node_modules/lodash/stubArray.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
(module) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ },

/***/ "./node_modules/lodash/stubFalse.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ },

/***/ "./src/frontend/fontawesome-v6/css/all.min.css"
/*!*****************************************************!*\
  !*** ./src/frontend/fontawesome-v6/css/all.min.css ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/admin/customizer.scss"
/*!***********************************!*\
  !*** ./src/admin/customizer.scss ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/react-dom/client.js"
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

"use strict";
module.exports = window["React"];

/***/ },

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

"use strict";
module.exports = window["ReactDOM"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-down-small.mjs"
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-down-small.mjs ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chevron_down_small_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/chevron-down-small.tsx


var chevron_down_small_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "m15.99 10.889-3.988 3.418-3.988-3.418.976-1.14 3.012 2.582 3.012-2.581.976 1.139Z" }) });

//# sourceMappingURL=chevron-down-small.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-down.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-down.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chevron_down_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/chevron-down.tsx


var chevron_down_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" }) });

//# sourceMappingURL=chevron-down.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-up.mjs"
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-up.mjs ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chevron_up_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/chevron-up.tsx


var chevron_up_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z" }) });

//# sourceMappingURL=chevron-up.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/close.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ close_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/close.tsx


var close_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z" }) });

//# sourceMappingURL=close.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/drag-handle.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/drag-handle.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ drag_handle_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/drag-handle.tsx


var drag_handle_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z" }) });

//# sourceMappingURL=drag-handle.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/link-off.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link-off.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ link_off_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/link-off.tsx


var link_off_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z" }) });

//# sourceMappingURL=link-off.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/link.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ link_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/link.tsx


var link_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z" }) });

//# sourceMappingURL=link.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/pencil.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/pencil.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pencil_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/pencil.tsx


var pencil_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "m19 7-3-3-8.5 8.5-1 4 4-1L19 7Zm-7 11.5H5V20h7v-1.5Z" }) });

//# sourceMappingURL=pencil.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/rotate-left.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/rotate-left.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rotate_left_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/rotate-left.tsx


var rotate_left_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M12 4V2.2L9 4.8l3 2.5V5.5c3.6 0 6.5 2.9 6.5 6.5 0 2.9-1.9 5.3-4.5 6.2v.2l-.1-.2c-.4.1-.7.2-1.1.2l.2 1.5c.3 0 .6-.1 1-.2 3.5-.9 6-4 6-7.7 0-4.4-3.6-8-8-8zm-7.9 7l1.5.2c.1-1.2.5-2.3 1.2-3.2l-1.1-.9C4.8 8.2 4.3 9.6 4.1 11zm1.5 1.8l-1.5.2c.1.7.3 1.4.5 2 .3.7.6 1.3 1 1.8l1.2-.8c-.3-.5-.6-1-.8-1.5s-.4-1.1-.4-1.7zm1.5 5.5c1.1.9 2.4 1.4 3.8 1.6l.2-1.5c-1.1-.1-2.2-.5-3.1-1.2l-.9 1.1z" }) });

//# sourceMappingURL=rotate-left.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/settings.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/settings.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ settings_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/settings.tsx


var settings_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: [
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "m19 7.5h-7.628c-.3089-.87389-1.1423-1.5-2.122-1.5-.97966 0-1.81309.62611-2.12197 1.5h-2.12803v1.5h2.12803c.30888.87389 1.14231 1.5 2.12197 1.5.9797 0 1.8131-.62611 2.122-1.5h7.628z" }),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "m19 15h-2.128c-.3089-.8739-1.1423-1.5-2.122-1.5s-1.8131.6261-2.122 1.5h-7.628v1.5h7.628c.3089.8739 1.1423 1.5 2.122 1.5s1.8131-.6261 2.122-1.5h2.128z" })
] });

//# sourceMappingURL=settings.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/trash.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/trash.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ trash_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/trash.tsx


var trash_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z" }) });

//# sourceMappingURL=trash.mjs.map


/***/ },

/***/ "./node_modules/array-move/index.js"
/*!******************************************!*\
  !*** ./node_modules/array-move/index.js ***!
  \******************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayMoveImmutable: () => (/* binding */ arrayMoveImmutable),
/* harmony export */   arrayMoveMutable: () => (/* binding */ arrayMoveMutable)
/* harmony export */ });
function arrayMoveMutable(array, fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

		const [item] = array.splice(fromIndex, 1);
		array.splice(endIndex, 0, item);
	}
}

function arrayMoveImmutable(array, fromIndex, toIndex) {
	array = [...array];
	arrayMoveMutable(array, fromIndex, toIndex);
	return array;
}


/***/ },

/***/ "./node_modules/colord/index.mjs"
/*!***************************************!*\
  !*** ./node_modules/colord/index.mjs ***!
  \***************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Colord: () => (/* binding */ j),
/* harmony export */   colord: () => (/* binding */ w),
/* harmony export */   extend: () => (/* binding */ k),
/* harmony export */   getFormat: () => (/* binding */ I),
/* harmony export */   random: () => (/* binding */ E)
/* harmony export */ });
var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(r){return"string"==typeof r?r.length>0:"number"==typeof r},n=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u=function(r){return(r=isFinite(r)?r%360:0)>0?r:r+360},a=function(r){return{r:e(r.r,0,255),g:e(r.g,0,255),b:e(r.b,0,255),a:e(r.a)}},o=function(r){return{r:n(r.r),g:n(r.g),b:n(r.b),a:n(r.a,3)}},i=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return{h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return{r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g=function(r){return{h:u(r.h),s:e(r.s,0,100),l:e(r.l,0,100),a:e(r.a)}},d=function(r){return{h:n(r.h),s:n(r.s),l:n(r.l),a:n(r.a,3)}},f=function(r){return b((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));// removed by dead control flow
 var t, n, e; },c=function(r){return{h:(t=h(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};// removed by dead control flow
 var t, n, e, u; },l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y={string:[[function(r){var t=i.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v.exec(r)||m.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p.exec(t);if(!n)return null;var e,u,a=g({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t(n)&&t(e)&&t(u)?a({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t(n)||!t(e)||!t(u))return null;var i=g({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t(n)||!t(a)||!t(o))return null;var h=function(r){return{h:u(r.h),s:e(r.s,0,100),v:e(r.v,0,100),a:e(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b(h)},"hsv"]]},N=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return[e,t[n][1]]}return[null,void 0]},x=function(r){return"string"==typeof r?N(r.trim(),y.string):"object"==typeof r&&null!==r?N(r,y.object):[null,void 0]},I=function(r){return x(r)[1]},M=function(r,t){var n=c(r);return{h:n.h,s:e(n.s+100*t,0,100),l:n.l,a:n.a}},H=function(r){return(299*r.r+587*r.g+114*r.b)/1e3/255},$=function(r,t){var n=c(r);return{h:n.h,s:n.s,l:e(n.l+100*t,0,100),a:n.a}},j=function(){function r(r){this.parsed=x(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n(H(this.rgba),2)},r.prototype.isDark=function(){return H(this.rgba)<.5},r.prototype.isLight=function(){return H(this.rgba)>=.5},r.prototype.toHex=function(){return r=o(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n(255*a)):"","#"+s(t)+s(e)+s(u)+i;// removed by dead control flow
 var r, t, e, u, a, i; },r.prototype.toRgb=function(){return o(this.rgba)},r.prototype.toRgbString=function(){return r=o(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";// removed by dead control flow
 var r, t, n, e, u; },r.prototype.toHsl=function(){return d(c(this.rgba))},r.prototype.toHslString=function(){return r=d(c(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";// removed by dead control flow
 var r, t, n, e, u; },r.prototype.toHsv=function(){return r=h(this.rgba),{h:n(r.h),s:n(r.s),v:n(r.v),a:n(r.a,3)};// removed by dead control flow
 var r; },r.prototype.invert=function(){return w({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});// removed by dead control flow
 var r; },r.prototype.saturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,-r))},r.prototype.grayscale=function(){return w(M(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w($(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w($(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return"number"==typeof r?w({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n(this.rgba.a,3);// removed by dead control flow
 var t; },r.prototype.hue=function(r){var t=c(this.rgba);return"number"==typeof r?w({h:r,s:t.s,l:t.l,a:t.a}):n(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w(r).toHex()},r}(),w=function(r){return r instanceof j?r:new j(r)},S=[],k=function(r){r.forEach(function(r){S.indexOf(r)<0&&(r(j,y),S.push(r))})},E=function(){return new j({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})};


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*********************************!*\
  !*** ./src/admin/customizer.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _customizer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customizer.scss */ "./src/admin/customizer.scss");
/* harmony import */ var _frontend_fontawesome_v6_css_all_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../frontend/fontawesome-v6/css/all.min.css */ "./src/frontend/fontawesome-v6/css/all.min.css");
/* harmony import */ var _customizer_alpha_color_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customizer/alpha-color-picker */ "./src/admin/customizer/alpha-color-picker.js");
/* harmony import */ var _customizer_control_alpha_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customizer/control-alpha-color */ "./src/admin/customizer/control-alpha-color.js");
/* harmony import */ var _customizer_control_bindings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./customizer/control-bindings */ "./src/admin/customizer/control-bindings.js");
/* harmony import */ var _customizer_control_repeatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customizer/control-repeatable */ "./src/admin/customizer/control-repeatable.js");
/* harmony import */ var _customizer_control_font_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customizer/control-font-manager */ "./src/admin/customizer/control-font-manager.js");
/* harmony import */ var _customizer_control_styling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customizer/control-styling */ "./src/admin/customizer/control-styling.js");
/* harmony import */ var _customizer_icon_picker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customizer/icon-picker */ "./src/admin/customizer/icon-picker.js");
/* harmony import */ var _customizer_jquery_deparam__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customizer/jquery-deparam */ "./src/admin/customizer/jquery-deparam.js");
/* harmony import */ var _customizer_modal_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./customizer/modal-editor */ "./src/admin/customizer/modal-editor.js");
/* harmony import */ var _customizer_plus_section__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./customizer/plus-section */ "./src/admin/customizer/plus-section.js");
/* harmony import */ var _customizer_wp_editor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./customizer/wp-editor */ "./src/admin/customizer/wp-editor.js");













const api = wp.customize;
const $ = jQuery;
(0,_customizer_plus_section__WEBPACK_IMPORTED_MODULE_11__.registerPlusSection)(api);
(0,_customizer_jquery_deparam__WEBPACK_IMPORTED_MODULE_9__.installDeparam)($);
(0,_customizer_alpha_color_picker__WEBPACK_IMPORTED_MODULE_2__.installAlphaColorPicker)($);
(0,_customizer_control_alpha_color__WEBPACK_IMPORTED_MODULE_3__.registerAlphaColorControl)(api, $);
(0,_customizer_control_repeatable__WEBPACK_IMPORTED_MODULE_5__.registerRepeatableControl)(api, $);
(0,_customizer_control_font_manager__WEBPACK_IMPORTED_MODULE_6__.registerFontManagerControl)(api, $);
(0,_customizer_control_styling__WEBPACK_IMPORTED_MODULE_7__.registerStylingControl)(api, $);
(0,_customizer_wp_editor__WEBPACK_IMPORTED_MODULE_12__.installWpEditor)($);
(0,_customizer_modal_editor__WEBPACK_IMPORTED_MODULE_10__.initModalEditors)(api, $);
jQuery(window).ready(function () {
  (0,_customizer_control_bindings__WEBPACK_IMPORTED_MODULE_4__.initControlBindings)($);
});
jQuery(document).ready(function () {
  (0,_customizer_icon_picker__WEBPACK_IMPORTED_MODULE_8__.initIconPicker)($);
});
})();

/******/ })()
;
//# sourceMappingURL=customizer.js.map