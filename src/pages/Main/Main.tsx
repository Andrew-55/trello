import { COLORS } from "constants/";

import React, { useState, FC } from "react";

import { Column } from "components";
import { CardInterface, ColumnInterface, CommentInterface } from "interfaces";
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
  const [cards, setCards] = useState(Array<CardInterface>());
  const [columns, setColumns] = useState(Array<ColumnInterface>());
  const [comments, setComments] = useState(Array<CommentInterface>());

  if (isStart) {
    const cards = getObjectLocalstorage("cards");
    const columns = getObjectLocalstorage("columns");
    const comments = getObjectLocalstorage("comments");

    if (!checkObjectIsEmpty(cards)) {
      setCards(cards);
    } else {
      setCards(MOCK_CARDS);
    }
    if (!checkObjectIsEmpty(columns)) {
      setColumns(columns);
    } else {
      setColumns(MOCK_COLUMNS);
    }
    if (!checkObjectIsEmpty(comments)) {
      setComments(comments);
    } else {
      setComments(MOCK_COMMENTS);
    }

    setIstart(false);
  }

  const handelSaveNewNameColumns = (columnId: string, newName: string) => {
    const newColumns = changeColumnName(columns, columnId, newName);
    setColumns(newColumns);
  };

  const handelSaveNewTitleCard = (cardId: string, newTitleCard: string) => {
    const newCards = changeCardName(cards, cardId, newTitleCard);
    setCards(newCards);
  };

  const handelSaveNewCard = (columnId: string, newNameCard: string) => {
    const newCards = addNewCard(cards, columnId, newNameCard, userName);
    setCards(newCards);
  };

  const handelSaveNewDescriptionCard = (
    cardId: string,
    newDescription: string
  ) => {
    const newCards = changeDescriptionCard(cards, cardId, newDescription);
    setCards(newCards);
  };

  const handelDeleteCardState = (cardId: string) => {
    const newCards = deleteCard(cards, cardId);
    const newComments = deleteAllCommentByCardId(comments, cardId);
    setCards(newCards);
    setComments(newComments);
  };

  const handelAddNewComments = (cardId: string, comment: string) => {
    const newComments = addComment(comments, cardId, userName, comment);
    setComments(newComments);
  };

  const handelChangeTextComment = (
    commentdId: string,
    newTextComment: string
  ) => {
    const newComments = changeComment(comments, commentdId, newTextComment);
    return newComments;
  };

  const handelDeleteComments = (commentId: string) => {
    const newComments = deleteCommentById(comments, commentId);
    setComments(newComments);
  };

  return (
    <Root>
      {columns?.map((item) => (
        <Column
          key={item.columnId}
          item={item}
          cards={cards}
          comments={comments}
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
