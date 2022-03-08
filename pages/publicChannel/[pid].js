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
      key={currentChannel.id}
    />
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const isPrivateChannel = false
  const { API, Auth } = withSSRContext({ req })
  Auth.configure({ ...awsconfig })
  const channelId = params.pid
  let authMode

  /*
    Set authmode in serverside depending on if user is signed in or not.
    This is required, as IAM will throw unauthorized error for signed users!
  */
  try {
    await Auth.currentAuthenticatedUser()
    authMode = 'AMAZON_COGNITO_USER_POOLS'
  } catch(e){
    authMode = 'AWS_IAM'
  }
  /*Query data*/
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