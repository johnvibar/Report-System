import { GridColDef } from '@mui/x-data-grid-premium';
export type Movie = {
    id: number;
    title: string;
    gross: number;
    budget: number;
    director: string;
    company: string;
    year: number;
    imdbRating: number;
    composer: {
        name: string;
    };
    cinematicUniverse?: string;
};
export declare const useMovieData: () => {
    rows: Movie[];
    columns: GridColDef[];
};
