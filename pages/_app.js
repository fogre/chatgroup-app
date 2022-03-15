import Head from 'next/head'
import Amplify from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'

import awsconfig from '../aws-exports'
import { UserProvider, ChannelProvider } from '@context'

import GlobalStyles from '@components/GlobalStyles'
import { GridLayoutWrapper } from '@components/Layout'

Amplify.configure({
  ...awsconfig,
  ssr: true
})

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Chatgroup</title>
        <meta name='description' content='The 1# chat group website for chatting' />
      </Head>
      <Authenticator.Provider>
        <GlobalStyles />
        <GridLayoutWrapper>
          <UserProvider>
            <ChannelProvider>
              <Component {...pageProps} />
            </ChannelProvider>
          </UserProvider>
        </GridLayoutWrapper>
      </Authenticator.Provider>
    </>
  )
}

export default App