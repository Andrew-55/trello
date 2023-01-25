import { InitialCardsState } from "redux/card";

export const MOCK_CARDS: InitialCardsState = {
  c01: {
    id: "c01",
    title: "Test card one",
    description: "Some description of the card",
    columnId: "col01",
    author: "Second",
  },
  c02: {
    id: "c02",
    title: "Test card two",
    description: "Some description of the card",
    columnId: "col03",
    author: "Second",
  },
  c03: {
    id: "c03",
    title: "Test card three",
    description: "",
    columnId: "col02",
    author: "First",
  },
  c04: {
    id: "c04",
    title: "Test card four",
    description: "Some description of the card",
    columnId: "col03",
    author: "First",
  },
};
