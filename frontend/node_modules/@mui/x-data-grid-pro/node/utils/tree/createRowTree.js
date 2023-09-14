"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRowTree = void 0;
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _insertDataRowInTree = require("./insertDataRowInTree");
/**
 * Transform a list of rows into a tree structure where each row references its parent and children.
 */
const createRowTree = params => {
  const dataRowIds = [];
  const tree = {
    [_xDataGrid.GRID_ROOT_GROUP_ID]: (0, _internals.buildRootGroup)()
  };
  const treeDepths = {};
  for (let i = 0; i < params.nodes.length; i += 1) {
    const node = params.nodes[i];
    dataRowIds.push(node.id);
    (0, _insertDataRowInTree.insertDataRowInTree)({
      tree,
      previousTree: params.previousTree,
      id: node.id,
      path: node.path,
      onDuplicatePath: params.onDuplicatePath,
      treeDepths,
      isGroupExpandedByDefault: params.isGroupExpandedByDefault,
      defaultGroupingExpansionDepth: params.defaultGroupingExpansionDepth
    });
  }
  return {
    tree,
    treeDepths,
    groupingName: params.groupingName,
    dataRowIds
  };
};
exports.createRowTree = createRowTree;