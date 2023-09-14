import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const columnReorderStateInitializer: GridStateInitializer;
/**
 * @requires useGridColumns (method)
 */
export declare const useGridColumnReorder: (apiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, 'disableColumnReorder' | 'keepColumnPositionIfDraggedOutside' | 'classes' | 'onColumnOrderChange'>) => void;
