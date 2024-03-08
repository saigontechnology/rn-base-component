"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _theme = require("./theme");
Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme[key];
    }
  });
});
var _images = require("./images");
Object.keys(_images).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _images[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _images[key];
    }
  });
});
//# sourceMappingURL=index.js.map