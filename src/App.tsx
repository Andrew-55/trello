import React, { useState } from "react";

import styled from "styled-components";

import Header from "./components/Header";
import WelcomePopUp from "./components/WelcomePopUp";
import Main from "./pages/Main";
import GlobalStyles from "./styles/global";

const Container = styled.div`
  color: white;
  text-align: center;
  height: 100vh;
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
          <Main userName={userName} />
        </Container>
      ) : (
        <WelcomePopUp getUserName={getUserName} />
      )}
    </>
  );
}

export default App;
