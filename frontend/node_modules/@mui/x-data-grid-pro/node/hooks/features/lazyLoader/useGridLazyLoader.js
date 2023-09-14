"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridLazyLoader = void 0;
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function findSkeletonRowsSection({
  apiRef,
  visibleRows,
  range
}) {
  let {
    firstRowIndex,
    lastRowIndex
  } = range;
  const visibleRowsSection = visibleRows.slice(range.firstRowIndex, range.lastRowIndex);
  let startIndex = 0;
  let endIndex = visibleRowsSection.length - 1;
  let isSkeletonSectionFound = false;
  while (!isSkeletonSectionFound && firstRowIndex < lastRowIndex) {
    const isStartingWithASkeletonRow = apiRef.current.getRowNode(visibleRowsSection[startIndex].id).type === 'skeletonRow';
    const isEndingWithASkeletonRow = apiRef.current.getRowNode(visibleRowsSection[endIndex].id).type === 'skeletonRow';
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
    firstRowIndex,
    lastRowIndex
  } : undefined;
}
function isLazyLoadingDisabled({
  lazyLoadingFeatureFlag,
  rowsLoadingMode,
  gridDimensions
}) {
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
const useGridLazyLoader = (privateApiRef, props) => {
  const visibleRows = (0, _internals.useGridVisibleRows)(privateApiRef, props);
  const sortModel = (0, _xDataGrid.useGridSelector)(privateApiRef, _xDataGrid.gridSortModelSelector);
  const filterModel = (0, _xDataGrid.useGridSelector)(privateApiRef, _xDataGrid.gridFilterModelSelector);
  const renderedRowsIntervalCache = React.useRef({
    firstRowToRender: 0,
    lastRowToRender: 0
  });
  const {
    lazyLoading
  } = props.experimentalFeatures ?? {};
  const getCurrentIntervalToRender = React.useCallback(() => {
    const currentRenderContext = privateApiRef.current.getRenderContext();
    const [firstRowToRender, lastRowToRender] = (0, _internals.getRenderableIndexes)({
      firstIndex: currentRenderContext.firstRowIndex,
      lastIndex: currentRenderContext.lastRowIndex,
      minFirstIndex: 0,
      maxLastIndex: visibleRows.rows.length,
      buffer: props.rowBuffer
    });
    return {
      firstRowToRender,
      lastRowToRender
    };
  }, [privateApiRef, props.rowBuffer, visibleRows.rows.length]);
  const handleRenderedRowsIntervalChange = React.useCallback(params => {
    const dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    const fetchRowsParams = {
      firstRowToRender: params.firstRowToRender,
      lastRowToRender: params.lastRowToRender,
      sortModel,
      filterModel
    };
    if (renderedRowsIntervalCache.current.firstRowToRender === params.firstRowToRender && renderedRowsIntervalCache.current.lastRowToRender === params.lastRowToRender) {
      return;
    }
    if (sortModel.length === 0 && filterModel.items.length === 0) {
      const skeletonRowsSection = findSkeletonRowsSection({
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
  const handleGridSortModelChange = React.useCallback(newSortModel => {
    const dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    privateApiRef.current.requestPipeProcessorsApplication('hydrateRows');
    const {
      firstRowToRender,
      lastRowToRender
    } = getCurrentIntervalToRender();
    const fetchRowsParams = {
      firstRowToRender,
      lastRowToRender,
      sortModel: newSortModel,
      filterModel
    };
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, filterModel, lazyLoading, getCurrentIntervalToRender]);
  const handleGridFilterModelChange = React.useCallback(newFilterModel => {
    const dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    privateApiRef.current.requestPipeProcessorsApplication('hydrateRows');
    const {
      firstRowToRender,
      lastRowToRender
    } = getCurrentIntervalToRender();
    const fetchRowsParams = {
      firstRowToRender,
      lastRowToRender,
      sortModel,
      filterModel: newFilterModel
    };
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, sortModel, lazyLoading, getCurrentIntervalToRender]);
  (0, _xDataGrid.useGridApiEventHandler)(privateApiRef, 'renderedRowsIntervalChange', handleRenderedRowsIntervalChange);
  (0, _xDataGrid.useGridApiEventHandler)(privateApiRef, 'sortModelChange', handleGridSortModelChange);
  (0, _xDataGrid.useGridApiEventHandler)(privateApiRef, 'filterModelChange', handleGridFilterModelChange);
  (0, _xDataGrid.useGridApiOptionHandler)(privateApiRef, 'fetchRows', props.onFetchRows);
};
exports.useGridLazyLoader = useGridLazyLoader;