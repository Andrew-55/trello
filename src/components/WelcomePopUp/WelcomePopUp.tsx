import { COLORS } from "constants/";

import React, { useState, FC } from "react";

import styled from "styled-components";
import { Button, Input } from "ui";
import { checkInputName } from "utils/logic-functions";

type Props = {
  onUserNameChange: (userName: string) => void;
};

export const WelcomePopUp: FC<Props> = ({ onUserNameChange }) => {
  const [valueInput, setValueInput] = useState("");
  const [isNotCorrectValueInput, setIsNotCorrectValueInput] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = valueInput.trim();
    if (checkInputName(value)) {
      onUserNameChange(value);
      setIsNotCorrectValueInput(false);
    } else {
      setIsNotCorrectValueInput(true);
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <TitleBlock>Welcome to board</TitleBlock>
      <StyledInput
        value={valueInput}
        onChange={handleChangeName}
        type="text"
        maxLength={15}
        placeholder="Please, enter your name"
        autoFocus
      />

      {isNotCorrectValueInput && (
        <DescriptionError>
          Invalid name. Please check your name against the following parameters:
          <br />
          Name has length min 3 max 15 characters.
        </DescriptionError>
      )}

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

const DescriptionError = styled.p`
  font-size: 15px;
  color: ${COLORS.red};
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
