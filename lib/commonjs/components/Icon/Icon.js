"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _metrics = require("../../helpers/metrics");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Icon = _ref => {
  let {
    source,
    size = _metrics.metrics.medium,
    disabled = false,
    color,
    hitSlop = _metrics.hitSlop,
    style,
    resizeMode = 'contain',
    testID,
    onPress,
    onLongPress,
    buttonStyle
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: testID,
    disabled: !onPress && !onLongPress || disabled,
    onPress: onPress,
    onLongPress: onLongPress,
    style: buttonStyle,
    hitSlop: hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    testID: "icon-image",
    source: source,
    style: [{
      width: size,
      height: size,
      tintColor: color
    }, _reactNative.StyleSheet.flatten(style)],
    resizeMode: resizeMode
  }));
};
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map