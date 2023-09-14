"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM = exports.GRID_COLUMN_MENU_SLOTS_PREMIUM = void 0;
exports.GridColumnMenuGroupingItem = GridColumnMenuGroupingItem;
exports.GridPremiumColumnMenu = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _GridColumnMenuAggregationItem = require("./GridColumnMenuAggregationItem");
var _rowGrouping = require("../hooks/features/rowGrouping");
var _GridColumnMenuRowGroupItem = require("./GridColumnMenuRowGroupItem");
var _GridColumnMenuRowUngroupItem = require("./GridColumnMenuRowUngroupItem");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function GridColumnMenuGroupingItem(props) {
  const {
    colDef
  } = props;
  if ((0, _rowGrouping.isGroupingColumn)(colDef.field)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnMenuRowGroupItem.GridColumnMenuRowGroupItem, (0, _extends2.default)({}, props));
  }
  if (colDef.groupable) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnMenuRowUngroupItem.GridColumnMenuRowUngroupItem, (0, _extends2.default)({}, props));
  }
  return null;
}
const GRID_COLUMN_MENU_SLOTS_PREMIUM = (0, _extends2.default)({}, _xDataGridPro.GRID_COLUMN_MENU_SLOTS, {
  columnMenuAggregationItem: _GridColumnMenuAggregationItem.GridColumnMenuAggregationItem,
  columnMenuGroupingItem: GridColumnMenuGroupingItem
});
exports.GRID_COLUMN_MENU_SLOTS_PREMIUM = GRID_COLUMN_MENU_SLOTS_PREMIUM;
const GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM = (0, _extends2.default)({}, _xDataGridPro.GRID_COLUMN_MENU_SLOT_PROPS, {
  columnMenuAggregationItem: {
    displayOrder: 23
  },
  columnMenuGroupingItem: {
    displayOrder: 27
  }
});
exports.GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM = GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM;
const GridPremiumColumnMenu = /*#__PURE__*/React.forwardRef(function GridPremiumColumnMenuSimple(props, ref) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_xDataGridPro.GridGenericColumnMenu, (0, _extends2.default)({
    ref: ref
  }, props, {
    defaultSlots: GRID_COLUMN_MENU_SLOTS_PREMIUM,
    defaultSlotProps: GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM
  }));
});
exports.GridPremiumColumnMenu = GridPremiumColumnMenu;
process.env.NODE_ENV !== "production" ? GridPremiumColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  hideMenu: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool.isRequired
} : void 0;