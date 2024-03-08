import React from 'react';
import styled from 'styled-components/native';
export const Error = _ref => {
  let {
    errorText,
    errorProps
  } = _ref;
  return /*#__PURE__*/React.createElement(ErrorText, errorProps, errorText);
};
const ErrorText = styled.Text(_ref2 => {
  var _theme$fontSizes, _theme$colors;
  let {
    theme
  } = _ref2;
  return {
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes = theme.fontSizes) === null || _theme$fontSizes === void 0 ? void 0 : _theme$fontSizes['2xs'],
    color: theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.errorText
  };
});
//# sourceMappingURL=ErrorText.js.map