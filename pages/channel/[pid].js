import { withSSRContext } from 'aws-amplify'
import awsconfig from '../../aws-exports'

import { ssrChannelPropsQuery } from '@apiServices'

import { ChannelPageLayout } from '@components/Layout'

const PubliChannel = ({ currentChannel, channelMessages, isPrivateChannel })  => {
  return (
    <ChannelPageLayout
      currentChannel={currentChannel}
      channelMessages={channelMessages}
      isPrivateChannel={isPrivateChannel}
    />
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const isPrivateChannel = true
  const { Auth, API } = withSSRContext({ req })
  Auth.configure({ ...awsconfig })
  const channelId = params.pid
  let authMode = 'AMAZON_COGNITO_USER_POOLS'

  //currentAuthenticatedUser will throw error if not authenticated
  try {
    await Auth.currentAuthenticatedUser()
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        permanent: false,
        destination: '/signup',
      }
    }
  }
  //fetch data
  try {
    return await ssrChannelPropsQuery(
      API, authMode, isPrivateChannel, channelId
    )
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      }
    }
  }
}

export default PubliChannel