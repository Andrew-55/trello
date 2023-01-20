import { COLORS } from "constants/COLORS";

import React, { useState, FC } from "react";

import styled from "styled-components";

import { Card } from "./Card";
import { Button } from "../ui/Button/Button";
import { Input } from "../ui/Input/Input";

type Props = {
  item: { columnId: string; columnName: string };
  saveNewNameColumns: (columnId: string, newName: string) => void;
  saveNewCard: (columnId: string, newNameCard: string) => void;
  saveNewDescriptionCard: (cardId: string, newDescription: string) => void;
  saveNewTitleCard: (cardId: string, newTitle: string) => void;
  deleteCardState: (cardId: string) => void;
  addNewComments: (cardId: string, comment: string) => void;
  deleteComments: (commentId: string) => void;
  changeTextComment: (commentdId: string, newTextComment: string) => void;
  cards: {
    id: string;
    title: string;
    description: string;
    columnId: string;
    author: string;
  }[];
  comments: {
    commentId: string;
    cardId: string;
    author: string;
    comment: string;
  }[];
};

export const Column: FC<Props> = ({
  item,
  saveNewNameColumns,
  saveNewCard,
  saveNewDescriptionCard,
  saveNewTitleCard,
  deleteCardState,
  addNewComments,
  deleteComments,
  changeTextComment,
  cards,
  comments,
}) => {
  const [valueColumnName, setValueColumnName] = useState(item.columnName);
  const [nameNewCard, setNameNewCard] = useState("");
  const [addNewCard, setAddNewCard] = useState(false);
  const [checkValueColumnName, setCheckValueColumnName] = useState(false);

  const onSaveNewCard = () => {
    if (nameNewCard) {
      saveNewCard(item.columnId, nameNewCard);
      setAddNewCard(false);
      setNameNewCard("");
    }
  };

  const handleClickButtonChangeName = () => {
    setCheckValueColumnName(!checkValueColumnName);
    saveNewNameColumns(item.columnId, valueColumnName);
  };

  const closeNewCard = () => {
    setAddNewCard(false);
    setNameNewCard("");
  };

  const handleChangeColumnName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValueColumnName(event.target.value);
  };

  const handleChangeCardName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameNewCard(event.target.value);
  };

  return (
    <Root>
      {checkValueColumnName ? (
        <FlexBlock>
          <InputColumnName
            className="inputColumnName"
            type="text"
            value={valueColumnName}
            onChange={handleChangeColumnName}
            autoFocus
          />
          <StyledButton
            type="button"
            onClick={() => handleClickButtonChangeName()}
            text="Ok"
          />
        </FlexBlock>
      ) : (
        <TitleColumn
          onClick={() => setCheckValueColumnName(!checkValueColumnName)}
        >
          {valueColumnName}
        </TitleColumn>
      )}
      {cards
        .filter((elem) => elem.columnId === item.columnId)
        ?.map((item) => (
          <Card
            key={item.id}
            itemCard={item}
            columnName={valueColumnName}
            saveNewDescriptionCard={saveNewDescriptionCard}
            saveNewTitleCard={saveNewTitleCard}
            deleteCardState={deleteCardState}
            addNewComments={addNewComments}
            deleteComments={deleteComments}
            changeTextComment={changeTextComment}
            commentsCard={comments}
          />
        ))}
      {!addNewCard ? (
        <AddCard onClick={() => setAddNewCard(true)}>Add a card</AddCard>
      ) : (
        <>
          <InputNameNewCard
            value={nameNewCard}
            type="text"
            autoFocus
            onChange={handleChangeCardName}
            placeholder="Enter a title for this card..."
          />
          <FlexBlock>
            <AddCard onClick={() => onSaveNewCard()}>Save</AddCard>
            <AddCard onClick={() => closeNewCard()}>Close</AddCard>
          </FlexBlock>
        </>
      )}
    </Root>
  );
};

const Root = styled.div`
  padding: 10px 20px;
  width: 20%;
  min-width: 250px;
  font-size: 20px;
  font-weight: 500;
  background-color: ${COLORS.zambezi};
  border-radius: 20px;
`;

const TitleColumn = styled.h2`
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const AddCard = styled.div`
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.gray};
  }
`;

const FlexBlock = styled.div`
  display: flex;
  column-gap: 10px;
`;

const InputColumnName = styled(Input)`
  color: black;
  width: 100%;
  font-size: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
`;

const InputNameNewCard = styled(Input)`
  margin-bottom: 20px;
  font-size: 20px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  font-size: 20px;
  width: fit-content;
  height: min-content;
  background-color: ${COLORS.silver};
`;
