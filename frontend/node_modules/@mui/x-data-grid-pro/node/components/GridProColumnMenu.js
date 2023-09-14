"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridProColumnMenu = exports.GRID_COLUMN_MENU_SLOT_PROPS_PRO = exports.GRID_COLUMN_MENU_SLOTS_PRO = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _xDataGrid = require("@mui/x-data-grid");
var _GridColumnMenuPinningItem = require("./GridColumnMenuPinningItem");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GRID_COLUMN_MENU_SLOTS_PRO = (0, _extends2.default)({}, _xDataGrid.GRID_COLUMN_MENU_SLOTS, {
  columnMenuPinningItem: _GridColumnMenuPinningItem.GridColumnMenuPinningItem
});
exports.GRID_COLUMN_MENU_SLOTS_PRO = GRID_COLUMN_MENU_SLOTS_PRO;
const GRID_COLUMN_MENU_SLOT_PROPS_PRO = (0, _extends2.default)({}, _xDataGrid.GRID_COLUMN_MENU_SLOT_PROPS, {
  columnMenuPinningItem: {
    displayOrder: 15
  }
});
exports.GRID_COLUMN_MENU_SLOT_PROPS_PRO = GRID_COLUMN_MENU_SLOT_PROPS_PRO;
const GridProColumnMenu = /*#__PURE__*/React.forwardRef(function GridProColumnMenu(props, ref) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_xDataGrid.GridGenericColumnMenu, (0, _extends2.default)({
    ref: ref
  }, props, {
    defaultSlots: GRID_COLUMN_MENU_SLOTS_PRO,
    defaultSlotProps: GRID_COLUMN_MENU_SLOT_PROPS_PRO
  }));
});
exports.GridProColumnMenu = GridProColumnMenu;
process.env.NODE_ENV !== "production" ? GridProColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  hideMenu: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool.isRequired
} : void 0;