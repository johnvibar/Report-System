import * as React from 'react';
import { useGridSelector, useGridApiEventHandler, useGridApiOptionHandler, gridVisibleColumnDefinitionsSelector, gridRowsMetaSelector } from '@mui/x-data-grid';
import { useGridVisibleRows } from '@mui/x-data-grid/internals';
/**
 * @requires useGridColumns (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export var useGridInfiniteLoader = function useGridInfiniteLoader(apiRef, props) {
  var visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  var currentPage = useGridVisibleRows(apiRef, props);
  var rowsMeta = useGridSelector(apiRef, gridRowsMetaSelector);
  var contentHeight = Math.max(rowsMeta.currentPageTotalHeight, 1);
  var isInScrollBottomArea = React.useRef(false);
  var handleRowsScrollEnd = React.useCallback(function (scrollPosition) {
    var dimensions = apiRef.current.getRootDimensions();

    // Prevent the infite loading working in combination with lazy loading
    if (!dimensions || props.rowsLoadingMode !== 'client') {
      return;
    }
    var scrollPositionBottom = scrollPosition.top + dimensions.viewportOuterSize.height;
    var viewportPageSize = apiRef.current.getViewportPageSize();
    if (scrollPositionBottom < contentHeight - props.scrollEndThreshold) {
      isInScrollBottomArea.current = false;
    }
    if (scrollPositionBottom >= contentHeight - props.scrollEndThreshold && !isInScrollBottomArea.current) {
      var rowScrollEndParam = {
        visibleColumns: visibleColumns,
        viewportPageSize: viewportPageSize,
        visibleRowsCount: currentPage.rows.length
      };
      apiRef.current.publishEvent('rowsScrollEnd', rowScrollEndParam);
      isInScrollBottomArea.current = true;
    }
  }, [contentHeight, props.scrollEndThreshold, props.rowsLoadingMode, visibleColumns, apiRef, currentPage.rows.length]);
  var handleGridScroll = React.useCallback(function (_ref) {
    var left = _ref.left,
      top = _ref.top;
    handleRowsScrollEnd({
      left: left,
      top: top
    });
  }, [handleRowsScrollEnd]);
  useGridApiEventHandler(apiRef, 'scrollPositionChange', handleGridScroll);
  useGridApiOptionHandler(apiRef, 'rowsScrollEnd', props.onRowsScrollEnd);
};