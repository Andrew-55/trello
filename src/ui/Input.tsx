import styled from "styled-components";

import { COLORS } from "../constants/COLORS";

export const Input = styled.input`
  font-size: 25px;
  border-radius: 5px;
  padding: 5px 10px;

  &.inputWelcomePopUp {
    width: 70%;
    margin-bottom: 30px;
    background-color: ${COLORS.white_smoke};
    border: 1px solid ${COLORS.black};
  }
`;
