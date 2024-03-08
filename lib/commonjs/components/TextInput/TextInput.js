"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = _interopRequireDefault(require("styled-components/native"));
var _TextInputOutlined = _interopRequireDefault(require("./TextInputOutlined"));
var _components = require("./components");
var _helpers = require("../../helpers");
var _TextInputFlat = _interopRequireDefault(require("./TextInputFlat"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const TextInput = exports.TextInput = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    containerStyle,
    editable,
    inputContainerStyle,
    inputStyle,
    label,
    leftComponent,
    rightComponent,
    errorText,
    errorProps,
    isRequire,
    numberOfLines,
    labelStyle,
    labelProps,
    multiline,
    onChangeText,
    onFocus,
    onSubmitEditing,
    onBlur,
    ...rest
  } = _ref;
  const inputRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
    focus: () => {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    },
    clear: () => {
      var _inputRef$current2;
      return (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.clear();
    },
    blur: () => {
      var _inputRef$current3;
      return (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.blur();
    }
  }));
  const handleFocus = (0, _react.useCallback)(() => {
    var _inputRef$current4;
    (_inputRef$current4 = inputRef.current) === null || _inputRef$current4 === void 0 || _inputRef$current4.focus();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, !!label && /*#__PURE__*/_react.default.createElement(Title, _extends({
    testID: "test-title",
    style: labelStyle
  }, labelProps), label, !!isRequire && /*#__PURE__*/_react.default.createElement(StarText, {
    testID: "test-startText"
  }, " *")), /*#__PURE__*/_react.default.createElement(TouchableContainer, {
    style: inputContainerStyle,
    activeOpacity: 1,
    onPress: handleFocus,
    disabled: editable
  }, !!leftComponent && leftComponent, /*#__PURE__*/_react.default.createElement(TextInputComponent, _extends({
    testID: "test-TextInputComponent",
    ref: inputRef,
    style: inputStyle,
    editable: editable,
    multiline: multiline,
    numberOfLines: numberOfLines,
    onChangeText: onChangeText,
    onFocus: onFocus,
    onSubmitEditing: onSubmitEditing,
    onBlur: onBlur
  }, rest)), !!rightComponent && rightComponent), !!errorText && /*#__PURE__*/_react.default.createElement(_components.Error, {
    errorProps: errorProps,
    errorText: errorText
  }));
});
const TouchableContainer = _native.default.TouchableOpacity(_ref2 => {
  var _theme$colors, _theme$sizes;
  let {
    theme
  } = _ref2;
  return {
    flexDirection: 'row',
    borderColor: theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.primaryBorder,
    height: theme === null || theme === void 0 || (_theme$sizes = theme.sizes) === null || _theme$sizes === void 0 ? void 0 : _theme$sizes.narrow,
    alignItems: 'center'
  };
});
const Title = _native.default.Text(_ref3 => {
  var _theme$fontSizes, _theme$colors2, _theme$spacing, _theme$spacing2;
  let {
    theme
  } = _ref3;
  return {
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes = theme.fontSizes) === null || _theme$fontSizes === void 0 ? void 0 : _theme$fontSizes.xs,
    color: theme === null || theme === void 0 || (_theme$colors2 = theme.colors) === null || _theme$colors2 === void 0 ? void 0 : _theme$colors2.textColor,
    paddingLeft: _helpers.isIOS ? 0 : theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.tiny,
    paddingBottom: theme === null || theme === void 0 || (_theme$spacing2 = theme.spacing) === null || _theme$spacing2 === void 0 ? void 0 : _theme$spacing2.tiny
  };
});
const StarText = _native.default.Text(_ref4 => {
  var _theme$colors3;
  let {
    theme
  } = _ref4;
  return {
    color: theme === null || theme === void 0 || (_theme$colors3 = theme.colors) === null || _theme$colors3 === void 0 ? void 0 : _theme$colors3.errorText
  };
});
const ForwardRefTextInputComponent = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({}, props, {
  ref: ref
})));
const TextInputComponent = (0, _native.default)(ForwardRefTextInputComponent)(_ref5 => {
  var _theme$fontSizes2, _theme$colors4;
  let {
    theme
  } = _ref5;
  return {
    flex: 1,
    paddingVertical: 0,
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes2 = theme.fontSizes) === null || _theme$fontSizes2 === void 0 ? void 0 : _theme$fontSizes2.sm,
    color: theme === null || theme === void 0 || (_theme$colors4 = theme.colors) === null || _theme$colors4 === void 0 ? void 0 : _theme$colors4.darkTextColor
  };
});
TextInput.Outlined = _TextInputOutlined.default;
TextInput.Flat = _TextInputFlat.default;
TextInput.Icon = _components.CustomIcon;
//# sourceMappingURL=TextInput.js.map