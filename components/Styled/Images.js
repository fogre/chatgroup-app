import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy'
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
  background-color: ${p => p.color ? p.color : COLORS.black.light};
  position: relative;
`

const UserAvatarImage = styled(AmplifyS3Image)`
  --width: 100%;
  --height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: inherit;
  overflow: hidden;
`

export const UserAvatar = ({ user }) => (
  <AvatarWrapper color={user.avatarColor ? user.avatarColor : COLORS.primary}>
    {user.avatarUrl
      ? <UserAvatarImage
        key={user.updatedAt}
        level='protected'
        imgKey={`${user.id}.png`}
        identityId={user.avatarUrl}
      />
      : <UserIcon
        size={24}
        color={COLORS.white['88']}
      />
    }
  </AvatarWrapper>
)