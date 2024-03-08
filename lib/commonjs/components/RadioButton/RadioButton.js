"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = _interopRequireDefault(require("styled-components/native"));
var _helpers = require("../../helpers");
var _Bounceable = _interopRequireDefault(require("./Bounceable"));
var _theme = require("../../theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OUTER_SIZE_DEFAULT = 45;
const INNER_SIZE_DEFAULT = 25;
const OPACITY_DEFAULT = 0.5;
const RadioButton = exports.RadioButton = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    style,
    isRemainActive,
    innerContainerStyle,
    outerSize = OUTER_SIZE_DEFAULT,
    innerSize = INNER_SIZE_DEFAULT,
    ringColor = _theme.theme.colors.darkBlue,
    innerBackgroundColor = _theme.theme.colors.darkBlue,
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
  const [isActive, setIsActive] = (0, _react.useState)(initial || false);
  const outer = (0, _react.useMemo)(() => ({
    width: (0, _helpers.responsiveWidth)(outerSize),
    height: (0, _helpers.responsiveHeight)(outerSize),
    border: (0, _helpers.responsiveHeight)(outerSize / 2)
  }), [outerSize]);
  const inner = (0, _react.useMemo)(() => ({
    width: (0, _helpers.responsiveWidth)(innerSize),
    height: (0, _helpers.responsiveHeight)(innerSize),
    border: (0, _helpers.responsiveHeight)(innerSize / 2)
  }), [innerSize]);
  const widthBounceableRef = (0, _react.useRef)({
    value: outer.width
  }).current;
  const heightBounceableRef = (0, _react.useRef)({
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
  const renderLabelText = () => textComponent || (text ? /*#__PURE__*/_react.default.createElement(LabelTextView, {
    disable: !!disable,
    disableOpacity: disableOpacity,
    style: textContainerStyle
  }, /*#__PURE__*/_react.default.createElement(LabelText, {
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
  return /*#__PURE__*/_react.default.createElement(RadioButtonWrapper, {
    testID: "container",
    style: wrapperStyle
  }, /*#__PURE__*/_react.default.createElement(_Bounceable.default, _extends({
    testID: "bounceable",
    ref: ref,
    disabled: disable,
    onLayout: handleLayout,
    style: _reactNative.StyleSheet.flatten([styles.bounceStyle, {
      width: outer.width,
      height: outer.height,
      borderRadius: outer.border,
      borderColor: ringColor,
      opacity: disable ? disableOpacity : 1,
      borderWidth: _theme.theme.borderWidths.little
    }, style]),
    onPress: handlePress
  }, rest), /*#__PURE__*/_react.default.createElement(RadioButtonInnerContainer, {
    maxWidth: widthBounceableRef.value,
    maxHeight: heightBounceableRef.value,
    inner: inner,
    isActive: isActive,
    innerBackgroundColor: innerBackgroundColor,
    style: innerContainerStyle,
    testID: "circle"
  })), renderLabelText());
});
const RadioButtonWrapper = _native.default.View({
  flexDirection: 'row',
  alignItems: 'center'
});
const RadioButtonInnerContainer = _native.default.View(_ref2 => {
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
const LabelTextView = _native.default.View(props => {
  var _props$theme;
  return {
    marginLeft: (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.spacing) === null || _props$theme === void 0 ? void 0 : _props$theme.small,
    opacity: props.disable ? props.disableOpacity : 1
  };
});
const LabelText = _native.default.Text(props => {
  var _props$theme2, _props$theme3;
  return {
    color: props === null || props === void 0 || (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.colors) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.black,
    fontSize: props === null || props === void 0 || (_props$theme3 = props.theme) === null || _props$theme3 === void 0 || (_props$theme3 = _props$theme3.fontSizes) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.md
  };
});
const styles = _reactNative.StyleSheet.create({
  bounceStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=RadioButton.js.map