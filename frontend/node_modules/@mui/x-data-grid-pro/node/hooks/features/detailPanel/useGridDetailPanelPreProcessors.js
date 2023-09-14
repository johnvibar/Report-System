"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridDetailPanelPreProcessors = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _gridDetailPanelToggleColDef = require("./gridDetailPanelToggleColDef");
var _gridDetailPanelSelector = require("./gridDetailPanelSelector");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useGridDetailPanelPreProcessors = (privateApiRef, props) => {
  const addToggleColumn = React.useCallback(columnsState => {
    if (props.getDetailPanelContent == null) {
      // Remove the toggle column, when it exists
      if (columnsState.lookup[_gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD]) {
        delete columnsState.lookup[_gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD];
        columnsState.orderedFields = columnsState.orderedFields.filter(field => field !== _gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD);
      }
      return columnsState;
    }

    // Don't add the toggle column if there's already one
    // The user might have manually added it to have it in a custom position
    if (columnsState.lookup[_gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD]) {
      return columnsState;
    }

    // Otherwise, add the toggle column at the beginning
    columnsState.orderedFields = [_gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD, ...columnsState.orderedFields];
    columnsState.lookup[_gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD] = (0, _extends2.default)({}, _gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_COL_DEF, {
      headerName: privateApiRef.current.getLocaleText('detailPanelToggle')
    });
    return columnsState;
  }, [privateApiRef, props.getDetailPanelContent]);
  const addExpandedClassToRow = React.useCallback((classes, id) => {
    if (props.getDetailPanelContent == null) {
      return classes;
    }
    const expandedRowIds = (0, _gridDetailPanelSelector.gridDetailPanelExpandedRowIdsSelector)(privateApiRef.current.state);
    if (!expandedRowIds.includes(id)) {
      return classes;
    }
    return [...classes, _xDataGrid.gridClasses['row--detailPanelExpanded']];
  }, [privateApiRef, props.getDetailPanelContent]);
  (0, _internals.useGridRegisterPipeProcessor)(privateApiRef, 'hydrateColumns', addToggleColumn);
  (0, _internals.useGridRegisterPipeProcessor)(privateApiRef, 'rowClassName', addExpandedClassToRow);
};
exports.useGridDetailPanelPreProcessors = useGridDetailPanelPreProcessors;