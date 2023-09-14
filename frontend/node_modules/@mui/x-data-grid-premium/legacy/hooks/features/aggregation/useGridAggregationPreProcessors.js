import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import { gridColumnLookupSelector } from '@mui/x-data-grid-pro';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid-pro/internals';
import { getAvailableAggregationFunctions, addFooterRows, getAggregationRules, mergeStateWithAggregationModel } from './gridAggregationUtils';
import { wrapColumnWithAggregationValue, unwrapColumnFromAggregation } from './wrapColumnWithAggregation';
import { gridAggregationModelSelector } from './gridAggregationSelectors';
export var useGridAggregationPreProcessors = function useGridAggregationPreProcessors(apiRef, props) {
  // apiRef.current.caches.aggregation.rulesOnLastColumnHydration is not used because by the time
  // that the pre-processor is called it will already have been updated with the current rules.
  var rulesOnLastColumnHydration = React.useRef({});
  var updateAggregatedColumns = React.useCallback(function (columnsState) {
    var aggregationRules = props.disableAggregation ? {} : getAggregationRules({
      columnsLookup: columnsState.lookup,
      aggregationModel: gridAggregationModelSelector(apiRef),
      aggregationFunctions: props.aggregationFunctions
    });
    columnsState.orderedFields.forEach(function (field) {
      var shouldHaveAggregationValue = !!aggregationRules[field];
      var haveAggregationColumnValue = !!rulesOnLastColumnHydration.current[field];
      var column = columnsState.lookup[field];
      if (haveAggregationColumnValue) {
        column = unwrapColumnFromAggregation({
          column: column
        });
      }
      if (shouldHaveAggregationValue) {
        column = wrapColumnWithAggregationValue({
          column: column,
          aggregationRule: aggregationRules[field],
          apiRef: apiRef
        });
      }
      columnsState.lookup[field] = column;
    });
    rulesOnLastColumnHydration.current = aggregationRules;
    return columnsState;
  }, [apiRef, props.aggregationFunctions, props.disableAggregation]);
  var addGroupFooterRows = React.useCallback(function (value) {
    var aggregationRules = props.disableAggregation ? {} : getAggregationRules({
      columnsLookup: gridColumnLookupSelector(apiRef),
      aggregationModel: gridAggregationModelSelector(apiRef),
      aggregationFunctions: props.aggregationFunctions
    });
    var hasAggregationRule = Object.keys(aggregationRules).length > 0;

    // If we did not have any aggregation footer before, and we still don't have any,
    // Then we can skip this step
    if (Object.keys(apiRef.current.caches.aggregation.rulesOnLastRowHydration).length === 0 && !hasAggregationRule) {
      return value;
    }
    apiRef.current.caches.aggregation.rulesOnLastRowHydration = aggregationRules;
    return addFooterRows({
      apiRef: apiRef,
      groupingParams: value,
      getAggregationPosition: props.getAggregationPosition,
      hasAggregationRule: hasAggregationRule
    });
  }, [apiRef, props.disableAggregation, props.getAggregationPosition, props.aggregationFunctions]);
  var addColumnMenuButtons = React.useCallback(function (columnMenuItems, colDef) {
    if (props.disableAggregation) {
      return columnMenuItems;
    }
    var availableAggregationFunctions = getAvailableAggregationFunctions({
      aggregationFunctions: props.aggregationFunctions,
      colDef: colDef
    });
    if (availableAggregationFunctions.length === 0) {
      return columnMenuItems;
    }
    return [].concat(_toConsumableArray(columnMenuItems), ['columnMenuAggregationItem']);
  }, [props.aggregationFunctions, props.disableAggregation]);
  var stateExportPreProcessing = React.useCallback(function (prevState) {
    if (props.disableAggregation) {
      return prevState;
    }
    var aggregationModelToExport = gridAggregationModelSelector(apiRef);
    if (Object.values(aggregationModelToExport).length === 0) {
      return prevState;
    }
    return _extends({}, prevState, {
      aggregation: {
        model: aggregationModelToExport
      }
    });
  }, [apiRef, props.disableAggregation]);
  var stateRestorePreProcessing = React.useCallback(function (params, context) {
    var _context$stateToResto;
    if (props.disableAggregation) {
      return params;
    }
    var aggregationModel = (_context$stateToResto = context.stateToRestore.aggregation) == null ? void 0 : _context$stateToResto.model;
    if (aggregationModel != null) {
      apiRef.current.setState(mergeStateWithAggregationModel(aggregationModel));
    }
    return params;
  }, [apiRef, props.disableAggregation]);
  useGridRegisterPipeProcessor(apiRef, 'hydrateColumns', updateAggregatedColumns);
  useGridRegisterPipeProcessor(apiRef, 'hydrateRows', addGroupFooterRows);
  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuButtons);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
};