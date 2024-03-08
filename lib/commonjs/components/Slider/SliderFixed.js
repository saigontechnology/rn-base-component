"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _metrics = require("../../helpers/metrics");
var _components = require("./components");
var _native = _interopRequireDefault(require("styled-components/native"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _constants = require("./constants");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _hooks = require("../../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SliderFixed = _ref => {
  let {
    minimumValue = _constants.DEFAULT_MINIMUM_VALUE,
    maximumValue = _constants.DEFAULT_MAXIMUM_VALUE,
    step = _constants.DEFAULT_STEP,
    style,
    trackStyle,
    trackedStyle,
    thumbStyle,
    bgColorLabelView,
    alwaysShowValue,
    labelStyle,
    thumbComponent,
    showTrackPoint,
    tapToSeek,
    hitSlopPoint = _metrics.hitSlop,
    sliderWidth,
    thumbSize = {
      width: _metrics.metrics.medium,
      height: _metrics.metrics.medium
    },
    trackPointStyle,
    onValueChange = () => null
  } = _ref;
  const theme = (0, _hooks.useTheme)();
  const sliderInfo = (0, _reactNativeReanimated.useSharedValue)({
    range: _constants.INIT_VALUE,
    trackWidth: _constants.INIT_VALUE
  });
  const sliderValue = (0, _reactNativeReanimated.useSharedValue)(_constants.INIT_POINT);
  const progress = (0, _reactNativeReanimated.useSharedValue)(_constants.INIT_VALUE);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(_constants.INIT_VALUE);
  const totalPoint = (0, _react.useMemo)(() => (maximumValue - minimumValue) / step, [maximumValue, minimumValue, step]);

  /**
   * This function updates the slider with the new position (progressing) and new point
   * @param {number} progressing - The current position of the thumb on the track
   * @param {number} value - The value of the slider
   */
  const updateSlider = (0, _react.useCallback)((progressing, value) => {
    progress.value = progressing;
    sliderValue.value = value;
  }, [sliderValue, progress]);
  const handler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, ctx) => {
      ctx.startX = progress.value;
    },
    onActive: (event, ctx) => {
      const {
        trackWidth,
        range
      } = sliderInfo.value;
      const progressing = ctx.startX + event.translationX;
      // Calculate the ratio of the current thumb position with respect to the entire range of the slider
      const progressRatio = progressing / range;
      opacity.value = _constants.VISIBLE;

      // When sliding the thumb across a distance shorter than the track's width
      if (progressing < _constants.MINIMUM_TRACK_WIDTH) {
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(_constants.MINIMUM_TRACK_WIDTH, _constants.INIT_POINT);
      }
      // When sliding the thumb over the track's width
      else if (progressing > trackWidth) {
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(trackWidth, totalPoint);
      }
      // When sliding steadily increases
      else if (progressing > range * (sliderValue.value + _constants.NEXT_STEP)) {
        const currentProgress = range * Math.floor(progressRatio);
        const point = Math.floor(progressRatio);
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(currentProgress, point);
      }
      // When sliding steadily decreases
      else if (progressing < range * (sliderValue.value - _constants.PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(progressRatio);
        const point = Math.ceil(progressRatio);
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(currentProgress, point);
      }
    },
    onEnd: () => {
      opacity.value = _constants.INVISIBLE;
      (0, _reactNativeReanimated.runOnJS)(onValueChange)(minimumValue + sliderValue.value * step);
    }
  });

  /**
   * Update the tracked width based on the thumb sliding
   */
  const animatedTrackStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    width: progress.value
  }));

  /**
   * Add animation to the thumb while it's sliding
   */
  const animatedThumbStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateX: (0, _reactNativeReanimated.withTiming)(progress.value, {
        duration: 1
      })
    }]
  }));

  /**
   * Update opacity when touching the thumb
   * This animation should run within 200ms when the thumb is touched or released
   */
  const opacityStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: (0, _reactNativeReanimated.withTiming)(opacity.value, {
      duration: _constants.DURATION
    })
  }));

  /**
   * Display the current slider value in real time as the user slides the thumb along the slider track
   */
  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    text: `${minimumValue + sliderValue.value * step}`
  }));
  const getTrackWidth = event => {
    const {
      width
    } = event.nativeEvent.layout;
    // Range refers to the width of a point
    // It is used to calculate the correct position of the slider while sliding
    const range = width / totalPoint;
    sliderInfo.value = {
      range: range,
      trackWidth: width
    };
  };

  /**
   * Function called when the user presses on a point on the slider's track
   * Calculates the position of the pressed point on the slider's track and updates the slider's state accordingly
   * @param {number} point - The index of the point on the slider's track that was pressed by the user
   */
  const onPressPoint = (0, _react.useCallback)(point => {
    const positionPoint = sliderInfo.value.range * (point + _constants.FIRST_POINT);
    const curPoint = point + _constants.FIRST_POINT;
    const value = minimumValue + curPoint * step;
    updateSlider(positionPoint, curPoint);
    onValueChange(value);
  }, [minimumValue, onValueChange, sliderInfo.value.range, step, updateSlider]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(Container, {
    style: [!!sliderWidth && {
      width: sliderWidth
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_components.Track, {
    style: trackStyle,
    onLayout: getTrackWidth
  }), !!showTrackPoint && /*#__PURE__*/_react.default.createElement(_components.TrackPoint, {
    sliderWidth: sliderWidth,
    totalPoint: totalPoint,
    hitSlopPoint: hitSlopPoint,
    activeOpacity: tapToSeek ? 0 : 1,
    trackPointStyle: trackPointStyle,
    onPressPoint: point => tapToSeek && onPressPoint(point)
  }), /*#__PURE__*/_react.default.createElement(_components.Track, {
    style: _reactNative.StyleSheet.flatten([_reactNative.StyleSheet.absoluteFillObject, {
      backgroundColor: theme === null || theme === void 0 ? void 0 : theme.colors.primary
    }, trackedStyle, animatedTrackStyle])
  }), /*#__PURE__*/_react.default.createElement(_components.Thumb, {
    text: minimumValue === null || minimumValue === void 0 ? void 0 : minimumValue.toString(),
    bgColorLabelView: bgColorLabelView,
    labelStyle: labelStyle,
    alwaysShowValue: alwaysShowValue,
    thumbSize: thumbSize,
    thumbComponent: thumbComponent,
    animatedProps: animatedProps,
    thumbStyle: [thumbStyle, {
      left: -thumbSize.width / 2
    }],
    animatedThumbStyle: animatedThumbStyle,
    opacityStyle: opacityStyle,
    onGestureEvent: handler
  })));
};
const Container = _native.default.View({
  justifyContent: 'center'
});
var _default = exports.default = SliderFixed;
//# sourceMappingURL=SliderFixed.js.map