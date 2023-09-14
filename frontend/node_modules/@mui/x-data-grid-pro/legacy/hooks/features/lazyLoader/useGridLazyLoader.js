import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useGridApiEventHandler, useGridSelector, gridSortModelSelector, gridFilterModelSelector, useGridApiOptionHandler } from '@mui/x-data-grid';
import { useGridVisibleRows, getRenderableIndexes } from '@mui/x-data-grid/internals';
function findSkeletonRowsSection(_ref) {
  var apiRef = _ref.apiRef,
    visibleRows = _ref.visibleRows,
    range = _ref.range;
  var firstRowIndex = range.firstRowIndex,
    lastRowIndex = range.lastRowIndex;
  var visibleRowsSection = visibleRows.slice(range.firstRowIndex, range.lastRowIndex);
  var startIndex = 0;
  var endIndex = visibleRowsSection.length - 1;
  var isSkeletonSectionFound = false;
  while (!isSkeletonSectionFound && firstRowIndex < lastRowIndex) {
    var isStartingWithASkeletonRow = apiRef.current.getRowNode(visibleRowsSection[startIndex].id).type === 'skeletonRow';
    var isEndingWithASkeletonRow = apiRef.current.getRowNode(visibleRowsSection[endIndex].id).type === 'skeletonRow';
    if (isStartingWithASkeletonRow && isEndingWithASkeletonRow) {
      isSkeletonSectionFound = true;
    }
    if (!isStartingWithASkeletonRow) {
      startIndex += 1;
      firstRowIndex += 1;
    }
    if (!isEndingWithASkeletonRow) {
      endIndex -= 1;
      lastRowIndex -= 1;
    }
  }
  return isSkeletonSectionFound ? {
    firstRowIndex: firstRowIndex,
    lastRowIndex: lastRowIndex
  } : undefined;
}
function isLazyLoadingDisabled(_ref2) {
  var lazyLoadingFeatureFlag = _ref2.lazyLoadingFeatureFlag,
    rowsLoadingMode = _ref2.rowsLoadingMode,
    gridDimensions = _ref2.gridDimensions;
  if (!lazyLoadingFeatureFlag || !gridDimensions) {
    return true;
  }
  if (rowsLoadingMode !== 'server') {
    return true;
  }
  return false;
}

/**
 * @requires useGridRows (state)
 * @requires useGridPagination (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export var useGridLazyLoader = function useGridLazyLoader(privateApiRef, props) {
  var _props$experimentalFe;
  var visibleRows = useGridVisibleRows(privateApiRef, props);
  var sortModel = useGridSelector(privateApiRef, gridSortModelSelector);
  var filterModel = useGridSelector(privateApiRef, gridFilterModelSelector);
  var renderedRowsIntervalCache = React.useRef({
    firstRowToRender: 0,
    lastRowToRender: 0
  });
  var _ref3 = (_props$experimentalFe = props.experimentalFeatures) != null ? _props$experimentalFe : {},
    lazyLoading = _ref3.lazyLoading;
  var getCurrentIntervalToRender = React.useCallback(function () {
    var currentRenderContext = privateApiRef.current.getRenderContext();
    var _getRenderableIndexes = getRenderableIndexes({
        firstIndex: currentRenderContext.firstRowIndex,
        lastIndex: currentRenderContext.lastRowIndex,
        minFirstIndex: 0,
        maxLastIndex: visibleRows.rows.length,
        buffer: props.rowBuffer
      }),
      _getRenderableIndexes2 = _slicedToArray(_getRenderableIndexes, 2),
      firstRowToRender = _getRenderableIndexes2[0],
      lastRowToRender = _getRenderableIndexes2[1];
    return {
      firstRowToRender: firstRowToRender,
      lastRowToRender: lastRowToRender
    };
  }, [privateApiRef, props.rowBuffer, visibleRows.rows.length]);
  var handleRenderedRowsIntervalChange = React.useCallback(function (params) {
    var dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    var fetchRowsParams = {
      firstRowToRender: params.firstRowToRender,
      lastRowToRender: params.lastRowToRender,
      sortModel: sortModel,
      filterModel: filterModel
    };
    if (renderedRowsIntervalCache.current.firstRowToRender === params.firstRowToRender && renderedRowsIntervalCache.current.lastRowToRender === params.lastRowToRender) {
      return;
    }
    if (sortModel.length === 0 && filterModel.items.length === 0) {
      var skeletonRowsSection = findSkeletonRowsSection({
        apiRef: privateApiRef,
        visibleRows: visibleRows.rows,
        range: {
          firstRowIndex: params.firstRowToRender,
          lastRowIndex: params.lastRowToRender
        }
      });
      if (!skeletonRowsSection) {
        return;
      }
      fetchRowsParams.firstRowToRender = skeletonRowsSection.firstRowIndex;
      fetchRowsParams.lastRowToRender = skeletonRowsSection.lastRowIndex;
    }
    renderedRowsIntervalCache.current = params;
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, sortModel, filterModel, visibleRows.rows, lazyLoading]);
  var handleGridSortModelChange = React.useCallback(function (newSortModel) {
    var dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    privateApiRef.current.requestPipeProcessorsApplication('hydrateRows');
    var _getCurrentIntervalTo = getCurrentIntervalToRender(),
      firstRowToRender = _getCurrentIntervalTo.firstRowToRender,
      lastRowToRender = _getCurrentIntervalTo.lastRowToRender;
    var fetchRowsParams = {
      firstRowToRender: firstRowToRender,
      lastRowToRender: lastRowToRender,
      sortModel: newSortModel,
      filterModel: filterModel
    };
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, filterModel, lazyLoading, getCurrentIntervalToRender]);
  var handleGridFilterModelChange = React.useCallback(function (newFilterModel) {
    var dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    privateApiRef.current.requestPipeProcessorsApplication('hydrateRows');
    var _getCurrentIntervalTo2 = getCurrentIntervalToRender(),
      firstRowToRender = _getCurrentIntervalTo2.firstRowToRender,
      lastRowToRender = _getCurrentIntervalTo2.lastRowToRender;
    var fetchRowsParams = {
      firstRowToRender: firstRowToRender,
      lastRowToRender: lastRowToRender,
      sortModel: sortModel,
      filterModel: newFilterModel
    };
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, sortModel, lazyLoading, getCurrentIntervalToRender]);
  useGridApiEventHandler(privateApiRef, 'renderedRowsIntervalChange', handleRenderedRowsIntervalChange);
  useGridApiEventHandler(privateApiRef, 'sortModelChange', handleGridSortModelChange);
  useGridApiEventHandler(privateApiRef, 'filterModelChange', handleGridFilterModelChange);
  useGridApiOptionHandler(privateApiRef, 'fetchRows', props.onFetchRows);
};