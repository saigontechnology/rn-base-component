"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleAnimation = void 0;
var _reactNative = require("react-native");
const toggleAnimation = function () {
  let openAnimation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'easeInEaseOut';
  let closeAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'easeInEaseOut';
  let openDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  let closeDuration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 300;
  return {
    duration: 300,
    update: {
      duration: openDuration,
      property: _reactNative.LayoutAnimation.Properties.opacity,
      type: _reactNative.LayoutAnimation.Types[openAnimation]
    },
    delete: {
      duration: closeDuration,
      property: _reactNative.LayoutAnimation.Properties.opacity,
      type: _reactNative.LayoutAnimation.Types[closeAnimation]
    }
  };
};
exports.toggleAnimation = toggleAnimation;
//# sourceMappingURL=ToggleAnimation.js.map