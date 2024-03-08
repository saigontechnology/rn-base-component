import React from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
const Track = _ref => {
  let {
    style,
    onLayout
  } = _ref;
  return /*#__PURE__*/React.createElement(TrackAnimatedComponent, {
    style: style,
    onLayout: onLayout
  });
};
const TrackComponent = styled.View(_ref2 => {
  let {
    theme
  } = _ref2;
  return {
    flex: 1,
    borderRadius: theme.borderWidths.huge,
    backgroundColor: theme.colors.backgroundPrimary
  };
});
const TrackAnimatedComponent = Animated.createAnimatedComponent(TrackComponent);
export { Track };
//# sourceMappingURL=Track.js.map