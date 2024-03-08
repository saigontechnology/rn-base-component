"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = _interopRequireDefault(require("styled-components/native"));
var _metrics = require("../../helpers/metrics");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Card = _ref => {
  let {
    onPress,
    style,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(CardWrapper, {
    onPress: onPress,
    activeOpacity: onPress ? _metrics.activeOpacity.low : _metrics.activeOpacity.none,
    style: style,
    testID: 'card'
  }, children);
};
const CardWrapper = _native.default.TouchableOpacity(props => {
  var _props$theme, _props$theme2;
  return {
    padding: props === null || props === void 0 || (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.spacing) === null || _props$theme === void 0 ? void 0 : _props$theme.slim,
    borderRadius: _metrics.metrics.borderRadius,
    backgroundColor: props === null || props === void 0 || (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.colors) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.cardBackground
  };
});
var _default = exports.default = Card;
//# sourceMappingURL=Card.js.map