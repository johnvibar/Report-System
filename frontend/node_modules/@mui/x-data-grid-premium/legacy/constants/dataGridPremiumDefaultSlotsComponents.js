import _extends from "@babel/runtime/helpers/esm/extends";
import { DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS } from '@mui/x-data-grid-pro/internals';
import { GridPremiumColumnMenu } from '../components/GridPremiumColumnMenu';
import materialSlots from '../material';
export var DATA_GRID_PREMIUM_DEFAULT_SLOTS_COMPONENTS = _extends({}, DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS, materialSlots, {
  ColumnMenu: GridPremiumColumnMenu
});