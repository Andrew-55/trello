import { COLORS } from "constants/";

import React from "react";

import GlobalStyles from "assets/styles/global";
import { Header, WelcomePopUp } from "components";
import { Main } from "pages";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import styled from "styled-components";

import { setUser } from "./redux/user/slice";

export const App = () => {
  const userName = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();

  const handleUserNameChange = (userName: string) => {
    dispatch(setUser(userName));
  };

  return (
    <>
      <GlobalStyles />
      {userName ? (
        <Container>
          <Header />
          <Main />
        </Container>
      ) : (
        <WelcomePopUp onUserNameChange={handleUserNameChange} />
      )}
    </>
  );
};

const Container = styled.div`
  color: ${COLORS.white};
  height: 100vh;
  min-width: min-content;
`;
