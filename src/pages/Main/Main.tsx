import { COLORS } from "constants/";

import React, { useState, FC } from "react";

import { Column } from "components";
import { MockCardsType, MockColumnsType, MockCommentsType } from "interfaces";
import { MOCK_COLUMNS, MOCK_CARDS, MOCK_COMMENTS } from "store";
import styled from "styled-components";
import {
  addComment,
  addNewCard,
  changeCardName,
  changeColumnName,
  changeComment,
  changeDescriptionCard,
  checkObjectIsEmpty,
  deleteAllCommentByCardId,
  deleteCard,
  deleteCommentById,
  getObjectLocalstorage,
} from "utils/logic-functions";

type Props = {
  userName: string;
};

export const Main: FC<Props> = ({ userName }) => {
  const [isStart, setIstart] = useState(true);
  const [objectCards, setObjectCards] = useState({} as MockCardsType);
  const [objectColumns, setObjectColumns] = useState({} as MockColumnsType);
  const [objectComments, setObjectComments] = useState({} as MockCommentsType);

  if (isStart) {
    const cards: MockCardsType = getObjectLocalstorage("cards");
    const columns: MockColumnsType = getObjectLocalstorage("columns");
    const comments: MockCommentsType = getObjectLocalstorage("comments");

    if (!checkObjectIsEmpty(cards)) {
      setObjectCards(cards);
    } else {
      setObjectCards(MOCK_CARDS);
    }
    if (!checkObjectIsEmpty(columns)) {
      setObjectColumns(columns);
    } else {
      setObjectColumns(MOCK_COLUMNS);
    }
    if (!checkObjectIsEmpty(comments)) {
      setObjectComments(comments);
    } else {
      setObjectComments(MOCK_COMMENTS);
    }

    setIstart(false);
  }

  const handelSaveNewNameColumns = (columnId: string, newName: string) => {
    const newColumns = changeColumnName(objectColumns, columnId, newName);
    setObjectColumns(newColumns);
  };

  const handelSaveNewTitleCard = (cardId: string, newTitleCard: string) => {
    const newCards = changeCardName(objectCards, cardId, newTitleCard);
    setObjectCards(newCards);
  };

  const handelSaveNewCard = (columnId: string, newNameCard: string) => {
    const newCards = addNewCard(objectCards, columnId, newNameCard, userName);
    setObjectCards(newCards);
  };

  const handelSaveNewDescriptionCard = (
    cardId: string,
    newDescription: string
  ) => {
    const newCards = changeDescriptionCard(objectCards, cardId, newDescription);
    setObjectCards(newCards);
  };

  const handelDeleteCardState = (cardId: string) => {
    const newCards = deleteCard(objectCards, cardId);
    const newComments = deleteAllCommentByCardId(objectComments, cardId);
    setObjectCards(newCards);
    setObjectComments(newComments);
  };

  const handelAddNewComments = (cardId: string, content: string) => {
    const newComments = addComment(objectComments, cardId, userName, content);
    setObjectComments(newComments);
  };

  const handelChangeTextComment = (
    commentdId: string,
    newTextComment: string
  ) => {
    const newComments = changeComment(
      objectComments,
      commentdId,
      newTextComment
    );
    return newComments;
  };

  const handelDeleteComments = (commentId: string) => {
    const newComments = deleteCommentById(objectComments, commentId);
    setObjectComments(newComments);
  };

  return (
    <Root>
      {Object.values(objectColumns)?.map((item) => (
        <Column
          key={item.columnId}
          item={item}
          cards={Object.values(objectCards)}
          comments={Object.values(objectComments)}
          onSaveNewCard={handelSaveNewCard}
          onSaveNewNameColumns={handelSaveNewNameColumns}
          onSaveNewDescriptionCard={handelSaveNewDescriptionCard}
          onSaveNewTitleCard={handelSaveNewTitleCard}
          onDeleteCardState={handelDeleteCardState}
          onAddNewComments={handelAddNewComments}
          onDeleteComments={handelDeleteComments}
          onChangeTextComment={handelChangeTextComment}
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
