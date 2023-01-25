import { RootState } from "../store";

export const selectorColumns = (state: RootState) => state.columns.columns;

export const selectorColumnNameByColumnId =
  (columnId: string) => (state: RootState) => {
    const columns = { ...state.columns.columns };
    return columns[columnId].columnName;
  };
