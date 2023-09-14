"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridAggregationStateSelector = exports.gridAggregationModelSelector = exports.gridAggregationLookupSelector = void 0;
var _internals = require("@mui/x-data-grid-pro/internals");
const gridAggregationStateSelector = state => state.aggregation;

/**
 * Get the aggregation model, containing the aggregation function of each column.
 * If a column is not in the model, it is not aggregated.
 * @category Aggregation
 */
exports.gridAggregationStateSelector = gridAggregationStateSelector;
const gridAggregationModelSelector = (0, _internals.createSelector)(gridAggregationStateSelector, aggregationState => aggregationState.model);

/**
 * Get the aggregation results as a lookup.
 * @category Aggregation
 */
exports.gridAggregationModelSelector = gridAggregationModelSelector;
const gridAggregationLookupSelector = (0, _internals.createSelector)(gridAggregationStateSelector, aggregationState => aggregationState.lookup);
exports.gridAggregationLookupSelector = gridAggregationLookupSelector;