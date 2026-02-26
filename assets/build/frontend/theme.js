/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ev-emitter/ev-emitter.js":
/*!***********************************************!*\
  !*** ./node_modules/ev-emitter/ev-emitter.js ***!
  \***********************************************/
/***/ (function(module) {

/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */

( function( global, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

function EvEmitter() {}

let proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // set events hash
  let events = this._events = this._events || {};
  // set listeners array
  let listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( !listeners.includes( listener ) ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  let onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  let index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice( 0 );
  args = args || [];
  // once stuff
  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( let listener of listeners ) {
    let isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
  return this;
};

return EvEmitter;

} ) );


/***/ }),

/***/ "./node_modules/wow.js/dist/wow.js":
/*!*****************************************!*\
  !*** ./node_modules/wow.js/dist/wow.js ***!
  \*****************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{ var mod; }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _class, _temp;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function isIn(needle, haystack) {
    return haystack.indexOf(needle) >= 0;
  }

  function extend(custom, defaults) {
    for (var key in defaults) {
      if (custom[key] == null) {
        var value = defaults[key];
        custom[key] = value;
      }
    }
    return custom;
  }

  function isMobile(agent) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
    );
  }

  function createEvent(event) {
    var bubble = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var cancel = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var customEvent = void 0;
    if (document.createEvent != null) {
      // W3C DOM
      customEvent = document.createEvent('CustomEvent');
      customEvent.initCustomEvent(event, bubble, cancel, detail);
    } else if (document.createEventObject != null) {
      // IE DOM < 9
      customEvent = document.createEventObject();
      customEvent.eventType = event;
    } else {
      customEvent.eventName = event;
    }

    return customEvent;
  }

  function emitEvent(elem, event) {
    if (elem.dispatchEvent != null) {
      // W3C DOM
      elem.dispatchEvent(event);
    } else if (event in (elem != null)) {
      elem[event]();
    } else if ('on' + event in (elem != null)) {
      elem['on' + event]();
    }
  }

  function addEvent(elem, event, fn) {
    if (elem.addEventListener != null) {
      // W3C DOM
      elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
      // IE DOM
      elem.attachEvent('on' + event, fn);
    } else {
      // fallback
      elem[event] = fn;
    }
  }

  function removeEvent(elem, event, fn) {
    if (elem.removeEventListener != null) {
      // W3C DOM
      elem.removeEventListener(event, fn, false);
    } else if (elem.detachEvent != null) {
      // IE DOM
      elem.detachEvent('on' + event, fn);
    } else {
      // fallback
      delete elem[event];
    }
  }

  function getInnerHeight() {
    if ('innerHeight' in window) {
      return window.innerHeight;
    }

    return document.documentElement.clientHeight;
  }

  // Minimalistic WeakMap shim, just in case.
  var WeakMap = window.WeakMap || window.MozWeakMap || function () {
    function WeakMap() {
      _classCallCheck(this, WeakMap);

      this.keys = [];
      this.values = [];
    }

    _createClass(WeakMap, [{
      key: 'get',
      value: function get(key) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];
          if (item === key) {
            return this.values[i];
          }
        }
        return undefined;
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];
          if (item === key) {
            this.values[i] = value;
            return this;
          }
        }
        this.keys.push(key);
        this.values.push(value);
        return this;
      }
    }]);

    return WeakMap;
  }();

  // Dummy MutationObserver, to avoid raising exceptions.
  var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function () {
    function MutationObserver() {
      _classCallCheck(this, MutationObserver);

      if (typeof console !== 'undefined' && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    _createClass(MutationObserver, [{
      key: 'observe',
      value: function observe() {}
    }]);

    return MutationObserver;
  }(), _class.notSupported = true, _temp);

  // getComputedStyle shim, from http://stackoverflow.com/a/21797294
  var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {
    var getComputedStyleRX = /(\-([a-z]){1})/g;
    return {
      getPropertyValue: function getPropertyValue(prop) {
        if (prop === 'float') {
          prop = 'styleFloat';
        }
        if (getComputedStyleRX.test(prop)) {
          prop.replace(getComputedStyleRX, function (_, _char) {
            return _char.toUpperCase();
          });
        }
        var currentStyle = el.currentStyle;

        return (currentStyle != null ? currentStyle[prop] : void 0) || null;
      }
    };
  };

  var WOW = function () {
    function WOW() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, WOW);

      this.defaults = {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        callback: null,
        scrollContainer: null
      };

      this.animate = function animateFactory() {
        if ('requestAnimationFrame' in window) {
          return function (callback) {
            return window.requestAnimationFrame(callback);
          };
        }
        return function (callback) {
          return callback();
        };
      }();

      this.vendors = ['moz', 'webkit'];

      this.start = this.start.bind(this);
      this.resetAnimation = this.resetAnimation.bind(this);
      this.scrollHandler = this.scrollHandler.bind(this);
      this.scrollCallback = this.scrollCallback.bind(this);
      this.scrolled = true;
      this.config = extend(options, this.defaults);
      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(options.scrollContainer);
      }
      // Map of elements to animation names:
      this.animationNameCache = new WeakMap();
      this.wowEvent = createEvent(this.config.boxClass);
    }

    _createClass(WOW, [{
      key: 'init',
      value: function init() {
        this.element = window.document.documentElement;
        if (isIn(document.readyState, ['interactive', 'complete'])) {
          this.start();
        } else {
          addEvent(document, 'DOMContentLoaded', this.start);
        }
        this.finished = [];
      }
    }, {
      key: 'start',
      value: function start() {
        var _this = this;

        this.stopped = false;
        this.boxes = [].slice.call(this.element.querySelectorAll('.' + this.config.boxClass));
        this.all = this.boxes.slice(0);
        if (this.boxes.length) {
          if (this.disabled()) {
            this.resetStyle();
          } else {
            for (var i = 0; i < this.boxes.length; i++) {
              var box = this.boxes[i];
              this.applyStyle(box, true);
            }
          }
        }
        if (!this.disabled()) {
          addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
          addEvent(window, 'resize', this.scrollHandler);
          this.interval = setInterval(this.scrollCallback, 50);
        }
        if (this.config.live) {
          var mut = new MutationObserver(function (records) {
            for (var j = 0; j < records.length; j++) {
              var record = records[j];
              for (var k = 0; k < record.addedNodes.length; k++) {
                var node = record.addedNodes[k];
                _this.doSync(node);
              }
            }
            return undefined;
          });
          mut.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.stopped = true;
        removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
        removeEvent(window, 'resize', this.scrollHandler);
        if (this.interval != null) {
          clearInterval(this.interval);
        }
      }
    }, {
      key: 'sync',
      value: function sync() {
        if (MutationObserver.notSupported) {
          this.doSync(this.element);
        }
      }
    }, {
      key: 'doSync',
      value: function doSync(element) {
        if (typeof element === 'undefined' || element === null) {
          element = this.element;
        }
        if (element.nodeType !== 1) {
          return;
        }
        element = element.parentNode || element;
        var iterable = element.querySelectorAll('.' + this.config.boxClass);
        for (var i = 0; i < iterable.length; i++) {
          var box = iterable[i];
          if (!isIn(box, this.all)) {
            this.boxes.push(box);
            this.all.push(box);
            if (this.stopped || this.disabled()) {
              this.resetStyle();
            } else {
              this.applyStyle(box, true);
            }
            this.scrolled = true;
          }
        }
      }
    }, {
      key: 'show',
      value: function show(box) {
        this.applyStyle(box);
        box.className = box.className + ' ' + this.config.animateClass;
        if (this.config.callback != null) {
          this.config.callback(box);
        }
        emitEvent(box, this.wowEvent);

        addEvent(box, 'animationend', this.resetAnimation);
        addEvent(box, 'oanimationend', this.resetAnimation);
        addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
        addEvent(box, 'MSAnimationEnd', this.resetAnimation);

        return box;
      }
    }, {
      key: 'applyStyle',
      value: function applyStyle(box, hidden) {
        var _this2 = this;

        var duration = box.getAttribute('data-wow-duration');
        var delay = box.getAttribute('data-wow-delay');
        var iteration = box.getAttribute('data-wow-iteration');

        return this.animate(function () {
          return _this2.customStyle(box, hidden, duration, delay, iteration);
        });
      }
    }, {
      key: 'resetStyle',
      value: function resetStyle() {
        for (var i = 0; i < this.boxes.length; i++) {
          var box = this.boxes[i];
          box.style.visibility = 'visible';
        }
        return undefined;
      }
    }, {
      key: 'resetAnimation',
      value: function resetAnimation(event) {
        if (event.type.toLowerCase().indexOf('animationend') >= 0) {
          var target = event.target || event.srcElement;
          target.className = target.className.replace(this.config.animateClass, '').trim();
        }
      }
    }, {
      key: 'customStyle',
      value: function customStyle(box, hidden, duration, delay, iteration) {
        if (hidden) {
          this.cacheAnimationName(box);
        }
        box.style.visibility = hidden ? 'hidden' : 'visible';

        if (duration) {
          this.vendorSet(box.style, { animationDuration: duration });
        }
        if (delay) {
          this.vendorSet(box.style, { animationDelay: delay });
        }
        if (iteration) {
          this.vendorSet(box.style, { animationIterationCount: iteration });
        }
        this.vendorSet(box.style, { animationName: hidden ? 'none' : this.cachedAnimationName(box) });

        return box;
      }
    }, {
      key: 'vendorSet',
      value: function vendorSet(elem, properties) {
        for (var name in properties) {
          if (properties.hasOwnProperty(name)) {
            var value = properties[name];
            elem['' + name] = value;
            for (var i = 0; i < this.vendors.length; i++) {
              var vendor = this.vendors[i];
              elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;
            }
          }
        }
      }
    }, {
      key: 'vendorCSS',
      value: function vendorCSS(elem, property) {
        var style = getComputedStyle(elem);
        var result = style.getPropertyCSSValue(property);
        for (var i = 0; i < this.vendors.length; i++) {
          var vendor = this.vendors[i];
          result = result || style.getPropertyCSSValue('-' + vendor + '-' + property);
        }
        return result;
      }
    }, {
      key: 'animationName',
      value: function animationName(box) {
        var aName = void 0;
        try {
          aName = this.vendorCSS(box, 'animation-name').cssText;
        } catch (error) {
          // Opera, fall back to plain property value
          aName = getComputedStyle(box).getPropertyValue('animation-name');
        }

        if (aName === 'none') {
          return ''; // SVG/Firefox, unable to get animation name?
        }

        return aName;
      }
    }, {
      key: 'cacheAnimationName',
      value: function cacheAnimationName(box) {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=921834
        // box.dataset is not supported for SVG elements in Firefox
        return this.animationNameCache.set(box, this.animationName(box));
      }
    }, {
      key: 'cachedAnimationName',
      value: function cachedAnimationName(box) {
        return this.animationNameCache.get(box);
      }
    }, {
      key: 'scrollHandler',
      value: function scrollHandler() {
        this.scrolled = true;
      }
    }, {
      key: 'scrollCallback',
      value: function scrollCallback() {
        if (this.scrolled) {
          this.scrolled = false;
          var results = [];
          for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];
            if (box) {
              if (this.isVisible(box)) {
                this.show(box);
                continue;
              }
              results.push(box);
            }
          }
          this.boxes = results;
          if (!this.boxes.length && !this.config.live) {
            this.stop();
          }
        }
      }
    }, {
      key: 'offsetTop',
      value: function offsetTop(element) {
        // SVG elements don't have an offsetTop in Firefox.
        // This will use their nearest parent that has an offsetTop.
        // Also, using ('offsetTop' of element) causes an exception in Firefox.
        while (element.offsetTop === undefined) {
          element = element.parentNode;
        }
        var top = element.offsetTop;
        while (element.offsetParent) {
          element = element.offsetParent;
          top += element.offsetTop;
        }
        return top;
      }
    }, {
      key: 'isVisible',
      value: function isVisible(box) {
        var offset = box.getAttribute('data-wow-offset') || this.config.offset;
        var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
        var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;
        var top = this.offsetTop(box);
        var bottom = top + box.clientHeight;

        return top <= viewBottom && bottom >= viewTop;
      }
    }, {
      key: 'disabled',
      value: function disabled() {
        return !this.config.mobile && isMobile(navigator.userAgent);
      }
    }]);

    return WOW;
  }();

  exports.default = WOW;
  module.exports = exports['default'];
});


/***/ }),

/***/ "./src/frontend/libs/FitVids.js":
/*!**************************************!*\
  !*** ./src/frontend/libs/FitVids.js ***!
  \**************************************/
