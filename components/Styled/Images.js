import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { User as UserIcon } from 'react-feather'

import { COLORS } from '@constants'
import { getCachedAvatarUrl } from '@utils/avatarCache'

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

const UserAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: inherit;
  overflow: hidden;
`

export const UserAvatar = ({ user }) => {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const getImageUrl = async () => {
      const url = await getCachedAvatarUrl(user)
      if (url) {
        setImageUrl(url)
      }
    }
    getImageUrl()
  }, [user])

  return (
    <AvatarWrapper color={user.avatarColor ? user.avatarColor : COLORS.primary}>
      {imageUrl
        ? <UserAvatarImage
          src={imageUrl}
          alt='user avatar image'
        />
        : <UserIcon
          size={24}
          color={COLORS.white['88']}
        />
      }
    </AvatarWrapper>
  )
}