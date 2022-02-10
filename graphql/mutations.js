/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
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
      owner
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
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
      owner
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
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
      owner
    }
  }
`;
export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
      id
      name
      description
      messages {
        items {
          id
          content
          createdAt
          channelMessagesId
          updatedAt
          messageUserId
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
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel(
    $input: UpdateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    updateChannel(input: $input, condition: $condition) {
      id
      name
      description
      messages {
        items {
          id
          content
          createdAt
          channelMessagesId
          updatedAt
          messageUserId
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
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel(
    $input: DeleteChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    deleteChannel(input: $input, condition: $condition) {
      id
      name
      description
      messages {
        items {
          id
          content
          createdAt
          channelMessagesId
          updatedAt
          messageUserId
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
export const createMember = /* GraphQL */ `
  mutation CreateMember(
    $input: CreateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    createMember(input: $input, condition: $condition) {
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
export const updateMember = /* GraphQL */ `
  mutation UpdateMember(
    $input: UpdateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    updateMember(input: $input, condition: $condition) {
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
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember(
    $input: DeleteMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    deleteMember(input: $input, condition: $condition) {
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
export const createPublicMessage = /* GraphQL */ `
  mutation CreatePublicMessage(
    $input: CreatePublicMessageInput!
    $condition: ModelPublicMessageConditionInput
  ) {
    createPublicMessage(input: $input, condition: $condition) {
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
export const updatePublicMessage = /* GraphQL */ `
  mutation UpdatePublicMessage(
    $input: UpdatePublicMessageInput!
    $condition: ModelPublicMessageConditionInput
  ) {
    updatePublicMessage(input: $input, condition: $condition) {
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
export const deletePublicMessage = /* GraphQL */ `
  mutation DeletePublicMessage(
    $input: DeletePublicMessageInput!
    $condition: ModelPublicMessageConditionInput
  ) {
    deletePublicMessage(input: $input, condition: $condition) {
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
export const createPublicChannel = /* GraphQL */ `
  mutation CreatePublicChannel(
    $input: CreatePublicChannelInput!
    $condition: ModelPublicChannelConditionInput
  ) {
    createPublicChannel(input: $input, condition: $condition) {
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
export const updatePublicChannel = /* GraphQL */ `
  mutation UpdatePublicChannel(
    $input: UpdatePublicChannelInput!
    $condition: ModelPublicChannelConditionInput
  ) {
    updatePublicChannel(input: $input, condition: $condition) {
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
export const deletePublicChannel = /* GraphQL */ `
  mutation DeletePublicChannel(
    $input: DeletePublicChannelInput!
    $condition: ModelPublicChannelConditionInput
  ) {
    deletePublicChannel(input: $input, condition: $condition) {
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
