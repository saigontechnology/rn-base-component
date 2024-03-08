"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = _interopRequireDefault(require("styled-components/native"));
var _reactNative = require("react-native");
var _hooks = require("../../hooks");
var _Text = require("../Text/Text");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Button = _ref => {
  let {
    textColor,
    backgroundColor,
    outline,
    outlineColor,
    outlineWidth,
    borderRadius,
    disabled,
    disabledColor,
    textProps,
    textStyle,
    style,
    leftIcon,
    rightIcon,
    children,
    ...props
  } = _ref;
  const ButtonTheme = (0, _hooks.useTheme)().components.Button;
  return /*#__PURE__*/_react.default.createElement(ButtonWrapper, _extends({
    activeOpacity: 0.8,
    backgroundColor: disabled ? disabledColor ?? ButtonTheme.disabledColor : backgroundColor ?? ButtonTheme.backgroundColor,
    outline: outline,
    outlineColor: outlineColor,
    outlineWidth: outlineWidth,
    borderRadius: borderRadius ?? ButtonTheme.borderRadius,
    disabled: disabled,
    style: [{
      minHeight: ButtonTheme.height
    }, _reactNative.StyleSheet.flatten(style)]
  }, props), !!leftIcon && leftIcon, typeof children === 'string' ? /*#__PURE__*/_react.default.createElement(Label, _extends({}, textProps, {
    style: textStyle,
    color: textColor ?? ButtonTheme.textColor
  }), children) : children, !!rightIcon && rightIcon);
};
const ButtonWrapper = _native.default.TouchableOpacity(_ref2 => {
  let {
    theme,
    backgroundColor,
    outline,
    outlineWidth,
    outlineColor,
    borderRadius,
    disabled
  } = _ref2;
  return {
    paddingVertical: theme === null || theme === void 0 ? void 0 : theme.spacing.small,
    flexDirection: 'row',
    paddingHorizontal: theme === null || theme === void 0 ? void 0 : theme.spacing.slim,
    borderRadius,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    ...(outline && {
      borderWidth: outlineWidth || 1,
      borderColor: disabled ? theme === null || theme === void 0 ? void 0 : theme.colors.gray : outlineColor || (theme === null || theme === void 0 ? void 0 : theme.colors.primaryBorder)
    })
  };
});
const Label = (0, _native.default)(_Text.Text)(_ref3 => {
  var _theme$fontWeights;
  let {
    theme,
    color
  } = _ref3;
  return {
    color,
    fontWeight: theme === null || theme === void 0 || (_theme$fontWeights = theme.fontWeights) === null || _theme$fontWeights === void 0 ? void 0 : _theme$fontWeights.bold
  };
});
var _default = exports.default = Button;
//# sourceMappingURL=Button.js.map