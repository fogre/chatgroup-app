import styled from 'styled-components'

import {
  Menu as MenuIcon,
  X as CloseIcon
} from 'react-feather'

import { COLORS, QUERIES } from '@constants'

import { Text, Heading, IconButton } from '@components/Styled'

export const MainHeading = ({ pageName, toggleNav, setToggleNav }) => (
  <MainHeader>
    <MainHeadingContent>
      <ToggleNavWrapper
        view={toggleNav}
        onClick={() => setToggleNav(!toggleNav)}
      >
        <IconButton
          radius={toggleNav ? 8 : undefined}
          backgroundColor={toggleNav ? COLORS.black.dark : undefined}
          size={toggleNav ? 38 : undefined}
        >
          {toggleNav
            ? <CloseIcon
              color={COLORS.white['88']}
              size={18}
            />
            : <MenuIcon
              color={COLORS.white['88']}
              size={24}
              strokeWidth={2}
            />
          }
        </IconButton>
      </ToggleNavWrapper>
      <Heading
        transform='uppercase'
        color='light'
      >
        {pageName}
      </Heading>
    </MainHeadingContent>
  </MainHeader>
)

export const GridLayoutWrapper = styled.div`
  --header-height: 60px;
  --nav-width: 320px;
  --padding-main: 70px;
  --padding-nav: 32px;
  --padding-top: 18px;
  --content-height: calc(100vh - var(--header-height) * 2);
  --fixed-z-index: 3;
  --nav-z-index: 4;
  display: grid;
  grid-template-areas: 'nav main';
  grid-template-columns: var(--nav-width) 1fr;
  width: 100%;
  height: 100%;
  overflow: hidden;
  isolation: isolate;

  @media ${QUERIES.tablet} {
    display: block;
    --padding-main: 32px;
  }

  @media ${QUERIES.mobile} {
    --nav-width: calc(100vw - 50px);
    --padding-main: 19px;
  }
`

export const Main = styled.main`
  grid-area: main;
  width: 100%;
  position: relative;
`

export const MainHeader = styled.header`
  box-shadow: var(--shadow-primary);
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${COLORS.black.medium};
  z-index: var(--fixed-z-index);
`

export const MainHeadingContent = styled.div`
  padding: 0 var(--padding-main);
  height: var(--header-height);
  display: flex;
  align-items: center;

  @media ${QUERIES.tablet} {
    padding: 0 80px;
  }
`

export const MainContent = styled.div`
  padding: var(--padding-top) var(--padding-main);
  width: 100%;
  min-height: var(--content-height);
  max-height: var(--content-height);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const Nav = styled.nav`
  grid-area: nav
  height: 100%;
  width: var(--nav-width);
  max-width: 100%;
  background: ${COLORS.black.dark};
  box-shadow: var(--shadow-primary);
  z-index: var(--nav-z-index);

  @media ${QUERIES.tablet} {
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    transition: 0.4s;
    transform: ${p => p.view ? 'translateX(0)' : 'translateX(-100%)'}
  }
`

export const NavContent = styled.div`
  padding: var(--padding-top) var(--padding-nav);
  overflow-y: scroll;
  overflow-x: hidden;
`

export const ToggleNavWrapper = styled.div`
  display: none;

  @media ${QUERIES.tablet} {
    --close-button-padding: 10px 6px;
    display: block;
    position: absolute;
    width: ${p => p.view ? '100vw' : 'min-content'};
    height: ${p => p.view ? '100vh' : 'min-content'};
    left: 0;
    top: 0;
    transition: 0.4s;
    background: transparent;
    transform: ${p => p.view ? 'translateX(var(--nav-width))' : 'translateX(0)'};
    padding: ${p => p.view
    ? 'var(--close-button-padding)'
    : 'var(--padding-top) var(--padding-nav)'
};
  }
`