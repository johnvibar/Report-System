import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useGridSelector, gridColumnLookupSelector } from '@mui/x-data-grid-pro';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import { getRowGroupingCriteriaFromGroupingField, GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, isGroupingColumn } from '../hooks/features/rowGrouping/gridRowGroupingUtils';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function GridColumnMenuRowGroupItem(props) {
  var colDef = props.colDef,
    onClick = props.onClick;
  var apiRef = useGridApiContext();
  var rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  var columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);
  var rootProps = useGridRootProps();
  var renderUnGroupingMenuItem = function renderUnGroupingMenuItem(field) {
    var _columnsLookup$field$;
    var ungroupColumn = function ungroupColumn(event) {
      apiRef.current.removeRowGroupingCriteria(field);
      onClick(event);
    };
    var name = (_columnsLookup$field$ = columnsLookup[field].headerName) != null ? _columnsLookup$field$ : field;
    return /*#__PURE__*/_jsxs(MenuItem, {
      onClick: ungroupColumn,
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/_jsx(ListItemText, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name)
      })]
    }, field);
  };
  if (!colDef || !isGroupingColumn(colDef.field)) {
    return null;
  }
  if (colDef.field === GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
    return /*#__PURE__*/_jsx(React.Fragment, {
      children: rowGroupingModel.map(renderUnGroupingMenuItem)
    });
  }
  return renderUnGroupingMenuItem(getRowGroupingCriteriaFromGroupingField(colDef.field));
}
process.env.NODE_ENV !== "production" ? GridColumnMenuRowGroupItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridColumnMenuRowGroupItem };