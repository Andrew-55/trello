import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockColumnsType } from "interfaces";
import { MOCK_COLUMNS } from "store";

import { ColumnNewName, ColumnsState } from "./types";

const initialState: ColumnsState = {
  columns: MOCK_COLUMNS,
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    changeColumnName(state, { payload }: PayloadAction<ColumnNewName>) {
      const copyColumns: MockColumnsType = { ...state.columns };
      copyColumns[payload.columnId].columnName = payload.columnName;
      state.columns = copyColumns;
    },
  },
});

export const { changeColumnName } = columnsSlice.actions;
export default columnsSlice.reducer;
