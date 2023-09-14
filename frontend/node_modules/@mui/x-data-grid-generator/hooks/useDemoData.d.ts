import { GridColumnVisibilityModel } from '@mui/x-data-grid-premium';
import { GridColDefGenerator } from '../services/gridColDefGenerator';
import { AddPathToDemoDataOptions, DemoTreeDataValue } from '../services/tree-data-generator';
export type DemoDataReturnType = {
    data: DemoTreeDataValue;
    loading: boolean;
    setRowLength: (count: number) => void;
    loadNewData: () => void;
};
type DataSet = 'Commodity' | 'Employee';
export interface UseDemoDataOptions {
    dataSet: DataSet;
    rowLength: number;
    maxColumns?: number;
    visibleFields?: string[];
    editable?: boolean;
    treeData?: AddPathToDemoDataOptions;
}
export interface ColumnsOptions extends Pick<UseDemoDataOptions, 'dataSet' | 'editable' | 'maxColumns' | 'visibleFields'> {
}
export declare const getColumnsFromOptions: (options: ColumnsOptions) => GridColDefGenerator[];
export declare const getInitialState: (options: UseDemoDataOptions, columns: GridColDefGenerator[]) => {
    columns: {
        columnVisibilityModel: GridColumnVisibilityModel;
    };
};
export declare const useDemoData: (options: UseDemoDataOptions) => DemoDataReturnType;
export {};
