"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRowTree = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _insertDataRowInTree = require("./insertDataRowInTree");
var _removeDataRowFromTree = require("./removeDataRowFromTree");
var _utils = require("./utils");
const updateRowTree = params => {
  const tree = (0, _extends2.default)({}, params.previousTree);
  const treeDepths = (0, _extends2.default)({}, params.previousTreeDepth);
  const updatedGroupsManager = (0, _utils.createUpdatedGroupsManager)();
  for (let i = 0; i < params.nodes.inserted.length; i += 1) {
    const {
      id,
      path
    } = params.nodes.inserted[i];
    (0, _insertDataRowInTree.insertDataRowInTree)({
      previousTree: params.previousTree,
      tree,
      treeDepths,
      updatedGroupsManager,
      id,
      path,
      onDuplicatePath: params.onDuplicatePath,
      isGroupExpandedByDefault: params.isGroupExpandedByDefault,
      defaultGroupingExpansionDepth: params.defaultGroupingExpansionDepth
    });
  }
  for (let i = 0; i < params.nodes.removed.length; i += 1) {
    const nodeId = params.nodes.removed[i];
    (0, _removeDataRowFromTree.removeDataRowFromTree)({
      tree,
      treeDepths,
      updatedGroupsManager,
      id: nodeId
    });
  }
  for (let i = 0; i < params.nodes.modified.length; i += 1) {
    const {
      id,
      path
    } = params.nodes.modified[i];
    const pathInPreviousTree = (0, _utils.getNodePathInTree)({
      tree,
      id
    });
    const isInSameGroup = (0, _internals.isDeepEqual)(pathInPreviousTree, path);
    if (!isInSameGroup) {
      (0, _removeDataRowFromTree.removeDataRowFromTree)({
        tree,
        treeDepths,
        updatedGroupsManager,
        id
      });
      (0, _insertDataRowInTree.insertDataRowInTree)({
        previousTree: params.previousTree,
        tree,
        treeDepths,
        updatedGroupsManager,
        id,
        path,
        onDuplicatePath: params.onDuplicatePath,
        isGroupExpandedByDefault: params.isGroupExpandedByDefault,
        defaultGroupingExpansionDepth: params.defaultGroupingExpansionDepth
      });
    } else {
      updatedGroupsManager?.addAction(tree[id].parent, 'modifyChildren');
    }
  }

  // TODO rows v6: Avoid walking the whole tree, we should be able to generate the new list only using slices.
  const dataRowIds = (0, _internals.getTreeNodeDescendants)(tree, _xDataGrid.GRID_ROOT_GROUP_ID, true);
  return {
    tree,
    treeDepths,
    groupingName: params.groupingName,
    dataRowIds,
    updatedGroupsManager
  };
};
exports.updateRowTree = updateRowTree;