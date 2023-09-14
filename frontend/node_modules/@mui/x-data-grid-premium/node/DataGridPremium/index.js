"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  DATA_GRID_PREMIUM_PROPS_DEFAULT_VALUES: true
};
Object.defineProperty(exports, "DATA_GRID_PREMIUM_PROPS_DEFAULT_VALUES", {
  enumerable: true,
  get: function () {
    return _useDataGridPremiumProps.DATA_GRID_PREMIUM_PROPS_DEFAULT_VALUES;
  }
});
var _DataGrid = require("./DataGrid");
Object.keys(_DataGrid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DataGrid[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DataGrid[key];
    }
  });
});
var _DataGridPremium = require("./DataGridPremium");
Object.keys(_DataGridPremium).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DataGridPremium[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DataGridPremium[key];
    }
  });
});
var _useDataGridPremiumProps = require("./useDataGridPremiumProps");