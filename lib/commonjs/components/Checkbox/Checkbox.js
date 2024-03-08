"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _native = _interopRequireDefault(require("styled-components/native"));
var _theme = require("../../theme");
var _constants = require("./constants");
var _hooks = require("../../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Checkbox = exports.Checkbox = /*#__PURE__*/(0, _react.forwardRef)((_ref, forwardedRef) => {
  let {
    style,
    iconStyle,
    iconComponent,
    iconImageStyle,
    fillColor,
    unfillColor,
    checkMarkColor,
    disableBuiltInState = false,
    isChecked,
    innerIconStyle,
    checkIconImageSource = _theme.Images.check,
    label,
    textComponent,
    labelStyle,
    textContainerStyle,
    disableText = false,
    disabled = false,
    disableOpacity = _constants.DISABLE_OPACITY,
    bounceEffectIn = _constants.BOUNCE_EFFECT_IN,
    bounceEffectOut = _constants.BOUNCE_EFFECT_OUT,
    onChange,
    ...rest
  } = _ref;
  const CheckboxTheme = (0, _hooks.useTheme)().components.Checkbox;
  const [checked, setChecked] = (0, _react.useState)(false);
  const bounceValue = (0, _reactNativeReanimated.useSharedValue)(_constants.DEFAULT_BOUNCE_EFFECT);
  (0, _react.useEffect)(() => {
    setChecked(isChecked ?? false);
  }, [isChecked]);
  const bounceInEffect = () => {
    bounceValue.value = (0, _reactNativeReanimated.withSpring)(bounceEffectIn);
  };
  const bounceOutEffect = () => {
    bounceValue.value = (0, _reactNativeReanimated.withSpring)(bounceEffectOut);
  };
  const syntheticBounceEffect = (0, _react.useCallback)(() => {
    bounceValue.value = (0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(bounceEffectIn), (0, _reactNativeReanimated.withSpring)(bounceEffectOut));
  }, [bounceValue, bounceEffectIn, bounceEffectOut]);
  const animatedIconContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      scale: (0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(bounceEffectIn), (0, _reactNativeReanimated.withSpring)(bounceEffectOut))
    }]
  }));
  const renderCheckIcon = () => {
    const checkStatus = disableBuiltInState ? isChecked : checked;
    return /*#__PURE__*/_react.default.createElement(IconContainerAnimated, _extends({
      testID: 'icon-container',
      disabled: disabled,
      disableOpacity: disableOpacity
    }, CheckboxTheme, {
      backgroundColor: checked ? fillColor ?? CheckboxTheme.fillColor : unfillColor ?? CheckboxTheme.unfillColor,
      style: [animatedIconContainerStyle, _reactNative.StyleSheet.flatten(iconStyle)]
    }), /*#__PURE__*/_react.default.createElement(InnerIconContainer, _extends({
      style: innerIconStyle
    }, CheckboxTheme), iconComponent || checkStatus && /*#__PURE__*/_react.default.createElement(StyledImage, {
      source: checkIconImageSource,
      style: iconImageStyle,
      tintColor: checkMarkColor ?? CheckboxTheme.checkMarkColor
    })));
  };
  const renderCheckboxLabel = () => !disableText && (textComponent || /*#__PURE__*/_react.default.createElement(TextContainer, {
    style: textContainerStyle,
    disabled: disabled,
    disableOpacity: disableOpacity
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "text",
    style: labelStyle
  }, label)));
  const onHandlePress = (0, _react.useCallback)(() => {
    if (!disableBuiltInState) {
      setChecked(prev => !prev);
    }
    syntheticBounceEffect();
    onChange === null || onChange === void 0 || onChange(!checked);
  }, [disableBuiltInState, checked, onChange, syntheticBounceEffect]);
  (0, _react.useImperativeHandle)(forwardedRef, () => ({
    onHandlePress
  }), [onHandlePress]);
  return /*#__PURE__*/_react.default.createElement(Container, _extends({
    testID: "container",
    style: style,
    disabled: disabled,
    onPressIn: bounceInEffect,
    onPressOut: bounceOutEffect,
    onPress: onHandlePress
  }, rest), renderCheckIcon(), renderCheckboxLabel());
});
Checkbox.displayName = 'Checkbox';
const Container = _native.default.Pressable({
  alignItems: 'center',
  flexDirection: 'row'
});
const StyledImage = _native.default.Image(props => {
  var _props$theme, _props$theme2;
  return {
    width: (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.sizes) === null || _props$theme === void 0 ? void 0 : _props$theme.petite,
    height: (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.sizes) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.petite
  };
});
const TextContainer = _native.default.View(props => {
  var _props$theme3;
  return {
    marginLeft: (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.sizes) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.petite,
    opacity: props.disabled ? props.disableOpacity : _constants.DEFAULT_OPACITY
  };
});
const IconContainer = _native.default.View(props => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.borderRadius || props.size,
  backgroundColor: props.backgroundColor,
  opacity: props.disabled ? props.disableOpacity : _constants.DEFAULT_OPACITY
}));
const IconContainerAnimated = _reactNativeReanimated.default.createAnimatedComponent(IconContainer);
const InnerIconContainer = _native.default.View(props => ({
  borderWidth: props.borderWidth,
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.borderRadius || props.size,
  borderColor: props === null || props === void 0 ? void 0 : props.borderColor
}));
//# sourceMappingURL=Checkbox.js.map