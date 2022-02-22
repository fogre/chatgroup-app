import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { COLORS } from '@constants'
import { UserContext } from '@context'
import { listChannelsQuery } from '@apiServices'

import { NavContent } from '@components/Layout'
import { Heading, AvatarWrapper } from '@components/Styled'

const ChannelLink = ({ channelBaseUrl, currentChannel, channel, changeNavView }) => {
  const isCurrent = currentChannel ? channel.id === currentChannel.id : false
  const avatarName =  `${channel.name[0]}${channel.name.match(/\b(\w)/g)[1]}`

  const WrapperComponent = ({ children }) => (
    <>
      {!isCurrent
        ? (<Link href={`${channelBaseUrl}${channel.id}`} passHref>
          {children}
        </Link>)
        : <>{children}</>
      }
    </>
  )

  return (
    <WrapperComponent>
      <ChannelWrapper
        isCurrent={isCurrent}
        onClick={() => changeNavView(true, !isCurrent)}
      >
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

const ChannelList = ({ currentChannel, isPrivate, changeNavView }) => {
  const { authMode } = useContext(UserContext)
  const [channels, setChannels] = useState([])
  const channelBaseUrl = isPrivate ? '/channel/' : '/publicChannel/'

  useEffect(() => {
    const getChannels = async () => {
      try {
        const channelsInDB = await listChannelsQuery(authMode, isPrivate)
        if (channelsInDB) {
          setChannels(channelsInDB)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getChannels()
  }, [isPrivate, authMode])

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

const MembersOnlyChannels = ({ currentChannel, changeNavView }) => {
  const { authMode } = useContext(UserContext)

  if (authMode === 'AWS_IAM') {
    return (
      <p>Only logged members can see these channels</p>
    )
  }

  return (
    <ChannelList
      isPrivate={true}
      currentChannel={currentChannel}
      changeNavView={changeNavView}
    />
  )
}

const ChannelLists = ({ currentChannel, changeNavView }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Heading>Channels</Heading>
      </HeaderWrapper>
      <ListWrapper>
        <NavContent>
          <ChannelList
            isPrivate={false}
            currentChannel={currentChannel}
            changeNavView={changeNavView}
          />
          <MembersOnlyChannels
            currentChannel={currentChannel}
            changeNavView={changeNavView}
          />
        </NavContent>
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`

const HeaderWrapper = styled.div`
  height: var(--header-height);
  padding: var(--padding-top) var(--padding-nav);
`

const ListWrapper = styled.div`
  height: 100%;
  min-height: var(--content-height);
  max-height: var(--content-height);
  overflow-y: auto;
`

export default ChannelLists