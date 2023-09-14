import { GridValidRowModel } from '@mui/x-data-grid';
import { DataGridProProps, DataGridProProcessedProps, DataGridProPropsWithDefaultValue } from '../models/dataGridProProps';
/**
 * The default values of `DataGridProPropsWithDefaultValue` to inject in the props of DataGridPro.
 */
export declare const DATA_GRID_PRO_PROPS_DEFAULT_VALUES: DataGridProPropsWithDefaultValue;
export declare const useDataGridProProps: <R extends GridValidRowModel>(inProps: DataGridProProps<R>) => DataGridProProcessedProps<R>;
