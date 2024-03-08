"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonPrimaryTheme = void 0;
var _base = _interopRequireDefault(require("../../base"));
var _Button = require("./Button");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ButtonPrimaryTheme = exports.ButtonPrimaryTheme = {
  ..._Button.ButtonTheme,
  backgroundColor: _base.default.colors.primary,
  textColor: _base.default.colors.white
};
//# sourceMappingURL=ButtonPrimary.js.map