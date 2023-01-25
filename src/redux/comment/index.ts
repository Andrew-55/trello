export { default as commentsReducer } from "./slice";

export { addComment, changeComment, deleteComment } from "./slice";

export { getCommentsByCardId, getCountCommentsByCardId } from "./selector";

export type {
  CommentInterface,
  InitialCommitsState,
  CommentsState,
  CommentsAdd,
  CommentEdit,
} from "./types";
