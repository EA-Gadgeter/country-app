export interface Country {
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Currencies;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini?:        { [key: string]: number };
    fifa:         string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
}

interface CapitalInfo {
    latlng: number[];
}

interface Car {
    signs: string[];
    side:  string;
}

interface CoatOfArms {
    png?: string;
    svg?: string;
}

interface Currencies {
    USD?: Clp;
    DOP?: Clp;
    CRC?: Clp;
    CLP?: Clp;
    YER?: Clp;
    EUR?: Clp;
}

interface Clp {
    name:   string;
    symbol: string;
}

interface Demonyms {
    eng: Eng;
    fra: Eng;
}

interface Eng {
    f: string;
    m: string;
}

interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

interface Idd {
    root:     string;
    suffixes: string[];
}

interface Languages {
    spa?: string;
    eng?: string;
    ara?: string;
    ita?: string;
}

interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

interface NativeName {
    spa?: Translation;
    eng?: Translation;
    ara?: Translation;
    ita?: Translation;
}

interface Translation {
    official: string;
    common:   string;
}

interface PostalCode {
    format: string;
    regex:  string;
}
