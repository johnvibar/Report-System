import { GridColDef } from '@mui/x-data-grid';
/**
 * TODO: Add sorting and filtering on the value and the filteredDescendantCount
 */
export declare const GRID_TREE_DATA_GROUPING_COL_DEF: Omit<GridColDef, 'field' | 'editable'>;
export declare const GRID_TREE_DATA_GROUPING_FIELD = "__tree_data_group__";
export declare const GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES: Pick<GridColDef, 'field' | 'editable' | 'groupable'>;
