"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridExcelExport = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _excelSerializer = require("./serializer/excelSerializer");
var _components = require("../../../components");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["worker", "exceljsPostProcess", "exceljsPreProcess", "columnsStyles", "includeHeaders", "getRowsToExport", "valueOptionsSheetName"];
/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridSelection (state)
 * @requires useGridParamsApi (method)
 */
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useGridExcelExport = (apiRef, props) => {
  const logger = (0, _xDataGrid.useGridLogger)(apiRef, 'useGridExcelExport');
  const getDataAsExcel = React.useCallback((options = {}) => {
    logger.debug(`Get data as excel`);
    const getRowsToExport = options.getRowsToExport ?? _internals.defaultGetRowsToExport;
    const exportedRowIds = getRowsToExport({
      apiRef
    });
    const exportedColumns = (0, _internals.getColumnsToExport)({
      apiRef,
      options
    });
    return (0, _excelSerializer.buildExcel)({
      columns: exportedColumns,
      rowIds: exportedRowIds,
      includeHeaders: options.includeHeaders ?? true,
      includeColumnGroupsHeaders: options.includeColumnGroupsHeaders ?? true,
      valueOptionsSheetName: options?.valueOptionsSheetName || 'Options',
      columnsStyles: options?.columnsStyles,
      exceljsPreProcess: options?.exceljsPreProcess,
      exceljsPostProcess: options?.exceljsPostProcess
    }, apiRef.current);
  }, [logger, apiRef]);
  const exportDataAsExcel = React.useCallback(async (options = {}) => {
    const {
        worker: workerFn,
        exceljsPostProcess,
        exceljsPreProcess,
        getRowsToExport = _internals.defaultGetRowsToExport,
        valueOptionsSheetName = 'Options'
      } = options,
      cloneableOptions = (0, _objectWithoutPropertiesLoose2.default)(options, _excluded);
    const sendExcelToUser = buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      (0, _internals.exportAs)(blob, 'xlsx', options?.fileName);
    };
    if (!workerFn) {
      apiRef.current.publishEvent('excelExportStateChange', 'pending');
      const workbook = await getDataAsExcel(options);
      if (workbook === null) {
        return;
      }
      const content = await workbook.xlsx.writeBuffer();
      apiRef.current.publishEvent('excelExportStateChange', 'finished');
      sendExcelToUser(content);
      return;
    }
    if (exceljsPostProcess && process.env.NODE_ENV !== 'production') {
      console.warn([`MUI: The exceljsPostProcess option is not supported when a web worker is used.`, 'As alternative, pass the callback to the same option in setupExcelExportWebWorker.'].join('\n'));
    }
    if (exceljsPreProcess && process.env.NODE_ENV !== 'production') {
      console.warn([`MUI: The exceljsPreProcess option is not supported when a web worker is used.`, 'As alternative, pass the callback to the same option in setupExcelExportWebWorker.'].join('\n'));
    }
    const worker = workerFn();
    apiRef.current.publishEvent('excelExportStateChange', 'pending');
    worker.onmessage = async event => {
      sendExcelToUser(event.data);
      apiRef.current.publishEvent('excelExportStateChange', 'finished');
      worker.terminate();
    };
    const exportedRowIds = getRowsToExport({
      apiRef
    });
    const exportedColumns = (0, _internals.getColumnsToExport)({
      apiRef,
      options
    });
    const valueOptionsData = await (0, _excelSerializer.getDataForValueOptionsSheet)(exportedColumns, valueOptionsSheetName, apiRef.current);
    const serializedColumns = (0, _excelSerializer.serializeColumns)(exportedColumns, options.columnsStyles || {});
    const serializedRows = exportedRowIds.map(id => (0, _excelSerializer.serializeRow)(id, exportedColumns, apiRef.current, valueOptionsData));
    const columnGroupPaths = exportedColumns.reduce((acc, column) => {
      acc[column.field] = apiRef.current.unstable_getColumnGroupPath(column.field);
      return acc;
    }, {});
    const message = {
      serializedColumns,
      serializedRows,
      valueOptionsData,
      columnGroupPaths,
      columnGroupDetails: apiRef.current.unstable_getAllGroupDetails(),
      options: cloneableOptions,
      valueOptionsSheetName
    };
    worker.postMessage(message);
  }, [apiRef, getDataAsExcel]);
  const excelExportApi = {
    getDataAsExcel,
    exportDataAsExcel
  };
  (0, _xDataGrid.useGridApiMethod)(apiRef, excelExportApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const addExportMenuButtons = React.useCallback((initialValue, options) => {
    if (options.excelOptions?.disableToolbarButton) {
      return initialValue;
    }
    return [...initialValue, {
      component: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.GridExcelExportMenuItem, {
        options: options.excelOptions
      }),
      componentName: 'excelExport'
    }];
  }, []);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'exportMenu', addExportMenuButtons);
  (0, _xDataGrid.useGridApiOptionHandler)(apiRef, 'excelExportStateChange', props.onExcelExportStateChange);
};
exports.useGridExcelExport = useGridExcelExport;