export { default as columnsReducer } from "./slice";

export { changeColumnName } from "./slice";

export { getColumns, getColumnNameByColumnId } from "./selectors";

export type {
  InitialColumnsState,
  ColumnInterface,
  ColumnNewName,
  ColumnsState,
} from "./types";
