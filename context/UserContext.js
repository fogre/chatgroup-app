import { useState, useEffect, createContext } from 'react'
import { Auth } from 'aws-amplify'
import { useAuthenticator } from '@aws-amplify/ui-react'

import { getMemberQuery, updateUserMutation } from '@apiServices'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const { route } = useAuthenticator(context => [context.route])
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('AWS_IAM')
  console.log(user);
  useEffect(() => {
    setLoggedUser()
  }, [])

  useEffect(() => {
    if (route === 'authenticated') {
      setLoggedUser()
    }

    if (route === 'signOut') {
      setAuthMode('AWS_IAM')
      setUser(null)
    }
  }, [route])

  const setLoggedUser = async () => {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser()
      const { data } = await getMemberQuery(loggedUser.attributes.sub)
      setUser(data.getMember)
      setAuthMode('AMAZON_COGNITO_USER_POOLS')
    } catch (e) {
      console.log(e)
    }
  }

  const updateUserAvatar = async () => {
    const { identityId } = await Auth.currentUserCredentials()
    try {
      const { data } = await updateUserMutation({
        ...user,
        avatarUrl: identityId
      })
      setUser(data.updateMember)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <UserContext.Provider value={{ authMode, user, updateUserAvatar }}>
      {children}
    </UserContext.Provider>  
  )
}