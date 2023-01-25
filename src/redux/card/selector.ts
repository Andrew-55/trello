import { RootState } from "../store";

export const selectorCards = (state: RootState) => state.cards.cards;
export const selectorCartdsByColumnId =
  (columnId: string) => (state: RootState) => {
    const copyCards = { ...state.cards.cards };
    return Object.values(copyCards).filter(
      (card) => card.columnId === columnId
    );
  };
