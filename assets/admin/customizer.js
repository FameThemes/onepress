/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/array-move/index.js":
/*!******************************************!*\
  !*** ./node_modules/array-move/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseEach.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_castFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_castFunction.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_createBaseEach.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/clone.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/clone.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/each.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/each.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./forEach */ "./node_modules/lodash/forEach.js");


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/forEach.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/forEach.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isEmpty.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEmpty.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isEqual.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEqual.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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


/***/ }),

/***/ "./src/admin/customizer.scss":
/*!***********************************!*\
  !*** ./src/admin/customizer.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/customizer/TypographyControlApp.jsx":
/*!*******************************************************!*\
  !*** ./src/admin/customizer/TypographyControlApp.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./typography/FontPickerModal.jsx */ "./src/admin/customizer/typography/FontPickerModal.jsx");

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
  const w = weight === undefined || weight === null || weight === '' ? '' : String(weight);
  const fs = fontStyle === undefined || fontStyle === null || fontStyle === '' ? 'normal' : String(fontStyle);
  if (w === '700' && (fs === 'normal' || fs === '')) {
    return '700';
  }
  if (w === '700' && fs === 'italic') {
    return '700italic';
  }
  if (w === '' || w === '400') {
    if (fs === 'normal' || fs === 'regular') {
      return 'regular';
    }
    if (fs === 'italic') {
      return 'italic';
    }
    return fs;
  }
  const num = parseInt(w, 10);
  if (!Number.isNaN(num)) {
    if (fs === 'normal' || fs === '') {
      return String(num);
    }
    return String(num) + fs;
  }
  return 'regular';
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
function parseInitialState(rawValue, fields) {
  const base = {
    fontId: '',
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
    textTransform: '',
    color: ''
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
    textDecoration: fields.text_decoration ? css['text-decoration'] || '' : '',
    textTransform: fields.text_transform ? css['text-transform'] || '' : '',
    color: fields.color ? css.color || css['font-color'] || '' : ''
  };
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
  const preferred = ['default', 'google'];
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
  const s = styleVal || '';
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
function buildCssAndPreview(state, fields, webfonts, cssSelector, previewDevice) {
  const css = {};
  let fontId = '';
  let fontUrl = '';
  let styleToken = '';
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
  if (fields.text_decoration && state.textDecoration) {
    css['text-decoration'] = state.textDecoration;
  }
  if (fields.text_transform && state.textTransform) {
    css['text-transform'] = state.textTransform;
  }
  if (fields.color && state.color) {
    css.color = state.color;
  }
  if (fields.font_family && fields.font_style) {
    styleToken = state.styleSelect || '';
    const {
      weight,
      style
    } = parseStyleSelect(styleToken);
    css['font-style'] = style || 'normal';
    css['font-weight'] = weight === '' ? '' : weight;
  }
  if (fields.font_family) {
    fontId = state.fontId || '';
    if (fontId && webfonts[fontId]) {
      const font = webfonts[fontId];
      css['font-family'] = font.name;
      fontUrl = font.url || '';
    }
  }
  const device = previewDevice && PREVIEW_DEVICES.includes(previewDevice) ? previewDevice : 'desktop';
  const metrics = getEffectiveFontMetrics(state, device);
  const previewCss = {
    ...css
  };
  if (fields.font_size) {
    delete previewCss['font-size'];
    delete previewCss['font-size-tablet'];
    delete previewCss['font-size-mobile'];
    if (metrics.fontSize) {
      previewCss['font-size'] = metrics.fontSize;
    }
  }
  if (fields.line_height) {
    delete previewCss['line-height'];
    delete previewCss['line-height-tablet'];
    delete previewCss['line-height-mobile'];
    if (metrics.lineHeight) {
      previewCss['line-height'] = metrics.lineHeight;
    }
  }
  if (fields.letter_spacing) {
    delete previewCss['letter-spacing'];
    delete previewCss['letter-spacing-tablet'];
    delete previewCss['letter-spacing-mobile'];
    if (metrics.letterSpacing) {
      previewCss['letter-spacing'] = metrics.letterSpacing;
    }
  }
  return {
    css,
    preview: {
      font_id: fontId,
      style: styleToken,
      css_selector: cssSelector,
      css: previewCss,
      font_url: fontUrl
    }
  };
}
function applyPreview(settings) {
  const iframe = document.querySelector('#customize-preview iframe');
  const doc = iframe?.contentDocument;
  if (!doc || !settings.css_selector) {
    return;
  }
  if (settings.font_url) {
    const lid = `google-font-${settings.font_id}`;
    doc.getElementById(lid)?.remove();
    const link = doc.createElement('link');
    link.id = lid;
    link.rel = 'stylesheet';
    link.href = settings.font_url;
    link.type = 'text/css';
    doc.head.appendChild(link);
  }
  const nodes = doc.querySelectorAll(settings.css_selector);
  nodes.forEach(el => {
    el.removeAttribute('style');
    for (const [prop, val] of Object.entries(settings.css)) {
      if (val !== undefined && val !== null && val !== '') {
        el.style.setProperty(prop, String(val));
      }
    }
  });
}
function clamp255(n) {
  return Math.max(0, Math.min(255, Math.round(Number(n))));
}
function clamp01(n) {
  return Math.max(0, Math.min(1, Number(n)));
}
function toHex2(n) {
  return clamp255(n).toString(16).padStart(2, '0');
}

/**
 * Parse any CSS color string to RGBA (uses canvas; Customizer is always in a browser).
 *
 * @param {string} str
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function parseColorToRgba(str) {
  if (typeof str !== 'string' || !str.trim()) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  ctx.fillStyle = '#000000';
  ctx.fillStyle = str.trim();
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return {
    r: d[0],
    g: d[1],
    b: d[2],
    a: d[3] / 255
  };
}

/**
 * @param {{ r: number, g: number, b: number, a: number }} c
 * @returns {string}
 */
function formatColorCss(c) {
  const r = clamp255(c.r);
  const g = clamp255(c.g);
  const b = clamp255(c.b);
  const a = clamp01(c.a);
  if (a >= 0.999) {
    return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
  }
  const rounded = Math.round(a * 1000) / 1000;
  return `rgba(${r}, ${g}, ${b}, ${rounded})`;
}

/** Solid #rrggbb for native color input (no alpha). */
function getHexForColorInput(color) {
  const {
    r,
    g,
    b
  } = parseColorToRgba(typeof color === 'string' && color.trim() ? color : '#000000');
  return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
}
function renderResponsiveUnitField({
  label,
  fieldKey,
  previewDevice,
  onSelectDevice,
  state,
  patch,
  min
}) {
  const keys = RESPONSIVE_UNIT_KEYS[fieldKey][previewDevice] || RESPONSIVE_UNIT_KEYS[fieldKey].desktop;
  const value = state[keys.value];
  const unit = state[keys.unit];
  const deviceButtons = [{
    id: 'desktop',
    icon: 'dashicons-desktop',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Desktop preview', 'onepress')
  }, {
    id: 'tablet',
    icon: 'dashicons-tablet',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tablet preview', 'onepress')
  }, {
    id: 'mobile',
    icon: 'dashicons-smartphone',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mobile preview', 'onepress')
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group setting-group--unit"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group__head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group__devices",
    role: "group",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Customizer preview device', 'onepress')
  }, deviceButtons.map(d => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: d.id,
    type: "button",
    className: `setting-group__device-btn${previewDevice === d.id ? ' is-active' : ''}`,
    title: d.title,
    "aria-label": d.title,
    "aria-pressed": previewDevice === d.id,
    onClick: () => onSelectDevice(d.id)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `dashicons ${d.icon}`,
    "aria-hidden": true
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "unit-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    className: "input",
    min: min,
    step: "any",
    value: value,
    onChange: e => patch({
      [keys.value]: e.target.value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    className: "input",
    value: unit,
    onChange: e => patch({
      [keys.unit]: e.target.value
    })
  }, SIZE_UNITS.map(u => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: u,
    value: u
  }, u)))));
}
function renderSpanChoices({
  options,
  value,
  onChange
}) {
  const onKeyPick = (event, next) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(next);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "choice-row"
  }, options.map(opt => {
    const active = value === opt.value;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      key: opt.value || 'default',
      className: `choice-btn${active ? ' is-active' : ''}`,
      role: "button",
      tabIndex: 0,
      "aria-pressed": active,
      title: opt.label,
      onClick: () => onChange(opt.value),
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
  const params = control.params;
  const fields = params.fields;
  const labels = params.labels;
  const cssSelector = params.css_selector || '';
  const controlId = control.id;
  const settingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  settingRef.current = control.setting || control.settings?.default;
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => parseInitialState(params.value, fields));
  const [previewDevice, setPreviewDevice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('desktop');
  const [settingsOpen, setSettingsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [fontPickerOpen, setFontPickerOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const fontGroups = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => groupFonts(webfonts), [webfonts]);
  const selectedFont = state.fontId ? webfonts[state.fontId] : null;
  const styleOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => buildStyleOptions(state.fontId, webfonts, styleLabels, labels.option_default), [state.fontId, webfonts, styleLabels, labels.option_default]);
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
  const handleColorSwatchChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(e => {
    const hex = e.target.value;
    const prev = parseColorToRgba(state.color || '#000000');
    const {
      r,
      g,
      b
    } = parseColorToRgba(hex);
    patch({
      color: formatColorCss({
        r,
        g,
        b,
        a: prev.a
      })
    });
  }, [state.color, patch]);
  const handleColorAlphaChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(e => {
    const a = Number(e.target.value) / 100;
    const base = state.color && typeof state.color === 'string' && state.color.trim() ? state.color : '#000000';
    const {
      r,
      g,
      b
    } = parseColorToRgba(base);
    patch({
      color: formatColorCss({
        r,
        g,
        b,
        a
      })
    });
  }, [state.color, patch]);
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
    (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeAllPickerPreviewLinks)(controlId);
    setFontPickerOpen(false);
  }, [controlId]);
  const openFontPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeAllPickerPreviewLinks)(controlId);
    setFontPickerOpen(true);
  }, [controlId]);
  const selectFontFromPicker = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(fontId => {
    patch({
      fontId,
      styleSelect: ''
    });
    (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeAllPickerPreviewLinks)(controlId);
    setFontPickerOpen(false);
  }, [controlId, patch]);
  const clearSelectedFont = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    patch({
      fontId: '',
      styleSelect: ''
    });
    (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeAllPickerPreviewLinks)(controlId);
    (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeSelectedFontLink)(controlId);
    setFontPickerOpen(false);
  }, [controlId, patch]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (fontPickerOpen) {
      return;
    }
    const font = state.fontId ? webfonts[state.fontId] : null;
    if (font && font.font_type === 'google' && font.url) {
      (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.setSelectedGoogleFontLink)(controlId, state.fontId, font.url);
    } else {
      (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeSelectedFontLink)(controlId);
    }
  }, [fontPickerOpen, state.fontId, webfonts, controlId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    return () => {
      (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeAllPickerPreviewLinks)(controlId);
      (0,_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.removeSelectedFontLink)(controlId);
    };
  }, [controlId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const {
      css,
      preview
    } = buildCssAndPreview(state, fields, webfonts, cssSelector, previewDevice);
    const setting = settingRef.current;
    if (setting) {
      setting.set(JSON.stringify(css));
    }
    applyPreview(preview);
  }, [state, fields, webfonts, cssSelector, previewDevice]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!settingsOpen) {
      return undefined;
    }
    const onKey = e => {
      if (e.key === 'Escape') {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [settingsOpen]);
  const colorAlphaId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useId)();
  const colorRgba = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => parseColorToRgba(state.color && typeof state.color === 'string' && state.color.trim() ? state.color : '#000000'), [state.color]);
  const selectorSample = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The quick brown fox jumps over the lazy dog.', 'onepress');
  const selectorStack = selectedFont ? `"${selectedFont.name}", sans-serif` : 'inherit';
  const sizeBadge = state.fontSize !== '' ? `${state.fontSize}${state.fontSizeUnit}` : labels.option_default;
  const textDecorationChoices = [{
    value: '',
    label: labels.option_default,
    icon: 'D',
    iconClass: 'default'
  }, {
    value: 'none',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('None', 'onepress'),
    icon: 'N',
    iconClass: 'none'
  }, {
    value: 'overline',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Overline', 'onepress'),
    icon: 'O',
    iconClass: 'overline'
  }, {
    value: 'underline',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Underline', 'onepress'),
    icon: 'U',
    iconClass: 'underline'
  }, {
    value: 'line-through',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Line through', 'onepress'),
    icon: 'S',
    iconClass: 'line-through'
  }];
  const textTransformChoices = [{
    value: '',
    label: labels.option_default,
    icon: 'Aa',
    iconClass: 'default'
  }, {
    value: 'none',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('None', 'onepress'),
    icon: 'Aa',
    iconClass: 'none'
  }, {
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
    const {
      weight,
      style
    } = parseStyleSelect(state.styleSelect || '');
    summaryPreviewStyle.fontStyle = style || 'normal';
    summaryPreviewStyle.fontWeight = weight === '' ? '' : weight;
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
  if (fields.text_transform && state.textTransform) {
    summaryPreviewStyle.textTransform = state.textTransform;
  }
  if (fields.text_decoration && state.textDecoration) {
    summaryPreviewStyle.textDecoration = state.textDecoration;
  }
  if (fields.color && state.color) {
    summaryPreviewStyle.color = state.color;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "onepress-typo-summary-card",
    onClick: () => setSettingsOpen(true),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Open typography options', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-typo-summary-meta"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-typo-chip",
    style: {
      fontFamily: selectorStack
    }
  }, selectedFont ? selectedFont.name : labels.option_default), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-typo-chip"
  }, selectedStyleLabel), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-typo-chip"
  }, sizeBadge)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "onepress-typo-summary-preview",
    style: summaryPreviewStyle
  }, selectorSample)), settingsOpen && (0,react_dom__WEBPACK_IMPORTED_MODULE_3__.createPortal)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-typo-portal settings-backdrop",
    onMouseDown: e => {
      if (e.target === e.currentTarget) {
        setSettingsOpen(false);
      }
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Typography options', 'onepress')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Typography options', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "button-link",
    onClick: () => setSettingsOpen(false)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'onepress'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-body"
  }, fields.font_family && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, labels.family, ":"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "font-family-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "input font-family-value clickable",
    role: "button",
    tabIndex: 0,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Open font selector', 'onepress'),
    onClick: openFontPicker,
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFontPicker();
      }
    }
  }, selectedFont ? selectedFont.name : labels.option_default), selectedFont && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "font-family-clear",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove font and use theme default', 'onepress'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove font and use theme default', 'onepress'),
    onClick: e => {
      e.stopPropagation();
      clearSelectedFont();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-trash",
    "aria-hidden": true
  })))), fields.font_family && fields.font_style && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, labels.style), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    className: "input",
    value: state.styleSelect,
    onChange: e => patch({
      styleSelect: e.target.value
    })
  }, styleOptions.map((o, idx) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: `${idx}-${o.value}`,
    value: o.value
  }, o.label)))), fields.font_size && renderResponsiveUnitField({
    label: labels.size,
    fieldKey: 'font_size',
    previewDevice,
    onSelectDevice: selectPreviewDevice,
    state,
    patch,
    min: 0
  }), fields.line_height && renderResponsiveUnitField({
    label: labels.line_height,
    fieldKey: 'line_height',
    previewDevice,
    onSelectDevice: selectPreviewDevice,
    state,
    patch,
    min: 0
  }), fields.letter_spacing && renderResponsiveUnitField({
    label: labels.letter_spacing,
    fieldKey: 'letter_spacing',
    previewDevice,
    onSelectDevice: selectPreviewDevice,
    state,
    patch,
    min: -1000
  }), fields.text_decoration && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, labels.text_decoration), renderSpanChoices({
    options: textDecorationChoices,
    value: state.textDecoration,
    onChange: next => patch({
      textDecoration: next
    })
  })), fields.text_transform && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, labels.text_transform), renderSpanChoices({
    options: textTransformChoices,
    value: state.textTransform,
    onChange: next => patch({
      textTransform: next
    })
  })), fields.color && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "setting-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "customize-control-title"
  }, labels.color), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "color-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "color-swatch-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    className: "color-swatch",
    "aria-label": labels.color,
    value: getHexForColorInput(state.color),
    onChange: handleColorSwatchChange
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "input",
    value: state.color,
    placeholder: labels.option_default,
    onChange: e => patch({
      color: e.target.value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "color-alpha-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "color-alpha-label",
    htmlFor: colorAlphaId
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: colorAlphaId,
    type: "range",
    className: "color-alpha-range",
    min: 0,
    max: 100,
    value: Math.round(colorRgba.a * 100),
    onChange: handleColorAlphaChange,
    "aria-valuetext": `${Math.round(colorRgba.a * 100)}%`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "color-alpha-value"
  }, Math.round(colorRgba.a * 100), "%")))))), document.body), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_typography_FontPickerModal_jsx__WEBPACK_IMPORTED_MODULE_4__.FontPickerModal, {
    open: fontPickerOpen,
    controlId: controlId,
    webfonts: webfonts,
    fontGroups: fontGroups,
    currentFontId: state.fontId,
    defaultLabel: labels.option_default,
    onClose: closeFontPicker,
    onSelectFont: selectFontFromPicker
  }));
}

