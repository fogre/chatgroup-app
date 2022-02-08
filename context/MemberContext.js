import { useState, useEffect, createContext } from 'react'

export const MemberContext = createContext(null)

export const MemberProvider = ({ currentChannel, channelMessages, children }) => {
  const [activeMembers, setActiveMembers] = useState({})
  const [inactiveMembers, setInactiveMembers] = useState({})

  useEffect(() => {
    updateMembers(channelMessages)
  }, [channelMessages])


  /*Goes through 100 most recent messages.
  Adds to active members if user's message was sent within 10 minutes
  Otherwise adds to inactive members*/
  const updateMembers = messages => {
    const activeM = {}
    const inactiveM = {}
    const dateNow = new Date()
    const messagesCopy = [...messages].reverse().slice(0, 100)

    messagesCopy.forEach(m => {
      const messageDate = new Date(m.createdAt)
      const difference = dateNow - messageDate

      if (difference > 600000) {
        inactiveM[m.user.id] = m.user
      } else {
        activeM[m.user.id] = m.user
      }
    })

    setActiveMembers({ ...activeM })
    setInactiveMembers({ ...inactiveM })
  }

  return (
    <MemberContext.Provider value={{
      activeMembers
      inactiveMembers
      updateMembers
    }}>
      {children}
    </MemberContext.Provider>  
  )
}