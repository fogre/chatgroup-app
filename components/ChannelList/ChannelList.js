import { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Plus as PlusIcon } from 'react-feather'

import { COLORS } from '@constants'
import { ChannelContext, UserContext } from '@context'

import { NavContent } from '@components/Layout'
import { Heading, AvatarWrapper, IconButton, UnstyledButton } from '@components/Styled'

const ChannelLink = ({ channelBaseUrl, currentChannel, channel, changeNavView }) => {
  const isCurrent = currentChannel ? channel.id === currentChannel.id : false
  const channelNameWithSpace = channel.name.match(/\b(\w)/g)[1]
  let avatarName =  channel.name[0]

  if (channelNameWithSpace) {
    avatarName = `${avatarName}${channelNameWithSpace}`
  }

  const WrapperComponent = ({ children }) => (
    <>
      {!isCurrent
        ? (<Link href={`${channelBaseUrl}${channel.id}`} passHref prefetch={false}>
          {children}
        </Link>)
        : (<UnstyledButton onClick={() => changeNavView(true, !isCurrent)}>
          {children}
        </UnstyledButton>)
      }
    </>
  )

  return (
    <WrapperComponent>
      <ChannelWrapper isCurrent={isCurrent}>
        <AvatarWrapper color={isCurrent ? COLORS.black.light : COLORS.black.medium}>
          {avatarName}
        </AvatarWrapper>
        <StyledChannelLink>{channel.name}</StyledChannelLink>
      </ChannelWrapper>
    </WrapperComponent>
  )
}

const ChannelWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: ${p => p.isCurrent ? COLORS.white['88'] : COLORS.white['74']};
  margin: 21px 0;
  width: max-content;

  &:hover {
    color: ${COLORS.white['88']};
    cursor: pointer;
  }
`

const StyledChannelLink = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
`

const ChannelList = ({ channels, currentChannel, isPrivate, changeNavView }) => {
  const channelBaseUrl = isPrivate ? '/channel/' : '/publicChannel/'

  return (
    <>
      {isPrivate
        ? <Heading>Member channels</Heading>
        : <Heading>Public channels</Heading>}
      <UnorderedList>
        {channels.map(channel =>
          <li key={channel.id}>
            <ChannelLink
              channel={channel}
              channelBaseUrl={channelBaseUrl}
              currentChannel={currentChannel}
              changeNavView={changeNavView}
            />
          </li>
        )}
      </UnorderedList>
    </>
  )
}

const UnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const MembersChannelList = ({ currentChannel, changeNavView, authMode }) => {
  const { privateChannels } = useContext(ChannelContext)

  if (authMode === 'AWS_IAM') {
    return (
      <p>Only logged members can see these channels</p>
    )
  }

  return (
    <ChannelList
      channels={privateChannels}
      isPrivate={true}
      currentChannel={currentChannel}
      changeNavView={changeNavView}
    />
  )
}

const PublicChannelList = ({ currentChannel, changeNavView }) => {
  const { publicChannels } = useContext(ChannelContext)
  console.log(publicChannels)
  return (
    <ChannelList
      channels={publicChannels}
      isPrivate={false}
      currentChannel={currentChannel}
      changeNavView={changeNavView}
    />
  )
}

const ChannelLists = ({ currentChannel, changeNavView, openAddModalView }) => {
  const { authMode } = useContext(UserContext)

  return (
    <>
      <Wrapper>
        <HeaderWrapper>
          <Heading>Channels</Heading>
          {authMode !== 'AWS_IAM' && <IconButton
            size={32}
            backgroundColor={COLORS.black.medium}
            radius={8}
            onClick={() => openAddModalView()}
          >
            <PlusIcon
              size={14}
              strokeWidth={3}
            />
          </IconButton>}
        </HeaderWrapper>
        <ListWrapper>
          <NavContent>
            <PublicChannelList
              currentChannel={currentChannel}
              changeNavView={changeNavView}
            />
            <MembersChannelList
              currentChannel={currentChannel}
              changeNavView={changeNavView}
              authMode={authMode}
            />
          </NavContent>
        </ListWrapper>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`

const HeaderWrapper = styled.div`
  height: var(--header-height);
  padding: var(--padding-top) var(--padding-nav);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ListWrapper = styled.div`
  height: 100%;
  min-height: var(--content-height);
  max-height: var(--content-height);
  overflow-y: auto;
`

export default ChannelLists