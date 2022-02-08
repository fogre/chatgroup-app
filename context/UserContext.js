import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const { route } = useAuthenticator(context => [context.route])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const setLoggedUser = async () => {
      const loggedUser = await Auth.currentAuthenticatedUser()
      setUser(loggedUser)
    }
    
    if (route === 'authenticated') {
      setLoggedUser()
    }
  }, [route])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>  
  )
}