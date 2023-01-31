import React, { TextareaHTMLAttributes } from "react";

import styled from "styled-components";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => {
    return <Root ref={ref} className={className} {...props}></Root>;
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