/***/ (() => {

/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

(function ($) {
  "use strict";

  $.fn.fitVids = function (options) {
    var settings = {
      customSelector: null,
      ignore: null
    };
    if (!document.getElementById("fit-vids-style")) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName("head")[0];
      var css = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + "</style>";
      head.appendChild(div.childNodes[1]);
    }
    if (options) {
      $.extend(settings, options);
    }
    return this.each(function () {
      var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }
      var ignoreList = ".fitvidsignore";
      if (settings.ignore) {
        ignoreList = ignoreList + ", " + settings.ignore;
      }
      var $allVideos = $(this).find(selectors.join(","));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function () {
        var $this = $(this);
        if ($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === "embed" && $this.parent("object").length || $this.parent(".fluid-width-video-wrapper").length) {
          return;
        }
        if (!$this.css("height") && !$this.css("width") && (isNaN($this.attr("height")) || isNaN($this.attr("width")))) {
          $this.attr("height", 9);
          $this.attr("width", 16);
        }
        var height = this.tagName.toLowerCase() === "object" || $this.attr("height") && !isNaN(parseInt($this.attr("height"), 10)) ? parseInt($this.attr("height"), 10) : $this.height(),
          width = !isNaN(parseInt($this.attr("width"), 10)) ? parseInt($this.attr("width"), 10) : $this.width(),
          aspectRatio = height / width;
        if (!$this.attr("name")) {
          var videoName = "fitvid" + $.fn.fitVids._count;
          $this.attr("name", videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", aspectRatio * 100 + "%");
        $this.removeAttr("height").removeAttr("width");
      });
    });
  };

  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;

  // Works with either jQuery or Zepto
})(window.jQuery || window.Zepto);

/***/ }),

/***/ "./src/frontend/libs/Morphext/morphext.js":
/*!************************************************!*\
  !*** ./src/frontend/libs/Morphext/morphext.js ***!
  \************************************************/