/***/ }),

/***/ "./src/admin/customizer/alpha-color-picker.js":
/*!****************************************************!*\
  !*** ./src/admin/customizer/alpha-color-picker.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/control-alpha-color.js":
/*!*****************************************************!*\
  !*** ./src/admin/customizer/control-alpha-color.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/control-bindings.js":
/*!**************************************************!*\
  !*** ./src/admin/customizer/control-bindings.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/control-repeatable.js":
/*!****************************************************!*\
  !*** ./src/admin/customizer/control-repeatable.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/icon-picker.js":
/*!*********************************************!*\
  !*** ./src/admin/customizer/icon-picker.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/icon-picker/IconPickerApp.jsx":
/*!************************************************************!*\
  !*** ./src/admin/customizer/icon-picker/IconPickerApp.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/icon-picker/injectFontLinks.js":
/*!*************************************************************!*\
  !*** ./src/admin/customizer/icon-picker/injectFontLinks.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/jquery-deparam.js":
/*!************************************************!*\
  !*** ./src/admin/customizer/jquery-deparam.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/modal-editor.js":
/*!**********************************************!*\
  !*** ./src/admin/customizer/modal-editor.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/plus-section.js":
/*!**********************************************!*\
  !*** ./src/admin/customizer/plus-section.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/RepeatableControlApp.jsx":
/*!******************************************************************!*\
  !*** ./src/admin/customizer/repeatable/RepeatableControlApp.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/RepeatableField.jsx":
/*!*************************************************************!*\
  !*** ./src/admin/customizer/repeatable/RepeatableField.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/RepeatableItem.jsx":
/*!************************************************************!*\
  !*** ./src/admin/customizer/repeatable/RepeatableItem.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/AlphaColorField.jsx":
/*!********************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/AlphaColorField.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/AlphaColorInput.jsx":
/*!********************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/AlphaColorInput.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/CheckboxField.jsx":
/*!******************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/CheckboxField.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/ColorField.jsx":
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/ColorField.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/ColorInput.jsx":
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/ColorInput.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/HiddenField.jsx":
/*!****************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/HiddenField.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/IconField.jsx":
/*!**************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/IconField.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/MediaField.jsx":
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/MediaField.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/RadioField.jsx":
/*!***************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/RadioField.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/SelectField.jsx":
/*!****************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/SelectField.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/TextField.jsx":
/*!**************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/TextField.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/TextareaField.jsx":
/*!******************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/TextareaField.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/fields/fieldRegistry.js":
/*!*****************************************************************!*\
  !*** ./src/admin/customizer/repeatable/fields/fieldRegistry.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/repeatable-logic.js":
/*!*************************************************************!*\
  !*** ./src/admin/customizer/repeatable/repeatable-logic.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/repeatable-media-bridge.js":
/*!********************************************************************!*\
  !*** ./src/admin/customizer/repeatable/repeatable-media-bridge.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/repeatable/repeatable-values.js":
/*!**************************************************************!*\
  !*** ./src/admin/customizer/repeatable/repeatable-values.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/admin/customizer/typography-controls.js":
/*!*****************************************************!*\
  !*** ./src/admin/customizer/typography-controls.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _TypographyControlApp_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TypographyControlApp.jsx */ "./src/admin/customizer/TypographyControlApp.jsx");
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

