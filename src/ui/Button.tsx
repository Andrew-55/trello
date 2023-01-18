import styled from "styled-components";

import { COLORS } from "../constants/COLORS";

export const Button = styled.button`
  cursor: pointer;
  border-radius: 15px;

  &.buttonWelcomePopUp {
    width: 100px;
    height: 50px;
    font-size: 32px;
    background-color: ${COLORS.silver};
    border-radius: 15px;
    &:hover {
      border: 2px solid ${COLORS.black};
      background-color: ${COLORS.black1};
      color: ${COLORS.silver};
    }
    &:active {
      background-color: ${COLORS.black};
    }
  }
`;
