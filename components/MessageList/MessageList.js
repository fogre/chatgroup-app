import { useState, useEffect, useContext, memo } from 'react'
import styled from 'styled-components'

import { COLORS, QUERIES } from '@constants'
import { UserContext, MemberContext } from '@context'
import { newMessageSubscription } from '@apiServices'
import { useInterval } from '@utils/customHooks'
import { getUserAvatarUrl } from '@utils/avatarCache'

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
  const { allMembers, addToActiveMembers, updateMembers } = useContext(MemberContext)
  const [pageMessages, setPageMessages] = useState([])

  //update active members every 10 minutes
  useInterval(() => {
    console.log('updating members')
    const parsedMessages = messagesToSingleArray(pageMessages)
    updateMembers(parsedMessages)
  }, 600000)

  useEffect(() => {
    if (channelMessages) {
      //sort messages by date
      setPageMessages(messagesToArrayByDate(channelMessages.reverse()))
    }
  }, [channelMessages])

  /*
    Subscription for new messages.
    First checks if the user is updated and replaces the updated user to allMembers
    Then checks if this is the first message in the list
    or the day has changed, if so parses the list with new dates
    If not, parses the message parsedDate for UI
    Then adds the user to active members
  */
  useEffect(() => {
    const addToMessagesAndActiveMembers = async message => {
      if (allMembers[message.user.id]) {
        const memberIsUpdated = allMembers[message.user.id].updatedAt.localeCompare(
          message.user.updatedAt
        )
        if (memberIsUpdated !== 0) {
          await getUserAvatarUrl(message.user)
          allMembers[message.user.id] = message.user
        }
      }

      const hasDayChanged = pageMessages.length && checkIfDayChaged(
        pageMessages[pageMessages.length-1].dateStr,
        message.createdAt
      )
      if (!pageMessages.length || hasDayChanged) {
        const messagesInSingleArray = messagesToSingleArray([ ...pageMessages ])
        messagesInSingleArray.push(message)
        setPageMessages(messagesToArrayByDate(messagesInSingleArray))
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
      addToMessagesAndActiveMembers,
      isPrivateChannel
    )

    return () => messageSubscription.unsubscribe()
  }, [pageMessages, allMembers, addToActiveMembers, currentChannel.id, isPrivateChannel, authMode])


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
                key={message.user.updatedAt}
                user={allMembers[message.user.id]}
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
  padding-top: var(--header-height);
  opacity: 1;
  transition: opacity 0.4s;

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