import { withSSRContext } from 'aws-amplify'

import { ssrChannelPropsQuery } from '@apiServices'

import { ChannelPageLayout } from '@components/Layout'

const Home = ({ currentChannel, channelMessages, isPrivateChannel })  => {
  return (
    <ChannelPageLayout
      currentChannel={currentChannel}
      channelMessages={channelMessages}
      isPrivateChannel={isPrivateChannel}
    />
  )
}

export async function getServerSideProps({ req, resolvedUrl }) {
  const isPrivateChannel = false
  const { API, Auth } = withSSRContext({ req })
  const publicChannelId = 'a787dda4-359d-48f6-ab15-22e84ff36e40'
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
      API, authMode, isPrivateChannel, publicChannelId
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

export default Home