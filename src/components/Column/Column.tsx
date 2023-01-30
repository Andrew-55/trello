import { COLORS } from "constants/COLORS";

import React, { useState, FC } from "react";

import { Card } from "components";
import { CardTitleForm } from "components/Card/";
import { ErrorMessage } from "components/ErrorMessage";
import { useOnClickOutside } from "hoc";
import { useForm, SubmitHandler } from "react-hook-form";
import { addCard, getCardsByColumnId } from "redux/card";
import { changeColumnName } from "redux/column";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getUsername } from "redux/user";
import styled, { css } from "styled-components";
import { Button, Input } from "ui";
import { checkStringIsEmpty } from "utils/logic-functions";

type Props = {
  item: { columnId: string; columnName: string };
};

type ColumnNameFormValues = {
  columnName: string;
};

export const Column: FC<Props> = ({ item }) => {
  const { columnId, columnName } = item;

  const username = useAppSelector(getUsername);
  const cardsColumn = useAppSelector(getCardsByColumnId(columnId));

  const [isColumnNameEditEnable, setIsColumnNameEditEnable] = useState(false);
  const [isAddNewCard, setIsAddNewCard] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      columnName: columnName,
    },
  });

  const dispactch = useAppDispatch();

  const handleCloseAddCard = () => {
    setIsAddNewCard(false);
  };

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, handleCloseAddCard);

  const handleGetCardName = (titleCard: string) => {
    dispactch(addCard({ columnId, nameNewCard: titleCard, username }));
    setIsAddNewCard(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit);
    }
  };

  const onSubmit: SubmitHandler<ColumnNameFormValues> = ({
    columnName,
  }: ColumnNameFormValues) => {
    setIsColumnNameEditEnable(false);
    dispactch(changeColumnName({ columnId, columnName }));
  };

  return (
    <Root>
      {isColumnNameEditEnable ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputColumnName
            {...register("columnName", {
              maxLength: {
                value: 15,
                message: "Name is too length, max 15 characters",
              },
              validate: checkStringIsEmpty,
            })}
            type="text"
            autoFocus
            onBlur={handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
          />

          {errors.columnName && (
            <ErrorMessage message={errors.columnName.message} />
          )}
        </Form>
      ) : (
        <ButtonTitleColumn
          text={columnName}
          onClick={() => setIsColumnNameEditEnable(true)}
        />
      )}

      <ul>
        {cardsColumn.map((card) => (
          <li key={card.id}>
            <Card card={card} />
          </li>
        ))}
      </ul>

      {isAddNewCard ? (
        <div ref={ref}>
          <CardTitleForm
            initialValues=""
            onCancel={handleCloseAddCard}
            onConfirm={handleGetCardName}
          />
        </div>
      ) : (
        <ButtonAddColumn
          text="Add a card"
          onClick={() => setIsAddNewCard(true)}
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const InputColumnName = styled(Input)`
  color: ${COLORS.black};
  width: 100%;
  font-size: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
`;
