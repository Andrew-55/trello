import { InitialColumnsState } from "redux/column";

export const MOCK_COLUMNS: InitialColumnsState = {
  col01: {
    columnId: "col01",
    columnName: "TODO",
  },
  col02: {
    columnId: "col02",
    columnName: "In Progress",
  },
  col03: {
    columnId: "col03",
    columnName: "Testing",
  },
  col04: { columnId: "col04", columnName: "Done" },
};
