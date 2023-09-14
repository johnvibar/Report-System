import * as React from 'react';
import clsx from 'clsx';
import { alpha, styled } from '@mui/material/styles';
import { jsx as _jsx } from "react/jsx-runtime";
const Value = styled('div')(({
  theme
}) => ({
  width: '100%',
  height: '100%',
  lineHeight: '100%',
  paddingRight: 8,
  fontVariantNumeric: 'tabular-nums',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  '&.good': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.success.mainChannel} /  0.3)` : alpha(theme.palette.success.main, 0.3)
  },
  '&.bad': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.error.mainChannel} /  0.3)` : alpha(theme.palette.error.main, 0.3)
  }
}));
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const TotalPrice = /*#__PURE__*/React.memo(function TotalPrice(props) {
  const {
    value
  } = props;
  return /*#__PURE__*/_jsx(Value, {
    className: clsx(value > 1000000 && "good", value < 1000000 && "bad"),
    children: currencyFormatter.format(value)
  });
});
export function renderTotalPrice(params) {
  if (params.value == null) {
    return '';
  }

  // If the aggregated value does not have the same unit as the other cell
  // Then we fall back to the default rendering based on `valueGetter` instead of rendering the total price UI.
  if (params.aggregation && !params.aggregation.hasCellUnit) {
    return null;
  }
  return /*#__PURE__*/_jsx(TotalPrice, {
    value: params.value
  });
}