import * as React from 'react';
import { styled } from '@mui/material/styles';
import { jsx as _jsx } from "react/jsx-runtime";
const Link = styled('a')({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  color: 'inherit'
});
export const DemoLink = /*#__PURE__*/React.memo(function DemoLink(props) {
  const handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return /*#__PURE__*/_jsx(Link, {
    tabIndex: props.tabIndex,
    onClick: handleClick,
    href: props.href,
    children: props.children
  });
});
export function renderLink(params) {
  if (params.value == null) {
    return '';
  }
  return /*#__PURE__*/_jsx(DemoLink, {
    href: params.value,
    tabIndex: params.tabIndex,
    children: params.value
  });
}