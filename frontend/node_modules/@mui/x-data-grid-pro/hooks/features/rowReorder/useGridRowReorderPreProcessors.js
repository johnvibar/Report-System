import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { getDataGridUtilityClass } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import { GRID_REORDER_COL_DEF } from './gridRowReorderColDef';
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  return React.useMemo(() => {
    const slots = {
      rowReorderCellContainer: ['rowReorderCellContainer'],
      columnHeaderReorder: ['columnHeaderReorder']
    };
    return composeClasses(slots, getDataGridUtilityClass, classes);
  }, [classes]);
};
export const useGridRowReorderPreProcessors = (privateApiRef, props) => {
  const ownerState = {
    classes: props.classes
  };
  const classes = useUtilityClasses(ownerState);
  const updateReorderColumn = React.useCallback(columnsState => {
    const reorderColumn = _extends({}, GRID_REORDER_COL_DEF, {
      cellClassName: classes.rowReorderCellContainer,
      headerClassName: classes.columnHeaderReorder,
      headerName: privateApiRef.current.getLocaleText('rowReorderingHeaderName')
    });
    const shouldHaveReorderColumn = props.rowReordering;
    const haveReorderColumn = columnsState.lookup[reorderColumn.field] != null;
    if (shouldHaveReorderColumn && haveReorderColumn) {
      return columnsState;
    }
    if (shouldHaveReorderColumn && !haveReorderColumn) {
      columnsState.lookup[reorderColumn.field] = reorderColumn;
      columnsState.orderedFields = [reorderColumn.field, ...columnsState.orderedFields];
    } else if (!shouldHaveReorderColumn && haveReorderColumn) {
      delete columnsState.lookup[reorderColumn.field];
      columnsState.orderedFields = columnsState.orderedFields.filter(field => field !== reorderColumn.field);
    }
    return columnsState;
  }, [privateApiRef, classes, props.rowReordering]);
  useGridRegisterPipeProcessor(privateApiRef, 'hydrateColumns', updateReorderColumn);
};