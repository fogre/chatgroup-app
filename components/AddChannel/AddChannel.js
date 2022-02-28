import { useState, useContext } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import styled from 'styled-components'

import { COLORS, QUERIES } from '@constants'
import { UserContext } from '@context'
import { createChannelMutation } from '@apiServices'

import {
  Heading,
  DefaultInput,
  DefaultInputWrapper,
  DefaultTextAreaWrapper,
  DefaultTextArea,
  PaddedTextButton,
  Text
} from '@components/Styled'

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
      const res = await createChannelMutation(newChannel)
      console.log(res)
      setChannelName('')
      setChannelDescription('')
      setErrors({})
      setOpenModal(false)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <DialogWrapper
      isOpen={openModal}
      onDismiss={() => setOpenModal(false)}
    >
      <Content aria-label='Add new channel'>
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
      </Content>
    </DialogWrapper>
  )
}

const DialogWrapper = styled(DialogOverlay)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: hsla(285, 12%, 7%, 0.5);

  @media ${QUERIES.tablet} {
    padding: 10px;
  }
`

const Content = styled(DialogContent)`
  width: 650px;
  max-width: 100%;
  padding: 34px 39px 29px;
  background-color: ${COLORS.black.dark};
  border-radius: var(--border-radius-large);
  margin-left: 320px;

  @media ${QUERIES.tablet} {
    margin-left: 0;
  }
`

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