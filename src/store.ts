export const MOCK_CARDS = [
  {
    id: "c01",
    title: "Test card one",
    description: "Some description of the card",
    columnId: "col01",
    author: "Second",
  },
  {
    id: "c02",
    title: "Test card two",
    description: "Some description of the card",
    columnId: "col03",
    author: "Second",
  },
  {
    id: "c03",
    title: "Test card three",
    description: "",
    columnId: "col02",
    author: "First",
  },
  {
    id: "c04",
    title: "Test card four",
    description: "Some description of the card",
    columnId: "col03",
    author: "First",
  },
];

export const MOCK_COLUMNS = [
  {
    columnId: "col01",
    columnName: "TODO",
  },
  {
    columnId: "col02",
    columnName: "In Progress",
  },
  {
    columnId: "col03",
    columnName: "Testing",
  },
  { columnId: "col04", columnName: "Done" },
];

export const MOCK_COMMENTS = [
  {
    commentId: "com01",
    cardId: "c01",
    author: "First",
    comment: "Cool",
  },
  {
    commentId: "com02",
    cardId: "c01",
    author: "Second",
    comment: "Hi",
  },
  {
    commentId: "com03",
    cardId: "c03",
    author: "Second",
    comment: "Hello",
  },
  {
    commentId: "com04",
    cardId: "c03",
    author: "Bear",
    comment: "Oh gosh",
  },
  {
    commentId: "com05",
    cardId: "c04",
    author: "Wolf",
    comment: "Start",
  },
  { commentId: "com06", cardId: "c01", author: "Second", comment: "Hi" },
  { commentId: "com07", cardId: "c01", author: "Second", comment: "Hi" },
  { commentId: "com08", cardId: "c01", author: "Second", comment: "Hi" },
  { commentId: "com09", cardId: "c01", author: "Second", comment: "Hi" },
  { commentId: "com10", cardId: "c01", author: "Second", comment: "Hi" },
  { commentId: "com11", cardId: "c01", author: "Second", comment: "Hi" },
  { commentId: "com12", cardId: "c01", author: "Second", comment: "last" },
];
