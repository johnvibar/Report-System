import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const detailPanelStateInitializer: GridStateInitializer<Pick<DataGridProProcessedProps, 'initialState' | 'detailPanelExpandedRowIds'>>;
export declare const useGridDetailPanel: (apiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, 'getDetailPanelContent' | 'getDetailPanelHeight' | 'detailPanelExpandedRowIds' | 'onDetailPanelExpandedRowIdsChange'>) => void;
