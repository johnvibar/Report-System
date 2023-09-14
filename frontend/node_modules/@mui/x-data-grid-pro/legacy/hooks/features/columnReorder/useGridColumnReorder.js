import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useTheme } from '@mui/material/styles';
import { useGridApiEventHandler, getDataGridUtilityClass, useGridLogger, useGridApiOptionHandler } from '@mui/x-data-grid';
import { gridColumnReorderDragColSelector } from './columnReorderSelector';
var CURSOR_MOVE_DIRECTION_LEFT = 'left';
var CURSOR_MOVE_DIRECTION_RIGHT = 'right';
var getCursorMoveDirectionX = function getCursorMoveDirectionX(currentCoordinates, nextCoordinates) {
  return currentCoordinates.x <= nextCoordinates.x ? CURSOR_MOVE_DIRECTION_RIGHT : CURSOR_MOVE_DIRECTION_LEFT;
};
var hasCursorPositionChanged = function hasCursorPositionChanged(currentCoordinates, nextCoordinates) {
  return currentCoordinates.x !== nextCoordinates.x || currentCoordinates.y !== nextCoordinates.y;
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    columnHeaderDragging: ['columnHeader--dragging']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
export var columnReorderStateInitializer = function columnReorderStateInitializer(state) {
  return _extends({}, state, {
    columnReorder: {
      dragCol: ''
    }
  });
};

/**
 * @requires useGridColumns (method)
 */
export var useGridColumnReorder = function useGridColumnReorder(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useGridColumnReorder');
  var dragColNode = React.useRef(null);
  var cursorPosition = React.useRef({
    x: 0,
    y: 0
  });
  var originColumnIndex = React.useRef(null);
  var forbiddenIndexes = React.useRef({});
  var removeDnDStylesTimeout = React.useRef();
  var ownerState = {
    classes: props.classes
  };
  var classes = useUtilityClasses(ownerState);
  var theme = useTheme();
  React.useEffect(function () {
    return function () {
      clearTimeout(removeDnDStylesTimeout.current);
    };
  }, []);
  var handleDragStart = React.useCallback(function (params, event) {
    if (props.disableColumnReorder || params.colDef.disableReorder) {
      return;
    }
    logger.debug("Start dragging col ".concat(params.field));
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    dragColNode.current = event.currentTarget;
    dragColNode.current.classList.add(classes.columnHeaderDragging);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        columnReorder: _extends({}, state.columnReorder, {
          dragCol: params.field
        })
      });
    });
    apiRef.current.forceUpdate();
    removeDnDStylesTimeout.current = setTimeout(function () {
      dragColNode.current.classList.remove(classes.columnHeaderDragging);
    });
    originColumnIndex.current = apiRef.current.getColumnIndex(params.field, false);
    var draggingColumnGroupPath = apiRef.current.unstable_getColumnGroupPath(params.field);
    var columnIndex = originColumnIndex.current;
    var allColumns = apiRef.current.getAllColumns();
    var groupsLookup = apiRef.current.unstable_getAllGroupDetails();
    var getGroupPathFromColumnIndex = function getGroupPathFromColumnIndex(colIndex) {
      var field = allColumns[colIndex].field;
      return apiRef.current.unstable_getColumnGroupPath(field);
    };

    // The limitingGroupId is the id of the group from which the dragged column should not escape
    var limitingGroupId = null;
    draggingColumnGroupPath.forEach(function (groupId) {
      var _groupsLookup$groupId;
      if (!((_groupsLookup$groupId = groupsLookup[groupId]) != null && _groupsLookup$groupId.freeReordering)) {
        // Only consider group that are made of more than one column
        if (columnIndex > 0 && getGroupPathFromColumnIndex(columnIndex - 1).includes(groupId)) {
          limitingGroupId = groupId;
        } else if (columnIndex + 1 < allColumns.length && getGroupPathFromColumnIndex(columnIndex + 1).includes(groupId)) {
          limitingGroupId = groupId;
        }
      }
    });
    forbiddenIndexes.current = {};
    var _loop = function _loop(indexToForbid) {
      var leftIndex = indexToForbid <= columnIndex ? indexToForbid - 1 : indexToForbid;
      var rightIndex = indexToForbid < columnIndex ? indexToForbid : indexToForbid + 1;
      if (limitingGroupId !== null) {
        // verify this indexToForbid will be linked to the limiting group. Otherwise forbid it
        var allowIndex = false;
        if (leftIndex >= 0 && getGroupPathFromColumnIndex(leftIndex).includes(limitingGroupId)) {
          allowIndex = true;
        } else if (rightIndex < allColumns.length && getGroupPathFromColumnIndex(rightIndex).includes(limitingGroupId)) {
          allowIndex = true;
        }
        if (!allowIndex) {
          forbiddenIndexes.current[indexToForbid] = true;
        }
      }

      // Verify we are not splitting another group
      if (leftIndex >= 0 && rightIndex < allColumns.length) {
        getGroupPathFromColumnIndex(rightIndex).forEach(function (groupId) {
          if (getGroupPathFromColumnIndex(leftIndex).includes(groupId)) {
            if (!draggingColumnGroupPath.includes(groupId)) {
              var _groupsLookup$groupId2;
              // moving here split the group groupId in two distincts chunks
              if (!((_groupsLookup$groupId2 = groupsLookup[groupId]) != null && _groupsLookup$groupId2.freeReordering)) {
                forbiddenIndexes.current[indexToForbid] = true;
              }
            }
          }
        });
      }
    };
    for (var indexToForbid = 0; indexToForbid < allColumns.length; indexToForbid += 1) {
      _loop(indexToForbid);
    }
  }, [props.disableColumnReorder, classes.columnHeaderDragging, logger, apiRef]);
  var handleDragEnter = React.useCallback(function (params, event) {
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
  }, []);
  var handleDragOver = React.useCallback(function (params, event) {
    var dragColField = gridColumnReorderDragColSelector(apiRef);
    if (!dragColField) {
      return;
    }
    logger.debug("Dragging over col ".concat(params.field));
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    var coordinates = {
      x: event.clientX,
      y: event.clientY
    };
    if (params.field !== dragColField && hasCursorPositionChanged(cursorPosition.current, coordinates)) {
      var targetColIndex = apiRef.current.getColumnIndex(params.field, false);
      var targetColVisibleIndex = apiRef.current.getColumnIndex(params.field, true);
      var targetCol = apiRef.current.getColumn(params.field);
      var dragColIndex = apiRef.current.getColumnIndex(dragColField, false);
      var visibleColumns = apiRef.current.getVisibleColumns();
      var allColumns = apiRef.current.getAllColumns();
      var cursorMoveDirectionX = getCursorMoveDirectionX(cursorPosition.current, coordinates);
      var hasMovedLeft = cursorMoveDirectionX === CURSOR_MOVE_DIRECTION_LEFT && (theme.direction === 'rtl' ? dragColIndex < targetColIndex : targetColIndex < dragColIndex);
      var hasMovedRight = cursorMoveDirectionX === CURSOR_MOVE_DIRECTION_RIGHT && (theme.direction === 'rtl' ? targetColIndex < dragColIndex : dragColIndex < targetColIndex);
      if (hasMovedLeft || hasMovedRight) {
        var canBeReordered;
        var indexOffsetInHiddenColumns = 0;
        if (!targetCol.disableReorder) {
          canBeReordered = true;
        } else if (hasMovedLeft) {
          canBeReordered = targetColVisibleIndex > 0 && !visibleColumns[targetColVisibleIndex - 1].disableReorder;
        } else {
          canBeReordered = targetColVisibleIndex < visibleColumns.length - 1 && !visibleColumns[targetColVisibleIndex + 1].disableReorder;
        }
        if (forbiddenIndexes.current[targetColIndex]) {
          var nextVisibleColumnField;
          var indexWithOffset = targetColIndex + indexOffsetInHiddenColumns;
          if (hasMovedLeft) {
            nextVisibleColumnField = targetColVisibleIndex > 0 ? visibleColumns[targetColVisibleIndex - 1].field : null;
            while (indexWithOffset > 0 && allColumns[indexWithOffset].field !== nextVisibleColumnField && forbiddenIndexes.current[indexWithOffset]) {
              indexOffsetInHiddenColumns -= 1;
              indexWithOffset = targetColIndex + indexOffsetInHiddenColumns;
            }
          } else {
            nextVisibleColumnField = targetColVisibleIndex + 1 < visibleColumns.length ? visibleColumns[targetColVisibleIndex + 1].field : null;
            while (indexWithOffset < allColumns.length - 1 && allColumns[indexWithOffset].field !== nextVisibleColumnField && forbiddenIndexes.current[indexWithOffset]) {
              indexOffsetInHiddenColumns += 1;
              indexWithOffset = targetColIndex + indexOffsetInHiddenColumns;
            }
          }
          if (forbiddenIndexes.current[indexWithOffset] || allColumns[indexWithOffset].field === nextVisibleColumnField) {
            // If we ended up on a visible column, or a forbidden one, we can not do the reorder
            canBeReordered = false;
          }
        }
        var canBeReorderedProcessed = apiRef.current.unstable_applyPipeProcessors('canBeReordered', canBeReordered, {
          targetIndex: targetColVisibleIndex
        });
        if (canBeReorderedProcessed) {
          apiRef.current.setColumnIndex(dragColField, targetColIndex + indexOffsetInHiddenColumns);
        }
      }
      cursorPosition.current = coordinates;
    }
  }, [apiRef, logger, theme.direction]);
  var handleDragEnd = React.useCallback(function (params, event) {
    var dragColField = gridColumnReorderDragColSelector(apiRef);
    if (props.disableColumnReorder || !dragColField) {
      return;
    }
    logger.debug('End dragging col');
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    clearTimeout(removeDnDStylesTimeout.current);
    dragColNode.current = null;

    // Check if the column was dropped outside the grid.
    if (event.dataTransfer.dropEffect === 'none' && !props.keepColumnPositionIfDraggedOutside) {
      // Accessing params.field may contain the wrong field as header elements are reused
      apiRef.current.setColumnIndex(dragColField, originColumnIndex.current);
      originColumnIndex.current = null;
    } else {
      // Emit the columnOrderChange event only once when the reordering stops.
      var columnOrderChangeParams = {
        column: apiRef.current.getColumn(dragColField),
        targetIndex: apiRef.current.getColumnIndexRelativeToVisibleColumns(dragColField),
        oldIndex: originColumnIndex.current
      };
      apiRef.current.publishEvent('columnOrderChange', columnOrderChangeParams);
    }
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        columnReorder: _extends({}, state.columnReorder, {
          dragCol: ''
        })
      });
    });
    apiRef.current.forceUpdate();
  }, [props.disableColumnReorder, props.keepColumnPositionIfDraggedOutside, logger, apiRef]);
  useGridApiEventHandler(apiRef, 'columnHeaderDragStart', handleDragStart);
  useGridApiEventHandler(apiRef, 'columnHeaderDragEnter', handleDragEnter);
  useGridApiEventHandler(apiRef, 'columnHeaderDragOver', handleDragOver);
  useGridApiEventHandler(apiRef, 'columnHeaderDragEnd', handleDragEnd);
  useGridApiEventHandler(apiRef, 'cellDragEnter', handleDragEnter);
  useGridApiEventHandler(apiRef, 'cellDragOver', handleDragOver);
  useGridApiOptionHandler(apiRef, 'columnOrderChange', props.onColumnOrderChange);
};