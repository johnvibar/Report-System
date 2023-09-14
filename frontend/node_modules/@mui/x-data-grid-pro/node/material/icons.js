"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPushPinRightIcon = exports.GridPushPinLeftIcon = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/material/utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GridPushPinRightIcon = (0, _utils.createSvgIcon)( /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
  transform: "rotate(-30 15 10)",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M16,9V4l1,0c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3v0 c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3h0v2h5.97v7l1,1l1-1v-7H19v-2h0C17.34,12,16,10.66,16,9z",
    fillRule: "evenodd"
  })
}), 'PushPinRight');
exports.GridPushPinRightIcon = GridPushPinRightIcon;
const GridPushPinLeftIcon = (0, _utils.createSvgIcon)( /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
  transform: "rotate(30 8 12)",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M16,9V4l1,0c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3v0 c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3h0v2h5.97v7l1,1l1-1v-7H19v-2h0C17.34,12,16,10.66,16,9z",
    fillRule: "evenodd"
  })
}), 'PushPinLeft');
exports.GridPushPinLeftIcon = GridPushPinLeftIcon;