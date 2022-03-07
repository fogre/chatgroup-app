import { useContext } from 'react'
import { Auth, Cache, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'

import { COLORS } from '@constants'
import { UserContext } from '@context'

import ModalInMain from './Modal'
import { Heading, Text, PaddedTextButton } from '@components/Styled'

const DeleteUserModal = ({ openModal, setOpenModal }) => {
  const router = useRouter()
  const { user } = useContext(UserContext)

  const handleDeletion = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser()
      if (user.avatarUrl) {
        await Storage.remove(`${attributes.sub}.png`, { level: 'protected' })
        await Storage.remove(`${attributes.sub}-avatar.png`, { level: 'protected' })
        Cache.removeItem(user.avatarUrl)
      }
      await Auth.deleteUser()
      await router.push('/signup')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <ModalInMain
      openModal={openModal}
      setOpenModal={setOpenModal}
      label='Delete user confirmation'
    >
      <Heading color='danger'>Are you want to delete your account?</Heading>
      <div style={{ padding: '2rem 0' }}>
        <Text>Only your account and avatar image will be deleted.</Text>
        <Text>Your messages will not be deleted.</Text>
      </div>
      <PaddedTextButton
        backgroundColor={COLORS.danger}
        onClick={() => handleDeletion()}
      >
        Confirm
      </PaddedTextButton>
    </ModalInMain>
  )
}

export default DeleteUserModal