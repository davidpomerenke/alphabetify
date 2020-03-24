"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alphabetify = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var alphabetify = function alphabetify(text, alphabet) {
  var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';
  var pre = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var post = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../alphabets/build/".concat(lang, "/").concat(alphabet, ".json")));
  }).then(function (_ref) {
    var alphabet = _ref["default"];
    var wordGroupLength = Math.max(2, 2 * Math.floor((text.match(/\s/g) || []).length / alphabet.rules.length));
    var chunks = text.split(/(\s)/g).flatMap(function (token, i, arr) {
      return _toConsumableArray(i % wordGroupLength === 0 ? [arr.slice(i, i + wordGroupLength).join('')] : []);
    });
    var start = chunks.slice(0, Math.round(chunks.length * pre));
    var main = chunks.slice(Math.round(chunks.length * pre), Math.round(chunks.length * (1 - post))).map(function (chunk, i) {
      return alphabet.rules[Math.min(i, alphabet.rules.length - 1)].reduce(function (prev, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            original = _ref3[0],
            replacement = _ref3[1];

        return prev.replace(new RegExp(original, 'g'), replacement);
      }, chunk);
    });
    var end = chunks.slice(Math.round(chunks.length * (1 - post)), chunks.length).map(function (chunk, i) {
      return alphabet.rules[alphabet.rules.length - 1].reduce(function (prev, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            original = _ref5[0],
            replacement = _ref5[1];

        return prev.replace(new RegExp(original, 'g'), replacement);
      }, chunk);
    });
    return [].concat(_toConsumableArray(start), _toConsumableArray(main), _toConsumableArray(end)).join('');
  })["catch"](function (e) {
    throw new Error("The specified language ".concat(lang, " is not supported."));
  });
};

exports.alphabetify = alphabetify;