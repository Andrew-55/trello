import {
  MockColumnsType,
  MockCardsType,
  MockCommentsType,
  CommentInterface,
  CardInterface,
} from "interfaces";
import { v4 as uuidv4 } from "uuid";

import { storageLocal } from "./data-current";

export const changeColumnName = (
  columns: MockColumnsType,
  columnId: string,
  newName: string
) => {
  const copyColumns: MockColumnsType = { ...columns };
  copyColumns[columnId].columnName = newName;

  storageLocal.setItem("columns", columns);

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
  const copyCards: MockCardsType = { ...cards };
  copyCards[id] = newCard;

  storageLocal.setItem("cards", copyCards);

  return copyCards;
};

export const deleteCard = (cards: MockCardsType, cardId: string) => {
  const copyCards: MockCardsType = { ...cards };
  delete copyCards[cardId];

  storageLocal.setItem("cards", copyCards);

  return copyCards;
};

export const changeCardName = (
  cards: MockCardsType,
  cardId: string,
  newCardName: string
) => {
  const copyCards: MockCardsType = { ...cards };
  copyCards[cardId].title = newCardName;

  storageLocal.setItem("cards", copyCards);

  return copyCards;
};

export const changeDescriptionCard = (
  cards: MockCardsType,
  cardId: string,
  newDescription: string
) => {
  const copyCards: MockCardsType = { ...cards };
  copyCards[cardId].description = newDescription;

  storageLocal.setItem("cards", copyCards);

  return copyCards;
};

export const addComment = (
  comments: MockCommentsType,
  cardId: string,
  author: string,
  content: string
) => {
  const copyComments = { ...comments };
  const commentId = uuidv4();
  const newComments = {
    commentId: commentId,
    cardId: cardId,
    author: author,
    content: content,
  };
  copyComments[commentId] = newComments;

  storageLocal.setItem("comments", copyComments);

  return copyComments;
};

export const changeComment = (
  comments: MockCommentsType,
  commentId: string,
  newTextComment: string
) => {
  const copyComments = { ...comments };
  copyComments[commentId].content = newTextComment;

  storageLocal.setItem("comments", copyComments);

  return copyComments;
};

export const deleteCommentById = (
  comments: MockCommentsType,
  commentId: string
) => {
  const copyComments = { ...comments };
  delete copyComments[commentId];

  storageLocal.setItem("comments", copyComments);

  return copyComments;
};

export const deleteAllCommentByCardId = (
  comments: MockCommentsType,
  cardId: string
) => {
  const copyComments = { ...comments };

  Object.values(copyComments).forEach((comment) => {
    if (comment.cardId === cardId) {
      delete copyComments[comment.commentId];
    }
  });

  storageLocal.setItem("comments", copyComments);

  return copyComments;
};

export const getCartdsByColumnId = (cards: MockCardsType, columnId: string) =>
  Object.values(cards).filter((card) => card.columnId === columnId);

export const getCommentsByColumnId = (
  cards: MockCardsType,
  comments: MockCommentsType,
  columnId: string
) => {
  const commentsColumn: CommentInterface[] = [];
  const valueComments = Object.values(comments);
  const filteredCards = getCartdsByColumnId(cards, columnId);
  filteredCards.forEach((card) => {
    const commentsCard = valueComments.filter(
      (comment) => comment.cardId === card.id
    );

    commentsColumn.push(...commentsCard);
  });
  return commentsColumn;
};

export const checkInputName = (name: string) => {
  const value = name.trim();
  if (value.length >= 3 && value.length <= 15) {
    return true;
  }
  return false;
};

export const getSortDataColumn = (
  columns: MockColumnsType,
  cards: MockCardsType,
  comments: MockCommentsType
) => {
  const sortData = {} as Record<string, [CardInterface[], CommentInterface[]]>;
  const valueColumns = Object.values(columns);
  valueColumns.forEach((column) => {
    sortData[column.columnId] = [
      getCartdsByColumnId(cards, column.columnId),
      getCommentsByColumnId(cards, comments, column.columnId),
    ];
  });
  return sortData;
};

export const getSortDataCard = (
  cards: CardInterface[],
  comments: CommentInterface[]
) => {
  const sortData = {} as Record<string, CommentInterface[]>;
  cards.forEach((card) => {
    sortData[card.id] = comments.filter(
      (comment) => comment.cardId === card.id
    );
  });
  return sortData;
};
