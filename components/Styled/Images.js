import styled from 'styled-components'

import { User as UserIcon } from 'react-feather'

import { COLORS } from '@constants'

export const AvatarWrapper = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  border-radius: var(--border-radius-main);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background-color: ${p => p.color
    ? p.color
    : COLORS.black.medium
}
`

const UserAvatarImage = styled.img`
  width: 100%;
  height: 100%;
`

export const UserAvatar = ({ user }) => (
  <AvatarWrapper color={COLORS.primary}>
    {user.avatarUrl
      ? <UserAvatarImage href={user.avatarUrl} />
      : <UserIcon
        size={24}
        color={COLORS.white['88']}
      />
    }
  </AvatarWrapper>
)