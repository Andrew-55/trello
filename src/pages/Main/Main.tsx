import { COLORS } from "constants/";

import React from "react";

import { Column } from "components";
import { useAppSelector } from "redux/hooks";
import styled from "styled-components";

export const Main = () => {
  const columns = useAppSelector((state) => state.columns.columns);

  return (
    <Root>
      {Object.values(columns)?.map((column) => {
        return <Column key={column.columnId} item={column} />;
      })}
    </Root>
  );
};

const Root = styled.ul`
  min-height: 80vh;
  padding: 20px 20px;
  color: ${COLORS.white};
  display: flex;
  justify-content: space-around;
  column-gap: 50px;
  align-items: flex-start;
  overflow-x: auto;
`;
