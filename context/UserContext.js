import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import { useAuthenticator } from '@aws-amplify/ui-react'

import { getMemberQuery, updateUserMutation } from '@apiServices'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const useauth = useAuthenticator(context => [context.route])
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('AWS_IAM')

  useEffect(() => {
    console.log('IGET CALLED')
    setLoggedUser()
  }, [])

  useEffect(() => {
    if (useauth.route === 'authenticated') {
      console.log('ROUTE IS AUTHENTICATED')
      setLoggedUser()
    }

    if (useauth.route === 'signOut') {
      setAuthMode('AWS_IAM')
      setUser(null)
    }
    console.log(useauth.route)
  }, [useauth.route])

  const setLoggedUser = async () => {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser()
      setAuthCookies()
      console.log('loggedUser', loggedUser)
      const { data } = await getMemberQuery(loggedUser.attributes.sub)
      setUser(data.getMember)
      setAuthMode('AMAZON_COGNITO_USER_POOLS')
    } catch (e) {
      console.log(e)
    }
  }

  //set cookies for SSR
  const setAuthCookies = () => {
    const cookieList = ["LastAuthUser", "refreshToken", "accessToken", "idToken"]
    let expiration = new Date()
    expiration.setFullYear(expiration.getFullYear() + 1)
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        let tokenNamearray = key.split('.')
        let tokenName = tokenNamearray.pop()
        if(cookieList.indexOf(tokenName) !== -1) {
          document.cookie = `${key}=${window.localStorage[key]};expires=${expiration.toUTCString()};secure=true;samesite=strict`
        }
      }
    }
  } 

  const updateUserAvatar = async () => {
    try {
      const { identityId } = await Auth.currentUserCredentials()
      const { data } = await updateUserMutation({
        ...user,
        avatarUrl: identityId
      })
      setUser({ ...data.updateMember })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <UserContext.Provider value={{ authMode, user, setLoggedUser, updateUserAvatar }}>
      {children}
    </UserContext.Provider>  
  )
}