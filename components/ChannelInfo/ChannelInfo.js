import { useContext } from 'react'
import styled from 'styled-components'

import { ChevronLeft as ChevronLeftIcon } from 'react-feather'

import { MemberContext } from '@context'
import { COLORS } from '@constants'

import { NavContent } from '@components/Layout'
import { Heading, IconButton, Text } from '@components/Styled'
import UserComponent from '@components/User'


const ChannelInfo = ({ changeNavView, currentChannel }) => {
  const { activeMembers, inactiveMembers } = useContext(MemberContext)

  return (
    <>
      <HeadingWrapper>
        <IconButton onClick={() => changeNavView(false)}>
          <ChevronLeftIcon
            strokeWidth={2}
            size={32}
            color={COLORS.white['95']}
          />
          <Heading>All channels</Heading>
        </IconButton>
      </HeadingWrapper>
      <NavContent>
        <InfoWrapper>
          <Heading transform='uppercase'>
            {currentChannel.name}
          </Heading>
          <Text>{currentChannel.description}</Text>
        </InfoWrapper>
        <Heading transform='uppercase'>
          Members
        </Heading>
        {Object.values(activeMembers).map(aMember =>
          <UserComponent
            key={aMember.id}
            user={aMember}
            active={true}
          />
        )}
        {Object.values(inactiveMembers).map(iMember =>
          <UserComponent
            key={iMember.id}
            user={iMember}
            active={false}
          />
        )}
      </NavContent>
    </>
  )
}

const HeadingWrapper = styled.div`
  padding:
    var(--padding-top)
    var(--padding-nav)
    var(--padding-top)
    calc(var(--padding-nav) - 25px);
`

const InfoWrapper = styled.div`
  padding-bottom: 40px;
`

export default ChannelInfo