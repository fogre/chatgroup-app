import Amplify from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import styled from 'styled-components'

import awsconfig from '../aws-exports'
import { UserProvider } from '@context'

import GlobalStyles from '@components/GlobalStyles'
import { GridLayoutWrapper } from '@components/Layout'

Amplify.configure({
  ...awsconfig,
  ssr: true
})

const App = ({ Component, pageProps }) => {
  return (
    <Authenticator.Provider>
      <GlobalStyles />
      <GridLayoutWrapper>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </GridLayoutWrapper>
    </Authenticator.Provider>
  )
}

export default App