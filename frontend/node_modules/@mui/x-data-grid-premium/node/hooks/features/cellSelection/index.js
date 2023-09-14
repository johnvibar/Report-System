"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _gridCellSelectionInterfaces = require("./gridCellSelectionInterfaces");
Object.keys(_gridCellSelectionInterfaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gridCellSelectionInterfaces[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gridCellSelectionInterfaces[key];
    }
  });
});