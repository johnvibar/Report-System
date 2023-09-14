import * as React from 'react';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const GRID_SKELETON_ROW_ROOT_ID = "auto-generated-skeleton-row-root";
export declare const useGridLazyLoaderPreProcessors: (privateApiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, 'rowCount' | 'rowsLoadingMode' | 'experimentalFeatures'>) => void;
