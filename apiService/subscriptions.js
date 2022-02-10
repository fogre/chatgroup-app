import { API } from 'aws-amplify'

import { subscriptions } from '@graphql'

const apiSubscription = (queryParams, callback) => {
  return API.graphql({
    query: subscriptions[queryParams.queryNameStr],
    variables: queryParams.variables,
    authMode: queryParams.authMode
  }).subscribe({
    next: ({ provider, value }) => {
      callback(value.data[queryParams.queryNameStr])
    },
    error: error => console.warn(error)
  })
}

export const newMemberSubscription = (channelId, authMode, callback, isPrivate = true) => {

  const queryParams = isPrivate
    ? {
      queryNameStr: 'onMembersByChannel',
      variables: { channelMembersId: channelId }
    }
    : {
      queryNameStr: 'onMembersByPublicChannel',
      variables: { publicChannelMembersId: channelId }
    }
  queryParams.authMode = authMode
  console.log(queryParams)
  return apiSubscription(
    queryParams,
    callback
  )
}

export const newMessageSubscription = (channelId, authMode, callback, isPrivate = true) => {
  const queryParams = isPrivate
    ? {
      queryNameStr: 'onMessageByChannel',
      variables: { channelMessagesId: channelId }
    }
    : {
      queryNameStr: 'onPublicMessageByPublicChannel',
      variables: { publicChannelMessagesId: channelId }
    }
  queryParams.authMode = authMode

  return apiSubscription(
    queryParams,
    callback
  )
}

