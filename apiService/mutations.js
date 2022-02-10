import { API } from 'aws-amplify'
import { mutations } from '@graphql'

const parseUserForMutation = user => {
  const parsedUser = {
    ...user
  }
  delete parsedUser.createdAt
  delete parsedUser.updatedAt
  delete parsedUser.owner

  return parsedUser
}

const apiMutation = queryParams => {
  return API.graphql({
    query: mutations[queryParams.queryNameStr],
    variables: queryParams.variables,
    authMode: 'AMAZON_COGNITO_USER_POOLS'
  })
}

export const newMessageMutation = async (variables, isPrivate = true) => {
  const queryParams = isPrivate
    ? {
      queryNameStr: 'createMessage',
      variables: { input: {
        channelMessagesId: variables.channelId,
        messageUserId: variables.userId
      } }
    }
    : {
      queryNameStr: 'createPublicMessage',
      variables: { input: {
        publicChannelMessagesId: variables.channelId,
        publicMessageUserId: variables.userId
      } }
    }

  queryParams.variables.input.content = variables.messageText
  console.log(queryParams)

  return apiMutation(queryParams)
}

export const addUserAsChannelMemberMutation = async (variables, isPrivate = true) => {
  const parsedUser = parseUserForMutation(variables.user)
  isPrivate
    ? parsedUser.channelMembersId = variables.currentChannel.id
    : parsedUser.publicChannelMembersId = variables.currentChannel.id

  const queryParams = {
    queryNameStr: 'updateMember',
    variables: {
      id: parsedUser.id,
      input: parsedUser
    }
  }

  return apiMutation(queryParams)
}