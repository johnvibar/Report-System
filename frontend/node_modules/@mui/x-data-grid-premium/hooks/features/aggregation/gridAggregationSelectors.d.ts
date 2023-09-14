import { GridStatePremium } from '../../../models/gridStatePremium';
export declare const gridAggregationStateSelector: (state: GridStatePremium) => import("./gridAggregationInterfaces").GridAggregationState;
/**
 * Get the aggregation model, containing the aggregation function of each column.
 * If a column is not in the model, it is not aggregated.
 * @category Aggregation
 */
export declare const gridAggregationModelSelector: import("@mui/x-data-grid").OutputSelector<GridStatePremium, import("./gridAggregationInterfaces").GridAggregationModel>;
/**
 * Get the aggregation results as a lookup.
 * @category Aggregation
 */
export declare const gridAggregationLookupSelector: import("@mui/x-data-grid").OutputSelector<GridStatePremium, import("./gridAggregationInterfaces").GridAggregationLookup>;
