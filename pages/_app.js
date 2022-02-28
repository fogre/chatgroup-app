import Amplify from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import awsconfig from '../aws-exports'
import { UserProvider, ChannelProvider } from '@context'

import GlobalStyles from '@components/GlobalStyles'
import { GridLayoutWrapper } from '@components/Layout'

Amplify.configure({
  ...awsconfig,
  ssr: true
})


const App = ({ Component, pageProps }) => {
  const router = useRouter()


  return (
    <Authenticator.Provider>
      <GlobalStyles />
      <GridLayoutWrapper>
        <UserProvider>
          <ChannelProvider>
            <Component {...pageProps} key={router.asPath} />
          </ChannelProvider>
        </UserProvider>
      </GridLayoutWrapper>
    </Authenticator.Provider>
  )
}

export default App