"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = _interopRequireDefault(require("styled-components/native"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _metrics = require("../../helpers/metrics");
var _theme = require("../../theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const screenWidth = (0, _metrics.deviceWidth)();
const MAX_VALUE = 100;
const Progress = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    width,
    value = 0,
    size = _metrics.metrics.small,
    borderRadius = 0,
    filledTrackColor = _theme.theme.colors.primary,
    backgroundColor = _theme.theme.colors.gray,
    isIndeterminateProgress = false
  } = _ref;
  const [progressWidth, setProgressWidth] = (0, _react.useState)(0);
  const translateX = (0, _reactNativeReanimated.useSharedValue)(-screenWidth);
  const animation = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _react.useEffect)(() => {
    const progressValue = value >= MAX_VALUE ? MAX_VALUE : value;
    const newToTranslateX = -progressWidth + progressWidth * progressValue / MAX_VALUE;
    if (isIndeterminateProgress) {
      animation.value = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withTiming)(1, {
        duration: 2000,
        easing: _reactNativeReanimated.Easing.linear
      }), -1);
    } else {
      translateX.value = (0, _reactNativeReanimated.withTiming)(newToTranslateX, {
        duration: 500,
        easing: _reactNativeReanimated.Easing.linear
      });
    }
  }, [animation, isIndeterminateProgress, progressWidth, translateX, value]);
  const onLayout = (0, _react.useCallback)(event => {
    const {
      layout
    } = event.nativeEvent;
    setProgressWidth(layout.width);
  }, []);
  const progressStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const translateXValue = isIndeterminateProgress ? (0, _reactNativeReanimated.interpolate)(animation.value, [0, 1], [-progressWidth, 0.5 * progressWidth]) : translateX.value;
    const scaleXValue = isIndeterminateProgress ? (0, _reactNativeReanimated.interpolate)(animation.value, [0, 0.5, 1], [0.0001, 1, 0.001]) : 1;
    return {
      transform: [{
        translateX: translateXValue
      }, {
        scaleX: scaleXValue
      }]
    };
  }, [progressWidth]);
  return /*#__PURE__*/_react.default.createElement(ProgressWrapper, {
    ref: ref,
    size: size,
    testID: "progress-wrapper",
    onLayout: onLayout,
    backgroundColor,
    borderRadius,
    width
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    testID: "filled-track",
    style: [progressStyle, {
      backgroundColor: filledTrackColor,
      borderRadius,
      height: size,
      width: progressWidth
    }]
  }));
});
Progress.displayName = 'Progress';
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(Progress);
const ForwardRefProgressWrapperComponent = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, props, {
  ref: ref
})));
const ProgressWrapper = (0, _native.default)(ForwardRefProgressWrapperComponent)(props => ({
  overflow: 'hidden',
  width: props.width,
  height: props.size,
  backgroundColor: props.backgroundColor,
  borderRadius: props.borderRadius
}));
//# sourceMappingURL=Progress.js.map