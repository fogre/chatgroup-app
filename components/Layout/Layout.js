import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { MemberProvider } from '@context'

import ChannelLists from '@components/ChannelList'
import MembersList from '@components/MembersList'
import MessageInput from '@components/MessageInput'
import MessageList from '@components/MessageList'

export const ChannelPageLayout = ({ currentChannel, channelMessages, isPrivateChannel }) => (
  <MemberProvider
    currentChannel={currentChannel}
    channelMessages={channelMessages}
    isPrivateChannel={isPrivateChannel}
  >
    <>
      <Nav>
        <MembersList />
        <br/><br/>
        <ChannelLists />
      </Nav>
      <Main>
        <h1>Hello</h1>
        <MessageList
          currentChannel={currentChannel}
          channelMessages={channelMessages}
          isPrivateChannel={isPrivateChannel}
        />
        <br />
        <MessageInput
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel}
        />
      </Main>
    </>
  </MemberProvider>
)

export const Nav = styled.nav`
  grid-area: 'nav'
  height: 100%;
  width: 500px;
  background: teal;
`

export const Main = styled.main`
  grid-area: 'main';
  height: 100%;
`