/***/ (() => {

/*!
 * Morphext - Text Rotating Plugin for jQuery
 * https://github.com/MrSaints/Morphext
 *
 * Built on jQuery Boilerplate
 * http://jqueryboilerplate.com/
 *
 * Copyright 2014 Ian Lai and other contributors
 * Released under the MIT license
 * http://ian.mit-license.org/
 */

/*eslint-env browser */
/*global jQuery:false */
/*eslint-disable no-underscore-dangle */

(function ($) {
  "use strict";

  var pluginName = "Morphext",
    defaults = {
      animation: "bounceIn",
      separator: ",",
      speed: 2000,
      complete: $.noop
    };
  function Plugin(element, options) {
    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._init();
  }
  Plugin.prototype = {
    _init: function () {
      var $that = this;
      this.phrases = [];
      this.element.addClass("morphext");
      $.each(this.element.text().split(this.settings.separator), function (key, value) {
        $that.phrases.push($.trim(value));
      });
      this.index = -1;
      this.animate();
      this.start();
    },
    animate: function () {
      this.index = ++this.index % this.phrases.length;
      this.element[0].innerHTML = "<span class=\"animated " + this.settings.animation + "\">" + this.phrases[this.index] + "</span>";
      if ($.isFunction(this.settings.complete)) {
        this.settings.complete.call(this);
      }
    },
    start: function () {
      var $that = this;
      this._interval = setInterval(function () {
        $that.animate();
      }, this.settings.speed);
    },
    stop: function () {
      this._interval = clearInterval(this._interval);
    }
  };
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery);

/***/ }),

/***/ "./src/frontend/libs/bootstrap/bootstrap.css":
/*!***************************************************!*\
  !*** ./src/frontend/libs/bootstrap/bootstrap.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/frontend/libs/imagesloaded.js":
/*!*******************************************!*\
  !*** ./src/frontend/libs/imagesloaded.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * imagesLoaded PACKAGED v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */

(function (global, factory) {
  // universal module definition
  if ( true && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }
})(typeof window != 'undefined' ? window : this, function () {
  function EvEmitter() {}
  let proto = EvEmitter.prototype;
  proto.on = function (eventName, listener) {
    if (!eventName || !listener) return this;

    // set events hash
    let events = this._events = this._events || {};
    // set listeners array
    let listeners = events[eventName] = events[eventName] || [];
    // only add once
    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }
    return this;
  };
  proto.once = function (eventName, listener) {
    if (!eventName || !listener) return this;

    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    let onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
    // set flag
    onceListeners[listener] = true;
    return this;
  };
  proto.off = function (eventName, listener) {
    let listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) return this;
    let index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }
    return this;
  };
  proto.emitEvent = function (eventName, args) {
    let listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) return this;

    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    let onceListeners = this._onceEvents && this._onceEvents[eventName];
    for (let listener of listeners) {
      let isOnce = onceListeners && onceListeners[listener];
      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        delete onceListeners[listener];
      }
      // trigger listener
      listener.apply(this, args);
    }
    return this;
  };
  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
    return this;
  };
  return EvEmitter;
});
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function (window, factory) {
  // universal module definition
  if ( true && module.exports) {
    // CommonJS
    module.exports = factory(window, __webpack_require__(/*! ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js"));
  } else {
    // browser global
    window.imagesLoaded = factory(window, window.EvEmitter);
  }
})(typeof window !== 'undefined' ? window : this, function factory(window, EvEmitter) {
  let $ = window.jQuery;
  let console = window.console;

  // -------------------------- helpers -------------------------- //

  // turn element or nodeList into an array
  function makeArray(obj) {
    // use object if already an array
    if (Array.isArray(obj)) return obj;
    let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
    // convert nodeList to array
    if (isArrayLike) return [...obj];

    // array of single index
    return [obj];
  }

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {[Array, Element, NodeList, String]} elem
   * @param {[Object, Function]} options - if function, use as callback
   * @param {Function} onAlways - callback function
   * @returns {ImagesLoaded}
   */
  function ImagesLoaded(elem, options, onAlways) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if (!(this instanceof ImagesLoaded)) {
      return new ImagesLoaded(elem, options, onAlways);
    }
    // use elem as selector string
    let queryElem = elem;
    if (typeof elem == 'string') {
      queryElem = document.querySelectorAll(elem);
    }
    // bail if bad element
    if (!queryElem) {
      console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
      return;
    }
    this.elements = makeArray(queryElem);
    this.options = {};
    // shift arguments if no options set
    if (typeof options == 'function') {
      onAlways = options;
    } else {
      Object.assign(this.options, options);
    }
    if (onAlways) this.on('always', onAlways);
    this.getImages();
    // add jQuery Deferred object
    if ($) this.jqDeferred = new $.Deferred();

    // HACK check async to allow time to bind listeners
    setTimeout(this.check.bind(this));
  }
  ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
  ImagesLoaded.prototype.getImages = function () {
    this.images = [];

    // filter & find items if we have an item selector
    this.elements.forEach(this.addElementImages, this);
  };
  const elementNodeTypes = [1, 9, 11];

  /**
   * @param {Node} elem
   */
  ImagesLoaded.prototype.addElementImages = function (elem) {
    // filter siblings
    if (elem.nodeName === 'IMG') {
      this.addImage(elem);
    }
    // get background image on element
    if (this.options.background === true) {
      this.addElementBackgroundImages(elem);
    }

    // find children
    // no non-element nodes, #143
    let {
      nodeType
    } = elem;
    if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
    let childImgs = elem.querySelectorAll('img');
    // concat childElems to filterFound array
    for (let img of childImgs) {
      this.addImage(img);
    }

    // get child background images
    if (typeof this.options.background == 'string') {
      let children = elem.querySelectorAll(this.options.background);
      for (let child of children) {
        this.addElementBackgroundImages(child);
      }
    }
  };
  const reURL = /url\((['"])?(.*?)\1\)/gi;
  ImagesLoaded.prototype.addElementBackgroundImages = function (elem) {
    let style = getComputedStyle(elem);
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    if (!style) return;

    // get url inside url("...")
    let matches = reURL.exec(style.backgroundImage);
    while (matches !== null) {
      let url = matches && matches[2];
      if (url) {
        this.addBackground(url, elem);
      }
      matches = reURL.exec(style.backgroundImage);
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function (img) {
    let loadingImage = new LoadingImage(img);
    this.images.push(loadingImage);
  };
  ImagesLoaded.prototype.addBackground = function (url, elem) {
    let background = new Background(url, elem);
    this.images.push(background);
  };
  ImagesLoaded.prototype.check = function () {
    this.progressedCount = 0;
    this.hasAnyBroken = false;
    // complete if no images
    if (!this.images.length) {
      this.complete();
      return;
    }

    /* eslint-disable-next-line func-style */
    let onProgress = (image, elem, message) => {
      // HACK - Chrome triggers event before object properties have changed. #83
      setTimeout(() => {
        this.progress(image, elem, message);
      });
    };
    this.images.forEach(function (loadingImage) {
      loadingImage.once('progress', onProgress);
      loadingImage.check();
    });
  };
  ImagesLoaded.prototype.progress = function (image, elem, message) {
    this.progressedCount++;
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // progress event
    this.emitEvent('progress', [this, image, elem]);
    if (this.jqDeferred && this.jqDeferred.notify) {
      this.jqDeferred.notify(this, image);
    }
    // check if completed
    if (this.progressedCount === this.images.length) {
      this.complete();
    }
    if (this.options.debug && console) {
      console.log(`progress: ${message}`, image, elem);
    }
  };
  ImagesLoaded.prototype.complete = function () {
    let eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emitEvent(eventName, [this]);
    this.emitEvent('always', [this]);
    if (this.jqDeferred) {
      let jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[jqMethod](this);
    }
  };

  // --------------------------  -------------------------- //

  function LoadingImage(img) {
    this.img = img;
  }
  LoadingImage.prototype = Object.create(EvEmitter.prototype);
  LoadingImage.prototype.check = function () {
    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    let isComplete = this.getIsImageComplete();
    if (isComplete) {
      // report based on naturalWidth
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    this.proxyImage = new Image();
    // add crossOrigin attribute. #204
    if (this.img.crossOrigin) {
      this.proxyImage.crossOrigin = this.img.crossOrigin;
    }
    this.proxyImage.addEventListener('load', this);
    this.proxyImage.addEventListener('error', this);
    // bind to image as well for Firefox. #191
    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.proxyImage.src = this.img.currentSrc || this.img.src;
  };
  LoadingImage.prototype.getIsImageComplete = function () {
    // check for non-zero, non-undefined naturalWidth
    // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
    return this.img.complete && this.img.naturalWidth;
  };
  LoadingImage.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    let {
      parentNode
    } = this.img;
    // emit progress with parent <picture> or self <img>
    let elem = parentNode.nodeName === 'PICTURE' ? parentNode : this.img;
    this.emitEvent('progress', [this, elem, message]);
  };

  // ----- events ----- //

  // trigger specified handler for event type
  LoadingImage.prototype.handleEvent = function (event) {
    let method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };
  LoadingImage.prototype.onload = function () {
    this.confirm(true, 'onload');
    this.unbindEvents();
  };
  LoadingImage.prototype.onerror = function () {
    this.confirm(false, 'onerror');
    this.unbindEvents();
  };
  LoadingImage.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener('load', this);
    this.proxyImage.removeEventListener('error', this);
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  };

  // -------------------------- Background -------------------------- //

  function Background(url, element) {
    this.url = url;
    this.element = element;
    this.img = new Image();
  }

  // inherit LoadingImage prototype
  Background.prototype = Object.create(LoadingImage.prototype);
  Background.prototype.check = function () {
    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.img.src = this.url;
    // check if image is already complete
    let isComplete = this.getIsImageComplete();
    if (isComplete) {
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      this.unbindEvents();
    }
  };
  Background.prototype.unbindEvents = function () {
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  };
  Background.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    this.emitEvent('progress', [this, this.element, message]);
  };

  // -------------------------- jQuery -------------------------- //

  ImagesLoaded.makeJQueryPlugin = function (jQuery) {
    jQuery = jQuery || window.jQuery;
    if (!jQuery) return;

    // set local variable
    $ = jQuery;
    // $().imagesLoaded()
    $.fn.imagesLoaded = function (options, onAlways) {
      let instance = new ImagesLoaded(this, options, onAlways);
      return instance.jqDeferred.promise($(this));
    };
  };
  // try making plugin
  ImagesLoaded.makeJQueryPlugin();

  // --------------------------  -------------------------- //

  return ImagesLoaded;
});

/***/ }),

/***/ "./src/frontend/libs/jarallax.js":
/*!***************************************!*\
  !*** ./src/frontend/libs/jarallax.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * Jarallax v2.1.3 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
(function (global, factory) {
   true ? module.exports = factory() : 0;
})(this, function () {
  "use strict";

  /**
   * Document ready callback.
   * @param {Function} callback - callback will be fired once Document ready.
   */
  function ready(callback) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // Already ready or interactive, execute callback
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback, {
        capture: true,
        once: true,
        passive: true
      });
    }
  }

  /* eslint-disable import/no-mutable-exports */
  /* eslint-disable no-restricted-globals */
  let win;
  if (typeof window !== "undefined") {
    win = window;
  } else if (typeof __webpack_require__.g !== "undefined") {
    win = __webpack_require__.g;
  } else if (typeof self !== "undefined") {
    win = self;
  } else {
    win = {};
  }
  var global$1 = win;
  var defaults = {
    // Base parallax options.
    type: "scroll",
    speed: 0.5,
    containerClass: "jarallax-container",
    imgSrc: null,
    imgElement: ".jarallax-img",
    imgSize: "cover",
    imgPosition: "50% 50%",
    imgRepeat: "no-repeat",
    keepImg: false,
    elementInViewport: null,
    zIndex: -100,
    disableParallax: false,
    // Callbacks.
    onScroll: null,
    onInit: null,
    onDestroy: null,
    onCoverImage: null,
    // Video options.
    videoClass: "jarallax-video",
    videoSrc: null,
    videoStartTime: 0,
    videoEndTime: 0,
    videoVolume: 0,
    videoLoop: true,
    videoPlayOnlyVisible: true,
    videoLazyLoading: true,
    disableVideo: false,
    // Video callbacks.
    onVideoInsert: null,
    onVideoWorkerInit: null
  };

  /**
   * Add styles to element.
   *
   * @param {Element} el - element.
   * @param {String|Object} styles - styles list.
   *
   * @returns {Element}
   */
  function css(el, styles) {
    if (typeof styles === "string") {
      return global$1.getComputedStyle(el).getPropertyValue(styles);
    }
    Object.keys(styles).forEach(key => {
      el.style[key] = styles[key];
    });
    return el;
  }

  /**
   * Extend like jQuery.extend
   *
   * @param {Object} out - output object.
   * @param {...any} args - additional objects to extend.
   *
   * @returns {Object}
   */
  function extend(out, ...args) {
    out = out || {};
    Object.keys(args).forEach(i => {
      if (!args[i]) {
        return;
      }
      Object.keys(args[i]).forEach(key => {
        out[key] = args[i][key];
      });
    });
    return out;
  }

  /**
   * Get all parents of the element.
   *
   * @param {Element} elem - DOM element.
   *
   * @returns {Array}
   */
  function getParents(elem) {
    const parents = [];
    while (elem.parentElement !== null) {
      elem = elem.parentElement;
      if (elem.nodeType === 1) {
        parents.push(elem);
      }
    }
    return parents;
  }
  const {
    navigator: navigator$1
  } = global$1;
  const mobileAgent = /*#__PURE__*//Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator$1.userAgent);
  function isMobile() {
    return mobileAgent;
  }
  let wndW;
  let wndH;
  let $deviceHelper;

  /**
   * The most popular mobile browsers changes height after page scroll and this generates image jumping.
   * We can fix it using this workaround with vh units.
   */
  function getDeviceHeight() {
    if (!$deviceHelper && document.body) {
      $deviceHelper = document.createElement("div");
      $deviceHelper.style.cssText = "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;";
      document.body.appendChild($deviceHelper);
    }
    return ($deviceHelper ? $deviceHelper.clientHeight : 0) || global$1.innerHeight || document.documentElement.clientHeight;
  }
  function updateWindowHeight() {
    wndW = global$1.innerWidth || document.documentElement.clientWidth;
    if (isMobile()) {
      wndH = getDeviceHeight();
    } else {
      wndH = global$1.innerHeight || document.documentElement.clientHeight;
    }
  }
  updateWindowHeight();
  global$1.addEventListener("resize", updateWindowHeight);
  global$1.addEventListener("orientationchange", updateWindowHeight);
  global$1.addEventListener("load", updateWindowHeight);
  ready(() => {
    updateWindowHeight();
  });
  function getWindowSize() {
    return {
      width: wndW,
      height: wndH
    };
  }

  // List with all jarallax instances
  // need to render all in one scroll/resize event.
  const jarallaxList = [];
  function updateParallax() {
    if (!jarallaxList.length) {
      return;
    }
    const {
      width: wndW,
      height: wndH
    } = getWindowSize();
    jarallaxList.forEach((data, k) => {
      const {
        instance,
        oldData
      } = data;
      if (!instance.isVisible()) {
        return;
      }
      const clientRect = instance.$item.getBoundingClientRect();
      const newData = {
        width: clientRect.width,
        height: clientRect.height,
        top: clientRect.top,
        bottom: clientRect.bottom,
        wndW,
        wndH
      };
      const isResized = !oldData || oldData.wndW !== newData.wndW || oldData.wndH !== newData.wndH || oldData.width !== newData.width || oldData.height !== newData.height;
      const isScrolled = isResized || !oldData || oldData.top !== newData.top || oldData.bottom !== newData.bottom;
      jarallaxList[k].oldData = newData;
      if (isResized) {
        instance.onResize();
      }
      if (isScrolled) {
        instance.onScroll();
      }
    });
    global$1.requestAnimationFrame(updateParallax);
  }
  const visibilityObserver = /*#__PURE__*/new global$1.IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.jarallax.isElementInViewport = entry.isIntersecting;
    });
  }, {
    // We have to start parallax calculation before the block is in view
    // to prevent possible parallax jumping.
    rootMargin: "50px"
  });
  function addObserver(instance) {
    jarallaxList.push({
      instance
    });
    if (jarallaxList.length === 1) {
      global$1.requestAnimationFrame(updateParallax);
    }
    visibilityObserver.observe(instance.options.elementInViewport || instance.$item);
  }
  function removeObserver(instance) {
    jarallaxList.forEach((data, key) => {
      if (data.instance.instanceID === instance.instanceID) {
        jarallaxList.splice(key, 1);
      }
    });
    visibilityObserver.unobserve(instance.options.elementInViewport || instance.$item);
  }

  /* eslint-disable class-methods-use-this */
  const {
    navigator
  } = global$1;
  let instanceID = 0;

  // Jarallax class
  class Jarallax {
    constructor(item, userOptions) {
      const self = this;
      self.instanceID = instanceID;
      instanceID += 1;
      self.$item = item;
      self.defaults = {
        ...defaults
      };

      // prepare data-options
      const dataOptions = self.$item.dataset || {};
      const pureDataOptions = {};
      Object.keys(dataOptions).forEach(key => {
        const lowerCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);
        if (lowerCaseOption && typeof self.defaults[lowerCaseOption] !== "undefined") {
          pureDataOptions[lowerCaseOption] = dataOptions[key];
        }
      });
      self.options = self.extend({}, self.defaults, pureDataOptions, userOptions);
      self.pureOptions = self.extend({}, self.options);

      // prepare 'true' and 'false' strings to boolean
      Object.keys(self.options).forEach(key => {
        if (self.options[key] === "true") {
          self.options[key] = true;
        } else if (self.options[key] === "false") {
          self.options[key] = false;
        }
      });

      // fix speed option [-1.0, 2.0]
      self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed)));

      // prepare disableParallax callback
      if (typeof self.options.disableParallax === "string") {
        self.options.disableParallax = new RegExp(self.options.disableParallax);
      }
      if (self.options.disableParallax instanceof RegExp) {
        const disableParallaxRegexp = self.options.disableParallax;
        self.options.disableParallax = () => disableParallaxRegexp.test(navigator.userAgent);
      }
      if (typeof self.options.disableParallax !== "function") {
        self.options.disableParallax = () => false;
      }

      // prepare disableVideo callback
      if (typeof self.options.disableVideo === "string") {
        self.options.disableVideo = new RegExp(self.options.disableVideo);
      }
      if (self.options.disableVideo instanceof RegExp) {
        const disableVideoRegexp = self.options.disableVideo;
        self.options.disableVideo = () => disableVideoRegexp.test(navigator.userAgent);
      }
      if (typeof self.options.disableVideo !== "function") {
        self.options.disableVideo = () => false;
      }

      // custom element to check if parallax in viewport
      let elementInVP = self.options.elementInViewport;
      // get first item from array
      if (elementInVP && typeof elementInVP === "object" && typeof elementInVP.length !== "undefined") {
        [elementInVP] = elementInVP;
      }
      // check if dom element
      if (!(elementInVP instanceof Element)) {
        elementInVP = null;
      }
      self.options.elementInViewport = elementInVP;
      self.image = {
        src: self.options.imgSrc || null,
        $container: null,
        useImgTag: false,
        // 1. Position fixed is needed for the most of browsers because absolute position have glitches
        // 2. On MacOS with smooth scroll there is a huge lags with absolute position - https://github.com/nk-o/jarallax/issues/75
        // 3. Previously used 'absolute' for mobile devices. But we re-tested on iPhone 12 and 'fixed' position is working better, then 'absolute', so for now position is always 'fixed'
        position: "fixed"
      };
      if (self.initImg() && self.canInitParallax()) {
        self.init();
      }
    }
    css(el, styles) {
      return css(el, styles);
    }
    extend(out, ...args) {
      return extend(out, ...args);
    }

    // get window size and scroll position. Useful for extensions
    getWindowData() {
      const {
        width,
        height
      } = getWindowSize();
      return {
        width,
        height,
        y: document.documentElement.scrollTop
      };
    }

    // Jarallax functions
    initImg() {
      const self = this;

      // find image element
      let $imgElement = self.options.imgElement;
      if ($imgElement && typeof $imgElement === "string") {
        $imgElement = self.$item.querySelector($imgElement);
      }

      // check if dom element
      if (!($imgElement instanceof Element)) {
        if (self.options.imgSrc) {
          $imgElement = new Image();
          $imgElement.src = self.options.imgSrc;
        } else {
          $imgElement = null;
        }
      }
      if ($imgElement) {
        if (self.options.keepImg) {
          self.image.$item = $imgElement.cloneNode(true);
        } else {
          self.image.$item = $imgElement;
          self.image.$itemParent = $imgElement.parentNode;
        }
        self.image.useImgTag = true;
      }

      // true if there is img tag
      if (self.image.$item) {
        return true;
      }

      // get image src
      if (self.image.src === null) {
        self.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        self.image.bgImage = self.css(self.$item, "background-image");
      }
      return !(!self.image.bgImage || self.image.bgImage === "none");
    }
    canInitParallax() {
      return !this.options.disableParallax();
    }
    init() {
      const self = this;
      const containerStyles = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden"
      };
      let imageStyles = {
        pointerEvents: "none",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      };
      if (!self.options.keepImg) {
        // save default user styles
        const curStyle = self.$item.getAttribute("style");
        if (curStyle) {
          self.$item.setAttribute("data-jarallax-original-styles", curStyle);
        }
        if (self.image.useImgTag) {
          const curImgStyle = self.image.$item.getAttribute("style");
          if (curImgStyle) {
            self.image.$item.setAttribute("data-jarallax-original-styles", curImgStyle);
          }
        }
      }

      // set relative position and z-index to the parent
      if (self.css(self.$item, "position") === "static") {
        self.css(self.$item, {
          position: "relative"
        });
      }
      if (self.css(self.$item, "z-index") === "auto") {
        self.css(self.$item, {
          zIndex: 0
        });
      }

      // container for parallax image
      self.image.$container = document.createElement("div");
      self.css(self.image.$container, containerStyles);
      self.css(self.image.$container, {
        "z-index": self.options.zIndex
      });

      // it will remove some image overlapping
      // overlapping occur due to an image position fixed inside absolute position element
      // needed only when background in fixed position
      if (this.image.position === "fixed") {
        self.css(self.image.$container, {
          "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        });
      }

      // Add container unique ID.
      self.image.$container.setAttribute("id", `jarallax-container-${self.instanceID}`);

      // Add container class.
      if (self.options.containerClass) {
        self.image.$container.setAttribute("class", self.options.containerClass);
      }
      self.$item.appendChild(self.image.$container);

      // use img tag
      if (self.image.useImgTag) {
        imageStyles = self.extend({
          "object-fit": self.options.imgSize,
          "object-position": self.options.imgPosition,
          "max-width": "none"
        }, containerStyles, imageStyles);

        // use div with background image
      } else {
        self.image.$item = document.createElement("div");
        if (self.image.src) {
          imageStyles = self.extend({
            "background-position": self.options.imgPosition,
            "background-size": self.options.imgSize,
            "background-repeat": self.options.imgRepeat,
            "background-image": self.image.bgImage || `url("${self.image.src}")`
          }, containerStyles, imageStyles);
        }
      }
      if (self.options.type === "opacity" || self.options.type === "scale" || self.options.type === "scale-opacity" || self.options.speed === 1) {
        self.image.position = "absolute";
      }

      // 1. Check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
      //    discussion - https://github.com/nk-o/jarallax/issues/9
      // 2. Check if parents have overflow scroll
      if (self.image.position === "fixed") {
        const $parents = getParents(self.$item).filter(el => {
          const styles = global$1.getComputedStyle(el);
          const parentTransform = styles["-webkit-transform"] || styles["-moz-transform"] || styles.transform;
          const overflowRegex = /(auto|scroll)/;
          return parentTransform && parentTransform !== "none" || overflowRegex.test(styles.overflow + styles["overflow-y"] + styles["overflow-x"]);
        });
        self.image.position = $parents.length ? "absolute" : "fixed";
      }

      // add position to parallax block
      imageStyles.position = self.image.position;

      // insert parallax image
      self.css(self.image.$item, imageStyles);
      self.image.$container.appendChild(self.image.$item);

      // set initial position and size
      self.onResize();
      self.onScroll(true);

      // call onInit event
      if (self.options.onInit) {
        self.options.onInit.call(self);
      }

      // remove default user background
      if (self.css(self.$item, "background-image") !== "none") {
        self.css(self.$item, {
          "background-image": "none"
        });
      }
      addObserver(self);
    }
    destroy() {
      const self = this;
      removeObserver(self);

      // return styles on container as before jarallax init
      const originalStylesTag = self.$item.getAttribute("data-jarallax-original-styles");
      self.$item.removeAttribute("data-jarallax-original-styles");
      // null occurs if there is no style tag before jarallax init
      if (!originalStylesTag) {
        self.$item.removeAttribute("style");
      } else {
        self.$item.setAttribute("style", originalStylesTag);
      }
      if (self.image.useImgTag) {
        // return styles on img tag as before jarallax init
        const originalStylesImgTag = self.image.$item.getAttribute("data-jarallax-original-styles");
        self.image.$item.removeAttribute("data-jarallax-original-styles");
        // null occurs if there is no style tag before jarallax init
        if (!originalStylesImgTag) {
          self.image.$item.removeAttribute("style");
        } else {
          self.image.$item.setAttribute("style", originalStylesTag);
        }

        // move img tag to its default position
        if (self.image.$itemParent) {
          self.image.$itemParent.appendChild(self.image.$item);
        }
      }

      // remove additional dom elements
      if (self.image.$container) {
        self.image.$container.parentNode.removeChild(self.image.$container);
      }

      // call onDestroy event
      if (self.options.onDestroy) {
        self.options.onDestroy.call(self);
      }

      // delete jarallax from item
      delete self.$item.jarallax;
    }
    coverImage() {
      const self = this;
      const {
        height: wndH
      } = getWindowSize();
      const rect = self.image.$container.getBoundingClientRect();
      const contH = rect.height;
      const {
        speed
      } = self.options;
      const isScroll = self.options.type === "scroll" || self.options.type === "scroll-opacity";
      let scrollDist = 0;
      let resultH = contH;
      let resultMT = 0;

      // scroll parallax
      if (isScroll) {
        // scroll distance and height for image
        if (speed < 0) {
          scrollDist = speed * Math.max(contH, wndH);
          if (wndH < contH) {
            scrollDist -= speed * (contH - wndH);
          }
        } else {
          scrollDist = speed * (contH + wndH);
        }

        // size for scroll parallax
        if (speed > 1) {
          resultH = Math.abs(scrollDist - wndH);
        } else if (speed < 0) {
          resultH = scrollDist / speed + Math.abs(scrollDist);
        } else {
          resultH += (wndH - contH) * (1 - speed);
        }
        scrollDist /= 2;
      }

      // store scroll distance
      self.parallaxScrollDistance = scrollDist;

      // vertical center
      if (isScroll) {
        resultMT = (wndH - resultH) / 2;
      } else {
        resultMT = (contH - resultH) / 2;
      }

      // apply result to item
      self.css(self.image.$item, {
        height: `${resultH}px`,
        marginTop: `${resultMT}px`,
        left: self.image.position === "fixed" ? `${rect.left}px` : "0",
        width: `${rect.width}px`
      });

      // call onCoverImage event
      if (self.options.onCoverImage) {
        self.options.onCoverImage.call(self);
      }

      // return some useful data. Used in the video cover function
      return {
        image: {
          height: resultH,
          marginTop: resultMT
        },
        container: rect
      };
    }
    isVisible() {
      return this.isElementInViewport || false;
    }
    onScroll(force) {
      const self = this;

      // stop calculations if item is not in viewport
      if (!force && !self.isVisible()) {
        return;
      }
      const {
        height: wndH
      } = getWindowSize();
      const rect = self.$item.getBoundingClientRect();
      const contT = rect.top;
      const contH = rect.height;
      const styles = {};

      // calculate parallax helping variables
      const beforeTop = Math.max(0, contT);
      const beforeTopEnd = Math.max(0, contH + contT);
      const afterTop = Math.max(0, -contT);
      const beforeBottom = Math.max(0, contT + contH - wndH);
      const beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
      const afterBottom = Math.max(0, -contT + wndH - contH);
      const fromViewportCenter = 1 - 2 * ((wndH - contT) / (wndH + contH));

      // calculate on how percent of section is visible
      let visiblePercent = 1;
      if (contH < wndH) {
        visiblePercent = 1 - (afterTop || beforeBottom) / contH;
      } else if (beforeTopEnd <= wndH) {
        visiblePercent = beforeTopEnd / wndH;
      } else if (beforeBottomEnd <= wndH) {
        visiblePercent = beforeBottomEnd / wndH;
      }

      // opacity
      if (self.options.type === "opacity" || self.options.type === "scale-opacity" || self.options.type === "scroll-opacity") {
        styles.transform = "translate3d(0,0,0)";
        styles.opacity = visiblePercent;
      }

      // scale
      if (self.options.type === "scale" || self.options.type === "scale-opacity") {
        let scale = 1;
        if (self.options.speed < 0) {
          scale -= self.options.speed * visiblePercent;
        } else {
          scale += self.options.speed * (1 - visiblePercent);
        }
        styles.transform = `scale(${scale}) translate3d(0,0,0)`;
      }

      // scroll
      if (self.options.type === "scroll" || self.options.type === "scroll-opacity") {
        let positionY = self.parallaxScrollDistance * fromViewportCenter;

        // fix if parallax block in absolute position
        if (self.image.position === "absolute") {
          positionY -= contT;
        }
        styles.transform = `translate3d(0,${positionY}px,0)`;
      }
      self.css(self.image.$item, styles);

      // call onScroll event
      if (self.options.onScroll) {
        self.options.onScroll.call(self, {
          section: rect,
          beforeTop,
          beforeTopEnd,
          afterTop,
          beforeBottom,
          beforeBottomEnd,
          afterBottom,
          visiblePercent,
          fromViewportCenter
        });
      }
    }
    onResize() {
      this.coverImage();
    }
  }

  // global definition
  const jarallax = function (items, options, ...args) {
    // check for dom element
    // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    if (typeof HTMLElement === "object" ? items instanceof HTMLElement : items && typeof items === "object" && items !== null && items.nodeType === 1 && typeof items.nodeName === "string") {
      items = [items];
    }
    const len = items.length;
    let k = 0;
    let ret;
    for (k; k < len; k += 1) {
      if (typeof options === "object" || typeof options === "undefined") {
        if (!items[k].jarallax) {
          items[k].jarallax = new Jarallax(items[k], options);
        }
      } else if (items[k].jarallax) {
        // eslint-disable-next-line prefer-spread
        ret = items[k].jarallax[options].apply(items[k].jarallax, args);
      }
      if (typeof ret !== "undefined") {
        return ret;
      }
    }
    return items;
  };
  jarallax.constructor = Jarallax;
  const $ = global$1.jQuery;

  // jQuery support
  if (typeof $ !== "undefined") {
    const $Plugin = function (...args) {
      Array.prototype.unshift.call(args, this);
      const res = jarallax.apply(global$1, args);
      return typeof res !== "object" ? res : this;
    };
    $Plugin.constructor = jarallax.constructor;

    // no conflict
    const old$Plugin = $.fn.jarallax;
    $.fn.jarallax = $Plugin;
    $.fn.jarallax.noConflict = function () {
      $.fn.jarallax = old$Plugin;
      return this;
    };
  }

  // data-jarallax initialization
  ready(() => {
    jarallax(document.querySelectorAll("[data-jarallax]"));
  });
  return jarallax;
});

