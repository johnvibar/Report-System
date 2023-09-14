import type * as Excel from 'exceljs';
import { GridRowId, GridColDef } from '@mui/x-data-grid-pro';
import { GridStateColDef, GridColumnGroupLookup } from '@mui/x-data-grid/internals';
import { GridExceljsProcessInput, ColumnsStylesInterface, GridExcelExportOptions } from '../gridExcelExportInterface';
import { GridPrivateApiPremium } from '../../../../models/gridApiPremium';
interface SerializedRow {
    row: Record<string, undefined | number | boolean | string | Date>;
    dataValidation: Record<string, Excel.DataValidation>;
    outlineLevel: number;
    mergedCells: {
        leftIndex: number;
        rightIndex: number;
    }[];
}
export declare const serializeRow: (id: GridRowId, columns: GridStateColDef[], api: GridPrivateApiPremium, defaultValueOptionsFormulae: {
    [field: string]: {
        address: string;
    };
}) => SerializedRow;
export declare const serializeColumn: (column: GridColDef, columnsStyles: ColumnsStylesInterface) => {
    key: string;
    headerText: string;
    width: number;
    style: {
        numFmt?: string | undefined;
        font?: Partial<Excel.Font> | undefined;
        alignment?: Partial<Excel.Alignment> | undefined;
        protection?: Partial<Excel.Protection> | undefined;
        border?: Partial<Excel.Borders> | undefined;
        fill?: Excel.Fill | undefined;
    };
};
type SerializedColumns = Array<{
    key: string;
    width: number;
    style: Partial<Excel.Style>;
    headerText: string;
}>;
export declare function serializeColumns(columns: GridStateColDef[], styles: ColumnsStylesInterface): SerializedColumns;
type ValueOptionsData = Record<string, {
    values: (string | number)[];
    address: string;
}>;
export declare function getDataForValueOptionsSheet(columns: GridStateColDef[], valueOptionsSheetName: string, api: GridPrivateApiPremium): Promise<ValueOptionsData>;
interface BuildExcelOptions {
    columns: GridStateColDef[];
    rowIds: GridRowId[];
    includeHeaders: boolean;
    includeColumnGroupsHeaders: boolean;
    valueOptionsSheetName: string;
    exceljsPreProcess?: (processInput: GridExceljsProcessInput) => Promise<void>;
    exceljsPostProcess?: (processInput: GridExceljsProcessInput) => Promise<void>;
    columnsStyles?: ColumnsStylesInterface;
}
export declare function buildExcel(options: BuildExcelOptions, api: GridPrivateApiPremium): Promise<Excel.Workbook>;
export interface ExcelExportInitEvent {
    serializedColumns: SerializedColumns;
    serializedRows: SerializedRow[];
    valueOptionsSheetName: string;
    columnGroupPaths: Record<string, string[]>;
    columnGroupDetails: GridColumnGroupLookup;
    valueOptionsData: ValueOptionsData;
    options: Omit<GridExcelExportOptions, 'exceljsPreProcess' | 'exceljsPostProcess' | 'columnsStyles' | 'valueOptionsSheetName'>;
}
export declare function setupExcelExportWebWorker(workerOptions?: Pick<GridExcelExportOptions, 'exceljsPostProcess' | 'exceljsPreProcess'>): void;
export {};
