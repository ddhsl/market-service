import { createGlobalStyle } from "styled-components";
import "./reset.css";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

:root {
    --main-color : #21BF48;
    --sub-color : #767676;
    --back-color : #F2F2F2;
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip-path: inset(50%);
	border: 0;
	clip: rect(0 0 0 0);
}

body,input::placeholder,input  {
  font-family: 'SpoqaHanSansNeo-Regular';
  font-size: 16px ;
}


`;

export default GlobalStyle;
