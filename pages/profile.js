import { useState, useEffect, useContext } from 'react'
import { Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { COLORS, QUERIES } from '@constants'
import { UserContext } from '@context'

import { CenteredMainLayout } from '@components/Layout'
import {
  UserAvatar,
  FileInput,
  Heading,
  LineSpacer,
  LineSpacerWrapper
} from '@components/Styled'

const ProfilePage = () => {
  const router = useRouter()
  const { user, updateUserAvatar } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      router.push('/signup').catch(e => console.log(e))
    }
  }, [user, router])

  const handleAvatarUpload = async e => {
    e.preventDefault()
    try {
      const res = await Storage.put(`${user.id}.png`, e.target.files[0], {
        level: 'protected',
        contentType: 'image/png'
      })
      await Storage.get(`${user.id}.png`, { level: 'protected' })
      await updateUserAvatar()
    } catch(e) {
      console.log(e)
    }
  }

  if (!user) {
    return null
  }

  return (
    <CenteredMainLayout pageName='Profile'>
      <Wrapper>
        <Heading
          transform='uppercase'
          style={{ marginBottom: '5rem' }}
        >
          {user.username}
        </Heading>
        <FlexWrapper>
          <UserAvatar user={user} />
          <FileInput
            id='avatarImage'
            name='avatar image'
            text={user.avatarUrl ? 'change avatar' : 'upload avatar'}
            fileTypes='image/*'
            handleChange={e => handleAvatarUpload(e)}
          />
        </FlexWrapper>
        <LineSpacerWrapper>
          <LineSpacer />
        </LineSpacerWrapper>
      </Wrapper>
    </CenteredMainLayout>
  )
}

const Wrapper = styled.div`
  padding: var(--padding-top) var(--padding-main);
  margin: var(--padding-main);
  width: 100%;
  max-width: 400px;
  border: 1px solid ${COLORS.black.light};
  border-radius: var(--border-radius-large);
  text-align: center;

  @media ${QUERIES.mobile} {
    border: none;

  }
`

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 1.5rem;
`

export default ProfilePage