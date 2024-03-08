import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { metrics, hitSlop as defaultHitSlop } from '../../helpers/metrics';
export const Icon = _ref => {
  let {
    source,
    size = metrics.medium,
    disabled = false,
    color,
    hitSlop = defaultHitSlop,
    style,
    resizeMode = 'contain',
    testID,
    onPress,
    onLongPress,
    buttonStyle
  } = _ref;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: testID,
    disabled: !onPress && !onLongPress || disabled,
    onPress: onPress,
    onLongPress: onLongPress,
    style: buttonStyle,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Image, {
    testID: "icon-image",
    source: source,
    style: [{
      width: size,
      height: size,
      tintColor: color
    }, StyleSheet.flatten(style)],
    resizeMode: resizeMode
  }));
};
//# sourceMappingURL=Icon.js.map