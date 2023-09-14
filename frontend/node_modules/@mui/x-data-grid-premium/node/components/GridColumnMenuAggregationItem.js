"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuAggregationItem = GridColumnMenuAggregationItem;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _toPropertyKey2 = _interopRequireDefault(require("@babel/runtime/helpers/toPropertyKey"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _utils = require("@mui/utils");
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _gridAggregationUtils = require("../hooks/features/aggregation/gridAggregationUtils");
var _gridAggregationSelectors = require("../hooks/features/aggregation/gridAggregationSelectors");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function GridColumnMenuAggregationItem(props) {
  const {
    colDef
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const id = (0, _utils.unstable_useId)();
  const aggregationModel = (0, _xDataGridPro.useGridSelector)(apiRef, _gridAggregationSelectors.gridAggregationModelSelector);
  const availableAggregationFunctions = React.useMemo(() => (0, _gridAggregationUtils.getAvailableAggregationFunctions)({
    aggregationFunctions: rootProps.aggregationFunctions,
    colDef
  }), [colDef, rootProps.aggregationFunctions]);
  const selectedAggregationRule = React.useMemo(() => {
    if (!colDef || !aggregationModel[colDef.field]) {
      return '';
    }
    const aggregationFunctionName = aggregationModel[colDef.field];
    if ((0, _gridAggregationUtils.canColumnHaveAggregationFunction)({
      colDef,
      aggregationFunctionName,
      aggregationFunction: rootProps.aggregationFunctions[aggregationFunctionName]
    })) {
      return aggregationFunctionName;
    }
    return '';
  }, [rootProps.aggregationFunctions, aggregationModel, colDef]);
  const handleAggregationItemChange = event => {
    const newAggregationItem = event.target?.value || undefined;
    const currentModel = (0, _gridAggregationSelectors.gridAggregationModelSelector)(apiRef);
    const _colDef$field = colDef.field,
      otherColumnItems = (0, _objectWithoutPropertiesLoose2.default)(currentModel, [_colDef$field].map(_toPropertyKey2.default));
    const newModel = newAggregationItem == null ? otherColumnItems : (0, _extends2.default)({}, otherColumnItems, {
      [colDef?.field]: newAggregationItem
    });
    apiRef.current.setAggregationModel(newModel);
    apiRef.current.hideColumnMenu();
  };
  const label = apiRef.current.getLocaleText('aggregationMenuItemHeader');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
    disableRipple: true,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuAggregationIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FormControl.default, {
        size: "small",
        fullWidth: true,
        sx: {
          minWidth: 150
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputLabel.default, {
          id: `${id}-label`,
          children: label
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Select.default, {
          labelId: `${id}-label`,
          id: `${id}-input`,
          value: selectedAggregationRule,
          label: label,
          color: "primary",
          onChange: handleAggregationItemChange,
          onBlur: e => e.stopPropagation(),
          fullWidth: true,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
            value: "",
            children: "..."
          }), availableAggregationFunctions.map(aggFunc => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
            value: aggFunc,
            children: (0, _gridAggregationUtils.getAggregationFunctionLabel)({
              apiRef,
              aggregationRule: {
                aggregationFunctionName: aggFunc,
                aggregationFunction: rootProps.aggregationFunctions[aggFunc]
              }
            })
          }, aggFunc))]
        })]
      })
    })]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuAggregationItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  onClick: _propTypes.default.func.isRequired
} : void 0;