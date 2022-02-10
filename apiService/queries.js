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