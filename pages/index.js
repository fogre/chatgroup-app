import { useState, useEffect, useContext } from 'react'
import { API, Auth, withSSRContext } from 'aws-amplify'

import { queries } from '@graphql'

//import { ChannelPageLayout } from '@components/Layouts'

const isPrivateChannel = false

const Home = ({ currentChannel, channelMessages })  => {
  console.log(currentChannel, channelMessages)

  return (
    <p>hello</p>
  )
}

export async function getServerSideProps({ req, resolvedUrl }) {
  // wrap the request in a withSSRContext to use Amplify functionality serverside.
  const SSR = withSSRContext({ req })
  const publicChannelId = 'a787dda4-359d-48f6-ab15-22e84ff36e40'
  let authMode

  /*
    Set authmode in serverside depending on if user is signed in or not.
    This is required, as in server side IAM will throw unauthorized error for signed users!
  */
  try {
    await SSR.Auth.currentAuthenticatedUser()
    authMode = 'AMAZON_COGNITO_USER_POOLS'
  } catch(e){
    authMode = 'AWS_IAM'
  }
  console.log(authMode)
  /*Query data*/
  try {
    const channelRes = await SSR.API.graphql({
      query: queries.getPublicChannel,
      variables: { id: publicChannelId },
      authMode
    })

    const messagesRes = await SSR.API.graphql({
      query: queries.publicMessagesByChannel,
      variables: {
        publicChannelMessagesId: publicChannelId,
        limit: 50,
        sortDirection: 'DESC'
      },
      authMode
    })
    
    return {
      props: {
        currentChannel: channelRes.data.getPublicChannel,
        channelMessages: messagesRes.data.publicMessagesByChannel.items
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        currentChannel: {},
        channelMessages: []
      },
    }
  }
}

export default Home