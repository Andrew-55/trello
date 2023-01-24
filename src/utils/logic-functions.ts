import { MockCardsType, MockCommentsType } from "interfaces";

export const getCartdsByColumnId = (cards: MockCardsType, columnId: string) =>
  Object.values(cards).filter((card) => card.columnId === columnId);

export const getCommentsByCardId = (
  comments: MockCommentsType,
  cardId: string
) => {
  return Object.values(comments).filter((comment) => comment.cardId === cardId);
};

export const checkInputName = (name: string) => {
  const value = name.trim();
  return value.length >= 3 && value.length <= 15 ? true : false;
};
