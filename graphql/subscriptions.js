/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onPublicMessageByPublicChannel = /* GraphQL */ `
  subscription OnPublicMessageByPublicChannel($publicChannelMessagesId: ID!) {
    onPublicMessageByPublicChannel(
      publicChannelMessagesId: $publicChannelMessagesId
    ) {
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
export const onMembersByPublicChannel = /* GraphQL */ `
  subscription OnMembersByPublicChannel($publicChannelMembersId: ID!) {
    onMembersByPublicChannel(publicChannelMembersId: $publicChannelMembersId) {
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
export const onMessageByChannel = /* GraphQL */ `
  subscription OnMessageByChannel($channelMessagesId: ID!) {
    onMessageByChannel(channelMessagesId: $channelMessagesId) {
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
export const onMembersByChannel = /* GraphQL */ `
  subscription OnMembersByChannel($channelMembersId: ID!) {
    onMembersByChannel(channelMembersId: $channelMembersId) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String) {
    onCreateMessage(owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String) {
    onUpdateMessage(owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String) {
    onDeleteMessage(owner: $owner) {
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
export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel($owner: String) {
    onCreateChannel(owner: $owner) {
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
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel($owner: String) {
    onUpdateChannel(owner: $owner) {
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
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel($owner: String) {
    onDeleteChannel(owner: $owner) {
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
export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember($owner: String) {
    onCreateMember(owner: $owner) {
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
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember($owner: String) {
    onUpdateMember(owner: $owner) {
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
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember($owner: String) {
    onDeleteMember(owner: $owner) {
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
export const onCreatePublicMessage = /* GraphQL */ `
  subscription OnCreatePublicMessage($owner: String) {
    onCreatePublicMessage(owner: $owner) {
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
export const onUpdatePublicMessage = /* GraphQL */ `
  subscription OnUpdatePublicMessage($owner: String) {
    onUpdatePublicMessage(owner: $owner) {
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
export const onDeletePublicMessage = /* GraphQL */ `
  subscription OnDeletePublicMessage($owner: String) {
    onDeletePublicMessage(owner: $owner) {
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
export const onCreatePublicChannel = /* GraphQL */ `
  subscription OnCreatePublicChannel($owner: String) {
    onCreatePublicChannel(owner: $owner) {
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
export const onUpdatePublicChannel = /* GraphQL */ `
  subscription OnUpdatePublicChannel($owner: String) {
    onUpdatePublicChannel(owner: $owner) {
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
export const onDeletePublicChannel = /* GraphQL */ `
  subscription OnDeletePublicChannel($owner: String) {
    onDeletePublicChannel(owner: $owner) {
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
