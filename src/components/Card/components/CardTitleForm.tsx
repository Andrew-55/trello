import { Z_INDEX } from "constants/";

import React, { FC, useEffect } from "react";

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
  onCancel,
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

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onSubmit: SubmitHandler<CardNameFormValues> = ({
    titleCard,
  }: CardNameFormValues) => {
    onConfirm(titleCard);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledLegend>Title Card:</StyledLegend>
      <StyledInput
        {...register("titleCard", {
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
      {errors.titleCard && <ErrorMessage message={errors.titleCard.message} />}
      <WrapButton>
        <Button text="Save" type="submit" />
        <Button text="Cancel" type="button" onClick={onCancel} />
      </WrapButton>
    </Form>
  );
};

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
