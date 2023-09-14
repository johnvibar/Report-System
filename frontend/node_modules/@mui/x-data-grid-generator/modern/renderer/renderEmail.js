import * as React from 'react';
import { DemoLink } from './renderLink';
import { jsx as _jsx } from "react/jsx-runtime";
export function renderEmail(params) {
  const email = params.value ?? '';
  return /*#__PURE__*/_jsx(DemoLink, {
    href: `mailto:${email}`,
    tabIndex: params.tabIndex,
    children: email
  });
}