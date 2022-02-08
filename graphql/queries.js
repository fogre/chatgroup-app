/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      content
      owner
      createdAt
      channelMessagesId
      user {
        id
        username
        avatarColor
        avatarUrl
        channelMembersId
        publicChannelMembersId
        createdAt
        updatedAt
        owner
      }
      updatedAt
      messageUserId
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        owner
        createdAt
        channelMessagesId
        user {
          id
          username
          avatarColor
          avatarUrl
          channelMembersId
          publicChannelMembersId
          createdAt
          updatedAt
          owner
        }
        updatedAt
        messageUserId
      }
      nextToken
    }
  }
`;
export const getChannel = /* GraphQL */ `
  query GetChannel($id: ID!) {
    getChannel(id: $id) {
      id
      name
      description
      messages {
        items {
          id
          content
          owner
          createdAt
          channelMessagesId
          updatedAt
          messageUserId
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listChannels = /* GraphQL */ `
  query ListChannels(
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        messages {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const messagesByChannel = /* GraphQL */ `
  query MessagesByChannel(
    $channelMessagesId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChannel(
      channelMessagesId: $channelMessagesId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        owner
        createdAt
        channelMessagesId
        user {
          id
          username
          avatarColor
          avatarUrl
          channelMembersId
          publicChannelMembersId
          createdAt
          updatedAt
          owner
        }
        updatedAt
        messageUserId
      }
      nextToken
    }
  }
`;
export const channelByName = /* GraphQL */ `
  query ChannelByName(
    $name: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    channelByName(
      name: $name
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        messages {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
      id
      username
      avatarColor
      avatarUrl
      channelMembersId
      publicChannelMembersId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        avatarColor
        avatarUrl
        channelMembersId
        publicChannelMembersId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPublicMessage = /* GraphQL */ `
  query GetPublicMessage($id: ID!) {
    getPublicMessage(id: $id) {
      id
      createdAt
      content
      publicChannelMessagesId
      user {
        id
        username
        avatarColor
        avatarUrl
        channelMembersId
        publicChannelMembersId
        createdAt
        updatedAt
        owner
      }
      expirationTime
      updatedAt
      publicMessageUserId
      owner
    }
  }
`;
export const listPublicMessages = /* GraphQL */ `
  query ListPublicMessages(
    $filter: ModelPublicMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublicMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        content
        publicChannelMessagesId
        user {
          id
          username
          avatarColor
          avatarUrl
          channelMembersId
          publicChannelMembersId
          createdAt
          updatedAt
          owner
        }
        expirationTime
        updatedAt
        publicMessageUserId
        owner
      }
      nextToken
    }
  }
`;
export const publicMessagesByChannel = /* GraphQL */ `
  query PublicMessagesByChannel(
    $publicChannelMessagesId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPublicMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publicMessagesByChannel(
      publicChannelMessagesId: $publicChannelMessagesId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        content
        publicChannelMessagesId
        user {
          id
          username
          avatarColor
          avatarUrl
          channelMembersId
          publicChannelMembersId
          createdAt
          updatedAt
          owner
        }
        expirationTime
        updatedAt
        publicMessageUserId
        owner
      }
      nextToken
    }
  }
`;
export const getPublicChannel = /* GraphQL */ `
  query GetPublicChannel($id: ID!) {
    getPublicChannel(id: $id) {
      id
      name
      description
      messages {
        items {
          id
          createdAt
          content
          publicChannelMessagesId
          expirationTime
          updatedAt
          publicMessageUserId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPublicChannels = /* GraphQL */ `
  query ListPublicChannels(
    $filter: ModelPublicChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublicChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        messages {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const publicChannelByName = /* GraphQL */ `
  query PublicChannelByName(
    $name: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPublicChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publicChannelByName(
      name: $name
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        messages {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
