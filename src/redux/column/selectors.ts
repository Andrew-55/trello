import { RootState } from "../store";

export const getColumns = (state: RootState) => {
  return Object.values(state.columns.columns);
};

export const getColumnNameByColumnId =
  (columnId: string) => (state: RootState) => {
    return state.columns.columns[columnId].columnName;
  };
