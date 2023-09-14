import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { GridFooterCell } from './GridFooterCell';
import { jsx as _jsx } from "react/jsx-runtime";
function GridGroupingColumnFooterCell(props) {
  const rootProps = useGridRootProps();
  const sx = {
    ml: 0
  };
  if (props.rowNode.parent == null) {
    sx.ml = 0;
  } else if (rootProps.rowGroupingColumnMode === 'multiple') {
    sx.ml = 2;
  } else {
    sx.ml = theme => `calc(var(--DataGrid-cellOffsetMultiplier) * ${theme.spacing(props.rowNode.depth)})`;
  }
  return /*#__PURE__*/_jsx(GridFooterCell, _extends({
    sx: sx
  }, props));
}
export { GridGroupingColumnFooterCell };