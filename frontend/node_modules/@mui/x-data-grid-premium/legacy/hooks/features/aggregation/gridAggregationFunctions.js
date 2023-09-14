import { isNumber } from '@mui/x-data-grid-pro/internals';
var sumAgg = {
  apply: function apply(_ref) {
    var values = _ref.values;
    var sum = 0;
    for (var i = 0; i < values.length; i += 1) {
      var value = values[i];
      if (value != null) {
        sum += value;
      }
    }
    return sum;
  },
  columnTypes: ['number']
};
var avgAgg = {
  apply: function apply(params) {
    if (params.values.length === 0) {
      return null;
    }
    var sum = sumAgg.apply(params);
    return sum / params.values.length;
  },
  columnTypes: ['number']
};
var minAgg = {
  apply: function apply(_ref2) {
    var values = _ref2.values;
    if (values.length === 0) {
      return null;
    }
    var min = +Infinity;
    for (var i = 0; i < values.length; i += 1) {
      var value = values[i];
      if (value != null && value < min) {
        min = value;
      }
    }
    return min;
  },
  columnTypes: ['number', 'date', 'dateTime']
};
var maxAgg = {
  apply: function apply(_ref3) {
    var values = _ref3.values;
    if (values.length === 0) {
      return null;
    }
    var max = -Infinity;
    for (var i = 0; i < values.length; i += 1) {
      var value = values[i];
      if (value != null && value > max) {
        max = value;
      }
    }
    return max;
  },
  columnTypes: ['number', 'date', 'dateTime']
};
var sizeAgg = {
  apply: function apply(_ref4) {
    var values = _ref4.values;
    return values.length;
  },
  valueFormatter: function valueFormatter(params) {
    if (params.value == null || !isNumber(params.value)) {
      return params.value;
    }
    return params.value.toLocaleString();
  },
  hasCellUnit: false
};
export var GRID_AGGREGATION_FUNCTIONS = {
  sum: sumAgg,
  avg: avgAgg,
  min: minAgg,
  max: maxAgg,
  size: sizeAgg
};