import { RootState } from "../store";

export const getCardsByColumnId = (columnId: string) => (state: RootState) => {
  return Object.values(state.cards.cards).filter(
    (card) => card.columnId === columnId
  );
};
