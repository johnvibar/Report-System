import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid-pro/internals';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
export declare const aggregationStateInitializer: GridStateInitializer<Pick<DataGridPremiumProcessedProps, 'aggregationModel' | 'initialState'>, GridPrivateApiPremium>;
export declare const useGridAggregation: (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: Pick<DataGridPremiumProcessedProps, 'onAggregationModelChange' | 'initialState' | 'aggregationModel' | 'getAggregationPosition' | 'aggregationFunctions' | 'aggregationRowsScope' | 'disableAggregation' | 'rowGroupingColumnMode'>) => void;
