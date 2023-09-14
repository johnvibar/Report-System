"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useKeepGroupedColumnsHidden = require("./useKeepGroupedColumnsHidden");
Object.keys(_useKeepGroupedColumnsHidden).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useKeepGroupedColumnsHidden[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useKeepGroupedColumnsHidden[key];
    }
  });
});