import React, { FC, useEffect } from "react";

import { ErrorMessage } from "components/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Button, Textarea } from "ui";
import { checkStringIsEmpty } from "utils/logic-functions";

type Props = {
  onConfirm: (titleCard: string) => void;
};

type CommentFormValues = {
  newCommentCard: string;
};

export const AddCommentForm: FC<Props> = ({ onConfirm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      newCommentCard: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit: SubmitHandler<CommentFormValues> = ({
    newCommentCard,
  }: CommentFormValues) => {
    onConfirm(newCommentCard);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledTextArea
        {...register("newCommentCard", {
          validate: checkStringIsEmpty,
        })}
        placeholder="Write a comment ...."
      />

      {errors.newCommentCard && (
        <ErrorMessage message={errors.newCommentCard.message} />
      )}

      <WrapButton>
        <StyledButton text="Add" type="submit" />
        <StyledButton text="Cancel" type="button" onClick={() => reset()} />
      </WrapButton>
    </form>
  );
};

const StyledTextArea = styled(Textarea)`
  margin-left: 20px;
  width: 95%;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  min-width: 80px;
`;

const WrapButton = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
`;