/***/ }),

/***/ "./src/admin/customizer/typography/FontPickerModal.jsx":
/*!*************************************************************!*\
  !*** ./src/admin/customizer/typography/FontPickerModal.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FontPickerModal: () => (/* binding */ FontPickerModal),
/* harmony export */   pickerPreviewLinkId: () => (/* binding */ pickerPreviewLinkId),
/* harmony export */   removeAllPickerPreviewLinks: () => (/* binding */ removeAllPickerPreviewLinks),
/* harmony export */   removeSelectedFontLink: () => (/* binding */ removeSelectedFontLink),
/* harmony export */   selectedFontLinkId: () => (/* binding */ selectedFontLinkId),
/* harmony export */   setSelectedGoogleFontLink: () => (/* binding */ setSelectedGoogleFontLink)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);

/**
 * Font picker: modal list with lazy-loaded Google Font previews in the Customizer document.
 */



const PICKER_LINK_PREFIX = 'onepress-typo-picker-';

/** Google Fonts API `category` values (kebab-case). */
const GOOGLE_CATEGORY_KEYS = ['sans-serif', 'serif', 'monospace', 'display', 'handwriting'];
const SYSTEM_CATEGORY = 'system';

/**
 * @param {Array<{ type: string, fonts: Array<{ id: string, name: string }> }>} groups
 * @param {Record<string, object>} webfonts
 * @param {string} categoryKey  'all' | 'system' | GOOGLE_CATEGORY_KEYS
 */
