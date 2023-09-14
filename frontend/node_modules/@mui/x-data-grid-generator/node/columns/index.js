"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _commodities = require("./commodities.columns");
Object.keys(_commodities).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _commodities[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _commodities[key];
    }
  });
});
var _employees = require("./employees.columns");
Object.keys(_employees).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _employees[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _employees[key];
    }
  });
});