/***/ }),

/***/ "./src/frontend/libs/jquery.backstretch/backstretch.js":
/*!*************************************************************!*\
  !*** ./src/frontend/libs/jquery.backstretch/backstretch.js ***!
  \*************************************************************/
/***/ (() => {

/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */

;
(function ($, window, undefined) {
  'use strict';

  /* PLUGIN DEFINITION
   * ========================= */
  $.fn.backstretch = function (images, options) {
    // We need at least one image or method name
    if (images === undefined || images.length === 0) {
      $.error("No images were supplied for Backstretch");
    }

    /*
     * Scroll the page one pixel to get the right window height on iOS
     * Pretty harmless for everyone else
    */
    if ($(window).scrollTop() === 0) {
      window.scrollTo(0, 0);
    }
    return this.each(function () {
      var $this = $(this),
        obj = $this.data('backstretch');

      // Do we already have an instance attached to this element?
      if (obj) {
        // Is this a method they're trying to execute?
        if (typeof images == 'string' && typeof obj[images] == 'function') {
          // Call the method
          obj[images](options);

          // No need to do anything further
          return;
        }

        // Merge the old options with the new
        options = $.extend(obj.options, options);

        // Remove the old instance
        obj.destroy(true);
      }
      obj = new Backstretch(this, images, options);
      $this.data('backstretch', obj);
    });
  };

  // If no element is supplied, we'll attach to body
  $.backstretch = function (images, options) {
    // Return the instance
    return $('body').backstretch(images, options).data('backstretch');
  };

  // Custom selector
  $.expr[':'].backstretch = function (elem) {
    return $(elem).data('backstretch') !== undefined;
  };

  /* DEFAULTS
   * ========================= */

  $.fn.backstretch.defaults = {
    centeredX: true // Should we center the image on the X axis?
    ,
    centeredY: true // Should we center the image on the Y axis?
    ,
    duration: 5000 // Amount of time in between slides (if slideshow)
    ,
    fade: 0 // Speed of fade transition between slides
  };

  /* STYLES
   * 
   * Baked-in styles that we'll apply to our elements.
   * In an effort to keep the plugin simple, these are not exposed as options.
   * That said, anyone can override these in their own stylesheet.
   * ========================= */
  var styles = {
    wrap: {
      left: 0,
      top: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      height: '100%',
      width: '100%',
      zIndex: -999999
    },
    img: {
      position: 'absolute',
      display: 'none',
      margin: 0,
      padding: 0,
      border: 'none',
      width: 'auto',
      height: 'auto',
      maxHeight: 'none',
      maxWidth: 'none',
      zIndex: -999999
    }
  };

  /* CLASS DEFINITION
   * ========================= */
  var Backstretch = function (container, images, options) {
    this.options = $.extend({}, $.fn.backstretch.defaults, options || {});

    /* In its simplest form, we allow Backstretch to be called on an image path.
     * e.g. $.backstretch('/path/to/image.jpg')
     * So, we need to turn this back into an array.
     */
    this.images = $.isArray(images) ? images : [images];

    // Preload images
    $.each(this.images, function () {
      $('<img />')[0].src = this;
    });

    // Convenience reference to know if the container is body.
    this.isBody = container === document.body;

    /* We're keeping track of a few different elements
     *
     * Container: the element that Backstretch was called on.
     * Wrap: a DIV that we place the image into, so we can hide the overflow.
     * Root: Convenience reference to help calculate the correct height.
     */
    this.$container = $(container);
    this.$root = this.isBody ? supportsFixedPosition ? $(window) : $(document) : this.$container;

    // Don't create a new wrap if one already exists (from a previous instance of Backstretch)
    var $existing = this.$container.children(".backstretch").first();
    this.$wrap = $existing.length ? $existing : $('<div class="backstretch"></div>').css(styles.wrap).appendTo(this.$container);

    // Non-body elements need some style adjustments
    if (!this.isBody) {
      // If the container is statically positioned, we need to make it relative,
      // and if no zIndex is defined, we should set it to zero.
      var position = this.$container.css('position'),
        zIndex = this.$container.css('zIndex');
      this.$container.css({
        position: position === 'static' ? 'relative' : position,
        zIndex: zIndex === 'auto' ? 0 : zIndex,
        background: 'none'
      });

      // Needs a higher z-index
      this.$wrap.css({
        zIndex: -999998
      });
    }

    // Fixed or absolute positioning?
    this.$wrap.css({
      position: this.isBody && supportsFixedPosition ? 'fixed' : 'absolute'
    });

    // Set the first image
    this.index = 0;
    this.show(this.index);

    // Listen for resize
    $(window).on('resize.backstretch', $.proxy(this.resize, this)).on('orientationchange.backstretch', $.proxy(function () {
      // Need to do this in order to get the right window height
      if (this.isBody && window.pageYOffset === 0) {
        window.scrollTo(0, 1);
        this.resize();
      }
    }, this));
  };

  /* PUBLIC METHODS
   * ========================= */
  Backstretch.prototype = {
    resize: function () {
      try {
        var bgCSS = {
            left: 0,
            top: 0
          },
          rootWidth = this.isBody ? this.$root.width() : this.$root.innerWidth(),
          bgWidth = rootWidth,
          rootHeight = this.isBody ? window.innerHeight ? window.innerHeight : this.$root.height() : this.$root.innerHeight(),
          bgHeight = bgWidth / this.$img.data('ratio'),
          bgOffset;

        // Make adjustments based on image ratio
        if (bgHeight >= rootHeight) {
          bgOffset = (bgHeight - rootHeight) / 2;
          if (this.options.centeredY) {
            bgCSS.top = '-' + bgOffset + 'px';
          }
        } else {
          bgHeight = rootHeight;
          bgWidth = bgHeight * this.$img.data('ratio');
          bgOffset = (bgWidth - rootWidth) / 2;
          if (this.options.centeredX) {
            bgCSS.left = '-' + bgOffset + 'px';
          }
        }
        this.$wrap.css({
          width: rootWidth,
          height: rootHeight
        }).find('img:not(.deleteable)').css({
          width: bgWidth,
          height: bgHeight
        }).css(bgCSS);
      } catch (err) {
        // IE7 seems to trigger resize before the image is loaded.
        // This try/catch block is a hack to let it fail gracefully.
      }
      return this;
    }

    // Show the slide at a certain position
    ,
    show: function (newIndex) {
      // Validate index
      if (Math.abs(newIndex) > this.images.length - 1) {
        return;
      }

      // Vars
      var self = this,
        oldImage = self.$wrap.find('img').addClass('deleteable'),
        evtOptions = {
          relatedTarget: self.$container[0]
        };

      // Trigger the "before" event
      self.$container.trigger($.Event('backstretch.before', evtOptions), [self, newIndex]);

      // Set the new index
      this.index = newIndex;

      // Pause the slideshow
      clearInterval(self.interval);

      // New image
      self.$img = $('<img />').css(styles.img).bind('load', function (e) {
        var imgWidth = this.width || $(e.target).width(),
          imgHeight = this.height || $(e.target).height();

        // Save the ratio
        $(this).data('ratio', imgWidth / imgHeight);

        // Show the image, then delete the old one
        // "speed" option has been deprecated, but we want backwards compatibilty
        $(this).fadeIn(self.options.speed || self.options.fade, function () {
          oldImage.remove();

          // Resume the slideshow
          if (!self.paused) {
            self.cycle();
          }

          // Trigger the "after" and "show" events
          // "show" is being deprecated
          $(['after', 'show']).each(function () {
            self.$container.trigger($.Event('backstretch.' + this, evtOptions), [self, newIndex]);
          });
        });

        // Resize
        self.resize();
      }).appendTo(self.$wrap);

      // Hack for IE img onload event
      self.$img.attr('src', self.images[newIndex]);
      return self;
    },
    next: function () {
      // Next slide
      return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0);
    },
    prev: function () {
      // Previous slide
      return this.show(this.index === 0 ? this.images.length - 1 : this.index - 1);
    },
    pause: function () {
      // Pause the slideshow
      this.paused = true;
      return this;
    },
    resume: function () {
      // Resume the slideshow
      this.paused = false;
      this.next();
      return this;
    },
    cycle: function () {
      // Start/resume the slideshow
      if (this.images.length > 1) {
        // Clear the interval, just in case
        clearInterval(this.interval);
        this.interval = setInterval($.proxy(function () {
          // Check for paused slideshow
          if (!this.paused) {
            this.next();
          }
        }, this), this.options.duration);
      }
      return this;
    },
    destroy: function (preserveBackground) {
      // Stop the resize events
      $(window).off('resize.backstretch orientationchange.backstretch');

      // Clear the interval
      clearInterval(this.interval);

      // Remove Backstretch
      if (!preserveBackground) {
        this.$wrap.remove();
      }
      this.$container.removeData('backstretch');
    }
  };

  /* SUPPORTS FIXED POSITION?
   *
   * Based on code from jQuery Mobile 1.1.0
   * http://jquerymobile.com/
   *
   * In a nutshell, we need to figure out if fixed positioning is supported.
   * Unfortunately, this is very difficult to do on iOS, and usually involves
   * injecting content, scrolling the page, etc.. It's ugly.
   * jQuery Mobile uses this workaround. It's not ideal, but works.
   *
   * Modified to detect IE6
   * ========================= */

  var supportsFixedPosition = function () {
    var ua = navigator.userAgent,
      platform = navigator.platform
      // Rendering engine is Webkit, and capture major version
      ,
      wkmatch = ua.match(/AppleWebKit\/([0-9]+)/),
      wkversion = !!wkmatch && wkmatch[1],
      ffmatch = ua.match(/Fennec\/([0-9]+)/),
      ffversion = !!ffmatch && ffmatch[1],
      operammobilematch = ua.match(/Opera Mobi\/([0-9]+)/),
      omversion = !!operammobilematch && operammobilematch[1],
      iematch = ua.match(/MSIE ([0-9]+)/),
      ieversion = !!iematch && iematch[1];
    return !(
    // iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
    (platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1 || platform.indexOf("iPod") > -1) && wkversion && wkversion < 534 ||
    // Opera Mini
    window.operamini && {}.toString.call(window.operamini) === "[object OperaMini]" || operammobilematch && omversion < 7458 ||
    //Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
    ua.indexOf("Android") > -1 && wkversion && wkversion < 533 ||
    // Firefox Mobile before 6.0 -
    ffversion && ffversion < 6 ||
    // WebOS less than 3
    "palmGetResource" in window && wkversion && wkversion < 534 ||
    // MeeGo
    ua.indexOf("MeeGo") > -1 && ua.indexOf("NokiaBrowser/8.5.0") > -1 ||
    // IE6
    ieversion && ieversion <= 6);
  }();
})(jQuery, window);

/***/ }),

