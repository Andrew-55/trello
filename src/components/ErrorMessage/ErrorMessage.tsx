import { COLORS } from "constants/";

import React, { FC } from "react";

import styled from "styled-components";

interface Props {
  message?: string;
}

export const ErrorMessage: FC<Props> = ({ message }) => {
  return <Root>{message}</Root>;
};

const Root = styled.p`
  font-size: 20px;
  color: ${COLORS.red};
  margin-bottom: 20px;
`;
