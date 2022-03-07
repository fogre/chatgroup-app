import { useState, useEffect, createContext, useContext, useCallback } from 'react'

import { UserContext } from '@context'
import { listChannelsQuery, newChannelSubscription } from '@apiServices'

export const ChannelContext = createContext(null)

export const ChannelProvider = ({ children }) => {
  const { authMode } = useContext(UserContext)
  const [publicChannels, setPublicChannels] = useState([])
  const [privateChannels, setPrivateChannels] = useState([])

  /*
    Channel queries and subscriptions
    Queries publicChannels on default
    Queries private channels only if user is logged in
  */  
  useEffect(() => {
    //callbacks
    const publicChannelCallback = channel => {
      setPublicChannels(publicChannels => [
        ...publicChannels,
        channel
      ])
    }
    const privateChannelCallback = channel => {
      setPrivateChannels(privateChannels => [
        ...privateChannels,
        channel
      ])
    }

    //query and subscribe to public channels
    const publicChannelSub = newChannelSubscription(
      authMode,
      publicChannelCallback,
      false
    )
    getChannels(setPublicChannels, false)

    //query and subscribe to members only channels
    let privateChannelSub
    if (authMode === 'AMAZON_COGNITO_USER_POOLS') {
      getChannels(setPrivateChannels, true)

      privateChannelSub = newChannelSubscription(
        authMode,
        privateChannelCallback,
        true
      )
    }

    return () => {
      if (privateChannelSub) {
        privateChannelSub.unsubscribe()
      }
      publicChannelSub.unsubscribe()
    }
  }, [authMode])

  //get and set channels
  const getChannels = async (setChannels, isPrivate) => {
    try {
      const channelsInDB = await listChannelsQuery(authMode, isPrivate)
      if (channelsInDB) {
        setChannels(channelsInDB)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ChannelContext.Provider value={{
      publicChannels,
      privateChannels
    }}>
      {children}
    </ChannelContext.Provider>  
  )
}