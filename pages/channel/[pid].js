import { API, Auth, withSSRContext } from 'aws-amplify'

import { queries } from '@graphql'

import { ChannelPageLayout } from '@components/Layout'

const PubliChannel = ({ currentChannel, channelMessages, isPrivateChannel })  => {
  console.log(currentChannel, channelMessages)

  return (
    <ChannelPageLayout
      currentChannel={currentChannel}
      channelMessages={channelMessages}
      isPrivateChannel={isPrivateChannel}
    />
  )
}

export async function getServerSideProps({ req, params }) {
  const isPrivateChannel = true
  const SSR = withSSRContext({ req })
  const channelId = params.pid
  let authMode = 'AMAZON_COGNITO_USER_POOLS'
  /*
    currentAuthenticatedUser will throw error if not authenticated
  */
  try {
    await SSR.Auth.currentAuthenticatedUser()
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signup',
      }
    }
  }
  //fetch data
  try {
    const channelRes = await SSR.API.graphql({
      query: queries.getChannel,
      variables: { id: channelId },
      authMode
    })

    const messagesRes = await SSR.API.graphql({
      query: queries.messagesByChannel,
      variables: {
        channelMessagesId: channelId,
        limit: 50,
        sortDirection: 'DESC'
      },
      authMode
    })

    if (!channelRes.data || !channelRes.data.getChannel) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        }
      }
    }

    return {
      props: {
        isPrivateChannel,
        currentChannel: channelRes.data.getChannel,
        channelMessages: messagesRes.data.messagesByChannel.items || []
      },
    }
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      }
    }
  }
}

export default PubliChannel