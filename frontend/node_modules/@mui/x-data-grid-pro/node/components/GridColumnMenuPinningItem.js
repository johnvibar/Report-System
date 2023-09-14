"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuPinningItem = GridColumnMenuPinningItem;
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _columnPinning = require("../hooks/features/columnPinning");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function GridColumnMenuPinningItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const theme = (0, _styles.useTheme)();
  const pinColumn = React.useCallback(side => event => {
    apiRef.current.pinColumn(colDef.field, side);
    onClick(event);
  }, [apiRef, colDef.field, onClick]);
  const unpinColumn = event => {
    apiRef.current.unpinColumn(colDef.field);
    onClick(event);
  };
  const pinToLeftMenuItem = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
    onClick: pinColumn(_columnPinning.GridPinnedPosition.left),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuPinLeftIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
      children: apiRef.current.getLocaleText('pinToLeft')
    })]
  });
  const pinToRightMenuItem = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
    onClick: pinColumn(_columnPinning.GridPinnedPosition.right),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuPinRightIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
      children: apiRef.current.getLocaleText('pinToRight')
    })]
  });
  if (!colDef) {
    return null;
  }
  const side = apiRef.current.isColumnPinned(colDef.field);
  if (side) {
    const otherSide = side === _columnPinning.GridPinnedPosition.right ? _columnPinning.GridPinnedPosition.left : _columnPinning.GridPinnedPosition.right;
    const label = otherSide === _columnPinning.GridPinnedPosition.right ? 'pinToRight' : 'pinToLeft';
    const Icon = side === _columnPinning.GridPinnedPosition.right ? rootProps.slots.columnMenuPinLeftIcon : rootProps.slots.columnMenuPinRightIcon;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
        onClick: pinColumn(otherSide),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, {
            fontSize: "small"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
          children: apiRef.current.getLocaleText(label)
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
        onClick: unpinColumn,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
          children: apiRef.current.getLocaleText('unpin')
        })]
      })]
    });
  }
  if (theme.direction === 'rtl') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [pinToRightMenuItem, pinToLeftMenuItem]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [pinToLeftMenuItem, pinToRightMenuItem]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuPinningItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  onClick: _propTypes.default.func.isRequired
} : void 0;