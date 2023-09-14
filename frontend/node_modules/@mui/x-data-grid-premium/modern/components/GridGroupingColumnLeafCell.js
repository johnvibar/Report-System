import * as React from 'react';
import Box from '@mui/material/Box';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
function GridGroupingColumnLeafCell(props) {
  const {
    rowNode
  } = props;
  const rootProps = useGridRootProps();
  return /*#__PURE__*/_jsx(Box, {
    sx: {
      ml: rootProps.rowGroupingColumnMode === 'multiple' ? 1 : theme => `calc(var(--DataGrid-cellOffsetMultiplier) * ${theme.spacing(rowNode.depth)})`
    },
    children: props.formattedValue ?? props.value
  });
}
export { GridGroupingColumnLeafCell };