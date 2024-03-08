"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonOutlineTheme = void 0;
var _base = _interopRequireDefault(require("../../base"));
var _Button = require("./Button");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ButtonOutlineTheme = exports.ButtonOutlineTheme = {
  ..._Button.ButtonTheme,
  backgroundColor: 'transparent',
  textColor: _base.default.colors.primary,
  outlineWidth: _base.default.borderWidths.tiny,
  outlineColor: _base.default.colors.primary
};
//# sourceMappingURL=ButtonOutline.js.map