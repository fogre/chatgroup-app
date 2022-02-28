import styled from 'styled-components'

import { Heading, UserAvatar } from '@components/Styled'

const UserComponent = ({ user, active }) => (
  <Wrapper active={active}>
    <UserAvatar user={user} />
    <Heading color='dark'>{user.username}</Heading>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 24px 0;
  opacity: ${p => p.active ? '1' : '0.6'}
`

export default UserComponent