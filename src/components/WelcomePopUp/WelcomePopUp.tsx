import { COLORS } from "constants/";

import React, { FC } from "react";

import { ErrorMessage } from "components/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Button, Input } from "ui";
import { checkUsernameValidation } from "utils/logic-functions";

type Props = {
  onUserNameChange: (userName: string) => void;
};

type WelcomePopUpFormValues = {
  username: string;
};

export const WelcomePopUp: FC<Props> = ({ onUserNameChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WelcomePopUpFormValues>({
    mode: "onBlur",
    defaultValues: {
      username: "",
    },
  });

  const onSubmit: SubmitHandler<WelcomePopUpFormValues> = ({
    username,
  }: WelcomePopUpFormValues) => {
    onUserNameChange(username);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TitleBlock>Welcome to board</TitleBlock>
      <StyledInput
        {...register("username", {
          required: "Name not entered",
          minLength: {
            value: 3,
            message: "Name has length  min 3 characters",
          },
          validate: checkUsernameValidation,
        })}
        type="text"
        maxLength={15}
        placeholder="Please, enter your name"
        autoFocus
      />

      {errors.username && <ErrorMessage message={errors.username.message} />}

      <StyledButton type="submit" text="OK" />
    </Form>
  );
};

const Form = styled.form`
  margin: auto;
  margin-top: 10%;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  background-color: ${COLORS.white_smoke};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 0 25px ${COLORS.white_smoke};
`;

const TitleBlock = styled.h1`
  color: ${COLORS.black};
  font-size: 32px;
  text-transform: uppercase;
  user-select: none;
  margin-bottom: 30px;
`;

const StyledInput = styled(Input)`
  width: 70%;
  margin-bottom: 30px;
  background-color: ${COLORS.white_smoke};
  border: 1px solid ${COLORS.black};
`;

const StyledButton = styled(Button)`
  width: 100px;
  height: 50px;
  font-size: 32px;
  background-color: ${COLORS.silver};
  border-radius: 15px;
`;
