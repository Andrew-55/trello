import {
  MockColumnsType,
  MockCardsType,
  MockCommentsType,
  CommentInterface,
} from "interfaces";
import { v4 as uuidv4 } from "uuid";

import { storageLocal } from "./data-current";

export const checkObjectIsEmpty = (obj: Object) => JSON.stringify(obj) === "{}";

const copyObjectColumn = (obj: MockColumnsType) => {
  const newObject: MockColumnsType = { ...obj };
  return newObject;
};

const copyObjectCard = (obj: MockCardsType) => {
  const newObject: MockCardsType = { ...obj };
  return newObject;
};

const copyObjectComments = (obj: MockCommentsType) => {
  const newObject: MockCommentsType = { ...obj };
  return newObject;
};

export const changeColumnName = (
  columns: MockColumnsType,
  columnId: string,
  newName: string
) => {
  const copyColumns: MockColumnsType = copyObjectColumn(columns);
  copyColumns[columnId].columnName = newName;

  storageLocal.setObject("columns", columns);

  return copyColumns;
};

export const addNewCard = (
  cards: MockCardsType,
  columnId: string,
  newNameCard: string,
  author: string
) => {
  const id = uuidv4();
  const newCard = {
    id: id,
    title: newNameCard,
    description: "",
    columnId: columnId,
    comments: [],
    author: author,
  };

  const copyCards = copyObjectCard(cards);
  copyCards[id] = newCard;

  storageLocal.setObject("cards", copyCards);

  return copyCards;
};

export const deleteCard = (cards: MockCardsType, cardId: string) => {
  const copyCards = copyObjectCard(cards);
  delete copyCards[cardId];

  storageLocal.setObject("cards", copyCards);

  return copyCards;
};

export const changeCardName = (
  cards: MockCardsType,
  cardId: string,
  newCardName: string
) => {
  const copyCards = copyObjectCard(cards);
  copyCards[cardId].title = newCardName;

  storageLocal.setObject("cards", copyCards);

  return copyCards;
};

export const changeDescriptionCard = (
  cards: MockCardsType,
  cardId: string,
  newDescription: string
) => {
  const copyCards = copyObjectCard(cards);
  copyCards[cardId].description = newDescription;

  storageLocal.setObject("cards", copyCards);

  return copyCards;
};

export const addComment = (
  comments: MockCommentsType,
  cardId: string,
  author: string,
  content: string
) => {
  const copyComments = copyObjectComments(comments);
  const commentId = uuidv4();
  const newComments = {
    commentId: commentId,
    cardId: cardId,
    author: author,
    content: content,
  };
  copyComments[commentId] = newComments;

  storageLocal.setObject("comments", copyComments);

  return copyComments;
};

export const changeComment = (
  comments: MockCommentsType,
  commentId: string,
  newTextComment: string
) => {
  const copyComments = copyObjectComments(comments);
  copyComments[commentId].content = newTextComment;

  storageLocal.setObject("comments", copyComments);

  return copyComments;
};

export const deleteCommentById = (
  comments: MockCommentsType,
  commentId: string
) => {
  const copyComments = copyObjectComments(comments);
  delete copyComments[commentId];

  storageLocal.setObject("comments", copyComments);

  return copyComments;
};

export const deleteAllCommentByCardId = (
  comments: MockCommentsType,
  cardId: string
) => {
  const copyComments = copyObjectComments(comments);

  Object.values(copyComments).forEach((elem) => {
    if (elem.cardId === cardId) {
      delete copyComments[elem.commentId];
    }
  });

  storageLocal.setObject("comments", copyComments);

  return copyComments;
};

export const getArrayCartdsByColumnId = (
  cards: MockCardsType,
  columnId: string
) => Object.values(cards).filter((elem) => elem.columnId === columnId);

export const getArrayCommentsByCardId = (
  comments: CommentInterface[],
  cardId: string
) => comments.filter((elem) => elem.cardId === cardId);

export const getArrayCommentsByColumnId = (
  cards: MockCardsType,
  comments: MockCommentsType,
  columnId: string
) => {
  const commentsColumn = Array<CommentInterface>();
  const arrayComments = Object.values(comments);
  const arrayCardFilter = getArrayCartdsByColumnId(cards, columnId);
  arrayCardFilter.forEach((elem) => {
    const commentsCard = getArrayCommentsByCardId(arrayComments, elem.id);
    commentsColumn.push(...commentsCard);
  });
  return commentsColumn;
};
