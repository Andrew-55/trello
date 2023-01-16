import React, { useState, FC } from "react";

import styled from "styled-components";

import { COLORS } from "../constants/COLORS";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

type Props = {
  onUsernameChange: (userName: string) => void;
};

export const WelcomePopUp: FC<Props> = ({ onUsernameChange }) => {
  const [valueInput, setValueInput] = useState("");
  const [checkValueInput, setCheckValueInput] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  const handleSubmit = () => {
    if (
      valueInput === valueInput.trim() &&
      valueInput.length >= 3 &&
      valueInput.length <= 15
    ) {
      onUsernameChange(valueInput);
      setCheckValueInput(false);
    } else {
      setCheckValueInput(true);
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <TitleBlock>Welcome to board</TitleBlock>
      <InputWelcomePopUp
        className="inputWelcomePopUp"
        value={valueInput}
        onChange={handleChangeName}
        type="text"
        maxLength={15}
        placeholder="Please, enter your name"
        autoFocus
      />
      {checkValueInput && (
        <DescriptionError>
          Invalid name. Please check your name against the following parameters:
          <br />
          Name has length min 3 max 15 characters, and it doesn't contain spaces
          at the beginning or end.
        </DescriptionError>
      )}
      <ButtonWelcomePopUp
        className="buttonWelcomePopUp"
        type="submit"
        onClick={handleSubmit}
      >
        OK
      </ButtonWelcomePopUp>
    </Form>
  );
};

const Form = styled.form`
  margin: auto;
  margin-top: 10%;
  padding: 30px;
  width: 600px;
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

const InputWelcomePopUp = styled(Input)``;

const ButtonWelcomePopUp = styled(Button)``;
