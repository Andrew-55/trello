import { MockCardsType } from "interfaces";

export interface CardState {
  cards: MockCardsType;
}

export interface CardAdd {
  columnId: string;
  nameNewCard: string;
  username: string;
}

export interface CardChangeName {
  id: string;
  titleCard: string;
}

export interface CardChangeDescription {
  id: string;
  newDescription: string;
}
