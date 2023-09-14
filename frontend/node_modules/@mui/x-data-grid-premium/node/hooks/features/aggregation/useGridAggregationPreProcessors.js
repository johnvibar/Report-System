"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridAggregationPreProcessors = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _internals = require("@mui/x-data-grid-pro/internals");
var _gridAggregationUtils = require("./gridAggregationUtils");
var _wrapColumnWithAggregation = require("./wrapColumnWithAggregation");
var _gridAggregationSelectors = require("./gridAggregationSelectors");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useGridAggregationPreProcessors = (apiRef, props) => {
  // apiRef.current.caches.aggregation.rulesOnLastColumnHydration is not used because by the time
  // that the pre-processor is called it will already have been updated with the current rules.
  const rulesOnLastColumnHydration = React.useRef({});
  const updateAggregatedColumns = React.useCallback(columnsState => {
    const aggregationRules = props.disableAggregation ? {} : (0, _gridAggregationUtils.getAggregationRules)({
      columnsLookup: columnsState.lookup,
      aggregationModel: (0, _gridAggregationSelectors.gridAggregationModelSelector)(apiRef),
      aggregationFunctions: props.aggregationFunctions
    });
    columnsState.orderedFields.forEach(field => {
      const shouldHaveAggregationValue = !!aggregationRules[field];
      const haveAggregationColumnValue = !!rulesOnLastColumnHydration.current[field];
      let column = columnsState.lookup[field];
      if (haveAggregationColumnValue) {
        column = (0, _wrapColumnWithAggregation.unwrapColumnFromAggregation)({
          column
        });
      }
      if (shouldHaveAggregationValue) {
        column = (0, _wrapColumnWithAggregation.wrapColumnWithAggregationValue)({
          column,
          aggregationRule: aggregationRules[field],
          apiRef
        });
      }
      columnsState.lookup[field] = column;
    });
    rulesOnLastColumnHydration.current = aggregationRules;
    return columnsState;
  }, [apiRef, props.aggregationFunctions, props.disableAggregation]);
  const addGroupFooterRows = React.useCallback(value => {
    const aggregationRules = props.disableAggregation ? {} : (0, _gridAggregationUtils.getAggregationRules)({
      columnsLookup: (0, _xDataGridPro.gridColumnLookupSelector)(apiRef),
      aggregationModel: (0, _gridAggregationSelectors.gridAggregationModelSelector)(apiRef),
      aggregationFunctions: props.aggregationFunctions
    });
    const hasAggregationRule = Object.keys(aggregationRules).length > 0;

    // If we did not have any aggregation footer before, and we still don't have any,
    // Then we can skip this step
    if (Object.keys(apiRef.current.caches.aggregation.rulesOnLastRowHydration).length === 0 && !hasAggregationRule) {
      return value;
    }
    apiRef.current.caches.aggregation.rulesOnLastRowHydration = aggregationRules;
    return (0, _gridAggregationUtils.addFooterRows)({
      apiRef,
      groupingParams: value,
      getAggregationPosition: props.getAggregationPosition,
      hasAggregationRule
    });
  }, [apiRef, props.disableAggregation, props.getAggregationPosition, props.aggregationFunctions]);
  const addColumnMenuButtons = React.useCallback((columnMenuItems, colDef) => {
    if (props.disableAggregation) {
      return columnMenuItems;
    }
    const availableAggregationFunctions = (0, _gridAggregationUtils.getAvailableAggregationFunctions)({
      aggregationFunctions: props.aggregationFunctions,
      colDef
    });
    if (availableAggregationFunctions.length === 0) {
      return columnMenuItems;
    }
    return [...columnMenuItems, 'columnMenuAggregationItem'];
  }, [props.aggregationFunctions, props.disableAggregation]);
  const stateExportPreProcessing = React.useCallback(prevState => {
    if (props.disableAggregation) {
      return prevState;
    }
    const aggregationModelToExport = (0, _gridAggregationSelectors.gridAggregationModelSelector)(apiRef);
    if (Object.values(aggregationModelToExport).length === 0) {
      return prevState;
    }
    return (0, _extends2.default)({}, prevState, {
      aggregation: {
        model: aggregationModelToExport
      }
    });
  }, [apiRef, props.disableAggregation]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    if (props.disableAggregation) {
      return params;
    }
    const aggregationModel = context.stateToRestore.aggregation?.model;
    if (aggregationModel != null) {
      apiRef.current.setState((0, _gridAggregationUtils.mergeStateWithAggregationModel)(aggregationModel));
    }
    return params;
  }, [apiRef, props.disableAggregation]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'hydrateColumns', updateAggregatedColumns);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'hydrateRows', addGroupFooterRows);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'columnMenu', addColumnMenuButtons);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);
};
exports.useGridAggregationPreProcessors = useGridAggregationPreProcessors;