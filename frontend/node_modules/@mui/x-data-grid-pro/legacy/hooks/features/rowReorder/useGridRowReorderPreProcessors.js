import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { getDataGridUtilityClass } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import { GRID_REORDER_COL_DEF } from './gridRowReorderColDef';
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  return React.useMemo(function () {
    var slots = {
      rowReorderCellContainer: ['rowReorderCellContainer'],
      columnHeaderReorder: ['columnHeaderReorder']
    };
    return composeClasses(slots, getDataGridUtilityClass, classes);
  }, [classes]);
};
export var useGridRowReorderPreProcessors = function useGridRowReorderPreProcessors(privateApiRef, props) {
  var ownerState = {
    classes: props.classes
  };
  var classes = useUtilityClasses(ownerState);
  var updateReorderColumn = React.useCallback(function (columnsState) {
    var reorderColumn = _extends({}, GRID_REORDER_COL_DEF, {
      cellClassName: classes.rowReorderCellContainer,
      headerClassName: classes.columnHeaderReorder,
      headerName: privateApiRef.current.getLocaleText('rowReorderingHeaderName')
    });
    var shouldHaveReorderColumn = props.rowReordering;
    var haveReorderColumn = columnsState.lookup[reorderColumn.field] != null;
    if (shouldHaveReorderColumn && haveReorderColumn) {
      return columnsState;
    }
    if (shouldHaveReorderColumn && !haveReorderColumn) {
      columnsState.lookup[reorderColumn.field] = reorderColumn;
      columnsState.orderedFields = [reorderColumn.field].concat(_toConsumableArray(columnsState.orderedFields));
    } else if (!shouldHaveReorderColumn && haveReorderColumn) {
      delete columnsState.lookup[reorderColumn.field];
      columnsState.orderedFields = columnsState.orderedFields.filter(function (field) {
        return field !== reorderColumn.field;
      });
    }
    return columnsState;
  }, [privateApiRef, classes, props.rowReordering]);
  useGridRegisterPipeProcessor(privateApiRef, 'hydrateColumns', updateReorderColumn);
};