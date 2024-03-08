"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = void 0;
var _base = _interopRequireDefault(require("./base"));
var _components = _interopRequireDefault(require("./components"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable @typescript-eslint/no-empty-interface */

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
};
const darkColors = _base.default.colors;
const theme = exports.theme = {
  ..._base.default,
  components: _components.default,
  config,
  darkColors
};
//# sourceMappingURL=theme.js.map