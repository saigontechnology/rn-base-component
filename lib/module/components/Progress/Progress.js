function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, forwardRef, useCallback, useState, memo } from 'react';
import { View as RNView } from 'react-native';
import styled from 'styled-components/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing, interpolate } from 'react-native-reanimated';
import { metrics, deviceWidth } from '../../helpers/metrics';
import { theme } from '../../theme';
const screenWidth = deviceWidth();
const MAX_VALUE = 100;
const Progress = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    width,
    value = 0,
    size = metrics.small,
    borderRadius = 0,
    filledTrackColor = theme.colors.primary,
    backgroundColor = theme.colors.gray,
    isIndeterminateProgress = false
  } = _ref;
  const [progressWidth, setProgressWidth] = useState(0);
  const translateX = useSharedValue(-screenWidth);
  const animation = useSharedValue(0);
  useEffect(() => {
    const progressValue = value >= MAX_VALUE ? MAX_VALUE : value;
    const newToTranslateX = -progressWidth + progressWidth * progressValue / MAX_VALUE;
    if (isIndeterminateProgress) {
      animation.value = withRepeat(withTiming(1, {
        duration: 2000,
        easing: Easing.linear
      }), -1);
    } else {
      translateX.value = withTiming(newToTranslateX, {
        duration: 500,
        easing: Easing.linear
      });
    }
  }, [animation, isIndeterminateProgress, progressWidth, translateX, value]);
  const onLayout = useCallback(event => {
    const {
      layout
    } = event.nativeEvent;
    setProgressWidth(layout.width);
  }, []);
  const progressStyle = useAnimatedStyle(() => {
    const translateXValue = isIndeterminateProgress ? interpolate(animation.value, [0, 1], [-progressWidth, 0.5 * progressWidth]) : translateX.value;
    const scaleXValue = isIndeterminateProgress ? interpolate(animation.value, [0, 0.5, 1], [0.0001, 1, 0.001]) : 1;
    return {
      transform: [{
        translateX: translateXValue
      }, {
        scaleX: scaleXValue
      }]
    };
  }, [progressWidth]);
  return /*#__PURE__*/React.createElement(ProgressWrapper, {
    ref: ref,
    size: size,
    testID: "progress-wrapper",
    onLayout: onLayout,
    backgroundColor,
    borderRadius,
    width
  }, /*#__PURE__*/React.createElement(Animated.View, {
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
export default /*#__PURE__*/memo(Progress);
const ForwardRefProgressWrapperComponent = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(RNView, _extends({}, props, {
  ref: ref
})));
const ProgressWrapper = styled(ForwardRefProgressWrapperComponent)(props => ({
  overflow: 'hidden',
  width: props.width,
  height: props.size,
  backgroundColor: props.backgroundColor,
  borderRadius: props.borderRadius
}));
//# sourceMappingURL=Progress.js.map