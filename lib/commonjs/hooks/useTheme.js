"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = void 0;
var _styledComponents = require("styled-components");
const useTheme = () => {
  const theme = (0, _styledComponents.useTheme)();
  if (!theme) {
    throw Error('`theme` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`');
  }
  return theme;
};
exports.useTheme = useTheme;
//# sourceMappingURL=useTheme.js.map