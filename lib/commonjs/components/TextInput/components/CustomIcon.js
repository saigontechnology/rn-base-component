"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomIcon = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = _interopRequireDefault(require("styled-components/native"));
var _Icon = require("../../Icon/Icon");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CustomIcon = _ref => {
  let {
    source,
    size,
    color,
    resizeMode,
    iconContainerStyle,
    iconStyle,
    onPress
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(IconWrapper, {
    testID: "icon-container",
    style: iconContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    testID: "icon",
    source: source,
    size: size,
    color: color,
    resizeMode: resizeMode,
    style: iconStyle,
    onPress: onPress
  }));
};
exports.CustomIcon = CustomIcon;
const IconWrapper = _native.default.View(_ref2 => {
  var _theme$spacing;
  let {
    theme
  } = _ref2;
  return {
    marginHorizontal: theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.small
  };
});
//# sourceMappingURL=CustomIcon.js.map