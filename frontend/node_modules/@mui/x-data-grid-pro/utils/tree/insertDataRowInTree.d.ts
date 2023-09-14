import { GridRowId, GridRowTreeConfig } from '@mui/x-data-grid';
import { GridTreeDepths, GridRowTreeUpdatedGroupsManager } from '@mui/x-data-grid/internals';
import { GridTreePathDuplicateHandler, RowTreeBuilderGroupingCriterion } from './models';
import { DataGridProProps } from '../../models/dataGridProProps';
interface InsertDataRowInTreeParams {
    /**
     * ID of the data row to insert in the tree.
     */
    id: GridRowId;
    /**
     * Path of the data row to insert in the tree.
     */
    path: RowTreeBuilderGroupingCriterion[];
    /**
     * Tree in which to insert the data row.
     * This tree can be mutated but it's children should not.
     * For instance:
     *
     * - `tree[nodeId] = newNode` => valid
     * - `tree[nodeId].children.push(newNodeId)` => invalid
     */
    tree: GridRowTreeConfig;
    /**
     * Previous tree instance for comparison.
     */
    previousTree: GridRowTreeConfig | null;
    /**
     * Amount of nodes at each depth of the tree.
     * This object can be mutated.
     * For instance:
     *
     * - `treeDepths[nodeDepth] = treeDepth[nodeDepth] + 1` => valid
     */
    treeDepths: GridTreeDepths;
    /**
     * Object tracking the action performed on each group.
     * Used to decide which groups to refresh on sorting, filtering, aggregation, ...
     * If not defined, then the tracking will be skipped.
     */
    updatedGroupsManager?: GridRowTreeUpdatedGroupsManager;
    /**
     * Callback fired when trying to insert a data row for a path already populated by another data row.
     */
    onDuplicatePath?: GridTreePathDuplicateHandler;
    isGroupExpandedByDefault?: DataGridProProps['isGroupExpandedByDefault'];
    defaultGroupingExpansionDepth: number;
}
/**
 * Inserts a data row in a tree.
 * For each steps of its path:
 * - if a node exists with the same partial path, it will register this node as the ancestor of the data row.
 * - if not, it will create an auto-generated node and register it as ancestor of the data row.
 */
export declare const insertDataRowInTree: ({ id, path, updatedGroupsManager, previousTree, tree, treeDepths, onDuplicatePath, isGroupExpandedByDefault, defaultGroupingExpansionDepth, }: InsertDataRowInTreeParams) => void;
export {};
