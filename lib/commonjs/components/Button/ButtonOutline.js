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
const ButtonOutline = props => {
  const ButtonOutlineTheme = (0, _hooks.useTheme)().components.ButtonOutline;
  return /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
    outline: true
  }, ButtonOutlineTheme, props));
};
var _default = exports.default = ButtonOutline;
//# sourceMappingURL=ButtonOutline.js.map