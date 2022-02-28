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

export const newChannelSubscription = (authMode, callback, isPrivate = true) => {
  const queryParams = isPrivate
    ? {
      queryNameStr: 'onNewChannel'
    }
    : {
      queryNameStr: 'onNewPublicChannel'
    }
  queryParams.authMode = authMode

  return apiSubscription(
    queryParams,
    callback
  )
}
