import { useState, useContext } from 'react'

import { newMessageMutation } from '@apiServices'
import { UserContext } from '@context'

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
      <p>Please login to participate</p>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={messageText} onChange={e => setMessageText(e.target.value)} />
      <button type='submit'>submit</button>
    </form>
  )
}

export default MessageInput