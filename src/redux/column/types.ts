import { MockColumnsType } from "interfaces";

export interface ColumnsState {
  columns: MockColumnsType;
}

export interface ColumnNewName {
  columnId: string;
  columnName: string;
}
