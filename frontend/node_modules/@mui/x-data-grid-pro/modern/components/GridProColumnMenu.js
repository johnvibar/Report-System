import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { GridGenericColumnMenu, GRID_COLUMN_MENU_SLOTS, GRID_COLUMN_MENU_SLOT_PROPS } from '@mui/x-data-grid';
import { GridColumnMenuPinningItem } from './GridColumnMenuPinningItem';
import { jsx as _jsx } from "react/jsx-runtime";
export const GRID_COLUMN_MENU_SLOTS_PRO = _extends({}, GRID_COLUMN_MENU_SLOTS, {
  columnMenuPinningItem: GridColumnMenuPinningItem
});
export const GRID_COLUMN_MENU_SLOT_PROPS_PRO = _extends({}, GRID_COLUMN_MENU_SLOT_PROPS, {
  columnMenuPinningItem: {
    displayOrder: 15
  }
});
const GridProColumnMenu = /*#__PURE__*/React.forwardRef(function GridProColumnMenu(props, ref) {
  return /*#__PURE__*/_jsx(GridGenericColumnMenu, _extends({
    ref: ref
  }, props, {
    defaultSlots: GRID_COLUMN_MENU_SLOTS_PRO,
    defaultSlotProps: GRID_COLUMN_MENU_SLOT_PROPS_PRO
  }));
});
process.env.NODE_ENV !== "production" ? GridProColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
} : void 0;
export { GridProColumnMenu };