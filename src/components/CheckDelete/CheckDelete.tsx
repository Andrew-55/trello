import { COLORS, Z_INDEX } from "constants/";

import React, { FC } from "react";

import styled from "styled-components";
import { Button } from "ui";

type Props = {
  question: string;
  onClickDelete: () => void;
  onClickCancel: () => void;
};

export const CheckDelete: FC<Props> = ({
  question,
  onClickDelete,
  onClickCancel,
}) => {
  return (
    <Root>
      <TitleCheckDelete>{question}</TitleCheckDelete>
      <WrapButton>
        <Button text="Yes" onClick={onClickDelete} />
        <Button text="Cancel" onClick={onClickCancel} />
      </WrapButton>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  max-width: 300px;
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
