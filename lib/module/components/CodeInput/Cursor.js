import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
const Cursor = _ref => {
  let {
    style
  } = _ref;
  const animatedValue = useSharedValue(0);
  useEffect(() => {
    animatedValue.value = withRepeat(withSequence(withTiming(1), withTiming(0)), -1);
  }, [animatedValue]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedValue.value
  }), []);
  return /*#__PURE__*/React.createElement(Animated.Text, {
    style: [animatedStyle, style]
  }, "|");
};
export default Cursor;
//# sourceMappingURL=Cursor.js.map