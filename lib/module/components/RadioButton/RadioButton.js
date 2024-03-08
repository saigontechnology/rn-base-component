function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { responsiveHeight, responsiveWidth } from '../../helpers';
import Bounceable from './Bounceable';
import { theme } from '../../theme';
const OUTER_SIZE_DEFAULT = 45;
const INNER_SIZE_DEFAULT = 25;
const OPACITY_DEFAULT = 0.5;
export const RadioButton = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    style,
    isRemainActive,
    innerContainerStyle,
    outerSize = OUTER_SIZE_DEFAULT,
    innerSize = INNER_SIZE_DEFAULT,
    ringColor = theme.colors.darkBlue,
    innerBackgroundColor = theme.colors.darkBlue,
    onPressButton,
    initial,
    textComponent,
    textContainerStyle,
    disable,
    disableOpacity = OPACITY_DEFAULT,
    textStyle,
    text,
    wrapperStyle,
    ...rest
  } = _ref;
  const [isActive, setIsActive] = useState(initial || false);
  const outer = useMemo(() => ({
    width: responsiveWidth(outerSize),
    height: responsiveHeight(outerSize),
    border: responsiveHeight(outerSize / 2)
  }), [outerSize]);
  const inner = useMemo(() => ({
    width: responsiveWidth(innerSize),
    height: responsiveHeight(innerSize),
    border: responsiveHeight(innerSize / 2)
  }), [innerSize]);
  const widthBounceableRef = useRef({
    value: outer.width
  }).current;
  const heightBounceableRef = useRef({
    value: outer.height
  }).current;
  const handlePress = () => {
    if (isRemainActive !== undefined && isRemainActive !== null) {
      onPressButton && onPressButton(isRemainActive);
    } else {
      setIsActive(!isActive);
      onPressButton && onPressButton(isActive);
    }
  };
  const renderLabelText = () => textComponent || (text ? /*#__PURE__*/React.createElement(LabelTextView, {
    disable: !!disable,
    disableOpacity: disableOpacity,
    style: textContainerStyle
  }, /*#__PURE__*/React.createElement(LabelText, {
    style: textStyle
  }, text)) : null);
  const handleLayout = event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    widthBounceableRef.value = width;
    heightBounceableRef.value = height;
  };
  return /*#__PURE__*/React.createElement(RadioButtonWrapper, {
    testID: "container",
    style: wrapperStyle
  }, /*#__PURE__*/React.createElement(Bounceable, _extends({
    testID: "bounceable",
    ref: ref,
    disabled: disable,
    onLayout: handleLayout,
    style: StyleSheet.flatten([styles.bounceStyle, {
      width: outer.width,
      height: outer.height,
      borderRadius: outer.border,
      borderColor: ringColor,
      opacity: disable ? disableOpacity : 1,
      borderWidth: theme.borderWidths.little
    }, style]),
    onPress: handlePress
  }, rest), /*#__PURE__*/React.createElement(RadioButtonInnerContainer, {
    maxWidth: widthBounceableRef.value,
    maxHeight: heightBounceableRef.value,
    inner: inner,
    isActive: isActive,
    innerBackgroundColor: innerBackgroundColor,
    style: innerContainerStyle,
    testID: "circle"
  })), renderLabelText());
});
const RadioButtonWrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center'
});
const RadioButtonInnerContainer = styled.View(_ref2 => {
  let {
    inner,
    maxWidth,
    maxHeight,
    ...rest
  } = _ref2;
  return {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    width: inner.width,
    height: inner.height,
    borderRadius: inner.border,
    backgroundColor: rest.isActive ? rest.innerBackgroundColor : 'transparent'
  };
});
const LabelTextView = styled.View(props => {
  var _props$theme;
  return {
    marginLeft: (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.spacing) === null || _props$theme === void 0 ? void 0 : _props$theme.small,
    opacity: props.disable ? props.disableOpacity : 1
  };
});
const LabelText = styled.Text(props => {
  var _props$theme2, _props$theme3;
  return {
    color: props === null || props === void 0 || (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.colors) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.black,
    fontSize: props === null || props === void 0 || (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.fontSizes) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.md
  };
});
const styles = StyleSheet.create({
  bounceStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=RadioButton.js.map