function applyCategoryFilter(groups, webfonts, categoryKey) {
  if (!categoryKey || categoryKey === 'all') {
    return groups;
  }
  return groups.map(g => {
    if (categoryKey === SYSTEM_CATEGORY) {
      if (g.type !== 'default') {
        return {
          ...g,
          fonts: []
        };
      }
      return g;
    }
    if (g.type !== 'google') {
      return {
        ...g,
        fonts: []
      };
    }
    const cat = String(categoryKey).toLowerCase();
    return {
      ...g,
      fonts: g.fonts.filter(f => {
        const meta = webfonts[f.id];
        if (!meta || meta.font_type !== 'google') {
          return false;
        }
        return String(meta.category || '').toLowerCase() === cat;
      })
    };
  }).filter(g => g.fonts.length > 0);
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
  sampleText,
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
  const stack = fontMeta && fontMeta.font_type === 'default' ? `"${name}", sans-serif` : `"${name}", sans-serif`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    ref: rowRef,
    className: 'fontpicker-row' + (isSelected ? ' is-selected' : ''),
    onClick: () => onPick(fontId)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "fontpicker-row__name"
  }, name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "fontpicker-row__sample",
    style: {
      fontFamily: stack
    }
  }, sampleText));
}
function FontPickerModal({
  open,
  controlId,
  webfonts,
  fontGroups,
  currentFontId,
  defaultLabel,
  onClose,
  onSelectFont
}) {
  const panelRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const searchRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [scrollRoot, setScrollRoot] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [searchQuery, setSearchQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [categoryKey, setCategoryKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
  const sampleText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The quick brown fox jumps over the lazy dog.', 'onepress');
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categoryTabs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const tabs = [{
      key: 'all',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'onepress')
    }, {
      key: SYSTEM_CATEGORY,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('System', 'onepress')
    }];
    const labels = {
      'sans-serif': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sans-serif', 'onepress'),
      serif: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Serif', 'onepress'),
      monospace: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Monospace', 'onepress'),
      display: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Display', 'onepress'),
      handwriting: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Handwriting', 'onepress')
    };
    for (const k of GOOGLE_CATEGORY_KEYS) {
      tabs.push({
        key: k,
        label: labels[k] || k
      });
    }
    return tabs;
  }, []);
  const filteredGroups = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const afterCategory = applyCategoryFilter(fontGroups, webfonts, categoryKey);
    if (!normalizedQuery) {
      return afterCategory;
    }
    return afterCategory.map(g => ({
      ...g,
      fonts: g.fonts.filter(f => String(f.name).toLowerCase().includes(normalizedQuery))
    })).filter(g => g.fonts.length > 0);
  }, [fontGroups, webfonts, categoryKey, normalizedQuery]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (open) {
      setSearchQuery('');
      setCategoryKey('all');
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
      if (searchQuery.trim()) {
        setSearchQuery('');
        e.preventDefault();
        return;
      }
      if (categoryKey !== 'all') {
        setCategoryKey('all');
        e.preventDefault();
        return;
      }
      onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, searchQuery, categoryKey]);
  const handleBackdrop = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(e => {
    if (e.target === panelRef.current) {
      onClose();
    }
  }, [onClose]);
  if (!open) {
    return null;
  }
  return (0,react_dom__WEBPACK_IMPORTED_MODULE_3__.createPortal)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "onepress-typo-portal fontpicker-backdrop",
    ref: panelRef,
    onMouseDown: handleBackdrop,
    role: "presentation"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fontpicker-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font selector', 'onepress'),
    onMouseDown: e => e.stopPropagation()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fontpicker-head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "fontpicker-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font selector', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "fontpicker-close button-link",
    onClick: onClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'onepress'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fontpicker-search-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "screen-reader-text",
    htmlFor: `onepress-typo-font-search-${controlId}`
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search fonts', 'onepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: searchRef,
    id: `onepress-typo-font-search-${controlId}`,
    type: "search",
    className: "fontpicker-search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search fonts…', 'onepress'),
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: "false"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fontpicker-categories",
    role: "tablist",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font categories', 'onepress')
  }, categoryTabs.map(tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: tab.key,
    type: "button",
    role: "tab",
    "aria-selected": categoryKey === tab.key,
    className: 'fontpicker-cat' + (categoryKey === tab.key ? ' is-active' : ''),
    onClick: () => setCategoryKey(tab.key)
  }, tab.label))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fontpicker-scroll",
    ref: setScrollRoot
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: 'fontpicker-row fontpicker-row--default' + (!currentFontId ? ' is-selected' : ''),
    onClick: () => onSelectFont('')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "fontpicker-row__name"
  }, defaultLabel)), filteredGroups.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "fontpicker-empty",
    role: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No fonts found.', 'onepress')) : filteredGroups.map(g => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: g.type,
    className: "fontpicker-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fontpicker-group-label"
  }, g.type), g.fonts.map(f => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FontPickerRow, {
    key: f.id,
    controlId: controlId,
    fontId: f.id,
    name: f.name,
    fontMeta: webfonts[f.id],
    sampleText: sampleText,
    isSelected: currentFontId === f.id,
    onPick: onSelectFont,
    scrollRoot: scrollRoot
  }))))))), document.body);
}

