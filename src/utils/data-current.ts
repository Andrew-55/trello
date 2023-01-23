import { MockCardsType, MockColumnsType, MockCommentsType } from "interfaces";
import { MOCK_CARDS, MOCK_COLUMNS, MOCK_COMMENTS } from "store";

import { StorageService } from "./StorageService";

export const storageLocal = new StorageService();

export const getCards = () => {
  const cards: MockCardsType | null = storageLocal.getItem("cards");
  return cards ? cards : MOCK_CARDS;
};

export const getColumns = () => {
  const columns: MockColumnsType | null = storageLocal.getItem("columns");
  return columns ? columns : MOCK_COLUMNS;
};

export const getComments = () => {
  const comments: MockCommentsType | null = storageLocal.getItem("comments");
  return comments ? comments : MOCK_COMMENTS;
};

export const getUser = () => {
  const user: { username: string } | null = storageLocal.getItem("user");
  return user ? user.username : "";
};

export const setUser = (username: string) => {
  const user = {
    username,
  };
  storageLocal.setItem("user", user);
};
