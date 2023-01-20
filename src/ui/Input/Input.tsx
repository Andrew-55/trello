import React, { InputHTMLAttributes, FC } from "react";

import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<Props> = ({ className, ...props }) => {
  return <Root className={className} {...props}></Root>;
};

const Root = styled.input`
  font-size: 25px;
  border-radius: 5px;
  padding: 5px 10px;
`;
