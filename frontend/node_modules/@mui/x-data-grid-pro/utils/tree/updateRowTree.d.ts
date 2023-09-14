import { GridGroupNode, GridRowId, GridRowTreeConfig } from '@mui/x-data-grid';
import { GridRowTreeCreationValue, GridTreeDepths } from '@mui/x-data-grid/internals';
import { GridTreePathDuplicateHandler, RowTreeBuilderNode } from './models';
export interface UpdateRowTreeNodes {
    inserted: RowTreeBuilderNode[];
    modified: RowTreeBuilderNode[];
    removed: GridRowId[];
}
interface UpdateRowTreeParams {
    previousTree: GridRowTreeConfig;
    previousTreeDepth: GridTreeDepths;
    nodes: UpdateRowTreeNodes;
    defaultGroupingExpansionDepth: number;
    isGroupExpandedByDefault?: (node: GridGroupNode) => boolean;
    groupingName: string;
    onDuplicatePath?: GridTreePathDuplicateHandler;
}
export declare const updateRowTree: (params: UpdateRowTreeParams) => GridRowTreeCreationValue;
export {};
