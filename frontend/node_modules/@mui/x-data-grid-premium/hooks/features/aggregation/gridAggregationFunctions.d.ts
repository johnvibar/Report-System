import { GridAggregationFunction } from './gridAggregationInterfaces';
export declare const GRID_AGGREGATION_FUNCTIONS: {
    sum: GridAggregationFunction<number, number, number>;
    avg: GridAggregationFunction<number, number, number>;
    min: GridAggregationFunction<number | Date, number | Date, number | Date>;
    max: GridAggregationFunction<number | Date, number | Date, number | Date>;
    size: GridAggregationFunction<number, number, number>;
};
