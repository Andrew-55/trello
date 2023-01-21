import { CardInterface, ColumnInterface, CommentInterface } from "interfaces";
import { v4 as uuidv4 } from "uuid";

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

  return arr;
};

export const deleteCard = (cards: CardInterface[], cardId: string) => {
  const newCard = cards.filter((elem) => elem.id !== cardId);
  return newCard;
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
  return newCards;
};

export const addComment = (
  comments: CommentInterface[],
  cardId: string,
  author: string,
  content: string
) => {
  const newComments = [...comments];
  newComments.unshift({
    commentId: uuidv4(),
    cardId: cardId,
    author: author,
    content: content,
  });
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
      elem.content = newTextComment;
    }
  });
  return newComments;
};

export const deleteCommentById = (
  comments: CommentInterface[],
  commentId: string
) => {
  const newComments = comments.filter((elem) => elem.commentId !== commentId);
  return newComments;
};

export const deleteAllCommentByCardId = (
  comments: CommentInterface[],
  cardId: string
) => {
  const newComments = comments.filter((elem) => elem.cardId !== cardId);
  return newComments;
};
