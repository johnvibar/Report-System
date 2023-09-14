import * as React from 'react';
import { GridRenderCellParams, GridGroupNode } from '@mui/x-data-grid-pro';
interface GridGroupingCriteriaCellProps extends GridRenderCellParams<any, any, any, GridGroupNode> {
    hideDescendantCount?: boolean;
}
export declare function GridGroupingCriteriaCell(props: GridGroupingCriteriaCellProps): React.JSX.Element;
export {};
