import { COLORS } from "constants/";

import React, { useState } from "react";

import { Header, WelcomePopUp } from "components";
import { Main } from "pages";
import styled from "styled-components";
import GlobalStyles from "styles/global";
import { getUser, setUser } from "utils/data-current";

export const App = () => {
  const [userName, setUserName] = useState(() => getUser());
  const handleUserNameChange = (userName: string) => {
    setUserName(userName);
    setUser(userName);
  };

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
