export interface Department {
  nom: string;
  code: string;
}

export interface Region {
  [key: string]: Department[];
}