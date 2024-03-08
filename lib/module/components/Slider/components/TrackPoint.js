import React from 'react';
import styled from 'styled-components/native';
import { FIRST_POINT } from '../constants';
const TrackPoint = /*#__PURE__*/React.memo(_ref => {
  let {
    sliderWidth,
    totalPoint,
    trackPointStyle,
    hitSlopPoint,
    activeOpacity,
    onPressPoint
  } = _ref;
  // We don't need to display the first point on the track, so we removed it using totalPoint - 1
  const range = sliderWidth / totalPoint - FIRST_POINT;

  // Render the track points based on the range
  return /*#__PURE__*/React.createElement(TrackPointComponent, {
    width: sliderWidth
  }, Array(totalPoint - FIRST_POINT).fill(0).map((_, i) => /*#__PURE__*/React.createElement(Point, {
    testID: "slider-point",
    key: i,
    hitSlop: hitSlopPoint,
    onPress: () => onPressPoint === null || onPressPoint === void 0 ? void 0 : onPressPoint(i),
    activeOpacity: activeOpacity,
    style: [trackPointStyle, {
      left: range * (i + FIRST_POINT)
    }]
  })));
});
const TrackPointComponent = styled.View(props => ({
  width: props.width,
  flexDirection: 'row',
  height: '100%',
  position: 'absolute',
  overflow: 'hidden'
}));
const Point = styled.TouchableOpacity(_ref2 => {
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
export { TrackPoint };
//# sourceMappingURL=TrackPoint.js.map