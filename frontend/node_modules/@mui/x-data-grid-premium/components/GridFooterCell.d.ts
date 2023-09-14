import * as React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
interface GridFooterCellProps extends GridRenderCellParams {
    sx?: SxProps<Theme>;
}
declare function GridFooterCell(props: GridFooterCellProps): React.JSX.Element;
export { GridFooterCell };
