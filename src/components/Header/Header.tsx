import { COLORS } from "constants/";

import React from "react";

import { useAppSelector } from "redux/hooks";
import { getUsername } from "redux/user";
import styled from "styled-components";

export const Header = () => {
  const userName = useAppSelector(getUsername);
  return (
    <Root>
      <Logo>Trello</Logo>
      <User>{userName}</User>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 20px;
  color: ${COLORS.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: thick double ${COLORS.white_smoke};
`;

const User = styled.div`
  padding: 10px 20px;
  width: fit-content;
  color: ${COLORS.black};
  font-size: 25px;
  font-weight: 700;
  background-color: ${COLORS.white_smoke};
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const Logo = styled.div`
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 700;
`;
