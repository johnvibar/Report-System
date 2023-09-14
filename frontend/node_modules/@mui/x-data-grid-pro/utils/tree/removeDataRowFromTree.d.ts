import { GridRowId, GridRowTreeConfig } from '@mui/x-data-grid';
import { GridTreeDepths, GridRowTreeUpdatedGroupsManager } from '@mui/x-data-grid/internals';
interface RemoveDataRowFromTreeParams {
    /**
     * ID of the data row to remove from the tree.
     */
    id: GridRowId;
    /**
     * Tree from which to remove the data row.
     * This tree can be mutated but it's children should not.
     * For instance:
     *
     * - `tree[nodeId] = newNode` => valid
     * - `tree[nodeId].children.push(newNodeId)` => invalid
     */
    tree: GridRowTreeConfig;
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
}
/**
 * Removed a data row from the tree.
 * If the node is a non-empty group, replace it with an auto-generated group to be able to keep displaying its children.
 * If not, remove it and recursively clean its parent with the following rules:
 * - An empty auto-generated should be removed from the tree
 * - An empty non-auto-generated should be turned into a leaf
 */
export declare const removeDataRowFromTree: ({ id, tree, treeDepths, updatedGroupsManager, }: RemoveDataRowFromTreeParams) => void;
export {};
