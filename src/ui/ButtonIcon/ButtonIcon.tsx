import { COLORS } from "constants/";

import React, { ButtonHTMLAttributes, FC } from "react";

import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  icon: React.ReactElement;
  isDisabled?: boolean;
}

export const ButtonIcon: FC<Props> = ({
  isDisabled,
  className,
  text,
  icon,
  ...props
}) => {
  return (
    <Root disabled={isDisabled} className={className} {...props}>
      {icon}
    </Root>
  );
};

const Root = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: initial;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${COLORS.black1};
    color: ${COLORS.silver};
  }
  &:active {
    background-color: ${COLORS.black};
  }
`;
