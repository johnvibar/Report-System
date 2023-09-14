import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
export declare const useGridTreeDataPreProcessors: (privateApiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps, 'treeData' | 'groupingColDef' | 'getTreeDataPath' | 'disableChildrenSorting' | 'disableChildrenFiltering' | 'defaultGroupingExpansionDepth' | 'isGroupExpandedByDefault'>) => void;
