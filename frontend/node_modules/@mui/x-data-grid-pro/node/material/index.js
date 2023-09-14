"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _icons = require("./icons");
const iconSlots = {
  ColumnMenuPinRightIcon: _icons.GridPushPinRightIcon,
  ColumnMenuPinLeftIcon: _icons.GridPushPinLeftIcon
};
const materialSlots = (0, _extends2.default)({}, iconSlots);
var _default = materialSlots;
exports.default = _default;