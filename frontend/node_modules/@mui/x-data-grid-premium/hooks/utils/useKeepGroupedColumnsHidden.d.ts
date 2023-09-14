import * as React from 'react';
import { GridApi } from '@mui/x-data-grid-pro';
import { GridInitialStatePremium } from '../../models/gridStatePremium';
import { DataGridPremiumProps } from '../../models/dataGridPremiumProps';
/**
 * Automatically hide columns when added to the row grouping model and stop hiding them when they are removed.
 * Handles both the `props.initialState.rowGrouping.model` and `props.rowGroupingModel`
 * Does not work when used with the `hide` property of `GridColDef`
 */
export declare const useKeepGroupedColumnsHidden: (props: {
    apiRef: React.MutableRefObject<GridApi>;
} & Pick<DataGridPremiumProps, 'initialState' | 'rowGroupingModel'>) => GridInitialStatePremium;
