import React from 'react';
import styled from 'styled-components/native';
import { Icon } from '../../Icon/Icon';
export const CustomIcon = _ref => {
  let {
    source,
    size,
    color,
    resizeMode,
    iconContainerStyle,
    iconStyle,
    onPress
  } = _ref;
  return /*#__PURE__*/React.createElement(IconWrapper, {
    testID: "icon-container",
    style: iconContainerStyle
  }, /*#__PURE__*/React.createElement(Icon, {
    testID: "icon",
    source: source,
    size: size,
    color: color,
    resizeMode: resizeMode,
    style: iconStyle,
    onPress: onPress
  }));
};
const IconWrapper = styled.View(_ref2 => {
  var _theme$spacing;
  let {
    theme
  } = _ref2;
  return {
    marginHorizontal: theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.small
  };
});
//# sourceMappingURL=CustomIcon.js.map