import * as React from 'react';
import { useGridApiEventHandler } from '@mui/x-data-grid';
export const useGridTreeData = apiRef => {
  /**
   * EVENTS
   */
  const handleCellKeyDown = React.useCallback((params, event) => {
    const cellParams = apiRef.current.getCellParams(params.id, params.field);
    if (cellParams.colDef.type === 'treeDataGroup' && event.key === ' ' && !event.shiftKey) {
      if (params.rowNode.type !== 'group') {
        return;
      }
      apiRef.current.setRowChildrenExpansion(params.id, !params.rowNode.childrenExpanded);
    }
  }, [apiRef]);
  useGridApiEventHandler(apiRef, 'cellKeyDown', handleCellKeyDown);
};