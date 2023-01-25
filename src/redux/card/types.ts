export interface CardInterface {
  id: string;
  title: string;
  description: string;
  columnId: string;
  author: string;
}

export type InitialCardsState = Record<string, CardInterface>;

export interface CardState {
  cards: InitialCardsState;
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
