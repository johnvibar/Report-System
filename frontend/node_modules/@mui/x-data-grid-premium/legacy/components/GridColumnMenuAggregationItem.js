import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toPropertyKey from "@babel/runtime/helpers/esm/toPropertyKey";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useGridSelector } from '@mui/x-data-grid-pro';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { unstable_useId as useId } from '@mui/utils';
import Select from '@mui/material/Select';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { canColumnHaveAggregationFunction, getAggregationFunctionLabel, getAvailableAggregationFunctions } from '../hooks/features/aggregation/gridAggregationUtils';
import { gridAggregationModelSelector } from '../hooks/features/aggregation/gridAggregationSelectors';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function GridColumnMenuAggregationItem(props) {
  var colDef = props.colDef;
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var id = useId();
  var aggregationModel = useGridSelector(apiRef, gridAggregationModelSelector);
  var availableAggregationFunctions = React.useMemo(function () {
    return getAvailableAggregationFunctions({
      aggregationFunctions: rootProps.aggregationFunctions,
      colDef: colDef
    });
  }, [colDef, rootProps.aggregationFunctions]);
  var selectedAggregationRule = React.useMemo(function () {
    if (!colDef || !aggregationModel[colDef.field]) {
      return '';
    }
    var aggregationFunctionName = aggregationModel[colDef.field];
    if (canColumnHaveAggregationFunction({
      colDef: colDef,
      aggregationFunctionName: aggregationFunctionName,
      aggregationFunction: rootProps.aggregationFunctions[aggregationFunctionName]
    })) {
      return aggregationFunctionName;
    }
    return '';
  }, [rootProps.aggregationFunctions, aggregationModel, colDef]);
  var handleAggregationItemChange = function handleAggregationItemChange(event) {
    var _event$target;
    var newAggregationItem = ((_event$target = event.target) == null ? void 0 : _event$target.value) || undefined;
    var currentModel = gridAggregationModelSelector(apiRef);
    var _colDef$field = colDef.field,
      columnItem = currentModel[_colDef$field],
      otherColumnItems = _objectWithoutProperties(currentModel, [_colDef$field].map(_toPropertyKey));
    var newModel = newAggregationItem == null ? otherColumnItems : _extends({}, otherColumnItems, _defineProperty({}, colDef == null ? void 0 : colDef.field, newAggregationItem));
    apiRef.current.setAggregationModel(newModel);
    apiRef.current.hideColumnMenu();
  };
  var label = apiRef.current.getLocaleText('aggregationMenuItemHeader');
  return /*#__PURE__*/_jsxs(MenuItem, {
    disableRipple: true,
    children: [/*#__PURE__*/_jsx(ListItemIcon, {
      children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuAggregationIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/_jsx(ListItemText, {
      children: /*#__PURE__*/_jsxs(FormControl, {
        size: "small",
        fullWidth: true,
        sx: {
          minWidth: 150
        },
        children: [/*#__PURE__*/_jsx(InputLabel, {
          id: "".concat(id, "-label"),
          children: label
        }), /*#__PURE__*/_jsxs(Select, {
          labelId: "".concat(id, "-label"),
          id: "".concat(id, "-input"),
          value: selectedAggregationRule,
          label: label,
          color: "primary",
          onChange: handleAggregationItemChange,
          onBlur: function onBlur(e) {
            return e.stopPropagation();
          },
          fullWidth: true,
          children: [/*#__PURE__*/_jsx(MenuItem, {
            value: "",
            children: "..."
          }), availableAggregationFunctions.map(function (aggFunc) {
            return /*#__PURE__*/_jsx(MenuItem, {
              value: aggFunc,
              children: getAggregationFunctionLabel({
                apiRef: apiRef,
                aggregationRule: {
                  aggregationFunctionName: aggFunc,
                  aggregationFunction: rootProps.aggregationFunctions[aggFunc]
                }
              })
            }, aggFunc);
          })]
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
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridColumnMenuAggregationItem };