export interface Currency {
  code?: string;
  name: string;
  symbol?: string;
}

export interface Language {
  name: string;
  nativeName?: string;
  iso639_1?: string;
  iso639_2?: string;
}

export interface Country {
  name: string;
  nativeName?: string;
  population: number;
  region: string;
  subregion?: string;
  capital?: string;
  topLevelDomain?: string[];
  currencies?: Currency[];
  languages?: Language[];
  borders?: string[];
  flag: string;
  flags?: {
    svg?: string;
    png?: string;
  };
  alpha3Code?: string;
}
