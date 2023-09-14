import * as React from 'react';
import { GridApiPro, GridPrivateApiPro } from '../models/gridApiPro';
import { DataGridProProcessedProps } from '../models/dataGridProProps';
export declare const useDataGridProComponent: (inputApiRef: React.MutableRefObject<GridApiPro> | undefined, props: DataGridProProcessedProps) => React.MutableRefObject<GridPrivateApiPro>;
