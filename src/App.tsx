import React, { useState } from "react";

import styled from "styled-components";

import WelcomePopUp from "./components/WelcomePopUp";
import GlobalStyles from "./styles/global";

const Container = styled.div`
  color: white;
  text-align: center;
  margin: top;
`;

const App = () => {
  const [userName, setUserName] = useState("");
  const getUserName = (userName: string) => setUserName(userName);

  return (
    <>
      <GlobalStyles />
      {userName ? (
        <Container>{userName}</Container>
      ) : (
        <WelcomePopUp getUserName={getUserName} />
      )}
    </>
  );
};

export default App;
