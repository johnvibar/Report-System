import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid-pro/internals';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
export declare const rowGroupingStateInitializer: GridStateInitializer<Pick<DataGridPremiumProcessedProps, 'rowGroupingModel' | 'initialState'>>;
/**
 * @requires useGridColumns (state, method) - can be after, async only
 * @requires useGridRows (state, method) - can be after, async only
 * @requires useGridParamsApi (method) - can be after, async only
 */
export declare const useGridRowGrouping: (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: Pick<DataGridPremiumProcessedProps, 'initialState' | 'rowGroupingModel' | 'onRowGroupingModelChange' | 'defaultGroupingExpansionDepth' | 'isGroupExpandedByDefault' | 'groupingColDef' | 'rowGroupingColumnMode' | 'disableRowGrouping' | 'slotProps' | 'slots'>) => void;
