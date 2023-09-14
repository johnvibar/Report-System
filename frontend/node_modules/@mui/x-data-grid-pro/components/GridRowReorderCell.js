import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { gridRowMaximumTreeDepthSelector, gridSortModelSelector, useGridApiContext, useGridSelector, getDataGridUtilityClass } from '@mui/x-data-grid';
import { gridEditRowsStateSelector } from '@mui/x-data-grid/internals';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    isDraggable,
    classes
  } = ownerState;
  const slots = {
    root: ['rowReorderCell', isDraggable && 'rowReorderCell--draggable'],
    placeholder: ['rowReorderCellPlaceholder']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridRowReorderCell(params) {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const sortModel = useGridSelector(apiRef, gridSortModelSelector);
  const treeDepth = useGridSelector(apiRef, gridRowMaximumTreeDepthSelector);
  const editRowsState = useGridSelector(apiRef, gridEditRowsStateSelector);
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
export const renderRowReorderCell = params => {
  if (params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
    return null;
  }
  return /*#__PURE__*/_jsx(GridRowReorderCell, _extends({}, params));
};