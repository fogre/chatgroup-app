import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { COLORS } from '@constants'
import { UserContext } from '@context'
import { createChannelMutation } from '@apiServices'

import {
  Heading,
  DefaultInput,
  DefaultInputWrapper,
  DefaultTextAreaWrapper,
  DefaultTextArea,
  PaddedTextButton,
  Text,
} from '@components/Styled'

import ModalInMain from './Modal'

const FormErrorText = ({ errorText }) => {
  if (!errorText) {
    return null
  }

  return (
    <Text
      size='small'
      color='danger'
      style={{ textAlign: 'center', margin: 0 }}
    >
      {errorText}
    </Text>
  )
}

const AddChannel = ({ openModal, setOpenModal }) => {
  const router = useRouter()
  const { authMode } = useContext(UserContext)
  const [channelName, setChannelName] = useState('')
  const [channelDescription, setChannelDescription] = useState('')
  const [errors, setErrors] = useState({})

  if (authMode === 'AWS_IAM') {
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const currentErrors = {}
    if (channelName.length < 3) {
      currentErrors.channelName = 'Channel name is required and must be over 3 characters'
    }
    if (channelDescription.length && channelDescription.length < 5) {
      currentErrors.channelDescription = 'Channel description needs to be over 5 characters'
    }
    if (currentErrors.channelName || currentErrors.channelDescription) {
      setErrors(currentErrors)
      return
    }
    try {
      const newChannel = { name: channelName }
      if (channelDescription.length) {
        newChannel.description = channelDescription
      }
      const { data } = await createChannelMutation(newChannel)
      setChannelName('')
      setChannelDescription('')
      setErrors({})
      await router.push(`/channel/${data.createChannel.id}`)
      setOpenModal(false)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <ModalInMain
      openModal={openModal}
      setOpenModal={setOpenModal}
      label='Add new channel'
    >
      <Heading transform='uppercase'>new channel</Heading>
      <Form onSubmit={handleSubmit}>
        <DefaultInputWrapper
          height='48px'
          radius='8px'
        >
          <DefaultInput
            placeholder='Channel name'
            placeholderNormal={true}
            value={channelName}
            onChange={e => setChannelName(e.target.value)}
          />
        </DefaultInputWrapper>
        <FormErrorText errorText={errors.channelName} />
        <DefaultTextAreaWrapper
          height='115px'
          radius='8px'
          style={{ marginTop: '26px' }}
        >
          <DefaultTextArea
            type='textarea'
            placeholder='Channel description'
            placeholderNormal={true}
            value={channelDescription}
            onChange={e => setChannelDescription(e.target.value)}
          />
        </DefaultTextAreaWrapper>
        <FormErrorText errorText={errors.channelDescription} />
        <ButtonWrapper>
          <PaddedTextButton
            backgroundColor={COLORS.primary}
            type='submit'
          >
            Save
          </PaddedTextButton>
        </ButtonWrapper>
      </Form>
    </ModalInMain>
  )
}

const Form = styled.form`
  margin-top: 26px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 21px;
`

export default AddChannel