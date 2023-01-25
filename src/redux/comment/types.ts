import { MockCommentsType } from "interfaces";

export interface CommentsState {
  comments: MockCommentsType;
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
