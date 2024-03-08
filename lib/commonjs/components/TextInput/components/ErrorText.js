"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Error = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = _interopRequireDefault(require("styled-components/native"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Error = _ref => {
  let {
    errorText,
    errorProps
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(ErrorText, errorProps, errorText);
};
exports.Error = Error;
const ErrorText = _native.default.Text(_ref2 => {
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