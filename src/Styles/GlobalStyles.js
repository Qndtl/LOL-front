import { createGlobalStyle } from 'styled-components';
import { reset } from 'reset-styles';

const GlobalStyles = createGlobalStyle`
  ${reset};
  body{
    box-sizing: border-box;
    background: linear-gradient(to bottom, #223F55, #0E0E0E);
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  input{
    outline: none;
    border: none;
  }
  button{
    text-align: center;
    cursor: pointer;
  }
`;

export default GlobalStyles;
