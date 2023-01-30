import React, { InputHTMLAttributes } from "react";

import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return <Root ref={ref} className={className} {...props}></Root>;
  }
);

const Root = styled.input`
  font-size: 25px;
  border-radius: 5px;
  padding: 5px 10px;
`;