/***/ "./src/frontend/libs/jquery.bully.js":
/*!*******************************************!*\
  !*** ./src/frontend/libs/jquery.bully.js ***!
  \*******************************************/
/***/ (() => {

/*!
 * jQuery Bully Plugin v0.1.3
 * Examples and documentation at http://pixelgrade.github.io/rellax/
 * Copyright (c) 2016 PixelGrade http://www.pixelgrade.com
 * Licensed under MIT http://www.opensource.org/licenses/mit-license.php/
 */
(function ($, window, document, undefined) {
  var $window = $(window),
    windowHeight = $window.height(),
    elements = [],
    $bully,
    lastScrollY = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0),
    current = 0,
    inversed = false,
    frameRendered = true;
  $bully = $('<div class="c-bully">').appendTo("body");
  if (Onepress_Bully.disable_mobile) {
    $bully.addClass('c-bully-hide-on-mobile');
  }
  $current = $('<div class="c-bully__bullet c-bully__bullet--active">').appendTo($bully);
  (function update() {
    if (frameRendered !== true) {
      var count = 0;
      var lastItemId = false;

      // Ty to to find item that bully over
      var _bt = $bully.offset().top;
      var _bh = $bully.height();
      var _bb = _bh + _bt;
      if ($("#masthead").hasClass("is-sticky")) {
        _bb -= $("#masthead").height();
      }
      if ($("#wpadminbar").length) {
        _bb -= $("#wpadminbar").height();
      }
      $.each(Onepress_Bully.sections, function (id, arg) {
        var element = $("#" + id);
        if (element.length) {
          var _et = element.offset().top;
          var _eh = element.height();
          var _eb = _eh + _et;
          if (_et <= _bt || _bb >= _eb || _bb >= _et && _eb > _bb) {
            lastItemId = id;
            if (arg.enable) {
              count = count + 1;
            }
          }
        }
      });

      // New insverse
      if (lastItemId && typeof Onepress_Bully.sections[lastItemId] !== "undefined") {
        if (Onepress_Bully.sections[lastItemId].inverse) {
          $bully.addClass("c-bully--inversed");
        } else {
          $bully.removeClass("c-bully--inversed");
        }
      }
      if (count !== current) {
        var activeBullet = $bully.find("#bully__" + lastItemId);
        var bullyOffset = $bully.offset();
        var offset = 0;
        if (activeBullet.length > 0) {
          offset = activeBullet.offset().top - bullyOffset.top;
        }
        var offset = $bully.children('.c-bully__bullet').not('.c-bully__bullet--active').first().outerHeight(true) * (count - 1);
        $current.removeClass("c-bully__bullet--squash");
        setTimeout(function () {
          $current.addClass("c-bully__bullet--squash");
        });
        $current.css("top", offset);
        current = count;
        $bully.find(".c-bully__bullet--pop").removeClass("c-bully__current");
        activeBullet.addClass("c-bully__current");
      }
    }
    window.requestAnimationFrame(update);
    frameRendered = true;
  })();
  function reloadAll() {
    $.each(elements, function (i, element) {
      element._reloadElement();
    });
  }
  function staggerClass($elements, classname, timeout) {
    $.each($elements, function (i, obj) {
      obj.$bullet.addClass(classname);
      /*
      	var stagger = i * timeout;
      		setTimeout( function() {
      		obj.$bullet.addClass( classname );
      	}, stagger );
      	*/
    });
  }
  $window.on("load", function (e) {
    staggerClass(elements, "c-bully__bullet--pop", 400);
    frameRendered = false;
  });
  $window.on("scroll", function (e) {
    if (frameRendered === true) {
      lastScrollY = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    }
    frameRendered = false;
  });
  $window.on("load resize", function () {
    reloadAll();
  });
  $(document).on("hero_ready", function () {
    reloadAll();
  });
  function Bully(element, options) {
    this.element = element;
    this.options = $.extend({}, $.fn.bully.defaults, options);
    var label = "";
    var id = element.id;
    var self = this,
      $bullet = $('<div id="bully__' + id + '" class="c-bully__bullet">');
    if (Onepress_Bully.enable_label) {
      if (id && typeof Onepress_Bully.sections[id] !== "undefined") {
        label = Onepress_Bully.sections[id].title;
      }
      if (label) {
        $bullet.append('<div class="c-bully__title">' + label + "</div>");
      }
    }
    $bullet.data("bully-data", self).appendTo($bully);
    $bullet.on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      self.onClick();
    });
    this.$bullet = $bullet;
    self._reloadElement();
    elements.push(self);
    current = 0;
  }
  Bully.prototype = {
    constructor: Bully,
    _reloadElement: function () {
      this.offset = $(this.element).offset();
      this.height = $(this.element).outerHeight();
    },
    _calcTop: function (top) {
      // check if has sticky
      if ($("#masthead").hasClass("is-sticky")) {
        top -= $("#masthead").height();
      }
      if ($("#wpadminbar").length) {
        top -= $("#wpadminbar").height();
      }
      return top;
    },
    onClick: function () {
      var self = this,
        $target = $("html, body");
      if (self.options.scrollDuration == 0) {
        $target.scrollTop(this._calcTop(self.offset.top));
        return;
      }
      if (self.options.scrollDuration === "auto") {
        var duration = Math.abs(lastScrollY - self.offset.top) / (self.options.scrollPerSecond / 1000);
        $target.animate({
          scrollTop: this._calcTop(self.offset.top)
        }, duration);
        return;
      }
      $target.animate({
        scrollTop: this._calcTop(self.offset.top)
      }, self.options.scrollDuration);
    }
  };
  $.fn.bully = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + Bully)) {
        $.data(this, "plugin_" + Bully, new Bully(this, options));
      }
    });
  };
  $.fn.bully.defaults = {
    scrollDuration: "auto",
    scrollPerSecond: 4000,
    sections: {}
  };
  $window.on("rellax load", reloadAll);
  $.each(Onepress_Bully.sections, function (id, args) {
    if (args.enable) {
      const section = $("#" + id);
      if (section.length) {
        section.bully({
          scrollPerSecond: 3000
        });
      }
    }
  });
})(jQuery, window, document);

/***/ }),

/***/ "./src/frontend/libs/jquery.counterup.js":
/*!***********************************************!*\
  !*** ./src/frontend/libs/jquery.counterup.js ***!
  \***********************************************/
