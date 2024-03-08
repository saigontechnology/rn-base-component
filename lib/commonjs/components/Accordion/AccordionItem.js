"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = _interopRequireDefault(require("styled-components/native"));
var _ToggleAnimation = require("./ToggleAnimation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AccordionItem = _ref => {
  let {
    title = '',
    onPress,
    keyExtractorItem,
    expanded = false,
    index,
    itemContainerStyle,
    headerContainerStyle,
    contentContainerStyle,
    titleStyle,
    item,
    openAnimation,
    closeAnimation,
    openDuration,
    closeDuration,
    renderHeader = () => null,
    renderSectionTitle,
    renderContent,
    children
  } = _ref;
  const content = (0, _react.useMemo)(() => {
    if (expanded) {
      return renderContent ? renderContent(item, index, expanded, keyExtractorItem) : /*#__PURE__*/_react.default.createElement(AccordionBody, {
        style: contentContainerStyle
      }, children);
    }
    return null;
  }, [renderContent, expanded, keyExtractorItem, index, item, children, contentContainerStyle]);
  const header = (0, _react.useMemo)(() => renderHeader(item, index, expanded, keyExtractorItem) || /*#__PURE__*/_react.default.createElement(AccordionHeader, {
    style: headerContainerStyle
  }, renderSectionTitle ? renderSectionTitle(item, index, expanded) : /*#__PURE__*/_react.default.createElement(Title, {
    style: titleStyle
  }, title)), [renderHeader, item, index, expanded, keyExtractorItem, renderSectionTitle, headerContainerStyle, title, titleStyle]);
  const onPressItem = (0, _react.useCallback)(() => {
    _reactNative.LayoutAnimation.configureNext((0, _ToggleAnimation.toggleAnimation)(openAnimation, closeAnimation, openDuration, closeDuration));
    onPress(keyExtractorItem);
  }, [closeAnimation, closeDuration, keyExtractorItem, onPress, openAnimation, openDuration]);
  return /*#__PURE__*/_react.default.createElement(AccordionContainer, {
    key: keyExtractorItem,
    style: itemContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: "accordion-item",
    activeOpacity: 0.7,
    onPress: onPressItem
  }, header), content);
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(AccordionItem);
const AccordionContainer = _native.default.View(_ref2 => {
  var _theme$spacing;
  let {
    theme
  } = _ref2;
  return {
    paddingBottom: theme === null || theme === void 0 || (_theme$spacing = theme.spacing) === null || _theme$spacing === void 0 ? void 0 : _theme$spacing.petite,
    overflow: 'hidden'
  };
});
const AccordionHeader = _native.default.View(_ref3 => {
  var _theme$spacing2;
  let {
    theme
  } = _ref3;
  return {
    padding: theme === null || theme === void 0 || (_theme$spacing2 = theme.spacing) === null || _theme$spacing2 === void 0 ? void 0 : _theme$spacing2.compact
  };
});
const Title = _native.default.Text(_ref4 => {
  var _theme$fontSizes, _theme$colors, _theme$fontWeights;
  let {
    theme
  } = _ref4;
  return {
    fontSize: theme === null || theme === void 0 || (_theme$fontSizes = theme.fontSizes) === null || _theme$fontSizes === void 0 ? void 0 : _theme$fontSizes.xl,
    textAlign: 'center',
    color: theme === null || theme === void 0 || (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.amber,
    fontWeight: theme === null || theme === void 0 || (_theme$fontWeights = theme.fontWeights) === null || _theme$fontWeights === void 0 ? void 0 : _theme$fontWeights.bold
  };
});
const AccordionBody = _native.default.View(_ref5 => {
  var _theme$spacing3;
  let {
    theme
  } = _ref5;
  return {
    padding: theme === null || theme === void 0 || (_theme$spacing3 = theme.spacing) === null || _theme$spacing3 === void 0 ? void 0 : _theme$spacing3.compact,
    justifyContent: 'center',
    alignItems: 'center'
  };
});
//# sourceMappingURL=AccordionItem.js.map