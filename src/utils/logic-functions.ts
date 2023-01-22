import { MockColumnsType, MockCardsType, MockCommentsType } from "interfaces";
import { v4 as uuidv4 } from "uuid";

export const getStringLocalstorage = (keyString: string) =>
  localStorage.getItem(keyString) ?? "";

export const getObjectLocalstorage = (keyObject: string) =>
  JSON.parse(localStorage.getItem(keyObject) ?? "{}");

export const checkObjectIsEmpty = (obj: Object) => JSON.stringify(obj) === "{}";

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

  localStorage.setItem("columns", JSON.stringify(copyColumns));

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

  localStorage.setItem("cards", JSON.stringify(copyCards));

  return copyCards;
};

export const deleteCard = (cards: MockCardsType, cardId: string) => {
  const copyCards = copyObjectCard(cards);
  delete copyCards[cardId];

  localStorage.setItem("cards", JSON.stringify(copyCards));

  return copyCards;
};

export const changeCardName = (
  cards: MockCardsType,
  cardId: string,
  newCardName: string
) => {
  const copyCards = copyObjectCard(cards);
  copyCards[cardId].title = newCardName;

  localStorage.setItem("cards", JSON.stringify(copyCards));

  return copyCards;
};

export const changeDescriptionCard = (
  cards: MockCardsType,
  cardId: string,
  newDescription: string
) => {
  const copyCards = copyObjectCard(cards);
  copyCards[cardId].description = newDescription;

  localStorage.setItem("cards", JSON.stringify(copyCards));

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

  localStorage.setItem("comments", JSON.stringify(copyComments));

  return copyComments;
};

export const changeComment = (
  comments: MockCommentsType,
  commentId: string,
  newTextComment: string
) => {
  const copyComments = copyObjectComments(comments);
  copyComments[commentId].content = newTextComment;

  localStorage.setItem("comments", JSON.stringify(copyComments));

  return copyComments;
};

export const deleteCommentById = (
  comments: MockCommentsType,
  commentId: string
) => {
  const copyComments = copyObjectComments(comments);
  delete copyComments[commentId];

  localStorage.setItem("comments", JSON.stringify(copyComments));

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

  localStorage.setItem("comments", JSON.stringify(copyComments));

  return copyComments;
};
