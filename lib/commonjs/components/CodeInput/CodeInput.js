"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = _interopRequireDefault(require("styled-components/native"));
var _helpers = require("../../helpers");
var _Cursor = _interopRequireDefault(require("./Cursor"));
var _Text = require("../Text/Text");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DEFAULT_LENGTH = 6;
const CodeInput = _ref => {
  let {
    cellStyle,
    focusCellStyle,
    filledCellStyle,
    textStyle,
    focusTextStyle,
    secureViewStyle,
    length = DEFAULT_LENGTH,
    onSubmit,
    customCursor,
    secureTextEntry,
    keyboardType = 'number-pad',
    withCursor = false,
    placeholder,
    placeholderTextColor,
    ...rest
  } = _ref;
  const textInputRef = (0, _react.useRef)(null);
  const [code, setCode] = (0, _react.useState)('');
  const handleOnChangeText = (0, _react.useCallback)(val => {
    setCode(val);
    if (val.length === length) {
      var _textInputRef$current;
      onSubmit === null || onSubmit === void 0 || onSubmit(val);
      (_textInputRef$current = textInputRef.current) === null || _textInputRef$current === void 0 || _textInputRef$current.blur();
    }
  }, [length, onSubmit]);
  const handleCellPress = (0, _react.useCallback)(index => {
    var _textInputRef$current2;
    if (index < code.length) {
      setCode(code.slice(0, index));
    }
    (_textInputRef$current2 = textInputRef.current) === null || _textInputRef$current2 === void 0 || _textInputRef$current2.focus();
  }, [code]);
  const renderCursor = (0, _react.useCallback)(() => customCursor ? customCursor() : /*#__PURE__*/_react.default.createElement(_Cursor.default, {
    style: focusTextStyle
  }), [customCursor, focusTextStyle]);
  const renderCell = (0, _react.useCallback)((isFocused, value) => {
    if (withCursor && isFocused) {
      return renderCursor();
    }
    if (secureTextEntry) {
      return /*#__PURE__*/_react.default.createElement(SecureView, {
        testID: "text",
        style: secureViewStyle
      });
    }
    if (value) {
      return /*#__PURE__*/_react.default.createElement(_Text.Text, {
        testID: "text",
        style: textStyle
      }, value);
    }
    return /*#__PURE__*/_react.default.createElement(PlaceholderText, {
      color: placeholderTextColor
    }, placeholder ?? '');
  }, [renderCursor, secureTextEntry, secureViewStyle, withCursor, textStyle, placeholderTextColor, placeholder]);
  const renderCells = (0, _react.useCallback)(() => {
    const cells = [];
    for (let index = 0; index < length; index++) {
      const isFocused = code.length === index;
      cells.push( /*#__PURE__*/_react.default.createElement(Cell, {
        testID: "cell",
        style: [cellStyle, code[index] ? filledCellStyle : {}, isFocused && focusCellStyle],
        key: index,
        onPress: () => handleCellPress(index)
      }, renderCell(isFocused, code[index])));
    }
    return cells;
  }, [length, code, cellStyle, filledCellStyle, focusCellStyle, renderCell, handleCellPress]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(StyledTextInput, _extends({
    testID: "input",
    ref: textInputRef,
    value: code,
    textContentType: "oneTimeCode",
    keyboardType: keyboardType,
    onChangeText: handleOnChangeText,
    maxLength: length
  }, rest)), /*#__PURE__*/_react.default.createElement(CellContainer, null, renderCells()));
};
exports.CodeInput = CodeInput;
const Cell = _native.default.Pressable(props => {
  var _props$theme, _props$theme2, _props$theme3;
  return {
    width: props === null || props === void 0 || (_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.spacing.gigantic,
    height: props === null || props === void 0 || (_props$theme2 = props.theme) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.spacing.gigantic,
    borderRadius: _helpers.metrics.tiny,
    borderWidth: _helpers.metrics.line,
    borderColor: props === null || props === void 0 || (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.colors) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.coolGray,
    justifyContent: 'center',
    alignItems: 'center',
    margin: _helpers.metrics.tiny
  };
});
const SecureView = _native.default.Pressable(props => {
  var _props$theme4, _props$theme5, _props$theme6;
  return {
    width: props === null || props === void 0 || (_props$theme4 = props.theme) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.spacing.slim,
    height: props === null || props === void 0 || (_props$theme5 = props.theme) === null || _props$theme5 === void 0 ? void 0 : _props$theme5.spacing.slim,
    borderRadius: _helpers.metrics.small,
    backgroundColor: props === null || props === void 0 || (_props$theme6 = props.theme) === null || _props$theme6 === void 0 || (_props$theme6 = _props$theme6.colors) === null || _props$theme6 === void 0 ? void 0 : _props$theme6.darkText
  };
});
const CellContainer = _native.default.View({
  flexDirection: 'row',
  justifyContent: 'space-between'
});
const ForwardRefTextInputComponent = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({}, props, {
  ref: ref
})));
const StyledTextInput = (0, _native.default)(ForwardRefTextInputComponent)(() => ({
  opacity: 0,
  position: 'absolute',
  width: 0,
  height: 0
}));
const PlaceholderText = _native.default.Text(_ref2 => {
  let {
    color
  } = _ref2;
  return {
    color
  };
});
//# sourceMappingURL=CodeInput.js.map