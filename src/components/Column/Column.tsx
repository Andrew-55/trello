import { COLORS } from "constants/COLORS";

import React, { useState, FC, useMemo } from "react";

import { Card } from "components";
import { addCard } from "redux/card/slice";
import { changeColumnName } from "redux/column/slice";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import styled, { css } from "styled-components";
import { Button, Input } from "ui";
import { getCartdsByColumnId } from "utils/logic-functions";

type Props = {
  item: { columnId: string; columnName: string };
};

export const Column: FC<Props> = ({ item }) => {
  const cards = useAppSelector((store) => store.cards.cards);
  const username = useAppSelector((store) => store.user.username);
  const [valueColumnName, setValueColumnName] = useState(item.columnName);
  const [nameNewCard, setNameNewCard] = useState("");
  const [isColumnNameEditEnable, setIsColumnNameEditEnable] = useState(false);
  const [checkValueColumnName, setCheckValueColumnName] = useState(false);

  const dispactch = useAppDispatch();
  const { columnId } = item;

  const handelSaveNewNameColumns = () => {
    const newName = valueColumnName;
    dispactch(changeColumnName({ columnId, newName }));
  };

  const handelClickSaveNewCard = () => {
    if (nameNewCard) {
      dispactch(addCard({ columnId, nameNewCard, username }));
      setIsColumnNameEditEnable(false);
      setNameNewCard("");
    }
  };

  const handleClickButtonChangeName = () => {
    setCheckValueColumnName((prev) => !prev);
    handelSaveNewNameColumns();
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

  const cardsColumn = useMemo(() => {
    return getCartdsByColumnId(cards, columnId);
  }, [cards, columnId]);

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
            onBlur={handleClickButtonChangeName}
          />
        </FlexBlock>
      ) : (
        <ButtonTitleColumn
          text={valueColumnName}
          onClick={() => setCheckValueColumnName((prevState) => !prevState)}
        />
      )}
      <ul>
        {cardsColumn.map((card) => (
          <li key={card.id}>
            <Card card={card} columnName={valueColumnName} />
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

const Root = styled.li`
  padding: 10px 20px;
  width: 20%;
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

const FlexBlock = styled.div`
  display: flex;
  column-gap: 10px;
`;

const InputColumnName = styled(Input)`
  color: ${COLORS.black};
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
