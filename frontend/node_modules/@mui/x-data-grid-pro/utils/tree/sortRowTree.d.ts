import { GridRowId, GridRowTreeConfig } from '@mui/x-data-grid';
import { GridSortingModelApplier } from '@mui/x-data-grid/internals';
interface SortRowTreeParams {
    rowTree: GridRowTreeConfig;
    disableChildrenSorting: boolean;
    sortRowList: GridSortingModelApplier | null;
    /**
     * Defines where the groups are placed relative to the leaves of same depth when no sorting rule is applied.
     * If `true` the groups will be rendered below the leaves.
     * If `false`, the groups will be rendered on their creation order.
     */
    shouldRenderGroupBelowLeaves: boolean;
}
export declare const sortRowTree: (params: SortRowTreeParams) => GridRowId[];
export {};
