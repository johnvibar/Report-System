import * as React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';
interface DemoLinkProps {
    href: string;
    children: string;
    tabIndex: number;
}
export declare const DemoLink: React.NamedExoticComponent<DemoLinkProps>;
export declare function renderLink(params: GridRenderCellParams<any, string, any>): "" | React.JSX.Element;
export {};
