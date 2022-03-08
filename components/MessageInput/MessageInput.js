import { useState, useContext } from 'react'
import styled from 'styled-components'

import { Send as SendIcon } from 'react-feather'

import { COLORS } from '@constants'
import { newMessageMutation } from '@apiServices'
import { UserContext } from '@context'

import { SignInOrUp } from '@components/User'
import {
  DefaultInput,
  DefaultInputWrapper,
  IconButton
} from '@components/Styled'

const MessageInput = ({ currentChannel, isPrivateChannel }) => {
  const { user, authMode } = useContext(UserContext)
  const [messageText, setMessageText] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const variables = {
        channelId: currentChannel.id,
        userId: user.id,
        messageText: messageText
      }
      await newMessageMutation(variables, isPrivateChannel)
      setMessageText('')
    } catch (e) {
      console.log(e)
    }
  }

  if (authMode === 'AWS_IAM') {
    return (
      <Wrapper>
        <SignInOrUp
          text='to participate'
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <DefaultInputWrapper height={'52px'}>
          <DefaultInput
            placeholder='Type a message here'
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
          />
          <IconButton
            type='submit'
            size={40}
            radius={8}
            backgroundColor={COLORS.primary}
            disabled={messageText.length ? false : true}
          >
            <SendIcon
              size={19}
              style={{
                transform: 'rotate(43deg)',
                marginLeft: '-5px'
              }}
            />
          </IconButton>
        </DefaultInputWrapper>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  background-color: ${COLORS.black.medium};
  bottom: 0;
  display: flex;
  height: var(--header-height);
  left: 0;
  padding: 0 var(--padding-main);
  position: sticky;
  width: 100%;
  z-index: var(--fixed-z-index);
`

const Form = styled.form`
  width: 100%;
  box-shadow: 0 -6px 10px -8px rgba(0,0,0,0.75);
`

export default MessageInput