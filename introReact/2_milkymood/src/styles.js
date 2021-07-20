import styled, { createGlobalStyle } from 'styled-components'

// (using tagged template literals)
// this sets global style of the website
export const GlobalStyle = createGlobalStyle`
  body {
    color: #FBFBFB;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    background: #2828E6;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
  }
`
