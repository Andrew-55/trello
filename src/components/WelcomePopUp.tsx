import React, { useState } from "react";

import styled from "styled-components";

type Props = {
  getUserName: (userName: string) => void;
};

const ContainerPopUp = styled.div`
  margin: auto;
  margin-top: 10%;
  padding: 20px;
  height: 330px;
  width: 600px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 0 25px #f0f0f0;
`;

const TitleBlock = styled.h1`
  color: #000000;
  font-size: 32px;
  text-transform: uppercase;
  user-select: none;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 70%;
  height: 40px;
  margin-bottom: 15px;
  font-size: 25px;
  background-color: #f0f0f0;
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 5px 10px;
`;

const DiscError = styled.p`
  font-size: 15px;
  color: #ff0000;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  margin-top: 30px;
  font-size: 32px;
  background-color: #bebebe;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    border: 2px solid #000000;
    background-color: #00000090;
    color: #bebebe;
  }
  &:active {
    background-color: #000000;
  }
`;

const WelcomePopUp = (props: Props) => {
  const [valueInput, setValueInput] = useState("");
  const [checkValueInput, setCheckValueInput] = useState(false);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };
  const onClickButton = () => {
    if (/^[a-zA-Z0-9_-]{3,15}$/.test(valueInput)) {
      props.getUserName(valueInput);
      setCheckValueInput(false);
    } else {
      setCheckValueInput(true);
    }
  };
  return (
    <>
      <ContainerPopUp>
        <TitleBlock>Welcome to board</TitleBlock>
        <Input
          value={valueInput}
          onChange={onChangeInput}
          type="text"
          placeholder="Please, enter your name"
          autoFocus
        />
        {checkValueInput && (
          <DiscError>
            Invalid name. Please check your name against the following
            parameters: <br />
            Name length min 3 max 15 characters The name can only consist of
            letters, numbers and _ -
          </DiscError>
        )}
        <Button onClick={onClickButton}>OK</Button>
      </ContainerPopUp>
    </>
  );
};

export default WelcomePopUp;
