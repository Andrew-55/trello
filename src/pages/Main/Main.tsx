import { COLORS } from "constants/";

import React, { useState, FC, useMemo } from "react";

import { Column } from "components";
import styled from "styled-components";
import { getCards, getColumns, getComments } from "utils/data-current";
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
  getSortDataColumn,
} from "utils/logic-functions";

type Props = {
  userName: string;
};

export const Main: FC<Props> = ({ userName }) => {
  const [cards, setCards] = useState(() => getCards());
  const [columns, setColumns] = useState(() => getColumns());
  const [comments, setComments] = useState(() => getComments());

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

  const handelAddNewComments = (cardId: string, content: string) => {
    const newComments = addComment(comments, cardId, userName, content);
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

  const contentColumn = useMemo(() => {
    return getSortDataColumn(columns, cards, comments);
  }, [columns, cards, comments]);

  return (
    <Root>
      {Object.values(columns)?.map((column) => (
        <Column
          key={column.columnId}
          item={column}
          cards={contentColumn[column.columnId][0]}
          comments={contentColumn[column.columnId][1]}
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
