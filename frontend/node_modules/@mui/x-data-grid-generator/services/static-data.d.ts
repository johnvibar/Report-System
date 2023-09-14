export declare const COLORS: ("#2196f3" | "#4caf50" | "#03a9f4" | "#ff9800" | "#e91e63" | "#9c27b0" | "#f44336")[];
export declare const STATUS_OPTIONS: string[];
export declare const TAXCODE_OPTIONS: string[];
export declare const RATE_TYPE_OPTIONS: string[];
export declare const CONTRACT_TYPE_OPTIONS: string[];
export declare const INCOTERM_OPTIONS: string[];
export declare const COMMODITY_OPTIONS: string[];
export declare const CURRENCY_OPTIONS: string[];
export declare const COUNTRY_OPTIONS: string[];
export interface CountryIsoOption {
    value: string;
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}
export declare const COUNTRY_ISO_OPTIONS: CountryIsoOption[];
export declare const COUNTRY_ISO_OPTIONS_SORTED: CountryIsoOption[];
