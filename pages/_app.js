import Amplify from 'aws-amplify'
import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react'
import styled from 'styled-components'

import awsconfig from '../aws-exports'

import { UserProvider } from '@context'


Amplify.configure({
  ...awsconfig,
  ssr: true
})

const App = ({ Component, pageProps }) => {
  return (
    <AmplifyProvider>
      <Authenticator.Provider>
        <UserProvider>
          <GridLayoutWrapper>
            <Component {...pageProps} />
          </GridLayoutWrapper>
        </UserProvider>
      </Authenticator.Provider>
    </AmplifyProvider>
  )
}

const GridLayoutWrapper = styled.div`
  display: grid;
  grid-template-areas: 'nav main';
  width: 100%;
  height: 100vh;
`

export default App