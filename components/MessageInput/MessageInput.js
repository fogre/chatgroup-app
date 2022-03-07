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
      <form onSubmit={handleSubmit}>
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
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${COLORS.black.medium};
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 0 var(--padding-main);
`

export default MessageInput