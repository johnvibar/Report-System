import * as React from 'react';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
export declare const useGridAggregationPreProcessors: (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: Pick<DataGridPremiumProcessedProps, 'aggregationFunctions' | 'disableAggregation' | 'getAggregationPosition' | 'slotProps' | 'slots'>) => void;
