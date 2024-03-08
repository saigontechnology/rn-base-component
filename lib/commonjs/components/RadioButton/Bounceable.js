"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedPressable = _reactNativeReanimated.default.createAnimatedComponent(_reactNative.Pressable);
const BOUNCE_EFFECT_IN_DEFAULT = 0.93;
const BOUNCE_EFFECT_OUT_DEFAULT = 1;
const BOUNCE_VELOCITY_IN_DEFAULT = 0.1;
const BOUNCE_VELOCITY_OUT_DEFAULT = 0.4;
const BOUNCINESS_VALUE_DEFAULT = 80;
const SCALE_DEFAULT = 1;
const Bounceable = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
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
  const scale = (0, _reactNativeReanimated.useSharedValue)(SCALE_DEFAULT);
  const velocity = (0, _reactNativeReanimated.useSharedValue)(bounceVelocityIn);
  const bounciness = (0, _reactNativeReanimated.useSharedValue)(bouncinessValue);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      scale: (0, _reactNativeReanimated.withSpring)(scale.value, {
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
  return /*#__PURE__*/_react.default.createElement(AnimatedPressable, _extends({}, rest, {
    ref: ref,
    style: [animatedStyle, _reactNative.StyleSheet.flatten(style)],
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    onPress: onPress
  }), children);
});
Bounceable.displayName = 'Bounceable';
var _default = exports.default = /*#__PURE__*/_react.default.memo(Bounceable);
//# sourceMappingURL=Bounceable.js.map