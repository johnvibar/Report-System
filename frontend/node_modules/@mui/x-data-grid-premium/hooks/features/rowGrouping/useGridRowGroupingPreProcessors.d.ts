import * as React from 'react';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
export declare const useGridRowGroupingPreProcessors: (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: Pick<DataGridPremiumProcessedProps, 'disableRowGrouping' | 'groupingColDef' | 'rowGroupingColumnMode' | 'defaultGroupingExpansionDepth' | 'isGroupExpandedByDefault'>) => void;
