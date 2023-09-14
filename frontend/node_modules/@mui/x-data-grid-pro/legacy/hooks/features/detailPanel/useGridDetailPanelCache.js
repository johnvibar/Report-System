import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiEventHandler, gridDataRowIdsSelector } from '@mui/x-data-grid';
function cacheContentAndHeight(apiRef, getDetailPanelContent, getDetailPanelHeight, previousHeightCache) {
  if (typeof getDetailPanelContent !== 'function') {
    return {};
  }

  // TODO change to lazy approach using a Proxy
  // only call getDetailPanelContent when asked for an id
  var rowIds = gridDataRowIdsSelector(apiRef);
  var contentCache = rowIds.reduce(function (acc, id) {
    var params = apiRef.current.getRowParams(id);
    acc[id] = getDetailPanelContent(params);
    return acc;
  }, {});
  var heightCache = rowIds.reduce(function (acc, id) {
    var _previousHeightCache$;
    if (contentCache[id] == null) {
      return acc;
    }
    var params = apiRef.current.getRowParams(id);
    var height = getDetailPanelHeight(params);
    var autoHeight = height === 'auto';
    acc[id] = {
      autoHeight: autoHeight,
      height: !autoHeight ? height : (_previousHeightCache$ = previousHeightCache[id]) == null ? void 0 : _previousHeightCache$.height
    };
    return acc;
  }, {});
  return {
    contentCache: contentCache,
    heightCache: heightCache
  };
}
export var useGridDetailPanelCache = function useGridDetailPanelCache(apiRef, props) {
  var updateCaches = React.useCallback(function () {
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        detailPanel: _extends({}, state.detailPanel, cacheContentAndHeight(apiRef, props.getDetailPanelContent, props.getDetailPanelHeight, state.detailPanel.heightCache))
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, props.getDetailPanelContent, props.getDetailPanelHeight]);
  useGridApiEventHandler(apiRef, 'sortedRowsSet', updateCaches);
  var isFirstRender = React.useRef(true);
  if (isFirstRender.current) {
    isFirstRender.current = false;
    updateCaches();
  }
  React.useEffect(function () {
    if (isFirstRender.current) {
      return;
    }
    updateCaches();
  }, [updateCaches]);
};