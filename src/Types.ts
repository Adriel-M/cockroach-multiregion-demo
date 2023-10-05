export interface ConnectionInfo {
  region: string;
  host: string;
  port: number;
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
