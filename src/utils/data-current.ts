import { MockCardsType, MockColumnsType, MockCommentsType } from "interfaces";
import { MOCK_CARDS, MOCK_COLUMNS, MOCK_COMMENTS } from "store";

class StorageLocal {
  getString(keyString: string) {
    return localStorage.getItem(keyString) ?? "";
  }
  getObject(keyObject: string) {
    return JSON.parse(localStorage.getItem(keyObject) ?? "{}");
  }
  setString(key: string, str: string) {
    localStorage.setItem(key, str);
  }
  setObject(key: string, obj: Object) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

export const storageLocal = new StorageLocal();

const checkObjectIsEmpty = (obj: Object) => JSON.stringify(obj) === "{}";

export const getCards = () => {
  const cards: MockCardsType = storageLocal.getObject("cards");
  if (checkObjectIsEmpty(cards)) {
    return MOCK_CARDS;
  } else {
    return cards;
  }
};

export const getColumns = () => {
  const columns: MockColumnsType = storageLocal.getObject("columns");
  if (checkObjectIsEmpty(columns)) {
    return MOCK_COLUMNS;
  } else {
    return columns;
  }
};

export const getComments = () => {
  const comments: MockCommentsType = storageLocal.getObject("comments");
  if (checkObjectIsEmpty(comments)) {
    return MOCK_COMMENTS;
  } else {
    return comments;
  }
};

export const getUser = () => storageLocal.getString("user");
export const setUser = (username: string) =>
  storageLocal.setString("user", username);
