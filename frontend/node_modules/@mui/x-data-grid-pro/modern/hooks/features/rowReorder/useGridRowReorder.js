import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridLogger, useGridApiEventHandler, getDataGridUtilityClass, useGridSelector, gridSortModelSelector, gridRowMaximumTreeDepthSelector, useGridApiOptionHandler } from '@mui/x-data-grid';
import { gridEditRowsStateSelector } from '@mui/x-data-grid/internals';
import { GRID_REORDER_COL_DEF } from './gridRowReorderColDef';
var Direction = /*#__PURE__*/function (Direction) {
  Direction[Direction["UP"] = 0] = "UP";
  Direction[Direction["DOWN"] = 1] = "DOWN";
  return Direction;
}(Direction || {});
let previousMousePosition = null;
let previousReorderState = {
  previousTargetId: null,
  dragDirection: null
};
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    rowDragging: ['row--dragging']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

/**
 * Only available in DataGridPro
 * @requires useGridRows (method)
 */
export const useGridRowReorder = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useGridRowReorder');
  const sortModel = useGridSelector(apiRef, gridSortModelSelector);
  const treeDepth = useGridSelector(apiRef, gridRowMaximumTreeDepthSelector);
  const dragRowNode = React.useRef(null);
  const originRowIndex = React.useRef(null);
  const removeDnDStylesTimeout = React.useRef();
  const ownerState = {
    classes: props.classes
  };
  const classes = useUtilityClasses(ownerState);
  const [dragRowId, setDragRowId] = React.useState('');
  React.useEffect(() => {
    return () => {
      clearTimeout(removeDnDStylesTimeout.current);
    };
  }, []);

  // TODO: remove sortModel check once row reorder is sorting compatible
  // remove treeDepth once row reorder is tree compatible
  const isRowReorderDisabled = React.useMemo(() => {
    return !props.rowReordering || !!sortModel.length || treeDepth !== 1;
  }, [props.rowReordering, sortModel, treeDepth]);
  const handleDragStart = React.useCallback((params, event) => {
    // Call the gridEditRowsStateSelector directly to avoid infnite loop
    const editRowsState = gridEditRowsStateSelector(apiRef.current.state);
    if (isRowReorderDisabled || Object.keys(editRowsState).length !== 0) {
      return;
    }
    logger.debug(`Start dragging row ${params.id}`);
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    dragRowNode.current = event.currentTarget;
    dragRowNode.current.classList.add(classes.rowDragging);
    setDragRowId(params.id);
    removeDnDStylesTimeout.current = setTimeout(() => {
      dragRowNode.current.classList.remove(classes.rowDragging);
    });
    originRowIndex.current = apiRef.current.getRowIndexRelativeToVisibleRows(params.id);
    apiRef.current.setCellFocus(params.id, GRID_REORDER_COL_DEF.field);
  }, [isRowReorderDisabled, classes.rowDragging, logger, apiRef]);
  const handleDragOver = React.useCallback((params, event) => {
    if (dragRowId === '') {
      return;
    }
    const rowNode = apiRef.current.getRowNode(params.id);
    if (!rowNode || rowNode.type === 'footer' || rowNode.type === 'pinnedRow') {
      return;
    }
    logger.debug(`Dragging over row ${params.id}`);
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    const mouseMovementDiff = previousMousePosition ? previousMousePosition.y - event.clientY : event.clientY;
    if (params.id !== dragRowId) {
      const targetRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(params.id);
      const dragDirection = mouseMovementDiff > 0 ? Direction.DOWN : Direction.UP;
      const currentReorderState = {
        dragDirection,
        previousTargetId: params.id
      };
      const isStateChanged = currentReorderState.dragDirection !== previousReorderState.dragDirection || currentReorderState.previousTargetId !== previousReorderState.previousTargetId;
      if (previousReorderState.dragDirection === null || Math.abs(mouseMovementDiff) >= 1 && isStateChanged) {
        apiRef.current.setRowIndex(dragRowId, targetRowIndex);
        previousReorderState = currentReorderState;
      }
    }
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }, [apiRef, logger, dragRowId]);
  const handleDragEnd = React.useCallback((params, event) => {
    // Call the gridEditRowsStateSelector directly to avoid infnite loop
    const editRowsState = gridEditRowsStateSelector(apiRef.current.state);
    if (dragRowId === '' || isRowReorderDisabled || Object.keys(editRowsState).length !== 0) {
      return;
    }
    logger.debug('End dragging row');
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    clearTimeout(removeDnDStylesTimeout.current);
    dragRowNode.current = null;
    previousReorderState.dragDirection = null;

    // Check if the row was dropped outside the grid.
    if (event.dataTransfer.dropEffect === 'none') {
      // Accessing params.field may contain the wrong field as header elements are reused
      apiRef.current.setRowIndex(dragRowId, originRowIndex.current);
      originRowIndex.current = null;
    } else {
      // Emit the rowOrderChange event only once when the reordering stops.
      const rowOrderChangeParams = {
        row: apiRef.current.getRow(dragRowId),
        targetIndex: apiRef.current.getRowIndexRelativeToVisibleRows(params.id),
        oldIndex: originRowIndex.current
      };
      apiRef.current.publishEvent('rowOrderChange', rowOrderChangeParams);
    }
    setDragRowId('');
  }, [isRowReorderDisabled, logger, apiRef, dragRowId]);
  useGridApiEventHandler(apiRef, 'rowDragStart', handleDragStart);
  useGridApiEventHandler(apiRef, 'rowDragOver', handleDragOver);
  useGridApiEventHandler(apiRef, 'rowDragEnd', handleDragEnd);
  useGridApiEventHandler(apiRef, 'cellDragOver', handleDragOver);
  useGridApiOptionHandler(apiRef, 'rowOrderChange', props.onRowOrderChange);
};