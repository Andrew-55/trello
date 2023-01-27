import React, { FC, TextareaHTMLAttributes } from "react";

import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  register?: UseFormRegisterReturn;
}

export const Textarea: FC<Props> = React.forwardRef(
  ({ className, register, ...props }, ref) => {
    return <Root className={className} {...register} {...props}></Root>;
  }
);

const Root = styled.textarea`
  border-radius: 5px;
  padding: 5px 10px;
  width: 100%;
  min-height: 50px;
  resize: none;
  border: none;
`;
