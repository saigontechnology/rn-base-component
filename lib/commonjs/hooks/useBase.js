"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBase = void 0;
var _react = require("react");
var _BaseProvider = require("../core/BaseProvider");
const useBase = () => {
  const base = (0, _react.useContext)(_BaseProvider.BaseContext);
  if (!base) {
    throw Error('`base` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`');
  }
  return base;
};
exports.useBase = useBase;
//# sourceMappingURL=useBase.js.map