import * as React from 'react';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
import { DataGridPremiumProps } from '../../../models/dataGridPremiumProps';
/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridSelection (state)
 * @requires useGridParamsApi (method)
 */
export declare const useGridExcelExport: (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: DataGridPremiumProps) => void;
