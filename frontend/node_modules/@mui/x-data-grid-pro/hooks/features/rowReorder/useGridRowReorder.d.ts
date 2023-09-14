import * as React from 'react';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
/**
 * Only available in DataGridPro
 * @requires useGridRows (method)
 */
export declare const useGridRowReorder: (apiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, 'rowReordering' | 'onRowOrderChange' | 'classes'>) => void;
