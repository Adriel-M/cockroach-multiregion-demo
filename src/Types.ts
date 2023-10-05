export interface ConnectionInfo {
  region: string;
  host: string;
  port: number;
  flag: string;
}

export interface ColorRow {
  id: number;
  color: string;
}

export enum WindowType {
  empty,
  Main,
  DatabaseClient,
}
