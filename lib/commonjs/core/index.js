"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _extendTheme = require("./extendTheme");
Object.keys(_extendTheme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _extendTheme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _extendTheme[key];
    }
  });
});
var _BaseProvider = require("./BaseProvider");
Object.keys(_BaseProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BaseProvider[key];
    }
  });
});
//# sourceMappingURL=index.js.map