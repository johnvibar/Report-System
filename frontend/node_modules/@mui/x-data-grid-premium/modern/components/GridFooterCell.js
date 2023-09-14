import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["formattedValue", "colDef", "cellMode", "row", "api", "id", "value", "rowNode", "field", "focusElementRef", "hasFocus", "tabIndex", "isEditable"];
import * as React from 'react';
import { getDataGridUtilityClass } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
const GridFooterCellRoot = styled(Box, {
  name: 'MuiDataGrid',
  slot: 'FooterCell',
  overridesResolver: (_, styles) => styles.footerCell
})(({
  theme
}) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: (theme.vars || theme).palette.primary.dark
}));
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['footerCell']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridFooterCell(props) {
  const {
      formattedValue
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootProps = useGridRootProps();
  const ownerState = rootProps;
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridFooterCellRoot, _extends({
    ownerState: ownerState,
    className: classes.root
  }, other, {
    children: formattedValue
  }));
}
export { GridFooterCell };