/***/ (() => {

/*!
 * jquery.counterup.js 2.1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Amended by Jeremy Paris, Ciro Mattia Gonano and others
 *
 * Date: Feb 24, 2017
 */
(function ($) {
  "use strict";

  $.fn.counterUp = function (options) {
    // Defaults
    var settings = $.extend({
        time: 400,
        delay: 10,
        offset: 100,
        beginAt: 0,
        formatter: false,
        context: "window",
        callback: function () {}
      }, options),
      s;
    return this.each(function () {
      // Store the object
      var $this = $(this),
        counter = {
          time: $(this).data("counterup-time") || settings.time,
          delay: $(this).data("counterup-delay") || settings.delay,
          offset: $(this).data("counterup-offset") || settings.offset,
          beginAt: $(this).data("counterup-beginat") || settings.beginAt,
          context: $(this).data("counterup-context") || settings.context
        };
      var counterUpper = function () {
        var nums = [];
        var divisions = counter.time / counter.delay;
        var num = $this.attr("data-num") ? $this.attr("data-num") : $this.text();
        var isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, "");
        var decimalPlaces = (num.split(".")[1] || []).length;
        if (counter.beginAt > num) counter.beginAt = num;
        var isTime = /[0-9]+:[0-9]+:[0-9]+/.test(num);

        // Convert time to total seconds
        if (isTime) {
          var times = num.split(":"),
            m = 1;
          s = 0;
          while (times.length > 0) {
            s += m * parseInt(times.pop(), 10);
            m *= 60;
          }
        }

        // Generate list of incremental numbers to display
        for (var i = divisions; i >= counter.beginAt / num * divisions; i--) {
          var newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);

          // Add incremental seconds and convert back to time
          if (isTime) {
            newNum = parseInt(s / divisions * i);
            var hours = parseInt(newNum / 3600) % 24;
            var minutes = parseInt(newNum / 60) % 60;
            var seconds = parseInt(newNum % 60, 10);
            newNum = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
          }

          // Preserve commas if input had commas
          if (isComma) {
            while (/(\d+)(\d{3})/.test(newNum.toString())) {
              newNum = newNum.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
            }
          }
          if (settings.formatter) {
            newNum = settings.formatter.call(this, newNum);
          }
          nums.unshift(newNum);
        }
        $this.data("counterup-nums", nums);
        $this.text(counter.beginAt);

        // Updates the number until we're done
        var f = function () {
          if (!$this.data("counterup-nums")) {
            settings.callback.call(this);
            return;
          }
          $this.html($this.data("counterup-nums").shift());
          if ($this.data("counterup-nums").length) {
            setTimeout($this.data("counterup-func"), counter.delay);
          } else {
            $this.data("counterup-nums", null);
            $this.data("counterup-func", null);
            settings.callback.call(this);
          }
        };
        $this.data("counterup-func", f);

        // Start the count up
        setTimeout($this.data("counterup-func"), counter.delay);
      };

      // Perform counts when the element gets into view
      $this.waypoint(function (direction) {
        counterUpper();
        this.destroy(); //-- Waypoint 3.0 version of triggerOnce
      }, {
        offset: counter.offset + "%",
        context: counter.context
      });
    });
  };
})(jQuery);

/***/ }),

/***/ "./src/frontend/libs/waypoints/index.js":
/*!**********************************************!*\
  !*** ./src/frontend/libs/waypoints/index.js ***!
  \**********************************************/
/***/ (() => {

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function () {
  "use strict";

  var keyCounter = 0;
  var allWaypoints = {};

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error("No options passed to Waypoint constructor");
    }
    if (!options.element) {
      throw new Error("No element option passed to Waypoint constructor");
    }
    if (!options.handler) {
      throw new Error("No handler option passed to Waypoint constructor");
    }
    this.key = "waypoint-" + keyCounter;
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options);
    this.element = this.options.element;
    this.adapter = new Waypoint.Adapter(this.element);
    this.callback = options.handler;
    this.axis = this.options.horizontal ? "horizontal" : "vertical";
    this.enabled = this.options.enabled;
    this.triggerPoint = null;
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    });
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context);
    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset];
    }
    this.group.add(this);
    this.context.add(this);
    allWaypoints[this.key] = this;
    keyCounter += 1;
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function (direction) {
    this.group.queueTrigger(this, direction);
  };

  /* Private */
  Waypoint.prototype.trigger = function (args) {
    if (!this.enabled) {
      return;
    }
    if (this.callback) {
      this.callback.apply(this, args);
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function () {
    this.context.remove(this);
    this.group.remove(this);
    delete allWaypoints[this.key];
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function () {
    this.enabled = false;
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function () {
    this.context.refresh();
    this.enabled = true;
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function () {
    return this.group.next(this);
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function () {
    return this.group.previous(this);
  };

  /* Private */
  Waypoint.invokeAll = function (method) {
    var allWaypointsArray = [];
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey]);
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function () {
    Waypoint.invokeAll("destroy");
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function () {
    Waypoint.invokeAll("disable");
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function () {
    Waypoint.Context.refreshAll();
    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true;
    }
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function () {
    Waypoint.Context.refreshAll();
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function () {
    return document.documentElement.clientWidth;
  };
  Waypoint.adapters = [];
  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: "default",
    horizontal: false,
    offset: 0
  };
  Waypoint.offsetAliases = {
    "bottom-in-view": function () {
      return this.context.innerHeight() - this.adapter.outerHeight();
    },
    "right-in-view": function () {
      return this.context.innerWidth() - this.adapter.outerWidth();
    }
  };
  window.Waypoint = Waypoint;
})();
(function () {
  "use strict";

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60);
  }
  var keyCounter = 0;
  var contexts = {};
  var Waypoint = window.Waypoint;
  var oldWindowLoad = window.onload;

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element;
    this.Adapter = Waypoint.Adapter;
    this.adapter = new this.Adapter(element);
    this.key = "waypoint-context-" + keyCounter;
    this.didScroll = false;
    this.didResize = false;
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    };
    this.waypoints = {
      vertical: {},
      horizontal: {}
    };
    element.waypointContextKey = this.key;
    contexts[element.waypointContextKey] = this;
    keyCounter += 1;
    if (!Waypoint.windowContext) {
      Waypoint.windowContext = true;
      Waypoint.windowContext = new Context(window);
    }
    this.createThrottledScrollHandler();
    this.createThrottledResizeHandler();
  }

  /* Private */
  Context.prototype.add = function (waypoint) {
    var axis = waypoint.options.horizontal ? "horizontal" : "vertical";
    this.waypoints[axis][waypoint.key] = waypoint;
    this.refresh();
  };

  /* Private */
  Context.prototype.checkEmpty = function () {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal);
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical);
    var isWindow = this.element == this.element.window;
    if (horizontalEmpty && verticalEmpty && !isWindow) {
      this.adapter.off(".waypoints");
      delete contexts[this.key];
    }
  };

  /* Private */
  Context.prototype.createThrottledResizeHandler = function () {
    var self = this;
    function resizeHandler() {
      self.handleResize();
      self.didResize = false;
    }
    this.adapter.on("resize.waypoints", function () {
      if (!self.didResize) {
        self.didResize = true;
        Waypoint.requestAnimationFrame(resizeHandler);
      }
    });
  };

  /* Private */
  Context.prototype.createThrottledScrollHandler = function () {
    var self = this;
    function scrollHandler() {
      self.handleScroll();
      self.didScroll = false;
    }
    this.adapter.on("scroll.waypoints", function () {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true;
        Waypoint.requestAnimationFrame(scrollHandler);
      }
    });
  };

  /* Private */
  Context.prototype.handleResize = function () {
    Waypoint.Context.refreshAll();
  };

  /* Private */
  Context.prototype.handleScroll = function () {
    var triggeredGroups = {};
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left"
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up"
      }
    };
    for (var axisKey in axes) {
      var axis = axes[axisKey];
      var isForward = axis.newScroll > axis.oldScroll;
      var direction = isForward ? axis.forward : axis.backward;
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];
        if (waypoint.triggerPoint === null) {
          continue;
        }
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint;
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint;
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint;
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint;
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }
    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers();
    }
    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    };
  };

  /* Private */
  Context.prototype.innerHeight = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight();
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight();
  };

  /* Private */
  Context.prototype.remove = function (waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key];
    this.checkEmpty();
  };

  /* Private */
  Context.prototype.innerWidth = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth();
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth();
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function () {
    var allWaypoints = [];
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey]);
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function () {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window;
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset();
    var triggeredGroups = {};
    var axes;
    this.handleScroll();
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left",
        offsetProp: "left"
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up",
        offsetProp: "top"
      }
    };
    for (var axisKey in axes) {
      var axis = axes[axisKey];
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];
        var adjustment = waypoint.options.offset;
        var oldTriggerPoint = waypoint.triggerPoint;
        var elementOffset = 0;
        var freshWaypoint = oldTriggerPoint == null;
        var contextModifier, wasBeforeScroll, nowAfterScroll;
        var triggeredBackward, triggeredForward;
        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp];
        }
        if (typeof adjustment === "function") {
          adjustment = adjustment.apply(waypoint);
        } else if (typeof adjustment === "string") {
          adjustment = parseFloat(adjustment);
          if (waypoint.options.offset.indexOf("%") > -1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
          }
        }
        contextModifier = axis.contextScroll - axis.contextOffset;
        waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment);
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll;
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll;
        triggeredBackward = wasBeforeScroll && nowAfterScroll;
        triggeredForward = !wasBeforeScroll && !nowAfterScroll;
        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }
    Waypoint.requestAnimationFrame(function () {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers();
      }
    });
    return this;
  };

  /* Private */
  Context.findOrCreateByElement = function (element) {
    return Context.findByElement(element) || new Context(element);
  };

  /* Private */
  Context.refreshAll = function () {
    for (var contextId in contexts) {
      contexts[contextId].refresh();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function (element) {
    return contexts[element.waypointContextKey];
  };
  window.onload = function () {
    if (oldWindowLoad) {
      oldWindowLoad();
    }
    Context.refreshAll();
  };
  Waypoint.requestAnimationFrame = function (callback) {
    var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim;
    requestFn.call(window, callback);
  };
  Waypoint.Context = Context;
})();
(function () {
  "use strict";

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint;
  }
  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint;
  }
  var groups = {
    vertical: {},
    horizontal: {}
  };
  var Waypoint = window.Waypoint;

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name;
    this.axis = options.axis;
    this.id = this.name + "-" + this.axis;
    this.waypoints = [];
    this.clearTriggerQueues();
    groups[this.axis][this.name] = this;
  }

  /* Private */
  Group.prototype.add = function (waypoint) {
    this.waypoints.push(waypoint);
  };

  /* Private */
  Group.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    };
  };

  /* Private */
  Group.prototype.flushTriggers = function () {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction];
      var reverse = direction === "up" || direction === "left";
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i];
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction]);
        }
      }
    }
    this.clearTriggerQueues();
  };

  /* Private */
  Group.prototype.next = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    var isLast = index === this.waypoints.length - 1;
    return isLast ? null : this.waypoints[index + 1];
  };

  /* Private */
  Group.prototype.previous = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    return index ? this.waypoints[index - 1] : null;
  };

  /* Private */
  Group.prototype.queueTrigger = function (waypoint, direction) {
    this.triggerQueues[direction].push(waypoint);
  };

  /* Private */
  Group.prototype.remove = function (waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    if (index > -1) {
      this.waypoints.splice(index, 1);
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function () {
    return this.waypoints[0];
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1];
  };

  /* Private */
  Group.findOrCreate = function (options) {
    return groups[options.axis][options.name] || new Group(options);
  };
  Waypoint.Group = Group;
})();
(function () {
  "use strict";

  var $ = window.jQuery;
  var Waypoint = window.Waypoint;
  function JQueryAdapter(element) {
    this.$element = $(element);
  }
  $.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (i, method) {
    JQueryAdapter.prototype[method] = function () {
      var args = Array.prototype.slice.call(arguments);
      return this.$element[method].apply(this.$element, args);
    };
  });
  $.each(["extend", "inArray", "isEmptyObject"], function (i, method) {
    JQueryAdapter[method] = $[method];
  });
  Waypoint.adapters.push({
    name: "jquery",
    Adapter: JQueryAdapter
  });
  Waypoint.Adapter = JQueryAdapter;
})();
(function () {
  "use strict";

  var Waypoint = window.Waypoint;
  function createExtension(framework) {
    return function () {
      var waypoints = [];
      var overrides = arguments[0];
      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1]);
        overrides.handler = arguments[0];
      }
      this.each(function () {
        var options = framework.extend({}, overrides, {
          element: this
        });
        if (typeof options.context === "string") {
          options.context = framework(this).closest(options.context)[0];
        }
        waypoints.push(new Waypoint(options));
      });
      return waypoints;
    };
  }
  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery);
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto);
  }
})();

/***/ }),

/***/ "./src/frontend/sass/style.scss":
/*!**************************************!*\
  !*** ./src/frontend/sass/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/frontend/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var wow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wow.js */ "./node_modules/wow.js/dist/wow.js");
