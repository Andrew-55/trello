import { createGlobalStyle } from "styled-components";

import { COLORS } from "../constants/COLORS";

export default createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${COLORS.black};
  }
`;
