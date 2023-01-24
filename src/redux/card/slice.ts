import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockCardsType } from "interfaces";
import { MOCK_CARDS } from "store";
import { v4 as uuidv4 } from "uuid";

interface CardState {
  cards: MockCardsType;
}

interface CardAdd {
  columnId: string;
  nameNewCard: string;
  username: string;
}

interface CardChangeName {
  id: string;
  titleCard: string;
}

interface CardChangeDescription {
  id: string;
  newDescription: string;
}

const initialState: CardState = {
  cards: MOCK_CARDS,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<CardAdd>) {
      const copyCards: MockCardsType = { ...state.cards };
      const id = uuidv4();
      const { columnId, nameNewCard, username } = action.payload;
      const newCard = {
        id: id,
        title: nameNewCard,
        description: "",
        columnId: columnId,
        comments: [],
        author: username,
      };
      copyCards[id] = newCard;
      state.cards = copyCards;
    },
    changeNameCard(state, action: PayloadAction<CardChangeName>) {
      const copyCards: MockCardsType = { ...state.cards };
      copyCards[action.payload.id].title = action.payload.titleCard;
      state.cards = copyCards;
    },
    deleteCard(state, action: PayloadAction<string>) {
      const copyCards: MockCardsType = { ...state.cards };
      delete copyCards[action.payload];
      state.cards = copyCards;
    },
    changeDescriptionCard(state, action: PayloadAction<CardChangeDescription>) {
      const copyCards: MockCardsType = { ...state.cards };
      copyCards[action.payload.id].description = action.payload.newDescription;
      state.cards = copyCards;
    },
  },
});

export const { addCard, deleteCard, changeNameCard, changeDescriptionCard } =
  cardsSlice.actions;
export default cardsSlice.reducer;