/* harmony import */ var wow_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wow_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_FitVids_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/FitVids.js */ "./src/frontend/libs/FitVids.js");
/* harmony import */ var _libs_FitVids_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_FitVids_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _libs_Morphext_morphext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/Morphext/morphext.js */ "./src/frontend/libs/Morphext/morphext.js");
/* harmony import */ var _libs_Morphext_morphext_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_libs_Morphext_morphext_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _libs_jquery_backstretch_backstretch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./libs/jquery.backstretch/backstretch.js */ "./src/frontend/libs/jquery.backstretch/backstretch.js");
/* harmony import */ var _libs_jquery_backstretch_backstretch_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_libs_jquery_backstretch_backstretch_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _libs_waypoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./libs/waypoints */ "./src/frontend/libs/waypoints/index.js");
/* harmony import */ var _libs_waypoints__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_libs_waypoints__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _libs_jquery_counterup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./libs/jquery.counterup */ "./src/frontend/libs/jquery.counterup.js");
/* harmony import */ var _libs_jquery_counterup__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_libs_jquery_counterup__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _libs_imagesloaded_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./libs/imagesloaded.js */ "./src/frontend/libs/imagesloaded.js");
/* harmony import */ var _libs_imagesloaded_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_libs_imagesloaded_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _libs_jarallax_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./libs/jarallax.js */ "./src/frontend/libs/jarallax.js");
/* harmony import */ var _libs_jarallax_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_libs_jarallax_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _libs_jquery_bully_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./libs/jquery.bully.js */ "./src/frontend/libs/jquery.bully.js");
/* harmony import */ var _libs_jquery_bully_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_libs_jquery_bully_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _libs_bootstrap_bootstrap_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./libs/bootstrap/bootstrap.css */ "./src/frontend/libs/bootstrap/bootstrap.css");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sass/style.scss */ "./src/frontend/sass/style.scss");











var onepressIsMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return onepressIsMobile.Android() || onepressIsMobile.BlackBerry() || onepressIsMobile.iOS() || onepressIsMobile.Opera() || onepressIsMobile.Windows();
  }
};
function preload_images(images, complete_callback) {
  if (onepress_js_settings.hero_disable_preload) {
    if (complete_callback) {
      complete_callback();
    }
  } else {
    var id = "_img_loading_" + new Date().getTime();
    jQuery("body").append('<div id="' + id + '"></div>');
    jQuery.each(images, function (index, src) {
      var img = jQuery("<img>");
      img.attr("alt", "");
      img.attr("class", "image__preload");
      img.css("display", "none");
      img.attr("src", src);
      jQuery("#" + id).append(img);
    });
    jQuery("#" + id).imagesLoaded(function () {
      if (complete_callback) {
        complete_callback();
      }
      setTimeout(function () {
        jQuery("#" + id).remove();
      }, 5000);
    });
  }
}
function _to_number(string) {
  if (typeof string === "number") {
    return string;
  }
  var n = string.match(/\d+$/);
  if (n) {
    return parseFloat(n[0]);
  } else {
    return 0;
  }
}
function _to_bool(v) {
  if (typeof v === "boolean") {
    return v;
  }
  if (typeof v === "number") {
    return v === 0 ? false : true;
  }
  if (typeof v === "string") {
    if (v === "true" || v === "1") {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * skip-link-focus-fix.js
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://github.com/Automattic/OnePress/pull/136
 */
(function () {
  var is_webkit = navigator.userAgent.toLowerCase().indexOf("webkit") > -1,
    is_opera = navigator.userAgent.toLowerCase().indexOf("opera") > -1,
    is_ie = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
  if ((is_webkit || is_opera || is_ie) && document.getElementById && window.addEventListener) {
    window.addEventListener("hashchange", function () {
      var id = location.hash.substring(1),
        element;
      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }
      element = document.getElementById(id);
      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }
        element.focus();
      }
    }, false);
  }
})();
(function () {
  if (onepressIsMobile.any()) {
    /**
     * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
     */
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    // Then we set the value in the --vh, --vw custom property to the root of the document
    document.documentElement.style.setProperty("--vh", vh + "px");
    document.documentElement.style.setProperty("--vw", vw + "px");
    window.addEventListener("resize", function () {
      let vh = window.innerHeight * 0.01;
      let vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty("--vh", vh + "px");
      document.documentElement.style.setProperty("--vw", vw + "px");
    });
  }
})();
function isElementInViewport(el) {
  // Special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ && rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */;
}

/**
 * Sticky header when scroll.
 */
