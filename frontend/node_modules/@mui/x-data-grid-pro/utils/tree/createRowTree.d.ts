import { GridRowTreeConfig } from '@mui/x-data-grid';
import { GridRowTreeCreationValue } from '@mui/x-data-grid/internals';
import { RowTreeBuilderNode, GridTreePathDuplicateHandler } from './models';
import { DataGridProProps } from '../../models/dataGridProProps';
interface CreateRowTreeParams {
    previousTree: GridRowTreeConfig | null;
    nodes: RowTreeBuilderNode[];
    defaultGroupingExpansionDepth: number;
    isGroupExpandedByDefault?: DataGridProProps['isGroupExpandedByDefault'];
    groupingName: string;
    onDuplicatePath?: GridTreePathDuplicateHandler;
}
/**
 * Transform a list of rows into a tree structure where each row references its parent and children.
 */
export declare const createRowTree: (params: CreateRowTreeParams) => GridRowTreeCreationValue;
export {};
