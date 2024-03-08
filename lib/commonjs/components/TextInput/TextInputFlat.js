"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _native = _interopRequireDefault(require("styled-components/native"));
var _helpers = require("../../helpers");
var _hooks = require("../../hooks");
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const TextInputFlat = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    containerStyle,
    editable,
    inputContainerStyle,
    inputStyle,
    label,
    errorProps,
    errorText,
    leftComponent,
    rightComponent,
    labelStyle,
    numberOfLines,
    placeholder,
    maxLength,
    multiline,
    onChangeText,
    onFocus,
    onSubmitEditing,
    onBlur,
    ...rest
  } = _ref;
  const theme = (0, _hooks.useTheme)();
  const inputRef = (0, _react.useRef)(null);
  const valueRef = (0, _react.useRef)('');
  const wrapperInfo = (0, _reactNativeReanimated.useSharedValue)({
    width: _constants.DEFAULT_WIDTH,
    height: _constants.DEFAULT_HEIGHT
  });
  const labelHeight = (0, _reactNativeReanimated.useSharedValue)(_constants.DEFAULT_HEIGHT);
  const textInputContentWidth = (0, _reactNativeReanimated.useSharedValue)(_constants.DEFAULT_WIDTH);
  const focus = (0, _reactNativeReanimated.useSharedValue)(_constants.OUT_OF_FOCUS);
  const blur = (0, _reactNativeReanimated.useSharedValue)(_constants.BLURRED);
  const handleFocus = (0, _react.useCallback)(() => {
    focus.value = (0, _reactNativeReanimated.withTiming)(_constants.FOCUSED, {
      duration: _constants.DURATION
    });
    blur.value = (0, _reactNativeReanimated.withTiming)(_constants.OUT_OF_BLUR, {
      duration: 1
    });
  }, [blur, focus]);
  const handleBlur = (0, _react.useCallback)(() => {
    blur.value = (0, _reactNativeReanimated.withTiming)(_constants.BLURRED, {
      duration: 1
    });
    if (valueRef.current === '') {
      focus.value = (0, _reactNativeReanimated.withTiming)(_constants.OUT_OF_FOCUS, {
        duration: _constants.DURATION
      });
    }
  }, [blur, focus]);
  const setFocus = (0, _react.useCallback)(() => {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
  }, []);
  (0, _react.useImperativeHandle)(ref, () => ({
    focus() {
      var _inputRef$current2;
      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.focus();
    },
    blur() {
      var _inputRef$current3;
      (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 || _inputRef$current3.blur();
    },
    clear() {
      var _inputRef$current4;
      (_inputRef$current4 = inputRef.current) === null || _inputRef$current4 === void 0 || _inputRef$current4.clear();
    }
  }));
  const getWrapperInfo = event => {
    const {
      width,
      height
    } = event.nativeEvent.layout;
    wrapperInfo.value = {
      width,
      height
    };
  };
  const getLabelInfo = event => {
    labelHeight.value = event.nativeEvent.layout.height;
  };
  const getTextInputContentInfo = event => {
    textInputContentWidth.value = event.nativeEvent.layout.width;
  };

  /**
   * Returns the animated style for the input label based on label height and wrapper height
   * @returns an object containing animated styles for the input label
   */
  const animatedLabelStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const topAnimated = (0, _reactNativeReanimated.interpolate)(focus.value, [0, 1], [(wrapperInfo.value.height - labelHeight.value) / 2, 0]);
    const fontSizeAnimated = (0, _reactNativeReanimated.interpolate)(focus.value, [0, 1], [_constants.UNFOCUSED_FONTSIZE, _constants.FOCUSED_FONTSIZE]);
    return {
      fontSize: fontSizeAnimated,
      color: !blur.value ? theme.colors.primary : theme.colors.placeHolderText,
      top: wrapperInfo.value.height === 0 || labelHeight.value === 0 ? undefined : topAnimated
    };
  }, [wrapperInfo, labelHeight, focus]);
  const animatedContentStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    borderColor: !blur.value ? theme.colors.primary : theme.colors.primaryBorder
  }), [blur]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(Wrapper, {
    testID: "test-Wrapper",
    onPress: setFocus,
    onLayout: getWrapperInfo
  }, /*#__PURE__*/_react.default.createElement(ContentAnimated, {
    style: [animatedContentStyle, _reactNative.StyleSheet.flatten(inputContainerStyle)]
  }, /*#__PURE__*/_react.default.createElement(LeftContainer, null, !!leftComponent && leftComponent), /*#__PURE__*/_react.default.createElement(TextInputContent, {
    testID: "test-TextInputContent",
    onLayout: getTextInputContentInfo
  }, !!label && /*#__PURE__*/_react.default.createElement(LabelAnimated, {
    testID: 'test-Label',
    onLayout: getLabelInfo,
    style: [animatedLabelStyle, _reactNative.StyleSheet.flatten(labelStyle)]
  }, label), /*#__PURE__*/_react.default.createElement(TextInputComponent, _extends({
    testID: 'test-TextInputFlat',
    ref: inputRef,
    multiline: multiline,
    style: [inputStyle],
    editable: editable,
    numberOfLines: numberOfLines,
    placeholder: placeholder,
    maxLength: maxLength,
    onChangeText: text => {
      valueRef.current = text;
      onChangeText === null || onChangeText === void 0 || onChangeText(text);
    },
    onSubmitEditing: onSubmitEditing,
    onFocus: () => {
      onFocus === null || onFocus === void 0 || onFocus();
      handleFocus();
    },
    onBlur: () => {
      onBlur === null || onBlur === void 0 || onBlur();
      handleBlur();
    }
  }, rest))), !!rightComponent && rightComponent)), !!errorText && /*#__PURE__*/_react.default.createElement(ErrorText, _extends({
    testID: "test-ErrorText"
  }, errorProps), errorText));
});
const Wrapper = _native.default.Pressable({});
const LeftContainer = _native.default.View(_ref2 => {
  var _theme$spacing;
  let {
    theme
  } = _ref2;
  return {
    marginBottom: _helpers.isIOS ? 0 : -((theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.petite) || 0)
  };
});
const TextInputContent = _native.default.View(() => ({
  flex: 1,
  height: '100%',
  justifyContent: 'center'
}));
const Content = _native.default.View(props => {
  var _props$theme, _props$theme2, _props$theme3, _props$theme4, _props$theme5;
  return {
    flexDirection: 'row',
    height: (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.sizes) === null || _props$theme === void 0 ? void 0 : _props$theme.substantial,
    borderWidth: (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.borderWidths) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.tiny,
    borderRadius: (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.borderWidths) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.small,
    paddingHorizontal: (_props$theme4 = props.theme) === null || _props$theme4 === void 0 || (_props$theme4 = _props$theme4.spacing) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.petite,
    backgroundColor: (_props$theme5 = props.theme) === null || _props$theme5 === void 0 || (_props$theme5 = _props$theme5.colors) === null || _props$theme5 === void 0 ? void 0 : _props$theme5.lightBackground,
    alignItems: 'center'
  };
});
const ContentAnimated = _reactNativeReanimated.default.createAnimatedComponent(Content);
const Label = _native.default.Text(_ref3 => {
  var _theme$spacing2, _theme$spacing3, _theme$spacing4, _theme$spacing5, _theme$colors;
  let {
    theme
  } = _ref3;
  return {
    position: 'absolute',
    width: '100%',
    left: _helpers.isIOS ? -(0, _helpers.responsiveHeight)((theme === null || theme === void 0 || (_theme$spacing2 = theme.spacing) === null || _theme$spacing2 === void 0 ? void 0 : _theme$spacing2.tiny) ?? 0) : 0,
    paddingHorizontal: (0, _helpers.responsiveHeight)((theme === null || theme === void 0 || (_theme$spacing3 = theme.spacing) === null || _theme$spacing3 === void 0 ? void 0 : _theme$spacing3.small) ?? _helpers.metrics.paddingHorizontal),
    paddingTop: (0, _helpers.responsiveHeight)((theme === null || theme === void 0 || (_theme$spacing4 = theme.spacing) === null || _theme$spacing4 === void 0 ? void 0 : _theme$spacing4.tiny) ?? _helpers.metrics.tiny),
    paddingBottom: theme === null || theme === void 0 || (_theme$spacing5 = theme.spacing) === null || _theme$spacing5 === void 0 ? void 0 : _theme$spacing5.tiny,
    zIndex: 1,
    backgroundColor: theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.lightBackground
  };
});
const LabelAnimated = _reactNativeReanimated.default.createAnimatedComponent(Label);
const ErrorText = _native.default.Text(_ref4 => {
  var _theme$fontSizes, _theme$colors2;
  let {
    theme
  } = _ref4;
  return {
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes = theme.fontSizes) === null || _theme$fontSizes === void 0 ? void 0 : _theme$fontSizes.md,
    color: theme === null || theme === void 0 || (_theme$colors2 = theme.colors) === null || _theme$colors2 === void 0 ? void 0 : _theme$colors2.errorText
  };
});
const ForwardRefTextInputComponent = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({}, props, {
  ref: ref
})));
const TextInputComponent = (0, _native.default)(ForwardRefTextInputComponent)(_ref5 => {
  var _theme$fontSizes2, _theme$spacing6, _theme$colors3;
  let {
    theme
  } = _ref5;
  return {
    paddingVertical: 0,
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes2 = theme.fontSizes) === null || _theme$fontSizes2 === void 0 ? void 0 : _theme$fontSizes2.xs,
    textAlignVertical: 'bottom',
    marginRight: theme === null || theme === void 0 || (_theme$spacing6 = theme.spacing) === null || _theme$spacing6 === void 0 ? void 0 : _theme$spacing6.miniature,
    color: theme === null || theme === void 0 || (_theme$colors3 = theme.colors) === null || _theme$colors3 === void 0 ? void 0 : _theme$colors3.darkTextColor
  };
});
TextInputFlat.displayName = 'TextInputFlat';
var _default = exports.default = TextInputFlat;
//# sourceMappingURL=TextInputFlat.js.map