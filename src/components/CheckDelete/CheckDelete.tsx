import { COLORS, Z_INDEX } from "constants/";

import React, { FC } from "react";

import styled from "styled-components";
import { Button } from "ui";

type Props = {
  question: string;
  onDeleteClick: () => void;
  onCancelClick: () => void;
};

export const CheckDelete: FC<Props> = ({
  question,
  onDeleteClick,
  onCancelClick,
}) => {
  return (
    <Root>
      <TitleCheckDelete>{question}</TitleCheckDelete>
      <WrapButton>
        <Button text="Yes" onClick={onDeleteClick} />
        <Button text="Cancel" onClick={onCancelClick} />
      </WrapButton>
    </Root>
  );
};

const Root = styled.div`
  position: fixed;
  top: 30%;
  left: 25%;
  right: 25%;
  min-width: 200px;
  padding: 20px 30px;
  background-color: ${COLORS.gray};
  border-radius: 15px;
  box-shadow: 0 0 25px ${COLORS.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: ${Z_INDEX.checkDelete};
`;

const TitleCheckDelete = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

const WrapButton = styled.div`
  display: flex;
  column-gap: 15px;
  justify-content: center;
`;
