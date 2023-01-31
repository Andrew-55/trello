import { COLORS } from "constants/";

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${COLORS.black};
  }

  ul, li {
    list-style: none;
    padding: 0;
  }
  
  input, textarea {
    outline: 0;
  }
`;
