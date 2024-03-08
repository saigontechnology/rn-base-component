"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonSecondaryTheme = void 0;
var _base = _interopRequireDefault(require("../../base"));
var _Button = require("./Button");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ButtonSecondaryTheme = exports.ButtonSecondaryTheme = {
  ..._Button.ButtonTheme,
  backgroundColor: _base.default.colors.secondary,
  textColor: _base.default.colors.white
};
//# sourceMappingURL=ButtonSecondary.js.map