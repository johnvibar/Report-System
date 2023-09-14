import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GridPinnedPosition } from '../hooks/features/columnPinning';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function GridColumnMenuPinningItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const theme = useTheme();
  const pinColumn = React.useCallback(side => event => {
    apiRef.current.pinColumn(colDef.field, side);
    onClick(event);
  }, [apiRef, colDef.field, onClick]);
  const unpinColumn = event => {
    apiRef.current.unpinColumn(colDef.field);
    onClick(event);
  };
  const pinToLeftMenuItem = /*#__PURE__*/_jsxs(MenuItem, {
    onClick: pinColumn(GridPinnedPosition.left),
    children: [/*#__PURE__*/_jsx(ListItemIcon, {
      children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuPinLeftIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/_jsx(ListItemText, {
      children: apiRef.current.getLocaleText('pinToLeft')
    })]
  });
  const pinToRightMenuItem = /*#__PURE__*/_jsxs(MenuItem, {
    onClick: pinColumn(GridPinnedPosition.right),
    children: [/*#__PURE__*/_jsx(ListItemIcon, {
      children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuPinRightIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/_jsx(ListItemText, {
      children: apiRef.current.getLocaleText('pinToRight')
    })]
  });
  if (!colDef) {
    return null;
  }
  const side = apiRef.current.isColumnPinned(colDef.field);
  if (side) {
    const otherSide = side === GridPinnedPosition.right ? GridPinnedPosition.left : GridPinnedPosition.right;
    const label = otherSide === GridPinnedPosition.right ? 'pinToRight' : 'pinToLeft';
    const Icon = side === GridPinnedPosition.right ? rootProps.slots.columnMenuPinLeftIcon : rootProps.slots.columnMenuPinRightIcon;
    return /*#__PURE__*/_jsxs(React.Fragment, {
      children: [/*#__PURE__*/_jsxs(MenuItem, {
        onClick: pinColumn(otherSide),
        children: [/*#__PURE__*/_jsx(ListItemIcon, {
          children: /*#__PURE__*/_jsx(Icon, {
            fontSize: "small"
          })
        }), /*#__PURE__*/_jsx(ListItemText, {
          children: apiRef.current.getLocaleText(label)
        })]
      }), /*#__PURE__*/_jsxs(MenuItem, {
        onClick: unpinColumn,
        children: [/*#__PURE__*/_jsx(ListItemIcon, {}), /*#__PURE__*/_jsx(ListItemText, {
          children: apiRef.current.getLocaleText('unpin')
        })]
      })]
    });
  }
  if (theme.direction === 'rtl') {
    return /*#__PURE__*/_jsxs(React.Fragment, {
      children: [pinToRightMenuItem, pinToLeftMenuItem]
    });
  }
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [pinToLeftMenuItem, pinToRightMenuItem]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuPinningItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridColumnMenuPinningItem };