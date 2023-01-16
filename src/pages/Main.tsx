import React from "react";

import styled from "styled-components";

import { COLORS } from "../constants/COLORS";

export const Main = () => {
  const columnNames = ["TODO", "In Progress", "Testing", "Done"];
  const columns = columnNames.map((item: string, index: number) => (
    <Column key={index}>{item}</Column>
  ));

  return <Root>{columns}</Root>;
};

const Root = styled.div`
  width: 100%;
  padding: 20px 20px;
  color: ${COLORS.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.div`
  padding: 10px 20px;
  width: 20%;
  font-size: 20px;
  font-weight: 500;
  background-color: ${COLORS.zambezi};
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
