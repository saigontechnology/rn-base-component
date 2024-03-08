"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thumb = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _native = _interopRequireDefault(require("styled-components/native"));
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _metrics = require("../../../helpers/metrics");
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Thumb = _ref => {
  let {
    text,
    bgColorLabelView,
    labelStyle,
    alwaysShowValue,
    thumbSize,
    thumbComponent,
    animatedProps,
    thumbStyle,
    animatedThumbStyle,
    opacityStyle,
    onGestureEvent
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, {
    onGestureEvent: onGestureEvent
  }, /*#__PURE__*/_react.default.createElement(ThumbContainer, {
    thumbSize: thumbSize,
    hasThumbComponent: !!thumbComponent,
    style: [thumbStyle, animatedThumbStyle]
  }, /*#__PURE__*/_react.default.createElement(LabelContainer, {
    background: bgColorLabelView,
    style: !alwaysShowValue && opacityStyle,
    thumbSize: thumbSize
  }, /*#__PURE__*/_react.default.createElement(TriangleDown, null), /*#__PURE__*/_react.default.createElement(Label, {
    animatedProps,
    style: labelStyle,
    editable: false,
    defaultValue: text
  })), thumbComponent));
};
exports.Thumb = Thumb;
const ThumbContainer = (0, _native.default)(_reactNativeReanimated.default.View)(props => {
  var _props$theme;
  return {
    position: 'absolute',
    height: props.thumbSize.height,
    width: props.thumbSize.width,
    borderRadius: (_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.borderWidths.huge,
    borderWidth: props.hasThumbComponent ? 0 : 1,
    // backgroundColor: props.hasThumbComponent ? 'transparent' : props.theme?.colors.backgroundColor,
    backgroundColor: 'transparent'
  };
});
const TriangleDown = _native.default.View(_ref2 => {
  let {
    background,
    theme
  } = _ref2;
  return {
    position: 'absolute',
    bottom: -5,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: background || (theme === null || theme === void 0 ? void 0 : theme.colors.primary),
    transform: [{
      rotate: '180deg'
    }]
  };
});
const LabelContainer = (0, _native.default)(_reactNativeReanimated.default.View)(props => {
  var _props$theme2, _props$theme3, _props$theme4, _props$theme5;
  return {
    position: 'absolute',
    top: -(0, _metrics.responsiveHeight)(((_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.spacing) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.titanic) || 0),
    bottom: props.thumbSize.height + _metrics.metrics.xxs,
    borderRadius: (_props$theme3 = props.theme) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.borderWidths.compact,
    backgroundColor: props.background || ((_props$theme4 = props.theme) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.colors.primary),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: !_metrics.isIOS ? -((0, _metrics.responsiveHeight)(((_props$theme5 = props.theme) === null || _props$theme5 === void 0 ? void 0 : _props$theme5.spacing.tiny) || 0) || 0) : 0
  };
});
const Label = (0, _native.default)(_reactNativeReanimated.default.createAnimatedComponent(_reactNative.TextInput))(_ref3 => {
  let {
    theme
  } = _ref3;
  return {
    color: theme.colors.white,
    padding: (0, _metrics.responsiveHeight)(_metrics.isIOS ? theme.borderWidths.small : theme.spacing.tiny),
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.sm,
    width: '100%'
  };
});
//# sourceMappingURL=Thumb.js.map