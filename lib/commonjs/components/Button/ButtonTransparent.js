"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../../hooks");
var _Button = _interopRequireDefault(require("./Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ButtonTransparent = props => {
  const ButtonTransparentTheme = (0, _hooks.useTheme)().components.ButtonTransparent;
  return /*#__PURE__*/_react.default.createElement(_Button.default, _extends({}, ButtonTransparentTheme, props));
};
var _default = exports.default = ButtonTransparent;
//# sourceMappingURL=ButtonTransparent.js.map