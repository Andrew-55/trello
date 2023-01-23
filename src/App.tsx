import { COLORS } from "constants/";

import React, { useState } from "react";

import { Header, WelcomePopUp } from "components";
import { Main } from "pages";
import styled from "styled-components";
import GlobalStyles from "styles/global";

export const App = () => {
  const [userName, setUserName] = useState("");
  const handleUserNameChange = (userName: string) => setUserName(userName);

  return (
    <>
      <GlobalStyles />
      {userName ? (
        <Container>
          <Header userName={userName} />
          <Main userName={userName} />
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
  width: 100vw;
  min-width: fit-content;
`;
