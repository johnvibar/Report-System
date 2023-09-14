import * as React from 'react';
import { GridApiPremium } from '../../../models/gridApiPremium';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
import { GridAggregationFunction, GridAggregationLookup } from './gridAggregationInterfaces';
export declare const createAggregationLookup: ({ apiRef, aggregationFunctions, aggregationRowsScope, getAggregationPosition, }: {
    apiRef: React.MutableRefObject<GridApiPremium>;
    aggregationFunctions: Record<string, GridAggregationFunction>;
    aggregationRowsScope: DataGridPremiumProcessedProps['aggregationRowsScope'];
    getAggregationPosition: DataGridPremiumProcessedProps['getAggregationPosition'];
}) => GridAggregationLookup;
