import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { isIOS, metrics, responsiveHeight } from '../../../helpers/metrics';
import { TextInput } from 'react-native';
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
  return /*#__PURE__*/React.createElement(PanGestureHandler, {
    onGestureEvent: onGestureEvent
  }, /*#__PURE__*/React.createElement(ThumbContainer, {
    thumbSize: thumbSize,
    hasThumbComponent: !!thumbComponent,
    style: [thumbStyle, animatedThumbStyle]
  }, /*#__PURE__*/React.createElement(LabelContainer, {
    background: bgColorLabelView,
    style: !alwaysShowValue && opacityStyle,
    thumbSize: thumbSize
  }, /*#__PURE__*/React.createElement(TriangleDown, null), /*#__PURE__*/React.createElement(Label, {
    animatedProps,
    style: labelStyle,
    editable: false,
    defaultValue: text
  })), thumbComponent));
};
const ThumbContainer = styled(Animated.View)(props => {
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
const TriangleDown = styled.View(_ref2 => {
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
const LabelContainer = styled(Animated.View)(props => {
  var _props$theme2, _props$theme3, _props$theme4, _props$theme5;
  return {
    position: 'absolute',
    top: -responsiveHeight(((_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.spacing) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.titanic) || 0),
    bottom: props.thumbSize.height + metrics.xxs,
    borderRadius: (_props$theme3 = props.theme) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.borderWidths.compact,
    backgroundColor: props.background || ((_props$theme4 = props.theme) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.colors.primary),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: !isIOS ? -(responsiveHeight(((_props$theme5 = props.theme) === null || _props$theme5 === void 0 ? void 0 : _props$theme5.spacing.tiny) || 0) || 0) : 0
  };
});
const Label = styled(Animated.createAnimatedComponent(TextInput))(_ref3 => {
  let {
    theme
  } = _ref3;
  return {
    color: theme.colors.white,
    padding: responsiveHeight(isIOS ? theme.borderWidths.small : theme.spacing.tiny),
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.sm,
    width: '100%'
  };
});
export { Thumb };
//# sourceMappingURL=Thumb.js.map