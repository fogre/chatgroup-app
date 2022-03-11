import { keyframes } from 'styled-components'

export const fadeInAnimation = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  0.01% {
    display: block;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`