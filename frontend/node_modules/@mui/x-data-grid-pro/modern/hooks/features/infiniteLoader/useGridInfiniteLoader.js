import * as React from 'react';
import { useGridSelector, useGridApiEventHandler, useGridApiOptionHandler, gridVisibleColumnDefinitionsSelector, gridRowsMetaSelector } from '@mui/x-data-grid';
import { useGridVisibleRows } from '@mui/x-data-grid/internals';
/**
 * @requires useGridColumns (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export const useGridInfiniteLoader = (apiRef, props) => {
  const visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  const currentPage = useGridVisibleRows(apiRef, props);
  const rowsMeta = useGridSelector(apiRef, gridRowsMetaSelector);
  const contentHeight = Math.max(rowsMeta.currentPageTotalHeight, 1);
  const isInScrollBottomArea = React.useRef(false);
  const handleRowsScrollEnd = React.useCallback(scrollPosition => {
    const dimensions = apiRef.current.getRootDimensions();

    // Prevent the infite loading working in combination with lazy loading
    if (!dimensions || props.rowsLoadingMode !== 'client') {
      return;
    }
    const scrollPositionBottom = scrollPosition.top + dimensions.viewportOuterSize.height;
    const viewportPageSize = apiRef.current.getViewportPageSize();
    if (scrollPositionBottom < contentHeight - props.scrollEndThreshold) {
      isInScrollBottomArea.current = false;
    }
    if (scrollPositionBottom >= contentHeight - props.scrollEndThreshold && !isInScrollBottomArea.current) {
      const rowScrollEndParam = {
        visibleColumns,
        viewportPageSize,
        visibleRowsCount: currentPage.rows.length
      };
      apiRef.current.publishEvent('rowsScrollEnd', rowScrollEndParam);
      isInScrollBottomArea.current = true;
    }
  }, [contentHeight, props.scrollEndThreshold, props.rowsLoadingMode, visibleColumns, apiRef, currentPage.rows.length]);
  const handleGridScroll = React.useCallback(({
    left,
    top
  }) => {
    handleRowsScrollEnd({
      left,
      top
    });
  }, [handleRowsScrollEnd]);
  useGridApiEventHandler(apiRef, 'scrollPositionChange', handleGridScroll);
  useGridApiOptionHandler(apiRef, 'rowsScrollEnd', props.onRowsScrollEnd);
};