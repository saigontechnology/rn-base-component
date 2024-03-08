import React from 'react';
import styled from 'styled-components/native';
import { activeOpacity, metrics } from '../../helpers/metrics';
const Card = _ref => {
  let {
    onPress,
    style,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(CardWrapper, {
    onPress: onPress,
    activeOpacity: onPress ? activeOpacity.low : activeOpacity.none,
    style: style,
    testID: 'card'
  }, children);
};
const CardWrapper = styled.TouchableOpacity(props => {
  var _props$theme, _props$theme2;
  return {
    padding: props === null || props === void 0 || (_props$theme = props.theme) === null || _props$theme === void 0 || (_props$theme = _props$theme.spacing) === null || _props$theme === void 0 ? void 0 : _props$theme.slim,
    borderRadius: metrics.borderRadius,
    backgroundColor: props === null || props === void 0 || (_props$theme2 = props.theme) === null || _props$theme2 === void 0 || (_props$theme2 = _props$theme2.colors) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.cardBackground
  };
});
export default Card;
//# sourceMappingURL=Card.js.map