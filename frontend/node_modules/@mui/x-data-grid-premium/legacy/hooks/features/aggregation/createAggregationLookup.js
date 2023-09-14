import { gridColumnLookupSelector, gridFilteredRowsLookupSelector, gridRowTreeSelector, GRID_ROOT_GROUP_ID } from '@mui/x-data-grid-pro';
import { getAggregationRules } from './gridAggregationUtils';
import { gridAggregationModelSelector } from './gridAggregationSelectors';
var getAggregationCellValue = function getAggregationCellValue(_ref) {
  var apiRef = _ref.apiRef,
    groupId = _ref.groupId,
    field = _ref.field,
    aggregationFunction = _ref.aggregationFunction,
    aggregationRowsScope = _ref.aggregationRowsScope;
  var filteredRowsLookup = gridFilteredRowsLookupSelector(apiRef);
  var rowIds = apiRef.current.getRowGroupChildren({
    groupId: groupId
  });
  var values = [];
  rowIds.forEach(function (rowId) {
    if (aggregationRowsScope === 'filtered' && filteredRowsLookup[rowId] === false) {
      return;
    }

    // If the row is a group, we want to aggregate based on its children
    // For instance in the following tree, we want the aggregated values of A to be based on A.A, A.B.A and A.B.B but not A.B
    // A
    //   A.A
    //   A.B
    //     A.B.A
    //     A.B.B
    var rowNode = apiRef.current.getRowNode(rowId);
    if (rowNode.type === 'group') {
      return;
    }
    if (typeof aggregationFunction.getCellValue === 'function') {
      var row = apiRef.current.getRow(rowId);
      values.push(aggregationFunction.getCellValue({
        row: row
      }));
    } else {
      values.push(apiRef.current.getCellValue(rowId, field));
    }
  });
  return aggregationFunction.apply({
    values: values,
    groupId: groupId,
    field: field // Added per user request in https://github.com/mui/mui-x/issues/6995#issuecomment-1327423455
  });
};

var getGroupAggregatedValue = function getGroupAggregatedValue(_ref2) {
  var groupId = _ref2.groupId,
    apiRef = _ref2.apiRef,
    aggregationRowsScope = _ref2.aggregationRowsScope,
    aggregatedFields = _ref2.aggregatedFields,
    aggregationRules = _ref2.aggregationRules,
    position = _ref2.position;
  var groupAggregationLookup = {};
  for (var j = 0; j < aggregatedFields.length; j += 1) {
    var aggregatedField = aggregatedFields[j];
    var columnAggregationRules = aggregationRules[aggregatedField];
    groupAggregationLookup[aggregatedField] = {
      position: position,
      value: getAggregationCellValue({
        apiRef: apiRef,
        groupId: groupId,
        field: aggregatedField,
        aggregationFunction: columnAggregationRules.aggregationFunction,
        aggregationRowsScope: aggregationRowsScope
      })
    };
  }
  return groupAggregationLookup;
};
export var createAggregationLookup = function createAggregationLookup(_ref3) {
  var apiRef = _ref3.apiRef,
    aggregationFunctions = _ref3.aggregationFunctions,
    aggregationRowsScope = _ref3.aggregationRowsScope,
    getAggregationPosition = _ref3.getAggregationPosition;
  var aggregationRules = getAggregationRules({
    columnsLookup: gridColumnLookupSelector(apiRef),
    aggregationModel: gridAggregationModelSelector(apiRef),
    aggregationFunctions: aggregationFunctions
  });
  var aggregatedFields = Object.keys(aggregationRules);
  if (aggregatedFields.length === 0) {
    return {};
  }
  var aggregationLookup = {};
  var rowTree = gridRowTreeSelector(apiRef);
  var createGroupAggregationLookup = function createGroupAggregationLookup(groupNode) {
    for (var i = 0; i < groupNode.children.length; i += 1) {
      var childId = groupNode.children[i];
      var childNode = rowTree[childId];
      if (childNode.type === 'group') {
        createGroupAggregationLookup(childNode);
      }
    }
    var hasAggregableChildren = groupNode.children.length;
    if (hasAggregableChildren) {
      var position = getAggregationPosition(groupNode);
      if (position != null) {
        aggregationLookup[groupNode.id] = getGroupAggregatedValue({
          groupId: groupNode.id,
          apiRef: apiRef,
          aggregatedFields: aggregatedFields,
          aggregationRowsScope: aggregationRowsScope,
          aggregationRules: aggregationRules,
          position: position
        });
      }
    }
  };
  createGroupAggregationLookup(rowTree[GRID_ROOT_GROUP_ID]);
  return aggregationLookup;
};