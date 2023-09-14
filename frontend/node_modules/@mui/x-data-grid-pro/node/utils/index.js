"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _tree = require("./tree");
Object.keys(_tree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tree[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tree[key];
    }
  });
});