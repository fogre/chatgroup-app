import { useState, useEffect, useContext, useCallback, memo } from 'react'
import styled from 'styled-components'

import { UserContext, MemberContext } from '@context'
import { newMessageSubscription } from '@apiServices'
import { parseMessagesByDate, toMessageDateString } from '@utils/dateHelpers'
import { useInterval } from '@utils/customHooks'

const MessageList = ({ currentChannel, channelMessages, isPrivateChannel }) => {
  const { authMode } = useContext(UserContext)
  const { addToActiveMembers, updateMembers } = useContext(MemberContext)
  const [pageMessages, setPageMessages] = useState([])

  //update active members every 10 minutes
  useInterval(() => {
    console.log('updating members')
    updateMembers(pageMessages)
  }, 600000)

  //parse channel messages dates
  useEffect(() => {
    if (channelMessages) {
      setPageMessages(parseMessagesByDate(channelMessages).reverse())
    }
  }, [channelMessages])

  //Subscription for new messages
  useEffect(() => {
    const subscriptionCallback = message => {
      message.parsedDate = toMessageDateString(message.createdAt)
      setPageMessages(pageMessages => [
        ...pageMessages,
        message
      ])
      addToActiveMembers(message.user)
    }

    const messageSubscription = newMessageSubscription(
      currentChannel.id,
      authMode,
      subscriptionCallback,
      isPrivateChannel
    )

    return () => messageSubscription.unsubscribe()
  }, [addToActiveMembers, currentChannel.id, isPrivateChannel, authMode])

  return (
    <>
      {pageMessages.map((message, i) =>
        <MessageWrapper key={i}>
          <MessageDetails>
            <p>{message.user.username}</p>
            <p>{message.parsedDate}</p>
          </MessageDetails>
          <p>{message.content}</p>
        </MessageWrapper>
      )}
    </>
  )
}

const MessageWrapper = styled.div`
  margin: 2px;
  p {
    margin: 5px;
  }
`

const MessageDetails = styled.div`
  display: flex;
  margin: 0;
`

export default memo(MessageList)