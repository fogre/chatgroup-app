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
  const isPrivateChannel = false
  const SSR = withSSRContext({ req })
  const channelId = params.pid
  let authMode

  /*
    Set authmode in serverside depending on if user is signed in or not.
    This is required, as IAM will throw unauthorized error for signed users!
  */
  try {
    await SSR.Auth.currentAuthenticatedUser()
    authMode = 'AMAZON_COGNITO_USER_POOLS'
  } catch(e){
    authMode = 'AWS_IAM'
  }
  /*Query data*/
  try {
    const channelRes = await SSR.API.graphql({
      query: queries.getPublicChannel,
      variables: { id: channelId },
      authMode
    })

    const messagesRes = await SSR.API.graphql({
      query: queries.publicMessagesByChannel,
      variables: {
        publicChannelMessagesId: channelId,
        limit: 50,
        sortDirection: 'DESC'
      },
      authMode
    })

    if (!channelRes.data.getPublicChannel) {
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
        currentChannel: channelRes.data.getPublicChannel,
        channelMessages: messagesRes.data.publicMessagesByChannel.items
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