/***/ }),

/***/ "./src/admin/customizer/wp-editor.js":
/*!*******************************************!*\
  !*** ./src/admin/customizer/wp-editor.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/frontend/fontawesome-v6/css/all.min.css":
/*!*****************************************************!*\
  !*** ./src/frontend/fontawesome-v6/css/all.min.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
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
/* harmony import */ var _customizer_icon_picker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customizer/icon-picker */ "./src/admin/customizer/icon-picker.js");
/* harmony import */ var _customizer_jquery_deparam__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customizer/jquery-deparam */ "./src/admin/customizer/jquery-deparam.js");
/* harmony import */ var _customizer_modal_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customizer/modal-editor */ "./src/admin/customizer/modal-editor.js");
/* harmony import */ var _customizer_plus_section__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customizer/plus-section */ "./src/admin/customizer/plus-section.js");
/* harmony import */ var _customizer_wp_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./customizer/wp-editor */ "./src/admin/customizer/wp-editor.js");
/* harmony import */ var _customizer_typography_controls_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./customizer/typography-controls.js */ "./src/admin/customizer/typography-controls.js");












const api = wp.customize;
const $ = jQuery;
(0,_customizer_plus_section__WEBPACK_IMPORTED_MODULE_9__.registerPlusSection)(api);
(0,_customizer_jquery_deparam__WEBPACK_IMPORTED_MODULE_7__.installDeparam)($);
(0,_customizer_alpha_color_picker__WEBPACK_IMPORTED_MODULE_2__.installAlphaColorPicker)($);
(0,_customizer_control_alpha_color__WEBPACK_IMPORTED_MODULE_3__.registerAlphaColorControl)(api, $);
(0,_customizer_control_repeatable__WEBPACK_IMPORTED_MODULE_5__.registerRepeatableControl)(api, $);
(0,_customizer_wp_editor__WEBPACK_IMPORTED_MODULE_10__.installWpEditor)($);
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