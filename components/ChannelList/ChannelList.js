import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'

import { UserContext } from '@context'
import { listChannelsQuery } from '@apiServices'



const ChannelList = ({ isPrivate }) => {
  const { authMode } = useContext(UserContext)
  const [channels, setChannels] = useState([])
  const channelBaseUrl = isPrivate ? '/channel/' : '/publicChannel/'

  useEffect(() => {
    const getChannels = async () => {
      try {
        const channelsInDB = await listChannelsQuery(authMode, isPrivate)
        if (channelsInDB) {
          setChannels(channelsInDB)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getChannels()
  }, [isPrivate, authMode])

  return (
    <>
      <h3>Channels</h3>
      {channels.map(channel =>
        <Link href={`${channelBaseUrl}${channel.id}`} key={channel.id}>
          <a>{channel.name}</a>
        </Link>
      )}
    </>
  )
}

const MembersOnlyChannels = () => {
  const { authMode } = useContext(UserContext)

  if (authMode === 'AWS_IAM') {
    return (
      <p>Only logged members can see these channels</p>
    )
  }

  return (
    <ChannelList isPrivate={true} />
  )
}

const ChannelLists = () => {
  return (
    <>
      <ChannelList isPrivate={false} />
      <MembersOnlyChannels />
    </>
  )
}

export default ChannelLists