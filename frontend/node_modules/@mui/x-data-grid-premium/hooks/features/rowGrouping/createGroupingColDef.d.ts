import * as React from 'react';
import { GridColDef, GridGroupingColDefOverride } from '@mui/x-data-grid-pro';
import { GridColumnRawLookup } from '@mui/x-data-grid-pro/internals';
import { GridApiPremium } from '../../../models/gridApiPremium';
interface CreateGroupingColDefMonoCriteriaParams {
    columnsLookup: GridColumnRawLookup;
    /**
     * The field from which we are grouping the rows.
     */
    groupingCriteria: string;
    /**
     * The col def from which we are grouping the rows.
     */
    groupedByColDef: GridColDef;
    /**
     * The col def properties the user wants to override.
     * This value comes `prop.groupingColDef`.
     */
    colDefOverride: GridGroupingColDefOverride | null | undefined;
}
/**
 * Creates the `GridColDef` for a grouping column that only takes care of a single grouping criteria
 */
export declare const createGroupingColDefForOneGroupingCriteria: ({ columnsLookup, groupedByColDef, groupingCriteria, colDefOverride, }: CreateGroupingColDefMonoCriteriaParams) => GridColDef;
interface CreateGroupingColDefSeveralCriteriaParams {
    apiRef: React.MutableRefObject<GridApiPremium>;
    columnsLookup: GridColumnRawLookup;
    /**
     * The fields from which we are grouping the rows.
     */
    rowGroupingModel: string[];
    /**
     * The col def properties the user wants to override.
     * This value comes `prop.groupingColDef`.
     */
    colDefOverride: GridGroupingColDefOverride | null | undefined;
}
/**
 * Creates the `GridColDef` for a grouping column that takes care of all the grouping criteria
 */
export declare const createGroupingColDefForAllGroupingCriteria: ({ apiRef, columnsLookup, rowGroupingModel, colDefOverride, }: CreateGroupingColDefSeveralCriteriaParams) => GridColDef;
export {};
