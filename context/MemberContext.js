import { useState, useEffect, createContext, useContext } from 'react'

import { UserContext } from '@context'

export const MemberContext = createContext(null)

export const MemberProvider = ({ currentChannel, channelMessages, isPrivateChannel, children }) => {
  const { user, authMode } = useContext(UserContext)
  const [activeMembers, setActiveMembers] = useState({})
  const [inactiveMembers, setInactiveMembers] = useState({})
  //used in MessageList to check if a member is updated
  const allMembers = { ...activeMembers, ...inactiveMembers }

  //Update member based on most recent channel messages
  useEffect(() => {
    updateMembers(channelMessages)
  }, [channelMessages])

  //Add to activeMembers and remove from inactiveMembers if necessary
  const addToActiveMembers = user => {
    if (!activeMembers[user.id]) {
      setActiveMembers(activeMembers => {
        const aMembers = { ...activeMembers }
        aMembers[user.id] = user
        return aMembers
      })

      if (inactiveMembers[user.id]) {
        console.log('checking inactivee')
        setInactiveMembers(inactiveMembers => {
          const iMembers = { ...inactiveMembers }
          delete iMembers[user.id]
          return iMembers
        })
      }
    }
  }

  /*
    Goes through 100 most recent messages.
    Adds to active members if user's message was sent within 10 minutes
    Otherwise adds to inactive members
  */
  const updateMembers = messages => {
    if (!messages || !messages.length) {
      return
    }

    const activeM = {}
    const inactiveM = {}
    const dateNow = new Date()
    const messagesCopy = [...messages].reverse().slice(0, 100)

    for (const m of messages) {
      if (activeM[m.user.id]) {
        continue
      }
      const messageDate = new Date(m.createdAt)
      const difference = dateNow - messageDate

      if (difference > 600000) {
          inactiveM[m.user.id] = m.user
      } else {
        activeM[m.user.id] = m.user
        if (inactiveM[m.user.id]) {
          delete inactiveM[m.user.id]
        }
      }
    }

    setActiveMembers({ ...activeM })
    setInactiveMembers({ ...inactiveM })
  }

  return (
    <MemberContext.Provider value={{
      allMembers,
      activeMembers,
      inactiveMembers,
      updateMembers,
      addToActiveMembers
    }}>
      {children}
    </MemberContext.Provider>  
  )
}