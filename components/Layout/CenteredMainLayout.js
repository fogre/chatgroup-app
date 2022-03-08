import { useState } from 'react'
import styled from 'styled-components'

import Navigation from './Navigation'
import {
  Main,
  MainHeading,
} from './LayoutComponents'

export const CenteredMainLayout = ({ pageName, children }) => {
  const [toggleNav, setToggleNav] = useState(false)

  return (
    <>
      <Main>
        <MainHeading
          pageName={pageName}
          toggleNav={toggleNav}
          setToggleNav={setToggleNav}
        />
        <CenteredWrapper>
          {children}
        </CenteredWrapper>
      </Main>
      <Navigation
        toggleNav={toggleNav}
        setToggleNav={setToggleNav}
      />
    </>
  )
}

const CenteredWrapper = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
`