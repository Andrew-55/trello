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
  comment: string;
}
