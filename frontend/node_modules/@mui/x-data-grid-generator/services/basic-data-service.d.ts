import { GridColDef, GridRowId } from '@mui/x-data-grid';
export declare const currencyPairs: string[];
interface GridBasicRowModel {
    id: GridRowId;
    currencyPair: string;
    [price: string]: number | string;
}
export interface GridBasicData {
    columns: GridColDef[];
    rows: GridBasicRowModel[];
}
export declare const getBasicGridData: (rowLength: number, colLength: number) => GridBasicData;
export {};
