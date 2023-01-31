import { COLORS } from "constants/";

import React, { FC, useEffect } from "react";

import { CardTitleFormProps } from "components/Card";
import { ErrorMessage } from "components/ErrorMessage";
import { useOnClickOutside } from "hoc";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { SvgCheckMark } from "svg";
import { ButtonIcon, Input } from "ui";
import { checkStringIsEmpty } from "utils/logic-functions";

export type CardNameFormValues = {
  titleCard: string;
};

export const CardModalCardTitleForm: FC<CardTitleFormProps> = ({
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

  const ref = React.useRef<HTMLFormElement>(null);

  useOnClickOutside(ref, onCancel);

  const onSubmit: SubmitHandler<CardNameFormValues> = ({
    titleCard,
  }: CardNameFormValues) => {
    onConfirm(titleCard);
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <WrapInputBlock>
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
        <StyledButtonIcon icon={<SvgCheckMark />} type="submit" />
      </WrapInputBlock>
      {errors.titleCard && <ErrorMessage message={errors.titleCard.message} />}
    </form>
  );
};

const WrapInputBlock = styled.div`
  position: relative;
  display: flex;
  column-gap: 30px;
`;

const StyledInput = styled(Input)`
  font-size: 15px;
  width: 60%;
  margin-bottom: 20px;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 40px;
  height: 40px;
  border-radius: 20%;
  fill: ${COLORS.white_smoke};

  &:hover {
    fill: ${COLORS.light_green};
    background-color: ${COLORS.gray};
  }
`;
