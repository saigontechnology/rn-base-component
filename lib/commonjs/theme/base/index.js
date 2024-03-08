"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typography = _interopRequireDefault(require("./typography"));
var _colors = _interopRequireDefault(require("./colors"));
var _borderWidths = _interopRequireDefault(require("./borderWidths"));
var _sizes = _interopRequireDefault(require("./sizes"));
var _spacing = _interopRequireDefault(require("./spacing"));
var _opacity = _interopRequireDefault(require("./opacity"));
var _shadows = _interopRequireDefault(require("./shadows"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const base = {
  colors: _colors.default,
  borderWidths: _borderWidths.default,
  sizes: _sizes.default,
  spacing: _spacing.default,
  opacity: _opacity.default,
  shadows: _shadows.default,
  ..._typography.default
};
var _default = exports.default = base;
//# sourceMappingURL=index.js.map