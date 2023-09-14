"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowPinning = exports.rowPinningStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createPinnedRowsInternalCache(pinnedRows, getRowId) {
  const cache = {
    topIds: [],
    bottomIds: [],
    idLookup: {}
  };
  pinnedRows?.top?.forEach(rowModel => {
    const id = (0, _internals.getRowIdFromRowModel)(rowModel, getRowId);
    cache.topIds.push(id);
    cache.idLookup[id] = rowModel;
  });
  pinnedRows?.bottom?.forEach(rowModel => {
    const id = (0, _internals.getRowIdFromRowModel)(rowModel, getRowId);
    cache.bottomIds.push(id);
    cache.idLookup[id] = rowModel;
  });
  return cache;
}
const rowPinningStateInitializer = (state, props, apiRef) => {
  apiRef.current.caches.pinnedRows = createPinnedRowsInternalCache(props.pinnedRows, props.getRowId);
  return (0, _extends2.default)({}, state, {
    rows: (0, _extends2.default)({}, state.rows, {
      additionalRowGroups: (0, _extends2.default)({}, state.rows?.additionalRowGroups, {
        pinnedRows: {
          top: [],
          bottom: []
        }
      })
    })
  });
};
exports.rowPinningStateInitializer = rowPinningStateInitializer;
const useGridRowPinning = (apiRef, props) => {
  const setPinnedRows = React.useCallback(newPinnedRows => {
    apiRef.current.caches.pinnedRows = createPinnedRowsInternalCache(newPinnedRows, props.getRowId);
    apiRef.current.requestPipeProcessorsApplication('hydrateRows');
  }, [apiRef, props.getRowId]);
  (0, _xDataGrid.useGridApiMethod)(apiRef, {
    unstable_setPinnedRows: setPinnedRows
  }, 'public');
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    apiRef.current.unstable_setPinnedRows(props.pinnedRows);
  }, [apiRef, props.pinnedRows]);
};
exports.useGridRowPinning = useGridRowPinning;