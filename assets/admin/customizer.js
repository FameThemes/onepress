/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/customizer/CustomizerPreviewDeviceButtons.jsx"
/*!*****************************************************************!*\
  !*** ./src/admin/customizer/CustomizerPreviewDeviceButtons.jsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomizerPreviewDeviceButtons: () => (/* binding */ CustomizerPreviewDeviceButtons),
/* harmony export */   getCustomizerPreviewDeviceDefinitions: () => (/* binding */ getCustomizerPreviewDeviceDefinitions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Shared Customizer preview device control: one button, cycles desktop → tablet → mobile.
 */


/**
 * @param {{ labels?: 'preview' | 'short' }} [options]
 * @returns {{ id: string, icon: string, title: string }[]}
 */
function getCustomizerPreviewDeviceDefinitions(options = {}) {
  const useShort = options.labels === 'short';
  const titles = useShort ? {
    desktop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Desktop', 'onepress'),
    tablet: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tablet', 'onepress'),
    mobile: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Mobile', 'onepress')
  } : {
    desktop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Desktop preview', 'onepress'),
    tablet: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tablet preview', 'onepress'),
    mobile: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Mobile preview', 'onepress')
  };
  return [{
    id: 'desktop',
    icon: 'dashicons-desktop',
    title: titles.desktop
  }, {
    id: 'tablet',
    icon: 'dashicons-tablet',
    title: titles.tablet
  }, {
    id: 'mobile',
    icon: 'dashicons-smartphone',
    title: titles.mobile
  }];
}

/**
 * @param {object} props
 * @param {{ id: string, icon: string, title: string }[]} props.devices  Order defines cycle: [0]→[1]→[2]→[0]…
 * @param {string} props.activeDevice
 * @param {(id: string) => void} props.onSelectDevice
 * @param {string} props.groupClassName Extra wrapper class (e.g. BEM block); base: onepress-customizer-preview-device
 * @param {string} props.buttonClassName Extra button class; base: onepress-customizer-preview-device__btn (styles in customizer.scss)
 * @param {string} [props.groupAriaLabel] Prepended to the button aria-label for context.
 */
function CustomizerPreviewDeviceButtons({
  devices,
  activeDevice,
  onSelectDevice,
  groupClassName,
  buttonClassName,
  groupAriaLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Customizer preview device', 'onepress')
}) {
  if (!devices?.length) {
    return null;
  }
  let idx = devices.findIndex(d => d.id === activeDevice);
  if (idx < 0) {
    idx = 0;
  }
  const current = devices[idx];
  const next = devices[(idx + 1) % devices.length];
  const cycleHint = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: 1: device after click, e.g. "Tablet preview" */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Click for %s', 'onepress'), next.title);
  const title = `${current.title} — ${cycleHint}`;
  const ariaLabel = `${groupAriaLabel}. ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: 1: current device, 2: instruction for next device */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Current: %1$s. %2$s', 'onepress'), current.title, cycleHint)}`;
  const cycle = () => {
    onSelectDevice(next.id);
  };
  const groupCn = ['onepress-customizer-preview-device', groupClassName].filter(Boolean).join(' ');
  const btnCn = ['onepress-customizer-preview-device__btn', buttonClassName, 'is-active'].filter(Boolean).join(' ');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: groupCn
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: btnCn,
    title: title,
    "aria-label": ariaLabel,
    onClick: cycle
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `dashicons ${current.icon}`,
    "aria-hidden": true
  })));
}

/***/ },

/***/ "./src/admin/customizer/CustomizerUnitSelectPopover.jsx"
/*!**************************************************************!*\
  !*** ./src/admin/customizer/CustomizerUnitSelectPopover.jsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomizerUnitSelectPopover: () => (/* binding */ CustomizerUnitSelectPopover)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);

/**
 * Shared unit dropdown (px / em / rem / %) for Customizer React controls.
 * Portaled Popover + click-outside; trigger styling via triggerClassName (per control).
 */



const SHELL_CLASS = 'onepress-customizer-unit-popover-shell';

/**
 * @param {object} props
 * @param {string[]} props.units
 * @param {string} props.value
 * @param {(unit: string) => void} props.onChange
 * @param {'bottom-start'|'bottom-end'|'top-start'|'top-end'|string} [props.placement]
 * @param {string} props.triggerClassName Classes for the anchor (e.g. spacing / typography skins)
 * @param {string} [props.triggerActiveClass] Appended when open (e.g. "active")
 * @param {string} [props.listboxAriaLabel]
 * @param {string} [props.popoverClassName] Extra class on Popover root (merged with shell)
 */
function CustomizerUnitSelectPopover({
  units,
  value,
  onChange,
  placement = 'bottom-end',
  triggerClassName,
  triggerActiveClass = '',
  listboxAriaLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unit', 'onepress'),
  popoverClassName = ''
}) {
  const [open, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [anchorEl, setAnchorEl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    const onPointerDown = e => {
      const t = e.target;
      if (!t || typeof t.closest !== 'function') {
        return;
      }
      if (anchorEl && anchorEl.contains(t)) {
        return;
      }
      if (t.closest(`.${SHELL_CLASS}`) || t.closest('.components-popover')) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [open, anchorEl]);
  const triggerCn = [triggerClassName, open && triggerActiveClass ? triggerActiveClass : ''].filter(Boolean).join(' ');
  const shellCn = [SHELL_CLASS, popoverClassName].filter(Boolean).join(' ');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    ref: setAnchorEl,
    className: triggerCn,
    role: "button",
    tabIndex: 0,
    "aria-expanded": open,
    "aria-haspopup": "listbox",
    "aria-label": listboxAriaLabel,
    onClick: () => setOpen(o => !o),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(o => !o);
      }
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-customizer-unit-trigger__value"
  }, value)), open && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
    anchor: anchorEl,
    className: shellCn,
    onClose: () => setOpen(false),
    placement: placement,
    offset: 4,
    focusOnMount: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-customizer-unit-popover",
    role: "listbox",
    "aria-label": listboxAriaLabel
  }, units.map(u => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: u,
    type: "button",
    role: "option",
    "aria-selected": value === u,
    className: 'onepress-customizer-unit-popover__item' + (value === u ? ' is-selected' : ''),
    onClick: () => {
      onChange(u);
      setOpen(false);
    }
  }, u)))));
}

/***/ },

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

/***/ "./src/admin/customizer/background/BackgroundControlApp.jsx"
/*!******************************************************************!*\
  !*** ./src/admin/customizer/background/BackgroundControlApp.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundControlApp: () => (/* binding */ BackgroundControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CustomizerPreviewDeviceButtons.jsx */ "./src/admin/customizer/CustomizerPreviewDeviceButtons.jsx");
/* harmony import */ var _buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buildBackgroundCss.js */ "./src/admin/customizer/background/buildBackgroundCss.js");
/* harmony import */ var _getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../getCustomizeControlDefaultRaw.js */ "./src/admin/customizer/getCustomizeControlDefaultRaw.js");

/**
 * Background Customizer control — states × responsive layers, inline dropdown below state row.
 */






const PREVIEW_DEVICES = ['desktop', 'tablet', 'mobile'];
const DEVICE_LABELS = {
  desktop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Desktop', 'onepress'),
  tablet: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tablet', 'onepress'),
  mobile: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mobile', 'onepress')
};
const STATE_LABELS = {
  normal: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Normal', 'onepress'),
  hover: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hover', 'onepress'),
  focus: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Focus', 'onepress'),
  focus_visible: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Focus visible', 'onepress'),
  focusVisible: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Focus visible', 'onepress'),
  active: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Active', 'onepress'),
  visited: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Visited', 'onepress')
};
const IMAGE_SIZES = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cover', 'onepress'),
  value: 'cover'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contain', 'onepress'),
  value: 'contain'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Auto', 'onepress'),
  value: 'auto'
}];
const IMAGE_REPEATS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No repeat', 'onepress'),
  value: 'no-repeat'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Repeat', 'onepress'),
  value: 'repeat'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Repeat X', 'onepress'),
  value: 'repeat-x'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Repeat Y', 'onepress'),
  value: 'repeat-y'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Space', 'onepress'),
  value: 'space'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Round', 'onepress'),
  value: 'round'
}];
const IMAGE_POSITIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Center', 'onepress'),
  value: 'center center'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top', 'onepress'),
  value: 'center top'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom', 'onepress'),
  value: 'center bottom'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left', 'onepress'),
  value: 'left center'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right', 'onepress'),
  value: 'right center'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top left', 'onepress'),
  value: 'left top'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top right', 'onepress'),
  value: 'right top'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom left', 'onepress'),
  value: 'left bottom'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom right', 'onepress'),
  value: 'right bottom'
}];
const ATTACHMENTS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Scroll', 'onepress'),
  value: 'scroll'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', 'onepress'),
  value: 'fixed'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Local', 'onepress'),
  value: 'local'
}];

/**
 * @param {object} params control.params from PHP
 * @returns {{ selector: string, selectorsByState: Record<string, string>|null, states: string[], stateLabels: Record<string, string> }}
 */
function parseBackgroundControlMeta(params) {
  const known = new Set(Object.keys(_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.STATE_PSEUDO));
  let stateList = ['normal', 'hover'];
  const stateLabels = {};
  const sp = params?.states;
  if (Array.isArray(sp) && sp.length) {
    stateList = sp.filter(k => known.has(k));
    if (!stateList.length) {
      stateList = ['normal', 'hover'];
    }
  } else if (sp && typeof sp === 'object') {
    stateList = [];
    for (const k of Object.keys(sp)) {
      if (known.has(k)) {
        stateList.push(k);
        const lab = sp[k];
        if (lab != null && String(lab).trim()) {
          stateLabels[k] = String(lab).trim();
        }
      }
    }
    if (!stateList.length) {
      stateList = ['normal', 'hover'];
    }
  }
  let selectorStr = typeof params?.selector === 'string' ? params.selector.trim() : '';
  const rawMap = params?.selectors_by_state || params?.selectorsByState || null;
  let selectorsByState = null;
  if (rawMap && typeof rawMap === 'object' && !Array.isArray(rawMap)) {
    selectorsByState = {};
    for (const k of Object.keys(rawMap)) {
      var _rawMap$k;
      if (!known.has(k)) {
        continue;
      }
      const v = String((_rawMap$k = rawMap[k]) !== null && _rawMap$k !== void 0 ? _rawMap$k : '').trim();
      if (v) {
        selectorsByState[k] = v;
      }
    }
    if (!Object.keys(selectorsByState).length) {
      selectorsByState = null;
    }
  }
  if (!selectorStr && selectorsByState) {
    selectorStr = (selectorsByState.normal || stateList.map(s => selectorsByState[s]).find(Boolean) || '').trim();
  }
  const sl = params?.state_labels || params?.stateLabels;
  if (sl && typeof sl === 'object' && !Array.isArray(sl)) {
    for (const k of Object.keys(sl)) {
      if (known.has(k) && sl[k] != null && String(sl[k]).trim()) {
        stateLabels[k] = String(sl[k]).trim();
      }
    }
  }
  return {
    selector: selectorStr,
    selectorsByState,
    states: stateList,
    stateLabels
  };
}

/**
 * @param {{ selector: string, selectorsByState: object|null, states: string[], stateLabels: Record<string, string> }} meta
 */
function createEmptyData(meta) {
  const {
    selector,
    selectorsByState,
    states,
    stateLabels
  } = meta;
  const data = {
    _onepressBackground: true,
    _meta: {
      selector: String(selector || '').trim(),
      states: [...states]
    }
  };
  if (selectorsByState && Object.keys(selectorsByState).length) {
    data._meta.selectorsByState = {
      ...selectorsByState
    };
  }
  if (stateLabels && Object.keys(stateLabels).length) {
    data._meta.stateLabels = {
      ...stateLabels
    };
  }
  for (const s of states) {
    data[s] = {
      desktop: (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.createDefaultLayer)(),
      tablet: (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.createDefaultLayer)(),
      mobile: (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.createDefaultLayer)()
    };
  }
  return data;
}

/**
 * @param {object|null} saved
 * @param {{ selector: string, selectorsByState: object|null, states: string[], stateLabels: Record<string, string> }} meta
 */
function mergeSavedData(saved, meta) {
  const base = createEmptyData(meta);
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
    return base;
  }
  for (const s of meta.states) {
    if (!saved[s] || typeof saved[s] !== 'object') {
      continue;
    }
    for (const d of PREVIEW_DEVICES) {
      if (saved[s][d] && typeof saved[s][d] === 'object') {
        base[s][d] = {
          ...(0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.createDefaultLayer)(),
          ...saved[s][d]
        };
      }
    }
  }
  return base;
}

/**
 * @param {object} props
 */
function BackgroundLayerEditor({
  layer,
  onChangeLayer,
  labels
}) {
  const tab = layer.tab || 'color';
  const colorVal = layer.color && String(layer.color).trim() ? layer.color : '#ffffffff';
  const pickImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (typeof window === 'undefined' || !window.wp?.media) {
      return;
    }
    const frame = window.wp.media({
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select background image', 'onepress'),
      button: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this image', 'onepress')
      },
      multiple: false
    });
    frame.on('select', () => {
      const att = frame.state().get('selection').first().toJSON();
      const url = att.url || '';
      onChangeLayer({
        tab: 'image',
        imageId: att.id || 0,
        imageUrl: url
      });
    });
    frame.open();
  }, [onChangeLayer]);
  const clearImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    onChangeLayer({
      imageId: 0,
      imageUrl: ''
    });
  }, [onChangeLayer]);
  const gradientValue = layer.gradient && String(layer.gradient).trim() ? layer.gradient : undefined;
  const onTabSelect = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(name => {
    if (name === 'gradient') {
      const hasG = layer.gradient && String(layer.gradient).trim();
      onChangeLayer(hasG ? {
        tab: 'gradient'
      } : {
        tab: 'gradient',
        gradient: _buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_BACKGROUND_GRADIENT
      });
      return;
    }
    if (name === 'color') {
      const hasC = layer.color && String(layer.color).trim();
      onChangeLayer(hasC ? {
        tab: 'color'
      } : {
        tab: 'color',
        color: _buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_BACKGROUND_COLOR
      });
      return;
    }
    onChangeLayer({
      tab: name
    });
  }, [layer.color, layer.gradient, onChangeLayer]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TabPanel, {
    className: "onepress-bg-popover__tabs",
    activeClass: "is-active",
    tabs: [{
      name: 'color',
      title: labels.color
    }, {
      name: 'gradient',
      title: labels.gradient
    }, {
      name: 'image',
      title: labels.image
    }],
    initialTabName: tab,
    onSelect: onTabSelect
  }, tabItem => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-bg-popover__panel"
  }, tabItem.name === 'color' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-bg-color-panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
    enableAlpha: true,
    color: colorVal,
    onChange: hex => onChangeLayer({
      tab: 'color',
      color: hex
    }),
    style: {
      width: '100%',
      padding: '0',
      margin: '0px'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "tertiary",
    style: {
      width: '100%',
      padding: '0'
    },
    onClick: () => onChangeLayer({
      tab: 'color',
      color: ''
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clear color', 'onepress'))), tabItem.name === 'gradient' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.GradientPicker, {
    value: gradientValue || _buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_BACKGROUND_GRADIENT,
    onChange: current => onChangeLayer({
      tab: 'gradient',
      gradient: current || ''
    }),
    clearable: true,
    gradients: [],
    disableCustomGradients: false,
    "aria-label": labels.gradient
  }), tabItem.name === 'image' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-bg-image-panel"
  }, layer.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "onepress-bg-image-panel__thumb",
    src: layer.imageUrl,
    alt: ""
  }) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-bg-image-panel__actions"
  }, layer.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    onClick: pickImage
  }, layer.imageUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Replace image', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select image', 'onepress')), layer.imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "tertiary",
    onClick: clearImage
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'onepress')) : null) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    className: "w-full text-center",
    onClick: pickImage
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select image', 'onepress')))), layer.imageUrl && String(layer.imageUrl).trim() ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Size', 'onepress'),
    value: layer.size || 'cover',
    options: IMAGE_SIZES,
    onChange: v => onChangeLayer({
      size: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Repeat', 'onepress'),
    value: layer.repeat || 'no-repeat',
    options: IMAGE_REPEATS,
    onChange: v => onChangeLayer({
      repeat: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Position', 'onepress'),
    value: layer.position || 'center center',
    options: IMAGE_POSITIONS,
    onChange: v => onChangeLayer({
      position: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Attachment', 'onepress'),
    value: layer.attachment || 'scroll',
    options: ATTACHMENTS,
    onChange: v => onChangeLayer({
      attachment: v
    })
  })) : null)));
}

/**
 * @param {{ control: object }} props
 */
function BackgroundControlApp({
  control
}) {
  var _ref, _ref2;
  const controlId = control.id || 'bg';
  const params = control.params || {};
  const controlLabel = typeof params.label === 'string' && params.label.trim() ? params.label.trim() : '';
  const controlDescription = typeof params.description === 'string' && params.description.trim() ? params.description : '';
  const bgMeta = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => parseBackgroundControlMeta(params), [params]);
  const labels = {
    color: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', 'onepress'),
    gradient: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gradient', 'onepress'),
    image: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Image', 'onepress'),
    state: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('State', 'onepress'),
    ...(params.labels || {})
  };
  const settingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  settingRef.current = control.setting || control.settings?.default;
  const rawInitial = (_ref = (_ref2 = typeof control.setting?.get === 'function' ? control.setting.get() : null) !== null && _ref2 !== void 0 ? _ref2 : params.value) !== null && _ref !== void 0 ? _ref : '';
  let parsed = null;
  try {
    parsed = typeof rawInitial === 'string' && rawInitial.trim() ? JSON.parse(rawInitial) : null;
  } catch {
    parsed = null;
  }
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => mergeSavedData(parsed, parseBackgroundControlMeta(params)));
  const [previewDevice, setPreviewDevice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('desktop');
  const [activeState, setActiveState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const toolbarRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const dropdownPanelRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const dropdownOpen = activeState != null;
  const selectPreviewDevice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(device => {
    if (typeof window !== 'undefined' && window.wp?.customize?.previewedDevice) {
      window.wp.customize.previewedDevice.set(device);
    } else {
      setPreviewDevice(device);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const api = typeof window !== 'undefined' && window.wp?.customize;
    if (!api?.previewedDevice) {
      return undefined;
    }
    const handler = device => {
      if (PREVIEW_DEVICES.includes(device)) {
        setPreviewDevice(device);
      }
    };
    api.previewedDevice.bind(handler);
    const current = api.previewedDevice.get();
    if (PREVIEW_DEVICES.includes(current)) {
      setPreviewDevice(current);
    }
    return () => {
      api.previewedDevice.unbind(handler);
    };
  }, []);
  const patchLayer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)((stateKey, device, partial) => {
    setData(prev => ({
      ...prev,
      [stateKey]: {
        ...prev[stateKey],
        [device]: {
          ...prev[stateKey][device],
          ...partial
        }
      }
    }));
  }, []);
  const currentLayer = activeState && data[activeState] ? data[activeState][previewDevice] || (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.createDefaultLayer)() : (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.createDefaultLayer)();
  const changeCurrentLayer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(partial => {
    if (activeState == null) {
      return;
    }
    patchLayer(activeState, previewDevice, partial);
  }, [activeState, previewDevice, patchLayer]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const merged = {
      ...data,
      _onepressBackground: true,
      _meta: {
        selector: bgMeta.selector,
        states: [...bgMeta.states],
        ...(bgMeta.selectorsByState ? {
          selectorsByState: {
            ...bgMeta.selectorsByState
          }
        } : {}),
        ...(Object.keys(bgMeta.stateLabels).length ? {
          stateLabels: {
            ...bgMeta.stateLabels
          }
        } : {})
      }
    };
    const json = JSON.stringify(merged);
    const setting = settingRef.current;
    if (setting && typeof setting.set === 'function') {
      setting.set(json);
    }
  }, [data, bgMeta]);
  const popoverTitle = activeState != null ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: state label, 2: device label */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%1$s · %2$s', 'onepress'), bgMeta.stateLabels[activeState] || STATE_LABELS[activeState] || activeState, DEVICE_LABELS[previewDevice] || previewDevice) : '';
  const closeDropdown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setActiveState(null);
  }, []);
  const onStateButtonClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(stateKey => {
    if (activeState === stateKey) {
      closeDropdown();
      return;
    }
    setActiveState(stateKey);
  }, [activeState, closeDropdown]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!dropdownOpen) {
      return undefined;
    }
    const onKey = e => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dropdownOpen, closeDropdown]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!dropdownOpen) {
      return undefined;
    }
    const isOutsideKeepOpen = t => {
      if (!t || typeof t.closest !== 'function') {
        return false;
      }
      // wp.components portals — must not close while using pickers / modals.
      if (t.closest('.components-popover') || t.closest('.components-modal__frame') || t.closest('.components-modal__screen-overlay') || t.closest('.media-modal')) {
        return false;
      }
      if (toolbarRef.current?.contains(t)) {
        return false;
      }
      if (dropdownPanelRef.current?.contains(t)) {
        return false;
      }
      return true;
    };
    const onDocDown = e => {
      if (!isOutsideKeepOpen(e.target)) {
        return;
      }
      closeDropdown();
    };
    // Capture so we still run if inner handlers stop propagation; pointerdown covers pen/touch.
    document.addEventListener('pointerdown', onDocDown, true);
    return () => document.removeEventListener('pointerdown', onDocDown, true);
  }, [dropdownOpen, closeDropdown]);
  const resetToDefault = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    const raw = (0,_getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_6__.getCustomizeControlDefaultRaw)(control);
    let nextParsed = null;
    try {
      nextParsed = raw && String(raw).trim() ? JSON.parse(raw) : null;
    } catch {
      nextParsed = null;
    }
    setData(mergeSavedData(nextParsed, bgMeta));
  }, [control, bgMeta]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'onepress-bg-control-root' + (dropdownOpen ? ' onepress-bg-control-root--open' : '')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title"
  }, controlLabel ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, controlLabel) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_4__.CustomizerPreviewDeviceButtons, {
    devices: (0,_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_4__.getCustomizerPreviewDeviceDefinitions)({
      labels: 'short'
    }),
    activeDevice: previewDevice,
    onSelectDevice: selectPreviewDevice,
    groupClassName: "onepress-bg-app__devices",
    buttonClassName: "onepress-bg-app__device-btn"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative items flex gap-1 items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "onepress-customizer-reset-default",
    onClick: resetToDefault,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-image-rotate",
    "aria-hidden": true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-states flex gap-1 items-center",
    role: "group",
    "aria-label": labels.state
  }, bgMeta.states.map(s => {
    const previewLayer = data[s]?.[previewDevice] || (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.createDefaultLayer)();
    const previewDecls = (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.layerToDeclarations)(previewLayer);
    const previewFillStyle = (0,_buildBackgroundCss_js__WEBPACK_IMPORTED_MODULE_5__.declarationsToReactStyle)(previewDecls);
    const imageTabNoUrl = (previewLayer.tab || 'color') === 'image' && !(previewLayer.imageUrl && String(previewLayer.imageUrl).trim());
    const fillEmpty = !previewFillStyle || imageTabNoUrl;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
      text: bgMeta.stateLabels[s] || STATE_LABELS[s] || s,
      placement: "top"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      key: s,
      className: 'onepress-bg-app__state-btn' + (activeState === s ? ' is-active' : ''),
      "aria-pressed": activeState === s,
      "aria-expanded": activeState === s,
      "aria-haspopup": "dialog",
      "aria-controls": activeState === s ? `onepress-bg-dropdown-${controlId}` : undefined,
      onClick: () => onStateButtonClick(s)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: 'onepress-bg-app__state-btn__fill' + (fillEmpty ? ' onepress-bg-app__state-btn__fill--empty' : ''),
      style: imageTabNoUrl ? undefined : previewFillStyle || undefined,
      "aria-hidden": true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "onepress-bg-app__state-btn__label"
    })));
  })), dropdownOpen ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: dropdownPanelRef,
    id: `onepress-bg-dropdown-${controlId}`,
    className: "onepress-bg-settings-dropdown onepress-bg-portal",
    role: "dialog",
    "aria-modal": "false",
    "aria-label": popoverTitle
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-bg-popover"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BackgroundLayerEditor, {
    key: `${activeState}-${previewDevice}`,
    layer: currentLayer,
    onChangeLayer: changeCurrentLayer,
    labels: labels
  }))) : null)), controlDescription ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description customize-control-description",
    dangerouslySetInnerHTML: {
      __html: controlDescription
    }
  }) : null);
}

/***/ },

/***/ "./src/admin/customizer/background/background-controls.js"
/*!****************************************************************!*\
  !*** ./src/admin/customizer/background/background-controls.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _BackgroundControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BackgroundControlApp.jsx */ "./src/admin/customizer/background/BackgroundControlApp.jsx");
/**
 * Background Customizer control — React. Type: onepress_background
 */



const {
  customize
} = wp;
customize.controlConstructor.onepress_background = customize.Control.extend({
  ready() {
    const control = this;
    const wrap = control.container[0];
    const host = wrap?.querySelector?.('.onepress-background-react-root');
    if (!host) {
      return;
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(host);
    root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BackgroundControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__.BackgroundControlApp, {
      control
    }));
    control._onepressBackgroundRoot = root;
  },
  destroy() {
    if (this._onepressBackgroundRoot) {
      this._onepressBackgroundRoot.unmount();
      this._onepressBackgroundRoot = null;
    }
    customize.Control.prototype.destroy.call(this);
  }
});

/***/ },

/***/ "./src/admin/customizer/background/buildBackgroundCss.js"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/background/buildBackgroundCss.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_BACKGROUND_COLOR: () => (/* binding */ DEFAULT_BACKGROUND_COLOR),
/* harmony export */   DEFAULT_BACKGROUND_GRADIENT: () => (/* binding */ DEFAULT_BACKGROUND_GRADIENT),
/* harmony export */   STATE_PSEUDO: () => (/* binding */ STATE_PSEUDO),
/* harmony export */   backgroundStyleElementId: () => (/* binding */ backgroundStyleElementId),
/* harmony export */   buildBackgroundCss: () => (/* binding */ buildBackgroundCss),
/* harmony export */   buildStateSelector: () => (/* binding */ buildStateSelector),
/* harmony export */   createDefaultLayer: () => (/* binding */ createDefaultLayer),
/* harmony export */   declarationsToReactStyle: () => (/* binding */ declarationsToReactStyle),
/* harmony export */   layerToDeclarations: () => (/* binding */ layerToDeclarations),
/* harmony export */   resolveSelectorForState: () => (/* binding */ resolveSelectorForState),
/* harmony export */   ruleBlock: () => (/* binding */ ruleBlock)
/* harmony export */ });
/**
 * Build CSS for OnePress background Customizer control.
 * Logic must stay in sync with inc/customize-controls/background/helper.php (onepress_background_build_css).
 */

/** Default gradient when the user opens the Gradient tab (must match BackgroundLayerEditor UI). */
const DEFAULT_BACKGROUND_GRADIENT = 'linear-gradient(135deg, rgba(6,147,227,1) 0%, rgb(155,81,224) 100%)';

/** Default solid when the user opens the Color tab with no stored color (matches ColorPicker fallback). */
const DEFAULT_BACKGROUND_COLOR = '#ffffffff';

/** @type {Record<string, string>} */
const STATE_PSEUDO = {
  normal: '',
  hover: ':hover',
  focus: ':focus',
  focus_visible: ':focus-visible',
  focusVisible: ':focus-visible',
  active: ':active',
  visited: ':visited'
};

/**
 * @param {string} baseSelector
 * @param {string} stateKey
 * @returns {string}
 */
function buildStateSelector(baseSelector, stateKey) {
  var _STATE_PSEUDO$stateKe;
  const base = String(baseSelector || '').trim();
  if (!base) {
    return '';
  }
  const pseudo = (_STATE_PSEUDO$stateKe = STATE_PSEUDO[stateKey]) !== null && _STATE_PSEUDO$stateKe !== void 0 ? _STATE_PSEUDO$stateKe : '';
  if (!pseudo) {
    return base;
  }
  return base.split(',').map(s => s.trim() + pseudo).join(', ');
}

/**
 * Full selector for a state: use _meta.selectorsByState[stateKey] when set, else base + pseudo.
 *
 * @param {{ selector?: string, selectorsByState?: Record<string, string> }} meta
 * @param {string} stateKey
 * @returns {string}
 */
function resolveSelectorForState(meta, stateKey) {
  const map = meta?.selectorsByState;
  if (map && typeof map === 'object' && !Array.isArray(map)) {
    const raw = map[stateKey];
    if (raw != null && String(raw).trim()) {
      return String(raw).trim();
    }
  }
  return buildStateSelector(String(meta?.selector || '').trim(), stateKey);
}

/**
 * @returns {object}
 */
function createDefaultLayer() {
  return {
    tab: 'color',
    color: '',
    gradient: '',
    imageId: 0,
    imageUrl: '',
    size: 'cover',
    repeat: 'no-repeat',
    position: 'center center',
    attachment: 'scroll'
  };
}

/**
 * Image tab with no URL: explicit reset so color/gradient from this control (or theme head CSS) do not linger.
 * Keep in sync with onepress_background_image_tab_empty_declarations() in inc/customize-controls/background/helper.php.
 *
 * @returns {Record<string, string>}
 */
function imageTabEmptyDeclarations() {
  return {
    'background-color': 'transparent',
    'background-image': 'none',
    'background-repeat': 'no-repeat',
    'background-size': 'auto',
    'background-position': 'center center',
    'background-attachment': 'scroll'
  };
}

/**
 * @param {object} layer
 * @returns {Record<string, string>|null}
 */
function layerToDeclarations(layer) {
  if (!layer || typeof layer !== 'object') {
    return null;
  }
  const tab = layer.tab || 'color';
  if (tab === 'color') {
    const c = typeof layer.color === 'string' ? layer.color.trim() : '';
    if (!c) {
      return null;
    }
    return {
      'background-color': c,
      'background-image': 'none'
    };
  }
  if (tab === 'gradient') {
    const g = typeof layer.gradient === 'string' ? layer.gradient.trim() : '';
    if (!g) {
      return null;
    }
    return {
      'background-color': 'transparent',
      'background-image': g,
      'background-repeat': 'no-repeat'
    };
  }
  if (tab === 'image') {
    const u = typeof layer.imageUrl === 'string' ? layer.imageUrl.trim() : '';
    if (!u) {
      return imageTabEmptyDeclarations();
    }
    const safe = u.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return {
      'background-color': 'transparent',
      'background-image': `url("${safe}")`,
      'background-size': layer.size || 'cover',
      'background-repeat': layer.repeat || 'no-repeat',
      'background-position': layer.position || 'center center',
      'background-attachment': layer.attachment || 'scroll'
    };
  }
  return null;
}

/** @type {Record<string, string>} */
const DECLARATION_TO_REACT_STYLE = {
  'background-color': 'backgroundColor',
  'background-image': 'backgroundImage',
  'background-repeat': 'backgroundRepeat',
  'background-size': 'backgroundSize',
  'background-position': 'backgroundPosition',
  'background-attachment': 'backgroundAttachment'
};

/**
 * Convert layer CSS declarations to a React `style` object (Customizer state-button preview).
 *
 * @param {Record<string, string>|null} decls
 * @returns {import('react').CSSProperties|null}
 */
function declarationsToReactStyle(decls) {
  if (!decls || typeof decls !== 'object') {
    return null;
  }
  /** @type {import('react').CSSProperties} */
  const out = {};
  for (const [key, value] of Object.entries(decls)) {
    const reactKey = DECLARATION_TO_REACT_STYLE[key];
    if (reactKey) {
      out[reactKey] = value;
    }
  }
  return Object.keys(out).length ? out : null;
}

/**
 * @param {Record<string, string>} decls
 * @returns {string}
 */
function declarationsToBlock(decls) {
  const lines = Object.keys(decls).map(k => `  ${k}: ${decls[k]};`);
  return lines.join('\n');
}

/**
 * @param {string} selector
 * @param {Record<string, string>} decls
 * @returns {string}
 */
function ruleBlock(selector, decls) {
  if (!selector || !decls) {
    return '';
  }
  const inner = declarationsToBlock(decls);
  if (!inner) {
    return '';
  }
  return `${selector} {\n${inner}\n}`;
}

/**
 * @param {object} data
 * @param {{ tablet?: string, mobile?: string }} [breakpoints]
 * @returns {string}
 */
function buildBackgroundCss(data, breakpoints) {
  if (!data || !data._onepressBackground || !data._meta) {
    return '';
  }
  const meta = data._meta;
  const states = Array.isArray(meta.states) && meta.states.length ? meta.states : ['normal'];
  const bp = {
    tablet: breakpoints?.tablet || '991px',
    mobile: breakpoints?.mobile || '767px'
  };
  const chunks = [];
  for (const stateKey of states) {
    const sel = resolveSelectorForState(meta, stateKey);
    if (!sel) {
      continue;
    }
    const st = data[stateKey];
    if (!st || typeof st !== 'object') {
      continue;
    }
    const desk = layerToDeclarations(st.desktop);
    if (desk) {
      chunks.push(ruleBlock(sel, desk));
    }
    const tab = layerToDeclarations(st.tablet);
    if (tab) {
      chunks.push(`@media (max-width: ${bp.tablet}) {\n${ruleBlock(sel, tab)}\n}`);
    }
    const mob = layerToDeclarations(st.mobile);
    if (mob) {
      chunks.push(`@media (max-width: ${bp.mobile}) {\n${ruleBlock(sel, mob)}\n}`);
    }
  }
  return chunks.filter(Boolean).join('\n\n');
}

/**
 * @param {string} settingId
 * @returns {string}
 */
function backgroundStyleElementId(settingId) {
  return `onepress-bg-inline-${settingId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
}

/***/ },

/***/ "./src/admin/customizer/color-alpha/AlphaColorControlApp.jsx"
/*!*******************************************************************!*\
  !*** ./src/admin/customizer/color-alpha/AlphaColorControlApp.jsx ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlphaColorControlApp: () => (/* binding */ AlphaColorControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);

/**
 * Customizer control alpha-color: Popover below row + ColorPicker.
 */



function cssToPickerFormat(css, enableAlpha) {
  if (!css || !String(css).trim()) {
    return enableAlpha ? '#ffffffff' : '#ffffff';
  }
  const s = String(css).trim();
  const hexMatch = /^#([0-9a-f]{3,8})$/i.exec(s);
  if (hexMatch) {
    let h = hexMatch[1];
    if (h.length === 3) {
      h = h.split('').map(c => c + c).join('');
    }
    if (h.length === 6) {
      return enableAlpha ? `#${h}ff` : `#${h}`;
    }
    if (h.length === 8) {
      return enableAlpha ? `#${h}` : `#${h.slice(0, 6)}`;
    }
  }
  const rgba = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(s);
  if (rgba) {
    const r = Math.max(0, Math.min(255, parseInt(rgba[1], 10)));
    const g = Math.max(0, Math.min(255, parseInt(rgba[2], 10)));
    const b = Math.max(0, Math.min(255, parseInt(rgba[3], 10)));
    const a = rgba[4] !== undefined ? Math.max(0, Math.min(1, parseFloat(rgba[4]))) : 1;
    const toH = n => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
    const hex = `${toH(r)}${toH(g)}${toH(b)}`;
    if (enableAlpha) {
      const ai = Math.round(a * 255);
      return `#${hex}${ai.toString(16).padStart(2, '0')}`;
    }
    return `#${hex}`;
  }
  return enableAlpha ? '#ffffffff' : '#ffffff';
}
function AlphaColorControlApp({
  control
}) {
  var _wrap$querySelector, _wrap$querySelector2, _host$dataset$label, _host$dataset$descrip, _host$dataset$default, _ref, _control$setting$get;
  const wrap = control.container[0];
  const host = (_wrap$querySelector = wrap?.querySelector?.('.onepress-alpha-color-react-root')) !== null && _wrap$querySelector !== void 0 ? _wrap$querySelector : null;
  const input = (_wrap$querySelector2 = wrap?.querySelector?.('.onepress-alpha-color-input')) !== null && _wrap$querySelector2 !== void 0 ? _wrap$querySelector2 : null;
  const label = (_host$dataset$label = host?.dataset?.label) !== null && _host$dataset$label !== void 0 ? _host$dataset$label : '';
  const description = (_host$dataset$descrip = host?.dataset?.description) !== null && _host$dataset$descrip !== void 0 ? _host$dataset$descrip : '';
  const showOpacity = host?.dataset?.showOpacity !== 'false';
  const defaultColor = (_host$dataset$default = host?.dataset?.defaultColor) !== null && _host$dataset$default !== void 0 ? _host$dataset$default : '';
  const enableAlpha = showOpacity;
  const rowRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const [open, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const initialRaw = (_ref = (_control$setting$get = control.setting.get()) !== null && _control$setting$get !== void 0 ? _control$setting$get : input?.value) !== null && _ref !== void 0 ? _ref : '';
  const [rawValue, setRawValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(() => initialRaw != null ? String(initialRaw) : '');
  const [color, setColor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(() => cssToPickerFormat(initialRaw !== null && initialRaw !== void 0 ? initialRaw : '', enableAlpha));
  const swatchIsEmpty = !String(rawValue).trim();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const onChange = next => {
      const r = next != null ? String(next) : '';
      setRawValue(r);
      setColor(cssToPickerFormat(r, enableAlpha));
    };
    control.setting.bind(onChange);
    return () => {
      control.setting.unbind(onChange);
    };
  }, [control, enableAlpha]);
  const onPickerChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(nextHex => {
    const s = nextHex == null || String(nextHex).trim() === '' ? '' : String(nextHex);
    control.setting.set(s);
  }, [control]);
  const resetToDefault = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    const raw = defaultColor != null ? String(defaultColor) : '';
    control.setting.set(raw);
  }, [control, defaultColor]);
  const closePicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    setOpen(false);
  }, []);
  const clearColor = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    control.setting.set('');
    closePicker();
  }, [control, closePicker]);
  const pickerDefault = cssToPickerFormat(defaultColor, enableAlpha) || (enableAlpha ? '#ffffffff' : '#ffffff');
  const togglePicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    setOpen(v => !v);
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-alpha-color-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: rowRef,
    className: "onepress-alpha-color-control__row"
  }, label ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, label) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-alpha-color-control__actions flex items-center gap-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "onepress-customizer-reset-default",
    onClick: resetToDefault,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reset to default', 'onepress'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reset to default', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-image-rotate",
    "aria-hidden": true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `onepress-alpha-color-control__swatch-wrap ${open ? 'active' : ''}` + (swatchIsEmpty ? ' onepress-alpha-color-control__swatch-wrap--empty' : '')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `onepress-alpha-color-control__swatch input ` + (swatchIsEmpty ? ' onepress-alpha-color-control__swatch--empty' : ''),
    onClick: togglePicker,
    "aria-haspopup": "true",
    "aria-expanded": open,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Open color picker', 'onepress'),
    style: swatchIsEmpty ? undefined : {
      backgroundColor: color
    }
  })))), description ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description customize-control-description"
  }, description) : null, open && rowRef.current ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    className: "onepress-alpha-color-popover",
    anchor: rowRef.current,
    placement: "bottom-end",
    offset: 6,
    onClose: closePicker,
    focusOnMount: "firstElement"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-alpha-color-popover__inner"
  }, label ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-alpha-color-popover__title"
  }, label) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: color,
    onChange: onPickerChange,
    enableAlpha: enableAlpha,
    defaultValue: pickerDefault
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-alpha-color-popover__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "link",
    isDestructive: true,
    onClick: clearColor
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear color', 'onepress'))))) : null);
}

/***/ },

/***/ "./src/admin/customizer/color-alpha/color-alpha-controls.js"
/*!******************************************************************!*\
  !*** ./src/admin/customizer/color-alpha/color-alpha-controls.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _AlphaColorControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AlphaColorControlApp.jsx */ "./src/admin/customizer/color-alpha/AlphaColorControlApp.jsx");
/**
 * Customizer control: alpha-color (React + Modal + ColorPicker).
 */



const {
  customize
} = wp;
customize.controlConstructor['alpha-color'] = customize.Control.extend({
  ready() {
    const control = this;
    const wrap = control.container[0];
    const host = wrap?.querySelector?.('.onepress-alpha-color-react-root');
    if (!host) {
      return;
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(host);
    root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AlphaColorControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__.AlphaColorControlApp, {
      control
    }));
    control._onepressAlphaColorRoot = root;
  },
  destroy() {
    if (this._onepressAlphaColorRoot) {
      this._onepressAlphaColorRoot.unmount();
      this._onepressAlphaColorRoot = null;
    }
    customize.Control.prototype.destroy.call(this);
  }
});

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

/***/ "./src/admin/customizer/dynamic-sections.js"
/*!**************************************************!*\
  !*** ./src/admin/customizer/dynamic-sections.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerDynamicOptionBlocks: () => (/* binding */ registerDynamicOptionBlocks)
/* harmony export */ });
/**
 * Dynamic Customizer “option blocks” — pairs with {@see onepress_register_dynamic_option_blocks()} (PHP).
 *
 * @param {import('wp-customize').Customize} api  wp.customize
 * @param {Record<string, unknown>}          userCfg Same shape as ONEPRESS_DYNAMIC_BLOCKS[i]
 */
function registerDynamicOptionBlocks(api, userCfg) {
  const $ = jQuery;
  const cfg = normalizeCfg(userCfg);
  const panelId = cfg.panelId;
  const orderSettingId = cfg.orderSettingId;
  const sectionTypeBlock = cfg.sectionTypeBlock;
  const sectionTypeNew = cfg.sectionTypeNew;
  const addSectionId = cfg.addSectionId;
  const sortableDataKey = 'onepressDynamicSortable_' + panelId;
  const deleteInnerControlType = 'onepress_dyn_del_inner_' + panelId.replace(/[^a-z0-9]+/gi, '_');
  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function blockSectionId(blockId) {
    return cfg.blockSectionPrefix + String(blockId);
  }
  function blockOptionSettingBase(blockId) {
    return cfg.blockOptionPrefix + String(blockId);
  }
  function collectBlockIdsFromSettings() {
    const names = cfg.fieldNames;
    if (!names.length) {
      return [];
    }
    const fieldPat = names.map(escapeRe).join('|');
    const re = new RegExp('^' + escapeRe(cfg.blockOptionPrefix) + '(\\d+)_(' + fieldPat + ')$');
    const ids = {};
    api.each(function (setting, id) {
      const m = id.match(re);
      if (!m) {
        return;
      }
      const bid = m[1];
      const field = m[2];
      if (!ids[bid]) {
        ids[bid] = {};
      }
      ids[bid][field] = true;
    });
    const req = cfg.requiredFields;
    return Object.keys(ids).filter(function (bid) {
      return req.every(function (f) {
        return ids[bid][f];
      });
    });
  }
  function parseOrderSetting() {
    let order = [];
    try {
      const raw = api(orderSettingId) && api(orderSettingId).get ? api(orderSettingId).get() : '[]';
      order = JSON.parse(raw || '[]');
    } catch (e) {
      order = [];
    }
    if (!Array.isArray(order)) {
      order = [];
    }
    return order.map(function (x) {
      return String(x);
    }).filter(function (id) {
      return /^\d+$/.test(id);
    });
  }
  function getOrderedBlockIds() {
    const order = parseOrderSetting();
    const fromSettings = collectBlockIdsFromSettings();
    if (order.length) {
      const set = {};
      fromSettings.forEach(function (id) {
        set[id] = true;
      });
      const merged = order.filter(function (id) {
        return set[id];
      });
      fromSettings.forEach(function (id) {
        if (merged.indexOf(id) === -1) {
          merged.push(id);
        }
      });
      return merged;
    }
    return fromSettings.sort(function (a, b) {
      return parseInt(a, 10) - parseInt(b, 10);
    });
  }
  function appendIdToOrder(blockId) {
    const sid = String(blockId);
    const order = parseOrderSetting();
    if (order.indexOf(sid) === -1) {
      order.push(sid);
    }
    api(orderSettingId).set(JSON.stringify(order));
  }
  function focusNewlyAddedSection(sectionInst, blockId) {
    const titleControlId = blockOptionSettingBase(blockId) + '_title';
    const deferFn = window._ && typeof window._.defer === 'function' ? window._.defer.bind(window._) : function (fn) {
      setTimeout(fn, 0);
    };
    function afterPaint(fn) {
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(function () {
          requestAnimationFrame(fn);
        });
      } else {
        setTimeout(fn, 32);
      }
    }
    function focusTitleControl() {
      api.control(titleControlId, function (control) {
        control.deferred.embedded.done(function () {
          afterPaint(function () {
            if (control.focus && typeof control.focus === 'function') {
              control.focus();
              return;
            }
            const $in = control.container.find('input, textarea').filter(':visible').first();
            if ($in.length) {
              $in.trigger('focus');
            }
          });
        });
      });
    }
    api.panel(panelId, function (panel) {
      function afterPanelReady() {
        sectionInst.deferred.embedded.done(function () {
          if (typeof api.reflowPaneContents === 'function') {
            api.reflowPaneContents();
          }
          deferFn(function () {
            sectionInst.expand({
              completeCallback: function () {
                deferFn(focusTitleControl);
              }
            });
          });
        });
      }
      if (panel.expanded && !panel.expanded()) {
        panel.expand({
          completeCallback: afterPanelReady
        });
      } else {
        afterPanelReady();
      }
    });
  }
  function syncSectionTitle(section, bid, titleSid) {
    api(titleSid, function (setting) {
      function refresh() {
        const v = String(setting.get() || '').trim();
        const t = v || 'Untitled';
        section.params.title = t;
        const $headBtn = section.headContainer.find('.accordion-section-title .accordion-trigger, .accordion-section-title button').first();
        if ($headBtn.length) {
          $headBtn.text(t);
        }
        const $pane = $('#sub-accordion-section-' + section.id);
        let $h3 = $pane.find('.customize-section-title h3').first();
        if (!$h3.length) {
          $h3 = section.contentContainer.find('.customize-section-title h3').first();
        }
        if ($h3.length) {
          const $action = $h3.children('.customize-action').detach();
          $h3.empty();
          if ($action.length) {
            $h3.append($action);
          }
          $h3.append(document.createTextNode(t));
        }
      }
      setting.bind(refresh);
      refresh();
    });
  }
  function installDragHandle(section) {
    const h3 = section.headContainer.find('.accordion-section-title').first();
    if (!h3.length || h3.find('.onepress-dynamic-drag-handle').length) {
      return;
    }
    const $grip = $('<span class="onepress-dynamic-drag-handle" aria-hidden="true"></span>');
    $grip.attr('title', 'Drag to reorder');
    h3.addClass('dynamic-section-title');
    h3.prepend($grip);
  }
  function bindExtraNoteActive(showSid, noteSid) {
    api.control(noteSid, function (noteControl) {
      const showSetting = api(showSid);
      function refresh() {
        const v = showSetting.get();
        const on = v === 1 || v === '1' || v === true || String(v).toLowerCase() === 'true';
        noteControl.active.set(!!on);
      }
      showSetting.bind(refresh);
      refresh();
    });
  }
  function onPanelSortUpdate() {
    const $root = $('#sub-accordion-panel-' + panelId);
    if (!$root.length) {
      return;
    }
    const ids = [];
    const blockRe = new RegExp('^accordion-section-(' + escapeRe(cfg.blockSectionPrefix) + '\\d+)$');
    const addLid = 'accordion-section-' + addSectionId;
    $root.children('li.accordion-section').each(function () {
      const lid = this.id || '';
      if (lid === addLid) {
        return;
      }
      const m = lid.match(blockRe);
      if (!m) {
        return;
      }
      const full = m[1];
      const num = full.replace(new RegExp('^' + escapeRe(cfg.blockSectionPrefix)), '');
      if (/^\d+$/.test(num)) {
        ids.push(num);
      }
    });
    api(orderSettingId).set(JSON.stringify(ids));
    ids.forEach(function (bid, i) {
      const sid = blockSectionId(bid);
      if (api.section.has(sid)) {
        api.section(sid).priority.set(10 + i);
      }
    });
    if (typeof api.reflowPaneContents === 'function') {
      api.reflowPaneContents();
    }
  }
  function initPanelSortable() {
    const $root = $('#sub-accordion-panel-' + panelId);
    if (!$root.length) {
      return;
    }
    if ($root.data(sortableDataKey)) {
      if ($root.hasClass('ui-sortable')) {
        $root.sortable('refresh');
      }
      return;
    }
    $root.sortable({
      items: '> li.accordion-section:not(#accordion-section-' + addSectionId + ')',
      handle: '.onepress-dynamic-drag-handle',
      axis: 'y',
      tolerance: 'pointer',
      placeholder: 'onepress-dynamic-sortable-placeholder',
      update: onPanelSortUpdate
    });
    $root.data(sortableDataKey, true);
  }
  function scheduleInitSortable() {
    const deferFn = window._ && typeof window._.defer === 'function' ? window._.defer.bind(window._) : function (fn) {
      setTimeout(fn, 0);
    };
    deferFn(initPanelSortable);
  }
  function refreshPanelSortable() {
    const $root = $('#sub-accordion-panel-' + panelId);
    if ($root.length && $root.data(sortableDataKey) && $root.hasClass('ui-sortable')) {
      $root.sortable('refresh');
    }
  }
  function sectionHiddenSettingId(bid) {
    return blockOptionSettingBase(bid) + '_section_hidden';
  }
  function removeDynamicBlock(blockId) {
    const sectionId = blockSectionId(blockId);
    const base = blockOptionSettingBase(blockId);
    const sec = api.section.has(sectionId) ? api.section(sectionId) : null;
    const stripFromCustomizer = function () {
      const innerDelId = sectionId + '_delete_inner';
      if (api.control.has(innerDelId)) {
        api.control.remove(innerDelId);
      }
      cfg.fieldNames.forEach(function (field) {
        const sid = base + '_' + field;
        if (api.control.has(sid)) {
          api.control.remove(sid);
        }
        if (api.has(sid)) {
          api.remove(sid);
        }
      });
      const order = parseOrderSetting().filter(function (id) {
        return id !== String(blockId);
      });
      api(orderSettingId).set(JSON.stringify(order));
      refreshPanelSortable();
      if (typeof api.reflowPaneContents === 'function') {
        api.reflowPaneContents();
      }
    };
    const removeDomAndSection = function () {
      stripFromCustomizer();
      if (sec) {
        sec.container.remove();
        api.section.remove(sectionId);
      }
    };
    if (sec && sec.expanded && sec.expanded()) {
      sec.collapse({
        completeCallback: removeDomAndSection
      });
    } else {
      removeDomAndSection();
    }
  }
  if (!api.controlConstructor[deleteInnerControlType]) {
    api.controlConstructor[deleteInnerControlType] = api.Control.extend({
      ready() {
        const control = this;
        const bid = control.params.block_id;
        const $btn = $('<button type="button" class="button button-secondary onepress-dynamic-section-delete-inner" />');
        $btn.append('<span class="dashicons dashicons-trash" aria-hidden="true"></span> ');
        $btn.append(document.createTextNode('Remove this section'));
        control.container.addClass('customize-control-onepress-dynamic-delete-inner').empty().append($('<p class="description customize-control-description" />').text('Removes this block from the list. Save & Publish to update stored options.')).append($btn);
        $btn.on('click', function (e) {
          e.preventDefault();
          if (!window.confirm('Remove this section from the list? Save & Publish to update stored options.')) {
            return;
          }
          removeDynamicBlock(bid);
        });
      }
    });
  }
  function installSectionToolbar(section) {
    const bid = section.params.block_id;
    if (!bid || section._onepressDynamicToolbar) {
      return;
    }
    const h3 = section.headContainer.find('.accordion-section-title').first();
    if (!h3.length) {
      return;
    }
    const hasHidden = cfg.fieldNames.indexOf('section_hidden') !== -1;
    const showListDelete = cfg.deleteInList === true;
    if (!hasHidden && !showListDelete) {
      return;
    }
    section._onepressDynamicToolbar = true;
    const $grip = h3.find('.onepress-dynamic-drag-handle').first();
    let $vis = null;
    let $del = null;
    if (showListDelete) {
      $del = $('<button type="button" class="button-link onepress-dynamic-section-delete" />');
      $del.attr({
        'aria-label': 'Remove section',
        title: 'Remove section from list'
      });
      $del.append('<span class="dashicons dashicons-trash" aria-hidden="true"></span>');
      $del.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm('Remove this section from the list? Save & Publish to update stored options.')) {
          return;
        }
        removeDynamicBlock(bid);
      });
    }
    if (hasHidden) {
      $vis = $('<button type="button" class="button-link onepress-dynamic-section-visibility" />');
      $vis.attr({
        'aria-label': 'Toggle visibility in preview',
        title: 'Hide or show in preview'
      });
      const $icon = $('<span class="dashicons dashicons-visibility" aria-hidden="true"></span>');
      $vis.append($icon);
      function readHidden() {
        const sid = sectionHiddenSettingId(bid);
        if (!api.has(sid)) {
          return false;
        }
        const v = api(sid).get();
        return v === 1 || v === '1' || v === true;
      }
      function applyHiddenVisual(hidden) {
        section.container.toggleClass('onepress-dynamic-section-is-hidden', hidden);
        $vis.toggleClass('is-section-hidden', hidden);
        $vis.attr('aria-pressed', hidden ? 'true' : 'false');
      }
      api(sectionHiddenSettingId(bid), function (setting) {
        setting.bind(function () {
          applyHiddenVisual(readHidden());
        });
      });
      applyHiddenVisual(readHidden());
      $vis.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const sid = sectionHiddenSettingId(bid);
        if (!api.has(sid)) {
          return;
        }
        api(sid).set(readHidden() ? 0 : 1);
      });
    }
    if ($grip.length) {
      let $anchor = $grip;
      if ($vis && $vis.length) {
        $anchor.after($vis);
        $anchor = $vis;
      }
      if ($del && $del.length) {
        $anchor.after($del);
      }
    } else {
      if ($vis && $vis.length) {
        h3.prepend($vis);
      }
      if ($del && $del.length) {
        if ($vis && $vis.length) {
          $vis.after($del);
        } else {
          h3.prepend($del);
        }
      }
    }
  }
  const DynamicBlockSection = api.Section.extend({
    ready() {
      const section = this;
      section.populateControls();
      const bid = section.params.block_id;
      if (bid) {
        syncSectionTitle(section, bid, blockOptionSettingBase(bid) + '_title');
      }
      installDragHandle(section);
      installSectionToolbar(section);
      section.active.validate = function () {
        const id = section.params.block_id;
        if (!id) {
          return false;
        }
        const t = blockOptionSettingBase(id) + '_title';
        return api.has(t) && api(t).get() !== false;
      };
    },
    populateControls() {
      const section = this;
      const bid = section.params.block_id;
      if (!bid) {
        return;
      }
      const base = blockOptionSettingBase(bid);
      let priority = 1;
      const bindExtraKey = '_onepressDynamicExtraNoteBound';
      cfg.fieldNames.forEach(function (field) {
        const sid = base + '_' + field;
        if (field === 'title') {
          if (!api.control.has(sid)) {
            api.control.add(new api.Control(sid, {
              type: 'text',
              label: 'Section title',
              description: 'Updates the section label in the sidebar; saved as a theme option.',
              section: section.id,
              settings: {
                default: sid
              },
              priority: priority
            }));
            api.control(sid).active.set(true);
          }
          priority += 1;
          return;
        }
        if (field === 'section_hidden') {
          // Toggled from the section row (eye); no duplicate control here.
          priority += 1;
          return;
        }
        if (field === 'show_extra') {
          if (!api.control.has(sid)) {
            api.control.add(new api.Control(sid, {
              type: 'checkbox',
              label: 'Show extra note field',
              description: 'JS: toggles visibility of the next control (same idea as PHP active_callback).',
              section: section.id,
              settings: {
                default: sid
              },
              priority: priority
            }));
            api.control(sid).active.set(true);
          }
          priority += 1;
          return;
        }
        if (field === 'extra_note') {
          if (!api.control.has(sid)) {
            api.control.add(new api.Control(sid, {
              type: 'text',
              label: 'Extra note',
              description: 'Visible when “Show extra note field” is checked.',
              section: section.id,
              settings: {
                default: sid
              },
              priority: priority
            }));
            api.control(sid).active.set(false);
          }
          priority += 1;
          return;
        }
        if (field === 'slider') {
          if (api.controlConstructor.onepress_slider && !api.control.has(sid)) {
            api.control.add(new api.controlConstructor.onepress_slider(sid, {
              type: 'onepress_slider',
              label: 'Slider (max-width)',
              description: 'Theme option: ' + sid,
              section: section.id,
              settings: {
                default: sid
              },
              priority: priority,
              css_selector: '.site-header .site-branding',
              css_property: 'max-width',
              slider_min: 40,
              slider_max: 600,
              slider_step: 1
            }));
            api.control(sid).active.set(true);
          }
          priority += 1;
          return;
        }
        if (!api.control.has(sid)) {
          api.control.add(new api.Control(sid, {
            type: 'text',
            label: field,
            section: section.id,
            settings: {
              default: sid
            },
            priority: priority
          }));
          api.control(sid).active.set(true);
        }
        priority += 1;
      });
      const showSid = base + '_show_extra';
      const noteSid = base + '_extra_note';
      if (!section[bindExtraKey] && api.control.has(noteSid) && api.has(showSid)) {
        section[bindExtraKey] = true;
        bindExtraNoteActive(showSid, noteSid);
      }
      if (!cfg.deleteInList) {
        const delId = section.id + '_delete_inner';
        if (!api.control.has(delId)) {
          api.control.add(new api.controlConstructor[deleteInnerControlType](delId, {
            type: deleteInnerControlType,
            section: section.id,
            priority: 10000,
            settings: {},
            block_id: bid
          }));
          api.control(delId).active.set(true);
        }
      }
    }
  });
  const DynamicNewSection = api.Section.extend({
    attachEvents() {
      const section = this;
      const $title = section.headContainer.find('.accordion-section-title');
      $title.empty();
      const $h3 = $('<span class="onepress-dynamic-new-heading"></span>');
      const $btn = $('<button type="button" class="button button-secondary customize-add-dynamic-block-button" aria-expanded="false"></button>').text(cfg.addSectionTitle);
      $h3.append($btn);
      $title.append($h3);
      $btn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const id = placeholderBlockId();
        const maxPri = maxBlockPriorityInPanel();
        const newSection = addDynamicBlockSection(id, {
          skipCreateSettings: false,
          priority: maxPri + 1
        });
        appendIdToOrder(id);
        const deferFn = window._ && typeof window._.defer === 'function' ? window._.defer.bind(window._) : function (fn) {
          setTimeout(fn, 0);
        };
        deferFn(function () {
          if (typeof api.reflowPaneContents === 'function') {
            api.reflowPaneContents();
          }
          refreshPanelSortable();
          scheduleInitSortable();
        });
        focusNewlyAddedSection(newSection, id);
      });
      section.contentContainer.addClass('onepress-dynamic-new__content');
      api.Section.prototype.attachEvents.apply(section, arguments);
    },
    isContextuallyActive() {
      return true;
    }
  });
  api.sectionConstructor[sectionTypeBlock] = DynamicBlockSection;
  api.sectionConstructor[sectionTypeNew] = DynamicNewSection;
  function placeholderBlockId() {
    return Math.floor(Math.random() * 800000000) + 100000000;
  }
  function maxBlockPriorityInPanel() {
    let max = 9;
    api.section.each(function (s) {
      if (s.params.panel !== panelId) {
        return;
      }
      if (s.params.type !== sectionTypeBlock) {
        return;
      }
      const p = s.priority.get();
      if (p > max) {
        max = p;
      }
    });
    return max;
  }
  function addDynamicBlockSection(blockId, options) {
    const opts = options || {};
    const skipCreate = opts.skipCreateSettings === true;
    const sectionId = blockSectionId(blockId);
    if (api.section.has(sectionId)) {
      return api.section(sectionId);
    }
    if (!skipCreate) {
      cfg.fieldNames.forEach(function (field) {
        const sid = blockOptionSettingBase(blockId) + '_' + field;
        const def = Object.prototype.hasOwnProperty.call(cfg.fieldDefaults, field) ? cfg.fieldDefaults[field] : '';
        if (!api.has(sid)) {
          api.create(sid, sid, def, {
            transport: 'refresh',
            previewer: api.previewer
          });
        }
      });
    }
    const titleSid = blockOptionSettingBase(blockId) + '_title';
    const title = api(titleSid) && api(titleSid).get && String(api(titleSid).get()) || '';
    const pri = typeof opts.priority === 'number' ? opts.priority : maxBlockPriorityInPanel() + 1;
    const section = new DynamicBlockSection(sectionId, {
      type: sectionTypeBlock,
      panel: panelId,
      title: title.trim() ? title : 'Untitled',
      priority: pri,
      block_id: String(blockId),
      customizeAction: cfg.customizeAction
    });
    api.section.add(section);
    return section;
  }
  api.bind('ready', function () {
    const ordered = getOrderedBlockIds();
    ordered.forEach(function (bid, i) {
      addDynamicBlockSection(bid, {
        skipCreateSettings: true,
        priority: 10 + i
      });
    });
    api.section(addSectionId, function (addSection) {
      addSection.isContextuallyActive = function () {
        return true;
      };
      addSection.active.set(true);
    });
    api.panel(panelId, function (panel) {
      panel.active.set(true);
      panel.expanded.bind(function (ex) {
        if (ex) {
          scheduleInitSortable();
        }
      });
      if (panel.expanded && panel.expanded()) {
        scheduleInitSortable();
      }
    });
  });
}
function normalizeCfg(c) {
  if (!c || typeof c !== 'object') {
    return {
      panelId: '',
      orderSettingId: '',
      blockSectionPrefix: '',
      blockOptionPrefix: '',
      sectionTypeBlock: '',
      sectionTypeNew: '',
      addSectionId: '',
      addSectionTitle: 'Create new section',
      customizeAction: '',
      fieldNames: [],
      requiredFields: ['title', 'slider'],
      fieldDefaults: {},
      deleteInList: false
    };
  }
  return {
    panelId: String(c.panelId || ''),
    orderSettingId: String(c.orderSettingId || ''),
    blockSectionPrefix: String(c.blockSectionPrefix || ''),
    blockOptionPrefix: String(c.blockOptionPrefix || ''),
    sectionTypeBlock: String(c.sectionTypeBlock || ''),
    sectionTypeNew: String(c.sectionTypeNew || ''),
    addSectionId: String(c.addSectionId || ''),
    addSectionTitle: String(c.addSectionTitle != null && c.addSectionTitle !== '' ? c.addSectionTitle : 'Create new section'),
    customizeAction: String(c.customizeAction || ''),
    fieldNames: Array.isArray(c.fieldNames) ? c.fieldNames.map(String) : [],
    requiredFields: Array.isArray(c.requiredFields) ? c.requiredFields.map(String) : ['title', 'slider'],
    fieldDefaults: c.fieldDefaults && typeof c.fieldDefaults === 'object' ? c.fieldDefaults : {},
    deleteInList: c.deleteInList === true
  };
}

/***/ },

/***/ "./src/admin/customizer/getCustomizeControlDefaultRaw.js"
/*!***************************************************************!*\
  !*** ./src/admin/customizer/getCustomizeControlDefaultRaw.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCustomizeControlDefaultRaw: () => (/* binding */ getCustomizeControlDefaultRaw)
/* harmony export */ });
/**
 * Raw default string for a Customize control setting (JSON where applicable).
 *
 * @param {object} control wp.customize.Control instance
 * @returns {string}
 */
function getCustomizeControlDefaultRaw(control) {
  // WP_Customize_Setting::json() does not expose PHP `default` to JS; OnePress controls add it in to_json().
  const fromParams = control.params?.default;
  if (fromParams != null && fromParams !== '') {
    if (typeof fromParams === 'string') {
      return fromParams;
    }
    if (typeof fromParams === 'object') {
      try {
        return JSON.stringify(fromParams);
      } catch {
        return '';
      }
    }
    return String(fromParams);
  }
  const setting = control.setting || control.settings?.default;
  if (setting && typeof setting === 'object' && 'default' in setting) {
    const d = setting.default;
    if (typeof d === 'string') {
      return d;
    }
    if (d != null && typeof d === 'object') {
      try {
        return JSON.stringify(d);
      } catch {
        return '';
      }
    }
    if (d != null) {
      return String(d);
    }
  }
  return '';
}

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
    if (!$actions.length) {
      return;
    }
    // PHP template: .limited-msg sits *inside* .repeatable-actions. Hiding the whole
    // .repeatable-actions (old behavior) hid the message too; the empty placeholder also
    // blocked insertAfter($actions). Only hide the add-button row; fill/show .limited-msg.
    const $addRow = $actions.children('div').first();
    const $limited = $actions.find('.limited-msg').first();
    const n = items.length;
    const atLimit = maxItem > 0 && n >= maxItem;
    if (atLimit) {
      $addRow.hide();
      if (limitedMsg) {
        if ($limited.length) {
          $limited.html(limitedMsg).show();
        } else {
          $('<p class="limited-msg" />').html(limitedMsg).insertAfter($actions);
        }
      } else {
        $limited.hide().empty();
      }
    } else {
      $addRow.show();
      $limited.hide().empty();
      $actions.next('p.limited-msg').remove();
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

/***/ "./src/admin/customizer/slider/SliderControlApp.jsx"
/*!**********************************************************!*\
  !*** ./src/admin/customizer/slider/SliderControlApp.jsx ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SliderControlApp: () => (/* binding */ SliderControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CustomizerPreviewDeviceButtons.jsx */ "./src/admin/customizer/CustomizerPreviewDeviceButtons.jsx");
/* harmony import */ var _CustomizerUnitSelectPopover_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CustomizerUnitSelectPopover.jsx */ "./src/admin/customizer/CustomizerUnitSelectPopover.jsx");
/* harmony import */ var _getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../getCustomizeControlDefaultRaw.js */ "./src/admin/customizer/getCustomizeControlDefaultRaw.js");

/**
 * Responsive slider Customizer control — single CSS length (slider + number).
 */





const SIZE_UNITS = ['px', 'em', 'rem', '%'];
const PREVIEW_DEVICES = ['desktop', 'tablet', 'mobile'];
const DEVICE_KEY = {
  desktop: '',
  tablet: 'Tablet',
  mobile: 'Mobile'
};

/**
 * @param {string} raw
 * @returns {object}
 */
function parseSliderState(raw) {
  const base = {
    value: '',
    valueTablet: '',
    valueMobile: '',
    unit: 'px',
    unitTablet: 'px',
    unitMobile: 'px'
  };
  if (!raw || typeof raw !== 'string' || !raw.trim()) {
    return base;
  }
  try {
    const o = JSON.parse(raw);
    if (!o || typeof o !== 'object') {
      return base;
    }
    return {
      ...base,
      value: o.value != null ? String(o.value) : '',
      valueTablet: o.valueTablet != null ? String(o.valueTablet) : '',
      valueMobile: o.valueMobile != null ? String(o.valueMobile) : '',
      unit: SIZE_UNITS.includes(String(o.unit || '').toLowerCase()) ? String(o.unit).toLowerCase() : 'px',
      unitTablet: SIZE_UNITS.includes(String(o.unitTablet || o.unit || '').toLowerCase()) ? String(o.unitTablet || o.unit || 'px').toLowerCase() : 'px',
      unitMobile: SIZE_UNITS.includes(String(o.unitMobile || o.unit || '').toLowerCase()) ? String(o.unitMobile || o.unit || 'px').toLowerCase() : 'px'
    };
  } catch {
    return base;
  }
}

/**
 * @param {import('@wordpress/element').RefObject} settingRef
 * @param {object} state
 */
function useSliderSync(settingRef, state) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const setting = settingRef.current;
    if (setting && typeof setting.set === 'function') {
      setting.set(JSON.stringify(state));
    }
  }, [state, settingRef]);
}

/**
 * @param {object} props
 */
function SliderControlApp({
  control
}) {
  var _ref, _ref2, _state$valueKey;
  const params = control.params || {};
  const controlLabel = typeof params.label === 'string' && params.label.trim() ? params.label.trim() : '';
  const controlDescription = typeof params.description === 'string' && params.description.trim() ? params.description : '';
  const sliderMin = Number.isFinite(Number(params.slider_min)) ? Number(params.slider_min) : 0;
  const sliderMax = Number.isFinite(Number(params.slider_max)) ? Number(params.slider_max) : 500;
  const sliderStep = Number.isFinite(Number(params.slider_step)) ? Number(params.slider_step) : 1;
  const labels = {
    unit: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unit', 'onepress'),
    ...(params.labels || {})
  };
  const settingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  settingRef.current = control.setting || control.settings?.default;
  const rawInitial = (_ref = (_ref2 = typeof control.setting?.get === 'function' ? control.setting.get() : null) !== null && _ref2 !== void 0 ? _ref2 : params.value) !== null && _ref !== void 0 ? _ref : '';
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => parseSliderState(typeof rawInitial === 'string' ? rawInitial : ''));
  const [previewDevice, setPreviewDevice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('desktop');
  const patch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(partial => {
    setState(prev => ({
      ...prev,
      ...partial
    }));
  }, []);
  const selectPreviewDevice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(device => {
    if (typeof window !== 'undefined' && window.wp?.customize?.previewedDevice) {
      window.wp.customize.previewedDevice.set(device);
    } else {
      setPreviewDevice(device);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const api = typeof window !== 'undefined' && window.wp?.customize;
    if (!api?.previewedDevice) {
      return undefined;
    }
    const handler = device => {
      if (PREVIEW_DEVICES.includes(device)) {
        setPreviewDevice(device);
      }
    };
    api.previewedDevice.bind(handler);
    const current = api.previewedDevice.get();
    if (PREVIEW_DEVICES.includes(current)) {
      setPreviewDevice(current);
    }
    return () => {
      api.previewedDevice.unbind(handler);
    };
  }, []);
  useSliderSync(settingRef, state);
  const dev = PREVIEW_DEVICES.includes(previewDevice) ? previewDevice : 'desktop';
  const dSuffix = DEVICE_KEY[dev];
  const valueKey = dSuffix ? `value${dSuffix}` : 'value';
  const unitKey = dSuffix ? `unit${dSuffix}` : 'unit';
  const currentValue = (_state$valueKey = state[valueKey]) !== null && _state$valueKey !== void 0 ? _state$valueKey : '';
  const currentUnit = state[unitKey] || 'px';
  const clampNumeric = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(raw => {
    var _String$split$1$lengt;
    const s = raw === '' || raw == null ? '' : String(raw).trim();
    if (s === '') {
      return '';
    }
    const n = Number(s);
    if (Number.isNaN(n)) {
      return '';
    }
    const c = Math.min(sliderMax, Math.max(sliderMin, n));
    if (sliderStep >= 1) {
      return String(Math.round(c / sliderStep) * sliderStep);
    }
    const decimals = (_String$split$1$lengt = String(sliderStep).split('.')[1]?.length) !== null && _String$split$1$lengt !== void 0 ? _String$split$1$lengt : 0;
    return String(Number(c.toFixed(decimals)));
  }, [sliderMin, sliderMax, sliderStep]);
  const rangeDisplayValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const n = Number(currentValue);
    if (currentValue === '' || Number.isNaN(n)) {
      return sliderMin;
    }
    return Math.min(sliderMax, Math.max(sliderMin, n));
  }, [currentValue, sliderMin, sliderMax]);
  const rangeFillPct = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const span = sliderMax - sliderMin;
    if (span <= 0) {
      return 0;
    }
    return (rangeDisplayValue - sliderMin) / span * 100;
  }, [rangeDisplayValue, sliderMin, sliderMax]);
  const setValueForDevice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(nextRaw => {
    const clamped = clampNumeric(nextRaw);
    patch({
      [valueKey]: clamped
    });
  }, [clampNumeric, patch, valueKey]);
  const resetToDefault = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    const raw = (0,_getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_5__.getCustomizeControlDefaultRaw)(control);
    let str = '';
    if (raw != null && typeof raw === 'string') {
      str = raw;
    } else if (raw != null && typeof raw === 'object') {
      try {
        str = JSON.stringify(raw);
      } catch {
        str = '';
      }
    }
    setState(parseSliderState(str));
  }, [control]);
  const valueInputId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => `onepress-slider-num-${control.id || 'slider'}`.replace(/[^a-zA-Z0-9_-]/g, '-'), [control.id]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-slider-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "head flex justify-between items-center w-full"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title"
  }, controlLabel ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, controlLabel) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__.CustomizerPreviewDeviceButtons, {
    devices: (0,_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__.getCustomizerPreviewDeviceDefinitions)(),
    activeDevice: previewDevice,
    onSelectDevice: selectPreviewDevice,
    groupClassName: "devices",
    buttonClassName: "device-btn"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "onepress-customizer-reset-default",
    onClick: resetToDefault,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-image-rotate",
    "aria-hidden": true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "unit"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizerUnitSelectPopover_jsx__WEBPACK_IMPORTED_MODULE_4__.CustomizerUnitSelectPopover, {
    key: previewDevice,
    units: SIZE_UNITS,
    value: currentUnit,
    onChange: u => patch({
      [unitKey]: u
    }),
    placement: "bottom-end",
    triggerClassName: "toplv opc-input select unit-popover-trigger"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "range",
    className: "range",
    style: {
      '--onepress-slider-fill-pct': `${rangeFillPct}%`
    },
    min: sliderMin,
    max: sliderMax,
    step: sliderStep,
    value: rangeDisplayValue,
    "aria-label": controlLabel ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s: control label */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s — slider', 'onepress'), controlLabel) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Value slider', 'onepress'),
    onChange: e => setValueForDevice(e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: valueInputId,
    type: "number",
    className: "opc-input number",
    min: sliderMin,
    max: sliderMax,
    step: sliderStep,
    value: currentValue,
    placeholder: String(sliderMin),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Value', 'onepress'),
    onChange: e => {
      const v = e.target.value;
      if (v === '') {
        patch({
          [valueKey]: ''
        });
        return;
      }
      setValueForDevice(v);
    }
  })), controlDescription ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description customize-control-description",
    dangerouslySetInnerHTML: {
      __html: controlDescription
    }
  }) : null);
}

/***/ },

/***/ "./src/admin/customizer/slider/slider-controls.js"
/*!********************************************************!*\
  !*** ./src/admin/customizer/slider/slider-controls.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _SliderControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SliderControlApp.jsx */ "./src/admin/customizer/slider/SliderControlApp.jsx");
/**
 * Slider Customizer control — React UI. Control type: onepress_slider
 */



const {
  customize
} = wp;
customize.controlConstructor.onepress_slider = customize.Control.extend({
  ready() {
    const control = this;
    const wrap = control.container[0];
    const host = wrap?.querySelector?.('.onepress-slider-react-root');
    if (!host) {
      return;
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(host);
    root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SliderControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__.SliderControlApp, {
      control
    }));
    control._onepressSliderRoot = root;
  },
  destroy() {
    if (this._onepressSliderRoot) {
      this._onepressSliderRoot.unmount();
      this._onepressSliderRoot = null;
    }
    customize.Control.prototype.destroy.call(this);
  }
});

/***/ },

/***/ "./src/admin/customizer/spacing/SpacingControlApp.jsx"
/*!************************************************************!*\
  !*** ./src/admin/customizer/spacing/SpacingControlApp.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpacingControlApp: () => (/* binding */ SpacingControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CustomizerPreviewDeviceButtons.jsx */ "./src/admin/customizer/CustomizerPreviewDeviceButtons.jsx");
/* harmony import */ var _CustomizerUnitSelectPopover_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CustomizerUnitSelectPopover.jsx */ "./src/admin/customizer/CustomizerUnitSelectPopover.jsx");
/* harmony import */ var _getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../getCustomizeControlDefaultRaw.js */ "./src/admin/customizer/getCustomizeControlDefaultRaw.js");

/**
 * Spacing Customizer control — padding / margin, responsive (Customizer React).
 */





const SIZE_UNITS = ['px', 'em', 'rem', '%'];
const PREVIEW_DEVICES = ['desktop', 'tablet', 'mobile'];
const DEVICE_KEY = {
  desktop: '',
  tablet: 'Tablet',
  mobile: 'Mobile'
};
const SIDE_KEYS = ['top', 'right', 'bottom', 'left'];

/**
 * @param {string} str
 * @returns {{ num: string, unit: string }}
 */
function parseCssLength(str) {
  if (!str || typeof str !== 'string') {
    return {
      num: '',
      unit: 'px'
    };
  }
  const t = str.trim();
  const m = t.match(/^(-?[\d.]+)\s*(px|em|rem|%)?$/i);
  if (!m) {
    return {
      num: '',
      unit: 'px'
    };
  }
  return {
    num: m[1],
    unit: (m[2] || 'px').toLowerCase()
  };
}

/**
 * @param {string} prefix
 * @param {Record<string, string>} obj
 * @returns {object}
 */
function flatJsonToState(prefix, obj) {
  const next = {
    top: '',
    right: '',
    bottom: '',
    left: '',
    unit: 'px',
    linked: false,
    topTablet: '',
    rightTablet: '',
    bottomTablet: '',
    leftTablet: '',
    unitTablet: 'px',
    linkedTablet: false,
    topMobile: '',
    rightMobile: '',
    bottomMobile: '',
    leftMobile: '',
    unitMobile: 'px',
    linkedMobile: false
  };
  const devices = [{
    id: 'desktop',
    suf: ''
  }, {
    id: 'tablet',
    suf: '-tablet'
  }, {
    id: 'mobile',
    suf: '-mobile'
  }];
  for (const d of devices) {
    const dk = d.id;
    const suffix = d.suf;
    let unitSet = false;
    for (const side of SIDE_KEYS) {
      const key = `${prefix}-${side}${suffix}`;
      const raw = obj[key];
      if (!raw) {
        continue;
      }
      const {
        num,
        unit
      } = parseCssLength(raw);
      const sk = dk === 'desktop' ? side : `${side}${DEVICE_KEY[dk]}`;
      next[sk] = num;
      if (!unitSet && num !== '') {
        const ukey = dk === 'desktop' ? 'unit' : `unit${DEVICE_KEY[dk]}`;
        next[ukey] = unit;
        unitSet = true;
      }
    }
    const lk = `${prefix}-linked${suffix === '' ? '' : suffix}`;
    if (obj[lk] === '1' || obj[lk] === 'true') {
      const lkState = dk === 'desktop' ? 'linked' : `linked${DEVICE_KEY[dk]}`;
      next[lkState] = true;
    }
  }
  return next;
}

/**
 * @param {object} state
 * @param {string} prefix
 * @returns {Record<string, string>}
 */
function stateToFlatJson(state, prefix) {
  const out = {};
  const devices = [{
    suf: '',
    id: 'desktop'
  }, {
    suf: '-tablet',
    id: 'tablet'
  }, {
    suf: '-mobile',
    id: 'mobile'
  }];
  for (const d of devices) {
    const suf = d.suf;
    const id = d.id;
    const unit = id === 'desktop' ? state.unit : state[`unit${DEVICE_KEY[id]}`];
    const linked = id === 'desktop' ? state.linked : state[`linked${DEVICE_KEY[id]}`];
    for (const side of SIDE_KEYS) {
      const sk = id === 'desktop' ? side : `${side}${DEVICE_KEY[id]}`;
      const num = state[sk];
      if (num !== '' && num !== undefined && num !== null) {
        out[`${prefix}-${side}${suf}`] = `${String(num).trim()}${unit || 'px'}`;
      }
    }
    out[`${prefix}-linked${suf}`] = linked ? '1' : '0';
  }
  return out;
}

/**
 * @param {import('@wordpress/element').RefObject} settingRef
 * @param {object} state
 * @param {string} prefix
 */
function useSpacingSync(settingRef, state, prefix) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const flat = stateToFlatJson(state, prefix);
    const setting = settingRef.current;
    if (setting) {
      setting.set(JSON.stringify(flat));
    }
  }, [state, prefix, settingRef]);
}

/**
 * @param {object} props
 */
function SpacingControlApp({
  control
}) {
  var _ref, _ref2;
  const params = control.params || {};
  const controlLabel = typeof params.label === 'string' && params.label.trim() ? params.label.trim() : '';
  const controlDescription = typeof params.description === 'string' && params.description.trim() ? params.description : '';
  const prefix = params.spacing_property === 'margin' ? 'margin' : 'padding';
  const settingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  settingRef.current = control.setting || control.settings?.default;
  const rawInitial = (_ref = (_ref2 = typeof control.setting?.get === 'function' ? control.setting.get() : null) !== null && _ref2 !== void 0 ? _ref2 : params.value) !== null && _ref !== void 0 ? _ref : '';
  let initialObj = {};
  try {
    initialObj = typeof rawInitial === 'string' && rawInitial.trim() ? JSON.parse(rawInitial) : {};
  } catch {
    initialObj = {};
  }
  const labels = {
    padding: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Padding', 'onepress'),
    margin: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Margin', 'onepress'),
    top: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top', 'onepress'),
    right: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right', 'onepress'),
    bottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom', 'onepress'),
    left: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left', 'onepress'),
    unit: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unit', 'onepress'),
    link: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Link sides', 'onepress'),
    unlink: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlink sides', 'onepress'),
    ...(params.labels || {})
  };
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => flatJsonToState(prefix, initialObj));
  const [previewDevice, setPreviewDevice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('desktop');
  const patch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(partial => {
    setState(prev => ({
      ...prev,
      ...partial
    }));
  }, []);
  const selectPreviewDevice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(device => {
    if (typeof window !== 'undefined' && window.wp?.customize?.previewedDevice) {
      window.wp.customize.previewedDevice.set(device);
    } else {
      setPreviewDevice(device);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const api = typeof window !== 'undefined' && window.wp?.customize;
    if (!api?.previewedDevice) {
      return undefined;
    }
    const handler = device => {
      if (PREVIEW_DEVICES.includes(device)) {
        setPreviewDevice(device);
      }
    };
    api.previewedDevice.bind(handler);
    const current = api.previewedDevice.get();
    if (PREVIEW_DEVICES.includes(current)) {
      setPreviewDevice(current);
    }
    return () => {
      api.previewedDevice.unbind(handler);
    };
  }, []);
  useSpacingSync(settingRef, state, prefix);
  const dev = PREVIEW_DEVICES.includes(previewDevice) ? previewDevice : 'desktop';
  const dSuffix = DEVICE_KEY[dev];
  const sideKey = side => dSuffix ? `${side}${dSuffix}` : side;
  const unitKey = dSuffix ? `unit${dSuffix}` : 'unit';
  const linkedKey = dSuffix ? `linked${dSuffix}` : 'linked';
  const currentUnit = state[unitKey] || 'px';
  const linked = !!state[linkedKey];
  const setSide = (side, value) => {
    const sk = sideKey(side);
    if (linked) {
      const next = {};
      for (const s of SIDE_KEYS) {
        next[sideKey(s)] = value;
      }
      setState(prev => ({
        ...prev,
        ...next
      }));
      return;
    }
    patch({
      [sk]: value
    });
  };
  const toggleLinked = () => {
    if (!linked) {
      const v = state[sideKey('top')] || '';
      const next = {};
      for (const s of SIDE_KEYS) {
        next[sideKey(s)] = v;
      }
      next[linkedKey] = true;
      setState(prev => ({
        ...prev,
        ...next
      }));
      return;
    }
    patch({
      [linkedKey]: false
    });
  };
  const resetToDefault = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    const raw = (0,_getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_5__.getCustomizeControlDefaultRaw)(control);
    let obj = {};
    try {
      const str = raw && String(raw).trim() ? String(raw) : '';
      obj = str ? JSON.parse(str) : {};
      if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        obj = {};
      }
    } catch {
      obj = {};
    }
    setState(flatJsonToState(prefix, obj));
  }, [control, prefix]);
  const sideLabels = {
    top: labels.top,
    right: labels.right,
    bottom: labels.bottom,
    left: labels.left
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-spacing-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between items-center w-full"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between items-center w-full"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between items-center gap-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title"
  }, controlLabel ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, controlLabel) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__.CustomizerPreviewDeviceButtons, {
    devices: (0,_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__.getCustomizerPreviewDeviceDefinitions)(),
    activeDevice: previewDevice,
    onSelectDevice: selectPreviewDevice,
    groupClassName: "devices",
    buttonClassName: "device-btn"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-between items-center gap-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "onepress-customizer-reset-default",
    onClick: resetToDefault,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-image-rotate",
    "aria-hidden": true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "unit"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizerUnitSelectPopover_jsx__WEBPACK_IMPORTED_MODULE_4__.CustomizerUnitSelectPopover, {
    key: previewDevice,
    units: SIZE_UNITS,
    value: currentUnit,
    onChange: u => patch({
      [unitKey]: u
    }),
    placement: "bottom-end",
    triggerClassName: "toplv opc-input select unit-popover-trigger "
  }))))), controlDescription ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description customize-control-description",
    dangerouslySetInnerHTML: {
      __html: controlDescription
    }
  }) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sides"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "inputs"
  }, SIDE_KEYS.map(side => {
    var _state$sideKey;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: side,
      className: "spacing-side"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "number",
      className: "input",
      min: prefix === 'margin' ? undefined : 0,
      step: "any",
      value: (_state$sideKey = state[sideKey(side)]) !== null && _state$sideKey !== void 0 ? _state$sideKey : '',
      onChange: e => setSide(side, e.target.value),
      "aria-label": sideLabels[side]
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "label"
    }, sideLabels[side]));
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "spacing-side link-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: 'link-btn' + (linked ? ' is-linked' : ''),
    onClick: toggleLinked,
    "aria-pressed": linked,
    title: linked ? labels.unlink : labels.link,
    "aria-label": linked ? labels.unlink : labels.link
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: 'dashicons ' + (linked ? 'dashicons-admin-links' : 'dashicons-editor-unlink'),
    "aria-hidden": true
  }))))));
}

/***/ },

/***/ "./src/admin/customizer/spacing/spacing-controls.js"
/*!**********************************************************!*\
  !*** ./src/admin/customizer/spacing/spacing-controls.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _SpacingControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpacingControlApp.jsx */ "./src/admin/customizer/spacing/SpacingControlApp.jsx");
/**
 * Spacing Customizer control — React UI. Control type: onepress_spacing
 */



const {
  customize
} = wp;
customize.controlConstructor.onepress_spacing = customize.Control.extend({
  ready() {
    const control = this;
    const wrap = control.container[0];
    const host = wrap?.querySelector?.('.onepress-spacing-react-root');
    if (!host) {
      return;
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(host);
    root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SpacingControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__.SpacingControlApp, {
      control
    }));
    control._onepressSpacingRoot = root;
  },
  destroy() {
    if (this._onepressSpacingRoot) {
      this._onepressSpacingRoot.unmount();
      this._onepressSpacingRoot = null;
    }
    customize.Control.prototype.destroy.call(this);
  }
});

/***/ },

/***/ "./src/admin/customizer/typography/FontPickerModal.jsx"
/*!*************************************************************!*\
  !*** ./src/admin/customizer/typography/FontPickerModal.jsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FontPickerModal: () => (/* binding */ FontPickerModal),
/* harmony export */   FontPickerPanel: () => (/* binding */ FontPickerPanel),
/* harmony export */   fetchFontFamiliesWebfontsMap: () => (/* binding */ fetchFontFamiliesWebfontsMap),
/* harmony export */   loadFontFamiliesWebfontsMap: () => (/* binding */ loadFontFamiliesWebfontsMap),
/* harmony export */   pickerPreviewLinkId: () => (/* binding */ pickerPreviewLinkId),
/* harmony export */   removeAllPickerPreviewLinks: () => (/* binding */ removeAllPickerPreviewLinks),
/* harmony export */   removeSelectedFontLink: () => (/* binding */ removeSelectedFontLink),
/* harmony export */   resetFontFamiliesLoadCache: () => (/* binding */ resetFontFamiliesLoadCache),
/* harmony export */   selectedFontLinkId: () => (/* binding */ selectedFontLinkId),
/* harmony export */   setSelectedGoogleFontLink: () => (/* binding */ setSelectedGoogleFontLink),
/* harmony export */   webfontsMapFromFontFamiliesRest: () => (/* binding */ webfontsMapFromFontFamiliesRest)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/kebabCase */ "./node_modules/lodash/kebabCase.js");
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_font_load_lib_font_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib-font/load-lib-font.js */ "./src/admin/lib-font/load-lib-font.js");

/**
 * Font picker: lists WordPress Font Library families from REST; optional lazy Google sheet previews for legacy entries.
 */





const PICKER_LINK_PREFIX = 'onepress-typo-picker-';

/** Filter DevTools console by this string to see the full upload pipeline. */
const FONT_UPLOAD_LOG_PREFIX = '[OnePress font upload]';

/**
 * Step-by-step upload logs (file pick → LibFont → REST). Disable with `window.onepressSuppressFontUploadLog = true`.
 *
 * @param {string} step
 * @param {unknown} [detail]
 */
function logFontUploadStep(step, detail) {
  if (typeof window !== 'undefined' && window.onepressSuppressFontUploadLog) {
    return;
  }
  // eslint-disable-next-line no-console
  console.info(FONT_UPLOAD_LOG_PREFIX, step, detail !== undefined ? detail : '');
}

/**
 * Always logs (ignores suppress) so failures stay visible.
 *
 * @param {string} step
 * @param {unknown} [detail]
 */
function logFontUploadWarn(step, detail) {
  // eslint-disable-next-line no-console
  console.warn(FONT_UPLOAD_LOG_PREFIX, step, detail !== undefined ? detail : '');
}
logFontUploadStep('bootstrap: module loaded', {
  OnepressLibFontType: typeof _lib_font_load_lib_font_js__WEBPACK_IMPORTED_MODULE_5__.Font
});

/**
 * Verbose LibFont internals: `window.onepressDebugLibFont = true` then reload Customizer.
 *
 * @param {'info'|'warn'} level
 * @param {string} message
 * @param {unknown} [detail]
 */
function onepressLogLibFont(level, message, detail) {
  if (typeof window === 'undefined' || !window.onepressDebugLibFont) {
    return;
  }
  const prefix = '[OnePress LibFont]';
  if (level === 'warn') {
    // eslint-disable-next-line no-console
    console.warn(prefix, message, detail !== undefined ? detail : '');
  } else {
    // eslint-disable-next-line no-console
    console.info(prefix, message, detail !== undefined ? detail : '');
  }
}
const FONT_FAMILIES_PATH = '/wp/v2/font-families';
const FONT_COLLECTION_GOOGLE_PATH = '/wp/v2/font-collections/google-fonts?_locale=user';

/**
 * @param {unknown} item REST font family or collection entry.
 * @returns {string}
 */
function displayNameFromFontFamilyItem(item) {
  if (!item || typeof item !== 'object') {
    return '';
  }
  const settings = 'font_family_settings' in item && item.font_family_settings ? item.font_family_settings : item;
  if (!settings || typeof settings !== 'object') {
    return '';
  }
  const name = String(settings.name || '').trim();
  if (name) {
    return name;
  }
  const ff = String(settings.fontFamily || '').trim();
  if (ff) {
    return ff.split(',')[0].replace(/^["']|["']$/g, '').trim() || ff;
  }
  return '';
}

/**
 * @param {unknown} item Google Fonts collection row.
 * @returns {string}
 */
function categoriesLabelFromCollectionItem(item) {
  if (!item || typeof item !== 'object' || !Array.isArray(item.categories)) {
    return '';
  }
  return item.categories.map(c => typeof c === 'string' ? c : String(c)).filter(Boolean).join(', ');
}

/**
 * @param {unknown} face
 * @returns {string}
 */
function fontFaceInstallKey(face) {
  var _face$fontWeight, _face$fontStyle;
  if (!face || typeof face !== 'object') {
    return '';
  }
  const w = String((_face$fontWeight = face.fontWeight) !== null && _face$fontWeight !== void 0 ? _face$fontWeight : '400');
  const s = String((_face$fontStyle = face.fontStyle) !== null && _face$fontStyle !== void 0 ? _face$fontStyle : 'normal');
  return `${w}|${s}`;
}

/**
 * @param {string} url
 * @returns {string}
 */
function encodeFontSrcUrl(url) {
  const s = String(url || '').trim();
  if (!s) {
    return s;
  }
  if (s.startsWith('http') && !/%[0-9A-Fa-f]{2}/.test(s)) {
    try {
      return encodeURI(s);
    } catch {
      return s;
    }
  }
  return s;
}

/**
 * @param {unknown} face Raw face from font collection JSON.
 * @returns {Record<string, unknown>|null}
 */
function buildFontFacePayloadForRest(face) {
  if (!face || typeof face !== 'object') {
    return null;
  }
  const fontFamily = String(face.fontFamily || '').trim();
  let src = face.src;
  if (!fontFamily || src == null || src === '') {
    return null;
  }
  if (typeof src === 'string') {
    const u = encodeFontSrcUrl(src);
    if (!u) {
      return null;
    }
    src = u;
  } else if (Array.isArray(src)) {
    const arr = src.map(x => encodeFontSrcUrl(String(x))).filter(Boolean);
    if (arr.length === 0) {
      return null;
    }
    src = arr.length === 1 ? arr[0] : arr;
  } else {
    return null;
  }
  /** @type {Record<string, unknown>} */
  const out = {
    fontFamily,
    src,
    fontStyle: face.fontStyle != null && String(face.fontStyle).trim() !== '' ? String(face.fontStyle) : 'normal',
    fontWeight: face.fontWeight != null && String(face.fontWeight).trim() !== '' ? String(face.fontWeight) : '400'
  };
  if (face.preview && typeof face.preview === 'string' && face.preview.trim()) {
    out.preview = face.preview.trim();
  }
  if (face.fontDisplay && typeof face.fontDisplay === 'string' && face.fontDisplay.trim()) {
    out.fontDisplay = face.fontDisplay.trim();
  }
  return out;
}

/**
 * @param {number} familyId
 * @returns {Promise<Set<string>>}
 */
async function fetchInstalledFontFaceKeys(familyId) {
  const keys = new Set();
  let page = 1;
  const perPage = 100;
  for (;;) {
    /** @type {unknown} */
    const batch = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `${FONT_FAMILIES_PATH}/${familyId}/font-faces?per_page=${perPage}&page=${page}&_locale=user`
    });
    if (!Array.isArray(batch) || batch.length === 0) {
      break;
    }
    for (const row of batch) {
      if (row && typeof row === 'object' && row.font_face_settings) {
        keys.add(fontFaceInstallKey(row.font_face_settings));
      }
    }
    if (batch.length < perPage) {
      break;
    }
    page += 1;
  }
  return keys;
}

/**
 * @param {unknown} err
 * @returns {string}
 */
function restErrorMessage(err) {
  if (!err || typeof err !== 'object') {
    return '';
  }
  if ('message' in err && typeof err.message === 'string' && err.message.trim()) {
    return err.message.trim();
  }
  const data = /** @type {{ message?: string }} */err.data;
  if (data && typeof data.message === 'string' && data.message.trim()) {
    return data.message.trim();
  }
  return '';
}

/**
 * Install a Google Fonts collection entry: create family if needed, POST each missing face (remote URLs kept as src).
 *
 * @param {unknown} collectionItem
 * @returns {Promise<{ noop: boolean, slug: string, added: number, skippedErrors: number, name: string }>}
 */
async function installGoogleCollectionFontFamily(collectionItem) {
  if (!collectionItem || typeof collectionItem !== 'object') {
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Invalid font data.', 'onepress'));
  }
  const settings = collectionItem.font_family_settings;
  if (!settings || typeof settings !== 'object') {
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Invalid font data.', 'onepress'));
  }
  const slugRaw = String(settings.slug || '').trim();
  const name = String(settings.name || '').trim();
  const fontFamily = String(settings.fontFamily || '').trim();
  if (!slugRaw || !name || !fontFamily) {
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This font is missing required fields.', 'onepress'));
  }
  const slugKey = lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default()(slugRaw);
  const rawFaces = Array.isArray(settings.fontFace) ? settings.fontFace : [];
  const faces = rawFaces.map(f => buildFontFacePayloadForRest(f)).filter(Boolean);
  if (faces.length === 0) {
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No font files to install.', 'onepress'));
  }

  /** @type {unknown} */
  const existingList = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: `${FONT_FAMILIES_PATH}?slug=${encodeURIComponent(slugKey)}&_locale=user`
  });
  let familyId;
  let isNewFamily = false;
  let installedKeys = new Set();
  if (Array.isArray(existingList) && existingList.length > 0) {
    const first = existingList[0];
    familyId = first && typeof first === 'object' && first.id != null ? Number(first.id) : NaN;
    if (!Number.isFinite(familyId) || familyId <= 0) {
      throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not read font family.', 'onepress'));
    }
    installedKeys = await fetchInstalledFontFaceKeys(familyId);
  } else {
    isNewFamily = true;
    const familyFd = new FormData();
    const familyPayload = {
      slug: slugKey,
      name,
      fontFamily
    };
    if (settings.preview && typeof settings.preview === 'string' && settings.preview.trim()) {
      familyPayload.preview = settings.preview.trim();
    }
    familyFd.append('font_family_settings', JSON.stringify(familyPayload));
    /** @type {{ id?: number }} */
    const created = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `${FONT_FAMILIES_PATH}?_locale=user`,
      method: 'POST',
      body: familyFd
    });
    familyId = created && created.id != null ? Number(created.id) : NaN;
    if (!Number.isFinite(familyId) || familyId <= 0) {
      throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not create font family.', 'onepress'));
    }
  }
  const facesToInstall = faces.filter(f => !installedKeys.has(fontFaceInstallKey(f)));
  if (facesToInstall.length === 0) {
    return {
      noop: true,
      slug: slugKey,
      added: 0,
      skippedErrors: 0,
      name: name || slugKey
    };
  }
  let added = 0;
  let skippedErrors = 0;
  for (const face of facesToInstall) {
    const faceFd = new FormData();
    faceFd.append('font_face_settings', JSON.stringify(face));
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `${FONT_FAMILIES_PATH}/${familyId}/font-faces?_locale=user`,
        method: 'POST',
        body: faceFd
      });
      added += 1;
    } catch (err) {
      const code = err && typeof err === 'object' && 'code' in err ? String(/** @type {{ code?: string }} */err.code) : '';
      if (code === 'rest_duplicate_font_face') {
        added += 1;
      } else {
        skippedErrors += 1;
      }
    }
  }
  if (isNewFamily && added === 0) {
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `${FONT_FAMILIES_PATH}/${familyId}?force=true&_locale=user`,
        method: 'DELETE'
      });
    } catch {
      // best effort cleanup
    }
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not install any font styles.', 'onepress'));
  }
  return {
    noop: false,
    slug: slugKey,
    added,
    skippedErrors,
    name: name || slugKey
  };
}

/**
 * @param {string} filename
 * @returns {string}
 */
function baseNameFromFileName(filename) {
  return String(filename || '').replace(/\.[^.]+$/i, '').trim();
}

/**
 * @param {string} base
 * @returns {string}
 */
function formatDisplayNameFromFileBase(base) {
  const s = String(base || '').trim();
  if (!s) {
    return '';
  }
  return s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim() || s;
}

/**
 * @param {string} s
 * @returns {string}
 */
function sanitizeFontMetadataName(s) {
  return String(s || '').replace(/\\/g, '').replace(/"/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Typographic / full name from font file (TTF, OTF, WOFF, WOFF2) via LibFont (src/admin/lib-font).
 *
 * @param {File} file
 * @returns {Promise<string|null>}
 */
async function getDisplayNameFromFontFile(file) {
  logFontUploadStep('libfont:1 start getDisplayNameFromFontFile', {
    name: file?.name,
    size: file?.size,
    type: file?.type
  });
  onepressLogLibFont('info', 'getDisplayNameFromFontFile', file?.name);
  if (typeof _lib_font_load_lib_font_js__WEBPACK_IMPORTED_MODULE_5__.Font !== 'function') {
    logFontUploadWarn('libfont:FAIL OnepressLibFont is not a function (bundle/import)', typeof _lib_font_load_lib_font_js__WEBPACK_IMPORTED_MODULE_5__.Font);
    return null;
  }
  try {
    var _buffer$byteLength;
    const buffer = await file.arrayBuffer();
    logFontUploadStep('libfont:2 arrayBuffer read', {
      byteLength: (_buffer$byteLength = buffer?.byteLength) !== null && _buffer$byteLength !== void 0 ? _buffer$byteLength : 0
    });
    return await new Promise(resolve => {
      let font;
      try {
        font = new _lib_font_load_lib_font_js__WEBPACK_IMPORTED_MODULE_5__.Font('__onepress_font_upload__', {
          skipStyleSheet: true
        });
        logFontUploadStep('libfont:3 new Font() ok');
      } catch (ctorErr) {
        logFontUploadWarn('libfont:FAIL new Font() threw', ctorErr);
        resolve(null);
        return;
      }
      const finish = value => {
        font.onload = null;
        font.onerror = null;
        logFontUploadStep('libfont:9 finish', {
          file: file?.name,
          displayName: value
        });
        onepressLogLibFont('info', 'parse finished', {
          name: file?.name,
          displayName: value
        });
        resolve(value);
      };
      font.onload = evt => {
        logFontUploadStep('libfont:5 onload fired', {
          file: file?.name
        });
        try {
          const detail = evt && evt.detail;
          const loaded = detail && typeof detail === 'object' && 'font' in detail ? detail.font : detail;
          const nameTable = loaded?.opentype?.tables?.name;
          if (!nameTable || typeof nameTable.get !== 'function') {
            logFontUploadWarn('libfont:FAIL no name table', {
              file: file?.name,
              hasOpentype: !!loaded?.opentype,
              tablesKeys: loaded?.opentype?.tables ? Object.keys(loaded.opentype.tables) : []
            });
            onepressLogLibFont('warn', 'missing name table after load', file?.name);
            finish(null);
            return;
          }
          logFontUploadStep('libfont:6 name table present, reading IDs');
          const nameGet = id => sanitizeFontMetadataName(String(nameTable.get(id) || ''));
          const full = nameGet(4) || nameGet(18);
          if (full) {
            finish(full);
            return;
          }
          const prefFam = nameGet(16);
          const prefSub = nameGet(17);
          const fam = prefFam || nameGet(1);
          const sub = prefSub || nameGet(2);
          if (fam && sub && !/^(regular|normal|book|roman)$/i.test(sub)) {
            finish(sanitizeFontMetadataName(`${fam} ${sub}`));
            return;
          }
          if (fam) {
            finish(fam);
            return;
          }
          const ps = String(nameTable.get(6) || '').trim();
          if (ps) {
            finish(sanitizeFontMetadataName(ps.replace(/-/g, ' ')));
            return;
          }
          logFontUploadStep('libfont:7 no name ID matched, returning null');
          finish(null);
        } catch (err) {
          logFontUploadWarn('libfont:FAIL onload handler threw', err);
          onepressLogLibFont('warn', 'onload handler error', err);
          finish(null);
        }
      };
      font.onerror = evt => {
        logFontUploadWarn('libfont:FAIL font.onerror', evt?.msg || evt);
        onepressLogLibFont('warn', 'font.onerror', evt?.msg || evt);
        finish(null);
      };
      logFontUploadStep('libfont:4 fromDataBuffer(…)', {
        file: file.name
      });
      font.fromDataBuffer(buffer, file.name).catch(err => {
        logFontUploadWarn('libfont:FAIL fromDataBuffer rejected', err);
        onepressLogLibFont('warn', 'fromDataBuffer rejected', err);
        finish(null);
      });
    });
  } catch (e) {
    logFontUploadWarn('libfont:FAIL outer catch', e);
    onepressLogLibFont('warn', 'getDisplayNameFromFontFile failed', e);
    return null;
  }
}

/**
 * @param {File} file
 * @returns {boolean}
 */
function isAllowedFontFile(file) {
  return file && typeof file.name === 'string' && /\.(woff2|woff|ttf|otf)$/i.test(file.name);
}

/**
 * @param {string} baseSlug
 * @returns {Promise<string>}
 */
async function allocateUniqueFontFamilySlug(baseSlug) {
  const root = baseSlug && String(baseSlug).trim() ? lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default()(String(baseSlug).trim()) : 'custom-font';
  let candidate = root;
  for (let n = 0; n < 500; n += 1) {
    /** @type {unknown} */
    const list = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `${FONT_FAMILIES_PATH}?slug=${encodeURIComponent(candidate)}&_locale=user`
    });
    if (!Array.isArray(list) || list.length === 0) {
      return candidate;
    }
    candidate = `${root}-${n + 1}`;
  }
  throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not allocate a unique font slug.', 'onepress'));
}

/**
 * One uploaded file → one font family + one face (400 / normal), file stored in uploads/fonts.
 *
 * @param {File} file
 * @returns {Promise<void>}
 */
async function installUploadedFontFile(file) {
  logFontUploadStep('install:1 start', {
    name: file?.name,
    size: file?.size,
    type: file?.type
  });
  if (!isAllowedFontFile(file)) {
    logFontUploadWarn('install:FAIL not allowed extension', file?.name);
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Invalid font file type.', 'onepress'));
  }
  logFontUploadStep('install:2 extension OK');
  const rawBase = baseNameFromFileName(file.name);
  logFontUploadStep('install:3 read display name (LibFont)…');
  const fromFontMeta = await getDisplayNameFromFontFile(file);
  const displayName = (fromFontMeta && fromFontMeta.length > 0 ? fromFontMeta : null) || formatDisplayNameFromFileBase(rawBase) || rawBase || 'Custom Font';
  logFontUploadStep('install:4 display name resolved', {
    fromFontMeta,
    displayName
  });
  const safeName = displayName.replace(/\\/g, '').replace(/"/g, '').trim();
  if (!safeName) {
    logFontUploadWarn('install:FAIL empty safeName', displayName);
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Invalid font file name.', 'onepress'));
  }
  logFontUploadStep('install:5 allocate slug…');
  const slug = await allocateUniqueFontFamilySlug(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default()(safeName) || lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default()(rawBase) || 'custom-font');
  logFontUploadStep('install:6 slug', slug);
  const fontFamilyCss = `"${safeName}", sans-serif`;
  const familyFd = new FormData();
  familyFd.append('font_family_settings', JSON.stringify({
    slug,
    name: safeName,
    fontFamily: fontFamilyCss
  }));
  logFontUploadStep('install:7 POST font family', FONT_FAMILIES_PATH);
  /** @type {{ id?: number }} */
  const created = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: `${FONT_FAMILIES_PATH}?_locale=user`,
    method: 'POST',
    body: familyFd
  });
  const familyId = created && created.id != null ? Number(created.id) : NaN;
  if (!Number.isFinite(familyId) || familyId <= 0) {
    logFontUploadWarn('install:FAIL bad family response', created);
    throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not create font family.', 'onepress'));
  }
  logFontUploadStep('install:8 family created', {
    familyId
  });
  const fileId = 'file-0-0';
  const faceFd = new FormData();
  faceFd.append(fileId, file, file.name);
  faceFd.append('font_face_settings', JSON.stringify({
    fontFamily: safeName,
    fontWeight: '400',
    fontStyle: 'normal',
    src: fileId
  }));
  try {
    logFontUploadStep('install:9 POST font-faces', {
      path: `${FONT_FAMILIES_PATH}/${familyId}/font-faces`
    });
    await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `${FONT_FAMILIES_PATH}/${familyId}/font-faces?_locale=user`,
      method: 'POST',
      body: faceFd
    });
    logFontUploadStep('install:10 done (face uploaded)', {
      familyId,
      safeName
    });
  } catch (err) {
    logFontUploadWarn('install:FAIL font-faces POST', err);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `${FONT_FAMILIES_PATH}/${familyId}?force=true&_locale=user`,
        method: 'DELETE'
      });
      logFontUploadStep('install:rollback family deleted', familyId);
    } catch {
      // best effort cleanup
    }
    throw err;
  }
}

/**
 * @param {Array<unknown>} items REST collection items.
 * @returns {Record<string, object>}
 */
function webfontsMapFromFontFamiliesRest(items) {
  const out = {};
  if (!Array.isArray(items)) {
    return out;
  }
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      continue;
    }
    const settings = item.font_family_settings;
    if (!settings || typeof settings !== 'object') {
      continue;
    }
    const slug = String(settings.slug || '').trim();
    if (!slug) {
      continue;
    }
    const id = `wp-${slug}`;
    const name = String(settings.name || slug).trim() || slug;
    const fontFamily = typeof settings.fontFamily === 'string' && settings.fontFamily.trim() ? settings.fontFamily.trim() : `"${name.replace(/"/g, '\\"')}", sans-serif`;
    out[id] = {
      name,
      fontFamily,
      font_type: 'wp_font_family',
      font_weights: ['400', '400italic', '700', '700italic'],
      subsets: [],
      url: ''
    };
  }
  return out;
}

/**
 * @returns {Promise<Array>}
 */
async function fetchAllFontFamiliesFromRest() {
  const all = [];
  let page = 1;
  const perPage = 100;
  for (;;) {
    const path = `${FONT_FAMILIES_PATH}?per_page=${perPage}&page=${page}&_locale=user`;
    /** @type {unknown} */
    const batch = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path
    });
    if (!Array.isArray(batch) || batch.length === 0) {
      break;
    }
    all.push(...batch);
    if (batch.length < perPage) {
      break;
    }
    page += 1;
  }
  return all;
}

/**
 * @returns {Promise<Record<string, object>>}
 */
async function fetchFontFamiliesWebfontsMap() {
  const items = await fetchAllFontFamiliesFromRest();
  return webfontsMapFromFontFamiliesRest(items);
}
let fontFamiliesMapLoadPromise = null;

/**
 * One shared REST crawl per Customizer load for all typography controls.
 *
 * @returns {Promise<Record<string, object>>}
 */
function loadFontFamiliesWebfontsMap() {
  if (!fontFamiliesMapLoadPromise) {
    fontFamiliesMapLoadPromise = fetchFontFamiliesWebfontsMap().catch(() => ({}));
  }
  return fontFamiliesMapLoadPromise;
}

/** Clears cached font map so the next `loadFontFamiliesWebfontsMap()` refetches (e.g. after installing a family). */
function resetFontFamiliesLoadCache() {
  fontFamiliesMapLoadPromise = null;
}
function pickerPreviewLinkId(controlId, fontId) {
  return `${PICKER_LINK_PREFIX}${controlId}-${fontId}`;
}
function removeAllPickerPreviewLinks(controlId) {
  const prefix = `${PICKER_LINK_PREFIX}${controlId}-`;
  document.querySelectorAll('link[id]').forEach(el => {
    if (el.id.startsWith(prefix)) {
      el.remove();
    }
  });
}
function removePickerPreviewLink(controlId, fontId) {
  const id = pickerPreviewLinkId(controlId, fontId);
  document.getElementById(id)?.remove();
}
function ensurePickerPreviewLink(controlId, fontId, url) {
  if (!url) {
    return;
  }
  const id = pickerPreviewLinkId(controlId, fontId);
  if (document.getElementById(id)) {
    return;
  }
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
const SELECTED_LINK_PREFIX = 'onepress-typo-selected-';
function selectedFontLinkId(controlId) {
  return `${SELECTED_LINK_PREFIX}${controlId}`;
}
function removeSelectedFontLink(controlId) {
  document.getElementById(selectedFontLinkId(controlId))?.remove();
}

/** Keep a single stylesheet in the Customizer shell so the closed “font selector” row can render the chosen Google font. */
function setSelectedGoogleFontLink(controlId, fontId, url) {
  const id = selectedFontLinkId(controlId);
  const existing = document.getElementById(id);
  if (!url || !fontId) {
    existing?.remove();
    return;
  }
  if (existing && existing.getAttribute('href') === url) {
    return;
  }
  existing?.remove();
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
function FontPickerRow({
  controlId,
  fontId,
  name,
  fontMeta,
  isSelected,
  onPick,
  scrollRoot
}) {
  const rowRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const needsGoogleSheet = fontMeta && fontMeta.font_type === 'google' && typeof fontMeta.url === 'string' && fontMeta.url.length > 0;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!needsGoogleSheet || !scrollRoot) {
      return undefined;
    }
    const el = rowRef.current;
    if (!el) {
      return undefined;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ensurePickerPreviewLink(controlId, fontId, fontMeta.url);
        } else {
          removePickerPreviewLink(controlId, fontId);
        }
      });
    }, {
      root: scrollRoot,
      rootMargin: '80px 0px',
      threshold: 0.01
    });
    io.observe(el);
    return () => {
      io.disconnect();
      removePickerPreviewLink(controlId, fontId);
    };
  }, [needsGoogleSheet, controlId, fontId, fontMeta?.url, scrollRoot]);
  const stack = fontMeta && typeof fontMeta.fontFamily === 'string' && fontMeta.fontFamily.trim() ? fontMeta.fontFamily : `"${name}", sans-serif`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    ref: rowRef,
    className: 'row' + (isSelected ? ' is-selected' : ''),
    onClick: () => onPick(fontId)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "sample",
    style: {
      fontFamily: stack
    }
  }, name));
}

/** @typedef {'library' | 'upload' | 'install'} ManageFontsTab */

/**
 * Full-screen overlay (portal) to browse installed families, upload placeholder, and Google collection.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} [props.onFontLibraryRefresh] Refresh Customizer font map after install.
 */
function ManageFontsModal({
  open,
  onClose,
  onFontLibraryRefresh
}) {
  const [tab, setTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('library');
  const [libraryItems, setLibraryItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [libraryLoading, setLibraryLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [libraryQuery, setLibraryQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [installCollection, setInstallCollection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [installLoading, setInstallLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [installError, setInstallError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [installQuery, setInstallQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [installingSlug, setInstallingSlug] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [installActionMessage, setInstallActionMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [removingFamilyId, setRemovingFamilyId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [libraryActionMessage, setLibraryActionMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [uploadDragging, setUploadDragging] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [uploadBusy, setUploadBusy] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [uploadActionMessage, setUploadActionMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [customizeControlsWidth, setCustomizeControlsWidth] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(300);
  const closeBtnRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const uploadInputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const uploadRunRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  const installGenRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    document.body.classList.add('onepress-manage-fonts-modal-open');
    return () => {
      document.body.classList.remove('onepress-manage-fonts-modal-open');
    };
  }, [open]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (!open) {
      return undefined;
    }
    const measure = () => {
      const el = document.getElementById('customize-controls');
      const w = el && typeof el.offsetWidth === 'number' && el.offsetWidth > 0 ? el.offsetWidth : 300;
      setCustomizeControlsWidth(w);
    };
    measure();
    const el = document.getElementById('customize-controls');
    let ro = null;
    if (el && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [open]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (open) {
      setTab('library');
      setLibraryQuery('');
      setInstallQuery('');
      setInstallActionMessage('');
      setInstallingSlug('');
      setLibraryActionMessage('');
      setRemovingFamilyId(null);
      setUploadActionMessage('');
      setUploadDragging(false);
      setUploadBusy(false);
    } else {
      installGenRef.current += 1;
      setInstallCollection(null);
      setInstallLoading(false);
      setInstallError(false);
      setInstallActionMessage('');
      setInstallingSlug('');
      setLibraryActionMessage('');
      setRemovingFamilyId(null);
      setUploadActionMessage('');
      setUploadDragging(false);
      setUploadBusy(false);
    }
  }, [open]);
  const reloadLibrarySnapshot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setLibraryLoading(true);
    return fetchAllFontFamiliesFromRest().then(items => {
      setLibraryItems(Array.isArray(items) ? items : []);
    }).catch(() => {
      setLibraryItems([]);
    }).finally(() => {
      setLibraryLoading(false);
    });
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    reloadLibrarySnapshot();
  }, [open, reloadLibrarySnapshot]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open || tab !== 'install') {
      return undefined;
    }
    if (installCollection !== null || installError) {
      return undefined;
    }
    const gen = ++installGenRef.current;
    setInstallLoading(true);
    setInstallError(false);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: FONT_COLLECTION_GOOGLE_PATH
    }).then(data => {
      if (installGenRef.current !== gen) {
        return;
      }
      setInstallCollection(data && typeof data === 'object' ? data : null);
      setInstallLoading(false);
    }).catch(() => {
      if (installGenRef.current !== gen) {
        return;
      }
      setInstallError(true);
      setInstallLoading(false);
    });
  }, [open, tab, installCollection, installError]);
  const installFamilies = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const c = installCollection;
    if (!c || !Array.isArray(c.font_families)) {
      return [];
    }
    return c.font_families;
  }, [installCollection]);
  const libQ = libraryQuery.trim().toLowerCase();
  const filteredLibrary = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (!libQ) {
      return libraryItems;
    }
    return libraryItems.filter(item => displayNameFromFontFamilyItem(item).toLowerCase().includes(libQ));
  }, [libraryItems, libQ]);
  const handleRemoveLibraryFont = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async item => {
    if (!item || typeof item !== 'object' || item.id == null) {
      return;
    }
    const id = Number(item.id);
    if (!Number.isFinite(id) || id <= 0 || removingFamilyId != null) {
      return;
    }
    const name = displayNameFromFontFamilyItem(item);
    const label = name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('this font', 'onepress');
    if (!window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: %s: Font family name. */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove "%s" from your library? This cannot be undone.', 'onepress'), label))) {
      return;
    }
    setRemovingFamilyId(id);
    setLibraryActionMessage('');
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `${FONT_FAMILIES_PATH}/${id}?force=true&_locale=user`,
        method: 'DELETE'
      });
      await reloadLibrarySnapshot();
      if (typeof onFontLibraryRefresh === 'function') {
        onFontLibraryRefresh();
      }
      setLibraryActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: %s: Font family name. */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('"%s" was removed.', 'onepress'), label));
    } catch (e) {
      setLibraryActionMessage(restErrorMessage(e) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not remove font.', 'onepress'));
    } finally {
      setRemovingFamilyId(null);
    }
  }, [removingFamilyId, reloadLibrarySnapshot, onFontLibraryRefresh]);
  const processUploadFiles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async incoming => {
    if (uploadRunRef.current) {
      logFontUploadStep('queue: skip (already running)');
      return;
    }
    const files = Array.isArray(incoming) ? incoming : incoming ? Array.from(incoming) : [];
    logFontUploadStep('queue:1 received', {
      count: files.length,
      names: files.map(f => f.name)
    });
    const valid = files.filter(isAllowedFontFile);
    logFontUploadStep('queue:2 after filter', {
      validCount: valid.length,
      validNames: valid.map(f => f.name)
    });
    if (valid.length === 0) {
      if (files.length > 0) {
        logFontUploadWarn('queue:FAIL no valid files', {
          received: files.map(f => f.name)
        });
        setUploadActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No valid font files. Use .woff2, .woff, .ttf, or .otf.', 'onepress'));
      }
      return;
    }
    uploadRunRef.current = true;
    setUploadBusy(true);
    setUploadActionMessage('');
    let ok = 0;
    /** @type {{ name: string, msg: string }[]} */
    const fails = [];
    try {
      for (let i = 0; i < valid.length; i += 1) {
        const file = valid[i];
        logFontUploadStep('queue:3 file start', {
          index: i + 1,
          of: valid.length,
          name: file.name
        });
        try {
          await installUploadedFontFile(file);
          ok += 1;
          logFontUploadStep('queue:4 file OK', file.name);
        } catch (e) {
          logFontUploadWarn('queue:FAIL file threw', {
            name: file.name,
            error: e
          });
          fails.push({
            name: file.name,
            msg: restErrorMessage(e) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not add font.', 'onepress')
          });
        }
      }
      logFontUploadStep('queue:5 reload library snapshot');
      await reloadLibrarySnapshot();
      if (typeof onFontLibraryRefresh === 'function') {
        onFontLibraryRefresh();
      }
      logFontUploadStep('queue:6 complete', {
        ok,
        failCount: fails.length
      });
      if (fails.length === 0) {
        setUploadActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: %d: Number of fonts added. */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__._n)('Added %d font to your library.', 'Added %d fonts to your library.', ok, 'onepress'), ok));
      } else {
        const failSummary = fails.slice(0, 4).map(f => `${f.name}: ${f.msg}`).join(' · ');
        const more = fails.length > 4 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: %d: Additional failure count. */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' …and %d more.', 'onepress'), fails.length - 4) : '';
        if (ok > 0) {
          setUploadActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: 1: Added count, 2: Fail count, 3: Details, 4: Optional "and N more". */
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Added %1$d. Failed (%2$d): %3$s%4$s', 'onepress'), ok, fails.length, failSummary, more));
        } else {
          setUploadActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: 1: Error details, 2: Optional suffix. */
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to add fonts: %1$s%2$s', 'onepress'), failSummary, more));
        }
      }
    } finally {
      uploadRunRef.current = false;
      setUploadBusy(false);
      logFontUploadStep('queue:7 UI unlocked (uploadBusy=false)');
    }
  }, [reloadLibrarySnapshot, onFontLibraryRefresh]);
  const instQ = installQuery.trim().toLowerCase();
  const filteredInstall = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (!instQ) {
      return installFamilies;
    }
    return installFamilies.filter(item => {
      const name = displayNameFromFontFamilyItem(item).toLowerCase();
      const cats = categoriesLabelFromCollectionItem(item).toLowerCase();
      return name.includes(instQ) || cats.includes(instQ);
    });
  }, [installFamilies, instQ]);
  const handleInstallCollectionFont = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async item => {
    if (installingSlug) {
      return;
    }
    const settings = item && typeof item === 'object' ? item.font_family_settings : null;
    const slugRaw = settings && typeof settings === 'object' ? String(settings.slug || '').trim() : '';
    if (!slugRaw) {
      return;
    }
    const slugKey = lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default()(slugRaw);
    setInstallingSlug(slugKey);
    setInstallActionMessage('');
    try {
      const result = await installGoogleCollectionFontFamily(item);
      await reloadLibrarySnapshot();
      if (typeof onFontLibraryRefresh === 'function') {
        onFontLibraryRefresh();
      }
      if (result.noop) {
        setInstallActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: %s: Font family name. */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('"%s" is already installed with all styles.', 'onepress'), result.name));
      } else if (result.skippedErrors > 0) {
        setInstallActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: 1: Font name, 2: Number installed, 3: Number failed. */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('"%1$s": installed %2$d style(s); %3$d failed.', 'onepress'), result.name, result.added, result.skippedErrors));
      } else {
        setInstallActionMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(/* translators: 1: Font name, 2: Number of styles. */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('"%1$s" installed (%2$d style(s)).', 'onepress'), result.name, result.added));
      }
    } catch (e) {
      setInstallActionMessage(restErrorMessage(e) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not install font.', 'onepress'));
    } finally {
      setInstallingSlug('');
    }
  }, [installingSlug, reloadLibrarySnapshot, onFontLibraryRefresh]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    const id = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);
  if (!open) {
    return null;
  }
  if (typeof document === 'undefined' || !document.body) {
    return null;
  }
  const tabs = /** @type {const} */[{
    id: 'library',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Library', 'onepress')
  }, {
    id: 'upload',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Upload', 'onepress')
  }, {
    id: 'install',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Install', 'onepress')
  }];
  const onDialogKeyDown = e => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
    }
  };
  const modal = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-manage-fonts-portal",
    role: "presentation",
    style: (/** @type {React.CSSProperties} */{
      '--onepress-mf-controls-left': `${customizeControlsWidth}px`
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "onepress-manage-fonts-portal__backdrop",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close', 'onepress'),
    onClick: onClose
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-manage-fonts-portal__dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "onepress-manage-fonts-title",
    onMouseDown: e => e.stopPropagation(),
    onKeyDown: onDialogKeyDown
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-manage-fonts-portal__head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    id: "onepress-manage-fonts-title",
    className: "onepress-manage-fonts-portal__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Manage fonts', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    ref: closeBtnRef,
    type: "button",
    className: "button-link onepress-manage-fonts-portal__close",
    onClick: onClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close', 'onepress'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-manage-fonts-portal__tabs",
    role: "tablist",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Font sources', 'onepress')
  }, tabs.map(t => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: t.id,
    type: "button",
    role: "tab",
    id: `onepress-manage-fonts-tab-${t.id}`,
    "aria-selected": tab === t.id,
    "aria-controls": `onepress-manage-fonts-panel-${t.id}`,
    tabIndex: tab === t.id ? 0 : -1,
    className: 'onepress-manage-fonts-portal__tab' + (tab === t.id ? ' is-active' : ''),
    onClick: () => setTab(/** @type {ManageFontsTab} */t.id)
  }, t.label))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-manage-fonts-portal__body"
  }, tab === 'library' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "onepress-manage-fonts-panel-library",
    role: "tabpanel",
    "aria-labelledby": "onepress-manage-fonts-tab-library",
    className: "onepress-manage-fonts-portal__panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fonts currently available on your site (WordPress font families).', 'onepress')), libraryActionMessage ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__feedback",
    role: "status"
  }, libraryActionMessage) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "screen-reader-text",
    htmlFor: "onepress-manage-fonts-library-search"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search library', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "onepress-manage-fonts-library-search",
    type: "search",
    className: "onepress-manage-fonts-portal__search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search…', 'onepress'),
    value: libraryQuery,
    onChange: e => setLibraryQuery(e.target.value)
  }), libraryLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__status",
    role: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading…', 'onepress')) : filteredLibrary.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__status",
    role: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts in your library yet.', 'onepress')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "onepress-manage-fonts-portal__list",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Installed font families', 'onepress')
  }, filteredLibrary.map((item, index) => {
    const name = displayNameFromFontFamilyItem(item);
    const key = item && typeof item === 'object' && 'id' in item && item.id != null ? `lib-${item.id}` : `lib-${index}-${name}`;
    const rowId = item && typeof item === 'object' && item.id != null ? Number(item.id) : NaN;
    const rowBusy = Number.isFinite(rowId) && removingFamilyId === rowId;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: key
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "onepress-manage-fonts-portal__list-row-main"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "onepress-manage-fonts-portal__list-name"
    }, name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('(Unnamed font)', 'onepress'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "onepress-manage-fonts-portal__list-row-actions"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "button button-small onepress-manage-fonts-portal__btn-remove",
      disabled: !Number.isFinite(rowId) || removingFamilyId != null || libraryLoading,
      onClick: () => handleRemoveLibraryFont(item)
    }, rowBusy ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Removing…', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove', 'onepress'))));
  }))), tab === 'upload' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "onepress-manage-fonts-panel-upload",
    role: "tabpanel",
    "aria-labelledby": "onepress-manage-fonts-tab-upload",
    className: "onepress-manage-fonts-portal__panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Drag font files here or choose files. The name is read from the font when possible (TTF, OTF, WOFF); otherwise the file name is used. WOFF2 uses the file name. Each file becomes one family (400, normal).', 'onepress')), uploadActionMessage ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__feedback",
    role: "status"
  }, uploadActionMessage) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'onepress-manage-fonts-upload-zone' + (uploadDragging ? ' is-dragging' : '') + (uploadBusy ? ' is-busy' : ''),
    onDragEnter: e => {
      e.preventDefault();
      e.stopPropagation();
      if (!uploadBusy) {
        setUploadDragging(true);
      }
    },
    onDragOver: e => {
      e.preventDefault();
      e.stopPropagation();
      if (!uploadBusy) {
        e.dataTransfer.dropEffect = 'copy';
      }
    },
    onDragLeave: e => {
      e.preventDefault();
      e.stopPropagation();
      const {
        currentTarget,
        relatedTarget
      } = e;
      if (relatedTarget && currentTarget.contains(/** @type {Node} */relatedTarget)) {
        return;
      }
      setUploadDragging(false);
    },
    onDrop: e => {
      e.preventDefault();
      e.stopPropagation();
      setUploadDragging(false);
      if (!uploadBusy && e.dataTransfer?.files) {
        logFontUploadStep('ui: drop', {
          count: e.dataTransfer.files.length
        });
        processUploadFiles(e.dataTransfer.files);
      }
    },
    role: "group",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Drop font files here or use the select files button.', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: uploadInputRef,
    type: "file",
    accept: ".woff2,.woff,.ttf,.otf,font/woff2,font/woff",
    multiple: true,
    className: "onepress-manage-fonts-upload-input",
    disabled: uploadBusy,
    onChange: e => {
      const {
        files
      } = e.target;
      if (files?.length) {
        logFontUploadStep('ui: input change', {
          count: files.length,
          names: Array.from(files).map(f => f.name)
        });
        processUploadFiles(files);
      }
      e.target.value = '';
    },
    onClick: e => e.stopPropagation()
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-upload-zone__title"
  }, uploadBusy ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Uploading…', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Drop font files here', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-upload-zone__types"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Supported: .woff2, .woff, .ttf, .otf', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "button onepress-manage-fonts-upload-zone__browse",
    disabled: uploadBusy,
    onClick: e => {
      e.stopPropagation();
      uploadInputRef.current?.click();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select files', 'onepress')))), tab === 'install' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "onepress-manage-fonts-panel-install",
    role: "tabpanel",
    "aria-labelledby": "onepress-manage-fonts-tab-install",
    className: "onepress-manage-fonts-portal__panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Install fonts from the Google Fonts collection into your site library (files stay on your server).', 'onepress')), installActionMessage ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__feedback",
    role: "status"
  }, installActionMessage) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "screen-reader-text",
    htmlFor: "onepress-manage-fonts-install-search"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search fonts to install', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "onepress-manage-fonts-install-search",
    type: "search",
    className: "onepress-manage-fonts-portal__search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search…', 'onepress'),
    value: installQuery,
    onChange: e => setInstallQuery(e.target.value),
    disabled: installLoading
  }), installLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__status",
    role: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading…', 'onepress')) : installError ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__status",
    role: "alert"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load the font collection.', 'onepress')) : installFamilies.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__status",
    role: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts in this collection.', 'onepress')) : filteredInstall.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "onepress-manage-fonts-portal__status",
    role: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts match your search.', 'onepress')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "onepress-manage-fonts-portal__list",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Google Fonts collection', 'onepress')
  }, filteredInstall.map((item, index) => {
    const name = displayNameFromFontFamilyItem(item);
    const cats = categoriesLabelFromCollectionItem(item);
    const slugRaw = item && typeof item === 'object' && item.font_family_settings && typeof item.font_family_settings === 'object' && item.font_family_settings.slug ? String(item.font_family_settings.slug).trim() : '';
    const slugKey = slugRaw ? lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default()(slugRaw) : '';
    const rowBusy = Boolean(slugKey && installingSlug === slugKey);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: slugKey || `${name}-${index}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "onepress-manage-fonts-portal__list-row-main"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "onepress-manage-fonts-portal__list-name"
    }, name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('(Unnamed font)', 'onepress')), cats ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "onepress-manage-fonts-portal__list-meta"
    }, cats) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "onepress-manage-fonts-portal__list-row-actions"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "button button-small",
      disabled: !slugKey || Boolean(installingSlug) || installLoading,
      onClick: () => handleInstallCollectionFont(item)
    }, rowBusy ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Installing…', 'onepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Install', 'onepress'))));
  }))))));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createPortal)(modal, document.body);
}

/**
 * Font list UI (inline dropdown under font family row, or legacy modal wrapper).
 *
 * @param {object} props
 * @param {'dropdown'|'modal'} [props.variant]
 * @param {() => void} [props.onFontLibraryRefresh] After font install, refresh picker webfonts map.
 */
function FontPickerPanel({
  open,
  controlId,
  webfonts,
  fontGroups,
  currentFontId,
  defaultLabel,
  onClose,
  onSelectFont,
  onFontLibraryRefresh,
  variant = 'dropdown'
}) {
  const searchRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [scrollRoot, setScrollRoot] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [searchQuery, setSearchQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [manageFontsOpen, setManageFontsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredGroups = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (!normalizedQuery) {
      return fontGroups;
    }
    return fontGroups.map(g => ({
      ...g,
      fonts: g.fonts.filter(f => String(f.name).toLowerCase().includes(normalizedQuery))
    })).filter(g => g.fonts.length > 0);
  }, [fontGroups, normalizedQuery]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (open) {
      setSearchQuery('');
    }
  }, [open]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    const id = window.requestAnimationFrame(() => {
      const el = searchRef.current;
      if (el) {
        el.focus();
        el.select();
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    const onKey = e => {
      if (e.key !== 'Escape') {
        return;
      }
      if (manageFontsOpen) {
        setManageFontsOpen(false);
        e.preventDefault();
        return;
      }
      if (searchQuery.trim()) {
        setSearchQuery('');
        e.preventDefault();
        return;
      }
      onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, searchQuery, manageFontsOpen]);
  if (!open) {
    return null;
  }
  const panelClass = variant === 'dropdown' ? 'onepress-font-picker-dropdown' : 'onepress-font-picker-modal';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: panelClass,
    role: "dialog",
    "aria-modal": variant === 'modal',
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Font selector', 'onepress'),
    onMouseDown: e => e.stopPropagation()
  }, manageFontsOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ManageFontsModal, {
    open: manageFontsOpen,
    onClose: () => setManageFontsOpen(false),
    onFontLibraryRefresh: onFontLibraryRefresh
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-wrap onepress-font-picker-search-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "screen-reader-text",
    htmlFor: `onepress-typo-font-search-${controlId}`
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search fonts', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: searchRef,
    id: `onepress-typo-font-search-${controlId}`,
    type: "search",
    className: "search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search fonts…', 'onepress'),
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: "false"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "flex items-center justify-center",
    onClick: e => {
      e.stopPropagation();
      setManageFontsOpen(true);
    },
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Manage fonts', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    class: "dashicons dashicons-list-view"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "scroll",
    ref: setScrollRoot
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: 'row row-default' + (!currentFontId ? ' is-selected' : ''),
    onClick: () => onSelectFont('')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "row-name"
  }, defaultLabel)), filteredGroups.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "empty",
    role: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No fonts found.', 'onepress')) : filteredGroups.map(g => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: g.type,
    className: "group"
  }, g.fonts.map(f => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FontPickerRow, {
    key: f.id,
    controlId: controlId,
    fontId: f.id,
    name: f.name,
    fontMeta: webfonts[f.id],
    isSelected: currentFontId === f.id,
    onPick: onSelectFont,
    scrollRoot: scrollRoot
  }))))));
}

/** @deprecated Use FontPickerPanel; kept for external imports. */
function FontPickerModal(props) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FontPickerPanel, {
    ...props
  });
}

/***/ },

/***/ "./src/admin/customizer/typography/TypographyControlApp.jsx"
/*!******************************************************************!*\
  !*** ./src/admin/customizer/typography/TypographyControlApp.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypographyControlApp: () => (/* binding */ TypographyControlApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CustomizerPreviewDeviceButtons.jsx */ "./src/admin/customizer/CustomizerPreviewDeviceButtons.jsx");
/* harmony import */ var _CustomizerUnitSelectPopover_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CustomizerUnitSelectPopover.jsx */ "./src/admin/customizer/CustomizerUnitSelectPopover.jsx");
/* harmony import */ var _getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../getCustomizeControlDefaultRaw.js */ "./src/admin/customizer/getCustomizeControlDefaultRaw.js");
/* harmony import */ var _FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FontPickerModal.jsx */ "./src/admin/customizer/typography/FontPickerModal.jsx");

/**
 * Typography Customizer control UI (React, no jQuery).
 */






const SIZE_UNITS = ['px', 'em', 'rem', '%'];
const PREVIEW_DEVICES = ['desktop', 'tablet', 'mobile'];

/** @type {Record<string, Record<'desktop'|'tablet'|'mobile', { value: string, unit: string }>>} */
const RESPONSIVE_UNIT_KEYS = {
  font_size: {
    desktop: {
      value: 'fontSize',
      unit: 'fontSizeUnit'
    },
    tablet: {
      value: 'fontSizeTablet',
      unit: 'fontSizeTabletUnit'
    },
    mobile: {
      value: 'fontSizeMobile',
      unit: 'fontSizeMobileUnit'
    }
  },
  line_height: {
    desktop: {
      value: 'lineHeight',
      unit: 'lineHeightUnit'
    },
    tablet: {
      value: 'lineHeightTablet',
      unit: 'lineHeightTabletUnit'
    },
    mobile: {
      value: 'lineHeightMobile',
      unit: 'lineHeightMobileUnit'
    }
  },
  letter_spacing: {
    desktop: {
      value: 'letterSpacing',
      unit: 'letterSpacingUnit'
    },
    tablet: {
      value: 'letterSpacingTablet',
      unit: 'letterSpacingTabletUnit'
    },
    mobile: {
      value: 'letterSpacingMobile',
      unit: 'letterSpacingMobileUnit'
    }
  }
};
function getFontId(fontName) {
  if (!fontName) {
    return '';
  }
  return String(fontName).toLowerCase().replace(/ /g, '-');
}
function cssToStyleSelect(weight, fontStyle) {
  const hasWeight = weight !== undefined && weight !== null && String(weight).trim() !== '';
  let w = hasWeight ? String(weight).trim() : '';
  const wLower = w.toLowerCase();
  if (hasWeight && (wLower === 'normal' || wLower === 'regular')) {
    w = '400';
  }
  const fs = fontStyle === undefined || fontStyle === null || fontStyle === '' ? 'normal' : String(fontStyle);
  const fsLower = fs.toLowerCase();
  const fsNorm = fsLower === 'regular' ? 'normal' : fsLower;
  if (!hasWeight) {
    if (fsNorm === 'normal' || fs === '') {
      return '';
    }
    if (fsNorm === 'italic') {
      return 'italic';
    }
    return fs;
  }
  if (w === '700' && (fsNorm === 'normal' || fs === '')) {
    return '700';
  }
  if (w === '700' && fsNorm === 'italic') {
    return '700italic';
  }
  if (w === '400') {
    if (fsNorm === 'normal' || fs === '') {
      return 'regular';
    }
    if (fsNorm === 'italic') {
      return 'italic';
    }
    return fs;
  }
  const num = parseInt(w, 10);
  if (!Number.isNaN(num)) {
    if (fsNorm === 'normal' || fs === '') {
      return String(num);
    }
    return String(num) + fsNorm;
  }
  return '';
}
function parseCssNumberUnit(val, fallbackUnit = 'px') {
  if (val == null || val === '') {
    return {
      value: '',
      unit: fallbackUnit
    };
  }
  const m = String(val).trim().match(/^(-?[\d.]+)\s*(px|em|rem|%)?$/i);
  if (!m) {
    return {
      value: '',
      unit: fallbackUnit
    };
  }
  const unit = (m[2] || fallbackUnit).toLowerCase();
  return {
    value: m[1],
    unit: SIZE_UNITS.includes(unit) ? unit : fallbackUnit
  };
}
function composeNumberUnit(value, unit, fallbackUnit = 'px') {
  if (value === '' || value == null) {
    return '';
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    return '';
  }
  const u = SIZE_UNITS.includes(unit) ? unit : fallbackUnit;
  return `${n}${u}`;
}

/**
 * Parse stored CSS keyword: missing/blank → "" (no option selected).
 * Explicit CSS `none` → "none" like any other value.
 *
 * @param {string|undefined} raw
 * @returns {string}
 */
function normalizeTextDecorationTransform(raw) {
  const v = raw == null ? '' : String(raw).trim();
  if (!v) {
    return '';
  }
  if (v.toLowerCase() === 'none') {
    return 'none';
  }
  return v;
}
function parseInitialState(rawValue, fields) {
  const base = {
    fontId: '',
    fontFamilyName: '',
    styleSelect: '',
    fontSize: '',
    fontSizeUnit: 'px',
    fontSizeTablet: '',
    fontSizeTabletUnit: 'px',
    fontSizeMobile: '',
    fontSizeMobileUnit: 'px',
    lineHeight: '',
    lineHeightUnit: 'px',
    lineHeightTablet: '',
    lineHeightTabletUnit: 'px',
    lineHeightMobile: '',
    lineHeightMobileUnit: 'px',
    letterSpacing: '',
    letterSpacingUnit: 'px',
    letterSpacingTablet: '',
    letterSpacingTabletUnit: 'px',
    letterSpacingMobile: '',
    letterSpacingMobileUnit: 'px',
    textDecoration: '',
    textTransform: ''
  };
  if (!rawValue || !String(rawValue).trim()) {
    return base;
  }
  let css;
  try {
    css = JSON.parse(rawValue);
  } catch {
    return base;
  }
  if (!css || typeof css !== 'object') {
    return base;
  }
  const fontFamily = css['font-family'] || '';
  const fontId = fontFamily ? getFontId(fontFamily) : '';
  const fontSizeParsed = parseCssNumberUnit(css['font-size'], 'px');
  const fontSizeTabletParsed = parseCssNumberUnit(css['font-size-tablet'], 'px');
  const fontSizeMobileParsed = parseCssNumberUnit(css['font-size-mobile'], 'px');
  const lineHeightParsed = parseCssNumberUnit(css['line-height'], 'px');
  const lineHeightTabletParsed = parseCssNumberUnit(css['line-height-tablet'], 'px');
  const lineHeightMobileParsed = parseCssNumberUnit(css['line-height-mobile'], 'px');
  const letterSpacingParsed = parseCssNumberUnit(css['letter-spacing'], 'px');
  const letterSpacingTabletParsed = parseCssNumberUnit(css['letter-spacing-tablet'], 'px');
  const letterSpacingMobileParsed = parseCssNumberUnit(css['letter-spacing-mobile'], 'px');
  let styleSelect = '';
  if (fields.font_family && fields.font_style) {
    styleSelect = cssToStyleSelect(css['font-weight'], css['font-style']);
  }
  return {
    ...base,
    fontId,
    fontFamilyName: fontFamily || '',
    styleSelect,
    fontSize: fields.font_size ? fontSizeParsed.value : '',
    fontSizeUnit: fields.font_size ? fontSizeParsed.unit : 'px',
    fontSizeTablet: fields.font_size ? fontSizeTabletParsed.value : '',
    fontSizeTabletUnit: fields.font_size ? fontSizeTabletParsed.unit : 'px',
    fontSizeMobile: fields.font_size ? fontSizeMobileParsed.value : '',
    fontSizeMobileUnit: fields.font_size ? fontSizeMobileParsed.unit : 'px',
    lineHeight: fields.line_height ? lineHeightParsed.value : '',
    lineHeightUnit: fields.line_height ? lineHeightParsed.unit : 'px',
    lineHeightTablet: fields.line_height ? lineHeightTabletParsed.value : '',
    lineHeightTabletUnit: fields.line_height ? lineHeightTabletParsed.unit : 'px',
    lineHeightMobile: fields.line_height ? lineHeightMobileParsed.value : '',
    lineHeightMobileUnit: fields.line_height ? lineHeightMobileParsed.unit : 'px',
    letterSpacing: fields.letter_spacing ? letterSpacingParsed.value : '',
    letterSpacingUnit: fields.letter_spacing ? letterSpacingParsed.unit : 'px',
    letterSpacingTablet: fields.letter_spacing ? letterSpacingTabletParsed.value : '',
    letterSpacingTabletUnit: fields.letter_spacing ? letterSpacingTabletParsed.unit : 'px',
    letterSpacingMobile: fields.letter_spacing ? letterSpacingMobileParsed.value : '',
    letterSpacingMobileUnit: fields.letter_spacing ? letterSpacingMobileParsed.unit : 'px',
    textDecoration: fields.text_decoration ? normalizeTextDecorationTransform(css['text-decoration']) : '',
    textTransform: fields.text_transform ? normalizeTextDecorationTransform(css['text-transform']) : ''
  };
}

/**
 * Authoritative Customizer value (avoids empty params.value on first paint clobbering DB).
 *
 * @param {object} control
 * @param {string} [paramsValue]
 * @returns {string}
 */
function getTypographyControlInitialRaw(control, paramsValue) {
  const setting = control.setting || control.settings?.default;
  if (setting && typeof setting.get === 'function') {
    const v = setting.get();
    if (v != null && String(v).trim() !== '') {
      return String(v);
    }
  }
  return typeof paramsValue === 'string' ? paramsValue : '';
}

/** Stable JSON compare (key order–independent). */
function typographySettingJsonMatches(a, b) {
  const norm = s => {
    try {
      const o = JSON.parse(s);
      if (!o || typeof o !== 'object' || Array.isArray(o)) {
        return s;
      }
      return JSON.stringify(Object.keys(o).sort().reduce((acc, k) => {
        acc[k] = o[k];
        return acc;
      }, {}));
    } catch {
      return s;
    }
  };
  return norm(a || '') === norm(b || '');
}
function groupFonts(webfonts) {
  const buckets = new Map();
  for (const [id, font] of Object.entries(webfonts || {})) {
    const type = font.font_type && String(font.font_type).trim() !== '' ? font.font_type : 'default';
    if (!buckets.has(type)) {
      buckets.set(type, []);
    }
    buckets.get(type).push({
      id,
      name: font.name
    });
  }
  const preferred = ['wp_font_family', 'default', 'google'];
  const out = [];
  for (const t of preferred) {
    if (buckets.has(t)) {
      const fonts = buckets.get(t).sort((a, b) => a.name.localeCompare(b.name));
      out.push({
        type: t,
        fonts
      });
      buckets.delete(t);
    }
  }
  for (const [type, fonts] of buckets) {
    out.push({
      type,
      fonts: fonts.sort((a, b) => a.name.localeCompare(b.name))
    });
  }
  return out;
}
function buildStyleOptions(fontId, webfonts, labels, defaultLabel) {
  const fallback = [{
    value: '',
    label: defaultLabel
  }];
  if (!fontId || !webfonts[fontId]) {
    return fallback;
  }
  const font = webfonts[fontId];
  const weights = font.font_weights || [];
  const isGoogle = font.font_type === 'google';
  let hasRegular = !isGoogle;
  const opts = [];
  for (const value of weights) {
    var _labels$key;
    if (value == 400 || value === '400' || value === 'regular') {
      hasRegular = true;
    }
    const key = String(value);
    opts.push({
      value: key,
      label: (_labels$key = labels[key]) !== null && _labels$key !== void 0 ? _labels$key : key
    });
  }
  let includeDefault = true;
  if (isGoogle && !hasRegular) {
    includeDefault = false;
  }
  if (isGoogle && weights.length <= 1) {
    var _labels$italic, _labels$, _labels$700italic;
    opts.push({
      value: 'italic',
      label: (_labels$italic = labels.italic) !== null && _labels$italic !== void 0 ? _labels$italic : 'italic'
    }, {
      value: '700',
      label: (_labels$ = labels['700']) !== null && _labels$ !== void 0 ? _labels$ : '700'
    }, {
      value: '700italic',
      label: (_labels$700italic = labels['700italic']) !== null && _labels$700italic !== void 0 ? _labels$700italic : '700italic'
    });
  }
  const list = includeDefault ? [...fallback, ...opts] : [...opts];
  return list.length ? list : fallback;
}
function parseStyleSelect(styleVal) {
  const s = String(styleVal || '').trim();
  if (s === 'regular' || s === 'normal') {
    return {
      weight: '',
      style: 'normal'
    };
  }
  if (s === 'italic') {
    return {
      weight: '',
      style: 'italic'
    };
  }
  const weight = parseInt(s, 10);
  if (Number.isNaN(weight)) {
    const style = s === 'regular' ? 'normal' : s || 'normal';
    return {
      weight: '',
      style: style === '' ? 'normal' : style
    };
  }
  const rest = s.slice(String(weight).length);
  const style = rest === '' ? 'normal' : rest;
  return {
    weight,
    style
  };
}

/**
 * @param {string} device
 * @param {object} state
 */
function getEffectiveFontMetrics(state, device) {
  if (device === 'mobile') {
    return {
      fontSize: composeNumberUnit(state.fontSizeMobile, state.fontSizeMobileUnit, 'px') || composeNumberUnit(state.fontSizeTablet, state.fontSizeTabletUnit, 'px') || composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px'),
      lineHeight: composeNumberUnit(state.lineHeightMobile, state.lineHeightMobileUnit, 'px') || composeNumberUnit(state.lineHeightTablet, state.lineHeightTabletUnit, 'px') || composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px'),
      letterSpacing: composeNumberUnit(state.letterSpacingMobile, state.letterSpacingMobileUnit, 'px') || composeNumberUnit(state.letterSpacingTablet, state.letterSpacingTabletUnit, 'px') || composeNumberUnit(state.letterSpacing, state.letterSpacingUnit, 'px')
    };
  }
  if (device === 'tablet') {
    return {
      fontSize: composeNumberUnit(state.fontSizeTablet, state.fontSizeTabletUnit, 'px') || composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px'),
      lineHeight: composeNumberUnit(state.lineHeightTablet, state.lineHeightTabletUnit, 'px') || composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px'),
      letterSpacing: composeNumberUnit(state.letterSpacingTablet, state.letterSpacingTabletUnit, 'px') || composeNumberUnit(state.letterSpacing, state.letterSpacingUnit, 'px')
    };
  }
  return {
    fontSize: composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px'),
    lineHeight: composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px'),
    letterSpacing: composeNumberUnit(state.letterSpacing, state.letterSpacingUnit, 'px')
  };
}
function buildTypographySettingCss(state, fields, webfonts) {
  const css = {};
  if (fields.font_size) {
    const value = composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px');
    if (value) {
      css['font-size'] = value;
    }
    const vt = composeNumberUnit(state.fontSizeTablet, state.fontSizeTabletUnit, 'px');
    if (vt) {
      css['font-size-tablet'] = vt;
    }
    const vm = composeNumberUnit(state.fontSizeMobile, state.fontSizeMobileUnit, 'px');
    if (vm) {
      css['font-size-mobile'] = vm;
    }
  }
  if (fields.line_height) {
    const value = composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px');
    if (value) {
      css['line-height'] = value;
    }
    const vt = composeNumberUnit(state.lineHeightTablet, state.lineHeightTabletUnit, 'px');
    if (vt) {
      css['line-height-tablet'] = vt;
    }
    const vm = composeNumberUnit(state.lineHeightMobile, state.lineHeightMobileUnit, 'px');
    if (vm) {
      css['line-height-mobile'] = vm;
    }
  }
  if (fields.letter_spacing) {
    const value = composeNumberUnit(state.letterSpacing, state.letterSpacingUnit, 'px');
    if (value) {
      css['letter-spacing'] = value;
    }
    const vt = composeNumberUnit(state.letterSpacingTablet, state.letterSpacingTabletUnit, 'px');
    if (vt) {
      css['letter-spacing-tablet'] = vt;
    }
    const vm = composeNumberUnit(state.letterSpacingMobile, state.letterSpacingMobileUnit, 'px');
    if (vm) {
      css['letter-spacing-mobile'] = vm;
    }
  }
  if (fields.text_decoration) {
    var _state$textDecoration;
    const td = String((_state$textDecoration = state.textDecoration) !== null && _state$textDecoration !== void 0 ? _state$textDecoration : '').trim();
    if (td !== '') {
      css['text-decoration'] = td;
    }
  }
  if (fields.text_transform) {
    var _state$textTransform;
    const tt = String((_state$textTransform = state.textTransform) !== null && _state$textTransform !== void 0 ? _state$textTransform : '').trim();
    if (tt !== '') {
      css['text-transform'] = tt;
    }
  }
  if (fields.font_family && fields.font_style) {
    var _state$styleSelect;
    const styleToken = String((_state$styleSelect = state.styleSelect) !== null && _state$styleSelect !== void 0 ? _state$styleSelect : '').trim();
    if (styleToken !== '') {
      const {
        weight,
        style
      } = parseStyleSelect(styleToken);
      // `regular` / `normal` / italic-only tokens leave weight ""; still emit a valid font-weight (normal = 400).
      css['font-weight'] = weight !== '' ? String(weight) : 'normal';
      if (style && style !== 'normal') {
        css['font-style'] = style;
      }
    }
  }
  if (fields.font_family) {
    const fontId = state.fontId || '';
    if (fontId && webfonts[fontId]) {
      const font = webfonts[fontId];
      css['font-family'] = typeof font.fontFamily === 'string' && font.fontFamily.trim() ? font.fontFamily : font.name;
    } else if (state.fontFamilyName && String(state.fontFamilyName).trim() !== '') {
      // Plus / migrated fonts (e.g. Google) not yet in onepressTypoWebfonts must round-trip.
      css['font-family'] = String(state.fontFamilyName).trim();
    }
  }
  return css;
}

/**
 * Slider min/max/step per typography metric and CSS unit (aligned with onepress_slider UX).
 *
 * @param {string} fieldKey
 * @param {string} unit
 * @returns {{ min: number, max: number, step: number }}
 */
function getTypographySliderBounds(fieldKey, unit) {
  const u = String(unit || 'px').toLowerCase();
  switch (fieldKey) {
    case 'font_size':
      if (u === '%') {
        return {
          min: 50,
          max: 500,
          step: 1
        };
      }
      if (u === 'em' || u === 'rem') {
        return {
          min: 0.25,
          max: 10,
          step: 0.05
        };
      }
      return {
        min: 8,
        max: 200,
        step: 1
      };
    case 'line_height':
      if (u === 'em' || u === 'rem') {
        return {
          min: 0,
          max: 5,
          step: 0.05
        };
      }
      return {
        min: 0,
        max: 200,
        step: 1
      };
    case 'letter_spacing':
      if (u === 'em' || u === 'rem') {
        return {
          min: -2,
          max: 2,
          step: 0.025
        };
      }
      if (u === '%') {
        return {
          min: -100,
          max: 100,
          step: 0.5
        };
      }
      return {
        min: -100,
        max: 100,
        step: 0.5
      };
    default:
      return {
        min: 0,
        max: 100,
        step: 1
      };
  }
}
function ResponsiveUnitField({
  label,
  fieldKey,
  previewDevice,
  onSelectDevice,
  state,
  patch
}) {
  const keys = RESPONSIVE_UNIT_KEYS[fieldKey][previewDevice] || RESPONSIVE_UNIT_KEYS[fieldKey].desktop;
  const value = state[keys.value];
  const unit = state[keys.unit];
  const {
    min: sliderMin,
    max: sliderMax,
    step: sliderStep
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => getTypographySliderBounds(fieldKey, unit), [fieldKey, unit]);
  const clampNumeric = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(raw => {
    var _String$split$1$lengt;
    const s = raw === '' || raw == null ? '' : String(raw).trim();
    if (s === '') {
      return '';
    }
    const n = Number(s);
    if (Number.isNaN(n)) {
      return '';
    }
    const c = Math.min(sliderMax, Math.max(sliderMin, n));
    if (sliderStep >= 1) {
      return String(Math.round(c / sliderStep) * sliderStep);
    }
    const decimals = (_String$split$1$lengt = String(sliderStep).split('.')[1]?.length) !== null && _String$split$1$lengt !== void 0 ? _String$split$1$lengt : 0;
    return String(Number(c.toFixed(decimals)));
  }, [sliderMin, sliderMax, sliderStep]);
  const setValueForDevice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(nextRaw => {
    patch({
      [keys.value]: clampNumeric(nextRaw)
    });
  }, [clampNumeric, patch, keys.value]);
  const rangeDisplayValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const n = Number(value);
    if (value === '' || Number.isNaN(n)) {
      /* Letter spacing empty → treat as 0 so slider thumb sits centered (-100…100). */
      if (fieldKey === 'letter_spacing') {
        return 0;
      }
      return sliderMin;
    }
    return Math.min(sliderMax, Math.max(sliderMin, n));
  }, [value, sliderMin, sliderMax, fieldKey]);
  const rangeFillPct = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const span = sliderMax - sliderMin;
    if (span <= 0) {
      return 0;
    }
    return (rangeDisplayValue - sliderMin) / span * 100;
  }, [rangeDisplayValue, sliderMin, sliderMax]);
  const valueInputId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => `onepress-typo-num-${fieldKey}-${previewDevice}-${keys.value}`.replace(/[^a-zA-Z0-9_-]/g, '-'), [fieldKey, previewDevice, keys.value]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group setting-group--unit"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group__head w-full flex justify-between items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__.CustomizerPreviewDeviceButtons, {
    devices: (0,_CustomizerPreviewDeviceButtons_jsx__WEBPACK_IMPORTED_MODULE_3__.getCustomizerPreviewDeviceDefinitions)(),
    activeDevice: previewDevice,
    onSelectDevice: onSelectDevice,
    groupClassName: "devices",
    buttonClassName: "device-btn"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "unit-row__unit-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizerUnitSelectPopover_jsx__WEBPACK_IMPORTED_MODULE_4__.CustomizerUnitSelectPopover, {
    key: `${fieldKey}-${previewDevice}`,
    units: SIZE_UNITS,
    value: unit,
    onChange: u => patch({
      [keys.unit]: u
    }),
    placement: "bottom-start",
    triggerClassName: "opc-input select unit-popover-trigger",
    triggerActiveClass: "active"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "unit-row unit-row--slider typography-slider-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "range",
    className: "typography-range range",
    style: {
      '--onepress-slider-fill-pct': `${rangeFillPct}%`
    },
    min: sliderMin,
    max: sliderMax,
    step: sliderStep,
    value: rangeDisplayValue,
    "aria-label": label ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s: field label */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s — slider', 'onepress'), label) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Value slider', 'onepress'),
    onChange: e => setValueForDevice(e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: valueInputId,
    type: "number",
    className: "opc-input number typography-range-number",
    min: sliderMin,
    max: sliderMax,
    step: sliderStep,
    value: value,
    placeholder: "",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Value', 'onepress'),
    onChange: e => {
      const v = e.target.value;
      if (v === '') {
        patch({
          [keys.value]: ''
        });
        return;
      }
      setValueForDevice(v);
    }
  })));
}
function renderSpanChoices({
  options,
  value,
  onChange,
  toggleable = false,
  noneValue = ''
}) {
  const resolvePick = optValue => {
    if (toggleable && value === optValue) {
      return noneValue;
    }
    return optValue;
  };
  const onKeyPick = (event, optValue) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(resolvePick(optValue));
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "choice-row"
  }, options.map(opt => {
    const active = value === opt.value && (noneValue === '' ? opt.value !== '' || value === '' : value !== noneValue);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      key: opt.value === '' ? 'choice-empty' : opt.value || 'default',
      className: `choice-btn ${active ? ' is-active button-primary' : 'button-secondary'}`,
      role: "button",
      tabIndex: 0,
      "aria-pressed": active,
      title: opt.label,
      onClick: () => onChange(resolvePick(opt.value)),
      onKeyDown: e => onKeyPick(e, opt.value)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `choice-icon ${opt.iconClass}`
    }, opt.icon));
  }));
}
function TypographyControlApp({
  control,
  webfonts,
  styleLabels
}) {
  const [libraryWebfonts, setLibraryWebfonts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const allWebfonts = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    ...(webfonts || {}),
    ...libraryWebfonts
  }), [webfonts, libraryWebfonts]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let cancelled = false;
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.loadFontFamiliesWebfontsMap)().then(map => {
      if (!cancelled && map && typeof map === 'object') {
        setLibraryWebfonts(map);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const refreshFontLibraryFromRest = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.resetFontFamiliesLoadCache)();
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.loadFontFamiliesWebfontsMap)().then(map => {
      if (map && typeof map === 'object') {
        setLibraryWebfonts(map);
      }
    });
  }, []);
  const params = control.params;
  const fields = params.fields;
  const labels = params.labels;
  const cssSelector = params.css_selector || '';
  const controlId = control.id;
  const controlLabel = typeof params.label === 'string' && params.label.trim() ? params.label.trim() : '';
  const controlDescription = typeof params.description === 'string' && params.description.trim() ? params.description : '';
  const settingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  settingRef.current = control.setting || control.settings?.default;
  const controlWrapRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const settingsPanelRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const summaryTriggerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const fontSelectorRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => parseInitialState(getTypographyControlInitialRaw(control, params.value), fields));
  const [previewDevice, setPreviewDevice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('desktop');
  const [settingsOpen, setSettingsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [fontPickerOpen, setFontPickerOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const fontGroups = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => groupFonts(allWebfonts), [allWebfonts]);
  const selectedFont = state.fontId ? allWebfonts[state.fontId] : null;
  const styleOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => buildStyleOptions(state.fontId, allWebfonts, styleLabels, labels.option_default), [state.fontId, allWebfonts, styleLabels, labels.option_default]);
  const selectedStyleLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const item = styleOptions.find(o => o.value === state.styleSelect);
    return item?.label || labels.option_default;
  }, [styleOptions, state.styleSelect, labels.option_default]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!fields.font_style) {
      return;
    }
    const allowed = new Set(styleOptions.map(o => o.value));
    setState(prev => {
      if (prev.styleSelect === '' || allowed.has(prev.styleSelect)) {
        return prev;
      }
      return {
        ...prev,
        styleSelect: ''
      };
    });
  }, [styleOptions, fields.font_style]);
  const patch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(partial => {
    setState(prev => ({
      ...prev,
      ...partial
    }));
  }, []);
  const selectPreviewDevice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(device => {
    if (typeof window !== 'undefined' && window.wp?.customize?.previewedDevice) {
      window.wp.customize.previewedDevice.set(device);
    } else {
      setPreviewDevice(device);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const api = typeof window !== 'undefined' && window.wp?.customize;
    if (!api?.previewedDevice) {
      return undefined;
    }
    const handler = device => {
      if (PREVIEW_DEVICES.includes(device)) {
        setPreviewDevice(device);
      }
    };
    api.previewedDevice.bind(handler);
    const current = api.previewedDevice.get();
    if (PREVIEW_DEVICES.includes(current)) {
      setPreviewDevice(current);
    }
    return () => {
      api.previewedDevice.unbind(handler);
    };
  }, []);
  const closeFontPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeAllPickerPreviewLinks)(controlId);
    setFontPickerOpen(false);
  }, [controlId]);
  const openFontPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(e => {
    if (e) {
      e.stopPropagation();
    }
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeAllPickerPreviewLinks)(controlId);
    setSettingsOpen(true);
    setFontPickerOpen(open => !open);
  }, [controlId]);
  const selectFontFromPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(fontId => {
    const font = allWebfonts[fontId];
    patch({
      fontId,
      styleSelect: '',
      fontFamilyName: font?.name || ''
    });
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeAllPickerPreviewLinks)(controlId);
    setFontPickerOpen(false);
  }, [controlId, patch, allWebfonts]);
  const clearSelectedFont = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    patch({
      fontId: '',
      styleSelect: '',
      fontFamilyName: ''
    });
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeAllPickerPreviewLinks)(controlId);
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeSelectedFontLink)(controlId);
    setFontPickerOpen(false);
  }, [controlId, patch]);
  const resetToDefault = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setFontPickerOpen(false);
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeAllPickerPreviewLinks)(controlId);
    (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeSelectedFontLink)(controlId);
    const raw = (0,_getCustomizeControlDefaultRaw_js__WEBPACK_IMPORTED_MODULE_5__.getCustomizeControlDefaultRaw)(control);
    setState(parseInitialState(raw || '', fields));
  }, [control, controlId, fields]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (fontPickerOpen) {
      return;
    }
    const font = state.fontId ? allWebfonts[state.fontId] : null;
    if (font && font.font_type === 'google' && font.url) {
      (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.setSelectedGoogleFontLink)(controlId, state.fontId, font.url);
    } else {
      (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeSelectedFontLink)(controlId);
    }
  }, [fontPickerOpen, state.fontId, allWebfonts, controlId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    return () => {
      (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeAllPickerPreviewLinks)(controlId);
      (0,_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.removeSelectedFontLink)(controlId);
    };
  }, [controlId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const css = buildTypographySettingCss(state, fields, allWebfonts);
    const setting = settingRef.current;
    if (!setting || typeof setting.get !== 'function') {
      return;
    }
    const next = JSON.stringify(css);
    let cur = '';
    try {
      cur = setting.get();
      if (typeof cur !== 'string') {
        cur = cur != null ? String(cur) : '';
      }
    } catch {
      cur = '';
    }
    if (typographySettingJsonMatches(next, cur)) {
      return;
    }
    setting.set(next);
  }, [state, fields, allWebfonts]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!settingsOpen) {
      return undefined;
    }
    const onKey = e => {
      if (e.key !== 'Escape') {
        return;
      }
      if (fontPickerOpen) {
        closeFontPicker();
        e.preventDefault();
        return;
      }
      setSettingsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [settingsOpen, fontPickerOpen, closeFontPicker]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!settingsOpen && !fontPickerOpen) {
      return undefined;
    }
    const onDocDown = e => {
      const t = e.target;
      if (t && typeof t.closest === 'function' && t.closest('.components-popover')) {
        return;
      }
      const root = controlWrapRef.current;
      const panel = settingsPanelRef.current;
      const summaryBtn = summaryTriggerRef.current;
      if (!root || !root.contains(t)) {
        // Customizer live preview (#customize-preview + iframe): keep panel open
        // so users can click the site while adjusting typography.
        if (t && typeof t.closest === 'function' && t.closest('#customize-preview')) {
          return;
        }
        setFontPickerOpen(false);
        setSettingsOpen(false);
        return;
      }
      if (!settingsOpen) {
        return;
      }
      const insidePanel = panel && panel.contains(t);
      const onSummaryToggle = summaryBtn && summaryBtn.contains(t);
      if (insidePanel) {
        if (fontPickerOpen && fontSelectorRef.current && !fontSelectorRef.current.contains(t)) {
          setFontPickerOpen(false);
        }
        return;
      }

      // Outside .onepress-typography-settings (e.g. title row, description).
      // Skip closing on summary mousedown so its click handler can toggle.
      if (onSummaryToggle) {
        return;
      }
      setFontPickerOpen(false);
      setSettingsOpen(false);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [settingsOpen, fontPickerOpen]);
  const selectorStack = selectedFont ? typeof selectedFont.fontFamily === 'string' && selectedFont.fontFamily.trim() ? selectedFont.fontFamily : `"${selectedFont.name}", sans-serif` : 'inherit';
  const sizeBadge = state.fontSize !== '' ? `${state.fontSize}${state.fontSizeUnit}` : labels.option_default;
  const textDecorationChoices = [{
    value: 'none',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text decoration none', 'onepress'),
    icon: 'Aa',
    iconClass: 'none'
  }, {
    value: 'overline',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Overline', 'onepress'),
    icon: 'Aa',
    iconClass: 'overline'
  }, {
    value: 'underline',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Underline', 'onepress'),
    icon: 'Aa',
    iconClass: 'underline'
  }, {
    value: 'line-through',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Line through', 'onepress'),
    icon: 'Aa',
    iconClass: 'line-through'
  }];
  const textTransformChoices = [
  // { value: 'none', label: __('None', 'onepress'), icon: 'Aa', iconClass: 'none' },
  {
    value: 'uppercase',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uppercase', 'onepress'),
    icon: 'AA',
    iconClass: 'uppercase'
  }, {
    value: 'lowercase',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Lowercase', 'onepress'),
    icon: 'aa',
    iconClass: 'lowercase'
  }, {
    value: 'capitalize',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Capitalize', 'onepress'),
    icon: 'Aa',
    iconClass: 'capitalize'
  }];
  const summaryPreviewStyle = {
    fontFamily: selectorStack
  };
  if (fields.font_family && fields.font_style) {
    const sel = String(state.styleSelect || '').trim();
    if (sel !== '') {
      const {
        weight,
        style
      } = parseStyleSelect(sel);
      summaryPreviewStyle.fontStyle = style || 'normal';
      summaryPreviewStyle.fontWeight = weight !== '' ? weight : 'normal';
    }
  }
  if (fields.font_size) {
    const v = composeNumberUnit(state.fontSize, state.fontSizeUnit, 'px');
    if (v) {
      summaryPreviewStyle.fontSize = v;
    }
  }
  if (fields.line_height) {
    const v = composeNumberUnit(state.lineHeight, state.lineHeightUnit, 'px');
    if (v) {
      summaryPreviewStyle.lineHeight = v;
    }
  }
  if (fields.letter_spacing) {
    const v = composeNumberUnit(state.letterSpacing, state.letterSpacingUnit, 'px');
    if (v) {
      summaryPreviewStyle.letterSpacing = v;
    }
  }
  if (fields.text_transform) {
    const tt = String(state.textTransform || '').trim();
    if (tt !== '') {
      summaryPreviewStyle.textTransform = tt;
    }
  }
  if (fields.text_decoration) {
    const td = String(state.textDecoration || '').trim();
    if (td !== '') {
      summaryPreviewStyle.textDecoration = td;
    }
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: controlWrapRef,
    className: 'onepress-typography-control' + (settingsOpen ? ' onepress-typography-control--open' : '')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center w-full gap-1 justify-between"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ctitle"
  }, controlLabel ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, controlLabel) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "onepress-customizer-reset-default",
    onClick: resetToDefault,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset to default', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-image-rotate",
    "aria-hidden": true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    ref: summaryTriggerRef,
    type: "button",
    className: `summary-card opc-input select flex items-center w-full ${settingsOpen ? 'active' : ''}`,
    onClick: () => {
      setSettingsOpen(prev => {
        if (prev) {
          setFontPickerOpen(false);
        }
        return !prev;
      });
    },
    "aria-expanded": settingsOpen,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Typography options', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "summary-meta flex justify-between items-center w-full"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "chip",
    style: {
      fontFamily: selectorStack
    }
  }, selectedFont ? selectedFont.name : labels.option_default), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "flex gap-1"
  }, selectedStyleLabel != labels.option_default && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "chip"
  }, selectedStyleLabel), "/"), labels.option_default != sizeBadge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "chip"
  }, sizeBadge)))), settingsOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: settingsPanelRef,
    className: "onepress-typography-settings",
    role: "dialog",
    "aria-modal": "false",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Typography options', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-body"
  }, fields.font_family && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group font-family-setting",
    ref: fontSelectorRef
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, labels.family), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-family-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `opc-input select font-family-value clickable ${fontPickerOpen ? 'active' : ''}`,
    role: "button",
    tabIndex: 0,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Open font selector', 'onepress'),
    "aria-expanded": fontPickerOpen,
    onClick: e => openFontPicker(e),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFontPicker(e);
      }
    }
  }, selectedFont ? selectedFont.name : labels.option_default), selectedFont && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "font-family-clear",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove font and use theme default', 'onepress'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove font and use theme default', 'onepress'),
    onClick: e => {
      e.stopPropagation();
      clearSelectedFont();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-no-alt",
    "aria-hidden": true
  }))), fontPickerOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_6__.FontPickerPanel, {
    open: fontPickerOpen,
    variant: "dropdown",
    controlId: controlId,
    webfonts: allWebfonts,
    fontGroups: fontGroups,
    currentFontId: state.fontId,
    defaultLabel: labels.option_default,
    onClose: closeFontPicker,
    onSelectFont: selectFontFromPicker,
    onFontLibraryRefresh: refreshFontLibraryFromRest
  })), fields.font_family && fields.font_style && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, labels.style), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    className: "opc-input select",
    value: state.styleSelect,
    onChange: e => patch({
      styleSelect: e.target.value
    })
  }, styleOptions.map((o, idx) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: `${idx}-${o.value}`,
    value: o.value
  }, o.label)))), fields.font_size && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ResponsiveUnitField, {
    label: labels.size,
    fieldKey: "font_size",
    previewDevice: previewDevice,
    onSelectDevice: selectPreviewDevice,
    state: state,
    patch: patch
  }), fields.line_height && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ResponsiveUnitField, {
    label: labels.line_height,
    fieldKey: "line_height",
    previewDevice: previewDevice,
    onSelectDevice: selectPreviewDevice,
    state: state,
    patch: patch
  }), fields.letter_spacing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ResponsiveUnitField, {
    label: labels.letter_spacing,
    fieldKey: "letter_spacing",
    previewDevice: previewDevice,
    onSelectDevice: selectPreviewDevice,
    state: state,
    patch: patch
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex gap-2 justify-between"
  }, fields.text_decoration && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group",
    title: labels.text_decoration
  }, renderSpanChoices({
    options: textDecorationChoices,
    value: state.textDecoration,
    onChange: next => patch({
      textDecoration: next
    }),
    toggleable: true,
    noneValue: ''
  })), fields.text_transform && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group",
    title: labels.text_transform
  }, renderSpanChoices({
    options: textTransformChoices,
    value: state.textTransform,
    onChange: next => patch({
      textTransform: next
    }),
    toggleable: true,
    noneValue: ''
  })))))), controlDescription ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description customize-control-description",
    dangerouslySetInnerHTML: {
      __html: controlDescription
    }
  }) : null);
}

/***/ },

/***/ "./src/admin/customizer/typography/typography-controls.js"
/*!****************************************************************!*\
  !*** ./src/admin/customizer/typography/typography-controls.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _TypographyControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TypographyControlApp.jsx */ "./src/admin/customizer/typography/TypographyControlApp.jsx");
/**
 * Typography Customizer control — React UI, no jQuery. Control type: onepress_typo
 */



const {
  customize
} = wp;
customize.controlConstructor.onepress_typo = customize.Control.extend({
  ready() {
    const control = this;
    const wrap = control.container[0];
    const host = wrap?.querySelector?.('.onepress-typo-react-root');
    if (!host) {
      return;
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(host);
    root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TypographyControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__.TypographyControlApp, {
      control,
      webfonts: window.onepressTypoWebfonts || {},
      styleLabels: window.onepressTypoFontStyleLabels || {}
    }));
    control._onepressTypoRoot = root;
  },
  destroy() {
    if (this._onepressTypoRoot) {
      this._onepressTypoRoot.unmount();
      this._onepressTypoRoot = null;
    }
    customize.Control.prototype.destroy.call(this);
  }
});

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

/***/ "./src/admin/lib-font/inflate.js"
/*!***************************************!*\
  !*** ./src/admin/lib-font/inflate.js ***!
  \***************************************/
(module) {

/* pako 1.0.10 nodeca/pako */(function (f) {
  if (true) {
    module.exports = f();
  } else // removed by dead control flow
{ var g; }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = undefined;
            if (!f && c) return require(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = undefined, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      'use strict';

      var TYPED_OK = typeof Uint8Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined';
      function _has(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
      exports.assign = function (obj /*from1, from2, from3, ...*/) {
        var sources = Array.prototype.slice.call(arguments, 1);
        while (sources.length) {
          var source = sources.shift();
          if (!source) {
            continue;
          }
          if (typeof source !== 'object') {
            throw new TypeError(source + 'must be non-object');
          }
          for (var p in source) {
            if (_has(source, p)) {
              obj[p] = source[p];
            }
          }
        }
        return obj;
      };

      // reduce buffer size, avoiding mem copy
      exports.shrinkBuf = function (buf, size) {
        if (buf.length === size) {
          return buf;
        }
        if (buf.subarray) {
          return buf.subarray(0, size);
        }
        buf.length = size;
        return buf;
      };
      var fnTyped = {
        arraySet: function (dest, src, src_offs, len, dest_offs) {
          if (src.subarray && dest.subarray) {
            dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
            return;
          }
          // Fallback to ordinary array
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        // Join array of chunks to single array.
        flattenChunks: function (chunks) {
          var i, l, len, pos, chunk, result;

          // calculate data length
          len = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            len += chunks[i].length;
          }

          // join chunks
          result = new Uint8Array(len);
          pos = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            chunk = chunks[i];
            result.set(chunk, pos);
            pos += chunk.length;
          }
          return result;
        }
      };
      var fnUntyped = {
        arraySet: function (dest, src, src_offs, len, dest_offs) {
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        // Join array of chunks to single array.
        flattenChunks: function (chunks) {
          return [].concat.apply([], chunks);
        }
      };

      // Enable/Disable typed arrays use, for testing
      //
      exports.setTyped = function (on) {
        if (on) {
          exports.Buf8 = Uint8Array;
          exports.Buf16 = Uint16Array;
          exports.Buf32 = Int32Array;
          exports.assign(exports, fnTyped);
        } else {
          exports.Buf8 = Array;
          exports.Buf16 = Array;
          exports.Buf32 = Array;
          exports.assign(exports, fnUntyped);
        }
      };
      exports.setTyped(TYPED_OK);
    }, {}],
    2: [function (require, module, exports) {
      // String encode/decode helpers
      'use strict';

      var utils = require('./common');

      // Quick check if we can use fast array to bin string conversion
      //
      // - apply(Array) can fail on Android 2.2
      // - apply(Uint8Array) can fail on iOS 5.1 Safari
      //
      var STR_APPLY_OK = true;
      var STR_APPLY_UIA_OK = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (__) {
        STR_APPLY_OK = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (__) {
        STR_APPLY_UIA_OK = false;
      }

      // Table with utf8 lengths (calculated by first byte of sequence)
      // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
      // because max possible codepoint is 0x10ffff
      var _utf8len = new utils.Buf8(256);
      for (var q = 0; q < 256; q++) {
        _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
      }
      _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start

      // convert string to array (typed, when possible)
      exports.string2buf = function (str) {
        var buf,
          c,
          c2,
          m_pos,
          i,
          str_len = str.length,
          buf_len = 0;

        // count binary size
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
        }

        // allocate buffer
        buf = new utils.Buf8(buf_len);

        // convert
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
          } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | c >>> 6;
            buf[i++] = 0x80 | c & 0x3f;
          } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | c >>> 12;
            buf[i++] = 0x80 | c >>> 6 & 0x3f;
            buf[i++] = 0x80 | c & 0x3f;
          } else {
            /* four bytes */
            buf[i++] = 0xf0 | c >>> 18;
            buf[i++] = 0x80 | c >>> 12 & 0x3f;
            buf[i++] = 0x80 | c >>> 6 & 0x3f;
            buf[i++] = 0x80 | c & 0x3f;
          }
        }
        return buf;
      };

      // Helper (used in 2 places)
      function buf2binstring(buf, len) {
        // On Chrome, the arguments in a function call that are allowed is `65534`.
        // If the length of the buffer is smaller than that, we can use this optimization,
        // otherwise we will take a slower path.
        if (len < 65534) {
          if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
            return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
          }
        }
        var result = '';
        for (var i = 0; i < len; i++) {
          result += String.fromCharCode(buf[i]);
        }
        return result;
      }

      // Convert byte array to binary string
      exports.buf2binstring = function (buf) {
        return buf2binstring(buf, buf.length);
      };

      // Convert binary string (typed, when possible)
      exports.binstring2buf = function (str) {
        var buf = new utils.Buf8(str.length);
        for (var i = 0, len = buf.length; i < len; i++) {
          buf[i] = str.charCodeAt(i);
        }
        return buf;
      };

      // convert array to string
      exports.buf2string = function (buf, max) {
        var i, out, c, c_len;
        var len = max || buf.length;

        // Reserve max possible length (2 words per char)
        // NB: by unknown reasons, Array is significantly faster for
        //     String.fromCharCode.apply than Uint16Array.
        var utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len;) {
          c = buf[i++];
          // quick process ascii
          if (c < 0x80) {
            utf16buf[out++] = c;
            continue;
          }
          c_len = _utf8len[c];
          // skip 5 & 6 byte codes
          if (c_len > 4) {
            utf16buf[out++] = 0xfffd;
            i += c_len - 1;
            continue;
          }

          // apply mask on first byte
          c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
          // join the rest
          while (c_len > 1 && i < len) {
            c = c << 6 | buf[i++] & 0x3f;
            c_len--;
          }

          // terminated by end of string?
          if (c_len > 1) {
            utf16buf[out++] = 0xfffd;
            continue;
          }
          if (c < 0x10000) {
            utf16buf[out++] = c;
          } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | c >> 10 & 0x3ff;
            utf16buf[out++] = 0xdc00 | c & 0x3ff;
          }
        }
        return buf2binstring(utf16buf, out);
      };

      // Calculate max possible position in utf8 buffer,
      // that will not break sequence. If that's not possible
      // - (very small limits) return max size as is.
      //
      // buf[] - utf8 bytes array
      // max   - length limit (mandatory);
      exports.utf8border = function (buf, max) {
        var pos;
        max = max || buf.length;
        if (max > buf.length) {
          max = buf.length;
        }

        // go back from last position, until start of sequence found
        pos = max - 1;
        while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) {
          pos--;
        }

        // Very small and broken sequence,
        // return max, because we should return something anyway.
        if (pos < 0) {
          return max;
        }

        // If we came to start of buffer - that means buffer is too small,
        // return max too.
        if (pos === 0) {
          return max;
        }
        return pos + _utf8len[buf[pos]] > max ? pos : max;
      };
    }, {
      "./common": 1
    }],
    3: [function (require, module, exports) {
      'use strict';

      // Note: adler32 takes 12% for level 0 and 2% for level 6.
      // It isn't worth it to make additional optimizations as in original.
      // Small size is preferable.

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      function adler32(adler, buf, len, pos) {
        var s1 = adler & 0xffff | 0,
          s2 = adler >>> 16 & 0xffff | 0,
          n = 0;
        while (len !== 0) {
          // Set limit ~ twice less than 5552, to keep
          // s2 in 31-bits, because we force signed ints.
          // in other case %= will fail.
          n = len > 2000 ? 2000 : len;
          len -= n;
          do {
            s1 = s1 + buf[pos++] | 0;
            s2 = s2 + s1 | 0;
          } while (--n);
          s1 %= 65521;
          s2 %= 65521;
        }
        return s1 | s2 << 16 | 0;
      }
      module.exports = adler32;
    }, {}],
    4: [function (require, module, exports) {
      'use strict';

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      module.exports = {
        /* Allowed flush values; see deflate() and inflate() below for details */
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        /* Return codes for the compression/decompression functions. Negative values
        * are errors, positive values are used for special but normal events.
        */
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        //Z_MEM_ERROR:     -4,
        Z_BUF_ERROR: -5,
        //Z_VERSION_ERROR: -6,

        /* compression levels */
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        /* Possible values of the data_type field (though see inflate()) */
        Z_BINARY: 0,
        Z_TEXT: 1,
        //Z_ASCII:                1, // = Z_TEXT (deprecated)
        Z_UNKNOWN: 2,
        /* The deflate compression method */
        Z_DEFLATED: 8
        //Z_NULL:                 null // Use -1 or null inline, depending on var type
      };
    }, {}],
    5: [function (require, module, exports) {
      'use strict';

      // Note: we can't get significant speed boost here.
      // So write code to minimize size - no pregenerated tables
      // and array tools dependencies.

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.

      // Use ordinary array, since untyped makes no boost here
      function makeTable() {
        var c,
          table = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
          }
          table[n] = c;
        }
        return table;
      }

      // Create table on load. Just 255 signed longs. Not a problem.
      var crcTable = makeTable();
      function crc32(crc, buf, len, pos) {
        var t = crcTable,
          end = pos + len;
        crc ^= -1;
        for (var i = pos; i < end; i++) {
          crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 0xFF];
        }
        return crc ^ -1; // >>> 0;
      }
      module.exports = crc32;
    }, {}],
    6: [function (require, module, exports) {
      'use strict';

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      function GZheader() {
        /* true if compressed data believed to be text */
        this.text = 0;
        /* modification time */
        this.time = 0;
        /* extra flags (not used when writing a gzip file) */
        this.xflags = 0;
        /* operating system */
        this.os = 0;
        /* pointer to extra field or Z_NULL if none */
        this.extra = null;
        /* extra field length (valid if extra != Z_NULL) */
        this.extra_len = 0; // Actually, we don't need it in JS,
        // but leave for few code modifications

        //
        // Setup limits is not necessary because in js we should not preallocate memory
        // for inflate use constant limit in 65536 bytes
        //

        /* space at extra (only when reading header) */
        // this.extra_max  = 0;
        /* pointer to zero-terminated file name or Z_NULL */
        this.name = '';
        /* space at name (only when reading header) */
        // this.name_max   = 0;
        /* pointer to zero-terminated comment or Z_NULL */
        this.comment = '';
        /* space at comment (only when reading header) */
        // this.comm_max   = 0;
        /* true if there was or will be a header crc */
        this.hcrc = 0;
        /* true when done reading gzip header (not used when writing a gzip file) */
        this.done = false;
      }
      module.exports = GZheader;
    }, {}],
    7: [function (require, module, exports) {
      'use strict';

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.

      // See state defs from inflate.js
      var BAD = 30; /* got a data error -- remain here until reset */
      var TYPE = 12; /* i: waiting for type bits, including last-flag bit */

      /*
         Decode literal, length, and distance codes and write out the resulting
         literal and match bytes until either not enough input or output is
         available, an end-of-block is encountered, or a data error is encountered.
         When large enough input and output buffers are supplied to inflate(), for
         example, a 16K input buffer and a 64K output buffer, more than 95% of the
         inflate execution time is spent in this routine.
          Entry assumptions:
               state.mode === LEN
              strm.avail_in >= 6
              strm.avail_out >= 258
              start >= strm.avail_out
              state.bits < 8
          On return, state.mode is one of:
               LEN -- ran out of enough output space or enough available input
              TYPE -- reached end of block code, inflate() to interpret next block
              BAD -- error in block data
          Notes:
           - The maximum input bits used by a length/distance pair is 15 bits for the
            length code, 5 bits for the length extra, 15 bits for the distance code,
            and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
            Therefore if strm.avail_in >= 6, then there is enough input to avoid
            checking for available input while decoding.
           - The maximum bytes that a single length/distance pair can output is 258
            bytes, which is the maximum length that can be coded.  inflate_fast()
            requires strm.avail_out >= 258 for each loop to avoid checking for
            output space.
       */
      module.exports = function inflate_fast(strm, start) {
        var state;
        var _in; /* local strm.input */
        var last; /* have enough input while in < last */
        var _out; /* local strm.output */
        var beg; /* inflate()'s initial strm.output */
        var end; /* while out < end, enough space available */
        //#ifdef INFLATE_STRICT
        var dmax; /* maximum distance from zlib header */
        //#endif
        var wsize; /* window size or zero if not using window */
        var whave; /* valid bytes in the window */
        var wnext; /* window write index */
        // Use `s_window` instead `window`, avoid conflict with instrumentation tools
        var s_window; /* allocated sliding window, if wsize != 0 */
        var hold; /* local strm.hold */
        var bits; /* local strm.bits */
        var lcode; /* local strm.lencode */
        var dcode; /* local strm.distcode */
        var lmask; /* mask for first level of length codes */
        var dmask; /* mask for first level of distance codes */
        var here; /* retrieved table entry */
        var op; /* code bits, operation, extra bits, or */
        /*  window position, window bytes to copy */
        var len; /* match length, unused bytes */
        var dist; /* match distance */
        var from; /* where to copy match from */
        var from_source;
        var input, output; // JS specific, because we have no pointers

        /* copy state to local variables */
        state = strm.state;
        //here = state.here;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
        //#ifdef INFLATE_STRICT
        dmax = state.dmax;
        //#endif
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;

        /* decode literals and length/distances until end-of-block or not enough
           input data or output space */

        top: do {
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = lcode[hold & lmask];
          dolen: for (;;) {
            // Goto emulation
            op = here >>> 24 /*here.bits*/;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 0xff /*here.op*/;
            if (op === 0) {
              /* literal */
              //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
              //        "inflate:         literal '%c'\n" :
              //        "inflate:         literal 0x%02x\n", here.val));
              output[_out++] = here & 0xffff /*here.val*/;
            } else if (op & 16) {
              /* length base */
              len = here & 0xffff /*here.val*/;
              op &= 15; /* number of extra bits */
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              //Tracevv((stderr, "inflate:         length %u\n", len));
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist: for (;;) {
                // goto emulation
                op = here >>> 24 /*here.bits*/;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 0xff /*here.op*/;
                if (op & 16) {
                  /* distance base */
                  dist = here & 0xffff /*here.val*/;
                  op &= 15; /* number of extra bits */
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  //#ifdef INFLATE_STRICT
                  if (dist > dmax) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD;
                    break top;
                  }
                  //#endif
                  hold >>>= op;
                  bits -= op;
                  //Tracevv((stderr, "inflate:         distance %u\n", dist));
                  op = _out - beg; /* max distance in output */
                  if (dist > op) {
                    /* see if copy from window */
                    op = dist - op; /* distance back in window */
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = 'invalid distance too far back';
                        state.mode = BAD;
                        break top;
                      }

                      // (!) This block is disabled in zlib defaults,
                      // don't enable it for binary compatibility
                      //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                      //                if (len <= op - whave) {
                      //                  do {
                      //                    output[_out++] = 0;
                      //                  } while (--len);
                      //                  continue top;
                      //                }
                      //                len -= op - whave;
                      //                do {
                      //                  output[_out++] = 0;
                      //                } while (--op > whave);
                      //                if (op === 0) {
                      //                  from = _out - dist;
                      //                  do {
                      //                    output[_out++] = output[from++];
                      //                  } while (--len);
                      //                  continue top;
                      //                }
                      //#endif
                    }
                    from = 0; // window index
                    from_source = s_window;
                    if (wnext === 0) {
                      /* very common case */
                      from += wsize - op;
                      if (op < len) {
                        /* some from window */
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist; /* rest from output */
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      /* wrap around window */
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        /* some from end of window */
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          /* some from start of window */
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist; /* rest from output */
                          from_source = output;
                        }
                      }
                    } else {
                      /* contiguous in window */
                      from += wnext - op;
                      if (op < len) {
                        /* some from window */
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist; /* rest from output */
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist; /* copy direct from output */
                    do {
                      /* minimum length is three */
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  /* 2nd level distance code */
                  here = dcode[(here & 0xffff /*here.val*/) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = 'invalid distance code';
                  state.mode = BAD;
                  break top;
                }
                break; // need to emulate goto via "continue"
              }
            } else if ((op & 64) === 0) {
              /* 2nd level length code */
              here = lcode[(here & 0xffff /*here.val*/) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              /* end-of-block */
              //Tracevv((stderr, "inflate:         end of block\n"));
              state.mode = TYPE;
              break top;
            } else {
              strm.msg = 'invalid literal/length code';
              state.mode = BAD;
              break top;
            }
            break; // need to emulate goto via "continue"
          }
        } while (_in < last && _out < end);

        /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;

        /* update state and return */
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
        strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
        state.hold = hold;
        state.bits = bits;
        return;
      };
    }, {}],
    8: [function (require, module, exports) {
      'use strict';

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      var utils = require('../utils/common');
      var adler32 = require('./adler32');
      var crc32 = require('./crc32');
      var inflate_fast = require('./inffast');
      var inflate_table = require('./inftrees');
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;

      /* Public constants ==========================================================*/
      /* ===========================================================================*/

      /* Allowed flush values; see deflate() and inflate() below for details */
      //var Z_NO_FLUSH      = 0;
      //var Z_PARTIAL_FLUSH = 1;
      //var Z_SYNC_FLUSH    = 2;
      //var Z_FULL_FLUSH    = 3;
      var Z_FINISH = 4;
      var Z_BLOCK = 5;
      var Z_TREES = 6;

      /* Return codes for the compression/decompression functions. Negative values
       * are errors, positive values are used for special but normal events.
       */
      var Z_OK = 0;
      var Z_STREAM_END = 1;
      var Z_NEED_DICT = 2;
      //var Z_ERRNO         = -1;
      var Z_STREAM_ERROR = -2;
      var Z_DATA_ERROR = -3;
      var Z_MEM_ERROR = -4;
      var Z_BUF_ERROR = -5;
      //var Z_VERSION_ERROR = -6;

      /* The deflate compression method */
      var Z_DEFLATED = 8;

      /* STATES ====================================================================*/
      /* ===========================================================================*/

      var HEAD = 1; /* i: waiting for magic header */
      var FLAGS = 2; /* i: waiting for method and flags (gzip) */
      var TIME = 3; /* i: waiting for modification time (gzip) */
      var OS = 4; /* i: waiting for extra flags and operating system (gzip) */
      var EXLEN = 5; /* i: waiting for extra length (gzip) */
      var EXTRA = 6; /* i: waiting for extra bytes (gzip) */
      var NAME = 7; /* i: waiting for end of file name (gzip) */
      var COMMENT = 8; /* i: waiting for end of comment (gzip) */
      var HCRC = 9; /* i: waiting for header crc (gzip) */
      var DICTID = 10; /* i: waiting for dictionary check value */
      var DICT = 11; /* waiting for inflateSetDictionary() call */
      var TYPE = 12; /* i: waiting for type bits, including last-flag bit */
      var TYPEDO = 13; /* i: same, but skip check to exit inflate on new block */
      var STORED = 14; /* i: waiting for stored size (length and complement) */
      var COPY_ = 15; /* i/o: same as COPY below, but only first time in */
      var COPY = 16; /* i/o: waiting for input or output to copy stored block */
      var TABLE = 17; /* i: waiting for dynamic block table lengths */
      var LENLENS = 18; /* i: waiting for code length code lengths */
      var CODELENS = 19; /* i: waiting for length/lit and distance code lengths */
      var LEN_ = 20; /* i: same as LEN below, but only first time in */
      var LEN = 21; /* i: waiting for length/lit/eob code */
      var LENEXT = 22; /* i: waiting for length extra bits */
      var DIST = 23; /* i: waiting for distance code */
      var DISTEXT = 24; /* i: waiting for distance extra bits */
      var MATCH = 25; /* o: waiting for output space to copy string */
      var LIT = 26; /* o: waiting for output space to write literal */
      var CHECK = 27; /* i: waiting for 32-bit check value */
      var LENGTH = 28; /* i: waiting for 32-bit length (gzip) */
      var DONE = 29; /* finished check, done -- remain here until reset */
      var BAD = 30; /* got a data error -- remain here until reset */
      var MEM = 31; /* got an inflate() memory error -- remain here until reset */
      var SYNC = 32; /* looking for synchronization bytes to restart inflate() */

      /* ===========================================================================*/

      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      //var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

      var MAX_WBITS = 15;
      /* 32K LZ77 window */
      var DEF_WBITS = MAX_WBITS;
      function zswap32(q) {
        return (q >>> 24 & 0xff) + (q >>> 8 & 0xff00) + ((q & 0xff00) << 8) + ((q & 0xff) << 24);
      }
      function InflateState() {
        this.mode = 0; /* current inflate mode */
        this.last = false; /* true if processing last block */
        this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
        this.havedict = false; /* true if dictionary provided */
        this.flags = 0; /* gzip header method and flags (0 if zlib) */
        this.dmax = 0; /* zlib header max distance (INFLATE_STRICT) */
        this.check = 0; /* protected copy of check value */
        this.total = 0; /* protected copy of output count */
        // TODO: may be {}
        this.head = null; /* where to save gzip header information */

        /* sliding window */
        this.wbits = 0; /* log base 2 of requested window size */
        this.wsize = 0; /* window size or zero if not using window */
        this.whave = 0; /* valid bytes in the window */
        this.wnext = 0; /* window write index */
        this.window = null; /* allocated sliding window, if needed */

        /* bit accumulator */
        this.hold = 0; /* input bit accumulator */
        this.bits = 0; /* number of bits in "in" */

        /* for string and stored block copying */
        this.length = 0; /* literal or length of data to copy */
        this.offset = 0; /* distance back to copy string from */

        /* for table and code decoding */
        this.extra = 0; /* extra bits needed */

        /* fixed and dynamic code tables */
        this.lencode = null; /* starting table for length/literal codes */
        this.distcode = null; /* starting table for distance codes */
        this.lenbits = 0; /* index bits for lencode */
        this.distbits = 0; /* index bits for distcode */

        /* dynamic table building */
        this.ncode = 0; /* number of code length code lengths */
        this.nlen = 0; /* number of length code lengths */
        this.ndist = 0; /* number of distance code lengths */
        this.have = 0; /* number of code lengths in lens[] */
        this.next = null; /* next available space in codes[] */

        this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
        this.work = new utils.Buf16(288); /* work area for code table building */

        /*
         because we don't have pointers in js, we use lencode and distcode directly
         as buffers so we don't need codes
        */
        //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
        this.lendyn = null; /* dynamic table for length/literal codes (JS specific) */
        this.distdyn = null; /* dynamic table for distance codes (JS specific) */
        this.sane = 0; /* if false, allow invalid distance too far */
        this.back = 0; /* bits back of last unprocessed length/lit */
        this.was = 0; /* initial length of match */
      }
      function inflateResetKeep(strm) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = ''; /*Z_NULL*/
        if (state.wrap) {
          /* to support ill-conceived Java test suite */
          strm.adler = state.wrap & 1;
        }
        state.mode = HEAD;
        state.last = 0;
        state.havedict = 0;
        state.dmax = 32768;
        state.head = null /*Z_NULL*/;
        state.hold = 0;
        state.bits = 0;
        //state.lencode = state.distcode = state.next = state.codes;
        state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
        state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
        state.sane = 1;
        state.back = -1;
        //Tracev((stderr, "inflate: reset\n"));
        return Z_OK;
      }
      function inflateReset(strm) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep(strm);
      }
      function inflateReset2(strm, windowBits) {
        var wrap;
        var state;

        /* get the state */
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;

        /* extract wrap request from windowBits parameter */
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else {
          wrap = (windowBits >> 4) + 1;
          if (windowBits < 48) {
            windowBits &= 15;
          }
        }

        /* set number of window bits, free window if different */
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
          return Z_STREAM_ERROR;
        }
        if (state.window !== null && state.wbits !== windowBits) {
          state.window = null;
        }

        /* update state and reset the rest of it */
        state.wrap = wrap;
        state.wbits = windowBits;
        return inflateReset(strm);
      }
      function inflateInit2(strm, windowBits) {
        var ret;
        var state;
        if (!strm) {
          return Z_STREAM_ERROR;
        }
        //strm.msg = Z_NULL;                 /* in case we return an error */

        state = new InflateState();

        //if (state === Z_NULL) return Z_MEM_ERROR;
        //Tracev((stderr, "inflate: allocated\n"));
        strm.state = state;
        state.window = null /*Z_NULL*/;
        ret = inflateReset2(strm, windowBits);
        if (ret !== Z_OK) {
          strm.state = null /*Z_NULL*/;
        }
        return ret;
      }
      function inflateInit(strm) {
        return inflateInit2(strm, DEF_WBITS);
      }

      /*
       Return state with length and distance decoding tables and index sizes set to
       fixed code decoding.  Normally this returns fixed tables from inffixed.h.
       If BUILDFIXED is defined, then instead this routine builds the tables the
       first time it's called, and returns those tables the first time and
       thereafter.  This reduces the size of the code by about 2K bytes, in
       exchange for a little execution time.  However, BUILDFIXED should not be
       used for threaded applications, since the rewriting of the tables and virgin
       may not be thread-safe.
       */
      var virgin = true;
      var lenfix, distfix; // We have no pointers in JS, so keep tables separate

      function fixedtables(state) {
        /* build fixed huffman tables if first call (may not be thread safe) */
        if (virgin) {
          var sym;
          lenfix = new utils.Buf32(512);
          distfix = new utils.Buf32(32);

          /* literal/length table */
          sym = 0;
          while (sym < 144) {
            state.lens[sym++] = 8;
          }
          while (sym < 256) {
            state.lens[sym++] = 9;
          }
          while (sym < 280) {
            state.lens[sym++] = 7;
          }
          while (sym < 288) {
            state.lens[sym++] = 8;
          }
          inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
            bits: 9
          });

          /* distance table */
          sym = 0;
          while (sym < 32) {
            state.lens[sym++] = 5;
          }
          inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
            bits: 5
          });

          /* do this just once */
          virgin = false;
        }
        state.lencode = lenfix;
        state.lenbits = 9;
        state.distcode = distfix;
        state.distbits = 5;
      }

      /*
       Update the window with the last wsize (normally 32K) bytes written before
       returning.  If window does not exist yet, create it.  This is only called
       when a window is already in use, or when output has been written during this
       inflate call, but the end of the deflate stream has not been reached yet.
       It is also called to create a window for dictionary data when a dictionary
       is loaded.
        Providing output buffers larger than 32K to inflate() should provide a speed
       advantage, since only the last 32K of output is copied to the sliding window
       upon return from inflate(), and since all distances after the first 32K of
       output will fall in the output data, making match copies simpler and faster.
       The advantage may be dependent on the size of the processor's data caches.
       */
      function updatewindow(strm, src, end, copy) {
        var dist;
        var state = strm.state;

        /* if it hasn't been done already, allocate space for the window */
        if (state.window === null) {
          state.wsize = 1 << state.wbits;
          state.wnext = 0;
          state.whave = 0;
          state.window = new utils.Buf8(state.wsize);
        }

        /* copy state->wsize or less output bytes into the circular window */
        if (copy >= state.wsize) {
          utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
          state.wnext = 0;
          state.whave = state.wsize;
        } else {
          dist = state.wsize - state.wnext;
          if (dist > copy) {
            dist = copy;
          }
          //zmemcpy(state->window + state->wnext, end - copy, dist);
          utils.arraySet(state.window, src, end - copy, dist, state.wnext);
          copy -= dist;
          if (copy) {
            //zmemcpy(state->window, end - copy, copy);
            utils.arraySet(state.window, src, end - copy, copy, 0);
            state.wnext = copy;
            state.whave = state.wsize;
          } else {
            state.wnext += dist;
            if (state.wnext === state.wsize) {
              state.wnext = 0;
            }
            if (state.whave < state.wsize) {
              state.whave += dist;
            }
          }
        }
        return 0;
      }
      function inflate(strm, flush) {
        var state;
        var input, output; // input/output buffers
        var next; /* next input INDEX */
        var put; /* next output INDEX */
        var have, left; /* available input and output */
        var hold; /* bit buffer */
        var bits; /* bits in bit buffer */
        var _in, _out; /* save starting available input and output */
        var copy; /* number of stored or match bytes to copy */
        var from; /* where to copy match bytes from */
        var from_source;
        var here = 0; /* current decoding table entry */
        var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
        //var last;                   /* parent table entry */
        var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
        var len; /* length to copy for repeats, bits to drop */
        var ret; /* return code */
        var hbuf = new utils.Buf8(4); /* buffer for gzip header crc calculation */
        var opts;
        var n; // temporary var for NEED_BITS

        var order = /* permutation of code lengths */
        [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.mode === TYPE) {
          state.mode = TYPEDO;
        } /* skip check */

        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        _in = have;
        _out = left;
        ret = Z_OK;
        inf_leave:
        // goto emulation
        for (;;) {
          switch (state.mode) {
            case HEAD:
              if (state.wrap === 0) {
                state.mode = TYPEDO;
                break;
              }
              //=== NEEDBITS(16);
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if (state.wrap & 2 && hold === 0x8b1f) {
                /* gzip header */
                state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = hold >>> 8 & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                //===//

                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
                state.mode = FLAGS;
                break;
              }
              state.flags = 0; /* expect zlib header */
              if (state.head) {
                state.head.done = false;
              }
              if (!(state.wrap & 1) || /* check if zlib header allowed */
              (((hold & 0xff /*BITS(8)*/) << 8) + (hold >> 8)) % 31) {
                strm.msg = 'incorrect header check';
                state.mode = BAD;
                break;
              }
              if ((hold & 0x0f /*BITS(4)*/) !== Z_DEFLATED) {
                strm.msg = 'unknown compression method';
                state.mode = BAD;
                break;
              }
              //--- DROPBITS(4) ---//
              hold >>>= 4;
              bits -= 4;
              //---//
              len = (hold & 0x0f /*BITS(4)*/) + 8;
              if (state.wbits === 0) {
                state.wbits = len;
              } else if (len > state.wbits) {
                strm.msg = 'invalid window size';
                state.mode = BAD;
                break;
              }
              state.dmax = 1 << len;
              //Tracev((stderr, "inflate:   zlib header ok\n"));
              strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/;
              state.mode = hold & 0x200 ? DICTID : TYPE;
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              break;
            case FLAGS:
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.flags = hold;
              if ((state.flags & 0xff) !== Z_DEFLATED) {
                strm.msg = 'unknown compression method';
                state.mode = BAD;
                break;
              }
              if (state.flags & 0xe000) {
                strm.msg = 'unknown header flags set';
                state.mode = BAD;
                break;
              }
              if (state.head) {
                state.head.text = hold >> 8 & 1;
              }
              if (state.flags & 0x0200) {
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = hold >>> 8 & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                //===//
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = TIME;
            /* falls through */
            case TIME:
              //=== NEEDBITS(32); */
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if (state.head) {
                state.head.time = hold;
              }
              if (state.flags & 0x0200) {
                //=== CRC4(state.check, hold)
                hbuf[0] = hold & 0xff;
                hbuf[1] = hold >>> 8 & 0xff;
                hbuf[2] = hold >>> 16 & 0xff;
                hbuf[3] = hold >>> 24 & 0xff;
                state.check = crc32(state.check, hbuf, 4, 0);
                //===
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = OS;
            /* falls through */
            case OS:
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if (state.head) {
                state.head.xflags = hold & 0xff;
                state.head.os = hold >> 8;
              }
              if (state.flags & 0x0200) {
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = hold >>> 8 & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                //===//
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = EXLEN;
            /* falls through */
            case EXLEN:
              if (state.flags & 0x0400) {
                //=== NEEDBITS(16); */
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.length = hold;
                if (state.head) {
                  state.head.extra_len = hold;
                }
                if (state.flags & 0x0200) {
                  //=== CRC2(state.check, hold);
                  hbuf[0] = hold & 0xff;
                  hbuf[1] = hold >>> 8 & 0xff;
                  state.check = crc32(state.check, hbuf, 2, 0);
                  //===//
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
              } else if (state.head) {
                state.head.extra = null /*Z_NULL*/;
              }
              state.mode = EXTRA;
            /* falls through */
            case EXTRA:
              if (state.flags & 0x0400) {
                copy = state.length;
                if (copy > have) {
                  copy = have;
                }
                if (copy) {
                  if (state.head) {
                    len = state.head.extra_len - state.length;
                    if (!state.head.extra) {
                      // Use untyped array for more convenient processing later
                      state.head.extra = new Array(state.head.extra_len);
                    }
                    utils.arraySet(state.head.extra, input, next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    copy, /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                    len);
                    //zmemcpy(state.head.extra + len, next,
                    //        len + copy > state.head.extra_max ?
                    //        state.head.extra_max - len : copy);
                  }
                  if (state.flags & 0x0200) {
                    state.check = crc32(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  state.length -= copy;
                }
                if (state.length) {
                  break inf_leave;
                }
              }
              state.length = 0;
              state.mode = NAME;
            /* falls through */
            case NAME:
              if (state.flags & 0x0800) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  // TODO: 2 or 1 bytes?
                  len = input[next + copy++];
                  /* use constant limit because in js we should not preallocate memory */
                  if (state.head && len && state.length < 65536 /*state.head.name_max*/) {
                    state.head.name += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 0x0200) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.name = null;
              }
              state.length = 0;
              state.mode = COMMENT;
            /* falls through */
            case COMMENT:
              if (state.flags & 0x1000) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next + copy++];
                  /* use constant limit because in js we should not preallocate memory */
                  if (state.head && len && state.length < 65536 /*state.head.comm_max*/) {
                    state.head.comment += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 0x0200) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.comment = null;
              }
              state.mode = HCRC;
            /* falls through */
            case HCRC:
              if (state.flags & 0x0200) {
                //=== NEEDBITS(16); */
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                if (hold !== (state.check & 0xffff)) {
                  strm.msg = 'header crc mismatch';
                  state.mode = BAD;
                  break;
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
              }
              if (state.head) {
                state.head.hcrc = state.flags >> 9 & 1;
                state.head.done = true;
              }
              strm.adler = state.check = 0;
              state.mode = TYPE;
              break;
            case DICTID:
              //=== NEEDBITS(32); */
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              strm.adler = state.check = zswap32(hold);
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = DICT;
            /* falls through */
            case DICT:
              if (state.havedict === 0) {
                //--- RESTORE() ---
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                //---
                return Z_NEED_DICT;
              }
              strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/;
              state.mode = TYPE;
            /* falls through */
            case TYPE:
              if (flush === Z_BLOCK || flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case TYPEDO:
              if (state.last) {
                //--- BYTEBITS() ---//
                hold >>>= bits & 7;
                bits -= bits & 7;
                //---//
                state.mode = CHECK;
                break;
              }
              //=== NEEDBITS(3); */
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.last = hold & 0x01 /*BITS(1)*/;
              //--- DROPBITS(1) ---//
              hold >>>= 1;
              bits -= 1;
              //---//

              switch (hold & 0x03 /*BITS(2)*/) {
                case 0:
                  /* stored block */
                  //Tracev((stderr, "inflate:     stored block%s\n",
                  //        state.last ? " (last)" : ""));
                  state.mode = STORED;
                  break;
                case 1:
                  /* fixed block */
                  fixedtables(state);
                  //Tracev((stderr, "inflate:     fixed codes block%s\n",
                  //        state.last ? " (last)" : ""));
                  state.mode = LEN_; /* decode codes */
                  if (flush === Z_TREES) {
                    //--- DROPBITS(2) ---//
                    hold >>>= 2;
                    bits -= 2;
                    //---//
                    break inf_leave;
                  }
                  break;
                case 2:
                  /* dynamic block */
                  //Tracev((stderr, "inflate:     dynamic codes block%s\n",
                  //        state.last ? " (last)" : ""));
                  state.mode = TABLE;
                  break;
                case 3:
                  strm.msg = 'invalid block type';
                  state.mode = BAD;
              }
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break;
            case STORED:
              //--- BYTEBITS() ---// /* go to byte boundary */
              hold >>>= bits & 7;
              bits -= bits & 7;
              //---//
              //=== NEEDBITS(32); */
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if ((hold & 0xffff) !== (hold >>> 16 ^ 0xffff)) {
                strm.msg = 'invalid stored block lengths';
                state.mode = BAD;
                break;
              }
              state.length = hold & 0xffff;
              //Tracev((stderr, "inflate:       stored length %u\n",
              //        state.length));
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = COPY_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case COPY_:
              state.mode = COPY;
            /* falls through */
            case COPY:
              copy = state.length;
              if (copy) {
                if (copy > have) {
                  copy = have;
                }
                if (copy > left) {
                  copy = left;
                }
                if (copy === 0) {
                  break inf_leave;
                }
                //--- zmemcpy(put, next, copy); ---
                utils.arraySet(output, input, next, copy, put);
                //---//
                have -= copy;
                next += copy;
                left -= copy;
                put += copy;
                state.length -= copy;
                break;
              }
              //Tracev((stderr, "inflate:       stored end\n"));
              state.mode = TYPE;
              break;
            case TABLE:
              //=== NEEDBITS(14); */
              while (bits < 14) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.nlen = (hold & 0x1f /*BITS(5)*/) + 257;
              //--- DROPBITS(5) ---//
              hold >>>= 5;
              bits -= 5;
              //---//
              state.ndist = (hold & 0x1f /*BITS(5)*/) + 1;
              //--- DROPBITS(5) ---//
              hold >>>= 5;
              bits -= 5;
              //---//
              state.ncode = (hold & 0x0f /*BITS(4)*/) + 4;
              //--- DROPBITS(4) ---//
              hold >>>= 4;
              bits -= 4;
              //---//
              //#ifndef PKZIP_BUG_WORKAROUND
              if (state.nlen > 286 || state.ndist > 30) {
                strm.msg = 'too many length or distance symbols';
                state.mode = BAD;
                break;
              }
              //#endif
              //Tracev((stderr, "inflate:       table sizes ok\n"));
              state.have = 0;
              state.mode = LENLENS;
            /* falls through */
            case LENLENS:
              while (state.have < state.ncode) {
                //=== NEEDBITS(3);
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.lens[order[state.have++]] = hold & 0x07; //BITS(3);
                //--- DROPBITS(3) ---//
                hold >>>= 3;
                bits -= 3;
                //---//
              }
              while (state.have < 19) {
                state.lens[order[state.have++]] = 0;
              }
              // We have separate tables & no pointers. 2 commented lines below not needed.
              //state.next = state.codes;
              //state.lencode = state.next;
              // Switch to use dynamic table
              state.lencode = state.lendyn;
              state.lenbits = 7;
              opts = {
                bits: state.lenbits
              };
              ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = 'invalid code lengths set';
                state.mode = BAD;
                break;
              }
              //Tracev((stderr, "inflate:       code lengths ok\n"));
              state.have = 0;
              state.mode = CODELENS;
            /* falls through */
            case CODELENS:
              while (state.have < state.nlen + state.ndist) {
                for (;;) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1]; /*BITS(state.lenbits)*/
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 0xff;
                  here_val = here & 0xffff;
                  if (here_bits <= bits) {
                    break;
                  }
                  //--- PULLBYTE() ---//
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                  //---//
                }
                if (here_val < 16) {
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  state.lens[state.have++] = here_val;
                } else {
                  if (here_val === 16) {
                    //=== NEEDBITS(here.bits + 2);
                    n = here_bits + 2;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    //===//
                    //--- DROPBITS(here.bits) ---//
                    hold >>>= here_bits;
                    bits -= here_bits;
                    //---//
                    if (state.have === 0) {
                      strm.msg = 'invalid bit length repeat';
                      state.mode = BAD;
                      break;
                    }
                    len = state.lens[state.have - 1];
                    copy = 3 + (hold & 0x03); //BITS(2);
                    //--- DROPBITS(2) ---//
                    hold >>>= 2;
                    bits -= 2;
                    //---//
                  } else if (here_val === 17) {
                    //=== NEEDBITS(here.bits + 3);
                    n = here_bits + 3;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    //===//
                    //--- DROPBITS(here.bits) ---//
                    hold >>>= here_bits;
                    bits -= here_bits;
                    //---//
                    len = 0;
                    copy = 3 + (hold & 0x07); //BITS(3);
                    //--- DROPBITS(3) ---//
                    hold >>>= 3;
                    bits -= 3;
                    //---//
                  } else {
                    //=== NEEDBITS(here.bits + 7);
                    n = here_bits + 7;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    //===//
                    //--- DROPBITS(here.bits) ---//
                    hold >>>= here_bits;
                    bits -= here_bits;
                    //---//
                    len = 0;
                    copy = 11 + (hold & 0x7f); //BITS(7);
                    //--- DROPBITS(7) ---//
                    hold >>>= 7;
                    bits -= 7;
                    //---//
                  }
                  if (state.have + copy > state.nlen + state.ndist) {
                    strm.msg = 'invalid bit length repeat';
                    state.mode = BAD;
                    break;
                  }
                  while (copy--) {
                    state.lens[state.have++] = len;
                  }
                }
              }

              /* handle error breaks in while */
              if (state.mode === BAD) {
                break;
              }

              /* check for end-of-block code (better have one) */
              if (state.lens[256] === 0) {
                strm.msg = 'invalid code -- missing end-of-block';
                state.mode = BAD;
                break;
              }

              /* build code tables -- note: do not change the lenbits or distbits
                 values here (9 and 6) without reading the comments in inftrees.h
                 concerning the ENOUGH constants, which depend on those values */
              state.lenbits = 9;
              opts = {
                bits: state.lenbits
              };
              ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
              // We have separate tables & no pointers. 2 commented lines below not needed.
              // state.next_index = opts.table_index;
              state.lenbits = opts.bits;
              // state.lencode = state.next;

              if (ret) {
                strm.msg = 'invalid literal/lengths set';
                state.mode = BAD;
                break;
              }
              state.distbits = 6;
              //state.distcode.copy(state.codes);
              // Switch to use dynamic table
              state.distcode = state.distdyn;
              opts = {
                bits: state.distbits
              };
              ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
              // We have separate tables & no pointers. 2 commented lines below not needed.
              // state.next_index = opts.table_index;
              state.distbits = opts.bits;
              // state.distcode = state.next;

              if (ret) {
                strm.msg = 'invalid distances set';
                state.mode = BAD;
                break;
              }
              //Tracev((stderr, 'inflate:       codes ok\n'));
              state.mode = LEN_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case LEN_:
              state.mode = LEN;
            /* falls through */
            case LEN:
              if (have >= 6 && left >= 258) {
                //--- RESTORE() ---
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                //---
                inflate_fast(strm, _out);
                //--- LOAD() ---
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                //---

                if (state.mode === TYPE) {
                  state.back = -1;
                }
                break;
              }
              state.back = 0;
              for (;;) {
                here = state.lencode[hold & (1 << state.lenbits) - 1]; /*BITS(state.lenbits)*/
                here_bits = here >>> 24;
                here_op = here >>> 16 & 0xff;
                here_val = here & 0xffff;
                if (here_bits <= bits) {
                  break;
                }
                //--- PULLBYTE() ---//
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              if (here_op && (here_op & 0xf0) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (;;) {
                  here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1 /*BITS(last.bits + last.op)*/) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 0xff;
                  here_val = here & 0xffff;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  //--- PULLBYTE() ---//
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                  //---//
                }
                //--- DROPBITS(last.bits) ---//
                hold >>>= last_bits;
                bits -= last_bits;
                //---//
                state.back += last_bits;
              }
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              state.back += here_bits;
              state.length = here_val;
              if (here_op === 0) {
                //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
                //        "inflate:         literal '%c'\n" :
                //        "inflate:         literal 0x%02x\n", here.val));
                state.mode = LIT;
                break;
              }
              if (here_op & 32) {
                //Tracevv((stderr, "inflate:         end of block\n"));
                state.back = -1;
                state.mode = TYPE;
                break;
              }
              if (here_op & 64) {
                strm.msg = 'invalid literal/length code';
                state.mode = BAD;
                break;
              }
              state.extra = here_op & 15;
              state.mode = LENEXT;
            /* falls through */
            case LENEXT:
              if (state.extra) {
                //=== NEEDBITS(state.extra);
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.length += hold & (1 << state.extra) - 1 /*BITS(state.extra)*/;
                //--- DROPBITS(state.extra) ---//
                hold >>>= state.extra;
                bits -= state.extra;
                //---//
                state.back += state.extra;
              }
              //Tracevv((stderr, "inflate:         length %u\n", state.length));
              state.was = state.length;
              state.mode = DIST;
            /* falls through */
            case DIST:
              for (;;) {
                here = state.distcode[hold & (1 << state.distbits) - 1]; /*BITS(state.distbits)*/
                here_bits = here >>> 24;
                here_op = here >>> 16 & 0xff;
                here_val = here & 0xffff;
                if (here_bits <= bits) {
                  break;
                }
                //--- PULLBYTE() ---//
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              if ((here_op & 0xf0) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (;;) {
                  here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1 /*BITS(last.bits + last.op)*/) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 0xff;
                  here_val = here & 0xffff;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  //--- PULLBYTE() ---//
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                  //---//
                }
                //--- DROPBITS(last.bits) ---//
                hold >>>= last_bits;
                bits -= last_bits;
                //---//
                state.back += last_bits;
              }
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              state.back += here_bits;
              if (here_op & 64) {
                strm.msg = 'invalid distance code';
                state.mode = BAD;
                break;
              }
              state.offset = here_val;
              state.extra = here_op & 15;
              state.mode = DISTEXT;
            /* falls through */
            case DISTEXT:
              if (state.extra) {
                //=== NEEDBITS(state.extra);
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.offset += hold & (1 << state.extra) - 1 /*BITS(state.extra)*/;
                //--- DROPBITS(state.extra) ---//
                hold >>>= state.extra;
                bits -= state.extra;
                //---//
                state.back += state.extra;
              }
              //#ifdef INFLATE_STRICT
              if (state.offset > state.dmax) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD;
                break;
              }
              //#endif
              //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
              state.mode = MATCH;
            /* falls through */
            case MATCH:
              if (left === 0) {
                break inf_leave;
              }
              copy = _out - left;
              if (state.offset > copy) {
                /* copy from window */
                copy = state.offset - copy;
                if (copy > state.whave) {
                  if (state.sane) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD;
                    break;
                  }
                  // (!) This block is disabled in zlib defaults,
                  // don't enable it for binary compatibility
                  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                  //          Trace((stderr, "inflate.c too far\n"));
                  //          copy -= state.whave;
                  //          if (copy > state.length) { copy = state.length; }
                  //          if (copy > left) { copy = left; }
                  //          left -= copy;
                  //          state.length -= copy;
                  //          do {
                  //            output[put++] = 0;
                  //          } while (--copy);
                  //          if (state.length === 0) { state.mode = LEN; }
                  //          break;
                  //#endif
                }
                if (copy > state.wnext) {
                  copy -= state.wnext;
                  from = state.wsize - copy;
                } else {
                  from = state.wnext - copy;
                }
                if (copy > state.length) {
                  copy = state.length;
                }
                from_source = state.window;
              } else {
                /* copy from output */
                from_source = output;
                from = put - state.offset;
                copy = state.length;
              }
              if (copy > left) {
                copy = left;
              }
              left -= copy;
              state.length -= copy;
              do {
                output[put++] = from_source[from++];
              } while (--copy);
              if (state.length === 0) {
                state.mode = LEN;
              }
              break;
            case LIT:
              if (left === 0) {
                break inf_leave;
              }
              output[put++] = state.length;
              left--;
              state.mode = LEN;
              break;
            case CHECK:
              if (state.wrap) {
                //=== NEEDBITS(32);
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  // Use '|' instead of '+' to make sure that result is signed
                  hold |= input[next++] << bits;
                  bits += 8;
                }
                //===//
                _out -= left;
                strm.total_out += _out;
                state.total += _out;
                if (_out) {
                  strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
                  state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
                }
                _out = left;
                // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
                if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                  strm.msg = 'incorrect data check';
                  state.mode = BAD;
                  break;
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
                //Tracev((stderr, "inflate:   check matches trailer\n"));
              }
              state.mode = LENGTH;
            /* falls through */
            case LENGTH:
              if (state.wrap && state.flags) {
                //=== NEEDBITS(32);
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                if (hold !== (state.total & 0xffffffff)) {
                  strm.msg = 'incorrect length check';
                  state.mode = BAD;
                  break;
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
                //Tracev((stderr, "inflate:   length matches trailer\n"));
              }
              state.mode = DONE;
            /* falls through */
            case DONE:
              ret = Z_STREAM_END;
              break inf_leave;
            case BAD:
              ret = Z_DATA_ERROR;
              break inf_leave;
            case MEM:
              return Z_MEM_ERROR;
            case SYNC:
            /* falls through */
            default:
              return Z_STREAM_ERROR;
          }
        }

        // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

        /*
           Return from inflate(), updating the total counts and the check value.
           If there was no progress during the inflate() call, return a buffer
           error.  Call updatewindow() to create and/or update the window state.
           Note: a memory error from inflate() is non-recoverable.
         */

        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---

        if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
          if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
            state.mode = MEM;
            return Z_MEM_ERROR;
          }
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap && _out) {
          strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
          state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
        if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
          ret = Z_BUF_ERROR;
        }
        return ret;
      }
      function inflateEnd(strm) {
        if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
          return Z_STREAM_ERROR;
        }
        var state = strm.state;
        if (state.window) {
          state.window = null;
        }
        strm.state = null;
        return Z_OK;
      }
      function inflateGetHeader(strm, head) {
        var state;

        /* check state */
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if ((state.wrap & 2) === 0) {
          return Z_STREAM_ERROR;
        }

        /* save header structure */
        state.head = head;
        head.done = false;
        return Z_OK;
      }
      function inflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
        var state;
        var dictid;
        var ret;

        /* check state */
        if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.wrap !== 0 && state.mode !== DICT) {
          return Z_STREAM_ERROR;
        }

        /* check for correct dictionary identifier */
        if (state.mode === DICT) {
          dictid = 1; /* adler32(0, null, 0)*/
          /* dictid = adler32(dictid, dictionary, dictLength); */
          dictid = adler32(dictid, dictionary, dictLength, 0);
          if (dictid !== state.check) {
            return Z_DATA_ERROR;
          }
        }
        /* copy dictionary to window using updatewindow(), which will amend the
         existing dictionary if appropriate */
        ret = updatewindow(strm, dictionary, dictLength, dictLength);
        if (ret) {
          state.mode = MEM;
          return Z_MEM_ERROR;
        }
        state.havedict = 1;
        // Tracev((stderr, "inflate:   dictionary set\n"));
        return Z_OK;
      }
      exports.inflateReset = inflateReset;
      exports.inflateReset2 = inflateReset2;
      exports.inflateResetKeep = inflateResetKeep;
      exports.inflateInit = inflateInit;
      exports.inflateInit2 = inflateInit2;
      exports.inflate = inflate;
      exports.inflateEnd = inflateEnd;
      exports.inflateGetHeader = inflateGetHeader;
      exports.inflateSetDictionary = inflateSetDictionary;
      exports.inflateInfo = 'pako inflate (from Nodeca project)';

      /* Not implemented
      exports.inflateCopy = inflateCopy;
      exports.inflateGetDictionary = inflateGetDictionary;
      exports.inflateMark = inflateMark;
      exports.inflatePrime = inflatePrime;
      exports.inflateSync = inflateSync;
      exports.inflateSyncPoint = inflateSyncPoint;
      exports.inflateUndermine = inflateUndermine;
      */
    }, {
      "../utils/common": 1,
      "./adler32": 3,
      "./crc32": 5,
      "./inffast": 7,
      "./inftrees": 9
    }],
    9: [function (require, module, exports) {
      'use strict';

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      var utils = require('../utils/common');
      var MAXBITS = 15;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      var lbase = [/* Length codes 257..285 base */
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
      var lext = [/* Length codes 257..285 extra */
      16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
      var dbase = [/* Distance codes 0..29 base */
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
      var dext = [/* Distance codes 0..29 extra */
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
        var bits = opts.bits;
        //here = opts.here; /* table entry for duplication */

        var len = 0; /* a code's length in bits */
        var sym = 0; /* index of code symbols */
        var min = 0,
          max = 0; /* minimum and maximum code lengths */
        var root = 0; /* number of index bits for root table */
        var curr = 0; /* number of index bits for current table */
        var drop = 0; /* code bits to drop for sub-table */
        var left = 0; /* number of prefix codes available */
        var used = 0; /* code entries in table used */
        var huff = 0; /* Huffman code */
        var incr; /* for incrementing code, index */
        var fill; /* index for replicating entries */
        var low; /* low bits for current root entry */
        var mask; /* mask for low root bits */
        var next; /* next available space in table */
        var base = null; /* base value table to use */
        var base_index = 0;
        //  var shoextra;    /* extra bits table to use */
        var end; /* use base and extra for symbol > end */
        var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
        var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
        var extra = null;
        var extra_index = 0;
        var here_bits, here_op, here_val;

        /*
         Process a set of code lengths to create a canonical Huffman code.  The
         code lengths are lens[0..codes-1].  Each length corresponds to the
         symbols 0..codes-1.  The Huffman code is generated by first sorting the
         symbols by length from short to long, and retaining the symbol order
         for codes with equal lengths.  Then the code starts with all zero bits
         for the first code of the shortest length, and the codes are integer
         increments for the same length, and zeros are appended as the length
         increases.  For the deflate format, these bits are stored backwards
         from their more natural integer increment ordering, and so when the
         decoding tables are built in the large loop below, the integer codes
         are incremented backwards.
          This routine assumes, but does not check, that all of the entries in
         lens[] are in the range 0..MAXBITS.  The caller must assure this.
         1..MAXBITS is interpreted as that code length.  zero means that that
         symbol does not occur in this code.
          The codes are sorted by computing a count of codes for each length,
         creating from that a table of starting indices for each length in the
         sorted table, and then entering the symbols in order in the sorted
         table.  The sorted table is work[], with that space being provided by
         the caller.
          The length counts are used for other purposes as well, i.e. finding
         the minimum and maximum length codes, determining if there are any
         codes at all, checking for a valid set of lengths, and looking ahead
         at length counts to determine sub-table sizes when building the
         decoding tables.
         */

        /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
        for (len = 0; len <= MAXBITS; len++) {
          count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
          count[lens[lens_index + sym]]++;
        }

        /* bound code lengths, force root to be within code lengths */
        root = bits;
        for (max = MAXBITS; max >= 1; max--) {
          if (count[max] !== 0) {
            break;
          }
        }
        if (root > max) {
          root = max;
        }
        if (max === 0) {
          /* no symbols to code at all */
          //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
          //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
          //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
          table[table_index++] = 1 << 24 | 64 << 16 | 0;

          //table.op[opts.table_index] = 64;
          //table.bits[opts.table_index] = 1;
          //table.val[opts.table_index++] = 0;
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          opts.bits = 1;
          return 0; /* no symbols, but wait for decoding to report error */
        }
        for (min = 1; min < max; min++) {
          if (count[min] !== 0) {
            break;
          }
        }
        if (root < min) {
          root = min;
        }

        /* check for an over-subscribed or incomplete set of lengths */
        left = 1;
        for (len = 1; len <= MAXBITS; len++) {
          left <<= 1;
          left -= count[len];
          if (left < 0) {
            return -1;
          } /* over-subscribed */
        }
        if (left > 0 && (type === CODES || max !== 1)) {
          return -1; /* incomplete set */
        }

        /* generate offsets into symbol table for each length for sorting */
        offs[1] = 0;
        for (len = 1; len < MAXBITS; len++) {
          offs[len + 1] = offs[len] + count[len];
        }

        /* sort symbols by length, by symbol order within each length */
        for (sym = 0; sym < codes; sym++) {
          if (lens[lens_index + sym] !== 0) {
            work[offs[lens[lens_index + sym]]++] = sym;
          }
        }

        /*
         Create and fill in decoding tables.  In this loop, the table being
         filled is at next and has curr index bits.  The code being used is huff
         with length len.  That code is converted to an index by dropping drop
         bits off of the bottom.  For codes where len is less than drop + curr,
         those top drop + curr - len bits are incremented through all values to
         fill the table with replicated entries.
          root is the number of index bits for the root table.  When len exceeds
         root, sub-tables are created pointed to by the root entry with an index
         of the low root bits of huff.  This is saved in low to check for when a
         new sub-table should be started.  drop is zero when the root table is
         being filled, and drop is root when sub-tables are being filled.
          When a new sub-table is needed, it is necessary to look ahead in the
         code lengths to determine what size sub-table is needed.  The length
         counts are used for this, and so count[] is decremented as codes are
         entered in the tables.
          used keeps track of how many table entries have been allocated from the
         provided *table space.  It is checked for LENS and DIST tables against
         the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
         the initial root table size constants.  See the comments in inftrees.h
         for more information.
          sym increments through all symbols, and the loop terminates when
         all codes of length max, i.e. all codes, have been processed.  This
         routine permits incomplete codes, so another loop after this one fills
         in the rest of the decoding tables with invalid code markers.
         */

        /* set up for code type */
        // poor man optimization - use if-else instead of switch,
        // to avoid deopts in old v8
        if (type === CODES) {
          base = extra = work; /* dummy value--not used */
          end = 19;
        } else if (type === LENS) {
          base = lbase;
          base_index -= 257;
          extra = lext;
          extra_index -= 257;
          end = 256;
        } else {
          /* DISTS */
          base = dbase;
          extra = dext;
          end = -1;
        }

        /* initialize opts for loop */
        huff = 0; /* starting code */
        sym = 0; /* starting code symbol */
        len = min; /* starting code length */
        next = table_index; /* current table to fill in */
        curr = root; /* current table index bits */
        drop = 0; /* current bits to drop from code for index */
        low = -1; /* trigger new sub-table when len > root */
        used = 1 << root; /* use root table entries */
        mask = used - 1; /* mask for comparing low */

        /* check available table space */
        if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
          return 1;
        }

        /* process all codes and make table entries */
        for (;;) {
          /* create table entry */
          here_bits = len - drop;
          if (work[sym] < end) {
            here_op = 0;
            here_val = work[sym];
          } else if (work[sym] > end) {
            here_op = extra[extra_index + work[sym]];
            here_val = base[base_index + work[sym]];
          } else {
            here_op = 32 + 64; /* end of block */
            here_val = 0;
          }

          /* replicate for those indices with low len bits equal to huff */
          incr = 1 << len - drop;
          fill = 1 << curr;
          min = fill; /* save offset to next table */
          do {
            fill -= incr;
            table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
          } while (fill !== 0);

          /* backwards increment the len-bit code huff */
          incr = 1 << len - 1;
          while (huff & incr) {
            incr >>= 1;
          }
          if (incr !== 0) {
            huff &= incr - 1;
            huff += incr;
          } else {
            huff = 0;
          }

          /* go to next symbol, update count, len */
          sym++;
          if (--count[len] === 0) {
            if (len === max) {
              break;
            }
            len = lens[lens_index + work[sym]];
          }

          /* create new sub-table if needed */
          if (len > root && (huff & mask) !== low) {
            /* if first time, transition to sub-tables */
            if (drop === 0) {
              drop = root;
            }

            /* increment past last table */
            next += min; /* here min is 1 << curr */

            /* determine length of next table */
            curr = len - drop;
            left = 1 << curr;
            while (curr + drop < max) {
              left -= count[curr + drop];
              if (left <= 0) {
                break;
              }
              curr++;
              left <<= 1;
            }

            /* check for enough space */
            used += 1 << curr;
            if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
              return 1;
            }

            /* point entry in root table to sub-table */
            low = huff & mask;
            /*table.op[low] = curr;
            table.bits[low] = root;
            table.val[low] = next - opts.table_index;*/
            table[low] = root << 24 | curr << 16 | next - table_index | 0;
          }
        }

        /* fill in remaining table entry if code is incomplete (guaranteed to have
         at most one remaining entry, since if the code is incomplete, the
         maximum code length that was allowed to get this far is one bit) */
        if (huff !== 0) {
          //table.op[next + huff] = 64;            /* invalid code marker */
          //table.bits[next + huff] = len - drop;
          //table.val[next + huff] = 0;
          table[next + huff] = len - drop << 24 | 64 << 16 | 0;
        }

        /* set return parameters */
        //opts.table_index += used;
        opts.bits = root;
        return 0;
      };
    }, {
      "../utils/common": 1
    }],
    10: [function (require, module, exports) {
      'use strict';

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      module.exports = {
        2: 'need dictionary',
        /* Z_NEED_DICT       2  */
        1: 'stream end',
        /* Z_STREAM_END      1  */
        0: '',
        /* Z_OK              0  */
        '-1': 'file error',
        /* Z_ERRNO         (-1) */
        '-2': 'stream error',
        /* Z_STREAM_ERROR  (-2) */
        '-3': 'data error',
        /* Z_DATA_ERROR    (-3) */
        '-4': 'insufficient memory',
        /* Z_MEM_ERROR     (-4) */
        '-5': 'buffer error',
        /* Z_BUF_ERROR     (-5) */
        '-6': 'incompatible version' /* Z_VERSION_ERROR (-6) */
      };
    }, {}],
    11: [function (require, module, exports) {
      'use strict';

      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      function ZStream() {
        /* next input byte */
        this.input = null; // JS specific, because we have no pointers
        this.next_in = 0;
        /* number of bytes available at input */
        this.avail_in = 0;
        /* total number of input bytes read so far */
        this.total_in = 0;
        /* next output byte should be put there */
        this.output = null; // JS specific, because we have no pointers
        this.next_out = 0;
        /* remaining free space at output */
        this.avail_out = 0;
        /* total number of bytes output so far */
        this.total_out = 0;
        /* last error message, NULL if no error */
        this.msg = '' /*Z_NULL*/;
        /* not visible by applications */
        this.state = null;
        /* best guess about the data type: binary or text */
        this.data_type = 2 /*Z_UNKNOWN*/;
        /* adler32 value of the uncompressed data */
        this.adler = 0;
      }
      module.exports = ZStream;
    }, {}],
    "/lib/inflate.js": [function (require, module, exports) {
      'use strict';

      var zlib_inflate = require('./zlib/inflate');
      var utils = require('./utils/common');
      var strings = require('./utils/strings');
      var c = require('./zlib/constants');
      var msg = require('./zlib/messages');
      var ZStream = require('./zlib/zstream');
      var GZheader = require('./zlib/gzheader');
      var toString = Object.prototype.toString;

      /**
       * class Inflate
       *
       * Generic JS-style wrapper for zlib calls. If you don't need
       * streaming behaviour - use more simple functions: [[inflate]]
       * and [[inflateRaw]].
       **/

      /* internal
       * inflate.chunks -> Array
       *
       * Chunks of output data, if [[Inflate#onData]] not overridden.
       **/

      /**
       * Inflate.result -> Uint8Array|Array|String
       *
       * Uncompressed result, generated by default [[Inflate#onData]]
       * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
       * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
       * push a chunk with explicit flush (call [[Inflate#push]] with
       * `Z_SYNC_FLUSH` param).
       **/

      /**
       * Inflate.err -> Number
       *
       * Error code after inflate finished. 0 (Z_OK) on success.
       * Should be checked if broken data possible.
       **/

      /**
       * Inflate.msg -> String
       *
       * Error message, if [[Inflate.err]] != 0
       **/

      /**
       * new Inflate(options)
       * - options (Object): zlib inflate options.
       *
       * Creates new inflator instance with specified params. Throws exception
       * on bad params. Supported options:
       *
       * - `windowBits`
       * - `dictionary`
       *
       * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
       * for more information on these.
       *
       * Additional options, for internal needs:
       *
       * - `chunkSize` - size of generated data chunks (16K by default)
       * - `raw` (Boolean) - do raw inflate
       * - `to` (String) - if equal to 'string', then result will be converted
       *   from utf8 to utf16 (javascript) string. When string output requested,
       *   chunk length can differ from `chunkSize`, depending on content.
       *
       * By default, when no options set, autodetect deflate/gzip data format via
       * wrapper header.
       *
       * ##### Example:
       *
       * ```javascript
       * var pako = require('pako')
       *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
       *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
       *
       * var inflate = new pako.Inflate({ level: 3});
       *
       * inflate.push(chunk1, false);
       * inflate.push(chunk2, true);  // true -> last chunk
       *
       * if (inflate.err) { throw new Error(inflate.err); }
       *
       * console.log(inflate.result);
       * ```
       **/
      function Inflate(options) {
        if (!(this instanceof Inflate)) return new Inflate(options);
        this.options = utils.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ''
        }, options || {});
        var opt = this.options;

        // Force window size for `raw` data, if not set directly,
        // because we have no header for autodetect.
        if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
          opt.windowBits = -opt.windowBits;
          if (opt.windowBits === 0) {
            opt.windowBits = -15;
          }
        }

        // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
        if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
          opt.windowBits += 32;
        }

        // Gzip header has no info about windows size, we can do autodetect only
        // for deflate. So, if window size not set, force it to max when gzip possible
        if (opt.windowBits > 15 && opt.windowBits < 48) {
          // bit 3 (16) -> gzipped data
          // bit 4 (32) -> autodetect gzip/deflate
          if ((opt.windowBits & 15) === 0) {
            opt.windowBits |= 15;
          }
        }
        this.err = 0; // error code, if happens (0 = Z_OK)
        this.msg = ''; // error message
        this.ended = false; // used to avoid multiple onEnd() calls
        this.chunks = []; // chunks of compressed data

        this.strm = new ZStream();
        this.strm.avail_out = 0;
        var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
        this.header = new GZheader();
        zlib_inflate.inflateGetHeader(this.strm, this.header);

        // Setup dictionary
        if (opt.dictionary) {
          // Convert data if needed
          if (typeof opt.dictionary === 'string') {
            opt.dictionary = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
            opt.dictionary = new Uint8Array(opt.dictionary);
          }
          if (opt.raw) {
            //In raw mode we need to set the dictionary early
            status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
            if (status !== c.Z_OK) {
              throw new Error(msg[status]);
            }
          }
        }
      }

      /**
       * Inflate#push(data[, mode]) -> Boolean
       * - data (Uint8Array|Array|ArrayBuffer|String): input data
       * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
       *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
       *
       * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
       * new output chunks. Returns `true` on success. The last data block must have
       * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
       * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
       * can use mode Z_SYNC_FLUSH, keeping the decompression context.
       *
       * On fail call [[Inflate#onEnd]] with error code and return false.
       *
       * We strongly recommend to use `Uint8Array` on input for best speed (output
       * format is detected automatically). Also, don't skip last param and always
       * use the same type in your code (boolean or number). That will improve JS speed.
       *
       * For regular `Array`-s make sure all elements are [0..255].
       *
       * ##### Example
       *
       * ```javascript
       * push(chunk, false); // push one of data chunks
       * ...
       * push(chunk, true);  // push last chunk
       * ```
       **/
      Inflate.prototype.push = function (data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var dictionary = this.options.dictionary;
        var status, _mode;
        var next_out_utf8, tail, utf8str;

        // Flag to properly process Z_BUF_ERROR on testing inflate call
        // when we check that all output data was flushed.
        var allowBufError = false;
        if (this.ended) {
          return false;
        }
        _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;

        // Convert data if needed
        if (typeof data === 'string') {
          // Only binary strings can be decompressed on practice
          strm.input = strings.binstring2buf(data);
        } else if (toString.call(data) === '[object ArrayBuffer]') {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        do {
          if (strm.avail_out === 0) {
            strm.output = new utils.Buf8(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH); /* no bad return value */

          if (status === c.Z_NEED_DICT && dictionary) {
            status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
          }
          if (status === c.Z_BUF_ERROR && allowBufError === true) {
            status = c.Z_OK;
            allowBufError = false;
          }
          if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
            this.onEnd(status);
            this.ended = true;
            return false;
          }
          if (strm.next_out) {
            if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
              if (this.options.to === 'string') {
                next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                tail = strm.next_out - next_out_utf8;
                utf8str = strings.buf2string(strm.output, next_out_utf8);

                // move tail
                strm.next_out = tail;
                strm.avail_out = chunkSize - tail;
                if (tail) {
                  utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
                }
                this.onData(utf8str);
              } else {
                this.onData(utils.shrinkBuf(strm.output, strm.next_out));
              }
            }
          }

          // When no more input data, we should check that internal inflate buffers
          // are flushed. The only way to do it when avail_out = 0 - run one more
          // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
          // Here we set flag to process this error properly.
          //
          // NOTE. Deflate does not return error in this case and does not needs such
          // logic.
          if (strm.avail_in === 0 && strm.avail_out === 0) {
            allowBufError = true;
          }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
        if (status === c.Z_STREAM_END) {
          _mode = c.Z_FINISH;
        }

        // Finalize on the last chunk.
        if (_mode === c.Z_FINISH) {
          status = zlib_inflate.inflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === c.Z_OK;
        }

        // callback interim results if Z_SYNC_FLUSH.
        if (_mode === c.Z_SYNC_FLUSH) {
          this.onEnd(c.Z_OK);
          strm.avail_out = 0;
          return true;
        }
        return true;
      };

      /**
       * Inflate#onData(chunk) -> Void
       * - chunk (Uint8Array|Array|String): output data. Type of array depends
       *   on js engine support. When string output requested, each chunk
       *   will be string.
       *
       * By default, stores data blocks in `chunks[]` property and glue
       * those in `onEnd`. Override this handler, if you need another behaviour.
       **/
      Inflate.prototype.onData = function (chunk) {
        this.chunks.push(chunk);
      };

      /**
       * Inflate#onEnd(status) -> Void
       * - status (Number): inflate status. 0 (Z_OK) on success,
       *   other if not.
       *
       * Called either after you tell inflate that the input stream is
       * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
       * or if an error happened. By default - join collected chunks,
       * free memory and fill `results` / `err` properties.
       **/
      Inflate.prototype.onEnd = function (status) {
        // On success - join
        if (status === c.Z_OK) {
          if (this.options.to === 'string') {
            // Glue & convert here, until we teach pako to send
            // utf8 aligned strings to onData
            this.result = this.chunks.join('');
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };

      /**
       * inflate(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to decompress.
       * - options (Object): zlib inflate options.
       *
       * Decompress `data` with inflate/ungzip and `options`. Autodetect
       * format via wrapper header by default. That's why we don't provide
       * separate `ungzip` method.
       *
       * Supported options are:
       *
       * - windowBits
       *
       * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
       * for more information.
       *
       * Sugar (options):
       *
       * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
       *   negative windowBits implicitly.
       * - `to` (String) - if equal to 'string', then result will be converted
       *   from utf8 to utf16 (javascript) string. When string output requested,
       *   chunk length can differ from `chunkSize`, depending on content.
       *
       *
       * ##### Example:
       *
       * ```javascript
       * var pako = require('pako')
       *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
       *   , output;
       *
       * try {
       *   output = pako.inflate(input);
       * } catch (err)
       *   console.log(err);
       * }
       * ```
       **/
      function inflate(input, options) {
        var inflator = new Inflate(options);
        inflator.push(input, true);

        // That will never happens, if you don't cheat with options :)
        if (inflator.err) {
          throw inflator.msg || msg[inflator.err];
        }
        return inflator.result;
      }

      /**
       * inflateRaw(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to decompress.
       * - options (Object): zlib inflate options.
       *
       * The same as [[inflate]], but creates raw data, without wrapper
       * (header and adler32 crc).
       **/
      function inflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return inflate(input, options);
      }

      /**
       * ungzip(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to decompress.
       * - options (Object): zlib inflate options.
       *
       * Just shortcut to [[inflate]], because it autodetects format
       * by header.content. Done for convenience.
       **/

      exports.Inflate = Inflate;
      exports.inflate = inflate;
      exports.inflateRaw = inflateRaw;
      exports.ungzip = inflate;
    }, {
      "./utils/common": 1,
      "./utils/strings": 2,
      "./zlib/constants": 4,
      "./zlib/gzheader": 6,
      "./zlib/inflate": 8,
      "./zlib/messages": 10,
      "./zlib/zstream": 11
    }]
  }, {}, [])("/lib/inflate.js");
});

/***/ },

/***/ "./src/admin/lib-font/lib-font.browser.js"
/*!************************************************!*\
  !*** ./src/admin/lib-font/lib-font.browser.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Font: () => (/* binding */ Font)
/* harmony export */ });
let fetchFunction = globalThis.fetch;
if (!fetchFunction) {
  let backlog = [];
  fetchFunction = globalThis.fetch = (...args) => new Promise((resolve, reject) => {
    backlog.push({
      args: args,
      resolve: resolve,
      reject: reject
    });
  });
  __webpack_require__.e(/*! import() */ "_80a7").then(__webpack_require__.t.bind(__webpack_require__, /*! fs */ "?80a7", 23)).then(fs => {
    fetchFunction = globalThis.fetch = async function (path) {
      return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
          if (err) return reject(err);
          resolve({
            ok: true,
            arrayBuffer: () => data.buffer
          });
        });
      });
    };
    while (backlog.length) {
      let instruction = backlog.shift();
      fetchFunction(...instruction.args).then(data => instruction.resolve(data)).catch(err => instruction.reject(err));
    }
  }).catch(err => {
    console.error(err);
    throw new Error(`lib-font cannot run unless either the Fetch API or Node's filesystem module is available.`);
  });
}
class Event {
  constructor(type, detail = {}, msg) {
    this.type = type;
    this.detail = detail;
    this.msg = msg;
    Object.defineProperty(this, `__mayPropagate`, {
      enumerable: false,
      writable: true
    });
    this.__mayPropagate = true;
  }
  preventDefault() {}
  stopPropagation() {
    this.__mayPropagate = false;
  }
  valueOf() {
    return this;
  }
  toString() {
    return this.msg ? `[${this.type} event]: ${this.msg}` : `[${this.type} event]`;
  }
}
class EventManager {
  constructor() {
    this.listeners = {};
  }
  addEventListener(type, listener, useCapture) {
    let bin = this.listeners[type] || [];
    if (useCapture) bin.unshift(listener);else bin.push(listener);
    this.listeners[type] = bin;
  }
  removeEventListener(type, listener) {
    let bin = this.listeners[type] || [];
    let pos = bin.findIndex(e => e === listener);
    if (pos > -1) {
      bin.splice(pos, 1);
      this.listeners[type] = bin;
    }
  }
  dispatch(event) {
    let bin = this.listeners[event.type];
    if (bin) {
      for (let l = 0, e = bin.length; l < e; l++) {
        if (!event.__mayPropagate) break;
        bin[l](event);
      }
    }
  }
}
const startDate = new Date(`1904-01-01T00:00:00+0000`).getTime();
function asText(data) {
  return Array.from(data).map(v => String.fromCharCode(v)).join(``);
}
class Parser {
  constructor(dict, dataview, name) {
    this.name = (name || dict.tag || ``).trim();
    this.length = dict.length;
    this.start = dict.offset;
    this.offset = 0;
    this.data = dataview;
    [`getInt8`, `getUint8`, `getInt16`, `getUint16`, `getInt32`, `getUint32`, `getBigInt64`, `getBigUint64`].forEach(name => {
      let fn = name.replace(/get(Big)?/, "").toLowerCase();
      let increment = parseInt(name.replace(/[^\d]/g, "")) / 8;
      Object.defineProperty(this, fn, {
        get: () => this.getValue(name, increment)
      });
    });
  }
  get currentPosition() {
    return this.start + this.offset;
  }
  set currentPosition(position) {
    this.start = position;
    this.offset = 0;
  }
  skip(n = 0, bits = 8) {
    this.offset += n * bits / 8;
  }
  getValue(type, increment) {
    let pos = this.start + this.offset;
    this.offset += increment;
    try {
      return this.data[type](pos);
    } catch (e) {
      console.error(`parser`, type, increment, this);
      console.error(`parser`, this.start, this.offset);
      throw e;
    }
  }
  flags(n) {
    if (n === 8 || n === 16 || n === 32 || n === 64) {
      return this[`uint${n}`].toString(2).padStart(n, 0).split(``).map(v => v === "1");
    }
    console.error(`Error parsing flags: flag types can only be 1, 2, 4, or 8 bytes long`);
    console.trace();
  }
  get tag() {
    const t = this.uint32;
    return asText([t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, t & 255]);
  }
  get fixed() {
    let major = this.int16;
    let minor = Math.round(1e3 * this.uint16 / 65356);
    return major + minor / 1e3;
  }
  get legacyFixed() {
    let major = this.uint16;
    let minor = this.uint16.toString(16).padStart(4, 0);
    return parseFloat(`${major}.${minor}`);
  }
  get uint24() {
    return (this.uint8 << 16) + (this.uint8 << 8) + this.uint8;
  }
  get uint128() {
    let value = 0;
    for (let i = 0; i < 5; i++) {
      let byte = this.uint8;
      value = value * 128 + (byte & 127);
      if (byte < 128) break;
    }
    return value;
  }
  get longdatetime() {
    return new Date(startDate + 1e3 * parseInt(this.int64.toString()));
  }
  get fword() {
    return this.int16;
  }
  get ufword() {
    return this.uint16;
  }
  get Offset16() {
    return this.uint16;
  }
  get Offset32() {
    return this.uint32;
  }
  get F2DOT14() {
    const bits = p.uint16;
    const integer = [0, 1, -2, -1][bits >> 14];
    const fraction = bits & 16383;
    return integer + fraction / 16384;
  }
  verifyLength() {
    if (this.offset != this.length) {
      console.error(`unexpected parsed table size (${this.offset}) for "${this.name}" (expected ${this.length})`);
    }
  }
  readBytes(n = 0, position = 0, bits = 8, signed = false) {
    n = n || this.length;
    if (n === 0) return [];
    if (position) this.currentPosition = position;
    const fn = `${signed ? `` : `u`}int${bits}`,
      slice = [];
    while (n--) slice.push(this[fn]);
    return slice;
  }
}
class ParsedData {
  constructor(parser) {
    const pGetter = {
      enumerable: false,
      get: () => parser
    };
    Object.defineProperty(this, `parser`, pGetter);
    const start = parser.currentPosition;
    const startGetter = {
      enumerable: false,
      get: () => start
    };
    Object.defineProperty(this, `start`, startGetter);
  }
  load(struct) {
    Object.keys(struct).forEach(p => {
      let props = Object.getOwnPropertyDescriptor(struct, p);
      if (props.get) {
        this[p] = props.get.bind(this);
      } else if (props.value) {
        this[p] = props.value;
      }
    });
    if (this.parser.length) {
      this.parser.verifyLength();
    }
  }
}
class SimpleTable extends ParsedData {
  constructor(dict, dataview, name) {
    const {
      parser: parser,
      start: start
    } = super(new Parser(dict, dataview, name));
    const pGetter = {
      enumerable: false,
      get: () => parser
    };
    Object.defineProperty(this, `p`, pGetter);
    const startGetter = {
      enumerable: false,
      get: () => start
    };
    Object.defineProperty(this, `tableStart`, startGetter);
  }
}
function lazy$1(object, property, getter) {
  let val;
  Object.defineProperty(object, property, {
    get: () => {
      if (val) return val;
      val = getter();
      return val;
    }
  });
}
class SFNT extends SimpleTable {
  constructor(font, dataview, createTable) {
    const {
      p: p
    } = super({
      offset: 0,
      length: 12
    }, dataview, `sfnt`);
    this.version = p.uint32;
    this.numTables = p.uint16;
    this.searchRange = p.uint16;
    this.entrySelector = p.uint16;
    this.rangeShift = p.uint16;
    p.verifyLength();
    this.directory = [...new Array(this.numTables)].map(_ => new TableRecord(p));
    this.tables = {};
    this.directory.forEach(entry => {
      const getter = () => createTable(this.tables, {
        tag: entry.tag,
        offset: entry.offset,
        length: entry.length
      }, dataview);
      lazy$1(this.tables, entry.tag.trim(), getter);
    });
  }
}
class TableRecord {
  constructor(p) {
    this.tag = p.tag;
    this.checksum = p.uint32;
    this.offset = p.uint32;
    this.length = p.uint32;
  }
}
const gzipDecode = globalThis.pako ? globalThis.pako.inflate : undefined;
let nativeGzipDecode = undefined;
if (!gzipDecode) {
  __webpack_require__.e(/*! import() */ "_946e").then(__webpack_require__.t.bind(__webpack_require__, /*! zlib */ "?946e", 23)).then(zlib => {
    nativeGzipDecode = buffer => zlib.unzipSync(buffer);
  });
}
class WOFF$1 extends SimpleTable {
  constructor(font, dataview, createTable) {
    const {
      p: p
    } = super({
      offset: 0,
      length: 44
    }, dataview, `woff`);
    this.signature = p.tag;
    this.flavor = p.uint32;
    this.length = p.uint32;
    this.numTables = p.uint16;
    p.uint16;
    this.totalSfntSize = p.uint32;
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.metaOffset = p.uint32;
    this.metaLength = p.uint32;
    this.metaOrigLength = p.uint32;
    this.privOffset = p.uint32;
    this.privLength = p.uint32;
    p.verifyLength();
    this.directory = [...new Array(this.numTables)].map(_ => new WoffTableDirectoryEntry(p));
    buildWoffLazyLookups(this, dataview, createTable);
  }
}
class WoffTableDirectoryEntry {
  constructor(p) {
    this.tag = p.tag;
    this.offset = p.uint32;
    this.compLength = p.uint32;
    this.origLength = p.uint32;
    this.origChecksum = p.uint32;
  }
}
function buildWoffLazyLookups(woff, dataview, createTable) {
  woff.tables = {};
  woff.directory.forEach(entry => {
    lazy$1(woff.tables, entry.tag.trim(), () => {
      let offset = 0;
      let view = dataview;
      if (entry.compLength !== entry.origLength) {
        const data = dataview.buffer.slice(entry.offset, entry.offset + entry.compLength);
        let unpacked;
        if (gzipDecode) {
          unpacked = gzipDecode(new Uint8Array(data));
        } else if (nativeGzipDecode) {
          unpacked = nativeGzipDecode(new Uint8Array(data));
        } else {
          const msg = `no brotli decoder available to decode WOFF2 font`;
          if (font.onerror) font.onerror(msg);
          throw new Error(msg);
        }
        view = new DataView(unpacked.buffer);
      } else {
        offset = entry.offset;
      }
      return createTable(woff.tables, {
        tag: entry.tag,
        offset: offset,
        length: entry.origLength
      }, view);
    });
  });
}
const brotliDecode = globalThis.unbrotli;
let nativeBrotliDecode = undefined;
if (!brotliDecode) {
  __webpack_require__.e(/*! import() */ "_946e").then(__webpack_require__.t.bind(__webpack_require__, /*! zlib */ "?946e", 23)).then(zlib => {
    nativeBrotliDecode = buffer => zlib.brotliDecompressSync(buffer);
  });
}
class WOFF2$1 extends SimpleTable {
  constructor(font, dataview, createTable) {
    const {
      p: p
    } = super({
      offset: 0,
      length: 48
    }, dataview, `woff2`);
    this.signature = p.tag;
    this.flavor = p.uint32;
    this.length = p.uint32;
    this.numTables = p.uint16;
    p.uint16;
    this.totalSfntSize = p.uint32;
    this.totalCompressedSize = p.uint32;
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.metaOffset = p.uint32;
    this.metaLength = p.uint32;
    this.metaOrigLength = p.uint32;
    this.privOffset = p.uint32;
    this.privLength = p.uint32;
    p.verifyLength();
    this.directory = [...new Array(this.numTables)].map(_ => new Woff2TableDirectoryEntry(p));
    let dictOffset = p.currentPosition;
    this.directory[0].offset = 0;
    this.directory.forEach((e, i) => {
      let next = this.directory[i + 1];
      if (next) {
        next.offset = e.offset + (e.transformLength !== undefined ? e.transformLength : e.origLength);
      }
    });
    let decoded;
    let buffer = dataview.buffer.slice(dictOffset);
    if (brotliDecode) {
      decoded = brotliDecode(new Uint8Array(buffer));
    } else if (nativeBrotliDecode) {
      decoded = new Uint8Array(nativeBrotliDecode(buffer));
    } else {
      const msg = `no brotli decoder available to decode WOFF2 font`;
      if (font.onerror) font.onerror(msg);
      throw new Error(msg);
    }
    buildWoff2LazyLookups(this, decoded, createTable);
  }
}
class Woff2TableDirectoryEntry {
  constructor(p) {
    this.flags = p.uint8;
    const tagNumber = this.tagNumber = this.flags & 63;
    if (tagNumber === 63) {
      this.tag = p.tag;
    } else {
      this.tag = getWOFF2Tag(tagNumber);
    }
    const transformVersion = this.transformVersion = (this.flags & 192) >> 6;
    let hasTransforms = transformVersion !== 0;
    if (this.tag === `glyf` || this.tag === `loca`) {
      hasTransforms = this.transformVersion !== 3;
    }
    this.origLength = p.uint128;
    if (hasTransforms) {
      this.transformLength = p.uint128;
    }
  }
}
function buildWoff2LazyLookups(woff2, decoded, createTable) {
  woff2.tables = {};
  woff2.directory.forEach(entry => {
    lazy$1(woff2.tables, entry.tag.trim(), () => {
      const start = entry.offset;
      const end = start + (entry.transformLength ? entry.transformLength : entry.origLength);
      const data = new DataView(decoded.slice(start, end).buffer);
      try {
        return createTable(woff2.tables, {
          tag: entry.tag,
          offset: 0,
          length: entry.origLength
        }, data);
      } catch (e) {
        console.error(e);
      }
    });
  });
}
function getWOFF2Tag(flag) {
  return [`cmap`, `head`, `hhea`, `hmtx`, `maxp`, `name`, `OS/2`, `post`, `cvt `, `fpgm`, `glyf`, `loca`, `prep`, `CFF `, `VORG`, `EBDT`, `EBLC`, `gasp`, `hdmx`, `kern`, `LTSH`, `PCLT`, `VDMX`, `vhea`, `vmtx`, `BASE`, `GDEF`, `GPOS`, `GSUB`, `EBSC`, `JSTF`, `MATH`, `CBDT`, `CBLC`, `COLR`, `CPAL`, `SVG `, `sbix`, `acnt`, `avar`, `bdat`, `bloc`, `bsln`, `cvar`, `fdsc`, `feat`, `fmtx`, `fvar`, `gvar`, `hsty`, `just`, `lcar`, `mort`, `morx`, `opbd`, `prop`, `trak`, `Zapf`, `Silf`, `Glat`, `Gloc`, `Feat`, `Sill`][flag & 63];
}
const tableClasses = {};
let tableClassesLoaded = false;
Promise.all([Promise.resolve().then(function () {
  return cmap$1;
}), Promise.resolve().then(function () {
  return head$1;
}), Promise.resolve().then(function () {
  return hhea$1;
}), Promise.resolve().then(function () {
  return hmtx$1;
}), Promise.resolve().then(function () {
  return maxp$1;
}), Promise.resolve().then(function () {
  return name$1;
}), Promise.resolve().then(function () {
  return OS2$1;
}), Promise.resolve().then(function () {
  return post$1;
}), Promise.resolve().then(function () {
  return BASE$1;
}), Promise.resolve().then(function () {
  return GDEF$1;
}), Promise.resolve().then(function () {
  return GSUB$1;
}), Promise.resolve().then(function () {
  return GPOS$1;
}), Promise.resolve().then(function () {
  return SVG$1;
}), Promise.resolve().then(function () {
  return fvar$1;
}), Promise.resolve().then(function () {
  return cvt$1;
}), Promise.resolve().then(function () {
  return fpgm$1;
}), Promise.resolve().then(function () {
  return gasp$1;
}), Promise.resolve().then(function () {
  return glyf$1;
}), Promise.resolve().then(function () {
  return loca$1;
}), Promise.resolve().then(function () {
  return prep$1;
}), Promise.resolve().then(function () {
  return CFF$1;
}), Promise.resolve().then(function () {
  return CFF2$1;
}), Promise.resolve().then(function () {
  return VORG$1;
}), Promise.resolve().then(function () {
  return EBLC$1;
}), Promise.resolve().then(function () {
  return EBDT$1;
}), Promise.resolve().then(function () {
  return EBSC$1;
}), Promise.resolve().then(function () {
  return CBLC$1;
}), Promise.resolve().then(function () {
  return CBDT$1;
}), Promise.resolve().then(function () {
  return sbix$1;
}), Promise.resolve().then(function () {
  return COLR$1;
}), Promise.resolve().then(function () {
  return CPAL$1;
}), Promise.resolve().then(function () {
  return DSIG$1;
}), Promise.resolve().then(function () {
  return hdmx$1;
}), Promise.resolve().then(function () {
  return kern$1;
}), Promise.resolve().then(function () {
  return LTSH$1;
}), Promise.resolve().then(function () {
  return MERG$1;
}), Promise.resolve().then(function () {
  return meta$1;
}), Promise.resolve().then(function () {
  return PCLT$1;
}), Promise.resolve().then(function () {
  return VDMX$1;
}), Promise.resolve().then(function () {
  return vhea$1;
}), Promise.resolve().then(function () {
  return vmtx$1;
})]).then(data => {
  data.forEach(e => {
    let name = Object.keys(e)[0];
    tableClasses[name] = e[name];
  });
  tableClassesLoaded = true;
});
function createTable(tables, dict, dataview) {
  let name = dict.tag.replace(/[^\w\d]/g, ``);
  let Type = tableClasses[name];
  if (Type) return new Type(dict, dataview, tables);
  console.warn(`lib-font has no definition for ${name}. The table was skipped.`);
  return {};
}
function loadTableClasses() {
  let count = 0;
  function checkLoaded(resolve, reject) {
    if (!tableClassesLoaded) {
      if (count > 10) {
        return reject(new Error(`loading took too long`));
      }
      count++;
      return setTimeout(() => checkLoaded(resolve), 250);
    }
    resolve(createTable);
  }
  return new Promise((resolve, reject) => checkLoaded(resolve));
}
function getFontCSSFormat(path, errorOnStyle) {
  let pos = path.lastIndexOf(`.`);
  let ext = (path.substring(pos + 1) || ``).toLowerCase();
  let format = {
    ttf: `truetype`,
    otf: `opentype`,
    woff: `woff`,
    woff2: `woff2`
  }[ext];
  if (format) return format;
  let msg = {
    eot: `The .eot format is not supported: it died in January 12, 2016, when Microsoft retired all versions of IE that didn't already support WOFF.`,
    svg: `The .svg format is not supported: SVG fonts (not to be confused with OpenType with embedded SVG) were so bad we took the entire fonts chapter out of the SVG specification again.`,
    fon: `The .fon format is not supported: this is an ancient Windows bitmap font format.`,
    ttc: `Based on the current CSS specification, font collections are not (yet?) supported.`
  }[ext];
  if (!msg) msg = `${path} is not a known webfont format.`;
  if (errorOnStyle) {
    throw new Error(msg);
  } else {
    console.warn(`Could not load font: ${msg}`);
  }
}
async function setupFontFace(name, url, options = {}) {
  if (!globalThis.document) return;
  let format = getFontCSSFormat(url, options.errorOnStyle);
  if (!format) return;
  let style = document.createElement(`style`);
  style.className = `injected-by-Font-js`;
  let rules = [];
  if (options.styleRules) {
    rules = Object.entries(options.styleRules).map(([key, value]) => `${key}: ${value};`);
  }
  style.textContent = `\n@font-face {\n    font-family: "${name}";\n    ${rules.join(`\n\t`)}\n    src: url("${url}") format("${format}");\n}`;
  globalThis.document.head.appendChild(style);
  return style;
}
const TTF = [0, 1, 0, 0];
const OTF = [79, 84, 84, 79];
const WOFF = [119, 79, 70, 70];
const WOFF2 = [119, 79, 70, 50];
function match(ar1, ar2) {
  if (ar1.length !== ar2.length) return;
  for (let i = 0; i < ar1.length; i++) {
    if (ar1[i] !== ar2[i]) return;
  }
  return true;
}
function validFontFormat(dataview) {
  const LEAD_BYTES = [dataview.getUint8(0), dataview.getUint8(1), dataview.getUint8(2), dataview.getUint8(3)];
  if (match(LEAD_BYTES, TTF) || match(LEAD_BYTES, OTF)) return `SFNT`;
  if (match(LEAD_BYTES, WOFF)) return `WOFF`;
  if (match(LEAD_BYTES, WOFF2)) return `WOFF2`;
}
function checkFetchResponseStatus(response) {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }
  return response;
}
class Font extends EventManager {
  constructor(name, options = {}) {
    super();
    this.name = name;
    this.options = options;
    this.metrics = false;
  }
  get src() {
    return this.__src;
  }
  set src(src) {
    this.__src = src;
    (async () => {
      if (globalThis.document && !this.options.skipStyleSheet) {
        await setupFontFace(this.name, src, this.options);
      }
      this.loadFont(src);
    })();
  }
  async loadFont(url, filename) {
    fetch(url).then(response => checkFetchResponseStatus(response) && response.arrayBuffer()).then(buffer => this.fromDataBuffer(buffer, filename || url)).catch(err => {
      const evt = new Event(`error`, err, `Failed to load font at ${filename || url}`);
      this.dispatch(evt);
      if (this.onerror) this.onerror(evt);
    });
  }
  async fromDataBuffer(buffer, filenameOrUrL) {
    this.fontData = new DataView(buffer);
    let type = validFontFormat(this.fontData);
    if (!type) {
      throw new Error(`${filenameOrUrL} is either an unsupported font format, or not a font at all.`);
    }
    await this.parseBasicData(type);
    const evt = new Event("load", {
      font: this
    });
    this.dispatch(evt);
    if (this.onload) this.onload(evt);
  }
  async parseBasicData(type) {
    return loadTableClasses().then(createTable => {
      if (type === `SFNT`) {
        this.opentype = new SFNT(this, this.fontData, createTable);
      }
      if (type === `WOFF`) {
        this.opentype = new WOFF$1(this, this.fontData, createTable);
      }
      if (type === `WOFF2`) {
        this.opentype = new WOFF2$1(this, this.fontData, createTable);
      }
      return this.opentype;
    });
  }
  getGlyphId(char) {
    return this.opentype.tables.cmap.getGlyphId(char);
  }
  reverse(glyphid) {
    return this.opentype.tables.cmap.reverse(glyphid);
  }
  supports(char) {
    return this.getGlyphId(char) !== 0;
  }
  supportsVariation(variation) {
    return this.opentype.tables.cmap.supportsVariation(variation) !== false;
  }
  measureText(text, size = 16) {
    if (this.__unloaded) throw new Error("Cannot measure text: font was unloaded. Please reload before calling measureText()");
    let d = document.createElement("div");
    d.textContent = text;
    d.style.fontFamily = this.name;
    d.style.fontSize = `${size}px`;
    d.style.color = `transparent`;
    d.style.background = `transparent`;
    d.style.top = `0`;
    d.style.left = `0`;
    d.style.position = `absolute`;
    document.body.appendChild(d);
    let bbox = d.getBoundingClientRect();
    document.body.removeChild(d);
    const OS2 = this.opentype.tables["OS/2"];
    bbox.fontSize = size;
    bbox.ascender = OS2.sTypoAscender;
    bbox.descender = OS2.sTypoDescender;
    return bbox;
  }
  unload() {
    if (this.styleElement.parentNode) {
      this.styleElement.parentNode.removeElement(this.styleElement);
      const evt = new Event("unload", {
        font: this
      });
      this.dispatch(evt);
      if (this.onunload) this.onunload(evt);
    }
    this._unloaded = true;
  }
  load() {
    if (this.__unloaded) {
      delete this.__unloaded;
      document.head.appendChild(this.styleElement);
      const evt = new Event("load", {
        font: this
      });
      this.dispatch(evt);
      if (this.onload) this.onload(evt);
    }
  }
}
globalThis.Font = Font;
class Subtable extends ParsedData {
  constructor(p, plaformID, encodingID) {
    super(p);
    this.plaformID = plaformID;
    this.encodingID = encodingID;
  }
}
class Format0 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 0;
    this.length = p.uint16;
    this.language = p.uint16;
    this.glyphIdArray = [...new Array(256)].map(_ => p.uint8);
  }
  supports(charCode) {
    if (charCode.charCodeAt) {
      charCode = -1;
      console.warn(`supports(character) not implemented for cmap subtable format 0. only supports(id) is implemented.`);
    }
    return 0 <= charCode && charCode <= 255;
  }
  reverse(glyphID) {
    console.warn(`reverse not implemented for cmap subtable format 0`);
    return {};
  }
  getSupportedCharCodes() {
    return [{
      start: 1,
      end: 256
    }];
  }
}
class Format2 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 2;
    this.length = p.uint16;
    this.language = p.uint16;
    this.subHeaderKeys = [...new Array(256)].map(_ => p.uint16);
    const subHeaderCount = Math.max(...this.subHeaderKeys);
    const subHeaderOffset = p.currentPosition;
    lazy$1(this, `subHeaders`, () => {
      p.currentPosition = subHeaderOffset;
      return [...new Array(subHeaderCount)].map(_ => new SubHeader(p));
    });
    const glyphIndexOffset = subHeaderOffset + subHeaderCount * 8;
    lazy$1(this, `glyphIndexArray`, () => {
      p.currentPosition = glyphIndexOffset;
      return [...new Array(subHeaderCount)].map(_ => p.uint16);
    });
  }
  supports(charCode) {
    if (charCode.charCodeAt) {
      charCode = -1;
      console.warn(`supports(character) not implemented for cmap subtable format 2. only supports(id) is implemented.`);
    }
    const low = charCode && 255;
    const high = charCode && 65280;
    const subHeaderKey = this.subHeaders[high];
    const subheader = this.subHeaders[subHeaderKey];
    const first = subheader.firstCode;
    const last = first + subheader.entryCount;
    return first <= low && low <= last;
  }
  reverse(glyphID) {
    console.warn(`reverse not implemented for cmap subtable format 2`);
    return {};
  }
  getSupportedCharCodes(preservePropNames = false) {
    if (preservePropNames) {
      return this.subHeaders.map(h => ({
        firstCode: h.firstCode,
        lastCode: h.lastCode
      }));
    }
    return this.subHeaders.map(h => ({
      start: h.firstCode,
      end: h.lastCode
    }));
  }
}
class SubHeader {
  constructor(p) {
    this.firstCode = p.uint16;
    this.entryCount = p.uint16;
    this.lastCode = this.first + this.entryCount;
    this.idDelta = p.int16;
    this.idRangeOffset = p.uint16;
  }
}
class Format4 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 4;
    this.length = p.uint16;
    this.language = p.uint16;
    this.segCountX2 = p.uint16;
    this.segCount = this.segCountX2 / 2;
    this.searchRange = p.uint16;
    this.entrySelector = p.uint16;
    this.rangeShift = p.uint16;
    const endCodePosition = p.currentPosition;
    lazy$1(this, `endCode`, () => p.readBytes(this.segCount, endCodePosition, 16));
    const startCodePosition = endCodePosition + 2 + this.segCountX2;
    lazy$1(this, `startCode`, () => p.readBytes(this.segCount, startCodePosition, 16));
    const idDeltaPosition = startCodePosition + this.segCountX2;
    lazy$1(this, `idDelta`, () => p.readBytes(this.segCount, idDeltaPosition, 16, true));
    const idRangePosition = idDeltaPosition + this.segCountX2;
    lazy$1(this, `idRangeOffset`, () => p.readBytes(this.segCount, idRangePosition, 16));
    const glyphIdArrayPosition = idRangePosition + this.segCountX2;
    const glyphIdArrayLength = this.length - (glyphIdArrayPosition - this.tableStart);
    lazy$1(this, `glyphIdArray`, () => p.readBytes(glyphIdArrayLength, glyphIdArrayPosition, 16));
    lazy$1(this, `segments`, () => this.buildSegments(idRangePosition, glyphIdArrayPosition, p));
  }
  buildSegments(idRangePosition, glyphIdArrayPosition, p) {
    const build = (_, i) => {
      let startCode = this.startCode[i],
        endCode = this.endCode[i],
        idDelta = this.idDelta[i],
        idRangeOffset = this.idRangeOffset[i],
        idRangeOffsetPointer = idRangePosition + 2 * i,
        glyphIDs = [];
      if (idRangeOffset === 0) {
        for (let i = startCode + idDelta, e = endCode + idDelta; i <= e; i++) {
          glyphIDs.push(i);
        }
      } else {
        for (let i = 0, e = endCode - startCode; i <= e; i++) {
          p.currentPosition = idRangeOffsetPointer + idRangeOffset + i * 2;
          glyphIDs.push(p.uint16);
        }
      }
      return {
        startCode: startCode,
        endCode: endCode,
        idDelta: idDelta,
        idRangeOffset: idRangeOffset,
        glyphIDs: glyphIDs
      };
    };
    return [...new Array(this.segCount)].map(build);
  }
  reverse(glyphID) {
    let s = this.segments.find(v => v.glyphIDs.includes(glyphID));
    if (!s) return {};
    const code = s.startCode + s.glyphIDs.indexOf(glyphID);
    return {
      code: code,
      unicode: String.fromCodePoint(code)
    };
  }
  getGlyphId(charCode) {
    if (charCode.charCodeAt) charCode = charCode.charCodeAt(0);
    if (55296 <= charCode && charCode <= 57343) return 0;
    if ((charCode & 65534) === 65534 || (charCode & 65535) === 65535) return 0;
    let segment = this.segments.find(s => s.startCode <= charCode && charCode <= s.endCode);
    if (!segment) return 0;
    return segment.glyphIDs[charCode - segment.startCode];
  }
  supports(charCode) {
    return this.getGlyphId(charCode) !== 0;
  }
  getSupportedCharCodes(preservePropNames = false) {
    if (preservePropNames) return this.segments;
    return this.segments.map(v => ({
      start: v.startCode,
      end: v.endCode
    }));
  }
}
class Format6 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 6;
    this.length = p.uint16;
    this.language = p.uint16;
    this.firstCode = p.uint16;
    this.entryCount = p.uint16;
    this.lastCode = this.firstCode + this.entryCount - 1;
    const getter = () => [...new Array(this.entryCount)].map(_ => p.uint16);
    lazy$1(this, `glyphIdArray`, getter);
  }
  supports(charCode) {
    if (charCode.charCodeAt) {
      charCode = -1;
      console.warn(`supports(character) not implemented for cmap subtable format 6. only supports(id) is implemented.`);
    }
    if (charCode < this.firstCode) return {};
    if (charCode > this.firstCode + this.entryCount) return {};
    const code = charCode - this.firstCode;
    return {
      code: code,
      unicode: String.fromCodePoint(code)
    };
  }
  reverse(glyphID) {
    let pos = this.glyphIdArray.indexOf(glyphID);
    if (pos > -1) return this.firstCode + pos;
  }
  getSupportedCharCodes(preservePropNames = false) {
    if (preservePropNames) {
      return [{
        firstCode: this.firstCode,
        lastCode: this.lastCode
      }];
    }
    return [{
      start: this.firstCode,
      end: this.lastCode
    }];
  }
}
class Format8 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 8;
    p.uint16;
    this.length = p.uint32;
    this.language = p.uint32;
    this.is32 = [...new Array(8192)].map(_ => p.uint8);
    this.numGroups = p.uint32;
    const getter = () => [...new Array(this.numGroups)].map(_ => new SequentialMapGroup$1(p));
    lazy$1(this, `groups`, getter);
  }
  supports(charCode) {
    if (charCode.charCodeAt) {
      charCode = -1;
      console.warn(`supports(character) not implemented for cmap subtable format 8. only supports(id) is implemented.`);
    }
    return this.groups.findIndex(s => s.startcharCode <= charCode && charCode <= s.endcharCode) !== -1;
  }
  reverse(glyphID) {
    console.warn(`reverse not implemented for cmap subtable format 8`);
    return {};
  }
  getSupportedCharCodes(preservePropNames = false) {
    if (preservePropNames) return this.groups;
    return this.groups.map(v => ({
      start: v.startcharCode,
      end: v.endcharCode
    }));
  }
}
class SequentialMapGroup$1 {
  constructor(p) {
    this.startcharCode = p.uint32;
    this.endcharCode = p.uint32;
    this.startGlyphID = p.uint32;
  }
}
class Format10 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 10;
    p.uint16;
    this.length = p.uint32;
    this.language = p.uint32;
    this.startCharCode = p.uint32;
    this.numChars = p.uint32;
    this.endCharCode = this.startCharCode + this.numChars;
    const getter = () => [...new Array(this.numChars)].map(_ => p.uint16);
    lazy$1(this, `glyphs`, getter);
  }
  supports(charCode) {
    if (charCode.charCodeAt) {
      charCode = -1;
      console.warn(`supports(character) not implemented for cmap subtable format 10. only supports(id) is implemented.`);
    }
    if (charCode < this.startCharCode) return false;
    if (charCode > this.startCharCode + this.numChars) return false;
    return charCode - this.startCharCode;
  }
  reverse(glyphID) {
    console.warn(`reverse not implemented for cmap subtable format 10`);
    return {};
  }
  getSupportedCharCodes(preservePropNames = false) {
    if (preservePropNames) {
      return [{
        startCharCode: this.startCharCode,
        endCharCode: this.endCharCode
      }];
    }
    return [{
      start: this.startCharCode,
      end: this.endCharCode
    }];
  }
}
class Format12 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 12;
    p.uint16;
    this.length = p.uint32;
    this.language = p.uint32;
    this.numGroups = p.uint32;
    const getter = () => [...new Array(this.numGroups)].map(_ => new SequentialMapGroup(p));
    lazy$1(this, `groups`, getter);
  }
  supports(charCode) {
    if (charCode.charCodeAt) charCode = charCode.charCodeAt(0);
    if (55296 <= charCode && charCode <= 57343) return 0;
    if ((charCode & 65534) === 65534 || (charCode & 65535) === 65535) return 0;
    return this.groups.findIndex(s => s.startCharCode <= charCode && charCode <= s.endCharCode) !== -1;
  }
  reverse(glyphID) {
    for (let group of this.groups) {
      let start = group.startGlyphID;
      if (start > glyphID) continue;
      if (start === glyphID) return group.startCharCode;
      let end = start + (group.endCharCode - group.startCharCode);
      if (end < glyphID) continue;
      const code = group.startCharCode + (glyphID - start);
      return {
        code: code,
        unicode: String.fromCodePoint(code)
      };
    }
    return {};
  }
  getSupportedCharCodes(preservePropNames = false) {
    if (preservePropNames) return this.groups;
    return this.groups.map(v => ({
      start: v.startCharCode,
      end: v.endCharCode
    }));
  }
}
class SequentialMapGroup {
  constructor(p) {
    this.startCharCode = p.uint32;
    this.endCharCode = p.uint32;
    this.startGlyphID = p.uint32;
  }
}
class Format13 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.format = 13;
    p.uint16;
    this.length = p.uint32;
    this.language = p.uint32;
    this.numGroups = p.uint32;
    const getter = [...new Array(this.numGroups)].map(_ => new ConstantMapGroup(p));
    lazy$1(this, `groups`, getter);
  }
  supports(charCode) {
    if (charCode.charCodeAt) charCode = charCode.charCodeAt(0);
    return this.groups.findIndex(s => s.startCharCode <= charCode && charCode <= s.endCharCode) !== -1;
  }
  reverse(glyphID) {
    console.warn(`reverse not implemented for cmap subtable format 13`);
    return {};
  }
  getSupportedCharCodes(preservePropNames = false) {
    if (preservePropNames) return this.groups;
    return this.groups.map(v => ({
      start: v.startCharCode,
      end: v.endCharCode
    }));
  }
}
class ConstantMapGroup {
  constructor(p) {
    this.startCharCode = p.uint32;
    this.endCharCode = p.uint32;
    this.glyphID = p.uint32;
  }
}
class Format14 extends Subtable {
  constructor(p, platformID, encodingID) {
    super(p, platformID, encodingID);
    this.subTableStart = p.currentPosition;
    this.format = 14;
    this.length = p.uint32;
    this.numVarSelectorRecords = p.uint32;
    lazy$1(this, `varSelectors`, () => [...new Array(this.numVarSelectorRecords)].map(_ => new VariationSelector(p)));
  }
  supports() {
    console.warn(`supports not implemented for cmap subtable format 14`);
    return 0;
  }
  getSupportedCharCodes() {
    console.warn(`getSupportedCharCodes not implemented for cmap subtable format 14`);
    return [];
  }
  reverse(glyphID) {
    console.warn(`reverse not implemented for cmap subtable format 14`);
    return {};
  }
  supportsVariation(variation) {
    let v = this.varSelector.find(uvs => uvs.varSelector === variation);
    return v ? v : false;
  }
  getSupportedVariations() {
    return this.varSelectors.map(v => v.varSelector);
  }
}
class VariationSelector {
  constructor(p) {
    this.varSelector = p.uint24;
    this.defaultUVSOffset = p.Offset32;
    this.nonDefaultUVSOffset = p.Offset32;
  }
}
function createSubTable(parser, platformID, encodingID) {
  const format = parser.uint16;
  if (format === 0) return new Format0(parser, platformID, encodingID);
  if (format === 2) return new Format2(parser, platformID, encodingID);
  if (format === 4) return new Format4(parser, platformID, encodingID);
  if (format === 6) return new Format6(parser, platformID, encodingID);
  if (format === 8) return new Format8(parser, platformID, encodingID);
  if (format === 10) return new Format10(parser, platformID, encodingID);
  if (format === 12) return new Format12(parser, platformID, encodingID);
  if (format === 13) return new Format13(parser, platformID, encodingID);
  if (format === 14) return new Format14(parser, platformID, encodingID);
  return {};
}
class cmap extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.numTables = p.uint16;
    this.encodingRecords = [...new Array(this.numTables)].map(_ => new EncodingRecord(p, this.tableStart));
  }
  getSubTable(tableID) {
    return this.encodingRecords[tableID].table;
  }
  getSupportedEncodings() {
    return this.encodingRecords.map(r => ({
      platformID: r.platformID,
      encodingId: r.encodingID
    }));
  }
  getSupportedCharCodes(platformID, encodingID) {
    const recordID = this.encodingRecords.findIndex(r => r.platformID === platformID && r.encodingID === encodingID);
    if (recordID === -1) return false;
    const subtable = this.getSubTable(recordID);
    return subtable.getSupportedCharCodes();
  }
  reverse(glyphid) {
    for (let i = 0; i < this.numTables; i++) {
      let code = this.getSubTable(i).reverse(glyphid);
      if (code) return code;
    }
  }
  getGlyphId(char) {
    let last = 0;
    this.encodingRecords.some((_, tableID) => {
      let t = this.getSubTable(tableID);
      if (!t.getGlyphId) return false;
      last = t.getGlyphId(char);
      return last !== 0;
    });
    return last;
  }
  supports(char) {
    return this.encodingRecords.some((_, tableID) => {
      const t = this.getSubTable(tableID);
      return t.supports && t.supports(char) !== false;
    });
  }
  supportsVariation(variation) {
    return this.encodingRecords.some((_, tableID) => {
      const t = this.getSubTable(tableID);
      return t.supportsVariation && t.supportsVariation(variation) !== false;
    });
  }
}
class EncodingRecord {
  constructor(p, tableStart) {
    const platformID = this.platformID = p.uint16;
    const encodingID = this.encodingID = p.uint16;
    const offset = this.offset = p.Offset32;
    lazy$1(this, `table`, () => {
      p.currentPosition = tableStart + offset;
      return createSubTable(p, platformID, encodingID);
    });
  }
}
var cmap$1 = Object.freeze({
  __proto__: null,
  cmap: cmap
});
class head extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.load({
      majorVersion: p.uint16,
      minorVersion: p.uint16,
      fontRevision: p.fixed,
      checkSumAdjustment: p.uint32,
      magicNumber: p.uint32,
      flags: p.flags(16),
      unitsPerEm: p.uint16,
      created: p.longdatetime,
      modified: p.longdatetime,
      xMin: p.int16,
      yMin: p.int16,
      xMax: p.int16,
      yMax: p.int16,
      macStyle: p.flags(16),
      lowestRecPPEM: p.uint16,
      fontDirectionHint: p.uint16,
      indexToLocFormat: p.uint16,
      glyphDataFormat: p.uint16
    });
  }
}
var head$1 = Object.freeze({
  __proto__: null,
  head: head
});
class hhea extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.ascender = p.fword;
    this.descender = p.fword;
    this.lineGap = p.fword;
    this.advanceWidthMax = p.ufword;
    this.minLeftSideBearing = p.fword;
    this.minRightSideBearing = p.fword;
    this.xMaxExtent = p.fword;
    this.caretSlopeRise = p.int16;
    this.caretSlopeRun = p.int16;
    this.caretOffset = p.int16;
    p.int16;
    p.int16;
    p.int16;
    p.int16;
    this.metricDataFormat = p.int16;
    this.numberOfHMetrics = p.uint16;
    p.verifyLength();
  }
}
var hhea$1 = Object.freeze({
  __proto__: null,
  hhea: hhea
});
class hmtx extends SimpleTable {
  constructor(dict, dataview, tables) {
    const {
      p: p
    } = super(dict, dataview);
    const numberOfHMetrics = tables.hhea.numberOfHMetrics;
    const numGlyphs = tables.maxp.numGlyphs;
    const metricsStart = p.currentPosition;
    lazy$1(this, `hMetrics`, () => {
      p.currentPosition = metricsStart;
      return [...new Array(numberOfHMetrics)].map(_ => new LongHorMetric(p.uint16, p.int16));
    });
    if (numberOfHMetrics < numGlyphs) {
      const lsbStart = metricsStart + numberOfHMetrics * 4;
      lazy$1(this, `leftSideBearings`, () => {
        p.currentPosition = lsbStart;
        return [...new Array(numGlyphs - numberOfHMetrics)].map(_ => p.int16);
      });
    }
  }
}
class LongHorMetric {
  constructor(w, b) {
    this.advanceWidth = w;
    this.lsb = b;
  }
}
var hmtx$1 = Object.freeze({
  __proto__: null,
  hmtx: hmtx
});
class maxp extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.legacyFixed;
    this.numGlyphs = p.uint16;
    if (this.version === 1) {
      this.maxPoints = p.uint16;
      this.maxContours = p.uint16;
      this.maxCompositePoints = p.uint16;
      this.maxCompositeContours = p.uint16;
      this.maxZones = p.uint16;
      this.maxTwilightPoints = p.uint16;
      this.maxStorage = p.uint16;
      this.maxFunctionDefs = p.uint16;
      this.maxInstructionDefs = p.uint16;
      this.maxStackElements = p.uint16;
      this.maxSizeOfInstructions = p.uint16;
      this.maxComponentElements = p.uint16;
      this.maxComponentDepth = p.uint16;
    }
    p.verifyLength();
  }
}
var maxp$1 = Object.freeze({
  __proto__: null,
  maxp: maxp
});
class name extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.format = p.uint16;
    this.count = p.uint16;
    this.stringOffset = p.Offset16;
    this.nameRecords = [...new Array(this.count)].map(_ => new NameRecord(p, this));
    if (this.format === 1) {
      this.langTagCount = p.uint16;
      this.langTagRecords = [...new Array(this.langTagCount)].map(_ => new LangTagRecord(p.uint16, p.Offset16));
    }
    this.stringStart = this.tableStart + this.stringOffset;
  }
  get(nameID) {
    let record = this.nameRecords.find(record => record.nameID === nameID);
    if (record) return record.string;
  }
}
class LangTagRecord {
  constructor(length, offset) {
    this.length = length;
    this.offset = offset;
  }
}
class NameRecord {
  constructor(p, nameTable) {
    this.platformID = p.uint16;
    this.encodingID = p.uint16;
    this.languageID = p.uint16;
    this.nameID = p.uint16;
    this.length = p.uint16;
    this.offset = p.Offset16;
    lazy$1(this, `string`, () => {
      p.currentPosition = nameTable.stringStart + this.offset;
      return decodeString(p, this);
    });
  }
}
function decodeString(p, record) {
  const {
    platformID: platformID,
    length: length
  } = record;
  if (length === 0) return ``;
  if (platformID === 0 || platformID === 3) {
    const str = [];
    for (let i = 0, e = length / 2; i < e; i++) str[i] = String.fromCharCode(p.uint16);
    return str.join(``);
  }
  const bytes = p.readBytes(length);
  const str = [];
  bytes.forEach(function (b, i) {
    str[i] = String.fromCharCode(b);
  });
  return str.join(``);
}
var name$1 = Object.freeze({
  __proto__: null,
  name: name
});
class OS2 extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.xAvgCharWidth = p.int16;
    this.usWeightClass = p.uint16;
    this.usWidthClass = p.uint16;
    this.fsType = p.uint16;
    this.ySubscriptXSize = p.int16;
    this.ySubscriptYSize = p.int16;
    this.ySubscriptXOffset = p.int16;
    this.ySubscriptYOffset = p.int16;
    this.ySuperscriptXSize = p.int16;
    this.ySuperscriptYSize = p.int16;
    this.ySuperscriptXOffset = p.int16;
    this.ySuperscriptYOffset = p.int16;
    this.yStrikeoutSize = p.int16;
    this.yStrikeoutPosition = p.int16;
    this.sFamilyClass = p.int16;
    this.panose = [...new Array(10)].map(_ => p.uint8);
    this.ulUnicodeRange1 = p.flags(32);
    this.ulUnicodeRange2 = p.flags(32);
    this.ulUnicodeRange3 = p.flags(32);
    this.ulUnicodeRange4 = p.flags(32);
    this.achVendID = p.tag;
    this.fsSelection = p.uint16;
    this.usFirstCharIndex = p.uint16;
    this.usLastCharIndex = p.uint16;
    this.sTypoAscender = p.int16;
    this.sTypoDescender = p.int16;
    this.sTypoLineGap = p.int16;
    this.usWinAscent = p.uint16;
    this.usWinDescent = p.uint16;
    if (this.version === 0) return p.verifyLength();
    this.ulCodePageRange1 = p.flags(32);
    this.ulCodePageRange2 = p.flags(32);
    if (this.version === 1) return p.verifyLength();
    this.sxHeight = p.int16;
    this.sCapHeight = p.int16;
    this.usDefaultChar = p.uint16;
    this.usBreakChar = p.uint16;
    this.usMaxContext = p.uint16;
    if (this.version <= 4) return p.verifyLength();
    this.usLowerOpticalPointSize = p.uint16;
    this.usUpperOpticalPointSize = p.uint16;
    if (this.version === 5) return p.verifyLength();
  }
}
var OS2$1 = Object.freeze({
  __proto__: null,
  OS2: OS2
});
class post extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.legacyFixed;
    this.italicAngle = p.fixed;
    this.underlinePosition = p.fword;
    this.underlineThickness = p.fword;
    this.isFixedPitch = p.uint32;
    this.minMemType42 = p.uint32;
    this.maxMemType42 = p.uint32;
    this.minMemType1 = p.uint32;
    this.maxMemType1 = p.uint32;
    if (this.version === 1 || this.version === 3) return p.verifyLength();
    this.numGlyphs = p.uint16;
    if (this.version === 2) {
      this.glyphNameIndex = [...new Array(this.numGlyphs)].map(_ => p.uint16);
      this.namesOffset = p.currentPosition;
      this.glyphNameOffsets = [1];
      for (let i = 0; i < this.numGlyphs; i++) {
        let index = this.glyphNameIndex[i];
        if (index < macStrings.length) {
          this.glyphNameOffsets.push(this.glyphNameOffsets[i]);
          continue;
        }
        let bytelength = p.int8;
        p.skip(bytelength);
        this.glyphNameOffsets.push(this.glyphNameOffsets[i] + bytelength + 1);
      }
    }
    if (this.version === 2.5) {
      this.offset = [...new Array(this.numGlyphs)].map(_ => p.int8);
    }
  }
  getGlyphName(glyphid) {
    if (this.version !== 2) {
      console.warn(`post table version ${this.version} does not support glyph name lookups`);
      return ``;
    }
    let index = this.glyphNameIndex[glyphid];
    if (index < 258) return macStrings[index];
    let offset = this.glyphNameOffsets[glyphid];
    let next = this.glyphNameOffsets[glyphid + 1];
    let len = next - offset - 1;
    if (len === 0) return `.notdef.`;
    this.parser.currentPosition = this.namesOffset + offset;
    const data = this.parser.readBytes(len, this.namesOffset + offset, 8, true);
    return data.map(b => String.fromCharCode(b)).join(``);
  }
}
const macStrings = [`.notdef`, `.null`, `nonmarkingreturn`, `space`, `exclam`, `quotedbl`, `numbersign`, `dollar`, `percent`, `ampersand`, `quotesingle`, `parenleft`, `parenright`, `asterisk`, `plus`, `comma`, `hyphen`, `period`, `slash`, `zero`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `colon`, `semicolon`, `less`, `equal`, `greater`, `question`, `at`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`, `bracketleft`, `backslash`, `bracketright`, `asciicircum`, `underscore`, `grave`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`, `braceleft`, `bar`, `braceright`, `asciitilde`, `Adieresis`, `Aring`, `Ccedilla`, `Eacute`, `Ntilde`, `Odieresis`, `Udieresis`, `aacute`, `agrave`, `acircumflex`, `adieresis`, `atilde`, `aring`, `ccedilla`, `eacute`, `egrave`, `ecircumflex`, `edieresis`, `iacute`, `igrave`, `icircumflex`, `idieresis`, `ntilde`, `oacute`, `ograve`, `ocircumflex`, `odieresis`, `otilde`, `uacute`, `ugrave`, `ucircumflex`, `udieresis`, `dagger`, `degree`, `cent`, `sterling`, `section`, `bullet`, `paragraph`, `germandbls`, `registered`, `copyright`, `trademark`, `acute`, `dieresis`, `notequal`, `AE`, `Oslash`, `infinity`, `plusminus`, `lessequal`, `greaterequal`, `yen`, `mu`, `partialdiff`, `summation`, `product`, `pi`, `integral`, `ordfeminine`, `ordmasculine`, `Omega`, `ae`, `oslash`, `questiondown`, `exclamdown`, `logicalnot`, `radical`, `florin`, `approxequal`, `Delta`, `guillemotleft`, `guillemotright`, `ellipsis`, `nonbreakingspace`, `Agrave`, `Atilde`, `Otilde`, `OE`, `oe`, `endash`, `emdash`, `quotedblleft`, `quotedblright`, `quoteleft`, `quoteright`, `divide`, `lozenge`, `ydieresis`, `Ydieresis`, `fraction`, `currency`, `guilsinglleft`, `guilsinglright`, `fi`, `fl`, `daggerdbl`, `periodcentered`, `quotesinglbase`, `quotedblbase`, `perthousand`, `Acircumflex`, `Ecircumflex`, `Aacute`, `Edieresis`, `Egrave`, `Iacute`, `Icircumflex`, `Idieresis`, `Igrave`, `Oacute`, `Ocircumflex`, `apple`, `Ograve`, `Uacute`, `Ucircumflex`, `Ugrave`, `dotlessi`, `circumflex`, `tilde`, `macron`, `breve`, `dotaccent`, `ring`, `cedilla`, `hungarumlaut`, `ogonek`, `caron`, `Lslash`, `lslash`, `Scaron`, `scaron`, `Zcaron`, `zcaron`, `brokenbar`, `Eth`, `eth`, `Yacute`, `yacute`, `Thorn`, `thorn`, `minus`, `multiply`, `onesuperior`, `twosuperior`, `threesuperior`, `onehalf`, `onequarter`, `threequarters`, `franc`, `Gbreve`, `gbreve`, `Idotaccent`, `Scedilla`, `scedilla`, `Cacute`, `cacute`, `Ccaron`, `ccaron`, `dcroat`];
var post$1 = Object.freeze({
  __proto__: null,
  post: post
});
class BASE extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.horizAxisOffset = p.Offset16;
    this.vertAxisOffset = p.Offset16;
    lazy$1(this, `horizAxis`, () => new AxisTable({
      offset: dict.offset + this.horizAxisOffset
    }, dataview));
    lazy$1(this, `vertAxis`, () => new AxisTable({
      offset: dict.offset + this.vertAxisOffset
    }, dataview));
    if (this.majorVersion === 1 && this.minorVersion === 1) {
      this.itemVarStoreOffset = p.Offset32;
      lazy$1(this, `itemVarStore`, () => new AxisTable({
        offset: dict.offset + this.itemVarStoreOffset
      }, dataview));
    }
  }
}
class AxisTable extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview, `AxisTable`);
    this.baseTagListOffset = p.Offset16;
    this.baseScriptListOffset = p.Offset16;
    lazy$1(this, `baseTagList`, () => new BaseTagListTable({
      offset: dict.offset + this.baseTagListOffset
    }, dataview));
    lazy$1(this, `baseScriptList`, () => new BaseScriptListTable({
      offset: dict.offset + this.baseScriptListOffset
    }, dataview));
  }
}
class BaseTagListTable extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview, `BaseTagListTable`);
    this.baseTagCount = p.uint16;
    this.baselineTags = [...new Array(this.baseTagCount)].map(_ => p.tag);
  }
}
class BaseScriptListTable extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview, `BaseScriptListTable`);
    this.baseScriptCount = p.uint16;
    const recordStart = p.currentPosition;
    lazy$1(this, `baseScriptRecords`, () => {
      p.currentPosition = recordStart;
      return [...new Array(this.baseScriptCount)].map(_ => new BaseScriptRecord(this.start, p));
    });
  }
}
class BaseScriptRecord {
  constructor(baseScriptListTableStart, p) {
    this.baseScriptTag = p.tag;
    this.baseScriptOffset = p.Offset16;
    lazy$1(this, `baseScriptTable`, () => {
      p.currentPosition = baseScriptListTableStart + this.baseScriptOffset;
      return new BaseScriptTable(p);
    });
  }
}
class BaseScriptTable {
  constructor(p) {
    this.start = p.currentPosition;
    this.baseValuesOffset = p.Offset16;
    this.defaultMinMaxOffset = p.Offset16;
    this.baseLangSysCount = p.uint16;
    this.baseLangSysRecords = [...new Array(this.baseLangSysCount)].map(_ => new BaseLangSysRecord(this.start, p));
    lazy$1(this, `baseValues`, () => {
      p.currentPosition = this.start + this.baseValuesOffset;
      return new BaseValuesTable(p);
    });
    lazy$1(this, `defaultMinMax`, () => {
      p.currentPosition = this.start + this.defaultMinMaxOffset;
      return new MinMaxTable(p);
    });
  }
}
class BaseLangSysRecord {
  constructor(baseScriptTableStart, p) {
    this.baseLangSysTag = p.tag;
    this.minMaxOffset = p.Offset16;
    lazy$1(this, `minMax`, () => {
      p.currentPosition = baseScriptTableStart + this.minMaxOffset;
      return new MinMaxTable(p);
    });
  }
}
class BaseValuesTable {
  constructor(p) {
    this.parser = p;
    this.start = p.currentPosition;
    this.defaultBaselineIndex = p.uint16;
    this.baseCoordCount = p.uint16;
    this.baseCoords = [...new Array(this.baseCoordCount)].map(_ => p.Offset16);
  }
  getTable(id) {
    this.parser.currentPosition = this.start + this.baseCoords[id];
    return new BaseCoordTable(this.parser);
  }
}
class MinMaxTable {
  constructor(p) {
    this.minCoord = p.Offset16;
    this.maxCoord = p.Offset16;
    this.featMinMaxCount = p.uint16;
    const recordStart = p.currentPosition;
    lazy$1(this, `featMinMaxRecords`, () => {
      p.currentPosition = recordStart;
      return [...new Array(this.featMinMaxCount)].map(_ => new FeatMinMaxRecord(p));
    });
  }
}
class FeatMinMaxRecord {
  constructor(p) {
    this.featureTableTag = p.tag;
    this.minCoord = p.Offset16;
    this.maxCoord = p.Offset16;
  }
}
class BaseCoordTable {
  constructor(p) {
    this.baseCoordFormat = p.uint16;
    this.coordinate = p.int16;
    if (this.baseCoordFormat === 2) {
      this.referenceGlyph = p.uint16;
      this.baseCoordPoint = p.uint16;
    }
    if (this.baseCoordFormat === 3) {
      this.deviceTable = p.Offset16;
    }
  }
}
var BASE$1 = Object.freeze({
  __proto__: null,
  BASE: BASE
});
class ClassDefinition {
  constructor(p) {
    this.classFormat = p.uint16;
    if (this.classFormat === 1) {
      this.startGlyphID = p.uint16;
      this.glyphCount = p.uint16;
      this.classValueArray = [...new Array(this.glyphCount)].map(_ => p.uint16);
    }
    if (this.classFormat === 2) {
      this.classRangeCount = p.uint16;
      this.classRangeRecords = [...new Array(this.classRangeCount)].map(_ => new ClassRangeRecord(p));
    }
  }
}
class ClassRangeRecord {
  constructor(p) {
    this.startGlyphID = p.uint16;
    this.endGlyphID = p.uint16;
    this.class = p.uint16;
  }
}
class CoverageTable extends ParsedData {
  constructor(p) {
    super(p);
    this.coverageFormat = p.uint16;
    if (this.coverageFormat === 1) {
      this.glyphCount = p.uint16;
      this.glyphArray = [...new Array(this.glyphCount)].map(_ => p.uint16);
    }
    if (this.coverageFormat === 2) {
      this.rangeCount = p.uint16;
      this.rangeRecords = [...new Array(this.rangeCount)].map(_ => new CoverageRangeRecord(p));
    }
  }
}
class CoverageRangeRecord {
  constructor(p) {
    this.startGlyphID = p.uint16;
    this.endGlyphID = p.uint16;
    this.startCoverageIndex = p.uint16;
  }
}
class ItemVariationStoreTable {
  constructor(table, p) {
    this.table = table;
    this.parser = p;
    this.start = p.currentPosition;
    this.format = p.uint16;
    this.variationRegionListOffset = p.Offset32;
    this.itemVariationDataCount = p.uint16;
    this.itemVariationDataOffsets = [...new Array(this.itemVariationDataCount)].map(_ => p.Offset32);
  }
}
class GDEF extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.glyphClassDefOffset = p.Offset16;
    lazy$1(this, `glyphClassDefs`, () => {
      if (this.glyphClassDefOffset === 0) return undefined;
      p.currentPosition = this.tableStart + this.glyphClassDefOffset;
      return new ClassDefinition(p);
    });
    this.attachListOffset = p.Offset16;
    lazy$1(this, `attachList`, () => {
      if (this.attachListOffset === 0) return undefined;
      p.currentPosition = this.tableStart + this.attachListOffset;
      return new AttachList(p);
    });
    this.ligCaretListOffset = p.Offset16;
    lazy$1(this, `ligCaretList`, () => {
      if (this.ligCaretListOffset === 0) return undefined;
      p.currentPosition = this.tableStart + this.ligCaretListOffset;
      return new LigCaretList(p);
    });
    this.markAttachClassDefOffset = p.Offset16;
    lazy$1(this, `markAttachClassDef`, () => {
      if (this.markAttachClassDefOffset === 0) return undefined;
      p.currentPosition = this.tableStart + this.markAttachClassDefOffset;
      return new ClassDefinition(p);
    });
    if (this.minorVersion >= 2) {
      this.markGlyphSetsDefOffset = p.Offset16;
      lazy$1(this, `markGlyphSetsDef`, () => {
        if (this.markGlyphSetsDefOffset === 0) return undefined;
        p.currentPosition = this.tableStart + this.markGlyphSetsDefOffset;
        return new MarkGlyphSetsTable(p);
      });
    }
    if (this.minorVersion === 3) {
      this.itemVarStoreOffset = p.Offset32;
      lazy$1(this, `itemVarStore`, () => {
        if (this.itemVarStoreOffset === 0) return undefined;
        p.currentPosition = this.tableStart + this.itemVarStoreOffset;
        return new ItemVariationStoreTable(p);
      });
    }
  }
}
class AttachList extends ParsedData {
  constructor(p) {
    super(p);
    this.coverageOffset = p.Offset16;
    this.glyphCount = p.uint16;
    this.attachPointOffsets = [...new Array(this.glyphCount)].map(_ => p.Offset16);
  }
  getPoint(pointID) {
    this.parser.currentPosition = this.start + this.attachPointOffsets[pointID];
    return new AttachPoint(this.parser);
  }
}
class AttachPoint {
  constructor(p) {
    this.pointCount = p.uint16;
    this.pointIndices = [...new Array(this.pointCount)].map(_ => p.uint16);
  }
}
class LigCaretList extends ParsedData {
  constructor(p) {
    super(p);
    this.coverageOffset = p.Offset16;
    lazy$1(this, `coverage`, () => {
      p.currentPosition = this.start + this.coverageOffset;
      return new CoverageTable(p);
    });
    this.ligGlyphCount = p.uint16;
    this.ligGlyphOffsets = [...new Array(this.ligGlyphCount)].map(_ => p.Offset16);
  }
  getLigGlyph(ligGlyphID) {
    this.parser.currentPosition = this.start + this.ligGlyphOffsets[ligGlyphID];
    return new LigGlyph(this.parser);
  }
}
class LigGlyph extends ParsedData {
  constructor(p) {
    super(p);
    this.caretCount = p.uint16;
    this.caretValueOffsets = [...new Array(this.caretCount)].map(_ => p.Offset16);
  }
  getCaretValue(caretID) {
    this.parser.currentPosition = this.start + this.caretValueOffsets[caretID];
    return new CaretValue(this.parser);
  }
}
class CaretValue {
  constructor(p) {
    this.caretValueFormat = p.uint16;
    if (this.caretValueFormat === 1) {
      this.coordinate = p.int16;
    }
    if (this.caretValueFormat === 2) {
      this.caretValuePointIndex = p.uint16;
    }
    if (this.caretValueFormat === 3) {
      this.coordinate = p.int16;
      this.deviceOffset = p.Offset16;
    }
  }
}
class MarkGlyphSetsTable extends ParsedData {
  constructor(p) {
    super(p);
    this.markGlyphSetTableFormat = p.uint16;
    this.markGlyphSetCount = p.uint16;
    this.coverageOffsets = [...new Array(this.markGlyphSetCount)].map(_ => p.Offset32);
  }
  getMarkGlyphSet(markGlyphSetID) {
    this.parser.currentPosition = this.start + this.coverageOffsets[markGlyphSetID];
    return new CoverageTable(this.parser);
  }
}
var GDEF$1 = Object.freeze({
  __proto__: null,
  GDEF: GDEF
});
class ScriptList extends ParsedData {
  static EMPTY = {
    scriptCount: 0,
    scriptRecords: []
  };
  constructor(p) {
    super(p);
    this.scriptCount = p.uint16;
    this.scriptRecords = [...new Array(this.scriptCount)].map(_ => new ScriptRecord(p));
  }
}
class ScriptRecord {
  constructor(p) {
    this.scriptTag = p.tag;
    this.scriptOffset = p.Offset16;
  }
}
class ScriptTable extends ParsedData {
  constructor(p) {
    super(p);
    this.defaultLangSys = p.Offset16;
    this.langSysCount = p.uint16;
    this.langSysRecords = [...new Array(this.langSysCount)].map(_ => new LangSysRecord(p));
  }
}
class LangSysRecord {
  constructor(p) {
    this.langSysTag = p.tag;
    this.langSysOffset = p.Offset16;
  }
}
class LangSysTable {
  constructor(p) {
    this.lookupOrder = p.Offset16;
    this.requiredFeatureIndex = p.uint16;
    this.featureIndexCount = p.uint16;
    this.featureIndices = [...new Array(this.featureIndexCount)].map(_ => p.uint16);
  }
}
class FeatureList extends ParsedData {
  static EMPTY = {
    featureCount: 0,
    featureRecords: []
  };
  constructor(p) {
    super(p);
    this.featureCount = p.uint16;
    this.featureRecords = [...new Array(this.featureCount)].map(_ => new FeatureRecord(p));
  }
}
class FeatureRecord {
  constructor(p) {
    this.featureTag = p.tag;
    this.featureOffset = p.Offset16;
  }
}
class FeatureTable extends ParsedData {
  constructor(p) {
    super(p);
    this.featureParams = p.Offset16;
    this.lookupIndexCount = p.uint16;
    this.lookupListIndices = [...new Array(this.lookupIndexCount)].map(_ => p.uint16);
  }
  getFeatureParams() {
    if (this.featureParams > 0) {
      const p = this.parser;
      p.currentPosition = this.start + this.featureParams;
      const tag = this.featureTag;
      if (tag === `size`) return new Size(p);
      if (tag.startsWith(`cc`)) return new CharacterVariant(p);
      if (tag.startsWith(`ss`)) return new StylisticSet(p);
    }
  }
}
class CharacterVariant {
  constructor(p) {
    this.format = p.uint16;
    this.featUiLabelNameId = p.uint16;
    this.featUiTooltipTextNameId = p.uint16;
    this.sampleTextNameId = p.uint16;
    this.numNamedParameters = p.uint16;
    this.firstParamUiLabelNameId = p.uint16;
    this.charCount = p.uint16;
    this.character = [...new Array(this.charCount)].map(_ => p.uint24);
  }
}
class Size {
  constructor(p) {
    this.designSize = p.uint16;
    this.subfamilyIdentifier = p.uint16;
    this.subfamilyNameID = p.uint16;
    this.smallEnd = p.uint16;
    this.largeEnd = p.uint16;
  }
}
class StylisticSet {
  constructor(p) {
    this.version = p.uint16;
    this.UINameID = p.uint16;
  }
}
class LookupType extends ParsedData {
  constructor(p) {
    super(p);
    this.substFormat = p.uint16;
    this.coverageOffset = p.Offset16;
  }
  getCoverageTable() {
    let p = this.parser;
    p.currentPosition = this.start + this.coverageOffset;
    return new CoverageTable(p);
  }
}
function undoCoverageOffsetParsing(instance) {
  instance.parser.currentPosition -= 2;
  delete instance.coverageOffset;
  delete instance.getCoverageTable;
}
class LookupType1$1 extends LookupType {
  constructor(p) {
    super(p);
    this.deltaGlyphID = p.int16;
  }
}
class LookupType2$1 extends LookupType {
  constructor(p) {
    super(p);
    this.sequenceCount = p.uint16;
    this.sequenceOffsets = [...new Array(this.sequenceCount)].map(_ => p.Offset16);
  }
  getSequence(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.sequenceOffsets[index];
    return new SequenceTable(p);
  }
}
class SequenceTable {
  constructor(p) {
    this.glyphCount = p.uint16;
    this.substituteGlyphIDs = [...new Array(this.glyphCount)].map(_ => p.uint16);
  }
}
class LookupType3$1 extends LookupType {
  constructor(p) {
    super(p);
    this.alternateSetCount = p.uint16;
    this.alternateSetOffsets = [...new Array(this.alternateSetCount)].map(_ => p.Offset16);
  }
  getAlternateSet(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.alternateSetOffsets[index];
    return new AlternateSetTable(p);
  }
}
class AlternateSetTable {
  constructor(p) {
    this.glyphCount = p.uint16;
    this.alternateGlyphIDs = [...new Array(this.glyphCount)].map(_ => p.uint16);
  }
}
class LookupType4$1 extends LookupType {
  constructor(p) {
    super(p);
    this.ligatureSetCount = p.uint16;
    this.ligatureSetOffsets = [...new Array(this.ligatureSetCount)].map(_ => p.Offset16);
  }
  getLigatureSet(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.ligatureSetOffsets[index];
    return new LigatureSetTable(p);
  }
}
class LigatureSetTable extends ParsedData {
  constructor(p) {
    super(p);
    this.ligatureCount = p.uint16;
    this.ligatureOffsets = [...new Array(this.ligatureCount)].map(_ => p.Offset16);
  }
  getLigature(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.ligatureOffsets[index];
    return new LigatureTable(p);
  }
}
class LigatureTable {
  constructor(p) {
    this.ligatureGlyph = p.uint16;
    this.componentCount = p.uint16;
    this.componentGlyphIDs = [...new Array(this.componentCount - 1)].map(_ => p.uint16);
  }
}
class SubstLookupRecord {
  constructor(p) {
    this.glyphSequenceIndex = p.uint16;
    this.lookupListIndex = p.uint16;
  }
}
class LookupType5$1 extends LookupType {
  constructor(p) {
    super(p);
    if (this.substFormat === 1) {
      this.subRuleSetCount = p.uint16;
      this.subRuleSetOffsets = [...new Array(this.subRuleSetCount)].map(_ => p.Offset16);
    }
    if (this.substFormat === 2) {
      this.classDefOffset = p.Offset16;
      this.subClassSetCount = p.uint16;
      this.subClassSetOffsets = [...new Array(this.subClassSetCount)].map(_ => p.Offset16);
    }
    if (this.substFormat === 3) {
      undoCoverageOffsetParsing(this);
      this.glyphCount = p.uint16;
      this.substitutionCount = p.uint16;
      this.coverageOffsets = [...new Array(this.glyphCount)].map(_ => p.Offset16);
      this.substLookupRecords = [...new Array(this.substitutionCount)].map(_ => new SubstLookupRecord(p));
    }
  }
  getSubRuleSet(index) {
    if (this.substFormat !== 1) throw new Error(`lookup type 5.${this.substFormat} has no subrule sets.`);
    let p = this.parser;
    p.currentPosition = this.start + this.subRuleSetOffsets[index];
    return new SubRuleSetTable(p);
  }
  getSubClassSet(index) {
    if (this.substFormat !== 2) throw new Error(`lookup type 5.${this.substFormat} has no subclass sets.`);
    let p = this.parser;
    p.currentPosition = this.start + this.subClassSetOffsets[index];
    return new SubClassSetTable(p);
  }
  getCoverageTable(index) {
    if (this.substFormat !== 3 && !index) return super.getCoverageTable();
    if (!index) throw new Error(`lookup type 5.${this.substFormat} requires an coverage table index.`);
    let p = this.parser;
    p.currentPosition = this.start + this.coverageOffsets[index];
    return new CoverageTable(p);
  }
}
class SubRuleSetTable extends ParsedData {
  constructor(p) {
    super(p);
    this.subRuleCount = p.uint16;
    this.subRuleOffsets = [...new Array(this.subRuleCount)].map(_ => p.Offset16);
  }
  getSubRule(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.subRuleOffsets[index];
    return new SubRuleTable(p);
  }
}
class SubRuleTable {
  constructor(p) {
    this.glyphCount = p.uint16;
    this.substitutionCount = p.uint16;
    this.inputSequence = [...new Array(this.glyphCount - 1)].map(_ => p.uint16);
    this.substLookupRecords = [...new Array(this.substitutionCount)].map(_ => new SubstLookupRecord(p));
  }
}
class SubClassSetTable extends ParsedData {
  constructor(p) {
    super(p);
    this.subClassRuleCount = p.uint16;
    this.subClassRuleOffsets = [...new Array(this.subClassRuleCount)].map(_ => p.Offset16);
  }
  getSubClass(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.subClassRuleOffsets[index];
    return new SubClassRuleTable(p);
  }
}
class SubClassRuleTable extends SubRuleTable {
  constructor(p) {
    super(p);
  }
}
class LookupType6$1 extends LookupType {
  constructor(p) {
    super(p);
    if (this.substFormat === 1) {
      this.chainSubRuleSetCount = p.uint16;
      this.chainSubRuleSetOffsets = [...new Array(this.chainSubRuleSetCount)].map(_ => p.Offset16);
    }
    if (this.substFormat === 2) {
      this.coverageOffset = p.Offset16;
      this.backtrackClassDefOffset = p.Offset16;
      this.inputClassDefOffset = p.Offset16;
      this.lookaheadClassDefOffset = p.Offset16;
      this.chainSubClassSetCount = p.uint16;
      this.chainSubClassSetOffsets = [...new Array(this.chainSubClassSetCount)].map(_ => p.Offset16);
    }
    if (this.substFormat === 3) {
      undoCoverageOffsetParsing(this);
      this.backtrackGlyphCount = p.uint16;
      this.backtrackCoverageOffsets = [...new Array(this.backtrackGlyphCount)].map(_ => p.Offset16);
      this.inputGlyphCount = p.uint16;
      this.inputCoverageOffsets = [...new Array(this.inputGlyphCount)].map(_ => p.Offset16);
      this.lookaheadGlyphCount = p.uint16;
      this.lookaheadCoverageOffsets = [...new Array(this.lookaheadGlyphCount)].map(_ => p.Offset16);
      this.seqLookupCount = p.uint16;
      this.seqLookupRecords = [...new Array(this.substitutionCount)].map(_ => new SequenceLookupRecord(p));
    }
  }
  getChainSubRuleSet(index) {
    if (this.substFormat !== 1) throw new Error(`lookup type 6.${this.substFormat} has no chainsubrule sets.`);
    let p = this.parser;
    p.currentPosition = this.start + this.chainSubRuleSetOffsets[index];
    return new ChainSubRuleSetTable(p);
  }
  getChainSubClassSet(index) {
    if (this.substFormat !== 2) throw new Error(`lookup type 6.${this.substFormat} has no chainsubclass sets.`);
    let p = this.parser;
    p.currentPosition = this.start + this.chainSubClassSetOffsets[index];
    return new ChainSubClassSetTable(p);
  }
  getCoverageFromOffset(offset) {
    if (this.substFormat !== 3) throw new Error(`lookup type 6.${this.substFormat} does not use contextual coverage offsets.`);
    let p = this.parser;
    p.currentPosition = this.start + offset;
    return new CoverageTable(p);
  }
}
class ChainSubRuleSetTable extends ParsedData {
  constructor(p) {
    super(p);
    this.chainSubRuleCount = p.uint16;
    this.chainSubRuleOffsets = [...new Array(this.chainSubRuleCount)].map(_ => p.Offset16);
  }
  getSubRule(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.chainSubRuleOffsets[index];
    return new ChainSubRuleTable(p);
  }
}
class ChainSubRuleTable {
  constructor(p) {
    this.backtrackGlyphCount = p.uint16;
    this.backtrackSequence = [...new Array(this.backtrackGlyphCount)].map(_ => p.uint16);
    this.inputGlyphCount = p.uint16;
    this.inputSequence = [...new Array(this.inputGlyphCount - 1)].map(_ => p.uint16);
    this.lookaheadGlyphCount = p.uint16;
    this.lookAheadSequence = [...new Array(this.lookAheadGlyphCount)].map(_ => p.uint16);
    this.substitutionCount = p.uint16;
    this.substLookupRecords = [...new Array(this.SubstCount)].map(_ => new SubstLookupRecord(p));
  }
}
class ChainSubClassSetTable extends ParsedData {
  constructor(p) {
    super(p);
    this.chainSubClassRuleCount = p.uint16;
    this.chainSubClassRuleOffsets = [...new Array(this.chainSubClassRuleCount)].map(_ => p.Offset16);
  }
  getSubClass(index) {
    let p = this.parser;
    p.currentPosition = this.start + this.chainSubRuleOffsets[index];
    return new ChainSubClassRuleTable(p);
  }
}
class ChainSubClassRuleTable {
  constructor(p) {
    this.backtrackGlyphCount = p.uint16;
    this.backtrackSequence = [...new Array(this.backtrackGlyphCount)].map(_ => p.uint16);
    this.inputGlyphCount = p.uint16;
    this.inputSequence = [...new Array(this.inputGlyphCount - 1)].map(_ => p.uint16);
    this.lookaheadGlyphCount = p.uint16;
    this.lookAheadSequence = [...new Array(this.lookAheadGlyphCount)].map(_ => p.uint16);
    this.substitutionCount = p.uint16;
    this.substLookupRecords = [...new Array(this.substitutionCount)].map(_ => new SequenceLookupRecord(p));
  }
}
class SequenceLookupRecord extends ParsedData {
  constructor(p) {
    super(p);
    this.sequenceIndex = p.uint16;
    this.lookupListIndex = p.uint16;
  }
}
class LookupType7$1 extends ParsedData {
  constructor(p) {
    super(p);
    this.substFormat = p.uint16;
    this.extensionLookupType = p.uint16;
    this.extensionOffset = p.Offset32;
  }
}
class LookupType8$1 extends LookupType {
  constructor(p) {
    super(p);
    this.backtrackGlyphCount = p.uint16;
    this.backtrackCoverageOffsets = [...new Array(this.backtrackGlyphCount)].map(_ => p.Offset16);
    this.lookaheadGlyphCount = p.uint16;
    this.lookaheadCoverageOffsets = [new Array(this.lookaheadGlyphCount)].map(_ => p.Offset16);
    this.glyphCount = p.uint16;
    this.substituteGlyphIDs = [...new Array(this.glyphCount)].map(_ => p.uint16);
  }
}
var GSUBtables = {
  buildSubtable: function (type, p) {
    switch (type) {
      case 1:
        return new LookupType1$1(p);
      case 2:
        return new LookupType2$1(p);
      case 3:
        return new LookupType3$1(p);
      case 4:
        return new LookupType4$1(p);
      case 5:
        return new LookupType5$1(p);
      case 6:
        return new LookupType6$1(p);
      case 7:
        return new LookupType7$1(p);
      case 8:
        return new LookupType8$1(p);
    }
  }
};
class LookupType1 {
  constructor(p) {
    console.log(`lookup type 1`);
  }
}
class LookupType2 {
  constructor(p) {
    console.log(`lookup type 2`);
  }
}
class LookupType3 {
  constructor(p) {
    console.log(`lookup type 3`);
  }
}
class LookupType4 {
  constructor(p) {
    console.log(`lookup type 4`);
  }
}
class LookupType5 {
  constructor(p) {
    console.log(`lookup type 5`);
  }
}
class LookupType6 {
  constructor(p) {
    console.log(`lookup type 6`);
  }
}
class LookupType7 {
  constructor(p) {
    console.log(`lookup type 7`);
  }
}
class LookupType8 {
  constructor(p) {
    console.log(`lookup type 8`);
  }
}
class LookupType9 {
  constructor(p) {
    console.log(`lookup type 9`);
  }
}
var GPOStables = {
  buildSubtable: function (type, p) {
    switch (type) {
      case 1:
        return new LookupType1(p);
      case 2:
        return new LookupType2(p);
      case 3:
        return new LookupType3(p);
      case 4:
        return new LookupType4(p);
      case 5:
        return new LookupType5(p);
      case 6:
        return new LookupType6(p);
      case 7:
        return new LookupType7(p);
      case 8:
        return new LookupType8(p);
      case 9:
        return new LookupType9(p);
    }
  }
};
class LookupList extends ParsedData {
  static EMPTY = {
    lookupCount: 0,
    lookups: []
  };
  constructor(p) {
    super(p);
    this.lookupCount = p.uint16;
    this.lookups = [...new Array(this.lookupCount)].map(_ => p.Offset16);
  }
}
class LookupTable extends ParsedData {
  constructor(p, type) {
    super(p);
    this.ctType = type;
    this.lookupType = p.uint16;
    this.lookupFlag = p.uint16;
    this.subTableCount = p.uint16;
    this.subtableOffsets = [...new Array(this.subTableCount)].map(_ => p.Offset16);
    this.markFilteringSet = p.uint16;
  }
  get rightToLeft() {
    return this.lookupFlag & 1 === 1;
  }
  get ignoreBaseGlyphs() {
    return this.lookupFlag & 2 === 2;
  }
  get ignoreLigatures() {
    return this.lookupFlag & 4 === 4;
  }
  get ignoreMarks() {
    return this.lookupFlag & 8 === 8;
  }
  get useMarkFilteringSet() {
    return this.lookupFlag & 16 === 16;
  }
  get markAttachmentType() {
    return this.lookupFlag & 65280 === 65280;
  }
  getSubTable(index) {
    const builder = this.ctType === `GSUB` ? GSUBtables : GPOStables;
    this.parser.currentPosition = this.start + this.subtableOffsets[index];
    return builder.buildSubtable(this.lookupType, this.parser);
  }
}
class CommonLayoutTable extends SimpleTable {
  constructor(dict, dataview, name) {
    const {
      p: p,
      tableStart: tableStart
    } = super(dict, dataview, name);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.scriptListOffset = p.Offset16;
    this.featureListOffset = p.Offset16;
    this.lookupListOffset = p.Offset16;
    if (this.majorVersion === 1 && this.minorVersion === 1) {
      this.featureVariationsOffset = p.Offset32;
    }
    const no_content = !(this.scriptListOffset || this.featureListOffset || this.lookupListOffset);
    lazy$1(this, `scriptList`, () => {
      if (no_content) return ScriptList.EMPTY;
      p.currentPosition = tableStart + this.scriptListOffset;
      return new ScriptList(p);
    });
    lazy$1(this, `featureList`, () => {
      if (no_content) return FeatureList.EMPTY;
      p.currentPosition = tableStart + this.featureListOffset;
      return new FeatureList(p);
    });
    lazy$1(this, `lookupList`, () => {
      if (no_content) return LookupList.EMPTY;
      p.currentPosition = tableStart + this.lookupListOffset;
      return new LookupList(p);
    });
    if (this.featureVariationsOffset) {
      lazy$1(this, `featureVariations`, () => {
        if (no_content) return FeatureVariations.EMPTY;
        p.currentPosition = tableStart + this.featureVariationsOffset;
        return new FeatureVariations(p);
      });
    }
  }
  getSupportedScripts() {
    return this.scriptList.scriptRecords.map(r => r.scriptTag);
  }
  getScriptTable(scriptTag) {
    let record = this.scriptList.scriptRecords.find(r => r.scriptTag === scriptTag);
    this.parser.currentPosition = this.scriptList.start + record.scriptOffset;
    let table = new ScriptTable(this.parser);
    table.scriptTag = scriptTag;
    return table;
  }
  ensureScriptTable(arg) {
    if (typeof arg === "string") {
      return this.getScriptTable(arg);
    }
    return arg;
  }
  getSupportedLangSys(scriptTable) {
    scriptTable = this.ensureScriptTable(scriptTable);
    const hasDefault = scriptTable.defaultLangSys !== 0;
    const supported = scriptTable.langSysRecords.map(l => l.langSysTag);
    if (hasDefault) supported.unshift(`dflt`);
    return supported;
  }
  getDefaultLangSysTable(scriptTable) {
    scriptTable = this.ensureScriptTable(scriptTable);
    let offset = scriptTable.defaultLangSys;
    if (offset !== 0) {
      this.parser.currentPosition = scriptTable.start + offset;
      let table = new LangSysTable(this.parser);
      table.langSysTag = ``;
      table.defaultForScript = scriptTable.scriptTag;
      return table;
    }
  }
  getLangSysTable(scriptTable, langSysTag = `dflt`) {
    if (langSysTag === `dflt`) return this.getDefaultLangSysTable(scriptTable);
    scriptTable = this.ensureScriptTable(scriptTable);
    let record = scriptTable.langSysRecords.find(l => l.langSysTag === langSysTag);
    this.parser.currentPosition = scriptTable.start + record.langSysOffset;
    let table = new LangSysTable(this.parser);
    table.langSysTag = langSysTag;
    return table;
  }
  getFeatures(langSysTable) {
    return langSysTable.featureIndices.map(index => this.getFeature(index));
  }
  getFeature(indexOrTag) {
    let record;
    if (parseInt(indexOrTag) == indexOrTag) {
      record = this.featureList.featureRecords[indexOrTag];
    } else {
      record = this.featureList.featureRecords.find(f => f.featureTag === indexOrTag);
    }
    if (!record) return;
    this.parser.currentPosition = this.featureList.start + record.featureOffset;
    let table = new FeatureTable(this.parser);
    table.featureTag = record.featureTag;
    return table;
  }
  getLookups(featureTable) {
    return featureTable.lookupListIndices.map(index => this.getLookup(index));
  }
  getLookup(lookupIndex, type) {
    let lookupOffset = this.lookupList.lookups[lookupIndex];
    this.parser.currentPosition = this.lookupList.start + lookupOffset;
    return new LookupTable(this.parser, type);
  }
}
class GSUB extends CommonLayoutTable {
  constructor(dict, dataview) {
    super(dict, dataview, `GSUB`);
  }
  getLookup(lookupIndex) {
    return super.getLookup(lookupIndex, `GSUB`);
  }
}
var GSUB$1 = Object.freeze({
  __proto__: null,
  GSUB: GSUB
});
class GPOS extends CommonLayoutTable {
  constructor(dict, dataview) {
    super(dict, dataview, `GPOS`);
  }
  getLookup(lookupIndex) {
    return super.getLookup(lookupIndex, `GPOS`);
  }
}
var GPOS$1 = Object.freeze({
  __proto__: null,
  GPOS: GPOS
});
class SVG extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = uint16;
    this.offsetToSVGDocumentList = p.Offset32;
    p.currentPosition = this.tableStart + this.offsetToSVGDocumentList;
    this.documentList = new SVGDocumentList(p);
  }
}
class SVGDocumentList extends ParsedData {
  constructor(p) {
    super(p);
    this.numEntries = p.uint16;
    this.documentRecords = [...new Array(this.numEntries)].map(_ => new SVGDocumentRecord(p));
  }
  getDocument(documentID) {
    let record = this.documentRecords[documentID];
    if (!record) return "";
    let offset = this.start + record.svgDocOffset;
    this.parser.currentPosition = offset;
    return this.parser.readBytes(record.svgDocLength);
  }
  getDocumentForGlyph(glyphID) {
    let id = this.documentRecords.findIndex(d => d.startGlyphID <= glyphID && glyphID <= d.endGlyphID);
    if (id === -1) return "";
    return this.getDocument(id);
  }
}
class SVGDocumentRecord {
  constructor(p) {
    this.startGlyphID = p.uint16;
    this.endGlyphID = p.uint16;
    this.svgDocOffset = p.Offset32;
    this.svgDocLength = p.uint32;
  }
}
var SVG$1 = Object.freeze({
  __proto__: null,
  SVG: SVG
});
class fvar extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.axesArrayOffset = p.Offset16;
    p.uint16;
    this.axisCount = p.uint16;
    this.axisSize = p.uint16;
    this.instanceCount = p.uint16;
    this.instanceSize = p.uint16;
    const axisStart = this.tableStart + this.axesArrayOffset;
    lazy$1(this, `axes`, () => {
      p.currentPosition = axisStart;
      return [...new Array(this.axisCount)].map(_ => new VariationAxisRecord(p));
    });
    const instanceStart = axisStart + this.axisCount * this.axisSize;
    lazy$1(this, `instances`, () => {
      let instances = [];
      for (let i = 0; i < this.instanceCount; i++) {
        p.currentPosition = instanceStart + i * this.instanceSize;
        instances.push(new InstanceRecord(p, this.axisCount, this.instanceSize));
      }
      return instances;
    });
  }
  getSupportedAxes() {
    return this.axes.map(a => a.tag);
  }
  getAxis(name) {
    return this.axes.find(a => a.tag === name);
  }
}
class VariationAxisRecord {
  constructor(p) {
    this.tag = p.tag;
    this.minValue = p.fixed;
    this.defaultValue = p.fixed;
    this.maxValue = p.fixed;
    this.flags = p.flags(16);
    this.axisNameID = p.uint16;
  }
}
class InstanceRecord {
  constructor(p, axisCount, size) {
    let start = p.currentPosition;
    this.subfamilyNameID = p.uint16;
    p.uint16;
    this.coordinates = [...new Array(axisCount)].map(_ => p.fixed);
    if (p.currentPosition - start < size) {
      this.postScriptNameID = p.uint16;
    }
  }
}
var fvar$1 = Object.freeze({
  __proto__: null,
  fvar: fvar
});
class cvt extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    const n = dict.length / 2;
    lazy$1(this, `items`, () => [...new Array(n)].map(_ => p.fword));
  }
}
var cvt$1 = Object.freeze({
  __proto__: null,
  cvt: cvt
});
class fpgm extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    lazy$1(this, `instructions`, () => [...new Array(dict.length)].map(_ => p.uint8));
  }
}
var fpgm$1 = Object.freeze({
  __proto__: null,
  fpgm: fpgm
});
class gasp extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.numRanges = p.uint16;
    const getter = () => [...new Array(this.numRanges)].map(_ => new GASPRange(p));
    lazy$1(this, `gaspRanges`, getter);
  }
}
class GASPRange {
  constructor(p) {
    this.rangeMaxPPEM = p.uint16;
    this.rangeGaspBehavior = p.uint16;
  }
}
var gasp$1 = Object.freeze({
  __proto__: null,
  gasp: gasp
});
class glyf extends SimpleTable {
  constructor(dict, dataview) {
    super(dict, dataview);
  }
  getGlyphData(offset, length) {
    this.parser.currentPosition = this.tableStart + offset;
    return this.parser.readBytes(length);
  }
}
var glyf$1 = Object.freeze({
  __proto__: null,
  glyf: glyf
});
class loca extends SimpleTable {
  constructor(dict, dataview, tables) {
    const {
      p: p
    } = super(dict, dataview);
    const n = tables.maxp.numGlyphs + 1;
    if (tables.hmtx.indexToLocFormat === 0) {
      this.x2 = true;
      lazy$1(this, `offsets`, () => [...new Array(n)].map(_ => p.Offset16));
    } else {
      lazy$1(this, `offsets`, () => [...new Array(n)].map(_ => p.Offset32));
    }
  }
  getGlyphDataOffsetAndLength(glyphID) {
    let offset = this.offsets[glyphID] * this.x2 ? 2 : 1;
    let nextOffset = this.offsets[glyphID + 1] * this.x2 ? 2 : 1;
    return {
      offset: offset,
      length: nextOffset - offset
    };
  }
}
var loca$1 = Object.freeze({
  __proto__: null,
  loca: loca
});
class prep extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    lazy$1(this, `instructions`, () => [...new Array(dict.length)].map(_ => p.uint8));
  }
}
var prep$1 = Object.freeze({
  __proto__: null,
  prep: prep
});
class CFF extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    lazy$1(this, `data`, () => p.readBytes());
  }
}
var CFF$1 = Object.freeze({
  __proto__: null,
  CFF: CFF
});
class CFF2 extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    lazy$1(this, `data`, () => p.readBytes());
  }
}
var CFF2$1 = Object.freeze({
  __proto__: null,
  CFF2: CFF2
});
class VORG extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.defaultVertOriginY = p.int16;
    this.numVertOriginYMetrics = p.uint16;
    lazy$1(this, `vertORiginYMetrics`, () => [...new Array(this.numVertOriginYMetrics)].map(_ => new VertOriginYMetric(p)));
  }
}
class VertOriginYMetric {
  constructor(p) {
    this.glyphIndex = p.uint16;
    this.vertOriginY = p.int16;
  }
}
var VORG$1 = Object.freeze({
  __proto__: null,
  VORG: VORG
});
class BitmapSize {
  constructor(p) {
    this.indexSubTableArrayOffset = p.Offset32;
    this.indexTablesSize = p.uint32;
    this.numberofIndexSubTables = p.uint32;
    this.colorRef = p.uint32;
    this.hori = new SbitLineMetrics(p);
    this.vert = new SbitLineMetrics(p);
    this.startGlyphIndex = p.uint16;
    this.endGlyphIndex = p.uint16;
    this.ppemX = p.uint8;
    this.ppemY = p.uint8;
    this.bitDepth = p.uint8;
    this.flags = p.int8;
  }
}
class BitmapScale {
  constructor(p) {
    this.hori = new SbitLineMetrics(p);
    this.vert = new SbitLineMetrics(p);
    this.ppemX = p.uint8;
    this.ppemY = p.uint8;
    this.substitutePpemX = p.uint8;
    this.substitutePpemY = p.uint8;
  }
}
class SbitLineMetrics {
  constructor(p) {
    this.ascender = p.int8;
    this.descender = p.int8;
    this.widthMax = p.uint8;
    this.caretSlopeNumerator = p.int8;
    this.caretSlopeDenominator = p.int8;
    this.caretOffset = p.int8;
    this.minOriginSB = p.int8;
    this.minAdvanceSB = p.int8;
    this.maxBeforeBL = p.int8;
    this.minAfterBL = p.int8;
    this.pad1 = p.int8;
    this.pad2 = p.int8;
  }
}
class EBLC extends SimpleTable {
  constructor(dict, dataview, name) {
    const {
      p: p
    } = super(dict, dataview, name);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.numSizes = p.uint32;
    lazy$1(this, `bitMapSizes`, () => [...new Array(this.numSizes)].map(_ => new BitmapSize(p)));
  }
}
var EBLC$1 = Object.freeze({
  __proto__: null,
  EBLC: EBLC
});
class EBDT extends SimpleTable {
  constructor(dict, dataview, name) {
    const {
      p: p
    } = super(dict, dataview, name);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
  }
}
var EBDT$1 = Object.freeze({
  __proto__: null,
  EBDT: EBDT
});
class EBSC extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.majorVersion = p.uint16;
    this.minorVersion = p.uint16;
    this.numSizes = p.uint32;
    lazy$1(this, `bitmapScales`, () => [...new Array(this.numSizes)].map(_ => new BitmapScale(p)));
  }
}
var EBSC$1 = Object.freeze({
  __proto__: null,
  EBSC: EBSC
});
class CBLC extends EBLC {
  constructor(dict, dataview) {
    super(dict, dataview, `CBLC`);
  }
}
var CBLC$1 = Object.freeze({
  __proto__: null,
  CBLC: CBLC
});
class CBDT extends EBDT {
  constructor(dict, dataview) {
    super(dict, dataview, `CBDT`);
  }
}
var CBDT$1 = Object.freeze({
  __proto__: null,
  CBDT: CBDT
});
class sbix extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.flags = p.flags(16);
    this.numStrikes = p.uint32;
    lazy$1(this, `strikeOffsets`, () => [...new Array(this.numStrikes)].map(_ => p.Offset32));
  }
}
var sbix$1 = Object.freeze({
  __proto__: null,
  sbix: sbix
});
class COLR extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.numBaseGlyphRecords = p.uint16;
    this.baseGlyphRecordsOffset = p.Offset32;
    this.layerRecordsOffset = p.Offset32;
    this.numLayerRecords = p.uint16;
  }
  getBaseGlyphRecord(glyphID) {
    let start = this.tableStart + this.baseGlyphRecordsOffset;
    this.parser.currentPosition = start;
    let first = new BaseGlyphRecord(this.parser);
    let firstID = first.gID;
    let end = this.tableStart + this.layerRecordsOffset - 6;
    this.parser.currentPosition = end;
    let last = new BaseGlyphRecord(this.parser);
    let lastID = last.gID;
    if (firstID === glyphID) return first;
    if (lastID === glyphID) return last;
    while (true) {
      if (start === end) break;
      let mid = start + (end - start) / 12;
      this.parser.currentPosition = mid;
      let middle = new BaseGlyphRecord(this.parser);
      let midID = middle.gID;
      if (midID === glyphID) return middle;else if (midID > glyphID) {
        end = mid;
      } else if (midID < glyphID) {
        start = mid;
      }
    }
    return false;
  }
  getLayers(glyphID) {
    let record = this.getBaseGlyphRecord(glyphID);
    this.parser.currentPosition = this.tableStart + this.layerRecordsOffset + 4 * record.firstLayerIndex;
    return [...new Array(record.numLayers)].map(_ => new LayerRecord(p));
  }
}
class BaseGlyphRecord {
  constructor(p) {
    this.gID = p.uint16;
    this.firstLayerIndex = p.uint16;
    this.numLayers = p.uint16;
  }
}
class LayerRecord {
  constructor(p) {
    this.gID = p.uint16;
    this.paletteIndex = p.uint16;
  }
}
var COLR$1 = Object.freeze({
  __proto__: null,
  COLR: COLR
});
class CPAL extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.numPaletteEntries = p.uint16;
    const numPalettes = this.numPalettes = p.uint16;
    this.numColorRecords = p.uint16;
    this.offsetFirstColorRecord = p.Offset32;
    this.colorRecordIndices = [...new Array(this.numPalettes)].map(_ => p.uint16);
    lazy$1(this, `colorRecords`, () => {
      p.currentPosition = this.tableStart + this.offsetFirstColorRecord;
      return [...new Array(this.numColorRecords)].map(_ => new ColorRecord(p));
    });
    if (this.version === 1) {
      this.offsetPaletteTypeArray = p.Offset32;
      this.offsetPaletteLabelArray = p.Offset32;
      this.offsetPaletteEntryLabelArray = p.Offset32;
      lazy$1(this, `paletteTypeArray`, () => {
        p.currentPosition = this.tableStart + this.offsetPaletteTypeArray;
        return new PaletteTypeArray(p, numPalettes);
      });
      lazy$1(this, `paletteLabelArray`, () => {
        p.currentPosition = this.tableStart + this.offsetPaletteLabelArray;
        return new PaletteLabelsArray(p, numPalettes);
      });
      lazy$1(this, `paletteEntryLabelArray`, () => {
        p.currentPosition = this.tableStart + this.offsetPaletteEntryLabelArray;
        return new PaletteEntryLabelArray(p, numPalettes);
      });
    }
  }
}
class ColorRecord {
  constructor(p) {
    this.blue = p.uint8;
    this.green = p.uint8;
    this.red = p.uint8;
    this.alpha = p.uint8;
  }
}
class PaletteTypeArray {
  constructor(p, numPalettes) {
    this.paletteTypes = [...new Array(numPalettes)].map(_ => p.uint32);
  }
}
class PaletteLabelsArray {
  constructor(p, numPalettes) {
    this.paletteLabels = [...new Array(numPalettes)].map(_ => p.uint16);
  }
}
class PaletteEntryLabelArray {
  constructor(p, numPalettes) {
    this.paletteEntryLabels = [...new Array(numPalettes)].map(_ => p.uint16);
  }
}
var CPAL$1 = Object.freeze({
  __proto__: null,
  CPAL: CPAL
});
class DSIG extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint32;
    this.numSignatures = p.uint16;
    this.flags = p.uint16;
    this.signatureRecords = [...new Array(this.numSignatures)].map(_ => new SignatureRecord(p));
  }
  getData(signatureID) {
    const record = this.signatureRecords[signatureID];
    this.parser.currentPosition = this.tableStart + record.offset;
    return new SignatureBlockFormat1(this.parser);
  }
}
class SignatureRecord {
  constructor(p) {
    this.format = p.uint32;
    this.length = p.uint32;
    this.offset = p.Offset32;
  }
}
class SignatureBlockFormat1 {
  constructor(p) {
    p.uint16;
    p.uint16;
    this.signatureLength = p.uint32;
    this.signature = p.readBytes(this.signatureLength);
  }
}
var DSIG$1 = Object.freeze({
  __proto__: null,
  DSIG: DSIG
});
class hdmx extends SimpleTable {
  constructor(dict, dataview, tables) {
    const {
      p: p
    } = super(dict, dataview);
    const numGlyphs = tables.hmtx.numGlyphs;
    this.version = p.uint16;
    this.numRecords = p.int16;
    this.sizeDeviceRecord = p.int32;
    this.records = [...new Array(numRecords)].map(_ => new DeviceRecord(p, numGlyphs));
  }
}
class DeviceRecord {
  constructor(p, numGlyphs) {
    this.pixelSize = p.uint8;
    this.maxWidth = p.uint8;
    this.widths = p.readBytes(numGlyphs);
  }
}
var hdmx$1 = Object.freeze({
  __proto__: null,
  hdmx: hdmx
});
class kern extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.nTables = p.uint16;
    lazy$1(this, `tables`, () => {
      let offset = this.tableStart + 4;
      const tables = [];
      for (let i = 0; i < this.nTables; i++) {
        p.currentPosition = offset;
        let subtable = new KernSubTable(p);
        tables.push(subtable);
        offset += subtable;
      }
      return tables;
    });
  }
}
class KernSubTable {
  constructor(p) {
    this.version = p.uint16;
    this.length = p.uint16;
    this.coverage = p.flags(8);
    this.format = p.uint8;
    if (this.format === 0) {
      this.nPairs = p.uint16;
      this.searchRange = p.uint16;
      this.entrySelector = p.uint16;
      this.rangeShift = p.uint16;
      lazy$1(this, `pairs`, () => [...new Array(this.nPairs)].map(_ => new Pair(p)));
    }
    if (this.format === 2) {
      console.warn(`Kern subtable format 2 is not supported: this parser currently only parses universal table data.`);
    }
  }
  get horizontal() {
    return this.coverage[0];
  }
  get minimum() {
    return this.coverage[1];
  }
  get crossstream() {
    return this.coverage[2];
  }
  get override() {
    return this.coverage[3];
  }
}
class Pair {
  constructor(p) {
    this.left = p.uint16;
    this.right = p.uint16;
    this.value = p.fword;
  }
}
var kern$1 = Object.freeze({
  __proto__: null,
  kern: kern
});
class LTSH extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.numGlyphs = p.uint16;
    this.yPels = p.readBytes(this.numGlyphs);
  }
}
var LTSH$1 = Object.freeze({
  __proto__: null,
  LTSH: LTSH
});
class MERG extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.mergeClassCount = p.uint16;
    this.mergeDataOffset = p.Offset16;
    this.classDefCount = p.uint16;
    this.offsetToClassDefOffsets = p.Offset16;
    lazy$1(this, `mergeEntryMatrix`, () => [...new Array(this.mergeClassCount)].map(_ => p.readBytes(this.mergeClassCount)));
    console.warn(`Full MERG parsing is currently not supported.`);
    console.warn(`If you need this table parsed, please file an issue, or better yet, a PR.`);
  }
}
var MERG$1 = Object.freeze({
  __proto__: null,
  MERG: MERG
});
class meta extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint32;
    this.flags = p.uint32;
    p.uint32;
    this.dataMapsCount = p.uint32;
    this.dataMaps = [...new Array(this.dataMapsCount)].map(_ => new DataMap(this.tableStart, p));
  }
}
class DataMap {
  constructor(tableStart, p) {
    this.tableStart = tableStart;
    this.parser = p;
    this.tag = p.tag;
    this.dataOffset = p.Offset32;
    this.dataLength = p.uint32;
  }
  getData() {
    this.parser.currentField = this.tableStart + this.dataOffset;
    return this.parser.readBytes(this.dataLength);
  }
}
var meta$1 = Object.freeze({
  __proto__: null,
  meta: meta
});
class PCLT extends SimpleTable {
  constructor(dict, dataview) {
    super(dict, dataview);
    console.warn(`This font uses a PCLT table, which is currently not supported by this parser.`);
    console.warn(`If you need this table parsed, please file an issue, or better yet, a PR.`);
  }
}
var PCLT$1 = Object.freeze({
  __proto__: null,
  PCLT: PCLT
});
class VDMX extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.uint16;
    this.numRecs = p.uint16;
    this.numRatios = p.uint16;
    this.ratRanges = [...new Array(this.numRatios)].map(_ => new RatioRange(p));
    this.offsets = [...new Array(this.numRatios)].map(_ => p.Offset16);
    this.VDMXGroups = [...new Array(this.numRecs)].map(_ => new VDMXGroup(p));
  }
}
class RatioRange {
  constructor(p) {
    this.bCharSet = p.uint8;
    this.xRatio = p.uint8;
    this.yStartRatio = p.uint8;
    this.yEndRatio = p.uint8;
  }
}
class VDMXGroup {
  constructor(p) {
    this.recs = p.uint16;
    this.startsz = p.uint8;
    this.endsz = p.uint8;
    this.records = [...new Array(this.recs)].map(_ => new vTable(p));
  }
}
class vTable {
  constructor(p) {
    this.yPelHeight = p.uint16;
    this.yMax = p.int16;
    this.yMin = p.int16;
  }
}
var VDMX$1 = Object.freeze({
  __proto__: null,
  VDMX: VDMX
});
class vhea extends SimpleTable {
  constructor(dict, dataview) {
    const {
      p: p
    } = super(dict, dataview);
    this.version = p.fixed;
    this.ascent = this.vertTypoAscender = p.int16;
    this.descent = this.vertTypoDescender = p.int16;
    this.lineGap = this.vertTypoLineGap = p.int16;
    this.advanceHeightMax = p.int16;
    this.minTopSideBearing = p.int16;
    this.minBottomSideBearing = p.int16;
    this.yMaxExtent = p.int16;
    this.caretSlopeRise = p.int16;
    this.caretSlopeRun = p.int16;
    this.caretOffset = p.int16;
    this.reserved = p.int16;
    this.reserved = p.int16;
    this.reserved = p.int16;
    this.reserved = p.int16;
    this.metricDataFormat = p.int16;
    this.numOfLongVerMetrics = p.uint16;
    p.verifyLength();
  }
}
var vhea$1 = Object.freeze({
  __proto__: null,
  vhea: vhea
});
class vmtx extends SimpleTable {
  constructor(dict, dataview, tables) {
    super(dict, dataview);
    const numOfLongVerMetrics = tables.vhea.numOfLongVerMetrics;
    const numGlyphs = tables.maxp.numGlyphs;
    const metricsStart = p.currentPosition;
    lazy(this, `vMetrics`, () => {
      p.currentPosition = metricsStart;
      return [...new Array(numOfLongVerMetrics)].map(_ => new LongVertMetric(p.uint16, p.int16));
    });
    if (numOfLongVerMetrics < numGlyphs) {
      const tsbStart = metricsStart + numOfLongVerMetrics * 4;
      lazy(this, `topSideBearings`, () => {
        p.currentPosition = tsbStart;
        return [...new Array(numGlyphs - numOfLongVerMetrics)].map(_ => p.int16);
      });
    }
  }
}
class LongVertMetric {
  constructor(h, b) {
    this.advanceHeight = h;
    this.topSideBearing = b;
  }
}
var vmtx$1 = Object.freeze({
  __proto__: null,
  vmtx: vmtx
});


/***/ },

/***/ "./src/admin/lib-font/load-lib-font.js"
/*!*********************************************!*\
  !*** ./src/admin/lib-font/load-lib-font.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Font: () => (/* reexport safe */ _lib_font_browser_js__WEBPACK_IMPORTED_MODULE_2__.Font)
/* harmony export */ });
/* harmony import */ var _inflate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inflate.js */ "./src/admin/lib-font/inflate.js");
/* harmony import */ var _inflate_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_inflate_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unbrotli_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unbrotli.js */ "./src/admin/lib-font/unbrotli.js");
/* harmony import */ var _unbrotli_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_unbrotli_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_font_browser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib-font.browser.js */ "./src/admin/lib-font/lib-font.browser.js");
/**
 * Browser entry for LibFont: gzip (WOFF) + brotli (WOFF2) globals, then the bundled Font class.
 *
 * Debug: in Customizer, `window.onepressDebugLibFont = true` then reload — look for "[OnePress LibFont]" in console.
 *
 * @package onepress
 */





/***/ },

/***/ "./src/admin/lib-font/unbrotli.js"
/*!****************************************!*\
  !*** ./src/admin/lib-font/unbrotli.js ***!
  \****************************************/
(module) {

(function (f) {
  if (true) {
    module.exports = f();
  } else // removed by dead control flow
{ var g; }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = undefined;
            if (!f && c) return require(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = undefined, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      /* Copyright 2013 Google Inc. All Rights Reserved.
      
         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at
      
         http://www.apache.org/licenses/LICENSE-2.0
      
         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
      
         Bit reading helpers
      */

      var BROTLI_READ_SIZE = 4096;
      var BROTLI_IBUF_SIZE = 2 * BROTLI_READ_SIZE + 32;
      var BROTLI_IBUF_MASK = 2 * BROTLI_READ_SIZE - 1;
      var kBitMask = new Uint32Array([0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215]);

      /* Input byte buffer, consist of a ringbuffer and a "slack" region where */
      /* bytes from the start of the ringbuffer are copied. */
      function BrotliBitReader(input) {
        this.buf_ = new Uint8Array(BROTLI_IBUF_SIZE);
        this.input_ = input; /* input callback */

        this.reset();
      }
      BrotliBitReader.READ_SIZE = BROTLI_READ_SIZE;
      BrotliBitReader.IBUF_MASK = BROTLI_IBUF_MASK;
      BrotliBitReader.prototype.reset = function () {
        this.buf_ptr_ = 0; /* next input will write here */
        this.val_ = 0; /* pre-fetched bits */
        this.pos_ = 0; /* byte position in stream */
        this.bit_pos_ = 0; /* current bit-reading position in val_ */
        this.bit_end_pos_ = 0; /* bit-reading end position from LSB of val_ */
        this.eos_ = 0; /* input stream is finished */

        this.readMoreInput();
        for (var i = 0; i < 4; i++) {
          this.val_ |= this.buf_[this.pos_] << 8 * i;
          ++this.pos_;
        }
        return this.bit_end_pos_ > 0;
      };

      /* Fills up the input ringbuffer by calling the input callback.
      
         Does nothing if there are at least 32 bytes present after current position.
      
         Returns 0 if either:
          - the input callback returned an error, or
          - there is no more input and the position is past the end of the stream.
      
         After encountering the end of the input stream, 32 additional zero bytes are
         copied to the ringbuffer, therefore it is safe to call this function after
         every 32 bytes of input is read.
      */
      BrotliBitReader.prototype.readMoreInput = function () {
        if (this.bit_end_pos_ > 256) {
          return;
        } else if (this.eos_) {
          if (this.bit_pos_ > this.bit_end_pos_) throw new Error('Unexpected end of input ' + this.bit_pos_ + ' ' + this.bit_end_pos_);
        } else {
          var dst = this.buf_ptr_;
          var bytes_read = this.input_.read(this.buf_, dst, BROTLI_READ_SIZE);
          if (bytes_read < 0) {
            throw new Error('Unexpected end of input');
          }
          if (bytes_read < BROTLI_READ_SIZE) {
            this.eos_ = 1;
            /* Store 32 bytes of zero after the stream end. */
            for (var p = 0; p < 32; p++) this.buf_[dst + bytes_read + p] = 0;
          }
          if (dst === 0) {
            /* Copy the head of the ringbuffer to the slack region. */
            for (var p = 0; p < 32; p++) this.buf_[(BROTLI_READ_SIZE << 1) + p] = this.buf_[p];
            this.buf_ptr_ = BROTLI_READ_SIZE;
          } else {
            this.buf_ptr_ = 0;
          }
          this.bit_end_pos_ += bytes_read << 3;
        }
      };

      /* Guarantees that there are at least 24 bits in the buffer. */
      BrotliBitReader.prototype.fillBitWindow = function () {
        while (this.bit_pos_ >= 8) {
          this.val_ >>>= 8;
          this.val_ |= this.buf_[this.pos_ & BROTLI_IBUF_MASK] << 24;
          ++this.pos_;
          this.bit_pos_ = this.bit_pos_ - 8 >>> 0;
          this.bit_end_pos_ = this.bit_end_pos_ - 8 >>> 0;
        }
      };

      /* Reads the specified number of bits from Read Buffer. */
      BrotliBitReader.prototype.readBits = function (n_bits) {
        if (32 - this.bit_pos_ < n_bits) {
          this.fillBitWindow();
        }
        var val = this.val_ >>> this.bit_pos_ & kBitMask[n_bits];
        this.bit_pos_ += n_bits;
        return val;
      };
      module.exports = BrotliBitReader;
    }, {}],
    2: [function (require, module, exports) {
      /* Copyright 2013 Google Inc. All Rights Reserved.
      
         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at
      
         http://www.apache.org/licenses/LICENSE-2.0
      
         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
      
         Lookup table to map the previous two bytes to a context id.
      
         There are four different context modeling modes defined here:
           CONTEXT_LSB6: context id is the least significant 6 bits of the last byte,
           CONTEXT_MSB6: context id is the most significant 6 bits of the last byte,
           CONTEXT_UTF8: second-order context model tuned for UTF8-encoded text,
           CONTEXT_SIGNED: second-order context model tuned for signed integers.
      
         The context id for the UTF8 context model is calculated as follows. If p1
         and p2 are the previous two bytes, we calcualte the context as
      
           context = kContextLookup[p1] | kContextLookup[p2 + 256].
      
         If the previous two bytes are ASCII characters (i.e. < 128), this will be
         equivalent to
      
           context = 4 * context1(p1) + context2(p2),
      
         where context1 is based on the previous byte in the following way:
      
           0  : non-ASCII control
           1  : \t, \n, \r
           2  : space
           3  : other punctuation
           4  : " '
           5  : %
           6  : ( < [ {
           7  : ) > ] }
           8  : , ; :
           9  : .
           10 : =
           11 : number
           12 : upper-case vowel
           13 : upper-case consonant
           14 : lower-case vowel
           15 : lower-case consonant
      
         and context2 is based on the second last byte:
      
           0 : control, space
           1 : punctuation
           2 : upper-case letter, number
           3 : lower-case letter
      
         If the last byte is ASCII, and the second last byte is not (in a valid UTF8
         stream it will be a continuation byte, value between 128 and 191), the
         context is the same as if the second last byte was an ASCII control or space.
      
         If the last byte is a UTF8 lead byte (value >= 192), then the next byte will
         be a continuation byte and the context id is 2 or 3 depending on the LSB of
         the last byte and to a lesser extent on the second last byte if it is ASCII.
      
         If the last byte is a UTF8 continuation byte, the second last byte can be:
           - continuation byte: the next byte is probably ASCII or lead byte (assuming
             4-byte UTF8 characters are rare) and the context id is 0 or 1.
           - lead byte (192 - 207): next byte is ASCII or lead byte, context is 0 or 1
           - lead byte (208 - 255): next byte is continuation byte, context is 2 or 3
      
         The possible value combinations of the previous two bytes, the range of
         context ids and the type of the next byte is summarized in the table below:
      
         |--------\-----------------------------------------------------------------|
         |         \                         Last byte                              |
         | Second   \---------------------------------------------------------------|
         | last byte \    ASCII            |   cont. byte        |   lead byte      |
         |            \   (0-127)          |   (128-191)         |   (192-)         |
         |=============|===================|=====================|==================|
         |  ASCII      | next: ASCII/lead  |  not valid          |  next: cont.     |
         |  (0-127)    | context: 4 - 63   |                     |  context: 2 - 3  |
         |-------------|-------------------|---------------------|------------------|
         |  cont. byte | next: ASCII/lead  |  next: ASCII/lead   |  next: cont.     |
         |  (128-191)  | context: 4 - 63   |  context: 0 - 1     |  context: 2 - 3  |
         |-------------|-------------------|---------------------|------------------|
         |  lead byte  | not valid         |  next: ASCII/lead   |  not valid       |
         |  (192-207)  |                   |  context: 0 - 1     |                  |
         |-------------|-------------------|---------------------|------------------|
         |  lead byte  | not valid         |  next: cont.        |  not valid       |
         |  (208-)     |                   |  context: 2 - 3     |                  |
         |-------------|-------------------|---------------------|------------------|
      
         The context id for the signed context mode is calculated as:
      
           context = (kContextLookup[512 + p1] << 3) | kContextLookup[512 + p2].
      
         For any context modeling modes, the context ids can be calculated by |-ing
         together two lookups from one table using context model dependent offsets:
      
           context = kContextLookup[offset1 + p1] | kContextLookup[offset2 + p2].
      
         where offset1 and offset2 are dependent on the context mode.
      */

      var CONTEXT_LSB6 = 0;
      var CONTEXT_MSB6 = 1;
      var CONTEXT_UTF8 = 2;
      var CONTEXT_SIGNED = 3;

      /* Common context lookup table for all context modes. */
      exports.lookup = new Uint8Array([/* CONTEXT_UTF8, last byte. */
      /* ASCII range. */
      0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 12, 16, 12, 12, 20, 12, 16, 24, 28, 12, 12, 32, 12, 36, 12, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 32, 32, 24, 40, 28, 12, 12, 48, 52, 52, 52, 48, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 24, 12, 28, 12, 12, 12, 56, 60, 60, 60, 56, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 24, 12, 28, 12, 0, /* UTF8 continuation byte range. */
      0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, /* UTF8 lead byte range. */
      2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, /* CONTEXT_UTF8 second last byte. */
      /* ASCII range. */
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, /* UTF8 continuation byte range. */
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /* UTF8 lead byte range. */
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, /* CONTEXT_SIGNED, second last byte. */
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, /* CONTEXT_SIGNED, last byte, same as the above values shifted by 3 bits. */
      0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 56, /* CONTEXT_LSB6, last byte. */
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, /* CONTEXT_MSB6, last byte. */
      0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 30, 30, 30, 30, 31, 31, 31, 31, 32, 32, 32, 32, 33, 33, 33, 33, 34, 34, 34, 34, 35, 35, 35, 35, 36, 36, 36, 36, 37, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 45, 45, 45, 45, 46, 46, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 49, 49, 49, 49, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 54, 54, 54, 54, 55, 55, 55, 55, 56, 56, 56, 56, 57, 57, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, /* CONTEXT_{M,L}SB6, second last byte, */
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      exports.lookupOffsets = new Uint16Array([/* CONTEXT_LSB6 */
      1024, 1536, /* CONTEXT_MSB6 */
      1280, 1536, /* CONTEXT_UTF8 */
      0, 256, /* CONTEXT_SIGNED */
      768, 512]);
    }, {}],
    3: [function (require, module, exports) {
      /* Copyright 2013 Google Inc. All Rights Reserved.
      
         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at
      
         http://www.apache.org/licenses/LICENSE-2.0
      
         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
      */

      var BrotliInput = require('./streams').BrotliInput;
      var BrotliOutput = require('./streams').BrotliOutput;
      var BrotliBitReader = require('./bit_reader');
      var BrotliDictionary = require('./dictionary');
      var HuffmanCode = require('./huffman').HuffmanCode;
      var BrotliBuildHuffmanTable = require('./huffman').BrotliBuildHuffmanTable;
      var Context = require('./context');
      var Prefix = require('./prefix');
      var Transform = require('./transform');
      var kDefaultCodeLength = 8;
      var kCodeLengthRepeatCode = 16;
      var kNumLiteralCodes = 256;
      var kNumInsertAndCopyCodes = 704;
      var kNumBlockLengthCodes = 26;
      var kLiteralContextBits = 6;
      var kDistanceContextBits = 2;
      var HUFFMAN_TABLE_BITS = 8;
      var HUFFMAN_TABLE_MASK = 0xff;
      /* Maximum possible Huffman table size for an alphabet size of 704, max code
       * length 15 and root table bits 8. */
      var HUFFMAN_MAX_TABLE_SIZE = 1080;
      var CODE_LENGTH_CODES = 18;
      var kCodeLengthCodeOrder = new Uint8Array([1, 2, 3, 4, 0, 5, 17, 6, 16, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      var NUM_DISTANCE_SHORT_CODES = 16;
      var kDistanceShortCodeIndexOffset = new Uint8Array([3, 2, 1, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2]);
      var kDistanceShortCodeValueOffset = new Int8Array([0, 0, 0, 0, -1, 1, -2, 2, -3, 3, -1, 1, -2, 2, -3, 3]);
      var kMaxHuffmanTableSize = new Uint16Array([256, 402, 436, 468, 500, 534, 566, 598, 630, 662, 694, 726, 758, 790, 822, 854, 886, 920, 952, 984, 1016, 1048, 1080]);
      function DecodeWindowBits(br) {
        var n;
        if (br.readBits(1) === 0) {
          return 16;
        }
        n = br.readBits(3);
        if (n > 0) {
          return 17 + n;
        }
        n = br.readBits(3);
        if (n > 0) {
          return 8 + n;
        }
        return 17;
      }

      /* Decodes a number in the range [0..255], by reading 1 - 11 bits. */
      function DecodeVarLenUint8(br) {
        if (br.readBits(1)) {
          var nbits = br.readBits(3);
          if (nbits === 0) {
            return 1;
          } else {
            return br.readBits(nbits) + (1 << nbits);
          }
        }
        return 0;
      }
      function MetaBlockLength() {
        this.meta_block_length = 0;
        this.input_end = 0;
        this.is_uncompressed = 0;
        this.is_metadata = false;
      }
      function DecodeMetaBlockLength(br) {
        var out = new MetaBlockLength();
        var size_nibbles;
        var size_bytes;
        var i;
        out.input_end = br.readBits(1);
        if (out.input_end && br.readBits(1)) {
          return out;
        }
        size_nibbles = br.readBits(2) + 4;
        if (size_nibbles === 7) {
          out.is_metadata = true;
          if (br.readBits(1) !== 0) throw new Error('Invalid reserved bit');
          size_bytes = br.readBits(2);
          if (size_bytes === 0) return out;
          for (i = 0; i < size_bytes; i++) {
            var next_byte = br.readBits(8);
            if (i + 1 === size_bytes && size_bytes > 1 && next_byte === 0) throw new Error('Invalid size byte');
            out.meta_block_length |= next_byte << i * 8;
          }
        } else {
          for (i = 0; i < size_nibbles; ++i) {
            var next_nibble = br.readBits(4);
            if (i + 1 === size_nibbles && size_nibbles > 4 && next_nibble === 0) throw new Error('Invalid size nibble');
            out.meta_block_length |= next_nibble << i * 4;
          }
        }
        ++out.meta_block_length;
        if (!out.input_end && !out.is_metadata) {
          out.is_uncompressed = br.readBits(1);
        }
        return out;
      }

      /* Decodes the next Huffman code from bit-stream. */
      function ReadSymbol(table, index, br) {
        var start_index = index;
        var nbits;
        br.fillBitWindow();
        index += br.val_ >>> br.bit_pos_ & HUFFMAN_TABLE_MASK;
        nbits = table[index].bits - HUFFMAN_TABLE_BITS;
        if (nbits > 0) {
          br.bit_pos_ += HUFFMAN_TABLE_BITS;
          index += table[index].value;
          index += br.val_ >>> br.bit_pos_ & (1 << nbits) - 1;
        }
        br.bit_pos_ += table[index].bits;
        return table[index].value;
      }
      function ReadHuffmanCodeLengths(code_length_code_lengths, num_symbols, code_lengths, br) {
        var symbol = 0;
        var prev_code_len = kDefaultCodeLength;
        var repeat = 0;
        var repeat_code_len = 0;
        var space = 32768;
        var table = [];
        for (var i = 0; i < 32; i++) table.push(new HuffmanCode(0, 0));
        BrotliBuildHuffmanTable(table, 0, 5, code_length_code_lengths, CODE_LENGTH_CODES);
        while (symbol < num_symbols && space > 0) {
          var p = 0;
          var code_len;
          br.readMoreInput();
          br.fillBitWindow();
          p += br.val_ >>> br.bit_pos_ & 31;
          br.bit_pos_ += table[p].bits;
          code_len = table[p].value & 0xff;
          if (code_len < kCodeLengthRepeatCode) {
            repeat = 0;
            code_lengths[symbol++] = code_len;
            if (code_len !== 0) {
              prev_code_len = code_len;
              space -= 32768 >> code_len;
            }
          } else {
            var extra_bits = code_len - 14;
            var old_repeat;
            var repeat_delta;
            var new_len = 0;
            if (code_len === kCodeLengthRepeatCode) {
              new_len = prev_code_len;
            }
            if (repeat_code_len !== new_len) {
              repeat = 0;
              repeat_code_len = new_len;
            }
            old_repeat = repeat;
            if (repeat > 0) {
              repeat -= 2;
              repeat <<= extra_bits;
            }
            repeat += br.readBits(extra_bits) + 3;
            repeat_delta = repeat - old_repeat;
            if (symbol + repeat_delta > num_symbols) {
              throw new Error('[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols');
            }
            for (var x = 0; x < repeat_delta; x++) code_lengths[symbol + x] = repeat_code_len;
            symbol += repeat_delta;
            if (repeat_code_len !== 0) {
              space -= repeat_delta << 15 - repeat_code_len;
            }
          }
        }
        if (space !== 0) {
          throw new Error("[ReadHuffmanCodeLengths] space = " + space);
        }
        for (; symbol < num_symbols; symbol++) code_lengths[symbol] = 0;
      }
      function ReadHuffmanCode(alphabet_size, tables, table, br) {
        var table_size = 0;
        var simple_code_or_skip;
        var code_lengths = new Uint8Array(alphabet_size);
        br.readMoreInput();

        /* simple_code_or_skip is used as follows:
           1 for simple code;
           0 for no skipping, 2 skips 2 code lengths, 3 skips 3 code lengths */
        simple_code_or_skip = br.readBits(2);
        if (simple_code_or_skip === 1) {
          /* Read symbols, codes & code lengths directly. */
          var i;
          var max_bits_counter = alphabet_size - 1;
          var max_bits = 0;
          var symbols = new Int32Array(4);
          var num_symbols = br.readBits(2) + 1;
          while (max_bits_counter) {
            max_bits_counter >>= 1;
            ++max_bits;
          }
          for (i = 0; i < num_symbols; ++i) {
            symbols[i] = br.readBits(max_bits) % alphabet_size;
            code_lengths[symbols[i]] = 2;
          }
          code_lengths[symbols[0]] = 1;
          switch (num_symbols) {
            case 1:
              break;
            case 3:
              if (symbols[0] === symbols[1] || symbols[0] === symbols[2] || symbols[1] === symbols[2]) {
                throw new Error('[ReadHuffmanCode] invalid symbols');
              }
              break;
            case 2:
              if (symbols[0] === symbols[1]) {
                throw new Error('[ReadHuffmanCode] invalid symbols');
              }
              code_lengths[symbols[1]] = 1;
              break;
            case 4:
              if (symbols[0] === symbols[1] || symbols[0] === symbols[2] || symbols[0] === symbols[3] || symbols[1] === symbols[2] || symbols[1] === symbols[3] || symbols[2] === symbols[3]) {
                throw new Error('[ReadHuffmanCode] invalid symbols');
              }
              if (br.readBits(1)) {
                code_lengths[symbols[2]] = 3;
                code_lengths[symbols[3]] = 3;
              } else {
                code_lengths[symbols[0]] = 2;
              }
              break;
          }
        } else {
          /* Decode Huffman-coded code lengths. */
          var i;
          var code_length_code_lengths = new Uint8Array(CODE_LENGTH_CODES);
          var space = 32;
          var num_codes = 0;
          /* Static Huffman code for the code length code lengths */
          var huff = [new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(3, 2), new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(4, 1), new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(3, 2), new HuffmanCode(2, 0), new HuffmanCode(2, 4), new HuffmanCode(2, 3), new HuffmanCode(4, 5)];
          for (i = simple_code_or_skip; i < CODE_LENGTH_CODES && space > 0; ++i) {
            var code_len_idx = kCodeLengthCodeOrder[i];
            var p = 0;
            var v;
            br.fillBitWindow();
            p += br.val_ >>> br.bit_pos_ & 15;
            br.bit_pos_ += huff[p].bits;
            v = huff[p].value;
            code_length_code_lengths[code_len_idx] = v;
            if (v !== 0) {
              space -= 32 >> v;
              ++num_codes;
            }
          }
          if (!(num_codes === 1 || space === 0)) throw new Error('[ReadHuffmanCode] invalid num_codes or space');
          ReadHuffmanCodeLengths(code_length_code_lengths, alphabet_size, code_lengths, br);
        }
        table_size = BrotliBuildHuffmanTable(tables, table, HUFFMAN_TABLE_BITS, code_lengths, alphabet_size);
        if (table_size === 0) {
          throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");
        }
        return table_size;
      }
      function ReadBlockLength(table, index, br) {
        var code;
        var nbits;
        code = ReadSymbol(table, index, br);
        nbits = Prefix.kBlockLengthPrefixCode[code].nbits;
        return Prefix.kBlockLengthPrefixCode[code].offset + br.readBits(nbits);
      }
      function TranslateShortCodes(code, ringbuffer, index) {
        var val;
        if (code < NUM_DISTANCE_SHORT_CODES) {
          index += kDistanceShortCodeIndexOffset[code];
          index &= 3;
          val = ringbuffer[index] + kDistanceShortCodeValueOffset[code];
        } else {
          val = code - NUM_DISTANCE_SHORT_CODES + 1;
        }
        return val;
      }
      function MoveToFront(v, index) {
        var value = v[index];
        var i = index;
        for (; i; --i) v[i] = v[i - 1];
        v[0] = value;
      }
      function InverseMoveToFrontTransform(v, v_len) {
        var mtf = new Uint8Array(256);
        var i;
        for (i = 0; i < 256; ++i) {
          mtf[i] = i;
        }
        for (i = 0; i < v_len; ++i) {
          var index = v[i];
          v[i] = mtf[index];
          if (index) MoveToFront(mtf, index);
        }
      }

      /* Contains a collection of huffman trees with the same alphabet size. */
      function HuffmanTreeGroup(alphabet_size, num_htrees) {
        this.alphabet_size = alphabet_size;
        this.num_htrees = num_htrees;
        this.codes = new Array(num_htrees + num_htrees * kMaxHuffmanTableSize[alphabet_size + 31 >>> 5]);
        this.htrees = new Uint32Array(num_htrees);
      }
      HuffmanTreeGroup.prototype.decode = function (br) {
        var i;
        var table_size;
        var next = 0;
        for (i = 0; i < this.num_htrees; ++i) {
          this.htrees[i] = next;
          table_size = ReadHuffmanCode(this.alphabet_size, this.codes, next, br);
          next += table_size;
        }
      };
      function DecodeContextMap(context_map_size, br) {
        var out = {
          num_htrees: null,
          context_map: null
        };
        var use_rle_for_zeros;
        var max_run_length_prefix = 0;
        var table;
        var i;
        br.readMoreInput();
        var num_htrees = out.num_htrees = DecodeVarLenUint8(br) + 1;
        var context_map = out.context_map = new Uint8Array(context_map_size);
        if (num_htrees <= 1) {
          return out;
        }
        use_rle_for_zeros = br.readBits(1);
        if (use_rle_for_zeros) {
          max_run_length_prefix = br.readBits(4) + 1;
        }
        table = [];
        for (i = 0; i < HUFFMAN_MAX_TABLE_SIZE; i++) {
          table[i] = new HuffmanCode(0, 0);
        }
        ReadHuffmanCode(num_htrees + max_run_length_prefix, table, 0, br);
        for (i = 0; i < context_map_size;) {
          var code;
          br.readMoreInput();
          code = ReadSymbol(table, 0, br);
          if (code === 0) {
            context_map[i] = 0;
            ++i;
          } else if (code <= max_run_length_prefix) {
            var reps = 1 + (1 << code) + br.readBits(code);
            while (--reps) {
              if (i >= context_map_size) {
                throw new Error("[DecodeContextMap] i >= context_map_size");
              }
              context_map[i] = 0;
              ++i;
            }
          } else {
            context_map[i] = code - max_run_length_prefix;
            ++i;
          }
        }
        if (br.readBits(1)) {
          InverseMoveToFrontTransform(context_map, context_map_size);
        }
        return out;
      }
      function DecodeBlockType(max_block_type, trees, tree_type, block_types, ringbuffers, indexes, br) {
        var ringbuffer = tree_type * 2;
        var index = tree_type;
        var type_code = ReadSymbol(trees, tree_type * HUFFMAN_MAX_TABLE_SIZE, br);
        var block_type;
        if (type_code === 0) {
          block_type = ringbuffers[ringbuffer + (indexes[index] & 1)];
        } else if (type_code === 1) {
          block_type = ringbuffers[ringbuffer + (indexes[index] - 1 & 1)] + 1;
        } else {
          block_type = type_code - 2;
        }
        if (block_type >= max_block_type) {
          block_type -= max_block_type;
        }
        block_types[tree_type] = block_type;
        ringbuffers[ringbuffer + (indexes[index] & 1)] = block_type;
        ++indexes[index];
      }
      function CopyUncompressedBlockToOutput(output, len, pos, ringbuffer, ringbuffer_mask, br) {
        var rb_size = ringbuffer_mask + 1;
        var rb_pos = pos & ringbuffer_mask;
        var br_pos = br.pos_ & BrotliBitReader.IBUF_MASK;
        var nbytes;

        /* For short lengths copy byte-by-byte */
        if (len < 8 || br.bit_pos_ + (len << 3) < br.bit_end_pos_) {
          while (len-- > 0) {
            br.readMoreInput();
            ringbuffer[rb_pos++] = br.readBits(8);
            if (rb_pos === rb_size) {
              output.write(ringbuffer, rb_size);
              rb_pos = 0;
            }
          }
          return;
        }
        if (br.bit_end_pos_ < 32) {
          throw new Error('[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32');
        }

        /* Copy remaining 0-4 bytes from br.val_ to ringbuffer. */
        while (br.bit_pos_ < 32) {
          ringbuffer[rb_pos] = br.val_ >>> br.bit_pos_;
          br.bit_pos_ += 8;
          ++rb_pos;
          --len;
        }

        /* Copy remaining bytes from br.buf_ to ringbuffer. */
        nbytes = br.bit_end_pos_ - br.bit_pos_ >> 3;
        if (br_pos + nbytes > BrotliBitReader.IBUF_MASK) {
          var tail = BrotliBitReader.IBUF_MASK + 1 - br_pos;
          for (var x = 0; x < tail; x++) ringbuffer[rb_pos + x] = br.buf_[br_pos + x];
          nbytes -= tail;
          rb_pos += tail;
          len -= tail;
          br_pos = 0;
        }
        for (var x = 0; x < nbytes; x++) ringbuffer[rb_pos + x] = br.buf_[br_pos + x];
        rb_pos += nbytes;
        len -= nbytes;

        /* If we wrote past the logical end of the ringbuffer, copy the tail of the
           ringbuffer to its beginning and flush the ringbuffer to the output. */
        if (rb_pos >= rb_size) {
          output.write(ringbuffer, rb_size);
          rb_pos -= rb_size;
          for (var x = 0; x < rb_pos; x++) ringbuffer[x] = ringbuffer[rb_size + x];
        }

        /* If we have more to copy than the remaining size of the ringbuffer, then we
           first fill the ringbuffer from the input and then flush the ringbuffer to
           the output */
        while (rb_pos + len >= rb_size) {
          nbytes = rb_size - rb_pos;
          if (br.input_.read(ringbuffer, rb_pos, nbytes) < nbytes) {
            throw new Error('[CopyUncompressedBlockToOutput] not enough bytes');
          }
          output.write(ringbuffer, rb_size);
          len -= nbytes;
          rb_pos = 0;
        }

        /* Copy straight from the input onto the ringbuffer. The ringbuffer will be
           flushed to the output at a later time. */
        if (br.input_.read(ringbuffer, rb_pos, len) < len) {
          throw new Error('[CopyUncompressedBlockToOutput] not enough bytes');
        }

        /* Restore the state of the bit reader. */
        br.reset();
      }

      /* Advances the bit reader position to the next byte boundary and verifies
         that any skipped bits are set to zero. */
      function JumpToByteBoundary(br) {
        var new_bit_pos = br.bit_pos_ + 7 & ~7;
        var pad_bits = br.readBits(new_bit_pos - br.bit_pos_);
        return pad_bits == 0;
      }
      function BrotliDecompressedSize(buffer) {
        var input = new BrotliInput(buffer);
        var br = new BrotliBitReader(input);
        DecodeWindowBits(br);
        var out = DecodeMetaBlockLength(br);
        return out.meta_block_length;
      }
      exports.BrotliDecompressedSize = BrotliDecompressedSize;
      function BrotliDecompressBuffer(buffer, output_size) {
        var input = new BrotliInput(buffer);
        if (output_size == null) {
          output_size = BrotliDecompressedSize(buffer);
        }
        var output_buffer = new Uint8Array(output_size);
        var output = new BrotliOutput(output_buffer);
        BrotliDecompress(input, output);
        if (output.pos < output.buffer.length) {
          output.buffer = output.buffer.subarray(0, output.pos);
        }
        return output.buffer;
      }
      exports.BrotliDecompressBuffer = BrotliDecompressBuffer;
      function BrotliDecompress(input, output) {
        var i;
        var pos = 0;
        var input_end = 0;
        var window_bits = 0;
        var max_backward_distance;
        var max_distance = 0;
        var ringbuffer_size;
        var ringbuffer_mask;
        var ringbuffer;
        var ringbuffer_end;
        /* This ring buffer holds a few past copy distances that will be used by */
        /* some special distance codes. */
        var dist_rb = [16, 15, 11, 4];
        var dist_rb_idx = 0;
        /* The previous 2 bytes used for context. */
        var prev_byte1 = 0;
        var prev_byte2 = 0;
        var hgroup = [new HuffmanTreeGroup(0, 0), new HuffmanTreeGroup(0, 0), new HuffmanTreeGroup(0, 0)];
        var block_type_trees;
        var block_len_trees;
        var br;

        /* We need the slack region for the following reasons:
             - always doing two 8-byte copies for fast backward copying
             - transforms
             - flushing the input ringbuffer when decoding uncompressed blocks */
        var kRingBufferWriteAheadSlack = 128 + BrotliBitReader.READ_SIZE;
        br = new BrotliBitReader(input);

        /* Decode window size. */
        window_bits = DecodeWindowBits(br);
        max_backward_distance = (1 << window_bits) - 16;
        ringbuffer_size = 1 << window_bits;
        ringbuffer_mask = ringbuffer_size - 1;
        ringbuffer = new Uint8Array(ringbuffer_size + kRingBufferWriteAheadSlack + BrotliDictionary.maxDictionaryWordLength);
        ringbuffer_end = ringbuffer_size;
        block_type_trees = [];
        block_len_trees = [];
        for (var x = 0; x < 3 * HUFFMAN_MAX_TABLE_SIZE; x++) {
          block_type_trees[x] = new HuffmanCode(0, 0);
          block_len_trees[x] = new HuffmanCode(0, 0);
        }
        while (!input_end) {
          var meta_block_remaining_len = 0;
          var is_uncompressed;
          var block_length = [1 << 28, 1 << 28, 1 << 28];
          var block_type = [0];
          var num_block_types = [1, 1, 1];
          var block_type_rb = [0, 1, 0, 1, 0, 1];
          var block_type_rb_index = [0];
          var distance_postfix_bits;
          var num_direct_distance_codes;
          var distance_postfix_mask;
          var num_distance_codes;
          var context_map = null;
          var context_modes = null;
          var num_literal_htrees;
          var dist_context_map = null;
          var num_dist_htrees;
          var context_offset = 0;
          var context_map_slice = null;
          var literal_htree_index = 0;
          var dist_context_offset = 0;
          var dist_context_map_slice = null;
          var dist_htree_index = 0;
          var context_lookup_offset1 = 0;
          var context_lookup_offset2 = 0;
          var context_mode;
          var htree_command;
          for (i = 0; i < 3; ++i) {
            hgroup[i].codes = null;
            hgroup[i].htrees = null;
          }
          br.readMoreInput();
          var _out = DecodeMetaBlockLength(br);
          meta_block_remaining_len = _out.meta_block_length;
          if (pos + meta_block_remaining_len > output.buffer.length) {
            /* We need to grow the output buffer to fit the additional data. */
            var tmp = new Uint8Array(pos + meta_block_remaining_len);
            tmp.set(output.buffer);
            output.buffer = tmp;
          }
          input_end = _out.input_end;
          is_uncompressed = _out.is_uncompressed;
          if (_out.is_metadata) {
            JumpToByteBoundary(br);
            for (; meta_block_remaining_len > 0; --meta_block_remaining_len) {
              br.readMoreInput();
              /* Read one byte and ignore it. */
              br.readBits(8);
            }
            continue;
          }
          if (meta_block_remaining_len === 0) {
            continue;
          }
          if (is_uncompressed) {
            br.bit_pos_ = br.bit_pos_ + 7 & ~7;
            CopyUncompressedBlockToOutput(output, meta_block_remaining_len, pos, ringbuffer, ringbuffer_mask, br);
            pos += meta_block_remaining_len;
            continue;
          }
          for (i = 0; i < 3; ++i) {
            num_block_types[i] = DecodeVarLenUint8(br) + 1;
            if (num_block_types[i] >= 2) {
              ReadHuffmanCode(num_block_types[i] + 2, block_type_trees, i * HUFFMAN_MAX_TABLE_SIZE, br);
              ReadHuffmanCode(kNumBlockLengthCodes, block_len_trees, i * HUFFMAN_MAX_TABLE_SIZE, br);
              block_length[i] = ReadBlockLength(block_len_trees, i * HUFFMAN_MAX_TABLE_SIZE, br);
              block_type_rb_index[i] = 1;
            }
          }
          br.readMoreInput();
          distance_postfix_bits = br.readBits(2);
          num_direct_distance_codes = NUM_DISTANCE_SHORT_CODES + (br.readBits(4) << distance_postfix_bits);
          distance_postfix_mask = (1 << distance_postfix_bits) - 1;
          num_distance_codes = num_direct_distance_codes + (48 << distance_postfix_bits);
          context_modes = new Uint8Array(num_block_types[0]);
          for (i = 0; i < num_block_types[0]; ++i) {
            br.readMoreInput();
            context_modes[i] = br.readBits(2) << 1;
          }
          var _o1 = DecodeContextMap(num_block_types[0] << kLiteralContextBits, br);
          num_literal_htrees = _o1.num_htrees;
          context_map = _o1.context_map;
          var _o2 = DecodeContextMap(num_block_types[2] << kDistanceContextBits, br);
          num_dist_htrees = _o2.num_htrees;
          dist_context_map = _o2.context_map;
          hgroup[0] = new HuffmanTreeGroup(kNumLiteralCodes, num_literal_htrees);
          hgroup[1] = new HuffmanTreeGroup(kNumInsertAndCopyCodes, num_block_types[1]);
          hgroup[2] = new HuffmanTreeGroup(num_distance_codes, num_dist_htrees);
          for (i = 0; i < 3; ++i) {
            hgroup[i].decode(br);
          }
          context_map_slice = 0;
          dist_context_map_slice = 0;
          context_mode = context_modes[block_type[0]];
          context_lookup_offset1 = Context.lookupOffsets[context_mode];
          context_lookup_offset2 = Context.lookupOffsets[context_mode + 1];
          htree_command = hgroup[1].htrees[0];
          while (meta_block_remaining_len > 0) {
            var cmd_code;
            var range_idx;
            var insert_code;
            var copy_code;
            var insert_length;
            var copy_length;
            var distance_code;
            var distance;
            var context;
            var j;
            var copy_dst;
            br.readMoreInput();
            if (block_length[1] === 0) {
              DecodeBlockType(num_block_types[1], block_type_trees, 1, block_type, block_type_rb, block_type_rb_index, br);
              block_length[1] = ReadBlockLength(block_len_trees, HUFFMAN_MAX_TABLE_SIZE, br);
              htree_command = hgroup[1].htrees[block_type[1]];
            }
            --block_length[1];
            cmd_code = ReadSymbol(hgroup[1].codes, htree_command, br);
            range_idx = cmd_code >> 6;
            if (range_idx >= 2) {
              range_idx -= 2;
              distance_code = -1;
            } else {
              distance_code = 0;
            }
            insert_code = Prefix.kInsertRangeLut[range_idx] + (cmd_code >> 3 & 7);
            copy_code = Prefix.kCopyRangeLut[range_idx] + (cmd_code & 7);
            insert_length = Prefix.kInsertLengthPrefixCode[insert_code].offset + br.readBits(Prefix.kInsertLengthPrefixCode[insert_code].nbits);
            copy_length = Prefix.kCopyLengthPrefixCode[copy_code].offset + br.readBits(Prefix.kCopyLengthPrefixCode[copy_code].nbits);
            prev_byte1 = ringbuffer[pos - 1 & ringbuffer_mask];
            prev_byte2 = ringbuffer[pos - 2 & ringbuffer_mask];
            for (j = 0; j < insert_length; ++j) {
              br.readMoreInput();
              if (block_length[0] === 0) {
                DecodeBlockType(num_block_types[0], block_type_trees, 0, block_type, block_type_rb, block_type_rb_index, br);
                block_length[0] = ReadBlockLength(block_len_trees, 0, br);
                context_offset = block_type[0] << kLiteralContextBits;
                context_map_slice = context_offset;
                context_mode = context_modes[block_type[0]];
                context_lookup_offset1 = Context.lookupOffsets[context_mode];
                context_lookup_offset2 = Context.lookupOffsets[context_mode + 1];
              }
              context = Context.lookup[context_lookup_offset1 + prev_byte1] | Context.lookup[context_lookup_offset2 + prev_byte2];
              literal_htree_index = context_map[context_map_slice + context];
              --block_length[0];
              prev_byte2 = prev_byte1;
              prev_byte1 = ReadSymbol(hgroup[0].codes, hgroup[0].htrees[literal_htree_index], br);
              ringbuffer[pos & ringbuffer_mask] = prev_byte1;
              if ((pos & ringbuffer_mask) === ringbuffer_mask) {
                output.write(ringbuffer, ringbuffer_size);
              }
              ++pos;
            }
            meta_block_remaining_len -= insert_length;
            if (meta_block_remaining_len <= 0) break;
            if (distance_code < 0) {
              var context;
              br.readMoreInput();
              if (block_length[2] === 0) {
                DecodeBlockType(num_block_types[2], block_type_trees, 2, block_type, block_type_rb, block_type_rb_index, br);
                block_length[2] = ReadBlockLength(block_len_trees, 2 * HUFFMAN_MAX_TABLE_SIZE, br);
                dist_context_offset = block_type[2] << kDistanceContextBits;
                dist_context_map_slice = dist_context_offset;
              }
              --block_length[2];
              context = (copy_length > 4 ? 3 : copy_length - 2) & 0xff;
              dist_htree_index = dist_context_map[dist_context_map_slice + context];
              distance_code = ReadSymbol(hgroup[2].codes, hgroup[2].htrees[dist_htree_index], br);
              if (distance_code >= num_direct_distance_codes) {
                var nbits;
                var postfix;
                var offset;
                distance_code -= num_direct_distance_codes;
                postfix = distance_code & distance_postfix_mask;
                distance_code >>= distance_postfix_bits;
                nbits = (distance_code >> 1) + 1;
                offset = (2 + (distance_code & 1) << nbits) - 4;
                distance_code = num_direct_distance_codes + (offset + br.readBits(nbits) << distance_postfix_bits) + postfix;
              }
            }

            /* Convert the distance code to the actual distance by possibly looking */
            /* up past distnaces from the ringbuffer. */
            distance = TranslateShortCodes(distance_code, dist_rb, dist_rb_idx);
            if (distance < 0) {
              throw new Error('[BrotliDecompress] invalid distance');
            }
            if (pos < max_backward_distance && max_distance !== max_backward_distance) {
              max_distance = pos;
            } else {
              max_distance = max_backward_distance;
            }
            copy_dst = pos & ringbuffer_mask;
            if (distance > max_distance) {
              if (copy_length >= BrotliDictionary.minDictionaryWordLength && copy_length <= BrotliDictionary.maxDictionaryWordLength) {
                var offset = BrotliDictionary.offsetsByLength[copy_length];
                var word_id = distance - max_distance - 1;
                var shift = BrotliDictionary.sizeBitsByLength[copy_length];
                var mask = (1 << shift) - 1;
                var word_idx = word_id & mask;
                var transform_idx = word_id >> shift;
                offset += word_idx * copy_length;
                if (transform_idx < Transform.kNumTransforms) {
                  var len = Transform.transformDictionaryWord(ringbuffer, copy_dst, offset, copy_length, transform_idx);
                  copy_dst += len;
                  pos += len;
                  meta_block_remaining_len -= len;
                  if (copy_dst >= ringbuffer_end) {
                    output.write(ringbuffer, ringbuffer_size);
                    for (var _x = 0; _x < copy_dst - ringbuffer_end; _x++) ringbuffer[_x] = ringbuffer[ringbuffer_end + _x];
                  }
                } else {
                  throw new Error("Invalid backward reference. pos: " + pos + " distance: " + distance + " len: " + copy_length + " bytes left: " + meta_block_remaining_len);
                }
              } else {
                throw new Error("Invalid backward reference. pos: " + pos + " distance: " + distance + " len: " + copy_length + " bytes left: " + meta_block_remaining_len);
              }
            } else {
              if (distance_code > 0) {
                dist_rb[dist_rb_idx & 3] = distance;
                ++dist_rb_idx;
              }
              if (copy_length > meta_block_remaining_len) {
                throw new Error("Invalid backward reference. pos: " + pos + " distance: " + distance + " len: " + copy_length + " bytes left: " + meta_block_remaining_len);
              }
              for (j = 0; j < copy_length; ++j) {
                ringbuffer[pos & ringbuffer_mask] = ringbuffer[pos - distance & ringbuffer_mask];
                if ((pos & ringbuffer_mask) === ringbuffer_mask) {
                  output.write(ringbuffer, ringbuffer_size);
                }
                ++pos;
                --meta_block_remaining_len;
              }
            }

            /* When we get here, we must have inserted at least one literal and */
            /* made a copy of at least length two, therefore accessing the last 2 */
            /* bytes is valid. */
            prev_byte1 = ringbuffer[pos - 1 & ringbuffer_mask];
            prev_byte2 = ringbuffer[pos - 2 & ringbuffer_mask];
          }

          /* Protect pos from overflow, wrap it around at every GB of input data */
          pos &= 0x3fffffff;
        }
        output.write(ringbuffer, pos & ringbuffer_mask);
      }
      exports.BrotliDecompress = BrotliDecompress;
      BrotliDictionary.init();
    }, {
      "./bit_reader": 1,
      "./context": 2,
      "./dictionary": 6,
      "./huffman": 7,
      "./prefix": 9,
      "./streams": 10,
      "./transform": 11
    }],
    4: [function (require, module, exports) {
      var base64 = require('base64-js');
      //var fs = require('fs');

      /**
       * The normal dictionary-data.js is quite large, which makes it
       * unsuitable for browser usage. In order to make it smaller,
       * we read dictionary.bin, which is a compressed version of
       * the dictionary, and on initial load, Brotli decompresses
       * it's own dictionary. 😜
       */
      exports.init = function () {
        var BrotliDecompressBuffer = require('./decode').BrotliDecompressBuffer;
        var compressed = base64.toByteArray(require('./dictionary.bin.js'));
        return BrotliDecompressBuffer(compressed);
      };
    }, {
      "./decode": 3,
      "./dictionary.bin.js": 5,
      "base64-js": 8
    }],
    5: [function (require, module, exports) {
      module.exports = "W5/fcQLn5gKf2XUbAiQ1XULX+TZz6ADToDsgqk6qVfeC0e4m6OO2wcQ1J76ZBVRV1fRkEsdu//62zQsFEZWSTCnMhcsQKlS2qOhuVYYMGCkV0fXWEoMFbESXrKEZ9wdUEsyw9g4bJlEt1Y6oVMxMRTEVbCIwZzJzboK5j8m4YH02qgXYhv1V+PM435sLVxyHJihaJREEhZGqL03txGFQLm76caGO/ovxKvzCby/3vMTtX/459f0igi7WutnKiMQ6wODSoRh/8Lx1V3Q99MvKtwB6bHdERYRY0hStJoMjNeTsNX7bn+Y7e4EQ3bf8xBc7L0BsyfFPK43dGSXpL6clYC/I328h54/VYrQ5i0648FgbGtl837svJ35L3Mot/+nPlNpWgKx1gGXQYqX6n+bbZ7wuyCHKcUok12Xjqub7NXZGzqBx0SD+uziNf87t7ve42jxSKQoW3nyxVrWIGlFShhCKxjpZZ5MeGna0+lBkk+kaN8F9qFBAFgEogyMBdcX/T1W/WnMOi/7ycWUQloEBKGeC48MkiwqJkJO+12eQiOFHMmck6q/IjWW3RZlany23TBm+cNr/84/oi5GGmGBZWrZ6j+zykVozz5fT/QH/Da6WTbZYYPynVNO7kxzuNN2kxKKWche5WveitPKAecB8YcAHz/+zXLjcLzkdDSktNIDwZE9J9X+tto43oJy65wApM3mDzYtCwX9lM+N5VR3kXYo0Z3t0TtXfgBFg7gU8oN0Dgl7fZlUbhNll+0uuohRVKjrEd8egrSndy5/Tgd2gqjA4CAVuC7ESUmL3DZoGnfhQV8uwnpi8EGvAVVsowNRxPudck7+oqAUDkwZopWqFnW1riss0t1z6iCISVKreYGNvQcXv+1L9+jbP8cd/dPUiqBso2q+7ZyFBvENCkkVr44iyPbtOoOoCecWsiuqMSML5lv+vN5MzUr+Dnh73G7Q1YnRYJVYXHRJaNAOByiaK6CusgFdBPE40r0rvqXV7tksKO2DrHYXBTv8P5ysqxEx8VDXUDDqkPH6NNOV/a2WH8zlkXRELSa8P+heNyJBBP7PgsG1EtWtNef6/i+lcayzQwQCsduidpbKfhWUDgAEmyhGu/zVTacI6RS0zTABrOYueemnVa19u9fT23N/Ta6RvTpof5DWygqreCqrDAgM4LID1+1T/taU6yTFVLqXOv+/MuQOFnaF8vLMKD7tKWDoBdALgxF33zQccCcdHx8fKIVdW69O7qHtXpeGr9jbbpFA+qRMWr5hp0s67FPc7HAiLV0g0/peZlW7hJPYEhZyhpSwahnf93/tZgfqZWXFdmdXBzqxGHLrQKxoAY6fRoBhgCRPmmGueYZ5JexTVDKUIXzkG/fqp/0U3hAgQdJ9zumutK6nqWbaqvm1pgu03IYR+G+8s0jDBBz8cApZFSBeuWasyqo2OMDKAZCozS+GWSvL/HsE9rHxooe17U3s/lTE+VZAk4j3dp6uIGaC0JMiqR5CUsabPyM0dOYDR7Ea7ip4USZlya38YfPtvrX/tBlhHilj55nZ1nfN24AOAi9BVtz/Mbn8AEDJCqJgsVUa6nQnSxv2Fs7l/NlCzpfYEjmPrNyib/+t0ei2eEMjvNhLkHCZlci4WhBe7ePZTmzYqlY9+1pxtS4GB+5lM1BHT9tS270EWUDYFq1I0yY/fNiAk4bk9yBgmef/f2k6AlYQZHsNFnW8wBQxCd68iWv7/35bXfz3JZmfGligWAKRjIs3IpzxQ27vAglHSiOzCYzJ9L9A1CdiyFvyR66ucA4jKifu5ehwER26yV7HjKqn5Mfozo7Coxxt8LWWPT47BeMxX8p0Pjb7hZn+6bw7z3Lw+7653j5sI8CLu5kThpMlj1m4c2ch3jGcP1FsT13vuK3qjecKTZk2kHcOZY40UX+qdaxstZqsqQqgXz+QGF99ZJLqr3VYu4aecl1Ab5GmqS8k/GV5b95zxQ5d4EfXUJ6kTS/CXF/aiqKDOT1T7Jz5z0PwDUcwr9clLN1OJGCiKfqvah+h3XzrBOiLOW8wvn8gW6qE8vPxi+Efv+UH55T7PQFVMh6cZ1pZQlzJpKZ7P7uWvwPGJ6DTlR6wbyj3Iv2HyefnRo/dv7dNx+qaa0N38iBsR++Uil7Wd4afwDNsrzDAK4fXZwvEY/jdKuIKXlfrQd2C39dW7ntnRbIp9OtGy9pPBn/V2ASoi/2UJZfS+xuGLH8bnLuPlzdTNS6zdyk8Dt/h6sfOW5myxh1f+zf3zZ3MX/mO9cQPp5pOx967ZA6/pqHvclNfnUFF+rq+Vd7alKr6KWPcIDhpn6v2K6NlUu6LrKo8b/pYpU/Gazfvtwhn7tEOUuXht5rUJdSf6sLjYf0VTYDgwJ81yaqKTUYej/tbHckSRb/HZicwGJqh1mAHB/IuNs9dc9yuvF3D5Xocm3elWFdq5oEy70dYFit79yaLiNjPj5UUcVmZUVhQEhW5V2Z6Cm4HVH/R8qlamRYwBileuh07CbEce3TXa2JmXWBf+ozt319psboobeZhVnwhMZzOeQJzhpTDbP71Tv8HuZxxUI/+ma3XW6DFDDs4+qmpERwHGBd2edxwUKlODRdUWZ/g0GOezrbzOZauFMai4QU6GVHV6aPNBiBndHSsV4IzpvUiiYyg6OyyrL4Dj5q/Lw3N5kAwftEVl9rNd7Jk5PDij2hTH6wIXnsyXkKePxbmHYgC8A6an5Fob/KH5GtC0l4eFso+VpxedtJHdHpNm+Bvy4C79yVOkrZsLrQ3OHCeB0Ra+kBIRldUGlDCEmq2RwXnfyh6Dz+alk6eftI2n6sastRrGwbwszBeDRS/Fa/KwRJkCzTsLr/JCs5hOPE/MPLYdZ1F1fv7D+VmysX6NpOC8aU9F4Qs6HvDyUy9PvFGDKZ/P5101TYHFl8pjj6wm/qyS75etZhhfg0UEL4OYmHk6m6dO192AzoIyPSV9QedDA4Ml23rRbqxMPMxf7FJnDc5FTElVS/PyqgePzmwVZ26NWhRDQ+oaT7ly7ell4s3DypS1s0g+tOr7XHrrkZj9+x/mJBttrLx98lFIaRZzHz4aC7r52/JQ4VjHahY2/YVXZn/QC2ztQb/sY3uRlyc5vQS8nLPGT/n27495i8HPA152z7Fh5aFpyn1GPJKHuPL8Iw94DuW3KjkURAWZXn4EQy89xiKEHN1mk/tkM4gYDBxwNoYvRfE6LFqsxWJtPrDGbsnLMap3Ka3MUoytW0cvieozOmdERmhcqzG+3HmZv2yZeiIeQTKGdRT4HHNxekm1tY+/n06rGmFleqLscSERzctTKM6G9P0Pc1RmVvrascIxaO1CQCiYPE15bD7c3xSeW7gXxYjgxcrUlcbIvO0r+Yplhx0kTt3qafDOmFyMjgGxXu73rddMHpV1wMubyAGcf/v5dLr5P72Ta9lBF+fzMJrMycwv+9vnU3ANIl1cH9tfW7af8u0/HG0vV47jNFXzFTtaha1xvze/s8KMtCYucXc1nzfd/MQydUXn/b72RBt5wO/3jRcMH9BdhC/yctKBIveRYPrNpDWqBsO8VMmP+WvRaOcA4zRMR1PvSoO92rS7pYEv+fZfEfTMzEdM+6X5tLlyxExhqLRkms5EuLovLfx66de5fL2/yX02H52FPVwahrPqmN/E0oVXnsCKhbi/yRxX83nRbUKWhzYceXOntfuXn51NszJ6MO73pQf5Pl4in3ec4JU8hF7ppV34+mm9r1LY0ee/i1O1wpd8+zfLztE0cqBxggiBi5Bu95v9l3r9r/U5hweLn+TbfxowrWDqdJauKd8+q/dH8sbPkc9ttuyO94f7/XK/nHX46MPFLEb5qQlNPvhJ50/59t9ft3LXu7uVaWaO2bDrDCnRSzZyWvFKxO1+vT8MwwunR3bX0CkfPjqb4K9O19tn5X50PvmYpEwHtiW9WtzuV/s76B1zvLLNkViNd8ySxIl/3orfqP90TyTGaf7/rx8jQzeHJXdmh/N6YDvbvmTBwCdxfEQ1NcL6wNMdSIXNq7b1EUzRy1/Axsyk5p22GMG1b+GxFgbHErZh92wuvco0AuOLXct9hvw2nw/LqIcDRRmJmmZzcgUa7JpM/WV/S9IUfbF56TL2orzqwebdRD8nIYNJ41D/hz37Fo11p2Y21wzPcn713qVGhqtevStYfGH4n69OEJtPvbbLYWvscDqc3Hgnu166+tAyLnxrX0Y5zoYjV++1sI7t5kMr02KT/+uwtkc+rZLOf/qn/s3nYCf13Dg8/sB2diJgjGqjQ+TLhxbzyue2Ob7X6/9lUwW7a+lbznHzOYy8LKW1C/uRPbQY3KW/0gO9LXunHLvPL97afba9bFtc9hmz7GAttjVYlCvQAiOwAk/gC5+hkLEs6tr3AZKxLJtOEwk2dLxTYWsIB/j/ToWtIWzo906FrSG8iaqqqqqqiIiIiAgzMzMzNz+AyK+01/zi8n8S+Y1MjoRaQ80WU/G8MBlO+53VPXANrWm4wzGUVZUjjBJZVdhpcfkjsmcWaO+UEldXi1e+zq+HOsCpknYshuh8pOLISJun7TN0EIGW2xTnlOImeecnoGW4raxe2G1T3HEvfYUYMhG+gAFOAwh5nK8mZhwJMmN7r224QVsNFvZ87Z0qatvknklyPDK3Hy45PgVKXji52Wen4d4PlFVVYGnNap+fSpFbK90rYnhUc6n91Q3AY9E0tJOFrcfZtm/491XbcG/jsViUPPX76qmeuiz+qY1Hk7/1VPM405zWVuoheLUimpWYdVzCmUdKHebMdzgrYrb8mL2eeLSnRWHdonfZa8RsOU9F37w+591l5FLYHiOqWeHtE/lWrBHcRKp3uhtr8yXm8LU/5ms+NM6ZKsqu90cFZ4o58+k4rdrtB97NADFbwmEG7lXqvirhOTOqU14xuUF2myIjURcPHrPOQ4lmM3PeMg7bUuk0nnZi67bXsU6H8lhqIo8TaOrEafCO1ARK9PjC0QOoq2BxmMdgYB9G/lIb9++fqNJ2s7BHGFyBNmZAR8J3KCo012ikaSP8BCrf6VI0X5xdnbhHIO+B5rbOyB54zXkzfObyJ4ecwxfqBJMLFc7m59rNcw7hoHnFZ0b00zee+gTqvjm61Pb4xn0kcDX4jvHM0rBXZypG3DCKnD/Waa/ZtHmtFPgO5eETx+k7RrVg3aSwm2YoNXnCs3XPQDhNn+Fia6IlOOuIG6VJH7TP6ava26ehKHQa2T4N0tcZ9dPCGo3ZdnNltsHQbeYt5vPnJezV/cAeNypdml1vCHI8M81nSRP5Qi2+mI8v/sxiZru9187nRtp3f/42NemcONa+4eVC3PCZzc88aZh851CqSsshe70uPxeN/dmYwlwb3trwMrN1Gq8jbnApcVDx/yDPeYs5/7r62tsQ6lLg+DiFXTEhzR9dHqv0iT4tgj825W+H3XiRUNUZT2kR9Ri0+lp+UM3iQtS8uOE23Ly4KYtvqH13jghUntJRAewuzNLDXp8RxdcaA3cMY6TO2IeSFRXezeWIjCqyhsUdMYuCgYTZSKpBype1zRfq8FshvfBPc6BAQWl7/QxIDp3VGo1J3vn42OEs3qznws+YLRXbymyB19a9XBx6n/owcyxlEYyFWCi+kG9F+EyD/4yn80+agaZ9P7ay2Dny99aK2o91FkfEOY8hBwyfi5uwx2y5SaHmG+oq/zl1FX/8irOf8Y3vAcX/6uLP6A6nvMO24edSGPjQc827Rw2atX+z2bKq0CmW9mOtYnr5/AfDa1ZfPaXnKtlWborup7QYx+Or2uWb+N3N//2+yDcXMqIJdf55xl7/vsj4WoPPlxLxtVrkJ4w/tTe3mLdATOOYwxcq52w5Wxz5MbPdVs5O8/lhfE7dPj0bIiPQ3QV0iqm4m3YX8hRfc6jQ3fWepevMqUDJd86Z4vwM40CWHnn+WphsGHfieF02D3tmZvpWD+kBpNCFcLnZhcmmrhpGzzbdA+sQ1ar18OJD87IOKOFoRNznaHPNHUfUNhvY1iU+uhvEvpKHaUn3qK3exVVyX4joipp3um7FmYJWmA+WbIDshRpbVRx5/nqstCgy87FGbfVB8yDGCqS+2qCsnRwnSAN6zgzxfdB2nBT/vZ4/6uxb6oH8b4VBRxiIB93wLa47hG3w2SL/2Z27yOXJFwZpSJaBYyvajA7vRRYNKqljXKpt/CFD/tSMr18DKKbwB0xggBePatl1nki0yvqW5zchlyZmJ0OTxJ3D+fsYJs/mxYN5+Le5oagtcl+YsVvy8kSjI2YGvGjvmpkRS9W2dtXqWnVuxUhURm1lKtou/hdEq19VBp9OjGvHEQSmrpuf2R24mXGheil8KeiANY8fW1VERUfBImb64j12caBZmRViZHbeVMjCrPDg9A90IXrtnsYCuZtRQ0PyrKDjBNOsPfKsg1pA02gHlVr0OXiFhtp6nJqXVzcbfM0KnzC3ggOENPE9VBdmHKN6LYaijb4wXxJn5A0FSDF5j+h1ooZx885Jt3ZKzO5n7Z5WfNEOtyyPqQEnn7WLv5Fis3PdgMshjF1FRydbNyeBbyKI1oN1TRVrVK7kgsb/zjX4NDPIRMctVeaxVB38Vh1x5KbeJbU138AM5KzmZu3uny0ErygxiJF7GVXUrPzFxrlx1uFdAaZFDN9cvIb74qD9tzBMo7L7WIEYK+sla1DVMHpF0F7b3+Y6S+zjvLeDMCpapmJo1weBWuxKF3rOocih1gun4BoJh1kWnV/Jmiq6uOhK3VfKxEHEkafjLgK3oujaPzY6SXg8phhL4TNR1xvJd1Wa0aYFfPUMLrNBDCh4AuGRTbtKMc6Z1Udj8evY/ZpCuMAUefdo69DZUngoqE1P9A3PJfOf7WixCEj+Y6t7fYeHbbxUAoFV3M89cCKfma3fc1+jKRe7MFWEbQqEfyzO2x/wrO2VYH7iYdQ9BkPyI8/3kXBpLaCpU7eC0Yv/am/tEDu7HZpqg0EvHo0nf/R/gRzUWy33/HXMJQeu1GylKmOkXzlCfGFruAcPPhaGqZOtu19zsJ1SO2Jz4Ztth5cBX6mRQwWmDwryG9FUMlZzNckMdK+IoMJv1rOWnBamS2w2KHiaPMPLC15hCZm4KTpoZyj4E2TqC/P6r7/EhnDMhKicZZ1ZwxuC7DPzDGs53q8gXaI9kFTK+2LTq7bhwsTbrMV8Rsfua5lMS0FwbTitUVnVa1yTb5IX51mmYnUcP9wPr8Ji1tiYJeJV9GZTrQhF7vvdU2OTU42ogJ9FDwhmycI2LIg++03C6scYhUyUuMV5tkw6kGUoL+mjNC38+wMdWNljn6tGPpRES7veqrSn5TRuv+dh6JVL/iDHU1db4c9WK3++OrH3PqziF916UMUKn8G67nN60GfWiHrXYhUG3yVWmyYak59NHj8t1smG4UDiWz2rPHNrKnN4Zo1LBbr2/eF9YZ0n0blx2nG4X+EKFxvS3W28JESD+FWk61VCD3z/URGHiJl++7TdBwkCj6tGOH3qDb0QqcOF9Kzpj0HUb/KyFW3Yhj2VMKJqGZleFBH7vqvf7WqLC3XMuHV8q8a4sTFuxUtkD/6JIBvKaVjv96ndgruKZ1k/BHzqf2K9fLk7HGXANyLDd1vxkK/i055pnzl+zw6zLnwXlVYVtfmacJgEpRP1hbGgrYPVN6v2lG+idQNGmwcKXu/8xEj/P6qe/sB2WmwNp6pp8jaISMkwdleFXYK55NHWLTTbutSUqjBfDGWo/Yg918qQ+8BRZSAHZbfuNZz2O0sov1Ue4CWlVg3rFhM3Kljj9ksGd/NUhk4nH+a5UN2+1i8+NM3vRNp7uQ6sqexSCukEVlVZriHNqFi5rLm9TMWa4qm3idJqppQACol2l4VSuvWLfta4JcXy3bROPNbXOgdOhG47LC0CwW/dMlSx4Jf17aEU3yA1x9p+Yc0jupXgcMuYNku64iYOkGToVDuJvlbEKlJqsmiHbvNrIVZEH+yFdF8DbleZ6iNiWwMqvtMp/mSpwx5KxRrT9p3MAPTHGtMbfvdFhyj9vhaKcn3At8Lc16Ai+vBcSp1ztXi7rCJZx/ql7TXcclq6Q76UeKWDy9boS0WHIjUuWhPG8LBmW5y2rhuTpM5vsLt+HOLh1Yf0DqXa9tsfC+kaKt2htA0ai/L2i7RKoNjEwztkmRU0GfgW1TxUvPFhg0V7DdfWJk5gfrccpYv+MA9M0dkGTLECeYwUixRzjRFdmjG7zdZIl3XKB9YliNKI31lfa7i2JG5C8Ss+rHe0D7Z696/V3DEAOWHnQ9yNahMUl5kENWS6pHKKp2D1BaSrrHdE1w2qNxIztpXgUIrF0bm15YML4b6V1k+GpNysTahKMVrrS85lTVo9OGJ96I47eAy5rYWpRf/mIzeoYU1DKaQCTUVwrhHeyNoDqHel+lLxr9WKzhSYw7vrR6+V5q0pfi2k3L1zqkubY6rrd9ZLvSuWNf0uqnkY+FpTvFzSW9Fp0b9l8JA7THV9eCi/PY/SCZIUYx3BU2alj7Cm3VV6eYpios4b6WuNOJdYXUK3zTqj5CVG2FqYM4Z7CuIU0qO05XR0d71FHM0YhZmJmTRfLlXEumN82BGtzdX0S19t1e+bUieK8zRmqpa4Qc5TSjifmaQsY2ETLjhI36gMR1+7qpjdXXHiceUekfBaucHShAOiFXmv3sNmGQyU5iVgnoocuonQXEPTFwslHtS8R+A47StI9wj0iSrtbi5rMysczFiImsQ+bdFClnFjjpXXwMy6O7qfjOr8Fb0a7ODItisjnn3EQO16+ypd1cwyaAW5Yzxz5QknfMO7643fXW/I9y3U2xH27Oapqr56Z/tEzglj6IbT6HEHjopiXqeRbe5mQQvxtcbDOVverN0ZgMdzqRYRjaXtMRd56Q4cZSmdPvZJdSrhJ1D9zNXPqAEqPIavPdfubt5oke2kmv0dztIszSv2VYuoyf1UuopbsYb+uX9h6WpwjpgtZ6fNNawNJ4q8O3CFoSbioAaOSZMx2GYaPYB+rEb6qjQiNRFQ76TvwNFVKD+BhH9VhcKGsXzmMI7BptU/CNWolM7YzROvpFAntsiWJp6eR2d3GarcYShVYSUqhmYOWj5E96NK2WvmYNTeY7Zs4RUEdv9h9QT4EseKt6LzLrqEOs3hxAY1MaNWpSa6zZx8F3YOVeCYMS88W+CYHDuWe4yoc6YK+djDuEOrBR5lvh0r+Q9uM88lrjx9x9AtgpQVNE8r+3O6Gvw59D+kBF/UMXyhliYUtPjmvXGY6Dk3x+kEOW+GtdMVC4EZTqoS/jmR0P0LS75DOc/w2vnri97M4SdbZ8qeU7gg8DVbERkU5geaMQO3mYrSYyAngeUQqrN0C0/vsFmcgWNXNeidsTAj7/4MncJR0caaBUpbLK1yBCBNRjEv6KvuVSdpPnEMJdsRRtqJ+U8tN1gXA4ePHc6ZT0eviI73UOJF0fEZ8YaneAQqQdGphNvwM4nIqPnXxV0xA0fnCT+oAhJuyw/q8jO0y8CjSteZExwBpIN6SvNp6A5G/abi6egeND/1GTguhuNjaUbbnSbGd4L8937Ezm34Eyi6n1maeOBxh3PI0jzJDf5mh/BsLD7F2GOKvlA/5gtvxI3/eV4sLfKW5Wy+oio+es/u6T8UU+nsofy57Icb/JlZHPFtCgd/x+bwt3ZT+xXTtTtTrGAb4QehC6X9G+8YT+ozcLxDsdCjsuOqwPFnrdLYaFc92Ui0m4fr39lYmlCaqTit7G6O/3kWDkgtXjNH4BiEm/+jegQnihOtfffn33WxsFjhfMd48HT+f6o6X65j7XR8WLSHMFkxbvOYsrRsF1bowDuSQ18Mkxk4qz2zoGPL5fu9h2Hqmt1asl3Q3Yu3szOc+spiCmX4AETBM3pLoTYSp3sVxahyhL8eC4mPN9k2x3o0xkiixIzM3CZFzf5oR4mecQ5+ax2wCah3/crmnHoqR0+KMaOPxRif1oEFRFOO/kTPPmtww+NfMXxEK6gn6iU32U6fFruIz8Q4WgljtnaCVTBgWx7diUdshC9ZEa5yKpRBBeW12r/iNc/+EgNqmhswNB8SBoihHXeDF7rrWDLcmt3V8GYYN7pXRy4DZjj4DJuUBL5iC3DQAaoo4vkftqVTYRGLS3mHZ7gdmdTTqbgNN/PTdTCOTgXolc88MhXAEUMdX0iy1JMuk5wLsgeu0QUYlz2S4skTWwJz6pOm/8ihrmgGfFgri+ZWUK2gAPHgbWa8jaocdSuM4FJYoKicYX/ZSENkg9Q1ZzJfwScfVnR2DegOGwCvmogaWJCLQepv9WNlU6QgsmOwICquU28Mlk3d9W5E81lU/5Ez0LcX6lwKMWDNluNKfBDUy/phJgBcMnfkh9iRxrdOzgs08JdPB85Lwo+GUSb4t3nC+0byqMZtO2fQJ4U2zGIr49t/28qmmGv2RanDD7a3FEcdtutkW8twwwlUSpb8QalodddbBfNHKDQ828BdE7OBgFdiKYohLawFYqpybQoxATZrheLhdI7+0Zlu9Q1myRcd15r9UIm8K2LGJxqTegntqNVMKnf1a8zQiyUR1rxoqjiFxeHxqFcYUTHfDu7rhbWng6qOxOsI+5A1p9mRyEPdVkTlE24vY54W7bWc6jMgZvNXdfC9/9q7408KDsbdL7Utz7QFSDetz2picArzrdpL8OaCHC9V26RroemtDZ5yNM/KGkWMyTmfnInEvwtSD23UcFcjhaE3VKzkoaEMKGBft4XbIO6forTY1lmGQwVmKicBCiArDzE+1oIxE08fWeviIOD5TznqH+OoHadvoOP20drMPe5Irg3XBQziW2XDuHYzjqQQ4wySssjXUs5H+t3FWYMHppUnBHMx/nYIT5d7OmjDbgD9F6na3m4l7KdkeSO3kTEPXafiWinogag7b52taiZhL1TSvBFmEZafFq2H8khQaZXuitCewT5FBgVtPK0j4xUHPfUz3Q28eac1Z139DAP23dgki94EC8vbDPTQC97HPPSWjUNG5tWKMsaxAEMKC0665Xvo1Ntd07wCLNf8Q56mrEPVpCxlIMVlQlWRxM3oAfpgIc+8KC3rEXUog5g06vt7zgXY8grH7hhwVSaeuvC06YYRAwpbyk/Unzj9hLEZNs2oxPQB9yc+GnL6zTgq7rI++KDJwX2SP8Sd6YzTuw5lV/kU6eQxRD12omfQAW6caTR4LikYkBB1CMOrvgRr/VY75+NSB40Cni6bADAtaK+vyxVWpf9NeKJxN2KYQ8Q2xPB3K1s7fuhvWbr2XpgW044VD6DRs0qXoqKf1NFsaGvKJc47leUV3pppP/5VTKFhaGuol4Esfjf5zyCyUHmHthChcYh4hYLQF+AFWsuq4t0wJyWgdwQVOZiV0efRHPoK5+E1vjz9wTJmVkITC9oEstAsyZSgE/dbicwKr89YUxKZI+owD205Tm5lnnmDRuP/JnzxX3gMtlrcX0UesZdxyQqYQuEW4R51vmQ5xOZteUd8SJruMlTUzhtVw/Nq7eUBcqN2/HVotgfngif60yKEtoUx3WYOZlVJuJOh8u59fzSDPFYtQgqDUAGyGhQOAvKroXMcOYY0qjnStJR/G3aP+Jt1sLVlGV8POwr/6OGsqetnyF3TmTqZjENfnXh51oxe9qVUw2M78EzAJ+IM8lZ1MBPQ9ZWSVc4J3mWSrLKrMHReA5qdGoz0ODRsaA+vwxXA2cAM4qlfzBJA6581m4hzxItQw5dxrrBL3Y6kCbUcFxo1S8jyV44q//+7ASNNudZ6xeaNOSIUffqMn4A9lIjFctYn2gpEPAb3f7p3iIBN8H14FUGQ9ct2hPsL+cEsTgUrR47uJVN4n4wt/wgfwwHuOnLd4yobkofy8JvxSQTA7rMpDIc608SlZFJfZYcmbT0tAHpPE8MrtQ42siTUNWxqvWZOmvu9f0JPoQmg+6l7sZWwyfi6PXkxJnwBraUG0MYG4zYHQz3igy/XsFkx5tNQxw43qvI9dU3f0DdhOUlHKjmi1VAr2Kiy0HZwD8VeEbhh0OiDdMYspolQsYdSwjCcjeowIXNZVUPmL2wwIkYhmXKhGozdCJ4lRKbsf4NBh/XnQoS92NJEWOVOFs2YhN8c5QZFeK0pRdAG40hqvLbmoSA8xQmzOOEc7wLcme9JOsjPCEgpCwUs9E2DohMHRhUeyGIN6TFvrbny8nDuilsDpzrH5mS76APoIEJmItS67sQJ+nfwddzmjPxcBEBBCw0kWDwd0EZCkNeOD7NNQhtBm7KHL9mRxj6U1yWU2puzlIDtpYxdH4ZPeXBJkTGAJfUr/oTCz/iypY6uXaR2V1doPxJYlrw2ghH0D5gbrhFcIxzYwi4a/4hqVdf2DdxBp6vGYDjavxMAAoy+1+3aiO6S3W/QAKNVXagDtvsNtx7Ks+HKgo6U21B+QSZgIogV5Bt+BnXisdVfy9VyXV+2P5fMuvdpAjM1o/K9Z+XnE4EOCrue+kcdYHqAQ0/Y/OmNlQ6OI33jH/uD1RalPaHpJAm2av0/xtpqdXVKNDrc9F2izo23Wu7firgbURFDNX9eGGeYBhiypyXZft2j3hTvzE6PMWKsod//rEILDkzBXfi7xh0eFkfb3/1zzPK/PI5Nk3FbZyTl4mq5BfBoVoqiPHO4Q4QKZAlrQ3MdNfi3oxIjvsM3kAFv3fdufurqYR3PSwX/mpGy/GFI/B2MNPiNdOppWVbs/gjF3YH+QA9jMhlAbhvasAHstB0IJew09iAkmXHl1/TEj+jvHOpOGrPRQXbPADM+Ig2/OEcUcpgPTItMtW4DdqgfYVI/+4hAFWYjUGpOP/UwNuB7+BbKOcALbjobdgzeBQfjgNSp2GOpxzGLj70Vvq5cw2AoYENwKLUtJUX8sGRox4dVa/TN4xKwaKcl9XawQR/uNus700Hf17pyNnezrUgaY9e4MADhEDBpsJT6y1gDJs1q6wlwGhuUzGR7C8kgpjPyHWwsvrf3yn1zJEIRa5eSxoLAZOCR9xbuztxFRJW9ZmMYfCFJ0evm9F2fVnuje92Rc4Pl6A8bluN8MZyyJGZ0+sNSb//DvAFxC2BqlEsFwccWeAl6CyBcQV1bx4mQMBP1Jxqk1EUADNLeieS2dUFbQ/c/kvwItbZ7tx0st16viqd53WsRmPTKv2AD8CUnhtPWg5aUegNpsYgasaw2+EVooeNKmrW3MFtj76bYHJm5K9gpAXZXsE5U8DM8XmVOSJ1F1WnLy6nQup+jx52bAb+rCq6y9WXl2B2oZDhfDkW7H3oYfT/4xx5VncBuxMXP2lNfhUVQjSSzSRbuZFE4vFawlzveXxaYKVs8LpvAb8IRYF3ZHiRnm0ADeNPWocwxSzNseG7NrSEVZoHdKWqaGEBz1N8Pt7kFbqh3LYmAbm9i1IChIpLpM5AS6mr6OAPHMwwznVy61YpBYX8xZDN/a+lt7n+x5j4bNOVteZ8lj3hpAHSx1VR8vZHec4AHO9XFCdjZ9eRkSV65ljMmZVzaej2qFn/qt1lvWzNZEfHxK3qOJrHL6crr0CRzMox5f2e8ALBB4UGFZKA3tN6F6IXd32GTJXGQ7DTi9j/dNcLF9jCbDcWGKxoKTYblIwbLDReL00LRcDPMcQuXLMh5YzgtfjkFK1DP1iDzzYYVZz5M/kWYRlRpig1htVRjVCknm+h1M5LiEDXOyHREhvzCGpFZjHS0RsK27o2avgdilrJkalWqPW3D9gmwV37HKmfM3F8YZj2ar+vHFvf3B8CRoH4kDHIK9mrAg+owiEwNjjd9V+FsQKYR8czJrUkf7Qoi2YaW6EVDZp5zYlqiYtuXOTHk4fAcZ7qBbdLDiJq0WNV1l2+Hntk1mMWvxrYmc8kIx8G3rW36J6Ra4lLrTOCgiOihmow+YnzUT19jbV2B3RWqSHyxkhmgsBqMYWvOcUom1jDQ436+fcbu3xf2bbeqU/ca+C4DOKE+e3qvmeMqW3AxejfzBRFVcwVYPq4L0APSWWoJu+5UYX4qg5U6YTioqQGPG9XrnuZ/BkxuYpe6Li87+18EskyQW/uA+uk2rpHpr6hut2TlVbKgWkFpx+AZffweiw2+VittkEyf/ifinS/0ItRL2Jq3tQOcxPaWO2xrG68GdFoUpZgFXaP2wYVtRc6xYCfI1CaBqyWpg4bx8OHBQwsV4XWMibZZ0LYjWEy2IxQ1mZrf1/UNbYCJplWu3nZ4WpodIGVA05d+RWSS+ET9tH3RfGGmNI1cIY7evZZq7o+a0bjjygpmR3mVfalkT/SZGT27Q8QGalwGlDOS9VHCyFAIL0a1Q7JiW3saz9gqY8lqKynFrPCzxkU4SIfLc9VfCI5edgRhDXs0edO992nhTKHriREP1NJC6SROMgQ0xO5kNNZOhMOIT99AUElbxqeZF8A3xrfDJsWtDnUenAHdYWSwAbYjFqQZ+D5gi3hNK8CSxU9i6f6ClL9IGlj1OPMQAsr84YG6ijsJpCaGWj75c3yOZKBB9mNpQNPUKkK0D6wgLH8MGoyRxTX6Y05Q4AnYNXMZwXM4eij/9WpsM/9CoRnFQXGR6MEaY+FXvXEO3RO0JaStk6OXuHVATHJE+1W+TU3bSZ2ksMtqjO0zfSJCdBv7y2d8DMx6TfVme3q0ZpTKMMu4YL/t7ciTNtdDkwPogh3Cnjx7qk08SHwf+dksZ7M2vCOlfsF0hQ6J4ehPCaHTNrM/zBSOqD83dBEBCW/F/LEmeh0nOHd7oVl3/Qo/9GUDkkbj7yz+9cvvu+dDAtx8NzCDTP4iKdZvk9MWiizvtILLepysflSvTLFBZ37RLwiriqyRxYv/zrgFd/9XVHh/OmzBvDX4mitMR/lUavs2Vx6cR94lzAkplm3IRNy4TFfu47tuYs9EQPIPVta4P64tV+sZ7n3ued3cgEx2YK+QL5+xms6osk8qQbTyuKVGdaX9FQqk6qfDnT5ykxk0VK7KZ62b6DNDUfQlqGHxSMKv1P0XN5BqMeKG1P4Wp5QfZDUCEldppoX0U6ss2jIko2XpURKCIhfaOqLPfShdtS37ZrT+jFRSH2xYVV1rmT/MBtRQhxiO4MQ3iAGlaZi+9PWBEIXOVnu9jN1f921lWLZky9bqbM3J2MAAI9jmuAx3gyoEUa6P2ivs0EeNv/OR+AX6q5SW6l5HaoFuS6jr6yg9limu+P0KYKzfMXWcQSfTXzpOzKEKpwI3YGXZpSSy2LTlMgfmFA3CF6R5c9xWEtRuCg2ZPUQ2Nb6dRFTNd4TfGHrnEWSKHPuRyiJSDAZ+KX0VxmSHjGPbQTLVpqixia2uyhQ394gBMt7C3ZAmxn/DJS+l1fBsAo2Eir/C0jG9csd4+/tp12pPc/BVJGaK9mfvr7M/CeztrmCO5qY06Edi4xAGtiEhnWAbzLy2VEyazE1J5nPmgU4RpW4Sa0TnOT6w5lgt3/tMpROigHHmexBGAMY0mdcDbDxWIz41NgdD6oxgHsJRgr5RnT6wZAkTOcStU4NMOQNemSO7gxGahdEsC+NRVGxMUhQmmM0llWRbbmFGHzEqLM4Iw0H7577Kyo+Zf+2cUFIOw93gEY171vQaM0HLwpjpdRR6Jz7V0ckE7XzYJ0TmY9znLdzkva0vNrAGGT5SUZ5uaHDkcGvI0ySpwkasEgZPMseYcu85w8HPdSNi+4T6A83iAwDbxgeFcB1ZM2iGXzFcEOUlYVrEckaOyodfvaYSQ7GuB4ISE0nYJc15X/1ciDTPbPCgYJK55VkEor4LvzL9S2WDy4xj+6FOqVyTAC2ZNowheeeSI5hA/02l8UYkv4nk9iaVn+kCVEUstgk5Hyq+gJm6R9vG3rhuM904he/hFmNQaUIATB1y3vw+OmxP4X5Yi6A5I5jJufHCjF9+AGNwnEllZjUco6XhsO5T5+R3yxz5yLVOnAn0zuS+6zdj0nTJbEZCbXJdtpfYZfCeCOqJHoE2vPPFS6eRLjIJlG69X93nfR0mxSFXzp1Zc0lt/VafDaImhUMtbnqWVb9M4nGNQLN68BHP7AR8Il9dkcxzmBv8PCZlw9guY0lurbBsmNYlwJZsA/B15/HfkbjbwPddaVecls/elmDHNW2r4crAx43feNkfRwsaNq/yyJ0d/p5hZ6AZajz7DBfUok0ZU62gCzz7x8eVfJTKA8IWn45vINLSM1q+HF9CV9qF3zP6Ml21kPPL3CXzkuYUlnSqT+Ij4tI/od5KwIs+tDajDs64owN7tOAd6eucGz+KfO26iNcBFpbWA5732bBNWO4kHNpr9D955L61bvHCF/mwSrz6eQaDjfDEANqGMkFc+NGxpKZzCD2sj/JrHd+zlPQ8Iz7Q+2JVIiVCuCKoK/hlAEHzvk/Piq3mRL1rT/fEh9hoT5GJmeYswg1otiKydizJ/fS2SeKHVu6Z3JEHjiW8NaTQgP5xdBli8nC57XiN9hrquBu99hn9zqwo92+PM2JXtpeVZS0PdqR5mDyDreMMtEws+CpwaRyyzoYtfcvt9PJIW0fJVNNi/FFyRsea7peLvJrL+5b4GOXJ8tAr+ATk9f8KmiIsRhqRy0vFzwRV3Z5dZ3QqIU8JQ/uQpkJbjMUMFj2F9sCFeaBjI4+fL/oN3+LQgjI4zuAfQ+3IPIPFQBccf0clJpsfpnBxD84atwtupkGqKvrH7cGNl/QcWcSi6wcVDML6ljOgYbo+2BOAWNNjlUBPiyitUAwbnhFvLbnqw42kR3Yp2kv2dMeDdcGOX5kT4S6M44KHEB/SpCfl7xgsUvs+JNY9G3O2X/6FEt9FyAn57lrbiu+tl83sCymSvq9eZbe9mchL7MTf/Ta78e80zSf0hYY5eUU7+ff14jv7Xy8qjzfzzzvaJnrIdvFb5BLWKcWGy5/w7+vV2cvIfwHqdTB+RuJK5oj9mbt0Hy94AmjMjjwYNZlNS6uiyxNnwNyt3gdreLb64p/3+08nXkb92LTkkRgFOwk1oGEVllcOj5lv1hfAZywDows0944U8vUFw+A/nuVq/UCygsrmWIBnHyU01d0XJPwriEOvx/ISK6Pk4y2w0gmojZs7lU8TtakBAdne4v/aNxmMpK4VcGMp7si0yqsiolXRuOi1Z1P7SqD3Zmp0CWcyK4Ubmp2SXiXuI5nGLCieFHKHNRIlcY3Pys2dwMTYCaqlyWSITwr2oGXvyU3h1Pf8eQ3w1bnD7ilocVjYDkcXR3Oo1BXgMLTUjNw2xMVwjtp99NhSVc5aIWrDQT5DHPKtCtheBP4zHcw4dz2eRdTMamhlHhtfgqJJHI7NGDUw1XL8vsSeSHyKqDtqoAmrQqsYwvwi7HW3ojWyhIa5oz5xJTaq14NAzFLjVLR12rRNUQ6xohDnrWFb5bG9yf8aCD8d5phoackcNJp+Dw3Due3RM+5Rid7EuIgsnwgpX0rUWh/nqPtByMhMZZ69NpgvRTKZ62ViZ+Q7Dp5r4K0d7EfJuiy06KuIYauRh5Ecrhdt2QpTS1k1AscEHvapNbU3HL1F2TFyR33Wxb5MvH5iZsrn3SDcsxlnnshO8PLwmdGN+paWnQuORtZGX37uhFT64SeuPsx8UOokY6ON85WdQ1dki5zErsJGazcBOddWJEKqNPiJpsMD1GrVLrVY+AOdPWQneTyyP1hRX/lMM4ZogGGOhYuAdr7F/DOiAoc++cn5vlf0zkMUJ40Z1rlgv9BelPqVOpxKeOpzKdF8maK+1Vv23MO9k/8+qpLoxrIGH2EDQlnGmH8CD31G8QqlyQIcpmR5bwmSVw9/Ns6IHgulCRehvZ/+VrM60Cu/r3AontFfrljew74skYe2uyn7JKQtFQBQRJ9ryGic/zQOsbS4scUBctA8cPToQ3x6ZBQu6DPu5m1bnCtP8TllLYA0UTQNVqza5nfew3Mopy1GPUwG5jsl0OVXniPmAcmLqO5HG8Hv3nSLecE9oOjPDXcsTxoCBxYyzBdj4wmnyEV4kvFDunipS8SSkvdaMnTBN9brHUR8xdmmEAp/Pdqk9uextp1t+JrtXwpN/MG2w/qhRMpSNxQ1uhg/kKO30eQ/FyHUDkWHT8V6gGRU4DhDMxZu7xXij9Ui6jlpWmQCqJg3FkOTq3WKneCRYZxBXMNAVLQgHXSCGSqNdjebY94oyIpVjMYehAiFx/tqzBXFHZaL5PeeD74rW5OysFoUXY8sebUZleFTUa/+zBKVTFDopTReXNuZq47QjkWnxjirCommO4L/GrFtVV21EpMyw8wyThL5Y59d88xtlx1g1ttSICDwnof6lt/6zliPzgVUL8jWBjC0o2D6Kg+jNuThkAlaDJsq/AG2aKA//A76avw2KNqtv223P+Wq3StRDDNKFFgtsFukYt1GFDWooFVXitaNhb3RCyJi4cMeNjROiPEDb4k+G3+hD8tsg+5hhmSc/8t2JTSwYoCzAI75doq8QTHe+E/Tw0RQSUDlU+6uBeNN3h6jJGX/mH8oj0i3caCNsjvTnoh73BtyZpsflHLq6AfwJNCDX4S98h4+pCOhGKDhV3rtkKHMa3EG4J9y8zFWI4UsfNzC/Rl5midNn7gwoN9j23HGCQQ+OAZpTTPMdiVow740gIyuEtd0qVxMyNXhHcnuXRKdw5wDUSL358ktjMXmAkvIB73BLa1vfF9BAUZInPYJiwxqFWQQBVk7gQH4ojfUQ/KEjn+A/WR6EEe4CtbpoLe1mzHkajgTIoE0SLDHVauKhrq12zrAXBGbPPWKCt4DGedq3JyGRbmPFW32bE7T20+73BatV/qQhhBWfWBFHfhYWXjALts38FemnoT+9bn1jDBMcUMmYgSc0e7GQjv2MUBwLU8ionCpgV+Qrhg7iUIfUY6JFxR0Y+ZTCPM+rVuq0GNLyJXX6nrUTt8HzFBRY1E/FIm2EeVA9NcXrj7S6YYIChVQCWr/m2fYUjC4j0XLkzZ8GCSLfmkW3PB/xq+nlXsKVBOj7vTvqKCOMq7Ztqr3cQ+N8gBnPaAps+oGwWOkbuxnRYj/x/WjiDclVrs22xMK4qArE1Ztk1456kiJriw6abkNeRHogaPRBgbgF9Z8i/tbzWELN4CvbqtrqV9TtGSnmPS2F9kqOIBaazHYaJ9bi3AoDBvlZasMluxt0BDXfhp02Jn411aVt6S4TUB8ZgFDkI6TP6gwPY85w+oUQSsjIeXVminrwIdK2ZAawb8Se6XOJbOaliQxHSrnAeONDLuCnFejIbp4YDtBcQCwMsYiRZfHefuEJqJcwKTTJ8sx5hjHmJI1sPFHOr6W9AhZ2NAod38mnLQk1gOz2LCAohoQbgMbUK9RMEA3LkiF7Sr9tLZp6lkciIGhE2V546w3Mam53VtVkGbB9w0Yk2XiRnCmbpxmHr2k4eSC0RuNbjNsUfDIfc8DZvRvgUDe1IlKdZTzcT4ZGEb53dp8VtsoZlyXzLHOdAbsp1LPTVaHvLA0GYDFMbAW/WUBfUAdHwqLFAV+3uHvYWrCfhUOR2i89qvCBoOb48usAGdcF2M4aKn79k/43WzBZ+xR1L0uZfia70XP9soQReeuhZiUnXFDG1T8/OXNmssTSnYO+3kVLAgeiY719uDwL9FQycgLPessNihMZbAKG7qwPZyG11G1+ZA3jAX2yddpYfmaKBlmfcK/V0mwIRUDC0nJSOPUl2KB8h13F4dlVZiRhdGY5farwN+f9hEb1cRi41ZcGDn6Xe9MMSTOY81ULJyXIHSWFIQHstVYLiJEiUjktlHiGjntN5/btB8Fu+vp28zl2fZXN+dJDyN6EXhS+0yzqpl/LSJNEUVxmu7BsNdjAY0jVsAhkNuuY0E1G48ej25mSt+00yPbQ4SRCVkIwb6ISvYtmJRPz9Zt5dk76blf+lJwAPH5KDF+vHAmACLoCdG2Adii6dOHnNJnTmZtoOGO8Q1jy1veMw6gbLFToQmfJa7nT7Al89mRbRkZZQxJTKgK5Kc9INzmTJFp0tpAPzNmyL/F08bX3nhCumM/cR/2RPn9emZ3VljokttZD1zVWXlUIqEU7SLk5I0lFRU0AcENXBYazNaVzsVHA/sD3o9hm42wbHIRb/BBQTKzAi8s3+bMtpOOZgLdQzCYPfX3UUxKd1WYVkGH7lh/RBBgMZZwXzU9+GYxdBqlGs0LP+DZ5g2BWNh6FAcR944B+K/JTWI3t9YyVyRhlP4CCoUk/mmF7+r2pilVBjxXBHFaBfBtr9hbVn2zDuI0kEOG3kBx8CGdPOjX1ph1POOZJUO1JEGG0jzUy2tK4X0CgVNYhmkqqQysRNtKuPdCJqK3WW57kaV17vXgiyPrl4KEEWgiGF1euI4QkSFHFf0TDroQiLNKJiLbdhH0YBhriRNCHPxSqJmNNoketaioohqMglh6wLtEGWSM1EZbQg72h0UJAIPVFCAJOThpQGGdKfFovcwEeiBuZHN2Ob4uVM7+gwZLz1D9E7ta4RmMZ24OBBAg7Eh6dLXGofZ4U2TFOCQMKjwhVckjrydRS+YaqCw1kYt6UexuzbNEDyYLTZnrY1PzsHZJT4U+awO2xlqTSYu6n/U29O2wPXgGOEKDMSq+zTUtyc8+6iLp0ivav4FKx+xxVy4FxhIF/pucVDqpsVe2jFOfdZhTzLz2QjtzvsTCvDPU7bzDH2eXVKUV9TZ+qFtaSSxnYgYdXKwVreIgvWhT9eGDB2OvnWyPLfIIIfNnfIxU8nW7MbcH05nhlsYtaW9EZRsxWcKdEqInq1DiZPKCz7iGmAU9/ccnnQud2pNgIGFYOTAWjhIrd63aPDgfj8/sdlD4l+UTlcxTI9jbaMqqN0gQxSHs60IAcW3cH4p3V1aSciTKB29L1tz2eUQhRiTgTvmqc+sGtBNh4ky0mQJGsdycBREP+fAaSs1EREDVo5gvgi5+aCN7NECw30owbCc1mSpjiahyNVwJd1jiGgzSwfTpzf2c5XJvG/g1n0fH88KHNnf+u7ZiRMlXueSIsloJBUtW9ezvsx9grfsX/FNxnbxU1Lvg0hLxixypHKGFAaPu0xCD8oDTeFSyfRT6s8109GMUZL8m2xXp8X2dpPCWWdX84iga4BrTlOfqox4shqEgh/Ht4qRst52cA1xOIUuOxgfUivp6v5f8IVyaryEdpVk72ERAwdT4aoY1usBgmP+0m06Q216H/nubtNYxHaOIYjcach3A8Ez/zc0KcShhel0HCYjFsA0FjYqyJ5ZUH1aZw3+zWC0hLpM6GDfcAdn9fq2orPmZbW6XXrf+Krc9RtvII5jeD3dFoT1KwZJwxfUMvc5KLfn8rROW23Jw89sJ2a5dpB3qWDUBWF2iX8OCuKprHosJ2mflBR+Wqs86VvgI/XMnsqb97+VlKdPVysczPj8Jhzf+WCvGBHijAqYlavbF60soMWlHbvKT+ScvhprgeTln51xX0sF+Eadc/l2s2a5BgkVbHYyz0E85p0LstqH+gEGiR84nBRRFIn8hLSZrGwqjZ3E29cuGi+5Z5bp7EM8MWFa9ssS/vy4VrDfECSv7DSU84DaP0sXI3Ap4lWznQ65nQoTKRWU30gd7Nn8ZowUvGIx4aqyXGwmA/PB4qN8msJUODezUHEl0VP9uo+cZ8vPFodSIB4C7lQYjEFj8yu49C2KIV3qxMFYTevG8KqAr0TPlkbzHHnTpDpvpzziAiNFh8xiT7C/TiyH0EguUw4vxAgpnE27WIypV+uFN2zW7xniF/n75trs9IJ5amB1zXXZ1LFkJ6GbS/dFokzl4cc2mamVwhL4XU0Av5gDWAl+aEWhAP7t2VIwU+EpvfOPDcLASX7H7lZpXA2XQfbSlD4qU18NffNPoAKMNSccBfO9YVVgmlW4RydBqfHAV7+hrZ84WJGho6bNT0YMhxxLdOx/dwGj0oyak9aAkNJ8lRJzUuA8sR+fPyiyTgUHio5+Pp+YaKlHrhR41jY5NESPS3x+zTMe0S2HnLOKCOQPpdxKyviBvdHrCDRqO+l96HhhNBLXWv4yEMuEUYo8kXnYJM8oIgVM4XJ+xXOev4YbWeqsvgq0lmw4/PiYr9sYLt+W5EAuYSFnJEan8CwJwbtASBfLBBpJZiRPor/aCJBZsM+MhvS7ZepyHvU8m5WSmaZnxuLts8ojl6KkS8oSAHkq5GWlCB/NgJ5W3rO2Cj1MK7ahxsCrbTT3a0V/QQH+sErxV4XUWDHx0kkFy25bPmBMBQ6BU3HoHhhYcJB9JhP6NXUWKxnE0raXHB6U9KHpWdQCQI72qevp5fMzcm+AvC85rsynVQhruDA9fp9COe7N56cg1UKGSas89vrN+WlGLYTwi5W+0xYdKEGtGCeNJwXKDU0XqU5uQYnWsMwTENLGtbQMvoGjIFIEMzCRal4rnBAg7D/CSn8MsCvS+FDJJAzoiioJEhZJgAp9n2+1Yznr7H+6eT4YkJ9Mpj60ImcW4i4iHDLn9RydB8dx3QYm3rsX6n4VRrZDsYK6DCGwkwd5n3/INFEpk16fYpP6JtMQpqEMzcOfQGAHXBTEGzuLJ03GYQL9bmV2/7ExDlRf+Uvf1sM2frRtCWmal12pMgtonvSCtR4n1CLUZRdTHDHP1Otwqd+rcdlavnKjUB/OYXQHUJzpNyFoKpQK+2OgrEKpGyIgIBgn2y9QHnTJihZOpEvOKIoHAMGAXHmj21Lym39Mbiow4IF+77xNuewziNVBxr6KD5e+9HzZSBIlUa/AmsDFJFXeyrQakR3FwowTGcADJHcEfhGkXYNGSYo4dh4bxwLM+28xjiqkdn0/3R4UEkvcBrBfn/SzBc1XhKM2VPlJgKSorjDac96V2UnQYXl1/yZPT4DVelgO+soMjexXwYO58VLl5xInQUZI8jc3H2CPnCNb9X05nOxIy4MlecasTqGK6s2az4RjpF2cQP2G28R+7wDPsZDZC/kWtjdoHC7SpdPmqQrUAhMwKVuxCmYTiD9q/O7GHtZvPSN0CAUQN/rymXZNniYLlJDE70bsk6Xxsh4kDOdxe7A2wo7P9F5YvqqRDI6brf79yPCSp4I0jVoO4YnLYtX5nzspR5WB4AKOYtR1ujXbOQpPyYDvfRE3FN5zw0i7reehdi7yV0YDRKRllGCGRk5Yz+Uv1fYl2ZwrnGsqsjgAVo0xEUba8ohjaNMJNwTwZA/wBDWFSCpg1eUH8MYL2zdioxRTqgGQrDZxQyNzyBJPXZF0+oxITJAbj7oNC5JwgDMUJaM5GqlGCWc//KCIrI+aclEe4IA0uzv7cuj6GCdaJONpi13O544vbtIHBF+A+JeDFUQNy61Gki3rtyQ4aUywn6ru314/dkGiP8Iwjo0J/2Txs49ZkwEl4mx+iYUUO55I6pJzU4P+7RRs+DXZkyKUYZqVWrPF4I94m4Wx1tXeE74o9GuX977yvJ/jkdak8+AmoHVjI15V+WwBdARFV2IPirJgVMdsg1Pez2VNHqa7EHWdTkl3XTcyjG9BiueWFvQfXI8aWSkuuRmqi/HUuzqyvLJfNfs0txMqldYYflWB1BS31WkuPJGGwXUCpjiQSktkuBMWwHjSkQxeehqw1Kgz0Trzm7QbtgxiEPDVmWCNCAeCfROTphd1ZNOhzLy6XfJyG6Xgd5MCAZw4xie0Sj5AnY1/akDgNS9YFl3Y06vd6FAsg2gVQJtzG7LVq1OH2frbXNHWH/NY89NNZ4QUSJqL2yEcGADbT38X0bGdukqYlSoliKOcsSTuqhcaemUeYLLoI8+MZor2RxXTRThF1LrHfqf/5LcLAjdl4EERgUysYS2geE+yFdasU91UgUDsc2cSQ1ZoT9+uLOwdgAmifwQqF028INc2IQEDfTmUw3eZxvz7Ud1z3xc1PQfeCvfKsB9jOhRj7rFyb9XcDWLcYj0bByosychMezMLVkFiYcdBBQtvI6K0KRuOZQH2kBsYHJaXTkup8F0eIhO1/GcIwWKpr2mouB7g5TUDJNvORXPXa/mU8bh27TAZYBe2sKx4NSv5OjnHIWD2RuysCzBlUfeNXhDd2jxnHoUlheJ3jBApzURy0fwm2FwwsSU0caQGl0Kv8hopRQE211NnvtLRsmCNrhhpEDoNiZEzD2QdJWKbRRWnaFedXHAELSN0t0bfsCsMf0ktfBoXBoNA+nZN9+pSlmuzspFevmsqqcMllzzvkyXrzoA+Ryo1ePXpdGOoJvhyru+EBRsmOp7MXZ0vNUMUqHLUoKglg1p73sWeZmPc+KAw0pE2zIsFFE5H4192KwDvDxdxEYoDBDNZjbg2bmADTeUKK57IPD4fTYF4c6EnXx/teYMORBDtIhPJneiZny7Nv/zG+YmekIKCoxr6kauE2bZtBLufetNG0BtBY7f+/ImUypMBvdWu/Q7vTMRzw5aQGZWuc1V0HEsItFYMIBnoKGZ0xcarba/TYZq50kCaflFysYjA4EDKHqGdpYWdKYmm+a7TADmW35yfnOYpZYrkpVEtiqF0EujI00aeplNs2k+qyFZNeE3CDPL9P6b4PQ/kataHkVpLSEVGK7EX6rAa7IVNrvZtFvOA6okKvBgMtFDAGZOx88MeBcJ8AR3AgUUeIznAN6tjCUipGDZONm1FjWJp4A3QIzSaIOmZ7DvF/ysYYbM/fFDOV0jntAjRdapxJxL0eThpEhKOjCDDq2ks+3GrwxqIFKLe1WdOzII8XIOPGnwy6LKXVfpSDOTEfaRsGujhpS4hBIsMOqHbl16PJxc4EkaVu9wpEYlF/84NSv5Zum4drMfp9yXbzzAOJqqS4YkI4cBrFrC7bMPiCfgI3nNZAqkk3QOZqR+yyqx+nDQKBBBZ7QKrfGMCL+XpqFaBJU0wpkBdAhbR4hJsmT5aynlvkouoxm/NjD5oe6BzVIO9uktM+/5dEC5P7vZvarmuO/lKXz4sBabVPIATuKTrwbJP8XUkdM6uEctHKXICUJGjaZIWRbZp8czquQYfY6ynBUCfIU+gG6wqSIBmYIm9pZpXdaL121V7q0VjDjmQnXvMe7ysoEZnZL15B0SpxS1jjd83uNIOKZwu5MPzg2NhOx3xMOPYwEn2CUzbSrwAs5OAtrz3GAaUkJOU74XwjaYUmGJdZBS1NJVkGYrToINLKDjxcuIlyfVsKQSG/G4DyiO2SlQvJ0d0Ot1uOG5IFSAkq+PRVMgVMDvOIJMdqjeCFKUGRWBW9wigYvcbU7CQL/7meF2KZAaWl+4y9uhowAX7elogAvItAAxo2+SFxGRsHGEW9BnhlTuWigYxRcnVUBRQHV41LV+Fr5CJYV7sHfeywswx4XMtUx6EkBhR+q8AXXUA8uPJ73Pb49i9KG9fOljvXeyFj9ixgbo6CcbAJ7WHWqKHy/h+YjBwp6VcN7M89FGzQ04qbrQtgrOFybg3gQRTYG5xn73ArkfQWjCJROwy3J38Dx/D7jOa6BBNsitEw1wGq780EEioOeD+ZGp2J66ADiVGMayiHYucMk8nTK2zzT9CnEraAk95kQjy4k0GRElLL5YAKLQErJ5rp1eay9O4Fb6yJGm9U4FaMwPGxtKD6odIIHKoWnhKo1U8KIpFC+MVn59ZXmc7ZTBZfsg6FQ8W10YfTr4u0nYrpHZbZ1jXiLmooF0cOm0+mPnJBXQtepc7n0BqOipNCqI6yyloTeRShNKH04FIo0gcMk0H/xThyN4pPAWjDDkEp3lNNPRNVfpMI44CWRlRgViP64eK0JSRp0WUvCWYumlW/c58Vcz/yMwVcW5oYb9+26TEhwvbxiNg48hl1VI1UXTU//Eta+BMKnGUivctfL5wINDD0giQL1ipt6U7C9cd4+lgqY2lMUZ02Uv6Prs+ZEZer7ZfWBXVghlfOOrClwsoOFKzWEfz6RZu1eCs+K8fLvkts5+BX0gyrFYve0C3qHrn5U/Oh6D/CihmWIrY7HUZRhJaxde+tldu6adYJ+LeXupQw0XExC36RETdNFxcq9glMu4cNQSX9cqR/GQYp+IxUkIcNGWVU7ZtGa6P3XAyodRt0XeS3Tp01AnCh0ZbUh4VrSZeV9RWfSoWyxnY3hzcZ30G/InDq4wxRrEejreBxnhIQbkxenxkaxl+k7eLUQkUR6vKJ2iDFNGX3WmVA1yaOH+mvhBd+sE6vacQzFobwY5BqEAFmejwW5ne7HtVNolOUgJc8CsUxmc/LBi8N5mu9VsIA5HyErnS6zeCz7VLI9+n/hbT6hTokMXTVyXJRKSG2hd2labXTbtmK4fNH3IZBPreSA4FMeVouVN3zG5x9CiGpLw/3pceo4qGqp+rVp+z+7yQ98oEf+nyH4F3+J9IheDBa94Wi63zJbLBCIZm7P0asHGpIJt3PzE3m0S4YIWyXBCVXGikj8MudDPB/6Nm2v4IxJ5gU0ii0guy5SUHqGUYzTP0jIJU5E82RHUXtX4lDdrihBLdP1YaG1AGUC12rQKuIaGvCpMjZC9bWSCYnjDlvpWbkdXMTNeBHLKiuoozMGIvkczmP0aRJSJ8PYnLCVNhKHXBNckH79e8Z8Kc2wUej4sQZoH8qDRGkg86maW/ZQWGNnLcXmq3FlXM6ssR/3P6E/bHMvm6HLrv1yRixit25JsH3/IOr2UV4BWJhxXW5BJ6Xdr07n9kF3ZNAk6/Xpc5MSFmYJ2R7bdL8Kk7q1OU9Elg/tCxJ8giT27wSTySF0GOxg4PbYJdi/Nyia9Nn89CGDulfJemm1aiEr/eleGSN+5MRrVJ4K6lgyTTIW3i9cQ0dAi6FHt0YMbH3wDSAtGLSAccezzxHitt1QdhW36CQgPcA8vIIBh3/JNjf/Obmc2yzpk8edSlS4lVdwgW5vzbYEyFoF4GCBBby1keVNueHAH+evi+H7oOVfS3XuPQSNTXOONAbzJeSb5stwdQHl1ZjrGoE49I8+A9j3t+ahhQj74FCSWpZrj7wRSFJJnnwi1T9HL5qrCFW/JZq6P62XkMWTb+u4lGpKfmmwiJWx178GOG7KbrZGqyWwmuyKWPkNswkZ1q8uptUlviIi+AXh2bOOTOLsrtNkfqbQJeh24reebkINLkjut5r4d9GR/r8CBa9SU0UQhsnZp5cP+RqWCixRm7i4YRFbtZ4EAkhtNa6jHb6gPYQv7MKqkPLRmX3dFsK8XsRLVZ6IEVrCbmNDc8o5mqsogjAQfoC9Bc7R6gfw03m+lQpv6kTfhxscDIX6s0w+fBxtkhjXAXr10UouWCx3C/p/FYwJRS/AXRKkjOb5CLmK4XRe0+xeDDwVkJPZau52bzLEDHCqV0f44pPgKOkYKgTZJ33fmk3Tu8SdxJ02SHM8Fem5SMsWqRyi2F1ynfRJszcFKykdWlNqgDA/L9lKYBmc7Zu/q9ii1FPF47VJkqhirUob53zoiJtVVRVwMR34gV9iqcBaHbRu9kkvqk3yMpfRFG49pKKjIiq7h/VpRwPGTHoY4cg05X5028iHsLvUW/uz+kjPyIEhhcKUwCkJAwbR9pIEGOn8z6svAO8i89sJ3dL5qDWFYbS+HGPRMxYwJItFQN86YESeJQhn2urGiLRffQeLptDl8dAgb+Tp47UQPxWOw17OeChLN1WnzlkPL1T5O+O3Menpn4C3IY5LEepHpnPeZHbvuWfeVtPlkH4LZjPbBrkJT3NoRJzBt86CO0Xq59oQ+8dsm0ymRcmQyn8w71mhmcuEI5byuF+C88VPYly2sEzjlzAQ3vdn/1+Hzguw6qFNNbqenhZGbdiG6RwZaTG7jTA2X9RdXjDN9yj1uQpyO4Lx8KRAcZcbZMafp4wPOd5MdXoFY52V1A8M9hi3sso93+uprE0qYNMjkE22CvK4HuUxqN7oIz5pWuETq1lQAjqlSlqdD2Rnr/ggp/TVkQYjn9lMfYelk2sH5HPdopYo7MHwlV1or9Bxf+QCyLzm92vzG2wjiIjC/ZHEJzeroJl6bdFPTpZho5MV2U86fLQqxNlGIMqCGy+9WYhJ8ob1r0+Whxde9L2PdysETv97O+xVw+VNN1TZSQN5I6l9m5Ip6pLIqLm4a1B1ffH6gHyqT9p82NOjntRWGIofO3bJz5GhkvSWbsXueTAMaJDou99kGLqDlhwBZNEQ4mKPuDvVwSK4WmLluHyhA97pZiVe8g+JxmnJF8IkV/tCs4Jq/HgOoAEGR9tCDsDbDmi3OviUQpG5D8XmKcSAUaFLRXb2lmJTNYdhtYyfjBYZQmN5qT5CNuaD3BVnlkCk7bsMW3AtXkNMMTuW4HjUERSJnVQ0vsBGa1wo3Qh7115XGeTF3NTz8w0440AgU7c3bSXO/KMINaIWXd0oLpoq/0/QJxCQSJ9XnYy1W7TYLBJpHsVWD1ahsA7FjNvRd6mxCiHsm8g6Z0pnzqIpF1dHUtP2ITU5Z1hZHbu+L3BEEStBbL9XYvGfEakv1bmf+bOZGnoiuHEdlBnaChxYKNzB23b8sw8YyT7Ajxfk49eJIAvdbVkdFCe2J0gMefhQ0bIZxhx3fzMIysQNiN8PgOUKxOMur10LduigREDRMZyP4oGWrP1GFY4t6groASsZ421os48wAdnrbovNhLt7ScNULkwZ5AIZJTrbaKYTLjA1oJ3sIuN/aYocm/9uoQHEIlacF1s/TM1fLcPTL38O9fOsjMEIwoPKfvt7opuI9G2Hf/PR4aCLDQ7wNmIdEuXJ/QNL72k5q4NejAldPfe3UVVqzkys8YZ/jYOGOp6c+YzRCrCuq0M11y7TiN6qk7YXRMn/gukxrEimbMQjr3jwRM6dKVZ4RUfWQr8noPXLJq6yh5R3EH1IVOHESst/LItbG2D2vRsZRkAObzvQAAD3mb3/G4NzopI0FAiHfbpq0X72adg6SRj+8OHMShtFxxLZlf/nLgRLbClwl5WmaYSs+yEjkq48tY7Z2bE0N91mJwt+ua0NlRJIDh0HikF4UvSVorFj2YVu9YeS5tfvlVjPSoNu/Zu6dEUfBOT555hahBdN3Sa5Xuj2Rvau1lQNIaC944y0RWj9UiNDskAK1WoL+EfXcC6IbBXFRyVfX/WKXxPAwUyIAGW8ggZ08hcijKTt1YKnUO6QPvcrmDVAb0FCLIXn5id4fD/Jx4tw/gbXs7WF9b2RgXtPhLBG9vF5FEkdHAKrQHZAJC/HWvk7nvzzDzIXZlfFTJoC3JpGgLPBY7SQTjGlUvG577yNutZ1hTfs9/1nkSXK9zzKLRZ3VODeKUovJe0WCq1zVMYxCJMenmNzPIU2S8TA4E7wWmbNkxq9rI2dd6v0VpcAPVMxnDsvWTWFayyqvKZO7Z08a62i/oH2/jxf8rpmfO64in3FLiL1GX8IGtVE9M23yGsIqJbxDTy+LtaMWDaPqkymb5VrQdzOvqldeU0SUi6IirG8UZ3jcpRbwHa1C0Dww9G/SFX3gPvTJQE+kyz+g1BeMILKKO+olcHzctOWgzxYHnOD7dpCRtuZEXACjgqesZMasoPgnuDC4nUviAAxDc5pngjoAITIkvhKwg5d608pdrZcA+qn5TMT6Uo/QzBaOxBCLTJX3Mgk85rMfsnWx86oLxf7p2PX5ONqieTa/qM3tPw4ZXvlAp83NSD8F7+ZgctK1TpoYwtiU2h02HCGioH5tkVCqNVTMH5p00sRy2JU1qyDBP2CII/Dg4WDsIl+zgeX7589srx6YORRQMBfKbodbB743Tl4WLKOEnwWUVBsm94SOlCracU72MSyj068wdpYjyz1FwC2bjQnxnB6Mp/pZ+yyZXtguEaYB+kqhjQ6UUmwSFazOb+rhYjLaoiM+aN9/8KKn0zaCTFpN9eKwWy7/u4EHzO46TdFSNjMfn2iPSJwDPCFHc0I1+vjdAZw5ZjqR/uzi9Zn20oAa5JnLEk/EA3VRWE7J/XrupfFJPtCUuqHPpnlL7ISJtRpSVcB8qsZCm2QEkWoROtCKKxUh3yEcMbWYJwk6DlEBG0bZP6eg06FL3v6RPb7odGuwm7FN8fG4woqtB8e7M5klPpo97GoObNwt+ludTAmxyC5hmcFx+dIvEZKI6igFKHqLH01iY1o7903VzG9QGetyVx5RNmBYUU+zIuSva/yIcECUi4pRmE3VkF2avqulQEUY4yZ/wmNboBzPmAPey3+dSYtBZUjeWWT0pPwCz4Vozxp9xeClIU60qvEFMQCaPvPaA70WlOP9f/ey39macvpGCVa+zfa8gO44wbxpJUlC8GN/pRMTQtzY8Z8/hiNrU+Zq64ZfFGIkdj7m7abcK1EBtws1X4J/hnqvasPvvDSDYWN+QcQVGMqXalkDtTad5rYY0TIR1Eqox3czwPMjKPvF5sFv17Thujr1IZ1Ytl4VX1J0vjXKmLY4lmXipRAro0qVGEcXxEVMMEl54jQMd4J7RjgomU0j1ptjyxY+cLiSyXPfiEcIS2lWDK3ISAy6UZ3Hb5vnPncA94411jcy75ay6B6DSTzK6UTCZR9uDANtPBrvIDgjsfarMiwoax2OlLxaSoYn4iRgkpEGqEkwox5tyI8aKkLlfZ12lO11TxsqRMY89j5JaO55XfPJPDL1LGSnC88Re9Ai+Nu5bZjtwRrvFITUFHPR4ZmxGslQMecgbZO7nHk32qHxYkdvWpup07ojcMCaVrpFAyFZJJbNvBpZfdf39Hdo2kPtT7v0/f8R/B5Nz4f1t9/3zNM/7n6SUHfcWk5dfQFJvcJMgPolGCpOFb/WC0FGWU2asuQyT+rm88ZKZ78Cei/CAh939CH0JYbpZIPtxc2ufXqjS3pHH9lnWK4iJ7OjR/EESpCo2R3MYKyE7rHfhTvWho4cL1QdN4jFTyR6syMwFm124TVDDRXMNveI1Dp/ntwdz8k8kxw7iFSx6+Yx6O+1LzMVrN0BBzziZi9kneZSzgollBnVwBh6oSOPHXrglrOj+QmR/AESrhDpKrWT+8/AiMDxS/5wwRNuGQPLlJ9ovomhJWn8sMLVItQ8N/7IXvtD8kdOoHaw+vBSbFImQsv/OCAIui99E+YSIOMlMvBXkAt+NAZK8wB9Jf8CPtB+TOUOR+z71d/AFXpPBT6+A5FLjxMjLIEoJzrQfquvxEIi+WoUzGR1IzQFNvbYOnxb2PyQ0kGdyXKzW2axQL8lNAXPk6NEjqrRD1oZtKLlFoofrXw0dCNWASHzy+7PSzOUJ3XtaPZsxLDjr+o41fKuKWNmjiZtfkOzItvlV2MDGSheGF0ma04qE3TUEfqJMrXFm7DpK+27DSvCUVf7rbNoljPhha5W7KBqVq0ShUSTbRmuqPtQreVWH4JET5yMhuqMoSd4r/N8sDmeQiQQvi1tcZv7Moc7dT5X5AtCD6kNEGZOzVcNYlpX4AbTsLgSYYliiPyVoniuYYySxsBy5cgb3pD+EK0Gpb0wJg031dPgaL8JZt6sIvzNPEHfVPOjXmaXj4bd4voXzpZ5GApMhILgMbCEWZ2zwgdeQgjNHLbPIt+KqxRwWPLTN6HwZ0Ouijj4UF+Sg0Au8XuIKW0WxlexdrFrDcZJ8Shauat3X0XmHygqgL1nAu2hrJFb4wZXkcS+i36KMyU1yFvYv23bQUJi/3yQpqr/naUOoiEWOxckyq/gq43dFou1DVDaYMZK9tho7+IXXokBCs5GRfOcBK7g3A+jXQ39K4YA8PBRW4m5+yR0ZAxWJncjRVbITvIAPHYRt1EJ3YLiUbqIvoKHtzHKtUy1ddRUQ0AUO41vonZDUOW+mrszw+SW/6Q/IUgNpcXFjkM7F4CSSQ2ExZg85otsMs7kqsQD4OxYeBNDcSpifjMoLb7GEbGWTwasVObmB/bfPcUlq0wYhXCYEDWRW02TP5bBrYsKTGWjnWDDJ1F7zWai0zW/2XsCuvBQjPFcTYaQX3tSXRSm8hsAoDdjArK/OFp6vcWYOE7lizP0Yc+8p16i7/NiXIiiQTp7c7Xus925VEtlKAjUdFhyaiLT7VxDagprMFwix4wZ05u0qj7cDWFd0W9OYHIu3JbJKMXRJ1aYNovugg+QqRN7fNHSi26VSgBpn+JfMuPo3aeqPWik/wI5Rz3BWarPQX4i5+dM0npwVOsX+KsOhC7vDg+OJsz4Q5zlnIeflUWL6QYMbf9WDfLmosLF4Qev3mJiOuHjoor/dMeBpA9iKDkMjYBNbRo414HCxjsHrB4EXNbHzNMDHCLuNBG6Sf+J4MZ/ElVsDSLxjIiGsTPhw8BPjxbfQtskj+dyNMKOOcUYIRBEIqbazz3lmjlRQhplxq673VklMMY6597vu+d89ec/zq7Mi4gQvh87ehYbpOuZEXj5g/Q7S7BFDAAB9DzG35SC853xtWVcnZQoH54jeOqYLR9NDuwxsVthTV7V99n/B7HSbAytbEyVTz/5NhJ8gGIjG0E5j3griULUd5Rg7tQR+90hJgNQKQH2btbSfPcaTOfIexc1db1BxUOhM1vWCpLaYuKr3FdNTt/T3PWCpEUWDKEtzYrjpzlL/wri3MITKsFvtF8QVV/NhVo97aKIBgdliNc10dWdXVDpVtsNn+2UIolrgqdWA4EY8so0YvB4a+aLzMXiMAuOHQrXY0tr+CL10JbvZzgjJJuB1cRkdT7DUqTvnswVUp5kkUSFVtIIFYK05+tQxT6992HHNWVhWxUsD1PkceIrlXuUVRogwmfdhyrf6zzaL8+c0L7GXMZOteAhAVQVwdJh+7nrX7x4LaIIfz2F2v7Dg/uDfz2Fa+4gFm2zHAor8UqimJG3VTJtZEoFXhnDYXvxMJFc6ku2bhbCxzij2z5UNuK0jmp1mnvkVNUfR+SEmj1Lr94Lym75PO7Fs0MIr3GdsWXRXSfgLTVY0FLqba97u1In8NAcY7IC6TjWLigwKEIm43NxTdaVTv9mcKkzuzBkKd8x/xt1p/9BbP7Wyb4bpo1K1gnOpbLvKz58pWl3B55RJ/Z5mRDLPtNQg14jdOEs9+h/V5UVpwrAI8kGbX8KPVPDIMfIqKDjJD9UyDOPhjZ3vFAyecwyq4akUE9mDOtJEK1hpDyi6Ae87sWAClXGTiwPwN7PXWwjxaR79ArHRIPeYKTunVW24sPr/3HPz2IwH8oKH4OlWEmt4BLM6W5g4kMcYbLwj2usodD1088stZA7VOsUSpEVl4w7NMb1EUHMRxAxLF0CIV+0L3iZb+ekB1vSDSFjAZ3hfLJf7gFaXrOKn+mhR+rWw/eTXIcAgl4HvFuBg1LOmOAwJH3eoVEjjwheKA4icbrQCmvAtpQ0mXG0agYp5mj4Rb6mdQ+RV4QBPbxMqh9C7o8nP0Wko2ocnCHeRGhN1XVyT2b9ACsL+6ylUy+yC3QEnaKRIJK91YtaoSrcWZMMwxuM0E9J68Z+YyjA0g8p1PfHAAIROy6Sa04VXOuT6A351FOWhKfTGsFJ3RTJGWYPoLk5FVK4OaYR9hkJvezwF9vQN1126r6isMGXWTqFW+3HL3I/jurlIdDWIVvYY+s6yq7lrFSPAGRdnU7PVwY/SvWbZGpXzy3BQ2LmAJlrONUsZs4oGkly0V267xbD5KMY8woNNsmWG1VVgLCra8aQBBcI4DP2BlNwxhiCtHlaz6OWFoCW0vMR3ErrG7JyMjTSCnvRcsEHgmPnwA6iNpJ2DrFb4gLlhKJyZGaWkA97H6FFdwEcLT6DRQQL++fOkVC4cYGW1TG/3iK5dShRSuiBulmihqgjR45Vi03o2RbQbP3sxt90VxQ6vzdlGfkXmmKmjOi080JSHkLntjvsBJnv7gKscOaTOkEaRQqAnCA4HWtB4XnMtOhpRmH2FH8tTXrIjAGNWEmudQLCkcVlGTQ965Kh0H6ixXbgImQP6b42B49sO5C8pc7iRlgyvSYvcnH9FgQ3azLbQG2cUW96SDojTQStxkOJyOuDGTHAnnWkz29aEwN9FT8EJ4yhXOg+jLTrCPKeEoJ9a7lDXOjEr8AgX4BmnMQ668oW0zYPyQiVMPxKRHtpfnEEyaKhdzNVThlxxDQNdrHeZiUFb6NoY2KwvSb7BnRcpJy+/g/zAYx3fYSN5QEaVD2Y1VsNWxB0BSO12MRsRY8JLfAezRMz5lURuLUnG1ToKk6Q30FughqWN6gBNcFxP/nY/iv+iaUQOa+2Nuym46wtI/DvSfzSp1jEi4SdYBE7YhTiVV5cX9gwboVDMVgZp5YBQlHOQvaDNfcCoCJuYhf5kz5kwiIKPjzgpcRJHPbOhJajeoeRL53cuMahhV8Z7IRr6M4hW0JzT7mzaMUzQpm866zwM7Cs07fJYXuWvjAMkbe5O6V4bu71sOG6JQ4oL8zIeXHheFVavzxmlIyBkgc9IZlEDplMPr8xlcyss4pVUdwK1e7CK2kTsSdq7g5SHRAl3pYUB9Ko4fsh4qleOyJv1z3KFSTSvwEcRO/Ew8ozEDYZSqpfoVW9uhJfYrNAXR0Z3VmeoAD+rVWtwP/13sE/3ICX3HhDG3CMc476dEEC0K3umSAD4j+ZQLVdFOsWL2C1TH5+4KiSWH+lMibo+B55hR3Gq40G1n25sGcN0mEcoU2wN9FCVyQLBhYOu9aHVLWjEKx2JIUZi5ySoHUAI9b8hGzaLMxCZDMLhv8MkcpTqEwz9KFDpCpqQhVmsGQN8m24wyB82FAKNmjgfKRsXRmsSESovAwXjBIoMKSG51p6Um8b3i7GISs7kjTq/PZoioCfJzfKdJTN0Q45kQEQuh9H88M3yEs3DbtRTKALraM0YC8laiMiOOe6ADmTcCiREeAWZelBaEXRaSuj2lx0xHaRYqF65O0Lo5OCFU18A8cMDE4MLYm9w2QSr9NgQAIcRxZsNpA7UJR0e71JL+VU+ISWFk5I97lra8uGg7GlQYhGd4Gc6rxsLFRiIeGO4abP4S4ekQ1fiqDCy87GZHd52fn5aaDGuvOmIofrzpVwMvtbreZ/855OaXTRcNiNE0wzGZSxbjg26v8ko8L537v/XCCWP2MFaArJpvnkep0pA+O86MWjRAZPQRfznZiSIaTppy6m3p6HrNSsY7fDtz7Cl4V/DJAjQDoyiL2uwf1UHVd2AIrzBUSlJaTj4k6NL97a/GqhWKU9RUmjnYKpm2r+JYUcrkCuZKvcYvrg8pDoUKQywY9GDWg03DUFSirlUXBS5SWn/KAntnf0IdHGL/7mwXqDG+LZYjbEdQmqUqq4y54TNmWUP7IgcAw5816YBzwiNIJiE9M4lPCzeI/FGBeYy3p6IAmH4AjXXmvQ4Iy0Y82NTobcAggT2Cdqz6Mx4TdGoq9fn2etrWKUNFyatAHydQTVUQ2S5OWVUlugcNvoUrlA8cJJz9MqOa/W3iVno4zDHfE7zhoY5f5lRTVZDhrQbR8LS4eRLz8iPMyBL6o4PiLlp89FjdokQLaSBmKHUwWp0na5fE3v9zny2YcDXG/jfI9sctulHRbdkI5a4GOPJx4oAJQzVZ/yYAado8KNZUdEFs9ZPiBsausotXMNebEgr0dyopuqfScFJ3ODNPHgclACPdccwv0YJGQdsN2lhoV4HVGBxcEUeUX/alr4nqpcc1CCR3vR7g40zteQg/JvWmFlUE4mAiTpHlYGrB7w+U2KdSwQz2QJKBe/5eiixWipmfP15AFWrK8Sh1GBBYLgzki1wTMhGQmagXqJ2+FuqJ8f0XzXCVJFHQdMAw8xco11HhM347alrAu+wmX3pDFABOvkC+WPX0Uhg1Z5MVHKNROxaR84YV3s12UcM+70cJ460SzEaKLyh472vOMD3XnaK7zxZcXlWqenEvcjmgGNR2OKbI1s8U+iwiW+HotHalp3e1MGDy6BMVIvajnAzkFHbeVsgjmJUkrP9OAwnEHYXVBqYx3q7LvXjoVR0mY8h+ZaOnh053pdsGkmbqhyryN01eVHySr+CkDYkSMeZ1xjPNVM+gVLTDKu2VGsMUJqWO4TwPDP0VOg2/8ITbAUaMGb4LjL7L+Pi11lEVMXTYIlAZ/QHmTENjyx3kDkBdfcvvQt6tKk6jYFM4EG5UXDTaF5+1ZjRz6W7MdJPC+wTkbDUim4p5QQH3b9kGk2Bkilyeur8Bc20wm5uJSBO95GfYDI1EZipoRaH7uVveneqz43tlTZGRQ4a7CNmMHgXyOQQOL6WQkgMUTQDT8vh21aSdz7ERiZT1jK9F+v6wgFvuEmGngSvIUR2CJkc5tx1QygfZnAruONobB1idCLB1FCfO7N1ZdRocT8/Wye+EnDiO9pzqIpnLDl4bkaRKW+ekBVwHn46Shw1X0tclt/0ROijuUB4kIInrVJU4buWf4YITJtjOJ6iKdr1u+flgQeFH70GxKjhdgt/MrwfB4K/sXczQ+9zYcrD4dhY6qZhZ010rrxggWA8JaZyg2pYij8ieYEg1aZJkZK9O1Re7sB0iouf60rK0Gd+AYlp7soqCBCDGwfKeUQhCBn0E0o0GS6PdmjLi0TtCYZeqazqwN+yNINIA8Lk3iPDnWUiIPLGNcHmZDxfeK0iAdxm/T7LnN+gemRL61hHIc0NCAZaiYJR+OHnLWSe8sLrK905B5eEJHNlWq4RmEXIaFTmo49f8w61+NwfEUyuJAwVqZCLFcyHBKAcIVj3sNzfEOXzVKIndxHw+AR93owhbCxUZf6Gs8cz6/1VdrFEPrv330+9s6BtMVPJ3zl/Uf9rUi0Z/opexfdL3ykF76e999GPfVv8fJv/Y/+/5hEMon1tqNFyVRevV9y9/uIvsG3dbB8GRRrgaEXfhx+2xeOFt+cEn3RZanNxdEe2+B6MHpNbrRE53PlDifPvFcp4kO78ILR0T4xyW/WGPyBsqGdoA7zJJCu1TKbGfhnqgnRbxbB2B3UZoeQ2bz2sTVnUwokTcTU21RxN1PYPS3Sar7T0eRIsyCNowr9amwoMU/od9s2APtiKNL6ENOlyKADstAEWKA+sdKDhrJ6BOhRJmZ+QJbAaZ3/5Fq0/lumCgEzGEbu3yi0Y4I4EgVAjqxh4HbuQn0GrRhOWyAfsglQJAVL1y/6yezS2k8RE2MstJLh92NOB3GCYgFXznF4d25qiP4ZCyI4RYGesut6FXK6GwPpKK8WHEkhYui0AyEmr5Ml3uBFtPFdnioI8RiCooa7Z1G1WuyIi3nSNglutc+xY8BkeW3JJXPK6jd2VIMpaSxpVtFq+R+ySK9J6WG5Qvt+C+QH1hyYUOVK7857nFmyDBYgZ/o+AnibzNVqyYCJQvyDXDTK+iXdkA71bY7TL3bvuLxLBQ8kbTvTEY9aqkQ3+MiLWbEgjLzOH+lXgco1ERgzd80rDCymlpaRQbOYnKG/ODoFl46lzT0cjM5FYVvv0qLUbD5lyJtMUaC1pFlTkNONx6lliaX9o0i/1vws5bNKn5OuENQEKmLlcP4o2ZmJjD4zzd3Fk32uQ4uRWkPSUqb4LBe3EXHdORNB2BWsws5daRnMfNVX7isPSb1hMQdAJi1/qmDMfRUlCU74pmnzjbXfL8PVG8NsW6IQM2Ne23iCPIpryJjYbVnm5hCvKpMa7HLViNiNc+xTfDIaKm3jctViD8A1M9YPJNk003VVr4Zo2MuGW8vil8SLaGpPXqG7I4DLdtl8a4Rbx1Lt4w5Huqaa1XzZBtj208EJVGcmKYEuaeN27zT9EE6a09JerXdEbpaNgNqYJdhP1NdqiPKsbDRUi86XvvNC7rME5mrSQtrzAZVndtSjCMqd8BmaeGR4l4YFULGRBeXIV9Y4yxLFdyoUNpiy2IhePSWzBofYPP0eIa2q5JP4j9G8at/AqoSsLAUuRXtvgsqX/zYwsE+of6oSDbUOo4RMJw+DOUTJq+hnqwKim9Yy/napyZNTc2rCq6V9jHtJbxGPDwlzWj/Sk3zF/BHOlT/fSjSq7FqlPI1q6J+ru8Aku008SFINXZfOfnZNOvGPMtEmn2gLPt+H4QLA+/SYe4j398auzhKIp2Pok3mPC5q1IN1HgR+mnEfc4NeeHYwd2/kpszR3cBn7ni9NbIqhtSWFW8xbUJuUPVOeeXu3j0IGZmFNiwaNZ6rH4/zQ2ODz6tFxRLsUYZu1bfd1uIvfQDt4YD/efKYv8VF8bHGDgK22w2Wqwpi43vNCOXFJZCGMqWiPbL8mil6tsmOTXAWCyMCw73e2rADZj2IK6rqksM3EXF2cbLb4vjB14wa/yXK5vwU+05MzERJ5nXsXsW21o7M+gO0js2OyKciP5uF2iXyb2DiptwQeHeqygkrNsqVCSlldxBMpwHi1vfc8RKpP/4L3Lmpq6DZcvhDDfxTCE3splacTcOtXdK2g303dIWBVe2wD/Gvja1cClFQ67gw0t1ZUttsUgQ1Veky8oOpS6ksYEc4bqseCbZy766SvL3FodmnahlWJRgVCNjPxhL/fk2wyvlKhITH/VQCipOI0dNcRa5B1M5HmOBjTLeZQJy237e2mobwmDyJNHePhdDmiknvLKaDbShL+Is1XTCJuLQd2wmdJL7+mKvs294whXQD+vtd88KKk0DXP8B1Xu9J+xo69VOuFgexgTrcvI6SyltuLix9OPuE6/iRJYoBMEXxU4shQMf4Fjqwf1PtnJ/wWSZd29rhZjRmTGgiGTAUQqRz+nCdjeMfYhsBD5Lv60KILWEvNEHfmsDs2L0A252351eUoYxAysVaCJVLdH9QFWAmqJDCODUcdoo12+gd6bW2boY0pBVHWL6LQDK5bYWh1V8vFvi0cRpfwv7cJiMX3AZNJuTddHehTIdU0YQ/sQ1dLoF2xQPcCuHKiuCWOY30DHe1OwcClLAhqAKyqlnIbH/8u9ScJpcS4kgp6HKDUdiOgRaRGSiUCRBjzI5gSksMZKqy7Sd51aeg0tgJ+x0TH9YH2Mgsap9N7ENZdEB0bey2DMTrBA1hn56SErNHf3tKtqyL9b6yXEP97/rc+jgD2N1LNUH6RM9AzP3kSipr06RkKOolR7HO768jjWiH1X92jA7dkg7gcNcjqsZCgfqWw0tPXdLg20cF6vnQypg7gLtkazrHAodyYfENPQZsdfnjMZiNu4nJO97D1/sQE+3vNFzrSDOKw+keLECYf7RJwVHeP/j79833oZ0egonYB2FlFE5qj02B/LVOMJQlsB8uNg3Leg4qtZwntsOSNidR0abbZmAK4sCzvt8Yiuz2yrNCJoH5O8XvX/vLeR/BBYTWj0sOPYM/jyxRd5+/JziKAABaPcw/34UA3aj/gLZxZgRCWN6m4m3demanNgsx0P237/Q+Ew5VYnJPkyCY0cIVHoFn2Ay/e7U4P19APbPFXEHX94N6KhEMPG7iwB3+I+O1jd5n6VSgHegxgaSawO6iQCYFgDsPSMsNOcUj4q3sF6KzGaH/0u5PQoAj/8zq6Uc9MoNrGqhYeb2jQo0WlGlXjxtanZLS24/OIN5Gx/2g684BPDQpwlqnkFcxpmP/osnOXrFuu4PqifouQH0eF5qCkvITQbJw/Zvy5mAHWC9oU+cTiYhJmSfKsCyt1cGVxisKu+NymEQIAyaCgud/V09qT3nk/9s/SWsYtha7yNpzBIMM40rCSGaJ9u6lEkl00vXBiEt7p9P5IBCiavynEOv7FgLqPdeqxRiCwuFVMolSIUBcoyfUC2e2FJSAUgYdVGFf0b0Kn2EZlK97yyxrT2MVgvtRikfdaAW8RwEEfN+B7/eK8bBdp7URpbqn1xcrC6d2UjdsKbzCjBFqkKkoZt7Mrhg6YagE7spkqj0jOrWM+UGQ0MUlG2evP1uE1p2xSv4dMK0dna6ENcNUF+xkaJ7B764NdxLCpuvhblltVRAf7vK5qPttJ/9RYFUUSGcLdibnz6mf7WkPO3MkUUhR2mAOuGv8IWw5XG1ZvoVMnjSAZe6T7WYA99GENxoHkMiKxHlCuK5Gd0INrISImHQrQmv6F4mqU/TTQ8nHMDzCRivKySQ8dqkpQgnUMnwIkaAuc6/FGq1hw3b2Sba398BhUwUZSAIO8XZvnuLdY2n6hOXws+gq9BHUKcKFA6kz6FDnpxLPICa3qGhnc97bo1FT/XJk48LrkHJ2CAtBv0RtN97N21plfpXHvZ8gMJb7Zc4cfI6MbPwsW7AilCSXMFIEUEmir8XLEklA0ztYbGpTTGqttp5hpFTTIqUyaAIqvMT9A/x+Ji5ejA4Bhxb/cl1pUdOD6epd3yilIdO6j297xInoiBPuEDW2/UfslDyhGkQs7Wy253bVnlT+SWg89zYIK/9KXFl5fe+jow2rd5FXv8zDPrmfMXiUPt9QBO/iK4QGbX5j/7Rx1c1vzsY8ONbP3lVIaPrhL4+1QrECTN3nyKavGG0gBBtHvTKhGoBHgMXHStFowN+HKrPriYu+OZ05Frn8okQrPaaxoKP1ULCS/cmKFN3gcH7HQlVjraCeQmtjg1pSQxeuqXiSKgLpxc/1OiZsU4+n4lz4hpahGyWBURLi4642n1gn9qz9bIsaCeEPJ0uJmenMWp2tJmIwLQ6VSgDYErOeBCfSj9P4G/vI7oIF+l/n5fp956QgxGvur77ynawAu3G9MdFbJbu49NZnWnnFcQHjxRuhUYvg1U/e84N4JTecciDAKb/KYIFXzloyuE1eYXf54MmhjTq7B/yBToDzzpx3tJCTo3HCmVPYfmtBRe3mPYEE/6RlTIxbf4fSOcaKFGk4gbaUWe44hVk9SZzhW80yfW5QWBHxmtUzvMhfVQli4gZTktIOZd9mjJ5hsbmzttaHQB29Am3dZkmx3g/qvYocyhZ2PXAWsNQiIaf+Q8W/MWPIK7/TjvCx5q2XRp4lVWydMc2wIQkhadDB0xsnw/kSEyGjLKjI4coVIwtubTF3E7MJ6LS6UOsJKj82XVAVPJJcepfewbzE91ivXZvOvYfsmMevwtPpfMzGmC7WJlyW2j0jh7AF1JLmwEJSKYwIvu6DHc3YnyLH9ZdIBnQ+nOVDRiP+REpqv++typYHIvoJyICGA40d8bR7HR2k7do6UQTHF4oriYeIQbxKe4Th6+/l1BjUtS9hqORh3MbgvYrStXTfSwaBOmAVQZzpYNqsAmQyjY56MUqty3c/xH6GuhNvNaG9vGbG6cPtBM8UA3e8r51D0AR9kozKuGGSMgLz3nAHxDNnc7GTwpLj7/6HeWp1iksDeTjwCLpxejuMtpMnGJgsiku1sOACwQ9ukzESiDRN77YNESxR5LphOlcASXA5uIts1LnBIcn1J7BLWs49DMALSnuz95gdOrTZr0u1SeYHinno/pE58xYoXbVO/S+FEMMs5qyWkMnp8Q3ClyTlZP52Y9nq7b8fITPuVXUk9ohG5EFHw4gAEcjFxfKb3xuAsEjx2z1wxNbSZMcgS9GKyW3R6KwJONgtA64LTyxWm8Bvudp0M1FdJPEGopM4Fvg7G/hsptkhCfHFegv4ENwxPeXmYhxwZy7js+BeM27t9ODBMynVCLJ7RWcBMteZJtvjOYHb5lOnCLYWNEMKC59BA7covu1cANa2PXL05iGdufOzkgFqqHBOrgQVUmLEc+Mkz4Rq8O6WkNr7atNkH4M8d+SD1t/tSzt3oFql+neVs+AwEI5JaBJaxARtY2Z4mKoUqxds4UpZ0sv3zIbNoo0J4fihldQTX3XNcuNcZmcrB5LTWMdzeRuAtBk3cZHYQF6gTi3PNuDJ0nmR+4LPLoHvxQIxRgJ9iNNXqf2SYJhcvCtJiVWo85TsyFOuq7EyBPJrAdhEgE0cTq16FQXhYPJFqSfiVn0IQnPOy0LbU4BeG94QjdYNB0CiQ3QaxQqD2ebSMiNjaVaw8WaM4Z5WnzcVDsr4eGweSLa2DE3BWViaxhZFIcSTjgxNCAfelg+hznVOYoe5VqTYs1g7WtfTm3e4/WduC6p+qqAM8H4ZyrJCGpewThTDPe6H7CzX/zQ8Tm+r65HeZn+MsmxUciEWPlAVaK/VBaQBWfoG/aRL/jSZIQfep/89GjasWmbaWzeEZ2R1FOjvyJT37O9B8046SRSKVEnXWlBqbkb5XCS3qFeuE9xb9+frEknxWB5h1D/hruz2iVDEAS7+qkEz5Ot5agHJc7WCdY94Ws61sURcX5nG8UELGBAHZ3i+3VulAyT0nKNNz4K2LBHBWJcTBX1wzf+//u/j/9+//v87+9/l9Lbh/L/uyNYiTsWV2LwsjaA6MxTuzFMqmxW8Jw/+IppdX8t/Clgi1rI1SN0UC/r6tX/4lUc2VV1OQReSeCsjUpKZchw4XUcjHfw6ryCV3R8s6VXm67vp4n+lcPV9gJwmbKQEsmrJi9c2vkwrm8HFbVYNTaRGq8D91t9n5+U+aD/hNtN3HjC/nC/vUoGFSCkXP+NlRcmLUqLbiUBl4LYf1U/CCvwtd3ryCH8gUmGITAxiH1O5rnGTz7y1LuFjmnFGQ1UWuM7HwfXtWl2fPFKklYwNUpF2IL/TmaRETjQiM5SJacI+3Gv5MBU8lP5Io6gWkawpyzNEVGqOdx4YlO1dCvjbWFZWbCmeiFKPSlMKtKcMFLs/KQxtgAHi7NZNCQ32bBAW2mbHflVZ8wXKi1JKVHkW20bnYnl3dKWJeWJOiX3oKPBD6Zbi0ZvSIuWktUHB8qDR8DMMh1ZfkBL9FS9x5r0hBGLJ8pUCJv3NYH+Ae8p40mZWd5m5fhobFjQeQvqTT4VKWIYfRL0tfaXKiVl75hHReuTJEcqVlug+eOIIc4bdIydtn2K0iNZPsYWQvQio2qbO3OqAlPHDDOB7DfjGEfVF51FqqNacd6QmgFKJpMfLp5DHTv4wXlONKVXF9zTJpDV4m1sYZqJPhotcsliZM8yksKkCkzpiXt+EcRQvSQqmBS9WdWkxMTJXPSw94jqI3varCjQxTazjlMH8jTS8ilaW8014/vwA/LNa+YiFoyyx3s/KswP3O8QW1jtq45yTM/DX9a8M4voTVaO2ebvw1EooDw/yg6Y1faY+WwrdVs5Yt0hQ5EwRfYXSFxray1YvSM+kYmlpLG2/9mm1MfmbKHXr44Ih8nVKb1M537ZANUkCtdsPZ80JVKVKabVHCadaLXg+IV8i5GSwpZti0h6diTaKs9sdpUKEpd7jDUpYmHtiX33SKiO3tuydkaxA7pEc9XIQEOfWJlszj5YpL5bKeQyT7aZSBOamvSHl8xsWvgo26IP/bqk+0EJUz+gkkcvlUlyPp2kdKFtt7y5aCdks9ZJJcFp5ZWeaWKgtnXMN3ORwGLBE0PtkEIek5FY2aVssUZHtsWIvnljMVJtuVIjpZup/5VL1yPOHWWHkOMc6YySWMckczD5jUj2mlLVquFaMU8leGVaqeXis+aRRL8zm4WuBk6cyWfGMxgtr8useQEx7k/PvRoZyd9nde1GUCV84gMX8Ogu/BWezYPSR27llzQnA97oo0pYyxobYUJfsj+ysTm9zJ+S4pk0TGo9VTG0KjqYhTmALfoDZVKla2b5yhv241PxFaLJs3i05K0AAIdcGxCJZmT3ZdT7CliR7q+kur7WdQjygYtOWRL9B8E4s4LI8KpAj7bE0dg7DLOaX+MGeAi0hMMSSWZEz+RudXbZCsGYS0QqiXjH9XQbd8sCB+nIVTq7/T/FDS+zWY9q7Z2fdq1tdLb6v3hKKVDAw5gjj6o9r1wHFROdHc18MJp4SJ2Ucvu+iQ9EgkekW8VCM+psM6y+/2SBy8tNN4a3L1MzP+OLsyvESo5gS7IQOnIqMmviJBVc6zbVG1n8eXiA3j46kmvvtJlewwNDrxk4SbJOtP/TV/lIVK9ueShNbbMHfwnLTLLhbZuO79ec5XvfgRwLFK+w1r5ZWW15rVFZrE+wKqNRv5KqsLNfpGgnoUU6Y71NxEmN7MyqwqAQqoIULOw/LbuUB2+uE75gJt+kq1qY4LoxV+qR/zalupea3D5+WMeaRIn0sAI6DDWDh158fqUb4YhAxhREbUN0qyyJYkBU4V2KARXDT65gW3gRsiv7xSPYEKLwzgriWcWgPr0sbZnv7m1XHNFW6xPdGNZUdxFiUYlmXNjDVWuu7LCkX/nVkrXaJhiYktBISC2xgBXQnNEP+cptWl1eG62a7CPXrnrkTQ5BQASbEqUZWMDiZUisKyHDeLFOaJILUo5f6iDt4ZO8MlqaKLto0AmTHVVbkGuyPa1R/ywZsWRoRDoRdNMMHwYTsklMVnlAd2S0282bgMI8fiJpDh69OSL6K3qbo20KfpNMurnYGQSr/stFqZ7hYsxKlLnKAKhsmB8AIpEQ4bd/NrTLTXefsE6ChRmKWjXKVgpGoPs8GAicgKVw4K0qgDgy1A6hFq1WRat3fHF+FkU+b6H4NWpOU3KXTxrIb2qSHAb+qhm8hiSROi/9ofapjxhyKxxntPpge6KL5Z4+WBMYkAcE6+0Hd3Yh2zBsK2MV3iW0Y6cvOCroXlRb2MMJtdWx+3dkFzGh2Pe3DZ9QpSqpaR/rE1ImOrHqYYyccpiLC22amJIjRWVAherTfpQLmo6/K2pna85GrDuQPlH1Tsar8isAJbXLafSwOof4gg9RkAGm/oYpBQQiPUoyDk2BCQ1k+KILq48ErFo4WSRhHLq/y7mgw3+L85PpP6xWr6cgp9sOjYjKagOrxF148uhuaWtjet953fh1IQiEzgC+d2IgBCcUZqgTAICm2bR8oCjDLBsmg+ThyhfD+zBalsKBY1Ce54Y/t9cwfbLu9SFwEgphfopNA3yNxgyDafUM3mYTovZNgPGdd4ZFFOj1vtfFW3u7N+iHEN1HkeesDMXKPyoCDCGVMo4GCCD6PBhQ3dRZIHy0Y/3MaE5zU9mTCrwwnZojtE+qNpMSkJSpmGe0EzLyFelMJqhfFQ7a50uXxZ8pCc2wxtAKWgHoeamR2O7R+bq7IbPYItO0esdRgoTaY38hZLJ5y02oIVwoPokGIzxAMDuanQ1vn2WDQ00Rh6o5QOaCRu99fwDbQcN0XAuqkFpxT/cfz3slGRVokrNU0iqiMAJFEbKScZdmSkTUznC0U+MfwFOGdLgsewRyPKwBZYSmy6U325iUhBQNxbAC3FLKDV9VSOuQpOOukJ/GAmu/tyEbX9DgEp6dv1zoU0IqzpG6gssSjIYRVPGgU1QAQYRgIT8gEV0EXr1sqeh2I6rXjtmoCYyEDCe/PkFEi/Q48FuT29p557iN+LCwk5CK/CZ2WdAdfQZh2Z9QGrzPLSNRj5igUWzl9Vi0rCqH8G1Kp4QMLkuwMCAypdviDXyOIk0AHTM8HBYKh3b0/F+DxoNj4ZdoZfCpQVdnZarqoMaHWnMLNVcyevytGsrXQEoIbubqWYNo7NRHzdc0zvT21fWVirj7g36iy6pxogfvgHp1xH1Turbz8QyyHnXeBJicpYUctbzApwzZ1HT+FPEXMAgUZetgeGMwt4G+DHiDT2Lu+PT21fjJCAfV16a/Wu1PqOkUHSTKYhWW6PhhHUlNtWzFnA7MbY+r64vkwdpfNB2JfWgWXAvkzd42K4lN9x7Wrg4kIKgXCb4mcW595MCPJ/cTfPAMQMFWwnqwde4w8HZYJFpQwcSMhjVz4B8p6ncSCN1X4klxoIH4BN2J6taBMj6lHkAOs8JJAmXq5xsQtrPIPIIp/HG6i21xMGcFgqDXSRF0xQg14d2uy6HgKE13LSvQe52oShF5Jx1R6avyL4thhXQZHfC94oZzuPUBKFYf1VvDaxIrtV6dNGSx7DO0i1p6CzBkuAmEqyWceQY7F9+U0ObYDzoa1iKao/cOD/v6Q9gHrrr1uCeOk8fST9MG23Ul0KmM3r+Wn6Hi6WAcL7gEeaykicvgjzkjSwFsAXIR81Zx4QJ6oosVyJkCcT+4xAldCcihqvTf94HHUPXYp3REIaR4dhpQF6+FK1H0i9i7Pvh8owu3lO4PT1iuqu+DkL2Bj9+kdfGAg2TXw03iNHyobxofLE2ibjsYDPgeEQlRMR7afXbSGQcnPjI2D+sdtmuQ771dbASUsDndU7t58jrrNGRzISvwioAlHs5FA+cBE5Ccznkd8NMV6BR6ksnKLPZnMUawRDU1MZ/ib3xCdkTblHKu4blNiylH5n213yM0zubEie0o4JhzcfAy3H5qh2l17uLooBNLaO+gzonTH2uF8PQu9EyH+pjGsACTMy4cHzsPdymUSXYJOMP3yTkXqvO/lpvt0cX5ekDEu9PUfBeZODkFuAjXCaGdi6ew4qxJ8PmFfwmPpkgQjQlWqomFY6UkjmcnAtJG75EVR+NpzGpP1Ef5qUUbfowrC3zcSLX3BxgWEgEx/v9cP8H8u1Mvt9/rMDYf6sjwU1xSOPBgzFEeJLMRVFtKo5QHsUYT8ZRLCah27599EuqoC9PYjYO6aoAMHB8X1OHwEAYouHfHB3nyb2B+SnZxM/vw/bCtORjLMSy5aZoEpvgdGvlJfNPFUu/p7Z4VVK1hiI0/UTuB3ZPq4ohEbm7Mntgc1evEtknaosgZSwnDC2BdMmibpeg48X8Ixl+/8+xXdbshQXUPPvx8jT3fkELivHSmqbhblfNFShWAyQnJ3WBU6SMYSIpTDmHjdLVAdlADdz9gCplZw6mTiHqDwIsxbm9ErGusiVpg2w8Q3khKV/R9Oj8PFeF43hmW/nSd99nZzhyjCX3QOZkkB6BsH4H866WGyv9E0hVAzPYah2tkRfQZMmP2rinfOeQalge0ovhduBjJs9a1GBwReerceify49ctOh5/65ATYuMsAkVltmvTLBk4oHpdl6i+p8DoNj4Fb2vhdFYer2JSEilEwPd5n5zNoGBXEjreg/wh2NFnNRaIUHSOXa4eJRwygZoX6vnWnqVdCRT1ARxeFrNBJ+tsdooMwqnYhE7zIxnD8pZH+P0Nu1wWxCPTADfNWmqx626IBJJq6NeapcGeOmbtXvl0TeWG0Y7OGGV4+EHTtNBIT5Wd0Bujl7inXgZgfXTM5efD3qDTJ54O9v3Bkv+tdIRlq1kXcVD0BEMirmFxglNPt5pedb1AnxuCYMChUykwsTIWqT23XDpvTiKEru1cTcEMeniB+HQDehxPXNmkotFdwUPnilB/u4Nx5Xc6l8J9jH1EgKZUUt8t8cyoZleDBEt8oibDmJRAoMKJ5Oe9CSWS5ZMEJvacsGVdXDWjp/Ype5x0p9PXB2PAwt2LRD3d+ftNgpuyvxlP8pB84oB1i73vAVpwyrmXW72hfW6Dzn9Jkj4++0VQ4d0KSx1AsDA4OtXXDo63/w+GD+zC7w5SJaxsmnlYRQ4dgdjA7tTl2KNLnpJ+mvkoDxtt1a4oPaX3EVqj96o9sRKBQqU7ZOiupeAIyLMD+Y3YwHx30XWHB5CQiw7q3mj1EDlP2eBsZbz79ayUMbyHQ7s8gu4Lgip1LiGJj7NQj905/+rgUYKAA5qdrlHKIknWmqfuR+PB8RdBkDg/NgnlT89G72h2NvySnj7UyBwD+mi/IWs1xWbxuVwUIVXun5cMqBtFbrccI+DILjsVQg6eeq0itiRfedn89CvyFtpkxaauEvSANuZmB1p8FGPbU94J9medwsZ9HkUYjmI7OH5HuxendLbxTaYrPuIfE2ffXFKhoNBUp33HsFAXmCV/Vxpq5AYgFoRr5Ay93ZLRlgaIPjhZjXZZChT+aE5iWAXMX0oSFQEtwjiuhQQItTQX5IYrKfKB+queTNplR1Hoflo5/I6aPPmACwQCE2jTOYo5Dz1cs7Sod0KTG/3kEDGk3kUaUCON19xSJCab3kNpWZhSWkO8l+SpW70Wn3g0ciOIJO5JXma6dbos6jyisuxXwUUhj2+1uGhcvuliKtWwsUTw4gi1c/diEEpZHoKoxTBeMDmhPhKTx7TXWRakV8imJR355DcIHkR9IREHxohP4TbyR5LtFU24umRPRmEYHbpe1LghyxPx7YgUHjNbbQFRQhh4KeU1EabXx8FS3JAxp2rwRDoeWkJgWRUSKw6gGP5U2PuO9V4ZuiKXGGzFQuRuf+tkSSsbBtRJKhCi3ENuLlXhPbjTKD4djXVnfXFds6Zb+1XiUrRfyayGxJq1+SYBEfbKlgjiSmk0orgTqzSS+DZ5rTqsJbttiNtp+KMqGE2AHGFw6jQqM5vD6vMptmXV9OAjq49Uf/Lx9Opam+Hn5O9p8qoBBAQixzQZ4eNVkO9sPzJAMyR1y4/RCQQ1s0pV5KAU5sKLw3tkcFbI/JqrjCsK4Mw+W8aod4lioYuawUiCyVWBE/qPaFi5bnkgpfu/ae47174rI1fqQoTbW0HrU6FAejq7ByM0V4zkZTg02/YJK2N7hUQRCeZ4BIgSEqgD8XsjzG6LIsSbuHoIdz/LhFzbNn1clci1NHWJ0/6/O8HJMdIpEZbqi1RrrFfoo/rI/7ufm2MPG5lUI0IYJ4MAiHRTSOFJ2oTverFHYXThkYFIoyFx6rMYFgaOKM4xNWdlOnIcKb/suptptgTOTdVIf4YgdaAjJnIAm4qNNHNQqqAzvi53GkyRCEoseUBrHohZsjUbkR8gfKtc/+Oa72lwxJ8Mq6HDfDATbfbJhzeIuFQJSiw1uZprHlzUf90WgqG76zO0eCB1WdPv1IT6sNxxh91GEL2YpgC97ikFHyoaH92ndwduqZ6IYjkg20DX33MWdoZk7QkcKUCgisIYslOaaLyvIIqRKWQj16jE1DlQWJJaPopWTJjXfixEjRJJo8g4++wuQjbq+WVYjsqCuNIQW3YjnxKe2M5ZKEqq+cX7ZVgnkbsU3RWIyXA1rxv4kGersYJjD//auldXGmcEbcfTeF16Y1708FB1HIfmWv6dSFi6oD4E+RIjCsEZ+kY7dKnwReJJw3xCjKvi3kGN42rvyhUlIz0Bp+fNSV5xwFiuBzG296e5s/oHoFtUyUplmPulIPl+e1CQIQVtjlzLzzzbV+D/OVQtYzo5ixtMi5BmHuG4N/uKfJk5UIREp7+12oZlKtPBomXSzAY0KgtbPzzZoHQxujnREUgBU+O/jKKhgxVhRPtbqyHiUaRwRpHv7pgRPyUrnE7fYkVblGmfTY28tFCvlILC04Tz3ivkNWVazA+OsYrxvRM/hiNn8Fc4bQBeUZABGx5S/xFf9Lbbmk298X7iFg2yeimvsQqqJ+hYbt6uq+Zf9jC+Jcwiccd61NKQtFvGWrgJiHB5lwi6fR8KzYS7EaEHf/ka9EC7H8D+WEa3TEACHBkNSj/cXxFeq4RllC+fUFm2xtstYLL2nos1DfzsC9vqDDdRVcPA3Ho95aEQHvExVThXPqym65llkKlfRXbPTRiDepdylHjmV9YTWAEjlD9DdQnCem7Aj/ml58On366392214B5zrmQz/9ySG2mFqEwjq5sFl5tYJPw5hNz8lyZPUTsr5E0F2C9VMPnZckWP7+mbwp/BiN7f4kf7vtGnZF2JGvjK/sDX1RtcFY5oPQnE4lIAYV49U3C9SP0LCY/9i/WIFK9ORjzM9kG/KGrAuwFmgdEpdLaiqQNpCTGZVuAO65afkY1h33hrqyLjZy92JK3/twdj9pafFcwfXONmPQWldPlMe7jlP24Js0v9m8bIJ9TgS2IuRvE9ZVRaCwSJYOtAfL5H/YS4FfzKWKbek+GFulheyKtDNlBtrdmr+KU+ibHTdalzFUmMfxw3f36x+3cQbJLItSilW9cuvZEMjKw987jykZRlsH/UI+HlKfo2tLwemBEeBFtmxF2xmItA/dAIfQ+rXnm88dqvXa+GapOYVt/2waFimXFx3TC2MUiOi5/Ml+3rj/YU6Ihx2hXgiDXFsUeQkRAD6wF3SCPi2flk7XwKAA4zboqynuELD312EJ88lmDEVOMa1W/K/a8tGylZRMrMoILyoMQzzbDJHNZrhH77L9qSC42HVmKiZ5S0016UTp83gOhCwz9XItK9fgXfK3F5d7nZCBUekoLxrutQaPHa16Rjsa0gTrzyjqTnmcIcrxg6X6dkKiucudc0DD5W4pJPf0vuDW8r5/uw24YfMuxFRpD2ovT2mFX79xH6Jf+MVdv2TYqR6/955QgVPe3JCD/WjAYcLA9tpXgFiEjge2J5ljeI/iUzg91KQuHkII4mmHZxC3XQORLAC6G7uFn5LOmlnXkjFdoO976moNTxElS8HdxWoPAkjjocDR136m2l+f5t6xaaNgdodOvTu0rievnhNAB79WNrVs6EsPgkgfahF9gSFzzAd+rJSraw5Mllit7vUP5YxA843lUpu6/5jAR0RvH4rRXkSg3nE+O5GFyfe+L0s5r3k05FyghSFnKo4TTgs07qj4nTLqOYj6qaW9knJTDkF5OFMYbmCP+8H16Ty482OjvERV6OFyw043L9w3hoJi408sR+SGo1WviXUu8d7qS+ehKjpKwxeCthsm2LBFSFeetx0x4AaKPxtp3CxdWqCsLrB1s/j5TAhc1jNZsXWl6tjo/WDoewxzg8T8NnhZ1niUwL/nhfygLanCnRwaFGDyLw+sfZhyZ1UtYTp8TYB6dE7R3VsKKH95CUxJ8u8N+9u2/9HUNKHW3x3w5GQrfOPafk2w5qZq8MaHT0ebeY3wIsp3rN9lrpIsW9c1ws3VNV+JwNz0Lo9+V7zZr6GD56We6gWVIvtmam5GPPkVAbr74r6SwhuL+TRXtW/0pgyX16VNl4/EAD50TnUPuwrW6OcUO2VlWXS0inq872kk7GUlW6o/ozFKq+Sip6LcTtSDfDrPTcCHhx75H8BeRon+KG2wRwzfDgWhALmiWOMO6h3pm1UCZEPEjScyk7tdLx6WrdA2N1QTPENvNnhCQjW6kl057/qv7IwRryHrZBCwVSbLLnFRiHdTwk8mlYixFt1slEcPD7FVht13HyqVeyD55HOXrh2ElAxJyinGeoFzwKA91zfrdLvDxJSjzmImfvTisreI25EDcVfGsmxLVbfU8PGe/7NmWWKjXcdTJ11jAlVIY/Bv/mcxg/Q10vCHwKG1GW/XbJq5nxDhyLqiorn7Wd7VEVL8UgVzpHMjQ+Z8DUgSukiVwWAKkeTlVVeZ7t1DGnCgJVIdBPZAEK5f8CDyDNo7tK4/5DBjdD5MPV86TaEhGsLVFPQSI68KlBYy84FievdU9gWh6XZrugvtCZmi9vfd6db6V7FmoEcRHnG36VZH8N4aZaldq9zZawt1uBFgxYYx+Gs/qW1jwANeFy+LCoymyM6zgG7j8bGzUyLhvrbJkTYAEdICEb4kMKusKT9V3eIwMLsjdUdgijMc+7iKrr+TxrVWG0U+W95SGrxnxGrE4eaJFfgvAjUM4SAy8UaRwE9j6ZQH5qYAWGtXByvDiLSDfOD0yFA3UCMKSyQ30fyy1mIRg4ZcgZHLNHWl+c9SeijOvbOJxoQy7lTN2r3Y8p6ovxvUY74aOYbuVezryqXA6U+fcp6wSV9X5/OZKP18tB56Ua0gMyxJI7XyNT7IrqN8GsB9rL/kP5KMrjXxgqKLDa+V5OCH6a5hmOWemMUsea9vQl9t5Oce76PrTyTv50ExOqngE3PHPfSL//AItPdB7kGnyTRhVUUFNdJJ2z7RtktZwgmQzhBG/G7QsjZmJfCE7k75EmdIKH7xlnmDrNM/XbTT6FzldcH/rcRGxlPrv4qDScqE7JSmQABJWqRT/TUcJSwoQM+1jvDigvrjjH8oeK2in1S+/yO1j8xAws/T5u0VnIvAPqaE1atNuN0cuRliLcH2j0nTL4JpcR7w9Qya0JoaHgsOiALLCCzRkl1UUESz+ze/gIXHGtDwgYrK6pCFKJ1webSDog4zTlPkgXZqxlQDiYMjhDpwTtBW2WxthWbov9dt2X9XFLFmcF+eEc1UaQ74gqZiZsdj63pH1qcv3Vy8JYciogIVKsJ8Yy3J9w/GhjWVSQAmrS0BPOWK+RKV+0lWqXgYMnIFwpcZVD7zPSp547i9HlflB8gVnSTGmmq1ClO081OW/UH11pEQMfkEdDFzjLC1Cdo/BdL3s7cXb8J++Hzz1rhOUVZFIPehRiZ8VYu6+7Er7j5PSZu9g/GBdmNzJmyCD9wiswj9BZw+T3iBrg81re36ihMLjoVLoWc+62a1U/7qVX5CpvTVF7rocSAKwv4cBVqZm7lLDS/qoXs4fMs/VQi6BtVbNA3uSzKpQfjH1o3x4LrvkOn40zhm6hjduDglzJUwA0POabgdXIndp9fzhOo23Pe+Rk9GSLX0d71Poqry8NQDTzNlsa+JTNG9+UrEf+ngxCjGEsDCc0bz+udVRyHQI1jmEO3S+IOQycEq7XwB6z3wfMfa73m8PVRp+iOgtZfeSBl01xn03vMaQJkyj7vnhGCklsCWVRUl4y+5oNUzQ63B2dbjDF3vikd/3RUMifPYnX5Glfuk2FsV/7RqjI9yKTbE8wJY+74p7qXO8+dIYgjtLD/N8TJtRh04N9tXJA4H59IkMmLElgvr0Q5OCeVfdAt+5hkh4pQgfRMHpL74XatLQpPiOyHRs/OdmHtBf8nOZcxVKzdGclIN16lE7kJ+pVMjspOI+5+TqLRO6m0ZpNXJoZRv9MPDRcAfJUtNZHyig/s2wwReakFgPPJwCQmu1I30/tcBbji+Na53i1W1N+BqoY7Zxo+U/M9XyJ4Ok2SSkBtoOrwuhAY3a03Eu6l8wFdIG1cN+e8hopTkiKF093KuH/BcB39rMiGDLn6XVhGKEaaT/vqb/lufuAdpGExevF1+J9itkFhCfymWr9vGb3BTK4j598zRH7+e+MU9maruZqb0pkGxRDRE1CD4Z8LV4vhgPidk5w2Bq816g3nHw1//j3JStz7NR9HIWELO8TMn3QrP/zZp//+Dv9p429/ogv+GATR+n/UdF+ns9xNkXZQJXY4t9jMkJNUFygAtzndXwjss+yWH9HAnLQQfhAskdZS2l01HLWv7L7us5uTH409pqitvfSOQg/c+Zt7k879P3K9+WV68n7+3cZfuRd/dDPP/03rn+d+/nBvWfgDlt8+LzjqJ/vx3CnNOwiXhho778C96iD+1TBvRZYeP+EH81LE0vVwOOrmCLB3iKzI1x+vJEsrPH4uF0UB4TJ4X3uDfOCo3PYpYe0MF4bouh0DQ/l43fxUF7Y+dpWuvTSffB0yO2UQUETI/LwCZE3BvnevJ7c9zUlY3H58xzke6DNFDQG8n0WtDN4LAYN4nogKav1ezOfK/z+t6tsCTp+dhx4ymjWuCJk1dEUifDP+HyS4iP/Vg9B2jTo9L4NbiBuDS4nuuHW6H+JDQn2JtqRKGkEQPEYE7uzazXIkcxIAqUq1esasZBETlEZY7y7Jo+RoV/IsjY9eIMkUvr42Hc0xqtsavZvhz1OLwSxMOTuqzlhb0WbdOwBH9EYiyBjatz40bUxTHbiWxqJ0uma19qhPruvcWJlbiSSH48OLDDpaHPszvyct41ZfTu10+vjox6kOqK6v0K/gEPphEvMl/vwSv+A4Hhm36JSP9IXTyCZDm4kKsqD5ay8b1Sad/vaiyO5N/sDfEV6Z4q95E+yfjxpqBoBETW2C7xl4pIO2bDODDFurUPwE7EWC2Uplq+AHmBHvir2PSgkR12/Ry65O0aZtQPeXi9mTlF/Wj5GQ+vFkYyhXsLTjrBSP9hwk4GPqDP5rBn5/l8b0mLRAvRSzXHc293bs3s8EsdE3m2exxidWVB4joHR+S+dz5/W+v00K3TqN14CDBth8eWcsTbiwXPsygHdGid0PEdy6HHm2v/IUuV5RVapYmzGsX90mpnIdNGcOOq64Dbc5GUbYpD9M7S+6cLY//QmjxFLP5cuTFRm3vA5rkFZroFnO3bjHF35uU3s8mvL7Tp9nyTc4mymTJ5sLIp7umSnGkO23faehtz3mmTS7fbVx5rP7x3HXIjRNeq/A3xCs9JNB08c9S9BF2O3bOur0ItslFxXgRPdaapBIi4dRpKGxVz7ir69t/bc9qTxjvtOyGOfiLGDhR4fYywHv1WdOplxIV87TpLBy3Wc0QP0P9s4G7FBNOdITS/tep3o3h1TEa5XDDii7fWtqRzUEReP2fbxz7bHWWJdbIOxOUJZtItNZpTFRfj6vm9sYjRxQVO+WTdiOhdPeTJ+8YirPvoeL88l5iLYOHd3b/Imkq+1ZN1El3UikhftuteEYxf1Wujof8Pr4ICTu5ezZyZ4tHQMxlzUHLYO2VMOoNMGL/20S5i2o2obfk+8qqdR7xzbRDbgU0lnuIgz4LelQ5XS7xbLuSQtNS95v3ZUOdaUx/Qd8qxCt6xf2E62yb/HukLO6RyorV8KgYl5YNc75y+KvefrxY+lc/64y9kvWP0a0bDz/rojq+RWjO06WeruWqNFU7r3HPIcLWRql8ICZsz2Ls/qOm/CLn6++X+Qf7mGspYCrZod/lpl6Rw4xN/yuq8gqV4B6aHk1hVE1SfILxWu5gvXqbfARYQpspcxKp1F/c8XOPzkZvmoSw+vEqBLdrq1fr3wAPv5NnM9i8F+jdAuxkP5Z71c6uhK3enlnGymr7UsWZKC12qgUiG8XXGQ9mxnqz4GSIlybF9eXmbqj2sHX+a1jf0gRoONHRdRSrIq03Ty89eQ1GbV/Bk+du4+V15zls+vvERvZ4E7ZbnxWTVjDjb4o/k8jlw44pTIrUGxxuJvBeO+heuhOjpFsO6lVJ/aXnJDa/bM0Ql1cLbXE/Pbv3EZ3vj3iVrB5irjupZTzlnv677NrI9UNYNqbPgp/HZXS+lJmk87wec+7YOxTDo2aw2l3NfDr34VNlvqWJBknuK7oSlZ6/T10zuOoPZOeoIk81N+sL843WJ2Q4Z0fZ3scsqC/JV2fuhWi1jGURSKZV637lf53Xnnx16/vKEXY89aVJ0fv91jGdfG+G4+sniwHes4hS+udOr4RfhFhG/F5gUG35QaU+McuLmclb5ZWmR+sG5V6nf+PxYzlrnFGxpZaK8eqqVo0NfmAWoGfXDiT/FnUbWvzGDOTr8aktOZWg4BYvz5YH12ZbfCcGtNk+dDAZNGWvHov+PIOnY9Prjg8h/wLRrT69suaMVZ5bNuK00lSVpnqSX1NON/81FoP92rYndionwgOiA8WMf4vc8l15KqEEG4yAm2+WAN5Brfu1sq9suWYqgoajgOYt/JCk1gC8wPkK+XKCtRX6TAtgvrnuBgNRmn6I8lVDipOVB9kX6Oxkp4ZKyd1M6Gj8/v2U7k+YQBL95Kb9PQENucJb0JlW3b5tObN7m/Z1j1ev388d7o15zgXsI9CikAGAViR6lkJv7nb4Ak40M2G8TJ447kN+pvfHiOFjSUSP6PM+QfbAywKJCBaxSVxpizHseZUyUBhq59vFwrkyGoRiHbo0apweEZeSLuNiQ+HAekOnarFg00dZNXaPeoHPTRR0FmEyqYExOVaaaO8c0uFUh7U4e/UxdBmthlBDgg257Q33j1hA7HTxSeTTSuVnPZbgW1nodwmG16aKBDKxEetv7D9OjO0JhrbJTnoe+kcGoDJazFSO8/fUN9Jy/g4XK5PUkw2dgPDGpJqBfhe7GA+cjzfE/EGsMM+FV9nj9IAhrSfT/J3QE5TEIYyk5UjsI6ZZcCPr6A8FZUF4g9nnpVmjX90MLSQysIPD0nFzqwCcSJmIb5mYv2Cmk+C1MDFkZQyCBq4c/Yai9LJ6xYkGS/x2s5/frIW2vmG2Wrv0APpCdgCA9snFvfpe8uc0OwdRs4G9973PGEBnQB5qKrCQ6m6X/H7NInZ7y/1674/ZXOVp7OeuCRk8JFS516VHrnH1HkIUIlTIljjHaQtEtkJtosYul77cVwjk3gW1Ajaa6zWeyHGLlpk3VHE2VFzT2yI/EvlGUSz2H9zYE1s4nsKMtMqNyKNtL/59CpFJki5Fou6VXGm8vWATEPwrUVOLvoA8jLuwOzVBCgHB2Cr5V6OwEWtJEKokJkfc87h+sNHTvMb0KVTp5284QTPupoWvQVUwUeogZR3kBMESYo0mfukewRVPKh5+rzLQb7HKjFFIgWhj1w3yN/qCNoPI8XFiUgBNT1hCHBsAz8L7Oyt8wQWUFj92ONn/APyJFg8hzueqoJdNj57ROrFbffuS/XxrSXLTRgj5uxZjpgQYceeMc2wJrahReSKpm3QjHfqExTLAB2ipVumE8pqcZv8LYXQiPHHsgb5BMW8zM5pvQit+mQx8XGaVDcfVbLyMTlY8xcfmm/RSAT/H09UQol5gIz7rESDmnrQ4bURIB4iRXMDQwxgex1GgtDxKp2HayIkR+E/aDmCttNm2C6lytWdfOVzD6X2SpDWjQDlMRvAp1symWv4my1bPCD+E1EmGnMGWhNwmycJnDV2WrQNxO45ukEb08AAffizYKVULp15I4vbNK5DzWwCSUADfmKhfGSUqii1L2UsE8rB7mLuHuUJZOx4+WiizHBJ/hwboaBzhpNOVvgFTf5cJsHef7L1HCI9dOUUbb+YxUJWn6dYOLz+THi91kzY5dtO5c+grX7v0jEbsuoOGnoIreDIg/sFMyG+TyCLIcAWd1IZ1UNFxE8Uie13ucm40U2fcxC0u3WLvLOxwu+F7MWUsHsdtFQZ7W+nlfCASiAKyh8rnP3EyDByvtJb6Kax6/HkLzT9SyEyTMVM1zPtM0MJY14DmsWh4MgD15Ea9Hd00AdkTZ0EiG5NAGuIBzQJJ0JR0na+OB7lQA6UKxMfihIQ7GCCnVz694QvykWXTxpS2soDu+smru1UdIxSvAszBFD1c8c6ZOobA8bJiJIvuycgIXBQIXWwhyTgZDQxJTRXgEwRNAawGSXO0a1DKjdihLVNp/taE/xYhsgwe+VpKEEB4LlraQyE84gEihxCnbfoyOuJIEXy2FIYw+JjRusybKlU2g/vhTSGTydvCvXhYBdtAXtS2v7LkHtmXh/8fly1do8FI/D0f8UbzVb5h+KRhMGSAmR2mhi0YG/uj7wgxcfzCrMvdjitUIpXDX8ae2JcF/36qUWIMwN6JsjaRGNj+jEteGDcFyTUb8X/NHSucKMJp7pduxtD6KuxVlyxxwaeiC1FbGBESO84lbyrAugYxdl+2N8/6AgWpo/IeoAOcsG35IA/b3AuSyoa55L7llBLlaWlEWvuCFd8f8NfcTUgzJv6CbB+6ohWwodlk9nGWFpBAOaz5uEW5xBvmjnHFeDsb0mXwayj3mdYq5gxxNf3H3/tnCgHwjSrpSgVxLmiTtuszdRUFIsn6LiMPjL808vL1uQhDbM7aA43mISXReqjSskynIRcHCJ9qeFopJfx9tqyUoGbSwJex/0aDE3plBPGtNBYgWbdLom3+Q/bjdizR2/AS/c/dH/d3G7pyl1qDXgtOFtEqidwLqxPYtrNEveasWq3vPUUtqTeu8gpov4bdOQRI2kneFvRNMrShyVeEupK1PoLDPMSfWMIJcs267mGB8X9CehQCF0gIyhpP10mbyM7lwW1e6TGvHBV1sg/UyTghHPGRqMyaebC6pbB1WKNCQtlai1GGvmq9zUKaUzLaXsXEBYtHxmFbEZ2kJhR164LhWW2Tlp1dhsGE7ZgIWRBOx3Zcu2DxgH+G83WTPceKG0TgQKKiiNNOlWgvqNEbnrk6fVD+AqRam2OguZb0YWSTX88N+i/ELSxbaUUpPx4vJUzYg/WonSeA8xUK6u7DPHgpqWpEe6D4cXg5uK9FIYVba47V/nb+wyOtk+zG8RrS4EA0ouwa04iByRLSvoJA2FzaobbZtXnq8GdbfqEp5I2dpfpj59TCVif6+E75p665faiX8gS213RqBxTZqfHP46nF6NSenOneuT+vgbLUbdTH2/t0REFXZJOEB6DHvx6N6g9956CYrY/AYcm9gELJXYkrSi+0F0geKDZgOCIYkLU/+GOW5aGj8mvLFgtFH5+XC8hvAE3CvHRfl4ofM/Qwk4x2A+R+nyc9gNu/9Tem7XW4XRnyRymf52z09cTOdr+PG6+P/Vb4QiXlwauc5WB1z3o+IJjlbxI8MyWtSzT+k4sKVbhF3xa+vDts3NxXa87iiu+xRH9cAprnOL2h6vV54iQRXuOAj1s8nLFK8gZ70ThIQcWdF19/2xaJmT0efrkNDkWbpAQPdo92Z8+Hn/aLjbOzB9AI/k12fPs9HhUNDJ1u6ax2VxD3R6PywN7BrLJ26z6s3QoMp76qzzwetrDABKSGkfW5PwS1GvYNUbK6uRqxfyVGNyFB0E+OugMM8kKwmJmupuRWO8XkXXXQECyRVw9UyIrtCtcc4oNqXqr7AURBmKn6Khz3eBN96LwIJrAGP9mr/59uTOSx631suyT+QujDd4beUFpZ0kJEEnjlP+X/Kr2kCKhnENTg4BsMTOmMqlj2WMFLRUlVG0fzdCBgUta9odrJfpVdFomTi6ak0tFjXTcdqqvWBAzjY6hVrH9sbt3Z9gn+AVDpTcQImefbB4edirjzrsNievve4ZT4EUZWV3TxEsIW+9MT/RJoKfZZYSRGfC1CwPG/9rdMOM8qR/LUYvw5f/emUSoD7YSFuOoqchdUg2UePd1eCtFSKgxLSZ764oy4lvRCIH6bowPxZWwxNFctksLeil47pfevcBipkkBIc4ngZG+kxGZ71a72KQ7VaZ6MZOZkQJZXM6kb/Ac0/XkJx8dvyfJcWbI3zONEaEPIW8GbkYjsZcwy+eMoKrYjDmvEEixHzkCSCRPRzhOfJZuLdcbx19EL23MA8rnjTZZ787FGMnkqnpuzB5/90w1gtUSRaWcb0eta8198VEeZMUSfIhyuc4/nywFQ9uqn7jdqXh+5wwv+RK9XouNPbYdoEelNGo34KyySwigsrfCe0v/PlWPvQvQg8R0KgHO18mTVThhQrlbEQ0Kp/JxPdjHyR7E1QPw/ut0r+HDDG7BwZFm9IqEUZRpv2WpzlMkOemeLcAt5CsrzskLGaVOAxyySzZV/D2EY7ydNZMf8e8VhHcKGHAWNszf1EOq8fNstijMY4JXyATwTdncFFqcNDfDo+mWFvxJJpc4sEZtjXyBdoFcxbUmniCoKq5jydUHNjYJxMqN1KzYV62MugcELVhS3Bnd+TLLOh7dws/zSXWzxEb4Nj4aFun5x4kDWLK5TUF/yCXB/cZYvI9kPgVsG2jShtXkxfgT+xzjJofXqPEnIXIQ1lnIdmVzBOM90EXvJUW6a0nZ/7XjJGl8ToO3H/fdxnxmTNKBZxnkpXLVgLXCZywGT3YyS75w/PAH5I/jMuRspej8xZObU9kREbRA+kqjmKRFaKGWAmFQspC+QLbKPf0RaK3OXvBSWqo46p70ws/eZpu6jCtZUgQy6r4tHMPUdAgWGGUYNbuv/1a6K+MVFsd3T183+T8capSo6m0+Sh57fEeG/95dykGJBQMj09DSW2bY0mUonDy9a8trLnnL5B5LW3Nl8rJZNysO8Zb+80zXxqUGFpud3Qzwb7bf+8mq6x0TAnJU9pDQR9YQmZhlna2xuxJt0aCO/f1SU8gblOrbIyMsxTlVUW69VJPzYU2HlRXcqE2lLLxnObZuz2tT9CivfTAUYfmzJlt/lOPgsR6VN64/xQd4Jlk/RV7UKVv2Gx/AWsmTAuCWKhdwC+4HmKEKYZh2Xis4KsUR1BeObs1c13wqFRnocdmuheaTV30gvVXZcouzHKK5zwrN52jXJEuX6dGx3BCpV/++4f3hyaW/cQJLFKqasjsMuO3B3WlMq2gyYfdK1e7L2pO/tRye2mwzwZPfdUMrl5wdLqdd2Kv/wVtnpyWYhd49L6rsOV+8HXPrWH2Kup89l2tz6bf80iYSd+V4LROSOHeamvexR524q4r43rTmtFzQvArpvWfLYFZrbFspBsXNUqqenjxNNsFXatZvlIhk7teUPfK+YL32F8McTnjv0BZNppb+vshoCrtLXjIWq3EJXpVXIlG6ZNL0dh6qEm2WMwDjD3LfOfkGh1/czYc/0qhiD2ozNnH4882MVVt3JbVFkbwowNCO3KL5IoYW5wlVeGCViOuv1svZx7FbzxKzA4zGqBlRRaRWCobXaVq4yYCWbZf8eiJwt3OY+MFiSJengcFP2t0JMfzOiJ7cECvpx7neg1Rc5x+7myPJOXt2FohVRyXtD+/rDoTOyGYInJelZMjolecVHUhUNqvdZWg2J2t0jPmiLFeRD/8fOT4o+NGILb+TufCo9ceBBm3JLVn+MO2675n7qiEX/6W+188cYg3Zn5NSTjgOKfWFSAANa6raCxSoVU851oJLY11WIoYK0du0ec5E4tCnAPoKh71riTsjVIp3gKvBbEYQiNYrmH22oLQWA2AdwMnID6PX9b58dR2QKo4qag1D1Z+L/FwEKTR7osOZPWECPJIHQqPUsM5i/CH5YupVPfFA5pHUBcsesh8eO5YhyWnaVRPZn/BmdXVumZWPxMP5e28zm2uqHgFoT9CymHYNNrzrrjlXZM06HnzDxYNlI5b/QosxLmmrqDFqmogQdqk0WLkUceoAvQxHgkIyvWU69BPFr24VB6+lx75Rna6dGtrmOxDnvBojvi1/4dHjVeg8owofPe1cOnxU1ioh016s/Vudv9mhV9f35At+Sh28h1bpp8xhr09+vf47Elx3Ms6hyp6QvB3t0vnLbOhwo660cp7K0vvepabK7YJfxEWWfrC2YzJfYOjygPwfwd/1amTqa0hZ5ueebhWYVMubRTwIjj+0Oq0ohU3zfRfuL8gt59XsHdwKtxTQQ4Y2qz6gisxnm2UdlmpEkgOsZz7iEk6QOt8BuPwr+NR01LTqXmJo1C76o1N274twJvl+I069TiLpenK/miRxhyY8jvYV6W1WuSwhH9q7kuwnJMtm7IWcqs7HsnyHSqWXLSpYtZGaR1V3t0gauninFPZGtWskF65rtti48UV9uV9KM8kfDYs0pgB00S+TlzTXV6P8mxq15b9En8sz3jWSszcifZa/NuufPNnNTb031pptt0+sRSH/7UG8pzbsgtt3OG3ut7B9JzDMt2mTZuyRNIV8D54TuTrpNcHtgmMlYJeiY9XS83NYJicjRjtJSf9BZLsQv629QdDsKQhTK5CnXhpk7vMNkHzPhm0ExW/VCGApHfPyBagtZQTQmPHx7g5IXXsrQDPzIVhv2LB6Ih138iSDww1JNHrDvzUxvp73MsQBVhW8EbrReaVUcLB1R3PUXyaYG4HpJUcLVxMgDxcPkVRQpL7VTAGabDzbKcvg12t5P8TSGQkrj/gOrpnbiDHwluA73xbXts/L7u468cRWSWRtgTwlQnA47EKg0OiZDgFxAKQQUcsbGomITgeXUAAyKe03eA7Mp4gnyKQmm0LXJtEk6ddksMJCuxDmmHzmVhO+XaN2A54MIh3niw5CF7PwiXFZrnA8wOdeHLvvhdoqIDG9PDI7UnWWHq526T8y6ixJPhkuVKZnoUruOpUgOOp3iIKBjk+yi1vHo5cItHXb1PIKzGaZlRS0g5d3MV2pD8FQdGYLZ73aae/eEIUePMc4NFz8pIUfLCrrF4jVWH5gQneN3S8vANBmUXrEcKGn6hIUN95y1vpsvLwbGpzV9L0ZKTan6TDXM05236uLJcIEMKVAxKNT0K8WljuwNny3BNQRfzovA85beI9zr1AGNYnYCVkR1aGngWURUrgqR+gRrQhxW81l3CHevjvGEPzPMTxdsIfB9dfGRbZU0cg/1mcubtECX4tvaedmNAvTxCJtc2QaoUalGfENCGK7IS/O8CRpdOVca8EWCRwv2sSWE8CJPW5PCugjCXPd3h6U60cPD+bdhtXZuYB6stcoveE7Sm5MM2yvfUHXFSW7KzLmi7/EeEWL0wqcOH9MOSKjhCHHmw+JGLcYE/7SBZQCRggox0ZZTAxrlzNNXYXL5fNIjkdT4YMqVUz6p8YDt049v4OXGdg3qTrtLBUXOZf7ahPlZAY/O+7Sp0bvGSHdyQ8B1LOsplqMb9Se8VAE7gIdSZvxbRSrfl+Lk5Qaqi5QJceqjitdErcHXg/3MryljPSIAMaaloFm1cVwBJ8DNmkDqoGROSHFetrgjQ5CahuKkdH5pRPigMrgTtlFI8ufJPJSUlGgTjbBSvpRc0zypiUn6U5KZqcRoyrtzhmJ7/caeZkmVRwJQeLOG8LY6vP5ChpKhc8Js0El+n6FXqbx9ItdtLtYP92kKfaTLtCi8StLZdENJa9Ex1nOoz1kQ7qxoiZFKRyLf4O4CHRT0T/0W9F8epNKVoeyxUXhy3sQMMsJjQJEyMOjmOhMFgOmmlscV4eFi1CldU92yjwleirEKPW3bPAuEhRZV7JsKV3Lr5cETAiFuX5Nw5UlF7d2HZ96Bh0sgFIL5KGaKSoVYVlvdKpZJVP5+NZ7xDEkQhmDgsDKciazJCXJ6ZN2B3FY2f6VZyGl/t4aunGIAk/BHaS+i+SpdRfnB/OktOvyjinWNfM9Ksr6WwtCa1hCmeRI6icpFM4o8quCLsikU0tMoZI/9EqXRMpKGaWzofl4nQuVQm17d5fU5qXCQeCDqVaL9XJ9qJ08n3G3EFZS28SHEb3cdRBdtO0YcTzil3QknNKEe/smQ1fTb0XbpyNB5xAeuIlf+5KWlEY0DqJbsnzJlQxJPOVyHiKMx5Xu9FcEv1Fbg6Fhm4t+Jyy5JC1W3YO8dYLsO0PXPbxodBgttTbH3rt9Cp1lJIk2r3O1Zqu94eRbnIz2f50lWolYzuKsj4PMok4abHLO8NAC884hiXx5Fy5pWKO0bWL7uEGXaJCtznhP67SlQ4xjWIfgq6EpZ28QMtuZK7JC0RGbl9nA4XtFLug/NLMoH1pGt9IonAJqcEDLyH6TDROcbsmGPaGIxMo41IUAnQVPMPGByp4mOmh9ZQMkBAcksUK55LsZj7E5z5XuZoyWCKu6nHmDq22xI/9Z8YdxJy4kWpD16jLVrpwGLWfyOD0Wd+cBzFBxVaGv7S5k9qwh/5t/LQEXsRqI3Q9Rm3QIoaZW9GlsDaKOUyykyWuhNOprSEi0s1G4rgoiX1V743EELti+pJu5og6X0g6oTynUqlhH9k6ezyRi05NGZHz0nvp3HOJr7ebrAUFrDjbkFBObEvdQWkkUbL0pEvMU46X58vF9j9F3j6kpyetNUBItrEubW9ZvMPM4qNqLlsSBJqOH3XbNwv/cXDXNxN8iFLzUhteisYY+RlHYOuP29/Cb+L+xv+35Rv7xudnZ6ohK4cMPfCG8KI7dNmjNk/H4e84pOxn/sZHK9psfvj8ncA8qJz7O8xqbxESDivGJOZzF7o5PJLQ7g34qAWoyuA+x3btU98LT6ZyGyceIXjrqob2CAVql4VOTQPUQYvHV/g4zAuCZGvYQBtf0wmd5lilrvuEn1BXLny01B4h4SMDlYsnNpm9d7m9h578ufpef9Z4WplqWQvqo52fyUA7J24eZD5av6SyGIV9kpmHNqyvdfzcpEMw97BvknV2fq+MFHun9BT3Lsf8pbzvisWiIQvYkng+8Vxk1V+dli1u56kY50LRjaPdotvT5BwqtwyF+emo/z9J3yVUVGfKrxQtJMOAQWoQii/4dp9wgybSa5mkucmRLtEQZ/pz0tL/NVcgWAd95nEQ3Tg6tNbuyn3Iepz65L3huMUUBntllWuu4DbtOFSMSbpILV4fy6wlM0SOvi6CpLh81c1LreIvKd61uEWBcDw1lUBUW1I0Z+m/PaRlX+PQ/oxg0Ye6KUiIiTF4ADNk59Ydpt5/rkxmq9tV5Kcp/eQLUVVmBzQNVuytQCP6Ezd0G8eLxWyHpmZWJ3bAzkWTtg4lZlw42SQezEmiUPaJUuR/qklVA/87S4ArFCpALdY3QRdUw3G3XbWUp6aq9z0zUizcPa7351p9JXOZyfdZBFnqt90VzQndXB/mwf8LC9STj5kenVpNuqOQQP3mIRJj7eV21FxG8VAxKrEn3c+XfmZ800EPb9/5lIlijscUbB6da0RQaMook0zug1G0tKi/JBC4rw7/D3m4ARzAkzMcVrDcT2SyFtUdWAsFlsPDFqV3N+EjyXaoEePwroaZCiLqEzb8MW+PNE9TmTC01EzWli51PzZvUqkmyuROU+V6ik+Le/9qT6nwzUzf9tP68tYei0YaDGx6kAd7jn1cKqOCuYbiELH9zYqcc4MnRJjkeGiqaGwLImhyeKs+xKJMBlOJ05ow9gGCKZ1VpnMKoSCTbMS+X+23y042zOb5MtcY/6oBeAo1Vy89OTyhpavFP78jXCcFH0t7Gx24hMEOm2gsEfGabVpQgvFqbQKMsknFRRmuPHcZu0Su/WMFphZvB2r/EGbG72rpGGho3h+Msz0uGzJ7hNK2uqQiE1qmn0zgacKYYZBCqsxV+sjbpoVdSilW/b94n2xNb648VmNIoizqEWhBnsen+d0kbCPmRItfWqSBeOd9Wne3c6bcd6uvXOJ6WdiSsuXq0ndhqrQ4QoWUjCjYtZ0EAhnSOP1m44xkf0O7jXghrzSJWxP4a/t72jU29Vu2rvu4n7HfHkkmQOMGSS+NPeLGO5I73mC2B7+lMiBQQZRM9/9liLIfowupUFAbPBbR+lxDM6M8Ptgh1paJq5Rvs7yEuLQv/7d1oU2woFSb3FMPWQOKMuCuJ7pDDjpIclus5TeEoMBy2YdVB4fxmesaCeMNsEgTHKS5WDSGyNUOoEpcC2OFWtIRf0w27ck34/DjxRTVIcc9+kqZE6iMSiVDsiKdP/Xz5XfEhm/sBhO50p1rvJDlkyyxuJ9SPgs7YeUJBjXdeAkE+P9OQJm6SZnn1svcduI78dYmbkE2mtziPrcjVisXG78spLvbZaSFx/Rks9zP4LKn0Cdz/3JsetkT06A8f/yCgMO6Mb1Hme0JJ7b2wZz1qleqTuKBGokhPVUZ0dVu+tnQYNEY1fmkZSz6+EGZ5EzL7657mreZGR3jUfaEk458PDniBzsSmBKhDRzfXameryJv9/D5m6HIqZ0R+ouCE54Dzp4IJuuD1e4Dc5i+PpSORJfG23uVgqixAMDvchMR0nZdH5brclYwRoJRWv/rlxGRI5ffD5NPGmIDt7vDE1434pYdVZIFh89Bs94HGGJbTwrN8T6lh1HZFTOB4lWzWj6EVqxSMvC0/ljWBQ3F2kc/mO2b6tWonT2JEqEwFts8rz2h+oWNds9ceR2cb7zZvJTDppHaEhK5avWqsseWa2Dt5BBhabdWSktS80oMQrL4TvAM9b5HMmyDnO+OkkbMXfUJG7eXqTIG6lqSOEbqVR+qYdP7uWb57WEJqzyh411GAVsDinPs7KvUeXItlcMdOUWzXBH6zscymV1LLVCtc8IePojzXHF9m5b5zGwBRdzcyUJkiu938ApmAayRdJrX1PmVguWUvt2ThQ62czItTyWJMW2An/hdDfMK7SiFQlGIdAbltHz3ycoh7j9V7GxNWBpbtcSdqm4XxRwTawc3cbZ+xfSv9qQfEkDKfZTwCkqWGI/ur250ItXlMlh6vUNWEYIg9A3GzbgmbqvTN8js2YMo87CU5y6nZ4dbJLDQJj9fc7yM7tZzJDZFtqOcU8+mZjYlq4VmifI23iHb1ZoT9E+kT2dolnP1AfiOkt7PQCSykBiXy5mv637IegWSKj9IKrYZf4Lu9+I7ub+mkRdlvYzehh/jaJ9n7HUH5b2IbgeNdkY7wx1yVzxS7pbvky6+nmVUtRllEFfweUQ0/nG017WoUYSxs+j2B4FV/F62EtHlMWZXYrjGHpthnNb1x66LKZ0Qe92INWHdfR/vqp02wMS8r1G4dJqHok8KmQ7947G13a4YXbsGgHcBvRuVu1eAi4/A5+ZixmdSXM73LupB/LH7O9yxLTVXJTyBbI1S49TIROrfVCOb/czZ9pM4JsZx8kUz8dQGv7gUWKxXvTH7QM/3J2OuXXgciUhqY+cgtaOliQQVOYthBLV3xpESZT3rmfEYNZxmpBbb24CRao86prn+i9TNOh8VxRJGXJfXHATJHs1T5txgc/opYrY8XjlGQQbRcoxIBcnVsMjmU1ymmIUL4dviJXndMAJ0Yet+c7O52/p98ytlmAsGBaTAmMhimAnvp1TWNGM9BpuitGj+t810CU2UhorrjPKGtThVC8WaXw04WFnT5fTjqmPyrQ0tN3CkLsctVy2xr0ZWgiWVZ1OrlFjjxJYsOiZv2cAoOvE+7sY0I/TwWcZqMoyIKNOftwP7w++Rfg67ljfovKYa50if3fzE/8aPYVey/Nq35+nH2sLPh/fP5TsylSKGOZ4k69d2PnH43+kq++sRXHQqGArWdwhx+hpwQC6JgT2uxehYU4Zbw7oNb6/HLikPyJROGK2ouyr+vzseESp9G50T4AyFrSqOQ0rroCYP4sMDFBrHn342EyZTMlSyk47rHSq89Y9/nI3zG5lX16Z5lxphguLOcZUndL8wNcrkyjH82jqg8Bo8OYkynrxZvbFno5lUS3OPr8Ko3mX9NoRPdYOKKjD07bvgFgpZ/RF+YzkWvJ/Hs/tUbfeGzGWLxNAjfDzHHMVSDwB5SabQLsIZHiBp43FjGkaienYoDd18hu2BGwOK7U3o70K/WY/kuuKdmdrykIBUdG2mvE91L1JtTbh20mOLbk1vCAamu7utlXeGU2ooVikbU/actcgmsC1FKk2qmj3GWeIWbj4tGIxE7BLcBWUvvcnd/lYxsMV4F917fWeFB/XbINN3qGvIyTpCalz1lVewdIGqeAS/gB8Mi+sA+BqDiX3VGD2eUunTRbSY+AuDy4E3Qx3hAhwnSXX+B0zuj3eQ1miS8Vux2z/l6/BkWtjKGU72aJkOCWhGcSf3+kFkkB15vGOsQrSdFr6qTj0gBYiOlnBO41170gOWHSUoBVRU2JjwppYdhIFDfu7tIRHccSNM5KZOFDPz0TGMAjzzEpeLwTWp+kn201kU6NjbiMQJx83+LX1e1tZ10kuChJZ/XBUQ1dwaBHjTDJDqOympEk8X2M3VtVw21JksChA8w1tTefO3RJ1FMbqZ01bHHkudDB/OhLfe7P5GOHaI28ZXKTMuqo0hLWQ4HabBsGG7NbP1RiXtETz074er6w/OerJWEqjmkq2y51q1BVI+JUudnVa3ogBpzdhFE7fC7kybrAt2Z6RqDjATAUEYeYK45WMupBKQRtQlU+uNsjnzj6ZmGrezA+ASrWxQ6LMkHRXqXwNq7ftv28dUx/ZSJciDXP2SWJsWaN0FjPX9Yko6LobZ7aYW/IdUktI9apTLyHS8DyWPyuoZyxN1TK/vtfxk3HwWh6JczZC8Ftn0bIJay2g+n5wd7lm9rEsKO+svqVmi+c1j88hSCxbzrg4+HEP0Nt1/B6YW1XVm09T1CpAKjc9n18hjqsaFGdfyva1ZG0Xu3ip6N6JGpyTSqY5h4BOlpLPaOnyw45PdXTN+DtAKg7DLrLFTnWusoSBHk3s0d7YouJHq85/R09Tfc37ENXZF48eAYLnq9GLioNcwDZrC6FW6godB8JnqYUPvn0pWLfQz0lM0Yy8Mybgn84Ds3Q9bDP10bLyOV+qzxa4Rd9Dhu7cju8mMaONXK3UqmBQ9qIg7etIwEqM/kECk/Dzja4Bs1xR+Q/tCbc8IKrSGsTdJJ0vge7IG20W687uVmK6icWQ6cD3lwFzgNMGtFvO5qyJeKflGLAAcQZOrkxVwy3cWvqlGpvjmf9Qe6Ap20MPbV92DPV0OhFM4kz8Yr0ffC2zLWSQ1kqY6QdQrttR3kh1YLtQd1kCEv5hVoPIRWl5ERcUTttBIrWp6Xs5Ehh5OUUwI5aEBvuiDmUoENmnVw1FohCrbRp1A1E+XSlWVOTi7ADW+5Ohb9z1vK4qx5R5lPdGCPBJZ00mC+Ssp8VUbgpGAvXWMuWQQRbCqI6Rr2jtxZxtfP7W/8onz+yz0Gs76LaT5HX9ecyiZCB/ZR/gFtMxPsDwohoeCRtiuLxE1GM1vUEUgBv86+eehL58/P56QFGQ/MqOe/vC76L63jzmeax4exd/OKTUvkXg+fOJUHych9xt/9goJMrapSgvXrj8+8vk/N80f22Sewj6cyGqt1B6mztoeklVHHraouhvHJaG/OuBz6DHKMpFmQULU1bRWlyYE0RPXYYkUycIemN7TLtgNCJX6BqdyxDKkegO7nJK5xQ7OVYDZTMf9bVHidtk6DQX9Et+V9M7esgbsYBdEeUpsB0Xvw2kd9+rI7V+m47u+O/tq7mw7262HU1WlS9uFzsV6JxIHNmUCy0QS9e077JGRFbG65z3/dOKB/Zk+yDdKpUmdXjn/aS3N5nv4fK7bMHHmPlHd4E2+iTbV5rpzScRnxk6KARuDTJ8Q1LpK2mP8gj1EbuJ9RIyY+EWK4hCiIDBAS1Tm2IEXAFfgKPgdL9O6mAa06wjCcUAL6EsxPQWO9VNegBPm/0GgkZbDxCynxujX/92vmGcjZRMAY45puak2sFLCLSwXpEsyy5fnF0jGJBhm+fNSHKKUUfy+276A7/feLOFxxUuHRNJI2Osenxyvf8DAGObT60pfTTlhEg9u/KKkhJqm5U1/+BEcSkpFDA5XeCqxwXmPac1jcuZ3JWQ+p0NdWzb/5v1ZvF8GtMTFFEdQjpLO0bwPb0BHNWnip3liDXI2fXf05jjvfJ0NpjLCUgfTh9CMFYVFKEd4Z/OG/2C+N435mnK+9t1gvCiVcaaH7rK4+PjCvpVNiz+t2QyqH1O8x3JKZVl6Q+Lp/XK8wMjVMslOq9FdSw5FtUs/CptXH9PW+wbWHgrV17R5jTVOtGtKFu3nb80T+E0tv9QkzW3J2dbaw/8ddAKZ0pxIaEqLjlPrji3VgJ3GvdFvlqD8075woxh4fVt0JZE0KVFsAvqhe0dqN9b35jtSpnYMXkU+vZq+IAHad3IHc2s/LYrnD1anfG46IFiMIr9oNbZDWvwthqYNqOigaKd/XlLU4XHfk/PXIjPsLy/9/kAtQ+/wKH+hI/IROWj5FPvTZAT9f7j4ZXQyG4M0TujMAFXYkKvEHv1xhySekgXGGqNxWeWKlf8dDAlLuB1cb/qOD+rk7cmwt+1yKpk9cudqBanTi6zTbXRtV8qylNtjyOVKy1HTz0GW9rjt6sSjAZcT5R+KdtyYb0zyqG9pSLuCw5WBwAn7fjBjKLLoxLXMI+52L9cLwIR2B6OllJZLHJ8vDxmWdtF+QJnmt1rsHPIWY20lftk8fYePkAIg6Hgn532QoIpegMxiWgAOfe5/U44APR8Ac0NeZrVh3gEhs12W+tVSiWiUQekf/YBECUy5fdYbA08dd7VzPAP9aiVcIB9k6tY7WdJ1wNV+bHeydNtmC6G5ICtFC1ZwmJU/j8hf0I8TRVKSiz5oYIa93EpUI78X8GYIAZabx47/n8LDAAJ0nNtP1rpROprqKMBRecShca6qXuTSI3jZBLOB3Vp381B5rCGhjSvh/NSVkYp2qIdP/Bg=";
    }, {}],
    6: [function (require, module, exports) {
      /* Copyright 2013 Google Inc. All Rights Reserved.
      
         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at
      
         http://www.apache.org/licenses/LICENSE-2.0
      
         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
      
         Collection of static dictionary words.
      */

      var data = require('./dictionary-browser');
      exports.init = function () {
        exports.dictionary = data.init();
      };
      exports.offsetsByLength = new Uint32Array([0, 0, 0, 0, 0, 4096, 9216, 21504, 35840, 44032, 53248, 63488, 74752, 87040, 93696, 100864, 104704, 106752, 108928, 113536, 115968, 118528, 119872, 121280, 122016]);
      exports.sizeBitsByLength = new Uint8Array([0, 0, 0, 0, 10, 10, 11, 11, 10, 10, 10, 10, 10, 9, 9, 8, 7, 7, 8, 7, 7, 6, 6, 5, 5]);
      exports.minDictionaryWordLength = 4;
      exports.maxDictionaryWordLength = 24;
    }, {
      "./dictionary-browser": 4
    }],
    7: [function (require, module, exports) {
      function HuffmanCode(bits, value) {
        this.bits = bits; /* number of bits used for this symbol */
        this.value = value; /* symbol value or table offset */
      }
      exports.HuffmanCode = HuffmanCode;
      var MAX_LENGTH = 15;

      /* Returns reverse(reverse(key, len) + 1, len), where reverse(key, len) is the
         bit-wise reversal of the len least significant bits of key. */
      function GetNextKey(key, len) {
        var step = 1 << len - 1;
        while (key & step) {
          step >>= 1;
        }
        return (key & step - 1) + step;
      }

      /* Stores code in table[0], table[step], table[2*step], ..., table[end] */
      /* Assumes that end is an integer multiple of step */
      function ReplicateValue(table, i, step, end, code) {
        do {
          end -= step;
          table[i + end] = new HuffmanCode(code.bits, code.value);
        } while (end > 0);
      }

      /* Returns the table width of the next 2nd level table. count is the histogram
         of bit lengths for the remaining symbols, len is the code length of the next
         processed symbol */
      function NextTableBitSize(count, len, root_bits) {
        var left = 1 << len - root_bits;
        while (len < MAX_LENGTH) {
          left -= count[len];
          if (left <= 0) break;
          ++len;
          left <<= 1;
        }
        return len - root_bits;
      }
      exports.BrotliBuildHuffmanTable = function (root_table, table, root_bits, code_lengths, code_lengths_size) {
        var start_table = table;
        var code; /* current table entry */
        var len; /* current code length */
        var symbol; /* symbol index in original or sorted table */
        var key; /* reversed prefix code */
        var step; /* step size to replicate values in current table */
        var low; /* low bits for current root entry */
        var mask; /* mask for low bits */
        var table_bits; /* key length of current table */
        var table_size; /* size of current table */
        var total_size; /* sum of root table size and 2nd level table sizes */
        var sorted; /* symbols sorted by code length */
        var count = new Int32Array(MAX_LENGTH + 1); /* number of codes of each length */
        var offset = new Int32Array(MAX_LENGTH + 1); /* offsets in sorted table for each length */

        sorted = new Int32Array(code_lengths_size);

        /* build histogram of code lengths */
        for (symbol = 0; symbol < code_lengths_size; symbol++) {
          count[code_lengths[symbol]]++;
        }

        /* generate offsets into sorted symbol table by code length */
        offset[1] = 0;
        for (len = 1; len < MAX_LENGTH; len++) {
          offset[len + 1] = offset[len] + count[len];
        }

        /* sort symbols by length, by symbol order within each length */
        for (symbol = 0; symbol < code_lengths_size; symbol++) {
          if (code_lengths[symbol] !== 0) {
            sorted[offset[code_lengths[symbol]]++] = symbol;
          }
        }
        table_bits = root_bits;
        table_size = 1 << table_bits;
        total_size = table_size;

        /* special case code with only one value */
        if (offset[MAX_LENGTH] === 1) {
          for (key = 0; key < total_size; ++key) {
            root_table[table + key] = new HuffmanCode(0, sorted[0] & 0xffff);
          }
          return total_size;
        }

        /* fill in root table */
        key = 0;
        symbol = 0;
        for (len = 1, step = 2; len <= root_bits; ++len, step <<= 1) {
          for (; count[len] > 0; --count[len]) {
            code = new HuffmanCode(len & 0xff, sorted[symbol++] & 0xffff);
            ReplicateValue(root_table, table + key, step, table_size, code);
            key = GetNextKey(key, len);
          }
        }

        /* fill in 2nd level tables and add pointers to root table */
        mask = total_size - 1;
        low = -1;
        for (len = root_bits + 1, step = 2; len <= MAX_LENGTH; ++len, step <<= 1) {
          for (; count[len] > 0; --count[len]) {
            if ((key & mask) !== low) {
              table += table_size;
              table_bits = NextTableBitSize(count, len, root_bits);
              table_size = 1 << table_bits;
              total_size += table_size;
              low = key & mask;
              root_table[start_table + low] = new HuffmanCode(table_bits + root_bits & 0xff, table - start_table - low & 0xffff);
            }
            code = new HuffmanCode(len - root_bits & 0xff, sorted[symbol++] & 0xffff);
            ReplicateValue(root_table, table + (key >> root_bits), step, table_size, code);
            key = GetNextKey(key, len);
          }
        }
        return total_size;
      };
    }, {}],
    8: [function (require, module, exports) {
      'use strict';

      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }

      // Support decoding URL-safe base64 strings, as Node.js does.
      // See: https://en.wikipedia.org/wiki/Base64#URL_applications
      revLookup['-'.charCodeAt(0)] = 62;
      revLookup['_'.charCodeAt(0)] = 63;
      function getLens(b64) {
        var len = b64.length;
        if (len % 4 > 0) {
          throw new Error('Invalid string. Length must be a multiple of 4');
        }

        // Trim off extra bytes after placeholder bytes are found
        // See: https://github.com/beatgammit/base64-js/issues/42
        var validLen = b64.indexOf('=');
        if (validLen === -1) validLen = len;
        var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }

      // base64 is 4/3 + up to two characters of the original data
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;

        // if there are placeholders, only get up to the last complete 4 chars
        var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
        for (var i = 0; i < len; i += 4) {
          tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
          arr[curByte++] = tmp >> 16 & 0xFF;
          arr[curByte++] = tmp >> 8 & 0xFF;
          arr[curByte++] = tmp & 0xFF;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
          arr[curByte++] = tmp & 0xFF;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 0xFF;
          arr[curByte++] = tmp & 0xFF;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
          output.push(tripletToBase64(tmp));
        }
        return output.join('');
      }
      function fromByteArray(uint8) {
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
        var parts = [];
        var maxChunkLength = 16383; // must be multiple of 3

        // go through the array every three bytes, we'll deal with trailing stuff later
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
        }

        // pad the end with zeros, but make sure to not forget the extra bytes
        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1];
          parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
        }
        return parts.join('');
      }
    }, {}],
    9: [function (require, module, exports) {
      /* Copyright 2013 Google Inc. All Rights Reserved.
      
         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at
      
         http://www.apache.org/licenses/LICENSE-2.0
      
         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
      
         Lookup tables to map prefix codes to value ranges. This is used during
         decoding of the block lengths, literal insertion lengths and copy lengths.
      */

      /* Represents the range of values belonging to a prefix code: */
      /* [offset, offset + 2^nbits) */
      function PrefixCodeRange(offset, nbits) {
        this.offset = offset;
        this.nbits = nbits;
      }
      exports.kBlockLengthPrefixCode = [new PrefixCodeRange(1, 2), new PrefixCodeRange(5, 2), new PrefixCodeRange(9, 2), new PrefixCodeRange(13, 2), new PrefixCodeRange(17, 3), new PrefixCodeRange(25, 3), new PrefixCodeRange(33, 3), new PrefixCodeRange(41, 3), new PrefixCodeRange(49, 4), new PrefixCodeRange(65, 4), new PrefixCodeRange(81, 4), new PrefixCodeRange(97, 4), new PrefixCodeRange(113, 5), new PrefixCodeRange(145, 5), new PrefixCodeRange(177, 5), new PrefixCodeRange(209, 5), new PrefixCodeRange(241, 6), new PrefixCodeRange(305, 6), new PrefixCodeRange(369, 7), new PrefixCodeRange(497, 8), new PrefixCodeRange(753, 9), new PrefixCodeRange(1265, 10), new PrefixCodeRange(2289, 11), new PrefixCodeRange(4337, 12), new PrefixCodeRange(8433, 13), new PrefixCodeRange(16625, 24)];
      exports.kInsertLengthPrefixCode = [new PrefixCodeRange(0, 0), new PrefixCodeRange(1, 0), new PrefixCodeRange(2, 0), new PrefixCodeRange(3, 0), new PrefixCodeRange(4, 0), new PrefixCodeRange(5, 0), new PrefixCodeRange(6, 1), new PrefixCodeRange(8, 1), new PrefixCodeRange(10, 2), new PrefixCodeRange(14, 2), new PrefixCodeRange(18, 3), new PrefixCodeRange(26, 3), new PrefixCodeRange(34, 4), new PrefixCodeRange(50, 4), new PrefixCodeRange(66, 5), new PrefixCodeRange(98, 5), new PrefixCodeRange(130, 6), new PrefixCodeRange(194, 7), new PrefixCodeRange(322, 8), new PrefixCodeRange(578, 9), new PrefixCodeRange(1090, 10), new PrefixCodeRange(2114, 12), new PrefixCodeRange(6210, 14), new PrefixCodeRange(22594, 24)];
      exports.kCopyLengthPrefixCode = [new PrefixCodeRange(2, 0), new PrefixCodeRange(3, 0), new PrefixCodeRange(4, 0), new PrefixCodeRange(5, 0), new PrefixCodeRange(6, 0), new PrefixCodeRange(7, 0), new PrefixCodeRange(8, 0), new PrefixCodeRange(9, 0), new PrefixCodeRange(10, 1), new PrefixCodeRange(12, 1), new PrefixCodeRange(14, 2), new PrefixCodeRange(18, 2), new PrefixCodeRange(22, 3), new PrefixCodeRange(30, 3), new PrefixCodeRange(38, 4), new PrefixCodeRange(54, 4), new PrefixCodeRange(70, 5), new PrefixCodeRange(102, 5), new PrefixCodeRange(134, 6), new PrefixCodeRange(198, 7), new PrefixCodeRange(326, 8), new PrefixCodeRange(582, 9), new PrefixCodeRange(1094, 10), new PrefixCodeRange(2118, 24)];
      exports.kInsertRangeLut = [0, 0, 8, 8, 0, 16, 8, 16, 16];
      exports.kCopyRangeLut = [0, 8, 0, 8, 16, 0, 16, 8, 16];
    }, {}],
    10: [function (require, module, exports) {
      function BrotliInput(buffer) {
        this.buffer = buffer;
        this.pos = 0;
      }
      BrotliInput.prototype.read = function (buf, i, count) {
        if (this.pos + count > this.buffer.length) {
          count = this.buffer.length - this.pos;
        }
        for (var p = 0; p < count; p++) buf[i + p] = this.buffer[this.pos + p];
        this.pos += count;
        return count;
      };
      exports.BrotliInput = BrotliInput;
      function BrotliOutput(buf) {
        this.buffer = buf;
        this.pos = 0;
      }
      BrotliOutput.prototype.write = function (buf, count) {
        if (this.pos + count > this.buffer.length) throw new Error('Output buffer is not large enough');
        this.buffer.set(buf.subarray(0, count), this.pos);
        this.pos += count;
        return count;
      };
      exports.BrotliOutput = BrotliOutput;
    }, {}],
    11: [function (require, module, exports) {
      /* Copyright 2013 Google Inc. All Rights Reserved.
      
         Licensed under the Apache License, Version 2.0 (the "License");
         you may not use this file except in compliance with the License.
         You may obtain a copy of the License at
      
         http://www.apache.org/licenses/LICENSE-2.0
      
         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
      
         Transformations on dictionary words.
      */

      var BrotliDictionary = require('./dictionary');
      var kIdentity = 0;
      var kOmitLast1 = 1;
      var kOmitLast2 = 2;
      var kOmitLast3 = 3;
      var kOmitLast4 = 4;
      var kOmitLast5 = 5;
      var kOmitLast6 = 6;
      var kOmitLast7 = 7;
      var kOmitLast8 = 8;
      var kOmitLast9 = 9;
      var kUppercaseFirst = 10;
      var kUppercaseAll = 11;
      var kOmitFirst1 = 12;
      var kOmitFirst2 = 13;
      var kOmitFirst3 = 14;
      var kOmitFirst4 = 15;
      var kOmitFirst5 = 16;
      var kOmitFirst6 = 17;
      var kOmitFirst7 = 18;
      var kOmitFirst8 = 19;
      var kOmitFirst9 = 20;
      function Transform(prefix, transform, suffix) {
        this.prefix = new Uint8Array(prefix.length);
        this.transform = transform;
        this.suffix = new Uint8Array(suffix.length);
        for (var i = 0; i < prefix.length; i++) this.prefix[i] = prefix.charCodeAt(i);
        for (var i = 0; i < suffix.length; i++) this.suffix[i] = suffix.charCodeAt(i);
      }
      var kTransforms = [new Transform("", kIdentity, ""), new Transform("", kIdentity, " "), new Transform(" ", kIdentity, " "), new Transform("", kOmitFirst1, ""), new Transform("", kUppercaseFirst, " "), new Transform("", kIdentity, " the "), new Transform(" ", kIdentity, ""), new Transform("s ", kIdentity, " "), new Transform("", kIdentity, " of "), new Transform("", kUppercaseFirst, ""), new Transform("", kIdentity, " and "), new Transform("", kOmitFirst2, ""), new Transform("", kOmitLast1, ""), new Transform(", ", kIdentity, " "), new Transform("", kIdentity, ", "), new Transform(" ", kUppercaseFirst, " "), new Transform("", kIdentity, " in "), new Transform("", kIdentity, " to "), new Transform("e ", kIdentity, " "), new Transform("", kIdentity, "\""), new Transform("", kIdentity, "."), new Transform("", kIdentity, "\">"), new Transform("", kIdentity, "\n"), new Transform("", kOmitLast3, ""), new Transform("", kIdentity, "]"), new Transform("", kIdentity, " for "), new Transform("", kOmitFirst3, ""), new Transform("", kOmitLast2, ""), new Transform("", kIdentity, " a "), new Transform("", kIdentity, " that "), new Transform(" ", kUppercaseFirst, ""), new Transform("", kIdentity, ". "), new Transform(".", kIdentity, ""), new Transform(" ", kIdentity, ", "), new Transform("", kOmitFirst4, ""), new Transform("", kIdentity, " with "), new Transform("", kIdentity, "'"), new Transform("", kIdentity, " from "), new Transform("", kIdentity, " by "), new Transform("", kOmitFirst5, ""), new Transform("", kOmitFirst6, ""), new Transform(" the ", kIdentity, ""), new Transform("", kOmitLast4, ""), new Transform("", kIdentity, ". The "), new Transform("", kUppercaseAll, ""), new Transform("", kIdentity, " on "), new Transform("", kIdentity, " as "), new Transform("", kIdentity, " is "), new Transform("", kOmitLast7, ""), new Transform("", kOmitLast1, "ing "), new Transform("", kIdentity, "\n\t"), new Transform("", kIdentity, ":"), new Transform(" ", kIdentity, ". "), new Transform("", kIdentity, "ed "), new Transform("", kOmitFirst9, ""), new Transform("", kOmitFirst7, ""), new Transform("", kOmitLast6, ""), new Transform("", kIdentity, "("), new Transform("", kUppercaseFirst, ", "), new Transform("", kOmitLast8, ""), new Transform("", kIdentity, " at "), new Transform("", kIdentity, "ly "), new Transform(" the ", kIdentity, " of "), new Transform("", kOmitLast5, ""), new Transform("", kOmitLast9, ""), new Transform(" ", kUppercaseFirst, ", "), new Transform("", kUppercaseFirst, "\""), new Transform(".", kIdentity, "("), new Transform("", kUppercaseAll, " "), new Transform("", kUppercaseFirst, "\">"), new Transform("", kIdentity, "=\""), new Transform(" ", kIdentity, "."), new Transform(".com/", kIdentity, ""), new Transform(" the ", kIdentity, " of the "), new Transform("", kUppercaseFirst, "'"), new Transform("", kIdentity, ". This "), new Transform("", kIdentity, ","), new Transform(".", kIdentity, " "), new Transform("", kUppercaseFirst, "("), new Transform("", kUppercaseFirst, "."), new Transform("", kIdentity, " not "), new Transform(" ", kIdentity, "=\""), new Transform("", kIdentity, "er "), new Transform(" ", kUppercaseAll, " "), new Transform("", kIdentity, "al "), new Transform(" ", kUppercaseAll, ""), new Transform("", kIdentity, "='"), new Transform("", kUppercaseAll, "\""), new Transform("", kUppercaseFirst, ". "), new Transform(" ", kIdentity, "("), new Transform("", kIdentity, "ful "), new Transform(" ", kUppercaseFirst, ". "), new Transform("", kIdentity, "ive "), new Transform("", kIdentity, "less "), new Transform("", kUppercaseAll, "'"), new Transform("", kIdentity, "est "), new Transform(" ", kUppercaseFirst, "."), new Transform("", kUppercaseAll, "\">"), new Transform(" ", kIdentity, "='"), new Transform("", kUppercaseFirst, ","), new Transform("", kIdentity, "ize "), new Transform("", kUppercaseAll, "."), new Transform("\xc2\xa0", kIdentity, ""), new Transform(" ", kIdentity, ","), new Transform("", kUppercaseFirst, "=\""), new Transform("", kUppercaseAll, "=\""), new Transform("", kIdentity, "ous "), new Transform("", kUppercaseAll, ", "), new Transform("", kUppercaseFirst, "='"), new Transform(" ", kUppercaseFirst, ","), new Transform(" ", kUppercaseAll, "=\""), new Transform(" ", kUppercaseAll, ", "), new Transform("", kUppercaseAll, ","), new Transform("", kUppercaseAll, "("), new Transform("", kUppercaseAll, ". "), new Transform(" ", kUppercaseAll, "."), new Transform("", kUppercaseAll, "='"), new Transform(" ", kUppercaseAll, ". "), new Transform(" ", kUppercaseFirst, "=\""), new Transform(" ", kUppercaseAll, "='"), new Transform(" ", kUppercaseFirst, "='")];
      exports.kTransforms = kTransforms;
      exports.kNumTransforms = kTransforms.length;
      function ToUpperCase(p, i) {
        if (p[i] < 0xc0) {
          if (p[i] >= 97 && p[i] <= 122) {
            p[i] ^= 32;
          }
          return 1;
        }

        /* An overly simplified uppercasing model for utf-8. */
        if (p[i] < 0xe0) {
          p[i + 1] ^= 32;
          return 2;
        }

        /* An arbitrary transform for three byte characters. */
        p[i + 2] ^= 5;
        return 3;
      }
      exports.transformDictionaryWord = function (dst, idx, word, len, transform) {
        var prefix = kTransforms[transform].prefix;
        var suffix = kTransforms[transform].suffix;
        var t = kTransforms[transform].transform;
        var skip = t < kOmitFirst1 ? 0 : t - (kOmitFirst1 - 1);
        var i = 0;
        var start_idx = idx;
        var uppercase;
        if (skip > len) {
          skip = len;
        }
        var prefix_pos = 0;
        while (prefix_pos < prefix.length) {
          dst[idx++] = prefix[prefix_pos++];
        }
        word += skip;
        len -= skip;
        if (t <= kOmitLast9) {
          len -= t;
        }
        for (i = 0; i < len; i++) {
          dst[idx++] = BrotliDictionary.dictionary[word + i];
        }
        uppercase = idx - len;
        if (t === kUppercaseFirst) {
          ToUpperCase(dst, uppercase);
        } else if (t === kUppercaseAll) {
          while (len > 0) {
            var step = ToUpperCase(dst, uppercase);
            uppercase += step;
            len -= step;
          }
        }
        var suffix_pos = 0;
        while (suffix_pos < suffix.length) {
          dst[idx++] = suffix[suffix_pos++];
        }
        return idx - start_idx;
      };
    }, {
      "./dictionary": 6
    }],
    12: [function (require, module, exports) {
      module.exports = require('./dec/decode').BrotliDecompressBuffer;
    }, {
      "./dec/decode": 3
    }]
  }, {}, [12])(12);
});

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

/***/ "./node_modules/lodash/_arrayMap.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


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

/***/ "./node_modules/lodash/_arrayReduce.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayReduce.js ***!
  \*********************************************/
(module) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


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

/***/ "./node_modules/lodash/_asciiWords.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_asciiWords.js ***!
  \********************************************/
(module) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;


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

/***/ "./node_modules/lodash/_basePropertyOf.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_basePropertyOf.js ***!
  \************************************************/
(module) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


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

/***/ "./node_modules/lodash/_baseToString.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


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

/***/ "./node_modules/lodash/_createCompounder.js"
/*!**************************************************!*\
  !*** ./node_modules/lodash/_createCompounder.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayReduce = __webpack_require__(/*! ./_arrayReduce */ "./node_modules/lodash/_arrayReduce.js"),
    deburr = __webpack_require__(/*! ./deburr */ "./node_modules/lodash/deburr.js"),
    words = __webpack_require__(/*! ./words */ "./node_modules/lodash/words.js");

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;


/***/ },

/***/ "./node_modules/lodash/_deburrLetter.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_deburrLetter.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(/*! ./_basePropertyOf */ "./node_modules/lodash/_basePropertyOf.js");

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;


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

/***/ "./node_modules/lodash/_hasUnicodeWord.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_hasUnicodeWord.js ***!
  \************************************************/
(module) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;


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

/***/ "./node_modules/lodash/_unicodeWords.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_unicodeWords.js ***!
  \**********************************************/
(module) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;


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

/***/ "./node_modules/lodash/deburr.js"
/*!***************************************!*\
  !*** ./node_modules/lodash/deburr.js ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var deburrLetter = __webpack_require__(/*! ./_deburrLetter */ "./node_modules/lodash/_deburrLetter.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


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

/***/ "./node_modules/lodash/isSymbol.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


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

/***/ "./node_modules/lodash/kebabCase.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/kebabCase.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var createCompounder = __webpack_require__(/*! ./_createCompounder */ "./node_modules/lodash/_createCompounder.js");

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

module.exports = kebabCase;


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

/***/ "./node_modules/lodash/toString.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ },

/***/ "./node_modules/lodash/words.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/words.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var asciiWords = __webpack_require__(/*! ./_asciiWords */ "./node_modules/lodash/_asciiWords.js"),
    hasUnicodeWord = __webpack_require__(/*! ./_hasUnicodeWord */ "./node_modules/lodash/_hasUnicodeWord.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js"),
    unicodeWords = __webpack_require__(/*! ./_unicodeWords */ "./node_modules/lodash/_unicodeWords.js");

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;


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

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

"use strict";
module.exports = window["wp"]["apiFetch"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js?ver=" + {"_80a7":"54c3b891c2b6116ae2d7","_946e":"2f87dfdf370961f5c9a1"}[chunkId] + "";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "onepress:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (globalThis.importScripts) scriptUrl = globalThis.location + "";
/******/ 		var document = globalThis.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"admin/customizer": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkonepress"] = globalThis["webpackChunkonepress"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
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
/* harmony import */ var _customizer_color_alpha_color_alpha_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customizer/color-alpha/color-alpha-controls */ "./src/admin/customizer/color-alpha/color-alpha-controls.js");
/* harmony import */ var _customizer_control_bindings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./customizer/control-bindings */ "./src/admin/customizer/control-bindings.js");
/* harmony import */ var _customizer_control_repeatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customizer/control-repeatable */ "./src/admin/customizer/control-repeatable.js");
/* harmony import */ var _customizer_icon_picker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customizer/icon-picker */ "./src/admin/customizer/icon-picker.js");
/* harmony import */ var _customizer_jquery_deparam__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customizer/jquery-deparam */ "./src/admin/customizer/jquery-deparam.js");
/* harmony import */ var _customizer_modal_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customizer/modal-editor */ "./src/admin/customizer/modal-editor.js");
/* harmony import */ var _customizer_dynamic_sections__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customizer/dynamic-sections */ "./src/admin/customizer/dynamic-sections.js");
/* harmony import */ var _customizer_plus_section__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./customizer/plus-section */ "./src/admin/customizer/plus-section.js");
/* harmony import */ var _customizer_wp_editor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./customizer/wp-editor */ "./src/admin/customizer/wp-editor.js");
/* harmony import */ var _customizer_typography_typography_controls_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./customizer/typography/typography-controls.js */ "./src/admin/customizer/typography/typography-controls.js");
/* harmony import */ var _customizer_spacing_spacing_controls_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./customizer/spacing/spacing-controls.js */ "./src/admin/customizer/spacing/spacing-controls.js");
/* harmony import */ var _customizer_slider_slider_controls_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./customizer/slider/slider-controls.js */ "./src/admin/customizer/slider/slider-controls.js");
/* harmony import */ var _customizer_background_background_controls_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./customizer/background/background-controls.js */ "./src/admin/customizer/background/background-controls.js");
















const api = wp.customize;
const $ = jQuery;
(0,_customizer_plus_section__WEBPACK_IMPORTED_MODULE_10__.registerPlusSection)(api);
const onepressDynamicBlocks = window.ONEPRESS_DYNAMIC_BLOCKS;
if (Array.isArray(onepressDynamicBlocks)) {
  onepressDynamicBlocks.forEach(function (blockCfg) {
    (0,_customizer_dynamic_sections__WEBPACK_IMPORTED_MODULE_9__.registerDynamicOptionBlocks)(api, blockCfg);
  });
}
(0,_customizer_jquery_deparam__WEBPACK_IMPORTED_MODULE_7__.installDeparam)($);
(0,_customizer_alpha_color_picker__WEBPACK_IMPORTED_MODULE_2__.installAlphaColorPicker)($);
(0,_customizer_control_repeatable__WEBPACK_IMPORTED_MODULE_5__.registerRepeatableControl)(api, $);
(0,_customizer_wp_editor__WEBPACK_IMPORTED_MODULE_11__.installWpEditor)($);
(0,_customizer_modal_editor__WEBPACK_IMPORTED_MODULE_8__.initModalEditors)(api, $);
jQuery(window).ready(function () {
  (0,_customizer_control_bindings__WEBPACK_IMPORTED_MODULE_4__.initControlBindings)($);
});
jQuery(document).ready(function () {
  (0,_customizer_icon_picker__WEBPACK_IMPORTED_MODULE_6__.initIconPicker)($);
});
})();

/******/ })()
;
//# sourceMappingURL=customizer.js.map