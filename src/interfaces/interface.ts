export interface ColumnInterface {
  columnId: string;
  columnName: string;
}

export interface CardInterface {
  id: string;
  title: string;
  description: string;
  columnId: string;
  author: string;
}

export interface CommentInterface {
  commentId: string;
  cardId: string;
  author: string;
  content: string;
}

export type MockCardsType = Record<string, CardInterface>;
export type MockColumnsType = Record<string, ColumnInterface>;
export type MockCommentsType = Record<string, CommentInterface>;
