import React, { useState } from "react";

import styled from "styled-components";

import { Header } from "./components/Header";
import { WelcomePopUp } from "./components/WelcomePopUp";
import { COLORS } from "./constants/COLORS";
import { Main } from "./pages/Main";
import GlobalStyles from "./styles/global";

export const App = () => {
  const [userName, setUserName] = useState("");
  const handleUsernameChange = (userName: string) => setUserName(userName);

  return (
    <>
      <GlobalStyles />
      {userName ? (
        <Container>
          <Header userName={userName} />
          <Main userName={userName} />
        </Container>
      ) : (
        <WelcomePopUp onUsernameChange={handleUsernameChange} />
      )}
    </>
  );
};

const Container = styled.div`
  color: ${COLORS.white};
  height: 100vh;
`;
