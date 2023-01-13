import React from "react";

import styled from "styled-components";

type Props = {
  userName: string;
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 20px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: thick double #f0f0f0;
`;
const User = styled.div`
  padding: 10px 20px;
  width: fit-content;
  color: #000000;
  height: 50px;
  font-size: 25px;
  font-weight: 700;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
const Logo = styled.div`
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 700;
`;

const Header = (props: Props) => {
  return (
    <Container>
      <Logo>Trello</Logo>
      <User>{props.userName}</User>
    </Container>
  );
};

export default Header;
