import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { gridRowMaximumTreeDepthSelector, gridSortModelSelector, useGridApiContext, useGridSelector, getDataGridUtilityClass } from '@mui/x-data-grid';
import { gridEditRowsStateSelector } from '@mui/x-data-grid/internals';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var isDraggable = ownerState.isDraggable,
    classes = ownerState.classes;
  var slots = {
    root: ['rowReorderCell', isDraggable && 'rowReorderCell--draggable'],
    placeholder: ['rowReorderCellPlaceholder']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridRowReorderCell(params) {
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var sortModel = useGridSelector(apiRef, gridSortModelSelector);
  var treeDepth = useGridSelector(apiRef, gridRowMaximumTreeDepthSelector);
  var editRowsState = useGridSelector(apiRef, gridEditRowsStateSelector);
  // eslint-disable-next-line no-underscore-dangle
  var cellValue = params.row.__reorder__ || params.id;

  // TODO: remove sortModel and treeDepth checks once row reorder is compatible
  var isDraggable = React.useMemo(function () {
    return !!rootProps.rowReordering && !sortModel.length && treeDepth === 1 && Object.keys(editRowsState).length === 0;
  }, [rootProps.rowReordering, sortModel, treeDepth, editRowsState]);
  var ownerState = {
    isDraggable: isDraggable,
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var publish = React.useCallback(function (eventName, propHandler) {
    return function (event) {
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
    };
  }, [apiRef, params.id]);
  var draggableEventHandlers = isDraggable ? {
    onDragStart: publish('rowDragStart'),
    onDragOver: publish('rowDragOver'),
    onDragEnd: publish('rowDragEnd')
  } : null;
  if (params.rowNode.type === 'footer') {
    return null;
  }
  return /*#__PURE__*/_jsxs("div", _extends({
    className: classes.root,
    draggable: isDraggable
  }, draggableEventHandlers, {
    children: [/*#__PURE__*/_jsx(rootProps.slots.rowReorderIcon, {}), /*#__PURE__*/_jsx("div", {
      className: classes.placeholder,
      children: cellValue
    })]
  }));
}
export { GridRowReorderCell };
export var renderRowReorderCell = function renderRowReorderCell(params) {
  if (params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
    return null;
  }
  return /*#__PURE__*/_jsx(GridRowReorderCell, _extends({}, params));
};