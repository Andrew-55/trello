export interface ColumnInterface {
  columnId: string;
  columnName: string;
}

export type InitialColumnsState = Record<string, ColumnInterface>;

export interface ColumnsState {
  columns: InitialColumnsState;
}

export interface ColumnNewName {
  columnId: string;
  columnName: string;
}
