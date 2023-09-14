import * as React from 'react';
import { GridApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const useGridDetailPanelCache: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'getDetailPanelContent' | 'getDetailPanelHeight'>) => void;
