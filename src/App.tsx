import React, { useState } from "react";

import styled from "styled-components";

import Header from "./components/Header";
import WelcomePopUp from "./components/WelcomePopUp";
import GlobalStyles from "./styles/global";

const Container = styled.div`
  color: white;
  text-align: center;
`;

function App() {
  const [userName, setUserName] = useState("");
  const getUserName = (userName: string) => setUserName(userName);

  return (
    <>
      <GlobalStyles />
      {userName ? (
        <Container>
          <Header userName={userName} />
        </Container>
      ) : (
        <WelcomePopUp getUserName={getUserName} />
      )}
    </>
  );
}

export default App;
