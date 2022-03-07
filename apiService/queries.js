import { API } from 'aws-amplify'

import { queries } from '@graphql'

const apiQuery = (queryParams, queryVariables = null) => {
  const params = {
    query: queries[queryParams.queryNameStr],
    authMode: queryParams.authMode
  }

  if (queryVariables) {
    params.variables = queryVariables
  }
  return API.graphql(params)
}

//Api query to list channels
export const listChannelsQuery = async (authMode, isPrivate = true) => {
  const queryParams = isPrivate
    ? {
      queryNameStr: 'listChannels',
    }
    : {
      queryNameStr: 'listPublicChannels',
    }
  queryParams.authMode = authMode
  const { data } = await apiQuery(queryParams)
  if (data && data[queryParams.queryNameStr]) {
   return data[queryParams.queryNameStr].items
  }
  return null
}

export const getMemberQuery = async userId => {
  const queryParams = {
    queryNameStr: 'getMember',
    authMode: 'AMAZON_COGNITO_USER_POOLS'
  }
  return apiQuery(queryParams, { id: userId })
}

//Query channel and messages on serverside. Returns props or throws error
export const ssrChannelPropsQuery = async (API, authMode, isPrivate, channelId) => {
  const channelQueryNameStr = isPrivate
    ? 'getChannel'
    : 'getPublicChannel'
  const messageQueryNameStr = isPrivate
    ? 'messagesByChannel'
    : 'publicMessagesByChannel'
  const variableChannelIdStr = isPrivate
    ? 'channelMessagesId'
    : 'publicChannelMessagesId'

  //query channel
  const channelRes = await API.graphql({
    query: queries[channelQueryNameStr],
    variables: { id: channelId },
    authMode
  })

  //query sorted channel messages
  const messageVariables = {
    limit: 50,
    sortDirection: 'DESC'
  }
  messageVariables[variableChannelIdStr] = channelId

  const messagesRes = await API.graphql({
    query: queries[messageQueryNameStr],
    variables: messageVariables,
    authMode
  })

  if (!channelRes.data[channelQueryNameStr]) {
    throw new Error('Could not find the channel')
  }

  return {
    props: {
      isPrivateChannel: isPrivate,
      currentChannel: channelRes.data[channelQueryNameStr],
      channelMessages: messagesRes.data[messageQueryNameStr].items || []
    },
  }
}