"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendTheme = extendTheme;
var _theme = require("./../theme");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

function isFunction(value) {
  return typeof value === 'function';
}
function extendTheme(overrides) {
  function customizer(source, override) {
    if (isFunction(source)) {
      return function () {
        const sourceValue = source(...arguments);
        const overrideValue = isFunction(override) ? override(...arguments) : override;
        return _lodash.default.mergeWith({}, sourceValue, overrideValue, customizer);
      };
    }
    return undefined;
  }
  for (var _len = arguments.length, restOverrides = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restOverrides[_key - 1] = arguments[_key];
  }
  const finalOverrides = [overrides, ...restOverrides].reduce((prevValue, currentValue) => _lodash.default.mergeWith({}, prevValue, currentValue, customizer), _theme.theme);
  return finalOverrides;
}
//# sourceMappingURL=extendTheme.js.map