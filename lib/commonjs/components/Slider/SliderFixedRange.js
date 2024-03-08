"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = _interopRequireDefault(require("styled-components/native"));
var _components = require("./components");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = require("react-native-reanimated");
var _constants = require("./constants");
var _hooks = require("../../hooks");
var _metrics = require("../../helpers/metrics");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SliderFixedRange = _ref => {
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
    hitSlopPoint = _metrics.hitSlop,
    leftThumbComponent,
    rightThumbComponent,
    tapToSeek,
    showTrackPoint,
    sliderWidth,
    thumbSize,
    trackPointStyle,
    onValueChange = () => null
  } = _ref;
  const totalPoint = (0, _react.useMemo)(() => (maximumValue - minimumValue) / step, [maximumValue, minimumValue, step]);
  const range = (0, _react.useMemo)(() => sliderWidth / totalPoint, [sliderWidth, totalPoint]);
  const theme = (0, _hooks.useTheme)();
  const actualThumbSize = thumbSize || {
    width: theme.sizes.large,
    height: theme.sizes.large
  };
  const sliderValue = (0, _reactNativeReanimated.useSharedValue)({
    left: _constants.INIT_POINT,
    right: maximumValue
  });
  const leftProgress = (0, _reactNativeReanimated.useSharedValue)(_constants.INIT_VALUE);
  const rightProgress = (0, _reactNativeReanimated.useSharedValue)(sliderWidth);
  const leftAnimated = (0, _reactNativeReanimated.useSharedValue)({
    opacity: _constants.INIT_VALUE,
    zIndex: _constants.INIT_VALUE
  });
  const rightAnimated = (0, _reactNativeReanimated.useSharedValue)({
    opacity: _constants.INIT_VALUE,
    zIndex: _constants.INIT_VALUE
  });

  /**
   * This function updates the slider with the new position (progressing) and new point
   * @param {number} progressing - The current position of the thumb on the track
   * @param {number} value - The value of the slider
   * @param {string} position - The position indicates the left thumb or the right thumb
   */
  const updateSlider = (0, _react.useCallback)((progressing, value, position) => {
    const progress = position === 'left' ? leftProgress : rightProgress;
    progress.value = progressing;
    sliderValue.value = {
      ...sliderValue.value,
      [position]: value
    };
  }, [sliderValue, leftProgress, rightProgress]);
  const leftHandler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, ctx) => {
      ctx.startX = leftProgress.value;
    },
    onActive: (event, ctx) => {
      const {
        left,
        right
      } = sliderValue.value;
      const leftProgressing = ctx.startX + event.translationX;
      // Calculate the ratio of the current left thumb position with respect to the entire range of the slider
      const leftProgressRatio = leftProgressing / range;
      leftAnimated.value = {
        zIndex: _constants.VISIBLE,
        opacity: _constants.VISIBLE
      };
      rightAnimated.value = {
        zIndex: _constants.INVISIBLE,
        opacity: _constants.INVISIBLE
      };

      // When sliding the thumb across a distance shorter than the track's width
      if (leftProgressing < _constants.MINIMUM_TRACK_WIDTH) {
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(_constants.MINIMUM_TRACK_WIDTH, _constants.INIT_POINT, _constants.THUMB_POSITION.left);
      }
      // When sliding the thumb over the track's width
      else if (leftProgressing > rightProgress.value) {
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(rightProgress.value, right, _constants.THUMB_POSITION.left);
      }
      // When sliding steadily increases
      else if (leftProgressing > range * (left + _constants.NEXT_STEP)) {
        const currentProgress = range * Math.floor(leftProgressRatio);
        const point = Math.floor(leftProgressRatio);
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(currentProgress, point, _constants.THUMB_POSITION.left);
      }
      // When sliding steadily decreases
      else if (leftProgressing < range * (left - _constants.PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(leftProgressRatio);
        const point = Math.ceil(leftProgressRatio);
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(currentProgress, point, _constants.THUMB_POSITION.left);
      }
    },
    onEnd: () => {
      // This line sets the opacity of the left label animated
      leftAnimated.value = {
        ...leftAnimated.value,
        opacity: _constants.INVISIBLE
      };
      (0, _reactNativeReanimated.runOnJS)(onValueChange)({
        minimum: minimumValue + sliderValue.value.left * step,
        maximum: minimumValue + sliderValue.value.right * step
      });
    }
  });
  const rightHandler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, ctx) => {
      ctx.startX = rightProgress.value;
    },
    onActive: (event, ctx) => {
      const {
        left,
        right
      } = sliderValue.value;
      const rightProgressing = ctx.startX + event.translationX;
      // Calculate the ratio of the current right thumb position with respect to the entire range of the slider
      const rightProgressRatio = rightProgressing / range;
      leftAnimated.value = {
        zIndex: _constants.INVISIBLE,
        opacity: _constants.INVISIBLE
      };
      rightAnimated.value = {
        zIndex: _constants.VISIBLE,
        opacity: _constants.VISIBLE
      };

      // When sliding the thumb across a distance shorter than the track's width
      if (rightProgressing < leftProgress.value) {
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(leftProgress.value, left, _constants.THUMB_POSITION.right);
      }
      // When sliding the thumb over the track's width
      else if (rightProgressing > sliderWidth) {
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(sliderWidth, totalPoint, _constants.THUMB_POSITION.right);
      }
      // When sliding steadily increases
      else if (rightProgressing > range * (right + _constants.NEXT_STEP)) {
        const currentProgress = range * Math.floor(rightProgressRatio);
        const point = Math.floor(rightProgressRatio);
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(currentProgress, point, _constants.THUMB_POSITION.right);
      }
      // When sliding steadily decreases
      else if (rightProgressing < range * (right - _constants.PREVIOUS_STEP)) {
        const currentProgress = range * Math.ceil(rightProgressRatio);
        const point = Math.ceil(rightProgressRatio);
        (0, _reactNativeReanimated.runOnJS)(updateSlider)(currentProgress, point, _constants.THUMB_POSITION.right);
      }
    },
    onEnd: () => {
      // This line sets the opacity of the right label animated
      rightAnimated.value = {
        ...rightAnimated.value,
        opacity: _constants.INVISIBLE
      };
      (0, _reactNativeReanimated.runOnJS)(onValueChange)({
        minimum: minimumValue + sliderValue.value.left * step,
        maximum: minimumValue + sliderValue.value.right * step
      });
    }
  });
  const leftThumbRangeStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateX: (0, _reactNativeReanimated.withTiming)(leftProgress.value, {
        duration: 1
      })
    }],
    zIndex: leftAnimated.value.zIndex
  }));
  const rightThumbRangeStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateX: (0, _reactNativeReanimated.withTiming)(rightProgress.value - actualThumbSize.width / 2, {
        duration: 1
      })
    }],
    zIndex: rightAnimated.value.zIndex
  }));

  /**
   * Update opacity when touching the thumb
   * This animation should run within 200ms when the thumb is touched or released
   */
  const leftOpacityStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: (0, _reactNativeReanimated.withTiming)(leftAnimated.value.opacity, {
      duration: _constants.DURATION
    })
  }));
  const rightOpacityStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: (0, _reactNativeReanimated.withTiming)(rightAnimated.value.opacity, {
      duration: _constants.DURATION
    })
  }));

  /**
   * Display the current slider value in real time as the user slides the thumb along the slider track
   */
  const leftAnimatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    text: `${minimumValue + sliderValue.value.left * step}`
  }));
  const rightAnimatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    text: `${minimumValue + sliderValue.value.right * step}`
  }));

  /**
   * Update the tracked width based on the thumb sliding
   */
  const animatedTrackStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const width = rightProgress.value - leftProgress.value;
    const transform = [{
      translateX: (0, _reactNativeReanimated.withTiming)(leftProgress.value, {
        duration: 1
      })
    }];
    return {
      transform,
      width
    };
  });

  /**
   * Function called when the user presses on a point on the slider's track
   * Calculates the position of the pressed point on the slider's track and updates the slider's state accordingly
   * @param {number} point - The index of the point on the slider's track that was pressed by the user
   */
  const onPressPoint = (0, _react.useCallback)(point => {
    const {
      left,
      right
    } = sliderValue.value;
    const curPoint = point + _constants.FIRST_POINT;
    const isPointToLeft = point <= sliderValue.value.left;
    const getSliderValue = value => minimumValue + value * step;
    const value = {
      minimum: isPointToLeft ? getSliderValue(curPoint) : getSliderValue(left),
      maximum: isPointToLeft ? getSliderValue(right) : getSliderValue(curPoint)
    };
    updateSlider(range * curPoint, curPoint, isPointToLeft ? _constants.THUMB_POSITION.left : _constants.THUMB_POSITION.right);
    onValueChange(value);
  }, [sliderValue, minimumValue, step, updateSlider, range, onValueChange]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(Container, {
    width: sliderWidth,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_components.Track, {
    style: trackStyle
  }), !!showTrackPoint && /*#__PURE__*/_react.default.createElement(_components.TrackPoint, {
    sliderWidth: sliderWidth,
    totalPoint: totalPoint,
    hitSlopPoint: hitSlopPoint,
    trackPointStyle: trackPointStyle,
    activeOpacity: tapToSeek ? 0 : 1,
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
    thumbSize: actualThumbSize,
    thumbComponent: leftThumbComponent,
    animatedProps: leftAnimatedProps,
    thumbStyle: [thumbStyle, {
      left: -actualThumbSize.width / 2
    }],
    animatedThumbStyle: leftThumbRangeStyle,
    opacityStyle: leftOpacityStyle,
    onGestureEvent: leftHandler
  }), /*#__PURE__*/_react.default.createElement(_components.Thumb, {
    text: maximumValue === null || maximumValue === void 0 ? void 0 : maximumValue.toString(),
    bgColorLabelView: bgColorLabelView,
    labelStyle: labelStyle,
    alwaysShowValue: alwaysShowValue,
    thumbSize: actualThumbSize,
    thumbComponent: rightThumbComponent,
    animatedProps: rightAnimatedProps,
    thumbStyle: thumbStyle,
    animatedThumbStyle: rightThumbRangeStyle,
    opacityStyle: rightOpacityStyle,
    onGestureEvent: rightHandler
  })));
};
const Container = _native.default.View(props => ({
  justifyContent: 'center',
  width: props.width
}));
var _default = exports.default = SliderFixedRange;
//# sourceMappingURL=SliderFixedRange.js.map