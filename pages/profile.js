import { useState, useEffect, useContext } from 'react'
import { Cache, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Delete as DeleteIcon } from 'react-feather'

import { COLORS, QUERIES } from '@constants'
import { UserContext } from '@context'

import { DeleteUserModal } from '@components/Modals'
import { CenteredMainLayout } from '@components/Layout'
import {
  UserAvatar,
  FileInput,
  Heading,
  LineSpacer,
  LineSpacerWrapper,
  Text,
  UnstyledButton
} from '@components/Styled'

const ProfilePage = () => {
  const router = useRouter()
  const { user, updateUserAvatar } = useContext(UserContext)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

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
      setTimeout(async () => {
        const imageUrl = await Storage.get(`${user.id}-avatar.png`, {
          level: 'protected'
        })
        await updateUserAvatar(imageUrl)
      }, [1000])
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
          style={{ marginBottom: '60px' }}
        >
          {user.username}
        </Heading>
        <FlexWrapper>
          <UserAvatar user={user} />
          <FileInput
            id='avatarImage'
            name='avatar image'
            text={user.avatarUrl ? 'Change avatar' : 'Upload avatar'}
            fileTypes='image/png,image/jpeg'
            handleChange={e => handleAvatarUpload(e)}
          />
        </FlexWrapper>
        <LineSpacerWrapper>
          <LineSpacer />
        </LineSpacerWrapper>
        <FlexWrapper>
          <DeleteIcon
            size={42}
            color={COLORS.danger}
          />
          <DeleteButton
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete account
          </DeleteButton>
        </FlexWrapper>
      </Wrapper>
      <DeleteUserModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
    </CenteredMainLayout>
  )
}

const Wrapper = styled.div`
  padding: var(--padding-top) var(--padding-main);
  margin: var(--padding-main);
  width: 100%;
  max-width: 350px;
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
  margin: 1rem 0;
`

const DeleteButton = styled(UnstyledButton)`
  letter-spacing: inherit;
  color: ${COLORS.danger};

  &:hover {
    text-decoration: underline;
  }
`

export default ProfilePage