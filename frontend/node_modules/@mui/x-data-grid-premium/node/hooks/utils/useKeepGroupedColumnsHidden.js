"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeepGroupedColumnsHidden = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const updateColumnVisibilityModel = (columnVisibilityModel, rowGroupingModel, prevRowGroupingModel) => {
  const newColumnVisibilityModel = (0, _extends2.default)({}, columnVisibilityModel);
  rowGroupingModel?.forEach(field => {
    if (!prevRowGroupingModel?.includes(field)) {
      newColumnVisibilityModel[field] = false;
    }
  });
  prevRowGroupingModel?.forEach(field => {
    if (!rowGroupingModel?.includes(field)) {
      newColumnVisibilityModel[field] = true;
    }
  });
  return newColumnVisibilityModel;
};

/**
 * Automatically hide columns when added to the row grouping model and stop hiding them when they are removed.
 * Handles both the `props.initialState.rowGrouping.model` and `props.rowGroupingModel`
 * Does not work when used with the `hide` property of `GridColDef`
 */
const useKeepGroupedColumnsHidden = props => {
  const initialProps = React.useRef(props);
  const rowGroupingModel = React.useRef(props.rowGroupingModel ?? props.initialState?.rowGrouping?.model);
  React.useEffect(() => {
    props.apiRef.current.subscribeEvent('rowGroupingModelChange', newModel => {
      const columnVisibilityModel = updateColumnVisibilityModel((0, _xDataGridPro.gridColumnVisibilityModelSelector)(props.apiRef), newModel, rowGroupingModel.current);
      props.apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
      rowGroupingModel.current = newModel;
    });
  }, [props.apiRef]);
  return React.useMemo(() => {
    const invariantInitialState = initialProps.current.initialState;
    const columnVisibilityModel = updateColumnVisibilityModel(invariantInitialState?.columns?.columnVisibilityModel, rowGroupingModel.current, undefined);
    return (0, _extends2.default)({}, invariantInitialState, {
      columns: (0, _extends2.default)({}, invariantInitialState?.columns, {
        columnVisibilityModel
      })
    });
  }, []);
};
exports.useKeepGroupedColumnsHidden = useKeepGroupedColumnsHidden;