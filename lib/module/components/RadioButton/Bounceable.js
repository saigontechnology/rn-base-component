function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const BOUNCE_EFFECT_IN_DEFAULT = 0.93;
const BOUNCE_EFFECT_OUT_DEFAULT = 1;
const BOUNCE_VELOCITY_IN_DEFAULT = 0.1;
const BOUNCE_VELOCITY_OUT_DEFAULT = 0.4;
const BOUNCINESS_VALUE_DEFAULT = 80;
const SCALE_DEFAULT = 1;
const Bounceable = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    bounceEffectIn = BOUNCE_EFFECT_IN_DEFAULT,
    bounceEffectOut = BOUNCE_EFFECT_OUT_DEFAULT,
    bounceVelocityIn = BOUNCE_VELOCITY_IN_DEFAULT,
    bounceVelocityOut = BOUNCE_VELOCITY_OUT_DEFAULT,
    bouncinessValue = BOUNCINESS_VALUE_DEFAULT,
    children,
    style,
    onPress,
    ...rest
  } = _ref;
  const scale = useSharedValue(SCALE_DEFAULT);
  const velocity = useSharedValue(bounceVelocityIn);
  const bounciness = useSharedValue(bouncinessValue);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: withSpring(scale.value, {
        stiffness: bounciness.value,
        velocity: velocity.value
      })
    }]
  }), [scale.value, bounciness.value, velocity.value]);
  const handlePressIn = () => {
    scale.value = bounceEffectIn;
    velocity.value = bounceVelocityIn;
  };
  const handlePressOut = () => {
    scale.value = bounceEffectOut;
    velocity.value = bounceVelocityOut;
  };
  return /*#__PURE__*/React.createElement(AnimatedPressable, _extends({}, rest, {
    ref: ref,
    style: [animatedStyle, StyleSheet.flatten(style)],
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    onPress: onPress
  }), children);
});
Bounceable.displayName = 'Bounceable';
export default /*#__PURE__*/React.memo(Bounceable);
//# sourceMappingURL=Bounceable.js.map