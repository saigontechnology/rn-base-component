function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Images } from '../../theme';
import { BOUNCE_EFFECT_IN, BOUNCE_EFFECT_OUT, DISABLE_OPACITY, DEFAULT_OPACITY, DEFAULT_BOUNCE_EFFECT } from './constants';
import { useTheme } from '../../hooks';
export const Checkbox = /*#__PURE__*/forwardRef((_ref, forwardedRef) => {
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
    checkIconImageSource = Images.check,
    label,
    textComponent,
    labelStyle,
    textContainerStyle,
    disableText = false,
    disabled = false,
    disableOpacity = DISABLE_OPACITY,
    bounceEffectIn = BOUNCE_EFFECT_IN,
    bounceEffectOut = BOUNCE_EFFECT_OUT,
    onChange,
    ...rest
  } = _ref;
  const CheckboxTheme = useTheme().components.Checkbox;
  const [checked, setChecked] = useState(false);
  const bounceValue = useSharedValue(DEFAULT_BOUNCE_EFFECT);
  useEffect(() => {
    setChecked(isChecked ?? false);
  }, [isChecked]);
  const bounceInEffect = () => {
    bounceValue.value = withSpring(bounceEffectIn);
  };
  const bounceOutEffect = () => {
    bounceValue.value = withSpring(bounceEffectOut);
  };
  const syntheticBounceEffect = useCallback(() => {
    bounceValue.value = withSequence(withTiming(bounceEffectIn), withSpring(bounceEffectOut));
  }, [bounceValue, bounceEffectIn, bounceEffectOut]);
  const animatedIconContainerStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: withSequence(withTiming(bounceEffectIn), withSpring(bounceEffectOut))
    }]
  }));
  const renderCheckIcon = () => {
    const checkStatus = disableBuiltInState ? isChecked : checked;
    return /*#__PURE__*/React.createElement(IconContainerAnimated, _extends({
      testID: 'icon-container',
      disabled: disabled,
      disableOpacity: disableOpacity
    }, CheckboxTheme, {
      backgroundColor: checked ? fillColor ?? CheckboxTheme.fillColor : unfillColor ?? CheckboxTheme.unfillColor,
      style: [animatedIconContainerStyle, StyleSheet.flatten(iconStyle)]
    }), /*#__PURE__*/React.createElement(InnerIconContainer, _extends({
      style: innerIconStyle
    }, CheckboxTheme), iconComponent || checkStatus && /*#__PURE__*/React.createElement(StyledImage, {
      source: checkIconImageSource,
      style: iconImageStyle,
      tintColor: checkMarkColor ?? CheckboxTheme.checkMarkColor
    })));
  };
  const renderCheckboxLabel = () => !disableText && (textComponent || /*#__PURE__*/React.createElement(TextContainer, {
    style: textContainerStyle,
    disabled: disabled,
    disableOpacity: disableOpacity
  }, /*#__PURE__*/React.createElement(Text, {
    testID: "text",
    style: labelStyle
  }, label)));
  const onHandlePress = useCallback(() => {
    if (!disableBuiltInState) {
      setChecked(prev => !prev);
    }
    syntheticBounceEffect();
    onChange === null || onChange === void 0 || onChange(!checked);
  }, [disableBuiltInState, checked, onChange, syntheticBounceEffect]);
  useImperativeHandle(forwardedRef, () => ({
    onHandlePress
  }), [onHandlePress]);
  return /*#__PURE__*/React.createElement(Container, _extends({
    testID: "container",
    style: style,
    disabled: disabled,
    onPressIn: bounceInEffect,
    onPressOut: bounceOutEffect,
    onPress: onHandlePress
  }, rest), renderCheckIcon(), renderCheckboxLabel());
});
Checkbox.displayName = 'Checkbox';
const Container = styled.Pressable({
  alignItems: 'center',
  flexDirection: 'row'
});
const StyledImage = styled.Image(props => {
  var _props$theme, _props$theme2;
  return {
    width: (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.sizes) === null || _props$theme === void 0 ? void 0 : _props$theme.petite,
    height: (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.sizes) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.petite
  };
});
const TextContainer = styled.View(props => {
  var _props$theme3;
  return {
    marginLeft: (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.sizes) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.petite,
    opacity: props.disabled ? props.disableOpacity : DEFAULT_OPACITY
  };
});
const IconContainer = styled.View(props => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.borderRadius || props.size,
  backgroundColor: props.backgroundColor,
  opacity: props.disabled ? props.disableOpacity : DEFAULT_OPACITY
}));
const IconContainerAnimated = Animated.createAnimatedComponent(IconContainer);
const InnerIconContainer = styled.View(props => ({
  borderWidth: props.borderWidth,
  alignItems: 'center',
  justifyContent: 'center',
  width: props.size,
  height: props.size,
  borderRadius: props.borderRadius || props.size,
  borderColor: props === null || props === void 0 ? void 0 : props.borderColor
}));
//# sourceMappingURL=Checkbox.js.map