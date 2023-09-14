"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowReorderPreProcessors = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _gridRowReorderColDef = require("./gridRowReorderColDef");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  return React.useMemo(() => {
    const slots = {
      rowReorderCellContainer: ['rowReorderCellContainer'],
      columnHeaderReorder: ['columnHeaderReorder']
    };
    return (0, _utils.unstable_composeClasses)(slots, _xDataGrid.getDataGridUtilityClass, classes);
  }, [classes]);
};
const useGridRowReorderPreProcessors = (privateApiRef, props) => {
  const ownerState = {
    classes: props.classes
  };
  const classes = useUtilityClasses(ownerState);
  const updateReorderColumn = React.useCallback(columnsState => {
    const reorderColumn = (0, _extends2.default)({}, _gridRowReorderColDef.GRID_REORDER_COL_DEF, {
      cellClassName: classes.rowReorderCellContainer,
      headerClassName: classes.columnHeaderReorder,
      headerName: privateApiRef.current.getLocaleText('rowReorderingHeaderName')
    });
    const shouldHaveReorderColumn = props.rowReordering;
    const haveReorderColumn = columnsState.lookup[reorderColumn.field] != null;
    if (shouldHaveReorderColumn && haveReorderColumn) {
      return columnsState;
    }
    if (shouldHaveReorderColumn && !haveReorderColumn) {
      columnsState.lookup[reorderColumn.field] = reorderColumn;
      columnsState.orderedFields = [reorderColumn.field, ...columnsState.orderedFields];
    } else if (!shouldHaveReorderColumn && haveReorderColumn) {
      delete columnsState.lookup[reorderColumn.field];
      columnsState.orderedFields = columnsState.orderedFields.filter(field => field !== reorderColumn.field);
    }
    return columnsState;
  }, [privateApiRef, classes, props.rowReordering]);
  (0, _internals.useGridRegisterPipeProcessor)(privateApiRef, 'hydrateColumns', updateReorderColumn);
};
exports.useGridRowReorderPreProcessors = useGridRowReorderPreProcessors;