jQuery(document).ready(function ($) {
  var $window = $(window);
  var $document = $(document);
  $(document).on("mouseenter resize", ".sub-menu .menu-item-has-children", function () {
    var submenuEl = $(this).find(".sub-menu");
    if (submenuEl.length > 0 && !isElementInViewport(submenuEl)) {
      submenuEl.css({
        right: "100%",
        left: "auto"
      });
    }
  });
  var getAdminBarHeight = function () {
    var h = 0;
    if ($("#wpadminbar").length) {
      if ($("#wpadminbar").css("position") == "fixed") {
        h = $("#wpadminbar").height();
      }
    }
    return h;
  };
  var stickyHeaders = function () {
    var $stickies;
    var lastScrollTop = 0;
    var setData = function (stickies, addWrap) {
      var top = 0;
      if (typeof addWrap === "undefined") {
        addWrap = true;
      }
      $stickies = stickies.each(function () {
        var $thisSticky = $(this);
        var p = $thisSticky.parent();
        if (!p.hasClass("followWrap")) {
          if (addWrap) {
            $thisSticky.wrap('<div class="followWrap" />');
          }
        }
        $thisSticky.parent().removeAttr("style");
        $thisSticky.parent().height($thisSticky.height());
      });
    };
    var load = function (stickies) {
      if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
        setData(stickies);
        $window.scroll(function () {
          _whenScrolling();
        });
        $window.resize(function () {
          setData(stickies, false);
          stickies.each(function () {
            $(this).removeClass("fixed").removeAttr("style");
          });
          _whenScrolling();
        });
        $document.on("hero_ready", function () {
          $(".followWrap").removeAttr("style");
          setTimeout(function () {
            $(".followWrap").removeAttr("style");
            setData(stickies, false);
            _whenScrolling();
          }, 500);
        });
      }
    };
    var _whenScrolling = function () {
      var top = 0;
      top = getAdminBarHeight();
      var scrollTop = $window.scrollTop();
      $stickies.each(function (i) {
        var $thisSticky = $(this),
          $stickyPosition = $thisSticky.parent().offset().top;
        if (scrollTop === 0) {
          $thisSticky.addClass("no-scroll");
        }
        if ($stickyPosition - top <= scrollTop) {
          if (scrollTop > 0) {
            $thisSticky.removeClass("no-scroll");
          }
          $thisSticky.addClass("header-fixed");
          $thisSticky.css("top", top);
        } else {
          $thisSticky.removeClass("header-fixed").removeAttr("style").addClass("no-scroll");
        }
      });
    };
    return {
      load: load
    };
  }();
  stickyHeaders.load($("#masthead.is-sticky"));
  // When Header Panel rendered by customizer
  $document.on("header_view_changed", function () {
    stickyHeaders.load($("#masthead.is-sticky"));
  });

  /*
   * Nav Menu & element actions
   *
   * Smooth scroll for navigation and other elements
   */
  var mobile_max_width = 1140; // Media max width for mobile
  var main_navigation = jQuery(".main-navigation .onepress-menu");
  var header = document.getElementById("masthead");
  if (header) {
    var noSticky = header.classList.contains("no-sticky");
  }
  var setNavTop = function () {
    var offset = header.getBoundingClientRect();
    var top = offset.x + offset.height - 1;
    main_navigation.css({
      top: top
    });
  };

  /**
   * Get mobile navigation height.
   *
   * @return number
   */
  var getNavHeight = function (fitWindow) {
    if (typeof fitWindow === "undefined") {
      fitWindow = true;
    }
    if (fitWindow) {
      var offset = header.getBoundingClientRect();
      var h = $(window).height() - (offset.x + offset.height) + 1;
      return h;
    } else {
      main_navigation.css("height", "auto");
      var navOffset = main_navigation[0].getBoundingClientRect();
      main_navigation.css("height", 0);
      return navOffset.height;
    }
  };

  /**
   * Initialise Menu Toggle
   *
   * @since 0.0.1
   * @since 2.2.1
   */
  $document.on("click", "#nav-toggle", function (event) {
    event.preventDefault();
    jQuery("#nav-toggle").toggleClass("nav-is-visible");
    jQuery(".header-widget").toggleClass("header-widget-mobile");
    main_navigation.stop();
    // Open menu mobile.
    if (!main_navigation.hasClass("onepress-menu-mobile")) {
      main_navigation.addClass("onepress-menu-mobile");
      $("body").addClass("onepress-menu-mobile-opening");
      setNavTop();
      var h = getNavHeight(!noSticky);
      if (isNaN(h)) {
        // when IE 11 & Edge return h is NaN.
        h = $(window).height();
      }
      main_navigation.animate({
        height: h
      }, 300, function () {
        // Animation complete.
        if (noSticky) {
          main_navigation.css({
            "min-height": h,
            height: "auto"
          });
        }
      });
    } else {
      main_navigation.css({
        height: main_navigation.height(),
        "min-height": 0,
        overflow: "hidden"
      });
      setTimeout(function () {
        main_navigation.animate({
          height: 0
        }, 300, function () {
          main_navigation.removeAttr("style");
          main_navigation.removeClass("onepress-menu-mobile");
          $("body").removeClass("onepress-menu-mobile-opening");
        });
      }, 40);
    }
  });

  /**
   * Fix nav height when touch move on mobile.
   *
   * @since 2.2.1
   */
  if (!noSticky && onepressIsMobile.any()) {
    $(document).on("scroll", function () {
      if (main_navigation.hasClass("onepress-menu-mobile")) {
        var newViewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var offset = header.getBoundingClientRect();
        var top = offset.x + offset.height - 1;
        var h = newViewportHeight - top + 1;
        main_navigation.css({
          height: h,
          top: top
        });
      }
    });
  }
  function autoMenuAlign() {
    const ww = $(window).width();
    const isMobile = ww <= mobile_max_width;
    const header = $("#masthead > .container");
    const headerRect = header.length ? header[0].getBoundingClientRect() : {};
    $("#site-navigation  .onepress-menu > li").each(function () {
      const li = $(this);
      const sub = $("> .sub-menu", li);
      if (isMobile) {
        sub.removeAttr("style");
        return;
      }
      if (sub.length) {
        const liRect = li[0].getBoundingClientRect();
        const subRect = sub[0].getBoundingClientRect();
        if (headerRect.right < liRect.left + subRect.width) {
          li.addClass("sub-li-r");
          sub.addClass("sub-ul-r");
          const diff = headerRect.right - (liRect.left + liRect.width);
          sub.css("right", `-${diff}px`);
        }
      }
    });
  }
  autoMenuAlign();
  let timeOutResize = false;
  $(window).resize(function () {
    if (timeOutResize) {
      clearTimeout(timeOutResize);
    }
    timeOutResize = setTimeout(() => {
      if (main_navigation.hasClass("onepress-menu-mobile") && $(window).width() <= mobile_max_width) {
        if (!noSticky) {
          main_navigation.css({
            height: getNavHeight(),
            overflow: "auto"
          });
        }
      } else {
        main_navigation.removeAttr("style");
        main_navigation.removeClass("onepress-menu-mobile");
        jQuery("#nav-toggle").removeClass("nav-is-visible");
      }
      autoMenuAlign();
    }, 500);
  });
  jQuery(".onepress-menu li.menu-item-has-children, .onepress-menu li.page_item_has_children").each(function () {
    jQuery(this).prepend('<div class="nav-toggle-subarrow"><i class="fa fa-angle-down"></i></div>');
  });
  $document.on("click", ".nav-toggle-subarrow, .nav-toggle-subarrow .nav-toggle-subarrow", function () {
    const el = jQuery(this);
    const p = el.parent();
    p.removeAttr("style");
    p.toggleClass("nav-toggle-dropdown");
  });

  // Get the header height and wpadminbar height if enable.
  var h;
  window.current_nav_item = false;
  if (onepress_js_settings.onepress_disable_sticky_header != "1") {
    h = jQuery("#wpadminbar").height() + jQuery(".site-header").height();
  } else {
    h = jQuery("#wpadminbar").height();
  }

  /**
   *  Navigation click to section.
   *  @updated 2.3.0
   */
  jQuery('#site-navigation li a[href*="#"]').on("click", function (event) {
    let url = new URL(this.href);
    if (url.origin + url.pathname === window.location.origin + window.location.pathname) {
      let $el = jQuery(this.hash);
      // if in mobile mod.
      if (jQuery(".onepress-menu").hasClass("onepress-menu-mobile")) {
        jQuery("#nav-toggle").trigger("click");
      }
      if ($el.length) {
        event.preventDefault();
        window.history.pushState({}, null, url.href);
        smoothScroll($el);
      }
    }
  });
  function setNavActive(currentNode) {
    if (currentNode) {
      currentNode = currentNode.replace("#", "");
      if (currentNode) jQuery("#site-navigation li").removeClass("onepress-current-item");
      if (currentNode) {
        jQuery("#site-navigation li").find('a[href$="#' + currentNode + '"]').parent().addClass("onepress-current-item");
      }
    }
  }
  function inViewPort($element, offset_top) {
    if (!offset_top) {
      offset_top = 0;
    }
    var view_port_top = jQuery(window).scrollTop();
    if ($("#wpadminbar").length > 0) {
      view_port_top -= $("#wpadminbar").outerHeight() - 1;
      offset_top += $("#wpadminbar").outerHeight() - 1;
    }
    var view_port_h = $("body").outerHeight();
    var el_top = $element.offset().top;
    var eh_h = $element.height();
    var el_bot = el_top + eh_h;
    var view_port_bot = view_port_top + view_port_h;
    var all_height = $("body")[0].scrollHeight;
    var max_top = all_height - view_port_h;
    var in_view_port = false;
    // If scroll maximum
    if (view_port_top >= max_top) {
      if (el_top < view_port_top && el_top > view_port_bot || el_top > view_port_top && el_bot < view_port_top) {
        in_view_port = true;
      }
    } else {
      if (el_top <= view_port_top + offset_top) {
        //if ( eh_bot > view_port_top &&  eh_bot < view_port_bot ) {
        if (el_bot > view_port_top) {
          in_view_port = true;
        }
      }
    }
    return in_view_port;
  }

  // Add active class to menu when scroll to active section.
  var _scroll_top = $window.scrollTop();
  jQuery(window).scroll(function () {
    var currentNode = null;
    if (!window.current_nav_item) {
      var current_top = $window.scrollTop();
      var adminBarHeight = jQuery("#wpadminbar").length > 0 ? jQuery("#wpadminbar").height() : 0;
      if (onepress_js_settings.onepress_disable_sticky_header != "1") {
        h = adminBarHeight + jQuery(".site-header").height();
      } else {
        h = adminBarHeight;
      }
      if (_scroll_top < current_top) {
        jQuery("section").each(function (index) {
          var section = jQuery(this);
          var currentId = section.attr("id") || "";
          var in_vp = inViewPort(section, h + 10);
          if (in_vp) {
            currentNode = currentId;
          }
        });
      } else {
        var ns = jQuery("section").length;
        for (var i = ns - 1; i >= 0; i--) {
          var section = jQuery("section").eq(i);
          var currentId = section.attr("id") || "";
          var in_vp = inViewPort(section, h + 10);
          if (in_vp) {
            currentNode = currentId;
          }
        }
      }
      _scroll_top = current_top;
    } else {
      currentNode = window.current_nav_item.replace("#", "");
    }
    setNavActive(currentNode);
  });

  // Move to the right section on page load.
  jQuery(window).on("load", function () {
    var urlCurrent = location.hash;
    if (jQuery(urlCurrent).length > 0) {
      smoothScroll(urlCurrent);
    }
  });

  // Other scroll to elements
  jQuery('.hero-slideshow-wrapper a[href*="#"]:not([href="#"]), .parallax-content a[href*="#"]:not([href="#"]), .back-to-top').on("click", function (event) {
    event.preventDefault();
    smoothScroll(jQuery(this.hash));
  });

  // Smooth scroll animation
  function smoothScroll(element) {
    if (element.length <= 0) {
      return false;
    }
    jQuery("html, body").animate({
      scrollTop: jQuery(element).offset().top - h + "px"
    }, {
      duration: 800,
      easing: "swing",
      complete: function () {
        window.current_nav_item = false;
      }
    });
  }
  if (onepress_js_settings.is_home) {
    // custom-logo-link
    jQuery(".site-branding .site-brand-inner").on("click", function (e) {
      e.preventDefault();
      jQuery("html, body").animate({
        scrollTop: "0px"
      }, {
        duration: 300,
        easing: "swing"
      });
    });
  }
  if (onepressIsMobile.any()) {
    jQuery("body").addClass("body-mobile").removeClass("body-desktop");
  } else {
    jQuery("body").addClass("body-desktop").removeClass("body-mobile");
  }

  // console.log( 'WOW____WOW', WOW );

  /**
   * Reveal Animations When Scrolling
   */
  if (onepress_js_settings.onepress_disable_animation != "1") {
    var wow = new (wow_js__WEBPACK_IMPORTED_MODULE_0___default())({
      offset: 50,
      mobile: false,
      live: false
    });
    wow.init();
  }
  var text_rotator = function () {
    /**
     * Text rotator
     */
    jQuery(".js-rotating").Morphext({
      // The [in] animation type. Refer to Animate.css for a list of available animations.
      animation: onepress_js_settings.hero_animation,
      // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
      separator: "|",
      // The delay between the changing of each phrase in milliseconds.
      speed: parseInt(onepress_js_settings.hero_speed),
      complete: function () {
        // Called after the entrance animation is executed.
      }
    });
  };
  text_rotator();
  $document.on("header_view_changed", function () {
    text_rotator();
  });

  /**
   * Responsive Videos
   */
  jQuery(".site-content").fitVids({
    ignore: ".wp-block-embed iframe, .wp-block-embed object"
  });

  /**
   * Video lightbox
   */

  if ($.fn.lightGallery) {
    $(".videolightbox-popup").lightGallery({});
  }

  // Counter Up
  $(".counter").counterUp({
    delay: 10,
    time: 1000
  });

  /**
   * Center vertical align for navigation.
   */
  if (onepress_js_settings.onepress_vertical_align_menu == "1") {
    var header_height = jQuery(".site-header").height();
    jQuery(".site-header .onepress-menu").css("line-height", header_height + "px");
  }

  /**
   * Section: Hero Full Screen Slideshow
   */
  function hero_full_screen(no_trigger) {
    if ($(".hero-slideshow-fullscreen").length > 0) {
      var wh = $window.height();
      var top = getAdminBarHeight();
      var $header = jQuery("#masthead");
      var is_transparent = $header.hasClass("is-t");
      var headerH;
      if (is_transparent) {
        headerH = 0;
      } else {
        headerH = $header.height();
      }
      headerH += top;
      jQuery(".hero-slideshow-fullscreen").css("height", wh - headerH + 1 + "px");
      if (typeof no_trigger === "undefined" || !no_trigger) {
        $document.trigger("hero_ready");
      }
    }
  }
  $window.on("resize", function () {
    hero_full_screen();
  });
  hero_full_screen();
  $document.on("header_view_changed", function () {
    hero_full_screen();
  });
  $document.on("hero_ready", function () {
    hero_full_screen(true);
  });

  /**
   * Hero sliders
   */
  var heroSliders = function () {
    if ($("#parallax-hero").length <= 0) {
      jQuery(".hero-slideshow-wrapper").each(function () {
        var hero = $(this);
        if (hero.hasClass("video-hero")) {
          return;
        }
        var images = hero.data("images") || false;
        if (typeof images == "string") {
          images = JSON.parse(images);
        }
        if (images) {
          preload_images(images, function () {
            hero.backstretch(images, {
              fade: _to_number(onepress_js_settings.hero_fade),
              duration: _to_number(onepress_js_settings.hero_duration)
            });
            //
            hero.addClass("loaded");
            hero.removeClass("loading");
            setTimeout(function () {
              hero.find(".slider-spinner").remove();
            }, 600);
          });
        } else {
          hero.addClass("loaded");
          hero.removeClass("loading");
          hero.find(".slider-spinner").remove();
        }
      });
    }
  };
  heroSliders();
  $document.on("header_view_changed", function () {
    heroSliders();
  });

  // Parallax hero
  $(".parallax-hero").each(function () {
    var hero = $(this);
    hero.addClass("loading");
    var bg = true;
    if (hero.find("img").length > 0) {
      bg = false;
    }
    $(".parallax-bg", hero).imagesLoaded({
      background: bg
    }, function () {
      hero.find(".hero-slideshow-wrapper").addClass("loaded");
      hero.removeClass("loading");
      setTimeout(function () {
        hero.find(".hero-slideshow-wrapper").find(".slider-spinner").remove();
      }, 600);
    }).fail(function (instance) {
      hero.removeClass("loading");
      hero.find(".hero-slideshow-wrapper").addClass("loaded");
      hero.find(".hero-slideshow-wrapper").find(".slider-spinner").remove();
    });
  });
  $(".section-parallax").each(function () {
    var hero = $(this);
    var bg = true;
    if (hero.find("img").length > 0) {
      bg = false;
    }
    $(".parallax-bg", hero).imagesLoaded({
      background: bg
    }, function () {}).fail(function (instance) {});
  });

  // Trigger when site load
  setTimeout(function () {
    $(window).trigger("scroll");
  }, 500);

  /**
   * Gallery
   */
  function onepress_gallery_init($context) {
    // justified
    if ($.fn.justifiedGallery) {
      $(".gallery-justified", $context).imagesLoaded(function () {
        $(".gallery-justified", $context).each(function () {
          var margin = $(this).attr("data-spacing") || 20;
          var row_height = $(this).attr("data-row-height") || 120;
          margin = _to_number(margin);
          row_height = _to_number(row_height);
          $(this).justifiedGallery({
            rowHeight: row_height,
            margins: margin,
            selector: "a, div:not(.spinner), .inner"
          });
        });
      });
    }
    var is_rtl = onepress_js_settings.is_rtl;

    // Slider
    if ($.fn.owlCarousel) {
      $(".gallery-slider", $context).owlCarousel({
        items: 1,
        itemsCustom: false,
        itemsDesktop: 1,
        itemsDesktopSmall: 1,
        itemsTablet: 1,
        itemsTabletSmall: false,
        itemsMobile: 1,
        singleItem: true,
        itemsScaleUp: false,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1000,
        autoPlay: 4000,
        stopOnHover: true,
        nav: true,
        navText: ["<i class='lg-icon'></i>", "<i class='lg-icon'></i>"],
        autoHeight: true,
        rtl: is_rtl == 0 ? false : true,
        dots: false
      });
      $(".gallery-carousel", $context).each(function () {
        var n = $(this).attr("data-col") || 5;
        n = _to_number(n);
        if (n <= 0) {
          n = 5;
        }
        $(this).owlCarousel({
          items: n,
          responsive: {
            0: {
              items: 2
            },
            768: {
              items: n > 2 ? 2 : n
            },
            979: {
              items: n > 3 ? 3 : n
            },
            1199: {
              items: n
            }
          },
          rtl: is_rtl == 0 ? false : true,
          navSpeed: 800,
          autoplaySpeed: 4000,
          autoplayHoverPause: true,
          nav: true,
          navText: ["<i class='lg-icon'></i>", "<i class='lg-icon'></i>"],
          dots: false
        });
      });
    }
    function isotope_init() {
      if ($.fn.isotope) {
        $(".gallery-masonry", $context).each(function () {
          var m = $(this);
          var gutter = m.attr("data-gutter") || 10;
          var columns = m.attr("data-col") || 5;
          gutter = _to_number(gutter);
          columns = _to_number(columns);
          var w = $(window).width();
          if (w <= 940) {
            columns = columns > 2 ? columns - 1 : columns;
          }
          if (w <= 720) {
            columns = columns > 3 ? 3 : columns;
          }
          if (w <= 576) {
            columns = columns > 2 ? 2 : columns;
          }

          //gutter = gutter / 2;
          // m.parent().css({'margin-left': -gutter, 'margin-right': -gutter});
          m.find(".g-item").css({
            width: 100 / columns + "%",
            float: "left",
            padding: 0
          });
          // m.find('.g-item .inner').css({'padding': gutter / 2});
          m.isotope({
            // options
            itemSelector: ".g-item",
            percentPosition: true,
            masonry: {
              columnWidth: ".inner"
            }
          });
        });
      }
    }
    $(".gallery-masonry", $context).imagesLoaded(function () {
      isotope_init();
    });
    $(window).resize(function () {
      isotope_init();
    });
    if ($.fn.lightGallery) {
      var wrap_tag = $(".enable-lightbox", $context).find(".g-item").first();
      var tag_selector = "a";
      if (wrap_tag.is("div")) {
        tag_selector = "div";
      }
      $(".enable-lightbox", $context).lightGallery({
        mode: "lg-fade",
        selector: tag_selector
        //cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)'
      });
    }
  }
  onepress_gallery_init($(".gallery-content"));
  if ($.fn.jarallax) {
    jQuery(".jarallax").each(function () {
      var $this = jQuery(this);
      var speed = $this.attr("data-speed") || 0.5;
      var speed = parseFloat(speed);
      if (speed > 0) {
        $this.jarallax({
          speed: speed
        });
      }
    });
  }
  if ("undefined" !== typeof wp && wp.customize && wp.customize.selectiveRefresh) {
    wp.customize.selectiveRefresh.bind("partial-content-rendered", function (placement) {
      if (placement.partial.id == "section-gallery") {
        onepress_gallery_init(placement.container.find(".gallery-content"));

        // Trigger resize to make other sections work.
        $(window).resize();
      }
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=theme.js.map