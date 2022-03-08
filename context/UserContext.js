import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import { useAuthenticator } from '@aws-amplify/ui-react'

import { getMemberQuery, updateUserMutation } from '@apiServices'
import { setAvatarUrlToCache } from '@utils/avatarCache'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const { route } = useAuthenticator(context => [context.route])
  const [user, setUser] = useState(null)
  /*
    Authmode needs to change depending if the user is signed in or not (otherwise errors)
    'AWS_IAM' for unauthenticated
    'AWS_COGNITO_USER_POOLS' for authenticated 
  */
  const [authMode, setAuthMode] = useState('AWS_IAM')

  //Check if the user is logged in
  useEffect(() => {
    setLoggedUser()
  }, [])

  /*
    Route follows authentication state.
    It will be 'authenticated' only on first signIn.
    If user loads the page and the user info is stored to session storage, route status won't authenticate.
    Only further Auth commands change the route state, like signOut.
  */
  useEffect(() => {
    if (route === 'authenticated') {
      setLoggedUser()
    }

    if (route === 'signOut') {
      setAuthMode('AWS_IAM')
      setUser(null)
    }
  }, [route])


  /*
    Checks for the current authenticated user (this thows error if not authenticated)
    Then sets cookies for SSR, and fetches the User data from dynamoDB.
    Then sets the authMode for authenticated users
  */
  const setLoggedUser = async () => {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser()
      setSSRCookies()
      const { data } = await getMemberQuery(loggedUser.attributes.sub)
      setUser(data.getMember)
      setAuthMode('AMAZON_COGNITO_USER_POOLS')
    } catch (e) {
      console.log(e)
    }
  }

  //set cookies for SSR. Amplify only sets cookies from session storage on first signIn.
  const setSSRCookies = () => {
    const cookieList = ["LastAuthUser", "refreshToken", "accessToken", "idToken"]
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        let tokenNamearray = key.split('.')
        let tokenName = tokenNamearray.pop()
        if(cookieList.indexOf(tokenName) !== -1) {
          document.cookie = `${key}=${window.localStorage[key]};expires=0;secure=true;samesite=strict`
        }
      }
    }
  }

  /*
    In DynamoDB User, the avatarUrl is the singed users cognitoID.
    This is so everyone can access @amplify-ui S3Images
  */   
  const updateUserAvatar = async imageUrl => {
    try {
      const { identityId } = await Auth.currentUserCredentials()
      const { data } = await updateUserMutation({
        ...user,
        avatarColor: 'transparent',
        avatarUrl: identityId
      })
      setAvatarUrlToCache(identityId, imageUrl)
      setUser({ ...data.updateMember })
    } catch (e) {
      console.log(e)
    }
  }

  const deleteUser = async () => {
    try {
      await updateUserMutation({
        ...user,
        avatarUrl: null,
        avatarColor: 'transparent'
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <UserContext.Provider value={{
      authMode,
      user,
      setLoggedUser,
      updateUserAvatar,
      deleteUser
    }}>
      {children}
    </UserContext.Provider>
  )
}