"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useTheme = require("./useTheme");
Object.keys(_useTheme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useTheme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTheme[key];
    }
  });
});
var _useBase = require("./useBase");
Object.keys(_useBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useBase[key];
    }
  });
});
//# sourceMappingURL=index.js.map