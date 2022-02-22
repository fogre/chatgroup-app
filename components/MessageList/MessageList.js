import { useState, useEffect, useContext, useCallback, memo } from 'react'
import styled from 'styled-components'

import { COLORS, QUERIES } from '@constants'
import { UserContext, MemberContext } from '@context'
import { newMessageSubscription } from '@apiServices'
import { useInterval, AlwaysScrollToBottom } from '@utils/customHooks'
import {
  checkIfDayChaged,
  messagesToSingleArray,
  messagesToArrayByDate,
  toMessageDateString
} from '@utils/messageHelpers'

import { Heading, Text, UserAvatar , LineSpacer } from '@components/Styled'
import ScrollToBottom from './ScrollToBottom'

const MessageList = ({ currentChannel, channelMessages, isPrivateChannel }) => {
  const { authMode } = useContext(UserContext)
  const { addToActiveMembers, updateMembers } = useContext(MemberContext)
  const [pageMessages, setPageMessages] = useState([])

  //update active members every 10 minutes
  useInterval(() => {
    console.log('updating members')
    const parsedMessages = messagesToSingleArray(pageMessages)
    updateMembers(parsedMessages)
  }, 600000)

  //parse channel messages dates
  useEffect(() => {
    if (channelMessages) {
      setPageMessages(messagesToArrayByDate(channelMessages.reverse()))
    }
  }, [channelMessages])

  /*Subscription for new messages.
    First checks if the day has changed. If so parses the list with the new date.
    If not, just parses the message date to local time.
    Then adds message user to active members*/
  useEffect(() => {
    const subscriptionCallback = message => {
      const hasDayChanged = checkIfDayChaged(
        pageMessages[pageMessages.length-1].messages,
        message.createdAt
      )

      if (hasDayChanged) {
        const newMessages = messagesToSingleArray(pageMessages)
        newMessages.push(message)
        setPageMessages(messagesToArrayByDate(newMessages))
      } else {
        message.parsedDate = toMessageDateString(message.createdAt)
        const newPageMessages = [...pageMessages]
        newPageMessages[newPageMessages.length-1].messages.push(message)
        setPageMessages(newPageMessages)
      }
      addToActiveMembers(message.user)
    }

    const messageSubscription = newMessageSubscription(
      currentChannel.id,
      authMode,
      subscriptionCallback,
      isPrivateChannel
    )

    return () => messageSubscription.unsubscribe()
  }, [pageMessages, addToActiveMembers, currentChannel.id, isPrivateChannel, authMode])

  return (
    <Wrapper>
      {pageMessages.map(messagesByDate =>
        <article key={messagesByDate.dateStr}>
          <DateWrapper>
            <LineSpacer color={COLORS.white['51']} borderWidth={1}/>
            <Text
              size='tiny'
              color='dark'
            >
              {messagesByDate.dateStr}
            </Text>
            <LineSpacer color={COLORS.white['51']} borderWidth={1} />
          </DateWrapper>
          {messagesByDate.messages.map(message =>
            <MessageWrapper key={message.id}>
              <UserAvatar
                user={message.user}
                style={{ gridArea: 'image' }}
              />
              <MessageContent>
                <MessageDetails>
                  <Heading color='dark'>{message.user.username}</Heading>
                  <Text size='tiny' color='dark'>{message.parsedDate}</Text>
                </MessageDetails>
                <Text>{message.content}</Text>
              </MessageContent>
            </MessageWrapper>
          )}
        </article>
      )}
      <ScrollToBottom />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  --message-margin-bottom: 36px;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${QUERIES.tablet} {
    --message-margin-bottom: 16px;
  }
`
const DateWrapper = styled.span`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  text-align: center;
  max-width: 100%;
  gap: 16px;
  margin-bottom: var(--message-margin-bottom);
`

const MessageWrapper = styled.article`
  display: grid;
  grid-template-areas: 'image content';
  grid-template-columns: 42px 1fr;
  gap: 28px;
  margin-bottom: var(--message-margin-bottom);

  @media ${QUERIES.tablet} {
    gap: 18px;
  }
`

const MessageContent = styled.div`
  grid-area: content;
`

const MessageDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  margin-bottom: 6px;
  padding: 0;
`

export default memo(MessageList)