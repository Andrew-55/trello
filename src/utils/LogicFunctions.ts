import { UUID } from "uuid-generator-ts";

export const changeColumnName = (
  columns: any[],
  columnId: string,
  newName: string
) => {
  const arr = columns;
  arr.forEach((elem) => {
    if (elem.columnId === columnId) {
      elem.columnName = newName;
    }
  });

  return arr;
};

export const addNewCard = (
  cards: any[],
  columnId: string,
  newNameCard: string,
  author: string
) => {
  const uuid = new UUID();
  const newCard = {
    id: uuid.getDashFreeUUID(),
    title: newNameCard,
    description: "",
    columnId: columnId,
    comments: [],
    author: author,
  };
  const arr = cards;
  arr.push(newCard);

  return arr;
};

export const deleteCard = (cards: any[], cardId: string) => {
  const newCard = cards.filter((elem) => elem.id !== cardId);
  return newCard;
};

export const changeCardName = (
  cards: any[],
  cardId: string,
  newCardName: string
) => {
  const newCards = cards;
  newCards.forEach((elem) => {
    if (elem.id === cardId) {
      elem.title = newCardName;
    }
  });
  return newCards;
};

export const changeDescriptionCard = (
  cards: any[],
  cardId: string,
  newDescription: string
) => {
  const newCards = cards;
  newCards.forEach((elem) => {
    if (elem.id === cardId) {
      elem.description = newDescription;
    }
  });
  return newCards;
};

export const addComment = (
  comments: any[],
  cardId: string,
  author: string,
  comment: string
) => {
  const uuid = new UUID();
  const newComments = comments;
  newComments.unshift({
    commentId: uuid.getDashFreeUUID(),
    cardId: cardId,
    author: author,
    comment: comment,
  });
  return newComments;
};

export const changeComment = (
  comments: any[],
  commentId: string,
  newTextComment: string
) => {
  const newComments = comments;
  newComments.forEach((elem) => {
    if (elem.commentId === commentId) {
      elem.comment = newTextComment;
    }
  });
  return newComments;
};

export const deleteCommentById = (comments: any[], commentId: string) => {
  const newComments = comments.filter((elem) => elem.commentId !== commentId);
  return newComments;
};

export const deleteAllCommentByCardId = (comments: any[], cardId: string) => {
  const newComments = comments.filter((elem) => elem.cardId !== cardId);
  return newComments;
};
