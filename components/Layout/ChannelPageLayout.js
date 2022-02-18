import { useState } from 'react'

import { MemberProvider } from '@context'

import MessageInput from '@components/MessageInput'
import MessageList from '@components/MessageList'
import Navigation from './Navigation'
import {
  Main,
  MainHeading,
  MainContent,
  Nav
} from './LayoutComponents'

export const ChannelPageLayout = ({ currentChannel, channelMessages, isPrivateChannel }) =>  {
  const [toggleNav, setToggleNav] = useState(false)

  return (
    <MemberProvider
      currentChannel={currentChannel}
      channelMessages={channelMessages}
      isPrivateChannel={isPrivateChannel}
    >
      <>
        <Main>
          <MainHeading
            pageName={currentChannel.name}
            toggleNav={toggleNav}
            setToggleNav={setToggleNav}
          />
          <MainContent>
            <MessageList
              currentChannel={currentChannel}
              channelMessages={channelMessages}
              isPrivateChannel={isPrivateChannel}
            />
          </MainContent>
          <MessageInput
            currentChannel={currentChannel}
            isPrivateChannel={isPrivateChannel}
          />
        </Main>
        <Navigation
          currentChannel={currentChannel}
          toggleNav={toggleNav}
          setToggleNav={setToggleNav}
        />
      </>
    </MemberProvider>
  )
}