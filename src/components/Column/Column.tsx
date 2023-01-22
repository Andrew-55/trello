import { COLORS } from "constants/COLORS";

import React, { useState, FC, useMemo } from "react";

import { Card } from "components";
import { CardInterface, CommentInterface } from "interfaces";
import styled, { css } from "styled-components";
import { Button, Input } from "ui";
import { getSortDataCard } from "utils/logic-functions";

type Props = {
  item: { columnId: string; columnName: string };
  cards: CardInterface[];
  comments: CommentInterface[];
  onSaveNewNameColumns: (columnId: string, newName: string) => void;
  onSaveNewCard: (columnId: string, newNameCard: string) => void;
  onSaveNewDescriptionCard: (cardId: string, newDescription: string) => void;
  onSaveNewTitleCard: (cardId: string, newTitle: string) => void;
  onDeleteCardState: (cardId: string) => void;
  onAddNewComments: (cardId: string, comment: string) => void;
  onDeleteComments: (commentId: string) => void;
  onChangeTextComment: (commentdId: string, newTextComment: string) => void;
};

export const Column: FC<Props> = ({
  item,
  cards,
  comments,
  onSaveNewNameColumns,
  onSaveNewCard,
  onSaveNewDescriptionCard,
  onSaveNewTitleCard,
  onDeleteCardState,
  onAddNewComments,
  onDeleteComments,
  onChangeTextComment,
}) => {
  const [valueColumnName, setValueColumnName] = useState(item.columnName);
  const [nameNewCard, setNameNewCard] = useState("");
  const [isColumnNameEditEnable, setIsColumnNameEditEnable] = useState(false);
  const [checkValueColumnName, setCheckValueColumnName] = useState(false);

  const handelClickSaveNewCard = () => {
    if (nameNewCard) {
      onSaveNewCard(item.columnId, nameNewCard);
      setIsColumnNameEditEnable(false);
      setNameNewCard("");
    }
  };

  const handleClickButtonChangeName = () => {
    setCheckValueColumnName(!checkValueColumnName);
    onSaveNewNameColumns(item.columnId, valueColumnName);
  };

  const closeNewCard = () => {
    setIsColumnNameEditEnable(false);
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

  const commentsCard = useMemo(() => {
    return getSortDataCard(cards, comments);
  }, [cards, comments]);

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
            onClick={handleClickButtonChangeName}
            text="Ok"
          />
        </FlexBlock>
      ) : (
        <ButtonTitleColumn
          text={valueColumnName}
          onClick={() => setCheckValueColumnName(!checkValueColumnName)}
        />
      )}
      <ul>
        {cards?.map((card) => (
          <li key={card.id}>
            <Card
              card={card}
              comments={commentsCard[card.id]}
              columnName={valueColumnName}
              onSaveNewDescriptionCard={onSaveNewDescriptionCard}
              onSaveNewTitleCard={onSaveNewTitleCard}
              onDeleteCardState={onDeleteCardState}
              onAddNewComments={onAddNewComments}
              onDeleteComments={onDeleteComments}
              onChangeTextComment={onChangeTextComment}
            />
          </li>
        ))}
      </ul>

      {isColumnNameEditEnable ? (
        <>
          <InputNameNewCard
            value={nameNewCard}
            type="text"
            autoFocus
            onChange={handleChangeCardName}
            placeholder="Enter a title card..."
          />
          <FlexBlock>
            <ButtonColumn text="Save" onClick={handelClickSaveNewCard} />
            <ButtonColumn text="Close" onClick={closeNewCard} />
          </FlexBlock>
        </>
      ) : (
        <ButtonAddColumn
          text="Add a card"
          onClick={() => setIsColumnNameEditEnable(true)}
        />
      )}
    </Root>
  );
};

const Root = styled.div`
  padding: 10px 20px;
  min-width: 250px;
  font-size: 20px;
  font-weight: 500;
  background-color: ${COLORS.zambezi};
  border-radius: 20px;
`;

const ButtonColumnStyles = css`
  font-size: 20px;
  padding: 10px 10px;
  border-radius: 10px;
  color: ${COLORS.white_smoke};
  background-color: ${COLORS.zambezi};
  border: none;
  cursor: pointer;
  &:hover {
    border: none;
    background-color: ${COLORS.gray};
    color: ${COLORS.white};
  }
`;

const ButtonTitleColumn = styled(Button)`
  ${ButtonColumnStyles}
  font-size: 25px;
  font-weight: 500;
  width: 100%;
  text-align: start;
  margin-bottom: 25px;
  overflow-wrap: break-word;
`;

const ButtonAddColumn = styled(Button)`
  ${ButtonColumnStyles}
  width: 100%;
  text-align: start;
`;

const ButtonColumn = styled(Button)`
  ${ButtonColumnStyles}
`;

const StyledButton = styled(Button)`
  font-size: 20px;
  width: fit-content;
  height: min-content;
  background-color: ${COLORS.silver};
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
