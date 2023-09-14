import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { jsx as _jsx } from "react/jsx-runtime";
export function renderAvatar(params) {
  if (params.value == null) {
    return '';
  }
  return /*#__PURE__*/_jsx(Avatar, {
    style: {
      backgroundColor: params.value.color
    },
    children: params.value.name.toUpperCase().substring(0, 1)
  });
}