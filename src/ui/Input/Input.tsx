import React, { InputHTMLAttributes, FC } from "react";

import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  register?: UseFormRegisterReturn;
}

export const Input: FC<Props> = React.forwardRef(
  ({ className, register, ...props }, ref) => {
    return <Root className={className} {...register} {...props}></Root>;
  }
);

const Root = styled.input`
  font-size: 25px;
  border-radius: 5px;
  padding: 5px 10px;
`;
