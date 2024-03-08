"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Cursor = _ref => {
  let {
    style
  } = _ref;
  const animatedValue = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _react.useEffect)(() => {
    animatedValue.value = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(1), (0, _reactNativeReanimated.withTiming)(0)), -1);
  }, [animatedValue]);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: animatedValue.value
  }), []);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Text, {
    style: [animatedStyle, style]
  }, "|");
};
var _default = exports.default = Cursor;
//# sourceMappingURL=Cursor.js.map