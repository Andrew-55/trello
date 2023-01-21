import { MockColumnsType, MockCardsType, MockCommentsType } from "interfaces";
import { v4 as uuidv4 } from "uuid";

const copyObjectColumn = (obj: MockColumnsType) => {
  const strObject = JSON.stringify(obj);
  const newObject: MockColumnsType = JSON.parse(strObject);
  return newObject;
};

const copyObjectCard = (obj: MockCardsType) => {
  const strObject = JSON.stringify(obj);
  const newObject: MockCardsType = JSON.parse(strObject);
  return newObject;
};

const copyObjectComments = (obj: MockCommentsType) => {
  const strObject = JSON.stringify(obj);
  const newObject: MockCommentsType = JSON.parse(strObject);
  return newObject;
};

export const changeColumnName = (
  columns: MockColumnsType,
  columnId: string,
  newName: string
) => {
  const copyColumns = copyObjectColumn(columns);
  copyColumns[columnId].columnName = newName;
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

  return copyCards;
};

export const deleteCard = (cards: MockCardsType, cardId: string) => {
  const copyCards = copyObjectCard(cards);
  delete copyCards[cardId];
  return copyCards;
};

export const changeCardName = (
  cards: MockCardsType,
  cardId: string,
  newCardName: string
) => {
  const copyCards = copyObjectCard(cards);
  copyCards[cardId].title = newCardName;
  return copyCards;
};

export const changeDescriptionCard = (
  cards: MockCardsType,
  cardId: string,
  newDescription: string
) => {
  const copyCards = copyObjectCard(cards);
  copyCards[cardId].description = newDescription;
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
  return copyComments;
};

export const changeComment = (
  comments: MockCommentsType,
  commentId: string,
  newTextComment: string
) => {
  const copyComments = copyObjectComments(comments);
  copyComments[commentId].content = newTextComment;
  return copyComments;
};

export const deleteCommentById = (
  comments: MockCommentsType,
  commentId: string
) => {
  const copyComments = copyObjectComments(comments);
  delete copyComments[commentId];

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

  return copyComments;
};
