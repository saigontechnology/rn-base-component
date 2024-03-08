"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextItalic = exports.TextBold = exports.Text = void 0;
var _native = _interopRequireDefault(require("styled-components/native"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Text = exports.Text = _native.default.Text(props => {
  var _props$theme, _props$theme2, _props$theme3;
  return {
    fontSize: (props === null || props === void 0 ? void 0 : props.fontSize) || (props === null || props === void 0 || (_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.components.Text.fontSize),
    color: (props === null || props === void 0 ? void 0 : props.color) || (props === null || props === void 0 || (_props$theme2 = props.theme) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.components.Text.color),
    fontFamily: (props === null || props === void 0 ? void 0 : props.fontFamily) || (props === null || props === void 0 || (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.fonts) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.regular)
  };
});
const TextBold = exports.TextBold = (0, _native.default)(Text)(props => {
  var _props$theme4;
  return {
    fontFamily: props === null || props === void 0 || (_props$theme4 = props.theme) === null || _props$theme4 === void 0 || (_props$theme4 = _props$theme4.fonts) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.bold
  };
});
const TextItalic = exports.TextItalic = (0, _native.default)(Text)(() => ({
  fontStyle: 'italic'
}));
//# sourceMappingURL=Text.js.map