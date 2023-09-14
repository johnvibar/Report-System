"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowReorderCell = GridRowReorderCell;
exports.renderRowReorderCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useUtilityClasses = ownerState => {
  const {
    isDraggable,
    classes
  } = ownerState;
  const slots = {
    root: ['rowReorderCell', isDraggable && 'rowReorderCell--draggable'],
    placeholder: ['rowReorderCellPlaceholder']
  };
  return (0, _utils.unstable_composeClasses)(slots, _xDataGrid.getDataGridUtilityClass, classes);
};
function GridRowReorderCell(params) {
  const apiRef = (0, _xDataGrid.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const sortModel = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridSortModelSelector);
  const treeDepth = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridRowMaximumTreeDepthSelector);
  const editRowsState = (0, _xDataGrid.useGridSelector)(apiRef, _internals.gridEditRowsStateSelector);
  // eslint-disable-next-line no-underscore-dangle
  const cellValue = params.row.__reorder__ || params.id;

  // TODO: remove sortModel and treeDepth checks once row reorder is compatible
  const isDraggable = React.useMemo(() => !!rootProps.rowReordering && !sortModel.length && treeDepth === 1 && Object.keys(editRowsState).length === 0, [rootProps.rowReordering, sortModel, treeDepth, editRowsState]);
  const ownerState = {
    isDraggable,
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const publish = React.useCallback((eventName, propHandler) => event => {
    // Ignore portal
    // The target is not an element when triggered by a Select inside the cell
    // See https://github.com/mui/material-ui/issues/10534
    if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
      return;
    }

    // The row might have been deleted
    if (!apiRef.current.getRow(params.id)) {
      return;
    }
    apiRef.current.publishEvent(eventName, apiRef.current.getRowParams(params.id), event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, params.id]);
  const draggableEventHandlers = isDraggable ? {
    onDragStart: publish('rowDragStart'),
    onDragOver: publish('rowDragOver'),
    onDragEnd: publish('rowDragEnd')
  } : null;
  if (params.rowNode.type === 'footer') {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    className: classes.root,
    draggable: isDraggable
  }, draggableEventHandlers, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.rowReorderIcon, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: classes.placeholder,
      children: cellValue
    })]
  }));
}
const renderRowReorderCell = params => {
  if (params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridRowReorderCell, (0, _extends2.default)({}, params));
};
exports.renderRowReorderCell = renderRowReorderCell;