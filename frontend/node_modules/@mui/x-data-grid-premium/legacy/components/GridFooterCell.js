import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["formattedValue", "colDef", "cellMode", "row", "api", "id", "value", "rowNode", "field", "focusElementRef", "hasFocus", "tabIndex", "isEditable"];
import * as React from 'react';
import { getDataGridUtilityClass } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
var GridFooterCellRoot = styled(Box, {
  name: 'MuiDataGrid',
  slot: 'FooterCell',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.footerCell;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    fontWeight: theme.typography.fontWeightMedium,
    color: (theme.vars || theme).palette.primary.dark
  };
});
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['footerCell']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridFooterCell(props) {
  var formattedValue = props.formattedValue,
    colDef = props.colDef,
    cellMode = props.cellMode,
    row = props.row,
    api = props.api,
    id = props.id,
    value = props.value,
    rowNode = props.rowNode,
    field = props.field,
    focusElementRef = props.focusElementRef,
    hasFocus = props.hasFocus,
    tabIndex = props.tabIndex,
    isEditable = props.isEditable,
    other = _objectWithoutProperties(props, _excluded);
  var rootProps = useGridRootProps();
  var ownerState = rootProps;
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridFooterCellRoot, _extends({
    ownerState: ownerState,
    className: classes.root
  }, other, {
    children: formattedValue
  }));
}
export { GridFooterCell };