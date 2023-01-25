export interface CommentInterface {
  commentId: string;
  cardId: string;
  author: string;
  content: string;
}

export type InitialCommitsState = Record<string, CommentInterface>;

export interface CommentsState {
  comments: InitialCommitsState;
}

export interface CommentsAdd {
  id: string;
  username: string;
  newCommentCard: string;
}
export interface CommentEdit {
  commentId: string;
  textComment: string;
}
