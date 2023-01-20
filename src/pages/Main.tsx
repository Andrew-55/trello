import { COLORS } from "constants/COLORS";

import React, { useState, FC } from "react";

import { Column } from "components/Column";
import { MOCK_COLUMNS, MOCK_CARDS, MOCK_COMMENTS } from "store";
import styled from "styled-components";
import {
  addComment,
  addNewCard,
  changeCardName,
  changeColumnName,
  changeComment,
  changeDescriptionCard,
  deleteAllCommentByCardId,
  deleteCard,
  deleteCommentById,
} from "utils/LogicFunctions";

type Props = {
  userName: string;
};

export const Main: FC<Props> = ({ userName }) => {
  const [cards, setCards] = useState(MOCK_CARDS);
  const [columns, setColumns] = useState(MOCK_COLUMNS);
  const [comments, setComments] = useState(MOCK_COMMENTS);

  const saveNewNameColumns = (columnId: string, newName: string) => {
    const newColumns = changeColumnName(columns, columnId, newName);
    setColumns(newColumns);
  };

  const saveNewTitleCard = (cardId: string, newTitleCard: string) => {
    const newCards = changeCardName(cards, cardId, newTitleCard);
    setCards(newCards);
  };

  const saveNewCard = (columnId: string, newNameCard: string) => {
    const newCards = addNewCard(cards, columnId, newNameCard, userName);
    setCards(newCards);
  };

  const saveNewDescriptionCard = (cardId: string, newDescription: string) => {
    const newCards = changeDescriptionCard(cards, cardId, newDescription);
    setCards(newCards);
  };

  const deleteCardState = (cardId: string) => {
    const newCards = deleteCard(cards, cardId);
    const newComments = deleteAllCommentByCardId(comments, cardId);
    setCards(newCards);
    setComments(newComments);
  };

  const addNewComments = (cardId: string, comment: string) => {
    const newComments = addComment(comments, cardId, userName, comment);
    setComments(newComments);
  };

  const changeTextComment = (commentdId: string, newTextComment: string) => {
    const newComments = changeComment(comments, commentdId, newTextComment);
    return newComments;
  };

  const deleteComments = (commentId: string) => {
    const newComments = deleteCommentById(comments, commentId);
    setComments(newComments);
  };

  return (
    <Root>
      {!!columns &&
        columns.map((item) => (
          <Column
            key={item.columnId}
            item={item}
            cards={cards}
            comments={comments}
            saveNewCard={saveNewCard}
            saveNewNameColumns={saveNewNameColumns}
            saveNewDescriptionCard={saveNewDescriptionCard}
            saveNewTitleCard={saveNewTitleCard}
            deleteCardState={deleteCardState}
            addNewComments={addNewComments}
            deleteComments={deleteComments}
            changeTextComment={changeTextComment}
          />
        ))}
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  min-height: 80vh;
  padding: 20px 20px;
  color: ${COLORS.white};
  display: flex;
  justify-content: space-around;
  column-gap: 50px;
  align-items: flex-start;
  overflow-x: auto;
`;
