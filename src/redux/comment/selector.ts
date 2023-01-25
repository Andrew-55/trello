import { RootState } from "../store";

export const getCommentsByCardId = (id: string) => (state: RootState) => {
  return Object.values(state.comments.comments).filter(
    (comment) => comment.cardId === id
  );
};

export const getCountCommentsByCardId = (id: string) => (state: RootState) => {
  return Object.values(state.comments.comments).filter(
    (comment) => comment.cardId === id
  ).length;
};
