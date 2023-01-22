import { MockCardsType, MockColumnsType, MockCommentsType } from "interfaces";
import { MOCK_CARDS, MOCK_COLUMNS, MOCK_COMMENTS } from "store";

import { StorageService } from "./StorageService";

export const storageLocal = new StorageService();

export const getCards = () => {
  const cards: MockCardsType | null = storageLocal.getItem("cards");
  if (cards === null) {
    return MOCK_CARDS;
  } else {
    return cards;
  }
};

export const getColumns = () => {
  const columns: MockColumnsType | null = storageLocal.getItem("columns");
  if (columns === null) {
    return MOCK_COLUMNS;
  } else {
    return columns;
  }
};

export const getComments = () => {
  const comments: MockCommentsType | null = storageLocal.getItem("comments");
  if (comments === null) {
    return MOCK_COMMENTS;
  } else {
    return comments;
  }
};

export const getUser = () => {
  const user: { username: string } | null = storageLocal.getItem("user");
  if (user === null) {
    return "";
  } else {
    return user.username;
  }
};
export const setUser = (username: string) => {
  const user = {
    username,
  };
  storageLocal.setItem("user", user);
};
