import { CardInterface, ColumnInterface, CommentInterface } from "interfaces";
import { v4 as uuidv4 } from "uuid";

export const getStringLocalstorage = (keyString: string) =>
  localStorage.getItem(keyString) ?? "";

export const getObjectLocalstorage = (keyObject: string) =>
  JSON.parse(localStorage.getItem(keyObject) ?? "{}");

export const checkObjectIsEmpty = (obj: Object) => JSON.stringify(obj) === "{}";

export const changeColumnName = (
  columns: ColumnInterface[],
  columnId: string,
  newName: string
) => {
  const arr = [...columns];
  arr.forEach((elem) => {
    if (elem.columnId === columnId) {
      elem.columnName = newName;
    }
  });

  localStorage.setItem("columns", JSON.stringify(arr));

  return arr;
};

export const addNewCard = (
  cards: CardInterface[],
  columnId: string,
  newNameCard: string,
  author: string
) => {
  const newCard = {
    id: uuidv4(),
    title: newNameCard,
    description: "",
    columnId: columnId,
    comments: [],
    author: author,
  };
  const arr = [...cards];
  arr.push(newCard);

  localStorage.setItem("cards", JSON.stringify(arr));

  return arr;
};

export const deleteCard = (cards: CardInterface[], cardId: string) => {
  const newCards = cards.filter((elem) => elem.id !== cardId);
  localStorage.setItem("cards", JSON.stringify(newCards));
  return newCards;
};

export const changeCardName = (
  cards: CardInterface[],
  cardId: string,
  newCardName: string
) => {
  const newCards = [...cards];
  newCards.forEach((elem) => {
    if (elem.id === cardId) {
      elem.title = newCardName;
    }
  });

  localStorage.setItem("cards", JSON.stringify(newCards));

  return newCards;
};

export const changeDescriptionCard = (
  cards: CardInterface[],
  cardId: string,
  newDescription: string
) => {
  const newCards = [...cards];
  newCards.forEach((elem) => {
    if (elem.id === cardId) {
      elem.description = newDescription;
    }
  });

  localStorage.setItem("cards", JSON.stringify(newCards));

  return newCards;
};

export const addComment = (
  comments: CommentInterface[],
  cardId: string,
  author: string,
  comment: string
) => {
  const newComments = [...comments];
  newComments.unshift({
    commentId: uuidv4(),
    cardId: cardId,
    author: author,
    comment: comment,
  });

  localStorage.setItem("comments", JSON.stringify(newComments));

  return newComments;
};

export const changeComment = (
  comments: CommentInterface[],
  commentId: string,
  newTextComment: string
) => {
  const newComments = [...comments];
  newComments.forEach((elem) => {
    if (elem.commentId === commentId) {
      elem.comment = newTextComment;
    }
  });

  localStorage.setItem("comments", JSON.stringify(newComments));

  return newComments;
};

export const deleteCommentById = (
  comments: CommentInterface[],
  commentId: string
) => {
  const newComments = comments.filter((elem) => elem.commentId !== commentId);

  localStorage.setItem("comments", JSON.stringify(newComments));

  return newComments;
};

export const deleteAllCommentByCardId = (
  comments: CommentInterface[],
  cardId: string
) => {
  const newComments = comments.filter((elem) => elem.cardId !== cardId);

  localStorage.setItem("comments", JSON.stringify(newComments));

  return newComments;
};
