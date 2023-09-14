import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
var _excluded = ["worker", "exceljsPostProcess", "exceljsPreProcess", "columnsStyles", "includeHeaders", "getRowsToExport", "valueOptionsSheetName"];
import _regeneratorRuntime from "@babel/runtime/regenerator";
import * as React from 'react';
import { useGridApiMethod, useGridLogger, useGridApiOptionHandler } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor, exportAs, getColumnsToExport, defaultGetRowsToExport } from '@mui/x-data-grid/internals';
import { buildExcel, getDataForValueOptionsSheet, serializeColumns, serializeRow } from './serializer/excelSerializer';
import { GridExcelExportMenuItem } from '../../../components';

/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridSelection (state)
 * @requires useGridParamsApi (method)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export var useGridExcelExport = function useGridExcelExport(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useGridExcelExport');
  var getDataAsExcel = React.useCallback(function () {
    var _options$getRowsToExp, _options$includeHeade, _options$includeColum;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    logger.debug("Get data as excel");
    var getRowsToExport = (_options$getRowsToExp = options.getRowsToExport) != null ? _options$getRowsToExp : defaultGetRowsToExport;
    var exportedRowIds = getRowsToExport({
      apiRef: apiRef
    });
    var exportedColumns = getColumnsToExport({
      apiRef: apiRef,
      options: options
    });
    return buildExcel({
      columns: exportedColumns,
      rowIds: exportedRowIds,
      includeHeaders: (_options$includeHeade = options.includeHeaders) != null ? _options$includeHeade : true,
      includeColumnGroupsHeaders: (_options$includeColum = options.includeColumnGroupsHeaders) != null ? _options$includeColum : true,
      valueOptionsSheetName: (options == null ? void 0 : options.valueOptionsSheetName) || 'Options',
      columnsStyles: options == null ? void 0 : options.columnsStyles,
      exceljsPreProcess: options == null ? void 0 : options.exceljsPreProcess,
      exceljsPostProcess: options == null ? void 0 : options.exceljsPostProcess
    }, apiRef.current);
  }, [logger, apiRef]);
  var exportDataAsExcel = React.useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var options,
      workerFn,
      exceljsPostProcess,
      exceljsPreProcess,
      columnsStyles,
      includeHeaders,
      _options$getRowsToExp2,
      getRowsToExport,
      _options$valueOptions,
      valueOptionsSheetName,
      cloneableOptions,
      sendExcelToUser,
      workbook,
      content,
      worker,
      exportedRowIds,
      exportedColumns,
      valueOptionsData,
      serializedColumns,
      serializedRows,
      columnGroupPaths,
      message,
      _args2 = arguments;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          workerFn = options.worker, exceljsPostProcess = options.exceljsPostProcess, exceljsPreProcess = options.exceljsPreProcess, columnsStyles = options.columnsStyles, includeHeaders = options.includeHeaders, _options$getRowsToExp2 = options.getRowsToExport, getRowsToExport = _options$getRowsToExp2 === void 0 ? defaultGetRowsToExport : _options$getRowsToExp2, _options$valueOptions = options.valueOptionsSheetName, valueOptionsSheetName = _options$valueOptions === void 0 ? 'Options' : _options$valueOptions, cloneableOptions = _objectWithoutProperties(options, _excluded);
          sendExcelToUser = function sendExcelToUser(buffer) {
            var blob = new Blob([buffer], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            exportAs(blob, 'xlsx', options == null ? void 0 : options.fileName);
          };
          if (workerFn) {
            _context2.next = 16;
            break;
          }
          apiRef.current.publishEvent('excelExportStateChange', 'pending');
          _context2.next = 7;
          return getDataAsExcel(options);
        case 7:
          workbook = _context2.sent;
          if (!(workbook === null)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return");
        case 10:
          _context2.next = 12;
          return workbook.xlsx.writeBuffer();
        case 12:
          content = _context2.sent;
          apiRef.current.publishEvent('excelExportStateChange', 'finished');
          sendExcelToUser(content);
          return _context2.abrupt("return");
        case 16:
          if (exceljsPostProcess && process.env.NODE_ENV !== 'production') {
            console.warn(["MUI: The exceljsPostProcess option is not supported when a web worker is used.", 'As alternative, pass the callback to the same option in setupExcelExportWebWorker.'].join('\n'));
          }
          if (exceljsPreProcess && process.env.NODE_ENV !== 'production') {
            console.warn(["MUI: The exceljsPreProcess option is not supported when a web worker is used.", 'As alternative, pass the callback to the same option in setupExcelExportWebWorker.'].join('\n'));
          }
          worker = workerFn();
          apiRef.current.publishEvent('excelExportStateChange', 'pending');
          worker.onmessage = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(event) {
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    sendExcelToUser(event.data);
                    apiRef.current.publishEvent('excelExportStateChange', 'finished');
                    worker.terminate();
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }();
          exportedRowIds = getRowsToExport({
            apiRef: apiRef
          });
          exportedColumns = getColumnsToExport({
            apiRef: apiRef,
            options: options
          });
          _context2.next = 25;
          return getDataForValueOptionsSheet(exportedColumns, valueOptionsSheetName, apiRef.current);
        case 25:
          valueOptionsData = _context2.sent;
          serializedColumns = serializeColumns(exportedColumns, options.columnsStyles || {});
          serializedRows = exportedRowIds.map(function (id) {
            return serializeRow(id, exportedColumns, apiRef.current, valueOptionsData);
          });
          columnGroupPaths = exportedColumns.reduce(function (acc, column) {
            acc[column.field] = apiRef.current.unstable_getColumnGroupPath(column.field);
            return acc;
          }, {});
          message = {
            serializedColumns: serializedColumns,
            serializedRows: serializedRows,
            valueOptionsData: valueOptionsData,
            columnGroupPaths: columnGroupPaths,
            columnGroupDetails: apiRef.current.unstable_getAllGroupDetails(),
            options: cloneableOptions,
            valueOptionsSheetName: valueOptionsSheetName
          };
          worker.postMessage(message);
        case 31:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })), [apiRef, getDataAsExcel]);
  var excelExportApi = {
    getDataAsExcel: getDataAsExcel,
    exportDataAsExcel: exportDataAsExcel
  };
  useGridApiMethod(apiRef, excelExportApi, 'public');

  /**
   * PRE-PROCESSING
   */
  var addExportMenuButtons = React.useCallback(function (initialValue, options) {
    var _options$excelOptions;
    if ((_options$excelOptions = options.excelOptions) != null && _options$excelOptions.disableToolbarButton) {
      return initialValue;
    }
    return [].concat(_toConsumableArray(initialValue), [{
      component: /*#__PURE__*/_jsx(GridExcelExportMenuItem, {
        options: options.excelOptions
      }),
      componentName: 'excelExport'
    }]);
  }, []);
  useGridRegisterPipeProcessor(apiRef, 'exportMenu', addExportMenuButtons);
  useGridApiOptionHandler(apiRef, 'excelExportStateChange', props.onExcelExportStateChange);
};