import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnNewName, ColumnsState } from "redux/column";
import { MOCK_COLUMNS } from "store";

const initialState: ColumnsState = {
  columns: MOCK_COLUMNS,
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    changeColumnName(state, { payload }: PayloadAction<ColumnNewName>) {
      const copyColumns = { ...state.columns };
      copyColumns[payload.columnId].columnName = payload.columnName;
      state.columns = copyColumns;
    },
  },
});

export const { changeColumnName } = columnsSlice.actions;
export default columnsSlice.reducer;
