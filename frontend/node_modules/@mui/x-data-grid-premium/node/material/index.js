"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _icons = require("./icons");
const iconsSlots = {
  ColumnMenuUngroupIcon: _icons.GridWorkspacesIcon,
  ColumnMenuGroupIcon: _icons.GridGroupWorkIcon,
  ColumnMenuAggregationIcon: _icons.GridFunctionsIcon
};
const materialSlots = (0, _extends2.default)({}, iconsSlots);
var _default = materialSlots;
exports.default = _default;