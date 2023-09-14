"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowGrouping = exports.rowGroupingStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _internals = require("@mui/x-data-grid-pro/internals");
var _gridRowGroupingSelector = require("./gridRowGroupingSelector");
var _gridRowGroupingUtils = require("./gridRowGroupingUtils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const rowGroupingStateInitializer = (state, props, apiRef) => {
  apiRef.current.caches.rowGrouping = {
    rulesOnLastRowTreeCreation: []
  };
  return (0, _extends2.default)({}, state, {
    rowGrouping: {
      model: props.rowGroupingModel ?? props.initialState?.rowGrouping?.model ?? []
    }
  });
};

/**
 * @requires useGridColumns (state, method) - can be after, async only
 * @requires useGridRows (state, method) - can be after, async only
 * @requires useGridParamsApi (method) - can be after, async only
 */
exports.rowGroupingStateInitializer = rowGroupingStateInitializer;
const useGridRowGrouping = (apiRef, props) => {
  apiRef.current.registerControlState({
    stateId: 'rowGrouping',
    propModel: props.rowGroupingModel,
    propOnChange: props.onRowGroupingModelChange,
    stateSelector: _gridRowGroupingSelector.gridRowGroupingModelSelector,
    changeEvent: 'rowGroupingModelChange'
  });

  /**
   * API METHODS
   */
  const setRowGroupingModel = React.useCallback(model => {
    const currentModel = (0, _gridRowGroupingSelector.gridRowGroupingModelSelector)(apiRef);
    if (currentModel !== model) {
      apiRef.current.setState((0, _gridRowGroupingUtils.mergeStateWithRowGroupingModel)(model));
      (0, _gridRowGroupingUtils.setStrategyAvailability)(apiRef, props.disableRowGrouping);
      apiRef.current.forceUpdate();
    }
  }, [apiRef, props.disableRowGrouping]);
  const addRowGroupingCriteria = React.useCallback((field, groupingIndex) => {
    const currentModel = (0, _gridRowGroupingSelector.gridRowGroupingModelSelector)(apiRef);
    if (currentModel.includes(field)) {
      return;
    }
    const cleanGroupingIndex = groupingIndex ?? currentModel.length;
    const updatedModel = [...currentModel.slice(0, cleanGroupingIndex), field, ...currentModel.slice(cleanGroupingIndex)];
    apiRef.current.setRowGroupingModel(updatedModel);
  }, [apiRef]);
  const removeRowGroupingCriteria = React.useCallback(field => {
    const currentModel = (0, _gridRowGroupingSelector.gridRowGroupingModelSelector)(apiRef);
    if (!currentModel.includes(field)) {
      return;
    }
    apiRef.current.setRowGroupingModel(currentModel.filter(el => el !== field));
  }, [apiRef]);
  const setRowGroupingCriteriaIndex = React.useCallback((field, targetIndex) => {
    const currentModel = (0, _gridRowGroupingSelector.gridRowGroupingModelSelector)(apiRef);
    const currentTargetIndex = currentModel.indexOf(field);
    if (currentTargetIndex === -1) {
      return;
    }
    const updatedModel = [...currentModel];
    updatedModel.splice(targetIndex, 0, updatedModel.splice(currentTargetIndex, 1)[0]);
    apiRef.current.setRowGroupingModel(updatedModel);
  }, [apiRef]);
  const rowGroupingApi = {
    setRowGroupingModel,
    addRowGroupingCriteria,
    removeRowGroupingCriteria,
    setRowGroupingCriteriaIndex
  };
  (0, _xDataGridPro.useGridApiMethod)(apiRef, rowGroupingApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const addColumnMenuButtons = React.useCallback((columnMenuItems, colDef) => {
    if (props.disableRowGrouping) {
      return columnMenuItems;
    }
    if ((0, _gridRowGroupingUtils.isGroupingColumn)(colDef.field) || colDef.groupable) {
      return [...columnMenuItems, 'columnMenuGroupingItem'];
    }
    return columnMenuItems;
  }, [props.disableRowGrouping]);
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const rowGroupingModelToExport = (0, _gridRowGroupingSelector.gridRowGroupingModelSelector)(apiRef);
    const shouldExportRowGroupingModel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the model is controlled
    props.rowGroupingModel != null ||
    // Always export if the model has been initialized
    props.initialState?.rowGrouping?.model != null ||
    // Export if the model is not empty
    Object.keys(rowGroupingModelToExport).length > 0;
    if (!shouldExportRowGroupingModel) {
      return prevState;
    }
    return (0, _extends2.default)({}, prevState, {
      rowGrouping: {
        model: rowGroupingModelToExport
      }
    });
  }, [apiRef, props.rowGroupingModel, props.initialState?.rowGrouping?.model]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    if (props.disableRowGrouping) {
      return params;
    }
    const rowGroupingModel = context.stateToRestore.rowGrouping?.model;
    if (rowGroupingModel != null) {
      apiRef.current.setState((0, _gridRowGroupingUtils.mergeStateWithRowGroupingModel)(rowGroupingModel));
    }
    return params;
  }, [apiRef, props.disableRowGrouping]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'columnMenu', addColumnMenuButtons);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);

  /**
   * EVENTS
   */
  const handleCellKeyDown = React.useCallback((params, event) => {
    const cellParams = apiRef.current.getCellParams(params.id, params.field);
    if ((0, _gridRowGroupingUtils.isGroupingColumn)(cellParams.field) && event.key === ' ' && !event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
      if (params.rowNode.type !== 'group') {
        return;
      }
      const isOnGroupingCell = props.rowGroupingColumnMode === 'single' || (0, _gridRowGroupingUtils.getRowGroupingFieldFromGroupingCriteria)(params.rowNode.groupingField) === params.field;
      if (!isOnGroupingCell) {
        return;
      }
      apiRef.current.setRowChildrenExpansion(params.id, !params.rowNode.childrenExpanded);
    }
  }, [apiRef, props.rowGroupingColumnMode]);
  const checkGroupingColumnsModelDiff = React.useCallback(() => {
    const sanitizedRowGroupingModel = (0, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector)(apiRef);
    const rulesOnLastRowTreeCreation = apiRef.current.caches.rowGrouping.rulesOnLastRowTreeCreation || [];
    const groupingRules = (0, _gridRowGroupingUtils.getGroupingRules)({
      sanitizedRowGroupingModel,
      columnsLookup: (0, _xDataGridPro.gridColumnLookupSelector)(apiRef)
    });
    if (!(0, _gridRowGroupingUtils.areGroupingRulesEqual)(rulesOnLastRowTreeCreation, groupingRules)) {
      apiRef.current.caches.rowGrouping.rulesOnLastRowTreeCreation = groupingRules;
      apiRef.current.requestPipeProcessorsApplication('hydrateColumns');
      (0, _gridRowGroupingUtils.setStrategyAvailability)(apiRef, props.disableRowGrouping);

      // Refresh the row tree creation strategy processing
      // TODO: Add a clean way to re-run a strategy processing without publishing a private event
      if (apiRef.current.getActiveStrategy('rowTree') === _gridRowGroupingUtils.ROW_GROUPING_STRATEGY) {
        apiRef.current.publishEvent('activeStrategyProcessorChange', 'rowTreeCreation');
      }
    }
  }, [apiRef, props.disableRowGrouping]);
  (0, _xDataGridPro.useGridApiEventHandler)(apiRef, 'cellKeyDown', handleCellKeyDown);
  (0, _xDataGridPro.useGridApiEventHandler)(apiRef, 'columnsChange', checkGroupingColumnsModelDiff);
  (0, _xDataGridPro.useGridApiEventHandler)(apiRef, 'rowGroupingModelChange', checkGroupingColumnsModelDiff);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (props.rowGroupingModel !== undefined) {
      apiRef.current.setRowGroupingModel(props.rowGroupingModel);
    }
  }, [apiRef, props.rowGroupingModel]);
};
exports.useGridRowGrouping = useGridRowGrouping;