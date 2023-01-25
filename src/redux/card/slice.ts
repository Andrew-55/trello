import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockCardsType } from "interfaces";
import { MOCK_CARDS } from "store";
import { v4 as uuidv4 } from "uuid";

import {
  CardState,
  CardAdd,
  CardChangeDescription,
  CardChangeName,
} from "./types";

const initialState: CardState = {
  cards: MOCK_CARDS,
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state, { payload }: PayloadAction<CardAdd>) {
      const copyCards: MockCardsType = { ...state.cards };
      const id = uuidv4();
      const { columnId, nameNewCard, username } = payload;
      const newCard = {
        id: id,
        title: nameNewCard,
        description: "",
        columnId: columnId,
        author: username,
      };
      copyCards[id] = newCard;
      state.cards = copyCards;
    },
    changeNameCard(state, { payload }: PayloadAction<CardChangeName>) {
      const copyCards: MockCardsType = { ...state.cards };
      copyCards[payload.id].title = payload.titleCard;
      state.cards = copyCards;
    },
    deleteCard(state, { payload }: PayloadAction<string>) {
      const copyCards: MockCardsType = { ...state.cards };
      delete copyCards[payload];
      state.cards = copyCards;
    },
    changeDescriptionCard(
      state,
      { payload }: PayloadAction<CardChangeDescription>
    ) {
      const copyCards: MockCardsType = { ...state.cards };
      copyCards[payload.id].description = payload.newDescription;
      state.cards = copyCards;
    },
  },
});

export const { addCard, deleteCard, changeNameCard, changeDescriptionCard } =
  cardSlice.actions;
export default cardSlice.reducer;
