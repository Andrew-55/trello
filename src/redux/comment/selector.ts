import { RootState } from "../store";

export const selectorComments = (state: RootState) => state.comments.comments;

export const selectorCommentsByCardId = (id: string) => (state: RootState) => {
  const copyComments = { ...state.comments.comments };
  return Object.values(copyComments).filter((comment) => comment.cardId === id);
};

export const selectorCountCommentsByCardId =
  (id: string) => (state: RootState) => {
    const copyComments = { ...state.comments.comments };
    return Object.values(copyComments).filter(
      (comment) => comment.cardId === id
    ).length;
  };
