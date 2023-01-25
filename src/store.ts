import { InitialCardsState } from "redux/card";
import { InitialColumnsState } from "redux/column";
import { InitialCommitsState } from "redux/comment";

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

export const MOCK_COMMENTS: InitialCommitsState = {
  com01: {
    commentId: "com01",
    cardId: "c01",
    author: "First",
    content: "Cool",
  },
  com02: {
    commentId: "com02",
    cardId: "c01",
    author: "Second",
    content: "Hi",
  },
  com03: {
    commentId: "com03",
    cardId: "c03",
    author: "Second",
    content: "Hello",
  },
  com04: {
    commentId: "com04",
    cardId: "c03",
    author: "Bear",
    content: "Oh gosh",
  },
  com05: {
    commentId: "com05",
    cardId: "c04",
    author: "Wolf",
    content: "Start",
  },
  com06: { commentId: "com06", cardId: "c01", author: "Second", content: "Hi" },
  com07: { commentId: "com07", cardId: "c01", author: "Second", content: "Hi" },
  com08: { commentId: "com08", cardId: "c01", author: "Second", content: "Hi" },
  com09: { commentId: "com09", cardId: "c01", author: "Second", content: "Hi" },
  com10: { commentId: "com10", cardId: "c01", author: "Second", content: "Hi" },
  com11: { commentId: "com11", cardId: "c01", author: "Second", content: "Hi" },
  com12: {
    commentId: "com12",
    cardId: "c01",
    author: "Second",
    content: "last",
  },
};
