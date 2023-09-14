import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { jsx as _jsx } from "react/jsx-runtime";
const Value = styled('div')(({
  theme
}) => ({
  width: '100%',
  fontVariantNumeric: 'tabular-nums',
  '&.positive': {
    color: theme.palette.mode === 'light' ? theme.palette.success.dark : theme.palette.success.light
  },
  '&.negative': {
    color: theme.palette.mode === 'light' ? theme.palette.error.dark : theme.palette.error.light
  }
}));
function pnlFormatter(value) {
  return value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString();
}
const Pnl = /*#__PURE__*/React.memo(function Pnl(props) {
  const {
    value
  } = props;
  return /*#__PURE__*/_jsx(Value, {
    className: clsx(value > 0 && "positive", value < 0 && "negative"),
    children: pnlFormatter(value)
  });
});
export function renderPnl(params) {
  if (params.value == null) {
    return '';
  }
  return /*#__PURE__*/_jsx(Pnl, {
    value: params.value
  });
}