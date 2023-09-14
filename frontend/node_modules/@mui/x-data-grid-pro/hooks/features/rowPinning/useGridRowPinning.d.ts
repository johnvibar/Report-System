import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const rowPinningStateInitializer: GridStateInitializer<Pick<DataGridProProcessedProps, 'pinnedRows' | 'getRowId' | 'experimentalFeatures'>>;
export declare const useGridRowPinning: (apiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, 'pinnedRows' | 'getRowId'>) => void;
