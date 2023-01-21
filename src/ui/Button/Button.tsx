import { COLORS } from "constants/";

import React, { ButtonHTMLAttributes, FC } from "react";

import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
  isDisabled?: boolean;
}

export const Button: FC<Props> = ({
  isDisabled,
  className,
  text,
  ...props
}) => {
  return (
    <Root disabled={isDisabled} className={className} {...props}>
      {text}
    </Root>
  );
};

const Root = styled.button`
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;

  &:hover {
    border: 2px solid ${COLORS.black};
    background-color: ${COLORS.black1};
    color: ${COLORS.silver};
  }
  &:active {
    background-color: ${COLORS.black};
  }
`;
