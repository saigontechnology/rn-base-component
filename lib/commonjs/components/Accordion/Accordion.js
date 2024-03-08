"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _AccordionItem = _interopRequireDefault(require("./AccordionItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Accordion = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    sections,
    expandMultiple = false,
    keyExtractor,
    wrapperStyle,
    ...rest
  } = _ref;
  const [array, setArray] = (0, _react.useState)([]);
  const _keyExtractor = (0, _react.useMemo)(() => keyExtractor || ((_, index) => index.toString()), [keyExtractor]);
  const onPress = (0, _react.useCallback)(key => {
    setArray(previousArray => {
      const index = previousArray.indexOf(key);
      let newArray = [...previousArray];
      if (expandMultiple) {
        if (index >= 0) {
          newArray.splice(index, 1);
        } else {
          newArray.push(key);
        }
      } else {
        newArray = index >= 0 ? [] : [key];
      }
      return newArray;
    });
  }, [expandMultiple]);
  const renderItem = (0, _react.useCallback)(_ref2 => {
    let {
      item,
      index
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_AccordionItem.default, _extends({
      key: _keyExtractor(item, index),
      title: item === null || item === void 0 ? void 0 : item.title,
      expanded: array.includes(_keyExtractor(item, index))
    }, rest, {
      item: item,
      keyExtractorItem: _keyExtractor(item, index),
      onPress: onPress,
      index: index
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, (item === null || item === void 0 ? void 0 : item.content) ?? ''));
  }, [_keyExtractor, onPress, array, rest]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({
    style: wrapperStyle,
    data: sections,
    ref: ref,
    keyExtractor: keyExtractor,
    renderItem: renderItem,
    extraData: array
  }, rest));
});
Accordion.displayName = 'Accordion';
var _default = exports.default = /*#__PURE__*/_react.default.memo(Accordion);
//# sourceMappingURL=Accordion.js.map