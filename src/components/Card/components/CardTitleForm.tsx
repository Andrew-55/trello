import { Z_INDEX } from "constants/";

import React, { FC } from "react";

import { CardTitleFormProps } from "components/Card";
import { ErrorMessage } from "components/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Button, Input } from "ui";
import { checkStringIsEmpty } from "utils/logic-functions";

export type CardNameFormValues = {
  titleCard: string;
};

export const CardTitleForm: FC<CardTitleFormProps> = ({
  initialValues,
  onClose,
  onConfirm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      titleCard: initialValues,
    },
  });

  const handleSaveCancel = () => {
    onClose();
    reset();
  };

  const onSubmit: SubmitHandler<CardNameFormValues> = ({
    titleCard,
  }: CardNameFormValues) => {
    onConfirm(titleCard);
  };

  return (
    <>
      <CloseForm onClick={handleSaveCancel} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledLegend>Title Card:</StyledLegend>
        <StyledInput
          register={register("titleCard", {
            maxLength: {
              value: 25,
              message: "Name is too length, max 25 characters",
            },
            validate: checkStringIsEmpty,
          })}
          placeholder="Enter a name of card..."
          type="text"
          autoFocus
        />
        {errors.titleCard && (
          <ErrorMessage message={errors.titleCard.message} />
        )}
        <WrapButton>
          <Button text="Save" type="submit" />
          <Button text="Cancel" type="button" onClick={handleSaveCancel} />
        </WrapButton>
      </Form>
    </>
  );
};

const CloseForm = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${Z_INDEX.cardFormClose};
  background: none;
  border: none;
`;

const Form = styled.form`
  position: relative;
  z-index: ${Z_INDEX.cardForm};
`;

const WrapButton = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
`;

const StyledLegend = styled.legend`
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  font-size: 15px;
  width: 100%;
  margin-bottom: 20px;
`;
