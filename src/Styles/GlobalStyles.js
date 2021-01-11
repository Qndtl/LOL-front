import {createGlobalStyle} from 'styled-components';
import {reset} from 'reset-styles';

const GlobalStyles = createGlobalStyle`
  ${reset};
  body{
    box-sizing: border-box;
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
