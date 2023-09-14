/// <reference types="react" />
import { GridRowId } from '@mui/x-data-grid';
import { GridStatePro } from '../../../models/gridStatePro';
export declare const gridDetailPanelExpandedRowIdsSelector: (state: GridStatePro) => GridRowId[];
export declare const gridDetailPanelExpandedRowsContentCacheSelector: (state: GridStatePro) => Record<GridRowId, import("react").ReactNode>;
export declare const gridDetailPanelRawHeightCacheSelector: (state: GridStatePro) => {
    [x: string]: {
        autoHeight: boolean;
        height: number;
    };
    [x: number]: {
        autoHeight: boolean;
        height: number;
    };
};
export declare const gridDetailPanelExpandedRowsHeightCacheSelector: import("@mui/x-data-grid").OutputSelector<GridStatePro, Record<GridRowId, number>>;
