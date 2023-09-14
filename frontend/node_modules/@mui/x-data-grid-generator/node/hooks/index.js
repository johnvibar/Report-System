"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useDemoData = require("./useDemoData");
Object.keys(_useDemoData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useDemoData[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useDemoData[key];
    }
  });
});
var _useBasicDemoData = require("./useBasicDemoData");
Object.keys(_useBasicDemoData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useBasicDemoData[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useBasicDemoData[key];
    }
  });
});
var _useMovieData = require("./useMovieData");
Object.keys(_useMovieData).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useMovieData[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useMovieData[key];
    }
  });
});
var _useQuery = require("./useQuery");
Object.keys(_useQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useQuery[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useQuery[key];
    }
  });
});