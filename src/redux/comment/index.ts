export { default as commentsReducer } from "./slice";

export {
  addComment,
  changeComment,
  deleteComment,
  deleteAllCommentByCardId,
} from "./slice";

export {
  selectorComments,
  selectorCommentsByCardId,
  selectorCountCommentsByCardId,
} from "./selector";
