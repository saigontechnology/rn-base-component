function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';
import { Text } from '../Text/Text';
const Button = _ref => {
  let {
    textColor,
    backgroundColor,
    outline,
    outlineColor,
    outlineWidth,
    borderRadius,
    disabled,
    disabledColor,
    textProps,
    textStyle,
    style,
    leftIcon,
    rightIcon,
    children,
    ...props
  } = _ref;
  const ButtonTheme = useTheme().components.Button;
  return /*#__PURE__*/React.createElement(ButtonWrapper, _extends({
    activeOpacity: 0.8,
    backgroundColor: disabled ? disabledColor ?? ButtonTheme.disabledColor : backgroundColor ?? ButtonTheme.backgroundColor,
    outline: outline,
    outlineColor: outlineColor,
    outlineWidth: outlineWidth,
    borderRadius: borderRadius ?? ButtonTheme.borderRadius,
    disabled: disabled,
    style: [{
      minHeight: ButtonTheme.height
    }, StyleSheet.flatten(style)]
  }, props), !!leftIcon && leftIcon, typeof children === 'string' ? /*#__PURE__*/React.createElement(Label, _extends({}, textProps, {
    style: textStyle,
    color: textColor ?? ButtonTheme.textColor
  }), children) : children, !!rightIcon && rightIcon);
};
const ButtonWrapper = styled.TouchableOpacity(_ref2 => {
  let {
    theme,
    backgroundColor,
    outline,
    outlineWidth,
    outlineColor,
    borderRadius,
    disabled
  } = _ref2;
  return {
    paddingVertical: theme === null || theme === void 0 ? void 0 : theme.spacing.small,
    flexDirection: 'row',
    paddingHorizontal: theme === null || theme === void 0 ? void 0 : theme.spacing.slim,
    borderRadius,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    ...(outline && {
      borderWidth: outlineWidth || 1,
      borderColor: disabled ? theme === null || theme === void 0 ? void 0 : theme.colors.gray : outlineColor || (theme === null || theme === void 0 ? void 0 : theme.colors.primaryBorder)
    })
  };
});
const Label = styled(Text)(_ref3 => {
  var _theme$fontWeights;
  let {
    theme,
    color
  } = _ref3;
  return {
    color,
    fontWeight: theme === null || theme === void 0 || (_theme$fontWeights = theme.fontWeights) === null || _theme$fontWeights === void 0 ? void 0 : _theme$fontWeights.bold
  };
});
export default Button;
//# sourceMappingURL=Button.js.map