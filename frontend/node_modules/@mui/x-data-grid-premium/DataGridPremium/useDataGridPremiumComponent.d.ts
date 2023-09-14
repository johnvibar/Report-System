import * as React from 'react';
import { GridApiPremium, GridPrivateApiPremium } from '../models/gridApiPremium';
import { DataGridPremiumProcessedProps } from '../models/dataGridPremiumProps';
export declare const useDataGridPremiumComponent: (inputApiRef: React.MutableRefObject<GridApiPremium> | undefined, props: DataGridPremiumProcessedProps) => React.MutableRefObject<GridPrivateApiPremium>;
