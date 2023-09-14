"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  setupExcelExportWebWorker: true
};
Object.defineProperty(exports, "setupExcelExportWebWorker", {
  enumerable: true,
  get: function () {
    return _excelSerializer.setupExcelExportWebWorker;
  }
});
var _gridExcelExportInterface = require("./gridExcelExportInterface");
Object.keys(_gridExcelExportInterface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _gridExcelExportInterface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gridExcelExportInterface[key];
    }
  });
});
var _excelSerializer = require("./serializer/excelSerializer");