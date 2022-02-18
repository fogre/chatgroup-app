import { createGlobalStyle } from 'styled-components'

import { ResetBrowserDefaults } from './cssReset'

import { COLORS } from '@constants'

const GlobalStyles = createGlobalStyle`
  ${ResetBrowserDefaults}

  html {
    --reach-dialog: 1;
    isolation: isolate;

    --border-radius-main: 8px;
    --border-radius-large: 12px;

    --font-tiny: ${12/16}rem;
    --font-small: ${14/16}rem;
    --font-normal: ${18/16}rem;

    --shadow-primary: 0px 4px 4px rgba(0, 0, 0, 0.25);
    --shadow-secondary: 0px 2px 4px rgba(0, 0, 0, 0.05);
  }

  body {
    position: relative;
    font-family: 'Open Sans', sans-serif;
    font-size: var(--font-normal);
    font-weight: 500;
    background: ${COLORS.black.medium};
    color: ${COLORS.white['88']};
    letter-spacing: -0.035em;
  }

  html, body, div#__next {
    height: 100%;
  }


  h2, h3 {
    font-size: var(--font-normal);
    font-weight: 700;
  }

  h2 {
    color: ${COLORS.white['88']};
  }
`

export default GlobalStyles

