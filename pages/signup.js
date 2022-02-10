import Link from 'next/link'
import { Authenticator } from '@aws-amplify/ui-react'

import { Nav, Main } from '@components/Layout'

const SignUpPage = () => {
  return (
    <>
      <Nav>
        <Link href='/'>
          <a>home</a>
        </Link>
      </Nav>
      <Main>
        <Authenticator>
          {({ signOut, user }) => (
            <>
              <p>hi, {user.username}!</p>
              <br />
              <button onClick={() => signOut()}>sign out</button>
            </>
          )}
        </Authenticator>
      </Main>
    </>
  )
}

export default SignUpPage