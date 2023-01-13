import React from "react";

import styled from "styled-components";

type Props = {
  userName: string;
};

const Container = styled.div`
  width: 100%;
  padding: 20px 20px;
  color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.div`
  padding: 10px 20px;
  width: 20%;
  font-size: 20px;
  font-weight: 500;
  background-color: #5e5e5e;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const Main = (props: Props) => {
  const columnNames = ["TODO", "In Progress", "Testing", "Done"];
  const columns = columnNames.map((item: string, index: number) => (
    <Column key={index}>{item}</Column>
  ));
  return <Container>{columns}</Container>;
};

export default Main;
