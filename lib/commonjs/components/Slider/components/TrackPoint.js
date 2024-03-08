"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackPoint = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = _interopRequireDefault(require("styled-components/native"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TrackPoint = exports.TrackPoint = /*#__PURE__*/_react.default.memo(_ref => {
  let {
    sliderWidth,
    totalPoint,
    trackPointStyle,
    hitSlopPoint,
    activeOpacity,
    onPressPoint
  } = _ref;
  // We don't need to display the first point on the track, so we removed it using totalPoint - 1
  const range = sliderWidth / totalPoint - _constants.FIRST_POINT;

  // Render the track points based on the range
  return /*#__PURE__*/_react.default.createElement(TrackPointComponent, {
    width: sliderWidth
  }, Array(totalPoint - _constants.FIRST_POINT).fill(0).map((_, i) => /*#__PURE__*/_react.default.createElement(Point, {
    testID: "slider-point",
    key: i,
    hitSlop: hitSlopPoint,
    onPress: () => onPressPoint === null || onPressPoint === void 0 ? void 0 : onPressPoint(i),
    activeOpacity: activeOpacity,
    style: [trackPointStyle, {
      left: range * (i + _constants.FIRST_POINT)
    }]
  })));
});
const TrackPointComponent = _native.default.View(props => ({
  width: props.width,
  flexDirection: 'row',
  height: '100%',
  position: 'absolute',
  overflow: 'hidden'
}));
const Point = _native.default.TouchableOpacity(_ref2 => {
  let {
    theme
  } = _ref2;
  return {
    height: '100%',
    width: 1,
    backgroundColor: theme.colors.primary
  };
});
TrackPoint.displayName = 'TrackPoint';
//# sourceMappingURL=TrackPoint.js.map