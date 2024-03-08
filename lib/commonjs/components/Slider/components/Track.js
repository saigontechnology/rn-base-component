"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _native = _interopRequireDefault(require("styled-components/native"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Track = _ref => {
  let {
    style,
    onLayout
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(TrackAnimatedComponent, {
    style: style,
    onLayout: onLayout
  });
};
exports.Track = Track;
const TrackComponent = _native.default.View(_ref2 => {
  let {
    theme
  } = _ref2;
  return {
    flex: 1,
    borderRadius: theme.borderWidths.huge,
    backgroundColor: theme.colors.backgroundPrimary
  };
});
const TrackAnimatedComponent = _reactNativeReanimated.default.createAnimatedComponent(TrackComponent);
//# sourceMappingURL=Track.js.map