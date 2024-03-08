"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _metrics = require("./metrics");
Object.keys(_metrics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _metrics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _metrics[key];
    }
  });
});
//# sourceMappingURL=index.js.map