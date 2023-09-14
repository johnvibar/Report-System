import * as React from 'react';
import { GridExportMenuItemProps } from '@mui/x-data-grid-pro';
import { GridExcelExportOptions } from '../hooks/features/export';
export type GridExcelExportMenuItemProps = GridExportMenuItemProps<GridExcelExportOptions>;
declare function GridExcelExportMenuItem(props: GridExcelExportMenuItemProps): React.JSX.Element;
declare namespace GridExcelExportMenuItem {
    var propTypes: any;
}
export { GridExcelExportMenuItem };
