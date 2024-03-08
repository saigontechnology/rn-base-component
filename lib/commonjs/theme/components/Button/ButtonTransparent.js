"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonTransparentTheme = void 0;
var _base = _interopRequireDefault(require("../../base"));
var _Button = require("./Button");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ButtonTransparentTheme = exports.ButtonTransparentTheme = {
  ..._Button.ButtonTheme,
  backgroundColor: 'transparent',
  textColor: _base.default.colors.primary
};
//# sourceMappingURL=ButtonTransparent.js.map