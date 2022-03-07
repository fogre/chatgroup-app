import { useState, useContext } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import styled from 'styled-components'

import { ChevronLeft as ChevronLeftIcon } from 'react-feather'

import { UserContext } from '@context'
import { COLORS, QUERIES } from '@constants'

import ChannelLists from '@components/ChannelList'
import ChannelInfo from '@components/ChannelInfo'
import UserComponent, { UserMenuComponent } from '@components/User'
import  { AddChannelModal } from '@components/Modals'
import { UnstyledButton } from '@components/Styled'
import { Nav } from './LayoutComponents'

const UserMenu = ({ toggle, setToggle }) => {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await router.push('/signup')
      await Auth.signOut()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <UserMenuWrapper
      isOpen={toggle}
      onDismiss={() => setToggle()}
    >
      <UserMenuContent aria-label='User menu modal'>
        <UserMenuComponent handleSignOut={() => handleSignOut()} />
      </UserMenuContent>
    </UserMenuWrapper>
  )
}

const UserMenuWrapper = styled(DialogOverlay)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

const UserMenuContent = styled(DialogContent)`
  background-color: ${COLORS.black.medium};
  border: 1px solid ${COLORS.black.light};
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-secondary);
  position: fixed;
  left: 90px;
  bottom: 60px;
  width: 200px;
  padding: 15px;
  margin-left: var(--nav-width);

  @media ${QUERIES.mobile} {
    right: 20vw;
  }
`

const UserInNav = () => {
  const { user } = useContext(UserContext)
  const [toggleUserMenu, setToggleUserMenu] = useState(false)

  if (!user) {
    return null
  }

  return (
    <>
      <UserWrapper
        as={UnstyledButton}
        onClick={() => setToggleUserMenu(!toggleUserMenu)}
      >
        <UserComponent active={true} user={user} />
        <ChevronLeftIcon
          size={20}
          color={COLORS.white['74']}
          style={{ transform: 'rotate(-90deg)' }}
        />
      </UserWrapper>
      <UserMenu
        toggle={toggleUserMenu}
        setToggle={() => setToggleUserMenu(false)}
      />
    </>
  )
}

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: var(--nav-width);
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 var(--padding-nav);
  background-color: ${COLORS.black.dark};

  @media ${QUERIES.mobile} {
    height: 60px;
  }
`


const Navigation = ({ currentChannel, toggleNav, setToggleNav }) => {
  const [navView, setNavView] = useState(true)
  const [openAddModal, setOpenAddModal] = useState(false)

  const changeNavView = (newView, closeNav = false) => {
    if (closeNav) {
      setToggleNav(false)
    }
    setNavView(newView)
  }

  const openAddChannelModalView = () => {
    setOpenAddModal(true)
    setToggleNav(false)
  }

  return (
    <>
      <Nav view={toggleNav}>
        <ChannelLists
          currentChannel={currentChannel}
          changeNavView={changeNavView}
          openAddModalView={openAddChannelModalView}
        />
        {currentChannel && <SlideInWrapper view={navView}>
          <ChannelInfo
            changeNavView={changeNavView}
            currentChannel={currentChannel}
          />
        </SlideInWrapper>}
        <UserInNav />
      </Nav>
      <AddChannelModal
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
      />
    </>
  )
}

const SlideInWrapper = styled.div`
  background: inherit;
  width: var(--nav-width);
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transition: 0.4s;
  transform: ${p => p.view ? 'translateX(0)' : 'translateX(-100%)'
}
`

export default Navigation