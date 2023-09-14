import { createSelector } from '@mui/x-data-grid-pro/internals';
export var gridAggregationStateSelector = function gridAggregationStateSelector(state) {
  return state.aggregation;
};

/**
 * Get the aggregation model, containing the aggregation function of each column.
 * If a column is not in the model, it is not aggregated.
 * @category Aggregation
 */
export var gridAggregationModelSelector = createSelector(gridAggregationStateSelector, function (aggregationState) {
  return aggregationState.model;
});

/**
 * Get the aggregation results as a lookup.
 * @category Aggregation
 */
export var gridAggregationLookupSelector = createSelector(gridAggregationStateSelector, function (aggregationState) {
  return aggregationState.lookup;
});