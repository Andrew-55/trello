import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockColumnsType } from "interfaces";
import { MOCK_COLUMNS } from "store";

interface ColumnsState {
  columns: MockColumnsType;
}

interface ColumnNewName {
  columnId: string;
  newName: string;
}

const initialState: ColumnsState = {
  columns: MOCK_COLUMNS,
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    changeColumnName(state, action: PayloadAction<ColumnNewName>) {
      const copyColumns: MockColumnsType = { ...state.columns };
      copyColumns[action.payload.columnId].columnName = action.payload.newName;
      state.columns = copyColumns;
    },
  },
});

export const { changeColumnName } = columnsSlice.actions;
export default columnsSlice.reducer;
